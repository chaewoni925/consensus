import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import ReportUploadModal from '../../components/ReportUploadModal';

function ActivityPage() {
    const [activities, setActivities] = useState([]);
    const [reports, setReports] = useState([]);
    const [activeTab, setActiveTab] = useState('ALL'); // ALL, COMPANY, MACRO
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const fetchReports = () => {
        axiosInstance.get('/api/reports')
            .then((response) => {
                setReports(response.data || []);
            })
            .catch((error) => {
                console.error('API Error fetching reports:', error);
            });
    };

    const handleUploadSuccess = (newReport) => {
        if (newReport && newReport.title) {
            setReports((prev) => [newReport, ...prev]);
        } else {
            fetchReports();
        }
    };

    useEffect(() => {
        axiosInstance.get('/api/activities')
            .then((response) => setActivities(response.data))
            .catch((error) => console.error(error));

        fetchReports();
    }, []);

    const pipeline = [
      { step: 'STEP 01', title: '기업리서치 제안', desc: 'Valuation 산출물 기반 종목 투자제안 작성' },
      { step: 'STEP 02', title: 'House-View 정렬', desc: '매크로 전망과 초기 포트폴리오 구성 제안' },
      { step: 'STEP 03', title: '투자심의 의결', desc: '위원회 질의 후 편입 · 보류 · 재심의 결정' },
      { step: 'STEP 04', title: 'Portfolio 편입', desc: 'Consensus Portfolio 반영 및 정기 리밸런싱' }
    ];

    // Filter and sort by publishDate descending (latest date first)
    const filteredReports = reports
      .filter((r) => {
        if (activeTab === 'ALL') return true;
        return r.category === activeTab;
      })
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

    return (
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(68px, 6vw, 96px) clamp(16px, 3vw, 32px)', background: '#0B1021', color: '#F1F5F9' }}>
            <h2 style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 'clamp(26px,3.6vw,40px)', letterSpacing: '-.02em', color: '#F1F5F9' }}>Decision Pipeline & Outputs</h2>
            <p style={{ margin: '12px 0 30px', maxWidth: '620px', fontSize: '14px', lineHeight: 1.7, color: '#94A3B8' }}>기업·매크로 분석 결과가 투자제안으로, 투자심의위원회 의결을 거칩니다.</p>

            {/* Decision Pipeline */}
            <div style={{ marginTop: 'clamp(36px,5vw,56px)', border: '1px solid rgba(59,130,246,.16)', borderRadius: '16px', background: '#0B1225', padding: 'clamp(20px,3vw,30px)' }}>
                <div style={{ font: "500 10.5px 'JetBrains Mono',monospace", letterSpacing: '.18em', color: '#64748B' }}>DECISION PIPELINE</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: '10px', marginTop: '18px' }}>
                    {pipeline.map((p, idx) => (
                        <div key={idx} style={{ flex: '1 1 180px', minWidth: 0, padding: '16px', borderRadius: '12px', background: '#0E162D', border: '1px solid ' + (idx === 3 ? 'rgba(16,185,129,.4)' : 'rgba(59,130,246,.16)') }}>
                            <div style={{ font: "500 9.5px 'JetBrains Mono',monospace", letterSpacing: '.14em', color: '#475569' }}>{p.step}</div>
                            <div style={{ marginTop: '8px', font: "600 14px 'IBM Plex Sans KR',sans-serif", color: '#F1F5F9' }}>{p.title}</div>
                            <div style={{ marginTop: '6px', fontSize: '11.5px', lineHeight: 1.55, color: '#94A3B8' }}>{p.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dynamic Project Reports Section with Categorization & Upload */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', margin: 'clamp(40px,5vw,60px) 0 16px', gap: '16px' }}>
                <div>
                    <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 'clamp(20px,2.6vw,28px)', color: '#F1F5F9' }}>
                        PROJECT REPORTS
                    </h3>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94A3B8' }}>
                        기업리서치 및 매크로 하우스뷰 최신 리포트 산출물
                    </p>
                </div>

                {/* Executive Admin Upload Button */}
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        background: '#10B981',
                        color: '#FFFFFF',
                        font: '600 13px "IBM Plex Sans KR", sans-serif',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)',
                        transition: 'all 0.25s ease'
                    }}
                >
                    <span style={{ fontSize: '16px' }}>+</span> 신규 리포트 등록 (운영진 전용)
                </button>
            </div>

            {/* Category Filter Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(59,130,246,.16)', paddingBottom: '12px' }}>
                <button
                    onClick={() => setActiveTab('ALL')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        font: '600 13px "IBM Plex Sans KR", sans-serif',
                        background: activeTab === 'ALL' ? '#10B981' : 'rgba(15, 23, 42, 0.6)',
                        color: activeTab === 'ALL' ? '#FFFFFF' : '#94A3B8',
                        border: '1px solid ' + (activeTab === 'ALL' ? '#10B981' : 'rgba(59,130,246,.2)'),
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    전체 리포트 ({reports.length})
                </button>

                <button
                    onClick={() => setActiveTab('COMPANY')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        font: '600 13px "IBM Plex Sans KR", sans-serif',
                        background: activeTab === 'COMPANY' ? '#10B981' : 'rgba(15, 23, 42, 0.6)',
                        color: activeTab === 'COMPANY' ? '#FFFFFF' : '#94A3B8',
                        border: '1px solid ' + (activeTab === 'COMPANY' ? '#10B981' : 'rgba(59,130,246,.2)'),
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    기업리서치 (Valuation)
                </button>

                <button
                    onClick={() => setActiveTab('MACRO')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        font: '600 13px "IBM Plex Sans KR", sans-serif',
                        background: activeTab === 'MACRO' ? '#10B981' : 'rgba(15, 23, 42, 0.6)',
                        color: activeTab === 'MACRO' ? '#FFFFFF' : '#94A3B8',
                        border: '1px solid ' + (activeTab === 'MACRO' ? '#10B981' : 'rgba(59,130,246,.2)'),
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    매크로 하우스뷰 (Macro View)
                </button>
            </div>

            {/* Reports List Board */}
            <div style={{ border: '1px solid rgba(59,130,246,.16)', borderRadius: '14px', background: '#0E162D', overflow: 'hidden' }}>
                {filteredReports.length === 0 ? (
                    <div style={{ padding: '48px 20px', textAlign: 'center', color: '#64748B', fontSize: '13.5px', lineHeight: 1.6 }}>
                        등록된 리포트 산출물이 없습니다.<br />
                        {/*<span style={{ color: '#10B981', fontWeight: 500 }}>+ 신규 리포트 등록 (운영진 전용)</span> 버튼을 눌러 실제 파일과 함께 리포트를 추가해 보세요.*/}
                    </div>
                ) : (
                    filteredReports.map((o) => (
                        <div key={o.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2.4fr) minmax(0,1fr) minmax(0,1fr) 130px', gap: '12px', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(148,163,184,.07)' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9' }}>
                                    {o.title}
                                </div>
                                <div style={{ marginTop: '4px', font: "500 10.5px 'JetBrains Mono',monospace", color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: o.category === 'COMPANY' ? '#3B82F6' : '#10B981' }}>
                                      [{o.category === 'COMPANY' ? '기업리서치' : '매크로 하우스뷰'}]
                                    </span>
                                    <span>{o.department}</span>
                                </div>
                            </div>
                            <div style={{ fontSize: '12.5px', color: '#CBD5E1' }}>{o.reportType}</div>
                            <div style={{ font: "500 12px 'JetBrains Mono',monospace", color: '#64748B' }}>
                              {o.publishDate ? o.publishDate.substring(0, 7).replace('-', '.') : '2026.08'}
                            </div>

                            {/* Download / View Button */}
                            <div style={{ textAlign: 'right' }}>
                              {o.fileUrl ? (
                                <a
                                  href={o.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    font: "600 11.5px 'JetBrains Mono',monospace",
                                    color: '#10B981',
                                    background: 'rgba(16,185,129,0.12)',
                                    border: '1px solid rgba(16,185,129,0.3)',
                                    padding: '5px 12px',
                                    borderRadius: '6px',
                                    textDecoration: 'none',
                                    display: 'inline-block'
                                  }}
                                >
                                  열람 / 다운로드 ↓
                                </a>
                              ) : (
                                <span style={{ font: "500 11px 'JetBrains Mono',monospace", color: '#64748B' }}>
                                  열람 가능
                                </span>
                              )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {activities.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                    <h3 style={{ color: '#F1F5F9' }}>활동 목록</h3>
                    {activities.map((activity) => (
                        <div key={activity.id} style={{ background: '#0E162D', padding: '12px', borderRadius: '8px', marginTop: '8px', border: '1px solid rgba(59,130,246,.2)' }}>
                            <h4 style={{ color: '#F1F5F9', margin: 0 }}>{activity.title}</h4>
                            <p style={{ fontSize: '12px', color: '#64748B' }}>{activity.activityDate}</p>
                            <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>{activity.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Executive Upload Modal */}
            <ReportUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSuccess={handleUploadSuccess}
            />
        </main>
    );
}

export default ActivityPage;