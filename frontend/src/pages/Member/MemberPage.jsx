import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

function MemberPage() {
    const [members, setMembers] = useState([]);

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

    const rawTeams = [
      { name: '리서치 1팀', dept: 'EQUITY RESEARCH', color: '#10B981', members: ['이서원', '송찬우', '전우탁', '유민아', '김서현', '최예린'] },
      { name: '리서치 2팀', dept: 'EQUITY RESEARCH', color: '#10B981', members: ['김하은', '소민준', '이재우', '최울', '정예슬', '박성빈'] },
      { name: '리서치 3팀', dept: 'EQUITY RESEARCH', color: '#10B981', members: ['임윤희', '권민규', '신재현', '서채원', '송민주', '양유나'] },
      { name: '매크로 · 투자운용팀', dept: 'MACRO & FUND', color: '#3B82F6', members: ['김정훈', '심윤기', '김민아', '최주연', '유영인', '강민영', '김민선'] }
    ];

    const depts = [
      { name: '기업리서치 부', code: 'EQUITY', color: '#10B981',
        lines: ['산업 섹터별 기업 선정', 'Top-down + Bottom-up 관점의 적정주가 산출', '투자포인트 및 리스크 요인 도출'],
        outputs: ['기업분석 리포트', 'Valuation 모델', '투자제안서'] },
      { name: '매크로 컨센서스 부', code: 'MACRO', color: '#3B82F6',
        lines: ['거시경제 동향 분석 기반 House-View 구축', '1억 규모 모의펀드 운용', '투자전략 및 리밸런싱 의사결정'],
        outputs: ['House View 리포트', '투자운용보고서', '리밸런싱 제안서'] },
      { name: '투자심의위원회', code: 'IC', color: '#A78BFA',
        lines: ['선배 기수 중심 투자 검토 조직', '투자제안의 타당성 질의 · 검토', '포트폴리오 편입 / 보류 / 재심의 결정'],
        outputs: ['투자심의 의결 회의록', '사후 모니터링 기준'] }
    ];

    return (
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(20px, 3vw, 40px) clamp(16px,3vw,32px)', background: '#0B1021', color: '#F1F5F9' }}>
            <div style={{ font: "500 10.5px 'JetBrains Mono',monospace", letterSpacing: '.2em', color: '#10B981', textAlign:'center' }}>MEMBER</div>
            <h2 style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 'clamp(26px,3.6vw,40px)', letterSpacing: '-.02em', color: '#F1F5F9', textAlign:'center' }}>5기 임원진</h2>
            <p style={{ margin: '12px auto 30px', maxWidth: '600px', fontSize: '14px', lineHeight: 1.7, color: '#94A3B8', textAlign: 'center' }}>CONSENSUS를 이끌어가는 5기 임원진입니다.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '16px', width: '100%' }}>
                {exec.map((m, idx) => (
                    <div key={idx} style={{ position: 'relative', border: '1px solid rgba(59,130,246,.18)', borderRadius: '14px', background: '#0E162D', overflow: 'hidden', padding: '16px' }}>
                        {/* 프로필 사진 영역 (추후 이미지 적용 가능) */}
                        <div style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px dashed rgba(148, 163, 184, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#64748B',
                            fontSize: '12px',
                            marginBottom: '14px'
                        }}>
                            {/* 추후 <img src="..." alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} /> 적용 */}
                            Profile Image
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
                            <div style={{ font: "600 16px 'IBM Plex Sans KR',sans-serif", color: '#F1F5F9' }}>{m.name}</div>
                            <div style={{ font: "400 9.5px 'JetBrains Mono',monospace", color: '#475569' }}>{m.cohort}</div>
                        </div>
                        <div style={{ marginTop: '6px', display: 'inline-flex', padding: '3px 9px', borderRadius: '6px', background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.28)', font: "600 10.5px 'IBM Plex Sans KR',sans-serif", color: '#10B981' }}>{m.role}</div>
                        <div style={{ marginTop: '11px', fontSize: '11.5px', color: '#64748B' }}>{m.major}</div>
                    </div>
                ))}
            </div>

            {/* 활동 부서 Section */}
            <div style={{ marginTop: 'clamp(44px,6vw,68px)' }}>
                <h3 style={{ margin: '0 0 6px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 'clamp(22px,2.8vw,32px)', color: '#F1F5F9' }}>활동 부서</h3>
                <p style={{ margin: '0 0 24px', fontSize: '14px', lineHeight: 1.7, color: '#94A3B8' }}>기업·매크로 분석 결과가 투자제안으로, 투자심의위원회 의결을 거쳐 Consensus Portfolio에 편입됩니다.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(292px,1fr))', gap: '16px' }}>
                    {depts.map((d, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(59,130,246,.18)', borderRadius: '16px', background: '#0E162D', overflow: 'hidden' }}>
                            <div style={{ height: '3px', background: `linear-gradient(90deg, ${d.color}, transparent)` }}></div>
                            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                                    <div style={{ font: "600 18px 'IBM Plex Sans KR',sans-serif", color: '#F1F5F9' }}>{d.name}</div>
                                    <span style={{ flex: 'none', padding: '4px 9px', borderRadius: '6px', font: "600 10px 'JetBrains Mono',monospace", color: d.color, background: d.color + '1a', border: '1px solid ' + d.color + '3d' }}>{d.code}</span>
                                </div>
                                <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {d.lines.map((l, lIdx) => (
                                        <div key={lIdx} style={{ display: 'flex', gap: '9px', fontSize: '13px', lineHeight: 1.6, color: '#CBD5E1' }}>
                                            <span style={{ color: '#10B981', fontFamily: "'JetBrains Mono',monospace" }}>→</span>
                                            <span>{l}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*{members.length > 0 && (*/}
            {/*    <div style={{ marginTop: '40px' }}>*/}
            {/*        <h3 style={{ color: '#F1F5F9' }}>백엔드 등록 임원진 목록</h3>*/}
            {/*        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '12px', marginTop: '12px' }}>*/}
            {/*            {members.map((member) => (*/}
            {/*                <div key={member.id} style={{ background: '#0E162D', padding: '12px', borderRadius: '8px', border: '1px solid rgba(59,130,246,.2)' }}>*/}
            {/*                    <p style={{ fontWeight: 600, color: '#F1F5F9' }}>{member.name} - {member.position}</p>*/}
            {/*                    <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>{member.intro}</p>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*<h3 style={{ margin: 'clamp(44px,6vw,68px) 0 6px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 'clamp(20px,2.6vw,28px)', color: '#F1F5F9' }}>5기 활동 조 편성</h3>*/}
            {/*<p style={{ margin: '0 0 24px', fontSize: '13.5px', color: '#94A3B8' }}>기업리서치 부 3팀, 매크로 컨센서스 부 1팀 · 총 25명</p>*/}
            {/*<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '16px' }}>*/}
            {/*    {rawTeams.map((t, idx) => (*/}
            {/*        <div key={idx} style={{ border: '1px solid rgba(59,130,246,.16)', borderRadius: '14px', background: '#0E162D', overflow: 'hidden' }}>*/}
            {/*            <div style={{ padding: '13px 16px', borderBottom: '1px solid rgba(148,163,184,.12)', font: "600 13.5px 'IBM Plex Sans KR',sans-serif", color: '#F1F5F9', background: `linear-gradient(90deg, ${t.color}1f, transparent)` }}>*/}
            {/*                {t.name}*/}
            {/*            </div>*/}
            {/*            <div style={{ padding: '8px 16px 12px' }}>*/}
            {/*                {t.members.map((name, mIdx) => (*/}
            {/*                    <div key={mIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', borderBottom: '1px solid rgba(148,163,184,.05)' }}>*/}
            {/*                        <span style={{ fontSize: '13px', color: '#E2E8F0' }}>{name}</span>*/}
            {/*                        {mIdx === 0 && <span style={{ marginLeft: 'auto', padding: '2px 7px', borderRadius: '5px', font: "600 9.5px 'IBM Plex Sans KR',sans-serif", color: t.color, background: t.color + '1a', border: '1px solid ' + t.color + '40' }}>팀장</span>}*/}
            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </main>
    );
}

export default MemberPage;