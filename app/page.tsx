'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  BrainCircuit,
  ChevronDown,
  Cpu,
  Database,
  Network,
  RefreshCcw,
  Workflow,
  Target,
} from 'lucide-react'
import { motion, useInView, useScroll } from 'framer-motion'

const ELECTRIC_BLUE = '#3B82F6'

function QuantumParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let rafId = 0
    let pointer = { x: 0, y: 0, active: false }
    let pointerTarget = { x: 0, y: 0, active: false }
    let blueSprite: HTMLCanvasElement | null = null
    let mintSprite: HTMLCanvasElement | null = null
    let starSprite: HTMLCanvasElement | null = null

    const particleCount = () => (window.innerWidth < 768 ? 110 : 220)
    const particles: Array<{
      orbit: number
      angle: number
      speed: number
      radius: number
      alpha: number
      color: string
      jitter: number
      wobbleAmp: number
      wobbleSpeed: number
      wobblePhase: number
      eccentricity: number
    }> = []
    const meteors: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
    }> = []
    let meteorTimer = 0

    const createParticles = () => {
      particles.length = 0
      const count = particleCount()
      const maxOrbit = Math.max(180, Math.min(width, height) * 0.42)
      const minOrbit = Math.max(34, Math.min(width, height) * 0.08)
      const bands = 6
      const bandStep = (maxOrbit - minOrbit) / Math.max(1, bands - 1)

      for (let i = 0; i < count; i += 1) {
        const colorSeed = Math.random()
        const color =
          colorSeed > 0.88 ? '186,230,255' : colorSeed > 0.24 ? '59,130,246' : '94,234,212'
        const band = Math.floor(Math.random() * bands)
        const bandBase = minOrbit + bandStep * band
        const ringBias = Math.pow(Math.random(), 0.67)
        const orbit = bandBase + (ringBias - 0.5) * bandStep * 0.88
        particles.push({
          orbit,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.001 + 0.00024,
          radius: Math.random() * 0.82 + 0.58,
          alpha: Math.random() * 0.34 + 0.43,
          color,
          jitter: (Math.random() - 0.5) * 12,
          wobbleAmp: Math.random() * 5.4 + 1.2,
          wobbleSpeed: Math.random() * 0.009 + 0.002,
          wobblePhase: Math.random() * Math.PI * 2,
          eccentricity: Math.random() * 0.24 - 0.06,
        })
      }
    }

    const createGlowSprite = (r: number, g: number, b: number) => {
      const spriteSize = 72
      const sprite = document.createElement('canvas')
      sprite.width = spriteSize
      sprite.height = spriteSize
      const spriteCtx = sprite.getContext('2d')
      if (!spriteCtx) return null
      const gradient = spriteCtx.createRadialGradient(
        spriteSize * 0.5,
        spriteSize * 0.5,
        spriteSize * 0.06,
        spriteSize * 0.5,
        spriteSize * 0.5,
        spriteSize * 0.5
      )
      gradient.addColorStop(0, `rgba(${r},${g},${b},1)`)
      gradient.addColorStop(0.18, `rgba(${r},${g},${b},0.92)`)
      gradient.addColorStop(0.52, `rgba(${r},${g},${b},0.42)`)
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)
      spriteCtx.fillStyle = gradient
      spriteCtx.fillRect(0, 0, spriteSize, spriteSize)
      return sprite
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = Math.max(680, Math.floor(window.innerHeight * 0.95))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      blueSprite = createGlowSprite(59, 130, 246)
      mintSprite = createGlowSprite(94, 234, 212)
      starSprite = createGlowSprite(186, 230, 255)
      createParticles()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const now = performance.now() * 0.001
      const cx = width * 0.5 + (pointer.active ? (pointer.x - width * 0.5) * 0.04 : 0)
      const cy = height * 0.45 + (pointer.active ? (pointer.y - height * 0.45) * 0.04 : 0)
      const positions: Array<{ x: number; y: number; alpha: number; color: string }> = []

      const base = ctx.createLinearGradient(0, 0, 0, height)
      base.addColorStop(0, '#030712')
      base.addColorStop(0.55, '#02060f')
      base.addColorStop(1, '#01040a')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, width, height)

      const aura = ctx.createRadialGradient(cx, cy, 24, cx, cy, Math.min(width, height) * 0.34)
      aura.addColorStop(0, 'rgba(125, 245, 255, 0.30)')
      aura.addColorStop(0.26, 'rgba(94, 234, 212, 0.20)')
      aura.addColorStop(0.66, 'rgba(59, 130, 246, 0.12)')
      aura.addColorStop(1, 'rgba(59, 130, 246, 0)')
      ctx.fillStyle = aura
      ctx.fillRect(0, 0, width, height)

      const sideGlowL = ctx.createRadialGradient(width * 0.12, height * 0.5, 0, width * 0.12, height * 0.5, width * 0.44)
      sideGlowL.addColorStop(0, 'rgba(59,130,246,0.20)')
      sideGlowL.addColorStop(1, 'rgba(59,130,246,0)')
      ctx.fillStyle = sideGlowL
      ctx.fillRect(0, 0, width, height)

      const sideGlowR = ctx.createRadialGradient(width * 0.88, height * 0.5, 0, width * 0.88, height * 0.5, width * 0.44)
      sideGlowR.addColorStop(0, 'rgba(94,234,212,0.16)')
      sideGlowR.addColorStop(1, 'rgba(94,234,212,0)')
      ctx.fillStyle = sideGlowR
      ctx.fillRect(0, 0, width, height)

      const vignette = ctx.createRadialGradient(width * 0.5, height * 0.46, width * 0.14, width * 0.5, height * 0.5, width * 0.74)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.72)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]
        p.angle += p.speed
        p.wobblePhase += p.wobbleSpeed

        const orbit = p.orbit + Math.sin(p.wobblePhase) * p.wobbleAmp
        const ellipseX = 1 + p.eccentricity
        const ellipseY = 0.84 - p.eccentricity * 0.5
        const x = cx + Math.cos(p.angle) * orbit * ellipseX + Math.cos(p.wobblePhase * 0.8) * p.jitter * 0.2
        const y = cy + Math.sin(p.angle) * orbit * ellipseY + Math.sin(p.wobblePhase * 0.9) * p.jitter * 0.2
        const ndx = (x - cx) / Math.max(1, width * 0.24)
        const ndy = (y - cy) / Math.max(1, height * 0.17)
        const centerNorm = Math.sqrt(ndx * ndx + ndy * ndy)
        const centerWeight = Math.min(1, Math.max(0.52, centerNorm))
        const tx = width * 0.5
        const ty = height * 0.47
        const trX = width * 0.28
        const trY = height * 0.18
        const titleNorm = Math.sqrt(((x - tx) / trX) ** 2 + ((y - ty) / trY) ** 2)
        const titleWeight = titleNorm < 1 ? 0.28 + titleNorm * 0.72 : 1
        const pulse = 0.78 + Math.sin(now * 1.7 + p.wobblePhase * 2.3) * 0.22
        const particleAlpha = Math.min(1, p.alpha * centerWeight * titleWeight * 1.18 * pulse)

        const sprite =
          p.color === '59,130,246' ? blueSprite : p.color === '94,234,212' ? mintSprite : starSprite
        if (sprite) {
          const size = p.radius * 7.3
          ctx.globalAlpha = Math.min(1, particleAlpha * 1.12)
          ctx.drawImage(sprite, x - size * 0.5, y - size * 0.5, size, size)
          ctx.globalAlpha = 1
        }

        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.color}, ${Math.min(1, particleAlpha * 0.95)})`
        ctx.arc(x, y, Math.max(0.9, p.radius * 0.62), 0, Math.PI * 2)
        ctx.fill()

        positions.push({ x, y, alpha: particleAlpha, color: p.color })
      }

      meteorTimer += 1
      const meteorInterval = window.innerWidth < 768 ? 180 : 140
      if (meteorTimer > meteorInterval && Math.random() > 0.7) {
        meteorTimer = 0
        const startX = Math.random() * width * 0.8 + width * 0.1
        const startY = Math.random() * height * 0.25 + height * 0.05
        const speed = Math.random() * 5 + 7
        const angle = Math.PI * (0.72 + Math.random() * 0.08)
        meteors.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 34 + Math.random() * 16,
        })
      }

      for (let i = meteors.length - 1; i >= 0; i -= 1) {
        const m = meteors[i]
        m.x += m.vx
        m.y += m.vy
        m.life += 1

        const t = m.life / m.maxLife
        if (t >= 1) {
          meteors.splice(i, 1)
          continue
        }

        const opacity = (1 - t) * 0.9
        const tailX = m.x - m.vx * 3.6
        const tailY = m.y - m.vy * 3.6
        const g = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
        g.addColorStop(0, `rgba(191,219,254,${opacity})`)
        g.addColorStop(1, 'rgba(191,219,254,0)')
        ctx.strokeStyle = g
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
      }

      // Smooth pointer interpolation to avoid jitter from raw pointer events.
      if (pointerTarget.active || pointer.active) {
        pointer.x += (pointerTarget.x - pointer.x) * 0.18
        pointer.y += (pointerTarget.y - pointer.y) * 0.18
        const dx = pointerTarget.x - pointer.x
        const dy = pointerTarget.y - pointer.y
        pointer.active = pointerTarget.active || dx * dx + dy * dy > 0.35
      }

      if (pointer.active) {
        const radius = Math.min(190, Math.max(130, width * 0.12))
        const radiusSq = radius * radius
        const near: typeof positions = []
        const maxNear = window.innerWidth < 768 ? 22 : 40

        for (let i = 0; i < positions.length; i += 1) {
          const p = positions[i]
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          if (dx * dx + dy * dy < radiusSq) {
            near.push(p)
            if (near.length >= maxNear) break
          }
        }

        const edgeGradient = ctx.createRadialGradient(pointer.x, pointer.y, radius * 0.2, pointer.x, pointer.y, radius)
        edgeGradient.addColorStop(0, 'rgba(59,130,246,0.46)')
        edgeGradient.addColorStop(0.55, 'rgba(59,130,246,0.24)')
        edgeGradient.addColorStop(1, 'rgba(59,130,246,0)')
        ctx.fillStyle = edgeGradient
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2)
        ctx.fill()

        const coreGlow = ctx.createRadialGradient(pointer.x, pointer.y, radius * 0.02, pointer.x, pointer.y, radius * 0.72)
        coreGlow.addColorStop(0, 'rgba(147,197,253,0.30)')
        coreGlow.addColorStop(0.35, 'rgba(147,197,253,0.20)')
        coreGlow.addColorStop(0.7, 'rgba(147,197,253,0.10)')
        coreGlow.addColorStop(1, 'rgba(147,197,253,0)')
        ctx.fillStyle = coreGlow
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, radius * 0.68, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = 'rgba(96,165,250,0.28)'
        ctx.lineWidth = 1.1
        for (let i = 0; i < near.length; i += 1) {
          for (let j = i + 1; j < near.length; j += 1) {
            const a = near[i]
            const b = near[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const distSq = dx * dx + dy * dy
            const maxDistSq = 78 * 78
            if (distSq > maxDistSq) continue
            const strength = 1 - Math.sqrt(distSq) / 78
            ctx.strokeStyle = `rgba(96,165,250,${0.12 + strength * 0.42})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        for (let i = 0; i < near.length; i += 1) {
          const p = near[i]
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const strength = 1 - dist / radius
          if (strength <= 0) continue
          ctx.strokeStyle = `rgba(94,234,212,${0.14 + strength * 0.36})`
          ctx.beginPath()
          ctx.moveTo(pointer.x, pointer.y)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        }
      }

      ctx.shadowBlur = 0

      rafId = requestAnimationFrame(draw)
    }

    const onMove = (event: PointerEvent) => {
      pointerTarget = { x: event.clientX, y: event.clientY, active: true }
      if (!pointer.active) {
        pointer = { x: event.clientX, y: event.clientY, active: true }
      }
    }
    const onLeave = () => {
      pointerTarget = { ...pointerTarget, active: false }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-90" aria-hidden />
}

function SpotlightRevealSection() {
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false })

  const points = [
    {
      title: '측정 대상',
      left: '잠재력 중심',
      right: '수행 능력 중심',
      leftSub: '역량 잠재치 위주 판단',
      rightSub: '현장 수행 역량 중심 검증',
      icon: BrainCircuit,
    },
    {
      title: '검증 방식',
      left: '자기보고식',
      right: '행동 시뮬레이션',
      leftSub: '주관 응답 기반 평가',
      rightSub: '상황 행동 기반 평가',
      icon: Cpu,
    },
    {
      title: '예측 정확도',
      left: '낮음 / 0.3',
      right: '높음 / 0.7',
      leftSub: '성과 연결성 낮음',
      rightSub: '성과 예측 신뢰도 향상',
      icon: Target,
    },
  ]

  const revealMask = `radial-gradient(circle 250px at ${spot.x}% ${spot.y}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 55%, rgba(255,255,255,0) 100%)`
  const inverseMask = `radial-gradient(circle 250px at ${spot.x}% ${spot.y}%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,1) 100%)`

  return (
    <section className="snap-start mx-auto w-full max-w-6xl px-6 pb-8 pt-[20vh] lg:px-10 xl:px-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-4 inline-flex rounded-full border border-[#3B82F6]/50 bg-[#3B82F6]/10 px-4 py-1.5"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#3B82F6]">
            ASTRA SOLUTION
          </span>
        </motion.div>
        <h2 className="mt-3 text-3xl font-bold text-white">
          실무자가 실전에서 좋은 성과를 내게 하려면 어떻�� 해야 할까요?
        </h2>
        <p className="mx-auto mt-4 max-w-4xl text-gray-400">
          채용 시 우수했던 인재가 현장에서 기대 이하의 성과를 보이는 이유, 문제는 평가 방식에 있습니다.
        </p>
      </motion.div>

      <div
        className="group relative overflow-hidden rounded-2xl border border-red-900/20 bg-[#070A13]/90 cursor-crosshair"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const xPct = ((e.clientX - rect.left) / rect.width) * 100
          const yPct = ((e.clientY - rect.top) / rect.height) * 100
          setSpot({ x: xPct, y: yPct, active: true })
        }}
        onMouseEnter={(e) => {
          setSpot({ x: 50, y: 50, active: true })
        }}
        onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-15" />

        <div className="relative p-5 md:p-8">
          <div className="invisible grid gap-4 md:grid-cols-3">
            <div className="md:col-span-3">
              <p className="text-sm font-semibold tracking-[0.04em]">🔴 기존 방식</p>
            </div>
            {points.map((point) => (
              <div key={`sizer-${point.title}`} className="rounded-xl border border-white/10 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full" />
                  <p className="text-xs font-semibold tracking-[0.12em]">{point.title}</p>
                </div>
                <p className="text-2xl font-semibold">{point.left}</p>
                <p className="mt-2 text-sm">{point.leftSub}</p>
              </div>
            ))}
          </div>

          <div
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
            style={{
              WebkitMaskImage: inverseMask,
              maskImage: inverseMask,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          >
            <div className="grid h-full gap-4 p-5 md:grid-cols-3 md:p-8">
              <div className="md:col-span-3">
                <p className="text-sm font-semibold tracking-[0.04em] text-red-500/50">🔴 기존 방식</p>
              </div>
              {points.map((point) => {
                const Icon = point.icon
                return (
                  <div key={`dim-${point.title}`} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#374151]/20">
                        <Icon className="h-4 w-4 text-[#374151]" />
                      </div>
                      <p className="text-xs font-semibold tracking-[0.12em] text-[#374151]">{point.title}</p>
                    </div>
                    <p className="text-2xl font-semibold text-[#374151]">{point.left}</p>
                    <p className="mt-2 text-sm text-[#374151]">{point.leftSub}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
            style={{
              WebkitMaskImage: revealMask,
              maskImage: revealMask,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          >
            <div className="grid h-full gap-4 p-5 md:grid-cols-3 md:p-8">
              <div className="md:col-span-3">
                <p className="text-sm font-semibold tracking-[0.04em] text-[#3B82F6]">🔵 ASTRA (AI Solution)</p>
              </div>
              {points.map((point) => {
                const Icon = point.icon
                return (
                  <div
                    key={`bright-${point.title}`}
                    className="rounded-xl border border-[#3B82F6]/30 bg-[#0b1428]/70 p-5 shadow-[0_0_26px_rgba(59,130,246,0.16)]"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B82F6]/25 shadow-[0_0_14px_rgba(59,130,246,0.5)]">
                        <Icon className="h-4 w-4 text-[#3B82F6]" />
                      </div>
                      <p className="text-xs font-semibold tracking-[0.12em] text-white">{point.title}</p>
                    </div>
                    <p className="text-2xl font-semibold text-white">
                      <span className="text-[#3B82F6]">{point.right}</span>
                    </p>
                    <p className="mt-2 text-sm text-white">{point.rightSub}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FlowStep({
  index,
  title,
  desc,
  icon: Icon,
}: {
  index: number
  title: string
  desc: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px', amount: 0.4 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.3, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 24 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="relative flex gap-5"
    >
      <div className="relative z-10 mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#0E1424] shadow-[0_0_20px_rgba(59,130,246,0.35)]">
        <Icon className="h-5 w-5 text-[#3B82F6]" />
      </div>
      <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Step 0{index + 1}</p>
        <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{desc}</p>
      </div>
    </motion.div>
  )
}

function FeatureFlow({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const flowRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: flowRef,
    container: containerRef,
    offset: ['start 75%', 'end 30%'],
  })

  const steps = [
    {
      title: '우리 기업 맞춤형 AI 모델링',
      desc: (
        <>
          비싼 컨설팅 없이, 고성과자 데이터와 어세스타의 검증된 DB를 결합하여{' '}
          <span className="font-semibold text-blue-200">단 3일 만에</span> 최적화된 역량 모델을
          구축합니다.
        </>
      ),
      icon: Database,
    },
    {
      title: '변화에 대응하는 실시간 업데이트',
      desc: (
        <>
          비즈니스 환경이 바뀔 때마다 다시 컨설팅을 받지 마세요. 클릭 한 번으로 인재상을
          업데이트하고, <span className="font-semibold text-blue-200">최신 트렌드를 즉시 반영</span>
          합니다.
        </>
      ),
      icon: RefreshCcw,
    },
    {
      title: '채용부터 평가까지, Seamless 연결',
      desc: (
        <>
          모델링 결과가 보고서에만 머물지 않습니다. 채용, 면접, 성과 평가까지{' '}
          <span className="font-semibold text-blue-200">
            HR 전 과정에 즉시 적용 가능한 가이드
          </span>
          를 제공합니다.
        </>
      ),
      icon: Workflow,
    },
  ]

  const researchChips = [
    {
      label: '25년 데이터베이스',
      href: '/research#database',
      icon: Database,
    },
    {
      label: 'ISO 국제 표준 준수',
      href: '/research#iso',
      icon: BadgeCheck,
    },
    {
      label: 'Schmidt & Hunter 타당도 입증',
      href: '/research#validity',
      icon: BarChart3,
    },
  ]

  return (
    <section className="snap-start mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-5xl flex-col justify-start px-6 pb-8 pt-12 lg:px-10 xl:px-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-7 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
          Real-time Competency Modeling
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
          멈춰있는 역량 모델, 이제 실시간으로 진화합니다.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-slate-300">
          고비용, 장시간 소요되던 기존 방식의 한계를 넘어, 클릭 한 번으로 업데이트되는 살아있는
          역량 모델을 경험하세요.
        </p>
      </motion.div>

      <div ref={flowRef} className="relative space-y-6 pl-2">
        <div className="absolute bottom-6 left-[22px] top-6 w-px bg-[#3B82F6]/25" />
        <motion.div
          className="absolute left-[22px] top-6 w-px origin-top bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.95)]"
          style={{ scaleY: scrollYProgress, height: 'calc(100% - 48px)' }}
        />
        {steps.map((step, index) => (
          <FlowStep key={step.title} index={index} title={step.title} desc={step.desc} icon={step.icon} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
        className="mt-7 flex flex-wrap justify-center gap-4"
      >
        {researchChips.map((chip) => {
          const Icon = chip.icon
          return (
            <Link
              key={chip.label}
              href={chip.href}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-4 w-4 text-[#3B82F6]" />
              <span>{chip.label}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          )
        })}
      </motion.div>
    </section>
  )
}

function ROICalculator() {
  const [hires, setHires] = useState(120)
  const [salary, setSalary] = useState(6000)
  const [displayValue, setDisplayValue] = useState(0)
  const prevRef = useRef(0)

  const failureReduction = useMemo(() => hires * salary * 0.05, [hires, salary])
  const productivityGain = useMemo(() => hires * salary * 1.5 * 0.1, [hires, salary])

  const estimatedBenefit = useMemo(() => {
    return failureReduction + productivityGain
  }, [failureReduction, productivityGain])

  const formatManwonToKrw = (value: number) => {
    const safe = Math.max(0, Math.round(value))
    const eok = Math.floor(safe / 10000)
    const man = safe % 10000

    if (eok > 0 && man > 0) return `${eok.toLocaleString('ko-KR')}억 ${man.toLocaleString('ko-KR')}만 원`
    if (eok > 0) return `${eok.toLocaleString('ko-KR')}억 원`
    return `${man.toLocaleString('ko-KR')}만 원`
  }

  useEffect(() => {
    const from = prevRef.current
    const to = estimatedBenefit
    const duration = 1100
    let rafId = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const value = Math.round(from + (to - from) * eased)
      setDisplayValue(value)
      if (t < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    prevRef.current = to
    return () => cancelAnimationFrame(rafId)
  }, [estimatedBenefit])

  return (
    <section className="snap-start mx-auto w-full max-w-4xl px-6 pt-10 lg:px-10 xl:px-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-[0_0_45px_rgba(59,130,246,0.16)] md:p-10"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">ROI Calculator</p>
              <h2 className="mt-3 text-3xl font-bold text-white">예상 연간 이익 시뮬레이션</h2>
            </div>

            <div className="space-y-8">
              <div>
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>연간 채용 규모</span>
                  <span className="font-semibold text-white">{hires}명</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  value={hires}
                  onChange={(e) => setHires(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#3B82F6]"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>평균 연봉</span>
                  <span className="font-semibold text-white">{salary.toLocaleString('ko-KR')}만원</span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={10000}
                  step={100}
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#3B82F6]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1428]/50 p-6 md:p-8">
            <p className="text-sm text-slate-300">예상 연간 이익</p>
            <p className="mt-4 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 md:text-6xl [font-variant-numeric:tabular-nums]">
              {formatManwonToKrw(displayValue)}
            </p>

            <div className="mt-7 space-y-3 border-t border-white/10 pt-5 text-left">
              <p className="text-sm text-green-400">
                📉 채용 실패 절감: <span className="font-semibold">{formatManwonToKrw(failureReduction).replace(' 원', '')}</span>
              </p>
              <p className="text-sm text-blue-400">
                📈 생산성 증대: <span className="font-semibold">{formatManwonToKrw(productivityGain).replace(' 원', '')}</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function AnimatedMetric({
  label,
  value,
  delta,
  decimals = 0,
  suffix = '',
}: {
  label: string
  value: number
  delta: string
  decimals?: number
  suffix?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 900
    const startTime = performance.now()
    let rafId = 0

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, value])

  const formatted = display.toLocaleString('ko-KR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <div ref={ref} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="mt-2 flex items-end gap-2">
        <p className="text-3xl font-bold text-slate-900">
          {formatted}
          {suffix}
        </p>
        <span className="pb-1 text-xs font-semibold text-blue-500">{delta}</span>
      </div>
    </div>
  )
}

function LiveAIDashboardSection() {
  const bars = [64, 78, 52, 87, 68, 73, 58]
  const analysis = [
    { label: '리더십 역량', value: 92 },
    { label: '커뮤니케이션', value: 87 },
    { label: '문제해결력', value: 78 },
    { label: '전략적 사고', value: 85 },
  ]

  return (
    <section className="snap-start mx-auto mt-16 w-full max-w-6xl px-6 pb-28 lg:px-10 xl:px-[120px]">
      <div className="mb-8 flex flex-col items-center">
        <div className="h-14 w-px bg-gradient-to-b from-[#3B82F6]/60 to-transparent" />
        <div className="mt-2 text-2xl text-[#3B82F6]">↓</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65 }}
        className="mb-12 text-center"
      >
        <h2 className="text-balance text-3xl font-bold leading-tight text-white md:text-4xl">
          데이터로 증명된 고성과자의 행동,
          <br />
          AI가 3초만에 분석합니다.
        </h2>
      </motion.div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18)_0%,rgba(59,130,246,0)_68%)]" />
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="overflow-hidden rounded-2xl border border-slate-600/60 bg-white shadow-[0_40px_120px_rgba(2,6,23,0.5)]"
        >
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
          </div>

          <div className="space-y-8 p-5 md:p-8">
            <div className="grid gap-4 md:grid-cols-4">
              <AnimatedMetric label="전체 해당 인원" value={128} delta="+12" />
              <AnimatedMetric label="활용 팀가" value={34} delta="+2.1%" />
              <AnimatedMetric label="평가 준비율" value={94.2} decimals={1} suffix="%" delta="+2.1%" />
              <AnimatedMetric label="평균 신뢰도" value={0.91} decimals={2} delta="+0.03" />
            </div>

            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-xl border border-slate-200 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#3B82F6]" />
                  <h3 className="text-sm font-semibold text-slate-700">역량별 예측 타당도</h3>
                </div>
                <div className="grid h-44 grid-cols-7 items-end gap-2">
                  {bars.map((bar, index) => (
                    <motion.div
                      key={`${bar}-${index}`}
                      initial={{ scaleY: 0.05 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }}
                      className="origin-bottom rounded-md bg-[#3B82F6]/85"
                      style={{ height: `${bar}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Network className="h-4 w-4 text-[#3B82F6]" />
                  <h3 className="text-sm font-semibold text-slate-700">AI 분석 인사이트</h3>
                </div>
                <div className="space-y-4">
                  {analysis.map((item, index) => (
                    <div key={item.label}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="text-slate-700">{item.label}</span>
                        <span className="font-semibold text-slate-900">{item.value}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
                          className="h-full rounded-full bg-[#3B82F6]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SocialProof() {
  const clients = [
    '현**(제조)',
    'L**(화학)',
    '네**(IT)',
    '카**(IT)',
    '포**(철강)',
    'K**(통신)',
    'C**(유통)',
    '한**(방산)',
    '롯**(유통)',
  ]

  const metrics = [
    { value: 500, suffix: '+', label: '완료 프로젝트' },
    { value: 97, suffix: '%', label: '고객 만족도' },
    { value: 25, suffix: '년+', label: '업력' },
  ]

  function Marquee({ items }: { items: string[] }) {
    const loop = [...items, ...items]

    return (
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="animate-chip-marquee flex w-max items-center gap-3 py-2">
          {loop.map((client, index) => (
            <span
              key={`${client}-${index}`}
              className="rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    )
  }

  function CountUpMetric({
    value,
    suffix,
    label,
    duration = 2000,
  }: {
    value: number
    suffix: string
    label: string
    duration?: number
  }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.5 })
    const [display, setDisplay] = useState(0)

    useEffect(() => {
      if (!inView) return
      let rafId = 0
      const start = performance.now()

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setDisplay(Math.round(value * eased))
        if (t < 1) rafId = requestAnimationFrame(tick)
      }

      rafId = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(rafId)
    }, [duration, inView, value])

    return (
      <div
        ref={ref}
        className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:scale-110"
      >
        <p className="text-5xl font-extrabold text-slate-900 md:text-6xl">
          {display.toLocaleString('ko-KR')}
          {suffix}
        </p>
        <p className="mt-3 text-sm text-slate-600">{label}</p>
      </div>
    )
  }

  return (
    <section className="snap-start mt-8 bg-gradient-to-b from-[#020617] via-[#1e293b] to-[#ffffff] pt-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 xl:px-[120px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            이미 업계 1위 기업들은 아스트라와 함께하고 있습니다
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-16"
        >
          <Marquee items={clients} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-16 pb-28"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {metrics.map((metric) => (
              <CountUpMetric
                key={metric.label}
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
                duration={2000}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-[#3B82F6] px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-[#356DF3]"
            >
              무료 진단 문의하기
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut', delay },
    }),
  }

  return (
    <div ref={containerRef} className="relative h-[100dvh] snap-y snap-proximity scroll-pt-24 overflow-y-auto overflow-x-hidden bg-[#020617] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="nebula-orb nebula-orb-1" />
        <div className="nebula-orb nebula-orb-2" />
        <div className="nebula-orb nebula-orb-3" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:56px_56px] opacity-10" />

      <section className="snap-start relative flex min-h-screen items-center justify-center px-6 pb-24 pt-36 text-center lg:px-10 xl:px-[120px]">
        <QuantumParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-[#020617]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_70%)]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mt-8 flex flex-col items-center gap-8">
            <motion.h1
              custom={0.15}
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="text-balance text-6xl font-extrabold leading-tight tracking-[-0.02em] md:text-7xl"
            >
              <span className="block">
                <span className="bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">고성과자의 </span>
                <span style={{ color: ELECTRIC_BLUE }}>DNA</span>,
              </span>
              <span aria-hidden className="block h-[10px]" />
              <span className="block">
                <span className="bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">AI가 </span>
                <span style={{ color: ELECTRIC_BLUE }}>3초</span>
                <span className="bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent"> 만에 </span>
                <span style={{ color: ELECTRIC_BLUE }}>시각화</span>
                <span className="bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">합니다.</span>
              </span>
            </motion.h1>

            <motion.p
              custom={0.3}
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto mt-6 mb-10 max-w-3xl text-pretty text-lg font-light leading-[1.8] text-gray-300"
            >
              3개월이 걸리던 고비용 역량 모델링, AI 자동화로 3일 만에 완성합니다.
              <br />
              비용은 1/10로 줄이고, 고성과자 예측 정확도는 94%까지 끌어올렸습니다.
            </motion.p>
          </div>

          <motion.div custom={0.45} variants={heroVariants} initial="hidden" animate="visible" className="mt-0">
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-medium text-white backdrop-blur-md shadow-[0_0_28px_rgba(59,130,246,0.35)] transition-all duration-300 ease-out hover:scale-[1.02] hover:border-[#356DF3] hover:bg-[#356DF3] hover:text-white"
            >
              무료 진단 데모 보기
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center text-center text-neutral-300"
        >
          <p className="text-xs tracking-[0.18em] uppercase">Scroll Down</p>
          <ChevronDown className="mx-auto mt-1 h-4 w-4 text-cyan-300" />
        </motion.div>
      </section>

      <SpotlightRevealSection />
      <FeatureFlow containerRef={containerRef} />
      <ROICalculator />
      <LiveAIDashboardSection />
      <SocialProof />
    </div>
  )
}
