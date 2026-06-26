import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, PaginationWrapper } from '@muhayu/ck-ui';
import { CITATION_RESULTS } from '../data/citationList';
import './CitationList.css';

export default function CitationList() {
  const navigate = useNavigate();
  const [rows] = useState(CITATION_RESULTS);
  const [showInfo, setShowInfo] = useState(true);
  const [period, setPeriod] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [keyword, setKeyword] = useState('');
  const [listCount, setListCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckAll = (v) => {
    setCheckAll(v);
    setCheckedItems(v ? rows.map(r => r.id) : []);
  };
  const handleItemCheck = (id) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const totalPages = Math.max(1, Math.ceil(rows.length / listCount));
  const paginated = rows.slice((currentPage - 1) * listCount, currentPage * listCount);

  return (
    <div className="cl-page">
      {/* Title */}
      <div className="cl-title-row">
        <h1 className="cl-title">참고문헌 유효성 검증</h1>
        <button className="cl-new-btn" onClick={() => navigate('/citation/upload')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="currentColor">
            <path d="M15.8333 11.3333H10.8333V16.3333H9.16663V11.3333H4.16663V9.66663H9.16663V4.66663H10.8333V9.66663H15.8333V11.3333Z" />
          </svg>
          문서 검사
        </button>
      </div>

      {/* Info card */}
      {showInfo && (
        <div className="cl-info-card">
          <div className="cl-info-card-left">
            <span className="cl-info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" />
              </svg>
            </span>
            <div>
              <p className="cl-info-title">참고문헌 유효성 검증은 내가 작성한 문서의 참고문헌이 실제로 존재하는지, 100억 카피킬러 DB로 확인하는 서비스입니다.</p>
              <p className="cl-info-desc">AI가 만들어낸 가짜 참고문헌을 사전에 걸러내고, 제출 전에 문서의 신뢰도를 스스로 점검해 보세요.</p>
            </div>
          </div>
          <button className="cl-info-close" onClick={() => setShowInfo(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7a1 1 0 00-1.41 1.41L10.59 12 5.7 16.89a1 1 0 001.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
            </svg>
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="cl-controls">
        <label className="cl-checkall">
          <Checkbox theme="ck" checked={checkAll} onCheckedChange={handleCheckAll} />
          <span>전체 선택</span>
        </label>
        <form className="cl-filter-form" onSubmit={e => { e.preventDefault(); setCurrentPage(1); }}>
          <select className="cl-select" value={period} onChange={e => setPeriod(e.target.value)}>
            <option value="all">전체 기간</option>
            <option value="week">1주일</option>
            <option value="month">1개월</option>
            <option value="quarter">3개월</option>
            <option value="halfYear">6개월</option>
            <option value="year">1년</option>
            <option value="custom">직접입력</option>
          </select>
          <input className="cl-date-input" type="date" value={startDate}
            disabled={period !== 'custom'}
            onChange={e => setStartDate(e.target.value)} />
          <span className="cl-date-sep">-</span>
          <input className="cl-date-input" type="date" value={endDate}
            disabled={period !== 'custom'}
            onChange={e => setEndDate(e.target.value)} />
          <input className="cl-search-input" placeholder="문서명을 입력하세요."
            value={keyword} onChange={e => setKeyword(e.target.value)} />
          <button type="submit" className="cl-search-btn">조회</button>
          <select className="cl-select" style={{ minWidth: 80 }}
            value={listCount} onChange={e => { setListCount(Number(e.target.value)); setCurrentPage(1); }}>
            <option value={10}>10개</option>
            <option value={50}>50개</option>
            <option value={100}>100개</option>
          </select>
        </form>
      </div>

      {/* List */}
      <div className="cl-list">
        {paginated.map(row => (
          <div key={row.id} className="cl-row">
            <div className="cl-row-check">
              <Checkbox theme="ck"
                checked={checkedItems.includes(row.id)}
                onCheckedChange={() => handleItemCheck(row.id)} />
            </div>
            <div className="cl-row-info">
              {row.status === 'done' ? (
                <Link to={`/citation/result/${row.id}`} className="cl-doc-name">{row.name}</Link>
              ) : (
                <span className="cl-doc-name">{row.name}</span>
              )}
              <div className="cl-row-meta">
                <span className="cl-meta-label">검사일</span>
                <span className="cl-meta-value">{row.date}</span>
                {row.status === 'done' && (
                  <>
                    <span className="cl-meta-sep">|</span>
                    <span className="cl-meta-label">전체 참고문헌 수</span>
                    <span className="cl-meta-value">{row.total}개</span>
                  </>
                )}
              </div>
            </div>
            <div className="cl-row-right">
              {row.status === 'failed' ? (
                <span className="cl-badge-failed">검사실패</span>
              ) : (
                <div className="cl-unconfirmed">
                  <span className="cl-unconfirmed-label">미확인 참고문헌 수</span>
                  <span className="cl-unconfirmed-count">{row.unconfirmed}개</span>
                </div>
              )}
              <Link
                to={row.status === 'done' ? `/citation/result/${row.id}` : '#'}
                className={`cl-result-btn${row.status !== 'done' ? ' cl-result-btn--disabled' : ''}`}
                onClick={row.status !== 'done' ? e => e.preventDefault() : undefined}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" fill="none">
                  <path d="M20 0H13.0124L8.20592 4.89044L4.70801 8.44941L8.20592 12L20 0Z" fill="currentColor" />
                  <path d="M6.98758 3.12354H0L5.22628 8.44943L8.72419 4.89046L6.98758 3.12354Z" fill="#3E4448" />
                </svg>
                결과 확인
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="cl-bottom-bar">
        <button className="cl-delete-btn" onClick={() => checkedItems.length && alert(`${checkedItems.length}건 삭제 (목업)`)}>
          삭제
        </button>
        <PaginationWrapper
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          maxDisplayedPages={5}
        />
        <div />
      </div>
    </div>
  );
}
