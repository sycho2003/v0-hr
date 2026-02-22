import { CaseStudies } from "@/components/case-studies"

export default function CasesPage() {
  return (
    <>
      <section className="relative bg-neutral-950 pt-32 pb-14 lg:pt-40 lg:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto w-full px-6 md:px-20 xl:px-[120px]">
          <p className="ds-eyebrow text-brand-primary text-xs font-semibold tracking-[0.22em] uppercase">Project Stories</p>
          <h1 className="title-group__heading text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            프로젝트 사례
          </h1>
          <p className="title-group__subtitle ds-body mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
            국내 주요 기업들이 어세스타의 역량 모델링으로
            HR 시스템을 혁신하고 가시적인 성과를 만들어내고 있습니다.
          </p>
        </div>
      </section>
      <CaseStudies />
    </>
  )
}
