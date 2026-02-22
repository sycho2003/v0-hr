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
import {
  caseStudies,
  clients,
  consultingTimeline,
  testimonials,
} from "@/content/cases"

const readCssVarNumber = (name: string, fallback: number) => {
  if (typeof window === "undefined") return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!raw) return fallback
  const parsed = Number.parseFloat(raw.replace("px", ""))
  return Number.isFinite(parsed) ? parsed : fallback
}

export function CaseStudies() {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const [isTestimonialAnimating, setIsTestimonialAnimating] = useState(false)
  const totalTestimonials = testimonials.length
  const testimonialCardSize = readCssVarNumber("--ds-cases-card-size", 336)
  const testimonialCardGap = readCssVarNumber("--ds-cases-card-gap", 24)
  const testimonialStep = testimonialCardSize + testimonialCardGap
  const testimonialCenterX = 0
  const testimonialMotionDuration =
    readCssVarNumber("--ds-motion-carousel-step-ms", 620) / 1000
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
      transition: { duration: testimonialMotionDuration, ease: [0.22, 0.61, 0.36, 1] },
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
        <div className="hidden shrink-0 select-none md:block" style={{ width: testimonialCardSize }}>
          <div
            className="h-full rounded-2xl border border-white/10 bg-neutral-900 p-8"
            style={{ minHeight: testimonialCardSize, width: testimonialCardSize, filter: "blur(2.2px)", opacity: 0.72 }}
            aria-hidden="true"
          >
            <TestimonialCardContent testimonial={testimonials[prev2Index]} />
          </div>
        </div>

        {/* Previous (left blurred card) */}
        <div className="hidden shrink-0 select-none md:block" style={{ width: testimonialCardSize }}>
          <div
            className="h-full rounded-2xl border border-white/10 bg-neutral-900 p-8"
            style={{ minHeight: testimonialCardSize, width: testimonialCardSize, filter: "blur(1.45px)", opacity: 0.84 }}
            aria-hidden="true"
          >
            <TestimonialCardContent testimonial={testimonials[prevIndex]} />
          </div>
        </div>

        {/* Center (active card) */}
        <div className="w-[min(336px,88vw)] shrink-0 md:w-[336px]" style={{ width: `min(${testimonialCardSize}px, 88vw)` }}>
          <div className="h-full w-full rounded-2xl border border-white/10 bg-neutral-900 p-8" style={{ minHeight: testimonialCardSize }}>
            <TestimonialCardContent testimonial={testimonials[centerIndex]} />
          </div>
        </div>

        {/* Next (right blurred card) */}
        <div className="hidden shrink-0 select-none md:block" style={{ width: testimonialCardSize }}>
          <div
            className="h-full rounded-2xl border border-white/10 bg-neutral-900 p-8"
            style={{ minHeight: testimonialCardSize, width: testimonialCardSize, filter: "blur(1.45px)", opacity: 0.84 }}
            aria-hidden="true"
          >
            <TestimonialCardContent testimonial={testimonials[nextIndex]} />
          </div>
        </div>

        {/* Next-2 (right outer blurred buffer card) */}
        <div className="hidden shrink-0 select-none md:block" style={{ width: testimonialCardSize }}>
          <div
            className="h-full rounded-2xl border border-white/10 bg-neutral-900 p-8"
            style={{ minHeight: testimonialCardSize, width: testimonialCardSize, filter: "blur(2.2px)", opacity: 0.72 }}
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
            <div className="relative" style={{ height: testimonialCardSize }}>
              <motion.div
                animate={testimonialTrackControls}
                className="absolute inset-0 will-change-transform flex items-stretch justify-center gap-6"
              >
                {renderTestimonialTrack(activeTestimonialIndex)}
              </motion.div>
            </div>

            {/* Left/right fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[var(--ds-cases-side-fade-width)] bg-gradient-to-r from-neutral-950 to-transparent md:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[var(--ds-cases-side-fade-width)] bg-gradient-to-l from-neutral-950 to-transparent md:block" />
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
  const timelineDetailMotionDuration =
    readCssVarNumber("--ds-motion-timeline-detail-ms", 280) / 1000
  const wheelThreshold = readCssVarNumber("--ds-cases-wheel-threshold", 5)
  const wheelGestureResetMs = readCssVarNumber("--ds-cases-wheel-gesture-reset-ms", 140)
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
      }, wheelGestureResetMs)
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
      if (Math.abs(dominantDelta) < wheelThreshold) return
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
          <p className="ds-eyebrow text-brand-primary text-xs font-semibold tracking-[0.22em] uppercase">
            Since 2005
          </p>
          <h3 className="title-group__heading mt-3 text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            20년간의 컨설팅 연혁
          </h3>
          <p className="title-group__subtitle mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
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
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-[var(--ds-cases-timeline-mask-height)] w-[var(--ds-cases-timeline-mask-width)] bg-gradient-to-r from-neutral-950 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-[var(--ds-cases-timeline-mask-height)] w-[var(--ds-cases-timeline-mask-width)] bg-gradient-to-l from-neutral-950 to-transparent" />

            <div ref={railRef} className="touch-pan-y overflow-x-hidden pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <ul
                ref={railListRef}
                style={{ paddingLeft: edgePad, paddingRight: edgePad }}
                className="relative grid min-w-max grid-flow-col auto-cols-[var(--ds-cases-timeline-col-sm)] gap-2 md:auto-cols-[var(--ds-cases-timeline-col-md)] lg:auto-cols-[var(--ds-cases-timeline-col-lg)] lg:gap-3"
              >
                <span
                  className="pointer-events-none absolute top-[var(--ds-cases-timeline-line-top)] z-0 h-[2px] bg-gradient-to-r from-[#5f7394] via-[#4a5b76] to-[#36445d]"
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
                              transition={{ duration: timelineDetailMotionDuration, ease: "easeOut" }}
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
