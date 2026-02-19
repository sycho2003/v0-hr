"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "아스트라", href: "/solutions" },
  { label: "리서치", href: "/research" },
  { label: "HR컨설팅", href: "/education" },
  { label: "프로젝트 사례", href: "/cases" },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] border-b border-white/10 bg-[#0a0a0a] opacity-100 transition-all duration-300"
    >
      <nav className="mx-auto flex w-full items-center justify-between px-6 py-4 lg:px-10 xl:px-[120px]">
        <Link href="/" className="flex flex-col items-center leading-none">
          <Image
            src="/images/logo.png"
            alt="ASTRA"
            width={107}
            height={40}
            priority
            className="h-7 w-auto drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
          />
          <span className="mt-0.5 text-center text-[10px] font-medium tracking-wide text-slate-400">by Assesta</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/8 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/inquiry"
            className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              pathname === "/inquiry"
                ? "border-[#356DF3] bg-[#356DF3] text-white"
                : "border-white/30 bg-white text-[#111111] hover:border-[#356DF3] hover:bg-[#356DF3] hover:text-white"
            }`}
          >
            문의하기
          </Link>
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0a0a0a] opacity-100 md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-3 text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-white/10 text-white font-medium"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/inquiry"
              className="mt-2 rounded-lg border border-white/30 bg-white px-4 py-3 text-center text-sm font-semibold text-[#111111] transition-all duration-300 hover:border-[#356DF3] hover:bg-[#356DF3] hover:text-white"
            >
              문의하기
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
