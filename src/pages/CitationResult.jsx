import { useState } from 'react';
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
  const [registerOpenId, setRegisterOpenId] = useState(null);

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
                  <span className="cr-stat-help-wrap">
                    <span className="cr-stat-help">?</span>
                    <span className="cr-stat-help-tooltip">참고문헌이 CK DB에서 모든 항목 확인 완료</span>
                  </span>
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
                  <span className="cr-stat-help-wrap">
                    <span className="cr-stat-help">?</span>
                    <span className="cr-stat-help-tooltip">참고문헌의 일부 항목만 CK DB에서 확인됨</span>
                  </span>
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
                  <span className="cr-stat-help-wrap">
                    <span className="cr-stat-help">?</span>
                    <span className="cr-stat-help-tooltip">참고문헌이 CK DB에서 확인되지 않음</span>
                  </span>
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
                  <span className="cr-stat-help-wrap">
                    <span className="cr-stat-help">?</span>
                    <span className="cr-stat-help-tooltip">검사 없이 직접 입력된 참고문헌</span>
                  </span>
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
              const isRegisterOpen = registerOpenId === ref.id;
              return (
                <div key={ref.id} className={`cr-ref-item${isRegisterOpen ? ' cr-ref-item--register-open' : ''}`}>
                  <div className="cr-ref-main">
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
                        <button
                          className={`cr-register-btn${isRegisterOpen ? ' cr-register-btn--active' : ''}`}
                          onClick={() => setRegisterOpenId(isRegisterOpen ? null : ref.id)}
                        >
                          <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
                            <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                            <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                          </svg>
                          CK 텀즈 등록 신청
                        </button>
                      )}
                    </div>
                  </div>
                  {isRegisterOpen && (
                    <div className="cr-register-panel">
                      <h4 className="cr-register-panel-title">CK 텀즈 등록 신청</h4>
                      <div className="cr-register-panel-intro">
                        <p>CK 텀즈에 아래 참고문헌 정보의 등록을 신청합니다.</p>
                        <p>신청하신 참고문헌 정보는 관리자의 확인 후 승인되며, 승인 이후 다시 검사하시면 유효한 참고문헌으로 판정됩니다.</p>
                        <p>CK 텀즈에 등록신청을 한 참고문헌은 결과가 &apos;직접 입력&apos;으로 표시됩니다.</p>
                        <p>승인 이후 참고문헌 정보가 변경된 경우, 다시 등록 신청을 해주세요.</p>
                      </div>
                      <p className="cr-register-section-label">참고문헌 정보</p>
                      <div className="cr-register-form-grid">
                        <div className="cr-form-row">
                          <label className="cr-form-label">참고문헌 유형 <span className="cr-req">*</span></label>
                          <select className="cr-form-select" defaultValue={ref.type}>
                            <option>논문</option><option>단행본</option><option>보고서</option>
                            <option>웹페이지</option><option>뉴스</option><option>특허</option>
                            <option>표준문서</option><option>데이터셋</option><option>기타</option>
                          </select>
                        </div>
                        <div className="cr-form-row">
                          <label className="cr-form-label">제목/도서명 <span className="cr-req">*</span></label>
                          <input className="cr-form-input" type="text" placeholder="제목 또는 도서명을 입력하세요" />
                        </div>
                        <div className="cr-form-row">
                          <label className="cr-form-label">저자 <span className="cr-req">*</span></label>
                          <input className="cr-form-input" type="text" placeholder="저자명 입력 후 Enter 또는 ; 로 추가" />
                        </div>
                        <div className="cr-form-row">
                          <label className="cr-form-label">저널/학술지명</label>
                          <input className="cr-form-input" type="text" />
                        </div>
                        <div className="cr-form-row">
                          <label className="cr-form-label">발행처/출판사명</label>
                          <input className="cr-form-input" type="text" />
                        </div>
                        <div className="cr-form-row">
                          <label className="cr-form-label">발행일 <span className="cr-req">*</span></label>
                          <input className="cr-form-input" type="text" placeholder="예: 2024" />
                        </div>
                        <div className="cr-form-row">
                          <label className="cr-form-label">작성언어</label>
                          <select className="cr-form-select">
                            <option>한국어</option><option>영어</option><option>중국어</option><option>기타</option>
                          </select>
                        </div>
                        <div className="cr-form-row cr-form-row--split">
                          <label className="cr-form-label">권 / 호</label>
                          <div className="cr-form-split">
                            <input className="cr-form-input" type="text" placeholder="권" />
                            <input className="cr-form-input" type="text" placeholder="예: 3" />
                          </div>
                        </div>
                        <div className="cr-form-row">
                          <label className="cr-form-label">페이지</label>
                          <input className="cr-form-input" type="text" placeholder="예: 93-119" />
                        </div>
                        <div className="cr-form-row">
                          <label className="cr-form-label">DOI</label>
                          <input className="cr-form-input" type="text" placeholder="예: 10.1234/abcd.2024.01" />
                        </div>
                        <div className="cr-form-row">
                          <label className="cr-form-label">URL <span className="cr-req">*</span></label>
                          <input className="cr-form-input" type="text" placeholder="참고문헌 원문 링크를 입력하세요" />
                        </div>
                        <div className="cr-form-row">
                          <label className="cr-form-label">저자키워드</label>
                          <input className="cr-form-input" type="text" placeholder="저자 키워드 입력 후 Enter 또는 ; 로 추가" />
                        </div>
                        <div className="cr-form-row cr-form-row--textarea">
                          <label className="cr-form-label">초록</label>
                          <textarea className="cr-form-textarea" placeholder="참고문헌의 초록을 입력하세요 (최대 2,000자)" rows={4} />
                        </div>
                      </div>
                      <p className="cr-register-section-label">신청자 email</p>
                      <div className="cr-register-form-grid">
                        <div className="cr-form-row">
                          <label className="cr-form-label">이메일 <span className="cr-req">*</span></label>
                          <input className="cr-form-input" type="email" placeholder="example@email.com" />
                        </div>
                      </div>
                      <p className="cr-register-email-note">등록 신청 결과와 안내를 위한 이메일 주소를 입력해주세요.</p>
                      <p className="cr-register-email-note">입력하신 이메일은 CK 텀즈 등록 심사 결과 안내 목적으로만 사용됩니다.</p>
                      <div className="cr-register-actions">
                        <button className="cr-cancel-btn" onClick={() => setRegisterOpenId(null)}>취소</button>
                        <button className="cr-submit-btn" onClick={() => { alert('등록 신청이 완료되었습니다 (목업)'); setRegisterOpenId(null); }}>등록 신청</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
