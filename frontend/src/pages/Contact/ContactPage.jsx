const CONTACT_INFO = {
    cafeUrl: "https://cafe.naver.com/cukconsensus",
    instagramUrl: "https://www.instagram.com/cuk_consensus",
    kakaoOpenChatUrl: "https://open.kakao.com/",
    email: "consensus.cuk@gmail.com",
};

function ContactPage() {
    const contacts = [
        {
            category: 'PRIMARY CHANNEL',
            icon: (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            who: '학회 공식 문의',
            value: CONTACT_INFO.email,
            note: '가입, 활동, 커리큘럼 관련 일반 문의'
        },
        {
            category: 'PARTNERSHIP & SOCIAL',
            icon: (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
            ),
            who: '대외 소통 문의',
            value: '@consensus_cuk',
            note: 'UIC 연합세션 및 외부 동아리 교류 제안'
        },
        {
            category: 'PHYSICAL CAMPUS',
            icon: (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            who: '가톨릭대학교 성심교정',
            value: '학생회관 세미나실',
            note: '경기도 부천시 지봉로 43 · 정기 세션 금요일 18시'
        }
    ];

    return (
        <main style={{ minHeight: '100vh', padding: '120px 24px 60px', background: 'transparent', color: '#FFFFFF', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <div style={{ font: "800 12px 'Pretendard',sans-serif", letterSpacing: '4px', color: '#9DC4EE', textTransform: 'uppercase', marginBottom: '16px' }}>CONTACT US</div>
                    <h1 style={{ fontSize: 'clamp(32px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.6px', marginBottom: '16px', color: '#FFFFFF' }}>문의하기</h1>
                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
                        학회 입부, 연합 세션, 기업 리서치 협업 및 대외 소통 문의는 아래 채널로 접수해주시기 바랍니다.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {contacts.map((c, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '14px', padding: '24px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', font: "700 11px 'Pretendard', monospace, sans-serif", letterSpacing: '1.5px', color: '#60A5FA', textTransform: 'uppercase', marginBottom: '14px' }}>
                                {c.icon}
                                <span>{c.category}</span>
                            </div>
                            <div style={{ font: "700 18px 'Pretendard',sans-serif", color: '#FFFFFF', marginBottom: '8px' }}>{c.who}</div>
                            <div style={{ font: "600 15px 'Pretendard', sans-serif", color: '#9DC4EE', marginBottom: '12px', wordBreak: 'break-all' }}>{c.value}</div>
                            <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', marginTop: '14px' }}>{c.note}</div>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: '48px', textAlign: 'center' }}>
                    {/*<h2 style={{ color: '#FFFFFF', fontFamily: "'Pretendard', sans-serif", fontWeight: 700, fontSize: '22px', marginBottom: '24px' }}>공식 소통 채널</h2>*/}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        {/*/!* 네이버 카페 로고 버튼 *!/*/}
                        {/*<a*/}
                        {/*    href={CONTACT_INFO.cafeUrl}*/}
                        {/*    target="_blank"*/}
                        {/*    rel="noopener noreferrer"*/}
                        {/*    style={{*/}
                        {/*        display: 'inline-flex',*/}
                        {/*        alignItems: 'center',*/}
                        {/*        gap: '10px',*/}
                        {/*        padding: '14px 24px',*/}
                        {/*        borderRadius: '12px',*/}
                        {/*        background: 'rgba(3, 199, 90, 0.12)',*/}
                        {/*        border: '1px solid rgba(3, 199, 90, 0.35)',*/}
                        {/*        color: '#03C75A',*/}
                        {/*        textDecoration: 'none',*/}
                        {/*        fontWeight: 700,*/}
                        {/*        fontSize: '14.5px',*/}
                        {/*        fontFamily: "'Pretendard', sans-serif",*/}
                        {/*        transition: 'all 0.25s ease'*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">*/}
                        {/*        <path d="M16.273 12.845L7.376 0H0v24h7.726v-12.845L16.624 24H24V0h-7.727v12.845z" />*/}
                        {/*    </svg>*/}
                        {/*    <span>네이버 카페</span>*/}
                        {/*</a>*/}

                        {/*/!* 인스타그램 로고 버튼 *!/*/}
                        {/*<a*/}
                        {/*    href={CONTACT_INFO.instagramUrl}*/}
                        {/*    target="_blank"*/}
                        {/*    rel="noopener noreferrer"*/}
                        {/*    style={{*/}
                        {/*        display: 'inline-flex',*/}
                        {/*        alignItems: 'center',*/}
                        {/*        gap: '10px',*/}
                        {/*        padding: '14px 24px',*/}
                        {/*        borderRadius: '12px',*/}
                        {/*        background: 'rgba(225, 48, 108, 0.12)',*/}
                        {/*        border: '1px solid rgba(225, 48, 108, 0.35)',*/}
                        {/*        color: '#E1306C',*/}
                        {/*        textDecoration: 'none',*/}
                        {/*        fontWeight: 700,*/}
                        {/*        fontSize: '14.5px',*/}
                        {/*        fontFamily: "'Pretendard', sans-serif",*/}
                        {/*        transition: 'all 0.25s ease'*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">*/}
                        {/*        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>*/}
                        {/*        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>*/}
                        {/*        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>*/}
                        {/*    </svg>*/}
                        {/*    <span>인스타그램</span>*/}
                        {/*</a>*/}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ContactPage;