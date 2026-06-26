export const CITATION_RESULTS = [
  { id: 1799, name: 'KCI_FI002963328.docx', date: '2026-05-18', total: 70, unconfirmed: 37, status: 'done' },
  { id: 1795, name: '출처검사 학위논문 8 doc', date: '2026-05-18', total: null, unconfirmed: null, status: 'failed' },
  { id: 389, name: 'KCI_FI002388522_부끄러움창피함', date: '2026-05-15', total: 16, unconfirmed: 3, status: 'done' },
  { id: 264, name: '3', date: '2026-05-14', total: 261, unconfirmed: 8, status: 'done' },
  { id: 261, name: 'KCI_FI003326011', date: '2026-05-14', total: 45, unconfirmed: 22, status: 'done' },
  { id: 260, name: 'KCI_FI003305989', date: '2026-05-14', total: 0, unconfirmed: 0, status: 'done' },
  { id: 259, name: '3', date: '2026-05-14', total: 261, unconfirmed: 4, status: 'done' },
  { id: 258, name: 'KCI_FI003308539', date: '2026-05-14', total: 8, unconfirmed: 3, status: 'done' },
  { id: 256, name: '출처검사 학위논문 8 doc', date: '2026-05-14', total: 64, unconfirmed: 11, status: 'done' },
  { id: 255, name: '1201_윤은혜_논문 최종본', date: '2026-05-14', total: 71, unconfirmed: 34, status: 'done' },
];

export const CITATION_DETAIL = {
  id: 1799,
  name: 'KCI_FI002963328.docx',
  summary: { total: 70, confirmed: 11, partial: 22, unconfirmed: 37, manual: 0 },
  types: [
    { label: '논문', count: 65, color: 'blue' },
    { label: '단행본', count: 0, color: 'blue' },
    { label: '보고서', count: 0, color: 'blue' },
    { label: '웹페이지', count: 2, color: 'green' },
    { label: '뉴스', count: 0, color: 'green' },
    { label: '특허', count: 0, color: 'purple' },
    { label: '표준문서', count: 0, color: 'purple' },
    { label: '데이터셋', count: 0, color: 'blue' },
    { label: '기타', count: 3, color: 'gray' },
  ],
  references: [
    {
      id: 1, type: '논문', status: 'partial',
      text: '구려나(2018), "월(粤)방언권 중국인 학습자의 한국어 억양 습득 연구: 확인의문문 중심으로", 한국언어문화학, 15권 3호, 국제한국언어문화학회, 1-25쪽.',
      tags: [
        { label: '제목 일치', match: true },
        { label: '저자 확인 필요', match: false },
        { label: '발행처 확인 필요', match: false },
        { label: '발행연도 일치', match: true },
      ],
      ckTermsUrl: 'https://terms.copykiller.com/posts/019d89cc4c13736fb6abb48a8f50056f',
    },
    {
      id: 2, type: '논문', status: 'partial',
      text: '구려나(2019), 중국인 한국어 학습자의 의문문 억양 실현 연구, 전남대학교 대학원 박사학위 논문.',
      tags: [
        { label: '제목 일치', match: true },
        { label: '저자 일치', match: true },
        { label: '발행처 확인 필요', match: false },
        { label: '발행연도 일치', match: true },
      ],
      ckTermsUrl: 'https://terms.copykiller.com/posts/019d89be08a8739fb5e58cf66d1ea34d',
    },
    {
      id: 3, type: '논문', status: 'unconfirmed',
      text: '권경근(2021), "대만인 학습자를 위한 한국어 발음교육 연구: 운율단위의 음운현상을 중심으로", 한국어 문화 교육, 15권 2호, 한국어문화교육학회, 100-129쪽.',
      tags: [
        { label: '제목 확인 필요', match: false },
        { label: '저자 확인 필요', match: false },
        { label: '발행처 확인 필요', match: false },
        { label: '발행연도 확인 필요', match: false },
      ],
      ckTermsUrl: null,
    },
    {
      id: 4, type: '논문', status: 'partial',
      text: '김선정(2013), "음성학을 활용한 발음 교육 및 습득 연구동향", 언어와 문화, 9권 3호,',
      tags: [
        { label: '제목 일치', match: true },
        { label: '저자 확인 필요', match: false },
        { label: '발행처 확인 필요', match: false },
        { label: '발행연도 일치', match: true },
      ],
      ckTermsUrl: 'https://terms.copykiller.com/posts/019d89ce45cd7a9a9193a2a0522f43ce',
    },
    {
      id: 5, type: '논문', status: 'confirmed',
      text: '김형복(2004), 한국어 억양 교육 방안 연구, 한국어교육, 15권 2호, 국제한국어교육학회, 23-42쪽.',
      tags: [
        { label: '제목 일치', match: true },
        { label: '저자 일치', match: true },
        { label: '발행처 일치', match: true },
        { label: '발행연도 일치', match: true },
      ],
      ckTermsUrl: 'https://terms.copykiller.com/posts/example',
    },
  ],
};
