import { useState, useRef, useCallback } from 'react';

const ACCEPTED_EXTENSIONS = ['.hwp', '.hwpx', '.doc', '.docx', '.pdf', '.txt'];
const MAX_SIZE_MB = 100;

const DOC_TYPES = [
  '학위논문', '학술논문', '과제물', '연구/정책보고서', '연구대회/공모자료',
];

const CITATION_STYLES = ['APA', 'Chicago', 'MLA', 'Vancouver'];

function isValidFile(file) {
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  return ACCEPTED_EXTENSIONS.includes(ext) && file.size <= MAX_SIZE_MB * 1024 * 1024;
}

export default function UploadForm({ onSubmit, compact = false }) {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('학위논문');
  const [checkStyle, setCheckStyle] = useState(true);
  const [checkValidity, setCheckValidity] = useState(true);
  const [scopeFormat, setScopeFormat] = useState(true);
  const [scopeRecency, setScopeRecency] = useState(true);
  const [scopeBias, setScopeBias] = useState(true);
  const [citationStyle, setCitationStyle] = useState('APA');

  const [uploading, setUploading] = useState(false);

  const canSubmit = file && !uploading;

  const handleFile = useCallback((f) => {
    if (f && isValidFile(f)) setFile(f);
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      handleFile(e.target.files?.[0]);
      e.target.value = '';
    },
    [handleFile],
  );

  const handleSubmit = () => {
    if (!canSubmit || !onSubmit) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      onSubmit(file.name);
    }, 2000);
  };

  const radioName = compact ? 'popupDocType' : 'docType';
  const citationName = compact ? 'popupCitation' : 'citationStyle';

  return (
    <div className="upl-form-wrapper">
      <div className={`upl-form${compact ? ' upl-form--compact' : ''}`}>
        {/* 문서 유형 */}
        <div className="upl-form-row">
          <div className="upl-form-label">
            문서 유형
            <span className="upl-form-label-icon" title="문서 유형을 선택하세요">&#9432;</span>
          </div>
          <div className="upl-form-value">
            <div className="upl-radio-wrap">
              {DOC_TYPES.map((t) => (
                <label key={t} className="upl-radio">
                  <input
                    type="radio"
                    name={radioName}
                    value={t}
                    checked={docType === t}
                    onChange={() => setDocType(t)}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 파일 첨부 */}
        <div className="upl-form-row">
          <div className="upl-form-label">파일 첨부</div>
          <div className="upl-form-value upl-file-row">
            <input
              ref={fileInputRef}
              type="file"
              accept=".hwp,.hwpx,.doc,.docx,.pdf,.txt"
              style={{ display: 'none' }}
              onChange={handleInputChange}
            />
            <button
              className="upl-file-btn"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              파일 선택
            </button>
            {file ? (
              <span className="upl-file-name">
                {file.name}
                <button
                  className="upl-file-remove"
                  onClick={() => setFile(null)}
                  aria-label="파일 제거"
                >
                  &times;
                </button>
              </span>
            ) : (
              <span className="upl-file-placeholder">
                hwp(x), doc(x), pdf, txt 확장자를 지원하며 최대 100MB까지 업로드 가능합니다.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="upl-submit-row">
        <button
          className="upl-submit-btn"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          검사하기
        </button>
      </div>

      {/* ── Uploading overlay ── */}
      {uploading && (
        <div className="upl-uploading-overlay">
          <div className="upl-uploading-box">
            <div className="upl-uploading-spinner" />
            <p className="upl-uploading-msg">문서 업로드 중입니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}
