# HANDOVER

이 문서는 다음 유지보수 담당자가 코드 구조, 주요 로직, 리스크를 빠르게 파악하도록 작성한 인수인계 문서입니다.

## 1) 프로젝트 구조 요약

### 프레임워크/라이브러리
- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS + 커스텀 CSS Variables
- Framer Motion (페이지 전환/캐러셀/타임라인 모션)
- Radix UI 기반 `components/ui/*`

### 주요 폴더 책임
- `app/`: 라우트 엔트리(`page.tsx`) + 페이지 구현(`*PageView.tsx`)
- `components/`: 재사용 UI/섹션 컴포넌트
- `components/ui/`: shadcn/Radix 프리미티브
- `styles/`: 디자인 토큰(`tokens.css`)
- `public/images/`: 페이지별 정적 에셋
- `docs/`: 운영 문서(디자인시스템, 인수인계)

## 2) 페이지와 코드 매핑

### 공통 레이아웃
- 루트 레이아웃: `app/layout.tsx`
- GNB: `components/navigation.tsx`
- Footer: `components/footer.tsx`
- 페이지 전환 모션: `components/page-transition.tsx`

### 개별 페이지
- 랜딩 `/`
  - 엔트리: `app/page.tsx`
  - 구현: `app/HomePageView.tsx`
- 아스트라 `/solutions`
  - 엔트리: `app/solutions/page.tsx`
  - 구현: `app/solutions/SolutionsPageView.tsx`
  - 관련 컴포넌트: `components/interactive-demo-reel.tsx`, `components/interactive-feature-showcase.tsx`
- 리서치 `/research`
  - 엔트리: `app/research/page.tsx`
  - 구현: `app/research/ResearchPageView.tsx`
- 리서치 상세 `/research/featured`
  - 엔트리: `app/research/featured/page.tsx`
  - 구현: `app/research/featured/FeaturedResearchPageView.tsx`
- HR 컨설팅 `/education`
  - 엔트리: `app/education/page.tsx`
  - 구현: `app/education/EducationPageView.tsx`
- 프로젝트 사례 `/cases`
  - 엔트리: `app/cases/page.tsx`
  - 구현: `app/cases/CasesPageView.tsx`
  - 핵심 상호작용: `components/case-studies.tsx`
- 문의 `/inquiry`
  - 엔트리: `app/inquiry/page.tsx`
  - 구현: `app/inquiry/InquiryPageView.tsx`

## 3) 핵심 커스텀 로직

### A. 프로젝트 사례 후기 캐러셀
- 파일: `components/case-studies.tsx`
- 역할: 중앙 카드 + 양옆 블러 카드(버퍼 카드 포함)로 이동감 있는 후기 캐러셀 제공
- 핵심 상태/함수:
  - `activeTestimonialIndex`, `targetTestimonialIndexRef`, `isTestimonialAnimating`
  - `requestTestimonialMove`, `flushTestimonialQueue`, `animateTestimonialStep`
- 동작 요약:
  - 버튼/인디케이터 입력 시 목표 인덱스를 큐잉
  - 한 스텝씩 애니메이션 후 활성 인덱스를 갱신
  - 트랙 x 값을 원점으로 리셋하며 연속 이동
- 제약/주의:
  - 카드 크기/간격/속도는 CSS 변수 의존(`--ds-cases-card-size`, `--ds-cases-card-gap`, `--ds-motion-carousel-step-ms`)
  - 데이터 개수(현재 3개)가 적어 극단적 모션 변경 시 중복/교체감 이슈 재발 가능

### B. 컨설팅 연혁 타임라인 (수평 스크롤 + 스탬프 활성화)
- 파일: `components/case-studies.tsx` 내 `ConsultingTimeline`
- 역할: 연도 스탬프 클릭/휠로 이동, 활성 항목 상세 표시
- 핵심 상태/참조:
  - `activeYear`, `snappedIndex`, `edgePad`, `lineRange`
  - `activeIndexRef`, `snappedIndexRef`, `wheelStepConsumedRef`
- 핵심 함수:
  - `alignToIndexRespectLanding`, `alignByStep`, `alignByIndex`, `alignTimelineItemToAnchor`
  - `handleWheel` (휠 입력을 1-step 스냅으로 처리)
- 주요 정책(현재 반영):
  - 랜딩 기준 인덱스는 `2024년` (`landingCenterIndex`)
  - `현재/2025년`은 활성화 가능하지만 레일 자동 정렬은 랜딩 위치를 유지
  - 휠 입력은 임계값/리셋 시간 토큰(`--ds-cases-wheel-threshold`, `--ds-cases-wheel-gesture-reset-ms`)로 제어
- 제약/주의:
  - 휠 제어값이 너무 낮으면 1회 스크롤에 다중 이동으로 체감될 수 있음
  - 터치패드/마우스 휠 디바이스별 delta 특성 차이가 큼
  - 타임라인 마스크 폭(`--ds-cases-timeline-mask-width`) 변경 시 좌우 가림 이슈 재발 가능

### C. 페이지 전환
- 파일: `components/page-transition.tsx`
- 역할: 라우트 전환 시 페이드+Y 이동
- 포인트: 지속시간이 `--ds-motion-page-transition-ms`를 읽어 동작

## 4) 디자인 시스템 반영 상태
- 토큰 파일: `styles/tokens.css`
- 글로벌 반영: `app/globals.css`
- 반영 범위:
  - 컬러/타이포/모션/케이스 페이지 상수 토큰 정의
  - 공용 클래스(`.ds-*`) 일부 도입
  - 기존 Tailwind 클래스와 병행 운영
- 운영 원칙:
  - 전면 치환보다 페이지별 점진 치환 권장

## 5) 데이터/백엔드 연동 상태

현재는 프론트 단독 구현이며 실 데이터 API 연동이 없습니다..!

- 문의/상담:
  - 현재 페이지: `app/inquiry/InquiryPageView.tsx` (로컬 상태 기반)
  - 별도 컴포넌트: `components/inquiry-form.tsx` (현재 미사용)


향후 필요 API 예시:
- `POST /api/contact` (문의 접수)
- `POST /api/demo` (무료 진단/데모 신청)

## 6) 기술 부채/리스크
- `next.config.mjs`
  - `typescript.ignoreBuildErrors: true`
  - 위험: 타입 오류가 있어도 빌드가 진행됨
  - 권장: CI 단계에서 `npx tsc --noEmit`를 강제

- `components/case-studies.tsx`
  - 파일 크기와 책임이 큼(사례카드+후기캐러셀+타임라인+CTA)
  - 권장: `CaseCardsSection`, `TestimonialsCarousel`, `ConsultingTimeline`로 분리

- `components/inquiry-form.tsx`
  - 현재 라우트에서 미사용
  - 권장: 사용하지 않으면 제거 또는 `/inquiry`에 통합

- 더미 데이터 하드코딩
  - 대상: `components/case-studies.tsx`, `app/research/ResearchPageView.tsx` 등
  - 권장: CMS/JSON/백엔드 응답으로 분리

## 7) QA 체크리스트 (수정 후)
1. `/cases` 타임라인: 스탬프 클릭/휠 이동/랜딩 초기상태
2. `/cases` 후기 캐러셀: 버튼/인디케이터 연타 시 중복 프레임 없는지
3. `/education` 칩 선택 시 카드 활성 개수/글로우 정상 여부
4. `/research` 탭 필터 및 sticky 탭 동작
5. 모바일(375px), 태블릿, 데스크톱에서 레이아웃 점프 여부

## 8) 오픈 질문
- 타임라인 랜딩 기준 인덱스(`2024년`)를 장기적으로 고정할지, 현재연도 기반으로 동적으로 바꿀지 정책 확정 필요
- 문의 플로우는 단순 폼 유지인지, `components/inquiry-form.tsx` 다단계 UX로 통합할지 방향 결정 필요
