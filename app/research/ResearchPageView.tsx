'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  archiveArticles,
  categoryTabs,
  type CategoryTab,
  featuredResearch,
  sideArticles,
} from '@/content/research'

function HeroVisual() {
  return (
    <div className="relative h-[260px] overflow-hidden rounded-[10px] border border-white/10 bg-neutral-900 lg:h-[230px]">
      <Image src="/images/research/hero-mockup.svg" alt="Research hero mockup" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </div>
  )
}

function SideThumb({ index, title, date, image }: { index: number; title: string; date: string; image: string }) {
  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-square overflow-hidden rounded-[10px] border border-white/10 bg-neutral-900 transition-transform duration-300 group-hover:scale-[1.03]">
        <Image src={image} alt={`${title} mockup`} fill className="scale-[1.015] object-cover" />
        <div className="text-brand-primary-soft absolute right-4 top-4 text-sm font-semibold">#{index + 1}</div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3">
          <p className="truncate text-base font-medium text-white">{title}</p>
          <p className="mt-1 text-sm text-neutral-400">{date}</p>
        </div>
      </div>
    </article>
  )
}

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('전체')

  const filteredSideArticles = useMemo(() => {
    if (activeTab === '전체') return sideArticles
    return sideArticles.filter((item) => item.category === activeTab)
  }, [activeTab])

  const filteredArchiveArticles = useMemo(() => {
    if (activeTab === '전체') return archiveArticles
    return archiveArticles.filter((item) => item.category === activeTab)
  }, [activeTab])

  return (
    <div className="min-h-screen bg-neutral-950 pb-24 pt-32 lg:pt-40 text-white">
      <div className="px-6 md:px-20 xl:px-[120px]">
        <header className="mb-6">
          <p className="ds-eyebrow text-brand-primary text-xs font-semibold uppercase tracking-[0.22em]">Research Library</p>
          <h1 className="title-group__heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">리서치</h1>
        </header>

        <div className="sticky top-[72px] z-[900] mb-8 border-b border-white/10 bg-neutral-950 py-3 opacity-100">
          <div className="flex flex-nowrap items-center gap-6 overflow-x-auto pr-2 text-sm whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 transition-colors ${activeTab === tab ? 'text-brand-primary font-semibold' : 'text-neutral-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <section className="mb-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="hidden lg:sticky lg:top-36 lg:block lg:h-[527.16px] lg:w-[70%]">
              <article className="h-full">
                <div className="flex h-full flex-col rounded-[10px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md md:p-7">
                  <Link href="/research/featured" aria-label="핵심 연구 상세 보기">
                    <HeroVisual />
                  </Link>

                  <div className="mt-4 rounded-[10px] border border-white/10 bg-black/40 p-4 md:p-5">
                    <span className="border-brand-primary-soft bg-brand-primary-soft text-brand-primary-soft inline-flex rounded-full border px-3 py-1 text-xs font-semibold">
                      {featuredResearch.badge}
                    </span>
                    <h2 className="mt-2 break-keep text-2xl font-extrabold leading-tight text-white md:text-2xl xl:text-3xl">
                      <Link href="/research/featured" className="transition-colors hover-brand-primary">
                        {featuredResearch.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-neutral-400">{featuredResearch.meta}</p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300 md:text-sm">
                      {featuredResearch.summary}
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <aside className="w-full min-w-0 lg:w-[30%]">
              <div className="space-y-8 lg:space-y-10">
                {filteredSideArticles.map((item, idx) => (
                  <SideThumb key={`${item.title}-${item.date}`} index={idx} title={item.title} date={item.date} image={item.image} />
                ))}
                {filteredSideArticles.length === 0 && (
                  <div className="rounded-[10px] border border-white/10 bg-white/[0.03] p-6 text-sm text-neutral-400">
                    선택한 카테고리의 아티클이 없습니다.
                  </div>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-8 lg:hidden">
            <article className="rounded-[10px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md md:p-7">
              <Link href="/research/featured" aria-label="핵심 연구 상세 보기">
                <HeroVisual />
              </Link>
              <div className="mt-5 rounded-[10px] border border-white/10 bg-black/40 p-5">
                <span className="border-brand-primary-soft bg-brand-primary-soft text-brand-primary-soft inline-flex rounded-full border px-3 py-1 text-xs font-semibold">
                  {featuredResearch.badge}
                </span>
                <h2 className="mt-3 break-keep text-2xl font-extrabold leading-tight text-white">
                  {featuredResearch.title}
                </h2>
              </div>
            </article>
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between">
            <h3 className="text-3xl font-bold text-white">아카이브</h3>
            <button className="hidden items-center gap-2 text-sm text-neutral-300 transition-colors hover-brand-primary md:inline-flex">
              더 보기
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {filteredArchiveArticles.map((paper) => (
              <article
                key={`${paper.title}-${paper.date}`}
                className="hover-border-brand-primary-soft rounded-[10px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative mb-4 aspect-video overflow-hidden rounded-[10px] border border-white/10 bg-neutral-900">
                  <Image src={paper.image} alt={`${paper.title} thumbnail`} fill className="object-cover" />
                </div>

                <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-neutral-300">
                  {paper.category}
                </span>
                <h4 className="mt-3 text-xl font-semibold leading-snug text-white">{paper.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">{paper.desc}</p>
                <p className="mt-5 text-sm text-neutral-500">{paper.date}</p>
              </article>
            ))}
          </div>
          {filteredArchiveArticles.length === 0 && (
            <div className="rounded-[10px] border border-white/10 bg-white/[0.03] p-6 text-sm text-neutral-400">
              선택한 카테고리의 아카이브가 없습니다.
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
