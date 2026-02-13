import type { Metadata } from "next"
import { CaseStudies } from "@/components/case-studies"

export const metadata: Metadata = {
  title: "성공 사례 | ASSESSTA",
  description: "어세스타와 함께 HR 시스템을 혁신한 기업들의 성공 사례를 확인하세요.",
}

export default function CasesPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">Success Stories</p>
          <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            성공 사례
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            국내 주요 기업들이 어세스타의 역량 모델링으로
            HR 시스템을 혁신하고 가시적인 성과를 만들어내고 있습니다.
          </p>
        </div>
      </section>
      <CaseStudies />
    </>
  )
}
