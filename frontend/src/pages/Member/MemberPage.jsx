import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

function MemberPage() {
    const [members, setMembers] = useState([]);
    const [activeHoverStep, setActiveHoverStep] = useState(null); // No modal shown by default

    useEffect(() => {
        axiosInstance.get('/api/members')
            .then((response) => setMembers(response.data))
            .catch((error) => console.error(error));
    }, []);

    const exec = [
      { name: '김정훈', role: '학회장', cohort: '5기 / 4기', major: '회계학과 22', insta: '@jh.kim', kakao: 'consensus_jh',
        intro: '숫자보다 논리를 먼저 봅니다. 학회 운영 총괄과 매크로 컨센서스 부를 담당합니다.',
        bullets: ['풍산 · HPSP 기업리서치 참여', '학회 운영 총괄 · 매크로 컨센서스 부'] },
      { name: '권우석', role: '부학회장', cohort: '5기 / 3기', major: '경제학과 22', insta: '@ws.kwon', kakao: 'consensus_ws',
        intro: 'DCF는 가정의 예술입니다. 교육 총괄로 밸류에이션 커리큘럼을 설계합니다.',
        bullets: ['삼성중공업 · 대한전선 · 풍산 · HPSP 리서치', '교육 총괄 · 기업리서치 부'] },
      { name: '임윤희', role: '조직관리담당', cohort: '5기 / 4기', major: '회계학과 24', insta: '@yh.lim', kakao: 'consensus_yh',
        intro: '기록이 남는 조직이 오래 갑니다. 출결과 조직 운영을 맡고 있습니다.',
        bullets: ['한화엔진 · 넥센타이어 리서치 참여', '학회원 출결 관리 · 조직 운영'] },
      { name: '이서원', role: '대외협력담당', cohort: '5기 / 4기', major: '경제학과 24', insta: '@sw.lee', kakao: 'consensus_sw',
        intro: '학회 밖에서 배우는 것이 절반입니다. UIC 소통과 연합세션을 추진합니다.',
        bullets: ['씨앤씨인터내셔널 · HPSP 리서치 참여', 'UIC 소통 · 연합세션 · 외부 네트워크'] },
      { name: '김하은', role: '내부소통담당', cohort: '5기 / 4기', major: '경제학과 24', insta: '@he.kim', kakao: 'consensus_he',
        intro: '누구도 혼자 남지 않게. 학회원 만족도 점검과 소통 창구를 운영합니다.',
        bullets: ['한화엔진 · HPSP 리서치 참여', '학회원 만족도 점검 · 소통 창구'] }
    ];

    const depts = [
      { name: '기업리서치 부', tag: 'EQUITY', color: '#9DC4EE',
        bullets: ['산업 섹터별 기업 선정', 'Top-down + Bottom-up 관점의 적정주가 산출', '투자포인트 및 리스크 요인 도출'],
        outputs: ['기업분석 리포트', 'Valuation 모델', '투자제안서'] },
      { name: '매크로 컨센서스 부', tag: 'MACRO', color: '#9DC4EE',
        bullets: ['거시경제 동향 분석 기반 House-View 구축', '1억 규모 모의펀드 운용', '투자전략 및 리밸런싱 의사결정'],
        outputs: ['House View 리포트', '투자운용보고서', '리밸런싱 제안서'] },
      { name: '투자심의위원회', tag: 'IC', color: '#9DC4EE',
        bullets: ['선배 기수 중심 투자 검토 조직', '투자제안의 타당성 질의·검토', '포트폴리오 편입 / 보류 / 재심의 결정'],
        outputs: ['투자심의 의결 회의록', '사후 모니터링 기준'] }
    ];

    const pipelineSteps = [
      {
        num: 1,
        title: '기업리서치 부',
        sub: '적정주가 및 투자포인트 도출',
        tipTitle: '기업리서치 부 — Equity Research',
        bullets: ['산업 섹터별 기업 선정', 'Top-down + Bottom-up 적정주가 산출', '투자포인트 및 리스크 요인 도출'],
        outputs: ['기업분석 리포트', 'Valuation 모델', '투자제안서']
      },
      {
        num: 2,
        title: '매크로 컨센서스 부',
        sub: 'House-View 기반 포트폴리오 제안',
        tipTitle: '매크로 컨센서스 부 — Macro Research',
        bullets: ['거시경제 동향 분석 기반 House-View 구축', '1억 규모 모의펀드 운용', '투자전략 및 리밸런싱 의사결정'],
        outputs: ['House View 리포트', '투자운용보고서', '리밸런싱 제안서']
      },
      {
        num: 3,
        title: '투자심의위원회',
        sub: '타당성 검토 및 편입 의결',
        tipTitle: '투자심의위원회 — Investment Committee',
        bullets: ['선배 기수 중심 투자 검토 조직', '투자제안의 타당성 질의·검토', '포트폴리오 편입 / 보류 / 재심의 결정'],
        outputs: ['투자심의 의결 회의록', '사후 모니터링 기준']
      },
      {
        num: 4,
        title: 'Consensus Portfolio',
        sub: '최종 편입 및 리밸런싱',
        tipTitle: 'Consensus Portfolio — 최종 편입',
        bullets: ['기업리서치·매크로 제안이 최종 반영된\n학회 공식 포트폴리오', '분기별 리밸런싱 및 투자 결과 보고'],
        outputs: ['투자운용결과보고서', '분기 리밸런싱 기록']
      }
    ];

    return (
        <main style={{ width: '100%', background: 'transparent', color: '#FFFFFF' }}>
            {/* 1st Viewport Section: Member Header & Executive List */}
            <section style={{ minHeight: '100vh', maxWidth: '1240px', margin: '0 auto', padding: '140px 24px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>
                {/* Header Title */}
                <div style={{ textAlign: 'center', marginBottom: '48px', marginTop: '5px' }}>
                    <div style={{ font: "800 11px 'Pretendard',sans-serif", letterSpacing: '4px', color: '#9DC4EE', textTransform: 'uppercase', marginBottom: '16px' }}>MEMBER & ORGANIZATION</div>
                    <h2 style={{ margin: '0 0 12px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-.02em', color: '#FFFFFF' }}>5기 임원진</h2>
                    <p style={{ margin: '0 auto', maxWidth: '600px', fontSize: '14.5px', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)' }}>CONSENSUS를 이끌어가는 5기 임원진입니다.</p>
                </div>

                {/* Executives Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', width: '100%' }}>
                    {exec.map((m, idx) => (
                        <div key={idx} style={{ position: 'relative', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden', padding: '20px' }}>
                            <div style={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px dashed rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: '12px',
                                marginBottom: '14px'
                            }}>
                                Profile Image
                            </div>

                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
                                <div style={{ font: "800 16px 'Pretendard',sans-serif", color: '#FFFFFF' }}>{m.name}</div>
                                <div style={{ font: "600 10px 'Pretendard',sans-serif", color: '#9DC4EE' }}>{m.cohort}</div>
                            </div>
                            <div style={{ marginTop: '6px', display: 'inline-flex', padding: '4px 10px', borderRadius: '6px', background: 'rgba(157,196,238,0.18)', border: '1px solid rgba(157,196,238,0.3)', font: "700 11px 'Pretendard',sans-serif", color: '#C9E0FA' }}>{m.role}</div>
                            <div style={{ marginTop: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{m.major}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2nd Viewport Section: 활동 부서 Section */}
            <section style={{ minHeight: '100vh', maxWidth: '1240px', margin: '0 auto', padding: '150px 24px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxSizing: 'border-box', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>
                <div style={{ font: "800 12px 'Pretendard',sans-serif", letterSpacing: '4px', color: '#9DC4EE', marginBottom: '16px' }}>ACTIVITIES</div>
                <h1 style={{ margin: '0 0 16px 0', fontSize: 'clamp(32px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.6px', color: '#FFFFFF' }}>활동 부서</h1>
                <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, whiteSpace: 'normal', marginBottom: '60px' }}>
                    기업·매크로 분석 결과가 투자제안으로 이어지고, 투자심의위원회 의결을 거쳐 Consensus Portfolio에 편입됩니다.
                </p>

                {/* 3 Department Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '22px' }}>
                    {depts.map((d, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '3px', width: '100%', background: '#9DC4EE' }} />
                            <div style={{ padding: '26px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>{d.name}</div>
                                    <div style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.5px', padding: '5px 11px', borderRadius: '6px', background: 'rgba(157,196,238,0.18)', color: '#C9E0FA', fontFamily: "'Pretendard', sans-serif" }}>{d.tag}</div>
                                </div>
                                <ul style={{ listStyle: 'none', margin: '0 0 22px 0', padding: 0 }}>
                                    {d.bullets.map((b, bIdx) => (
                                        <li key={bIdx} style={{ display: 'flex', gap: '9px', fontSize: '13px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, marginBottom: '11px' }}>
                                            <span style={{ color: '#9DC4EE', fontWeight: 700 }}>→</span>
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ marginTop: 'auto', borderTop: '1px dashed rgba(255,255,255,0.18)', paddingTop: '18px' }}>
                                    <div style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '1.4px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>핵심 산출물</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {d.outputs.map((out, oIdx) => (
                                            <span key={oIdx} style={{ fontSize: '11.5px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.16)', padding: '6px 12px', borderRadius: '20px', whiteSpace: 'nowrap' }}>{out}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3rd Section: Interactive Decision Pipeline Stepper Section (Compact Auto Height) */}
            <section style={{ minHeight: 'auto', maxWidth: '1240px', margin: '0 auto', padding: '100px 24px 240px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxSizing: 'border-box' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '3px', color: '#9DC4EE', marginBottom: '16px' }}>DECISION PIPELINE</div>
                <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.4px', marginBottom: '32px', color: '#FFFFFF' }}>분석에서 편입까지, 하나의 흐름</div>

                <div style={{ position: 'relative', marginTop: '40px' }}>
                    {/* Connecting Line */}
                    <div style={{ position: 'absolute', top: '19px', left: '40px', right: '40px', height: '1px', background: 'rgba(255,255,255,0.22)', zIndex: 0 }} />

                    <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                        {pipelineSteps.map((step, sIdx) => {
                            const isHovered = activeHoverStep === sIdx;
                            return (
                                <div
                                    key={sIdx}
                                    onMouseEnter={() => setActiveHoverStep(sIdx)}
                                    onMouseLeave={() => setActiveHoverStep(null)}
                                    style={{ flex: 1, textAlign: 'center', position: 'relative', cursor: 'pointer' }}
                                >
                                    <div style={{
                                        width: '38px',
                                        height: '38px',
                                        borderRadius: '50%',
                                        background: isHovered ? '#9DC4EE' : 'rgba(255,255,255,0.08)',
                                        border: isHovered ? '1.5px solid #9DC4EE' : '1.5px solid rgba(255,255,255,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 16px',
                                        fontSize: '14px',
                                        fontWeight: 800,
                                        color: isHovered ? '#0C1526' : 'rgba(255,255,255,0.65)',
                                        boxShadow: isHovered ? '0 0 0 5px rgba(157,196,238,0.22)' : 'none',
                                        transition: 'all 0.2s ease'
                                    }}>
                                        {step.num}
                                    </div>
                                    <div style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '6px', color: isHovered ? '#9DC4EE' : '#FFFFFF', transition: 'color 0.2s ease' }}>
                                        {step.title}
                                    </div>
                                    <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, padding: '0 8px' }}>
                                        {step.sub}
                                    </div>

                                    {/* Tooltip Card */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '110px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '360px',
                                        background: '#16233B',
                                        border: '1px solid rgba(255,255,255,0.18)',
                                        borderRadius: '12px',
                                        padding: '20px 20px 18px',
                                        textAlign: 'left',
                                        boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
                                        opacity: isHovered ? 1 : 0,
                                        visibility: isHovered ? 'visible' : 'hidden',
                                        transition: 'all 0.2s ease',
                                        zIndex: 10,
                                        whiteSpace: 'normal',
                                        wordBreak: 'keep-all'
                                    }}>
                                        <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '12px', height: '12px', background: '#16233B', borderLeft: '1px solid rgba(255,255,255,0.18)', borderTop: '1px solid rgba(255,255,255,0.18)' }} />
                                        <div style={{ fontSize: '13.5px', fontWeight: 800, marginBottom: '12px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>{step.tipTitle}</div>
                                        <ul style={{ listStyle: 'none', margin: '0 0 14px 0', padding: 0 }}>
                                            {step.bullets.map((b, bIdx) => (
                                                <li key={bIdx} style={{ display: 'flex', gap: '7px', fontSize: '12px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, marginBottom: '7px', whiteSpace: 'pre-line' }}>
                                                    <span style={{ color: '#9DC4EE', fontWeight: 700 }}>→</span>
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.14)' }}>
                                            {step.outputs.map((out, oIdx) => (
                                                <span key={oIdx} style={{ fontSize: '10.5px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', padding: '4px 10px', borderRadius: '16px' }}>{out}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/*<div style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '220px' }}>*/}
                {/*    각 단계에 마우스를 올리면 상세 활동이 나타납니다*/}
                {/*</div>*/}
            </section>
        </main>
    );
}

export default MemberPage;