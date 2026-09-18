import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';

import ScrollIndicator from '../components/ScrollIndicator';
import SlideUpFade from '../components/SlideUpFade';

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
            { week: '14주차', task: '2차 활동 발표 (DCF 산출물)' }
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
            {/* Hero Section with Moving Animated Background */}
            <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.16)', minHeight: '100vh', paddingTop: '68px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', boxSizing: 'border-box' }}>
                <motion.div
                    initial={{ scale: 1, x: 0, y: 0 }}
                    animate={{
                        scale: [1, 1.12, 1.05, 1],
                        x: [0, -15, 15, 0],
                        y: [0, -10, 10, 0]
                    }}
                    transition={{
                        duration: 24,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut'
                    }}
                    style={{
                        position: 'absolute',
                        top: '-5%',
                        left: '-5%',
                        width: '110%',
                        height: '110%',
                        backgroundImage: "linear-gradient(rgba(12, 21, 38, 0.45), rgba(12, 21, 38, 0.75)), url('/bg_hero_buildings.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 1,
                        pointerEvents: 'none'
                    }}
                />
                <SlideUpFade yOffset={50} duration={0.8} style={{ width: '100%', position: 'relative', zIndex: 2 }}>
                    <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: 'clamp(32px,5vw,64px) 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', boxSizing: 'border-box' }}>
                        <div style={{ minWidth: 0, textAlign: 'left', maxWidth: '820px' }}>
                            <div style={{ font: "800 12px 'Pretendard', sans-serif", letterSpacing: '4px', color: '#9DC4EE', textTransform: 'uppercase', marginBottom: '18px', textAlign: 'left' }}>
                              CATHOLIC UNIV. FINANCE SOCIETY
                            </div>
                            <h1 style={{ margin: 0, fontFamily: "'Pretendard', sans-serif", fontWeight: 800, fontSize: 'clamp(40px,7vw,84px)', lineHeight: 1.08, letterSpacing: '-0.6px', background: 'linear-gradient(104deg,#FFFFFF 10%,#9DC4EE 50%,#D1E5FB 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textWrap: 'balance', textAlign: 'left' }}>
                                One Consensus,<br />Own Consensus
                            </h1>
                        </div>
                    </div>
                </SlideUpFade>
                <ScrollIndicator />
            </section>

            {/* Consensus Intro Section */}
            <section style={{ borderBottom: '1px solid rgba(255,255,255,0.16)', background: 'transparent', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '90px 24px 100px', boxSizing: 'border-box' }}>
                <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
                    <SlideUpFade delay={0.1} yOffset={45}>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '4px', color: '#9DC4EE', marginBottom: '18px' }}>
                                ABOUT
                            </div>
                            <h1 style={{ fontSize: 'clamp(32px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.6px', marginBottom: '36px', color: '#FFFFFF', fontFamily: "'Pretendard', sans-serif" }}>
                                ABOUT CONSENSUS
                            </h1>

                            <p style={{ fontSize: '15.5px', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', marginBottom: '22px', wordBreak: 'keep-all' }}>
                                Consensus는 2024년 창설된 가톨릭대학교 대학생 금융학회입니다.<br/>
                                금융투자협회 전국대학생투자동아리 연합회(UIC) 소속으로, 매 학기 금융 실무 역량을 쌓는 활동을 이어가고 있습니다.
                            </p>

                            <p style={{ fontSize: '15.5px', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', marginBottom: '22px', wordBreak: 'keep-all' }}>
                                기업가치평가(Valuation), 거시경제 환경분석(Macro), 모의투자운용(Portfolio)을 핵심 활동으로 삼아 <br/>
                                금융권 실무에 가까운 리서치 및 의사결정 과정을 경험할 수 있는 환경을 제공합니다.
                            </p>

                            <p style={{ fontSize: '15.5px', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', marginBottom: '22px', wordBreak: 'keep-all' }}>
                                산업별 기업 분석을 통해 적정주가와 투자포인트를 도출하는 기업리서치부<br/>
                                거시경제 환경 분석을 바탕으로 학회 고유의 House View를 수립하며 투자 포트폴리오를 운용하는 매크로 컨센서스부<br/>
                                그리고 각 부서의 투자 제안을 검토·의결하는 투자심의위원회까지<br/>
                                투자 아이디어 발굴부터 포트폴리오 편입과 성과 점검에 이르는 의사결정 전 과정을 경험할 수 있습니다.
                            </p>

                            <p style={{ fontSize: '15.5px', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', marginBottom: '28px', wordBreak: 'keep-all' }}>
                                은행, 증권사, 자산운용사, 신용평가사 등 금융권 현직 선배들과의 네트워크를 지속적으로 확대하며,<br/>
                                학문적 역량을 실무 경험으로 전환하고, 금융 커리어 기회로 연결될 수 있는 기반을 만들어가고 있습니다.
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '22px', padding: '16px 0 8px', margin: '24px 0 0' }}>
                                <div style={{ width: '3px', height: '36px', background: '#9DC4EE', borderRadius: '2px', flexShrink: 0 }} />
                                <div style={{ fontSize: 'clamp(18px,2.2vw,21px)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
                                    "One Consensus, Own Consensus"
                                </div>
                            </div>
                        </div>
                    </SlideUpFade>
                </div>
            </section>

            {/* System of Consensus Navigation Section (White background with gradient title) */}
            <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.16)', background: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '150px', paddingBottom: '60px', boxSizing: 'border-box' }}>
                <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                    <SlideUpFade yOffset={35}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <div style={{ font: "800 11px 'Pretendard',sans-serif", letterSpacing: '.25em', color: '#3B82F6', textTransform: 'uppercase' }}>STRUCTURE & NAVIGATION</div>
                            <h2 style={{ margin: '12px 0 0', fontFamily: "'Pretendard', sans-serif", fontWeight: 700, fontSize: 'clamp(32px,4.5vw,48px)', letterSpacing: '-.02em', background: 'linear-gradient(104deg, #0C1526 10%, #254065 50%, #5B95D6 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                SYSTEM OF CONSENSUS
                            </h2>
                        </div>
                    </SlideUpFade>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px' }}>
                        {menuItems.map((item, idx) => {
                            const cardContent = (
                                <>
                                    <div className="nav-card-overlay" style={{ background: 'linear-gradient(to bottom, rgba(12, 21, 38, 0.25), rgba(12, 21, 38, 0.65))' }} />
                                    <div className="nav-card-content">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                            <span style={{ font: "700 24px 'Pretendard', sans-serif", color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '.04em', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                                {item.title}
                                            </span>
                                            <span style={{ font: "600 20px 'Pretendard',sans-serif", color: '#FFFFFF', textShadow: '0 0 10px rgba(255,255,255,0.8)' }}>→</span>
                                        </div>
                                        <p className="nav-card-desc">
                                            {item.desc}
                                        </p>
                                    </div>
                                </>
                            );

                            if (item.isLink) {
                                return (
                                    <SlideUpFade key={item.key} delay={idx * 0.1} yOffset={40}>
                                        <Link to={item.path} className="nav-card-item" style={{ backgroundImage: `url("${item.bgImage}")`, border: '1px solid rgba(255,255,255,0.3)', borderRadius: '14px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)', display: 'block', height: '100%' }}>
                                            {cardContent}
                                        </Link>
                                    </SlideUpFade>
                                );
                            }

                            return (
                                <SlideUpFade key={item.key} delay={idx * 0.1} yOffset={40}>
                                    <div onClick={item.action} className="nav-card-item" style={{ backgroundImage: `url("${item.bgImage}")`, border: '1px solid rgba(255,255,255,0.3)', borderRadius: '14px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)', height: '100%' }}>
                                        {cardContent}
                                    </div>
                                </SlideUpFade>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section ref={curriculumRef} style={{ borderBottom: '1px solid rgba(255,255,255,0.16)', background: 'rgba(0,0,0,0.15)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: 'clamp(64px, 7vw, 96px) 24px' }}>
                    <SlideUpFade yOffset={35}>
                        <div style={{ font: "800 11px 'Pretendard',sans-serif", letterSpacing: '.2em', color: '#9DC4EE', marginBottom: '10px' }}>CURRICULUM · 5TH COHORT</div>
                        <h1 style={{ margin: '0 0 6px', fontFamily: "'Pretendard', sans-serif", fontWeight: 800, fontSize: 'clamp(32px,4vw,44px)', color: '#FFFFFF', letterSpacing: '-0.5px' }}>Two Tracks, One Consensus</h1>
                        <p style={{ margin: '0 0 36px', fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 'clamp(17px,2.2vw,22px)', color: 'rgba(255,255,255,0.78)' }}>각자의 분석이 하나의 결론으로</p>
                    </SlideUpFade>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '20px' }}>
                        {tracks.map((t, idx) => (
                            <SlideUpFade key={idx} delay={idx * 0.12} yOffset={45}>
                                <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', height: '100%' }}>
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div style={t.headStyle}>{t.name}</div>
                                        <div style={{ padding: '12px 0' }}>
                                            {t.rows.map((row, rIdx) => (
                                                <div key={rIdx} style={{ display: 'grid', gridTemplateColumns: '105px 1fr', gap: '14px', padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,.07)', alignItems: 'center' }}>
                                                    <div style={{ font: "700 13.5px 'Pretendard', sans-serif", color: '#9DC4EE', letterSpacing: '-0.2px' }}>{row.week}</div>
                                                    <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)' }}>{row.task}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SlideUpFade>
                        ))}
                    </div>
                </div>
            </section>

            {histories.length > 0 && (
                <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
                    <SlideUpFade yOffset={30}>
                        <h3 style={{ color: '#FFFFFF' }}>백엔드 데이터 연혁</h3>
                        {histories.map((item) => (
                            <div key={item.id} style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>
                                {item.year} - {item.content}
                            </div>
                        ))}
                    </SlideUpFade>
                </section>
            )}
        </main>
    );
}

export default AboutPage;