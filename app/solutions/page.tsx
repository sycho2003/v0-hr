'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Brain, Bot, CheckCheck, ChevronDown, LayoutDashboard, FileText, Mic, Sparkles } from 'lucide-react'

const processCards = [
  {
    key: 'data',
    icon: Brain,
    title: '심리 데이터 분석',
    summary: '25년 누적 데이터로 지원자의 잠재력을 수치화합니다.',
    detail:
      'ASTRA는 다년간 축적된 심리측정 데이터와 직무 성과 데이터를 결합해 지원자의 잠재 역량을 정량화합니다. 직관 대신 검증된 지표를 기반으로 인재를 선별합니다.',
  },
  {
    key: 'ai',
    icon: Bot,
    title: 'AI 자동화 평가',
    summary: 'STT/FACS 기술로 면접 내용을 3초 만에 구조화합니다.',
    detail:
      '면접 음성·표정·언어 신호를 실시간 분석해 핵심 행동 역량을 구조화합니다. 면접관의 부담은 줄이고, 평가 속도와 일관성을 동시에 확보합니다.',
  },
  {
    key: 'expert',
    icon: CheckCheck,
    title: '전문가 검증',
    summary: 'AI가 놓친 정성적 맥락을 산업별 전문가가 더블 체크합니다.',
    detail:
      '산업/직무 전문가가 결과를 교차 검토해 맥락 오해와 편향 위험을 보정합니다. AI와 전문가의 하이브리드 체계로 최종 의사결정 신뢰도를 높입니다.',
  },
]

const featureShots = [
  { title: 'Performance Dashboard', icon: LayoutDashboard },
  { title: 'Predictive Report', icon: FileText },
  { title: 'Interview Assistant', icon: Mic },
  { title: 'Insight Feed', icon: Sparkles },
]

export default function SolutionsPage() {
  const [openCard, setOpenCard] = useState('data')
  const { scrollYProgress } = useScroll()
  const translateY = useTransform(scrollYProgress, [0, 0.35], [30, 0])

  return (
    <div className="min-h-screen bg-neutral-950 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <section>
          <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.22em]">Astra Product</p>
          <h1 className="mt-3 max-w-4xl break-keep text-3xl font-extrabold leading-tight md:text-4xl">
            채용의 불확실성을 0으로 만드는 데이터 솔루션, ASTRA.
          </h1>

          <motion.div
            style={{ y: translateY }}
            className="mt-10 origin-center rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_35px_80px_rgba(0,0,0,0.45)] backdrop-blur-md"
          >
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
                <p className="text-sm text-neutral-300">Competency Prediction</p>
                <div className="mt-4 h-48 rounded-xl bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.28),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(59,130,246,0.22),transparent_45%)]" />
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
                  <p className="text-sm text-neutral-300">AI Score</p>
                  <p className="text-brand-primary mt-3 text-3xl font-extrabold">94.2%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
                  <p className="text-sm text-neutral-300">Review Time</p>
                  <p className="text-brand-primary mt-3 text-3xl font-extrabold">3 sec</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-20">
          <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.22em]">Psychology Data + AI Automation + Expert Verification</p>
          <h2 className="mt-3 text-xl font-bold md:text-2xl">3-Step Process</h2>

          <div className="mt-8 space-y-4">
            {processCards.map((card) => {
              const Icon = card.icon
              const isOpen = openCard === card.key
              return (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => setOpenCard(card.key)}
                  onMouseEnter={() => setOpenCard(card.key)}
                  className="hover-border-brand-primary-soft w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-sm transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-brand-primary-soft">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white md:text-2xl">{card.title}</h3>
                        <p className="mt-2 text-neutral-300">{card.summary}</p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform ${isOpen ? 'rotate-180 text-brand-primary-soft' : ''}`} />
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 border-t border-white/10 pt-4 text-neutral-300">{card.detail}</p>
                  </motion.div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-xl font-bold md:text-2xl">Feature Grid</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featureShots.map((item, idx) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
                >
                  <div className="aspect-[16/10] bg-neutral-900 p-4">
                    <div className="h-full rounded-xl border border-white/10 bg-[radial-gradient(circle_at_20%_25%,rgba(34,211,238,0.25),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.22),transparent_45%)] p-4">
                      <div className="border-brand-primary-soft bg-brand-primary-soft text-brand-primary-soft mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                        <Icon className="h-4 w-4" />
                        Shot {idx + 1}
                      </div>
                      <div className="grid h-[calc(100%-2.25rem)] grid-cols-2 gap-3">
                        <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                          <div className="mb-2 h-2 w-16 rounded bg-white/20" />
                          <div className="space-y-1.5">
                            <div className="h-1.5 rounded bg-blue-300/80" style={{ width: '78%' }} />
                            <div className="h-1.5 rounded bg-blue-300/70" style={{ width: '56%' }} />
                            <div className="h-1.5 rounded bg-teal-300/60" style={{ width: '88%' }} />
                          </div>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                          <div className="mb-2 h-2 w-14 rounded bg-white/20" />
                          <div className="flex h-[72px] items-end gap-1">
                            {[40, 68, 55, 80, 60].map((v, i) => (
                              <span key={`${item.title}-${i}`} className="w-2 rounded-t bg-blue-300/80" style={{ height: `${v}%` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-base font-semibold text-white md:text-lg">{item.title}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
