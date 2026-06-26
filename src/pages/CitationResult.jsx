import { useNavigate } from 'react-router-dom';
import { CITATION_DETAIL } from '../data/citationList';
import './CitationResult.css';

const STATUS_CONFIG = {
  confirmed: {
    label: '확인됨',
    iconClass: 'cr-status-icon--confirmed',
    labelClass: 'cr-status-label--confirmed',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: 'none', stroke: 'white', strokeWidth: 2.5 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l3 3 5-5" />
      </svg>
    ),
  },
  partial: {
    label: '부분 확인',
    iconClass: 'cr-status-icon--partial',
    labelClass: 'cr-status-label--partial',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: 'none', stroke: 'white', strokeWidth: 2.5 }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="13" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="0.5" fill="white" stroke="none" />
      </svg>
    ),
  },
  unconfirmed: {
    label: '미확인',
    iconClass: 'cr-status-icon--unconfirmed',
    labelClass: 'cr-status-label--unconfirmed',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: 'none', stroke: 'white', strokeWidth: 2.5 }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" />
        <line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" />
      </svg>
    ),
  },
};

export default function CitationResult() {
  const navigate = useNavigate();
  const detail = CITATION_DETAIL;

  return (
    <div className="cr-page">
      {/* Header */}
      <header className="cr-header">
        <p className="cr-filename">{detail.name}</p>
        <div className="cr-header-btns">
          <button className="cr-list-btn" onClick={() => navigate('/citation')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            목록
          </button>
          <button className="cr-download-btn" onClick={() => alert('검증 결과 다운로드 (목업)')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 10.5L4.5 7H7V2H9V7H11.5L8 10.5Z" fill="currentColor" />
              <path d="M3 13H13V11.5H3V13Z" fill="currentColor" />
            </svg>
            검증 결과 다운로드
          </button>
        </div>
      </header>

      <div className="cr-body">
        {/* 검증 결과 요약 */}
        <div>
          <h3 className="cr-section-title">검증 결과 요약</h3>
          <div className="cr-summary-card">
            {/* Stat cards */}
            <div className="cr-stat-cards">
              <div className="cr-stat cr-stat--total">
                <div className="cr-stat-label-row">
                  <span className="cr-stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" style={{ width: 20, height: 20 }}>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="8" y1="8.5" x2="16" y2="8.5" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                      <line x1="8" y1="15.5" x2="16" y2="15.5" />
                    </svg>
                  </span>
                  <span className="cr-stat-label">전체</span>
                </div>
                <div className="cr-stat-count">{detail.summary.total}<span className="cr-stat-unit">건</span></div>
              </div>

              <div className="cr-stat cr-stat--confirmed">
                <div className="cr-stat-label-row">
                  <span className="cr-stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00c2ff" strokeWidth="2.5" style={{ width: 20, height: 20 }}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12l3 3 5-5" />
                    </svg>
                  </span>
                  <span className="cr-stat-label">확인됨</span>
                  <span className="cr-stat-help">?</span>
                </div>
                <div className="cr-stat-count">{detail.summary.confirmed}<span className="cr-stat-unit">건</span></div>
              </div>

              <div className="cr-stat cr-stat--partial">
                <div className="cr-stat-label-row">
                  <span className="cr-stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ff971c" strokeWidth="2.5" style={{ width: 20, height: 20 }}>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="13" strokeLinecap="round" />
                      <circle cx="12" cy="16.5" r="0.5" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <span className="cr-stat-label">부분 확인</span>
                  <span className="cr-stat-help">?</span>
                </div>
                <div className="cr-stat-count">{detail.summary.partial}<span className="cr-stat-unit">건</span></div>
              </div>

              <div className="cr-stat cr-stat--unconfirmed">
                <div className="cr-stat-label-row">
                  <span className="cr-stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ff4f79" strokeWidth="2.5" style={{ width: 20, height: 20 }}>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </span>
                  <span className="cr-stat-label">미확인</span>
                  <span className="cr-stat-help">?</span>
                </div>
                <div className="cr-stat-count">{detail.summary.unconfirmed}<span className="cr-stat-unit">건</span></div>
              </div>

              <div className="cr-stat cr-stat--manual">
                <div className="cr-stat-label-row">
                  <span className="cr-stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" style={{ width: 20, height: 20 }}>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="cr-stat-label">직접 입력</span>
                  <span className="cr-stat-help">?</span>
                </div>
                <div className="cr-stat-count">{detail.summary.manual}<span className="cr-stat-unit">건</span></div>
              </div>
            </div>

            {/* Reference type badges */}
            <p className="cr-type-label">참고문헌 유형</p>
            <div className="cr-type-tags">
              {detail.types.map(t => (
                <span key={t.label} className={`cr-type-tag cr-type-tag--${t.color}`}>
                  {t.label} {t.count}건
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 만족도 조사 링크 */}
        <div className="cr-survey-row">
          <a href="#" className="cr-survey-link" onClick={e => e.preventDefault()}>
            <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 2, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="8.5" strokeLinecap="round" />
              <line x1="12" y1="11" x2="12" y2="16" strokeLinecap="round" />
            </svg>
            만족도 조사에 참여해 주세요!
          </a>
        </div>

        {/* 상세 결과 */}
        <div>
          <h3 className="cr-section-title" style={{ marginTop: 16 }}>참고문헌 실재 여부 확인 상세 결과</h3>
          <div className="cr-detail-list">
            {detail.references.map((ref) => {
              const cfg = STATUS_CONFIG[ref.status];
              return (
                <div key={ref.id} className="cr-ref-item">
                  <div className="cr-ref-num">{ref.id}</div>
                  <div className="cr-ref-body">
                    <p className="cr-ref-text">
                      <span className="cr-ref-type-badge">{ref.type}</span>
                      {ref.text}
                    </p>
                    <div className="cr-verify-tags">
                      {ref.tags.map((tag, i) => (
                        <span key={i} className={`cr-vtag ${tag.match ? 'cr-vtag--match' : 'cr-vtag--need'}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="cr-ref-status">
                    <div className={`cr-status-icon ${cfg.iconClass}`}>
                      {cfg.icon}
                    </div>
                    <span className={`cr-status-label ${cfg.labelClass}`}>{cfg.label}</span>
                    {ref.ckTermsUrl ? (
                      <a href={ref.ckTermsUrl} className="cr-ckterms-link" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" style={{ width: 12, height: 12, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        CK 텀즈에서 확인
                      </a>
                    ) : (
                      <button className="cr-register-btn" onClick={() => alert('CK 텀즈 등록 신청 (목업)')}>
                        <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
                          <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                          <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                        </svg>
                        CK 텀즈 등록 신청
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
