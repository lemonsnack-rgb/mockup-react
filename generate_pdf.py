"""
진위성 검증 결과 PDF 목업 생성
원본 출처검사 PDF 디자인 + 웹 목업 UI 재현
"""
import math, shutil, os
from fpdf import FPDF

FONT_BOLD   = 'C:/tmp/fonts/NotoSansKR-Bold.ttf'
FONT_MEDIUM = 'C:/tmp/fonts/NotoSansKR-Medium.ttf'
LOGO_IMG    = 'C:/project/03_출처검사/mockup-react/logo.png'
WM_IMG      = 'C:/project/03_출처검사/mockup-react/watermark.png'

# ── 원본 PDF 추출 색상 ──
C_TEXT      = (46, 46, 46)
C_TEXT_MID  = (74, 75, 75)
C_TEXT_GRAY = (151, 151, 151)
C_LINK      = (0, 0, 238)
C_LINE      = (146, 205, 255)
C_TBL_FRAME = (225, 226, 227)
C_LABEL_BG  = (234, 246, 255)
C_HL_BG     = (198, 229, 255)

# 웹 UI 색상
C_EXACT     = (22, 163, 74)     # 유효 — green
C_MISMATCH  = (220, 38, 38)    # 미확인 — red
C_REGISTERED= (234, 146, 0)    # 이용자 등록 — orange
C_GRAY600   = (88, 97, 106)
C_GRAY500   = (106, 114, 130)
C_GRAY400   = (154, 158, 164)
C_GRAY100   = (230, 232, 234)
C_GRAY50    = (244, 245, 246)
C_DANGER_BG = (254, 242, 242)
C_DANGER_BD = (252, 165, 165)
C_PILL_OK_BG= (220, 252, 231)
C_PILL_OK_FG= (21, 128, 61)
C_PILL_CHK_BG=(240, 242, 245)
C_PILL_CHK_FG=(154, 158, 164)

# 레이아웃
ML = 28.5
MR = 566.2
CW = MR - ML
HDR_Y = 38.0
FTR_Y = 808.5
FTR_TXT_Y = 825.9
TBL_X = 54.8
TBL_W = 485.2
LBL_W = 96.6

# ── 데이터 ──
INFO = dict(userId='iwang@muhayu.com', checkNo='4427', org='무하유',
    docName='문헌정보학 분야의 리터러시 연구 동향 분석.docx',
    userName='왕일', completedAt='2023-10-18', issuedAt='2026-04-13')

REFS = [
    (1,'유효','논문','김도헌 (2020). 국내 미디어·디지털·정보·ICT 리터러시의 연구동향 분석. 교육문화연구, 26(3), 93-119.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (2,'유효','논문','김수정 (2015). 문헌정보학 분야 정보활용교육에 관한 연구 동향. 한국비블리아학회지, 26(3), 207-239.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (3,'유효','논문','김영환, 김우경, 박지숙 (2021). 키워드 네트워크 분석을 활용한 디지털리터러시 연구 동향분석. 리터러시연구, 12(4), 93-125.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (4,'유효','논문','김효선 (2021). 기업 아카이브에 관한 연구 동향 분석. 한국기록관리학회지, 21(3), 163-186.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (5,'유효','논문','남영준 (2007). 정보취약계층을 위한 도서관 서비스 활성화 방안에 관한 연구. 한국문헌정보학회지, 41(4), 49-68.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (6,'유효','논문','노영희 (2012). 공공도서관 이용자의 소비자건강정보(CHI) 리터러시 향상을 위한 교육프로그램 개발. 한국비블리아학회지, 23(4), 391-414.',['제목 일치','저자 확인 필요','발행처 일치','발행연도 확인 필요']),
    (7,'유효','논문','박연경, 이용정 (2021). 코로나 시대의 온라인 도서관 이용교육이 정보활용능력에 미치는 영향. 한국도서관·정보학회지, 52(3), 267-285.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (8,'유효','논문','박주현 (2020). 미디어정보 리터러시 역량과 교육내용 분석을 통한 교육과정 개발 방향 탐구. 정보관리학회지, 37(2), 119-144.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (9,'유효','논문','박주현, 강봉숙, 이병기 (2021). 정보활용교육을 위한 교과 내용 체계 개발 연구. 한국도서관·정보학회지, 52(1), 229-254.',['제목 일치','저자 확인 필요','발행처 일치','발행연도 일치']),
    (10,'유효','논문','박준형, 류법모, 오효정 (2018). 시계열 기반 국내 기록관리학 토픽 트렌드 분석. 한국기록관리학회지, 18(1), 29-47.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (11,'유효','논문','배경재, 박희진 (2013). 디지털 정보활용교육 운영실태 및 개선방안 연구. 한국도서관·정보학회지, 44(2), 241-265.',['제목 일치','저자 일치','발행처 확인 필요','발행연도 확인 필요']),
    (12,'유효','논문','안정임, 서윤경, 김성미 (2017). 국내 미디어 리터러시 연구 동향 분석. 한국방송학보, 31(5), 5-49.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (13,'유효','논문','이수상 (2014). 언어 네트워크 분석 방법을 활용한 학술논문의 내용분석. 정보관리학회지, 31(4), 49-68.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (14,'유효','논문','이정미 (2022). 포스트 팬데믹 시대 데이터 리터러시의 사회적 함의와 도서관 서비스 방향에 대한 연구. 한국문헌정보학회지, 56(1), 365-386.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (15,'유효','논문','정영미 (2018). 미국 공공도서관의 성인을 위한 디지털 리터러시 교육에 관한 연구. 한국문헌정보학회지, 52(1), 359-380.',['제목 일치','저자 확인 필요','발행처 일치','발행연도 일치']),
    (16,'유효','논문','이창봉, 윤영, 한승규 (2021). 토픽모델링과 네트워크 분석을 활용한 리터러시 연구의 동향. 리터러시연구, 12(6), 121-163.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (17,'유효','논문','정현선 (2004). 리터러시와 국어교육; 디지털 리터러시의 국어교육적 고찰. 국어교육학연구, 21, 5-42.',['제목 일치','저자 일치','발행처 확인 필요','발행연도 일치']),
    (18,'유효','논문','정현선 외 (2016). 핵심역량 중심의 미디어 리터러시 교육 내용 체계화 연구. 학습자중심교과교육연구, 16(11), 211-238.',['제목 일치','저자 확인 필요','발행처 일치','발행연도 일치']),
    (19,'미확인','논문','이성신, 강보라, 이세나 (2021). 정보격차 연구 동향 분석. 한국도서관·정보학회지, 50(3), 139-166.',[]),
    (20,'미확인','논문','이현실, 최상기 (2005). 우리나라 대학생들의 정보활용능력 인식도에 관한 연구. 한국비블리아학회지, 16(1), 91-112.',[]),
    (21,'미확인','논문','유재옥 (2004). 학술연구정보 이용자에 관한 연구. 한국비블리아학회지, 15(2), 241-254.',[]),
    (22,'미확인','논문','이지영 (2020). 토픽모델링 분석을 활용한 학술지 [리터러시연구] 연구 동향 분석. 리터러시연구, 11(6), 537-565.',[]),
    (23,'유효','논문','송경진 (2014). 공공도서관에서의 리터러시 가치 인식과 영향요인에 관한 연구. 박사학위논문, 이화여자대학교.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (24,'미확인','논문','주예린 (2019). 공공도서관 50+ 금융 리터러시 프로그램 개발에 관한 연구. 석사학위논문, 이화여자대학교.',[]),
    (25,'유효','보고서','한정선 외 (2006). 디지털 리터러시 지수 개발 연구. 한국교육학술정보원.',['제목 일치','저자 확인 필요','발행처 일치','발행연도 일치']),
    (26,'미확인','논문','정현선 (2002). 성찰적 문화교육으로서의 미디어 리터러시 교육. 국어교육학연구, 14, 387-408.',[]),
    (27,'미확인','논문','이병기 (2006). 정보활동 중심의 도서관활용수업 모형에 관한 연구. 한국도서관·정보학회지, 37(2), 25-46.',[]),
    (28,'미확인','논문','이정연 (2007). 학교도서관과 정보활용교육의 효용성에 관한 연구. 한국도서관·정보학회지, 38(4), 67-85.',[]),
    (29,'유효','웹페이지','국립중앙도서관 (2022). 국립중앙도서관에서 디지털 기본소양을 충전하세요!',['제목 일치','저자 확인 필요','발행처 일치','발행연도 일치']),
    (30,'유효','논문','American Library Association (1989). Presidential Committee on Information Literacy: Final Report.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (31,'유효','논문',"Cassidy, J. et al. (2006). What's hot in adolescent literacy 1997-2006. JAAL, 50(1), 30-36.",['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (32,'미확인','논문','Correia, A. M. R. (2002). Information literacy for an active and effective citizenship. UNESCO.',[]),
    (33,'유효','논문','Sukhija, N. et al. (2016). Topic modeling and visualization for big data. IEEE Conferences, 1198-1205.',['제목 일치','저자 확인 필요','발행처 확인 필요','발행연도 일치']),
    (34,'유효','논문','ALA Digital Literacy Task Force (2013). Digital Literacy, Libraries, and Public Policy.',['제목 일치','저자 확인 필요','발행처 일치','발행연도 일치']),
    (35,'유효','논문','조은누리, 장태우 (2020). 특허 분석을 통한 스마트공장 관점의 5G 기술개발 동향 연구. 한국전자거래학회지, 25(3), 95-108.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (36,'유효','논문','신주은, 김성희 (2021). 국내 오픈액세스 분야의 지적구조 분석에 관한 연구. 한국문헌정보학회지, 55, 147-178.',['제목 일치','저자 일치','발행처 일치','발행연도 일치']),
    (37,'유효','논문','정혜영, 정혜영, 손유진 (2015). 키워드 네트워크 분석을 통한 유아교사 연구동향 분석. 생태유아교육연구, 14(2), 283-308.',['제목 일치','저자 일치','발행처 확인 필요','발행연도 일치']),
]
TOTAL = len(REFS)
UNCONFIRMED = sum(1 for r in REFS if r[1] == '미확인')
CONFIRMED = TOTAL - UNCONFIRMED

# 유형별 카운트
TYPE_COUNTS = {}
for r in REFS:
    t = r[2]
    TYPE_COUNTS[t] = TYPE_COUNTS.get(t, 0) + 1


class PDF(FPDF):
    def __init__(self):
        super().__init__('P', 'pt', 'A4')
        self.add_font('B', '', FONT_BOLD)
        self.add_font('M', '', FONT_MEDIUM)
        self.set_auto_page_break(auto=False)
        self.total_pages = 4

    def header(self):
        self.image(LOGO_IMG, ML, 17, 100, 14.4)
        self.set_font('M', '', 8.4)
        self.set_text_color(*C_TEXT_MID)
        t1 = '참고문헌 진위성 검증'
        self.set_xy(MR - self.get_string_width(t1 + '  |  campus.copykiller.com'), 20)
        self.cell(text=t1)
        self.set_text_color(*C_TEXT_GRAY)
        self.cell(text='  |  ')
        self.set_text_color(*C_LINK)
        self.cell(text='campus.copykiller.com')
        self.set_fill_color(*C_LINE)
        self.rect(ML, HDR_Y, CW, 0.6, 'F')

    def footer(self):
        self.set_fill_color(*C_LINE)
        self.rect(ML, FTR_Y, CW, 0.6, 'F')
        self.set_font('M', '', 8.4)
        self.set_text_color(*C_TEXT_MID)
        self.set_xy(ML, FTR_TXT_Y - 10)
        self.cell(h=10, text='Copyright \u00a9 MUHAYU Inc. All rights reserved. Since 2011')
        pn, tp = str(self.page_no()), str(self.total_pages)
        self.set_xy(MR - self.get_string_width(f'{pn}  /  {tp}'), FTR_TXT_Y - 10)
        self.cell(h=10, text=f'{pn}  /  {tp}')

    def sec_title(self, text, y=None):
        if y: self.set_y(y)
        _y = self.get_y()
        self.set_fill_color(*C_LINE)
        self.rect(ML, _y, 3, 13, 'F')
        self.set_font('B', '', 10.5)
        self.set_text_color(*C_TEXT)
        self.set_xy(ML + 5, _y)
        self.cell(h=13, text=text)
        self.set_y(_y + 20)

    def _lbl(self, x, y, w, h, t):
        self.set_fill_color(*C_LABEL_BG)
        self.rect(x, y, w, h, 'F')
        self.set_font('B', '', 8.4)
        self.set_text_color(*C_TEXT)
        self.set_xy(x, y)
        self.cell(w=w, h=h, text=t, align='C')

    def _val(self, x, y, w, h, t, c=None):
        self.set_font('M', '', 8.4)
        self.set_text_color(*(c or C_TEXT))
        self.set_xy(x + 8, y)
        self.cell(w=w - 16, h=h, text=t)

    def status_icon(self, x, y, status):
        """상태 원형 아이콘 + 레이블 (웹 UI 스타일)"""
        r = 8  # 원 반지름
        if status == '유효':
            color = C_EXACT
            # 체크마크
            self.set_fill_color(*color)
            self.ellipse(x, y, r*2, r*2, 'F')
            self.set_draw_color(255, 255, 255)
            self.set_line_width(1.5)
            self.line(x+4.5, y+8, x+7.5, y+11)
            self.line(x+7.5, y+11, x+12, y+6)
        elif status == '미확인':
            color = C_MISMATCH
            # X 마크
            self.set_fill_color(*color)
            self.ellipse(x, y, r*2, r*2, 'F')
            self.set_draw_color(255, 255, 255)
            self.set_line_width(1.5)
            self.line(x+5, y+5, x+11, y+11)
            self.line(x+11, y+5, x+5, y+11)
        else:  # 이용자 등록
            color = C_REGISTERED
            self.set_fill_color(*color)
            self.ellipse(x, y, r*2, r*2, 'F')
            self.set_draw_color(255, 255, 255)
            self.set_line_width(1.5)
            self.line(x+5, y+8, x+11, y+8)

        # 레이블
        self.set_font('B', '', 7.5)
        self.set_text_color(*color)
        sw = self.get_string_width(status)
        self.set_xy(x + r - sw/2, y + r*2 + 2)
        self.cell(text=status)
        self.set_line_width(0.5)

    def needs_break(self, h):
        return self.get_y() + h > FTR_Y - 15


def build():
    pdf = PDF()

    # ══════ PAGE 1: 표지 ══════
    pdf.add_page()
    pdf.image(WM_IMG, ML, HDR_Y + 0.6, CW, FTR_Y - HDR_Y - 0.6)

    pdf.set_font('B', '', 25.2)
    pdf.set_text_color(*C_TEXT_MID)
    pdf.set_xy(ML, 220)
    pdf.cell(w=CW, h=32, text='카피킬러캠퍼스 참고문헌 진위성 검증', align='C')
    pdf.set_xy(ML, 258)
    pdf.cell(w=CW, h=32, text='결과 확인서', align='C')

    # 정보 테이블 — 선만 표시 (회색 배경 없음)
    rh = 25.7
    lx, lw = TBL_X, LBL_W
    vx = lx + lw
    vw = 327.3 - vx
    rlx, rlw = 327.3, LBL_W
    rvx = rlx + rlw
    rvw = TBL_X + TBL_W - rvx
    ty = 450.0
    tbl_r = TBL_X + TBL_W  # 테이블 우측 끝

    def tbl_line(x1, y1, x2, y2):
        pdf.set_draw_color(*C_TBL_FRAME)
        pdf.set_line_width(0.5)
        pdf.line(x1, y1, x2, y2)

    # ── 상단 테이블 (4행) ──
    rows4_h = rh * 4
    hl_h = rh * 2  # 1~2행 병합 높이

    # 외곽선
    pdf.set_draw_color(*C_TBL_FRAME)
    pdf.set_line_width(0.5)
    pdf.rect(TBL_X, ty, TBL_W, rows4_h, 'D')

    # 가로 내부선 — 1~2행 사이는 좌측 절반만 (우측은 병합)
    tbl_line(TBL_X, ty + rh, rlx, ty + rh)          # row1-2 경계: 좌측만
    tbl_line(TBL_X, ty + rh * 2, tbl_r, ty + rh * 2)  # row2-3 경계: 전체
    tbl_line(TBL_X, ty + rh * 3, tbl_r, ty + rh * 3)  # row3-4 경계: 전체

    # 세로: 좌측 레이블|값 구분 — 전체 높이
    tbl_line(vx, ty, vx, ty + rows4_h)
    # 세로: 우측 레이블 시작 — 1~2행은 병합이므로 row3부터
    tbl_line(rlx, ty, rlx, ty + hl_h)               # 병합 좌측 경계
    tbl_line(rlx, ty + hl_h, rlx, ty + rows4_h)     # row3-4
    # 세로: 우측 값 시작 — 병합 영역 건너뜀, row3부터만
    tbl_line(rvx, ty + hl_h, rvx, ty + rows4_h)

    # Row 1: 아이디 | value | 미확인참고문헌수 (2행 병합) | 건수
    y = ty
    pdf._lbl(lx, y, lw, rh, '아이디')
    pdf._val(vx, y, vw, rh, INFO['userId'])
    # 강조 셀 배경
    hl_h = rh * 2
    pdf.set_fill_color(*C_HL_BG)
    pdf.rect(rlx, y, rlw, hl_h, 'F')
    pdf.set_draw_color(*C_TBL_FRAME)
    pdf.rect(rlx, y, rlw, hl_h, 'D')
    pdf.set_font('B', '', 9.5)
    pdf.set_text_color(17, 17, 17)
    pdf.set_xy(rlx, y + hl_h / 2 - 6)
    pdf.set_xy(rlx, y + hl_h / 2 - 12)
    pdf.cell(w=rlw, h=12, text='미확인(허위) 의심', align='C')
    pdf.set_xy(rlx, y + hl_h / 2)
    pdf.cell(w=rlw, h=12, text='참고문헌 수', align='C')
    pdf.set_font('B', '', 9.5)
    pdf.set_text_color(0, 120, 200)
    pdf.set_xy(rvx, y)
    pdf.cell(w=rvw, h=hl_h, text=f'{UNCONFIRMED}건', align='C')

    # Row 2: 소속 | value
    y += rh
    pdf._lbl(lx, y, lw, rh, '소속')
    pdf._val(vx, y, vw, rh, INFO['org'])

    # Row 3: 성명 | value | 검사일자 | value
    y += rh
    pdf._lbl(lx, y, lw, rh, '성명')
    pdf._val(vx, y, vw, rh, INFO['userName'])
    pdf._lbl(rlx, y, rlw, rh, '검사일자')
    pdf._val(rvx, y, rvw, rh, INFO['completedAt'])

    # Row 4: 검사번호 | value | 발급일자 | value
    y += rh
    pdf._lbl(lx, y, lw, rh, '검사번호')
    pdf._val(vx, y, vw, rh, INFO['checkNo'])
    pdf._lbl(rlx, y, rlw, rh, '발급일자')
    pdf._val(rvx, y, rvw, rh, INFO['issuedAt'])

    # ── 문서명 (1행 테이블) ──
    full_vw = tbl_r - vx
    ty2 = ty + rows4_h + 8
    pdf.set_draw_color(*C_TBL_FRAME)
    pdf.rect(TBL_X, ty2, TBL_W, rh, 'D')
    tbl_line(vx, ty2, vx, ty2 + rh)
    pdf._lbl(lx, ty2, lw, rh, '문서명')
    pdf._val(vx, ty2, full_vw, rh, INFO['docName'])

    # ── 검토의견 (1행 테이블) ──
    ty3 = ty2 + rh + 8
    pdf.set_draw_color(*C_TBL_FRAME)
    pdf.rect(TBL_X, ty3, TBL_W, rh, 'D')
    tbl_line(vx, ty3, vx, ty3 + rh)
    pdf._lbl(lx, ty3, lw, rh, '검토의견')
    pdf._val(vx, ty3, full_vw, rh, '')

    # ══════ PAGE 2: 검사결과 요약 + 참고문헌 목록 시작 ══════
    pdf.add_page()
    pdf.sec_title('검사결과 요약', y=55)
    sy = pdf.get_y()

    # ── 요약 카드 (회색 배경 박스) ──
    card_x, card_w = ML, CW
    stat_h = 52   # 통계 영역 높이
    tag_h = 20    # 태그 영역 높이
    card_h = 12 + stat_h + tag_h + 10  # padding 포함
    pdf.set_fill_color(*C_GRAY50)
    pdf.set_draw_color(*C_GRAY100)
    pdf.rect(card_x, sy, card_w, card_h, 'DF')

    # 미확인 (빨간 강조 박스)
    ax = card_x + 14
    ay = sy + 12
    aw, ah = 110, stat_h
    pdf.set_fill_color(*C_DANGER_BG)
    pdf.set_draw_color(*C_DANGER_BD)
    pdf.set_line_width(1.2)
    pdf.rect(ax, ay, aw, ah, 'DF')
    pdf.set_line_width(0.5)
    pdf.set_font('M', '', 7.5)
    pdf.set_text_color(*C_GRAY500)
    pdf.set_xy(ax + 12, ay + 8)
    pdf.cell(text='미확인(허위) 의심 참고문헌 수')
    pdf.set_font('B', '', 24)
    pdf.set_text_color(*C_MISMATCH)
    pdf.set_xy(ax + 12, ay + 24)
    pdf.cell(text=str(UNCONFIRMED))
    pdf.set_font('M', '', 12)
    pdf.cell(text='건')

    # 이용자 등록
    bx = ax + aw + 24
    pdf.set_font('M', '', 7.5)
    pdf.set_text_color(*C_GRAY500)
    pdf.set_xy(bx, ay + 8)
    pdf.cell(text='이용자 등록')
    pdf.set_font('B', '', 24)
    pdf.set_text_color(*C_REGISTERED)
    pdf.set_xy(bx, ay + 24)
    pdf.cell(text='0')
    pdf.set_font('M', '', 12)
    pdf.cell(text='건')

    # 유효
    cx = bx + 80
    pdf.set_font('M', '', 7.5)
    pdf.set_text_color(*C_GRAY500)
    pdf.set_xy(cx, ay + 8)
    pdf.cell(text='유효')
    pdf.set_font('B', '', 24)
    pdf.set_text_color(*C_EXACT)
    pdf.set_xy(cx, ay + 24)
    pdf.cell(text=str(CONFIRMED))
    pdf.set_font('M', '', 12)
    pdf.cell(text='건')

    # 구분선
    dx = cx + 70
    pdf.set_draw_color(*C_GRAY100)
    pdf.line(dx, ay + 8, dx, ay + ah - 8)

    # 전체
    ex = dx + 18
    pdf.set_font('M', '', 7.5)
    pdf.set_text_color(*C_GRAY500)
    pdf.set_xy(ex, ay + 8)
    pdf.cell(text='전체')
    pdf.set_font('B', '', 24)
    pdf.set_text_color(*C_TEXT)
    pdf.set_xy(ex, ay + 24)
    pdf.cell(text=str(TOTAL))
    pdf.set_font('M', '', 12)
    pdf.cell(text='건')

    # 유형 태그 (통계 아래, 카드 하단)
    tag_y = ay + stat_h + 6
    tag_x = ax
    pdf.set_font('B', '', 7)
    for tname, cnt in TYPE_COUNTS.items():
        t = f'{tname} {cnt}건'
        tw = pdf.get_string_width(t) + 14
        pdf.set_fill_color(255, 255, 255)
        pdf.set_draw_color(*C_GRAY100)
        pdf.rect(tag_x, tag_y, tw, 14, 'DF')
        pdf.set_text_color(*C_GRAY600)
        pdf.set_xy(tag_x + 7, tag_y)
        pdf.cell(w=tw - 14, h=14, text=t, align='C')
        tag_x += tw + 5

    sy2 = sy + card_h + 8

    # ── 안내 박스 ──
    pdf.set_fill_color(*C_GRAY50)
    pdf.set_draw_color(*C_GRAY100)
    note_h = 58
    pdf.rect(card_x, sy2, card_w, note_h, 'DF')
    pdf.set_font('B', '', 8)
    pdf.set_text_color(*C_GRAY600)
    pdf.set_xy(card_x + 20, sy2 + 6)
    pdf.cell(text='미확인 참고문헌이란?')
    pdf.set_font('M', '', 7.5)
    pdf.set_text_color(*C_TEXT_MID)
    notes = [
        '검사 문서에 기재된 참고문헌이 카피킬러 100억건 DB에 기반하여 구축된 CK 텀즈, 또는 웹에서 확인되지 않은 것을 의미합니다.',
        '미확인 참고문헌에는 AI가 생성한 참고문헌이 포함되었을 위험이 있습니다.',
        '실제 존재하는 참고문헌이 아직 CK 텀즈에 등록되지 않아 미확인으로 판정된 경우, CK 텀즈에 직접 등록 신청하실 수 있습니다.',
    ]
    ny = sy2 + 20
    for n in notes:
        pdf.set_xy(card_x + 20, ny)
        pdf.cell(text=n)
        ny += 11

    sy3 = sy2 + note_h + 4

    # ── 판정 범례 ──
    legends = [
        ('미확인', C_MISMATCH, ': 참고문헌의 제목을 CK 텀즈 또는 웹에서 찾을 수 없는 것'),
        ('이용자 등록', C_REGISTERED, ': 이용자가 유효한 출처로 판단하여 CK 텀즈에 등록 신청한 것'),
        ('유효', C_EXACT, ': 참고문헌의 제목이 CK 텀즈 또는 웹을 통해 유효한 것으로 확인된 것'),
    ]
    ly = sy3
    for label, color, desc in legends:
        # 색상 점
        pdf.set_fill_color(*color)
        pdf.ellipse(card_x + 10, ly + 3, 5, 5, 'F')
        pdf.set_font('B', '', 7.5)
        pdf.set_text_color(*color)
        pdf.set_xy(card_x + 18, ly)
        pdf.cell(text=label)
        pdf.set_font('M', '', 7.5)
        pdf.set_text_color(*C_GRAY500)
        pdf.cell(text=desc)
        ly += 12

    # ── 참고문헌 목록 ──
    pdf.sec_title('참고문헌 목록', y=ly + 32)
    list_start_y = pdf.get_y()

    CIT_X = ML + 30
    CIT_W = CW - 30 - 75  # 상태 영역 75pt
    STATUS_CX = MR - 37  # 상태 아이콘 중심 x

    def draw_refs_from(start_idx):
        for idx in range(start_idx, len(REFS)):
            no, status, rtype, cit, pills = REFS[idx]

            # 배지 너비 계산
            pdf.set_font('B', '', 6)
            badge_w = pdf.get_string_width(rtype) + 8
            text_w = CIT_W - badge_w - 4  # 배지 뒤 실제 텍스트 폭

            # 실제 텍스트 폭으로 행 높이 계산
            pdf.set_font('M', '', 8.9)
            lines = pdf.multi_cell(w=text_w, h=12, text=cit, dry_run=True, output='LINES')
            n_lines = len(lines)
            pill_h = 13 if pills else 0
            rh = max(32, n_lines * 12 + pill_h + 10)

            if pdf.needs_break(rh):
                pdf.add_page()
                pdf.sec_title('참고문헌 목록 (계속)', y=55)

            y = pdf.get_y()

            # 미확인 행 배경
            if status == '미확인':
                pdf.set_fill_color(255, 251, 235)
                pdf.rect(ML, y, CW, rh, 'F')

            # 하단 구분선
            pdf.set_fill_color(*C_GRAY100)
            pdf.rect(ML, y + rh - 0.5, CW, 0.5, 'F')

            # No
            pdf.set_font('M', '', 8.9)
            pdf.set_text_color(*C_GRAY500)
            ns = str(no)
            nw = pdf.get_string_width(ns)
            pdf.set_xy(ML + 8 + (14 - nw) / 2, y + 5)
            pdf.cell(text=ns)

            # 유형 배지
            pdf.set_font('B', '', 6)
            if rtype in ('논문',):
                badge_bg, badge_fg = (239, 250, 255), (0, 151, 212)
            elif rtype == '보고서':
                badge_bg, badge_fg = (237, 233, 254), (109, 40, 217)
            elif rtype == '웹페이지':
                badge_bg, badge_fg = (240, 253, 244), (21, 128, 61)
            else:
                badge_bg, badge_fg = C_GRAY50, C_GRAY500
            pdf.set_fill_color(*badge_bg)
            pdf.set_text_color(*badge_fg)
            pdf.set_xy(CIT_X, y + 5)
            pdf.cell(w=badge_w, h=10, text=rtype, align='C', fill=True)

            # 인용문 (배지 뒤 정확한 폭으로)
            pdf.set_font('M', '', 8.9)
            pdf.set_text_color(*C_TEXT)
            pdf.set_xy(CIT_X + badge_w + 4, y + 5)
            pdf.multi_cell(w=text_w, h=12, text=cit)

            # 필드 매치 필
            if pills:
                py = pdf.get_y() + 1
                px = CIT_X
                pdf.set_font('M', '', 6)
                for pill in pills:
                    if '확인 필요' in pill:
                        bg, fg = C_PILL_CHK_BG, C_PILL_CHK_FG
                    else:
                        bg, fg = C_PILL_OK_BG, C_PILL_OK_FG
                    pw = pdf.get_string_width(pill) + 10
                    pdf.set_fill_color(*bg)
                    pdf.set_text_color(*fg)
                    pdf.set_xy(px, py)
                    pdf.cell(w=pw, h=9, text=pill, align='C', fill=True)
                    px += pw + 3

            # 상태 아이콘 + 레이블 (행 세로 중앙)
            icon_x = STATUS_CX - 8
            icon_y = y + (rh - 26) / 2  # 아이콘(16)+레이블(10) ≈ 26
            pdf.status_icon(icon_x, icon_y, status)

            pdf.set_y(y + rh)

        return len(REFS)

    draw_refs_from(0)

    # 전체 페이지 수 업데이트
    pdf.total_pages = pdf.page_no()

    out = 'C:/project/03_출처검사/mockup-react/public/validity-report-mockup.pdf'
    pdf.output(out)
    shutil.copy(out, 'C:/project/03_출처검사/mockup-react/src/assets/validity-report-mockup.pdf')
    print(f'Generated {pdf.total_pages} pages')


if __name__ == '__main__':
    build()
