import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './GptKillerResult.css'

/* ── 본문 텍스트 데이터 (실제 카피킬러 결과 페이지 내용 재현) ── */
const SENTENCES = [
  { text: '미국과 이란의 휴전 사흘째에도 호르무즈 해협은 열리지 않고 있다. 극소수의 선박만이 호르무즈 해협을 통과하고 있으며, 이마저도 사실상 이란 소유 선박으로 드러났다.', type: 'normal' },
  { text: 'BBC가 해상 데이터 업체 마린트래픽 선박 추적 데이터를 분석한 결과 미·이란간 휴전이 시작된 지난 7일(현지시간)부터 9일까지 호르무즈 해협을 통과한 선박은 11척에 불과했다.', type: 'normal' },
  { text: '이는 전쟁 발발이전 하루 평균 138척에 이르렀던 선박 통행량과 비교해 현저히 낮은 수치다.', type: 'normal' },
  { text: '9일 가봉, 팔라우 깃발을 단 유조선이 호르무즈 해협을 통과하며 이란 국적이 아닌 유조선이 지나간 사례로 주목받기도 했다.', type: 'normal' },
  { text: '하지만 선박 추적 업체 케이플러는 유조선 두 척이 이란과 연계된 제재 대상 단체와 연관이 있는 것으로 드러났다고 밝혔다.', type: 'normal' },
  { text: '선적만 외국에 있을뿐 사실상 이란 선박이라는 것이다.', type: 'similar', active: true },
  { text: '트럼프 대통령이 이란에 호르무즈 해협 개방을', type: 'suspect', inline: true },
  { text: ' 촉구하는 상황에서 이란은 여전히 호르무즈 해협 통행을 통제하고 있는 것으로 보인다.', type: 'normal', inline: true },
  { text: 'AP통신은 보츠나와 국적의 액화천연가스(LNG) 운반선이 이란 이슬람 혁명 수비대가 지정한 항로를 통해 호르무즈 해협을 빠져나가려다 10일 새벽 갑자기 방향을 바꿔 회항했다고 보도했다.', type: 'normal' },
  { text: '아부다비 국영석유회사(ADNOC)의 최고경영자 술탄 아메드 알자베르는 ', type: 'normal', inline: true },
  { text: '"호르무즈 해협은 열려 있지 않다. 접근은 제한되고 조건이 붙고 통제되고 있다"', type: 'quote' },
  { text: '며 "그것은 항행의 자유가 아니라 강압"이라고 비판했다.', type: 'normal' },
  { text: '알자베르는 230척의 선박이 석유를 가득 싣고 출항 준비를 마친 채 대기 중이라며 ', type: 'normal', inline: true },
  { text: '"어떤 형태로든 이 중요한 수로의 무기화는 용납될 수 없다. 이는 세계에 위험한 선례를 남기게 될것이며 세계 무역의 기반이 되는 항행의 자유 원칙과 세계경제 안정을 훼손할 것"', type: 'quote' },
  { text: '이라고 밝혔다.', type: 'normal' },
  { text: 'BBC는 호르무즈 해협 근처 선박들이 \'무허가 통과를 시도할 경우 공격받을 수 있다\'는 이란의 경고 메시지를 받고 있다고 전했다.', type: 'normal' },
  { text: '해운시장 분석업체 베스푸치 마리타임 라스 옌센은 ', type: 'normal', inline: true },
  { text: '"대다수 해운선사가 통행을 위해 무엇이 실제로 필요한지 구체적 정보와 확답을 원하지만 그런 게 없다"', type: 'quote' },
  { text: '고 상황을 설명했다.', type: 'normal' },
]

function SentenceClass(type, active) {
  if (type === 'suspect') return 'gk-sent--suspect'
  if (type === 'similar') return `gk-sent--similar${active ? ' active' : ''}`
  if (type === 'quote') return 'gk-sent--quote'
  return ''
}

/* ── 비교 문장 아이콘 ── */
const DocIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="2" width="12" height="16" rx="2" />
    <line x1="7" y1="6" x2="13" y2="6" />
    <line x1="7" y1="9" x2="13" y2="9" />
    <line x1="7" y1="12" x2="10" y2="12" />
  </svg>
)

/* ── 배너 아이콘 ── */
const RefCheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="#fff">
    <path d="M9 2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-6H9z" fill="none" stroke="#fff" strokeWidth="1.5" />
    <path d="M7 13l2 2 4-4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function GptKillerResult() {
  return (
    <div className="gk-result">
      {/* ── Header ── */}
      <div className="gk-header">
        <span className="gk-header__title">test.txt</span>
      </div>

      {/* ── Toolbar ── */}
      <div className="gk-toolbar">
        <select className="gk-toolbar__filter" defaultValue="all">
          <option value="all">전체 결과 (4)</option>
          <option>동일 문장 (0)</option>
          <option>의심 문장 (1)</option>
          <option>GPT 작성 의심 영역 (0)</option>
          <option>인용/출처 포함 문장 (3)</option>
          <option>법령/경전 포함 문장 (0)</option>
        </select>

        <span className="gk-toolbar__label">검출 문장 이동</span>
        <div className="gk-toolbar__nav">
          <button className="gk-toolbar__nav-btn">‹</button>
          <button className="gk-toolbar__nav-btn">›</button>
        </div>

        <button className="gk-toolbar__sentence-btn">본문</button>

        <div className="gk-toolbar__spacer" />

        {/* 표절률 */}
        <div className="gk-toolbar__score-area">
          <span className="gk-toolbar__score-label">표절률</span>
          <span className="gk-toolbar__score-value">2%</span>
          <div className="gk-toolbar__score-tabs">
            <span className="gk-toolbar__score-tab gk-toolbar__score-tab--active">카피킬러</span>
            <span className="gk-toolbar__score-tab gk-toolbar__score-tab--inactive">GPT킬러</span>
          </div>
        </div>

        {/* 비교 문장 / 비교 문서 탭 */}
        <div style={{ display: 'flex', gap: 0, marginLeft: 16 }}>
          <button className="gk-toolbar__sentence-btn" style={{ borderRadius: '8px 0 0 8px', background: '#fff', borderRight: 'none' }}>비교 문장</button>
          <button className="gk-toolbar__sentence-btn" style={{ borderRadius: '0 8px 8px 0', background: '#F5F5F5', color: '#939395' }}>비교 문서</button>
        </div>
      </div>

      {/* ── Two-column Body ── */}
      <div className="gk-body">
        {/* Left: Document viewer */}
        <div className="gk-viewer">
          {SENTENCES.map((s, i) => {
            if (s.inline) {
              return (
                <span key={i} className={SentenceClass(s.type, s.active)}>{s.text}</span>
              )
            }
            return (
              <p key={i}>
                <span className={SentenceClass(s.type, s.active)}>{s.text}</span>
              </p>
            )
          })}
        </div>

        {/* Right: Comparison aside */}
        <aside className="gk-aside">
          <div className="gk-tabs">
            <button className="gk-tab gk-tab--active">비교 문장</button>
            <button className="gk-tab gk-tab--inactive">비교 문서</button>
          </div>
          <div className="gk-aside-body">
            {/* 의심 문장 카드 */}
            <div className="gk-compare-item">
              <div className="gk-compare-item__header">
                <span className="gk-compare-item__type">의심 문장</span>
                <div className="gk-compare-item__score">
                  <span className="gk-compare-item__score-label">문장표절률</span>
                  <span className="gk-compare-item__score-value">25%</span>
                </div>
              </div>
              <div className="gk-compare-item__btn-row">
                <button className="gk-compare-item__btn">
                  <DocIcon /> 비교문서
                </button>
                <button className="gk-compare-item__expand">▾</button>
              </div>
              <div className="gk-compare-item__meta">
                <div className="gk-compare-item__meta-row">
                  <span className="gk-compare-item__meta-key">출처:</span>
                  <span>-</span>
                </div>
                <div className="gk-compare-item__meta-row">
                  <span className="gk-compare-item__meta-key">출처정보</span>
                  <span>-</span>
                </div>
                <div className="gk-compare-item__meta-row">
                  <span className="gk-compare-item__meta-key">비교범위:</span>
                  <span>카피킬러 DB</span>
                </div>
              </div>
              <div className="gk-compare-item__body">
                수단으로 사용될 수 있어요. ⚡️ <strong style={{ color: '#FF006B' }}>트럼프 대통령은 이란이 호르무즈 해협 개방</strong> 요구를 이행하지 않을 경우, 이란의
              </div>
            </div>

            {/* 인용 문장 카드 */}
            <div className="gk-compare-item">
              <div className="gk-compare-item__btn-row">
                <button className="gk-compare-item__btn">
                  <DocIcon /> 비교문서
                </button>
              </div>
            </div>

            {/* 출처 */}
            <div style={{ fontSize: 13, color: '#939395', marginTop: 8 }}>
              <div className="gk-compare-item__meta-row">
                <span className="gk-compare-item__meta-key">출처:</span>
                <span>-</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Sticky Footer ── */}
      <div className="gk-footer">
        <div className="gk-footer__end">
          <button className="gk-footer__btn gk-footer__btn--dark">GPT상세</button>
          <button className="gk-footer__btn gk-footer__btn--dark">관리자 설정</button>
          <button className="gk-footer__btn gk-footer__btn--outline">표절기준 설정</button>
          <button className="gk-footer__btn gk-footer__btn--primary">결과 다운로드</button>
        </div>
        {/* ★ 플로팅 배너 — 결과 다운로드 바로 우측 ★ */}
        <FloatingRefBanner />
      </div>
    </div>
  )
}

/* ── 플로팅 배너 컴포넌트 ── */
function FloatingRefBanner() {
  const [visible, setVisible] = useState(() => {
    return sessionStorage.getItem('refBannerDismissed') !== 'true'
  })
  const [closing, setClosing] = useState(false)

  function handleClose(e) {
    e.preventDefault()
    e.stopPropagation()
    setClosing(true)
    setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('refBannerDismissed', 'true')
    }, 250)
  }

  if (!visible) return null

  return (
    <div className={`floating-ref-banner${closing ? ' floating-ref-banner--closing' : ''}`}>
      <Link to="/c/list" className="floating-ref-banner__link">
        <div className="floating-ref-banner__icon">
          <RefCheckIcon />
        </div>
        <div className="floating-ref-banner__text">
          <span className="floating-ref-banner__badge">New</span>
          <span className="floating-ref-banner__title">카피킬러 인용검증!</span>
          <span className="floating-ref-banner__desc">
            진위여부부터 스타일 검증까지,<br />
            <strong>참고문헌 검증</strong>으로 문서의 격을 높이세요
          </span>
        </div>
        <span className="floating-ref-banner__arrow">›</span>
      </Link>
      <button className="floating-ref-banner__close" aria-label="닫기" onClick={handleClose}>✕</button>
    </div>
  )
}
