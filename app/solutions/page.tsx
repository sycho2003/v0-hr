'use client'

import { useState } from 'react'
import Image from 'next/image'
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
  { title: 'Performance Dashboard', icon: LayoutDashboard, image: '/images/solutions/prototype-1.svg' },
  { title: 'Predictive Report', icon: FileText, image: '/images/solutions/prototype-2.svg' },
  { title: 'Interview Assistant', icon: Mic, image: '/images/solutions/prototype-3.svg' },
  { title: 'Insight Feed', icon: Sparkles, image: '/images/solutions/prototype-4.svg' },
]

function GeneratedDemoReel() {
  const [fallbacks, setFallbacks] = useState([false, false, false, false])
  const layers = [
    { src: '/images/solutions/reel-1.png', fallback: '/images/solutions/prototype-1.svg', className: 'reel-layer-1', alt: 'Form scene' },
    { src: '/images/solutions/reel-2.png', fallback: '/images/solutions/prototype-2.svg', className: 'reel-layer-2', alt: 'Dashboard scene' },
    { src: '/images/solutions/reel-3.png', fallback: '/images/solutions/prototype-3.svg', className: 'reel-layer-3', alt: 'Node scene' },
    { src: '/images/solutions/reel-4.png', fallback: '/images/solutions/prototype-4.svg', className: 'reel-layer-4', alt: 'Modal scene' },
  ]

  return (
    <div className="relative mt-4 h-[20rem] overflow-hidden rounded-xl border border-white/10 bg-[#050914] md:h-[24rem] lg:h-[28rem]">
      <div className="absolute inset-x-3 top-3 z-20 flex h-7 items-center justify-between rounded-md border border-white/10 bg-black/45 px-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-300/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
          <p className="text-[10px] font-medium tracking-wide text-slate-200">ASTRA Live Simulation • Auto Demo Reel</p>
        </div>
        <p className="font-mono text-[10px] text-slate-300">00:12 LOOP</p>
      </div>
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-900">
        {layers.map((layer, idx) => (
          <img
            key={layer.className}
            src={fallbacks[idx] ? layer.fallback : layer.src}
            alt={layer.alt}
            className={`absolute inset-0 h-full w-full object-cover ${layer.className}`}
            loading={idx === 0 ? 'eager' : 'lazy'}
            onError={() =>
              setFallbacks((prev) => {
                if (prev[idx]) return prev
                const next = [...prev]
                next[idx] = true
                return next
              })
            }
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_58%,rgba(0,0,0,0.36)_100%)]" />
      <div className="reel-cursor-ring pointer-events-none absolute left-0 top-0 z-20 h-8 w-8 rounded-full border border-cyan-200/80" />
      <div className="reel-cursor pointer-events-none absolute left-0 top-0 z-20">
        <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.2 2.4L24.6 17.3L14.6 18.6L11.2 31.6L3.2 2.4Z"
            fill="white"
            stroke="#0F172A"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default function SolutionsPage() {
  const [openCard, setOpenCard] = useState('data')
  const { scrollYProgress } = useScroll()
  const translateY = useTransform(scrollYProgress, [0, 0.35], [30, 0])

  return (
    <div className="min-h-screen bg-neutral-950 pb-24 pt-32 text-white">
      <div className="mx-auto w-full px-6 md:px-20 xl:px-[120px]">
        <section>
          <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.22em]">Astra Product</p>
          <h1 className="mt-3 max-w-4xl break-keep text-3xl font-extrabold leading-tight md:text-4xl">
            채용의 불확실성을 0으로 만드는 데이터 솔루션, ASTRA.
          </h1>

          <motion.div
            style={{ y: translateY }}
            className="mt-10 origin-center"
          >
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
              <p className="text-sm text-neutral-300">Competency Prediction Demo Reel</p>
              <GeneratedDemoReel />
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
                  className="overflow-hidden rounded-2xl border border-blue-300/35 bg-white/[0.04] shadow-[0_16px_40px_rgba(2,8,23,0.35)] backdrop-blur-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <Image src={item.image} alt={`${item.title} prototype`} fill className="object-cover" />
                    <div className="border-brand-primary-soft text-brand-primary-soft absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border bg-black/45 px-3 py-1 text-xs font-semibold shadow-[0_8px_20px_rgba(2,6,23,0.45)] backdrop-blur-md">
                      <Icon className="h-3.5 w-3.5" />
                      Prototype {idx + 1}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
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
