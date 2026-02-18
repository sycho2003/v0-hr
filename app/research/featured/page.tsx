import type { Metadata } from 'next'
import { ArrowDownToLine } from 'lucide-react'

export const metadata: Metadata = {
  title: '핵심 연구 | ASTRA Research',
  description: 'ASTRA AI 예측 타당도 검증 보고서 상세',
}

function CorrelationVisual() {
  return (
    <figure className="mx-auto mt-12 w-full max-w-6xl">
      <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.15),transparent_45%)]" />

        <svg viewBox="0 0 1200 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <g stroke="rgba(148,163,184,0.18)" strokeWidth="1">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={50 + i * 45} x2="1200" y2={50 + i * 45} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v-${i}`} x1={80 + i * 90} y1="0" x2={80 + i * 90} y2="520" />
            ))}
          </g>

          <g fill="rgba(34,211,238,0.85)">
            {[
              [120, 420],
              [180, 390],
              [220, 360],
              [260, 345],
              [300, 328],
              [360, 300],
              [420, 285],
              [470, 260],
              [520, 238],
              [580, 220],
              [640, 200],
              [700, 178],
              [760, 160],
              [820, 148],
              [900, 122],
              [980, 108],
            ].map(([x, y], idx) => (
              <circle key={idx} cx={x} cy={y} r="4.5" />
            ))}
          </g>

          <path
            d="M100 430 C260 345, 420 285, 620 210 C760 160, 900 130, 1030 96"
            fill="none"
            stroke="rgba(34,211,238,0.95)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <g stroke="rgba(125,211,252,0.75)" strokeWidth="1.4" fill="none">
            <path d="M760 160 L860 210 L940 168 L1010 208" />
            <path d="M820 148 L900 122 L980 108 L1040 144" />
            <path d="M700 178 L760 160 L820 148 L860 210" />
          </g>
          <g fill="rgba(186,230,253,0.95)">
            {[
              [760, 160],
              [820, 148],
              [860, 210],
              [900, 122],
              [940, 168],
              [980, 108],
              [1010, 208],
              [1040, 144],
            ].map(([x, y], idx) => (
              <circle key={`n-${idx}`} cx={x} cy={y} r="3.8" />
            ))}
          </g>
        </svg>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5">
          <p className="text-sm text-neutral-300">
            Fig 1. ASTRA AI 평가 점수와 입사 후 1년 성과(KPI) 간의 상관관계 분포 (N=12,000)
          </p>
        </div>
      </div>
    </figure>
  )
}

export default function FeaturedResearchDetailPage() {
  return (
    <div className="min-h-screen bg-neutral-950 pb-28 pt-32 text-white">
      <article>
        <header className="mx-auto max-w-3xl px-6 lg:px-10 xl:px-[120px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">VALIDITY STUDY</p>
          <h1 className="mt-5 break-keep text-4xl font-extrabold leading-tight md:text-5xl">
            다차원 AI 역량 모델링의 예측 타당도 검증: Schmidt & Hunter 이론의 현대적 재해석
          </h1>
          <p className="mt-5 text-sm text-neutral-400">By ASTRA Research Team • 2026. 02. 14 • 15 min read</p>
        </header>

        <CorrelationVisual />

        <div className="mx-auto mt-12 max-w-3xl px-6 lg:px-10 xl:px-[120px]">
          <p className="text-lg leading-relaxed text-neutral-200">
            채용의 본질은 '미래의 성과'를 예측하는 것입니다. 1998년 Frank Schmidt와 John Hunter의 메타 분석 이후,
            우리는 지난 30년간 구조화된 면접(Structured Interview)이 가장 강력한 도구임을 믿어왔습니다. 하지만 AI의
            등장은 이 게임의 규칙을 바꾸고 있습니다.
          </p>
          <p className="mt-5 text-base leading-relaxed text-neutral-300">
            본 연구는 단일 평가 도구의 정확도를 넘어서, 다차원 행동 신호를 통합한 AI 역량 모델이 실제 조직 성과를 얼마나
            안정적으로 설명할 수 있는지를 검증합니다. 특히 채용 시점의 평가 점수와 입사 후 12개월 KPI의 관계를 추적함으로써,
            단기 적합도보다 장기 성과 예측력을 우선 지표로 설정했습니다.
          </p>
          <p className="mt-5 text-base leading-relaxed text-neutral-300">
            분석 과정에서는 직무군·산업군·경력수준별 교란 변수를 통제했으며, 표본 왜도와 이상치를 보정하기 위해 강건 회귀와
            부트스트랩 신뢰구간을 병행 적용했습니다. 이 접근은 단순 상관 분석보다 실제 인사 의사결정에 가까운 실효 타당도
            (practical validity)를 확보하기 위한 설계입니다.
          </p>

          <section className="mt-10 rounded-2xl border border-cyan-400/35 bg-cyan-400/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">Key Finding</p>
            <p className="mt-3 text-3xl font-extrabold text-cyan-300">Validity Coefficient (r) = 0.65</p>
            <p className="mt-3 text-neutral-200">Human Intuition (0.38) vs ASTRA AI (0.65)</p>
            <p className="mt-2 text-neutral-200">
              이는 AI 모델이 인간 면접관보다 약 2.1배 더 정확하게 고성과자를 예측할 수 있음을 시사합니다.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-white">Methodology</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-neutral-200">
              <li>
                <span className="font-semibold text-white">Data Source:</span> 3.5 Million cumulative assessments.
              </li>
              <li>
                <span className="font-semibold text-white">Framework:</span> O*NET based Competency Dictionary.
              </li>
              <li>
                <span className="font-semibold text-white">Technique:</span> Multi-modal Analysis (NLP + Behavioral Signal).
              </li>
            </ol>
            <p className="mt-5 text-base leading-relaxed text-neutral-300">
              추가적으로 인터뷰 텍스트의 의미 신호(NLP), 반응 시간 및 상호작용 패턴(Behavioral Signal), 후속 성과 로그를
              단일 잠재공간으로 정렬하는 멀티모달 임베딩 절차를 적용했습니다. 모델 검증은 홀드아웃 검증과 교차 검증을 동시에
              수행하여 일반화 성능의 과대추정을 최소화했습니다.
            </p>
          </section>

          <section className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white">Conclusion</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-200">
              ASTRA는 단순한 채용 도구가 아닙니다. 조직의 성과 밀도(Talent Density)를 높이는 가장 과학적인 파트너입니다.
            </p>
            <p className="mt-5 text-base leading-relaxed text-neutral-300">
              연구 결과는 AI 기반 예측 모델이 인간 직관을 대체한다기보다, 직관의 일관성 한계를 보완하는 증폭 장치로
              기능함을 시사합니다. 따라서 향후 인재 선발 체계는 면접관의 전문 판단과 알고리즘 기반 타당도 신호를 결합한
              하이브리드 구조로 전환될 가능성이 높습니다.
            </p>
          </section>

          <div className="mt-12">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
            >
              <ArrowDownToLine className="h-4 w-4" />
              PDF 다운로드
            </button>
          </div>
        </div>
      </article>

      <section className="mx-auto mt-20 max-w-7xl px-6 lg:px-10 xl:px-[120px]">
        <h3 className="text-2xl font-bold text-white">Recommended Articles</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: '생성형 AI 면접의 편향성 제거 효과',
              desc: 'AI 면접 평가에서 공정성 지표를 개선한 설계 원칙과 검증 결과를 다룹니다.',
              date: '2026.01.28',
            },
            {
              title: '설명 가능한 평가모델의 신뢰도 프레임워크',
              desc: '예측 정확도와 설명 가능성을 동시에 확보하기 위한 실무 프레임을 제시합니다.',
              date: '2025.12.19',
            },
            {
              title: '실시간 역량 모델 업데이트가 채용 품질에 미치는 영향',
              desc: '정적 모델과 동적 모델의 성과 차이를 장기 추적 데이터로 비교합니다.',
              date: '2025.11.07',
            },
          ].map((rec) => (
            <article key={rec.title} className="rounded-[10px] border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 aspect-video rounded-[10px] border border-white/10 bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.2),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(99,102,241,0.18),transparent_45%)]" />
              <h4 className="text-lg font-semibold text-white">{rec.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">{rec.desc}</p>
              <p className="mt-4 text-xs text-neutral-500">{rec.date}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
