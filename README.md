# Astra HR Website

ASTRA(어세스타) 웹사이트 프론트엔드 프로젝트입니다!
Next.js App Router 기반 단일 웹앱이며, 주요 탭(아스트라/리서치/HR컨설팅/프로젝트 사례/문의하기)을 한 레포에서 관리합니다.

## 문서 구분
- 프로젝트 사용/실행 가이드: `README.md` (이 문서)
- 인수인계/운영 맥락: `docs/HANDOVER.md`
- 디자인 토큰/컴포넌트 규칙: `docs/DESIGN_SYSTEM.md`

## Tech Stack
- Framework: Next.js 16 (App Router)
- Language: TypeScript, React 19
- Styling: Tailwind CSS + CSS Variables (`styles/tokens.css`, `app/globals.css`)
- Motion: Framer Motion
- UI Primitives: Radix UI + shadcn 스타일 `components/ui/*`
- Icons: lucide-react

## 로컬 실행
```bash
npm install
npm run dev
```
기본 개발 URL: `http://localhost:3000`

빌드/실행:
```bash
npm run build
npm run start
```

참고:
- `next.config.mjs`에서 `typescript.ignoreBuildErrors = true`로 설정되어 있어, 빌드 시 타입오류가 차단되지 않을 수 있습니다.
- 타입 체크는 별도로 `npx tsc --noEmit` 권장.

## 라우트 맵
- `/` : 랜딩(히어로/주요 소개)
- `/solutions` : 아스트라 탭
- `/research` : 리서치 목록
- `/research/featured` : 리서치 상세
- `/education` : HR 컨설팅 서비스
- `/cases` : 프로젝트 사례(연혁 타임라인 + 후기 캐러셀 포함)
- `/inquiry` : 문의/상담 접수

## 폴더 구조 (2~3 Depth)
```text
app/
  layout.tsx
  page.tsx
  HomePageView.tsx
  solutions/
    page.tsx
    SolutionsPageView.tsx
  research/
    page.tsx
    ResearchPageView.tsx
    featured/
      page.tsx
      FeaturedResearchPageView.tsx
  education/
    page.tsx
    EducationPageView.tsx
  cases/
    page.tsx
    CasesPageView.tsx
  inquiry/
    page.tsx
    InquiryPageView.tsx

components/
  navigation.tsx
  footer.tsx
  page-transition.tsx
  case-studies.tsx
  interactive-demo-reel.tsx
  interactive-feature-showcase.tsx
  ui/*

styles/
  tokens.css

docs/
  DESIGN_SYSTEM.md
  HANDOVER.md
```

## 페이지 파일 네이밍 규칙
Next.js App Router 규칙상 라우트 엔트리는 `page.tsx`여야 합니다.
현재는 유지보수성을 위해 다음 패턴을 적용했습니다.
- 엔트리: `app/**/page.tsx` (얇은 라우팅 파일)
- 실제 구현: `*PageView.tsx` (의미 있는 이름)

예:
- `app/cases/page.tsx` -> `app/cases/CasesPageView.tsx`

## 디자인 시스템 적용 위치
- 토큰 정의: `styles/tokens.css`
- 글로벌 클래스/애니메이션: `app/globals.css`
- 실제 적용 상세: `docs/DESIGN_SYSTEM.md`

## 인수인계/운영 시 확인 순서
1. `docs/HANDOVER.md`에서 커스텀 인터랙션(타임라인/캐러셀) 제약 확인
2. `docs/DESIGN_SYSTEM.md`에서 토큰/스타일 규칙 확인
3. 코드 수정 후 `npx tsc --noEmit` + 주요 페이지 수동 점검
