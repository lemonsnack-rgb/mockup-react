import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Checkbox, Input, PaginationWrapper } from '@muhayu/ck-ui';
import { RESULTS as INITIAL_RESULTS, STATUS_MAP } from '../data/resultList';
import UploadForm from '../components/UploadForm';
import './ResultList.css';
import '../pages/Upload.css';

let nextId = 100;

export default function ResultList() {
  /* ── popup state ── */
  const [showPopup, setShowPopup] = useState(false);
  const [rows, setRows] = useState(INITIAL_RESULTS);
  const [searchParams, setSearchParams] = useSearchParams();

  /* ── A 시안: URL param으로 업로드된 파일 처리 ── */
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

  /* ── state ── */
  const [searchTerm, setSearchTerm]     = useState('all');
  const [startDate, setStartDate]       = useState('');
  const [endDate, setEndDate]           = useState('');
  const [searchTarget, setSearchTarget] = useState('title,tags');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [listCount, setListCount]       = useState(10);
  const [currentPage, setCurrentPage]   = useState(1);
  const [checkAll, setCheckAll]         = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  /* ── 기간 프리셋 변경 ── */
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

  /* ── 조회 ── */
  const handleSearch = () => setCurrentPage(1);

  /* ── 체크박스 ── */
  const handleCheckAll = (e) => {
    setCheckAll(e.target.checked);
    setCheckedItems(e.target.checked ? rows.map(r => r.id) : []);
  };
  const handleItemCheck = (id) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  /* ── 삭제 ── */
  const handleDelete = () => {
    if (checkedItems.length === 0) return;
    alert(`${checkedItems.length}건 삭제 (목업)`);
  };

  /* ── 페이지네이션 ── */
  const totalPages = Math.max(1, Math.ceil(rows.length / listCount));
  const paginatedRows = rows.slice(
    (currentPage - 1) * listCount,
    currentPage * listCount
  );

  return (
    <div className="rl-page">
      {/* ── Title + Upload ── */}
      <div className="rl-title-row">
        <h2 className="rl-title">출처 검사</h2>
        <div className="rl-upload-btns">
          <Link to="/upload" className="rl-upload-btn">+ 문서 업로드 (A)</Link>
          <button className="rl-upload-btn rl-upload-btn--b" type="button" onClick={() => setShowPopup(true)}>+ 문서 업로드 (B)</button>
        </div>
      </div>

      {/* ── Info banner ── */}
      <div className="rl-info-banner">
        <span className="rl-info-icon">ℹ</span>
        <span>
          출처 검사는 문서에 기재된 참고문헌의 <strong>스타일 적합성</strong>과{' '}
          <strong>실재 여부</strong>를 검증하는 서비스입니다.
          검사 결과에서 스타일 검사 / 유효성 검사 상세를 확인할 수 있습니다.
        </span>
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

        <select className="rl-select" value={searchTarget}
          onChange={(e) => setSearchTarget(e.target.value)}>
          <option value="title,tags">전체</option>
          <option value="title">검사명</option>
          <option value="tags">문서명</option>
          <option value="email_address">이메일 주소</option>
        </select>

        <Input size="md" variant="outline"
          placeholder="검색어를 입력하세요."
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

      {/* ── Table ── */}
      <div className="rl-table-wrap">
        <table className="rl-table">
          <thead>
            <tr>
              <th className="col-check">
                <Checkbox theme="ck" checked={checkAll} onCheckedChange={(v) => handleCheckAll({ target: { checked: v } })} />
              </th>
              <th className="col-date">등록일</th>
              <th className="col-name">문서명</th>
              <th className="col-status">처리상태</th>
              <th className="col-style">스타일 검사</th>
              <th className="col-validity">유효성 검사</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => {
              const st = STATUS_MAP[row.status];
              return (
                <tr key={row.id}>
                  <td className="col-check">
                    <Checkbox theme="ck"
                      checked={checkedItems.includes(row.id)}
                      onCheckedChange={() => handleItemCheck(row.id)} />
                  </td>
                  <td className="col-date">{row.date}</td>
                  <td className="col-name">
                    <span className="rl-doc-name">{row.name}</span>
                  </td>
                  <td className="col-status">
                    <span
                      className="rl-badge"
                      style={{ color: st.color, background: st.bg }}
                    >
                      {st.label}
                    </span>
                  </td>
                  <td className="col-style">
                    {row.style === 'skipped' ? (
                      <span className="rl-dash">미실시</span>
                    ) : row.status === 'done' ? (
                      <span className="rl-check-cell">
                        <span className="rl-check-count">
                          탐지된 위험 <strong>{row.style.risk}</strong>건
                        </span>
                        <Link to={`/style/${row.id}`} className="rl-detail-link">
                          상세보기
                        </Link>
                      </span>
                    ) : (
                      <span className="rl-dash">-</span>
                    )}
                  </td>
                  <td className="col-validity">
                    {row.validity === 'unscanned' ? (
                      <span className="rl-check-cell rl-unscanned">
                        <span className="rl-badge rl-badge--unscanned">미검사</span>
                      </span>
                    ) : row.validity === 'skipped' ? (
                      <span className="rl-dash">미실시</span>
                    ) : row.status === 'done' ? (
                      <span className="rl-check-cell">
                        <span className="rl-check-count">
                          미확인 참고문헌 <strong>{row.validity.unconfirmed}</strong>건
                        </span>
                        <Link
                          to={`/validity/${row.id}`}
                          className="rl-detail-link"
                        >
                          상세보기
                        </Link>
                      </span>
                    ) : (
                      <span className="rl-dash">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
      {/* ── Upload Popup (시안 B) ── */}
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
