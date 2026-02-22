export const categoryTabs = ['전체', '타당도 검증', 'AI 윤리', 'HR 트렌드', '기술 백서'] as const
export type CategoryTab = (typeof categoryTabs)[number]

export const sideArticles = [
  { title: '생성형 AI 편향성 제거 효과', date: 'Feb 14', image: '/images/research/thumb-7.svg', category: 'AI 윤리' },
  { title: '설명가능한 평가모델 신뢰도 프레임', date: 'Feb 09', image: '/images/research/thumb-8.svg', category: '기술 백서' },
  { title: '실시간 역량모델 업데이트 성과', date: 'Feb 01', image: '/images/research/thumb-9.svg', category: 'HR 트렌드' },
] as const

export const archiveArticles = [
  {
    tag: '타당도 검증',
    title: '채용 예측 타당도 0.65 달성 요인 분석',
    desc: '350만 건 데이터를 기반으로 모델 정확도가 개선된 핵심 요인을 분해했습니다.',
    date: '2025.12.19',
    image: '/images/research/thumb-1.svg',
    category: '타당도 검증',
  },
  {
    tag: 'AI 윤리',
    title: '면접 자동화의 공정성 편향 점검 체크리스트',
    desc: 'AI 도입 시 필수 점검 항목과 리스크 대응 프로토콜을 정리한 가이드입니다.',
    date: '2025.11.30',
    image: '/images/research/thumb-2.svg',
    category: 'AI 윤리',
  },
  {
    tag: '기술 백서',
    title: '행동 시뮬레이션 기반 역량 추론 아키텍처',
    desc: '현업 적용 가능한 모델 구조와 파이프라인 설계를 상세히 설명합니다.',
    date: '2025.11.12',
    image: '/images/research/thumb-3.svg',
    category: '기술 백서',
  },
  {
    tag: 'HR 트렌드',
    title: '고성과자 온보딩 패턴의 변화와 시사점',
    desc: '최근 3년간 온보딩 데이터 변화와 성과 연계 신호를 비교했습니다.',
    date: '2025.10.21',
    image: '/images/research/thumb-4.svg',
    category: 'HR 트렌드',
  },
  {
    tag: 'AI 윤리',
    title: '생성형 AI 면접관의 책임성 프레임워크',
    desc: '설명 책임, 데이터 출처, 평가 투명성을 위한 운영 기준을 제안합니다.',
    date: '2025.10.10',
    image: '/images/research/thumb-5.svg',
    category: 'AI 윤리',
  },
  {
    tag: '기술 백서',
    title: '다중 신호 융합을 통한 역량 스코어링 방법론',
    desc: '인터뷰, 시뮬레이션, 성과데이터를 결합하는 계산 접근을 다룹니다.',
    date: '2025.09.28',
    image: '/images/research/thumb-6.svg',
    category: '기술 백서',
  },
] as const

export const featuredResearch = {
  badge: '핵심 연구',
  title: 'ASTRA AI 예측 타당도 검증 보고서: 상관계수 0.65의 의미',
  meta: '읽는 시간 5분 • 2026.02.14',
  summary:
    '기존 인적성 검사(0.3) 대비 2배 이상의 예측력을 입증했습니다. 350만 건의 데이터와 25년의 추적 조사를 통해 밝혀낸 고성과자의 DNA를 공개합니다.',
} as const
