// 결과 목록 더미 데이터
export const RESULTS = [
  { id: 1, date: '2026-03-28', citationStyle: 'APA', name: 'minglespoon_문화체육관광부_정책소통 체크리스트_20260211_FINAL.hwpx', citationCount: 22, riskCount: 8, status: 'done', style: { risk: 8 }, validity: { unconfirmed: 7, total: 22 } },
  { id: 2, date: '2026-03-25', citationStyle: 'Chicago', name: '2026년 1분기 정책홍보 성과분석 보고서.docx', citationCount: 15, riskCount: 3, status: 'done', style: { risk: 3 }, validity: { unconfirmed: 2, total: 15 } },
  { id: 3, date: '2026-03-22', citationStyle: 'APA', name: '디지털 전환 시대의 미디어 리터러시 연구.hwpx', citationCount: 18, riskCount: 12, status: 'done', style: { risk: 12 }, validity: { unconfirmed: 5, total: 18 } },
  { id: 4, date: '2026-03-20', citationStyle: 'MLA', name: '공공 커뮤니케이션 전략 수립 가이드.docx', citationCount: null, riskCount: null, status: 'processing', style: { risk: null }, validity: { unconfirmed: null, total: null } },
  { id: 5, date: '2026-03-18', citationStyle: 'APA', name: '뉴스미디어 소비 트렌드 분석 2025.hwpx', citationCount: 20, riskCount: 0, status: 'done', style: { risk: 0 }, validity: { unconfirmed: 0, total: 20 } },
  { id: 6, date: '2026-03-15', citationStyle: 'Vancouver', name: '소셜미디어 기반 정부 소통의 효과성 분석_v2.docx', citationCount: null, riskCount: null, status: 'error', style: { risk: null }, validity: { unconfirmed: null, total: null } },
  { id: 7, date: '2026-03-12', citationStyle: 'Chicago', name: '방송매체 이용행태 조사 최종보고서.hwpx', citationCount: 12, riskCount: 5, status: 'done', style: { risk: 5 }, validity: { unconfirmed: 1, total: 12 } },
  /* 레거시 문서: 기존 스타일검사만 수행, 유효성 검사 미검사 */
  { id: 8, date: '2025-12-10', citationStyle: 'APA', name: '2025년 미디어 정책 동향 분석.hwpx', citationCount: 14, riskCount: 4, status: 'done', style: { risk: 4 }, validity: 'unscanned' },
  /* 유효성 검사만 선택하여 실행, 스타일 검사 미실시 */
  { id: 9, date: '2026-03-10', citationStyle: 'APA', name: '언론 보도 기반 정책 효과 분석.docx', citationCount: 9, riskCount: null, status: 'done', style: 'skipped', validity: { unconfirmed: 3, total: 9 } },
  /* 참고문헌 0건 문서 */
  { id: 10, date: '2026-03-08', citationStyle: 'APA', name: '정책브리핑 내부 회의록_20260308.docx', citationCount: 0, riskCount: 0, status: 'done', style: { risk: 0 }, validity: { unconfirmed: 0, total: 0, empty: true } },
];

export const STATUS_MAP = {
  done: { label: '완료', color: '#15803d', bg: '#dcfce7' },
  processing: { label: '처리중', color: '#d97706', bg: '#fef3c7' },
  error: { label: '오류', color: '#dc2626', bg: '#fee2e2' },
};

/* ── 관리자 뷰용 더미 데이터 (참고문헌 유효성 검증 현황) ── */
const DOMAINS = ['dongguk.copykiller.com', 'hanyang.copykiller.com', 'skku.copykiller.com', 'snu.copykiller.com', 'yonsei.copykiller.com', 'korea.copykiller.com'];
const EMAIL_PREFIX = ['kim1034', 'lee7892', 'park5421', 'choi0192', 'jung6742', 'son9933', 'yoon2810', 'han7749', 'seo4455', 'oh8831', 'baek5566', 'kang3322'];

export const ADMIN_RESULTS = Array.from({ length: 24 }).map((_, i) => {
  const base = RESULTS[i % RESULTS.length];
  const domain = DOMAINS[i % DOMAINS.length];
  const emailPrefix = EMAIL_PREFIX[i % EMAIL_PREFIX.length];
  const id = 65504 - i;
  const date = `2026-04-${String(20 - (i % 18)).padStart(2, '0')}`;
  const validity = base.validity === 'unscanned' || base.validity === 'skipped' ? { total: 0, unconfirmed: 0 } : base.validity;
  /* 일부 행은 미진행(pending) 상태로 설정 */
  const status = i % 7 === 3 ? 'pending' : base.status;
  return {
    id,
    date,
    status,
    name: base.name,
    email: `${emailPrefix}@${domain}`,
    filterState: i % 5 === 0 ? 'N' : 'Y',
    domain,
    analysisState: status === 'done' ? 'Y' : 'N',
    validity: validity || { total: 0, unconfirmed: 0 },
  };
});
