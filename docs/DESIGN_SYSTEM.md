# DESIGN SYSTEM

Astra HR 웹사이트의 디자인 토큰/컴포넌트/모션 규칙 문서입니다.
목표는 "레이아웃 안정성 유지 + 점진적 일관성 강화"입니다.

## 1) Source of Truth
- 토큰: `styles/tokens.css`
- 전역 스타일/애니메이션: `app/globals.css`
- Tailwind 설정: `tailwind.config.ts`

## 2) 토큰 체계

### 2.0 현재 토큰 값 (2026-02-22 기준)
아래 값은 `styles/tokens.css`에 정의된 현재 실값입니다.

#### Core / Brand (원본)
- `--astra-bg`: `#020617`
- `--astra-surface`: `#0b1220`
- `--astra-blue-500`: `#2563eb`
- `--astra-blue-400`: `#3b82f6`
- `--astra-blue-300`: `#60a5fa`
- `--astra-mint-300`: `#5eead4`
- `--astra-text`: `#f8fafc`
- `--astra-text-muted`: `#94a3b8`

#### DS Color (실사용)
- `--ds-bg-base`: `#0a0d14`
- `--ds-bg-surface`: `#111827`
- `--ds-bg-surface-2`: `#1a2233`
- `--ds-text-primary`: `#f8fafc`
- `--ds-text-secondary`: `#94a3b8`
- `--ds-text-muted`: `#64748b`
- `--ds-brand-primary`: `#3b82f6` (`--astra-blue-400` 참조)
- `--ds-brand-primary-strong`: `#2563eb` (`--astra-blue-500` 참조)
- `--ds-brand-primary-soft`: `#60a5fa` (`--astra-blue-300` 참조)
- `--ds-brand-mint`: `#5eead4` (`--astra-mint-300` 참조)
- `--ds-border-subtle`: `rgba(148, 163, 184, 0.2)`
- `--ds-border-strong`: `rgba(96, 165, 250, 0.55)`
- `--ds-glow-brand-sm`: `0 0 12px rgba(59, 130, 246, 0.28)`
- `--ds-glow-brand-md`: `0 0 24px rgba(59, 130, 246, 0.36)`

#### DS Motion
- `--ds-motion-fast`: `160ms`
- `--ds-motion-base`: `280ms`
- `--ds-motion-slow`: `520ms`
- `--ds-ease-standard`: `cubic-bezier(0.22, 0.61, 0.36, 1)`

#### Runtime Motion (숫자 ms)
- `--ds-motion-page-transition-ms`: `380`
- `--ds-motion-carousel-step-ms`: `620`
- `--ds-motion-timeline-detail-ms`: `280`

#### Cases Constants
- `--ds-cases-card-size`: `336px`
- `--ds-cases-card-gap`: `24px`
- `--ds-cases-side-fade-width`: `80px`
- `--ds-cases-timeline-mask-width`: `60px`
- `--ds-cases-timeline-mask-height`: `128px`
- `--ds-cases-timeline-line-top`: `74px`
- `--ds-cases-timeline-col-sm`: `168px`
- `--ds-cases-timeline-col-md`: `176px`
- `--ds-cases-timeline-col-lg`: `184px`
- `--ds-cases-wheel-threshold`: `5`
- `--ds-cases-wheel-gesture-reset-ms`: `140`

#### Hero Typography
- `--ds-hero-title-leading`: `1.14`

#### Spacing / Radius / Type
- Spacing: `--ds-space-1=4px`, `--ds-space-2=8px`, `--ds-space-3=12px`, `--ds-space-4=16px`, `--ds-space-6=24px`, `--ds-space-8=32px`, `--ds-space-12=48px`, `--ds-space-16=64px`
- Radius: `--ds-radius-sm=8px`, `--ds-radius-md=12px`, `--ds-radius-lg=16px`, `--ds-radius-xl=24px`
- Type:
  - `--ds-font-display-size=48px`, `--ds-font-display-line=56px`
  - `--ds-font-h1-size=40px`, `--ds-font-h1-line=48px`
  - `--ds-font-h2-size=32px`, `--ds-font-h2-line=40px`
  - `--ds-font-h3-size=24px`, `--ds-font-h3-line=32px`
  - `--ds-font-body-lg-size=18px`, `--ds-font-body-lg-line=28px`
  - `--ds-font-body-size=16px`, `--ds-font-body-line=26px`
  - `--ds-font-caption-size=12px`, `--ds-font-caption-line=18px`

### 2.1 Color Tokens
- 배경
  - `--ds-bg-base`
  - `--ds-bg-surface`
  - `--ds-bg-surface-2`
- 텍스트
  - `--ds-text-primary`
  - `--ds-text-secondary`
  - `--ds-text-muted`
- 브랜드
  - `--ds-brand-primary`
  - `--ds-brand-primary-strong`
  - `--ds-brand-primary-soft`
  - `--ds-brand-mint`
- 보더/글로우
  - `--ds-border-subtle`
  - `--ds-border-strong`
  - `--ds-glow-brand-sm`
  - `--ds-glow-brand-md`

### 2.2 Motion Tokens
- 공통 속도
  - `--ds-motion-fast` / `--ds-motion-base` / `--ds-motion-slow`
- 공통 이징
  - `--ds-ease-standard`
- 런타임(ms)
  - `--ds-motion-page-transition-ms`
  - `--ds-motion-carousel-step-ms`
  - `--ds-motion-timeline-detail-ms`

### 2.3 Spacing / Radius / Typography
- 간격: `--ds-space-1` ~ `--ds-space-16`
- 라운드: `--ds-radius-sm` ~ `--ds-radius-xl`
- 타이포 스케일:
  - `--ds-font-display-*`
  - `--ds-font-h1-*`, `--ds-font-h2-*`, `--ds-font-h3-*`
  - `--ds-font-body-lg-*`, `--ds-font-body-*`, `--ds-font-caption-*`

### 2.4 Cases 전용 토큰
- 카드/간격
  - `--ds-cases-card-size`
  - `--ds-cases-card-gap`
- 페이드/마스크
  - `--ds-cases-side-fade-width`
  - `--ds-cases-timeline-mask-width`
  - `--ds-cases-timeline-mask-height`
- 타임라인 배치
  - `--ds-cases-timeline-line-top`
  - `--ds-cases-timeline-col-sm`
  - `--ds-cases-timeline-col-md`
  - `--ds-cases-timeline-col-lg`
- 휠 제어
  - `--ds-cases-wheel-threshold`
  - `--ds-cases-wheel-gesture-reset-ms`

## 3) Utility Class 계층

### 3.1 Semantic Utility
- 텍스트/색상
  - `.text-ds-primary`, `.text-ds-secondary`, `.text-ds-muted`
- 보더/그림자
  - `.border-ds-subtle`, `.border-ds-strong`
  - `.shadow-ds-brand-sm`, `.shadow-ds-brand-md`
- 버튼/카드
  - `.btn-brand`, `.ds-card`, `.ds-chip`, `.ds-input`

### 3.2 Layout/Typography Utility
- `.ds-container`: 페이지 공통 좌우 패딩 기준
- `.ds-eyebrow`: 섹션 상단 라벨
- `.ds-title-display`, `.ds-title-h1`, `.ds-title-h2`, `.ds-title-h3`
- `.ds-body-lg`, `.ds-body`, `.ds-caption`

### 3.3 레거시/공용 클래스 (공존)
- `title-group__heading`, `title-group__subtitle`
- `hr-card-glow-sync`, `animate-chip-marquee` 등 전역 애니메이션 클래스

## 4) 적용 원칙

### 원칙 A: 비파괴(Non-breaking)
- 기존 Tailwind 수치를 한 번에 치환하지 않음
- 신규/수정 영역부터 `.ds-*`를 우선 적용
- 한 번에 색상/간격/모션을 동시에 바꾸지 않음

### 원칙 B: 페이지별 점진 적용
1. 토큰 정의
2. 공용 컴포넌트 치환
3. 페이지별 미세 조정

### 원칙 C: 모션 안정성
- scale 과다 사용 지양, translate/opacity 중심
- 캐러셀/타임라인은 높이·폭 고정으로 레이아웃 점프 방지

## 5) 현재 반영 상태
- 완료
  - 토큰 파일 분리 및 `app/globals.css`에서 import
  - 페이지 전환 속도 토큰화
  - 사례 캐러셀/타임라인 주요 수치 토큰화
  - 일부 공통 헤더/서브타이틀 클래스 토큰 반영
- 미완료(2차 후보)
  - 개별 페이지 내 하드코딩 spacing/typography 수치의 전면 토큰화
  - `components/ui/*`와 시맨틱 클래스의 정합성 정리

## 6) 변경 가이드

### 색상 변경
1. `styles/tokens.css`의 색상 토큰 수정
2. 주요 페이지 5개 수동 시각 점검

### 타이포/간격 변경
1. `--ds-font-*`, `--ds-space-*` 조정
2. 제목 2줄 이상 섹션(히어로, 사례 타임라인) 우선 점검

### 사례 섹션 모션 변경
1. `--ds-motion-carousel-step-ms`, `--ds-cases-wheel-*`만 먼저 조정
2. `components/case-studies.tsx`의 상태머신/휠 로직은 구조 변경 없이 유지

## 7) 테스트 체크리스트
1. 데스크톱/모바일에서 GNB-히어로 간격 유지 여부
2. `/cases` 타임라인 마스크가 상세 텍스트를 과도하게 가리지 않는지
3. `/cases` 캐러셀 연타 시 카드 중복 프레임이 없는지
4. `/education` 카드 글로우/활성 카운트가 맞는지
5. 명도/대비(텍스트 가독성) 저하 여부

## 8) 금지/주의
- 토큰 없이 페이지별 임의 hex 색상 추가 금지(예외는 실험 브랜치)
- 모션 속도 직접 하드코딩 금지(토큰 우선)
- 타임라인 앵커 계산 로직과 CSS 마스크 폭을 동시에 크게 바꾸는 작업 금지

## 9) 다음 단계 제안
- `components/case-studies.tsx`를 기능별 파일로 분리하면서 토큰 의존도를 명확히 분할
- 문의 플로우(단일 폼 vs 멀티스텝) 확정 후 디자인 토큰에 form 상태(성공/에러/포커스) 표준화
