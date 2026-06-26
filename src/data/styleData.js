/* ── 스타일 검사 데이터 (실제 CK 출처 검사 상세 기반) ── */

/* 검사 요청 정보 */
export const CHECK_INFO = {
  userId: 'iwang@muhayu.com',
  checkNo: 4427,
  org: '무하유',
  docName: '카피킬러 캠퍼스_시연문서_검사문서 1.docx',
  userName: '왕일',
  citationStyle: 'APA',
  completedAt: '2023-10-18',
  checkScope: '출처 표기법 오류, 최신성 위험, 편향성 위험',
};

/* 문서 내 인용정보 수 */
export const DOC_CITATION_COUNTS = {
  total: 30,
  intext: 3,
  footnote: 15,
  reference: 12,
};

/* 검사 결과 요약 */
export const SUMMARY = {
  totalRisk: 71,
  normalCount: 0,
  types: [
    { key: 'citationMissing', label: '인용정보 누락', count: 34, color: '#ff4f4f' },
    { key: 'formatError',     label: '출처 표기 오류', count: 13, color: '#ff4f4f' },
    { key: 'recencyRisk',     label: '최신성 위험',   count: 24, color: '#ff971c' },
    { key: 'authorBias',      label: '저자 편향',     count: 0,  color: '#939395' },
    { key: 'journalBias',     label: '저널 편향',     count: 0,  color: '#939395' },
  ],
};

/* ── 카테고리별 데이터 ── */

/* 1. 각주/내주 누락 */
export const FOOTNOTE_MISSING = {
  key: 'footnoteMissing',
  label: '각주/내주 누락',
  count: 12,
  warning: '매칭되는 내주/각주/인용구가 없는 참고문헌의 목록입니다.\n본문에서 해당 참고문헌이 인용된 영역에 각주나 내주를 기재해주세요.',
  items: [
    { id: 1, text: '강순희. "중국어 생략과 한국어 생략의 차이와 공통점 연구." 한국어학회지 39, no. 2 (2005): 237-258.' },
    { id: 2, text: '공영일. "명사 차원에서 중국어의 특징과 단점." 중문학회지 22, no.20 (2010): 61-70.' },
    { id: 3, text: '구중억. "중국어의 고유의 명사, 부사의 성조 특징에 대한 연구." 중문연구학회지 45, no.1 (2011): 75-101.' },
    { id: 4, text: '권희정. "의미를 통한 한국 미각어 교육 연구 -중국어권 학습자를 대상으로." 무하유학회 20, no.3(2010): 1-15.' },
    { id: 5, text: '김영곤, 오청규. "국내 중국어 교육에 대한 연구." 한국교육학회지 28, no.3 (2011): 197-217.' },
    { id: 6, text: '김항용. "장애인의 외국어 교육을 외국의 사례와 우리나라 사례의 비교연구." The journal of education & politics 11, no.10 (2013): 373-378.' },
    { id: 7, text: '김준기. "미각 형용사의 의미고찰." 어문논집 28, no.1(2008): 1-30.' },
    { id: 8, text: '박민신. "한국어 미각형용사의 의미 연구." 한국언어학회 15, no.2 (2009): 45-72.' },
    { id: 9, text: '이상철. "중국어 부사의 기능과 분류 체계." 중국어문학논집 33 (2005): 119-142.' },
    { id: 10, text: '정수진. "한중 색채어의 인지언어학적 비교." 비교문학연구 18, no.1 (2012): 201-230.' },
    { id: 11, text: '최은영. "중국어 감정동사의 의미 분석." 중국학연구 42 (2007): 55-78.' },
    { id: 12, text: '한미경. "중국어권 한국어 학습자의 조사 오류 분석." 이중언어학 50 (2012): 283-310.' },
  ],
};

/* 2. 참고문헌 누락 */
export const REFERENCE_MISSING = {
  key: 'referenceMissing',
  label: '참고문헌 누락',
  count: 22,
  warning: '매칭되는 내주/각주/인용구가 없는 참고문헌의 목록입니다.\n본문에서 해당 참고문헌이 인용된 영역에 각주나 내주를 기재해주세요.',
  items: [
    { id: 1, citation: '넷째로, 지혜는 야곱을 원수들의 위협에서 안전하게 보호 해주었다(12ab). 본문의 12a와 12b를 동의적 평행법으로 여길 경우, \'원수들\'은 \'매복해 있는 사람들\'인데 적을 공격하기 위해 숨속에 숨어서 기다리는 자들을 의미한다.', footnote: 'of Wisdom, 136; P. Enns, Exodus Retold, 28-30; A. T. Glicksman, "Wisdom of Solomon 10," 218.', intext: '-' },
    { id: 2, citation: '다.(김카피, 2005) 그 특성은 시조에서 나타나기도 한다. 아래는 시조의 일부이다.', footnote: '-', intext: '(김카피, 2005)' },
    { id: 3, citation: '둘째로 본문은 아담을 \'홀로 창조된 분\'이라고 하는데, 두 가지 해석이 가능하다.', footnote: '-', intext: '-' },
    { id: 4, citation: '필로의 저작에도 나오는데, 그는 하나님에 의해서 창조된 아담은 태어나 다른 모든 인간보다 더 우월하며 완전하다고 주장했다.', footnote: 'Philo, Questions and Answers on Exodus(USA: Scholar, 2001), 2.46.', intext: '-' },
    { id: 5, citation: '이해석은 \'세상의 아버지\'(1a)를 \'인류의 조상\'으로 이해할 경우 더욱 지지를 받을 수 있다.', footnote: '-', intext: '-' },
  ],
};

/* 3. 출처 표기 오류 */
export const FORMAT_ERROR = {
  key: 'formatError',
  label: '출처 표기 오류',
  count: 13,
  warning: '지정된 출처 표기법과 다르게 출처 표시가 된 인용정보의 목록입니다.\n인용정보 유형과 오류 유형을 참고하여 오류가 있는 부분을 수정해주세요.',
  items: [
    { id: 1, citation: '(Freire,1972a:113)', type: '내주', errorType: '띄어쓰기 오류' },
    { id: 2, citation: '강순희. "중국어 생략과 한국어 생략의 차이와 공통점 연구." 한국어학회지 39, no. 2 (2005): 237-258.', type: '참고문헌', errorType: '개체 순서 오류, 연도 기호 오류, 정기간행물명 기호 오류, 권(호) 표기 오류' },
    { id: 3, citation: '공영일. "명사 차원에서 중국어의 특징과 단점." 중문학회지 22, no.20 (2010): 61-70.', type: '참고문헌', errorType: '개체 순서 오류, 연도 기호 오류, 정기간행물명 기호 오류, 권(호) 표기 오류' },
    { id: 4, citation: '구중억. "중국어의 고유의 명사, 부사의 성조 특징에 대한 연구." 중문연구학회지 45, no.1 (2011): 75-101.', type: '참고문헌', errorType: '개체 순서 오류, 연도 기호 오류, 정기간행물명 기호 오류, 권(호) 표기 오류' },
    { id: 5, citation: '권희정. "의미를 통한 한국 미각어 교육 연구 -중국어권 학습자를 대상으로." 무하유학회 20, no.3(2010): 1-15.', type: '참고문헌', errorType: '개체 순서 오류, 연도 기호 오류, 정기간행물명 기호 오류, 권(호) 표기 오류' },
    { id: 6, citation: '김영곤, 오청규. "국내 중국어 교육에 대한 연구." 한국교육학회지 28, no.3 (2011): 197-217.', type: '참고문헌', errorType: '연도 기호 오류, 정기간행물명 기호 오류' },
    { id: 7, citation: '김항용. "장애인의 외국어 교육을 외국의 사례와 우리나라 사례의 비교연구." The journal of education & politics 11, no.10 (2013): 373-378.', type: '참고문헌', errorType: '개체 순서 오류' },
    { id: 8, citation: '(김카피, 2005)', type: '내주', errorType: '띄어쓰기 오류' },
    { id: 9, citation: '박민신. "한국어 미각형용사의 의미 연구." 한국언어학회 15, no.2 (2009): 45-72.', type: '참고문헌', errorType: '연도 기호 오류, 정기간행물명 기호 오류, 권(호) 표기 오류' },
    { id: 10, citation: '이상철. "중국어 부사의 기능과 분류 체계." 중국어문학논집 33 (2005): 119-142.', type: '참고문헌', errorType: '개체 순서 오류, 연도 기호 오류' },
    { id: 11, citation: '정수진. "한중 색채어의 인지언어학적 비교." 비교문학연구 18, no.1 (2012): 201-230.', type: '참고문헌', errorType: '정기간행물명 기호 오류, 권(호) 표기 오류' },
    { id: 12, citation: '최은영. "중국어 감정동사의 의미 분석." 중국학연구 42 (2007): 55-78.', type: '참고문헌', errorType: '연도 기호 오류' },
    { id: 13, citation: '한미경. "중국어권 한국어 학습자의 조사 오류 분석." 이중언어학 50 (2012): 283-310.', type: '참고문헌', errorType: '개체 순서 오류, 연도 기호 오류, 권(호) 표기 오류' },
  ],
};

/* 4. 최신성 위험 */
export const RECENCY_RISK = {
  key: 'recencyRisk',
  label: '최신성 위험',
  count: 24,
  warning: '학술 저작물 작성 시에는 특정 주제에 대해 최신 연구동향을 선호하는 경향이 있습니다.\n학문 분야에 따라서, 또는 중요한 사실을 기재해야 하는 경우에는 오래된 문헌도 중요하게 인용될 수 있습니다.',
  distribution: [
    { label: '최근 3년 이내 발행 인용정보', count: 0, pct: '0%' },
    { label: '최근 4년~5년 발행 인용정보', count: 0, pct: '0%' },
    { label: '최근 6~10년 발행 인용정보', count: 0, pct: '0%' },
    { label: '발행 10년 경과 인용정보', count: 26, pct: '100%', highlight: true },
  ],
  items: [
    { id: 1, citation: '(김카피, 2005)', type: '내주' },
    { id: 2, citation: 'D. Winston, The Wisdom of Solomon (Garden City: Doubleday, 1979), 213.', type: '각주' },
    { id: 3, citation: 'als Thema der Theologie, ed. F. Christ (Hamburg: Herbert Reich Evange-lischer Verlag, 1967), 18.', type: '각주' },
    { id: 4, citation: 'Philo, Questions and Answers on Exodus(USA: Scholar, 2001), 2.46.', type: '각주' },
    { id: 5, citation: '강순희. "중국어 생략과 한국어 생략의 차이와 공통점 연구." 한국어학회지 39, no. 2 (2005): 237-258.', type: '참고문헌' },
    { id: 6, citation: '공영일. "명사 차원에서 중국어의 특징과 단점." 중문학회지 22, no.20 (2010): 61-70.', type: '참고문헌' },
    { id: 7, citation: '구중억. "중국어의 고유의 명사, 부사의 성조 특징에 대한 연구." 중문연구학회지 45, no.1 (2011): 75-101.', type: '참고문헌' },
    { id: 8, citation: '권희정. "의미를 통한 한국 미각어 교육 연구." 무하유학회 20, no.3(2010): 1-15.', type: '참고문헌' },
    { id: 9, citation: '김영곤, 오청규. "국내 중국어 교육에 대한 연구." 한국교육학회지 28, no.3 (2011): 197-217.', type: '참고문헌' },
    { id: 10, citation: '김항용. "장애인의 외국어 교육을 외국의 사례와 우리나라 사례의 비교연구." The journal of education & politics 11, no.10 (2013): 373-378.', type: '참고문헌' },
    { id: 11, citation: '김준기. "미각 형용사의 의미고찰." 어문논집 28, no.1(2008): 1-30.', type: '참고문헌' },
    { id: 12, citation: '박민신. "한국어 미각형용사의 의미 연구." 한국언어학회 15, no.2 (2009): 45-72.', type: '참고문헌' },
  ],
};

/* 5. 저자 편향 */
export const AUTHOR_BIAS = {
  key: 'authorBias',
  label: '저자 편향',
  count: 0,
  warning: '출처 중 특정 저널이나 저자가 차지하는 비율이 40%를 초과하여 편향으로 의심되는 경우입니다.',
  items: [],
};

/* 6. 저널 편향 */
export const JOURNAL_BIAS = {
  key: 'journalBias',
  label: '저널 편향',
  count: 0,
  warning: '출처 중 특정 저널이나 저자가 차지하는 비율이 40%를 초과하여 편향으로 의심되는 경우입니다.',
  items: [],
};

/* 7. 정상 인용 */
export const NORMAL_CITATION = {
  key: 'normalCitation',
  label: '정상 인용',
  count: 0,
  warning: '각주 또는 내주 · 참고문헌이 잘 연결되어 있고, 출처 스타일에 문제가 없는 것으로 식별된 인용정보 목록입니다.',
  items: [],
};

/* 전체 카테고리 배열 (사이드바 네비게이션 순서) */
export const CATEGORIES = [
  FOOTNOTE_MISSING,
  REFERENCE_MISSING,
  FORMAT_ERROR,
  RECENCY_RISK,
  AUTHOR_BIAS,
  JOURNAL_BIAS,
  NORMAL_CITATION,
];
