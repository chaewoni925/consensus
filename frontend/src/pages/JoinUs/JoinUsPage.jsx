import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import ScrollIndicator from '../../components/ScrollIndicator';

function JoinUsPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [openFaq, setOpenFaq] = useState(0); // Q1 open by default

    const timeline = [
        { num: '01', title: '모집 공고', desc: '학회 SNS 및 UIC 채널 공고, 지원서 양식 배포', tag: null },
        { num: '02', title: '서류 접수', desc: '지원서 제출, 접수 확인 회신', tag: null },
        { num: '03', title: '서류 합격 발표', desc: '개별 문자 및 메일 통보', tag: null },
        { num: '04', title: '개별 면접', desc: '20분 개별 면접 · 리서치 관심 분야 중심', tag: null },
        { num: '05', title: '최종 발표 & OT', desc: '최종 합격 통보 후 기수 오리엔테이션 진행', tag: 'FINAL' }
    ];

    const faqs = [
        {
            q: '지원 자격이 어떻게 되나요?',
            a: (
                <>
                    가톨릭대학교 재학·휴학·졸업생이라면 전공·학년 상관없이 모두 지원 가능합니다.<br />
                    숫자·재무제표를 배우고자 하는 <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>의지</strong>와 <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>팀 프로젝트에 꾸준히 참여할 수 있는지</strong>를 가장 중요하게 봅니다.
                </>
            )
        },
        {
            q: '활동 시간과 강도는 어느 정도인가요?',
            a: (
                <>
                    정기활동은 매주 금요일 <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>18:00~20:30(2시간 30분)</strong>이며, 시험 2주 전은 발표, 시험 주는 휴회입니다.<br />
                    팀 리서치·리포트·매거진 작업까지 포함하면 주당 5~8시간 정도의 시간 투자가 필요합니다.
                </>
            )
        },
        {
            q: '금융·회계 지식이 없어도 지원해도 되나요?',
            a: (
                <>
                    <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>가능합니다.</strong> 학기 초에 증권사 리포트 및 DART 이용법, 기초 Valuation 방법론 및 모델링 교육을 진행하고, <br/>선배들이 모델링을 같이 잡아주는 구조입니다. 다만 스스로 공부해보려는 의지가 중요합니다.
                </>
            )
        },
        {
            q: '한 학기 동안 어떤 걸 만들어 보나요?',
            a: (
                <>
                    기업리서치부는 기업 분석 리포트 및 Valuation 리포트를, 매크로 컨센서스부는 산업분석 리포트 및 카드뉴스 등을 만듭니다.<br />
                    이를 바탕으로 학회 펀드 참여, 투자심의위원회 포트폴리오 심의·운용, 투자결과 보고회 발표를 진행합니다.
                </>
            )
        },
        {
            q: '금융권 취업과 관련해 실질적으로 어떤 도움이 되나요?',
            a: (
                <>
                    학회에서 사용하는 Financial Modeling 엑셀 툴은 실무에서 사용하는 엑셀 모델링과 매우 밀접합니다.<br />
                    기업 분석·Valuation·매크로 분석·포트폴리오 운용 경험을 통해 금융·전략 직무 취업 시 강력한 실무 스토리를 만들 수 있습니다.
                </>
            )
        }
    ];

    const scrollToFaq = () => {
        const faqElement = document.getElementById('faq-section');
        if (faqElement) {
            faqElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main style={{ width: '100%', background: 'transparent', color: '#FFFFFF', fontFamily: "'Pretendard', sans-serif" }}>
            {/* 1st Viewport Section: Clean Modern Grid Layout */}
            <section style={{ minHeight: '100vh', maxWidth: '1280px', margin: '0 auto', padding: '120px 32px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
                
                {/* Top Eyebrow Header Line */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.16)', marginBottom: '56px' }}>
                    <div style={{ font: "800 11px 'Pretendard', sans-serif", letterSpacing: '2.5px', color: '#CBD5E1', textTransform: 'uppercase' }}>
                        CONSENSUS · JOIN US
                    </div>
                    <div style={{ font: "800 11px 'Pretendard', sans-serif", letterSpacing: '2.5px', color: '#CBD5E1', textTransform: 'uppercase' }}>
                        2026 RECRUITMENT
                    </div>
                </div>

                {/* Main 2-Column Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '64px', alignItems: 'start' }}>
                    
                    {/* Left Column: Headline, Description, CTA Buttons & Summary Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100%' }}>
                        <div>
                            {/* Original Blue JOIN US Eyebrow Badge Restored */}
                            <div style={{ font: "800 11px 'Pretendard',sans-serif", letterSpacing: '3px', color: '#9DC4EE', textTransform: 'uppercase', marginBottom: '14px', display: 'inline-block' }}>
                                JOIN US
                            </div>

                            {/* Main Large Headline */}
                            <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(36px, 4.5vw, 54px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px', color: '#FFFFFF' }}>
                                One Consensus,<br />
                                Own Consensus
                            </h1>

                            {/* Subtitle Description */}
                            <p style={{ margin: '0 0 36px', fontSize: '15px', lineHeight: 1.75, color: '#CBD5E1', maxWidth: '480px' }}>
                                가톨릭대학교 금융학회 CONSENSUS의 신입 학회원 모집 및 지원 안내입니다.<br />
                                공식 지원서를 내려받아 작성한 뒤 PDF로 변환해 제출해 주세요.
                            </p>

                            {/* Action Buttons Row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '56px' }}>
                                {/* Primary Black Solid Button style (dark theme styled) */}
                                <a
                                    href="/Consensus_5th_Application_Form.docx"
                                    download="Consensus_5기_입회_신청서.docx"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '14px 22px',
                                        borderRadius: '8px',
                                        background: '#FFFFFF',
                                        color: '#0D1322',
                                        fontSize: '14px',
                                        fontWeight: 800,
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 4px 14px rgba(255,255,255,0.15)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#E2E8F0';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#FFFFFF';
                                        e.currentTarget.style.transform = 'none';
                                    }}
                                >
                                    <span>공식 지원서 다운로드</span>
                                    <span style={{ fontSize: '15px' }}>↓</span>
                                </a>

                                {/* Secondary Outline Button */}
                                <button
                                    onClick={scrollToFaq}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '14px 22px',
                                        borderRadius: '8px',
                                        background: 'transparent',
                                        color: '#FFFFFF',
                                        border: '1px solid rgba(255,255,255,0.25)',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#FFFFFF';
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <span>제출 방법 보기</span>
                                </button>
                            </div>
                        </div>

                        {/* Bottom 3-Cell Info Table Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
                            <div style={{ padding: '16px 18px', borderRight: '1px solid rgba(255,255,255,0.16)' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#CBD5E1', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>FORMAT</div>
                                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>Word → PDF</div>
                            </div>
                            <div style={{ padding: '16px 18px', borderRight: '1px solid rgba(255,255,255,0.16)' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#CBD5E1', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>FILE NAME</div>
                                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>이름_지원서.pdf</div>
                            </div>
                            <div style={{ padding: '16px 18px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#CBD5E1', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>INTERVIEW</div>
                                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>개별 20분</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Clean Minimalist Timeline List */}
                    <div style={{ paddingLeft: 'clamp(0px, 2vw, 24px)' }}>
                        {/* Section Header */}
                        <div style={{ font: "800 11px 'Pretendard', sans-serif", letterSpacing: '2px', color: '#CBD5E1', textTransform: 'uppercase', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.16)', marginBottom: '8px' }}>
                            RECRUITING TIMELINE
                        </div>

                        {/* List Items with Divider Lines */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {timeline.map((step, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '20px',
                                        padding: '20px 0',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    {/* Number Column */}
                                    <span style={{ fontSize: '13px', fontFamily: 'monospace', fontWeight: 700, color: '#CBD5E1', paddingTop: '2px', flexShrink: 0 }}>
                                        {step.num}
                                    </span>

                                    {/* Content Column */}
                                    <div style={{ flexGrow: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>
                                                {step.title}
                                            </h3>
                                            {step.tag && (
                                                <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800, background: '#FFFFFF', color: '#0D1322', letterSpacing: '0.5px' }}>
                                                    {step.tag}
                                                </span>
                                            )}
                                        </div>
                                        <p style={{ margin: 0, fontSize: '13.5px', color: '#CBD5E1', lineHeight: 1.5 }}>
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Timeline Footer Note */}
                        <div style={{ marginTop: '24px', fontSize: '12.5px', color: '#CBD5E1' }}>
                            * 세부 일정은 진행 상황에 따라 변경될 수 있습니다.
                        </div>
                    </div>

                </div>

                {/* Bottom Scroll Cue */}
                <div style={{ textAlign: 'center', marginTop: '48px', cursor: 'pointer' }} onClick={scrollToFaq}>
                    <ScrollIndicator />
                </div>
            </section>

            {/* 2nd Viewport Section: FAQ Section */}
            <section id="faq-section" style={{ minHeight: '100vh', maxWidth: '960px', margin: '0 auto', padding: '100px 24px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' }}>
                <div style={{ font: "800 12px 'Pretendard',sans-serif", letterSpacing: '4px', color: '#9DC4EE' }}>FAQ</div>
                <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '14px', color: '#FFFFFF' }}>자주 묻는 질문</h2>
                <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '40px' }}>
                    Consensus 지원을 고민하고 있다면, 아래 질문들을 먼저 확인해보세요.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {faqs.map((faq, idx) => {
                        const isOpen = openFaq === idx;
                        return (
                            <div
                                key={idx}
                                style={{
                                    borderTop: '1px solid rgba(255,255,255,0.16)',
                                    borderBottom: idx === faqs.length - 1 ? '1px solid rgba(255,255,255,0.16)' : 'none'
                                }}
                            >
                                <div
                                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '20px',
                                        padding: '26px 4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#9DC4EE', flexShrink: 0 }}>Q{idx + 1}</span>
                                        <span style={{ fontSize: '16.5px', fontWeight: 700, color: '#FFFFFF' }}>{faq.q}</span>
                                    </div>
                                    <div style={{
                                        flexShrink: 0,
                                        width: '22px',
                                        height: '22px',
                                        border: '1px solid rgba(255,255,255,0.35)',
                                        borderRadius: '50%',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            width: '9px',
                                            height: '1.4px',
                                            background: '#FFFFFF'
                                        }} />
                                        {!isOpen && (
                                            <span style={{
                                                position: 'absolute',
                                                width: '1.4px',
                                                height: '9px',
                                                background: '#FFFFFF'
                                            }} />
                                        )}
                                    </div>
                                </div>
                                {isOpen && (
                                    <div style={{
                                        padding: '0 4px 30px 40px',
                                        fontSize: '14px',
                                        lineHeight: 1.85,
                                        color: 'rgba(255,255,255,0.78)',
                                        maxWidth: '780px'
                                    }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    marginTop: '60px',
                    paddingTop: '32px',
                    borderTop: '1px solid rgba(255,255,255,0.16)',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.55)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                }}>
                    <span>더 궁금한 점이 있다면 consensus1441@gmail.com으로 문의해주세요.</span>
                    <span>CONSENSUS · SINCE 2024</span>
                </div>
            </section>
        </main>
    );
}

export default JoinUsPage;