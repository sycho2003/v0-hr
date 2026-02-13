"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  Brain,
  Target,
  Users,
  ShieldCheck,
  Lock,
  Eye,
  Fingerprint,
  TrendingDown,
  Heart,
  BarChart3,
  ChevronDown,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    num: "01",
    tag: "Real-time Job Architecture",
    title: "실시간 직무 체계 수립",
    keywords: ["#직무기술서", "#자동업데이트"],
    icon: Briefcase,
    features: [
      {
        label: "AI-Live JD",
        desc: "내부 업무 툴 및 실시간 산업 트렌드와 연동하여 직무기술서(JD)를 상시 업데이트합니다.",
      },
      {
        label: "Manager-Finalized",
        desc: "AI가 제안한 내용에 팀장의 최종 컨펌 프로세스를 더해 조직 특유의 전문성을 확보합니다.",
      },
    ],
  },
  {
    num: "02",
    tag: "Data-Driven Competency Modeling",
    title: "데이터 기반 역량 모델링",
    keywords: ["#고성과자기반", "#역량자동모델링"],
    icon: Brain,
    features: [
      {
        label: "High-Performer Analysis",
        desc: "AI가 고성과자 및 임원의 행동 패턴, 성과 리포트, 인터뷰 내용을 이해하고 자동으로 역량 리스트를 추출하여 모델링을 완성합니다.",
      },
      {
        label: "Auto-Mapping",
        desc: "추출된 역량과 직무별 행동지표를 1:1로 자동 매핑하여 정교한 역량 사전을 구축합니다.",
      },
    ],
  },
  {
    num: "03",
    tag: "360\u00b0 Precision Diagnosis",
    title: "정밀 진단",
    keywords: ["#역량-심리 동시진단", "#성장격차확인"],
    icon: Target,
    features: [
      {
        label: "Psychometric Sync",
        desc: "검증된 심리검사와 연계하여 개인별 잠재 역량 및 직무 적합도를 측정합니다.",
      },
      {
        label: "Gap Analysis",
        desc: "현재 역량과 목표 직무 역량 간의 차이를 실시간으로 시각화하여 구체적인 '성장 로드맵'을 제시합니다.",
      },
    ],
  },
  {
    num: "04",
    tag: "Strategic Talent Management",
    title: "전략적 인재 관리",
    keywords: ["#핵심인재선별", "#성장관리코치"],
    icon: Users,
    features: [
      {
        label: "Smart Selection",
        desc: "데이터 기반의 핵심 인재(High-Potential) 선발 알고리즘을 제공합니다.",
      },
      {
        label: "Interview Coaching",
        desc: "역량 갭(Gap)을 보완하기 위한 개인별 맞춤형 면접 질문 및 코칭 가이드를 자동으로 생성합니다.",
      },
    ],
  },
]

const trustItems = [
  {
    icon: Lock,
    label: "Data Sovereignty",
    title: "데이터 주권",
    desc: "고객사의 데이터는 독립된 환경에 보관되며, 외부 AI 모델 학습 등에 절대 사용되지 않습니다.",
  },
  {
    icon: Eye,
    label: "Explainable AI (XAI)",
    title: "설명 가능한 AI",
    desc: "역량 도출 및 진단 결과에 대해 AI가 참고한 기준과 판단 흐름을 확인할 수 있습니다. 투명한 근거 제공으로 인사 의사결정을 지원하고 신뢰도를 향상시킵니다.",
  },
  {
    icon: Fingerprint,
    label: "Privacy by Design",
    title: "개인정보 보호 설계",
    desc: "개인정보 비식별화 처리 및 권한별 접근 제어를 통해 민감한 인사 정보를 철저히 보호합니다.",
  },
]

const benefits = [
  {
    num: "01",
    icon: TrendingDown,
    title: "비용 / 시간 효율화",
    desc: "외부 컨설팅에 의존하지 않고, 조직 내부 데이터만으로 고도화된 역량 모델을 지속적으로 운영할 수 있습니다.",
  },
  {
    num: "02",
    icon: Heart,
    title: "인재 유지 및 몰입도 향상",
    desc: "개인별 성장 방향과 경로를 명확히 제시함으로써 구성원의 몰입도와 조직 잔류 가능성을 높입니다.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "성과로 이어지는 데이터",
    desc: "직무 중심의 평가와 개인차 데이터 분석을 통해 채용 미스매칭을 획기적으로 줄이는 인사관리 플랫폼입니다.",
  },
]

/* ------------------------------------------------------------------ */
/*  Step UI Mockups                                                    */
/* ------------------------------------------------------------------ */

function MockupShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
        </div>
        <div className="ml-2 flex-1 rounded-md bg-muted px-3 py-1">
          <span className="text-[10px] text-muted-foreground">{title}</span>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function MockupStep01() {
  const jdFields = [
    { label: "직무명", value: "Product Manager" },
    { label: "소속", value: "Platform Division" },
    { label: "Last Updated", value: "2026.02.13 (Auto)", highlight: true },
  ]
  const duties = [
    { text: "제품 로드맵 수립 및 이해관계자 커뮤니케이션", status: "synced" },
    { text: "사용자 리서치 기반 요구사항 정의", status: "synced" },
    { text: "AI 기반 개인화 추천 전략 수립", status: "new" },
    { text: "글로벌 시장 확장 전략 기획", status: "new" },
  ]
  return (
    <MockupShell title="ASTRA / Job Architecture / PM">
      <div className="space-y-3">
        {/* Header fields */}
        <div className="grid grid-cols-3 gap-2">
          {jdFields.map((f) => (
            <div key={f.label} className="rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-[10px] font-medium text-muted-foreground">{f.label}</p>
              <p className={`mt-0.5 text-xs font-semibold ${f.highlight ? "text-primary" : "text-foreground"}`}>{f.value}</p>
            </div>
          ))}
        </div>
        {/* Duty list */}
        <div className="rounded-lg border border-border">
          <div className="border-b border-border bg-muted/30 px-3 py-2">
            <p className="text-[10px] font-semibold text-foreground">{'핵심 직무 (AI Live-Sync)'}</p>
          </div>
          <ul className="divide-y divide-border">
            {duties.map((d) => (
              <li key={d.text} className="flex items-center gap-2 px-3 py-2">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${d.status === "new" ? "bg-primary" : "bg-green-500"}`} />
                <span className="flex-1 text-[11px] text-foreground">{d.text}</span>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${d.status === "new" ? "bg-primary/10 text-primary" : "bg-green-500/10 text-green-600"}`}>
                  {d.status === "new" ? "NEW" : "SYNCED"}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Manager confirm bar */}
        <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">M</div>
            <span className="text-[10px] text-foreground">{'팀장 최종 컨펌 대기 중'}</span>
          </div>
          <span className="rounded-md bg-primary px-2.5 py-1 text-[9px] font-semibold text-primary-foreground">Confirm</span>
        </div>
      </div>
    </MockupShell>
  )
}

function MockupStep02() {
  const competencies = [
    { name: "전략적 사고", score: 92, source: "성과 리포트" },
    { name: "데이터 리터러시", score: 87, source: "행동 패턴" },
    { name: "이해관계자 관리", score: 78, source: "인터뷰" },
    { name: "애자일 리더십", score: 85, source: "행동 패턴" },
    { name: "고객 중심 사고", score: 81, source: "성과 리포트" },
  ]
  return (
    <MockupShell title="ASTRA / Competency Modeling / Auto-Extract">
      <div className="space-y-3">
        {/* Analysis status */}
        <div className="flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/20 px-3 py-2">
          <Brain className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-medium text-foreground">{'고성과자 행동 패턴 분석 완료'}</span>
          <span className="ml-auto rounded-full bg-green-500/10 px-2 py-0.5 text-[9px] font-semibold text-green-600">COMPLETE</span>
        </div>
        {/* Competency bars */}
        <div className="rounded-lg border border-border">
          <div className="border-b border-border bg-muted/30 px-3 py-2 flex items-center justify-between">
            <p className="text-[10px] font-semibold text-foreground">{'추출된 역량 리스트'}</p>
            <span className="text-[9px] text-muted-foreground">5 competencies</span>
          </div>
          <div className="divide-y divide-border">
            {competencies.map((c) => (
              <div key={c.name} className="px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-foreground">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground">{c.source}</span>
                    <span className="text-[11px] font-bold text-primary">{c.score}</span>
                  </div>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${c.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Auto-mapping preview */}
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
          <Target className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">{'행동지표 1:1 자동 매핑 →'}</span>
          <span className="text-[10px] font-semibold text-primary">{'역량 사전 구축 중...'}</span>
        </div>
      </div>
    </MockupShell>
  )
}

function MockupStep03() {
  const radarData = [
    { label: "전략", current: 65, target: 90 },
    { label: "분석", current: 72, target: 85 },
    { label: "소통", current: 80, target: 88 },
    { label: "리더십", current: 55, target: 92 },
    { label: "실행", current: 70, target: 80 },
  ]
  const gaps = [
    { label: "리더십", gap: 37, priority: "high" },
    { label: "전략적 사고", gap: 25, priority: "high" },
    { label: "분석", gap: 13, priority: "mid" },
    { label: "실행력", gap: 10, priority: "low" },
  ]
  return (
    <MockupShell title="ASTRA / 360 Diagnosis / Gap Analysis">
      <div className="space-y-3">
        {/* Radar approximation using bars */}
        <div className="rounded-lg border border-border p-3">
          <p className="text-[10px] font-semibold text-foreground mb-2">{'역량 프로파일 (현재 vs 목표)'}</p>
          <div className="space-y-2">
            {radarData.map((r) => (
              <div key={r.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{r.label}</span>
                  <span className="text-[9px] text-muted-foreground">{r.current} / {r.target}</span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-muted">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-primary/20" style={{ width: `${r.target}%` }} />
                  <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${r.current}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-[9px] text-muted-foreground">{'현재'}</span></div>
            <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary/20" /><span className="text-[9px] text-muted-foreground">{'목표'}</span></div>
          </div>
        </div>
        {/* Gap priority list */}
        <div className="rounded-lg border border-border">
          <div className="border-b border-border bg-muted/30 px-3 py-2">
            <p className="text-[10px] font-semibold text-foreground">{'성장 Gap 우선순위'}</p>
          </div>
          <ul className="divide-y divide-border">
            {gaps.map((g, i) => (
              <li key={g.label} className="flex items-center gap-2 px-3 py-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-muted-foreground">{i + 1}</span>
                <span className="flex-1 text-[11px] text-foreground">{g.label}</span>
                <span className="text-[10px] font-semibold text-primary">-{g.gap}pt</span>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${g.priority === "high" ? "bg-red-500/10 text-red-600" : g.priority === "mid" ? "bg-yellow-500/10 text-yellow-600" : "bg-green-500/10 text-green-600"}`}>
                  {g.priority.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockupShell>
  )
}

function MockupStep04() {
  const talents = [
    { name: "김서연", role: "PM", potential: "High", fit: 94, action: "Promote" },
    { name: "이준혁", role: "Engineer", potential: "High", fit: 91, action: "Develop" },
    { name: "박지민", role: "Designer", potential: "Medium", fit: 78, action: "Coach" },
    { name: "최도윤", role: "Data Analyst", potential: "High", fit: 88, action: "Develop" },
  ]
  return (
    <MockupShell title="ASTRA / Talent Management / Pipeline">
      <div className="space-y-3">
        {/* Summary badges */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "High-Potential", value: "12명", color: "text-primary" },
            { label: "Ready Now", value: "5명", color: "text-green-600" },
            { label: "Develop", value: "7명", color: "text-yellow-600" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-muted/50 px-3 py-2 text-center">
              <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        {/* Talent table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["이름", "직무", "Potential", "적합도", "Action"].map((h) => (
                  <th key={h} className="px-2.5 py-2 text-left text-[9px] font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {talents.map((t) => (
                <tr key={t.name} className="hover:bg-muted/20">
                  <td className="px-2.5 py-2 text-[11px] font-medium text-foreground">{t.name}</td>
                  <td className="px-2.5 py-2 text-[10px] text-muted-foreground">{t.role}</td>
                  <td className="px-2.5 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${t.potential === "High" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{t.potential}</span>
                  </td>
                  <td className="px-2.5 py-2 text-[11px] font-bold text-primary">{t.fit}%</td>
                  <td className="px-2.5 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${t.action === "Promote" ? "bg-green-500/10 text-green-600" : t.action === "Develop" ? "bg-blue-500/10 text-blue-600" : "bg-yellow-500/10 text-yellow-600"}`}>{t.action}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Interview coaching hint */}
        <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] text-foreground">{'맞춤형 면접 질문 & 코칭 가이드 자동 생성'}</span>
          <span className="ml-auto rounded-md bg-primary px-2 py-0.5 text-[9px] font-semibold text-primary-foreground">Generate</span>
        </div>
      </div>
    </MockupShell>
  )
}

function StepMockup({ stepNum }: { stepNum: string }) {
  switch (stepNum) {
    case "01": return <MockupStep01 />
    case "02": return <MockupStep02 />
    case "03": return <MockupStep03 />
    case "04": return <MockupStep04 />
    default: return null
  }
}

/* ------------------------------------------------------------------ */
/*  Step Accordion Component                                           */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  isOpen,
  onToggle,
}: {
  step: (typeof steps)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-primary/20 bg-card shadow-lg shadow-primary/5"
          : "border-border bg-card hover:border-primary/10 hover:shadow-sm"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-5 p-6 text-left lg:p-8"
      >
        {/* Step number */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
            isOpen
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          }`}
        >
          {step.num}
        </div>

        {/* Title cluster */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">
            {step.tag}
          </p>
          <h3 className="mt-1 text-lg font-bold text-foreground">{step.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {step.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Icon */}
        <step.icon
          className={`hidden h-6 w-6 shrink-0 sm:block ${
            isOpen ? "text-primary" : "text-muted-foreground/40"
          }`}
        />

        {/* Chevron */}
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable content */}
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-6 pb-6 pt-5 lg:px-8 lg:pb-8">
            {/* UI Mockup + Features side by side */}
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Left: UI Mockup */}
              <div className="lg:col-span-3">
                <StepMockup stepNum={step.num} />
              </div>
              {/* Right: Feature descriptions */}
              <div className="flex flex-col gap-4 lg:col-span-2">
                {step.features.map((feat) => (
                  <div
                    key={feat.label}
                    className="rounded-xl border border-border bg-muted/30 p-5"
                  >
                    <p className="text-sm font-bold text-foreground">{feat.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SolutionsPage() {
  const [openStep, setOpenStep] = useState(0)

  return (
    <>
      {/* ============================================================ */}
      {/* 1. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Decorative */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-primary/[0.04] blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-primary/[0.03] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold text-primary">
                Intelligent HRD Platform
              </span>
            </div>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {"이제 '살아있는' 역량 모델링을 경험하세요."}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              AI 실시간 직무 데이터와 심리 분석을 결합하여, 가장 최신의 직무 환경에
              최적화된 Intelligent HRD Platform을 제공합니다.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/inquiry"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:brightness-110"
              >
                솔루션 도입 문의하기
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                리서치 자세히 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PROCESS - 5 Step Accordion                                */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              Core Process
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
              핵심 기능 4 Steps
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              각 단계를 클릭하여 세부 기능을 확인하세요
            </p>
          </div>

          {/* Step accordion list */}
          <div className="mx-auto mt-14 max-w-4xl space-y-4">
            {steps.map((step, idx) => (
              <StepCard
                key={step.num}
                step={step}
                isOpen={openStep === idx}
                onToggle={() => setOpenStep(openStep === idx ? -1 : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. TRUST & SECURITY (dark section)                           */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[hsl(222,47%,11%)] py-20 lg:py-28">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
              <span className="text-xs font-semibold text-sky-400">Step 05</span>
            </div>
            <h2 className="mt-5 text-balance text-3xl font-bold text-white md:text-4xl">
              Enterprise-Grade AI Governance &amp; Security
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-slate-400">
              인사 데이터의 민감성을 고려한 최고 수준의 보안과 설명 가능한 AI로
              신뢰할 수 있는 의사결정을 지원합니다.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              {["#인사데이터보안", "#판단근거제공"].map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-colors hover:border-white/[0.12] hover:bg-white/[0.05]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10">
                  <item.icon className="h-5 w-5 text-sky-400" />
                </div>
                <p className="text-[11px] font-semibold tracking-wider text-sky-400 uppercase">
                  {item.label}
                </p>
                <h3 className="mt-2 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. BENEFITS                                                  */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              Expected Business Impact
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
              도입 효과 및 기대 성과
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.num}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/15"
              >
                {/* Large faded number */}
                <span className="pointer-events-none absolute -top-3 -right-2 text-7xl font-black text-primary/[0.06] select-none">
                  {b.num}
                </span>
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <b.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BOTTOM CTA                                                */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-muted/30 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            지금, 우리 조직에 딱 맞는
            <br className="hidden sm:block" />
            역량 모델을 확인해보세요.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            ASTRA 플랫폼으로 조직의 역량 체계를 빠르게 수립하고,
            데이터 기반 인사 의사결정을 시작하세요.
          </p>
          <Link
            href="/inquiry"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:brightness-110"
          >
            솔루션 도입 문의하기
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  )
}
