"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Building2,
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

const consultingTimeline = [
  {
    year: "현재",
    history: [
      "현재 컨설팅 사례 더미 텍스트 01",
      "현재 컨설팅 사례 더미 텍스트 02",
      "현재 컨설팅 사례 더미 텍스트 03",
      "현재 컨설팅 사례 더미 텍스트 04",
    ],
  },
  ...Array.from({ length: 21 }, (_, index) => {
    const year = 2025 - index
    return {
      year: `${year}년`,
      history: [
        `${year}년 컨설팅 사례 더미 텍스트 01`,
        `${year}년 컨설팅 사례 더미 텍스트 02`,
        `${year}년 컨설팅 사례 더미 텍스트 03`,
        `${year}년 컨설팅 사례 더미 텍스트 04`,
      ],
    }
  }),
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
        <div className="mx-auto w-full px-6 md:px-20 xl:px-[120px]">
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
        <div className="mx-auto w-full px-6 md:px-20 xl:px-[120px]">
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
        <div className="mx-auto w-full px-6 md:px-20 xl:px-[120px]">
          <h3 className="text-center text-xl font-bold text-white md:text-2xl">전문가들의 평가</h3>
          <p className="mt-2 text-center text-sm text-neutral-400">
            전문성과 열정에 대한 고객 후기
          </p>

          {/* Carousel with blurred side cards */}
          <div className="relative mt-10 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <div className="flex items-stretch justify-center gap-5">
                {/* Previous (left blurred card) */}
                <motion.div
                  key={`prev-${testimonialIdx}`}
                  className="hidden w-full max-w-sm shrink-0 select-none md:block"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div
                    className="h-full rounded-xl border border-white/[0.06] bg-neutral-900/60 p-7"
                    style={{ filter: "blur(2.5px)" }}
                    aria-hidden="true"
                  >
                    <TestimonialCardContent
                      testimonial={testimonials[(testimonialIdx - 1 + testimonials.length) % testimonials.length]}
                    />
                  </div>
                </motion.div>

                {/* Center (active card) */}
                <motion.div
                  key={`active-${testimonialIdx}`}
                  className="w-full max-w-sm shrink-0 md:max-w-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="h-full rounded-xl border border-white/10 bg-neutral-900 p-7 shadow-lg shadow-black/20">
                    <TestimonialCardContent testimonial={t} />
                  </div>
                </motion.div>

                {/* Next (right blurred card) */}
                <motion.div
                  key={`next-${testimonialIdx}`}
                  className="hidden w-full max-w-sm shrink-0 select-none md:block"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div
                    className="h-full rounded-xl border border-white/[0.06] bg-neutral-900/60 p-7"
                    style={{ filter: "blur(2.5px)" }}
                    aria-hidden="true"
                  >
                    <TestimonialCardContent
                      testimonial={testimonials[(testimonialIdx + 1) % testimonials.length]}
                    />
                  </div>
                </motion.div>
              </div>
            </AnimatePresence>

            {/* Left/right fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-neutral-950 to-transparent md:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-neutral-950 to-transparent md:block" />
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={prevT} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-neutral-900 transition-colors hover:border-white/40" aria-label="이전 후기">
              <ChevronLeft className="h-4 w-4 text-neutral-200" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${i === testimonialIdx ? "bg-brand-primary" : "bg-neutral-700 hover:bg-neutral-500"}`}
                  aria-label={`후기 ${i + 1}번`}
                />
              ))}
            </div>
            <button onClick={nextT} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-neutral-900 transition-colors hover:border-white/40" aria-label="다음 후기">
              <ChevronRight className="h-4 w-4 text-neutral-200" />
            </button>
          </div>
        </div>
      </section>

      {/* Consulting History Timeline */}
      <ConsultingTimeline />

      {/* CTA */}
      <section className="bg-neutral-950 pt-16 pb-28 md:pb-36">
        <div id="cases-cta-anchor" className="mx-auto max-w-3xl px-6 text-center lg:px-10 xl:px-[120px]">
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
/*  Testimonial Card Content                                           */
/* ------------------------------------------------------------------ */

function TestimonialCardContent({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number]
}) {
  return (
    <>
      <Quote className="text-brand-primary h-8 w-8 opacity-40" />
      <p className="mt-4 text-base leading-relaxed text-neutral-200">
        {testimonial.quote}
      </p>
      <div className="mt-6 flex items-center gap-1">
        {[...Array(5)].map((_, j) => (
          <Star
            key={j}
            className="text-brand-primary fill-current h-4 w-4"
          />
        ))}
      </div>
      <div className="mt-3 border-t border-white/10 pt-4">
        <p className="text-sm font-bold text-white">{testimonial.author}</p>
        <p className="text-xs text-neutral-400">{testimonial.role}</p>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Consulting Timeline                                                */
/* ------------------------------------------------------------------ */

function ConsultingTimeline() {
  const [activeYear, setActiveYear] = useState<string | null>(null)
  const [edgePad, setEdgePad] = useState(0)
  const [lineRange, setLineRange] = useState({ start: 84, end: 84 })
  const railRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const anchorViewportXRef = useRef<number | null>(null)
  const activeIndex = activeYear ? consultingTimeline.findIndex((entry) => entry.year === activeYear) : -1
  const hintIndex = activeIndex >= 0 && activeIndex < consultingTimeline.length - 1 ? activeIndex + 1 : 1
  const resolveAnchorViewportX = () => {
    const rail = railRef.current
    if (!rail) return 0

    const ctaAnchor = document.getElementById("cases-cta-anchor")
    if (ctaAnchor) {
      const railRect = rail.getBoundingClientRect()
      const ctaRect = ctaAnchor.getBoundingClientRect()
      const anchorFromCtaCenter = ctaRect.left + ctaRect.width / 2 - railRect.left
      return Math.min(Math.max(0, anchorFromCtaCenter), rail.clientWidth)
    }

    const firstItem = itemRefs.current[0]
    if (firstItem) {
      return firstItem.offsetLeft - rail.scrollLeft + firstItem.clientWidth / 2
    }

    return rail.clientWidth / 2
  }

  const alignTimelineItemToAnchor = (index: number, behavior: ScrollBehavior = "smooth") => {
    const rail = railRef.current
    const item = itemRefs.current[index]
    if (!rail || !item) return
    const fallbackAnchor = rail.clientWidth / 2
    const anchorViewportX = anchorViewportXRef.current ?? fallbackAnchor
    const target = item.offsetLeft + item.clientWidth / 2 - anchorViewportX
    const max = rail.scrollWidth - rail.clientWidth
    rail.scrollTo({
      left: Math.min(Math.max(0, target), Math.max(0, max)),
      behavior,
    })
  }

  const updateLineRange = () => {
    const startItem = itemRefs.current[0]
    const lastItem = itemRefs.current[consultingTimeline.length - 1]
    if (!startItem || !lastItem) return

    const start = startItem.offsetLeft + startItem.clientWidth / 2
    const end = lastItem.offsetLeft + lastItem.clientWidth / 2
    setLineRange({ start, end })
  }

  useEffect(() => {
    const updateEdgePadding = () => {
      const rail = railRef.current
      const firstItem = itemRefs.current[0]
      if (!rail || !firstItem) return
      const computed = Math.max(0, rail.clientWidth / 2 - firstItem.clientWidth / 2)
      setEdgePad(computed)
      requestAnimationFrame(updateLineRange)
    }

    updateEdgePadding()
    window.addEventListener("resize", updateEdgePadding)
    return () => window.removeEventListener("resize", updateEdgePadding)
  }, [])

  useEffect(() => {
    if (edgePad <= 0) return
    requestAnimationFrame(() => {
      anchorViewportXRef.current = resolveAnchorViewportX()
      alignTimelineItemToAnchor(0, "auto")
      updateLineRange()
    })
  }, [edgePad])

  useEffect(() => {
    if (!activeYear) return
    const index = consultingTimeline.findIndex((entry) => entry.year === activeYear)
    if (index < 0) return
    const rafId = requestAnimationFrame(() => {
      anchorViewportXRef.current = resolveAnchorViewportX()
      alignTimelineItemToAnchor(index, "smooth")
      updateLineRange()
    })
    return () => cancelAnimationFrame(rafId)
  }, [activeYear])

  return (
    <section className="bg-neutral-950 py-16 lg:py-24">
      <div className="mx-auto w-full px-6 md:px-20 xl:px-[120px]">
        <div className="mb-14 md:mb-16">
          <p className="text-brand-primary text-xs font-semibold tracking-[0.22em] uppercase">
            Since 2005
          </p>
          <h3 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            20년간의 컨설팅 연혁
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
            어세스타는 2005년부터 국내외 주요 기업 및 기관과 함께 역량 기반 HR 혁신을 이끌어왔습니다.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full pb-16 md:pb-20 md:pl-[72px] lg:pl-[86px]"
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-3 bg-gradient-to-r from-neutral-950 to-transparent md:w-6" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-6 bg-gradient-to-l from-neutral-950 to-transparent md:w-10" />

            <div ref={railRef} className="overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <ul
                style={{ paddingLeft: edgePad, paddingRight: edgePad }}
                className="relative grid min-w-max grid-flow-col auto-cols-[168px] gap-2 md:auto-cols-[176px] lg:auto-cols-[184px] lg:gap-3"
              >
                <span
                  className="pointer-events-none absolute top-[74px] z-0 h-[2px] bg-gradient-to-r from-[#5f7394] via-[#4a5b76] to-[#36445d]"
                  style={{
                    left: lineRange.start,
                    width: Math.max(0, lineRange.end - lineRange.start),
                  }}
                />
                {consultingTimeline.map((entry, index) => {
                  const isActive = activeYear === entry.year
                  const isHint = index === hintIndex

                  return (
                    <li
                      key={entry.year}
                      ref={(node) => {
                        itemRefs.current[index] = node
                      }}
                      className="relative z-10 flex flex-col items-center text-center"
                    >
                      <div className="group flex w-full flex-col items-center text-center">
                        <span
                          className={`text-xl font-semibold leading-none tracking-tight transition-colors duration-200 md:text-2xl ${
                            isActive ? "text-white" : "text-[#4a5870] group-hover:text-[#7c8aa2]"
                          }`}
                        >
                          {entry.year}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveYear(entry.year)
                            alignTimelineItemToAnchor(index, "smooth")
                          }}
                          aria-pressed={isActive}
                          className={`relative mt-8 h-6 w-6 rounded-full transition-all duration-200 ${
                            isActive ? "border-[4px] border-white bg-[#0d1320]" : "border border-[#5b6d89] bg-[#0d1320]"
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              key={`ring-${activeYear}`}
                              initial={{ scale: 0.35, opacity: 0.95 }}
                              animate={{ scale: 2.25, opacity: 0 }}
                              transition={{ duration: 0.55, ease: "easeOut" }}
                              className="pointer-events-none absolute inset-0 rounded-full border-[4px] border-white"
                            />
                          )}
                          {isActive ? (
                            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d1320]" />
                          ) : (
                            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#617595]" />
                          )}
                          {!isActive && isHint && (
                            <motion.span
                              key={`hint-${entry.year}`}
                              initial={{ scale: 0.55, opacity: 0.75 }}
                              animate={{ scale: [0.55, 1.85, 1.85], opacity: [0.75, 0, 0] }}
                              transition={{ duration: 1.25, ease: "easeOut", repeat: Infinity, repeatDelay: 0.3 }}
                              className="pointer-events-none absolute inset-0 rounded-full border-[3px] border-white"
                            />
                          )}
                        </button>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.ul
                              key={`details-${entry.year}`}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.28, ease: "easeOut" }}
                              className="mt-5 min-w-max space-y-2 text-center"
                            >
                              {entry.history.map((item, idx) => (
                                <li key={`${entry.year}-${idx}`} className="flex items-start gap-2">
                                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/85" />
                                  <p className="text-base leading-relaxed text-white">{item}</p>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
