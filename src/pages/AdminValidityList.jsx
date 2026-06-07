import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@muhayu/ck-ui';
import { ADMIN_RESULTS } from '../data/resultList';
import './AdminValidityList.css';

/* 관리자용 처리상태 (드롭다운과 동일) */
const ADMIN_STATUS_MAP = {
  pending:    { label: '미진행', color: '#6a7282', bg: '#f4f5f6' },
  processing: { label: '진행중', color: '#d97706', bg: '#fef3c7' },
  error:      { label: '실패',   color: '#dc2626', bg: '#fee2e2' },
  done:       { label: '성공',   color: '#15803d', bg: '#dcfce7' },
};

export default function AdminValidityList() {
  const [rows] = useState(ADMIN_RESULTS);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listCount, setListCount] = useState(10);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchDomain, setSearchDomain] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

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
  const paginatedRows = rows.slice(
    (currentPage - 1) * listCount,
    currentPage * listCount
  );

  return (
    <div className="av-page">
      <h1 className="av-title">ADMIN 검사목록</h1>

      {/* ── 필터 ── */}
      <div className="av-filter-row">
        <label className="av-filter-label">처리상태</label>
        <select className="av-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">전체</option>
          <option value="pending">미진행</option>
          <option value="processing">진행중</option>
          <option value="error">실패</option>
          <option value="done">성공</option>
        </select>

        <label className="av-filter-label">등록일</label>
        <select className="av-select" value={filterDate} onChange={e => setFilterDate(e.target.value)}>
          <option value="all">전체</option>
          <option value="week">1 주일</option>
          <option value="month1">1 달</option>
          <option value="month3">3 달</option>
          <option value="month6">6 달</option>
          <option value="year">1 년</option>
          <option value="custom">직접 입력</option>
        </select>
        <input type="text" className="av-date" placeholder="yyyymmdd" maxLength={8}
          value={startDate}
          onChange={e => setStartDate(e.target.value.replace(/\D/g, ''))}
          disabled={filterDate !== 'custom'} />
        <span className="av-date-sep">~</span>
        <input type="text" className="av-date" placeholder="yyyymmdd" maxLength={8}
          value={endDate}
          onChange={e => setEndDate(e.target.value.replace(/\D/g, ''))}
          disabled={filterDate !== 'custom'} />

        <select className="av-select av-select-count" value={listCount}
          onChange={e => { setListCount(Number(e.target.value)); setCurrentPage(1); }}>
          <option value={10}>10개씩 보기</option>
          <option value={50}>50개씩 보기</option>
          <option value={100}>100개씩 보기</option>
        </select>
      </div>

      <div className="av-search-row">
        <input className="av-input" placeholder="도메인" value={searchDomain} onChange={e => setSearchDomain(e.target.value)} />
        <input className="av-input" placeholder="파일명" value={searchName} onChange={e => setSearchName(e.target.value)} />
        <input className="av-input" placeholder="이메일" value={searchEmail} onChange={e => setSearchEmail(e.target.value)} />
        <button className="av-search-btn">조회</button>
      </div>

      {/* ── 테이블 ── */}
      <div className="av-table-wrap">
        <table className="av-table">
          <thead>
            <tr>
              <th className="av-th-check">
                <Checkbox theme="ck" checked={checkAll} onCheckedChange={handleCheckAll} />
              </th>
              <th>ID</th>
              <th>등록일</th>
              <th>처리 상태</th>
              <th>파일명</th>
              <th>이메일</th>
              <th>필터 상태</th>
              <th>도메인</th>
              <th>분석 상태</th>
              <th>전체 참고문헌 수</th>
              <th>미확인 참고문헌 수</th>
              <th>상세 결과</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map(row => {
              const st = ADMIN_STATUS_MAP[row.status] || ADMIN_STATUS_MAP.pending;
              const hasResult = row.status === 'done';
              return (
                <tr key={row.id}>
                  <td className="av-td-check">
                    <Checkbox theme="ck"
                      checked={checkedItems.includes(row.id)}
                      onCheckedChange={() => handleItemCheck(row.id)} />
                  </td>
                  <td>{row.id}</td>
                  <td>{row.date}</td>
                  <td>{st.label}</td>
                  <td className="av-td-name" title={row.name}>{row.name}</td>
                  <td className="av-td-email" title={row.email}>{row.email}</td>
                  <td className="av-td-center">{row.filterState}</td>
                  <td className="av-td-domain" title={row.domain}>{row.domain}</td>
                  <td className="av-td-center">{row.analysisState}</td>
                  <td className="av-td-center">{hasResult ? row.validity.total : '-'}</td>
                  <td className="av-td-center av-td-unconfirmed">{hasResult ? row.validity.unconfirmed : '-'}</td>
                  <td className="av-td-center">
                    {hasResult ? (
                      <Link to={`/c/detail/${row.id}`} className="av-result-btn">
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><polygon points="8,5 19,12 8,19"/></svg>
                        결과보기
                      </Link>
                    ) : (
                      <span className="av-result-btn av-result-btn--disabled">
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><polygon points="8,5 19,12 8,19"/></svg>
                        결과보기
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── 페이지네이션 ── */}
      <div className="av-pagination-row">
        <div className="av-pagination">
          {Array.from({ length: Math.min(10, totalPages) }).map((_, i) => (
            <button
              key={i + 1}
              className={`av-page-btn${currentPage === i + 1 ? ' av-page-btn--active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ── 하단 액션 바 ── */}
      <div className="av-bottom-bar">
        <div className="av-bottom-left">
          <button className="av-action-btn av-action-btn--danger">FTX 재요청</button>
          <button className="av-action-btn av-action-btn--danger">분석 재요청</button>
          <button className="av-action-btn av-action-btn--danger">테스트데이터 영구 삭제</button>
        </div>
        <div className="av-bottom-right">
          <button className="av-action-btn av-action-btn--primary">다운로드</button>
        </div>
      </div>
    </div>
  );
}
