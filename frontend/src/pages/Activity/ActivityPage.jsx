import { useEffect, useState } from 'react';
import Header from '../../components/Navbar';
import axiosInstance from '../../api/axiosInstance';
import ReportUploadModal from '../../components/ReportUploadModal';
import ScrollIndicator from '../../components/ScrollIndicator';

function ActivityPage() {
    const STORAGE_KEY = 'consensus_reports_data';

    const INITIAL_FALLBACK_REPORTS = [
        {
            id: 'sample-1',
            title: 'HPSP 기업분석 리포트 (Valuation & DCF)',
            category: 'COMPANY',
            reportType: '기업분석 리포트',
            department: '기업리서치 부',
            publishDate: '2026-09-10',
            views: 42,
            fileUrl: '/Consensus_5th_Application_Form.docx',
            fileName: 'HPSP_기업분석_리포트.pdf'
        },
        {
            id: 'sample-2',
            title: '2026 하반기 글로벌 매크로 하우스뷰 (House View)',
            category: 'MACRO',
            reportType: 'House View',
            department: '매크로 컨센서스 부',
            publishDate: '2026-09-08',
            views: 28,
            fileUrl: '/Consensus_5th_Application_Form.docx',
            fileName: '2026_하반기_HouseView.pdf'
        },
        {
            id: 'sample-3',
            title: '2026 상반기 학회 모의펀드 투자운용결과보고서',
            category: 'INVESTMENT_RESULT',
            reportType: '운용결과 보고서',
            department: '투자운용 부',
            publishDate: '2026-09-05',
            views: 35,
            fileUrl: '/Consensus_5th_Application_Form.docx',
            fileName: '모의펀드_운용결과보고서.pdf'
        }
    ];

    const getInitialReports = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {
            console.error('Failed to load local reports:', e);
        }
        return INITIAL_FALLBACK_REPORTS;
    };

    const [activities, setActivities] = useState([]);
    const [reports, setReports] = useState(getInitialReports);
    const [activeTab, setActiveTab] = useState('ALL'); // ALL, COMPANY, MACRO, INVESTMENT_RESULT
    const [selectedYear, setSelectedYear] = useState('ALL'); // ALL, '2026', '2025', etc.
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest'); // latest, oldest, downloads
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [activePipelineHover, setActivePipelineHover] = useState(null);

    const fetchReports = () => {
        axiosInstance.get('/api/reports', { params: { sort: sortBy } })
            .then((response) => {
                const apiData = response.data || [];
                setReports((prevReports) => {
                    const localOnly = prevReports.filter(r => String(r.id).startsWith('local-'));
                    const combined = [...localOnly, ...apiData.filter(apiR => !localOnly.some(l => l.id === apiR.id))];
                    try {
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
                    } catch (e) { console.error(e); }
                    return combined;
                });
            })
            .catch((error) => {
                console.error('API Error fetching reports:', error);
            });
    };

    const handleUploadSuccess = (newReport) => {
        if (newReport && newReport.title) {
            setReports((prev) => {
                const updated = [newReport, ...prev];
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                } catch (e) { console.error(e); }
                return updated;
            });
        } else {
            fetchReports();
        }
    };

    const handleReportView = (reportId) => {
        setReports((prevReports) =>
            prevReports.map((r) =>
                r.id === reportId ? { ...r, views: (r.views || 0) + 1 } : r
            )
        );

        if (typeof reportId === 'number') {
            axiosInstance.post(`/api/reports/${reportId}/view`).catch((err) => {
                console.error('Failed to increase report view count:', err);
            });
        }
    };

    const [isExecutiveAuth, setIsExecutiveAuth] = useState(() => {
        return sessionStorage.getItem('consensus_exec_auth') === 'true';
    });

    const handleDeleteReport = (reportId, reportTitle) => {
        // Executive authentication check
        let authenticated = isExecutiveAuth;

        if (!authenticated) {
            const inputKey = window.prompt('🔒 운영진 전용 삭제\n리포트를 삭제하려면 운영진 비밀번호를 입력해 주세요:');
            if (inputKey === null) return; // User cancelled prompt
            if (inputKey.trim() !== 'consensus2024!') {
                alert('❌ 운영진 비밀번호가 올바르지 않습니다.');
                return;
            }
            sessionStorage.setItem('consensus_exec_auth', 'true');
            setIsExecutiveAuth(true);
            authenticated = true;
        }

        if (window.confirm(`"${reportTitle || '선택한 리포트'}"를 정말 삭제하시겠습니까?`)) {
            setReports((prevReports) => {
                const updated = prevReports.filter((r) => r.id !== reportId);
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                } catch (e) {
                    console.error('Failed to save updated reports after deletion:', e);
                }
                return updated;
            });

            if (typeof reportId === 'number') {
                axiosInstance.delete(`/api/reports/${reportId}`).catch((err) => {
                    console.error('Failed to delete report on backend:', err);
                });
            }
        }
    };

    const handleDeleteMultipleReports = (reportIds) => {
        if (!reportIds || reportIds.length === 0) return;

        let authenticated = isExecutiveAuth;
        if (!authenticated) {
            const inputKey = window.prompt('🔒 운영진 전용 삭제\n리포트를 삭제하려면 운영진 비밀번호를 입력해 주세요:');
            if (inputKey === null) return;
            if (inputKey.trim() !== 'consensus2024!') {
                alert('❌ 운영진 비밀번호가 올바르지 않습니다.');
                return;
            }
            sessionStorage.setItem('consensus_exec_auth', 'true');
            setIsExecutiveAuth(true);
            authenticated = true;
        }

        if (window.confirm(`선택한 ${reportIds.length}개의 리포트를 일괄 삭제하시겠습니까?`)) {
            const idSet = new Set(reportIds);
            setReports((prevReports) => {
                const updated = prevReports.filter((r) => !idSet.has(r.id));
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                } catch (e) {
                    console.error('Failed to save updated reports after batch deletion:', e);
                }
                return updated;
            });

            reportIds.forEach((id) => {
                if (typeof id === 'number') {
                    axiosInstance.delete(`/api/reports/${id}`).catch((err) => {
                        console.error(`Failed to delete report ${id} on backend:`, err);
                    });
                }
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

    const getCategoryBadge = (cat) => {
        switch (cat) {
            case 'COMPANY':
                return { label: '기업리서치', badgeBg: 'rgba(59,130,246,0.15)', badgeColor: '#60A5FA', border: 'rgba(59,130,246,0.3)', typeText: '기업분석 리포트' };
            case 'MACRO':
                return { label: '매크로 하우스뷰', badgeBg: 'rgba(168,85,247,0.15)', badgeColor: '#C084FC', border: 'rgba(168,85,247,0.3)', typeText: '거시경제 전략' };
            case 'INVESTMENT_RESULT':
                return { label: '포트폴리오', badgeBg: 'rgba(245,158,11,0.15)', badgeColor: '#FBBF24', border: 'rgba(245,158,11,0.3)', typeText: '운용성과 보고' };
            default:
                return { label: cat || '리포트', badgeBg: 'rgba(148,163,184,0.15)', badgeColor: '#94A3B8', border: 'rgba(148,163,184,0.3)', typeText: '연구 보고서' };
        }
    };

    const availableYears = Array.from(
        new Set(
            reports
                .map((r) => r.publishDate ? r.publishDate.substring(0, 4) : '2026')
                .filter(Boolean)
        )
    ).sort((a, b) => b - a);

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
        return new Date(b.publishDate || 0) - new Date(a.publishDate || 0);
      });

  return (
    <div style={{ background: '#111726', color: '#F1F5F9', minHeight: '100vh', fontFamily: "'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Header navbarShadow />

      <main style={{ background: '#111726', color: '#F1F5F9', minHeight: '100vh' }}>
        {/* 1st Viewport Section: Research -> Proposal -> Approval with Scroll Down Indicator */}
        <section style={{ position: 'relative', minHeight: '100vh', maxWidth: '1440px', margin: '0 auto', padding: '120px clamp(16px, 3vw, 48px) 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box', borderBottom: '1px solid #1E2A44' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ font: "800 11px 'Pretendard',sans-serif", letterSpacing: '3px', color: '#9DC4EE', textTransform: 'uppercase', marginBottom: '14px' }}>PROCESS</h1>

                <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(24px,3.8vw,45px)', letterSpacing: '-.025em', color: '#F1F5F9', whiteSpace: 'nowrap' }}>
                    Research → Proposal → Approval
                </h2>
                <p style={{ margin: '16px auto 0', maxWidth: '800px', fontSize: 'clamp(14px,1.6vw,17px)', lineHeight: 1.75, color: '#94A3B8', wordBreak: 'keep-all', textAlign: 'center' }}>
                    기업·매크로 분석 결과가 투자제안으로 수립되어, 학회 투자심의위원회 의결과 모의펀드 반영 과정을 거칩니다.
                </p>
            </div>

            <div style={{ width: '100%', marginTop: 'clamp(28px,3.5vw,48px)', border: '1px solid #22304C', borderRadius: '20px', background: 'rgba(22, 31, 51, 0.75)', padding: 'clamp(24px,3.5vw,36px)', boxShadow: '0 10px 30px rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                <div style={{ font: "600 11px 'Pretendard', sans-serif", letterSpacing: '.22em', color: '#3B82F6', textTransform: 'uppercase', textAlign: 'center' }}>
                    DECISION PIPELINE PROCESS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' }}>
                    {pipeline.map((p, idx) => {
                        const isHovered = activePipelineHover === idx;
                        return (
                            <div
                                key={idx}
                                onMouseEnter={() => setActivePipelineHover(idx)}
                                onMouseLeave={() => setActivePipelineHover(null)}
                                style={{
                                    padding: '24px 20px',
                                    borderRadius: '14px',
                                    background: isHovered ? 'rgba(16, 185, 129, 0.06)' : 'rgba(27, 38, 62, 0.6)',
                                    border: '1px solid ' + (isHovered ? 'rgba(16,185,129,.7)' : 'rgba(39, 54, 86, 0.8)'),
                                    boxShadow: isHovered ? '0 6px 24px rgba(16,185,129,.25)' : 'none',
                                    transform: isHovered ? 'translateY(-4px)' : 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                            >
                                <div style={{ font: "600 10.5px 'Pretendard', sans-serif", letterSpacing: '.16em', color: isHovered ? '#10B981' : '#3B82F6', transition: 'color 0.2s ease' }}>{p.step}</div>
                                <div style={{ marginTop: '12px', font: "600 16px 'IBM Plex Sans KR',sans-serif", color: '#F1F5F9', letterSpacing: '-.01em' }}>{p.title}</div>
                                <div style={{ marginTop: '8px', fontSize: '13px', lineHeight: 1.6, color: '#94A3B8', whiteSpace: 'nowrap' }}>{p.desc}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <ScrollIndicator />
        </section>

        {/* 2nd Section: PROJECT REPORTS (HTML layout redesign) */}
        <section style={{ minHeight: '100vh', maxWidth: '1440px', margin: '0 auto', padding: '80px clamp(16px, 3vw, 48px) 60px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxSizing: 'border-box' }}>
            {/* Top Main Header */}
            <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <div>
                    <div style={{ font: "800 11px 'Pretendard',sans-serif", letterSpacing: '3px', color: '#9DC4EE', textTransform: 'uppercase', marginBottom: '12px' }}>PROJECT</div>

                    <h1 style={{ margin: 0, fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                        PROJECT REPORTS
                    </h1>
                    <p style={{ margin: '12px 0 0', fontSize: '14px', color: '#94A3B8', fontWeight: 400 }}>
                        기업리서치(Valuation), 매크로 하우스뷰 및 투자운용결과보고서 핵심 산출물
                    </p>
                </div>

                {/* Add Report Action Button */}
                <div style={{ paddingTop: '60px' }}>
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 18px',
                            borderRadius: '12px',
                            background: '#2563EB',
                            color: '#FFFFFF',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: '14px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 8px 20px rgba(37,99,235,0.25)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#1D4ED8';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#2563EB';
                            e.currentTarget.style.transform = 'none';
                        }}
                    >
                        <span style={{ fontSize: '16px', fontWeight: 700 }}>+</span>
                        <span>리포트 등록</span>
                    </button>
                </div>
            </header>

            {/* Filter Toolbar Box */}
            <div style={{ background: 'rgba(22, 31, 51, 0.75)', border: '1px solid #22304C', borderRadius: '16px', padding: '14px 16px', backdropFilter: 'blur(8px)', marginBottom: '20px' }}>
                {/* Row 1: Year selection & Search Input */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
                    {/* Year Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                            onClick={() => setSelectedYear('ALL')}
                            style={{
                                padding: '6px 14px',
                                fontSize: '12px',
                                fontWeight: selectedYear === 'ALL' ? 700 : 600,
                                borderRadius: '8px',
                                background: selectedYear === 'ALL' ? '#FFFFFF' : '#1C2842',
                                color: selectedYear === 'ALL' ? '#0F172A' : '#CBD5E1',
                                border: selectedYear === 'ALL' ? 'none' : '1px solid #26375A',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            전체 연도
                        </button>
                        {(availableYears.length > 0 ? availableYears : ['2026', '2025', '2024']).map((yr) => (
                            <button
                                key={yr}
                                onClick={() => setSelectedYear(yr)}
                                style={{
                                    padding: '6px 14px',
                                    fontSize: '12px',
                                    fontWeight: selectedYear === yr ? 700 : 600,
                                    borderRadius: '8px',
                                    background: selectedYear === yr ? '#FFFFFF' : '#1C2842',
                                    color: selectedYear === yr ? '#0F172A' : '#CBD5E1',
                                    border: selectedYear === yr ? 'none' : '1px solid #26375A',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {yr}
                            </button>
                        ))}
                    </div>

                    {/* Wide Search Box */}
                    <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                        <div style={{ position: 'absolute', inset: '0 auto 0 14px', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: '#94A3B8' }}>
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="7" />
                                <line x1="16.5" y1="16.5" x2="21" y2="21" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="SEARCH REPORTS (리포트명, 부서, 키워드)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '7px 40px 7px 38px',
                                fontSize: '13px',
                                borderRadius: '12px',
                                background: '#111726',
                                border: '1px solid #27375A',
                                color: '#FFFFFF',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                </div>

                {/* Row 2: Category Tabs & Sort Dropdown */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #22304C', paddingTop: '15px', gap: '12px' }}>
                    {/* Category Tabs */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13px', fontWeight: 600 }}>
                        <button
                            onClick={() => setActiveTab('ALL')}
                            style={{
                                paddingBottom: '4px',
                                color: activeTab === 'ALL' ? '#38BDF8' : '#94A3B8',
                                borderBottom: activeTab === 'ALL' ? '2px solid #38BDF8' : '2px solid transparent',
                                background: 'transparent',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderTop: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontWeight: activeTab === 'ALL' ? 700 : 600
                            }}
                        >
                            <span>ALL REPORTS</span>
                            <span style={{ padding: '1px 7px', borderRadius: '9999px', background: 'rgba(56,189,248,0.2)', fontSize: '11px', color: '#7DD3FC', fontWeight: 700 }}>
                                {reports.length}
                            </span>
                        </button>

                        <button
                            onClick={() => setActiveTab('COMPANY')}
                            style={{
                                paddingBottom: '4px',
                                color: activeTab === 'COMPANY' ? '#38BDF8' : '#94A3B8',
                                borderBottom: activeTab === 'COMPANY' ? '2px solid #38BDF8' : '2px solid transparent',
                                background: 'transparent',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderTop: 'none',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'COMPANY' ? 700 : 600
                            }}
                        >
                            EQUITY RESEARCH
                        </button>

                        <button
                            onClick={() => setActiveTab('MACRO')}
                            style={{
                                paddingBottom: '4px',
                                color: activeTab === 'MACRO' ? '#38BDF8' : '#94A3B8',
                                borderBottom: activeTab === 'MACRO' ? '2px solid #38BDF8' : '2px solid transparent',
                                background: 'transparent',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderTop: 'none',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'MACRO' ? 700 : 600
                            }}
                        >
                            MACRO HOUSE VIEW
                        </button>

                        <button
                            onClick={() => setActiveTab('INVESTMENT_RESULT')}
                            style={{
                                paddingBottom: '4px',
                                color: activeTab === 'INVESTMENT_RESULT' ? '#38BDF8' : '#94A3B8',
                                borderBottom: activeTab === 'INVESTMENT_RESULT' ? '2px solid #38BDF8' : '2px solid transparent',
                                background: 'transparent',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderTop: 'none',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'INVESTMENT_RESULT' ? 700 : 600
                            }}
                        >
                            PORTFOLIO REPORT
                        </button>
                    </div>

                    {/* Sort Select */}
                    <div style={{ position: 'relative', marginRight: '26px' }}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                background: '#1C2842',
                                color: '#CBD5E1',
                                border: '1px solid #27375A',
                                borderRadius: '8px',
                                padding: '5px 28px 5px 12px',
                                fontSize: '12px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            <option value="latest" style={{ background: '#161F33' }}>최신순</option>
                            <option value="downloads" style={{ background: '#161F33' }}>조회순</option>
                            <option value="oldest" style={{ background: '#161F33' }}>등록순</option>
                        </select>
                        <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94A3B8', fontSize: '10px' }}>
                            ▼
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Table Container */}
            <div style={{ background: 'rgba(22, 31, 51, 0.6)', border: '1px solid #22304C', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                {/* Table Header Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2.5fr) minmax(0,1.1fr) minmax(0,1.1fr) 110px 80px 100px', gap: '16px', padding: '8px 16px', fontSize: '11px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(34, 48, 76, 0.8)' }}>
                    <div>보고서 정보 / 개요</div>
                    <div>구분 / 카테고리</div>
                    <div>발행부서</div>
                    <div style={{ textAlign: 'center' }}>등록일자</div>
                    <div style={{ textAlign: 'center' }}>조회수</div>
                    <div style={{ textAlign: 'center' }}>다운로드</div>
                </div>

                {/* Table Rows */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {filteredReports.length === 0 ? (
                        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '14px' }}>
                            등록된 리포트 산출물이 없습니다.
                        </div>
                    ) : (
                        filteredReports.map((r) => {
                            const badge = getCategoryBadge(r.category);
                            return (
                                <div
                                    key={r.id}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'minmax(0,2.5fr) minmax(0,1.1fr) minmax(0,1.1fr) 110px 80px 100px',
                                        gap: '16px',
                                        alignItems: 'center',
                                        padding: '14px 16px',
                                        borderRadius: '12px',
                                        borderBottom: '1px solid rgba(30, 42, 68, 0.6)',
                                        transition: 'all 0.15s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(27, 38, 62, 0.8)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    {/* Title & Sub */}
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ padding: '2px 7px', fontSize: '11px', fontWeight: 700, borderRadius: '4px', background: badge.badgeBg, color: badge.badgeColor, border: `1px solid ${badge.border}`, flexShrink: 0 }}>
                                                {badge.label}
                                            </span>
                                            <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {r.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Category Badge */}
                                    <div>
                                        <span style={{ padding: '4px 10px', borderRadius: '4px', background: '#1F2C47', color: '#CBD5E1', border: '1px solid #2B3C5E', fontSize: '12px' }}>
                                            {badge.typeText}
                                        </span>
                                    </div>

                                    {/* Department */}
                                    <div style={{ fontSize: '13px', color: '#CBD5E1', fontWeight: 500 }}>
                                        {r.department || '기업리서치 부'}
                                    </div>

                                    {/* Date */}
                                    <div style={{ textAlign: 'center', fontSize: '12px', fontFamily: 'monospace', color: '#94A3B8' }}>
                                        {r.publishDate ? r.publishDate.substring(0, 10).replace(/-/g, '.') : '2026.09.10'}
                                    </div>

                                    {/* Views */}
                                    <div style={{ textAlign: 'center', fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                        <svg width="14" height="14" fill="none" stroke="#64748B" strokeWidth="2" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>{r.views || 0}</span>
                                    </div>

                                    {/* CTA Download Button */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {r.fileUrl ? (
                                            <a
                                                href={r.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => handleReportView(r.id)}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    background: 'rgba(16, 185, 129, 0.1)',
                                                    color: '#34D399',
                                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                <span>열람</span>
                                                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </a>
                                        ) : (
                                            <button
                                                onClick={() => handleReportView(r.id)}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    background: 'rgba(16, 185, 129, 0.1)',
                                                    color: '#34D399',
                                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <span>열람</span>
                                                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/*/!* Bottom Status Bar *!/*/}
            {/*<footer style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #1E2A44', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8' }}>*/}
            {/*    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>*/}
            {/*        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34D399' }} />*/}
            {/*        /!*<span>데이터 최신 동기화 완료 (Real-time Synced)</span>*!/*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        전체 {filteredReports.length}건 중 {filteredReports.length}건 표시됨*/}
            {/*    </div>*/}
            {/*</footer>*/}
        </section>

        {/* Executive Upload & Management Modal */}
        <ReportUploadModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            onSuccess={handleUploadSuccess}
            reports={reports}
            onDeleteReport={handleDeleteReport}
            onDeleteMultipleReports={handleDeleteMultipleReports}
        />
      </main>
    </div>
    );
}

export default ActivityPage;