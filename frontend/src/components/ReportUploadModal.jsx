import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function ReportUploadModal({ isOpen, onClose, onSuccess, reports = [], onDeleteReport, onDeleteMultipleReports }) {
  const [executiveKey, setExecutiveKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState('');
  const [modalTab, setModalTab] = useState('UPLOAD'); // 'UPLOAD' or 'MANAGE'
  const [deleteCategory, setDeleteCategory] = useState('ALL'); // 'ALL', 'COMPANY', 'MACRO', 'INVESTMENT_RESULT'
  const [selectedIds, setSelectedIds] = useState([]);

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('기업리서치 부');
  const [category, setCategory] = useState('COMPANY');
  const [reportType, setReportType] = useState('기업분석 리포트');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const filteredDeleteReports = reports.filter((r) => {
    if (deleteCategory === 'ALL') return true;
    return r.category === deleteCategory;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredDeleteReports.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return;
    if (onDeleteMultipleReports) {
      onDeleteMultipleReports(selectedIds);
      setSelectedIds([]);
    } else if (onDeleteReport) {
      if (window.confirm(`선택한 ${selectedIds.length}개의 리포트를 삭제하시겠습니까?`)) {
        selectedIds.forEach((id) => onDeleteReport(id));
        setSelectedIds([]);
      }
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (executiveKey.trim() === 'consensus2024!') {
      setIsAuth(true);
      setAuthError('');
      sessionStorage.setItem('consensus_exec_auth', 'true');
    } else {
      setAuthError('운영진 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('리포트 제목을 입력해 주세요.');
      return;
    }

    setUploading(true);
    setFormError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('department', department);
    formData.append('category', category);
    formData.append('reportType', reportType);
    formData.append('publishDate', publishDate);
    if (file) {
      formData.append('file', file);
    }

    const resetFormInputs = () => {
      setTitle('');
      setFile(null);
      setFormError('');
    };

    try {
      const res = await axiosInstance.post('/api/reports', formData, {
        headers: {
          'X-Executive-Key': executiveKey
        }
      });
      setUploading(false);
      onSuccess(res.data);
      resetFormInputs();
      alert('✅ 리포트가 성공적으로 등록되었습니다.');
    } catch (err) {
      console.warn('API error, saving locally for preview:', err);
      const localFileUrl = file ? URL.createObjectURL(file) : null;
      const newLocalReport = {
        id: 'local-' + Date.now(),
        title: title,
        department: department,
        category: category,
        reportType: reportType,
        publishDate: publishDate,
        fileUrl: localFileUrl,
        fileName: file ? file.name : null,
        views: 0
      };
      setUploading(false);
      onSuccess(newLocalReport);
      resetFormInputs();
      alert('✅ 리포트가 성공적으로 등록되었습니다.');
    }
  };

  const handleClose = () => {
    setIsAuth(false);
    setShowPassword(false);
    setExecutiveKey('');
    setAuthError('');
    setModalTab('UPLOAD');
    setTitle('');
    setDepartment('기업리서치 부');
    setCategory('COMPANY');
    setReportType('기업분석 리포트');
    setFile(null);
    setFormError('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(12, 21, 38, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'rgba(22, 35, 59, 0.92)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '20px',
          padding: '36px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          fontFamily: "'Pretendard', sans-serif"
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '20px',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
        >
          ✕
        </button>

        {!isAuth ? (
          <form onSubmit={handleAuthSubmit}>
            <div style={{ font: "800 11px 'Pretendard', sans-serif", color: '#9DC4EE', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
              EXECUTIVE MANAGEMENT
            </div>
            <h3 style={{ margin: '0 0 10px', fontFamily: "'Pretendard', sans-serif", fontWeight: 800, fontSize: '24px', color: '#FFFFFF' }}>
              운영진 비밀번호 인증
            </h3>
            <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '28px', wordBreak: 'keep-all' }}>
              리포트 등록 및 삭제 관리는 운영진 인증 후 이용 가능합니다.
            </p>

            <div style={{ position: 'relative', marginBottom: '18px' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="운영진 비밀번호 입력"
                value={executiveKey}
                onChange={(e) => setExecutiveKey(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 44px 13px 16px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.25s ease'
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#9DC4EE')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: showPassword ? '#9DC4EE' : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s ease'
                }}
                title={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>

            {authError && <div style={{ color: '#F43F5E', fontSize: '12.5px', marginBottom: '18px', fontWeight: 600 }}>{authError}</div>}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '10px',
                background: 'linear-gradient(90deg, rgba(157,196,238,0.3), rgba(157,196,238,0.15))',
                border: '1px solid #9DC4EE',
                color: '#FFFFFF',
                fontWeight: 700,
                fontFamily: "'Pretendard', sans-serif",
                cursor: 'pointer',
                fontSize: '14.5px',
                letterSpacing: '0.04em',
                transition: 'all 0.25s ease',
                boxShadow: '0 0 16px rgba(157,196,238,0.2)'
              }}
            >
              운영진 인증하기
            </button>
          </form>
        ) : (
          <div>
            <div style={{ font: "800 11px 'Pretendard', sans-serif", color: '#9DC4EE', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
              EXECUTIVE ADMIN DASHBOARD
            </div>
            <h3 style={{ margin: '0 0 20px', fontFamily: "'Pretendard', sans-serif", fontWeight: 800, fontSize: '22px', color: '#FFFFFF' }}>
              운영진 리포트 관리
            </h3>

            {/* Management Mode Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.16)', paddingBottom: '12px' }}>
              <button
                onClick={() => setModalTab('UPLOAD')}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: modalTab === 'UPLOAD' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  border: modalTab === 'UPLOAD' ? '1px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: modalTab === 'UPLOAD' ? '#60A5FA' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ➕ 신규 리포트 등록
              </button>
              <button
                onClick={() => setModalTab('MANAGE')}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: modalTab === 'MANAGE' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  border: modalTab === 'MANAGE' ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: modalTab === 'MANAGE' ? '#F87171' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                🗑️ 등록 리포트 삭제 ({reports.length})
              </button>
            </div>

            {modalTab === 'UPLOAD' ? (
              <form onSubmit={handleFormSubmit}>
                {/* Category Select */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', fontWeight: 600 }}>리포트 카테고리 (구분)</label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCategory(val);
                      if (val === 'COMPANY') {
                        setReportType('기업분석 리포트');
                        setDepartment('기업리서치 부');
                      } else if (val === 'MACRO') {
                        setReportType('House View');
                        setDepartment('매크로 컨센서스 부');
                      } else if (val === 'INVESTMENT_RESULT') {
                        setReportType('운용결과 보고서');
                        setDepartment('투자운용 부');
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: '13.5px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  >
                    <option value="COMPANY" style={{ background: '#0C1526' }}>기업리서치 리포트 (Valuation)</option>
                    <option value="MACRO" style={{ background: '#0C1526' }}>매크로 하우스뷰 (Macro House View)</option>
                    <option value="INVESTMENT_RESULT" style={{ background: '#0C1526' }}>투자운용결과보고서 (Investment Result)</option>
                  </select>
                </div>

                {/* Title */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', fontWeight: 600 }}>리포트 제목</label>
                  <input
                    type="text"
                    placeholder="예) HPSP 기업분석 리포트 또는 2026 하반기 House View"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: '13.5px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Department & Report Type */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', fontWeight: 600 }}>발행 부서 / 팀</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(0, 0, 0, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#FFFFFF',
                        fontFamily: "'Pretendard', sans-serif",
                        fontSize: '13px',
                        boxSizing: 'border-box',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', fontWeight: 600 }}>산출물 유형</label>
                    <input
                      type="text"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(0, 0, 0, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#FFFFFF',
                        fontFamily: "'Pretendard', sans-serif",
                        fontSize: '13px',
                        boxSizing: 'border-box',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Date & File */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', fontWeight: 600 }}>발행일자</label>
                  <input
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: '13px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', fontWeight: 600 }}>리포트 첨부파일 (PDF / DOCX / HWP)</label>
                  <input
                    key={file ? (file.name + file.lastModified) : 'empty-file-input'}
                    type="file"
                    onChange={(e) => setFile(e.target.files[0] || null)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '10px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      border: '1px dashed rgba(157, 196, 238, 0.4)',
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: '12.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {formError && <div style={{ color: '#F43F5E', fontSize: '12.5px', marginBottom: '18px', fontWeight: 600 }}>{formError}</div>}

                <button
                  type="submit"
                  disabled={uploading}
                  style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: '10px',
                    background: uploading ? '#475569' : 'linear-gradient(90deg, rgba(157,196,238,0.3), rgba(157,196,238,0.15))',
                    border: '1px solid #9DC4EE',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontFamily: "'Pretendard', sans-serif",
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontSize: '14.5px',
                    letterSpacing: '0.04em',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 0 16px rgba(157,196,238,0.2)'
                  }}
                >
                  {uploading ? '등록 중...' : '리포트 업로드 완료'}
                </button>
              </form>
            ) : (
              <div>
                {/* Category Filter Sub-Tabs */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'ALL', label: '전체' },
                    { id: 'COMPANY', label: '기업리서치' },
                    { id: 'MACRO', label: '매크로 하우스뷰' },
                    { id: 'INVESTMENT_RESULT', label: '운용결과' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setDeleteCategory(cat.id);
                        setSelectedIds([]);
                      }}
                      style={{
                        padding: '5px 10px',
                        fontSize: '11.5px',
                        fontWeight: deleteCategory === cat.id ? 700 : 600,
                        borderRadius: '6px',
                        background: deleteCategory === cat.id ? '#3B82F6' : 'rgba(0, 0, 0, 0.25)',
                        color: deleteCategory === cat.id ? '#FFFFFF' : '#94A3B8',
                        border: '1px solid ' + (deleteCategory === cat.id ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)'),
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Batch Delete & Select All Action Bar */}
                {filteredDeleteReports.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px', marginBottom: '12px', fontSize: '12px', color: '#94A3B8' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none' }}>
                      <input
                        type="checkbox"
                        checked={filteredDeleteReports.length > 0 && selectedIds.length === filteredDeleteReports.length}
                        onChange={handleSelectAll}
                        style={{ accentColor: '#EF4444', cursor: 'pointer' }}
                      />
                      <span>전체 선택 ({selectedIds.length}/{filteredDeleteReports.length})</span>
                    </label>

                    <button
                      onClick={handleBatchDelete}
                      disabled={selectedIds.length === 0}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: selectedIds.length > 0 ? '#EF4444' : 'rgba(239, 68, 68, 0.2)',
                        color: selectedIds.length > 0 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                        border: 'none',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: selectedIds.length > 0 ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      선택 항목 일괄 삭제 ({selectedIds.length})
                    </button>
                  </div>
                )}

                {/* Report List Items */}
                <div style={{ maxHeight: '320px', overflowY: 'auto', paddingRight: '4px' }}>
                  {filteredDeleteReports.length === 0 ? (
                    <div style={{ padding: '40px 0', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                      해당 카테고리에 등록된 리포트가 없습니다.
                    </div>
                  ) : (
                    filteredDeleteReports.map((r) => {
                      const isChecked = selectedIds.includes(r.id);
                      return (
                        <div
                          key={r.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'space-between',
                            padding: '10px 12px',
                            marginBottom: '8px',
                            background: isChecked ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0, 0, 0, 0.25)',
                            border: '1px solid ' + (isChecked ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.12)'),
                            borderRadius: '10px',
                            gap: '10px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleSelect(r.id)}
                            style={{ accentColor: '#EF4444', cursor: 'pointer' }}
                          />

                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {r.title}
                            </div>
                            <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '3px' }}>
                              {r.department || '기업리서치 부'} · {r.publishDate || '2026.09'}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (onDeleteReport) {
                                onDeleteReport(r.id, r.title);
                              }
                            }}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              background: 'rgba(239, 68, 68, 0.15)',
                              color: '#F87171',
                              border: '1px solid rgba(239, 68, 68, 0.35)',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                              e.currentTarget.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                              e.currentTarget.style.color = '#F87171';
                            }}
                          >
                            🗑️ 삭제
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportUploadModal;
