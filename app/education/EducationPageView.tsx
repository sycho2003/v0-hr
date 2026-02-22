'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  audienceLabels,
  consultingCatalog,
  type AudienceChipType,
  type ConsultingItem,
} from '@/content/education'

const isEnterpriseChip = (audience: AudienceChipType) => {
  return audience === 'largeEnterprise' || audience === 'midSizedEnterprise' || audience === 'sme' || audience === 'startup'
}

const isItemActiveForAudience = (item: ConsultingItem, audience: AudienceChipType) => {
  if (isEnterpriseChip(audience)) {
    return item.audiences.includes('enterprise')
  }
  return item.audiences.includes(audience)
}

export default function HRConsultingPage() {
  const [activeAudience, setActiveAudience] = useState<AudienceChipType>('government')

  const hrmCards = useMemo<ConsultingItem[]>(() => consultingCatalog.hrm, [])
  const hrdCards = useMemo<ConsultingItem[]>(() => consultingCatalog.hrd, [])
  const hrmActiveCount = useMemo(
    () => activeAudience ? hrmCards.filter((item) => isItemActiveForAudience(item, activeAudience)).length : hrmCards.length,
    [activeAudience, hrmCards]
  )
  const hrdActiveCount = useMemo(
    () => activeAudience ? hrdCards.filter((item) => isItemActiveForAudience(item, activeAudience)).length : hrdCards.length,
    [activeAudience, hrdCards]
  )

  return (
    <div className="min-h-screen bg-neutral-950 pb-20 pt-32 text-white">
      <div className="mx-auto w-full px-6 md:px-20 xl:px-[120px]">

        {/* ── Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="relative mb-14 py-10 text-center md:mb-20 md:py-14"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
          </div>
          <h1 className="text-balance text-4xl font-extrabold leading-tight text-white md:text-5xl">
            오프라인 컨설팅이 필요하신가요?
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
            어세스타의 전문성이 담긴 컨설팅 서비스를 만나보세요.
          </p>
        </motion.section>

        {/* ── Subtitle ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-8"
        >
          <p className="ds-eyebrow text-brand-primary text-xs font-semibold uppercase tracking-[0.22em]">Customized Consulting</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">HR 컨설팅 서비스</h2>
          <p className="title-group__subtitle ds-body mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
            조직의 특성에 맞춘 맞춤형 HR 시스템을 구축해왔습니다.
            <br />
            20년간의 전문 노하우와 AI 기술을 결합한 데이터 기반 컨설팅입니다.
          </p>
        </motion.section>

        {/* ── HRM / HRD Matrix ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-10 min-w-0"
        >
          <div className="sticky top-20 z-20 mb-4 rounded-xl bg-neutral-950/88 py-2 backdrop-blur-md md:static md:bg-transparent md:py-0">
            <div className="flex flex-wrap items-center gap-2">
              {audienceLabels.map((item) => {
                const isActive = activeAudience === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveAudience(item.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'border-brand-primary/80 bg-brand-primary/20 text-white shadow-[0_0_16px_rgba(59,130,246,0.3)]'
                        : 'border-white/20 bg-white/[0.02] text-neutral-300 hover:border-brand-primary/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && <Check className="h-3.5 w-3.5 text-brand-primary" />}
                  </button>
                )
              })}
            </div>
          </div>

          <TooltipProvider delayDuration={100}>
            <div className="grid min-w-0 gap-4 lg:grid-cols-2 lg:gap-8">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <p className="text-brand-primary text-xl font-extrabold uppercase tracking-[0.16em] md:text-2xl">HRM</p>
                  <span className="rounded-full border border-brand-primary/60 bg-brand-primary/15 px-2 py-0.5 text-xs font-semibold text-brand-primary">
                    {hrmActiveCount}개
                  </span>
                </div>
                <div className="grid min-w-0 grid-cols-2 gap-3">
                  {hrmCards.map((item) => {
                    const isActive = isItemActiveForAudience(item, activeAudience)
                    return (
                      <Tooltip key={`${item.id}-${activeAudience}`}>
                        <TooltipTrigger asChild>
                          <article
                            className={`relative flex min-h-[152px] min-w-0 flex-col rounded-lg border px-4 pt-4 pb-0 transition-colors duration-200 ${
                              isActive
                                ? 'border-brand-primary/70 bg-brand-primary/12 hr-card-glow-sync'
                                : 'border-white/15 bg-white/[0.02]'
                            }`}
                          >
                            {isActive && (
                              <span className="absolute right-3 top-3 rounded-full border border-brand-primary/70 bg-brand-primary/20 p-1">
                                <Check className="h-3.5 w-3.5 text-brand-primary" />
                              </span>
                            )}
                            <p className={`pr-7 text-[15px] font-bold leading-snug break-keep ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                              {item.title}
                            </p>
                            <p className={`mt-2 text-sm leading-snug ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                              {item.description}
                            </p>
                          </article>
                        </TooltipTrigger>
                        <TooltipContent className="hidden max-w-[280px] border-white/20 bg-neutral-900 text-neutral-100 md:block">
                          <p className="text-sm font-semibold">{item.title}</p>
                          <p className="mt-1 text-xs text-neutral-300">{item.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </div>

              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <p className="text-brand-primary text-xl font-extrabold uppercase tracking-[0.16em] md:text-2xl">HRD</p>
                  <span className="rounded-full border border-brand-primary/60 bg-brand-primary/15 px-2 py-0.5 text-xs font-semibold text-brand-primary">
                    {hrdActiveCount}개
                  </span>
                </div>
                <div className="grid min-w-0 grid-cols-2 gap-3">
                  {hrdCards.map((item) => {
                    const isActive = isItemActiveForAudience(item, activeAudience)
                    return (
                      <Tooltip key={`${item.id}-${activeAudience}`}>
                        <TooltipTrigger asChild>
                          <article
                            className={`relative flex min-h-[152px] min-w-0 flex-col rounded-lg border px-4 pt-4 pb-0 transition-colors duration-200 ${
                              isActive
                                ? 'border-brand-primary/70 bg-brand-primary/12 hr-card-glow-sync'
                                : 'border-white/15 bg-white/[0.02]'
                            }`}
                          >
                            {isActive && (
                              <span className="absolute right-3 top-3 rounded-full border border-brand-primary/70 bg-brand-primary/20 p-1">
                                <Check className="h-3.5 w-3.5 text-brand-primary" />
                              </span>
                            )}
                            <p className={`pr-7 text-[15px] font-bold leading-snug break-keep ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                              {item.title}
                            </p>
                            <p className={`mt-2 text-sm leading-snug ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                              {item.description}
                            </p>
                          </article>
                        </TooltipTrigger>
                        <TooltipContent className="hidden max-w-[280px] border-white/20 bg-neutral-900 text-neutral-100 md:block">
                          <p className="text-sm font-semibold">{item.title}</p>
                          <p className="mt-1 text-xs text-neutral-300">{item.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </div>
            </div>
          </TooltipProvider>
          <p className="mt-5 text-sm leading-relaxed text-neutral-500">
            일반적인 패키지의 구성입니다. 자세한 컨설팅 상담은 아래 &apos;무료 상담 신청&apos; 버튼을 클릭해주세요.
          </p>
        </motion.section>

        {/* ── CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="px-6 py-14 text-center"
        >
          <h3 className="text-2xl font-extrabold text-white md:text-3xl">{'맞춤형 교육 & 컨설팅이 필요하신가요?'}</h3>
          <p className="mx-auto mt-5 max-w-4xl text-base text-neutral-300 md:text-lg">
            조직의 특성과 니즈를 분석하여 최적의 교육 프로그램 및 컨설팅 서비스를 설계해 드립니다.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/inquiry"
              className="btn-brand inline-flex items-center rounded-xl px-7 py-3.5 text-sm font-bold"
            >
              무료 상담 신청
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
