// Isometric drawings, written as code. One projection, one hairline weight,
// three face tones, and lime for the thing that moves.
import { useRef, type ReactNode } from 'react'
import { useLoop } from './hooks'

const C = Math.cos(Math.PI / 6)
const S = 0.5
type P3 = [number, number, number]
const pt = ([x, y, z]: P3): [number, number] => [(x - y) * C, (x + y) * S - z]
const poly = (ps: P3[]) => ps.map((p) => pt(p).map((n) => n.toFixed(1)).join(',')).join(' ')

type Tone = 'base' | 'raised' | 'lime' | 'purple' | 'green' | 'yellow' | 'ghost'

function Box({ x, y, z = 0, w, d, h, tone = 'base' }: { x: number; y: number; z?: number; w: number; d: number; h: number; tone?: Tone }) {
  const t = z + h
  return (
    <g className={`iso-box iso-${tone}`}>
      <polygon className="f-l" points={poly([[x, y + d, t], [x + w, y + d, t], [x + w, y + d, z], [x, y + d, z]])} />
      <polygon className="f-r" points={poly([[x + w, y, t], [x + w, y + d, t], [x + w, y + d, z], [x + w, y, z]])} />
      <polygon className="f-t" points={poly([[x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t]])} />
    </g>
  )
}

function Line({ a, b, className = 'iso-wire' }: { a: P3; b: P3; className?: string }) {
  const [x1, y1] = pt(a); const [x2, y2] = pt(b)
  return <line className={className} x1={x1} y1={y1} x2={x2} y2={y2} />
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)
const clamp = (t: number) => Math.max(0, Math.min(1, t))

/* ------------------------------------------------------------------ hero
   Three platforms rising to the right: Decide, Build, Prove. A lime packet
   carries the bet from one to the next; the bars on the last grow as it lands. */

const PLAT = { w: 150, d: 150, h: 10 }
const SITES: { x: number; y: number; z: number }[] = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: -190, z: 30 },
  { x: 0, y: -380, z: 60 },
]

export function HeroScene() {
  const ref = useRef<SVGSVGElement>(null)
  const t = useLoop(ref, 9, 0.93)

  // packet: A → B during 0.08–0.36, B → C during 0.46–0.74
  const top = (i: number): P3 => [SITES[i].x + PLAT.w / 2, SITES[i].y + PLAT.d / 2, SITES[i].z + PLAT.h + 18]
  const leg1 = ease(clamp((t - 0.08) / 0.28))
  const leg2 = ease(clamp((t - 0.46) / 0.28))
  const from = leg2 > 0 ? top(1) : top(0)
  const to = leg2 > 0 ? top(2) : top(1)
  const k = leg2 > 0 ? leg2 : leg1
  const hop = Math.sin(k * Math.PI) * 46
  const packet: P3 = [lerp(from[0], to[0], k), lerp(from[1], to[1], k), lerp(from[2], to[2], k) + hop]
  const packetOn = t > 0.04 && t < 0.78

  const building = clamp((t - 0.36) / 0.1) * (1 - clamp((t - 0.5) / 0.1))
  const grow = ease(clamp((t - 0.72) / 0.16))
  const bars = [24, 40, 58, 88].map((h, i) => 6 + (h - 6) * (i === 3 ? grow : 1))

  const [a, b, c] = SITES
  const [px, py] = pt(packet)
  const [sx, sy] = pt([packet[0], packet[1], (leg2 > 0 ? lerp(b.z, c.z, k) : lerp(a.z, b.z, k)) + PLAT.h])

  return (
    <svg ref={ref} className="iso iso-hero" viewBox="-140 -372 612 562" role="img" aria-labelledby="iso-hero-t iso-hero-d">
      <title id="iso-hero-t">Decide, build, prove</title>
      <desc id="iso-hero-d">Three platforms rising to the right. On the first, a table holds three cards: a team has written its bets. A marker carries one bet to the second platform, where connected tool blocks and an agent turn it into a working pilot. It then moves to the third, where a row of bars shows the measured result.</desc>

      {/* links between platforms, drawn on the ground */}
      <Line a={[75, 0, a.z + PLAT.h]} b={[75, b.y + PLAT.d, b.z + PLAT.h]} className="iso-link" />
      <Line a={[75, b.y, b.z + PLAT.h]} b={[75, c.y + PLAT.d, c.z + PLAT.h]} className="iso-link" />

      {/* 3 · Prove (furthest back, drawn first) */}
      <Box x={c.x} y={c.y} z={c.z} {...PLAT} tone="base" />
      {bars.map((h, i) => (
        <Box key={i} x={c.x + 16 + i * 31} y={c.y + 50} z={c.z + PLAT.h} w={22} d={46} h={h} tone={i === 3 ? 'lime' : 'raised'} />
      ))}
      <Line a={[c.x + 8, c.y + 100, c.z + PLAT.h + 40]} b={[c.x + 142, c.y + 100, c.z + PLAT.h + 40]} className="iso-dash" />

      {/* 2 · Build */}
      <Box x={b.x} y={b.y} z={b.z} {...PLAT} tone="base" />
      <Line a={[b.x + 40, b.y + 40, b.z + PLAT.h]} b={[b.x + 110, b.y + 40, b.z + PLAT.h]} />
      <Line a={[b.x + 40, b.y + 40, b.z + PLAT.h]} b={[b.x + 40, b.y + 110, b.z + PLAT.h]} />
      <Line a={[b.x + 110, b.y + 40, b.z + PLAT.h]} b={[b.x + 110, b.y + 110, b.z + PLAT.h]} />
      <Line a={[b.x + 40, b.y + 110, b.z + PLAT.h]} b={[b.x + 110, b.y + 110, b.z + PLAT.h]} />
      <Box x={b.x + 22} y={b.y + 22} z={b.z + PLAT.h} w={34} d={34} h={26} tone="raised" />
      <Box x={b.x + 94} y={b.y + 22} z={b.z + PLAT.h} w={34} d={34} h={40} tone="raised" />
      <Box x={b.x + 22} y={b.y + 94} z={b.z + PLAT.h} w={34} d={34} h={16} tone="raised" />
      <Box x={b.x + 90} y={b.y + 90} z={b.z + PLAT.h + building * 6} w={40} d={40} h={30} tone="lime" />

      {/* 1 · Decide (nearest) */}
      <Box x={a.x} y={a.y} z={a.z} {...PLAT} tone="base" />
      <Box x={a.x + 34} y={a.y + 44} z={a.z + PLAT.h} w={82} d={62} h={20} tone="raised" />
      <Box x={a.x + 42} y={a.y + 54} z={a.z + PLAT.h + 20} w={20} d={26} h={2} tone="purple" />
      <Box x={a.x + 66} y={a.y + 60} z={a.z + PLAT.h + 20} w={20} d={26} h={2} tone="green" />
      <Box x={a.x + 90} y={a.y + 54} z={a.z + PLAT.h + 20} w={20} d={26} h={2} tone="yellow" />
      {[[10, 60], [124, 66], [56, 16], [70, 116]].map(([sx2, sy2], i) => (
        <Box key={i} x={a.x + sx2} y={a.y + sy2} z={a.z + PLAT.h} w={16} d={16} h={12} tone="ghost" />
      ))}

      {/* the bet in transit */}
      {packetOn && (
        <g>
          <ellipse className="iso-shadow" cx={sx} cy={sy} rx={9 - hop / 12} ry={(9 - hop / 12) / 2} />
          <polygon className="iso-packet" points={`${px},${py - 9} ${px + 9},${py} ${px},${py + 9} ${px - 9},${py}`} />
        </g>
      )}

      {/* step markers; names sit in the HTML legend below so they stay readable on a phone */}
      {SITES.map((s, i) => {
        const [mx, my] = pt([s.x + PLAT.w, s.y + PLAT.d, s.z])
        return (
          <g key={i} className="iso-mark" transform={`translate(${mx.toFixed(1)} ${(my + 20).toFixed(1)})`}>
            <circle r="12" />
            <text textAnchor="middle" dy="4.5">{i + 1}</text>
          </g>
        )
      })}
    </svg>
  )
}

/* ------------------------------------------------------------------ staircase
   Four steps, each one a thing you can hold before deciding on the next. */

export function Staircase({ active }: { active: number }) {
  const steps = [0, 1, 2, 3]
  return (
    <svg className="iso iso-stairs" viewBox="-104 -290 528 416" aria-hidden="true">
      {steps.slice().reverse().map((i) => {
        const y = -i * 118
        const h = 16 + i * 26
        return (
          <g key={i} className={i === active ? 'is-on' : undefined}>
            <Box x={0} y={y} w={120} d={104} h={h} tone={i === active ? 'lime' : i < active ? 'raised' : 'base'} />
            <Marker x={60} y={y + 52} z={h} n={i + 1} />
          </g>
        )
      })}
    </svg>
  )
}

function Marker({ x, y, z, n }: { x: number; y: number; z: number; n: number }): ReactNode {
  const [mx, my] = pt([x, y, z])
  return (
    <g className="iso-mark iso-mark--flat" transform={`translate(${mx.toFixed(1)} ${my.toFixed(1)})`}>
      <ellipse rx="15" ry="8.5" />
      <text textAnchor="middle" dy="4">{n}</text>
    </g>
  )
}
