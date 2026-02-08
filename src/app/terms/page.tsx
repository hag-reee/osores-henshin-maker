import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '利用規約 | おそレス言いワケメーカー',
    description: 'おそレス言いワケメーカーの利用規約です。',
};

export default function Terms() {
    return (
        <div className="container" style={{ maxWidth: '744px', paddingTop: '4rem', paddingLeft: '25px', paddingRight: '25px' }}>
            <main style={{ background: 'transparent' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <img src="/logo_pc.svg" alt="おそレス言いワケメーカー" className="page-logo" />
                    <h1 className="terms-title">利用規約</h1>
                </div>

                <div className="text-content">
                    <div className="terms-intro">
                        <p>本利用規約（以下「本規約」）は、運営者（以下「当方」）が提供する「おそレス言いワケメーカー」（以下「本サービス」）の利用条件を定めるものです。利用者は、本サービスを利用することにより本規約に同意したものとみなされます。</p>
                    </div>

                    <div className="terms-section">
                        <h2>第1条（適用）</h2>
                        <p>本規約は、本サービスの利用に関する当方と利用者との一切の関係に適用されます。</p>
                        <p>当方が本サービス上で別途定めるルール、ガイドライン等は本規約の一部を構成します。</p>
                    </div>

                    <div className="terms-section">
                        <h2>第2条（提供内容）</h2>
                        <p>本サービスは、利用者が入力した情報に基づき、返信が遅れた際に用いる文面候補等を提示するサービスです。</p>
                        <p>提示される文面は参考情報であり、利用者の利用目的・状況への適合や結果を当方が保証するものではありません。</p>
                    </div>

                    <div className="terms-section">
                        <h2>第3条（利用条件）</h2>
                        <p>利用者は、自己の責任において本サービスを利用するものとします。</p>
                        <p>本サービスの利用に必要な通信機器、ソフトウェア、通信環境等は利用者の負担で準備するものとします。</p>
                    </div>

                    <div className="terms-section">
                        <h2>第4条（禁止事項）</h2>
                        <p>利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
                        <ul className="list-disc pl-5">
                            <li>法令または公序良俗に違反する行為</li>
                            <li>犯罪行為の助長、またはこれに関連する行為</li>
                            <li>他者への誹謗中傷、差別、嫌がらせ、脅迫、名誉毀損等</li>
                            <li>他者の個人情報・機密情報を無断で入力・送信する行為</li>
                            <li>本サービスまたは第三者のシステムに過度な負荷を与える行為、リバースエンジニアリング等の不正行為</li>
                            <li>本サービスの運営を妨害する行為</li>
                            <li>その他、当方が不適切と判断する行為</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>第5条（知的財産権）</h2>
                        <p>本サービスに関するプログラム、デザイン、文章、画像、ロゴ等の権利は当方または正当な権利者に帰属します。</p>
                        <p>利用者は、当方の許諾なく本サービスの内容を複製・転載・配布等できません。</p>
                        <p>利用者が入力したテキスト（以下「入力内容」）の権利は原則として利用者に帰属します。ただし、当方は本サービス提供・改善のために必要な範囲で入力内容を取り扱うことがあります（詳細はプライバシーポリシー参照）。</p>
                    </div>

                    <div className="terms-section">
                        <h2>第6条（免責）</h2>
                        <p>当方は、本サービスが常に利用可能であること、エラーがないこと、特定目的に適合すること等を保証しません。</p>
                        <p>本サービスが提示する文面の使用により生じたトラブル（対人関係上の不利益、損害、炎上、信用毀損等を含みます）について、当方は一切責任を負いません。</p>
                        <p>外部サービス（生成機能提供のAPI等）の仕様変更・停止・障害により本サービスが利用できない場合、当方は責任を負いません。</p>
                    </div>

                    <div className="terms-section">
                        <h2>第7条（サービスの変更・停止）</h2>
                        <p>当方は、利用者への事前通知なく本サービスの内容を変更、追加、停止または終了できるものとします。</p>
                    </div>

                    <div className="terms-section">
                        <h2>第8条（利用制限・停止）</h2>
                        <p>当方は、利用者が本規約に違反した場合、または当方が必要と判断した場合、事前通知なく本サービスの利用を制限または停止できます。</p>
                    </div>

                    <div className="terms-section">
                        <h2>第9条（規約の変更）</h2>
                        <p>当方は、必要に応じて本規約を変更できます。変更後の規約は、本サービス上に表示した時点から効力を生じます。</p>
                    </div>

                    <div className="terms-section">
                        <h2>第10条（準拠法・裁判管轄）</h2>
                        <p>本規約は日本法を準拠法とします。本サービスに関して紛争が生じた場合、当方所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。</p>
                    </div>
                </div>

                <div className="mt-15 text-center flex flex-col items-center gap-4" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
                    <Link href="/" className="btn-big-green">
                        トップに戻る
                    </Link>
                    <div className="text-sm mt-4">
                        <Link href="/privacy" style={{ fontSize: '0.75rem', color: '#999', textDecoration: 'none' }}>
                            プライバシーポリシー
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
