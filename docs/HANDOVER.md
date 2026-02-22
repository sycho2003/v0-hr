# 통합 인수인계 문서

## 1) 프로젝트 개요
- 프로젝트: Astra HR 웹사이트 프론트엔드
- 목적: 회사 소개, 솔루션, 리서치, HR 컨설팅, 프로젝트 사례, 문의 기능 제공
- 현재 상태: 프론트 중심 구현, 더미 콘텐츠 비중이 큼

---

## 2) 기술 스택
- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS + CSS 변수 토큰(`styles/tokens.css`)
- Framer Motion
- Radix UI 기반 컴포넌트(`components/ui/*`)
- lucide-react 아이콘

---

## 3) 폴더 구조와 역할
- `app/`
  - 라우트 엔트리(`page.tsx`) + 실제 페이지 구현(`*PageView.tsx`)
- `components/`
  - 섹션/공통 컴포넌트
- `components/ui/`
  - 공통 UI 기본 부품
- `styles/`
  - 디자인 토큰(`tokens.css`)
- `public/images/`
  - 정적 이미지
- `docs/`
  - 운영 문서(디자인 시스템, 핸드오버)

---

## 4) 라우트 ↔ 파일 매핑
- `/` → `app/page.tsx` → `app/HomePageView.tsx`
- `/solutions` → `app/solutions/page.tsx` → `app/solutions/SolutionsPageView.tsx`
- `/research` → `app/research/page.tsx` → `app/research/ResearchPageView.tsx`
- `/research/featured` → `app/research/featured/page.tsx` → `app/research/featured/FeaturedResearchPageView.tsx`
- `/education` → `app/education/page.tsx` → `app/education/EducationPageView.tsx`
- `/cases` → `app/cases/page.tsx` → `app/cases/CasesPageView.tsx`
- `/inquiry` → `app/inquiry/page.tsx` → `app/inquiry/InquiryPageView.tsx`

---

## 5) 전역(Global) 구조
- 레이아웃: `app/layout.tsx`
- GNB: `components/navigation.tsx`
- Footer: `components/footer.tsx`
- 페이지 전환: `components/page-transition.tsx`
- 전역 스타일: `app/globals.css`
- 디자인 토큰: `styles/tokens.css`

주의:
- 전역 파일 수정은 모든 페이지에 영향
- 작은 변경도 전체 페이지 회귀 확인 필요

---

## 6) 페이지별 흐름/애니메이션/디자인/리스크

## A. 랜딩 `/`
- 흐름: 히어로 중심 비주얼 + 제품 설명 + 솔루션 관련 섹션 + ROI 관련 섹션
- 애니메이션: 파티클/광원, 섹션 모션
- 디자인 포인트: 브랜드 블루 톤, 강한 타이틀 중심
- 리스크:
  - 히어로 캔버스 배치/크기 계산
  - GNB 높이와 상단 패딩 균형 깨짐
- 안전 수정:
  - 디자인 수정은 토큰 우선
  - 레이아웃 수정은 캔버스 컨테이너부터 검증

## B. 아스트라 `/solutions`
- 흐름: 타이틀 → 데모릴 → 데모 시연 프로토형 섹션 → 솔루션 설명
- 애니메이션: 데모릴 레이어 애니메이션, 섹션 진입 모션
- 리스크:
  - 데모릴 외곽 크기 변경 시 내부 레이어 어긋남
- 안전 수정:
  - 카드/보더/텍스트 먼저 조정
  - 데모릴 크기 변경 시 내부 레이어 동시 확인

## C. 리서치 목록 `/research`
- 흐름: 헤더 → sticky 카테고리 탭 → 메인/사이드 콘텐츠 → 아카이브
- 애니메이션: hover 중심
- 리스크:
  - sticky 탭 top 값과 GNB 높이 충돌
  - 70/30 레이아웃 비율 변경 시 균형 깨짐
- 안전 수정:
  - sticky top은 신중히 조정
  - 데스크톱/모바일 분기 동시 점검

## D. 리서치 상세 `/research/featured`
- 흐름: 상세 아티클(헤더/시각화/본문/추천)
- 애니메이션: 적음(가독성 중심)
- 리스크:
  - SVG 그래프 좌표 변경 시 시각화 왜곡
- 안전 수정:
  - 타이포는 줄간격 우선 조정
  - 그래프는 aspect와 viewBox 유지 후 수정

## E. HR 컨설팅 `/education`
- 흐름: 히어로 → 설명 → 조직 칩 필터 → HRM/HRD 카드 → CTA
- 애니메이션: 카드 글로우, 진입 모션
- 리스크:
  - 칩 선택 상태/활성 카드 개수 로직
  - 카드 최소높이/패딩 과조정 시 텍스트 깨짐
- 안전 수정:
  - 상태 로직 유지한 채 스타일 먼저 조정
  - 카드 그리드 변경 시 활성 카운트 회귀 테스트

## F. 프로젝트 사례 `/cases` (최고위험)
- 흐름: 로고 마퀴 → 사례 카드 → 후기 캐러셀 → 연혁 타임라인 → CTA
- 애니메이션:
  - 후기 캐러셀(중앙 이동감 + 양옆 블러)
  - 타임라인 스탬프/휠 이동
- 핵심 파일: `components/case-studies.tsx`
- 리스크:
  - 캐러셀 크기/간격/속도 동시 변경 시 중복/교체감 재발
  - 타임라인 휠 감도/쿨다운 값 민감
  - 좌우 마스크 폭 변경 시 상세 텍스트 가림
- 안전 수정:
  - 토큰 1개씩 단계 조정
  - 연속 클릭/약한 휠/강한 휠 모두 테스트

## G. 문의 `/inquiry`
- 흐름: 단계형 입력 UI
- 현재: 로컬 상태 기반, 서버 저장 없음
- 리스크:
  - 단계 분기와 유효성 체크 충돌
- 안전 수정:
  - 입력 필드/버튼 높이 유지
  - 모바일 키보드 환경 확인

---

## 7) 데이터/백엔드/운영 연동 상태
- 현재는 서버 연동이 거의 없는 프론트 중심 구조
- ROI 계산기:
  - 현재 기준 API 연동 불필요(프론트 계산 유지)
- 리서치 탭:
  - 서버 연동 권장(지속 발행 운영 효율)
  - 권장 API:
    - `GET /api/research/articles`
    - `GET /api/research/articles/:slug`
- 문의하기:
  - 서버 저장 연동 필요
  - 권장 API:
    - `POST /api/contact`
- 관리자 페이지 필요 가능성:
  - 문의 관리 Admin
  - 리서치 발행/수정 Admin

---

## 8) 더미 콘텐츠 인벤토리 및 교체 시점

### 8-1. 교체 시점 기준
1. **프로토 확정 직후 교체(최우선)**
- 아스트라 탭 데모릴
- 아스트라 탭 데모 시연 프로토
- 랜딩 ROI 계산기
- 랜딩 제품 설명 및 솔루션 프로토콜 설명

2. **MVP 런칭 이후 + 판매/수행 이력 축적 후 교체**
- 리서치 탭 아티클 전체(목록/상세/썸네일)
- 프로젝트 사례 탭 기업사/성과/상세 내용
- HR 컨설팅 탭 상세 카드 문구

### 8-2. 파일 기준 상세 목록

#### A) 프로토 확정 직후 교체 대상 (최우선)

##### A-1) 아스트라 탭: 데모릴 / 데모 시연 프로토
- `app/solutions/SolutionsPageView.tsx`
- `components/interactive-demo-reel.tsx`
- `components/interactive-feature-showcase.tsx`
- `public/images/solutions/reel-1.png`
- `public/images/solutions/reel-2.png`
- `public/images/solutions/reel-3.png`
- `public/images/solutions/reel-4.png`
- `public/images/solutions/prototype-1.svg`
- `public/images/solutions/prototype-2.svg`
- `public/images/solutions/prototype-3.svg`
- `public/images/solutions/prototype-4.svg`

교체 기준:
- 실제 프로토 화면 흐름/지표/카피 확정 즉시 교체
- 이미지와 텍스트를 함께 교체

##### A-2) 랜딩: ROI 계산기
- `app/HomePageView.tsx` 내 ROI 관련 섹션

교체 기준:
- 프로토에서 확정된 변수/계산식/문구 반영
- 서버 API는 현 단계 필수 아님

##### A-3) 랜딩: 제품 설명/솔루션 프로토콜
- `app/HomePageView.tsx` 내 제품 소개/솔루션 설명 블록

교체 기준:
- 제품 포지셔닝/프로토콜 정의 확정 후 교체
- 카피 확정 후 디자인 미세조정

#### B) MVP 이후 + 이력 축적 후 교체 대상

##### B-1) 리서치 탭 아티클 전체
- `app/research/ResearchPageView.tsx`
- `app/research/featured/FeaturedResearchPageView.tsx`
- `public/images/research/hero-mockup.svg`
- `public/images/research/thumb-1.svg` ~ `thumb-9.svg`

교체 기준:
- MVP 이후 실제 발행 콘텐츠 확보 시 교체
- 하드코딩 대신 서버 게시 구조 권장

##### B-2) 프로젝트 사례 탭 기업사/상세 콘텐츠
- `components/case-studies.tsx` 내:
  - `clients`
  - `caseStudies`
  - `testimonials`
  - `consultingTimeline`

교체 기준:
- 공개 가능한 실사례/성과 수치 확보 후 교체
- 공개 정책(실명/마스킹) 선합의 필요

##### B-3) HR 컨설팅 탭 상세 카드 내용
- `app/education/EducationPageView.tsx` 내 `consultingCatalog`

교체 기준:
- 실제 서비스 패키지/수행 방식 확정 후 교체
- 영업 자료와 문구 정합성 유지

### 8-3. 운영 메모
- 현재 더미 콘텐츠 비중이 높음
- 교체 우선순위:
  1) 프로토 확정 즉시: 데모/ROI/랜딩 핵심 메시지
  2) MVP 이후: 리서치/사례/HR컨설팅 상세

---

## 9) 기술 부채/위험 요소
- `next.config.mjs`에서 `typescript.ignoreBuildErrors: true`
  - 빌드 시 타입 오류 통과 가능
- `components/case-studies.tsx` 단일 파일 책임 과다
- `components/inquiry-form.tsx` 미사용 상태(중복 관리 위험)
- 하드코딩 콘텐츠 다수

---

## 10) 수정 시 실무 가이드

## 디자인만 바꿀 때
1. `styles/tokens.css` 우선 조정
2. 전역보다 페이지 로컬 수정 우선
3. 한 번에 한 축(색/간격/속도 중 1개)만 변경

## 레이아웃 자체를 바꿀 때
1. 전역 변경인지 feature 변경인지 먼저 분리
2. `page.tsx`보다 `*PageView.tsx`에서 작업
3. 고정 크기 컴포넌트(캐러셀/타임라인)는 단계별 변경
4. 모바일/태블릿/데스크톱 동시 검증

## 애니메이션 바꿀 때
1. duration/easing/step 중 1개씩 조정
2. 빠른 연속 입력 테스트 필수
3. 부드러움 문제는 step과 duration 함께 조정

---

## 11) QA 체크리스트
1. `/cases` 타임라인 랜딩/스탬프/휠 동작
2. `/cases` 캐러셀 중복 프레임 여부
3. `/education` 활성 카드 개수/글로우 매핑
4. `/research` sticky 탭/필터 동작
5. 모바일/태블릿/데스크톱 레이아웃 안정성

---

## 12) 추후 계획
1. 리서치/문의 서버 연동 구조 설계
2. 문의/리서치 관리자 페이지 범위 정의
3. 더미 콘텐츠 실데이터 교체 실행
4. `components/case-studies.tsx` 기능 단위 분리
5. **미디어쿼리 체계 정리 및 적용 강화**
   - 공통 브레이크포인트 기준 문서화
   - 페이지별 반응형 간격/폰트/컴포넌트 크기 기준 통일
   - 모바일 우선 점검 루틴 추가
