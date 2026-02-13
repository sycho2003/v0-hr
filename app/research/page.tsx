import type { Metadata } from "next"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  ChevronRight,
  ClipboardCheck,
  Database,
  Eye,
  FileSearch,
  Layers,
  Mic,
  PenLine,
  RefreshCcw,
  Scale,
  Search,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "리서치 | ASSESSTA",
  description:
    "왜 막대한 비용을 들인 HR 컨설팅이 실패하는가. 어세스타의 행동 기반 역량 모델링과 과학적 타당성을 소개합니다.",
}

export default function ResearchPage() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/[0.04] blur-3xl" />
          <div className="absolute bottom-0 -left-40 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
              <Search className="h-3.5 w-3.5" />
              Core Argument
            </span>
            <h1 className="mt-6 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {'왜 막대한 비용을 들인'}
              <br />
              {'HR 컨설팅이 '}
              <span className="text-primary">{'실패'}</span>
              {'하는가?'}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {"'잠재력(Potential)'과 '수행(Performance)'의 혼동이 만드는 구조적 한계를 과학적으로 분석합니다."}
            </p>
          </div>
        </div>
      </section>

      {/* ───── PAIN POINT ───── */}
      <section className="py-20 lg:py-24 bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: explanation */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                <AlertTriangle className="h-3.5 w-3.5" />
                Pain Point
              </span>
              <h2 className="mt-5 text-balance text-2xl font-bold text-foreground sm:text-3xl">
                {"무늬만 역량평가인"}
                <br />
                {"'가짜 모델'의 한계"}
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {"많은 기업이 역량 모델링을 의뢰하지만, 결과물은 '보편적인 인재상'을 벗어나지 못합니다."}
              </p>
            </div>

            {/* Right: problem cards */}
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                    <Target className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{"오류의 핵심"}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {"대다수 컨설팅은 '일반 인지능력(GMA)'이나 '성격(Personality)'을 측정하는 검사를 '역량평가'라고 명명합니다."}
                </p>
                <div className="mt-4 rounded-lg bg-muted/60 p-4">
                  <p className="text-xs font-medium leading-relaxed text-foreground">
                    {"이는 \"머리가 좋고 성격이 좋은 사람\"을 뽑는 도구이지,"}
                    <br />
                    <span className="font-bold text-primary">
                      {"\"우리 회사에서 일을 잘할 사람\"을 뽑는 도구(Behavioral Predictor)가 아닙니다."}
                    </span>
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{"결과"}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {"직무 환경(Context)이 배제된 채 범용적인 검사 도구를 사용하므로 타당도(Validity)가 떨어지며, 조직 문화가 바뀌면 도구 전체를 폐기해야 하는 비효율이 발생합니다."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── SOLUTION: 4-STEP PROCESS ───── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
              <BadgeCheck className="h-3.5 w-3.5" />
              Solution
            </span>
            <h2 className="mt-5 text-balance text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              {"Assesta's Authentic"}
              <br />
              {"Competency Modeling"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {"국제 표준에 입각한 '행동 기반' 역량 모델링. 가장 높은 타당도를 확보하기 위한 심리학적 필터링 4단계 프로세스입니다."}
            </p>
          </div>

          {/* 4 Steps */}
          <div className="mt-16 grid gap-6 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="group relative rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  01
                </span>
                <Mic className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 text-base font-bold text-foreground">{"고성과자 인터뷰"}</h3>
              <p className="mt-1 text-xs font-medium text-primary">{"BEI: Behavioral Event Interview"}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {"단순 인터뷰가 아닙니다. 과거에 실제로 겪었던 결정적인 성공/실패 사건에 대해 STAR 기법을 사용하여 집요하게 파고듭니다."}
              </p>
              <div className="mt-4 rounded-lg bg-primary/5 p-3">
                <p className="text-xs leading-relaxed text-foreground">
                  <span className="font-semibold">{"목적: "}</span>
                  {"고성과자가 무의식적으로 발휘하는 '암묵적 지식(Tacit Knowledge)'과 '행동 패턴'을 텍스트 데이터로 포착"}
                </p>
              </div>
              {/* connector arrow - visible on lg */}
              <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                <ChevronRight className="h-6 w-6 text-border" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  02
                </span>
                <BrainCircuit className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 text-base font-bold text-foreground">{"핵심 특성 추출"}</h3>
              <p className="mt-1 text-xs font-medium text-primary">{"Psychological Competency Extraction"}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {"수집된 방대한 인터뷰 데이터(Verbatim)에서 심리학 전문가가 '역량(Competency)'을 코딩합니다."}
              </p>
              <div className="mt-4 rounded-lg bg-primary/5 p-3">
                <p className="text-xs leading-relaxed text-foreground">
                  <span className="font-semibold">{"예시: "}</span>
                  {"\"고객이 화낼 때 끝까지 들어줬다\" → '대인관계적 인내' 혹은 '고객지향성'이라는 측정 가능한 단위로 변환"}
                </p>
              </div>
              <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                <ChevronRight className="h-6 w-6 text-border" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative rounded-2xl border-2 border-primary/30 bg-primary/[0.02] p-7 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  03
                </span>
                <Database className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-5 flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">{"Assesta DB 벤치마킹"}</h3>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">EXCLUSIVE</span>
              </div>
              <p className="mt-1 text-xs font-medium text-primary">{"Normative Validation"}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {"추출된 역량이 우리 회사에서만 통하는 특이한 케이스인지, 보편적으로 통용 가능한지 검증합니다."}
              </p>
              <div className="mt-4 rounded-lg bg-primary/5 p-3">
                <p className="text-xs leading-relaxed text-foreground">
                  <span className="font-semibold">{"25년 데이터: "}</span>
                  {"수만 명의 평가 데이터(Norm Group)와 대조하여 통계적 검증(Validation)을 거칩니다. 이 과정이 없으면 \"이상적이지만 현실성 없는\" 모델이 됩니다."}
                </p>
              </div>
              <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                <ChevronRight className="h-6 w-6 text-border" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  04
                </span>
                <SlidersHorizontal className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 text-base font-bold text-foreground">{"맞춤형 지표 설정"}</h3>
              <p className="mt-1 text-xs font-medium text-primary">{"Customized Behavioral Indicators"}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {"추상적인 역량을 평가자가 관찰할 수 있는 구체적인 행동 목록으로 정의합니다."}
              </p>
              <div className="mt-4 rounded-lg bg-primary/5 p-3">
                <p className="text-xs leading-relaxed text-foreground">
                  <span className="font-semibold">{"Culture Fit: "}</span>
                  {"기업의 비전과 핵심 가치에 맞춰 지표의 가중치를 조정. 평가자는 이 지표(Checklist)를 기준으로 판단하므로 주관이 개입될 틈이 없습니다."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── EVIDENCE: 3 VALIDITIES ───── */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
              <Shield className="h-3.5 w-3.5" />
              Evidence
            </span>
            <h2 className="mt-5 text-balance text-2xl font-bold text-foreground sm:text-3xl">
              {"왜 이 프로세스가 '과학적'인가?"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {"학술적 근거에 기반한 3가지 타당성 방어 논리. 이 모델이 단순한 트렌드가 아니라, 반박할 수 없는 정석(Standard)인 이유입니다."}
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {/* Evidence 1 */}
            <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-4 border-b border-border p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wide text-primary uppercase">Evidence 01</p>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{"국제 표준 준수"}</h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold text-muted-foreground">
                  International Guidelines for Assessment Center Operations
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {"국제 가이드라인은 \"직무 관련 시뮬레이션을 통해 행동을 관찰하지 않는 평가는 AC(평가센터)라 부를 수 없다\"고 명시합니다."}
                </p>
                <div className="mt-auto pt-4">
                  <div className="rounded-lg bg-primary/5 p-3">
                    <p className="text-xs font-medium leading-relaxed text-foreground">
                      {"어세스타의 모델은 이 가이드라인을 100% 준수하여, 단순 심리검사가 아닌 "}
                      <span className="font-bold text-primary">{"실제 수행(Demonstration)"}</span>
                      {"을 평가 — '생태학적 타당도'가 가장 높습니다."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence 2 */}
            <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-4 border-b border-border p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wide text-primary uppercase">Evidence 02</p>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{"ORCE 모델"}</h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "Observe", icon: Eye },
                    { label: "Record", icon: PenLine },
                    { label: "Classify", icon: Layers },
                    { label: "Evaluate", icon: ClipboardCheck },
                  ].map((step) => (
                    <span key={step.label} className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground">
                      <step.icon className="h-3 w-3 text-primary" />
                      {step.label}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {"평가자는 관찰 → 기록 → 분류 → 평가의 4단계를 엄격히 분리합니다. \"인상이 좋다\", \"말을 잘한다\" 같은 후광 효과(Halo Effect)를 원천 차단합니다."}
                </p>
                <div className="mt-auto pt-4">
                  <div className="rounded-lg bg-primary/5 p-3">
                    <p className="text-xs font-medium leading-relaxed text-foreground">
                      {"기록된 "}
                      <span className="font-bold text-primary">{"행동적 증거(Behavioral Evidence)"}</span>
                      {"가 없으면 점수를 줄 수 없는 구조입니다."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence 3 */}
            <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-4 border-b border-border p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <FileSearch className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wide text-primary uppercase">Evidence 03</p>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{"Schmidt & Hunter(1998)"}</h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold text-muted-foreground">
                  {"85년간의 메타분석 연구"}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {"일반지능검사(GMA)만 사용할 때보다 역량평가(Work Sample/AC)를 결합했을 때 성과 예측력이 비약적으로 상승(Incremental Validity)함을 입증했습니다."}
                </p>
                <div className="mt-auto pt-4">
                  <div className="rounded-lg bg-primary/5 p-3">
                    <p className="text-xs font-medium leading-relaxed text-foreground">
                      {"\"머리 좋은 사람\"이 아닌 "}
                      <span className="font-bold text-primary">{"\"일 잘하는 사람\""}</span>
                      {"을 뽑기 위한 통계적으로 가장 안전한 투자입니다."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── DIFFERENTIATION: AI SUSTAINABILITY ───── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Differentiation
              </span>
              <h2 className="mt-5 text-balance text-2xl font-bold text-foreground sm:text-3xl">
                {"AI와의 결합을 통한"}
                <br />
                <span className="text-primary">{"'지속가능성'"}</span>
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {"기존 컨설팅의 가장 큰 문제인 \"시간이 지나면 못 쓰게 되는 문제\"를 어세스타는 이렇게 해결합니다."}
              </p>
            </div>

            <div className="space-y-5">
              {/* Dynamic Criteria */}
              <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <RefreshCcw className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{"Dynamic Criteria Adjustment"}</h3>
                </div>
                <p className="mt-1 pl-[52px] text-xs font-medium text-primary">{"동적 기준 조정"}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {"회사의 전략이 바뀌면(예: 공격적 영업 → 고객 관리), 처음부터 인터뷰를 다시 할 필요가 없습니다."}
                </p>
                <div className="mt-4 flex items-center gap-3 rounded-lg bg-primary/5 p-4">
                  <Zap className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-xs font-medium leading-relaxed text-foreground">
                    {"이미 축적된 고성과자의 행동 데이터(Raw Data)를 AI가 새로운 인재상 기준에 맞춰 "}
                    <span className="font-bold text-primary">{"재분석(Re-weighting)"}</span>
                    {"합니다."}
                  </p>
                </div>
              </div>

              {/* Qualitative Data */}
              <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{"정성적 데이터의 자산화"}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {"수치로 잡히지 않는 태도와 잠재력까지 데이터베이스화되어 있어, 우선순위만 바꾸면 언제든 변화된 조직 상황에 맞는 "}
                  <span className="font-semibold text-foreground">{"새로운 역량 모델을 즉시 산출"}</span>
                  {"할 수 있습니다."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Users className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-4 text-2xl font-bold text-foreground">
            {"과학적 역량 모델링이 필요하신가요?"}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {"25년의 연구 데이터와 심리학 전문성을 기반으로 귀사만의 역량 모델을 설계합니다."}
          </p>
          <Link
            href="/inquiry"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
          >
            {"전문가 상담 신청"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  )
}
