import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

function JoinUsPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState(0);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/subscribers', { email });
            setMessage('구독 완료! 모집 소식을 받아보실 수 있어요.');
            setEmail('');
        } catch (error) {
            setMessage('이미 등록된 이메일이거나 오류가 발생했어요.');
        }
    };

    const tabs = ['개인 가입', '단체 가입', '연합 세션 신청'];
    const panels = [
      { title: 'Individual Membership · 개인 가입', desc: '가톨릭대학교 재학생 개인 지원 경로입니다. 서류와 면접을 거쳐 기수 활동에 편성됩니다.' },
      { title: 'Club Membership · 단체 가입', desc: '신규 투자 동아리의 UIC 등록 프로세스입니다. 활동계획서 심사 후 연합 가입이 승인됩니다.' },
      { title: 'Joint Session · 연합 세션 신청', desc: '소속 동아리 간 교류 세션 신청입니다. 리서치 발표 교환 및 공동 심의 세션을 운영합니다.' }
    ];

    const timeline = [
      { title: '모집 공고', desc: '학회 SNS 및 UIC 채널 공고, 지원서 양식 배포' },
      { title: '서류 접수', desc: 'PDF 변환 지원서 제출, 접수 확인 회신' },
      { title: '서류 합격 발표', desc: '개별 문자 및 메일 통보' },
      { title: '개별 면접', desc: '20분 개별 면접 · 리서치 관심 분야 중심' },
      { title: '최종 발표 & OT',  desc: '최종 합격 통보 후 기수 오리엔테이션 진행' }
    ];

    return (
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(44px,6vw,76px) clamp(16px,3vw,32px)', background: '#0B1021', color: '#F1F5F9' }}>
            <div style={{ font: "500 10.5px 'JetBrains Mono',monospace", letterSpacing: '.2em', color: '#10B981' }}>JOIN US</div>
            <h2 style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 'clamp(26px,3.6vw,40px)', color: '#F1F5F9' }}>컨센서스에 합류하기</h2>
            <p style={{ margin: '12px 0 28px', maxWidth: '620px', fontSize: '14px', lineHeight: 1.7, color: '#94A3B8' }}>UIC 연합 가이드라인에 따라 가입 및 모집 소식을 전달해드립니다.</p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
                {tabs.map((label, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        style={{
                            padding: '10px 16px',
                            borderRadius: '999px',
                            font: "500 13px 'IBM Plex Sans KR',sans-serif",
                            cursor: 'pointer',
                            color: activeTab === idx ? '#04121b' : '#94A3B8',
                            background: activeTab === idx ? '#10B981' : 'rgba(59,130,246,.07)',
                            border: '1px solid ' + (activeTab === idx ? '#10B981' : 'rgba(59,130,246,.2)')
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '16px', alignItems: 'start' }}>
                <div style={{ border: '1px solid rgba(59,130,246,.18)', borderRadius: '16px', background: '#0E162D', padding: 'clamp(18px,2.6vw,26px)' }}>
                    <div style={{ font: "600 19px 'IBM Plex Sans KR',sans-serif", color: '#F1F5F9' }}>{panels[activeTab].title}</div>
                    <p style={{ margin: '10px 0 22px', fontSize: '13px', lineHeight: 1.7, color: '#94A3B8' }}>{panels[activeTab].desc}</p>

                    <form onSubmit={handleSubscribe} style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>모집 알림 받을 이메일</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                                required
                                style={{ flex: 1, padding: '12px 14px', borderRadius: '9px', border: '1px solid rgba(148,163,184,.18)', background: '#0B1225', color: '#F1F5F9', outline: 'none' }}
                            />
                            <button type="submit" style={{ padding: '12px 20px', borderRadius: '9px', background: '#10B981', color: '#04121b', fontWeight: 600, border: 'none', cursor: 'pointer' }}>구독하기</button>
                        </div>
                    </form>
                    {message && <p style={{ marginTop: '10px', fontSize: '13px', color: '#10B981' }}>{message}</p>}

                    <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(148,163,184,.1)' }}>
                        <a href={`${import.meta.env.VITE_API_BASE_URL || ''}/api/join-us/form`} style={{ display: 'inline-block', padding: '12px 18px', borderRadius: '8px', background: 'rgba(59,130,246,.15)', color: '#3B82F6', border: '1px solid rgba(59,130,246,.3)', textDecoration: 'none', fontWeight: 500, fontSize: '13px' }}>
                            📥 공식 지원서 다운로드
                        </a>
                    </div>
                </div>

                <div style={{ border: '1px solid rgba(59,130,246,.18)', borderRadius: '16px', background: '#0B1225', padding: 'clamp(18px,2.6vw,26px)' }}>
                    <div style={{ font: "500 10px 'JetBrains Mono',monospace", letterSpacing: '.16em', color: '#64748B' }}>RECRUITING TIMELINE</div>
                    <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {timeline.map((s, idx) => (
                            <div key={idx} style={{ borderLeft: '2px solid rgba(16,185,129,.4)', paddingLeft: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px' }}>
                                    <span style={{ font: "600 13.5px 'IBM Plex Sans KR',sans-serif", color: '#F1F5F9' }}>{s.title}</span>
                                    <span style={{ fontSize: '10px', color: s.status === '마감' ? '#64748B' : '#10B981' }}>[{s.status}]</span>
                                </div>
                                <div style={{ marginTop: '4px', font: "400 11.5px 'JetBrains Mono',monospace", color: '#64748B' }}>{s.when}</div>
                                <div style={{ marginTop: '4px', fontSize: '12px', color: '#94A3B8' }}>{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default JoinUsPage;