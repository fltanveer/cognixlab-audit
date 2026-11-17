// Shared audit-report shell. One audit = one content file + a thin App that
// composes these sections. Client-neutral: nothing here names a client.
// Inline markup in content strings: `code`, **bold**, *em* (see rich()).
import { Fragment, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1] as const

export type Sev = 'critical' | 'major' | 'minor'
export interface Finding { id: string; sev: Sev; fw: string; title: string; observed: string; impact: string; fix: string }
export type SectionDef = readonly [id: string, n: string, label: string]

export const SEV_LABEL: Record<Sev, string> = { critical: 'Critical', major: 'Major', minor: 'Minor' }

export function rich(s: string): ReactNode {
  return s.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>
    if (part.startsWith('**')) return <b key={i}>{part.slice(2, -2)}</b>
    if (part.startsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>
    return <Fragment key={i}>{part}</Fragment>
  })
}

export function countBySev(findings: Finding[]): Record<Sev, number> {
  const c = { critical: 0, major: 0, minor: 0 }
  for (const f of findings) c[f.sev]++
  return c
}

export function ArrowUpRight() {
  return <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function SevBadge({ sev }: { sev: Sev }) {
  return <span className={`sev sev--${sev}`}><i aria-hidden="true" />{SEV_LABEL[sev]}</span>
}

export function Head({ n, title, sub }: { n: string; title: string; sub?: ReactNode }) {
  return (
    <header className="head">
      <p className="head__n mono">{n}</p>
      <h2>{title}</h2>
      {sub && <p className="head__sub">{sub}</p>}
    </header>
  )
}

/* ---------------------------------------------------------------- shell */

function useActiveSection(sections: readonly SectionDef[]) {
  const [active, setActive] = useState<string>(sections[0]?.[0] ?? '')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    sections.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [sections])
  return active
}

export interface ShellProps {
  brand: string
  brandSub: string
  sections: readonly SectionDef[]
  findings: Finding[]
  /** Relative link to the proposed page; leave out to hide every link to it. */
  proposal?: string
  footer: [string, string]
  children: ReactNode
}

export function ReportShell({ brand, brandSub, sections, findings, proposal, footer, children }: ShellProps) {
  const active = useActiveSection(sections)
  const counts = countBySev(findings)
  return (
    <>
      <a className="skip" href="#main">Skip to report</a>
      <div className="top">
        <div className="top__in">
          <a href="#top" className="top__brand">{brand} <span>/ {brandSub}</span></a>
          <div className="top__rail" aria-label={`${findings.length} findings: ${counts.critical} critical, ${counts.major} major, ${counts.minor} minor`} role="img">
            {(Object.keys(counts) as Sev[]).flatMap((s) => Array.from({ length: counts[s] }).map((_, i) => <i key={`${s}${i}`} className={`r-${s}`} />))}
          </div>
          {proposal && <a className="top__cta" href={proposal}>Proposed landing page <ArrowUpRight /></a>}
        </div>
      </div>
      <div className="shell">
        <aside className="index" aria-label="Report sections">
          <p className="index__title">Contents</p>
          <ol>
            {sections.map(([id, n, label]) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
                  <span className="mono">{n}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
          {proposal && <a className="index__cta" href={proposal}>Open the proposed page <ArrowUpRight /></a>}
        </aside>
        <main id="main">{children}</main>
      </div>
      <footer className="foot">
        <div>{footer[0]}</div>
        <div className="mono">{footer[1]}</div>
      </footer>
    </>
  )
}

/* ---------------------------------------------------------------- hero */

export function ReportHero({ eyebrow, title, lede, meta, actions }: { eyebrow: string; title: string; lede: ReactNode; meta: [string, string][]; actions: ReactNode }) {
  return (
    <section className="hero" id="top">
      <p className="eyebrow mono">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
      <div className="hero__actions">{actions}</div>
      <dl className="meta">
        {meta.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd className="tnum">{v}</dd></div>
        ))}
      </dl>
    </section>
  )
}

/* ---------------------------------------------------------------- score */

export interface Kpi { value: string; unit?: string; text: ReactNode; source: string }

export function ScoreSection({ id, n, title, sub, total, note, baseline, scores, kpis }: {
  id: string; n: string; title: string; sub: ReactNode; total: number; note: string; baseline: number
  scores: { label: string; value: number }[]; kpis: Kpi[]
}) {
  const reduce = useReducedMotion()
  return (
    <section id={id} className="sec">
      <Head n={n} title={title} sub={sub} />
      <div className="score">
        <div className="score__big">
          <p className="score__num tnum">{total}<span>/100</span></p>
          <p className="score__note">{note}</p>
        </div>
        <div className="bars">
          {scores.map((s) => (
            <div key={s.label} className="bar">
              <div className="bar__lbl"><span>{s.label}</span><b className="mono">{s.value}</b></div>
              <div className="bar__track">
                <motion.i
                  className={s.value < 30 ? 'lo' : s.value < 60 ? 'mid' : 'hi'}
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: EASE }}
                  style={{ width: `${s.value}%` }}
                />
                <span className="bar__base" style={{ left: `${baseline}%` }} />
              </div>
            </div>
          ))}
          <div className="bar__scale mono"><span>0</span><span>{baseline} baseline</span><span>100</span></div>
        </div>
      </div>
      <div className="kpis">
        {kpis.map((k) => (
          <div key={k.source + k.value}><b className="tnum">{k.value}{k.unit && <small>{k.unit}</small>}</b><span>{k.text}</span><em className="mono">{k.source}</em></div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- method */

export function MethodSection({ id, n, sub, frameworks }: { id: string; n: string; sub: ReactNode; frameworks: readonly (readonly [string, number, number, number])[] }) {
  const tot = frameworks.reduce((a, r) => [a[0] + r[1], a[1] + r[2], a[2] + r[3]], [0, 0, 0])
  return (
    <section id={id} className="sec">
      <Head n={n} title="Method and scope" sub={sub} />
      <div className="table">
        <table>
          <thead><tr><th>Framework</th><th className="n">Critical</th><th className="n">Major</th><th className="n">Minor</th><th className="n">Total</th></tr></thead>
          <tbody>
            {frameworks.map(([name, c, m, x]) => (
              <tr key={name}><td>{name}</td><td className="n">{c}</td><td className="n">{m}</td><td className="n">{x}</td><td className="n">{c + m + x}</td></tr>
            ))}
          </tbody>
          <tfoot><tr><td>Total</td><td className="n">{tot[0]}</td><td className="n">{tot[1]}</td><td className="n">{tot[2]}</td><td className="n">{tot[0] + tot[1] + tot[2]}</td></tr></tfoot>
        </table>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- findings */

type Filter = 'all' | Sev

export function FindingsSection({ id, n, findings, sub }: { id: string; n: string; findings: Finding[]; sub?: ReactNode }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<Set<string>>(() => new Set(findings.filter((f) => f.sev === 'critical').map((f) => f.id)))
  const reduce = useReducedMotion()
  const list = useMemo(() => findings.filter((f) => filter === 'all' || f.sev === filter), [filter, findings])
  const counts = { all: findings.length, ...countBySev(findings) }

  // Arriving on #F-08 (from a screenshot marker) opens that finding
  useEffect(() => {
    const go = () => {
      const target = decodeURIComponent(location.hash.slice(1))
      if (!/^F-\d\d$/.test(target)) return
      setFilter('all')
      setOpen((s) => new Set(s).add(target))
      const jump = (smooth: boolean) => document.getElementById(target)?.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto', block: 'start' })
      requestAnimationFrame(() => jump(true))
      // Stages above scale to fit once their images load; land again after they settle
      window.setTimeout(() => jump(false), 900)
    }
    go()
    window.addEventListener('hashchange', go)
    return () => window.removeEventListener('hashchange', go)
  }, [reduce])

  const toggle = (fid: string) => setOpen((s) => { const x = new Set(s); x.has(fid) ? x.delete(fid) : x.add(fid); return x })
  const allOpen = list.every((f) => open.has(f.id))

  return (
    <section id={id} className="sec">
      <Head n={n} title="Findings" sub={sub ?? 'Critical first. Each finding names what was observed, who it costs, and the fix.'} />
      <div className="ftools">
        <div className="seg" role="radiogroup" aria-label="Filter by severity">
          {(['all', 'critical', 'major', 'minor'] as Filter[]).map((k) => (
            <button key={k} role="radio" aria-checked={filter === k} onClick={() => setFilter(k)} className="seg__btn">
              {filter === k && <motion.span layoutId="fseg" className="seg__pill" transition={{ type: 'spring', bounce: 0, duration: 0.35 }} />}
              <span className="seg__lbl">{k === 'all' ? 'All' : SEV_LABEL[k]}<span className="mono seg__count">{counts[k]}</span></span>
            </button>
          ))}
        </div>
        <button className="linkbtn" onClick={() => setOpen(allOpen ? new Set() : new Set(list.map((f) => f.id)))}>{allOpen ? 'Collapse all' : 'Expand all'}</button>
      </div>
      <motion.ol className="findings" layout={!reduce}>
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((f) => {
            const isOpen = open.has(f.id)
            return (
              <motion.li
                key={f.id}
                id={f.id}
                layout={!reduce}
                className={`find find--${f.sev}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <button className="find__head" aria-expanded={isOpen} aria-controls={`${f.id}-body`} onClick={() => toggle(f.id)}>
                  <span className="find__id mono">{f.id}</span>
                  <SevBadge sev={f.sev} />
                  <span className="find__title">{f.title}</span>
                  <span className="find__fw">{f.fw}</span>
                  <svg className="find__chev" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${f.id}-body`}
                      className="find__body"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                    >
                      <dl>
                        <div><dt>Observed</dt><dd>{rich(f.observed)}</dd></div>
                        <div><dt>Impact</dt><dd>{rich(f.impact)}</dd></div>
                        <div className="find__fix"><dt>Fix</dt><dd>{rich(f.fix)}</dd></div>
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ol>
    </section>
  )
}

/* ---------------------------------------------------------------- simple sections */

export function TableSection({ id, n, title, sub, head, rows, note }: { id: string; n: string; title: string; sub?: ReactNode; head: string[]; rows: readonly (readonly string[])[]; note?: ReactNode }) {
  return (
    <section id={id} className="sec">
      <Head n={n} title={title} sub={sub} />
      <div className="table">
        <table>
          <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>{r.map((c, i) => <td key={i}>{i === 0 ? <b>{rich(c)}</b> : rich(c)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="note">{note}</p>}
    </section>
  )
}

export function WorksSection({ id, n, sub, items }: { id: string; n: string; sub: string; items: readonly (readonly [string, string])[] }) {
  return (
    <section id={id} className="sec">
      <Head n={n} title="What works, and should be kept" sub={sub} />
      <ul className="works">
        {items.map(([a, b]) => (
          <li key={a}><b>{rich(a)}</b> {rich(b)}</li>
        ))}
      </ul>
    </section>
  )
}

export function PrioritySection({ id, n, title, sub, items }: { id: string; n: string; title: string; sub: string; items: readonly (readonly [string, string, string])[] }) {
  return (
    <section id={id} className="sec">
      <Head n={n} title={title} sub={sub} />
      <ol className="steps">
        {items.map(([t, d, ref], i) => (
          <li key={t}>
            <span className="steps__n mono">0{i + 1}</span>
            <div>
              <p className="steps__t">{t}</p>
              <p className="steps__d">{rich(d)}</p>
            </div>
            <a href={`#${ref}`} className="steps__ref mono">{ref}</a>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function CopyDeckSection({ id, n, sub, rows }: { id: string; n: string; sub: string; rows: [string, string, string?][] }) {
  return (
    <section id={id} className="sec">
      <Head n={n} title="Landing-page copy, written" sub={sub} />
      <div className="deck">
        {rows.map(([slot, text, flag]) => (
          <div key={slot} className="deck__row">
            <span className="deck__slot mono">{slot}</span>
            <p>{rich(text)}{flag && <span className="flag">{flag}</span>}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function RolloutSection({ id, n, sub, steps, note }: { id: string; n: string; sub: string; steps: readonly (readonly [string, string])[]; note: ReactNode }) {
  return (
    <section id={id} className="sec">
      <Head n={n} title="Rollout" sub={sub} />
      <ol className="steps steps--rollout">
        {steps.map(([t, d], i) => (
          <li key={t}>
            <span className="steps__n mono">0{i + 1}</span>
            <div><p className="steps__t">{t}</p><p className="steps__d">{rich(d)}</p></div>
          </li>
        ))}
      </ol>
      <p className="note">{note}</p>
    </section>
  )
}

/** Numbered legend under a pinned screenshot; each row links to its findings. */
export function PinLegend({ pins }: { pins: { n: number; text: string; ids: string[] }[] }) {
  return (
    <ol className="legend">
      {pins.map((p) => (
        <li key={p.n}>
          <span className="legend__n mono">{p.n}</span>
          <span>{rich(p.text)}</span>
          <span className="legend__ids">{p.ids.map((fid) => <a key={fid} href={`#${fid}`} className="mono">{fid}</a>)}</span>
        </li>
      ))}
    </ol>
  )
}
