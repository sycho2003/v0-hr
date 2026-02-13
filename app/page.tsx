"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Brain,
  Database,
  Sparkles,
  BarChart3,
  Target,
  Zap,
  Scale,
  ChevronDown,
  CheckCircle2,
  Award,
  ScrollText,
  Building2,
  XCircle,
  CircleCheckBig,
  ArrowDownRight,
} from "lucide-react"

/* ───────── ScrollReveal ───────── */
function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const translate =
    direction === "up"
      ? "translateY(32px)"
      : direction === "left"
        ? "translateX(32px)"
        : "translateX(-32px)"

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : translate,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ───────── Auto-Rolling Client Logos ───────── */
const clients = [
  "삼성전자", "SK하이닉스", "현대자동차", "LG에너지솔루션",
  "카카오", "네이버", "포스코", "KT", "CJ그룹", "한화",
  "롯데", "두산", "GS칼텍스", "신한금융",
]

function LogoMarquee() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
      <div className="flex animate-marquee gap-6">
        {[...clients, ...clients].map((client, i) => (
          <div
            key={`${client}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-5 py-3"
          >
            <Building2 className="h-4 w-4 text-muted-foreground/40" />
            <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
              {client}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────── Animated Counter ───────── */
function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const duration = 1500
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

/* ───────── Page ───────── */
export default function Page() {
  return (
    <>
      {/* ─── 1. Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
        {/* Subtle bg accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-40 h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left copy */}
            <div>
              <ScrollReveal delay={0}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {"Korea's #1 Competency Assessment Organization"}
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
                  심리학 전문성과 데이터로{" "}
                  <span className="text-primary">HR을 혁신합니다</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={240}>
                <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                  국내 최고의 역사와 전문성을 보유한 역량평가 기관.
                  AI 기반 플랫폼 ASTRA로 지속 가능한 HR 시스템을 구축하세요.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={360}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/inquiry"
                    className="group flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
                  >
                    시작하기
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/solutions"
                    className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
                  >
                    솔루션 보기
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right orbital visual */}
            <ScrollReveal delay={200} direction="left" className="relative flex items-center justify-center">
              <div className="relative h-80 w-80 lg:h-[400px] lg:w-[400px]">
                <div
                  className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-primary/15"
                  style={{ animationDuration: "30s" }}
                />
                <div className="absolute inset-8 rounded-full bg-primary/5" />
                <div className="absolute inset-16 rounded-full border border-border bg-card shadow-xl" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card shadow-md">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card shadow-md">
                  <Database className="h-6 w-6 text-primary/70" />
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card shadow-md">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute top-1/2 left-4 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card shadow-md">
                  <Sparkles className="h-6 w-6 text-primary/70" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs font-semibold tracking-wider text-primary uppercase">
                    Psychology
                  </p>
                  <p className="text-2xl font-bold text-foreground">+</p>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Data / AI
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll down indicator */}
          <div className="mt-16 flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Scroll Down</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* ─── 2. [Hook] Problem Statement ─── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section question */}
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              Pain Point
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[2.5rem] leading-tight">
              왜 스펙 좋은 인재가{" "}
              <span className="relative inline-block">
                <span className="relative z-10">실전에서는 성과를 못 낼까요?</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-sm bg-primary/10" />
              </span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              채용 시 우수했던 인재가 현장에서 기대 이하의 성과를 보이는 이유,
              문제는 평가 방식에 있습니다.
            </p>
          </ScrollReveal>

          {/* Old Way vs New Way -- redesigned */}
          <ScrollReveal delay={150} className="relative mt-16 grid gap-0 md:grid-cols-2">
            {/* Center VS badge */}
            <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-foreground shadow-xl">
                <span className="text-xs font-black text-background tracking-wider">VS</span>
              </div>
            </div>

            {/* Old Way Card */}
            <div className="relative overflow-hidden rounded-t-2xl border border-border bg-card md:rounded-l-2xl md:rounded-tr-none">
              {/* Top red accent line */}
              <div className="h-1 w-full bg-destructive/60" />

              <div className="p-8 lg:p-10">
                {/* Badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-lg bg-destructive/8 px-3 py-1.5 ring-1 ring-destructive/15">
                  <XCircle className="h-3.5 w-3.5 text-destructive" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">
                    Old Way
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground">기존 방식</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  인지능력검사(IQ), 인성검사 중심
                </p>

                {/* Data rows */}
                <div className="mt-8 space-y-0 divide-y divide-border">
                  {[
                    { label: "측정 대상", value: "잠재력 (Potential)" },
                    { label: "검증 방식", value: "자기보고식 설문" },
                    { label: "예측 정확도", value: "낮음 (0.1~0.3)", accent: true },
                    { label: "결과", value: "성과 예측 실패", accent: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-4">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span
                        className={`text-sm font-semibold ${
                          item.accent ? "text-destructive" : "text-foreground"
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom accuracy visualizer */}
                <div className="mt-6 rounded-xl bg-destructive/5 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">
                      {'예측 타당도 (Validity)'}
                    </span>
                    <span className="font-bold text-destructive">0.2</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-destructive/10">
                    <div className="h-full w-[20%] rounded-full bg-destructive/50" />
                  </div>
                </div>
              </div>
            </div>

            {/* VS badge mobile */}
            <div className="relative z-20 flex items-center justify-center py-2 md:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-foreground shadow-xl">
                <span className="text-[10px] font-black text-background tracking-wider">VS</span>
              </div>
            </div>

            {/* Assessta Way Card */}
            <div className="relative overflow-hidden rounded-b-2xl border border-border bg-card md:rounded-r-2xl md:rounded-bl-none md:border-l-0">
              {/* Top blue accent line */}
              <div className="h-1 w-full bg-primary" />

              <div className="p-8 lg:p-10">
                {/* Badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-lg bg-primary/8 px-3 py-1.5 ring-1 ring-primary/15">
                  <CircleCheckBig className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Assessta Way
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground">어세스타 방식</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  ��제 업무 행동 시뮬레이션 기반
                </p>

                {/* Data rows */}
                <div className="mt-8 space-y-0 divide-y divide-border">
                  {[
                    { label: "측정 대상", value: "수행 능력 (Performance)" },
                    { label: "검증 방식", value: "행동 시뮬레이션 + AI 분석" },
                    { label: "예측 정확도", value: "높음 (0.5~0.7)", accent: true },
                    { label: "결과", value: "성공 DNA 발견", accent: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-4">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span
                        className={`text-sm font-semibold ${
                          item.accent ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom accuracy visualizer */}
                <div className="mt-6 rounded-xl bg-primary/5 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">
                      {'예측 타당도 (Validity)'}
                    </span>
                    <span className="font-bold text-primary">0.6</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                    <div className="h-full w-[60%] rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Insight callout */}
          <ScrollReveal delay={300} className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-primary/15 bg-primary/[0.03] shadow-sm">
            <div className="flex items-start gap-4 p-6 lg:p-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <ArrowDownRight className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {"\"아, ��리 회사가 겪는 문제가 바로 이거였어!\""}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Schmidt & Hunter 메타분석에 따르면, 행동 기반 역량평가(Assessment Center)는
                  기존 인지검사 대비{" "}
                  <span className="font-semibold text-primary">2배 이상</span>의 직무 성과
                  예측력을 보입니다.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Performance Comparison Visual */}
          <ScrollReveal delay={200} className="mx-auto mt-20 max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Performance Outcome
              </p>
              <h3 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
                평가 방식이 바뀌면, 성과가 달라집니다
              </h3>
            </div>

            <div className="mt-10 space-y-5">
              {[
                {
                  label: "채용 후 1년 내 이탈률",
                  old: { value: 32, display: "32%", note: "3명 중 1명 이탈" },
                  assessta: { value: 11, display: "11%", note: "90% 이상 정착" },
                  invert: true,
                },
                {
                  label: "신규 인력 목표 달성률",
                  old: { value: 41, display: "41%", note: "절반 미달" },
                  assessta: { value: 78, display: "78%", note: "목표 초과 달성" },
                  invert: false,
                },
                {
                  label: "고성과자 선발 적중률",
                  old: { value: 23, display: "23%", note: "4명 중 1명" },
                  assessta: { value: 67, display: "67%", note: "3명 중 2명" },
                  invert: false,
                },
                {
                  label: "평가-성과 상관계수 (Validity)",
                  old: { value: 20, display: "r = .20", note: "약한 상관" },
                  assessta: { value: 60, display: "r = .60", note: "강한 상관" },
                  invert: false,
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  {/* Metric label */}
                  <div className="border-b border-border bg-muted/30 px-5 py-3">
                    <p className="text-sm font-semibold text-foreground">{metric.label}</p>
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-border">
                    {/* Old Way bar */}
                    <div className="px-5 py-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">{'기존 방식'}</span>
                        <span className={`text-lg font-bold ${metric.invert ? "text-destructive" : "text-muted-foreground"}`}>
                          {metric.old.display}
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${metric.invert ? "bg-destructive/60" : "bg-muted-foreground/30"}`}
                          style={{ width: `${metric.old.value}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] text-muted-foreground">{metric.old.note}</p>
                    </div>

                    {/* Assessta Way bar */}
                    <div className="px-5 py-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-primary font-medium">{'어세스타 방식'}</span>
                        <span className={`text-lg font-bold ${metric.invert ? "text-primary" : "text-primary"}`}>
                          {metric.assessta.display}
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-primary/10">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-1000"
                          style={{ width: `${metric.assessta.value}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] text-primary/70 font-medium">{metric.assessta.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Source footnote */}
            <p className="mt-6 text-center text-[11px] text-muted-foreground">
              * 어세스타 고객사 평균 데이터 기반 (2020-2025). 개별 결과는 조직 특성에 따라 다를 수 있습니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 3. [Solution] AI Astra 소개 ─── */}
      <section className="relative py-24 lg:py-32 bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              AI Platform
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              데이터로 증명된 고성과자의 행동,
              <br className="hidden sm:block" />
              <span className="text-primary">AI가 3초 만에 분석합니다</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              25년간 축적된 역량 데이터베이스와 AI 알고리즘이 결합된 ASTRA 플랫폼.
              조직 맞춤형 역량 모델링의 새로운 기준을 제시합니다.
            </p>
          </ScrollReveal>

          {/* 3-Column Key Features */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "커스텀 분석",
                desc: "우리 조직만의 핵심 역량을 도출합니다. 산업별, 직군별 맞춤형 모델링으로 정확도를 극대화합니다.",
                badge: "Modeling",
              },
              {
                icon: Zap,
                title: "실시간 업데이트",
                desc: "시장 트렌드와 조직 변화에 맞춰 역량 기준을 자동으로 업데이트합니다. 항상 최신 상태를 유지합니다.",
                badge: "Dynamic",
              },
              {
                icon: Scale,
                title: "공정성 확보",
                desc: "ORCE(관찰-기록-분류-평가) 알고리즘으로 편향 없는 평가를 보장합니다. 평가자 간 신뢰도 0.9 이상.",
                badge: "Fairness",
              },
            ].map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 120}>
                <div className="group h-full rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                  <div className="mb-1 text-[10px] font-bold tracking-widest text-primary/60 uppercase">
                    {feature.badge}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Dashboard mockup - tilted */}
          <ScrollReveal delay={200} className="mt-20 flex justify-center perspective-[1200px]">
            <div className="w-full max-w-4xl" style={{ transform: "rotateX(2deg) rotateY(-2deg)" }}>
              {/* Browser chrome */}
              <div className="rounded-t-xl border border-border bg-muted/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive/40" />
                  <div className="h-3 w-3 rounded-full bg-chart-4/40" />
                  <div className="h-3 w-3 rounded-full bg-chart-2/40" />
                  <div className="ml-4 flex-1 rounded-md bg-background/60 px-3 py-1.5 text-[11px] text-muted-foreground">
                    app.assessta.co.kr/astra/dashboard
                  </div>
                </div>
              </div>
              {/* Dashboard content */}
              <div className="rounded-b-xl border-x border-b border-border bg-card p-6 shadow-lg lg:p-8">
                {/* Top stats row */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "전체 역량 모델", value: "128", change: "+12" },
                    { label: "활성 평가", value: "34", change: "+5" },
                    { label: "평가 완료율", value: "94.2%", change: "+2.1%" },
                    { label: "평균 신뢰도", value: "0.91", change: "+0.03" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-muted/50 p-3">
                      <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 text-lg font-bold text-foreground">{stat.value}</p>
                      <p className="text-[10px] font-medium text-chart-2">{stat.change}</p>
                    </div>
                  ))}
                </div>
                {/* Simulated chart area */}
                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  <div className="col-span-2 rounded-lg border border-border bg-muted/20 p-4">
                    <p className="text-xs font-medium text-muted-foreground">역량별 예측 타당도</p>
                    <div className="mt-4 flex items-end gap-2">
                      {[65, 82, 45, 90, 72, 88, 55, 78, 92, 60, 85, 70].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-primary/20"
                          style={{ height: `${h}px` }}
                        >
                          <div
                            className="w-full rounded-sm bg-primary transition-all"
                            style={{ height: `${h * 0.7}px` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <p className="text-xs font-medium text-muted-foreground">AI 분석 현황</p>
                    <div className="mt-4 space-y-3">
                      {[
                        { label: "리더십 역량", pct: 92 },
                        { label: "커뮤니케이션", pct: 87 },
                        { label: "문제해결력", pct: 78 },
                        { label: "전략적 사고", pct: 85 },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-[10px]">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-medium text-foreground">{item.pct}%</span>
                          </div>
                          <div className="mt-1 h-1.5 rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 4. [Proof] 4-Step Process + Trust Badges ─── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              Process
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              타협하지 않는 4단계 검증 프로세스
            </h2>
          </ScrollReveal>

          {/* 4 Step cards - horizontal scroll on mobile */}
          <div className="mt-16 -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
              {[
                {
                  step: "01",
                  title: "직무 분석",
                  desc: "SME 인터뷰 및 BEI를 통해 핵심 직무 행동을 도출합니다.",
                  icon: Brain,
                  color: "text-primary",
                  bgColor: "bg-primary/10",
                },
                {
                  step: "02",
                  title: "역량 모델링",
                  desc: "행동지표(Behavioral Indicator) 기반으로 역량 모델을 설계합니다.",
                  icon: BarChart3,
                  color: "text-primary",
                  bgColor: "bg-primary/10",
                },
                {
                  step: "03",
                  title: "Assessta DB 매칭",
                  desc: "25년간 축적된 독보적 역량 DB와 교차 검증하여 정확도를 극대화합니다.",
                  icon: Database,
                  color: "text-primary",
                  bgColor: "bg-primary/10",
                  exclusive: true,
                },
                {
                  step: "04",
                  title: "AI 최적화",
                  desc: "ASTRA AI가 조직 특성에 맞춰 역량 모델을 최종 최적화합니다.",
                  icon: Sparkles,
                  color: "text-primary",
                  bgColor: "bg-primary/10",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 100} className="min-w-[260px] snap-center lg:min-w-0">
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-sm transition-all ${
                      item.exclusive
                        ? "border-primary/30 bg-primary/[0.04] ring-1 ring-primary/10"
                        : "border-border bg-card"
                    }`}
                  >
                    {item.exclusive && (
                      <span className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                        Exclusive
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-primary/50">STEP</span>
                      <span className="text-2xl font-extrabold text-foreground">{item.step}</span>
                    </div>
                    <div className={`mt-5 flex h-11 w-11 items-center justify-center rounded-xl ${item.bgColor}`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-foreground">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                    {/* Connector arrow (not on last) */}
                    {i < 3 && (
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden text-border lg:block">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <ScrollReveal delay={100} className="mt-16 flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: Award, label: "25년 데이터베이스" },
              { icon: ScrollText, label: "ISO 국제 표준 준수" },
              { icon: BarChart3, label: "Schmidt & Hunter 타당도 입증" },
            ].map((badge) => (
              <Link
                key={badge.label}
                href="/research"
                className="group flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
              >
                <badge.icon className="h-4 w-4 text-primary" />
                <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {badge.label}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 5. [Ending] Client Logos + CTA ─── */}
      <section className="py-24 lg:py-32 bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Client logos */}
          <ScrollReveal>
            <p className="text-center text-sm font-semibold text-foreground">
              이미 업계 1위 기업들은 아스트라와 함께하고 있습니다
            </p>
            <div className="mt-8">
              <LogoMarquee />
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={150} className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6 text-center">
            {[
              { value: 500, suffix: "+", label: "완료 프로젝트" },
              { value: 97, suffix: "%", label: "고객 만족도" },
              { value: 25, suffix: "년+", label: "업력" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-foreground md:text-4xl">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </ScrollReveal>

          {/* Final CTA */}
          <ScrollReveal delay={200} className="mx-auto mt-20 max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
              우리 조직의 &lsquo;진짜 역량&rsquo;을 찾을 준비가 되셨나요?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">
              무료 진단을 통해 현재 HR 시스템의 개선 포인트를 확인하고
              맞춤 솔루션을 제안받으세요.
            </p>
            <div className="mt-8">
              <Link
                href="/inquiry"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-md transition-all hover:brightness-110 hover:shadow-lg"
              >
                무료 진단 문의하기
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
              {["무료 상담", "맞춤형 분석 리포트", "비밀 보장"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
