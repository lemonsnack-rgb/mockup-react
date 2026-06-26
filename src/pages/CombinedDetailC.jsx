import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CHECK_INFO } from '../data/validityData';
import { CHECK_INFO as STYLE_CHECK_INFO } from '../data/styleData';
import StyleDetail from './StyleDetail';
import ValidityDetail from './ValidityDetail';
import './CombinedDetail.css';
import './CombinedDetailC.css';

const TABS = [
  { key: 'style', label: '스타일 검사' },
  { key: 'validity', label: '유효성 검사' },
];

export default function CombinedDetailC() {
  const [activeTab, setActiveTab] = useState('style');

  return (
    <div className="cd-page">
      {/* ── 상단 헤더 ── */}
      <div className="cd-header">
        <div className="cd-header-top">
          <div className="cd-doc-name">{CHECK_INFO.docName}</div>
          <div className="cd-header-actions">
            <Link to="/c/list" className="ck-fbtn">← 목록</Link>
            <button className="ck-fbtn cyan" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              스타일 검사 결과 다운로드
            </button>
            <button className="ck-fbtn cyan" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              유효성 검사 결과 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* ── 검사 요청 정보 (공통) ── */}
      <div className="cdc-common-section">
        <h3 className="cdc-section-title">검사 요청 정보</h3>
        <table className="cdc-info-table">
          <tbody>
            <tr><th>아이디</th><td>{CHECK_INFO.userId}</td><th>검사 번호</th><td>{CHECK_INFO.checkNo}</td></tr>
            <tr><th>소속 기관</th><td>{CHECK_INFO.org}</td><th>문서명</th><td>{CHECK_INFO.docName}</td></tr>
            <tr><th>이름</th><td>{CHECK_INFO.userName}</td><th>검사 완료일</th><td>{CHECK_INFO.completedAt}</td></tr>
            <tr><th>출처 표기법</th><td>{STYLE_CHECK_INFO.citationStyle}</td><th>검사 범위</th><td>{STYLE_CHECK_INFO.checkScope}</td></tr>
          </tbody>
        </table>

        {/* ── 세그먼트 탭 ── */}
        <div className="cdc-tab-row">
          <div className="cd-tab-bar">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`cd-tab${activeTab === tab.key ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 탭 콘텐츠 (검사 요청 정보 숨김) ── */}
      <div className="cd-body cd-body--c">
        <div style={{ display: activeTab === 'style' ? 'block' : 'none' }}>
          <StyleDetail embedded />
        </div>
        <div style={{ display: activeTab === 'validity' ? 'block' : 'none' }}>
          <ValidityDetail embedded />
        </div>
      </div>
    </div>
  );
}
