import type { Metadata, Viewport } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PageTransition } from '@/components/page-transition'

import './globals.css'

export const metadata: Metadata = {
  title: 'ASSESTA | 국내 최고의 심리학 기반 역량평가 전문기관',
  description:
    'HRD, HRM 전문 역량평가기관 어세스타. AI 기반 역량 모델링 플랫폼 ASTRA로 지속 가능한 HR 시스템을 구축하세요.',
}

export const viewport: Viewport = {
  themeColor: '#020617',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
        <body className="relative bg-neutral-950 font-sans antialiased text-white" suppressHydrationWarning>
        <Navigation />
        <main className="relative min-h-screen bg-neutral-950">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
