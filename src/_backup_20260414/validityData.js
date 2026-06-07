/* 검사 요청 정보 */
export const CHECK_INFO = {
  userId: 'iwang@muhayu.com',
  checkNo: 4427,
  org: '무하유',
  docName: '문헌정보학 분야의 리터러시 연구 동향 분석.docx',
  userName: '왕일',
  completedAt: '2023-10-18',
};

/* ── 원본 논문: KCI_FI002880482 (정보관리학회지 제39권 제3호, 2022) ── */
/* ── 참고문헌을 기반으로 한 유효성 검사 예시 데이터 ── */
/* fc: fieldComparison — match(일치), check(확인 필요), mismatch(불일치) */
export const VALID = [
  /* ── 학술논문 (KCI DB 확인) ── */
  {id:1,v:'confirmed',t:'paper',tl:'논문',
   c:'김도헌 (2020). 국내 미디어·디지털·정보·ICT 리터러시의 연구동향 분석. 교육문화연구, 26(3), 93-119.',
   m:{AUT:'김도헌',TIT:'국내 미디어·디지털·정보·ICT 리터러시의 연구동향 분석',JOU:'교육문화연구',DAT:'2020',VOL:'26(3), 93-119'},conf:0.97,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:2,v:'confirmed',t:'paper',tl:'논문',
   c:'김수정 (2015). 문헌정보학 분야 정보활용교육에 관한 연구 동향. 한국비블리아학회지, 26(3), 207-239. https://doi.org/10.14699/kbiblia.2015.26.3.207',
   m:{AUT:'김수정',TIT:'문헌정보학 분야 정보활용교육에 관한 연구 동향',JOU:'한국비블리아학회지',DAT:'2015',VOL:'26(3), 207-239'},conf:0.98,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:3,v:'confirmed',t:'paper',tl:'논문',
   c:'김영환, 김우경, 박지숙 (2021). 키워드 네트워크 분석을 활용한 디지털리터러시 연구 동향분석-2011-2015년과 2016-2020년 비교분석. 리터러시연구, 12(4), 93-125. http://doi.org/10.37736/KJLR.2021.08.12.4.04',
   m:{AUT:'김영환, 김우경, 박지숙',TIT:'키워드 네트워크 분석을 활용한 디지털리터러시 연구 동향분석',JOU:'리터러시연구',DAT:'2021',VOL:'12(4), 93-125'},conf:0.96,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:4,v:'confirmed',t:'paper',tl:'논문',
   c:'김효선 (2021). 기업 아카이브에 관한 연구 동향 분석: 토픽모델링 분석을 중심으로. 한국기록관리학회지, 21(3), 163-186. https://doi.org/10.14404/JKSARM.2021.21.3.163',
   m:{AUT:'김효선',TIT:'기업 아카이브에 관한 연구 동향 분석',JOU:'한국기록관리학회지',DAT:'2021',VOL:'21(3), 163-186'},conf:0.95,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:5,v:'confirmed',t:'paper',tl:'논문',
   c:'남영준 (2007). 정보취약계층을 위한 도서관 서비스 활성화 방안에 관한 연구. 한국문헌정보학회지, 41(4), 49-68. https://doi.org/10.4275/KSLIS.2007.41.4.049',
   m:{AUT:'남영준',TIT:'정보취약계층을 위한 도서관 서비스 활성화 방안에 관한 연구',JOU:'한국문헌정보학회지',DAT:'2007',VOL:'41(4), 49-68'},conf:0.97,
   fc:{제목:'match',저자:'match',발행처:'check',발행연도:'match'}},

  {id:6,v:'confirmed',t:'paper',tl:'논문',
   c:'노영희 (2012). 공공도서관 이용자의 소비자건강정보 (CHI) 리터러시 향상을 위한 교육프로그램 개발 및 성과측정연구. 한국비블리아학회지, 23(4), 391-414. https://doi.org/10.14699/kbiblia.2012.23.4.391',
   m:{AUT:'노영희',TIT:'소비자건강정보(CHI) 리터러시 향상을 위한 교육프로그램 개발 및 성과측정연구',JOU:'한국비블리아학회지',DAT:'2012',VOL:'23(4), 391-414'},conf:0.94,
   fc:{제목:'match',저자:'check',발행처:'match',발행연도:'check'}},

  {id:7,v:'confirmed',t:'paper',tl:'논문',
   c:'박연경, 이용정 (2021). 코로나 시대의 온라인 도서관 이용교육이 정보활용능력에 미치는 영향. 한국도서관·정보학회지, 52(3), 267-285. https://doi.org/10.16981/kliss.52.3.202109.267',
   m:{AUT:'박연경, 이용정',TIT:'코로나 시대의 온라인 도서관 이용교육이 정보활용능력에 미치는 영향',JOU:'한국도서관·정보학회지',DAT:'2021',VOL:'52(3), 267-285'},conf:0.96,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:8,v:'confirmed',t:'paper',tl:'논문',
   c:'박주현 (2020). 미디어정보 리터러시 역량과 교육내용 분석을 통한 교육과정 개발 방향 탐구. 정보관리학회지, 37(2), 119-144. https://doi.org/10.3743/KOSIM.2020.37.2.119',
   m:{AUT:'박주현',TIT:'미디어정보 리터러시 역량과 교육내용 분석을 통한 교육과정 개발 방향 탐구',JOU:'정보관리학회지',DAT:'2020',VOL:'37(2), 119-144'},conf:0.98,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:9,v:'confirmed',t:'paper',tl:'논문',
   c:'박주현, 강봉숙, 이병기 (2021). 정보활용교육을 위한 교과 내용 체계 개발 연구. 한국도서관·정보학회지, 52(1), 229-254. https://doi.org/10.16981/kliss.52.1.202103.229',
   m:{AUT:'박주현, 강봉숙, 이병기',TIT:'정보활용교육을 위한 교과 내용 체계 개발 연구',JOU:'한국도서관·정보학회지',DAT:'2021',VOL:'52(1), 229-254'},conf:0.95,
   fc:{제목:'match',저자:'check',발행처:'match',발행연도:'match'}},

  {id:10,v:'confirmed',t:'paper',tl:'논문',
   c:'박준형, 류법모, 오효정 (2018). 시계열 기반 국내 기록관리학 토픽 트렌드 분석. 한국기록관리학회지, 18(1), 29-47. https://doi.org/10.14404/JKSARM.2018.18.1.029',
   m:{AUT:'박준형, 류법모, 오효정',TIT:'시계열 기반 국내 기록관리학 토픽 트렌드 분석',JOU:'한국기록관리학회지',DAT:'2018',VOL:'18(1), 29-47'},conf:0.96,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:11,v:'confirmed',t:'paper',tl:'논문',
   c:'배경재, 박희진 (2013). 디지털 정보활용교육 운영실태 및 개선방안 연구. 한국도서관·정보학회지, 44(2), 241-265.',
   m:{AUT:'배경재, 박희진',TIT:'디지털 정보활용교육 운영실태 및 개선방안 연구',JOU:'한국도서관·정보학회지',DAT:'2013',VOL:'44(2), 241-265'},conf:0.93,
   fc:{제목:'match',저자:'match',발행처:'check',발행연도:'check'}},

  {id:12,v:'confirmed',t:'paper',tl:'논문',
   c:'안정임, 서윤경, 김성미 (2017). 국내 미디어 리터러시 연구 동향 분석: 연구 특성 및 미디어 역할, 미디어 리터러시 역량요인을 중심으로. 한국방송학보, 31(5), 5-49.',
   m:{AUT:'안정임, 서윤경, 김성미',TIT:'국내 미디어 리터러시 연구 동향 분석',JOU:'한국방송학보',DAT:'2017',VOL:'31(5), 5-49'},conf:0.97,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:13,v:'confirmed',t:'paper',tl:'논문',
   c:'이수상 (2014). 언어 네트워크 분석 방법을 활용한 학술논문의 내용분석. 정보관리학회지, 31(4), 49-68. https://doi.org/10.3743/KOSIM.2014.31.4.049',
   m:{AUT:'이수상',TIT:'언어 네트워크 분석 방법을 활용한 학술논문의 내용분석',JOU:'정보관리학회지',DAT:'2014',VOL:'31(4), 49-68'},conf:0.98,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:14,v:'confirmed',t:'paper',tl:'논문',
   c:'이정미 (2022). 포스트 팬데믹 시대 데이터 리터러시의 사회적 함의와 도서관 서비스 방향에 대한 연구. 한국문헌정보학회지, 56(1), 365-386. https://doi.org/10.4275/KSLIS.2022.56.1.365',
   m:{AUT:'이정미',TIT:'포스트 팬데믹 시대 데이터 리터러시의 사회적 함의와 도서관 서비스 방향에 대한 연구',JOU:'한국문헌정보학회지',DAT:'2022',VOL:'56(1), 365-386'},conf:0.96,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:15,v:'confirmed',t:'paper',tl:'논문',
   c:'정영미 (2018). 미국 공공도서관의 성인을 위한 디지털 리터러시 교육에 관한 연구. 한국문헌정보학회지, 52(1), 359-380. https://doi.org/10.4275/KSLIS.2018.52.1.359',
   m:{AUT:'정영미',TIT:'미국 공공도서관의 성인을 위한 디지털 리터러시 교육에 관한 연구',JOU:'한국문헌정보학회지',DAT:'2018',VOL:'52(1), 359-380'},conf:0.95,
   fc:{제목:'match',저자:'check',발행처:'match',발행연도:'match'}},

  {id:16,v:'confirmed',t:'paper',tl:'논문',
   c:'이창봉, 윤영, 한승규 (2021). 토픽모델링과 네트워크 분석을 활용한 리터러시 연구의 동향. 리터러시연구, 12(6), 121-163.',
   m:{AUT:'이창봉, 윤영, 한승규',TIT:'토픽모델링과 네트워크 분석을 활용한 리터러시 연구의 동향',JOU:'리터러시연구',DAT:'2021',VOL:'12(6), 121-163'},conf:0.94,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:17,v:'confirmed',t:'paper',tl:'논문',
   c:'정현선 (2004). 리터러시와 국어교육; 디지털 리터러시의 국어교육적 고찰. 국어교육학연구, 21, 5-42.',
   m:{AUT:'정현선',TIT:'디지털 리터러시의 국어교육적 고찰',JOU:'국어교육학연구',DAT:'2004',VOL:'21, 5-42'},conf:0.93,
   fc:{제목:'match',저자:'match',발행처:'check',발행연도:'match'}},

  {id:18,v:'confirmed',t:'paper',tl:'논문',
   c:'정현선, 김아미, 박유미, 전경란, 이지선, 노자연 (2016). 핵심역량 중심의 미디어 리터러시 교육 내용 체계화 연구. 학습자중심교과교육연구, 16(11), 211-238.',
   m:{AUT:'정현선, 김아미, 박유미, 전경란, 이지선, 노자연',TIT:'핵심역량 중심의 미디어 리터러시 교육 내용 체계화 연구',JOU:'학습자중심교과교육연구',DAT:'2016',VOL:'16(11), 211-238'},conf:0.96,
   fc:{제목:'match',저자:'check',발행처:'match',발행연도:'match'}},

  /* ── 미확인 (제목 불일치 → 미확인 판정) ── */
  {id:19,v:'unconfirmed',t:'paper',tl:'논문',
   c:'이성신, 강보라, 이세나 (2021). 정보격차 연구 동향 분석-문헌정보학분야와 일반사회과학분야와의 비교. 한국도서관·정보학회지, 50(3), 139-166. https://doi.org/10.16981/kliss.50.201909.139',
   m:{AUT:'이성신, 강보라, 이세나',TIT:'정보격차 연구 동향 분석',JOU:'한국도서관·정보학회지',DAT:'2019',VOL:'50(3), 139-166'},
   conf:0.72,note:'CK 텀즈 또는 웹에서 확인 불가'},

  {id:20,v:'unconfirmed',t:'paper',tl:'논문',
   c:'이현실, 최상기 (2005). 우리나라 대학생들의 정보활용능력 인식도에 관한 연구. 한국비블리아학회지, 16(1), 91-112.',
   m:{AUT:'이현실, 최상기',TIT:'대학생의 정보활용능력 인식도에 관한 연구',JOU:'한국비블리아학회지',DAT:'2005',VOL:'16(1), 91-112'},
   conf:0.68,note:'CK 텀즈 또는 웹에서 확인 불가'},

  {id:21,v:'unconfirmed',t:'paper',tl:'논문',
   c:'유재옥 (2004). 학술연구정보 이용자에 관한 연구: 정보요구, 정보이용행태, 정보활용능력을 중심으로. 한국비블리아학회지, 15(2), 241-254.',
   m:{AUT:'유재옥',TIT:'학술도서관 이용자의 정보활용능력',JOU:'한국비블리아학회지',DAT:'2004',VOL:'15(2), 241-254'},
   conf:0.61,note:'CK 텀즈 또는 웹에서 확인 불가'},

  {id:22,v:'unconfirmed',t:'paper',tl:'논문',
   c:'이지영 (2020). 토픽모델링 분석을 활용한 학술지 [리터러시연구] 연구 동향 분석. 리터러시연구, 11(6), 537-565.',
   m:{AUT:'이지영',TIT:'토픽모델링 분석을 활용한 리터러시 연구 동향 분석',JOU:'리터러시연구',DAT:'2020',VOL:'11(6), 537-565'},
   conf:0.75,note:'CK 텀즈 또는 웹에서 확인 불가'},

  /* ── 학위논문 ── */
  {id:23,v:'confirmed',t:'thesis',tl:'논문',
   c:'송경진 (2014). 공공도서관에서의 리터러시 가치 인식과 영향요인에 관한 연구. 박사학위논문, 이화여자대학교 대학원 문헌정보학과.',
   m:{AUT:'송경진',TIT:'공공도서관에서의 리터러시 가치 인식과 영향요인에 관한 연구',PUB:'이화여자대학교',DAT:'2014'},conf:0.91,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:24,v:'unconfirmed',t:'thesis',tl:'논문',
   c:'주예린 (2019). 공공도서관 50+ 금융 리터러시 프로그램 개발에 관한 연구. 석사학위논문, 이화여자대학교 대학원 문헌정보학과.',
   m:{AUT:'주예린',TIT:'공공도서관 50+ 금융 리터러시 프로그램 개발에 관한 연구',PUB:'이화여자대학교',DAT:'2019'},conf:0.15,note:'CK 텀즈 또는 웹에서 확인 불가'},

  /* ── 보고서 ── */
  {id:25,v:'confirmed',t:'report',tl:'보고서',
   c:'한정선, 오정숙, 임현정, 전주성, 이수나, 고범석 (2006). 지식 정보 역량 개발 지원을 위한 디지털 리터러시 지수 개발 연구(한국교육학술정보원 연구보고 CR 2006-13), 한국교육학술정보원.',
   m:{AUT:'한정선, 오정숙, 임현정, 전주성, 이수나, 고범석',TIT:'지식 정보 역량 개발 지원을 위한 디지털 리터러시 지수 개발 연구',ORG:'한국교육학술정보원',DAT:'2006'},conf:0.92,
   fc:{제목:'match',저자:'check',발행처:'match',발행연도:'match'}},

  /* ── 미확인 ── */
  {id:26,v:'unconfirmed',t:'paper',tl:'논문',
   c:'정현선 (2002). 성찰적 문화교육으로서의 미디어 리터러시 교육. 국어교육학연구, 14, 387-408.',
   m:{AUT:'정현선',TIT:'성찰적 문화교육으로서의 미디어 리터러시 교육',JOU:'국어교육학연구',DAT:'2002',VOL:'14, 387-408'},conf:0.12,note:'CK 텀즈 또는 웹에서 확인 불가'},

  {id:27,v:'unconfirmed',t:'paper',tl:'논문',
   c:'이병기 (2006). 정보활동 중심의 도서관활용수업 모형에 관한 연구. 한국도서관·정보학회지, 37(2), 25-46.',
   m:{AUT:'이병기',TIT:'정보활동 중심의 도서관활용수업 모형에 관한 연구',JOU:'한국도서관·정보학회지',DAT:'2006',VOL:'37(2), 25-46'},conf:0.08,note:'CK 텀즈 또는 웹에서 확인 불가'},

  {id:28,v:'unconfirmed',t:'paper',tl:'논문',
   c:'이정연 (2007). 학교도서관과 정보활용교육의 효용성에 관한 연구. 한국도서관·정보학회지, 38(4), 67-85.',
   m:{AUT:'이정연',TIT:'학교도서관과 정보활용교육의 효용성에 관한 연구',JOU:'한국도서관·정보학회지',DAT:'2007',VOL:'38(4), 67-85'},conf:0.10,note:'CK 텀즈 또는 웹에서 확인 불가'},

  /* ── 외부 링크 확인 (source: online) ── */
  {id:29,v:'confirmed',src:'online',t:'webpage',tl:'웹페이지',
   c:'국립중앙도서관 (2022.5.17.). 국립중앙도서관에서 디지털 기본소양을 충전하세요!. 출처: https://www.nl.go.kr/NL/contents/N50603000000.do?schM=view&id=38314&schBcid=normal0302',
   m:{TIT:'국립중앙도서관에서 디지털 기본소양을 충전하세요!',PUB:'국립중앙도서관',DAT:'2022-05-17'},
   url:'https://www.nl.go.kr/NL/contents/N50603000000.do?schM=view&id=38314&schBcid=normal0302',conf:0.95,
   fc:{제목:'match',저자:'check',발행처:'match',발행연도:'match'}},

  {id:30,v:'confirmed',src:'online',t:'paper',tl:'논문',
   c:'American Library Association (1989). Presidential Committee on Information Literacy: Final Report. Chicago: American Library Association.',
   m:{AUT:'American Library Association',TIT:'Presidential Committee on Information Literacy: Final Report',PUB:'American Library Association',DAT:'1989'},
   url:'https://www.ala.org/acrl/publications/whitepapers/presidential',conf:0.93,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:31,v:'confirmed',src:'online',t:'paper',tl:'논문',
   c:'Cassidy, J., Dee Garrett, S., & Barrera, E. S. (2006). What\'s hot in adolescent literacy 1997-2006. Journal of Adolescent & Adult Literacy, 50(1), 30-36.',
   m:{AUT:'Cassidy, J., Dee Garrett, S., Barrera, E. S.',TIT:"What's hot in adolescent literacy 1997-2006",JOU:'Journal of Adolescent & Adult Literacy',DAT:'2006',VOL:'50(1), 30-36'},
   url:'https://doi.org/10.1598/JAAL.50.1.4',conf:0.91,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:32,v:'unconfirmed',src:'online',t:'paper',tl:'논문',
   c:'Correia, A. M. R. (2002). Information literacy for an active and effective citizenship. White Paper prepared for UNESCO, the US National Commission on Libraries and Information Science, and the National Forum on Information Literacy.',
   m:{AUT:'Correia, A. M. R.',TIT:'Information literacy for an active and effective citizenship',PUB:'UNESCO',DAT:'2002'},
   url:'https://www.unesco.org/webworld/infolit',conf:0,note:'CK 텀즈 또는 웹에서 확인 불가'},

  {id:33,v:'confirmed',src:'online',t:'paper',tl:'논문',
   c:'Sukhija, N., Tatineni, M., Brown, N., Moer, M. V., Rodriguez, P., & Callicott, S. (2016). Topic modeling and visualization for big data in social sciences. 2016 IEEE Conferences, 1198-1205.',
   m:{AUT:'Sukhija, N., Tatineni, M., Brown, N., Moer, M. V., Rodriguez, P., Callicott, S.',TIT:'Topic modeling and visualization for big data in social sciences',JOU:'2016 IEEE Conferences',DAT:'2016',VOL:'1198-1205'},
   url:'https://doi.org/10.1109/BigDataCongress.2016.184',conf:0.89,
   fc:{제목:'match',저자:'check',발행처:'check',발행연도:'match'}},

  {id:34,v:'confirmed',src:'online',t:'paper',tl:'논문',
   c:'American Library Association Digital Literacy Task Force (2013). Digital Literacy, Libraries, and Public Policy.',
   m:{AUT:'ALA Digital Literacy Task Force',TIT:'Digital Literacy, Libraries, and Public Policy',PUB:'American Library Association',DAT:'2013'},
   url:'https://www.ala.org/advocacy/intfreedom/digitalliteracy',conf:0.90,
   fc:{제목:'match',저자:'check',발행처:'match',발행연도:'match'}},

  {id:35,v:'confirmed',t:'paper',tl:'논문',
   c:'조은누리, 장태우 (2020). 특허 분석을 통한 스마트공장 관점의 5G 기술개발 동향 연구. 한국전자거래학회지, 25(3), 95-108. https://doi.org/10.7838/jsebs.2020.25.3.095',
   m:{AUT:'조은누리, 장태우',TIT:'특허 분석을 통한 스마트공장 관점의 5G 기술개발 동향 연구',JOU:'한국전자거래학회지',DAT:'2020',VOL:'25(3), 95-108'},conf:0.94,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:36,v:'confirmed',t:'paper',tl:'논문',
   c:'신주은, 김성희 (2021). 국내 오픈액세스 분야의 지적구조 분석에 관한 연구. 한국문헌정보학회지, 55, 147-178. https://doi.org/10.4275/KSLIS.2021.55.2.147',
   m:{AUT:'신주은, 김성희',TIT:'국내 오픈액세스 분야의 지적구조 분석에 관한 연구',JOU:'한국문헌정보학회지',DAT:'2021',VOL:'55, 147-178'},conf:0.95,
   fc:{제목:'match',저자:'match',발행처:'match',발행연도:'match'}},

  {id:37,v:'confirmed',t:'paper',tl:'논문',
   c:'정혜영, 정혜영, 손유진 (2015). 키워드 네트워크 분석을 통한 유아교사 연구동향 분석. 생태유아교육연구, 14(2), 283-308.',
   m:{AUT:'정혜영, 정혜영, 손유진',TIT:'키워드 네트워크 분석을 통한 유아교사 연구동향 분석',JOU:'생태유아교육연구',DAT:'2015',VOL:'14(2), 283-308'},conf:0.93,
   fc:{제목:'match',저자:'match',발행처:'check',발행연도:'match'}},
];

export const VL = { confirmed: '유효', unconfirmed: '미확인' };
export const VC = { confirmed: 'exact', unconfirmed: 'mismatch' };
