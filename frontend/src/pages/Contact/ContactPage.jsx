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
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(44px,6vw,76px) clamp(16px,3vw,32px)', background: '#0B1021', color: '#F1F5F9' }}>
            <div style={{ font: "500 10.5px 'JetBrains Mono',monospace", letterSpacing: '.2em', color: '#3B82F6' }}>CONTACT</div>
            <h2 style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 'clamp(26px,3.6vw,40px)', color: '#F1F5F9' }}>문의 및 제휴</h2>
            <p style={{ margin: '12px 0 30px', maxWidth: '600px', fontSize: '14px', lineHeight: 1.7, color: '#94A3B8' }}>연합세션, 기업 리서치 협업, 금융권 재직자 네트워크 관련 문의를 받고 있습니다.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(268px,1fr))', gap: '16px' }}>
                {contacts.map((c, idx) => (
                    <div key={idx} style={{ border: '1px solid rgba(59,130,246,.18)', borderRadius: '14px', background: '#0E162D', padding: '20px' }}>
                        <div style={{ font: "500 10px 'JetBrains Mono',monospace", letterSpacing: '.16em', color: '#64748B' }}>{c.kind}</div>
                        <div style={{ marginTop: '12px', font: "600 15px 'IBM Plex Sans KR',sans-serif", color: '#F1F5F9' }}>{c.who}</div>
                        <div style={{ marginTop: '8px', font: "500 13px 'JetBrains Mono',monospace", color: '#10B981' }}>{c.value}</div>
                        <div style={{ marginTop: '10px', fontSize: '12px', lineHeight: 1.6, color: '#94A3B8' }}>{c.note}</div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '48px', borderTop: '1px solid rgba(59,130,246,.14)', paddingTop: '24px' }}>
                <h3 style={{ color: '#F1F5F9', fontSize: '18px' }}>공식 소통 채널</h3>
                <div style={{ marginTop: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {/* 네이버 카페 로고 버튼 */}
                    <a
                        href={CONTACT_INFO.cafeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 20px',
                            borderRadius: '12px',
                            background: 'rgba(3, 199, 90, 0.1)',
                            border: '1px solid rgba(3, 199, 90, 0.3)',
                            color: '#03C75A',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '14px',
                            transition: 'all 0.3s'
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
                            padding: '10px 18px',
                            borderRadius: '12px',
                            background: 'rgba(225, 48, 108, 0.1)',
                            border: '1px solid rgba(225, 48, 108, 0.3)',
                            color: '#E1306C',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '14px',
                            transition: 'all 0.3s'
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        <span>인스타그램</span>
                    </a>

                    {/*/!* 카카오톡 오픈채팅 로고 버튼 *!/*/}
                    {/*<a*/}
                    {/*    href={CONTACT_INFO.kakaoOpenChatUrl}*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*    style={{*/}
                    {/*        display: 'inline-flex',*/}
                    {/*        alignItems: 'center',*/}
                    {/*        gap: '10px',*/}
                    {/*        padding: '12px 20px',*/}
                    {/*        borderRadius: '12px',*/}
                    {/*        background: 'rgba(254, 229, 0, 0.1)',*/}
                    {/*        border: '1px solid rgba(254, 229, 0, 0.3)',*/}
                    {/*        color: '#FEE500',*/}
                    {/*        textDecoration: 'none',*/}
                    {/*        fontWeight: 600,*/}
                    {/*        fontSize: '14px',*/}
                    {/*        transition: 'all 0.3s'*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">*/}
                    {/*        <path d="M12 3C6.477 3 2 6.477 2 10.767c0 2.766 1.83 5.19 4.606 6.558-.2.748-.727 2.71-.832 3.125-.13.518.19.512.4.373.165-.11 2.622-1.782 3.684-2.503.708.104 1.437.158 2.142.158 5.523 0 10-3.477 10-7.767S17.523 3 12 3z"/>*/}
                    {/*    </svg>*/}
                    {/*    <span>카카오톡 오픈채팅</span>*/}
                    {/*</a>*/}
                </div>
            </div>
        </main>
    );
}

export default ContactPage;