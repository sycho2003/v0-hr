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
import { motion, useInView, useScroll, type Variants } from 'framer-motion'

function QuantumParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const host = canvas.closest('[data-hero-canvas-host]') as HTMLElement | null
    if (!host) return

    let width = 0
    let height = 0
    let rafId = 0
    let pointer = { x: 0, y: 0, active: false }
    let pointerTarget = { x: 0, y: 0, active: false }
    let blueSprite: HTMLCanvasElement | null = null
    let mintSprite: HTMLCanvasElement | null = null
    let starSprite: HTMLCanvasElement | null = null
    const impactCooldown = new WeakMap<HTMLElement, number>()
    const impactTimers = new WeakMap<HTMLElement, number>()

    const particleCount = () => (window.innerWidth < 768 ? 120 : 250)
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
      ambient: boolean
      twinkleSpeed: number
      twinklePhase: number
      flashStrength: number
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
      const outerMinOrbit = maxOrbit * 1.04
      const outerMaxOrbit = Math.max(outerMinOrbit + 60, Math.min(width, height) * 0.68)
      const bands = 6
      const bandStep = (maxOrbit - minOrbit) / Math.max(1, bands - 1)
      const ambientStart = Math.floor(count * 0.72)

      for (let i = 0; i < count; i += 1) {
        const ambient = i >= ambientStart
        const colorSeed = Math.random()
        const color =
          colorSeed > 0.88 ? '186,230,255' : colorSeed > 0.24 ? '59,130,246' : '94,234,212'
        const flashStrength = !ambient && Math.random() < 0.18 ? Math.random() * 0.55 + 0.3 : 0
        let orbit = 0
        if (ambient) {
          const ambientT = Math.pow(Math.random(), 0.82)
          orbit = outerMinOrbit + ambientT * (outerMaxOrbit - outerMinOrbit)
        } else {
          const band = Math.floor(Math.random() * bands)
          const bandBase = minOrbit + bandStep * band
          const ringBias = Math.pow(Math.random(), 0.67)
          orbit = bandBase + (ringBias - 0.5) * bandStep * 0.88
        }
        particles.push({
          orbit,
          angle: Math.random() * Math.PI * 2,
          speed: ambient ? Math.random() * 0.0005 + 0.00014 : Math.random() * 0.001 + 0.00024,
          radius: ambient ? Math.random() * 0.44 + 0.34 : Math.random() * 0.82 + 0.58,
          alpha: ambient ? Math.random() * 0.28 + 0.3 : Math.random() * 0.34 + 0.43,
          color,
          jitter: (Math.random() - 0.5) * (ambient ? 7 : 12),
          wobbleAmp: ambient ? Math.random() * 3 + 0.8 : Math.random() * 5.4 + 1.2,
          wobbleSpeed: ambient ? Math.random() * 0.005 + 0.0014 : Math.random() * 0.009 + 0.002,
          wobblePhase: Math.random() * Math.PI * 2,
          eccentricity: ambient ? Math.random() * 0.2 - 0.05 : Math.random() * 0.24 - 0.06,
          ambient,
          twinkleSpeed: Math.random() * 2.2 + 1.6,
          twinklePhase: Math.random() * Math.PI * 2,
          flashStrength,
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
      const rect = host.getBoundingClientRect()
      width = Math.max(1, Math.floor(Math.max(window.innerWidth, host.clientWidth, rect.width)))
      height = Math.max(1, Math.floor(Math.max(window.innerHeight, host.clientHeight, rect.height)))
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
      const nowMs = performance.now()
      ctx.clearRect(0, 0, width, height)
      const now = nowMs * 0.001
      // Keep the star field anchored; pointer should not drag the whole cluster.
      const cx = width * 0.5
      const cy = height * 0.45
      const positions: Array<{ x: number; y: number; alpha: number; color: string }> = []
      const hostRect = host.getBoundingClientRect()
      const tokenRects = Array.from(host.querySelectorAll<HTMLElement>('.hero-reflect-token')).map((node) => {
        const r = node.getBoundingClientRect()
        return {
          node,
          left: r.left - hostRect.left,
          top: r.top - hostRect.top,
          right: r.right - hostRect.left,
          bottom: r.bottom - hostRect.top,
          width: r.width,
          height: r.height,
        }
      })

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

      // Keep subtle glow alive near the scroll hint area.
      const bottomAura = ctx.createRadialGradient(width * 0.5, height * 0.96, 0, width * 0.5, height * 0.96, width * 0.62)
      bottomAura.addColorStop(0, 'rgba(59,130,246,0.16)')
      bottomAura.addColorStop(0.45, 'rgba(59,130,246,0.08)')
      bottomAura.addColorStop(1, 'rgba(59,130,246,0)')
      ctx.fillStyle = bottomAura
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
        const twinkleBase = 0.9 + Math.sin(now * p.twinkleSpeed + p.twinklePhase) * 0.1
        const flashWave = Math.max(0, Math.sin(now * (p.twinkleSpeed * 1.8) + p.twinklePhase * 1.4))
        const flashBoost = p.flashStrength * Math.pow(flashWave, 16)
        const twinkle = twinkleBase + flashBoost
        const weightedAlpha = p.ambient
          ? p.alpha * Math.max(0.66, centerWeight * 0.98) * Math.max(0.88, titleWeight) * 1.15 * pulse * twinkle
          : p.alpha * centerWeight * titleWeight * 1.18 * pulse * twinkle
        const particleAlpha = Math.min(1, weightedAlpha)

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

        // Trigger text impact highlight only when meteor head intersects a token area.
        for (let t = 0; t < tokenRects.length; t += 1) {
          const token = tokenRects[t]
          const pad = 10
          if (
            m.x < token.left - pad ||
            m.x > token.right + pad ||
            m.y < token.top - pad ||
            m.y > token.bottom + pad
          ) {
            continue
          }

          const last = impactCooldown.get(token.node) ?? 0
          if (nowMs - last < 220) continue
          impactCooldown.set(token.node, nowMs)

          const impactPct = Math.max(0, Math.min(100, ((m.x - token.left) / Math.max(1, token.width)) * 100))
          const impactYPct = Math.max(0, Math.min(100, ((m.y - token.top) / Math.max(1, token.height)) * 100))
          token.node.style.setProperty('--impact-x', `${impactPct}%`)
          token.node.style.setProperty('--impact-y', `${impactYPct}%`)
          token.node.classList.remove('is-impact')
          void token.node.offsetWidth
          token.node.classList.add('is-impact')

          const prevTimer = impactTimers.get(token.node)
          if (prevTimer) {
            window.clearTimeout(prevTimer)
          }
          const timer = window.setTimeout(() => {
            token.node.classList.remove('is-impact')
          }, 260)
          impactTimers.set(token.node, timer)
        }
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
      const rect = host.getBoundingClientRect()
      const localX = event.clientX - rect.left
      const localY = event.clientY - rect.top
      const inside = localX >= 0 && localX <= rect.width && localY >= 0 && localY <= rect.height

      if (!inside) {
        pointerTarget = { ...pointerTarget, active: false }
        return
      }

      pointerTarget = { x: localX, y: localY, active: true }
      if (!pointer.active) {
        pointer = { x: localX, y: localY, active: true }
      }
    }
    const onLeave = () => {
      pointerTarget = { ...pointerTarget, active: false }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(host)
    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      const tokenNodes = Array.from(host.querySelectorAll<HTMLElement>('.hero-reflect-token'))
      for (let i = 0; i < tokenNodes.length; i += 1) {
        const node = tokenNodes[i]
        const timer = impactTimers.get(node)
        if (timer) window.clearTimeout(timer)
        node.classList.remove('is-impact')
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full z-0 opacity-90" aria-hidden />
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
    <section className="relative z-10 mx-auto mt-4 w-full max-w-6xl px-6 pb-8 pt-12 max-[359px]:pt-8 md:mt-6 lg:px-10 xl:px-[120px]">
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
          className="mb-4"
        >
          <span className="text-brand-primary text-xs font-semibold uppercase tracking-[0.26em]">
            ASTRA SOLUTION
          </span>
        </motion.div>
        <h2 className="mt-3 text-3xl font-bold text-white">
          실무자가 실전에서 좋은 성과를 내게 하려면 어떻게 해야 할까요?
        </h2>
        <p className="mx-auto mt-4 max-w-4xl text-sm leading-[1.7] text-gray-400 sm:text-base sm:leading-[1.75]">
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
                <p className="text-sm font-semibold tracking-[0.04em] text-red-500/60">🔴 기존 방식</p>
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
                    <p className="text-2xl font-semibold text-red-900/85">{point.left}</p>
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
      initial={{ opacity: 0.3 }}
      animate={inView ? { opacity: 1 } : { opacity: 0.3 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="relative flex gap-5"
    >
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#0E1424] shadow-[0_0_20px_rgba(59,130,246,0.35)]">
        <Icon className="h-5 w-5 text-[#3B82F6]" />
      </div>
      <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
        <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.2em]">Step 0{index + 1}</p>
        <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{desc}</p>
      </div>
    </motion.div>
  )
}

function FeatureFlow() {
  const flowRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: flowRef,
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
    <section className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-5xl flex-col justify-start px-6 pb-8 pt-12 max-[359px]:pt-8 lg:px-10 xl:px-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-7 text-center"
      >
        <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.26em]">
          Real-time Competency Modeling
        </p>
        <h2 className="title-group__heading text-3xl font-bold text-white md:text-4xl">
          멈춰있는 역량 모델, 이제 실시간으로 진화합니다.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-slate-300">
          고비용, 장시간 소요되던 기존 방식의 한계를 넘어, 클릭 한 번으로 업데이트되는 살아있는
          역량 모델을 경험하세요.
        </p>
      </motion.div>

      <motion.div
        ref={flowRef}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative space-y-6"
      >
        <div className="absolute bottom-6 left-6 top-6 z-0 w-px bg-gradient-to-b from-[#3B82F6]/30 via-[#3B82F6]/22 to-transparent" />
        <motion.div
          className="absolute bottom-6 left-6 top-6 z-0 w-px origin-top bg-gradient-to-b from-[#60A5FA] via-[#3B82F6] to-transparent shadow-[0_0_10px_rgba(59,130,246,0.75)]"
          style={{ scaleY: scrollYProgress }}
        />
        {steps.map((step, index) => (
          <FlowStep key={step.title} index={index} title={step.title} desc={step.desc} icon={step.icon} />
        ))}
      </motion.div>

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
              className="compact-chip-320 group inline-flex min-w-0 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:text-white"
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
  const [tenureYears, setTenureYears] = useState(3)
  const [costPerHire, setCostPerHire] = useState(300)
  const [displayValue, setDisplayValue] = useState(0)
  const prevRef = useRef(0)

  // Schmidt-Hunter utility model (incremental):
  // ΔU = N × T × (r_astra - r_base) × SD_y × Z_x - (N × C)
  const validityBaseline = 0.3
  const validityAstra = 0.65
  const sdYRatio = 0.4
  const selectedZScore = 0.8
  const failureShare = 0.25
  const performanceStdDev = useMemo(() => salary * sdYRatio, [salary, sdYRatio])

  const incrementalUtility = useMemo(() => {
    return hires * tenureYears * (validityAstra - validityBaseline) * performanceStdDev * selectedZScore
  }, [hires, tenureYears, validityAstra, validityBaseline, performanceStdDev, selectedZScore])

  // Decompose incremental utility for readability.
  const failureReduction = useMemo(() => incrementalUtility * failureShare, [incrementalUtility, failureShare])
  const productivityGain = useMemo(() => incrementalUtility * (1 - failureShare), [incrementalUtility, failureShare])
  const totalCost = useMemo(() => hires * costPerHire, [hires, costPerHire])

  const estimatedBenefit = useMemo(() => {
    return incrementalUtility
  }, [incrementalUtility])

  const formatManwonToKrw = (value: number) => {
    const rounded = Math.round(value)
    const sign = rounded < 0 ? '-' : ''
    const safe = Math.abs(rounded)
    const eok = Math.floor(safe / 10000)
    const man = safe % 10000

    if (eok > 0 && man > 0) return `${sign}${eok.toLocaleString('ko-KR')}억 ${man.toLocaleString('ko-KR')}만 원`
    if (eok > 0) return `${sign}${eok.toLocaleString('ko-KR')}억 원`
    return `${sign}${man.toLocaleString('ko-KR')}만 원`
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
    <section className="mx-auto w-full max-w-6xl px-6 pt-12 max-[359px]:pt-8 lg:px-10 xl:px-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl shadow-[0_0_45px_rgba(59,130,246,0.16)] md:p-14"
      >
        <div className="grid gap-12 md:grid-cols-[1fr_1.12fr] md:gap-14">
          <div>
            <div className="mb-8">
              <p className="text-brand-primary text-xs font-semibold uppercase tracking-[0.26em]">ROI Calculator</p>
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

              <div>
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>평균 근무 기간</span>
                  <span className="font-semibold text-white">{tenureYears}년</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#3B82F6]"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>인당 채용 비용</span>
                  <span className="font-semibold text-white">{costPerHire.toLocaleString('ko-KR')}만원</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={10}
                  value={costPerHire}
                  onChange={(e) => setCostPerHire(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#3B82F6]"
                />
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-[color:var(--astra-text-muted)]">
              산정 근거: Schmidt, F. L., & Hunter, J. E. (1998) 및 Utility Analysis(BCG) 프레임을 단순화 적용
              <br />
              본 시뮬레이션 결과는 총편익(증분 효용) 기준이며 비용 차감 전 추정치입니다.
              <br />
              자세한 추정액은 상담에서 도와드리겠습니다.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1428]/50 p-8 md:p-12">
            <p className="text-sm text-slate-300">총편익 (증분 효용, ΔU)</p>
            <p className="mt-4 break-keep text-[clamp(1.95rem,9.2vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 [font-variant-numeric:tabular-nums]">
              {formatManwonToKrw(displayValue)}
            </p>

            <div className="mt-7 space-y-3 border-t border-white/10 pt-5 text-left">
              <p className="text-sm text-green-400">
                📉 채용 실패 절감: <span className="font-semibold">{formatManwonToKrw(failureReduction).replace(' 원', '')}</span>
              </p>
              <p className="text-sm text-blue-400">
                📈 생산성 증대: <span className="font-semibold">{formatManwonToKrw(productivityGain).replace(' 원', '')}</span>
              </p>
              <p className="text-sm text-rose-300">
                💸 예상 비용(참고): <span className="font-semibold">{formatManwonToKrw(totalCost).replace(' 원', '')}</span>
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
    <section className="w-full px-6 pb-28 pt-12 max-[359px]:pt-8 md:px-20 xl:px-[120px]">
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
        <h2 className="text-balance text-3xl font-bold leading-[1.3] text-white md:text-4xl md:leading-[1.35]">
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
      <div ref={ref} className="p-4 text-center transition-transform duration-300 hover:scale-110">
        <p className="text-5xl font-extrabold text-[color:var(--astra-text)] md:text-6xl">
          {display.toLocaleString('ko-KR')}
          {suffix}
        </p>
        <p className="mt-3 text-sm text-[color:var(--astra-text-muted)]">{label}</p>
      </div>
    )
  }

  return (
    <section className="mt-8 bg-[#020617] pt-20">
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
  const heroEase = [0.22, 1, 0.36, 1] as const
  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: heroEase, delay },
    }),
  }

  return (
    <div className="relative overflow-hidden bg-[#020617] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="nebula-orb nebula-orb-1" />
        <div className="nebula-orb nebula-orb-2" />
        <div className="nebula-orb nebula-orb-3" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:56px_56px] opacity-10" />

      <section
        data-hero-canvas-host
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-14 pt-20 text-center max-[359px]:pb-12 max-[359px]:pt-16 md:pb-20 md:pt-24 lg:px-10 xl:px-[120px]"
      >
        <QuantumParticleCanvas />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.30)_52%,rgba(2,6,23,0.72)_90%,#020617_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_70%)]" />

        <div className="relative z-10 mx-auto max-w-4xl -translate-y-2 md:-translate-y-3">
          <div className="mt-6 flex flex-col items-center gap-6">
            <motion.h1
              custom={0.15}
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="text-balance text-3xl font-extrabold leading-[var(--ds-hero-title-leading)] tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="block">
                <span className="bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">고성과자의 </span>
                <span className="hero-reflect-token hero-reflect-token--a" data-text="DNA">DNA</span>,
              </span>
              <span aria-hidden className="block h-3" />
              <span className="block">
                <span className="hero-reflect-token hero-reflect-token--b" data-text="AI">AI</span>
                <span className="bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">가 </span>
                <span className="hero-reflect-token hero-reflect-token--c" data-text="3초">3초</span>
                <span className="bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent"> 만에 </span>
                <span className="hero-reflect-token" data-text="시각화">시각화</span>
                <span className="bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">합니다.</span>
              </span>
            </motion.h1>

            <motion.p
              custom={0.3}
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto mt-3 mb-5 max-w-3xl break-keep text-pretty text-sm font-light leading-[1.7] text-gray-300 sm:text-base sm:leading-[1.75]"
            >
              3개월이 걸리던 고비용 역량 모델링, AI 자동화로 3일 만에 완성합니다.
              <br />
              비용은 1/10로 줄이고, 고성과자 예측 정확도는 94%까지 끌어올렸습니다.
            </motion.p>
          </div>

          <motion.div custom={0.45} variants={heroVariants} initial="hidden" animate="visible" className="mt-1">
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md shadow-[0_0_28px_rgba(59,130,246,0.35)] transition-all duration-300 ease-out hover:scale-[1.02] hover:border-[#356DF3] hover:bg-[#356DF3] hover:text-white sm:px-7 sm:py-3 sm:text-base"
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
          className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center text-center text-neutral-300 md:bottom-8"
        >
          <p className="text-brand-primary text-xs tracking-[0.18em] uppercase">Scroll Down</p>
          <ChevronDown className="mx-auto mt-1 h-4 w-4 text-cyan-300" />
        </motion.div>
      </section>

      <SpotlightRevealSection />
      <FeatureFlow />
      <ROICalculator />
      <LiveAIDashboardSection />
      <SocialProof />
      <style jsx global>{`
        .hero-reflect-token {
          position: relative;
          display: inline-block;
          color: transparent;
          background-image:
            linear-gradient(
              94deg,
              rgba(64, 145, 250, 0.9) 0%,
              rgba(88, 165, 255, 0.95) 48%,
              rgba(60, 141, 248, 0.9) 100%
            ),
            linear-gradient(
              132deg,
              rgba(255, 255, 255, 0.2) 8%,
              rgba(255, 255, 255, 0.03) 34%,
              rgba(214, 236, 255, 0.2) 52%,
              rgba(255, 255, 255, 0.02) 78%,
              rgba(196, 226, 255, 0.16) 100%
            );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-stroke: 0.26px rgba(222, 240, 255, 0.4);
          filter: brightness(1.08) contrast(1.04) saturate(1.05);
          text-shadow: 0 1px 0 rgba(9, 20, 38, 0.14);
          --impact-x: 50%;
          --impact-y: 50%;
          animation: hero-token-base 6.6s ease-in-out infinite;
        }

        .hero-reflect-token::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          color: transparent;
          background-image:
            radial-gradient(
              ellipse at var(--impact-x) var(--impact-y),
              rgba(255, 255, 255, 0.98) 0 8%,
              rgba(233, 247, 255, 0.78) 13%,
              rgba(233, 247, 255, 0.22) 22%,
              rgba(255, 255, 255, 0) 34%
            ),
            linear-gradient(
              126deg,
              rgba(255, 255, 255, 0) 44%,
              rgba(255, 255, 255, 0.82) 50%,
              rgba(255, 255, 255, 0) 56%
            );
          background-size: 100% 100%, 38% 38%;
          background-position: center, var(--impact-x) var(--impact-y);
          background-repeat: no-repeat, no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          mix-blend-mode: screen;
          filter: blur(0.08px);
          pointer-events: none;
          opacity: 0;
          transform: scale(0.94);
        }

        .hero-reflect-token::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          color: transparent;
          background-image: radial-gradient(
            circle at var(--impact-x) var(--impact-y),
            rgba(255, 255, 255, 0.86) 0 3.5%,
            rgba(226, 243, 255, 0.58) 9%,
            rgba(212, 236, 255, 0.18) 16%,
            rgba(212, 236, 255, 0) 30%
          );
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          mix-blend-mode: screen;
          filter: blur(0.6px);
          opacity: 0;
          pointer-events: none;
        }

        .hero-reflect-token.is-impact::after {
          animation: hero-token-impact-beam 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-reflect-token.is-impact::before {
          animation: hero-token-impact-fracture 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-reflect-token.is-impact {
          animation: hero-token-base 6.6s ease-in-out infinite, hero-token-impact-core 260ms ease-out;
        }

        @keyframes hero-token-impact-beam {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          34% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.04);
          }
        }

        @keyframes hero-token-impact-fracture {
          0% {
            opacity: 0;
            transform: scale(0.98);
          }
          42% {
            opacity: 0.72;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.01);
          }
        }

        @keyframes hero-token-impact-core {
          0% {
            filter: brightness(1.08) contrast(1.04) saturate(1.05);
          }
          40% {
            filter: brightness(1.28) contrast(1.13) saturate(1.15);
          }
          100% {
            filter: brightness(1.08) contrast(1.04) saturate(1.05);
          }
        }

        @keyframes hero-token-base {
          0%,
          100% {
            filter: brightness(1.07) saturate(1.04) contrast(1.04);
          }
          82% {
            filter: brightness(1.14) saturate(1.08) contrast(1.08);
          }
        }

        @media (max-width: 768px) {
          .hero-reflect-token {
            -webkit-text-stroke: 0.22px rgba(235, 246, 255, 0.36);
          }
          .hero-reflect-token::before {
            filter: blur(0.58px);
          }
        }
      `}</style>
    </div>
  )
}
