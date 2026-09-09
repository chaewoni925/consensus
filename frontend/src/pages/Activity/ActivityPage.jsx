import { useEffect, useState } from 'react';
import Header from '../../components/Navbar';
import axiosInstance from '../../api/axiosInstance';
import ReportUploadModal from '../../components/ReportUploadModal';
import ScrollIndicator from '../../components/ScrollIndicator';

function ActivityPage() {
    const [activities, setActivities] = useState([]);
    const [reports, setReports] = useState([]);
    const [activeTab, setActiveTab] = useState('ALL'); // ALL, COMPANY, MACRO, INVESTMENT_RESULT
    const [selectedYear, setSelectedYear] = useState('ALL'); // ALL, '2026', '2025', etc.
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest'); // latest, oldest, downloads, award
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const fetchReports = () => {
        axiosInstance.get('/api/reports', { params: { sort: sortBy } })
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

    const handleReportView = (reportId) => {
        // Optimistic UI update for view count
        setReports((prevReports) =>
            prevReports.map((r) =>
                r.id === reportId ? { ...r, views: (r.views || 0) + 1 } : r
            )
        );

        // Call backend API if it's a numeric id
        if (typeof reportId === 'number') {
            axiosInstance.post(`/api/reports/${reportId}/view`).catch((err) => {
                console.error('Failed to increase report view count:', err);
            });
        }
    };

    useEffect(() => {
        axiosInstance.get('/api/activities')
            .then((response) => setActivities(response.data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetchReports();
    }, [sortBy]);

    const pipeline = [
      { step: 'STEP 01', title: '기업리서치 제안', desc: 'Valuation 산출물 기반 종목 투자제안 작성' },
      { step: 'STEP 02', title: 'House-View 정렬', desc: '매크로 전망과 초기 포트폴리오 구성 제안' },
      { step: 'STEP 03', title: '투자심의 의결', desc: '위원회 질의 후 편입 · 보류 · 재심의 결정' },
      { step: 'STEP 04', title: 'Portfolio 편입', desc: 'Consensus Portfolio 반영 및 정기 리밸런싱' }
    ];

    // Category label and color mapper
    const getCategoryBadge = (cat) => {
        switch (cat) {
            case 'COMPANY':
                return { label: '기업리서치', color: '#3B82F6' };
            case 'MACRO':
                return { label: '매크로 하우스뷰', color: '#10B981' };
            case 'INVESTMENT_RESULT':
                return { label: '투자운용결과보고서', color: '#F59E0B' };
            default:
                return { label: cat, color: '#94A3B8' };
        }
    };

    // Extract available years from reports
    const availableYears = Array.from(
        new Set(
            reports
                .map((r) => r.publishDate ? r.publishDate.substring(0, 4) : '2026')
                .filter(Boolean)
        )
    ).sort((a, b) => b - a);

    // Filter by Category, Year, SearchTerm & Sort
    const filteredReports = reports
      .filter((r) => {
        if (activeTab !== 'ALL' && r.category !== activeTab) return false;
        
        const year = r.publishDate ? r.publishDate.substring(0, 4) : '2026';
        if (selectedYear !== 'ALL' && year !== selectedYear) return false;

        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();
            const titleMatch = r.title && r.title.toLowerCase().includes(query);
            const deptMatch = r.department && r.department.toLowerCase().includes(query);
            const typeMatch = r.reportType && r.reportType.toLowerCase().includes(query);
            if (!titleMatch && !deptMatch && !typeMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'oldest') {
            return new Date(a.publishDate || 0) - new Date(b.publishDate || 0);
        }
        if (sortBy === 'downloads' || sortBy === 'views') {
            const vA = a.views || 0;
            const vB = b.views || 0;
            if (vB !== vA) return vB - vA;
        }
        if (sortBy === 'award') {
            const rA = a.awardRank != null ? a.awardRank : 999;
            const rB = b.awardRank != null ? b.awardRank : 999;
            if (rA !== rB) return rA - rB;
        }
        return new Date(b.publishDate || 0) - new Date(a.publishDate || 0);
      });

  return (
    <div style={{ background: 'transparent', color: '#FFFFFF', minHeight: '100vh', fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Header navbarShadow />

      <main style={{ background: 'transparent', color: '#FFFFFF', minHeight: '100vh' }}>
        {/* 1st Viewport Section: Research -> Proposal -> Approval with Scroll Down Indicator */}
        <section style={{ position: 'relative', minHeight: '100vh', maxWidth: '1280px', margin: '0 auto', padding: '120px clamp(16px, 3vw, 32px) 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>
            {/* Main Header Title */}
            <div>
                <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(24px,3.8vw,45px)', letterSpacing: '-.025em', color: '#F1F5F9', whiteSpace: 'nowrap' }}>
                    Research → Proposal → Approval
                </h2>
                <p style={{ margin: '16px 0 0', maxWidth: '800px', fontSize: 'clamp(14px,1.6vw,17px)', lineHeight: 1.75, color: '#94A3B8', wordBreak: 'keep-all' }}>
                    기업·매크로 분석 결과가 투자제안으로 수립되어, 학회 투자심의위원회 의결과 모의펀드 반영 과정을 거칩니다.
                </p>
            </div>

            {/* Decision Pipeline Cards Container */}
            <div style={{ marginTop: 'clamp(28px,3.5vw,48px)', border: '1px solid rgba(59,130,246,.18)', borderRadius: '20px', background: '#0B1225', padding: 'clamp(24px,3.5vw,36px)', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
                <div style={{ font: "600 11px 'JetBrains Mono',monospace", letterSpacing: '.22em', color: '#3B82F6', textTransform: 'uppercase' }}>
                    DECISION PIPELINE PROCESS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' }}>
                    {pipeline.map((p, idx) => (
                        <div key={idx} style={{ padding: '24px 20px', borderRadius: '14px', background: '#0E162D', border: '1px solid ' + (idx === 3 ? 'rgba(16,185,129,.45)' : 'rgba(59,130,246,.18)'), boxShadow: idx === 3 ? '0 4px 20px rgba(16,185,129,.15)' : 'none', transition: 'transform 0.2s ease, border-color 0.2s ease' }}>
                            <div style={{ font: "600 10.5px 'JetBrains Mono',monospace", letterSpacing: '.16em', color: idx === 3 ? '#10B981' : '#3B82F6' }}>{p.step}</div>
                            <div style={{ marginTop: '12px', font: "600 16px 'IBM Plex Sans KR',sans-serif", color: '#F1F5F9', letterSpacing: '-.01em' }}>{p.title}</div>
                            <div style={{ marginTop: '8px', fontSize: '13px', lineHeight: 1.6, color: '#94A3B8', whiteSpace: 'nowrap' }}>{p.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Down Indicator (hides near page bottom) */}
            <ScrollIndicator />
        </section>

        {/* 2nd Viewport Section: Project Reports & Archives */}
        <section style={{ minHeight: '100vh', maxWidth: '1280px', margin: '0 auto', padding: '80px clamp(16px, 3vw, 32px) 60px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxSizing: 'border-box', borderBottom: activities.length > 0 ? '1px solid rgba(255,255,255,0.16)' : 'none' }}>
            {/* Dynamic Project Reports Section Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', margin: '0 0 24px', gap: '16px' }}>
                <div>
                    <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.5vw,40px)', color: '#FFFFFF', letterSpacing: '-.02em' }}>
                        PROJECT REPORTS
                    </h3>
                    <p style={{ margin: '10px 0 0', fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                        기업리서치(Valuation), 매크로 하우스뷰 및 투자운용결과보고서 핵심 산출물
                    </p>
                </div>

                {/* Executive Admin Upload Button */}
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '9px 18px',
                        borderRadius: '8px',
                        background: 'rgba(157,196,238,0.12)',
                        color: '#9DC4EE',
                        fontFamily: "'Pretendard', sans-serif",
                        fontWeight: 700,
                        fontSize: '13.5px',
                        letterSpacing: '0.04em',
                        border: '1px solid rgba(157,196,238,0.4)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#9DC4EE';
                        e.currentTarget.style.background = 'rgba(157,196,238,0.25)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#9DC4EE';
                        e.currentTarget.style.borderColor = 'rgba(157,196,238,0.4)';
                        e.currentTarget.style.background = 'rgba(157,196,238,0.12)';
                    }}
                >
                    <span style={{ fontSize: '15px', fontWeight: 700 }}>+</span> ADD REPORT
                </button>
            </div>

            {/* Year Filter Section */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                    <button
                        onClick={() => setSelectedYear('ALL')}
                        style={{
                            fontFamily: "'Pretendard', sans-serif",
                            fontWeight: selectedYear === 'ALL' ? 800 : 600,
                            fontSize: '17px',
                            letterSpacing: '0.02em',
                            color: selectedYear === 'ALL' ? '#9DC4EE' : 'rgba(255,255,255,0.7)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            padding: '6px 0',
                            borderBottom: selectedYear === 'ALL' ? '3px solid #9DC4EE' : '3px solid transparent'
                        }}
                    >
                        전체 연도
                    </button>
                    {(availableYears.length > 0 ? availableYears : ['2026', '2025']).map((yr) => (
                        <button
                            key={yr}
                            onClick={() => setSelectedYear(yr)}
                            style={{
                                fontFamily: "'Pretendard', sans-serif",
                                fontWeight: selectedYear === yr ? 800 : 600,
                                fontSize: '17px',
                                letterSpacing: '0.02em',
                                color: selectedYear === yr ? '#9DC4EE' : 'rgba(255,255,255,0.7)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                padding: '6px 0',
                                borderBottom: selectedYear === yr ? '3px solid #9DC4EE' : '3px solid transparent'
                            }}
                        >
                            {yr}
                        </button>
                    ))}
                </div>

                {/* Right Search Bar */}
                <div style={{ position: 'relative', width: '240px' }}>
                    <input
                        type="text"
                        placeholder="SEARCH REPORTS..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '9px 36px 9px 14px',
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            color: '#FFFFFF',
                            fontFamily: "'Pretendard', sans-serif",
                            fontSize: '13px',
                            letterSpacing: '0.04em',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'all 0.25s ease'
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#9DC4EE';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        }}
                    />
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9DC4EE"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '15px',
                            height: '15px',
                            pointerEvents: 'none',
                            opacity: 0.9
                        }}
                    >
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" />
                    </svg>
                </div>
            </div>

            {/* Category Filter Tabs & Sort Dropdown */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.16)', paddingBottom: '16px', gap: '16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                    <button
                        onClick={() => setActiveTab('ALL')}
                        style={{
                            fontFamily: "'Pretendard', sans-serif",
                            fontWeight: activeTab === 'ALL' ? 700 : 500,
                            fontSize: '14px',
                            letterSpacing: '0.04em',
                            color: activeTab === 'ALL' ? '#9DC4EE' : 'rgba(255,255,255,0.75)',
                            textTransform: 'uppercase',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            padding: '6px 0',
                            borderBottom: activeTab === 'ALL' ? '2px solid #9DC4EE' : '2px solid transparent'
                        }}
                    >
                        ALL REPORTS ({reports.length})
                    </button>

                    <button
                        onClick={() => setActiveTab('COMPANY')}
                        style={{
                            fontFamily: "'Pretendard', sans-serif",
                            fontWeight: activeTab === 'COMPANY' ? 700 : 500,
                            fontSize: '14px',
                            letterSpacing: '0.04em',
                            color: activeTab === 'COMPANY' ? '#9DC4EE' : 'rgba(255,255,255,0.75)',
                            textTransform: 'uppercase',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            padding: '6px 0',
                            borderBottom: activeTab === 'COMPANY' ? '2px solid #9DC4EE' : '2px solid transparent'
                        }}
                    >
                        EQUITY RESEARCH
                    </button>

                    <button
                        onClick={() => setActiveTab('MACRO')}
                        style={{
                            fontFamily: "'Pretendard', sans-serif",
                            fontWeight: activeTab === 'MACRO' ? 700 : 500,
                            fontSize: '14px',
                            letterSpacing: '0.04em',
                            color: activeTab === 'MACRO' ? '#9DC4EE' : 'rgba(255,255,255,0.75)',
                            textTransform: 'uppercase',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            padding: '6px 0',
                            borderBottom: activeTab === 'MACRO' ? '2px solid #9DC4EE' : '2px solid transparent'
                        }}
                    >
                        MACRO HOUSE VIEW
                    </button>

                    <button
                        onClick={() => setActiveTab('INVESTMENT_RESULT')}
                        style={{
                            fontFamily: "'Pretendard', sans-serif",
                            fontWeight: activeTab === 'INVESTMENT_RESULT' ? 700 : 500,
                            fontSize: '14px',
                            letterSpacing: '0.04em',
                            color: activeTab === 'INVESTMENT_RESULT' ? '#9DC4EE' : 'rgba(255,255,255,0.75)',
                            textTransform: 'uppercase',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            padding: '6px 0',
                            borderBottom: activeTab === 'INVESTMENT_RESULT' ? '2px solid #9DC4EE' : '2px solid transparent'
                        }}
                    >
                        PORTFOLIO REPORT
                    </button>
                </div>

                {/* Custom Styled Select Dropdown */}
                <div style={{ position: 'relative' }}>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            padding: '8px 34px 8px 16px',
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            color: '#FFFFFF',
                            fontFamily: "'Pretendard', sans-serif",
                            fontWeight: 600,
                            fontSize: '13px',
                            letterSpacing: '0.04em',
                            cursor: 'pointer',
                            outline: 'none',
                            transition: 'all 0.25s ease'
                        }}
                    >
                        <option value="latest" style={{ background: '#0C1526', color: '#FFFFFF' }}>최신순</option>
                        <option value="downloads" style={{ background: '#0C1526', color: '#FFFFFF' }}>다운로드순</option>
                        <option value="oldest" style={{ background: '#0C1526', color: '#FFFFFF' }}>등록순</option>
                    </select>
                    <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9DC4EE', fontSize: '10px' }}>
                        ▼
                    </div>
                </div>
            </div>

            {/* Reports List Board */}
            <div style={{ border: '1px solid rgba(255,255,255,0.18)', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', overflow: 'hidden' }}>
                {filteredReports.length === 0 ? (
                    <div style={{ padding: '72px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 500, lineHeight: 1.7 }}>
                        등록된 리포트 산출물이 없습니다.<br />
                    </div>
                ) : (
                    filteredReports.map((o) => {
                        const badge = getCategoryBadge(o.category);
                        return (
                            <div key={o.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2.4fr) minmax(0,1fr) minmax(0,0.8fr) minmax(0,0.8fr) 140px', gap: '12px', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(148,163,184,.07)' }}>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9' }}>
                                        {o.title}
                                    </div>
                                    <div style={{ marginTop: '4px', font: "500 10.5px 'JetBrains Mono',monospace", color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: badge.color }}>
                                          [{badge.label}]
                                        </span>
                                        <span>{o.department}</span>
                                    </div>
                                </div>
                                <div style={{ fontSize: '12.5px', color: '#CBD5E1' }}>{o.reportType}</div>
                                <div style={{ font: "500 12px 'JetBrains Mono',monospace", color: '#64748B' }}>
                                  {o.publishDate ? o.publishDate.substring(0, 7).replace('-', '.') : '2026.08'}
                                </div>
                                <div style={{ font: "500 12px 'JetBrains Mono',monospace", color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <span style={{ fontSize: '11px', color: '#64748B' }}>👁</span> {o.views || 0}
                                </div>

                                {/* Download / View Button */}
                                <div style={{ textAlign: 'right' }}>
                                  {o.fileUrl ? (
                                    <a
                                      href={o.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => handleReportView(o.id)}
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
                                    <button
                                      onClick={() => handleReportView(o.id)}
                                      style={{
                                        font: "500 11px 'JetBrains Mono',monospace",
                                        color: '#64748B',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0
                                      }}
                                    >
                                      열람 가능
                                    </button>
                                  )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>

        {/* 3rd Viewport Section: Activities List Section (If present) */}
        {activities.length > 0 && (
            <section style={{ minHeight: '100vh', maxWidth: '1280px', margin: '0 auto', padding: '80px clamp(16px, 3vw, 32px) 60px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxSizing: 'border-box' }}>
                <div>
                    <h3 style={{ margin: '0 0 24px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.5vw,40px)', color: '#FFFFFF', letterSpacing: '-.02em' }}>
                        활동 목록
                    </h3>
                    {activities.map((activity) => (
                        <div key={activity.id} style={{ background: '#0E162D', padding: '16px', borderRadius: '8px', marginTop: '12px', border: '1px solid rgba(59,130,246,.2)' }}>
                            <h4 style={{ color: '#F1F5F9', margin: 0 }}>{activity.title}</h4>
                            <p style={{ fontSize: '12px', color: '#64748B' }}>{activity.activityDate}</p>
                            <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>{activity.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Executive Upload Modal */}
        <ReportUploadModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            onSuccess={handleUploadSuccess}
        />
      </main>
    </div>
    );
}

export default ActivityPage;