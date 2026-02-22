import type { Metadata } from 'next'
import CasesPageView from './CasesPageView'

export const metadata: Metadata = {
  title: '프로젝트 사례 | ASSESTA',
  description: '어세스타와 함께 HR 시스템을 혁신한 기업들의 성공 사례를 확인하세요.',
}

export default function CasesPage() {
  return <CasesPageView />
}
