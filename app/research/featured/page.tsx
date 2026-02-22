import type { Metadata } from 'next'
import FeaturedResearchPageView from './FeaturedResearchPageView'

export const metadata: Metadata = {
  title: '핵심 연구 | ASTRA Research',
  description: 'ASTRA AI 예측 타당도 검증 보고서 상세',
}

export default function FeaturedResearchDetailPage() {
  return <FeaturedResearchPageView />
}
