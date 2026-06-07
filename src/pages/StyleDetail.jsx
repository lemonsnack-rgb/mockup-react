import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SUMMARY, CHECK_INFO, DOC_CITATION_COUNTS, CATEGORIES,
  FOOTNOTE_MISSING, REFERENCE_MISSING, FORMAT_ERROR,
  RECENCY_RISK, AUTHOR_BIAS, JOURNAL_BIAS, NORMAL_CITATION,
} from '../data/styleData';
import './StyleDetail.css';

/* ── 탭 목록 ── */
const TABS = [
  { key: 'summary', label: '검사 결과 요약', count: null },
  { key: FOOTNOTE_MISSING.key, label: FOOTNOTE_MISSING.label, count: FOOTNOTE_MISSING.count },
  { key: REFERENCE_MISSING.key, label: REFERENCE_MISSING.label, count: REFERENCE_MISSING.count },
  { key: FORMAT_ERROR.key, label: FORMAT_ERROR.label, count: FORMAT_ERROR.count },
  { key: RECENCY_RISK.key, label: RECENCY_RISK.label, count: RECENCY_RISK.count },
  { key: AUTHOR_BIAS.key, label: AUTHOR_BIAS.label, count: AUTHOR_BIAS.count },
  { key: JOURNAL_BIAS.key, label: JOURNAL_BIAS.label, count: JOURNAL_BIAS.count },
  { key: NORMAL_CITATION.key, label: NORMAL_CITATION.label, count: NORMAL_CITATION.count },
];

/* ── 페이지네이션 helper ── */
const PAGE_SIZE = 7;
function paginate(arr, page) {
  const start = (page - 1) * PAGE_SIZE;
  return arr.slice(start, start + PAGE_SIZE);
}
function totalPages(len) {
  return Math.max(1, Math.ceil(len / PAGE_SIZE));
}

/* ══════════════════════════════════════════ */
export default function StyleDetail({ embedded = false, hideInfo = embedded }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [pages, setPages] = useState({});

  const curPage = (key) => pages[key] || 1;
  const goPage = (key, p) => setPages(prev => ({ ...prev, [key]: p }));

  /* ── 공통: 경고 안내 박스 ── */
  const WarningNote = ({ text }) => (
    <div className="sc-warning">
      <span className="sc-warning-icon">⚠</span>
      <div>{text.split('\n').map((l, i) => <p key={i}>{l}</p>)}</div>
    </div>
  );

  /* ── 공통: 페이지네이션 ── */
  const PaginationBar = ({ catKey, total }) => {
    const tp = totalPages(total);
    const cp = curPage(catKey);
    if (tp <= 1) return null;
    return (
      <div className="sc-pagination">
        <button disabled={cp === 1} onClick={() => goPage(catKey, 1)}>&laquo;</button>
        {Array.from({ length: tp }, (_, i) => i + 1).map(p => (
          <button key={p} className={p === cp ? 'active' : ''} onClick={() => goPage(catKey, p)}>{p}</button>
        ))}
        <button disabled={cp === tp} onClick={() => goPage(catKey, tp)}>&raquo;</button>
      </div>
    );
  };

  /* ── 공통: 빈 목록 ── */
  const EmptyList = () => (
    <div className="sc-empty">이 유형에 해당하는 출처 및 상세정보가 없습니다.</div>
  );

  /* ══════════════════════════════════════════ */
  /* 검사 결과 요약 탭                            */
  /* ══════════════════════════════════════════ */
  const renderSummary = () => (
    <div className="sc-summary">
      <h3 className="sc-section-title" style={{ marginTop: 0 }}>검사 결과 요약</h3>
      <div className="sc-sum-cards">
        <div className="sc-sum-card risk">
          <div className="sc-sum-card-title">전체 위험 수</div>
          <div className="sc-sum-card-num risk">{SUMMARY.totalRisk}</div>
        </div>
        <div className="sc-sum-card types">
          <div className="sc-sum-card-title">위험 유형</div>
          <div className="sc-sum-type-row">
            {SUMMARY.types.map(t => (
              <div key={t.key} className="sc-sum-type-col">
                <div className="sc-sum-type-label">{t.label}</div>
                <div className="sc-sum-type-num" style={{ color: t.count > 0 ? t.color : 'var(--text-muted)' }}>{t.count}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="sc-sum-card normal">
          <div className="sc-sum-card-title">정상 인용 수</div>
          <div className="sc-sum-card-num normal">{SUMMARY.normalCount}</div>
        </div>
      </div>

      <div className="sc-chart">
        {SUMMARY.types.map(t => (
          <div key={t.key} className="sc-chart-col">
            <div className="sc-chart-val" style={{ color: t.count > 0 ? t.color : 'var(--text-muted)' }}>{t.count}</div>
            <div className="sc-chart-bar-wrap">
              <div className="sc-chart-bar" style={{ height: t.count > 0 ? Math.max(8, (t.count / SUMMARY.totalRisk) * 120) + 'px' : '0px', background: t.color }} />
            </div>
            <div className="sc-chart-label">{t.label}</div>
          </div>
        ))}
      </div>

      <div className="sc-info-box">
        <div className="sc-info-icon">●</div>
        <div className="sc-info-content">
          <p><strong>인용 검사는 문서에 기재된 내주, 참고문헌만을 기준으로 수행되었습니다. 의도적/비의도적으로 기재되지 않은 인용정보는 탐지하지 않습니다.</strong></p>
          <ul>
            <li><strong>인용정보 누락</strong> : 인용정보가 내주 혹은 참고문헌에만 기재되어 있어 보완이 필요한 경우입니다.</li>
            <li><strong>출처 표기 오류</strong> : 문서 작성 시, 사용한 출처 표기법과 다른 형태로 작성된 인용정보의 수 입니다.</li>
            <li><strong>최신성 위험</strong> : 발행 후, 10년 이상된 문헌을 참고한 경우입니다.</li>
            <li><strong>저널/저자 편향</strong> : 출처 중 특정 저널이나 저자가 차지하는 비율이 40%를 초과하여 편향으로 의심되는 경우입니다.</li>
          </ul>
        </div>
      </div>


      <h3 className="sc-section-title">문서 내 인용정보 수</h3>
      <div className="sc-doc-counts">
        <div className="sc-doc-count-item"><div className="sc-doc-count-label">탐지된 전체 인용정보 수</div><div className="sc-doc-count-num">{DOC_CITATION_COUNTS.total}</div></div>
        <div className="sc-doc-count-item"><div className="sc-doc-count-label">탐지된 내주 수</div><div className="sc-doc-count-num">{DOC_CITATION_COUNTS.intext}</div></div>
        <div className="sc-doc-count-item"><div className="sc-doc-count-label">탐지된 각주 수</div><div className="sc-doc-count-num">{DOC_CITATION_COUNTS.footnote}</div></div>
        <div className="sc-doc-count-item"><div className="sc-doc-count-label">탐지된 참고문헌 수</div><div className="sc-doc-count-num">{DOC_CITATION_COUNTS.reference}</div></div>
      </div>

      <div className="sc-info-box sm">
        <div className="sc-info-icon">●</div>
        <div className="sc-info-content">
          <p><strong>전체 인용정보 수의 기준은 다음과 같습니다.</strong></p>
          <ul>
            <li>전체 인용정보 수 = 탐지된 내주 수 + 탐지된 각주 수 + 탐지된 참고문헌 수</li>
            <li>전체 인용정보는 내주 또는 각주의 참고문헌 수는 동일한 수로 탐지되어야 합니다.</li>
            <li>1개의 참고문헌을 2개 이상의 영역에 나누어 인용한 경우에는, 정상적으로 인용표시를 하더라도 전체 인용정보 수가 탐지된 참고문헌 수 보다 적을 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );

  /* ══════════════════════════════════════════ */
  /* 각주/내주 누락                              */
  /* ══════════════════════════════════════════ */
  const renderFootnoteMissing = () => {
    const d = FOOTNOTE_MISSING;
    const items = paginate(d.items, curPage(d.key));
    return (
      <div className="sc-detail">
        <h2 className="sc-detail-header"><span className="sc-count-red">{d.count}개</span>의 <strong className="sc-count-red">각주/내주 누락</strong>이 발견되었습니다.</h2>
        <WarningNote text={d.warning} />
        <h3 className="sc-section-title">각주/내주 누락 참고문헌 목록</h3>
        <div className="sc-list-simple">
          {items.map(item => (
            <div key={item.id} className="sc-list-simple-item">
              <span className="sc-item-num">{item.id}</span>
              <span className="sc-item-text">{item.text}</span>
            </div>
          ))}
        </div>
        <PaginationBar catKey={d.key} total={d.items.length} />
      </div>
    );
  };

  /* ══════════════════════════════════════════ */
  /* 참고문헌 누락                               */
  /* ══════════════════════════════════════════ */
  const renderReferenceMissing = () => {
    const d = REFERENCE_MISSING;
    const items = paginate(d.items, curPage(d.key));
    return (
      <div className="sc-detail">
        <h2 className="sc-detail-header"><span className="sc-count-red">{d.count}개</span>의 <strong className="sc-count-red">참고문헌 누락</strong>이 발견되었습니다.</h2>
        <WarningNote text={d.warning} />
        <h3 className="sc-section-title">참고문헌 누락 인용정보 목록</h3>
        <div className="sc-list-table">
          {items.map(item => (
            <div key={item.id} className="sc-table-card">
              <div className="sc-table-num">{item.id}</div>
              <div className="sc-table-body">
                <div className="sc-table-row"><span className="sc-table-th">인용구</span><span className="sc-table-td">{item.citation}</span></div>
                <div className="sc-table-row"><span className="sc-table-th">각주</span><span className="sc-table-td">{item.footnote}</span></div>
                <div className="sc-table-row"><span className="sc-table-th">내주</span><span className="sc-table-td">{item.intext}</span></div>
              </div>
            </div>
          ))}
        </div>
        <PaginationBar catKey={d.key} total={d.items.length} />
      </div>
    );
  };

  /* ══════════════════════════════════════════ */
  /* 출처 표기 오류                               */
  /* ══════════════════════════════════════════ */
  const renderFormatError = () => {
    const d = FORMAT_ERROR;
    const items = paginate(d.items, curPage(d.key));
    return (
      <div className="sc-detail">
        <h2 className="sc-detail-header"><span className="sc-count-red">{d.count}개</span>의 <strong className="sc-count-red">출처 표기 오류</strong>가 발견되었습니다.</h2>
        <WarningNote text={d.warning} />
        <h3 className="sc-section-title">출처 표기 오류 인용정보 목록</h3>
        <div className="sc-list-table">
          {items.map(item => (
            <div key={item.id} className="sc-table-card">
              <div className="sc-table-num">{item.id}</div>
              <div className="sc-table-body">
                <div className="sc-table-row"><span className="sc-table-th">인용정보</span><span className="sc-table-td">{item.citation}</span></div>
                <div className="sc-table-row"><span className="sc-table-th">인용정보 유형</span><span className="sc-table-td">{item.type}</span></div>
                <div className="sc-table-row"><span className="sc-table-th">오류 유형</span><span className="sc-table-td sc-error-text">{item.errorType}</span></div>
              </div>
            </div>
          ))}
        </div>
        <PaginationBar catKey={d.key} total={d.items.length} />
      </div>
    );
  };

  /* ══════════════════════════════════════════ */
  /* 최신성 위험                                 */
  /* ══════════════════════════════════════════ */
  const renderRecencyRisk = () => {
    const d = RECENCY_RISK;
    const items = paginate(d.items, curPage(d.key));
    return (
      <div className="sc-detail">
        <h2 className="sc-detail-header"><span className="sc-count-red">{d.count}개</span>의 <strong className="sc-count-red">최신성 위험</strong>요소가 발견되었습니다.</h2>
        <WarningNote text={d.warning} />
        <h3 className="sc-section-title">인용정보 발행연도 분포</h3>
        <table className="sc-dist-table">
          <thead><tr><th>저널명</th><th>인용정보 수</th><th>비율</th></tr></thead>
          <tbody>
            {d.distribution.map((row, i) => (
              <tr key={i} className={row.highlight ? 'highlight' : ''}><td>{row.label}</td><td className={row.highlight ? 'sc-count-red' : ''}>{row.count}</td><td className={row.highlight ? 'sc-count-red' : ''}>{row.pct}</td></tr>
            ))}
          </tbody>
        </table>
        <h3 className="sc-section-title">발행 10년 경과 인용정보 목록</h3>
        <div className="sc-list-table">
          {items.map(item => (
            <div key={item.id} className="sc-table-card">
              <div className="sc-table-num">{item.id}</div>
              <div className="sc-table-body">
                <div className="sc-table-row"><span className="sc-table-th">인용정보</span><span className="sc-table-td">{item.citation}</span></div>
                <div className="sc-table-row"><span className="sc-table-th">유형</span><span className="sc-table-td">{item.type}</span></div>
              </div>
            </div>
          ))}
        </div>
        <PaginationBar catKey={d.key} total={d.items.length} />
      </div>
    );
  };

  /* ══════════════════════════════════════════ */
  /* 저자 편향 / 저널 편향 / 정상 인용 (공통)       */
  /* ══════════════════════════════════════════ */
  const renderGenericCategory = (cat, headerSuffix) => (
    <div className="sc-detail">
      <h2 className="sc-detail-header">
        <span className={cat.count > 0 ? 'sc-count-red' : 'sc-count-green'}>{cat.count}개</span>의
        <strong className={cat.count > 0 ? 'sc-count-red' : 'sc-count-green'}> {cat.label}</strong>{headerSuffix}
      </h2>
      <WarningNote text={cat.warning} />
      <h3 className="sc-section-title">{cat.label === '정상 인용' ? '정상 인용 인용정보 목록' : `${cat.label} 인용정보 목록`}</h3>
      {cat.items.length === 0 ? <EmptyList /> : (
        <div className="sc-list-table">
          {cat.items.map(item => (
            <div key={item.id} className="sc-table-card">
              <div className="sc-table-num">{item.id}</div>
              <div className="sc-table-body">
                <div className="sc-table-row"><span className="sc-table-th">인용정보</span><span className="sc-table-td">{item.citation}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ── 탭별 콘텐츠 렌더 ── */
  const renderContent = () => {
    switch (activeTab) {
      case 'summary':            return renderSummary();
      case FOOTNOTE_MISSING.key: return renderFootnoteMissing();
      case REFERENCE_MISSING.key:return renderReferenceMissing();
      case FORMAT_ERROR.key:     return renderFormatError();
      case RECENCY_RISK.key:     return renderRecencyRisk();
      case AUTHOR_BIAS.key:      return renderGenericCategory(AUTHOR_BIAS, '이(가) 발견되었습니다.');
      case JOURNAL_BIAS.key:     return renderGenericCategory(JOURNAL_BIAS, '이(가) 발견되었습니다.');
      case NORMAL_CITATION.key:  return renderGenericCategory(NORMAL_CITATION, '가 정확히 작성되었습니다.');
      default:                   return renderSummary();
    }
  };

  return (
    <div className="sc-page">
      {/* 파일명 헤더 */}
      <div className="sc-file-header">
        <span className="sc-check-type-badge">적절성 검증</span>
        <div className="sc-file-name">{CHECK_INFO.docName}</div>
        <div className="sc-file-actions">
          <Link to="/list" className="ck-fbtn">← 목록</Link>
          <button className="ck-fbtn cyan">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            검사 결과 다운로드
          </button>
        </div>
      </div>

      {/* 탭 네비게이션 (기존 iframe 내 좌측 사이드바 → 상단 탭) */}
      <div className="sc-tab-nav">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`sc-tab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="sc-tab-label">{tab.label}</span>
            {tab.count !== null && (
              <span className={`sc-tab-count${tab.count > 0 ? ' has' : ''}`}>{tab.count}</span>
            )}
            <span className="sc-tab-arrow">›</span>
          </button>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="sc-content">
        {renderContent()}
      </div>
    </div>
  );
}
