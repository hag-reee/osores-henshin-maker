
import Link from 'next/link';

export default function Privacy() {
    return (
        <div className="container" style={{ maxWidth: '744px', paddingTop: '4rem', paddingLeft: '25px', paddingRight: '25px' }}>
            <main style={{ background: 'transparent' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <img src="/logo_pc.svg" alt="おそレス言いワケメーカー" className="page-logo" />
                    <h1 className="terms-title">プライバシーポリシー</h1>
                </div>

                <div className="text-content">
                    <div className="terms-intro">
                        <p>本プライバシーポリシーは、本サービスにおける利用者情報の取扱いを定めるものです。</p>
                    </div>

                    <div className="terms-section">
                        <h2>1. 取得する情報</h2>
                        <p>当方は、本サービスの提供にあたり、以下の情報を取得する場合があります。</p>
                        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>(1) 利用者が入力する情報</p>
                        <ul className="list-disc pl-5">
                            <li>相手との関係</li>
                            <li>返信が遅れた時間</li>
                            <li>本当の理由（自由入力テキスト）</li>
                            <li>モード等の設定値</li>
                        </ul>
                        <p style={{ fontSize: '0.85rem', color: 'rgb(153, 153, 153)', marginTop: '0.5rem' }}>※入力欄に個人情報（氏名、住所、電話番号、メール、勤務先、特定できる固有情報等）を入力しないでください。</p>

                        <p style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>(2) 端末・アクセス情報（自動取得）</p>
                        <ul className="list-disc pl-5">
                            <li>IPアドレス、ユーザーエージェント、アクセス日時</li>
                            <li>Cookie等の識別子（利用する場合）</li>
                            <li>エラーログ、操作ログ（不正利用防止や品質改善のための最小限）</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>2. 利用目的</h2>
                        <p>取得した情報は以下の目的で利用します。</p>
                        <ul className="list-disc pl-5">
                            <li>本サービスの提供（文面候補の作成・表示等）</li>
                            <li>不正利用の検知・防止、セキュリティ確保</li>
                            <li>障害対応、品質改善、機能改善、利用状況の分析（統計的に）</li>
                            <li>利用規約違反への対応</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>3. 外部サービスへの送信（生成API）</h2>
                        <p>本サービスは、文面候補の作成のために外部の生成API（GoogleのGemini等）を利用します。</p>
                        <p>そのため、利用者の入力情報は生成処理の実行に必要な範囲で外部サービス提供者に送信される場合があります。</p>
                        <p>当方は、送信内容を最小化するよう努めます（例：個人情報の入力を促さない、入力制限等）。</p>
                        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>※外部サービス提供者側での取扱いは、当該提供者のポリシーに従います。</p>
                    </div>

                    <div className="terms-section">
                        <h2>4. 第三者提供</h2>
                        <p>当方は、次の場合を除き、利用者情報を第三者に提供しません。</p>
                        <ul className="list-disc pl-5">
                            <li>法令に基づく場合</li>
                            <li>人の生命・身体・財産の保護のため必要で同意取得が困難な場合</li>
                            <li>業務委託先に、必要な範囲で取り扱いを委託する場合（例：ホスティング、ログ解析等）</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>5. 業務委託</h2>
                        <p>当方は、サービス運営に必要な範囲で、情報の取扱いを外部事業者に委託することがあります。この場合、適切な委託先を選定し、必要な監督を行います。</p>
                    </div>

                    <div className="terms-section">
                        <h2>6. 保存期間</h2>
                        <p>当方は、取得した情報を利用目的に必要な期間のみ保持し、不要になった場合は合理的な方法で削除または匿名化します。</p>
                    </div>

                    <div className="terms-section">
                        <h2>7. Cookie・解析ツール（利用する場合）</h2>
                        <p>当方は、利便性向上や利用状況分析のためCookieや解析ツールを利用する場合があります。</p>
                        <p>利用する場合は、取得項目・目的・無効化方法を本サービス上で案内します。</p>
                    </div>

                    <div className="terms-section">
                        <h2>8. 安全管理措置</h2>
                        <p>当方は、取得情報の漏えい、滅失、毀損等を防止するため、アクセス制御、通信の暗号化、権限管理等の合理的な安全管理措置を講じます。</p>
                    </div>

                    <div className="terms-section">
                        <h2>9. 利用者の権利</h2>
                        <p>利用者は、法令に基づき、自己の情報の開示・訂正・削除等を求めることができます。</p>
                        <p>（具体的な手続は、運用に合わせて本サービス上で案内する場合があります。）</p>
                    </div>

                    <div className="terms-section">
                        <h2>10. 未成年の利用</h2>
                        <p>未成年者が本サービスを利用する場合、保護者等の同意を得た上で利用してください。</p>
                    </div>

                    <div className="terms-section">
                        <h2>11. 改定</h2>
                        <p>当方は、必要に応じて本ポリシーを改定できます。改定後の内容は本サービス上での表示時点から適用されます。</p>
                    </div>
                </div>

                <div className="mt-15 text-center flex flex-col items-center gap-4" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
                    <Link href="/" className="btn-big-green">
                        トップに戻る
                    </Link>
                    <div className="text-sm mt-4">
                        <Link href="/terms" style={{ fontSize: '0.75rem', color: '#999', textDecoration: 'none' }}>
                            利用規約
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
