"use client"

import { useState, useCallback } from "react"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Phone,
  Video,
  Mail,
  MessageSquare,
  Sparkles,
} from "lucide-react"

const steps = [
  {
    id: "reason",
    question: "어세스타를 찾아주신 이유가 무엇인가요?",
    subtitle: "가장 가까운 항목을 선택해주세요.",
    type: "single" as const,
    options: [
      "역량 모델링을 새로 도입하고 싶어서",
      "기존 역량 평가 체계를 개선하고 싶어서",
      "HR 담당자/구성원 교육이 필요해서",
      "AI 기반 HR 플랫폼에 관심이 있어서",
      "기타",
    ],
  },
  {
    id: "experience",
    question: "이전에 역량 모델링 경험이 있으신가요?",
    subtitle: "현재 상황과 가장 가까운 항목을 선택해주세요.",
    type: "single" as const,
    options: [
      "외부 컨설팅을 통해 받아본 적 있음",
      "내부적으로 자체 설계한 경험이 있음",
      "역량 모델링은 처음임",
      "잘 모르겠음",
    ],
  },
  {
    id: "painpoint",
    question: "현재 HR에서 가장 어려운 점은 무엇인가요?",
    subtitle: "해당하는 항목을 모두 선택해주세요.",
    type: "multi" as const,
    options: [
      "객관적인 성과 측정 기준이 없음",
      "평가 결과에 대한 구성원 신뢰도가 낮음",
      "핵심 인재를 식별하기 어려움",
      "평가와 실제 성과 간 연관성이 낮음",
      "HR 데이터를 활용하기 어려움",
      "글로벌/다직군 통합 관리가 어려움",
    ],
  },
  {
    id: "expectation",
    question: "어세스타에 가장 기대하는 점은 무엇인가요?",
    subtitle: "가장 가까운 항목을 선택해주세요.",
    type: "single" as const,
    options: [
      "과학적이고 검증된 역량 모델 설계",
      "자동화된 HR 플랫폼 도입",
      "전문가의 맞춤형 컨설팅",
      "구성원 역량 강화 교육",
      "비용 효율적인 HR 시스템 구축",
    ],
  },
  {
    id: "company",
    question: "기업 정보를 알려주세요.",
    subtitle: "맞춤형 분석을 위해 필요합니다.",
    type: "form" as const,
    fields: [
      { key: "companyName", label: "기업명", placeholder: "예: 주식회사 어세스타" },
      { key: "industry", label: "업종/분야", placeholder: "예: IT / 제조 / 금융" },
      { key: "size", label: "기업 규모 (임직원 수)", placeholder: "예: 500명" },
      { key: "contactName", label: "담당자 성함", placeholder: "홍길동" },
      { key: "email", label: "이메일", placeholder: "email@company.com" },
      { key: "phone", label: "연락처", placeholder: "010-0000-0000" },
    ],
  },
]

const consultMethods = [
  { id: "email", label: "서면 상담", icon: Mail },
  { id: "phone", label: "전화 상담", icon: Phone },
  { id: "video", label: "화상 상담", icon: Video },
  { id: "visit", label: "대면 상담", icon: MessageSquare },
]

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{current + 1} / {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function InquiryForm() {
  const totalSteps = steps.length + 1
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [consultMethod, setConsultMethod] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const step = steps[currentStep]

  const canNext = useCallback(() => {
    if (currentStep >= steps.length) return !!consultMethod
    const s = steps[currentStep]
    if (s.type === "form") {
      return ["companyName", "contactName", "email"].every((k) => formData[k]?.trim())
    }
    const ans = answers[s.id]
    if (!ans) return false
    if (Array.isArray(ans)) return ans.length > 0
    return true
  }, [currentStep, answers, formData, consultMethod])

  const handleNext = () => {
    if (!canNext()) return
    if (currentStep < steps.length) {
      setCurrentStep((p) => p + 1)
    } else {
      setSubmitted(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1)
  }

  const selectSingle = (stepId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }))
  }

  const toggleMulti = (stepId: string, value: string) => {
    setAnswers((prev) => {
      const current = (prev[stepId] as string[]) || []
      return {
        ...prev,
        [stepId]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
  }

  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-2xl px-6 md:px-20 xl:px-[120px]">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-foreground">진단 요청이 완료되었습니다!</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                입력하신 정보를 바탕으로 어세스타 전문가가
                <br />
                맞춤형 분석 결과와 함께 연락드리겠습니다.
              </p>
              <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6">
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  예상 분석 결과
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {answers.experience === "역량 모델링은 처음임"
                    ? "역량 모델링 초기 도입 기업에 적합한 '어세스타 스타터 패키지'를 추천드립니다. AI 기반 역량 모델 설계부터 ASTRA 플랫폼 세팅까지 원스톱으로 제공하여, 빠르고 효율적인 HR 시스템 구축이 가능합니다."
                    : answers.experience === "외부 컨설팅을 통해 받아본 적 있음"
                    ? "기존 역량 모델의 정밀 진단과 함께 ASTRA 플랫폼 기반의 자동화 전환을 추천드립니다. 기존 데이터를 활용한 모델 고도화로 투자 효율을 극대화할 수 있습니다."
                    : "귀사의 상황에 최적화된 역량 모델링 솔루션과 ASTRA 플랫폼 도입 방안을 전문가가 직접 상담해드리겠습니다. 데이터 기반의 HR 혁신을 시작하세요."}
                </p>
              </div>
            </div>
          ) : (
            <>
              <ProgressBar current={currentStep} total={totalSteps} />

              {currentStep < steps.length ? (
                <div>
                  <h3 className="text-xl font-bold text-foreground">{step.question}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.subtitle}</p>
                  <div className="mt-6 space-y-3">
                    {step.type === "single" &&
                      step.options?.map((opt) => {
                        const selected = answers[step.id] === opt
                        return (
                          <button
                            key={opt}
                            onClick={() => selectSingle(step.id, opt)}
                            className={`w-full rounded-lg border px-5 py-4 text-left text-sm transition-all ${
                              selected
                                ? "border-primary bg-primary/5 text-foreground"
                                : "border-border bg-muted/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                                {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                              </div>
                              {opt}
                            </div>
                          </button>
                        )
                      })}

                    {step.type === "multi" &&
                      step.options?.map((opt) => {
                        const selected = ((answers[step.id] as string[]) || []).includes(opt)
                        return (
                          <button
                            key={opt}
                            onClick={() => toggleMulti(step.id, opt)}
                            className={`w-full rounded-lg border px-5 py-4 text-left text-sm transition-all ${
                              selected
                                ? "border-primary bg-primary/5 text-foreground"
                                : "border-border bg-muted/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${selected ? "border-primary bg-primary" : "border border-muted-foreground"}`}>
                                {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                              </div>
                              {opt}
                            </div>
                          </button>
                        )
                      })}

                    {step.type === "form" &&
                      step.fields?.map((field) => (
                        <div key={field.key}>
                          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{field.label}</label>
                          <input
                            type={field.key === "email" ? "email" : "text"}
                            placeholder={field.placeholder}
                            value={formData[field.key] || ""}
                            onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                            className="w-full rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-foreground">원하시는 상담 방식을 선택해주세요</h3>
                  <p className="mt-1 text-sm text-muted-foreground">선택하신 방식으로 전문가가 연락드립니다.</p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {consultMethods.map((method) => {
                      const selected = consultMethod === method.id
                      return (
                        <button
                          key={method.id}
                          onClick={() => setConsultMethod(method.id)}
                          className={`flex flex-col items-center gap-3 rounded-lg border p-6 transition-all ${
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-muted/30 hover:border-primary/30"
                          }`}
                        >
                          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${selected ? "bg-primary/20" : "bg-muted"}`}>
                            <method.icon className={`h-5 w-5 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <span className={`text-sm font-medium ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                            {method.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  이전
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canNext()}
                  className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-30"
                >
                  {currentStep >= steps.length ? "정식 상담 요청하기" : "다음"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
