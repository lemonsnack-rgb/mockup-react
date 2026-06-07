import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { Checkbox, Input, PaginationWrapper } from '@muhayu/ck-ui';
import { RESULTS as INITIAL_RESULTS, STATUS_MAP } from '../data/resultList';
import UploadForm from '../components/UploadForm';
import './ResultList.css';
import './ResultListB.css';
import '../pages/Upload.css';

let nextId = 200;

export default function ResultListB() {
  const location = useLocation();
  const prefix = location.pathname.startsWith('/c') ? '/c' : '/b';
  const variant = prefix === '/c' ? 'C안' : 'B안';

  const [showPopup, setShowPopup] = useState(false);
  const [rows, setRows] = useState(INITIAL_RESULTS);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const uploaded = searchParams.get('uploaded');
    if (uploaded) {
      addNewRow(uploaded);
      setSearchParams({}, { replace: true });
    }
  }, []);

  const addNewRow = (fileName) => {
    const today = new Date().toISOString().split('T')[0];
    setRows(prev => [{
      id: nextId++,
      date: today,
      citationStyle: 'APA',
      name: fileName,
      citationCount: null,
      riskCount: null,
      status: 'processing',
      style: { risk: null },
      validity: { unconfirmed: null, total: null },
    }, ...prev]);
    setCurrentPage(1);
  };

  const [searchTerm, setSearchTerm]     = useState('all');
  const [startDate, setStartDate]       = useState('');
  const [endDate, setEndDate]           = useState('');
  const [searchTarget, setSearchTarget] = useState('title,tags');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [listCount, setListCount]       = useState(10);
  const [currentPage, setCurrentPage]   = useState(1);
  const [checkAll, setCheckAll]         = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleTermChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val === 'user') return;
    const now = new Date();
    const end = now.toISOString().split('T')[0];
    let start = new Date();
    switch (val) {
      case 'week':   start.setDate(start.getDate() - 7); break;
      case 'month1': start.setMonth(start.getMonth() - 1); break;
      case 'month3': start.setMonth(start.getMonth() - 3); break;
      case 'month6': start.setMonth(start.getMonth() - 6); break;
      case 'year':   start.setFullYear(start.getFullYear() - 1); break;
      default:       setStartDate(''); setEndDate(''); return;
    }
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end);
  };

  const handleSearch = () => setCurrentPage(1);

  const handleCheckAll = (e) => {
    setCheckAll(e.target.checked);
    setCheckedItems(e.target.checked ? rows.map(r => r.id) : []);
  };
  const handleItemCheck = (id) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (checkedItems.length === 0) return;
    alert(`${checkedItems.length}건 삭제 (목업)`);
  };

  const totalPages = Math.max(1, Math.ceil(rows.length / listCount));
  const paginatedRows = rows.slice(
    (currentPage - 1) * listCount,
    currentPage * listCount
  );

  return (
    <div className="rl-page">
      {/* ── Title + Upload ── */}
      <div className="rl-title-row">
        <h2 className="rl-title">참고문헌 유효성 검증</h2>
        <div className="rl-upload-btns">
          <Link to="/c/upload" className="rl-upload-btn">+ 문서 평가</Link>
        </div>
      </div>

      {/* ── Info banner (campus 출처검사 동일 UI) ── */}
      <div className="rl-info-banner rl-info-banner--campus">
        <p className="rl-info-banner__title">참고문헌 유효성 검증은 내가 작성한 문서의 참고문헌이 실제로 존재하는지, 100억 카피킬러 DB로 확인하는 서비스입니다.</p>
        <p className="rl-info-banner__desc">AI가 만들어낸 가짜 참고문헌을 사전에 걸러내고, 제출 전에 문서의 신뢰도를 스스로 점검해 보세요.</p>
      </div>

      {/* ── Check all ── */}
      <label className="rl-check-all">
        <Checkbox theme="ck" checked={checkAll} onCheckedChange={(v) => handleCheckAll({ target: { checked: v } })} />
        <span>전체 선택</span>
      </label>

      {/* ── Filter row ── */}
      <div className="rl-filter-row">
        <select className="rl-select" value={searchTerm} onChange={handleTermChange}>
          <option value="all">전체</option>
          <option value="week">1 주일</option>
          <option value="month1">1 개월</option>
          <option value="month3">3 개월</option>
          <option value="month6">6 개월</option>
          <option value="year">1 년</option>
          <option value="user">직접입력</option>
        </select>

        <input type="date" className="rl-date-input" value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          disabled={searchTerm !== 'user'} />
        <span className="rl-date-sep">-</span>
        <input type="date" className="rl-date-input" value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={searchTerm !== 'user'} />

        <Input size="md" variant="outline"
          placeholder="문서명을 입력하세요."
          className="rl-keyword-input"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />

        <button className="rl-search-btn" onClick={handleSearch}>조회</button>

        <select className="rl-select rl-select-count" value={listCount}
          onChange={(e) => { setListCount(Number(e.target.value)); setCurrentPage(1); }}>
          <option value={10}>10 개</option>
          <option value={50}>50 개</option>
          <option value={100}>100 개</option>
        </select>
      </div>

      {/* ── Card list (표이미지 표절검사 스타일) ── */}
      <div className="rlc-list">
        {paginatedRows.map((row) => {
          const isDone = row.status === 'done';
          const hasValidity = isDone && row.validity !== 'unscanned' && row.validity !== 'skipped';
          const isActive = isDone;
          return (
            <div key={row.id} className="rlc-item">
              <Checkbox theme="ck"
                checked={checkedItems.includes(row.id)}
                onCheckedChange={() => handleItemCheck(row.id)} />
              <div className="rlc-item__info">
                <span className="rlc-item__name">{row.name}</span>
                <span className="rlc-item__meta">
                  <span className="rlc-item__meta-label">검사일</span> {row.date}
                  {hasValidity && (
                    <>
                      <span className="rlc-item__meta-sep">|</span>
                      <span className="rlc-item__meta-label">전체 참고문헌 수</span> {row.validity.total}<span className="rlc-item__meta-label">개</span>
                    </>
                  )}
                </span>
              </div>
              <div className="rlc-item__count">
                <span className="rlc-item__count-label">미확인 참고문헌 수</span>
                {row.status === 'processing' ? (
                  <span className="rlc-item__badge rlc-item__badge--processing">검사중</span>
                ) : row.status === 'error' ? (
                  <span className="rlc-item__badge rlc-item__badge--error">검사 불가</span>
                ) : (
                  <span className={`rlc-item__count-num${(row.validity?.unconfirmed || 0) > 0 ? ' rlc-item__count-num--alert' : ''}`}>{row.validity?.unconfirmed ?? 0}<span className="rlc-item__count-unit">개</span></span>
                )}
              </div>
              <div className="rlc-item__action">
                {isActive ? (
                  <Link to={`${prefix}/detail/${row.id}`} className="rlc-result-btn">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    결과 확인
                  </Link>
                ) : (
                  <span className="rlc-result-btn rlc-result-btn--disabled">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    결과 확인
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom bar ── */}
      <div className="rl-bottom-bar">
        <div className="rl-bottom-actions">
          <button className="rl-action-btn rl-action-btn--danger" onClick={handleDelete}>삭제</button>
        </div>
        <PaginationWrapper
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          maxDisplayedPages={5}
        />
        <div className="rl-bottom-spacer" />
      </div>

      {/* ── Upload Popup ── */}
      {showPopup && (
        <div className="rl-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="rl-popup" onClick={(e) => e.stopPropagation()}>
            <div className="rl-popup-header">
              <h3 className="rl-popup-title">문서 업로드</h3>
              <button className="rl-popup-close" onClick={() => setShowPopup(false)} aria-label="닫기">&times;</button>
            </div>
            <div className="rl-popup-body">
              <UploadForm compact onSubmit={(fileName) => { addNewRow(fileName); setShowPopup(false); }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
