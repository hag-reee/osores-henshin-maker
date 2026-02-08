"use client";

import { useState } from 'react';

type Mode = 'polite' | 'funny' | 'honest' | 'ojisan';
type ApologyLevel = 'light' | 'normal' | 'heavy';
type Length = 'short' | 'normal' | 'long';

interface GenerateResponse {
  candidates: string[];
  emojiSets: string[];
  meta?: any;
  error?: string;
}

// Ensure revalidation
export default function Home() {
  const [formData, setFormData] = useState({
    relationship: '',
    delay: '',
    trueReason: '',
    mode: 'polite' as Mode,
    apologyLevel: 'normal' as ApologyLevel,
    length: 'short' as Length,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || '生成に失敗しました。しばらく待ってから再試行してください。');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="container" style={{ paddingLeft: '25px', paddingRight: '25px' }}>
      <main className="glass-panel">
        <div className="header">
          <img src="/logo_pc.svg" alt="おそレス言いワケメーカー" className="home-logo" />
          <p style={{ lineHeight: '36px' }}>
            気まずい返信遅れ、<br />
            秒速で解決。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <div>
            <div className="label-container">
              <img src="/icon.svg" className="label-icon" alt="" />
              <span>相手との関係</span>
            </div>
            <input
              type="text"
              className="input-pill"
              required
              placeholder="例: 上司、恋人、友達"
              maxLength={30}
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
            />
          </div>

          <div>
            <div className="label-container">
              <img src="/icon.svg" className="label-icon" alt="" />
              <span>返信が遅れた時間</span>
            </div>
            <input
              type="text"
              className="input-pill"
              required
              placeholder="例: 2日、3時間"
              maxLength={20}
              value={formData.delay}
              onChange={(e) => setFormData({ ...formData, delay: e.target.value })}
            />
          </div>

          <div className="form-full">
            <div className="label-container">
              <img src="/icon.svg" className="label-icon" alt="" />
              <span>気づかなかった理由</span>
            </div>
            <input
              type="text"
              className="input-pill"
              required
              placeholder="例: 寝てた、忘れてた、気が乗らなかった"
              maxLength={200}
              value={formData.trueReason}
              onChange={(e) => setFormData({ ...formData, trueReason: e.target.value })}
            />
          </div>

          <div className="form-full">
            <div className="label-container">
              <img src="/icon.svg" className="label-icon" alt="" />
              <span>言いワケモード</span>
            </div>
            <div className="btn-group-pill">
              {[
                { val: 'polite', label: '角が立たない' },
                { val: 'funny', label: 'ネタ寄り' },
                { val: 'honest', label: '誠実' },
                { val: 'ojisan', label: 'おじさん構文' }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  className={`btn-pill-toggle ${formData.mode === opt.val ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, mode: opt.val as Mode })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-full">
            <div className="label-container">
              <img src="/icon.svg" className="label-icon" alt="" />
              <span>言い訳レベル</span>
            </div>
            <div className="btn-group-pill">
              {[
                { val: 'light', label: '軽め' },
                { val: 'normal', label: '普通' },
                { val: 'heavy', label: '土下座' }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  className={`btn-pill-toggle ${formData.apologyLevel === opt.val ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, apologyLevel: opt.val as ApologyLevel })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-full">
            <div className="label-container">
              <img src="/icon.svg" className="label-icon" alt="" />
              <span>長さ</span>
            </div>
            <div className="btn-group-pill">
              {[
                { val: 'short', label: '短め' },
                { val: 'normal', label: '普通' },
                { val: 'long', label: '長め' }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  className={`btn-pill-toggle ${formData.length === opt.val ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, length: opt.val as Length })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-full mt-4">
            <button
              type="submit"
              className="btn-primary-pill"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
            >
              {loading ? '言い訳を仕上げ中...' : '言い訳を仕上げる'}
            </button>
          </div>
        </form>

        {loading && (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div className="form-full mt-4" style={{ color: 'var(--error)', textAlign: 'center', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)' }}>
            {error}
          </div>
        )}

        {result && (
          <div className="results-card">
            <h2 className="results-title">言い訳、揃いました。</h2>

            <div className="result-label">
              おすすめ絵文字セット（タップでコピー）
            </div>
            <div className="emoji-container">
              {result.emojiSets.map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="emoji-pill"
                  onClick={() => copyToClipboard(emoji, 100 + idx)}
                  title="クリックしてコピー"
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div className="flex-col gap-2">
              {result.candidates.map((candidate, idx) => (
                <div key={idx} className="result-item">
                  <div className="result-text">{candidate}</div>
                  <button
                    className="copy-btn-small"
                    onClick={() => copyToClipboard(candidate, idx)}
                    title="コピー"
                  >
                    {copiedIndex === idx ? 'COPIED' : 'COPY'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="footer-links">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('気まずい返信遅れ、秒速で解決。')}&hashtags=おそレス言いワケメーカー&url=${encodeURIComponent('https://osores-henshin-maker.vercel.app')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '1.2rem', letterSpacing: '0.1em', display: 'inline-block', marginBottom: '1rem' }}
          >
            Xでシェアする
          </a>
          {/* Share buttons structure would go here if specific icons were provided */}

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="/terms">利用規約</a>
            <span>|</span>
            <a href="/privacy">プライバシーポリシー</a>
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.7rem' }}>© osores-henshin-maker</p>
        </div>
      </main>
    </div>
  );
}
