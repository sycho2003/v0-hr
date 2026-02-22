'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Brain, Bot, CheckCheck, ChevronDown } from 'lucide-react'
import { InteractiveFeatureShowcase } from '@/components/interactive-feature-showcase'
import { InteractiveDemoReel } from '@/components/interactive-demo-reel'
import { processCards } from '@/content/solutions'

const iconByKey = {
  brain: Brain,
  bot: Bot,
  expert: CheckCheck,
} as const

export default function SolutionsPage() {
  const [openCard, setOpenCard] = useState('data')
  const { scrollYProgress } = useScroll()
  const translateY = useTransform(scrollYProgress, [0, 0.35], [30, 0])

  return (
    <div className="min-h-screen bg-neutral-950 pb-24 pt-32 lg:pt-40 text-white">
      <div className="mx-auto w-full px-6 md:px-20 xl:px-[120px]">
        <section>
          <p className="ds-eyebrow text-brand-primary text-xs font-semibold uppercase tracking-[0.22em]">Astra Product</p>
          <h1 className="title-group__heading max-w-4xl break-keep text-3xl font-extrabold leading-[1.6] md:text-4xl">
            채용의 불확실성을 0으로 만드는 데이터 솔루션, ASTRA.
          </h1>

          <motion.div
            style={{ y: translateY }}
            className="mt-10 origin-center"
          >
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
              <InteractiveDemoReel />
            </div>
          </motion.div>
        </section>

        <section className="mt-20">
          <p className="ds-eyebrow text-brand-primary text-xs font-semibold uppercase tracking-[0.22em]">Psychology Data + AI Automation + Expert Verification</p>
          <h2 className="title-group__heading text-2xl font-bold md:text-3xl">아스트라만의 3단계 솔루션</h2>

          <div className="mt-8 space-y-4">
            {processCards.map((card) => {
              const Icon = iconByKey[card.iconKey] ?? Brain
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
