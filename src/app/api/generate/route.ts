
import { NextRequest, NextResponse } from 'next/server';

// Types
type Mode = 'polite' | 'funny' | 'honest' | 'ojisan';
type ApologyLevel = 'light' | 'normal' | 'heavy';
type Length = 'short' | 'normal' | 'long';

interface GenerateRequest {
    relationship: string;
    delay: string;
    trueReason: string;
    mode: Mode;
    apologyLevel: ApologyLevel;
    length: Length;
}

interface GenerateResponse {
    mode: Mode;
    candidates: string[];
    emojiSets: string[];
    meta: {
        model: string;
        generatedAt: string;
        attemptedModels: string[];
        fallbackUsed: boolean;
    };
}

// Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODELS = ['gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-flash-latest'];

// Validation Helper
function validateRequest(body: any): string | null {
    if (!body) return 'Request body is empty';

    if (typeof body.relationship !== 'string' || body.relationship.length < 1 || body.relationship.length > 30) {
        return 'Invalid relationship: must be 1-30 characters';
    }
    if (typeof body.delay !== 'string' || body.delay.length < 1 || body.delay.length > 20) {
        return 'Invalid delay: must be 1-20 characters';
    }
    if (typeof body.trueReason !== 'string' || body.trueReason.length < 1 || body.trueReason.length > 200) {
        return 'Invalid trueReason: must be 1-200 characters';
    }

    const validModes = ['polite', 'funny', 'honest', 'ojisan'];
    if (!validModes.includes(body.mode)) return 'Invalid mode';

    const validApologyLevels = ['light', 'normal', 'heavy'];
    if (!validApologyLevels.includes(body.apologyLevel)) return 'Invalid apologyLevel';

    const validLengths = ['short', 'normal', 'long'];
    if (!validLengths.includes(body.length)) return 'Invalid length';

    return null;
}

// Prompt Construction
function buildPrompt(req: GenerateRequest): string {
    const modeLabels: Record<Mode, string> = {
        polite: '角が立たない（丁寧、低刺激、配慮）',
        funny: 'ネタ寄り（軽く笑える、失礼・煽りは避ける）',
        honest: '誠実（謝罪→事情→今の対応、言い訳しすぎない）',
        ojisan: 'おじさん構文（絵文字多め/語尾/伸ばし棒/カッコ、やりすぎ抑制）'
    };

    const apologyLabels: Record<ApologyLevel, string> = {
        light: '軽め（さらっと）',
        normal: '普通',
        heavy: '土下座（猛省、しっかり謝罪）'
    };

    return `
あなたは「返信が遅れた人のための、送信可能な短文作成AI」です。
以下の条件で、相手に送れる短文を3個と、絵文字案セットを3〜5個作ってください。

# 条件
- 状況前提: 既読無視ではなく、返信したい気持ちはあるが遅れてしまったケース
- モード: ${modeLabels[req.mode]}
- 相手との関係: ${req.relationship}
- 返信が遅れた時間: ${req.delay}
- 遅くなった理由（雑でOK）: ${req.trueReason}
- 謝罪レベル: ${apologyLabels[req.apologyLevel]}
- 長さ: ${req.length}

# 出力形式（最重要・厳守）
必ず次のJSONのみを返してください。前後に説明文を付けないでください。
{
  "candidates": ["...3個..."],
  "emojiSets": ["...3〜5個..."]
}

# 追加ルール
- candidatesは必ず3件
- 3件は内容を重複させない（謝り方/事情/締め/テンポを変える）
- 相手を責めるニュアンス禁止
- 不快・攻撃的・差別的・過度な下ネタ禁止
- 事故/病気/不幸の捏造など重い嘘を避ける
- 文中に「土下座」という単語は含めない（あくまで態度の指定）
- 送信できる自然な日本語、1候補は最大60文字目安（lengthで調整）
`;
}

// Gemini API Caller
async function callGemini(model: string, prompt: string): Promise<{ candidates: string[], emojiSets: string[] }> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json"
            }
        })
    });

    if (!response.ok) {
        if (response.status === 429) throw new Error('Rate limit exceeded');
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error('Empty response from Gemini');

    try {
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed.candidates) || parsed.candidates.length < 3) {
            throw new Error('Invalid candidates format or count');
        }
        return parsed;
    } catch (e) {
        // Try to extract JSON if parsing failed (simple heuristic)
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
            try {
                const parsed = JSON.parse(match[0]);
                if (!Array.isArray(parsed.candidates) || parsed.candidates.length < 3) {
                    throw new Error('Invalid candidates format or count');
                }
                return parsed;
            } catch (e2) {
                throw new Error('Failed to parse JSON from response');
            }
        }
        throw new Error('Failed to parse JSON from response');
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validationError = validateRequest(body);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        if (!GEMINI_API_KEY) {
            return NextResponse.json({ error: 'Server configuration error (API Key missing)' }, { status: 500 });
        }

        const prompt = buildPrompt(body);
        const attemptedModels: string[] = [];

        let result = null;
        let successfulModel = '';

        const errors: any[] = [];

        for (const model of MODELS) {
            attemptedModels.push(model);
            try {
                result = await callGemini(model, prompt);
                successfulModel = model;
                break; // Success!
            } catch (error: any) {
                console.warn(`Model ${model} failed:`, error);
                errors.push({ model, message: error.message || String(error) });
                // Continue to next model
            }
        }

        if (!result || !successfulModel) {
            return NextResponse.json({
                error: 'Failed to generate content after trying all models',
                attemptedModels,
                errors // Return detailed errors for debugging
            }, { status: 503 });
        }

        const response: GenerateResponse = {
            mode: body.mode,
            candidates: result.candidates,
            emojiSets: result.emojiSets || [],
            meta: {
                model: successfulModel,
                generatedAt: new Date().toISOString(),
                attemptedModels,
                fallbackUsed: successfulModel !== MODELS[0]
            }
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('API Handler Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
