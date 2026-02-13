import type { Metadata } from "next"
import { InquiryForm } from "@/components/inquiry-form"

export const metadata: Metadata = {
  title: "문의하기 | ASSESSTA",
  description: "간이 진단을 통해 우리 조직에 맞는 HR 솔루션을 확인하고 전문가 상담을 받아보세요.",
}

export default function InquiryPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">Quick Diagnosis</p>
          <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            간이 진단 &amp; 문의
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            간단한 질문에 답하시면 현재 상황에 최적화된 솔루션을 안내해드립니다.
            전문가의 맞춤 컨설팅으로 HR 혁신을 시작하세요.
          </p>
        </div>
      </section>
      <InquiryForm />
    </>
  )
}
