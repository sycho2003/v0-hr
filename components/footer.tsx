import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  services: [
    { label: "아스트라", href: "/solutions" },
    { label: "HR 교육", href: "/education" },
    { label: "HR 컨설팅", href: "/inquiry" },
  ],
  company: [
    { label: "회사 소개", href: "/" },
    { label: "리서치", href: "/research" },
    { label: "프로젝트 사례", href: "/cases" },
    { label: "문의하기", href: "/inquiry" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020617]">
      <div className="mx-auto w-full px-6 py-16 md:px-20 xl:px-[120px]">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="ASTRA"
                width={107}
                height={40}
                className="h-6 w-auto drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              국내 최고의 심리학 기반
              <br />
              역량평가 전문기관
            </p>

          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-200 uppercase">서비스</p>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-slate-400 transition-colors hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-200 uppercase">회사</p>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-slate-400 transition-colors hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-200 uppercase">연락처</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>서울특별시 영등포구 국회대로 68길 11 (여의도동)</li>
              <li>삼보호정빌딩 5층</li>
              <li className="font-medium text-white">02-787-1464</li>
              <li className="font-medium text-white">assesta@assesta.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-slate-500">&copy; 2026 ASSESTA Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {["개인정보처리방침", "이용약관"].map((item) => (
              <a key={item} href="#" className="text-xs text-slate-500 transition-colors hover:text-white">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
