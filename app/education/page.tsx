"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  BookOpen,
  Settings,
  Brain,
  BarChart3,
  Layers,
  Sparkles,
  Building2,
  Workflow,
  ChevronDown,
  GraduationCap,
  HeartHandshake,
  Compass,
} from "lucide-react"

/* ── Data ── */

const educationPrograms = [
  {
    icon: Users,
    title: "리더십 역량 강화",
    target: "팀장 / 중간관리자",
    duration: "8주 과정",
    desc: "조직의 핵심 리더가 갖추어야 할 역량을 행동 기반으로 학습하고 실습합니다.",
    detail:
      "코칭, 피드백, 갈등 관리 등 실무에 즉시 적용 가능한 프로그램으로, 리더십 역량 점수 평균 35% 향상 및 구성원 만족도 40% 개선 효과가 검증되었습니다.",
    outcomes: ["리더십 역량 점수 평균 35% 향상", "구성원 만족도 40% 개선"],
    modules: ["리더십 자기진단", "코칭 & 피드백 실습", "갈등 관리 워크숍", "성과 관리 전략"],
    badge: "BEST",
  },
  {
    icon: Target,
    title: "HR 담당자 전문 과정",
    target: "HR / 인사 담당자",
    duration: "6주 과정",
    desc: "역량 평가 설계부터 결과 분석까지, HR 담당자의 핵심 역량을 체계적으로 교육합니다.",
    detail:
      "평가 설계 역량 50% 향상, 평가 결과 활용도 2배 증가 등의 성과를 목표로 합니다. 역량 모델 이해, 평가 도구 설계, 데이터 분석 기초, 결과 리포팅 모듈로 구성됩니다.",
    outcomes: ["평가 설계 역량 50% 향상", "평가 결과 활용도 2배 증가"],
    modules: ["역량 모델 이해", "평가 도구 설계", "데이터 분석 기초", "결과 리포팅"],
  },
  {
    icon: TrendingUp,
    title: "조직문화 혁신 워크숍",
    target: "전 구성원",
    duration: "1~2일 과정",
    desc: "심리학적 진단 도구로 조직문화를 가시화하고, 소통과 협업을 증진시키는 체험형 워크숍입니다.",
    detail:
      "조직 몰입도 28% 향상, 부서 간 협업 만족도 45% 개선의 검증된 성과. 조직문화 진단, 팀 빌딩 액티비티, 소통 워크숍, 액션 플래닝 과정으로 진행됩니다.",
    outcomes: ["조직 몰입도 28% 향상", "부서 간 협업 만족도 45% 개선"],
    modules: ["조직문화 진단", "팀 빌딩 액티비티", "소통 워크숍", "액션 플래닝"],
  },
  {
    icon: Award,
    title: "고성과자 육성 프로그램",
    target: "핵심 인재 / 차세대 리더",
    duration: "12주 과정",
    desc: "고성과자의 역량 프로파일을 분석하여 차세대 리더를 체계적으로 육성합니다.",
    detail:
      "육성 대상 승진율 60% 향상, 핵심 인재 이탈률 70% 감소의 성과를 달성한 장기 프로그램입니다. 역량 프로파일링, 개인 코칭, 전략적 프로젝트, 리더십 챌린지로 구성됩니다.",
    outcomes: ["육성 대상 승진율 60% 향상", "핵심 인재 이탈률 70% 감소"],
    modules: ["역량 프로파일링", "개인 코칭 세션", "전략적 프로젝트", "리더십 챌린지"],
    badge: "PREMIUM",
  },
  {
    icon: GraduationCap,
    title: "평가자 인증 교육",
    target: "면접관 / 평가 위원",
    duration: "3일 집중 과정",
    desc: "공정하고 객관적인 평가를 수행할 수 있도록 평가자 역량을 인증 수준으로 교육합니다.",
    detail:
      "BEI 면접법, 평가 편향 인지 및 보정, 구조화 면접 설계 등을 학습합니다. 수료 시 Assessta 공인 평가자 인증서가 발급되며, 평가 신뢰도 40% 향상 효과가 검증되었습니다.",
    outcomes: ["평가 신뢰도 40% 향상", "Assessta 공인 평가자 인증 취득"],
    modules: ["BEI 면접법", "평가 편향 보정", "구조화 면접 설계", "인증 실습 평가"],
    badge: "인증",
  },
  {
    icon: HeartHandshake,
    title: "팀 커뮤니케이션 과정",
    target: "팀 단위 / 프로젝트 그룹",
    duration: "4주 과정",
    desc: "심리학 기반 커뮤니케이션 모델로 팀 내 신뢰와 협업 역량을 강화합니다.",
    detail:
      "DISC, MBTI를 넘어 과학적 소통 유형 진단과 실습 중심 교육. 팀 갈등 50% 감소, 프로젝트 완수율 30% 향상의 실질적 성과를 목표로 합니다.",
    outcomes: ["팀 갈등 50% 감소", "프로젝트 완수율 30% 향상"],
    modules: ["소통 유형 진단", "경청 & 피드백 실습", "갈등 조정 시뮬레이션", "팀 액션 플랜"],
  },
  {
    icon: Compass,
    title: "신입사원 온보딩 역량 교육",
    target: "신입 / 경력 입사자",
    duration: "2~3일 과정",
    desc: "조직의 핵심 가치와 역량 체계에 빠르게 적응할 수 있도록 설계된 온보딩 프로그램입니다.",
    detail:
      "역량 체계 이해, 조직문화 적응, 자기 역량 진단 및 개발 계획 수립까지 체계적으로 진행됩니다. 조기 퇴사율 35% 감소, 업무 적응 기간 50% 단축 효과가 있습니다.",
    outcomes: ["조기 퇴사율 35% 감소", "업무 적응 기간 50% 단축"],
    modules: ["역량 체계 이해", "조직문화 몰입 워크숍", "자기 역량 진단", "개발 계획 수립"],
  },
]

const consultingServices = [
  {
    icon: Layers,
    title: "역량 모델 설계 컨설팅",
    scope: "전사 / 직무별",
    duration: "4~8주",
    desc: "조직의 비전, 전략, 직무 특성에 맞는 맞춤형 역량 모델을 설계합니다. 산업심리학 기반 방법론으로 타당성을 확보합니다.",
    deliverables: ["역량 사전 (Dictionary)", "직무별 역량 프로파일", "행동 지표 체계 (BEI)"],
    highlights: ["심리학 박사급 전문가 직접 참여", "국내 최대 역량 DB 활용"],
  },
  {
    icon: BarChart3,
    title: "평가 체계 구축 컨설팅",
    scope: "인사 평가 / 성과 관리",
    duration: "6~12주",
    desc: "공정하고 객관적인 평가 체계를 구축합니다. 기존 평가 시스템의 문제점을 진단하고, 데이터 기반의 개선안을 설계합니다.",
    deliverables: ["평가 프로세스 재설계", "평가자 교육 프로그램", "평가 결과 분석 대시보드"],
    highlights: ["AI 기반 평가 편향 감지", "실시간 모니터링 시스템"],
  },
  {
    icon: Building2,
    title: "조직문화 진단 및 혁신",
    scope: "조직문화 / 몰입도",
    duration: "4~6주",
    desc: "조직문화를 정량적으로 진단하고, 데이터에 기반한 문화 혁신 전략을 수립합니다. 설문, 인터뷰, 행동 관찰을 결합한 다면 진단을 실시합니다.",
    deliverables: ["조직문화 진단 리포트", "문화 혁신 로드맵", "구성원 소통 프로그램"],
    highlights: ["독자 개발 진단 도구", "25년+ 벤치마크 데이터"],
  },
  {
    icon: Workflow,
    title: "HR 시스템 디지털 전환",
    scope: "HR DX / ASTRA 도입",
    duration: "8~16주",
    desc: "기존 HR 프로세스를 ASTRA 플랫폼 기반으로 디지털 전환합니다. 역량 모델링부터 평가, 교육까지 End-to-End 자동화를 지원합니다.",
    deliverables: ["ASTRA 도입 로드맵", "데이터 마이그레이션", "관리자 교육"],
    highlights: ["AI 역량 매칭 엔진", "ROI 시뮬레이션 제공"],
    badge: "AI-POWERED",
  },
]

/* ── Animated Heading ── */

function AnimatedHeading() {
  const ref = useRef<HTMLHeadingElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = [
    { text: "전통의", highlight: false },
    { text: "전문성에서", highlight: false },
  ]
  const words2 = [
    { text: "AI", highlight: true },
    { text: "혁신", highlight: true },
    { text: "까지", highlight: false },
  ]

  return (
    <h1
      ref={ref}
      className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl"
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: `${i * 120}ms`,
          }}
        >
          {w.text}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
      <br />
      {words2.map((w, i) => (
        <span
          key={`b-${i}`}
          className={`inline-block transition-all duration-700 ease-out ${w.highlight ? "text-primary" : ""}`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: `${(words.length + i) * 120 + 80}ms`,
          }}
        >
          {w.text}
          {i < words2.length - 1 && !w.highlight ? "\u00A0" : ""}
        </span>
      ))}
    </h1>
  )
}

/* ── Page ── */

export default function EducationPage() {

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full bg-primary/3 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-primary" />
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              Education & Consulting
            </p>
          </div>
          <AnimatedHeading />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            25년간 축적된 심리학 기반 전문 역량과 최신 AI 기술의 결합. 조직의 HR 역량을 진단하고,
            교육하고, 혁신합니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#education"
              className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
            >
              <BookOpen className="h-4 w-4" />
              HR Education
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#consulting"
              className="flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Settings className="h-4 w-4" />
              HR Consulting
            </a>
          </div>
        </div>
      </section>

      {/* Education Content */}
      <div id="education">
        <EducationContent />
      </div>

      {/* Consulting Content */}
      <div id="consulting">
        <ConsultingContent />
      </div>

      {/* Shared CTA */}
      <section className="relative overflow-hidden border-t border-border bg-card py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
            맞춤형 교육 & 컨설팅이 필요하신가요?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            조직의 특성과 니즈를 분석하여 최적의 교육 프로그램 및 컨설팅 서비스를 설계해 드립니다.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/inquiry"
              className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
            >
              무료 상담 신청
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/solutions"
              className="flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              ASTRA 플랫폼 보기
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            {["맞춤형 설계", "사전/사후 진단", "심리학 박사급 전문가", "AI 기반 고도화"].map(
              (item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  )
}

/* ────────────────────────────────────────────
   HR Education Content — 2col x 4row, expandable
   ──────────────────────────────────────────── */

function EducationContent() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            Professional Training
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            HR 전문 교육 프로그램
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            심리학 전문가가 직접 설계하고 운영하는 역량 기반 교육. 이론과 실습, 데이터와 인사이트를
            결합한 체계적 프로그램입니다.
          </p>
        </div>

        {/* 2-column grid, 4 rows (7 programs + 1 CTA cell) */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {educationPrograms.map((program, idx) => {
            const isExpanded = expandedIndex === idx
            return (
              <div
                key={program.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Card header — always visible */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <program.icon className="h-5 w-5 text-foreground" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-foreground">{program.title}</h3>
                          {program.badge && (
                            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase">
                              {program.badge}
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {program.target}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-medium text-primary">
                            <Clock className="h-3 w-3" />
                            {program.duration}
                          </span>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                          {program.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expandable detail */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border px-6 pb-6 pt-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {program.detail}
                      </p>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        {/* Modules */}
                        <div>
                          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                            커리큘럼 모듈
                          </p>
                          <div className="mt-3 space-y-1.5">
                            {program.modules.map((mod, i) => (
                              <div
                                key={mod}
                                className="flex items-center gap-2.5 rounded-lg border border-border bg-muted/30 px-3 py-2"
                              >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                  {i + 1}
                                </span>
                                <span className="text-sm text-foreground">{mod}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Outcomes */}
                        <div>
                          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                            기대 성과
                          </p>
                          <div className="mt-3 space-y-2.5">
                            {program.outcomes.map((outcome) => (
                              <div key={outcome} className="flex items-start gap-2">
                                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <span className="text-sm font-medium text-foreground">
                                  {outcome}
                                </span>
                              </div>
                            ))}
                          </div>
                          <Link
                            href="/inquiry"
                            className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                          >
                            프로그램 문의
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* 8th cell: CTA card */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">맞춤 과정이 필요하신가요?</h3>
            <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
              조직의 특성에 맞춘 커스텀 교육 프로그램을 설계해 드립니다.
            </p>
            <Link
              href="/inquiry"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
            >
              교육 상담 신청
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   HR Consulting Content
   ──────────────────────────────────────────── */

function ConsultingContent() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Settings className="h-3.5 w-3.5" />
            Customized Consulting
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            HR 컨설팅 서비스
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            조직의 특성에 맞춘 맞춤형 HR 시스템 구축. 25년간의 전문 노하우와 AI 기술을 결합한 데이터
            기반 컨설팅입니다.
          </p>
        </div>

        {/* Consulting service cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {consultingServices.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              {service.badge && (
                <div className="absolute right-0 top-0">
                  <span className="inline-block rounded-bl-xl bg-primary px-3 py-1.5 text-[10px] font-bold tracking-wider text-primary-foreground uppercase">
                    {service.badge}
                  </span>
                </div>
              )}
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <service.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      <span className="text-xs text-muted-foreground">{service.scope}</span>
                      <span className="text-xs text-muted-foreground">{"/"}</span>
                      <span className="text-xs font-medium text-primary">{service.duration}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>

                <div className="mt-6">
                  <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    주요 산출물
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.deliverables.map((d) => (
                      <span
                        key={d}
                        className="rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs text-foreground"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {service.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-1.5">
                      <Brain className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium text-primary">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <Link
                    href="/inquiry"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    컨설팅 상담 신청
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process comparison */}
        <div className="mt-20">
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground">왜 ASSESSTA 컨설팅인가?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              전통적 전문성과 최신 AI 기술이 결합된 유일한 HR 컨설팅
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-muted/20 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted">
                  <Award className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">검증된 전문성</p>
                  <p className="text-[11px] text-muted-foreground">25+ Years of Heritage</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "산업심리학 박사급 전문가 팀",
                  "500+ 프로젝트 수행 경험",
                  "국내 최대 역량 데이터베이스",
                  "학술 논문 기반 방법론",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">AI 혁신</p>
                  <p className="text-[11px] text-primary">Next-Gen Technology</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "AI 기반 역량 모델 자동 생성",
                  "실시간 데이터 분석 대시보드",
                  "편향 감지 및 공정성 검증",
                  "ASTRA 플랫폼 연계 자동화",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
