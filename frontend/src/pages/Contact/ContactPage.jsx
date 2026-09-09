const CONTACT_INFO = {
    cafeUrl: "https://cafe.naver.com/cukconsensus",
    instagramUrl: "https://www.instagram.com/cuk_consensus",
    kakaoOpenChatUrl: "https://open.kakao.com/",
    email: "consensus.cuk@gmail.com",
};

function ContactPage() {
    const contacts = [
        { kind: 'GENERAL', who: '학회 공식 문의', value: CONTACT_INFO.email, note: '가입, 활동, 커리큘럼 관련 일반 문의' },
        { kind: 'PARTNERSHIP', who: '대외협력담당 이서원', value: '@consensus_cuk', note: 'UIC 연합세션 및 외부 동아리 교류 제안' },
        { kind: 'CAMPUS', who: '가톨릭대학교 성심교정', value: '학생회관 세미나실', note: '경기도 부천시 지봉로 43 · 정기 세션 금요일 18시' }
    ];

    return (
        <main style={{ minHeight: '100vh', padding: '150px 24px 100px', background: 'transparent', color: '#FFFFFF', boxSizing: 'border-box' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <div style={{ font: "800 12px 'JetBrains Mono',monospace", letterSpacing: '4px', color: '#9DC4EE', textTransform: 'uppercase', marginBottom: '16px' }}>CONTACT US</div>
                    <h1 style={{ margin: 0, fontFamily: "'Pretendard', sans-serif", fontWeight: 800, fontSize: 'clamp(32px,4vw,44px)', letterSpacing: '-0.6px', color: '#FFFFFF' }}>문의 및 제휴</h1>
                    <p style={{ margin: '14px auto 0', maxWidth: '620px', fontSize: '15px', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.75)', wordBreak: 'keep-all' }}>
                        UIC 연합세션, 기업 리서치 협업, 금융권 재직자 네트워크 관련 문의를 받고 있습니다.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '22px', marginBottom: '64px' }}>
                    {contacts.map((c, idx) => (
                        <div key={idx} style={{ border: '1px solid rgba(255,255,255,0.16)', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ font: "800 11px 'JetBrains Mono',monospace", letterSpacing: '2px', color: '#9DC4EE', marginBottom: '12px' }}>{c.kind}</div>
                                <div style={{ font: "700 18px 'Pretendard',sans-serif", color: '#FFFFFF', marginBottom: '8px' }}>{c.who}</div>
                                <div style={{ font: "600 15px 'JetBrains Mono',monospace", color: '#9DC4EE', marginBottom: '12px', wordBreak: 'break-all' }}>{c.value}</div>
                            </div>
                            <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', marginTop: '14px' }}>{c.note}</div>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: '48px', textAlign: 'center' }}>
                    <h2 style={{ color: '#FFFFFF', fontFamily: "'Pretendard', sans-serif", fontWeight: 700, fontSize: '22px', marginBottom: '24px' }}>공식 소통 채널</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        {/* 네이버 카페 로고 버튼 */}
                        <a
                            href={CONTACT_INFO.cafeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '14px 24px',
                                borderRadius: '12px',
                                background: 'rgba(3, 199, 90, 0.12)',
                                border: '1px solid rgba(3, 199, 90, 0.35)',
                                color: '#03C75A',
                                textDecoration: 'none',
                                fontWeight: 700,
                                fontSize: '14.5px',
                                fontFamily: "'Pretendard', sans-serif",
                                transition: 'all 0.25s ease'
                            }}
                        >
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.273 12.845L7.376 0H0v24h7.726v-12.845L16.624 24H24V0h-7.727v12.845z" />
                            </svg>
                            <span>네이버 카페</span>
                        </a>

                        {/* 인스타그램 로고 버튼 */}
                        <a
                            href={CONTACT_INFO.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '14px 24px',
                                borderRadius: '12px',
                                background: 'rgba(225, 48, 108, 0.12)',
                                border: '1px solid rgba(225, 48, 108, 0.35)',
                                color: '#E1306C',
                                textDecoration: 'none',
                                fontWeight: 700,
                                fontSize: '14.5px',
                                fontFamily: "'Pretendard', sans-serif",
                                transition: 'all 0.25s ease'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                            <span>인스타그램</span>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ContactPage;