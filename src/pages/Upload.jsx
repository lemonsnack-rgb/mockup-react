import { useNavigate } from 'react-router-dom';
import UploadForm from '../components/UploadForm';
import './Upload.css';

export default function Upload() {
  const navigate = useNavigate();

  return (
    <div className="upl-page">
      {/* ── Title row ── */}
      <div className="upl-title-row">
        <h1 className="upl-title">참고문헌 검증</h1>
      </div>

      {/* ── 3-step guide ── */}
      <div className="upl-steps">
        <div className="upl-step-card">
          <div className="upl-step-num">1</div>
          <div className="upl-step-name">문서 업로드</div>
          <div className="upl-step-desc">
            문서 유형과 출처 표기법을 설정한 후,<br />
            문서를 업로드하면 출처를 자동으로<br />
            탐지/검사합니다.
          </div>
        </div>
        <div className="upl-step-card">
          <div className="upl-step-num">2</div>
          <div className="upl-step-name">검사 결과 확인</div>
          <div className="upl-step-desc">
            작성 과정에서 확인하기 힘든출처 누락,<br />
            출처 표기법, 출처 편향 여부를<br />
            알려드려요.
          </div>
        </div>
        <div className="upl-step-card">
          <div className="upl-step-num">3</div>
          <div className="upl-step-name">검사 결과 반영 / 재검사</div>
          <div className="upl-step-desc">
            검사 결과를 문서에 반영하고,<br />
            다시 검사해보세요.<br />
            문서의 품질이 업그레이드 됩니다.
          </div>
        </div>
      </div>

      {/* ── Form (shared component) ── */}
      <UploadForm onSubmit={(fileName) => navigate(`/list?uploaded=${encodeURIComponent(fileName)}`)} />
    </div>
  );
}
