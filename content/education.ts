export type AudienceType = 'government' | 'public' | 'enterprise' | 'stateOwned'
export type AudienceChipType =
  | 'government'
  | 'public'
  | 'stateOwned'
  | 'largeEnterprise'
  | 'midSizedEnterprise'
  | 'sme'
  | 'startup'

export type ConsultingItem = {
  id: string
  title: string
  description: string
  audiences: AudienceType[]
}

export const audienceLabels: {
  id: AudienceChipType
  label: string
}[] = [
  { id: 'government', label: '정부' },
  { id: 'public', label: '공공기관' },
  { id: 'largeEnterprise', label: '대기업' },
  { id: 'midSizedEnterprise', label: '중견기업' },
  { id: 'sme', label: '중소기업' },
  { id: 'startup', label: '스타트업' },
  { id: 'stateOwned', label: '공기업' },
]

export const consultingCatalog: { hrm: ConsultingItem[]; hrd: ConsultingItem[] } = {
  hrm: [
    { id: 'hrm-1', title: '채용', description: '구조화 면접과 심리측정 기반으로 최적의 인재를 과학적으로 선발합니다.', audiences: ['government', 'public', 'enterprise', 'stateOwned'] },
    { id: 'hrm-2', title: '역량평가(AC)', description: '평가센터(Assessment Center) 기반으로 직무 역량을 다면적으로 측정합니다.', audiences: ['government', 'public', 'enterprise', 'stateOwned'] },
    { id: 'hrm-3', title: '성과평가', description: '성과지표와 연동된 공정한 평가 체계를 설계하고 운영합니다.', audiences: ['government', 'public', 'stateOwned'] },
    { id: 'hrm-4', title: '보상', description: '성과와 역량에 기반한 공정하고 동기부여적인 보상 체계를 구축합니다.', audiences: ['public', 'enterprise', 'stateOwned'] },
    { id: 'hrm-5', title: '직무 분석 및 설계', description: '직무 구조를 체계적으로 분석하고 역할과 책임을 최적화합니다.', audiences: ['government', 'public', 'enterprise', 'stateOwned'] },
  ],
  hrd: [
    { id: 'hrd-1', title: '역량개발(DC)', description: '개발센터(Development Center) 기반으로 개인별 역량 강화 로드맵을 설계합니다.', audiences: ['government', 'public', 'enterprise', 'stateOwned'] },
    { id: 'hrd-2', title: '리더십개발', description: '계층별 리더십 역량을 진단하고 맞춤형 리더십 프로그램을 운영합니다.', audiences: ['government', 'public', 'enterprise', 'stateOwned'] },
    { id: 'hrd-3', title: '커뮤니케이션', description: '조직 내 소통 역량을 강화하여 협업 효율성과 팀 성과를 높입니다.', audiences: ['government', 'public', 'enterprise', 'stateOwned'] },
    { id: 'hrd-4', title: '팀빌딩/팀워크', description: '팀 응집력과 시너지를 높이는 체험형 프로그램을 설계하고 운영합니다.', audiences: ['public', 'enterprise', 'stateOwned'] },
    { id: 'hrd-5', title: '감정관리', description: '감정 인식과 조절 역량을 개발하여 직무 스트레스 관리와 조직 적응력을 향상시킵니다.', audiences: ['government', 'public', 'stateOwned'] },
  ],
}
