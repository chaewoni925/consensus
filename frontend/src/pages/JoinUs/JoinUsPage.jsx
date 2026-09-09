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
        <main style={{ minHeight: '100vh', padding: '150px 24px 100px', background: 'transparent', color: '#FFFFFF', boxSizing: 'border-box' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div style={{ font: "800 12px 'JetBrains Mono',monospace", letterSpacing: '4px', color: '#9DC4EE', textTransform: 'uppercase', marginBottom: '16px' }}>JOIN US</div>
                    <h1 style={{ margin: 0, fontFamily: "'Pretendard', sans-serif", fontWeight: 800, fontSize: 'clamp(32px,4vw,44px)', letterSpacing: '-0.6px', color: '#FFFFFF' }}>RECRUITMENT</h1>
                    <p style={{ margin: '14px auto 0', maxWidth: '620px', fontSize: '15px', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.75)', whiteSpace:'nowrap', wordBreak: 'keep-all' }}>
                        UIC(전국대학교투자동아리연합회) 가이드라인에 따라 가입 절차 및 신입 기수 모집 알림을 안내해 드립니다.
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
                    {tabs.map((label, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTab(idx)}
                            style={{
                                padding: '10px 22px',
                                borderRadius: '30px',
                                font: "600 14px 'Pretendard',sans-serif",
                                cursor: 'pointer',
                                color: activeTab === idx ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                                background: activeTab === idx ? 'linear-gradient(90deg, rgba(157,196,238,0.25), rgba(157,196,238,0.15))' : 'rgba(255,255,255,0.05)',
                                border: '1px solid ' + (activeTab === idx ? '#9DC4EE' : 'rgba(255,255,255,0.15)'),
                                boxShadow: activeTab === idx ? '0 0 16px rgba(157,196,238,0.2)' : 'none',
                                transition: 'all 0.25s ease'
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px', alignItems: 'stretch' }}>
                    {/* Left Panel - Application & Subscription */}
                    <div style={{ border: '1px solid rgba(255,255,255,0.16)', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: 'clamp(24px,3vw,36px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ font: "800 20px 'Pretendard',sans-serif", color: '#FFFFFF', marginBottom: '12px' }}>{panels[activeTab].title}</div>
                            <p style={{ margin: '0 0 28px', fontSize: '14.5px', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', wordBreak: 'keep-all' }}>{panels[activeTab].desc}</p>

                            <form onSubmit={handleSubscribe} style={{ marginTop: '24px' }}>
                                <label style={{ display: 'block', font: "600 12px 'Pretendard',sans-serif", color: '#9DC4EE', marginBottom: '8px', letterSpacing: '0.05em' }}>모집 알림 받을 이메일</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@email.com"
                                        required
                                        style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.25)', color: '#FFFFFF', outline: 'none', font: "14px 'Pretendard',sans-serif" }}
                                    />
                                    <button type="submit" style={{ padding: '12px 22px', borderRadius: '10px', background: '#9DC4EE', color: '#0C1526', fontWeight: 700, border: 'none', cursor: 'pointer', font: "14px 'Pretendard',sans-serif", transition: 'all 0.2s ease' }}>구독하기</button>
                                </div>
                            </form>
                            {message && <p style={{ marginTop: '12px', fontSize: '13.5px', color: '#9DC4EE', fontWeight: 600 }}>{message}</p>}
                        </div>

                        <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                            <a href={`${import.meta.env.VITE_API_BASE_URL || ''}/api/join-us/form`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '10px', background: 'rgba(157,196,238,0.14)', color: '#FFFFFF', border: '1px solid rgba(157,196,238,0.3)', textDecoration: 'none', fontWeight: 600, fontSize: '14px', transition: 'all 0.25s ease' }}>
                                📥 공식 지원서 다운로드
                            </a>
                        </div>
                    </div>

                    {/* Right Panel - Timeline */}
                    <div style={{ border: '1px solid rgba(255,255,255,0.16)', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', padding: 'clamp(24px,3vw,36px)' }}>
                        <div style={{ font: "800 12px 'JetBrains Mono',monospace", letterSpacing: '3px', color: '#9DC4EE', textTransform: 'uppercase', marginBottom: '24px' }}>RECRUITING TIMELINE</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {timeline.map((s, idx) => (
                                <div key={idx} style={{ borderLeft: '2px solid #9DC4EE', paddingLeft: '16px', position: 'relative' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                        <span style={{ font: "700 15px 'Pretendard',sans-serif", color: '#FFFFFF' }}>{s.title}</span>
                                    </div>
                                    <div style={{ marginTop: '6px', fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{s.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default JoinUsPage;