import { ArrowDownToLine } from 'lucide-react'
import { featuredResearchArticle } from '@/content/research-featured'

function CorrelationVisual() {
  return (
    <figure className="mt-12 w-full">
      <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.15),transparent_45%)]" />

        <svg viewBox="0 0 1200 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <g stroke="rgba(148,163,184,0.18)" strokeWidth="1">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={50 + i * 45} x2="1200" y2={50 + i * 45} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v-${i}`} x1={80 + i * 90} y1="0" x2={80 + i * 90} y2="520" />
            ))}
          </g>

          <g fill="rgba(59,130,246,0.85)">
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
            stroke="rgba(59,130,246,0.95)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <g stroke="rgba(96,165,250,0.75)" strokeWidth="1.4" fill="none">
            <path d="M760 160 L860 210 L940 168 L1010 208" />
            <path d="M820 148 L900 122 L980 108 L1040 144" />
            <path d="M700 178 L760 160 L820 148 L860 210" />
          </g>
          <g fill="rgba(191,219,254,0.95)">
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
          <p className="text-sm text-neutral-300">{featuredResearchArticle.figureCaption}</p>
        </div>
      </div>
    </figure>
  )
}

export default function FeaturedResearchDetailPage() {
  return (
    <div className="min-h-screen bg-neutral-950 pb-28 pt-32 text-white">
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-[120px]">
        <article>
          <header className="w-full">
            <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.24em]">
              {featuredResearchArticle.eyebrow}
            </p>
            <h1 className="title-group__heading break-keep text-4xl font-extrabold leading-tight md:text-5xl">
              {featuredResearchArticle.title}
            </h1>
            <p className="mt-5 text-sm text-neutral-400">{featuredResearchArticle.meta}</p>
          </header>

          <CorrelationVisual />

          <div className="mt-12 w-full">
            <p className="text-lg leading-relaxed text-neutral-200">
              {featuredResearchArticle.intro}
            </p>
            <p className="mt-5 text-base leading-relaxed text-neutral-300">
              {featuredResearchArticle.body1}
            </p>
            <p className="mt-5 text-base leading-relaxed text-neutral-300">
              {featuredResearchArticle.body2}
            </p>

            <section className="border-brand-primary-soft bg-brand-primary-soft mt-10 rounded-2xl border p-6">
              <p className="text-brand-primary-soft text-sm font-semibold uppercase tracking-[0.14em]">
                {featuredResearchArticle.keyFindingTitle}
              </p>
              <p className="text-brand-primary-soft mt-3 text-3xl font-extrabold">
                {featuredResearchArticle.keyFindingValue}
              </p>
              <p className="mt-3 text-neutral-200">{featuredResearchArticle.keyFindingCompare}</p>
              <p className="mt-2 text-neutral-200">
                {featuredResearchArticle.keyFindingDesc}
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-white">{featuredResearchArticle.methodologyTitle}</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-neutral-200">
                {featuredResearchArticle.methodologyList.map((item) => (
                  <li key={item.label}>
                    <span className="font-semibold text-white">{item.label}</span> {item.text}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-base leading-relaxed text-neutral-300">
                {featuredResearchArticle.methodologyDesc}
              </p>
            </section>

            <section className="mt-10 border-t border-white/10 pt-8">
              <h2 className="text-2xl font-bold text-white">{featuredResearchArticle.conclusionTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-200">
                {featuredResearchArticle.conclusionLead}
              </p>
              <p className="mt-5 text-base leading-relaxed text-neutral-300">
                {featuredResearchArticle.conclusionDesc}
              </p>
            </section>

            <div className="mt-12">
              <button
                type="button"
                className="hover-border-brand-primary-soft hover-brand-primary inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300"
              >
                <ArrowDownToLine className="h-4 w-4" />
                {featuredResearchArticle.downloadLabel}
              </button>
            </div>
          </div>
        </article>

        <section className="mt-20 w-full">
          <h3 className="text-2xl font-bold text-white">{featuredResearchArticle.recommendedTitle}</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {featuredResearchArticle.recommendedArticles.map((rec) => (
              <article key={rec.title} className="rounded-[10px] border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-4 aspect-video rounded-[10px] border border-white/10 bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.2),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(37,99,235,0.18),transparent_45%)]" />
                <h4 className="text-lg font-semibold text-white">{rec.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">{rec.desc}</p>
                <p className="mt-4 text-xs text-neutral-500">{rec.date}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
