"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Building2,
} from "lucide-react"

const clients = [
  "삼성전자", "SK하이닉스", "현대자동차", "LG에너지솔루션",
  "카카오", "네이버", "포스코", "KT",
]

const caseStudies = [
  {
    company: "대형 IT기업 A사",
    industry: "IT / 소프트웨어",
    employees: "3,200명",
    problem: "역량 평가 체계가 빠르게 변화하는 IT 환경에 맞지 않아 핵심 인재 이탈률 증가",
    solution: "AI 기반 역량 모델링 + 분기별 자동 갱신 체계 구축",
    results: [
      { metric: "인재 이탈률", before: 18, after: 7, unit: "%", improvement: "-61%" },
      { metric: "성과 예측 정확도", before: 62, after: 91, unit: "%", improvement: "+47%" },
      { metric: "평가 소요 시간", before: 100, after: 15, unit: "%", improvement: "-85%" },
    ],
  },
  {
    company: "글로벌 제조기업 B사",
    industry: "제조 / 자동차부품",
    employees: "8,500명",
    problem: "해외 법인 간 역량 기준 상이하여 글로벌 통합 인재 관리 어려움",
    solution: "글로벌 통합 역량 프레임워크 + ASTRA 대시보드 도입",
    results: [
      { metric: "승진 적합도", before: 55, after: 87, unit: "%", improvement: "+58%" },
      { metric: "HR 운영 비용", before: 100, after: 40, unit: "%", improvement: "-60%" },
      { metric: "인재 파악 속도", before: 20, after: 95, unit: "%", improvement: "실시간" },
    ],
  },
  {
    company: "금융그룹 C사",
    industry: "금융 / 보험",
    employees: "12,000명",
    problem: "천편일률적 역량 평가로 직무 특성 미반영, 구성원 평가 신뢰도 매우 낮음",
    solution: "직무별 맞춤 역량 모델 + 행동지표 기반 평가 체계 도입",
    results: [
      { metric: "평가 신뢰도", before: 32, after: 89, unit: "%", improvement: "+178%" },
      { metric: "직무 성과 연계", before: 30, after: 82, unit: "%", improvement: "+173%" },
      { metric: "구성원 만족도", before: 45, after: 82, unit: "%", improvement: "+82%" },
    ],
  },
]

const testimonials = [
  {
    quote:
      "어세스타 팀의 전문성은 타 컨설팅사와 비교할 수 없었습니다. 심리학적 근거를 바탕으로 한 섬세한 접근이 인상적이었습니다.",
    author: "김OO 상무",
    role: "A사 인사담당 임원",
  },
  {
    quote:
      "ASTRA 플랫폼 도입 후 HR팀의 업무 효율이 획기적으로 개선되었습니다. 실시간 대시보드가 경영진 의사결정에 큰 도움이 됩니다.",
    author: "이OO 팀장",
    role: "B사 HR혁신팀",
  },
  {
    quote:
      "구성원들이 직접 '평가가 공정해졌다'고 이야기하기 시작했습니다. 데이터에 기반한 역량 모델이 조직 신뢰를 회복시켜 주었습니다.",
    author: "박OO 부장",
    role: "C사 인재개발팀",
  },
]

export function CaseStudies() {
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const t = testimonials[testimonialIdx]
  const nextT = () => setTestimonialIdx((p) => (p + 1) % testimonials.length)
  const prevT = () => setTestimonialIdx((p) => (p - 1 + testimonials.length) % testimonials.length)

  return (
    <>
      {/* Client logos */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {clients.map((client) => (
              <div key={client} className="flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 shadow-sm">
                <Building2 className="h-4 w-4 text-muted-foreground/50" />
                <span className="text-sm font-medium text-muted-foreground">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study cards */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-8">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="grid lg:grid-cols-3">
                  <div className="border-b border-border p-8 lg:border-b-0 lg:border-r">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{cs.industry}</span>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{cs.employees}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-foreground">{cs.company}</h3>
                    <div className="mt-5">
                      <p className="text-[10px] font-semibold tracking-widest text-destructive/70 uppercase">Problem</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cs.problem}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-[10px] font-semibold tracking-widest text-primary uppercase">Solution</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">{cs.solution}</p>
                    </div>
                  </div>
                  <div className="p-8 lg:col-span-2">
                    <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">Results</p>
                    <div className="mt-6 grid gap-6 sm:grid-cols-3">
                      {cs.results.map((r) => (
                        <div key={r.metric}>
                          <p className="text-xs text-muted-foreground">{r.metric}</p>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-muted-foreground">Before</span>
                              <span className="text-muted-foreground">{r.before}{r.unit}</span>
                            </div>
                            <div className="mt-1 h-2.5 rounded-full bg-muted">
                              <div className="h-full rounded-full bg-destructive/30" style={{ width: `${r.before}%` }} />
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-medium text-foreground">After</span>
                              <span className="font-bold text-primary">{r.after}{r.unit}</span>
                            </div>
                            <div className="mt-1 h-2.5 rounded-full bg-muted">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${r.after}%` }} />
                            </div>
                          </div>
                          <p className="mt-2 text-sm font-bold text-primary">{r.improvement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h3 className="text-center text-2xl font-bold text-foreground">전문가들의 평가</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            전문성과 열정에 대한 고객 후기
          </p>

          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative rounded-xl border border-border bg-card p-8 shadow-sm">
              <Quote className="h-8 w-8 text-primary/20" />
              <p className="mt-4 text-base leading-relaxed text-foreground">{t.quote}</p>
              <div className="mt-6 flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="mt-3 border-t border-border pt-4">
                <p className="text-sm font-bold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>

              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3">
                <button onClick={prevT} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-muted" aria-label="이전 후기">
                  <ChevronLeft className="h-4 w-4 text-foreground" />
                </button>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <div key={i} className={`h-2 w-2 rounded-full transition-colors ${i === testimonialIdx ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
                <button onClick={nextT} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-muted" aria-label="다음 후기">
                  <ChevronRight className="h-4 w-4 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">우리 기업도 성공 사례의 주인공이 될 수 있습니다</h2>
          <p className="mt-4 text-muted-foreground">무료 진단을 통해 어세스타 솔루션의 기대 효과를 확인하세요.</p>
          <Link
            href="/inquiry"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
          >
            무료 진단 시작하기
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  )
}
