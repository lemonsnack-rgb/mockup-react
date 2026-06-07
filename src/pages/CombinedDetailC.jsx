import { Link } from 'react-router-dom';
import { CHECK_INFO } from '../data/validityData';
import { generateValidityPdf } from '../utils/pdfExport';
import ValidityDetail from './ValidityDetail';
import './CombinedDetail.css';
import './CombinedDetailC.css';

export default function CombinedDetailC() {
  return (
    <div className="cd-page">
      {/* ── 상단 헤더 ── */}
      <div className="cd-header">
        <div className="cd-header-top">
          <div className="cd-doc-name">{CHECK_INFO.docName}</div>
          <div className="cd-header-actions">
            <Link to="/c/list" className="ck-fbtn">← 목록</Link>
            <button className="ck-fbtn cyan" onClick={() => generateValidityPdf(CHECK_INFO)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              검증 결과 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* ── ValidityDetail 단독 표시 (탭 없음) ── */}
      <div className="cd-body cd-body--c">
        <ValidityDetail embedded />
      </div>
    </div>
  );
}
