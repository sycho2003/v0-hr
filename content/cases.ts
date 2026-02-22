export const clients = [
  'Sam*** Electronics',
  'S** Hynix',
  'Hyu**** Motor',
  'L** Energy',
  'K*k*o',
  'N****',
  'Po****',
  'K* Telecom',
]

export const caseStudies = [
  {
    company: '대형 IT기업 A사',
    industry: 'IT / 소프트웨어',
    employees: '3,200명',
    problem: '역량 평가 체계가 빠르게 변화하는 IT 환경에 맞지 않아 핵심 인재 이탈률 증가',
    solution: 'AI 기반 역량 모델링 + 분기별 자동 갱신 체계 구축',
    results: [
      { metric: '인재 이탈률', before: 18, after: 7, unit: '%', improvement: '-61%' },
      { metric: '성과 예측 정확도', before: 62, after: 91, unit: '%', improvement: '+47%' },
      { metric: '평가 소요 시간', before: 100, after: 15, unit: '%', improvement: '-85%' },
    ],
  },
  {
    company: '글로벌 제조기업 B사',
    industry: '제조 / 자동차부품',
    employees: '8,500명',
    problem: '해외 법인 간 역량 기준 상이하여 글로벌 통합 인재 관리 어려움',
    solution: '글로벌 통합 역량 프레임워크 + ASTRA 대시보드 도입',
    results: [
      { metric: '승진 적합도', before: 55, after: 87, unit: '%', improvement: '+58%' },
      { metric: 'HR 운영 비용', before: 100, after: 40, unit: '%', improvement: '-60%' },
      { metric: '인재 파악 속도', before: 20, after: 95, unit: '%', improvement: '실시간' },
    ],
  },
  {
    company: '금융그룹 C사',
    industry: '금융 / 보험',
    employees: '12,000명',
    problem: '천편일률적 역량 평가로 직무 특성 미반영, 구성원 평가 신뢰도 매우 낮음',
    solution: '직무별 맞춤 역량 모델 + 행동지표 기반 평가 체계 도입',
    results: [
      { metric: '평가 신뢰도', before: 32, after: 89, unit: '%', improvement: '+178%' },
      { metric: '직무 성과 연계', before: 30, after: 82, unit: '%', improvement: '+173%' },
      { metric: '구성원 만족도', before: 45, after: 82, unit: '%', improvement: '+82%' },
    ],
  },
] as const

export const testimonials = [
  {
    quote:
      '어세스타 팀의 전문성은 타 컨설팅사와 비교할 수 없었습니다. 심리학적 근거를 바탕으로 한 섬세한 접근이 인상적이었습니다.',
    author: '김OO 상무',
    role: 'A사 인사담당 임원',
  },
  {
    quote:
      'ASTRA 플랫폼 도입 후 HR팀의 업무 효율이 획기적으로 개선되었습니다. 실시간 대시보드가 경영진 의사결정에 큰 도움이 됩니다.',
    author: '이OO 팀장',
    role: 'B사 HR혁신팀',
  },
  {
    quote:
      "구성원들이 직접 '평가가 공정해졌다'고 이야기하기 시작했습니다. 데이터에 기반한 역량 모델이 조직 신뢰를 회복시켜 주었습니다.",
    author: '박OO 부장',
    role: 'C사 인재개발팀',
  },
] as const

export const consultingTimeline = [
  {
    year: '현재',
    history: [
      '현재 컨설팅 사례 더미 텍스트 01',
      '현재 컨설팅 사례 더미 텍스트 02',
      '현재 컨설팅 사례 더미 텍스트 03',
      '현재 컨설팅 사례 더미 텍스트 04',
    ],
  },
  ...Array.from({ length: 21 }, (_, index) => {
    const year = 2025 - index
    return {
      year: `${year}년`,
      history: [
        `${year}년 컨설팅 사례 더미 텍스트 01`,
        `${year}년 컨설팅 사례 더미 텍스트 02`,
        `${year}년 컨설팅 사례 더미 텍스트 03`,
        `${year}년 컨설팅 사례 더미 텍스트 04`,
      ],
    }
  }),
]
