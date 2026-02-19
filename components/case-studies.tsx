"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useInView } from "framer-motion"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Building2,
  Calendar,
} from "lucide-react"

const clients = [
  "Sam*** Electronics",
  "S** Hynix",
  "Hyu**** Motor",
  "L** Energy",
  "K*k*o",
  "N****",
  "Po****",
  "K* Telecom",
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

const consultingHistory = [
  {
    year: "2024 - 현재",
    projects: [
      "글로벌 반도체 기업 — AI 역량 모델링 및 ASTRA 플랫폼 구축",
      "대형 금융지주 — 그룹사 통합 리더십 역량 체계 재설계",
      "공공기관 — 디지털 전환 인재 역량 진단 프레임워크 개발",
    ],
  },
  {
    year: "2021 - 2023",
    projects: [
      "국내 Top 3 IT기업 — 애자일 조직 역량 모델링 및 평가 체계",
      "글로벌 자동차 그룹 — 해외법인 통합 역량 프레임워크 구축",
      "대형 유통그룹 — 직무별 핵심 역량 모델 및 평가센터(AC) 설계",
      "에너지 공기업 — ESG 경영 연계 리더십 역량 진단",
    ],
  },
  {
    year: "2018 - 2020",
    projects: [
      "국내 주요 통신사 — DT 인재상 수립 및 역량 평가 고도화",
      "글로벌 화학기업 — R&D 직군 전문 역량 체계 구축",
      "대형 건설사 — 프로젝트 리더 역량 모델링 및 AC 운영",
      "방산기업 — 핵심 기술인력 역량 진단 및 육성 로드맵",
    ],
  },
  {
    year: "2015 - 2017",
    projects: [
      "국내 대형 은행 — 전사 역량 모델 리뉴얼 및 평가 연계",
      "글로벌 철강기업 — 글로벌 리더 파이프라인 역량 체계",
      "대형 보험사 — 영업 직군 성과 예측 역량 모델 개발",
      "공공기관 — 고위공무원단 리더십 역량 진단 체계 설계",
    ],
  },
  {
    year: "2011 - 2014",
    projects: [
      "국내 Top 전자기업 — 글로벌 인재 선발 역량 평가 체계",
      "대형 석유화학 그룹 — 사업부별 역량 모델 및 승진 평가",
      "대형 항공사 — 서비스 직군 행동 역량 모델링",
      "국내 주요 대학 — 교직원 역량 진단 및 개발 체계 구축",
    ],
  },
  {
    year: "2005 - 2010",
    projects: [
      "국내 주요 그룹사 — 그룹 공통 리더십 역량 모델 최초 수립",
      "글로벌 제조기업 — 생산직 역량 기반 인사 체계 도입",
      "대형 통신사 — 역량 기반 채용 면접 구조화 프로젝트",
      "금융권 다수 — 역량 평가 제도 도입 및 평가자 양성",
    ],
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
      <section className="bg-neutral-950 py-12">
        <div className="mx-auto w-full px-6 lg:px-10 xl:px-[120px]">
          <div
            className="relative overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="animate-chip-marquee flex w-max items-center gap-4">
              {[...clients, ...clients].map((client, idx) => (
                <div key={`${client}-${idx}`} className="flex items-center gap-2 rounded-lg border border-white/10 bg-neutral-900 px-5 py-3">
                  <Building2 className="text-brand-primary-soft h-4 w-4" />
                  <span className="text-sm font-medium text-neutral-300">{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case study cards */}
      <section className="bg-neutral-950 py-16 lg:py-20">
        <div className="mx-auto w-full px-6 lg:px-10 xl:px-[120px]">
          <div className="space-y-8">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
                <div className="grid lg:grid-cols-3">
                  <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-neutral-300">{cs.industry}</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-neutral-300">{cs.employees}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white md:text-xl">{cs.company}</h3>
                    <div className="mt-5">
                      <p className="text-[10px] font-semibold tracking-widest text-red-300/80 uppercase">Problem</p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-300">{cs.problem}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-brand-primary-soft text-[10px] font-semibold tracking-widest uppercase">Solution</p>
                      <p className="mt-2 text-sm leading-relaxed text-white">{cs.solution}</p>
                    </div>
                  </div>
                  <div className="p-7 lg:col-span-2">
                    <p className="text-[10px] font-semibold tracking-widest text-neutral-400 uppercase">Results</p>
                    <div className="mt-6 grid gap-6 sm:grid-cols-3">
                      {cs.results.map((r) => (
                        <div key={r.metric} className="transition-transform duration-300 hover:scale-105">
                          <p className="text-xs text-neutral-400">{r.metric}</p>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-neutral-500">Before</span>
                              <span className="text-neutral-500">{r.before}{r.unit}</span>
                            </div>
                            <div className="mt-1 h-2.5 rounded-full bg-neutral-800">
                              <div className="h-full rounded-full bg-red-400/35" style={{ width: `${r.before}%` }} />
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-medium text-neutral-200">After</span>
                              <span className="text-brand-primary font-bold">{r.after}{r.unit}</span>
                            </div>
                            <div className="mt-1 h-2.5 rounded-full bg-neutral-800">
                              <div className="bg-brand-primary h-full rounded-full" style={{ width: `${r.after}%` }} />
                            </div>
                          </div>
                          <p className="text-brand-primary mt-2 text-sm font-bold">{r.improvement}</p>
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
      <section className="bg-neutral-950 py-16 lg:py-20">
        <div className="mx-auto w-full px-6 lg:px-10 xl:px-[120px]">
          <h3 className="text-center text-xl font-bold text-white md:text-2xl">전문가들의 평가</h3>
          <p className="mt-2 text-center text-sm text-neutral-400">
            전문성과 열정에 대한 고객 후기
          </p>

          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900 p-7 pb-20">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={testimonialIdx}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Quote className="text-brand-primary h-8 w-8 opacity-40" />
                    <p className="mt-4 text-base leading-relaxed text-neutral-200">{t.quote}</p>
                    <div className="mt-6 flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="text-brand-primary fill-current h-4 w-4" />
                      ))}
                    </div>
                    <div className="mt-3 border-t border-white/10 pt-4">
                      <p className="text-sm font-bold text-white">{t.author}</p>
                      <p className="text-xs text-neutral-400">{t.role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
                <button onClick={prevT} className="hover-border-brand-primary-soft flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-neutral-900 transition-colors" aria-label="이전 후기">
                  <ChevronLeft className="h-4 w-4 text-neutral-200" />
                </button>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <div key={i} className={`h-2 w-2 rounded-full transition-colors ${i === testimonialIdx ? "bg-brand-primary" : "bg-neutral-700"}`} />
                  ))}
                </div>
                <button onClick={nextT} className="hover-border-brand-primary-soft flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-neutral-900 transition-colors" aria-label="다음 후기">
                  <ChevronRight className="h-4 w-4 text-neutral-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting History Timeline */}
      <ConsultingTimeline />

      {/* CTA */}
      <section className="bg-neutral-950 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-xl font-bold text-white md:text-2xl">우리 기업도 프로젝트 사례의 주인공이 될 수 있습니다</h2>
          <p className="mt-4 text-neutral-300">무료 진단을 통해 어세스타 솔루션의 기대 효과를 확인하세요.</p>
          <Link
            href="/inquiry"
            className="btn-brand group mt-8 inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold transition-all"
          >
            무료 진단 시작하기
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Consulting Timeline                                                */
/* ------------------------------------------------------------------ */

function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof consultingHistory)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="relative flex gap-6 pb-10 last:pb-0 md:gap-10"
    >
      {/* Vertical line + dot */}
      <div className="relative flex flex-col items-center">
        <div className="bg-brand-primary z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
          <Calendar className="h-4 w-4 text-white" />
        </div>
        {index < consultingHistory.length - 1 && (
          <div className="absolute top-9 bottom-0 w-px bg-gradient-to-b from-blue-500/40 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        <p className="text-brand-primary text-sm font-bold tracking-wide">
          {entry.year}
        </p>
        <ul className="mt-3 space-y-2">
          {entry.projects.map((project, pIdx) => (
            <li
              key={pIdx}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-300"
            >
              <span className="bg-brand-primary mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full opacity-60" />
              {project}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function ConsultingTimeline() {
  return (
    <section className="bg-neutral-950 py-16 lg:py-24">
      <div className="mx-auto w-full px-6 lg:px-10 xl:px-[120px]">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-brand-primary text-xs font-semibold tracking-[0.22em] uppercase">
            Since 2005
          </p>
          <h3 className="mt-3 text-xl font-bold text-white md:text-2xl">
            20년간의 컨설팅 연혁
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
            어세스타는 2005년부터 국내외 주요 기업 및 기관과 함께
            역량 기반 HR 혁신을 이끌어왔습니다.
          </p>
        </div>

        {/* Summary chips */}
        <div className="mb-10 flex flex-wrap gap-3">
          {[
            { label: "누적 프로젝트", value: "500+" },
            { label: "파트너 기업/기관", value: "200+" },
            { label: "컨설팅 업력", value: "20년+" },
          ].map((chip) => (
            <div
              key={chip.label}
              className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-neutral-900 px-5 py-3"
            >
              <span className="text-brand-primary text-lg font-extrabold">
                {chip.value}
              </span>
              <span className="text-xs text-neutral-400">{chip.label}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-6 md:p-10">
          {consultingHistory.map((entry, idx) => (
            <TimelineEntry key={entry.year} entry={entry} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
