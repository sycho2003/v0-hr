'use client'

import { useMemo, useState } from 'react'

const reasons = ['신규 도입', '개선', '교육', '기타']
const firstTimeOptions = ['예', '아니오']

export default function InquiryPage() {
  const [step, setStep] = useState(1)
  const [reason, setReason] = useState('')
  const [firstTime, setFirstTime] = useState('')
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' })

  const progress = useMemo(() => (step / 3) * 100, [step])

  return (
    <div className="min-h-screen bg-neutral-950 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-[640px] px-6 md:px-20 xl:px-[120px]">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">Inquiry</p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">빠른 상담 접수</h1>
          <p className="mt-4 text-neutral-300">3단계만 입력하면 ASTRA 전문가가 빠르게 연락드립니다.</p>
        </header>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-8">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-cyan-300">Step {step} of 3</span>
              <span className="text-neutral-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-800">
              <div className="h-full rounded-full bg-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {step === 1 && (
            <section>
              <h2 className="text-xl font-bold">Reason for Inquiry</h2>
              <div className="mt-4 grid gap-3">
                {reasons.map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/15 bg-neutral-900 px-4 py-3">
                    <input
                      type="radio"
                      name="reason"
                      value={item}
                      checked={reason === item}
                      onChange={(e) => setReason(e.target.value)}
                      className="h-4 w-4 accent-cyan-400"
                    />
                    <span className="text-sm text-neutral-200">{item}</span>
                  </label>
                ))}
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="text-xl font-bold">First Time?</h2>
              <div className="mt-4 grid gap-3">
                {firstTimeOptions.map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/15 bg-neutral-900 px-4 py-3">
                    <input
                      type="radio"
                      name="firstTime"
                      value={item}
                      checked={firstTime === item}
                      onChange={(e) => setFirstTime(e.target.value)}
                      className="h-4 w-4 accent-cyan-400"
                    />
                    <span className="text-sm text-neutral-200">{item}</span>
                  </label>
                ))}
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2 className="text-xl font-bold">Company Info</h2>
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
                    className="h-12 rounded-xl border border-white/15 bg-neutral-900 px-4 text-sm text-white placeholder:text-neutral-500 focus:border-cyan-400 focus:outline-none"
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
                className="inline-flex h-11 items-center rounded-lg bg-cyan-400 px-6 text-sm font-bold text-neutral-950 transition-colors hover:bg-cyan-300"
              >
                다음
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex h-11 items-center rounded-lg bg-cyan-400 px-6 text-sm font-bold text-neutral-950 transition-colors hover:bg-cyan-300"
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
