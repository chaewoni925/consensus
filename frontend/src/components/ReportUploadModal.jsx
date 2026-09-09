import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function ReportUploadModal({ isOpen, onClose, onSuccess }) {
  const [executiveKey, setExecutiveKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState('');

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('기업리서치 부');
  const [category, setCategory] = useState('COMPANY');
  const [reportType, setReportType] = useState('기업분석 리포트');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (executiveKey.trim() === 'consensus2024!') {
      setIsAuth(true);
      setAuthError('');
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

    try {
      const res = await axiosInstance.post('/api/reports', formData, {
        headers: {
          'X-Executive-Key': executiveKey
        }
      });
      setUploading(false);
      onSuccess(res.data);
      handleClose();
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
      handleClose();
    }
  };

  const handleClose = () => {
    setIsAuth(false);
    setShowPassword(false);
    setExecutiveKey('');
    setAuthError('');
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
        background: 'rgba(12, 21, 38, 0.8)',
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
          maxWidth: '480px',
          background: 'rgba(22, 35, 59, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '20px',
          padding: '36px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          position: 'relative',
          fontFamily: "'Pretendard', sans-serif"
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '22px',
            right: '22px',
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
            <div style={{ font: "800 11px 'JetBrains Mono', monospace", color: '#9DC4EE', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
              EXECUTIVE ACCESS REQUIRED
            </div>
            <h3 style={{ margin: '0 0 10px', fontFamily: "'Pretendard', sans-serif", fontWeight: 800, fontSize: '24px', color: '#FFFFFF' }}>
              운영진 비밀번호 인증
            </h3>
            <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '28px', wordBreak: 'keep-all' }}>
              파일 업로드는 가톨릭대학교 금융학회 컨센서스 운영진 인증 후 이용 가능합니다.
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
                  /* Eye Off Icon */
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  /* Eye Open Icon */
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
          <form onSubmit={handleFormSubmit}>
            <div style={{ font: "800 11px 'JetBrains Mono', monospace", color: '#9DC4EE', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
              NEW REPORT REGISTRATION
            </div>
            <h3 style={{ margin: '0 0 24px', fontFamily: "'Pretendard', sans-serif", fontWeight: 800, fontSize: '24px', color: '#FFFFFF' }}>
              신규 리포트 등록
            </h3>

            {/* Category Select */}
            <div style={{ marginBottom: '18px' }}>
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
                  padding: '11px 14px',
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
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', fontWeight: 600 }}>리포트 제목</label>
              <input
                type="text"
                placeholder="예) HPSP 기업분석 리포트 또는 2026 하반기 House View"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', fontWeight: 600 }}>발행 부서 / 팀</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
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
                    padding: '11px 14px',
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
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', fontWeight: 600 }}>발행일자</label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
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

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', fontWeight: 600 }}>리포트 첨부파일 (PDF / DOCX / HWP)</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
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
        )}
      </div>
    </div>
  );
}

export default ReportUploadModal;
