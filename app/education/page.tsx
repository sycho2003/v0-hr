'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type AudienceType = 'government' | 'public' | 'enterprise' | 'stateOwned'
type AudienceChipType = 'government' | 'public' | 'stateOwned' | 'largeEnterprise' | 'midSizedEnterprise' | 'sme' | 'startup'

type ConsultingItem = {
  id: string
  title: string
  description: string
  audiences: AudienceType[]
}

const audienceLabels: {
  id: AudienceChipType
  label: string
}[] = [
  { id: 'government', label: '정부' },
  { id: 'public', label: '공공기관' },
  { id: 'largeEnterprise', label: '대기업' },
  { id: 'midSizedEnterprise', label: '중견기업' },
  { id: 'sme', label: '중소기업' },
  { id: 'startup', label: '스타트업' },
  { id: 'stateOwned', label: '공기업' },
]

const isEnterpriseChip = (audience: AudienceChipType) => {
  return audience === 'largeEnterprise' || audience === 'midSizedEnterprise' || audience === 'sme' || audience === 'startup'
}

const isItemActiveForAudience = (item: ConsultingItem, audience: AudienceChipType) => {
  if (isEnterpriseChip(audience)) {
    return item.audiences.includes('enterprise')
  }
  return item.audiences.includes(audience)
}

const consultingCatalog: { hrm: ConsultingItem[]; hrd: ConsultingItem[] } = {
  hrm: [
    { id: 'hrm-1', title: '직무역량 체계 재정비', description: '직무 기준에 맞춰 역량 모델을 표준화합니다.', audiences: ['government', 'public'] },
    { id: 'hrm-2', title: '성과평가 체계 개선', description: '성과지표와 연동된 평가 운영 기준을 재설계합니다.', audiences: ['government', 'public', 'stateOwned'] },
    { id: 'hrm-3', title: '채용 기준 고도화', description: '구조화 면접 중심으로 선발 정확도를 높입니다.', audiences: ['government', 'enterprise'] },
    { id: 'hrm-4', title: '조직문화 진단', description: '협업 구조와 몰입 요인을 데이터로 분석합니다.', audiences: ['public', 'enterprise'] },
    { id: 'hrm-5', title: '인재선발 기준 정교화', description: '공정성과 실효성을 반영해 기준을 고도화합니다.', audiences: ['public', 'stateOwned'] },
    { id: 'hrm-6', title: '직무 재설계 컨설팅', description: '중복 업무를 줄이고 역할 책임을 명확화합니다.', audiences: ['public', 'enterprise', 'stateOwned'] },
  ],
  hrd: [
    { id: 'hrd-1', title: '신임 관리자 리더십', description: '초기 관리자 대상 실무형 리더십을 강화합니다.', audiences: ['government', 'public'] },
    { id: 'hrd-2', title: '정책 실행 역량 강화', description: '현장 실행력을 높이는 직무별 교육을 설계합니다.', audiences: ['government', 'public'] },
    { id: 'hrd-3', title: '학습 성과 측정 체계', description: '교육 효과를 KPI와 연결해 정량 검증합니다.', audiences: ['government', 'enterprise'] },
    { id: 'hrd-4', title: '핵심인재 육성 체계', description: '선발부터 육성 로드맵까지 통합 설계합니다.', audiences: ['public', 'stateOwned', 'enterprise'] },
    { id: 'hrd-5', title: '직무 전환 교육', description: '전환 배치 대상자의 성과 안착을 지원합니다.', audiences: ['public', 'stateOwned'] },
    { id: 'hrd-6', title: '교육 운영 고도화', description: '강사 체계와 운영 프로세스를 표준화합니다.', audiences: ['public', 'enterprise'] },
  ],
}

export default function HRConsultingPage() {
  const [activeAudience, setActiveAudience] = useState<AudienceChipType>('government')
  const [visibleCountHRM, setVisibleCountHRM] = useState(4)
  const [visibleCountHRD, setVisibleCountHRD] = useState(4)
  const [mobileDetail, setMobileDetail] = useState<ConsultingItem | null>(null)

  const hrmCards = useMemo<ConsultingItem[]>(() => consultingCatalog.hrm, [])
  const hrdCards = useMemo<ConsultingItem[]>(() => consultingCatalog.hrd, [])
  const hrmVisible = hrmCards.slice(0, visibleCountHRM)
  const hrdVisible = hrdCards.slice(0, visibleCountHRD)

  const hrmActiveCount = useMemo(
    () => hrmCards.filter((item) => isItemActiveForAudience(item, activeAudience)).length,
    [activeAudience, hrmCards]
  )
  const hrdActiveCount = useMemo(
    () => hrdCards.filter((item) => isItemActiveForAudience(item, activeAudience)).length,
    [activeAudience, hrdCards]
  )

  useEffect(() => {
    setVisibleCountHRM((prev) => Math.min(Math.max(prev, 4), hrmCards.length))
    setVisibleCountHRD((prev) => Math.min(Math.max(prev, 4), hrdCards.length))
  }, [hrdCards.length, hrmCards.length])

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
            어세스타가 기존에 진행해온 컨설팅 서비스를 만나보세요.
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
          <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.18em]">Customized Consulting</p>
          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-white md:text-3xl">HR 컨설팅 서비스</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-neutral-300 md:text-base">
            조직의 특성에 맞춘 맞춤형 HR 시스템 구축. 25년간의 전문 노하우와 AI 기술을 결합한 데이터 기반 컨설팅입니다.
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
                  {hrmVisible.map((item) => {
                    const isActive = isItemActiveForAudience(item, activeAudience)
                    return (
                      <Tooltip key={`${item.id}-${activeAudience}`}>
                        <TooltipTrigger asChild>
                          <article
                            className={`relative flex min-h-[173px] min-w-0 flex-col rounded-lg border px-4 pt-4 pb-2 transition-colors duration-200 ${
                              isActive
                                ? 'border-brand-primary/70 bg-brand-primary/12 hr-card-glow-sync'
                                : 'border-white/10 bg-white/[0.01] opacity-45'
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
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setMobileDetail(item)
                              }}
                              className="mt-auto pt-3 text-left text-xs font-medium text-brand-primary underline-offset-2 hover:underline md:hidden"
                            >
                              자세히 보기
                            </button>
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
                {hrmCards.length > 4 && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCountHRM((prev) =>
                        prev >= hrmCards.length ? 4 : Math.min(prev + 2, hrmCards.length)
                      )
                    }
                    className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs text-neutral-300 hover:text-white"
                  >
                    {visibleCountHRM >= hrmCards.length ? '접기' : '더보기'}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        visibleCountHRM >= hrmCards.length ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <p className="text-brand-primary text-xl font-extrabold uppercase tracking-[0.16em] md:text-2xl">HRD</p>
                  <span className="rounded-full border border-brand-primary/60 bg-brand-primary/15 px-2 py-0.5 text-xs font-semibold text-brand-primary">
                    {hrdActiveCount}개
                  </span>
                </div>
                <div className="grid min-w-0 grid-cols-2 gap-3">
                  {hrdVisible.map((item) => {
                    const isActive = isItemActiveForAudience(item, activeAudience)
                    return (
                      <Tooltip key={`${item.id}-${activeAudience}`}>
                        <TooltipTrigger asChild>
                          <article
                            className={`relative flex min-h-[173px] min-w-0 flex-col rounded-lg border px-4 pt-4 pb-2 transition-colors duration-200 ${
                              isActive
                                ? 'border-brand-primary/70 bg-brand-primary/12 hr-card-glow-sync'
                                : 'border-white/10 bg-white/[0.01] opacity-45'
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
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setMobileDetail(item)
                              }}
                              className="mt-auto pt-3 text-left text-xs font-medium text-brand-primary underline-offset-2 hover:underline md:hidden"
                            >
                              자세히 보기
                            </button>
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
                {hrdCards.length > 4 && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCountHRD((prev) =>
                        prev >= hrdCards.length ? 4 : Math.min(prev + 2, hrdCards.length)
                      )
                    }
                    className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs text-neutral-300 hover:text-white"
                  >
                    {visibleCountHRD >= hrdCards.length ? '접기' : '더보기'}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        visibleCountHRD >= hrdCards.length ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>
          </TooltipProvider>

          <Dialog open={!!mobileDetail} onOpenChange={(open) => !open && setMobileDetail(null)}>
            <DialogContent className="max-w-[92vw] border-white/15 bg-neutral-900 text-white">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">{mobileDetail?.title}</DialogTitle>
                <DialogDescription className="pt-2 text-sm leading-relaxed text-neutral-200">
                  {mobileDetail?.description}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
