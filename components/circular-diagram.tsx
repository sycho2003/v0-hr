'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'

/* ── Arc path helper ── */
function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const rad = (deg: number) => ((deg - 90) * Math.PI) / 180
  const x1 = cx + r * Math.cos(rad(startAngle))
  const y1 = cy + r * Math.sin(rad(startAngle))
  const x2 = cx + r * Math.cos(rad(endAngle))
  const y2 = cy + r * Math.sin(rad(endAngle))
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}

/* ── Label position helper ── */
function labelPosition(cx: number, cy: number, r: number, midAngle: number) {
  const rad = ((midAngle - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/* ── Types ── */
interface Segment {
  label: string
  startAngle: number
  endAngle: number
}

interface CircularDiagramProps {
  title: string
  segments: Segment[]
}

/* ── Gradient color pairs for each segment ── */
const segmentColors = [
  { from: '#1e3a8a', to: '#3b82f6' },   // deep blue → blue
  { from: '#1d4ed8', to: '#60a5fa' },   // blue → light blue
  { from: '#2563eb', to: '#93c5fd' },   // mid blue → lighter blue
  { from: '#1e40af', to: '#38bdf8' },   // navy → sky
  { from: '#1e3a8a', to: '#2563eb' },
  { from: '#1d4ed8', to: '#7dd3fc' },
  { from: '#2563eb', to: '#60a5fa' },
]

export function CircularDiagram({ title, segments }: CircularDiagramProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const cx = 200
  const cy = 200
  const outerR = 170
  const innerR = 95
  const midR = (outerR + innerR) / 2
  const strokeWidth = outerR - innerR
  const arcR = (outerR + innerR) / 2

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-[320px] w-[320px] md:h-[360px] md:w-[360px]">
        <svg
          viewBox="0 0 400 400"
          className="h-full w-full"
          style={{ filter: 'drop-shadow(0 4px 24px rgba(37, 99, 235, 0.15))' }}
        >
          <defs>
            {segments.map((_, i) => {
              const colors = segmentColors[i % segmentColors.length]
              return (
                <linearGradient key={`grad-${i}`} id={`seg-grad-${title}-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.from} />
                  <stop offset="100%" stopColor={colors.to} />
                </linearGradient>
              )
            })}
            <radialGradient id={`center-grad-${title}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </radialGradient>
          </defs>

          {/* Outer ring background */}
          <circle cx={cx} cy={cy} r={arcR} fill="none" stroke="rgba(30, 58, 138, 0.15)" strokeWidth={strokeWidth} />

          {/* Segments */}
          {segments.map((seg, i) => {
            const gap = 4
            const start = seg.startAngle + gap / 2
            const end = seg.endAngle - gap / 2
            const isHovered = hoveredIndex === i

            return (
              <motion.path
                key={i}
                d={describeArc(cx, cy, arcR, start, end)}
                fill="none"
                stroke={`url(#seg-grad-${title}-${i})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                initial={false}
                animate={{
                  strokeWidth: isHovered ? strokeWidth + 10 : strokeWidth,
                  opacity: hoveredIndex !== null && !isHovered ? 0.5 : 1,
                  filter: isHovered ? 'brightness(1.25)' : 'brightness(1)',
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              />
            )
          })}

          {/* Center circle */}
          <circle cx={cx} cy={cy} r={innerR - 8} fill={`url(#center-grad-${title})`} />
          <circle cx={cx} cy={cy} r={innerR - 8} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={1} />

          {/* Center icon placeholder (building) */}
          <g transform={`translate(${cx - 12}, ${cy - 28})`}>
            <rect x="2" y="8" width="20" height="16" rx="2" fill="#1e40af" opacity="0.7" />
            <rect x="6" y="12" width="4" height="3" rx="0.5" fill="white" opacity="0.8" />
            <rect x="14" y="12" width="4" height="3" rx="0.5" fill="white" opacity="0.8" />
            <rect x="6" y="18" width="4" height="3" rx="0.5" fill="white" opacity="0.8" />
            <rect x="14" y="18" width="4" height="3" rx="0.5" fill="white" opacity="0.8" />
            <rect x="9" y="4" width="6" height="6" rx="1" fill="#2563eb" opacity="0.8" />
            <rect x="10.5" y="5.5" width="3" height="3" rx="0.5" fill="white" opacity="0.7" />
          </g>

          {/* Center text */}
          <text
            x={cx}
            y={cy + 16}
            textAnchor="middle"
            className="text-sm font-bold"
            fill="#1e3a8a"
            fontSize="16"
            fontWeight="700"
            fontFamily="'Pretendard', sans-serif"
          >
            {title.split('/').map((line, i) => (
              <tspan key={i} x={cx} dy={i === 0 ? 0 : 20}>
                {line.trim()}{i === 0 && title.includes('/') ? '/' : ''}
              </tspan>
            ))}
          </text>

          {/* Segment labels */}
          {segments.map((seg, i) => {
            const midAngle = (seg.startAngle + seg.endAngle) / 2
            const pos = labelPosition(cx, cy, midR, midAngle)
            const isHovered = hoveredIndex === i
            const lines = seg.label.split('\n')

            return (
              <motion.g
                key={`label-${i}`}
                animate={{
                  scale: isHovered ? 1.08 : 1,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={pos.x}
                    y={pos.y + (li - (lines.length - 1) / 2) * 16}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="13"
                    fontWeight="600"
                    fontFamily="'Pretendard', sans-serif"
                    style={{
                      textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                      pointerEvents: 'none',
                    }}
                  >
                    {line}
                  </text>
                ))}
              </motion.g>
            )
          })}
        </svg>
      </div>
      <p className="text-lg font-bold text-white">{title}</p>
    </div>
  )
}
