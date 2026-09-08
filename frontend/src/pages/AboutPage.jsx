import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const CardWatermark = () => (
  <div
    style={{
      position: 'absolute',
      right: '-20px',
      bottom: '-20px',
      width: '160px',
      height: '160px',
      opacity: 0.04,
      pointerEvents: 'none',
      userSelect: 'none',
      zIndex: 0,
      backgroundImage: 'url("/logo.png")',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      filter: 'brightness(2) contrast(1.5)'
    }}
  />
);

function AboutPage() {
    const [histories, setHistories] = useState([]);
    const curriculumRef = useRef(null);

    const scrollToCurriculum = () => {
        if (curriculumRef.current) {
            curriculumRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        axiosInstance.get('/api/histories')
            .then((response) => setHistories(response.data))
            .catch((error) => console.error(error));
    }, []);

    const tracks = [
        { name: '기업리서치 (Valuation)',
          headStyle: { padding: '14px 16px', borderBottom: '1px solid rgba(16,185,129,.22)', font: '600 14px "IBM Plex Sans KR",sans-serif', color: '#F1F5F9', background: 'linear-gradient(90deg,rgba(16,185,129,.14),transparent)' },
          rows: [
            { week: '1주차', task: '1차 과제 · 섹터별 기업 선정' },
            { week: '2–5주차', task: '조별활동 · P/E 상대가치 밸류에이션' },
            { week: '6주차', task: '1차 활동 발표 (P/E Valuation 산출물)' },
            { week: '9주차', task: 'DCF Valuation 강의 · 기업 재선정' },
            { week: '10–13주차', task: '조별활동 · DCF 모델링' },
            { week: '14주차', task: '2차 활동 발표 (DCF 산출물) · 노스크립트 필수' }
          ] },
        { name: '매크로 컨센서스 (House-View · 운용)',
          headStyle: { padding: '14px 16px', borderBottom: '1px solid rgba(59,130,246,.22)', font: '600 14px "IBM Plex Sans KR",sans-serif', color: '#F1F5F9', background: 'linear-gradient(90deg,rgba(59,130,246,.14),transparent)' },
          rows: [
            { week: '1–2주차', task: 'Macro Map · Base-line 리서치, 초기 포트폴리오 구성' },
            { week: '3주차', task: 'House View 초안 · 1억 포트폴리오 운용 개시' },
            { week: '4–5주차', task: 'House View 리포트 (base/bull/bear) · 1차 리밸런싱 심의' },
            { week: '9–10주차', task: 'House View 업데이트 · 투자제안 심의 · 2차 리밸런싱' },
            { week: '11–12주차', task: '차기 분기 전망 수립 · 학기말 리밸런싱' },
            { week: '13–14주차', task: '투자운용결과보고서 완성 및 발표' }
          ] }
    ];

    const menuItems = [
        { key: 'curriculum', title: 'CURRICULUM', desc: '학회 커리큘럼 확인하기', bgImage: '/bg_curriculum.png', action: scrollToCurriculum, isLink: false },
        { key: 'activity', title: 'PROJECT', desc: '활동 내역 및 산출물 보러가기', bgImage: '/bg_activity.png', path: '/activities', isLink: true },
        { key: 'member', title: 'MEMBER', desc: '학회원 소개 보러가기', bgImage: '/bg_member.png', path: '/members', isLink: true },
        { key: 'recruitment', title: 'RECRUITMENT', desc: '신입 학회원 지원하기', bgImage: '/bg_recruitment.png', path: '/join-us', isLink: true }
    ];

    return (
        <main style={{ minHeight: '100vh', background: '#0B1021', overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(59,130,246,.14)', minHeight: '100vh', paddingTop: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', backgroundImage: "linear-gradient(rgba(11, 16, 33, 0.35), rgba(11, 16, 33, 0.65)), url('/bg_hero_buildings.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: 'clamp(32px,5vw,64px) 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', boxSizing: 'border-box' }}>
                    <div style={{ minWidth: 0, animation: 'riseIn .7s ease-out both', textAlign: 'left', maxWidth: '720px', marginTop: '-40px', marginLeft: '-20px' }}>
                        <div style={{ font: "600 11px 'JetBrains Mono',monospace", letterSpacing: '.25em', color: '#10B981', textTransform: 'uppercase', marginBottom: '16px' }}>
                          CATHOLIC UNIV. FINANCE SOCIETY
                        </div>
                        <h1 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(44px,7.5vw,96px)', lineHeight: 1.05, letterSpacing: '-.03em', background: 'linear-gradient(104deg,#F8FAFC 8%,#10B981 46%,#3B82F6 92%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textWrap: 'balance' }}>
                            One Consensus,<br />Own Consensus
                        </h1>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div style={{ position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: 0.9, animation: 'pulseDot 2s ease-in-out infinite', zIndex: 10 }}>
                    <span style={{ font: "700 14px 'JetBrains Mono',monospace", color: '#94A3B8', letterSpacing: '.25em' }}>SCROLL</span>
                    <span style={{ color: '#10B981', fontSize: '28px', fontWeight: 'bold' }}>↓</span>
                </div>
            </section>

            {/* Consensus Intro Section (PDF Content) */}
            <section style={{ borderBottom: '1px solid rgba(59,130,246,.14)', background: '#0B1225', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: 'clamp(64px, 7vw, 96px) clamp(16px, 3vw, 32px)' }}>
                    <div style={{ font: "500 11px 'JetBrains Mono',monospace", letterSpacing: '.25em', color: '#10B981', textTransform: 'uppercase', marginBottom: '8px' }}>
                        ABOUT CONSENSUS
                    </div>
                    <h2 style={{ margin: '0 0 16px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(28px,3.8vw,44px)', color: '#F1F5F9' }}>
                        “One Consensus, Own Consensus”
                    </h2>
                    <p style={{ margin: '0 0 40px', maxWidth: '720px', fontSize: 'clamp(15px,1.6vw,17.5px)', lineHeight: 1.8, color: '#94A3B8' }}>
                        가톨릭대학교 금융학회 <span style={{ color: '#E2E8F0', fontWeight: 500 }}>컨센서스</span>는 기업리서치(Valuation)와 매크로 하우스뷰, 그리고 실제 모의펀드 운용을 하나의 의사결정 체계로 잇습니다. 하나의 컨센서스를 만들고, 각자의 컨센서스를 갖습니다.
                    </p>

                    {/* Detail Info Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(59,130,246,.18)', borderRadius: '16px', background: '#0E162D', padding: '24px' }}>
                            <CardWatermark />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ font: "600 12px 'JetBrains Mono',monospace", color: '#3B82F6', marginBottom: '8px' }}>ORGANIZATION</div>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: '#F1F5F9', marginBottom: '6px' }}>UIC 소속 가톨릭대 지부</div>
                                <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>전국대학교투자동아리연합회(UIC) 소속 학회</div>
                            </div>
                        </div>

                        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(59,130,246,.18)', borderRadius: '16px', background: '#0E162D', padding: '24px' }}>
                            <CardWatermark />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ font: "600 12px 'JetBrains Mono',monospace", color: '#10B981', marginBottom: '8px' }}>HISTORY</div>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: '#F1F5F9', marginBottom: '6px' }}>2024년 창설 · 5기 활동 중</div>
                                <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>누적 회원 66명 달성 및 활발한 학회 활동 진행</div>
                            </div>
                        </div>

                        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(59,130,246,.18)', borderRadius: '16px', background: '#0E162D', padding: '24px' }}>
                            <CardWatermark />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ font: "600 12px 'JetBrains Mono',monospace", color: '#A78BFA', marginBottom: '8px' }}>CORE DOMAIN</div>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: '#F1F5F9', marginBottom: '6px' }}>리서치 · 분석 · 모의운용</div>
                                <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>기업리서치(Valuation) · 매크로 환경 분석 · 모의투자운용</div>
                            </div>
                        </div>

                        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(59,130,246,.18)', borderRadius: '16px', background: '#0E162D', padding: '24px' }}>
                            <CardWatermark />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ font: "600 12px 'JetBrains Mono',monospace", color: '#F59E0B', marginBottom: '8px' }}>NETWORK</div>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: '#F1F5F9', marginBottom: '6px' }}>금융권 재직자 네트워크</div>
                                <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>은행, 증권사, 자산운용사, 평가사 등 탄탄한 교류 유지 중</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* System of Consensus Navigation Section */}
            <section style={{ borderBottom: '1px solid rgba(59,130,246,.14)', background: '#0B1021', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: 'clamp(64px, 7vw, 96px) clamp(16px, 3vw, 32px)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <div style={{ font: "500 11px 'JetBrains Mono',monospace", letterSpacing: '.25em', color: '#10B981', textTransform: 'uppercase' }}>STRUCTURE & NAVIGATION</div>
                        <h2 style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(32px,4.5vw,52px)', letterSpacing: '-.02em', color: '#F1F5F9', textTransform: 'lowercase' }}>
                            system of consensus
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '24px' }}>
                        {menuItems.map((item) => {
                            const cardContent = (
                                <>
                                    <CardWatermark />
                                    <div className="nav-card-overlay" />
                                    <div className="nav-card-content">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                            <span style={{ font: "700 26px 'Space Grotesk',sans-serif", color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '.04em', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                                                {item.title}
                                            </span>
                                            <span style={{ font: "600 22px 'JetBrains Mono',monospace", color: '#10B981' }}>→</span>
                                        </div>
                                        <p className="nav-card-desc">
                                            {item.desc}
                                        </p>
                                    </div>
                                </>
                            );

                            if (item.isLink) {
                                return (
                                    <Link key={item.key} to={item.path} className="nav-card-item" style={{ backgroundImage: `url("${item.bgImage}")` }}>
                                        {cardContent}
                                    </Link>
                                );
                            }

                            return (
                                <div key={item.key} onClick={item.action} className="nav-card-item" style={{ backgroundImage: `url("${item.bgImage}")` }}>
                                    {cardContent}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section ref={curriculumRef} style={{ borderBottom: '1px solid rgba(59,130,246,.14)', background: '#0E162D', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: 'clamp(64px, 7vw, 96px) clamp(16px, 3vw, 32px)' }}>
                    <div style={{ font: "500 10.5px 'JetBrains Mono',monospace", letterSpacing: '.2em', color: '#3B82F6' }}>CURRICULUM · 5TH COHORT</div>
                    <h2 style={{ margin: '12px 0 36px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 'clamp(28px,3.8vw,44px)', color: '#F1F5F9' }}>리서치와 운용, 두 가지 핵심 트랙</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
                        {tracks.map((t, idx) => (
                            <div key={idx} style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(59,130,246,.18)', borderRadius: '16px', background: '#0B1225' }}>
                                <CardWatermark />
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={t.headStyle}>{t.name}</div>
                                    <div style={{ padding: '12px 0' }}>
                                        {t.rows.map((row, rIdx) => (
                                            <div key={rIdx} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '14px', padding: '15px 20px', borderBottom: '1px solid rgba(148,163,184,.07)' }}>
                                                <div style={{ font: "500 12px 'JetBrains Mono',monospace", color: '#475569' }}>{row.week}</div>
                                                <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#CBD5E1' }}>{row.task}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {histories.length > 0 && (
                <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px clamp(16px,3vw,32px)' }}>
                    <h3 style={{ color: '#F1F5F9' }}>백엔드 데이터 연혁</h3>
                    {histories.map((item) => (
                        <div key={item.id} style={{ color: '#94A3B8', marginTop: '8px' }}>
                            {item.year} - {item.content}
                        </div>
                    ))}
                </section>
            )}
        </main>
    );
}

export default AboutPage;