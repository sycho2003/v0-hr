import Link from "next/link"

const footerLinks = {
  services: [
    { label: "아스트라", href: "/solutions" },
    { label: "교육/컨설팅", href: "/education" },
    { label: "HR 컨설팅", href: "/inquiry" },
  ],
  company: [
    { label: "회사 소개", href: "/" },
    { label: "리서치", href: "/research" },
    { label: "성공 사례", href: "/cases" },
    { label: "문의하기", href: "/inquiry" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="어세스타 HR"
                className="h-6 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              국내 최고의 심리학 기반
              <br />
              역량평가 전문기관
            </p>

          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-foreground uppercase">서비스</p>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-foreground uppercase">회사</p>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-foreground uppercase">연락처</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>서울특별시 강남구 테헤란로 123</li>
              <li>어세스타 빌딩 7층</li>
              <li className="font-medium text-foreground">02-1234-5678</li>
              <li className="font-medium text-foreground">contact@assessta.co.kr</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">&copy; 2026 ASSESSTA Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {["개인정보처리방침", "이용약관"].map((item) => (
              <a key={item} href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
