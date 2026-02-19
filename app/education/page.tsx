'use client'

import { ArrowRight, BarChart3, Building2, Layers, Workflow } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Layers,
    title: '역량 모델 설계 컨설팅',
    meta: '전사 / 직무별  •  4~8주',
    desc: '조직의 비전, 전략, 직무 특성에 맞는 맞춤형 역량 모델을 설계합니다. 산업심리학 기반 방법론으로 타당성을 확보합니다.',
    chips: ['역량 사전 (Dictionary)', '직무별 역량 프로파일', '행동 지표 체계 (BEI)'],
  },
  {
    icon: BarChart3,
    title: '평가 체계 구축 컨설팅',
    meta: '인사 평가 / 성과 관리  •  6~12주',
    desc: '공정하고 객관적인 평가 체계를 구축합니다. 기존 평가 시스템의 문제점을 진단하고 데이터 기반의 개선안을 설계합니다.',
    chips: ['평가 프로세스 재설계', '평가자 교육 프로그램', '평가 결과 분석 대시보드'],
  },
  {
    icon: Building2,
    title: '조직문화 진단 및 혁신',
    meta: '조직문화 / 몰입도  •  4~6주',
    desc: '조직문화를 정량적으로 진단하고 데이터에 기반한 문화 혁신 전략을 수립합니다. 설문·인터뷰·행동 관찰을 결합한 다면 진단을 실시합니다.',
    chips: ['Culture Diagnosis', 'Engagement Improvement'],
  },
  {
    icon: Workflow,
    title: 'HR 시스템 디지털 전환',
    meta: 'HR DX / ASTRA 도입  •  8~16주',
    desc: '기존 HR 프로세스를 ASTRA 플랫폼 기반으로 디지털 전환합니다. 역량 모델링부터 평가, 교육까지 End-to-End 자동화를 지원합니다.',
    chips: ['HR DX', 'Astra Adoption'],
  },
]

export default function HRConsultingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 pb-24 pt-32 text-white">
      <div className="mx-auto w-full px-6 lg:px-10 xl:px-[120px]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-20 text-center"
        >
          <h1 className="text-balance text-4xl font-extrabold leading-tight text-white md:text-5xl">
            오프라인 컨설팅이 필요하신가요?
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
            어세스타가 기존에 진행해온 컨설팅 서비스를 만나보세요.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.18em]">Customized Consulting</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">HR 컨설팅 서비스</h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-neutral-300 md:text-lg">
            조직의 특성에 맞춘 맞춤형 HR 시스템 구축. 25년간의 전문 노하우와 AI 기술을 결합한 데이터 기반 컨설팅입니다.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-20 grid gap-6 md:grid-cols-2"
        >
          {services.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={item.title}
                className="hover-border-brand-primary-soft rounded-2xl border border-white/10 bg-neutral-900 p-7 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-brand-primary-soft text-brand-primary-soft mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white md:text-2xl">{item.title}</h2>
                    <p className="text-brand-primary-soft mt-1 text-sm">{item.meta}</p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-neutral-300 md:text-base">{item.desc}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-sm text-neutral-200"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <a
                    href="/inquiry"
                    className="inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover-brand-primary"
                  >
                    상담 신청
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </article>
            )
          })}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="px-6 py-14 text-center"
        >
          <h3 className="text-2xl font-extrabold text-white md:text-3xl">맞춤형 교육 &amp; 컨설팅이 필요하신가요?</h3>
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
