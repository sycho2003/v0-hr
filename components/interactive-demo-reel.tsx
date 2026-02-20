'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, animate, useMotionValue } from 'framer-motion'
import {
  BarChart3, Users, TrendingUp, Brain, Search, Bell, Settings,
  ChevronRight, Play, ArrowRight, CheckCircle2, Activity, Zap,
  FileText, PieChart, MousePointer2,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */
function useAnimatedCounter(target: number, duration = 1.2) {
  const [display, setDisplay] = useState(0)
  const prev = useRef(target)

  useEffect(() => {
    const ctrl = animate(prev.current, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    prev.current = target
    return () => ctrl.stop()
  }, [target, duration])

  return display
}

/* ------------------------------------------------------------------ */
/*  Cycling data sets (rotate every 3 s)                               */
/* ------------------------------------------------------------------ */
const dataSets = [
  { accuracy: 94.2, candidates: 12340, trend: 18.7, barHeights: [45, 72, 58, 85, 63, 90, 78] },
  { accuracy: 96.8, candidates: 14520, trend: 22.1, barHeights: [55, 65, 80, 70, 88, 60, 95] },
  { accuracy: 91.5, candidates: 10890, trend: 15.3, barHeights: [38, 82, 48, 92, 55, 75, 68] },
]

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/* ------------------------------------------------------------------ */
/*  Cursor path keyframes (% based positions inside the container)     */
/* ------------------------------------------------------------------ */
const cursorPath = [
  { x: 15, y: 12, action: null as string | null, delay: 0.8 },
  { x: 72, y: 8, action: null, delay: 0.6 },
  { x: 85, y: 8, action: 'click-bell', delay: 1.0 },
  { x: 30, y: 28, action: null, delay: 0.6 },
  { x: 50, y: 44, action: 'hover-analyze', delay: 1.2 },
  { x: 50, y: 44, action: 'click-analyze', delay: 0.8 },
  { x: 25, y: 62, action: null, delay: 0.6 },
  { x: 65, y: 72, action: 'hover-detail', delay: 1.0 },
  { x: 65, y: 72, action: 'click-detail', delay: 0.8 },
  { x: 45, y: 88, action: null, delay: 0.6 },
  { x: 20, y: 95, action: null, delay: 0.5 },
  { x: 15, y: 12, action: null, delay: 1.0 },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function InteractiveDemoReel() {
  const [dataIdx, setDataIdx] = useState(0)
  const [cursorStep, setCursorStep] = useState(0)
  const [clickedElements, setClickedElements] = useState<Set<string>>(new Set())
  const [hoveredElements, setHoveredElements] = useState<Set<string>>(new Set())
  const scrollY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const data = dataSets[dataIdx]
  const dispAccuracy = useAnimatedCounter(data.accuracy * 10, 1.0) / 10
  const dispCandidates = useAnimatedCounter(data.candidates, 1.2)
  const dispTrend = useAnimatedCounter(data.trend * 10, 1.0) / 10

  /* cycle data every 3 seconds */
  useEffect(() => {
    const id = setInterval(() => setDataIdx((i) => (i + 1) % dataSets.length), 3000)
    return () => clearInterval(id)
  }, [])

  /* auto-scroll: scroll down then back up in a loop */
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        await new Promise<void>((resolve) => {
          const ctrl = animate(scrollY, -1200, {
            duration: 10,
            ease: 'easeInOut',
            onComplete: resolve,
          })
          if (cancelled) ctrl.stop()
        })
        if (cancelled) break
        await new Promise((r) => setTimeout(r, 1500))
        if (cancelled) break
        await new Promise<void>((resolve) => {
          const ctrl = animate(scrollY, 0, {
            duration: 8,
            ease: 'easeInOut',
            onComplete: resolve,
          })
          if (cancelled) ctrl.stop()
        })
        if (cancelled) break
        await new Promise((r) => setTimeout(r, 1500))
      }
    }
    run()
    return () => { cancelled = true }
  }, [scrollY])

  /* cursor movement loop */
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      let step = 0
      while (!cancelled) {
        setCursorStep(step)
        const kf = cursorPath[step]

        if (kf.action?.startsWith('hover-')) {
          setHoveredElements((s) => new Set(s).add(kf.action!.replace('hover-', '')))
        } else if (kf.action?.startsWith('click-')) {
          const el = kf.action.replace('click-', '')
          setClickedElements((s) => new Set(s).add(el))
          setTimeout(() => {
            setClickedElements((s) => {
              const next = new Set(s)
              next.delete(el)
              return next
            })
            setHoveredElements((s) => {
              const next = new Set(s)
              next.delete(el)
              return next
            })
          }, 600)
        }

        await new Promise((r) => setTimeout(r, kf.delay * 1000))
        if (cancelled) break
        step = (step + 1) % cursorPath.length
      }
    }
    run()
    return () => { cancelled = true }
  }, [])

  const isHovered = useCallback((id: string) => hoveredElements.has(id), [hoveredElements])
  const isClicked = useCallback((id: string) => clickedElements.has(id), [clickedElements])

  return (
    <div className="relative h-[22rem] overflow-hidden rounded-xl border border-white/10 bg-[#050914] md:h-[26rem] lg:h-[32rem]">
      {/* MacOS chrome */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-8 items-center justify-between border-b border-white/10 bg-black/60 px-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex h-5 items-center rounded bg-white/[0.06] px-2">
            <span className="text-[9px] text-neutral-400">astra.assesta.com/dashboard</span>
          </div>
        </div>
        <p className="font-mono text-[10px] text-slate-400">LIVE DEMO</p>
      </div>

      {/* Scrollable content area */}
      <div ref={containerRef} className="absolute inset-0 top-8 overflow-hidden">
        <motion.div style={{ y: scrollY }} className="relative w-full">

          {/* ---- NAV BAR ---- */}
          <div className="flex h-12 items-center justify-between border-b border-white/[0.06] bg-[#0a0f1e] px-5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[rgb(37_99_235)] text-[10px] font-bold text-white">A</div>
              <span className="text-xs font-semibold text-white">ASTRA</span>
            </div>
            <div className="flex items-center gap-3">
              <Search className="h-3.5 w-3.5 text-neutral-500" />
              <motion.div
                animate={isClicked('bell') ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Bell className={`h-3.5 w-3.5 transition-colors ${isHovered('bell') || isClicked('bell') ? 'text-[rgb(59_130_246)]' : 'text-neutral-500'}`} />
              </motion.div>
              <Settings className="h-3.5 w-3.5 text-neutral-500" />
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
            </div>
          </div>

          {/* ---- HERO BANNER ---- */}
          <div className="mx-4 mt-4 rounded-xl bg-gradient-to-r from-[rgb(37_99_235)] to-[rgb(99_102_241)] p-5">
            <p className="text-[10px] font-medium uppercase tracking-wider text-blue-200">Competency Prediction Platform</p>
            <p className="mt-1 text-sm font-bold text-white">AI 기반 역량 예측 대시보드</p>
            <p className="mt-1 text-[10px] text-blue-100/70">실시간 데이터 분석으로 채용 정확도를 높이세요</p>
          </div>

          {/* ---- STAT CARDS ---- */}
          <div className="mx-4 mt-4 grid grid-cols-3 gap-3">
            {/* Accuracy */}
            <div className="rounded-lg border border-white/[0.06] bg-[#0d1424] p-3">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-[rgb(59_130_246/0.15)]">
                  <BarChart3 className="h-3 w-3 text-[rgb(59_130_246)]" />
                </div>
                <span className="text-[9px] text-neutral-500">Prediction Accuracy</span>
              </div>
              <p className="mt-2 text-lg font-bold text-white">{dispAccuracy.toFixed(1)}%</p>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-[rgb(59_130_246)]"
                  animate={{ width: `${data.accuracy}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Candidates */}
            <div className="rounded-lg border border-white/[0.06] bg-[#0d1424] p-3">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-[rgb(59_130_246/0.15)]">
                  <Users className="h-3 w-3 text-[rgb(59_130_246)]" />
                </div>
                <span className="text-[9px] text-neutral-500">Total Candidates</span>
              </div>
              <p className="mt-2 text-lg font-bold text-white">{dispCandidates.toLocaleString()}</p>
              <p className="mt-1 text-[9px] text-[rgb(96_165_250)]">+2,340 this month</p>
            </div>

            {/* Trend */}
            <div className="rounded-lg border border-white/[0.06] bg-[#0d1424] p-3">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-[rgb(59_130_246/0.15)]">
                  <TrendingUp className="h-3 w-3 text-[rgb(59_130_246)]" />
                </div>
                <span className="text-[9px] text-neutral-500">Growth Trend</span>
              </div>
              <p className="mt-2 text-lg font-bold text-white">+{dispTrend.toFixed(1)}%</p>
              <p className="mt-1 text-[9px] text-[rgb(96_165_250)]">vs. last quarter</p>
            </div>
          </div>

          {/* ---- WEEKLY CHART ---- */}
          <div className="mx-4 mt-4 rounded-lg border border-white/[0.06] bg-[#0d1424] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold text-white">Weekly Analysis Overview</p>
              <span className="rounded bg-[rgb(59_130_246/0.12)] px-2 py-0.5 text-[9px] font-medium text-[rgb(59_130_246)]">Live</span>
            </div>
            <div className="mt-3 flex items-end gap-2">
              {data.barHeights.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <motion.div
                    className="w-full rounded-t bg-gradient-to-t from-[rgb(37_99_235)] to-[rgb(96_165_250)]"
                    animate={{ height: `${h}px` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
                  />
                  <span className="text-[8px] text-neutral-600">{weekLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- ANALYZE BUTTON ---- */}
          <div className="mx-4 mt-4 flex items-center justify-center">
            <motion.button
              type="button"
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-xs font-semibold text-white transition-all ${
                isHovered('analyze') || isClicked('analyze')
                  ? 'bg-[rgb(37_99_235)] shadow-[0_0_24px_rgba(59,130,246,0.4)]'
                  : 'bg-[rgb(37_99_235/0.8)]'
              }`}
              animate={isClicked('analyze') ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Play className="h-3.5 w-3.5" />
              AI 분석 시작하기
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.button>
          </div>

          {/* ---- CANDIDATE TABLE ---- */}
          <div className="mx-4 mt-5 rounded-lg border border-white/[0.06] bg-[#0d1424] p-4">
            <p className="text-[11px] font-semibold text-white">Recent Candidate Analysis</p>
            <div className="mt-3 space-y-2">
              {[
                { name: '김지현', role: '프론트엔드 개발', score: 92, status: '합격' },
                { name: '이준호', role: '데이터 사이언티스트', score: 88, status: '검토중' },
                { name: '박서연', role: 'PM / PO', score: 95, status: '합격' },
                { name: '최민수', role: '백엔드 개발', score: 79, status: '재평가' },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between rounded-md border border-white/[0.04] bg-white/[0.02] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgb(59_130_246/0.15)] text-[9px] font-bold text-[rgb(59_130_246)]">
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-white">{c.name}</p>
                      <p className="text-[8px] text-neutral-500">{c.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white">{c.score}점</span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-medium ${
                      c.status === '합격'
                        ? 'bg-[rgb(59_130_246/0.12)] text-[rgb(96_165_250)]'
                        : c.status === '검토중'
                          ? 'bg-amber-400/10 text-amber-400'
                          : 'bg-rose-400/10 text-rose-400'
                    }`}>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- DETAIL BUTTON ---- */}
          <div className="mx-4 mt-4 flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#0d1424] p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-neutral-500" />
              <div>
                <p className="text-[10px] font-semibold text-white">2025 Q4 Recruitment Report</p>
                <p className="text-[8px] text-neutral-500">Updated 3 hours ago</p>
              </div>
            </div>
            <motion.button
              type="button"
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-[10px] font-semibold text-white transition-all ${
                isHovered('detail') || isClicked('detail')
                  ? 'bg-[rgb(37_99_235)] shadow-[0_0_16px_rgba(59,130,246,0.3)]'
                  : 'bg-white/[0.06]'
              }`}
              animate={isClicked('detail') ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              상세 보기
              <ChevronRight className="h-3 w-3" />
            </motion.button>
          </div>

          {/* ---- AI INSIGHT SECTION ---- */}
          <div className="mx-4 mt-4 rounded-lg border border-white/[0.06] bg-[#0d1424] p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-[rgb(59_130_246)]" />
              <p className="text-[11px] font-semibold text-white">AI Insight Summary</p>
            </div>
            <div className="mt-3 space-y-2">
              {[
                { icon: CheckCircle2, text: '프론트엔드 직군의 적합성 예측 정확도가 전분기 대비 4.2% 향상되었습니다.' },
                { icon: Activity, text: '데이터 사이언티스트 직군의 지원율이 급증하고 있어 평가 리소스 재배치를 권고합니다.' },
                { icon: Zap, text: '역량 평가 모델 v3.2의 AUC 스코어가 0.94로 업데이트되었습니다.' },
              ].map((insight, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md bg-white/[0.02] p-2">
                  <insight.icon className="mt-0.5 h-3 w-3 shrink-0 text-[rgb(59_130_246)]" />
                  <p className="text-[9px] leading-relaxed text-neutral-300">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ---- PIE + DONUT SECTION ---- */}
          <div className="mx-4 mt-4 mb-8 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/[0.06] bg-[#0d1424] p-4">
              <p className="text-[10px] font-semibold text-white">Department Distribution</p>
              <div className="mt-3 flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="h-20 w-20">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgb(59 130 246 / 0.2)" strokeWidth="8" />
                  <motion.circle
                    cx="40" cy="40" r="32" fill="none" stroke="rgb(59 130 246)" strokeWidth="8"
                    strokeDasharray="201"
                    animate={{ strokeDashoffset: [201, 201 - data.accuracy * 2] }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />
                  <text x="40" y="42" textAnchor="middle" className="fill-white text-[10px] font-bold">{dispAccuracy.toFixed(0)}%</text>
                </svg>
              </div>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-[#0d1424] p-4">
              <p className="text-[10px] font-semibold text-white">Evaluation Pipeline</p>
              <div className="mt-3 space-y-2">
                {[
                  { label: '서류 심사', pct: 100 },
                  { label: 'AI 역량 분석', pct: 72 },
                  { label: '면접 평가', pct: 45 },
                  { label: '최종 선발', pct: 18 },
                ].map((stage) => (
                  <div key={stage.label}>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-neutral-400">{stage.label}</span>
                      <span className="text-[8px] font-medium text-neutral-300">{stage.pct}%</span>
                    </div>
                    <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full bg-[rgb(59_130_246)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.pct}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#050914] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-8 z-10 h-10 bg-gradient-to-b from-[#050914] to-transparent" />

      {/* ---- SIMULATED CURSOR ---- */}
      <motion.div
        className="pointer-events-none absolute z-30"
        animate={{
          left: `${cursorPath[cursorStep].x}%`,
          top: `${cursorPath[cursorStep].y}%`,
        }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        {/* Click ripple */}
        {cursorPath[cursorStep].action?.startsWith('click-') && (
          <motion.div
            className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-[rgb(59_130_246)]"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
        <MousePointer2
          className="h-5 w-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          fill="white"
          stroke="#0f172a"
          strokeWidth={1.2}
        />
      </motion.div>
    </div>
  )
}
