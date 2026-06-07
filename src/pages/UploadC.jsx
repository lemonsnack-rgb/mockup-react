import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UploadC.css';

const ACCEPTED = '.hwp,.hwpx,.doc,.docx,.pdf,.txt';
const MAX_MB = 100;
const DOC_TYPES = ['학위논문', '학술논문', '과제물', '연구/정책보고서', '연구대회/공모자료'];

export default function UploadC() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  /* view: 'upload' | 'direct' */
  const [view, setView] = useState('upload');
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  /* direct input */
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [directSaved, setDirectSaved] = useState(false);

  /* setting popup */
  const [showSetting, setShowSetting] = useState(false);
  const [docType, setDocType] = useState('학위논문');
  const [submitting, setSubmitting] = useState(false);

  /* ── file handlers ── */
  const isValid = (f) => {
    const ext = f.name.slice(f.name.lastIndexOf('.')).toLowerCase();
    return ACCEPTED.split(',').includes(ext) && f.size <= MAX_MB * 1024 * 1024;
  };

  const handleFile = useCallback((f) => {
    if (f && isValid(f)) setFile(f);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  }, [handleFile]);

  /* ── direct input save ── */
  const handleDirectSave = () => {
    if (!title.trim()) { alert('제목을 입력하세요.'); return; }
    if (!body.trim()) { alert('본문을 입력하세요.'); return; }
    setFile({ name: title.trim() + '.txt', size: body.length, direct: true });
    setDirectSaved(true);
    setView('upload');
  };

  /* ── 문서 검사 클릭 ── */
  const handleCheckClick = () => {
    if (!file) { alert('파일을 업로드하거나 직접 입력해주세요.'); return; }
    setShowSetting(true);
  };

  /* ── submit ── */
  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      navigate('/c/list?uploaded=' + encodeURIComponent(file.name));
    }, 1500);
  };

  /* ══════════════════ RENDER ══════════════════ */

  /* ── 직접 입력 화면 ── */
  if (view === 'direct') {
    return (
      <div className="uc-page">
        <div className="uc-direct">
          <div className="uc-direct-header">
            <div className="uc-direct-title-row">
              <svg className="uc-direct-pencil" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              <input
                className="uc-direct-title-input"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus
              />
            </div>
            <button className="uc-direct-close" onClick={() => setView('upload')} aria-label="닫기">&times;</button>
          </div>
          <textarea
            className="uc-direct-body"
            placeholder="본문 내용을 입력해주세요"
            value={body}
            onChange={e => setBody(e.target.value.slice(0, 3000))}
          />
          <div className="uc-direct-counter">{body.length} / 3,000</div>
        </div>

        {/* 하단 고정 바 */}
        <div className="uc-bottom-bar">
          <button className="uc-btn uc-btn--outline" onClick={() => setView('upload')}>취소</button>
          <button className="uc-btn uc-btn--primary" onClick={handleDirectSave}>저장</button>
        </div>
      </div>
    );
  }

  /* ── 업로드 화면 (기본) ── */
  return (
    <div className="uc-page">
      <div className="uc-upload">
        {/* 타이틀 */}
        <div className="uc-upload-header">
          <h2 className="uc-upload-title">참고문헌 유효성 검증</h2>
          <p className="uc-upload-subtitle">카피킬러 100억건 DB와 비교하여 참고문헌이 실재 있는지 여부를 검증합니다.</p>
        </div>
        {/* 드롭존 */}
        <div
          className={`uc-dropzone${dragOver ? ' uc-dropzone--hover' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          tabIndex={0}
        >
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPTED}
            style={{ display: 'none' }}
            onChange={e => { handleFile(e.target.files?.[0]); e.target.value = ''; }}
          />
          <p className="uc-dropzone-title">파일을 여기에 드래그 & 드롭 하거나</p>
          <div className="uc-dropzone-btns">
            <button className="uc-btn uc-btn--outline-cyan" type="button" onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              파일 업로드
            </button>
            <span className="uc-dropzone-or">또는</span>
            <button className="uc-btn uc-btn--outline-cyan" type="button" onClick={e => { e.stopPropagation(); setView('direct'); }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              직접 입력
            </button>
          </div>
          <p className="uc-dropzone-info">업로드 가능 용량 : 100.00MB</p>
          <p className="uc-dropzone-info">업로드 가능 확장자 : *.hwp;*.hwpx;*.doc;*.docx;*.pdf;*.txt;</p>
        </div>

        {/* 파일 목록 — 드롭존 아래 */}
        {file && (
          <div className="uc-file-row">
            <span className="uc-file-row-name">{file.name} (100.00%)</span>
            <span className="uc-file-row-status">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--ck-cyan)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              검사 가능
            </span>
            <button className="uc-file-row-delete" onClick={() => { setFile(null); setDirectSaved(false); }}>삭제</button>
          </div>
        )}
      </div>

      {/* 딤 오버레이 */}
      {showSetting && <div className="uc-popup-overlay" onClick={() => setShowSetting(false)} />}

      {/* 하단 고정 바 + 팝업 앵커 */}
      <div className="uc-bottom-bar">
        <Link to="/c/list" className="uc-btn uc-btn--outline">← 뒤로가기</Link>
        <button className="uc-btn uc-btn--primary" onClick={handleCheckClick}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          검사하기
        </button>

        {/* 팝업 — 문서검사 버튼 위에서 올라옴 */}
        {showSetting && (
          <div className="uc-popup" onClick={e => e.stopPropagation()}>
            <div className="uc-popup-header">
              <h3 className="uc-popup-title">문서유형 설정</h3>
              <button className="uc-popup-close" onClick={() => setShowSetting(false)}>&times;</button>
            </div>
            <div className="uc-popup-body">
              <div className="uc-popup-row">
                <label className="uc-popup-label">문서 유형</label>
                <select className="uc-popup-select" value={docType} onChange={e => setDocType(e.target.value)}>
                  {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="uc-popup-footer">
              <button className="uc-btn uc-btn--outline" onClick={() => setShowSetting(false)}>취소</button>
              <button className="uc-btn uc-btn--primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <><span className="uc-spinner" /> 검사 요청 중...</>
                ) : (
                  <><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> 검사 시작</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
