export const featuredResearchArticle = {
  eyebrow: 'VALIDITY STUDY',
  title:
    '다차원 AI 역량 모델링의 예측 타당도 검증: Schmidt & Hunter 이론의 현대적 재해석',
  meta: 'By ASTRA Research Team • 2026. 02. 14 • 15 min read',
  figureCaption: 'Fig 1. ASTRA AI 평가 점수와 입사 후 1년 성과(KPI) 간의 상관관계 분포 (N=12,000)',
  intro: "채용의 본질은 '미래의 성과'를 예측하는 것입니다. 1998년 Frank Schmidt와 John Hunter의 메타 분석 이후, 우리는 지난 30년간 구조화된 면접(Structured Interview)이 가장 강력한 도구임을 믿어왔습니다. 하지만 AI의 등장은 이 게임의 규칙을 바꾸고 있습니다.",
  body1:
    '본 연구는 단일 평가 도구의 정확도를 넘어서, 다차원 행동 신호를 통합한 AI 역량 모델이 실제 조직 성과를 얼마나 안정적으로 설명할 수 있는지를 검증합니다. 특히 채용 시점의 평가 점수와 입사 후 12개월 KPI의 관계를 추적함으로써, 단기 적합도보다 장기 성과 예측력을 우선 지표로 설정했습니다.',
  body2:
    '분석 과정에서는 직무군·산업군·경력수준별 교란 변수를 통제했으며, 표본 왜도와 이상치를 보정하기 위해 강건 회귀와 부트스트랩 신뢰구간을 병행 적용했습니다. 이 접근은 단순 상관 분석보다 실제 인사 의사결정에 가까운 실효 타당도 (practical validity)를 확보하기 위한 설계입니다.',
  keyFindingTitle: 'Key Finding',
  keyFindingValue: 'Validity Coefficient (r) = 0.65',
  keyFindingCompare: 'Human Intuition (0.38) vs ASTRA AI (0.65)',
  keyFindingDesc:
    '이는 AI 모델이 인간 면접관보다 약 2.1배 더 정확하게 고성과자를 예측할 수 있음을 시사합니다.',
  methodologyTitle: 'Methodology',
  methodologyList: [
    { label: 'Data Source:', text: '3.5 Million cumulative assessments.' },
    { label: 'Framework:', text: 'O*NET based Competency Dictionary.' },
    { label: 'Technique:', text: 'Multi-modal Analysis (NLP + Behavioral Signal).' },
  ],
  methodologyDesc:
    '추가적으로 인터뷰 텍스트의 의미 신호(NLP), 반응 시간 및 상호작용 패턴(Behavioral Signal), 후속 성과 로그를 단일 잠재공간으로 정렬하는 멀티모달 임베딩 절차를 적용했습니다. 모델 검증은 홀드아웃 검증과 교차 검증을 동시에 수행하여 일반화 성능의 과대추정을 최소화했습니다.',
  conclusionTitle: 'Conclusion',
  conclusionLead:
    'ASTRA는 단순한 채용 도구가 아닙니다. 조직의 성과 밀도(Talent Density)를 높이는 가장 과학적인 파트너입니다.',
  conclusionDesc:
    '연구 결과는 AI 기반 예측 모델이 인간 직관을 대체한다기보다, 직관의 일관성 한계를 보완하는 증폭 장치로 기능함을 시사합니다. 따라서 향후 인재 선발 체계는 면접관의 전문 판단과 알고리즘 기반 타당도 신호를 결합한 하이브리드 구조로 전환될 가능성이 높습니다.',
  downloadLabel: 'PDF 다운로드',
  recommendedTitle: 'Recommended Articles',
  recommendedArticles: [
    {
      title: '생성형 AI 면접의 편향성 제거 효과',
      desc: 'AI 면접 평가에서 공정성 지표를 개선한 설계 원칙과 검증 결과를 다룹니다.',
      date: '2026.01.28',
    },
    {
      title: '설명 가능한 평가모델의 신뢰도 프레임워크',
      desc: '예측 정확도와 설명 가능성을 동시에 확보하기 위한 실무 프레임을 제시합니다.',
      date: '2025.12.19',
    },
    {
      title: '실시간 역량 모델 업데이트가 채용 품질에 미치는 영향',
      desc: '정적 모델과 동적 모델의 성과 차이를 장기 추적 데이터로 비교합니다.',
      date: '2025.11.07',
    },
  ],
} as const
