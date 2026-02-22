# 1. 프로젝트 개요

- **프로젝트**: Astra HR 웹사이트 프론트엔드
- **단기 목적**:
  - 엑스포/대외 행사에서 Astra 프로덕트 아이덴티티를 시각적으로 전달
  - 회사 소개 / 솔루션 / 리서치 / HR 컨설팅 / 프로젝트 사례 / 문의를 한 곳에서 안내하는 마케팅·브랜딩 사이트 운영
- **중장기 목적**:
  - “통합 HR 플랫폼 솔루션(채용–평가–개발)” 브랜드 메시지를 일관되게 전달
  - 향후 실제 플랫폼 기능 연동 시 신뢰 가능한 레퍼런스 허브로 확장
- **현재 상태**:
  - 프론트 중심 구현
  - 더미 텍스트/더미 이미지/더미 데모 비중 큼
  - 백엔드/DB 미구현(문의, 리서치 발행 관리 등 미연동)

---

# 2. 기술 스택

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS + CSS 변수 토큰(`styles/tokens.css`)
- Framer Motion
- Radix UI 기반 프리미티브(`components/ui/*`)
- `lucide-react` 아이콘

---

# 3. 폴더 구조와 역할

- `app/`
  - 라우트 엔트리(`page.tsx`) + 실제 페이지 구현(`*PageView.tsx`)
- `components/`
  - 섹션/공통 컴포넌트
- `components/ui/`
  - 공통 UI 기본 부품(Radix 기반)
- `content/`
  - 하드코딩 분리용 콘텐츠 데이터 소스
- `styles/`
  - 디자인 토큰(`tokens.css`)
- `public/images/`
  - 정적 이미지
- `docs/`
  - 운영 문서(`HANDOVER.md`, `DESIGN_SYSTEM.md`)

---

# 4. 라우트 ↔ 파일 매핑

- `/` → `app/page.tsx` → `app/HomePageView.tsx`
- `/solutions` → `app/solutions/page.tsx` → `app/solutions/SolutionsPageView.tsx`
- `/research` → `app/research/page.tsx` → `app/research/ResearchPageView.tsx`
- `/research/featured` → `app/research/featured/page.tsx` → `app/research/featured/FeaturedResearchPageView.tsx`
- `/education` → `app/education/page.tsx` → `app/education/EducationPageView.tsx`
- `/cases` → `app/cases/page.tsx` → `app/cases/CasesPageView.tsx` (+ `components/case-studies.tsx`)
- `/inquiry` → `app/inquiry/page.tsx` → `app/inquiry/InquiryPageView.tsx` (+ `components/inquiry-form.tsx`)

---

# 5. 전역(Global) 구조

- 레이아웃: `app/layout.tsx`
- GNB: `components/navigation.tsx`
- Footer: `components/footer.tsx`
- 페이지 전환: `components/page-transition.tsx`
- 전역 스타일: `app/globals.css`
- 디자인 토큰: `styles/tokens.css`

주의:
- 전역 파일 수정은 전 페이지 영향
- 작은 변경도 전체 회귀 확인 필요

---

# 6. 디자인 컨셉 및 톤앤매너

- 핵심 키워드: **정확도 / 연결성 / 심리 기반 HR**
- 톤:
  - 다크 배경 + 블루 포인트로 AI/신뢰/정확성 강조
  - 데이터 카드/타임라인 중심 레이아웃으로 “성과 축적” 이미지 전달
- 페이지 역할:
  - 랜딩/solutions: 브랜드 임팩트 + 데모 체험
  - research: 연구 기반 브랜드 신뢰 강화
  - education: 오프라인 컨설팅 전문성
  - cases: 성과/연혁/후기 시각화
- 향후 개편 방향:
  - 핵심 키워드는 유지
  - 문서형 페이지(리서치 등)는 가독성 우선(라이트 모드 포함 검토 가능)
  - 비주얼형 페이지(랜딩/solutions)는 인터랙션 중심 유지

---

# 7. 페이지별 흐름·애니메이션·디자인·리스크

## A. 랜딩 `/`
- 흐름: 히어로 → 제품 설명 → 솔루션 소개 → ROI 관련 섹션 → CTA
- 애니메이션: 파티클/광원/섹션 진입
- 리스크: 히어로 캔버스 배치, GNB와 상단 간격 충돌
- 안전수정: 토큰 우선 변경, 캔버스 컨테이너 기준으로 단계 수정

## B. 아스트라 `/solutions`
- 흐름: 타이틀 → 데모릴 → 프로토형 섹션 → 솔루션 카드
- 애니메이션: 데모릴 레이어/진입 모션
- 리스크: 데모릴 외곽 크기 변경 시 내부 레이어 불일치
- 안전수정: 카드 스타일 우선, 데모릴 크기 변경 시 내부 레이어 동시 점검

## C. 리서치 목록 `/research`
- 흐름: 헤더 → sticky 탭 → 메인/사이드 카드 → 아카이브
- 애니메이션: hover 중심
- 리스크: sticky `top`과 GNB 높이 충돌, 70/30 레이아웃 붕괴
- 안전수정: sticky 값 신중 조정, 반응형 분기 함께 확인

## D. 리서치 상세 `/research/featured`
- 흐름: 아티클 헤더/시각화/본문/추천
- 애니메이션: 최소화(가독성 우선)
- 리스크: SVG 좌표 수정 시 그래프 왜곡
- 안전수정: `viewBox`/aspect 유지 후 텍스트/좌표 분리 수정

## E. HR 컨설팅 `/education`
- 흐름: 히어로 → 설명 → 조직 칩 필터 → HRM/HRD 카드 → CTA
- 애니메이션: 카드 글로우/진입
- 리스크: 칩 상태와 카드 활성 개수 로직 충돌
- 안전수정: 상태 로직 유지 + 스타일 단계 수정, 카운트 회귀 테스트

## F. 프로젝트 사례 `/cases` (위험도 높음)
- 흐름: 로고 마퀴 → 사례 카드 → 후기 캐러셀 → 연혁 타임라인 → CTA
- 애니메이션: 캐러셀 이동, 타임라인 스냅/휠
- 핵심 파일: `components/case-studies.tsx`
- 리스크: 캐러셀 파라미터 동시 수정 시 중복/교체감, 타임라인 휠 민감도
- 안전수정: 토큰 1개씩 조정, 연속 클릭/약·강 휠 모두 테스트

## G. 문의 `/inquiry`
- 흐름: `InquiryForm` 컴포넌트 기반 단계형 입력 UI
- 현재: 로컬 상태 기반
- 리스크: 단계 분기/유효성 조건 충돌
- 안전수정: 폼 높이/간격 유지, 모바일 키보드 환경 확인

---

# 8. 데이터·백엔드·운영 연동 상태

- 전체적으로 프론트 중심
- **ROI 계산기**: 현재 API 불필요(프론트 계산 유지)
- **리서치**: 서버 연동 권장
  - `GET /api/research/articles`
  - `GET /api/research/articles/:slug`
- **문의**: 서버 저장 연동 필요
  - `POST /api/contact`
- 관리자 페이지 필요 가능성:
  - 문의 관리 Admin
  - 리서치 발행/수정 Admin

---

# 9. 더미 콘텐츠 인벤토리 및 교체 시점

## 9-1. 교체 시점 기준
- **프로토 확정 직후(최우선)**:
  - solutions 데모릴/데모 프로토
  - 랜딩 ROI
  - 랜딩 제품 설명/솔루션 프로토콜
- **MVP 이후 + 판매/수행 이력 축적 후**:
  - 리서치 전 아티클
  - 프로젝트 사례 기업/성과
  - HR 컨설팅 상세 카드 문구

## 9-2. 파일 기준 상세
- solutions 관련:
  - `app/solutions/SolutionsPageView.tsx`
  - `components/interactive-demo-reel.tsx`
  - `components/interactive-feature-showcase.tsx`
  - `public/images/solutions/*`
- 랜딩 관련:
  - `app/HomePageView.tsx` (ROI/제품설명/프로토콜)
- 리서치 관련:
  - `app/research/ResearchPageView.tsx`
  - `app/research/featured/FeaturedResearchPageView.tsx`
  - `public/images/research/*`
- 사례 관련:
  - `components/case-studies.tsx`에서 렌더되는 데이터
- HR 컨설팅 관련:
  - `app/education/EducationPageView.tsx` 카드 문구

## 9-3. 운영 메모
- 현재 더미 비중 높음
- 교체 우선순위:
  - 1순위: 프로토 직후(데모/ROI/랜딩 핵심 카피)
  - 2순위: MVP 이후(리서치/사례/컨설팅 상세)

---

# 10. 기술 부채 및 위험 요소

## 10-1. TypeScript 빌드 무시 설정
- 위치: `next.config.mjs`
- 내용: `typescript.ignoreBuildErrors: true`
- 위험: 타입 문제를 런타임에서 뒤늦게 만날 수 있음

## 10-2. `components/case-studies.tsx` 책임 과다
- 타임라인/캐러셀/카드/CTA가 한 파일에 집중
- 영향범위가 넓어 회귀 위험 큼

## 10-3. `components/inquiry-form.tsx`
- 현재 `/inquiry`에서 실제 사용 중
- 향후 서버 연동 시 제출/오류 처리 로직 추가 필요

## 10-4. 하드코딩 콘텐츠 상태
- 1차 분리 완료: `content/` 폴더 도입
- 신규/사용 중:
  - `content/cases.ts`
  - `content/research.ts`
  - `content/research-featured.ts`
  - `content/education.ts`
  - `content/solutions.ts`
  - `content/inquiry.ts`
- 잔여 과제:
  - `app/HomePageView.tsx` 일부 데이터 2차 분리 필요

---

# 11. 수정 시 가이드

## 디자인만 수정
1. `styles/tokens.css` 우선
2. 전역보다 페이지 로컬 수정 우선
3. 한 번에 한 축만 변경(색/간격/속도 중 1개)

## 레이아웃 수정
1. 전역/feature 범위 먼저 분리
2. `page.tsx`보다 `*PageView.tsx` 중심 작업
3. 고정 크기 컴포넌트는 단계별 변경
4. 모바일/태블릿/데스크톱 동시 검증

## 애니메이션 수정
1. duration/easing/step 1개씩 조정
2. 연속 입력 테스트 필수
3. 부드러움 이슈는 step + duration 같이 튜닝

---

# 12. QA 체크리스트

1. `/cases` 타임라인 랜딩/스탬프/휠
2. `/cases` 캐러셀 중복/교체감
3. `/education` 활성 카드 개수/글로우 매핑
4. `/research` sticky 탭/필터
5. 반응형(모바일/태블릿/데스크톱) 레이아웃 안정성

---

# 13. 추후 계획 제안

## 13-1. 출시 이후 필수 교체
- solutions 데모 영상/프로토 목업 실화면으로 교체
- 프로젝트 사례 기업/수치 실데이터 반영

## 13-2. UX/기능 개선
- ROI는 메시지 방향 먼저 고도화
- 리서치 가독성 강화(라이트 모드 포함 검토)
- HRM/HRD 메시지 균형 강화

## 13-3. 구조 개선
- 리서치/문의 서버 연동
- 관리자 페이지 범위 정의
- 더미→실데이터 전환
- `components/case-studies.tsx` 기능 분리
- 미디어쿼리 체계 정리:
  - 공통 브레이크포인트 문서화
  - 페이지별 반응형 기준 통일
  - 모바일 우선 점검 루틴

---

# 14. 참고 문서 위치

- `README.md`
- `docs/HANDOVER.md`
- `docs/DESIGN_SYSTEM.md`
