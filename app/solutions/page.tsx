'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Brain, Bot, CheckCheck, ChevronDown } from 'lucide-react'
import { InteractiveFeatureShowcase } from '@/components/interactive-feature-showcase'
import { InteractiveDemoReel } from '@/components/interactive-demo-reel'

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

export default function SolutionsPage() {
  const [openCard, setOpenCard] = useState('data')
  const { scrollYProgress } = useScroll()
  const translateY = useTransform(scrollYProgress, [0, 0.35], [30, 0])

  return (
    <div className="min-h-screen bg-neutral-950 pb-24 pt-32 lg:pt-40 text-white">
      <div className="mx-auto w-full px-6 md:px-20 xl:px-[120px]">
        <section>
          <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.22em]">Astra Product</p>
          <h1 className="mt-3 max-w-4xl break-keep text-3xl font-extrabold leading-[1.6] md:text-4xl">
            채용의 불확실성을 0으로 만드는 데이터 솔루션, ASTRA.
          </h1>

          <motion.div
            style={{ y: translateY }}
            className="mt-10 origin-center"
          >
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
              <p className="text-sm text-neutral-300">Competency Prediction Demo Reel</p>
              <InteractiveDemoReel />
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

        {/* Interactive Feature Showcase */}
        <InteractiveFeatureShowcase />
      </div>
    </div>
  )
}
