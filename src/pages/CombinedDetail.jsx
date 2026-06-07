import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CHECK_INFO } from '../data/validityData';
import StyleDetail from './StyleDetail';
import ValidityDetail from './ValidityDetail';
import './CombinedDetail.css';

const TABS = [
  { key: 'style', label: '적절성 검증' },
  { key: 'validity', label: '진위성 검증' },
];

export default function CombinedDetail() {
  const [activeTab, setActiveTab] = useState('style');

  return (
    <div className="cd-page">
      {/* ── 상단 헤더: 문서명 + 탭 ── */}
      <div className="cd-header">
        <div className="cd-header-top">
          <div className="cd-doc-name">{CHECK_INFO.docName}</div>
          <div className="cd-header-actions">
            <Link to="/b/list" className="ck-fbtn">← 목록</Link>
            <button className="ck-fbtn cyan" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              적절성 검증 결과 다운로드
            </button>
            <button className="ck-fbtn cyan" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              진위성 검증 결과 다운로드
            </button>
          </div>
        </div>
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

      {/* ── 탭 콘텐츠 ── */}
      <div className="cd-body">
        <div style={{ display: activeTab === 'style' ? 'block' : 'none' }}>
          <StyleDetail embedded hideInfo={false} />
        </div>
        <div style={{ display: activeTab === 'validity' ? 'block' : 'none' }}>
          <ValidityDetail embedded hideInfo={false} />
        </div>
      </div>
    </div>
  );
}
