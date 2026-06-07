import { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { VALID as VALID_INIT, VL, VC, CHECK_INFO } from '../data/validityData';
import { generateValidityPdf } from '../utils/pdfExport';
import './ValidityDetail.css';

/* ── SVG icon fragments (status circles) ── */
const VI = {
  exact:      <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>,
  mismatch:   <svg viewBox="0 0 24 24"><line x1="16" y1="8" x2="8" y2="16" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/><line x1="8" y1="8" x2="16" y2="16" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/></svg>,
  partial:    <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="14" stroke="#fff" strokeWidth="4" strokeLinecap="round"/><circle cx="12" cy="18.5" r="2.5" fill="#fff" stroke="none"/></svg>,
  registered: <svg viewBox="0 0 24 24"><line x1="7" y1="12" x2="17" y2="12" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/></svg>,
};

export default function ValidityDetail({ embedded = false, hideInfo = embedded }) {
  /* ── state ── */
  const [data, setData]           = useState(() => VALID_INIT.map(r => ({ ...r, m: { ...r.m } })));
  const [reg, setReg]             = useState(() => new Set());
  const [editingId, setEditingId] = useState(null);
  /* filter removed — 항상 전체 표시 */
  const [toast, setToast]         = useState('');
  const [confirmId, setConfirmId] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [regDonePopup, setRegDonePopup] = useState(false);
  /* 저자/키워드 칩 상태: { [id]: string[] } */
  const [authorChips, setAuthorChips] = useState({});
  const [keywordChips, setKeywordChips] = useState({});
  const contentRef = useRef(null);

  const getAuthors = (r) => {
    if (authorChips[r.id]) return authorChips[r.id];
    const src = r.m.AUT || '';
    /* 기존 목 데이터는 쉼표로 저장되어 있어 쉼표/세미콜론 둘 다 허용 */
    return src ? src.split(/[,;]/).map(s => s.trim()).filter(Boolean) : [];
  };
  const setAuthors = (id, list) => setAuthorChips(prev => ({ ...prev, [id]: list }));

  const getKeywords = (r) => keywordChips[r.id] || [];
  const setKeywords = (id, list) => setKeywordChips(prev => ({ ...prev, [id]: list }));

  /* ── derived counts ── */
  const counts = { confirmed: 0, unconfirmed: 0, partial: 0 };
  data.forEach(r => counts[r.v] = (counts[r.v] || 0) + 1);
  const total = data.length;
  const regCount = reg.size;
  const pureUnconfirmed = counts.unconfirmed - regCount;

  /* ── type tag counts (tl별 카운트 + 대표 t값) ── */
  const typeCounts = {};
  data.forEach(r => {
    if (!typeCounts[r.tl]) typeCounts[r.tl] = { count: 0, t: r.t };
    typeCounts[r.tl].count++;
  });

  /* ── toast helper ── */
  const showToast = useCallback((msg, duration = 2500) => {
    setToast(msg);
    setTimeout(() => setToast(''), duration);
  }, []);

  /* ── handlers ── */

  const openEdit = (id) => setEditingId(id);
  const cancelEdit = () => setEditingId(null);

  const requestSave = (id) => {
    const row = data.find(r => r.id === id);
    const authors = row ? getAuthors(row) : [];
    if (authors.length === 0) {
      alert('저자를 입력해주세요.');
      return;
    }
    const required = [
      { id: `ed_tit_${id}`, label: '제목' },
      { id: `ed_dat_${id}`, label: '발행연도' },
      { id: `ed_url_${id}`, label: 'URL' },
      { id: `ed_email_${id}`, label: '이메일' },
    ];
    for (const f of required) {
      const el = document.getElementById(f.id);
      if (!el || !el.value.trim()) {
        alert(`${f.label}을(를) 입력해주세요.`);
        if (el) el.focus();
        return;
      }
    }
    setConfirmId(id);
  };
  const cancelConfirm = () => setConfirmId(null);

  const confirmSave = () => {
    const id = confirmId;
    const titEl = document.getElementById('ed_tit_' + id);
    const row = data.find(r => r.id === id);
    const authors = row ? getAuthors(row) : [];
    const jouEl = document.getElementById('ed_jou_' + id);
    const orgEl = document.getElementById('ed_org_' + id);
    const datEl = document.getElementById('ed_dat_' + id);
    const volEl = document.getElementById('ed_vol_' + id);

    setData(prev => prev.map(r => {
      if (r.id !== id) return r;
      const m = { ...r.m };
      if (titEl) m.TIT = titEl.value;
      m.AUT = authors.join('; ');
      if (jouEl) m.JOU = jouEl.value;
      if (orgEl) m.ORG = orgEl.value;
      if (datEl) m.DAT = datEl.value;
      if (volEl) m.VOL = volEl.value;
      return { ...r, m };
    }));

    setReg(prev => new Set(prev).add(id));
    setEditingId(null);
    setConfirmId(null);
    setRegDonePopup(true);
  };

  /* ── PDF download ── */
  const handleDownloadPdf = async () => {
    setPdfLoading(true);
    try {
      await generateValidityPdf(CHECK_INFO);
    } catch (e) {
      console.error('PDF download failed:', e);
      showToast('PDF 다운로드에 실패했습니다.');
    } finally {
      setPdfLoading(false);
    }
  };

  /* ── 항상 전체 표시 ── */
  const filtered = data;

  /* ── progress widths ── */
  const pExact = total ? (counts.confirmed  / total * 100) : 0;
  const pReg   = total ? (regCount          / total * 100) : 0;
  const pMiss  = total ? (pureUnconfirmed   / total * 100) : 0;

  return (
    <div className="vd-page">
      {/* ── File header (matches sc-file-header) ── */}
      <div className="vd-header">
        <span className="vd-check-type-badge">참고문헌 유효성 검증</span>
        <div className="vd-file-name">{CHECK_INFO.docName}</div>
        <div className="vd-header-actions">
          <Link to="/list" className="ck-fbtn">← 목록</Link>
          <button className="ck-fbtn cyan" onClick={handleDownloadPdf} disabled={pdfLoading}>
            {pdfLoading ? (
              <>
                <span className="vd-btn-spinner" />
                PDF 생성 중...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                검사 결과 다운로드
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Content wrapper ── */}
      <div className={`vd-content${pdfLoading ? ' pdf-capture' : ''}`} ref={contentRef}>

      {/* ══ 검증 결과 요약 ══ */}
      <h3 className="vd-section-title">검증 결과 요약</h3>
      <div className="det-summary-card">
        <div className="det-stats-grid det-stats-grid--uniform">
          {[
            { key: 'total', label: '전체', count: total,
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="8" y1="8.5" x2="16" y2="8.5"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="15.5" x2="16" y2="15.5"/></svg>,
              tooltip: null },
            { key: 'exact', label: '확인', count: counts.confirmed,
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>,
              tooltip: '참고문헌의 제목이 CK 텀즈 또는 웹을 통해 유효한 것으로 확인된 것' },
            { key: 'partial', label: '부분 확인', count: counts.partial || 0,
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="13" strokeLinecap="round"/><circle cx="12" cy="16.5" r="0.5" fill="currentColor" stroke="none"/></svg>,
              tooltip: '참고문헌의 일부 정보가 CK 텀즈 또는 웹에 있지만, 일부 차이가 있는 것' },
            { key: 'mismatch', label: '미확인', count: pureUnconfirmed,
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
              tooltip: '참고문헌의 제목을 CK 텀즈 또는 웹에서 찾을 수 없는 것' },
            { key: 'registered', label: '직접 입력', count: regCount,
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round"/></svg>,
              tooltip: '미확인 참고문헌 중, 이용자가 유효한 출처로 판단하여 CK 텀즈에 등록 신청한 것으로, 카피킬러가 유효 여부를 확인하거나 보증하지 않음' },
          ].map(item => (
            <div key={item.key} className={`det-stat-card det-stat-card--${item.key}`}>
              <span className={`det-stat-label ${item.key}`}>
                {item.icon}
                {item.label}
                {item.tooltip && (
                  <span className="det-stat-tip-wrap">
                    <span className="det-stat-tip">?</span>
                    <span className="det-stat-tip-text">{item.tooltip}</span>
                  </span>
                )}
              </span>
              <span className={`det-stat-num ${item.key}`}>{item.count}<span className="det-stat-unit">건</span></span>
            </div>
          ))}
        </div>

        {/* Type tags — 실제 데이터 + 시안용 고정 유형 */}
        <div className="det-type-tags__caption">참고문헌 유형</div>
        <div className="det-type-tags">
          {[
            { label: '논문', t: 'paper', count: 30 },
            { label: '단행본', t: 'book', count: 2 },
            { label: '보고서', t: 'report', count: 1 },
            { label: '웹페이지', t: 'webpage', count: 3 },
            { label: '뉴스기사', t: 'news', count: 1 },
            { label: '특허', t: 'patent', count: 0 },
            { label: '표준/규격', t: 'standard', count: 0 },
            { label: '기타', t: 'unknown', count: 0 },
          ].map(x => (
            <span key={x.label} className={`det-type-tag ${x.t}`}>{x.label} {x.count}건</span>
          ))}
        </div>
      </div>

      {/* ══ 참고문헌 실재 여부 확인 상세 결과 ══ */}
      <h3 className="vd-section-title">참고문헌 실재 여부 확인 상세 결과</h3>

      {/* ── 참고문헌 0건 안내 ── */}
      {total === 0 && (
        <div className="vd-empty-refs">
          <div className="vd-empty-refs-icon">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--color-gray-300, #c9cdd2)" strokeWidth="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <p className="vd-empty-refs-title">참고문헌(References) 영역에서 출처를 찾을 수 없습니다.</p>
          <p className="vd-empty-refs-desc">각주 형태의 출처는 향후 지원 예정입니다. 문서에 참고문헌 영역이 포함되어 있는지 확인해 주세요.</p>
        </div>
      )}

      {/* ── Reference card list ── */}
      <div className="det-ref-list">
        {filtered.map(r => {
          const isOnline = r.src === 'online';
          const done     = reg.has(r.id);
          const vc       = done ? 'registered' : (VC[r.v] || r.v);
          const canReg   = r.v === 'unconfirmed' && !done && !isOnline;
          const isEditing = editingId === r.id;

          return (
            <div
              key={r.id}
              className={
                'det-ref-card' +
                (isOnline ? ' online' : '') +
                (done ? ' registered' : '') +
                (isEditing ? ' editing' : '')
              }
              data-v={r.v}
              data-id={r.id}
            >
              <div className="det-ref-main">
                {/* Number */}
                <div className="det-ref-num">{r.id}</div>

                {/* Content */}
                <div className="det-ref-content">
                  {/* Line 1: [유형] 원본 인용문 */}
                  <div
                    className="det-ref-citation"
                    dangerouslySetInnerHTML={{
                      __html: `<span class="det-type-badge ${r.t}">${r.tl}</span>${r.c}`,
                    }}
                  />


                  {/* Field comparison pills — 고정 순서: 제목→저자→발행처→발행연도 */}
                  {(r.mf || r.uf || r.fc) && (() => {
                    const order = ['제목', '저자', '발행처', '발행연도'];
                    const LABEL = { '제목': '제목', '저자': '저자', '발행처': '저널명/발행처', '발행연도': '발행연도' };
                    const isConfirmed = r.v === 'confirmed';

                    /* fc (fieldComparison) 방식: 유효 카드 */
                    if (r.fc) {
                      return (
                        <div className="det-matched-fields">
                          {order.map(f => {
                            const status = r.fc[f];
                            if (!status) return null;
                            if (status === 'match') return <span key={f} className="det-match-pill ok">{LABEL[f]} 확인</span>;
                            if (status === 'check') return <span key={f} className="det-match-pill check">{LABEL[f]} 확인 필요</span>;
                            if (status === 'mismatch') return <span key={f} className="det-match-pill ng">{LABEL[f]} 불일치</span>;
                            return null;
                          })}
                        </div>
                      );
                    }

                    /* mf/uf 방식: 부분일치 카드 */
                    const mfSet = new Set(r.mf || []);
                    const ufSet = new Set(r.uf || []);
                    return (
                      <div className="det-matched-fields">
                        {order.map(f => {
                          if (mfSet.has(f + ' 일치')) return <span key={f} className="det-match-pill ok">{LABEL[f]} 확인</span>;
                          if (ufSet.has(f + ' 불일치')) return <span key={f} className="det-match-pill ng">{LABEL[f]} 불일치</span>;
                          return null;
                        })}
                      </div>
                    );
                  })()}

                  {/* Note — 미등록 시 원래 note, 등록 완료 시 전용 안내 */}
                  {done ? (
                    <div className="vd-note vd-note--registered">유효성 검증에서 확인되지 않았지만, 이용자가 등록을 신청한 참고문헌입니다.<br />이용자가 등록한 참고문헌은 카피킬러가 유효 여부를 확인하거나 보증하지 않습니다.</div>
                  ) : r.note ? (
                    <div className="vd-note">{r.note}</div>
                  ) : null}


                </div>

                {/* Right: status icon + label */}
                <div className="det-ref-right">
                  <div className={`det-status-icon ${vc}`}>
                    {done ? VI.registered : (VI[VC[r.v]] || VI[r.v] || VI.mismatch)}
                  </div>
                  <div className={`det-status-label ${vc}`}>
                    {done ? '직접 입력' : VL[r.v]}
                  </div>

                  {/* Register button — CK DB unconfirmed only */}
                  {canReg && !isEditing && (
                    <button className="det-reg-btn" onClick={() => openEdit(r.id)}>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                      CK 텀즈 등록 신청
                    </button>
                  )}

                  {/* 확인 출처 경로 — CK DB vs 외부 링크 (확인 + 부분확인) */}
                  {!isOnline && (r.v === 'confirmed' || r.v === 'partial') && (
                    <a
                      className="det-ck-link"
                      href="#"
                      onClick={e => e.preventDefault()}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      CK 텀즈에서 확인
                    </a>
                  )}
                  {isOnline && (r.v === 'confirmed' || r.v === 'partial') && r.url && (
                    <a
                      className="det-ck-link online"
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      외부 링크에서 확인
                    </a>
                  )}

                </div>
              </div>

              {/* ── Inline edit area (CK DB unconfirmed only) ── */}
              {(canReg || isEditing) && (
                <div className={`det-edit-area${isEditing ? ' show' : ''}`}>
                  <div className="det-edit-header">CK 텀즈 등록 신청</div>
                  <div className="det-edit-desc">
                    CK 텀즈에 아래 참고문헌 정보의 등록을 신청합니다.<br />
                    신청하신 참고문헌 정보는 관리자의 확인 후 승인되며, 승인 이후 다시 검사하시면 유효한 참고문헌으로 판정됩니다.<br />
                    CK 텀즈에 등록신청을 한 참고문헌은 결과가 '직접 입력'으로 표시됩니다.<br />
                    CK 텀즈 등록은 신청 후 철회가 불가능합니다. 참고문헌 정보를 정확하게 입력해주세요.
                  </div>
                  <div className="det-edit-section-label">참고문헌 정보</div>
                  <div className="det-edit-grid">
                    <div className="k">참고문헌 유형 <span className="req">*</span></div>
                    <div className="v">
                      <select id={`ed_type_${r.id}`} className="det-edit-select" defaultValue={r.t || 'paper'}>
                        <option value="paper">논문</option>
                        <option value="book">단행본(도서)</option>
                        <option value="report">보고서</option>
                        <option value="webpage">웹문서</option>
                        <option value="news">뉴스기사</option>
                        <option value="patent">특허</option>
                        <option value="standard">표준/규격</option>
                        <option value="dataset">데이터셋</option>
                        <option value="unknown">기타</option>
                      </select>
                    </div>
                    <div className="k">제목/도서명 <span className="req">*</span></div>
                    <div className="v"><input id={`ed_tit_${r.id}`} defaultValue={r.m.TIT || ''} placeholder="참고문헌의 제목 또는 도서명을 입력하세요" /></div>
                    <div className="k">저자명 <span className="req">*</span></div>
                    <div className="v">
                      <ChipsInput
                        id={`ed_aut_${r.id}`}
                        items={getAuthors(r)}
                        onChange={list => setAuthors(r.id, list)}
                        placeholder="저자명 입력 후 Enter 또는 ; 로 추가"
                      />
                    </div>
                    <div className="k">저널/학술지명</div>
                    <div className="v"><input id={`ed_jou_${r.id}`} defaultValue={r.m.JOU || ''} placeholder="게재된 저널 또는 학술지명을 입력하세요" /></div>
                    <div className="k">발행처/출판사명</div>
                    <div className="v"><input id={`ed_org_${r.id}`} defaultValue={r.m.ORG || ''} placeholder="발행처 또는 출판사명을 입력하세요" /></div>
                    <div className="k">발행일 <span className="req">*</span></div>
                    <div className="v"><input id={`ed_dat_${r.id}`} defaultValue={r.m.DAT || ''} placeholder="예: 2024-03-15 또는 2024" /></div>
                    <div className="k">작성언어</div>
                    <div className="v">
                      <select id={`ed_lang_${r.id}`} className="det-edit-select" defaultValue="ko">
                        <option value="ko">한국어</option>
                        <option value="en">영어</option>
                        <option value="ja">일본어</option>
                        <option value="zh">중국어</option>
                        <option value="other">기타</option>
                      </select>
                    </div>
                    <div className="k">권</div>
                    <div className="v"><input id={`ed_vol_${r.id}`} defaultValue={r.m.VOL ? r.m.VOL.split(/[,(]/)[0].trim() : ''} placeholder="예: 26" /></div>
                    <div className="k">호</div>
                    <div className="v"><input id={`ed_iss_${r.id}`} defaultValue="" placeholder="예: 3" /></div>
                    <div className="k">페이지</div>
                    <div className="v"><input id={`ed_page_${r.id}`} defaultValue="" placeholder="예: 93-119" /></div>
                    <div className="k">DOI</div>
                    <div className="v"><input id={`ed_doi_${r.id}`} defaultValue="" placeholder="예: 10.1234/abcd.2024.01" /></div>
                    <div className="k">URL <span className="req">*</span></div>
                    <div className="v"><input id={`ed_url_${r.id}`} defaultValue="" placeholder="참고문헌 원문 링크를 입력하세요" /></div>
                    <div className="k">저자키워드</div>
                    <div className="v">
                      <ChipsInput
                        id={`ed_kw_${r.id}`}
                        items={getKeywords(r)}
                        onChange={list => setKeywords(r.id, list)}
                        placeholder="키워드 입력 후 Enter 또는 ; 로 추가"
                      />
                    </div>
                    <div className="k">초록</div>
                    <div className="v"><textarea id={`ed_abs_${r.id}`} className="det-edit-textarea" rows="5" defaultValue="" placeholder="참고문헌의 초록을 입력하세요 (최대 2,000자)" /></div>
                  </div>
                  <div className="det-edit-divider" />
                  <div className="det-edit-section-label">신청자 email</div>
                  <div className="det-edit-grid">
                    <div className="k">이메일 <span className="req">*</span></div>
                    <div className="v"><input id={`ed_email_${r.id}`} defaultValue="" placeholder="example@email.com" /></div>
                  </div>
                  <div className="det-edit-privacy">등록 신청 결과 안내를 위한 이메일 주소를 입력해주세요.<br />입력하신 이메일은 CK 텀즈 등록 심사 결과 안내 목적으로만 사용됩니다.</div>
                  <div className="det-edit-actions">
                    <button className="det-edit-cancel" onClick={cancelEdit}>취소</button>
                    <button className="det-edit-save" onClick={() => requestSave(r.id)}>등록 신청</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 가이드 문구 (페이지 최하단) ── */}
      <div className="det-info-note det-info-note--bottom">
        <div className="det-info-icon">●</div>
        <div className="det-info-content">
          <p><strong>미확인 참고문헌이란?</strong></p>
          <p>검사 문서에 기재된 참고문헌이 카피킬러 100억건 DB에 기반하여 구축된 CK 텀즈, 또는 웹에서 확인되지 않은 것을 의미합니다.</p>
          <p>미확인 참고문헌에는 AI가 생성한 참고문헌이 포함되었을 위험이 있습니다.</p>
          <p>실제 존재하는 참고문헌이 아직 CK 텀즈에 등록되지 않아 미확인으로 판정된 경우, 참고문헌을 <strong>CK 텀즈에 직접 등록 신청</strong>하실 수 있습니다.</p>
        </div>
      </div>

      </div>{/* ── /vd-content ── */}

      {/* ── Confirm popup ── */}
      {confirmId !== null && (
        <div className="vd-confirm-overlay">
          <div className="vd-confirm-box">
            <div className="vd-confirm-msg">CK 텀즈에 등록 신청하시겠습니까?</div>
            <div className="vd-confirm-actions">
              <button className="vd-confirm-cancel" onClick={cancelConfirm}>취소</button>
              <button className="vd-confirm-ok" onClick={confirmSave}>신청</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 등록 완료 안내 팝업 ── */}
      {regDonePopup && (
        <div className="vd-confirm-overlay">
          <div className="vd-confirm-box vd-confirm-box--wide">
            <div className="vd-confirm-icon">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--registered-color)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg>
            </div>
            <div className="vd-confirm-msg"><strong>등록 신청이 완료되었습니다.</strong></div>
            <div className="vd-confirm-desc">
              CK 텀즈에 등록 신청한 참고문헌은 관리자 검토 후 승인되며,<br />
              승인된 이후 재검사 시 유효한 참고문헌으로 처리됩니다.
            </div>
            <div className="vd-confirm-actions">
              <button className="vd-confirm-ok" onClick={() => setRegDonePopup(false)}>확인</button>
            </div>
          </div>
        </div>
      )}

      {/* ── PDF loading overlay ── */}
      {pdfLoading && (
        <div className="vd-loading-overlay">
          <div className="vd-spinner" />
          <div className="vd-loading-text">PDF 생성 중...</div>
        </div>
      )}

      {/* ── Toast ── */}
      <div className={`toast${toast ? ' show' : ''}`}>{toast}</div>
    </div>
  );
}

/* ── 저자명/키워드 칩 입력 컴포넌트 (범용) ── */
function ChipsInput({ id, items, onChange, placeholder }) {
  const [input, setInput] = useState('');

  const addItem = (name) => {
    const n = name.trim();
    if (!n) return;
    if (items.includes(n)) { setInput(''); return; }
    onChange([...items, n]);
    setInput('');
  };

  const removeItem = (idx) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ';') {
      e.preventDefault();
      addItem(input);
    } else if (e.key === 'Backspace' && !input && items.length > 0) {
      removeItem(items.length - 1);
    }
  };

  return (
    <div className="det-chip-input" onClick={() => document.getElementById(id)?.focus()}>
      {items.map((name, idx) => (
        <span key={idx} className="det-chip">
          {name}
          <button type="button" className="det-chip__x" onClick={(e) => { e.stopPropagation(); removeItem(idx); }}>×</button>
        </span>
      ))}
      <input
        id={id}
        className="det-chip-field"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => { if (input.trim()) addItem(input); }}
        placeholder={items.length === 0 ? (placeholder || '입력 후 Enter 또는 ; 로 추가') : ''}
      />
    </div>
  );
}
