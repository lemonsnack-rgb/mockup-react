# 출처검사 목업 타이포그래피 가이드라인

> 기준: campus.copykiller.com 실측값 + @muhayu/ck-ui foundation.css 토큰

## 폰트

- **패밀리**: `var(--font-sans)` → Pretendard, sans-serif
- **기본 크기**: 16px (`--text-body-medium`)

## 타이포그래피 스케일

| 용도 | 크기 | 가중치 | foundation 토큰 | 캠퍼스 실측 |
|------|------|--------|----------------|-----------|
| **페이지 타이틀** | 32px | 700 (bold) | `--text-heading-large` + `--font-weight-bold` | 32px/700 |
| **섹션 타이틀** | 16px | 700 (bold) | `--text-body-medium` + `--font-weight-bold` | 16px/700 |
| **본문 (테이블셀, 리스트)** | 16px | 400 (normal) | `--text-body-medium` + `--font-weight-normal` | 16px/400 |
| **본문 강조** | 16px | 600 (semibold) | `--text-body-medium` + `--font-weight-semibold` | 16px/600 |
| **필터/입력/셀렉트** | 14px | 400 (normal) | `--text-body-small` + `--font-weight-normal` | 14px/400 |
| **버튼** | 14px | 700 (bold) | `--text-body-small` + `--font-weight-bold` | 14px/700 |
| **테이블 헤더** | 14px | 700 (bold) | `--text-body-small` + `--font-weight-bold` | 14px/700 |
| **뱃지/태그** | 14px | 600 (semibold) | `--text-body-small` + `--font-weight-semibold` | 14px/600 |
| **보조 텍스트 (캡션)** | 12px | 400 (normal) | `--text-body-xsmall` + `--font-weight-normal` | - |
| **네비게이션 메뉴** | 16px | 400→600 (active) | `--text-body-medium` | 16px/400~600 |
| **서브 메뉴** | 14px | 400 (normal) | `--text-body-small` + `--font-weight-normal` | 14px/400 |

## 라인 하이트

| 용도 | 값 | 토큰 |
|------|-----|------|
| 타이틀/헤딩 | 1.25 (=40px @32px) | `--leading-tight` 근사 |
| 본문 | 1.5 | `--leading-relaxed` |
| 캡션/보조 | 1.7 | `--leading-high` |

## 색상

| 용도 | 토큰 | 값 |
|------|------|-----|
| 기본 텍스트 | `--color-gray-800` | #3e4448 |
| 보조 텍스트 | `--color-gray-600` | #58616a |
| 비활성/힌트 | `--color-gray-500` | #6a7282 |
| 위험/에러 | `--color-danger-500` | #ef4444 |
| 성공 | `--color-success-700` | #0078ab |
| 프라이머리 | `--color-primary-500` | #00c2ff |

## 높이 기준

| 요소 | 높이 | 비고 |
|------|------|------|
| 필터 셀렉트/입력 | 32px | 캠퍼스 실측 32px (내부 font 14px) |
| 인라인 버튼 (조회, 결과확인) | 32px | |
| 주요 버튼 (업로드, 검사하기) | 40px | |
| 테이블 셀 패딩 | 14px 상하 | |

## 적용 원칙

1. **하드코딩 금지**: `font-size: 14px` 대신 `font-size: var(--text-body-small, .875rem)` 사용
2. **최소 폰트 크기**: 12px (`--text-body-xsmall`) 이하 사용 금지
3. **테이블 헤더는 14px**: 기존 13px/12px → **14px bold**로 통일 (캠퍼스 기준)
4. **날짜 컬럼**: 테이블 날짜 컬럼은 14px 사용, 컬럼 폭 최소 120px 확보하여 한 줄 표시
5. **뱃지 최소 폰트**: 14px semibold (기존 13px → 14px로 상향)
