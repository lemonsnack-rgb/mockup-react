import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const LOGO_SRC = 'https://campus.copykiller.com/layouts/copykiller_platform/copykiller/campus/img/logo_campus.png';

/* ── SVG 뱃지 (캠퍼스 동일: 둥근 사각형 + 텍스트) ── */
const BadgeNew = () => (
  <svg className="ck-icon-badge" width="31" height="13" viewBox="0 0 31 13"><rect width="31" height="13" rx="4" fill="#FFE0E7"/><text x="15.5" y="9.5" textAnchor="middle" fill="#FF006B" fontSize="9" fontWeight="700" fontFamily="Pretendard,sans-serif">New</text></svg>
);
const BadgeBeta = () => (
  <svg className="ck-icon-badge" width="33" height="13" viewBox="0 0 33 13"><rect width="33" height="13" rx="4" fill="#00C2FF"/><text x="16.5" y="9.5" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="Pretendard,sans-serif">Beta</text></svg>
);
const BadgeHot = () => (
  <svg className="ck-icon-badge" width="33" height="13" viewBox="0 0 33 13"><rect width="33" height="13" rx="4" fill="#FF006B"/><text x="16.5" y="9.5" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="Pretendard,sans-serif">Hot</text></svg>
);

/* ── 20x20 아이콘 (캠퍼스 SVG 동일) ── */
const IconAdmin = () => (
  <svg className="ck-icon-menu" width="20" height="20" viewBox="0 0 21 20" fill="currentColor"><path d="M19.38 15.82l-7.57-7.57c.78-1.95.38-4.25-1.2-5.83C8.7.51 5.71.33 3.59 1.88l3.2 3.2-1.18 1.18-3.2-3.2C1.04 5.19 1.2 8.18 3.12 10.09c1.55 1.55 3.81 1.96 5.74 1.23l7.59 7.59c.17.17.42.17.59 0l2.33-2.33c.18-.17.18-.43.01-.76z"/></svg>
);
const IconTimeline = () => (
  <svg className="ck-icon-menu" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M17.5 8.33c-.15 0-.29-.02-.42-.06l-2.97 2.96c.04.13.06.28.06.43 0 .92-.75 1.67-1.67 1.67s-1.67-.75-1.67-1.67c0-.15.02-.28.06-.42L9.17 9.51c-.13.04-.28.06-.42.06s-.29-.02-.42-.06L5.4 12.43c.04.13.06.28.06.42 0 .92-.75 1.67-1.67 1.67S2.12 13.77 2.12 12.85c0-.92.75-1.67 1.67-1.67.15 0 .29.02.42.06l2.93-2.93c-.04-.13-.06-.28-.06-.42 0-.92.75-1.67 1.67-1.67s1.67.75 1.67 1.67c0 .15-.02.29-.06.42l1.72 1.72c.13-.04.28-.06.42-.06s.29.02.42.06l2.97-2.97c-.04-.13-.06-.27-.06-.42 0-.92.75-1.67 1.67-1.67s1.67.75 1.67 1.67-.75 1.74-1.67 1.74z"/></svg>
);
const IconGear = () => (
  <svg className="ck-icon-menu" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.19 10.82c.03-.27.06-.53.06-.82s-.03-.55-.06-.82l1.76-1.37c.16-.13.2-.35.1-.53l-1.67-2.88c-.07-.13-.21-.21-.35-.21-.05 0-.1.01-.14.03l-2.07.83c-.43-.33-.9-.61-1.4-.83l-.32-2.21c-.03-.2-.2-.35-.41-.35H9.02c-.21 0-.38.15-.41.35l-.32 2.21c-.5.22-.97.5-1.4.83l-2.07-.83c-.05-.02-.1-.03-.15-.03-.14 0-.28.08-.35.21L2.65 7.28c-.1.18-.06.4.1.53l1.76 1.37c-.03.27-.06.54-.06.82s.03.55.06.82L2.75 12.19c-.16.13-.2.35-.1.53l1.67 2.88c.07.13.21.21.35.21.05 0 .1-.01.15-.03l2.07-.83c.43.33.9.61 1.4.83l.32 2.21c.03.2.2.35.41.35h3.34c.21 0 .38-.15.41-.35l.32-2.21c.5-.22.97-.5 1.4-.83l2.07.83c.05.02.1.03.15.03.14 0 .28-.08.35-.21l1.67-2.88c.1-.18.06-.4-.1-.53l-1.76-1.37zM10 12.92c-1.61 0-2.92-1.31-2.92-2.92S8.39 7.08 10 7.08s2.92 1.31 2.92 2.92-1.31 2.92-2.92 2.92z"/></svg>
);
const IconPerson = () => (
  <svg className="ck-icon-menu" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 4.92c.97 0 1.75.78 1.75 1.75S10.97 8.42 10 8.42 8.25 7.63 8.25 6.67 9.03 4.92 10 4.92zm0 7.5c2.48 0 5.08 1.22 5.08 1.75v.92H4.92v-.92c0-.53 2.6-1.75 5.08-1.75zM10 3.33c-1.84 0-3.33 1.49-3.33 3.33S8.16 10 10 10s3.33-1.49 3.33-3.33S11.84 3.33 10 3.33zm0 8.34c-2.22 0-6.67 1.11-6.67 3.33v1.67c0 .46.37.83.83.83h11.67c.46 0 .83-.37.83-.83V15c0-2.22-4.44-3.33-6.67-3.33z"/></svg>
);
const IconHelp = () => (
  <svg className="ck-icon-menu" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.67C5.4 1.67 1.67 5.4 1.67 10S5.4 18.33 10 18.33 18.33 14.6 18.33 10 14.6 1.67 10 1.67zm0 15c-3.68 0-6.67-2.99-6.67-6.67S6.32 3.33 10 3.33 16.67 6.32 16.67 10 13.68 16.67 10 16.67zm-.83-4.17h1.67v1.67H9.17V12.5zm1.71-6.42c-.75-.36-1.82-.32-2.55.1-.72.42-1.08 1.08-1.16 1.9h1.58c.04-.32.15-.56.35-.72.2-.17.45-.24.74-.2.3.05.53.18.68.41.14.22.17.48.08.77-.14.42-.36.72-.67.9-.31.19-.52.48-.63.88-.06.22-.08.52-.08.92h1.55c.01-.3.07-.54.17-.72.1-.18.3-.38.6-.6.42-.31.72-.64.88-.99.17-.35.2-.74.1-1.16-.13-.56-.45-.99-.97-1.27-.17-.09-.35-.16-.55-.22z"/></svg>
);
const IconLogout = () => (
  <svg className="ck-icon-menu" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M17.3 9.71l-2.33-2.33c-.27-.27-.72-.08-.72.3v1.49H8.42c-.46 0-.83.38-.83.83s.38.83.83.83h5.83v1.49c0 .38.45.55.71.29l2.33-2.33c.17-.16.17-.41.01-.57zM5 15.83h4.17c.46 0 .83-.37.83-.83s-.37-.83-.83-.83H5c-.46 0-.83-.37-.83-.83V6.67c0-.46.37-.83.83-.83h4.17c.46 0 .83-.37.83-.83S9.63 4.17 9.17 4.17H5c-1.38 0-2.5 1.12-2.5 2.5v6.67c0 1.38 1.12 2.5 2.5 2.5z"/></svg>
);

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  const isAActive =
    location.pathname === '/' ||
    location.pathname.startsWith('/upload') ||
    location.pathname.startsWith('/list') ||
    location.pathname.startsWith('/validity') ||
    location.pathname.startsWith('/style');

  const isBActive =
    location.pathname.startsWith('/b/');

  const isCActive =
    location.pathname.startsWith('/c/');

  const isSrcCheckActive = isAActive || isBActive || isCActive;

  return (
    <aside className="ck-side">
      {/* ── Logo + Language (같은 행) ── */}
      <div className="ck-header-row">
        <div className="ck-logo">
          <img src={LOGO_SRC} alt="CopyKiller Campus" className="ck-logo-img" />
        </div>
        <span className="ck-lang-label">KOR</span>
      </div>

      {/* ── Nav body ── */}
      <nav className="ck-side-body">
        {/* mySpace */}
        <div className="ck-nav-heading">mySpace</div>

        <NavLink to="/" className={`ck-nav-item${isSrcCheckActive ? '' : ''}`} end>
          <span className="ck-nav-item-label">문서 평가</span>
        </NavLink>

        <a href="#" className="ck-nav-item" onClick={e => e.preventDefault()}>
          <span className="ck-nav-item-label">표이미지 표절검사</span>
          <BadgeNew />
        </a>

        <a href="#" className="ck-nav-item" onClick={e => e.preventDefault()}>
          <span className="ck-nav-item-label">생활기록부 검사</span>
        </a>

        <a href="#" className="ck-nav-item" onClick={e => e.preventDefault()}>
          <span className="ck-nav-item-label">비교 문서</span>
        </a>

        {/* 참고문헌 유효성 검증 — 단일 메뉴 */}
        <NavLink to="/c/list" className={`ck-nav-item${isCActive ? ' active' : ''}`} end={false}>
          <span className="ck-nav-item-label">참고문헌 유효성 검증</span>
          <BadgeBeta />
        </NavLink>

        {/* A/B/C안 — 숨김 처리 (코드 유지) */}
        <NavLink to="/c/list" className="ck-nav-item" end={false} style={{ display: 'none' }}>
          <span className="ck-nav-item-label">참고문헌 검증 A안</span>
          <BadgeBeta />
        </NavLink>

        <NavLink to="/b/list" className="ck-nav-item" end={false} style={{ display: 'none' }}>
          <span className="ck-nav-item-label">참고문헌 검증 B안</span>
          <BadgeBeta />
        </NavLink>

        <NavLink to="/" className="ck-nav-item" end={false} style={{ display: 'none' }}>
          <span className="ck-nav-item-label">참고문헌 검증 C안</span>
          <BadgeBeta />
        </NavLink>

        <NavLink to="/gk/result" className="ck-nav-item">
          <span className="ck-nav-item-label">검사결과 배너 시안</span>
          <BadgeNew />
        </NavLink>

        <a href="#" className="ck-nav-item" onClick={e => e.preventDefault()}>
          <span className="ck-nav-item-label">문서 차이 검사</span>
        </a>

        <a href="#" className="ck-nav-item" onClick={e => e.preventDefault()}>
          <span className="ck-nav-item-label">유용한 정보</span>
        </a>

        {/* Spacer */}
        <div className="ck-side-spacer" />

        {/* Utils */}
        <div className="ck-nav-heading">Utils</div>

        <a href="#" className="ck-nav-item" onClick={e => e.preventDefault()}>
          <span className="ck-nav-item-label">GPT Killer 실험실</span>
          <BadgeHot />
        </a>

        {/* Admin */}
        <a href="#" className="ck-nav-item ck-nav-item--admin" onClick={e => e.preventDefault()}>
          <IconAdmin />
          <span className="ck-nav-item-label">관리자페이지</span>
        </a>

        <a href="#" className="ck-nav-item ck-nav-item--utils" onClick={e => e.preventDefault()}>
          <IconTimeline />
          <span className="ck-nav-item-label">서비스 통계</span>
        </a>
        <NavLink to="/c/admin/list" className="ck-nav-item ck-nav-item--utils">
          <IconGear />
          <span className="ck-nav-item-label">참고문헌 유효성 검증 현황</span>
        </NavLink>
        <a href="#" className="ck-nav-item ck-nav-item--utils" onClick={e => e.preventDefault()}>
          <IconGear />
          <span className="ck-nav-item-label">관리자메뉴</span>
        </a>

        <div className="ck-side-divider" />

        <a href="#" className="ck-nav-item ck-nav-item--utils" onClick={e => e.preventDefault()}>
          <IconPerson />
          <span className="ck-nav-item-label">개인정보 관리</span>
        </a>
        <a href="#" className="ck-nav-item ck-nav-item--utils" onClick={e => e.preventDefault()}>
          <IconHelp />
          <span className="ck-nav-item-label">고객센터</span>
        </a>
        <a href="#" className="ck-nav-item ck-nav-item--utils" onClick={e => e.preventDefault()}>
          <IconLogout />
          <span className="ck-nav-item-label">로그아웃</span>
        </a>
      </nav>

      {/* ── Collapse toggle ── */}
      <button className="ck-side-toggle" onClick={onToggle} aria-label="사이드바 접기">‹</button>
    </aside>
  );
}
