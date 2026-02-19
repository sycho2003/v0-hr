'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CircularDiagram } from '@/components/circular-diagram'

/* ── Ripple Effect Component ── */
function RippleEffect() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-sky-400/40"
          initial={{ width: 20, height: 20, opacity: 0.6 }}
          animate={{ width: 180, height: 180, opacity: 0 }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: i * 0.9,
            ease: 'easeOut',
          }}
        />
      ))}
    </span>
  )
}

/* ── Donut Diagram Component ── */
function DonutDiagram({
  title,
  imageSrc,
  imageAlt,
}: {
  title: string
  imageSrc: string
  imageAlt: string
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-[280px] w-[280px] md:h-[320px] md:w-[320px]">
        <Image src={imageSrc} alt={imageAlt} fill className="object-contain" />
      </div>
      <p className="text-lg font-bold text-white">{title}</p>
    </div>
  )
}

/* ── Service Card Component ── */
function ServiceCard({ title, desc, chips }: { title: string; desc: string; chips: string[] }) {
  return (
    <article className="hover-border-brand-primary-soft rounded-2xl border border-white/10 bg-neutral-900 p-7 transition-colors">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-neutral-300 md:text-base">{desc}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-sm text-neutral-200"
          >
            {chip}
          </span>
        ))}
      </div>
    </article>
  )
}

/* ── Data ── */
const govServices = [
  {
    title: '역량평가 (AC)',
    desc: 'Assessment Center 방식의 역량평가를 통해 공공기관 인재의 핵심역량을 객관적으로 측정합니다. 시뮬레이션, 발표, 토론 등 다면적 평가 기법을 활용하여 승진 및 보직 배치의 공정성을 확보합니다.',
    chips: ['시뮬레이션 평가', '구조화 면접', '역량 프로파일링'],
  },
  {
    title: '역량개발 (DC)',
    desc: 'Development Center 기반으로 개인별 역량 격차를 진단하고 맞춤형 개발 계획을 수립합니다. 평가 결과를 즉각적인 피드백과 코칭으로 연결하여 실질적인 역량 향상을 이끌어냅니다.',
    chips: ['갭 분석', '개발 피드백', '개인별 IDP 수립'],
  },
  {
    title: '채용',
    desc: '공공기관 특성에 맞는 블라인드 채용 체계를 설계하고 NCS 기반의 직무능력 평가 도구를 개발합니다. 공정성과 전문성을 겸비한 채용 프로세스로 우수 인재를 선발합니다.',
    chips: ['NCS 기반 평가', '블라인드 채용 설계', '면접관 교육'],
  },
  {
    title: '리더십개발',
    desc: '공직 리더에게 요구되는 전략적 사고, 소통, 변화관리 역량을 체계적으로 개발합니다. 정부 조직의 특수성을 반영한 리더십 모델 수립부터 실행까지 원스톱으로 지원합니다.',
    chips: ['공직 리더십 모델', '코칭 프로그램', '승계 계획'],
  },
]

const corpServices = [
  {
    title: '갈등관리',
    desc: '조직 내 갈등의 근본 원인을 구조적으로 진단하고, 건설적 갈등 해결 역량을 강화합니다. 이해관계 조정과 합의 도출 기법을 통해 협력적 조직문화를 조성합니다.',
    chips: ['갈등 진단', '조정·중재 기법', '협력 문화 구축'],
  },
  {
    title: '의사소통',
    desc: '효과적인 조직 커뮤니케이션 체계를 설계하고 구성원의 소통 역량을 체계적으로 향상시킵니다. 수직·수평 소통 채널을 최적화하여 조직 내 정보 흐름과 협업 효율을 극대화합니다.',
    chips: ['소통 역량 진단', '커뮤니케이션 코칭', '피드백 문화'],
  },
  {
    title: '팀빌딩/팀워크',
    desc: '팀 역동성을 과학적으로 분석하고 고성과 팀으로 도약하기 위한 맞춤형 팀빌딩 프로그램을 제공합니다. 신뢰 구축부터 공동 목표 설정까지 팀 시너지를 극대화합니다.',
    chips: ['팀 진단', '워크숍 설계', '팀 성과 관리'],
  },
  {
    title: '불안/스트레스',
    desc: '직무 스트레스와 조직 내 심리적 위험 요인을 정밀 진단하고 EAP(근로자 지원 프로그램) 기반의 예방·관리 체계를 구축합니다. 구성원의 심리적 안정과 회복탄력성을 높입니다.',
    chips: ['스트레스 진단', 'EAP 프로그램', '심리 상담 체계'],
  },
  {
    title: '문제해결',
    desc: '복잡한 비즈니스 문제를 구조화하고 데이터 기반으로 최적의 해결책을 도출하는 역량을 개발합니다. 디자인 씽킹과 시스템 사고를 결합한 실전형 문제해결 교육을 제공합니다.',
    chips: ['문제 구조화 기법', '의사결정 프레임워크', '실전 시뮬레이션'],
  },
  {
    title: '리더십개발',
    desc: '기업 환경에 최적화된 리더십 역량 모델을 설계하고 계층별 맞춤형 리더십 개발 프로그램을 운영합니다. 360도 피드백과 코칭을 결합하여 지속 가능한 리더십 파이프라인을 구축합니다.',
    chips: ['360도 리더십 진단', '코칭 & 멘토링', '차세대 리더 육성'],
  },
  {
    title: '채용',
    desc: '기업의 인재상과 직무 요건에 기반한 과학적 채용 체계를 구축합니다. 구조화 면접 설계부터 역량 기반 선발 도구 개발까지 채용 전 과정의 정확도와 효율성을 높입니다.',
    chips: ['구조화 면접 설계', '역량 기반 선발', '채용 브랜딩'],
  },
]

export default function HRConsultingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 pb-24 pt-48 text-white">
      <div className="mx-auto w-full px-6 lg:px-10 xl:px-[120px]">

        {/* ── Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-40 text-center"
        >
          <h1 className="text-balance text-4xl font-extrabold leading-tight text-white md:text-5xl">
            <span className="relative inline-block">
              오프라인
              <RippleEffect />
            </span>{' '}
            컨설팅이 필요하신가요?
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
            어세스타가 기존에 진행해온 컨설팅 서비스를 만나보세요.
          </p>
        </motion.section>

        {/* ── Subtitle ── */}
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

        {/* ── Donut Diagrams ── */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-20 grid gap-12 md:grid-cols-2"
        >
          <CircularDiagram
            title="정부/공공기관"
            segments={[
              { label: '역량평가\n(AC)', startAngle: 0, endAngle: 90 },
              { label: '역량개발\n(DC)', startAngle: 90, endAngle: 180 },
              { label: '리더십개발', startAngle: 180, endAngle: 270 },
              { label: '채용', startAngle: 270, endAngle: 360 },
            ]}
          />
          <DonutDiagram
            title="일반/공공기업"
            imageSrc="/images/education/donut-corporate.png"
            imageAlt="일반/공공기업 컨설팅 영역 다이어그램 - 갈등관리, 의사소통, 팀빌딩, 불안/스트레스, 문제해결, 리더십개발, 채용"
          />
        </motion.section>

        {/* ── 정부/공공기관 Cards (4개) ── */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="mb-8 text-2xl font-extrabold text-white md:text-3xl">정부/공공기관</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {govServices.map((item) => (
              <ServiceCard key={item.title} {...item} />
            ))}
          </div>
        </motion.section>

        {/* ── 일반/공공기업 Cards (7개) ── */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="mb-8 text-2xl font-extrabold text-white md:text-3xl">{'일반/공공기업'}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {corpServices.map((item) => (
              <ServiceCard key={item.title} {...item} />
            ))}
          </div>
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
