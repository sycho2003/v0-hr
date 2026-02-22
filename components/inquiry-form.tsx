'use client'

import { useMemo, useState } from 'react'
import { firstTimeOptions, reasons } from '@/content/inquiry'

export function InquiryForm() {
  const [step, setStep] = useState(1)
  const [reason, setReason] = useState('')
  const [firstTime, setFirstTime] = useState('')
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' })

  const progress = useMemo(() => (step / 3) * 100, [step])
  const canGoNext = useMemo(() => {
    if (step === 1) return reason.length > 0
    if (step === 2) return firstTime.length > 0
    return true
  }, [step, reason, firstTime])

  return (
    <div className="min-h-screen bg-neutral-950 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-[760px] px-6 md:px-20 xl:px-[120px]">
        <header className="text-center">
          <p className="ds-eyebrow text-brand-primary text-xs font-semibold uppercase tracking-[0.24em]">Inquiry</p>
          <h1 className="title-group__heading text-3xl font-extrabold md:text-4xl">빠른 상담 접수</h1>
          <p className="mt-4 text-neutral-300">3단계만 입력하면 ASTRA 전문가가 빠르게 연락드립니다.</p>
        </header>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-8">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-brand-primary">Step {step} of 3</span>
              <span className="text-neutral-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-800">
              <div className="bg-brand-primary h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {step === 1 && (
            <section>
              <h2 className="text-xl font-bold">상담을 신청한 이유가 무엇인가요?</h2>
              <div className="mt-4 grid gap-3">
                {reasons.map((item) => (
                  <label
                    key={item}
                    className={`flex min-h-[58px] cursor-pointer items-start gap-3 rounded-xl border px-4 py-4 transition-all ${
                      reason === item
                        ? 'border-[#356DF3]/70 bg-[rgba(53,109,243,0.14)] shadow-[0_0_0_1px_rgba(53,109,243,0.15)]'
                        : 'border-white/15 bg-neutral-900 hover:border-[#356DF3]/45 hover:bg-[rgba(53,109,243,0.06)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={item}
                      checked={reason === item}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-0.5 h-4 w-4 accent-[#356DF3]"
                    />
                    <span className="break-keep text-sm leading-relaxed text-neutral-200">{item}</span>
                  </label>
                ))}
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="text-xl font-bold">상담 신청이 처음이신가요?</h2>
              <div className="mt-4 grid gap-3">
                {firstTimeOptions.map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/15 bg-neutral-900 px-4 py-3">
                    <input
                      type="radio"
                      name="firstTime"
                      value={item}
                      checked={firstTime === item}
                      onChange={(e) => setFirstTime(e.target.value)}
                      className="h-4 w-4 accent-[#356DF3]"
                    />
                    <span className="text-sm text-neutral-200">{item}</span>
                  </label>
                ))}
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2 className="text-xl font-bold">회사의 정보를 알려주세요.</h2>
              <div className="mt-4 grid gap-3">
                {[
                  { key: 'name', label: '이름', type: 'text' },
                  { key: 'company', label: '회사명', type: 'text' },
                  { key: 'email', label: '이메일', type: 'email' },
                  { key: 'phone', label: '전화번호', type: 'tel' },
                ].map((field) => (
                  <input
                    key={field.key}
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.label}
                    className="h-12 rounded-xl border border-white/15 bg-neutral-900 px-4 text-sm text-white placeholder:text-neutral-500 focus:border-[#356DF3] focus:outline-none"
                  />
                ))}
              </div>
            </section>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="inline-flex h-11 items-center rounded-lg border border-white/20 px-5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              이전
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(3, s + 1))}
                disabled={!canGoNext}
                className="inline-flex h-11 items-center rounded-lg bg-[#356DF3] px-6 text-sm font-bold text-white transition-colors hover:bg-[#3B82F6] disabled:cursor-not-allowed disabled:bg-[#1f2d54] disabled:text-white/60 disabled:hover:bg-[#1f2d54]"
              >
                다음
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex h-11 items-center rounded-lg bg-[#356DF3] px-6 text-sm font-bold text-white transition-colors hover:bg-[#3B82F6]"
              >
                무료 상담 신청하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
