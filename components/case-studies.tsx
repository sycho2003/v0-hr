"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
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
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const [isTestimonialAnimating, setIsTestimonialAnimating] = useState(false)
  const totalTestimonials = testimonials.length
  const testimonialCardSize = 336
  const testimonialCardGap = 24
  const testimonialStep = testimonialCardSize + testimonialCardGap
  const testimonialCenterX = 0
  const testimonialTrackControls = useAnimationControls()
  const activeTestimonialIndexRef = useRef(0)
  const targetTestimonialIndexRef = useRef<number | null>(null)
  const testimonialFlushRef = useRef(false)

  const wrapIndex = (index: number) =>
    (index + totalTestimonials) % totalTestimonials

  const resolveDirectionToTarget = (from: number, to: number): 1 | -1 | 0 => {
    if (from === to) return 0
    const forwardSteps = (to - from + totalTestimonials) % totalTestimonials
    const backwardSteps = (from - to + totalTestimonials) % totalTestimonials
    return forwardSteps <= backwardSteps ? 1 : -1
  }

  const animateTestimonialStep = async (direction: 1 | -1) => {
    setIsTestimonialAnimating(true)
    await testimonialTrackControls.start({
      x: direction > 0 ? -testimonialStep : testimonialStep,
      transition: { duration: 0.62, ease: [0.22, 0.61, 0.36, 1] },
    })
    const next = wrapIndex(activeTestimonialIndexRef.current + direction)
    activeTestimonialIndexRef.current = next
    setActiveTestimonialIndex(next)
    testimonialTrackControls.set({ x: testimonialCenterX })
  }

  const flushTestimonialQueue = async () => {
    if (testimonialFlushRef.current) return
    testimonialFlushRef.current = true
    try {
      while (targetTestimonialIndexRef.current !== null) {
        const target = targetTestimonialIndexRef.current
        if (target === activeTestimonialIndexRef.current) {
          targetTestimonialIndexRef.current = null
          break
        }
        const direction = resolveDirectionToTarget(activeTestimonialIndexRef.current, target)
        if (direction === 0) {
          targetTestimonialIndexRef.current = null
          break
        }
        await animateTestimonialStep(direction)
      }
    } finally {
      testimonialFlushRef.current = false
      setIsTestimonialAnimating(false)
    }
  }

  const requestTestimonialMove = (targetIndex: number) => {
    const wrappedTarget = wrapIndex(targetIndex)
    if (wrappedTarget === activeTestimonialIndexRef.current) return
    targetTestimonialIndexRef.current = wrappedTarget
    void flushTestimonialQueue()
  }

  const nextT = () => requestTestimonialMove(activeTestimonialIndexRef.current + 1)

  const prevT = () => requestTestimonialMove(activeTestimonialIndexRef.current - 1)

  const jumpToTestimonial = (index: number) => {
    if (index === activeTestimonialIndexRef.current) return
    requestTestimonialMove(index)
  }

  useEffect(() => {
    activeTestimonialIndexRef.current = activeTestimonialIndex
  }, [activeTestimonialIndex])

  useEffect(() => {
    testimonialTrackControls.set({ x: testimonialCenterX })
  }, [testimonialCenterX, testimonialTrackControls])

  const renderTestimonialTrack = (centerIndex: number) => {
    const prev2Index = wrapIndex(centerIndex - 2)
    const prevIndex = wrapIndex(centerIndex - 1)
    const nextIndex = wrapIndex(centerIndex + 1)
    const next2Index = wrapIndex(centerIndex + 2)
    return (
      <>
        {/* Previous-2 (left outer blurred buffer card) */}
        <div className="hidden w-[336px] shrink-0 select-none md:block">
          <div
            className="h-full min-h-[336px] w-[336px] rounded-2xl border border-white/10 bg-neutral-900 p-8"
            style={{ filter: "blur(2.2px)", opacity: 0.72 }}
            aria-hidden="true"
          >
            <TestimonialCardContent testimonial={testimonials[prev2Index]} />
          </div>
        </div>

        {/* Previous (left blurred card) */}
        <div className="hidden w-[336px] shrink-0 select-none md:block">
          <div
            className="h-full min-h-[336px] w-[336px] rounded-2xl border border-white/10 bg-neutral-900 p-8"
            style={{ filter: "blur(1.45px)", opacity: 0.84 }}
            aria-hidden="true"
          >
            <TestimonialCardContent testimonial={testimonials[prevIndex]} />
          </div>
        </div>

        {/* Center (active card) */}
        <div className="w-[min(336px,88vw)] shrink-0 md:w-[336px]">
          <div className="h-full min-h-[336px] w-full rounded-2xl border border-white/10 bg-neutral-900 p-8">
            <TestimonialCardContent testimonial={testimonials[centerIndex]} />
          </div>
        </div>

        {/* Next (right blurred card) */}
        <div className="hidden w-[336px] shrink-0 select-none md:block">
          <div
            className="h-full min-h-[336px] w-[336px] rounded-2xl border border-white/10 bg-neutral-900 p-8"
            style={{ filter: "blur(1.45px)", opacity: 0.84 }}
            aria-hidden="true"
          >
            <TestimonialCardContent testimonial={testimonials[nextIndex]} />
          </div>
        </div>

        {/* Next-2 (right outer blurred buffer card) */}
        <div className="hidden w-[336px] shrink-0 select-none md:block">
          <div
            className="h-full min-h-[336px] w-[336px] rounded-2xl border border-white/10 bg-neutral-900 p-8"
            style={{ filter: "blur(2.2px)", opacity: 0.72 }}
            aria-hidden="true"
          >
            <TestimonialCardContent testimonial={testimonials[next2Index]} />
          </div>
        </div>
      </>
    )
  }

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
          <h3 className="text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">전문가들의 평가</h3>
          <p className="mt-3 text-center text-xs text-neutral-400 md:text-sm">
            전문성과 열정에 대한 고객 후기
          </p>

          {/* Carousel with blurred side cards */}
          <div className="relative mt-12 overflow-hidden">
            <div className="relative h-[336px]">
              <motion.div
                animate={testimonialTrackControls}
                className="absolute inset-0 will-change-transform flex items-stretch justify-center gap-6"
              >
                {renderTestimonialTrack(activeTestimonialIndex)}
              </motion.div>
            </div>

            {/* Left/right fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r from-neutral-950 to-transparent md:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-20 bg-gradient-to-l from-neutral-950 to-transparent md:block" />
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <button onClick={prevT} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-neutral-900 transition-all duration-300 hover:border-white/40 hover:bg-neutral-800" aria-label="이전 후기">
              <ChevronLeft className="h-4 w-4 text-neutral-200" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpToTestimonial(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${i === activeTestimonialIndex ? "bg-brand-primary" : "bg-neutral-700 hover:bg-neutral-500"}`}
                  aria-label={`후기 ${i + 1}번`}
                />
              ))}
            </div>
            <button onClick={nextT} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-neutral-900 transition-all duration-300 hover:border-white/40 hover:bg-neutral-800" aria-label="다음 후기">
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
  const [activeYear, setActiveYear] = useState<string>(consultingTimeline[0].year)
  const [edgePad, setEdgePad] = useState(0)
  const [lineRange, setLineRange] = useState({ start: 84, end: 84 })
  const [snappedIndex, setSnappedIndex] = useState(-1)
  const railRef = useRef<HTMLDivElement>(null)
  const railListRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const stampRefs = useRef<Array<HTMLButtonElement | null>>([])
  const anchorViewportXRef = useRef<number | null>(null)
  const wheelStepConsumedRef = useRef(false)
  const wheelGestureResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasInitializedRef = useRef(false)
  const activeIndex = consultingTimeline.findIndex((entry) => entry.year === activeYear)
  const activeIndexRef = useRef(activeIndex)
  const snappedIndexRef = useRef(-1)
  const landingCenterIndex = consultingTimeline.findIndex((entry) => entry.year === "2024년")
  const resolveLandingIndex = () => (landingCenterIndex >= 0 ? landingCenterIndex : 0)
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
    const clampedTarget = Math.min(Math.max(0, target), Math.max(0, max))

    rail.scrollTo({
      left: clampedTarget,
      behavior,
    })
  }

  const alignByIndex = (index: number, behavior: ScrollBehavior) => {
    if (index < 0) return
    anchorViewportXRef.current = resolveAnchorViewportX()
    snappedIndexRef.current = index
    setSnappedIndex(index)
    alignTimelineItemToAnchor(index, behavior)
  }

  const resolveCurrentIndex = () => {
    if (activeIndexRef.current >= 0) return activeIndexRef.current
    if (snappedIndexRef.current >= 0) return snappedIndexRef.current
    return resolveLandingIndex()
  }

  const alignToIndexRespectLanding = (index: number, behavior: ScrollBehavior = "smooth") => {
    if (index < 0 || index >= consultingTimeline.length) return
    const landingIndex = resolveLandingIndex()
    // Allow selecting "현재/2025년", while keeping landing rail position.
    setActiveYear(consultingTimeline[index].year)
    if (index < landingIndex) {
      alignByIndex(landingIndex, behavior)
      return
    }
    alignByIndex(index, behavior)
  }

  const alignByStep = (direction: -1 | 1, behavior: ScrollBehavior = "smooth") => {
    const baseIndex = resolveCurrentIndex()
    const nextIndex = Math.min(
      consultingTimeline.length - 1,
      Math.max(0, baseIndex + direction),
    )
    if (nextIndex === baseIndex) return
    alignToIndexRespectLanding(nextIndex, behavior)
  }

  const updateLineRange = () => {
    const railList = railListRef.current
    const startStamp = stampRefs.current[0]
    const endStamp = stampRefs.current[consultingTimeline.length - 1]
    if (!railList || !startStamp || !endStamp) return

    // Align the rail line strictly to the center point of the first and last stamps.
    const railListRect = railList.getBoundingClientRect()
    const startRect = startStamp.getBoundingClientRect()
    const endRect = endStamp.getBoundingClientRect()
    const start = startRect.left - railListRect.left + startRect.width / 2
    const end = endRect.left - railListRect.left + endRect.width / 2
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
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    snappedIndexRef.current = snappedIndex
  }, [snappedIndex])

  useEffect(() => {
    if (edgePad <= 0) return
    requestAnimationFrame(() => {
      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true
        alignByIndex(resolveLandingIndex(), "auto")
        return
      }
      alignByIndex(resolveCurrentIndex(), "auto")
    })
  }, [edgePad])

  useEffect(() => {
    const rail = railRef.current
    if (!rail || edgePad <= 0) return

    const resetWheelGesture = () => {
      wheelStepConsumedRef.current = false
      if (wheelGestureResetTimerRef.current) {
        clearTimeout(wheelGestureResetTimerRef.current)
        wheelGestureResetTimerRef.current = null
      }
    }

    const armWheelGestureReset = () => {
      if (wheelGestureResetTimerRef.current) {
        clearTimeout(wheelGestureResetTimerRef.current)
      }
      wheelGestureResetTimerRef.current = setTimeout(() => {
        wheelStepConsumedRef.current = false
        wheelGestureResetTimerRef.current = null
      }, 140)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const unit =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? rail.clientHeight
            : 1
      // Use vertical wheel intent only; trackpad horizontal jitter can flip direction.
      const dominantDelta = event.deltaY * unit
      if (Math.abs(dominantDelta) < 5) return
      armWheelGestureReset()
      if (wheelStepConsumedRef.current) return
      wheelStepConsumedRef.current = true
      alignByStep(dominantDelta > 0 ? 1 : -1, "auto")
    }

    rail.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      rail.removeEventListener("wheel", handleWheel)
      resetWheelGesture()
    }
  }, [edgePad])

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
          className="w-full pb-16 md:pb-20"
        >
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-[128px] w-[60px] bg-gradient-to-r from-neutral-950 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-[128px] w-[60px] bg-gradient-to-l from-neutral-950 to-transparent" />

            <div ref={railRef} className="touch-pan-y overflow-x-hidden pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <ul
                ref={railListRef}
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
                  const isSnapped = index === snappedIndex

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
                            isActive
                              ? "text-white"
                              : isSnapped
                                ? "text-[#7c8aa2]"
                                : "text-[#4a5870] group-hover:text-[#7c8aa2]"
                          }`}
                        >
                          {entry.year}
                        </span>

                        <button
                          type="button"
                          ref={(node) => {
                            stampRefs.current[index] = node
                          }}
                          onClick={() => {
                            alignToIndexRespectLanding(index, "smooth")
                          }}
                          aria-pressed={isActive}
                          className={`relative mt-8 h-6 w-6 rounded-full transition-all duration-200 ${
                            isActive
                              ? "border-[4px] border-white bg-[#0d1320]"
                              : isSnapped
                                ? "border border-[#8aa0c4] bg-[#13203a]"
                                : "border border-[#5b6d89] bg-[#0d1320]"
                          }`}
                        >
                          {isActive ? (
                            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d1320]" />
                          ) : (
                            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#617595]" />
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
