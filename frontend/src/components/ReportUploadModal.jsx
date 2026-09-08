import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function ReportUploadModal({ isOpen, onClose, onSuccess }) {
  const [executiveKey, setExecutiveKey] = useState('');
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
        fileName: file ? file.name : null
      };
      setUploading(false);
      onSuccess(newLocalReport);
      handleClose();
    }
  };

  const handleClose = () => {
    setIsAuth(false);
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
        background: 'rgba(11, 16, 33, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: '#0E162D',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          position: 'relative'
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
            color: '#94A3B8',
            fontSize: '22px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {!isAuth ? (
          <form onSubmit={handleAuthSubmit}>
            <div style={{ font: "600 11px 'JetBrains Mono', monospace", color: '#10B981', letterSpacing: '.2em', marginBottom: '8px' }}>
              EXECUTIVE ACCESS REQUIRED
            </div>
            <h3 style={{ margin: '0 0 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', color: '#F1F5F9' }}>
              운영진 비밀번호 인증
            </h3>
            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '24px' }}>
              파일 업로드는 가톨릭대학교 금융학회 컨센서스 운영진 인증 후 이용 가능합니다.
            </p>

              git add .
              git commit -m "변경사항 설명"
              git push<input
              type="password"
              placeholder="운영진 비밀번호 입력 "
              value={executiveKey}
              onChange={(e) => setExecutiveKey(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                background: '#0B1225',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                color: '#F1F5F9',
                fontSize: '14px',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            />

            {authError && <div style={{ color: '#F43F5E', fontSize: '12px', marginBottom: '16px' }}>{authError}</div>}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: '#10B981',
                color: '#FFFFFF',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)'
              }}
            >
              운영진 인증하기
            </button>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div style={{ font: "600 11px 'JetBrains Mono', monospace", color: '#10B981', letterSpacing: '.2em', marginBottom: '8px' }}>
              NEW REPORT REGISTRATION
            </div>
            <h3 style={{ margin: '0 0 20px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', color: '#F1F5F9' }}>
              신규 리포트 등록
            </h3>

            {/* Category Select */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>리포트 카테고리 (구분)</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === 'COMPANY') {
                    setReportType('기업분석 리포트');
                    setDepartment('기업리서치 부');
                  } else {
                    setReportType('House View');
                    setDepartment('매크로 컨센서스 부');
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#0B1225',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  color: '#F1F5F9',
                  fontSize: '13.5px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="COMPANY">기업리서치 리포트 (Valuation)</option>
                <option value="MACRO">매크로 하우스뷰 (Macro House View)</option>
              </select>
            </div>

            {/* Title */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>리포트 제목</label>
              <input
                type="text"
                placeholder="예) HPSP 기업분석 리포트 또는 2026 하반기 House View"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#0B1225',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  color: '#F1F5F9',
                  fontSize: '13.5px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Department & Report Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>발행 부서 / 팀</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#0B1225',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    color: '#F1F5F9',
                    fontSize: '13px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>산출물 유형</label>
                <input
                  type="text"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#0B1225',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    color: '#F1F5F9',
                    fontSize: '13px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Date & File */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>발행일자</label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#0B1225',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  color: '#F1F5F9',
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>리포트 첨부파일 (PDF / DOCX / HWP)</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '8px',
                  background: '#0B1225',
                  border: '1px dashed rgba(16, 185, 129, 0.4)',
                  color: '#CBD5E1',
                  fontSize: '12.5px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {formError && <div style={{ color: '#F43F5E', fontSize: '12px', marginBottom: '16px' }}>{formError}</div>}

            <button
              type="submit"
              disabled={uploading}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: uploading ? '#475569' : '#10B981',
                color: '#FFFFFF',
                fontWeight: 600,
                border: 'none',
                cursor: uploading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)'
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
