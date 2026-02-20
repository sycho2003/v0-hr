'use client'

import { useState } from 'react'
import { LayoutDashboard, FileText, MessageSquare, TrendingUp, Users, BarChart3, Calendar, Clock, CheckCircle2, Send, Bot } from 'lucide-react'

const tabs = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard, description: '핵심 지표와 실시간 데이터를 한눈에 확인하세요.' },
  { id: 'report', label: '리포트', icon: FileText, description: '상세 분석 리포트를 자동으로 생성합니다.' },
  { id: 'assistant', label: '어시스턴트', icon: MessageSquare, description: 'AI가 데이터 기반 인사이트를 실시간 제공합니다.' },
]

/* ── Dashboard Prototype ── */
function DashboardProto() {
  const [activeMetric, setActiveMetric] = useState(0)
  const metrics = [
    { label: '예측 정확도', value: '94.2%', sub: 'Prediction Accuracy', change: '+2.1%', positive: true },
    { label: '분석 대상 표본', value: '12,000', sub: 'Sample Size', change: '+840', positive: true },
    { label: '리서치 진행률', value: '78%', sub: 'Research Health', change: null, positive: true },
  ]

  const barData = [
    { label: '경영', h: 65 },
    { label: '개발', h: 82 },
    { label: '마케팅', h: 58 },
    { label: '영업', h: 74 },
    { label: '인사', h: 91 },
    { label: '재무', h: 47 },
    { label: '기획', h: 68 },
    { label: '디자인', h: 85 },
  ]

  const recentItems = [
    { title: '2025 상반기 역량 평가 분석', date: '2025.06.12', status: '완료' },
    { title: 'AI 면접 정확도 검증 리포트', date: '2025.06.08', status: '완료' },
    { title: '수습 기간 예측 모델 v3', date: '2025.06.01', status: '진행중' },
  ]

  return (
    <div className="space-y-4 p-5">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m, i) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setActiveMetric(i)}
            className={`rounded-lg border p-3.5 text-left transition-all ${
              activeMetric === i
                ? 'border-[rgb(59_130_246/0.4)] bg-[rgb(59_130_246/0.05)]'
                : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
            }`}
          >
            <p className="text-[10px] font-medium text-neutral-500">{m.sub}</p>
            <p className="mt-1 text-2xl font-bold text-white">{m.value}</p>
            {m.change && (
              <p className={`mt-0.5 text-xs font-semibold ${m.positive ? 'text-[rgb(59_130_246)]' : 'text-red-400'}`}>
                {m.change}
              </p>
            )}
            {!m.change && (
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[rgb(59_130_246)] transition-all" style={{ width: '78%' }} />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-3">
        {/* Bar chart */}
        <div className="col-span-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-neutral-400">부서별 역량 분포</p>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[rgb(59_130_246)]" />
              <span className="text-[10px] text-neutral-500">평균 대비</span>
            </div>
          </div>
          <div className="mt-4 flex items-end gap-2" style={{ height: 120 }}>
            {barData.map((d) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-[rgb(59_130_246/0.25)] transition-all duration-300 hover:bg-[rgb(59_130_246/0.5)]"
                  style={{ height: `${d.h}%` }}
                />
                <span className="text-[9px] text-neutral-500">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent list */}
        <div className="col-span-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-xs font-semibold text-neutral-400">Research Notes</p>
          <div className="mt-3 space-y-2.5">
            {recentItems.map((item) => (
              <div key={item.title} className="group cursor-pointer rounded-md border border-white/[0.04] bg-white/[0.02] p-2.5 transition-all hover:border-[rgb(59_130_246/0.2)] hover:bg-[rgb(59_130_246/0.05)]">
                <p className="text-[11px] font-medium text-neutral-300 group-hover:text-white">{item.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] text-neutral-500">{item.date}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                    item.status === '완료' ? 'bg-[rgb(59_130_246/0.1)] text-[rgb(59_130_246)]' : 'bg-amber-400/10 text-amber-400'
                  }`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Report Prototype ── */
function ReportProto() {
  const [selectedReport, setSelectedReport] = useState(0)
  const reports = [
    {
      title: '2025 상반기 채용 효과성 분석',
      date: '2025.06.15',
      author: '김지현',
      sections: [
        { name: '요약 (Executive Summary)', pages: 3 },
        { name: '역량 모델 분석', pages: 8 },
        { name: '예측 타당도 검증', pages: 12 },
        { name: '부서별 채용 성과', pages: 6 },
        { name: '결론 및 제언', pages: 4 },
      ],
    },
    {
      title: 'AI 면접 도입 효과 비교 연구',
      date: '2025.05.28',
      author: '박서연',
      sections: [
        { name: '연구 배경', pages: 4 },
        { name: '방법론', pages: 6 },
        { name: '데이터 분석 결과', pages: 15 },
        { name: '시사점', pages: 5 },
      ],
    },
    {
      title: '수습 기간 성과 예측 모델 검증',
      date: '2025.05.10',
      author: '이준호',
      sections: [
        { name: '모델 개요', pages: 3 },
        { name: '검증 방법', pages: 7 },
        { name: '결과 분석', pages: 10 },
        { name: '활용 방안', pages: 4 },
      ],
    },
  ]
  const active = reports[selectedReport]

  return (
    <div className="flex h-full">
      {/* Sidebar list */}
      <div className="w-52 shrink-0 border-r border-white/[0.06] p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">리포트 목록</p>
        <div className="space-y-1.5">
          {reports.map((r, i) => (
            <button
              key={r.title}
              type="button"
              onClick={() => setSelectedReport(i)}
              className={`w-full rounded-md px-3 py-2.5 text-left transition-all ${
                selectedReport === i
                  ? 'bg-[rgb(59_130_246/0.1)] text-white'
                  : 'text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200'
              }`}
            >
              <p className="text-[11px] font-medium leading-snug">{r.title}</p>
              <p className="mt-0.5 text-[10px] text-neutral-500">{r.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail view */}
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">{active.title}</h3>
            <div className="mt-1 flex items-center gap-3 text-[10px] text-neutral-500">
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{active.author}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{active.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{active.sections.reduce((a, s) => a + s.pages, 0)}p</span>
            </div>
          </div>
          <span className="rounded-full bg-[rgb(59_130_246/0.1)] px-2.5 py-1 text-[10px] font-semibold text-[rgb(59_130_246)]">Published</span>
        </div>

        <div className="mt-5 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">목차</p>
          {active.sections.map((s, i) => (
            <div
              key={s.name}
              className="group flex cursor-pointer items-center justify-between rounded-md border border-white/[0.04] bg-white/[0.02] px-4 py-2.5 transition-all hover:border-[rgb(59_130_246/0.2)] hover:bg-[rgb(59_130_246/0.05)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06] text-[9px] font-bold text-neutral-400 group-hover:bg-[rgb(59_130_246/0.2)] group-hover:text-[rgb(59_130_246)]">{i + 1}</span>
                <span className="text-xs text-neutral-300 group-hover:text-white">{s.name}</span>
              </div>
              <span className="text-[10px] text-neutral-500">{s.pages}p</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Assistant Prototype ── */
function AssistantProto() {
  const [messages] = useState([
    { role: 'user', text: '이번 분기 채용 효과성을 분석해주세요.' },
    { role: 'ai', text: '2025년 2분기 채용 효과성 분석 결과를 정리해드리겠습니다.\n\n핵심 지표 요약:\n- 예측 타당도: 0.72 (전분기 대비 +0.05)\n- 1년 재직률: 89.3% (업계 평균 대비 +12.1%p)\n- 수습 통과율: 94.7%\n\n특히 AI 면접을 도입한 직무군에서 예측 정확도가 15% 향상되었습니다.' },
    { role: 'user', text: '부서별로 가장 효과가 좋았던 곳은?' },
    { role: 'ai', text: '부서별 채용 효과성 순위입니다:\n\n1. 개발팀 (효과지수 92.1) - AI 코딩 면접 도입 효과\n2. 영업팀 (효과지수 88.7) - 역량 예측 모델 정확도 향상\n3. 기획팀 (효과지수 85.3) - 구조화 면접 강화\n\n개발팀의 경우, 기술 역량 평가와 문화 적합성 평가의 조합이 주효했습니다.' },
  ])

  return (
    <div className="flex h-full flex-col">
      {/* Chat feed */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className="mr-2.5 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(59_130_246/0.15)]">
                <Bot className="h-3.5 w-3.5 text-[rgb(59_130_246)]" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-xl px-4 py-3 text-[12px] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[rgb(59_130_246/0.15)] text-neutral-200'
                  : 'border border-white/[0.06] bg-white/[0.03] text-neutral-300'
              }`}
            >
              {msg.text.split('\n').map((line, j) => (
                <span key={j}>
                  {line}
                  {j < msg.text.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="border-t border-white/[0.06] p-4">
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
          <input
            type="text"
            placeholder="ASTRA에게 질문하세요..."
            className="flex-1 bg-transparent text-xs text-neutral-300 placeholder:text-neutral-600 focus:outline-none"
            readOnly
          />
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md bg-[rgb(59_130_246/0.2)] text-[rgb(59_130_246)] transition-colors hover:bg-[rgb(59_130_246/0.3)]">
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-neutral-600">ASTRA AI는 사내 데이터 기반으로 응답합니다.</p>
      </div>
    </div>
  )
}

/* ── Main Section ── */
export function InteractiveFeatureShowcase() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <section className="mt-20 lg:mt-28">
        {/* Section header */}
        <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.22em]">Interactive Showcase</p>
        <h2 className="title-group__heading text-2xl font-bold text-white md:text-3xl">
          ASTRA 플랫폼을 직접 체험해보세요
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
          대시보드, 리포트, AI 어시스턴트까지 -- 채용의 모든 단계를 하나의 플랫폼에서 관리합니다.
        </p>

        {/* Chip tabs */}
        <div className="mt-10 flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-2.5 rounded-xl border px-5 py-3.5 text-left transition-all ${
                  isActive
                    ? 'border-[rgb(59_130_246/0.4)] bg-[rgb(59_130_246/0.08)] shadow-[0_0_20px_rgba(37,99,235,0.08)]'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/15 hover:bg-[rgb(59_130_246/0.04)]'
                }`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  isActive ? 'bg-brand-primary-soft text-brand-primary' : 'bg-white/[0.06] text-neutral-500 group-hover:text-neutral-300'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                    {tab.label}
                  </p>
                  <p className="hidden text-[11px] text-neutral-500 sm:block">{tab.description}</p>
                </div>
                {/* Radio indicator */}
                <div className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isActive ? 'border-[rgb(59_130_246)]' : 'border-white/15'
                }`}>
                  {isActive && <div className="bg-brand-primary h-2.5 w-2.5 rounded-full" />}
                </div>
              </button>
            )
          })}
        </div>

        {/* MacOS browser window */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0f] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#111118] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-2 hidden items-center gap-2 text-neutral-500 sm:flex">
                <span className="text-xs">{'<-'}</span>
                <span className="text-xs">{'->'}</span>
              </div>
            </div>
            <div className="mx-4 flex-1 rounded-md bg-white/[0.05] px-4 py-1.5 text-center">
              <span className="text-[11px] font-medium text-neutral-500">app.astra-hr.io/{activeTab}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-500">
              <BarChart3 className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Tab bar inside browser */}
          <div className="flex border-b border-white/[0.06] bg-[#0d0d14]">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-5 py-2.5 text-[11px] font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-[rgb(59_130_246)] bg-white/[0.03] text-white'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content area */}
          <div className="min-h-[380px] md:min-h-[420px]">
            {activeTab === 'dashboard' && <DashboardProto />}
            {activeTab === 'report' && <ReportProto />}
            {activeTab === 'assistant' && <AssistantProto />}
          </div>
        </div>
    </section>
  )
}
