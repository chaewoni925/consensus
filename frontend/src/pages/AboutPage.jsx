import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

import ScrollIndicator from '../components/ScrollIndicator';

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
          headStyle: { padding: '14px 16px', borderBottom: '1px solid rgba(157,196,238,.22)', font: '600 14px "Pretendard",sans-serif', color: '#FFFFFF', background: 'linear-gradient(90deg,rgba(157,196,238,.14),transparent)' },
          rows: [
            { week: '1주차', task: '1차 과제 · 섹터별 기업 선정' },
            { week: '2–5주차', task: '조별활동 · P/E 상대가치 밸류에이션' },
            { week: '6주차', task: '1차 활동 발표 (P/E Valuation 산출물)' },
            { week: '9주차', task: 'DCF Valuation 강의 · 기업 재선정' },
            { week: '10–13주차', task: '조별활동 · DCF 모델링' },
            { week: '14주차', task: '2차 활동 발표 (DCF 산출물) · 노스크립트 필수' }
          ] },
        { name: '매크로 컨센서스 (House-View · 운용)',
          headStyle: { padding: '14px 16px', borderBottom: '1px solid rgba(157,196,238,.22)', font: '600 14px "Pretendard",sans-serif', color: '#FFFFFF', background: 'linear-gradient(90deg,rgba(157,196,238,.14),transparent)' },
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
        <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0C1526 0%, #16233B 45%, #2C4A6E 100%)', overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.16)', minHeight: '100vh', paddingTop: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', backgroundImage: "linear-gradient(rgba(12, 21, 38, 0.4), rgba(12, 21, 38, 0.7)), url('/bg_hero_buildings.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: 'clamp(32px,5vw,64px) 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', boxSizing: 'border-box' }}>
                    <div style={{ minWidth: 0, animation: 'riseIn .7s ease-out both', textAlign: 'left', maxWidth: '820px' }}>
                        <div style={{ font: "800 12px pretendard", letterSpacing: '4px', color: '#9DC4EE', textTransform: 'uppercase', marginBottom: '18px' }}>
                          CATHOLIC UNIV. FINANCE SOCIETY
                        </div>
                        <h1 style={{ margin: 0, fontFamily: "'Space Grotesk', -apple-system, sans-serif", fontWeight: 800, fontSize: 'clamp(40px,7vw,84px)', lineHeight: 1.08, letterSpacing: '-0.6px', background: 'linear-gradient(104deg,#FFFFFF 10%,#9DC4EE 50%,#D1E5FB 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textWrap: 'balance' }}>
                            One Consensus,<br />Own Consensus
                        </h1>
                    </div>
                </div>

                {/* Scroll Indicator (hides near page bottom) */}
                <ScrollIndicator />
            </section>

            {/* Consensus Intro Section (Matching exact attached About HTML + Logo Layout) */}
            <section style={{ borderBottom: '1px solid rgba(255,255,255,0.16)', background: 'transparent', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '90px 24px 100px', boxSizing: 'border-box' }}>
                <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '4px', color: '#9DC4EE', marginBottom: '18px' }}>
                            ABOUT
                        </div>
                        <h1 style={{ fontSize: 'clamp(32px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.6px', marginBottom: '36px', color: '#FFFFFF', fontFamily: "'Pretendard', sans-serif" }}>
                            ABOUT CONSENSUS
                        </h1>

                        <p style={{ fontSize: '15.5px', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', marginBottom: '22px', wordBreak: 'keep-all' }}>
                            Consensus는 2024년 가톨릭대학교에서 결성된 대학생 투자·리서치 학회입니다. UIC(전국대학교투자동아리연합회) 소속 가톨릭대학교 지부로서 창설 이후 매 학기 신입 기수를 맞이하며 현재 5기까지 이어져 왔고, 누적 회원 수는 66명에 이릅니다.
                        </p>

                        <p style={{ fontSize: '15.5px', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', marginBottom: '22px', wordBreak: 'keep-all' }}>
                            학회의 중심에는 <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>기업리서치(Valuation)</strong>, <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>매크로 환경 분석</strong>, <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>모의투자운용</strong>이라는 세 가지 활동 축이 있습니다. 산업 섹터별 기업을 선정해 적정주가와 투자포인트를 도출하는 기업리서치 부, 거시경제를 분석해 학회 자체의 House-View를 세우고 모의펀드를 운용하는 매크로 컨센서스 부, 그리고 두 부서의 투자제안을 검토·의결하는 투자심의위원회까지 —
                            <br/> 실제 투자 조직의 의사결정 구조를 학회 안에서 그대로 경험합니다.
                        </p>

                        <p style={{ fontSize: '15.5px', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', marginBottom: '28px', wordBreak: 'keep-all' }}>
                            아직 짧은 역사지만, 은행·증권사·자산운용사·평가사 등 금융권에 재직 중인 선배들과의 네트워크를 꾸준히 쌓아가며 <br/>학회 활동이 현장과 이어질 수 있도록 기반을 다지고 있습니다.
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '22px', padding: '16px 0 8px', margin: '24px 0 0' }}>
                            <div style={{ width: '3px', height: '36px', background: '#9DC4EE', borderRadius: '2px', flexShrink: 0 }} />
                            <div style={{ fontSize: 'clamp(18px,2.2vw,21px)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
                                "One Consensus, Own Consensus"
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Consensus Logo Only (Semi-transparent) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.2, transition: 'opacity 0.3s ease' }}>
                        <img src="/logo.png" alt="CONSENSUS Logo" style={{ width: '290px', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.6))' }} />
                        <div style={{ marginTop: '20px', font: "800 18px 'Space Grotesk', sans-serif", letterSpacing: '2.5px', color: '#FFFFFF' }}>CONSENSUS</div>
                        <div style={{ marginTop: '6px', font: "600 12px 'JetBrains Mono', monospace", letterSpacing: '2px', color: '#9DC4EE' }}>SINCE 2024</div>
                    </div>
                </div>
            </section>

            {/* System of Consensus Navigation Section (White background with gradient title) */}
            <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.16)', background: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '150px', paddingBottom: '60px', boxSizing: 'border-box' }}>
                <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ font: "800 11px 'JetBrains Mono',monospace", letterSpacing: '.25em', color: '#3B82F6', textTransform: 'uppercase' }}>STRUCTURE & NAVIGATION</div>
                        <h2 style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(32px,4.5vw,48px)', letterSpacing: '-.02em', background: 'linear-gradient(104deg, #0C1526 10%, #254065 50%, #5B95D6 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            SYSTEM OF CONSENSUS
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px' }}>
                        {menuItems.map((item) => {
                            const cardContent = (
                                <>
                                    <div className="nav-card-overlay" style={{ background: 'linear-gradient(to bottom, rgba(12, 21, 38, 0.25), rgba(12, 21, 38, 0.65))' }} />
                                    <div className="nav-card-content">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                            <span style={{ font: "700 24px 'Space Grotesk',sans-serif", color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '.04em', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                                {item.title}
                                            </span>
                                            <span style={{ font: "600 20px 'JetBrains Mono',monospace", color: '#FFFFFF', textShadow: '0 0 10px rgba(255,255,255,0.8)' }}>→</span>
                                        </div>
                                        <p className="nav-card-desc">
                                            {item.desc}
                                        </p>
                                    </div>
                                </>
                            );

                            if (item.isLink) {
                                return (
                                    <Link key={item.key} to={item.path} className="nav-card-item" style={{ backgroundImage: `url("${item.bgImage}")`, border: '1px solid rgba(255,255,255,0.3)', borderRadius: '14px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
                                        {cardContent}
                                    </Link>
                                );
                            }

                            return (
                                <div key={item.key} onClick={item.action} className="nav-card-item" style={{ backgroundImage: `url("${item.bgImage}")`, border: '1px solid rgba(255,255,255,0.3)', borderRadius: '14px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
                                    {cardContent}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section ref={curriculumRef} style={{ borderBottom: '1px solid rgba(255,255,255,0.16)', background: 'rgba(0,0,0,0.15)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: 'clamp(64px, 7vw, 96px) 24px' }}>
                    <div style={{ font: "800 10.5px 'JetBrains Mono',monospace", letterSpacing: '.2em', color: '#9DC4EE' }}>CURRICULUM · 5TH COHORT</div>
                    <h2 style={{ margin: '20px 0 36px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(28px,3.8vw,40px)', color: '#FFFFFF'}}>두 개의 트랙, 하나의 컨센서스</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '20px' }}>
                        {tracks.map((t, idx) => (
                            <div key={idx} style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '14px', background: 'rgba(255,255,255,0.05)' }}>
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={t.headStyle}>{t.name}</div>
                                    <div style={{ padding: '12px 0' }}>
                                        {t.rows.map((row, rIdx) => (
                                            <div key={rIdx} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '14px', padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                                                <div style={{ font: "600 12px 'JetBrains Mono',monospace", color: '#9DC4EE' }}>{row.week}</div>
                                                <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)' }}>{row.task}</div>
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
                <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
                    <h3 style={{ color: '#FFFFFF' }}>백엔드 데이터 연혁</h3>
                    {histories.map((item) => (
                        <div key={item.id} style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>
                            {item.year} - {item.content}
                        </div>
                    ))}
                </section>
            )}
        </main>
    );
}

export default AboutPage;