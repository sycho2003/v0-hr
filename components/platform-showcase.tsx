"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Cpu,
  LayoutDashboard,
  FileBarChart,
  Settings2,
  ArrowRight,
  Zap,
  Lock,
  RefreshCcw,
  CheckCircle2,
  Download,
} from "lucide-react"

const tabs = [
  { id: "dashboard", icon: LayoutDashboard, label: "HR Dashboard" },
  { id: "report", icon: FileBarChart, label: "Reports" },
  { id: "modeling", icon: Cpu, label: "AI Modeling" },
  { id: "config", icon: Settings2, label: "Settings" },
]

function DashboardMock() {
  return (
    <div className="space-y-4 p-6">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "전체 역량 점수", value: "78.5", change: "+3.2%" },
          { label: "핵심 인재 비율", value: "23%", change: "+1.8%" },
          { label: "평가 완료율", value: "94%", change: "+5%" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs font-medium text-primary">{stat.change}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-muted/40 p-4">
        <p className="mb-3 text-xs font-medium text-muted-foreground">부서별 역량 분포</p>
        <div className="flex items-end gap-2" style={{ height: 100 }}>
          {[65, 78, 82, 55, 90, 70, 85, 60].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-primary/30 transition-all hover:bg-primary" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          {["경영", "개발", "마케팅", "영업", "인사", "재무", "기획", "디자인"].map((d) => (
            <span key={d} className="flex-1 text-center text-[9px] text-muted-foreground">{d}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReportMock() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-4">
        <div>
          <p className="text-sm font-semibold text-foreground">김민수 역량 프로파일</p>
          <p className="text-xs text-muted-foreground">경영기획팀 / 과장</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">상위 15%</span>
      </div>
      <div className="space-y-3">
        {[
          { name: "전략적 사고", score: 92 },
          { name: "리더십", score: 85 },
          { name: "문제 해결", score: 88 },
          { name: "커뮤니케이션", score: 78 },
          { name: "혁신 추진", score: 95 },
        ].map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-semibold text-foreground">{item.score}</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ModelingMock() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <Cpu className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium text-primary">AI 모델링 엔진 활성화</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "추출된 역량", value: "12개" },
          { label: "분석 데이터", value: "245K" },
          { label: "모델 정확도", value: "94.7%" },
          { label: "처리 시간", value: "2.3초" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-muted/40 p-3">
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {["전략적 사고력", "데이터 문해력", "애자일 리더십"].map((comp, i) => (
          <div key={comp} className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{i + 1}</span>
            <span className="text-xs font-medium text-foreground">{comp}</span>
            <span className="ml-auto text-[10px] font-medium text-primary">신뢰도 97%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConfigMock() {
  return (
    <div className="space-y-4 p-6">
      <div className="rounded-lg border border-border bg-muted/40 p-4">
        <p className="text-sm font-semibold text-foreground">평가 설정</p>
        <p className="text-xs text-muted-foreground">역량 프레임워크 및 평가 척도 구성</p>
      </div>
      <div className="space-y-2">
        {[
          { label: "평가 척도", value: "5점 리커트 척도" },
          { label: "역량 프레임워크", value: "Assesta 표준 v3.2" },
          { label: "보고서 양식", value: "경영진 요약형" },
          { label: "데이터 갱신 주기", value: "분기별 자동" },
        ].map((config) => (
          <div key={config.label} className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
            <span className="text-xs text-muted-foreground">{config.label}</span>
            <span className="text-xs font-medium text-foreground">{config.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const roadmap = [
  { quarter: "Q1 2026", title: "글로벌 역량 프레임워크", done: true },
  { quarter: "Q2 2026", title: "실시간 360도 피드백", done: true },
  { quarter: "Q3 2026", title: "AI 코칭 어시스턴트", done: false },
  { quarter: "Q4 2026", title: "예측 인재 분석", done: false },
]

export function PlatformShowcase() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-20 xl:px-[120px]">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">Astra Platform</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            어세스타 고유 DB 기반
            <br />
            역량 모델링 자동화
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            25년간의 심리학적 전문성과 AI를 융합한 ASTRA 플랫폼으로
            역량 모델링부터 평가, 분석까지 전 과정을 자동화하세요.
          </p>
        </div>

        {/* Browser mockup */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/40" />
                <div className="h-3 w-3 rounded-full bg-chart-4/40" />
                <div className="h-3 w-3 rounded-full bg-chart-2/40" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-muted px-4 py-1.5 text-xs text-muted-foreground">
                app.astra-platform.io
              </div>
            </div>
            <div className="flex border-b border-border bg-muted/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary bg-card text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
            {activeTab === "dashboard" && <DashboardMock />}
            {activeTab === "report" && <ReportMock />}
            {activeTab === "modeling" && <ModelingMock />}
            {activeTab === "config" && <ConfigMock />}
          </div>
        </div>

        {/* USP cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
          {[
            { icon: Zap, title: "빠른 도입", desc: "기존 HR 시스템과 매끄럽게 연동, 2주 내 세팅 완료" },
            { icon: Lock, title: "데이터 보안", desc: "ISO 27001 인증 기반 엔터프라이즈급 보안" },
            { icon: RefreshCcw, title: "지속적 업데이트", desc: "조직 변화에 맞게 역량 모델 자동 갱신" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div className="mx-auto mt-20 max-w-3xl">
          <h3 className="text-center text-lg font-bold text-foreground">Scalability Roadmap</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">ASTRA 플랫폼은 지속적으로 진화합니다</p>
          <div className="relative mt-10">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
            <div className="grid grid-cols-4 gap-4">
              {roadmap.map((item) => (
                <div key={item.quarter} className="relative flex flex-col items-center text-center">
                  <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${item.done ? "border-primary bg-primary" : "border-border bg-card"}`}>
                    {item.done && <CheckCircle2 className="h-4 w-4 text-primary-foreground" />}
                  </div>
                  <p className="mt-3 text-xs font-semibold text-foreground">{item.quarter}</p>
                  <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lead Gen CTA */}
        <div className="mx-auto mt-20 max-w-4xl rounded-xl border border-border bg-muted/30 p-8 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-primary">무료 백서 다운로드</p>
              </div>
              <h3 className="mt-3 text-xl font-bold text-foreground lg:text-2xl">
                백서 &amp; 샘플 리포트를 받아보세요
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                ASTRA 플랫폼의 실제 성과 분석 리포트와 샘플 대시보드를 확인할 수 있습니다.
              </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {[
                { label: "기업명", placeholder: "Company Name", key: "company" },
                { label: "성함", placeholder: "Your Name", key: "name" },
                { label: "이메일", placeholder: "email@company.com", key: "email" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{field.label}</label>
                  <input
                    type={field.key === "email" ? "email" : "text"}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
              >
                백서 신청하기
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
