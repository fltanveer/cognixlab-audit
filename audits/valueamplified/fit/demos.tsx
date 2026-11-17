// Working demos. Everything marked "Sample data" is invented for this page;
// the field-evidence chart is the only one built on published figures.
import { useId, useMemo, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { BET, BOARD, EVIDENCE_90, FIELD, PULSE, WORKFLOWS } from './data'
import { usePlayback } from './hooks'

const EASE = [0.22, 1, 0.36, 1] as const

export function Sample({ children = 'Sample data' }: { children?: ReactNode }) {
  return <span className="tag tag--sample">{children}</span>
}

function Frame({ title, right, children, replay, label }: { title: string; right?: ReactNode; children: ReactNode; replay?: () => void; label: string }) {
  return (
    <figure className="demo" aria-label={label}>
      <header className="demo__bar">
        <span className="demo__title">{title}</span>
        <span className="demo__right">
          {right}
          {replay && (
            <button type="button" className="demo__replay" onClick={replay}>
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Replay
            </button>
          )}
        </span>
      </header>
      {children}
    </figure>
  )
}

/* ------------------------------------------------------------------ line chart
   One measured series against an optional flat baseline. Hover or focus a
   point for its value; the same numbers sit in a table underneath. */

interface Pt { x: number; v: number; label: string }

function LineChart({ points, baseline, unit, show, yMax, yTicks, xLabel, name, baselineName }: {
  points: Pt[]; baseline?: number; unit: string; show: boolean; yMax: number; yTicks: number[]; xLabel: string; name: string; baselineName?: string
}) {
  const W = 460, H = 250, L = 56, R = 84, T = 16, B = 38
  const id = useId()
  const [hover, setHover] = useState<number | null>(null)
  const xs = points.map((p) => p.x)
  const x0 = Math.min(...xs), x1 = Math.max(...xs)
  const X = (x: number) => L + ((x - x0) / (x1 - x0)) * (W - L - R)
  const Y = (v: number) => T + (1 - v / yMax) * (H - T - B)
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${X(p.x).toFixed(1)},${Y(p.v).toFixed(1)}`).join(' ')
  const last = points[points.length - 1]
  const h = hover === null ? null : points[hover]

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    let best = 0
    points.forEach((p, i) => { if (Math.abs(X(p.x) - px) < Math.abs(X(points[best].x) - px)) best = i })
    setHover(best)
  }

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-t`} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        <title id={`${id}-t`}>{`${name}: ${points[0].v}${unit} at ${points[0].label}, ${last.v}${unit} at ${last.label}${baseline !== undefined ? `. ${baselineName}: ${baseline}${unit}` : ''}.`}</title>
        {yTicks.map((v) => (
          <g key={v}>
            <line className="chart__grid" x1={L} x2={W - R} y1={Y(v)} y2={Y(v)} />
            <text className="chart__tick" x={L - 8} y={Y(v) + 4} textAnchor="end">{v}{unit}</text>
          </g>
        ))}
        {points.filter((_, i) => i % (points.length > 8 ? 3 : 2) === 0).map((p) => (
          <text key={p.x} className="chart__tick" x={X(p.x)} y={H - 12} textAnchor="middle">{p.label}</text>
        ))}
        {baseline !== undefined && (
          <g>
            <line className="chart__base" x1={L} x2={W - R} y1={Y(baseline)} y2={Y(baseline)} />
            <text className="chart__lbl chart__lbl--muted" x={W - R + 8} y={Y(baseline) + 4}>{baselineName}</text>
          </g>
        )}
        <motion.path className="chart__line" d={d} pathLength={1} initial={false} animate={{ pathLength: show ? 1 : 0 }} transition={{ duration: 1.5, ease: EASE }} />
        <motion.g initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.4, delay: show ? 1.2 : 0 }}>
          <circle className="chart__dot" cx={X(last.x)} cy={Y(last.v)} r="5" />
          <text className="chart__lbl" x={W - R + 8} y={Y(last.v) + 4}>{last.v}{unit}</text>
        </motion.g>
        {h && show && (
          <g pointerEvents="none">
            <line className="chart__cross" x1={X(h.x)} x2={X(h.x)} y1={T} y2={H - B} />
            <circle className="chart__dot" cx={X(h.x)} cy={Y(h.v)} r="5" />
          </g>
        )}
        {points.map((p, i) => (
          <circle key={p.x} className="chart__hit" cx={X(p.x)} cy={Y(p.v)} r="14" tabIndex={0} aria-label={`${p.label}: ${p.v}${unit}`} onFocus={() => setHover(i)} onBlur={() => setHover(null)} />
        ))}
      </svg>
      {h && show && (
        <div className="chart__tip" style={{ left: `${(X(h.x) / W) * 100}%`, top: `${(Y(h.v) / H) * 100}%` }} role="status">
          <b>{h.v}{unit}</b><span>{h.label}</span>
        </div>
      )}
      <details className="chart__table">
        <summary>Show these numbers as a table</summary>
        <table>
          <thead><tr><th scope="col">{xLabel}</th><th scope="col">{name}</th>{baseline !== undefined && <th scope="col">{baselineName}</th>}</tr></thead>
          <tbody>{points.map((p) => <tr key={p.x}><td>{p.label}</td><td>{p.v}{unit}</td>{baseline !== undefined && <td>{baseline}{unit}</td>}</tr>)}</tbody>
        </table>
      </details>
    </div>
  )
}

/* ------------------------------------------------------------------ a. bet → pilot */

export function BetPilot() {
  // 0 bet written · 1 assessment · 2 pilot built · 3 measured at the checkpoint
  const { ref, step, replay } = usePlayback([2200, 2200, 2400, 6500])
  const pts = useMemo(() => BET.series.map((s) => ({ x: s.day, v: s.v, label: `Day ${s.day}` })), [])
  const phase = ['Bet written at the workshop', 'Workflow Assessment: baseline set', 'AI Pilot: built into the team’s tools', 'Day 30: evidence on the table'][step]
  return (
    <div ref={ref}>
      <Frame title="From bet to measured pilot" right={<Sample />} replay={replay} label="Demo: a bet from a workshop becomes a measured pilot. Sample data.">
        <div className="bp">
          <div className="bp__bet">
            <p className="bp__k"><i className="sq sq--yellow" />Bet 2 of 4, in your format</p>
            <dl>
              <div><dt>We believe</dt><dd>{BET.believe}</dd></div>
              <div><dt>We’ll measure</dt><dd>{BET.measure}</dd></div>
              <div><dt>By</dt><dd>{BET.by}</dd></div>
            </dl>
            <ol className="bp__rail" aria-label="Progress">
              {['Bet', 'Baseline', 'Pilot', 'Proof'].map((s, i) => (
                <li key={s} data-on={i <= step || undefined} data-now={i === step || undefined}><span>{s}</span></li>
              ))}
            </ol>
            <p className="bp__phase" aria-live="polite">{phase}</p>
          </div>
          <div className="bp__chart">
            <div className="bp__head">
              <p>Hours from pull request to first human review</p>
              <p className="bp__num"><motion.b initial={false} animate={{ opacity: step >= 3 ? 1 : 0.25 }}>{step >= 3 ? '9 h' : '26 h'}</motion.b><span>{step >= 3 ? 'at day 30, from 26 h' : step >= 1 ? 'baseline, measured' : 'not measured yet'}</span></p>
            </div>
            <LineChart points={pts} baseline={step >= 1 ? BET.baseline : undefined} baselineName="Baseline" unit=" h" show={step >= 3} yMax={30} yTicks={[0, 10, 20, 30]} xLabel="Day" name="Measured" />
          </div>
        </div>
      </Frame>
    </div>
  )
}

export function KeepBoard() {
  const cols: [string, readonly string[], string][] = [['Keep', BOARD.keep, 'purple'], ['Let go', BOARD.letGo, 'navy'], ['Try', BOARD.try, 'green']]
  return (
    <figure className="board" aria-label="A keep, let go, try board. Sample data.">
      <figcaption><span>The team’s keep / let go / try map, kept live after the day</span><Sample /></figcaption>
      <div className="board__cols">
        {cols.map(([name, items, tone]) => (
          <div key={name}>
            <p><i className={`sq sq--${tone}`} />{name}<span>{items.length}</span></p>
            <ul>{items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
        ))}
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------ b. signals */

function Spark({ data, tone }: { data: readonly number[]; tone: string }) {
  const W = 84, H = 26
  const min = Math.min(...data), max = Math.max(...data)
  const d = data.map((v, i) => `${i ? 'L' : 'M'}${((i / (data.length - 1)) * (W - 6) + 3).toFixed(1)},${(H - 4 - ((v - min) / (max - min || 1)) * (H - 8)).toFixed(1)}`).join(' ')
  const [lx, ly] = d.split(' ').pop()!.slice(1).split(',').map(Number)
  return <svg className={`spark spark--${tone}`} viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden="true"><path d={d} /><circle cx={lx} cy={ly} r="2.6" /></svg>
}

const STATE = {
  ok: { label: 'Within bounds', tone: 'ok', icon: 'M3.5 8.5l3 3 6-7' },
  due: { label: 'Owner review due', tone: 'due', icon: 'M8 4v4.5l3 1.5' },
  done: { label: 'Reviewed today', tone: 'ok', icon: 'M3.5 8.5l3 3 6-7' },
  none: { label: 'No owner named', tone: 'none', icon: 'M8 4.5v4M8 11.2v.3' },
  named: { label: 'Owner named', tone: 'ok', icon: 'M3.5 8.5l3 3 6-7' },
} as const

export function Signals() {
  // 0 as found · 1 Ana reviews · 2 the unowned workflow gets an owner
  const { ref, step, replay } = usePlayback([2600, 2600, 6500])
  const wk = useMemo(() => EVIDENCE_90.map((v, i) => ({ x: i + 1, v, label: `Wk ${i + 1}` })), [])
  return (
    <div ref={ref}>
      <Frame title="Agent workflows, owners and signals" right={<Sample />} replay={replay} label="Demo: a dashboard of agent workflows, each with a named owner and a signal to watch. Sample data.">
        <div className="sg">
          <div className="sg__table" role="table" aria-label="Agent workflows">
            <div className="sg__row sg__row--head" role="row">
              <span role="columnheader">Agent workflow</span><span role="columnheader">Named owner</span><span role="columnheader">Signal to watch</span><span role="columnheader">State</span>
            </div>
            {WORKFLOWS.map((w) => {
              const key = w.state === 'due' && step >= 1 ? 'done' : w.state === 'none' && step >= 2 ? 'named' : w.state
              const st = STATE[key]
              const owner = w.owner ?? (step >= 2 ? 'Dev S.' : null)
              const role = w.role ?? (step >= 2 ? 'Support lead' : null)
              return (
                <div className="sg__row" role="row" key={w.name} data-alert={st.tone === 'none' || undefined}>
                  <span role="cell" className="sg__name">{w.name}</span>
                  <span role="cell" className="sg__owner">
                    {owner ? <><i className="av" aria-hidden="true">{owner[0]}</i><span><b>{owner}</b><em>{role}</em></span></> : <><i className="av av--none" aria-hidden="true">?</i><span><b>Unassigned</b><em>Agent output has no one answering for it</em></span></>}
                  </span>
                  <span role="cell" className="sg__signal"><Spark data={w.spark} tone={st.tone} /><span><b>{w.value}</b><em>{w.signal}</em></span></span>
                  <span role="cell"><span className={`st st--${st.tone}`}><svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d={st.icon} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>{st.label}</span></span>
                </div>
              )
            })}
          </div>
          <div className="sg__chart">
            <div className="bp__head">
              <p>Agent output reviewed by its named owner within 24 hours</p>
              <p className="bp__num"><b>88%</b><span>in week 13, from 38% in week 1</span></p>
            </div>
            <LineChart points={wk} unit="%" show yMax={100} yTicks={[0, 50, 100]} xLabel="Week" name="Reviewed within 24 h" />
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ------------------------------------------------------------------ c. pulse → readout */

export function Pulse() {
  // 0 survey open · 1 responses arriving · 2 closed, bars settle · 3 readout assembled
  const { ref, step, replay } = usePlayback([1600, 2600, 1800, 7000])
  const frac = step === 0 ? 0.08 : step === 1 ? 0.62 : 1
  const n = Math.round(PULSE.responses * frac)
  return (
    <div ref={ref}>
      <Frame title="Amplifier Pulse, survey to readout" right={<Sample />} replay={replay} label="Demo: survey responses arrive and a one-page readout assembles itself. Sample data.">
        <div className="pl">
          <div className="pl__survey">
            <p className="pl__count"><b>{n}</b><span>of {PULSE.invited} attendees have answered</span></p>
            <div className="pl__meter" aria-hidden="true"><motion.i initial={false} animate={{ scaleX: n / PULSE.invited }} transition={{ duration: 1.4, ease: EASE }} /></div>
            <ul>
              {PULSE.questions.map((q, i) => (
                <li key={q.q}>
                  <span>{q.q}</span>
                  <span className="pl__bar" aria-hidden="true"><motion.i initial={false} animate={{ scaleX: step >= 1 ? (q.agree / 100) * (step === 1 ? 0.7 : 1) : 0 }} transition={{ duration: 1.1, delay: i * 0.08, ease: EASE }} /></span>
                  <b>{step >= 2 ? `${q.agree}%` : step === 1 ? '…' : ''}<i className="vh"> agree</i></b>
                </li>
              ))}
            </ul>
            <p className="pl__foot">Share who agree or strongly agree</p>
          </div>
          <motion.article className="pl__page" initial={false} animate={{ opacity: step >= 3 ? 1 : 0.28, y: step >= 3 ? 0 : 6 }} transition={{ duration: 0.6, ease: EASE }} aria-label="One-page readout">
            <p className="pl__kicker">Pulse readout, one page</p>
            <h4>{step >= 3 ? PULSE.headline : 'Waiting for the survey to close'}</h4>
            <ol>
              {PULSE.findings.map((f, i) => (
                <motion.li key={f} initial={false} animate={{ opacity: step >= 3 ? 1 : 0 }} transition={{ duration: 0.45, delay: step >= 3 ? 0.25 + i * 0.22 : 0 }}>{f}</motion.li>
              ))}
            </ol>
            <motion.p className="pl__sig" initial={false} animate={{ opacity: step >= 3 ? 1 : 0 }} transition={{ delay: step >= 3 ? 1 : 0 }}>Asked {PULSE.invited}, heard from {PULSE.responses}. Ready before the speaker walks on.</motion.p>
          </motion.article>
        </div>
      </Frame>
    </div>
  )
}

/* ------------------------------------------------------------------ d. before / after */

export function BeforeAfter() {
  return (
    <div className="ba">
      <figure>
        <img src="/valueamplified/shots/live-desktop.webp" alt="The current valueamplified.com first screen" width={1440} height={900} loading="lazy" />
        <figcaption><span className="tag">Today</span></figcaption>
      </figure>
      <svg className="ba__arrow" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><path d="M5 14h18M16 7l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <figure>
        <img src="/valueamplified/shots/proposal-desktop.webp" alt="The first screen proposed in the audit: the founders named, four services listed and a Get in touch button" width={1440} height={900} loading="lazy" />
        <figcaption><span className="tag tag--lime">Proposed in the audit</span></figcaption>
      </figure>
    </div>
  )
}

/* ------------------------------------------------------------------ e. field evidence (real) */

export function FieldEvidence() {
  return (
    <figure className="fe" aria-label="Published results from two Cognixlab projects">
      <figcaption><span>Time per unit of work, before and after</span><span className="tag tag--real">Published figures</span></figcaption>
      <div className="fe__rows">
        {FIELD.map((f) => {
          const share = f.afterSec / f.beforeSec
          const times = Math.round(f.beforeSec / f.afterSec)
          return (
            <div className="fe__row" key={f.name}>
              <div className="fe__meta">
                <h4><a href={f.href} target="_blank" rel="noreferrer">{f.name}<span className="vh"> (opens cognixlab.co in a new tab)</span></a></h4>
                <p>{f.what}. {f.sector}.</p>
              </div>
              <div className="fe__bars">
                <div className="fe__bar"><span>Before</span><i className="fe__fill fe__fill--before" style={{ width: '100%' }} /><b>{f.before}</b></div>
                <div className="fe__bar"><span>After</span><motion.i className="fe__fill fe__fill--after" initial={{ width: '100%' }} whileInView={{ width: `${Math.max(share * 100, 1.2)}%` }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1.3, ease: EASE }} /><b>{f.after}</b></div>
              </div>
              <p className="fe__x"><b>{times}×</b><span>less time, calculated from the two figures</span></p>
            </div>
          )
        })}
      </div>
    </figure>
  )
}
