"use client"

import {
  AlertTriangle,
  DollarSign,
  MessageSquare,
  Search,
  Database,
  FileCheck,
  RefreshCcw,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"

const painPoints = [
  {
    icon: AlertTriangle,
    title: "천편일률적 성과 측정",
    desc: "동일한 잣대로 다양한 직무를 평가하면 핵심 인재를 놓치게 됩니다. 직무별 차별화된 역량 지표가 필요합니다.",
  },
  {
    icon: DollarSign,
    title: "높은 비용, 낮은 지속성",
    desc: "매번 외부 컨설팅에 큰 비용을 투자하지만, 조직 변화에 따라 금방 쓸모없어지는 일회성 결과물에 지치셨나요?",
  },
]

const processSteps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "고성과자 인터뷰",
    desc: "행동사건면접(BEI) 기법으로 핵심 행동 패턴을 분석합니다.",
  },
  {
    icon: Search,
    step: "02",
    title: "핵심 특성 추출",
    desc: "심리학 전문가가 성과 역량을 과학적으로 도출합니다.",
  },
  {
    icon: Database,
    step: "03",
    title: "Assesta DB 벤치마킹",
    desc: "25년간 축적된 역량 DB와 매칭하여 검증된 지표를 수립합니다.",
    highlight: true,
  },
  {
    icon: FileCheck,
    step: "04",
    title: "맞춤형 지표 설정",
    desc: "기업 비전, 전략, 문화에 정렬된 역량 모델을 설계합니다.",
  },
]

export function CompetencySection() {
  return (
    <section className="py-20 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 md:px-20 xl:px-[120px]">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            Competency Modeling
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            역량 모델링이란?
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            성과를 만들어내는 핵심 역량은 기업마다 다릅니다.
            일반화된 평가 도구로는 조직의 진짜 경쟁력을 측정할 수 없습니다.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-destructive/10">
                <point.icon className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.desc}</p>
            </div>
          ))}
        </div>

        {/* Solution callout */}
        <div className="mt-12 rounded-xl border border-primary/15 bg-primary/5 p-8 text-center">
          <h3 className="text-xl font-bold text-foreground">
            단 한 번의 투자로, 지속 가능한 HR 시스템을 구축하세요
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            어세스타는 심리학 전문성과 독보적 데이터를 결합하여, 조직 변화에 자동으로 적응하는
            역량 모델을 설계합니다.
          </p>
        </div>

        {/* Process steps */}
        <div className="mt-24 mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
            역량 모델링 프로세스
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            심리학적 전문성과 데이터 과학을 결합한 4단계 프로세스
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute top-10 left-[10%] right-[10%] hidden h-0.5 bg-border lg:block" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                <div
                  className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold shadow-sm ${
                    step.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground border border-border"
                  }`}
                >
                  {step.step}
                </div>
                <div
                  className={`mt-4 w-full rounded-xl border p-6 shadow-sm ${
                    step.highlight
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-card"
                  }`}
                >
                  <step.icon className={`mx-auto h-5 w-5 ${step.highlight ? "text-primary" : "text-muted-foreground"}`} />
                  <h3 className="mt-3 text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
                  {step.highlight && (
                    <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold text-primary">
                      Exclusive Psychological Data
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation & adaptability */}
        <div className="mt-20 rounded-xl border border-primary/15 bg-card p-8 shadow-sm lg:p-12">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <RefreshCcw className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">자동화 &amp; 적응형 모델</h3>
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                한 번 설정된 역량 모델은 조직 변화에 따라 자동으로 갱신됩니다.
                성과지표가 회사와 함께 진화합니다.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  "국내 최대 역량 DB 보유",
                  "박사급 전문가 50인 이상",
                  "SCI급 논문 200편 이상",
                  "HRD/HRM 모두 지원",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/inquiry"
              className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
            >
              전문가 상담 받기
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
