import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ADVISORS, ARTICLES, CALENDLY, CTA, EMAIL, FAQ, FEATURED, HERO, LEGAL, LINKEDIN, NAV, ON_THE_DESK, PRUE, SITUATIONS, STEPS, TESTIMONIALS,
  type Testimonial,
} from './data'

const EASE = [0.22, 1, 0.36, 1] as const
const BRAND = '/hrpivotworks/brand'
const IMAGES = '/hrpivotworks/images'

function Schedule({ tone = 'ink', short = false, className = '' }: { tone?: 'ink' | 'light'; short?: boolean; className?: string }) {
  return (
    <a className={`btn btn-${tone} ${className}`} href={CALENDLY} target="_blank" rel="noopener">
      {short ? <><span className="btn-short">Schedule a call</span><span className="btn-long">{CTA}</span></> : CTA}
      <span className="sr-only"> (opens Calendly in a new tab)</span>
    </a>
  )
}

/** Marks proof the client still has to supply. Shown on purpose so nothing is invented. */
function Pending({ children }: { children: ReactNode }) {
  return <p className="pending"><span className="pending-tag">To be supplied</span>{children}</p>
}

function useNarrow(query = '(max-width: 859px)') {
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setNarrow(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return narrow
}

/* ───────────────────────── Header ───────────────────────── */

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])
  return (
    <header className="site-header" data-scrolled={scrolled || undefined} data-open={open || undefined}>
      <div className="wrap header-row">
        <a className="logo" href="#top" aria-label="HR Pivot Works, home">
          <img src={`${BRAND}/logo-lockup-clear.webp`} alt="HR Pivot Works. Strategic Business, Leadership & Workforce Advisory" width="860" height="165" />
        </a>
        <nav className="nav-desktop" aria-label="Primary">
          <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </nav>
        <div className="header-actions">
          <Schedule short className="btn-compact" />
          <button className="menu-btn" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              {open
                ? <path d="M5 5l12 12M17 5 5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                : <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className="nav-mobile" aria-label="Primary, mobile" hidden={!open}>
        <ul>
          {NAV.map((n) => <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>)}
          <li><a href={`mailto:${EMAIL}`} onClick={() => setOpen(false)}>{EMAIL}</a></li>
        </ul>
      </nav>
    </header>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

/** The one moving thing on the page: what people bring to the first conversation, one line at a time. */
function OnTheDesk() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (reduce || paused) return
    const t = setInterval(() => setI((n) => (n + 1) % ON_THE_DESK.length), 3600)
    return () => clearInterval(t)
  }, [reduce, paused])
  return (
    <div className="desk" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <p className="desk-label" id="desk-label">What people bring to the first conversation</p>
      {/* Screen readers and reduced-motion users get the whole list, without the cycling. */}
      <ul className={reduce ? 'desk-static' : 'sr-only'} aria-labelledby="desk-label">
        {ON_THE_DESK.map((line) => <li key={line}>{line}</li>)}
      </ul>
      {!reduce && (
        <div className="desk-stage" aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={i}
              className="desk-line"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {ON_THE_DESK[i]}
            </motion.p>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>{HERO.h1}</h1>
          <p className="standfirst">{HERO.standfirst}</p>
          <div className="hero-actions">
            <Schedule />
            <a className="text-link" href={`mailto:${EMAIL}`}>or write to {EMAIL}</a>
          </div>
          <ul className="assurances">
            {HERO.assurances.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame">
            <img src={`${BRAND}/prue.webp`} alt="Prue Sinclair, founder of HR Pivot Works" width="1000" height="1000" {...{ fetchpriority: 'high' }} />
          </div>
          <figcaption>
            <strong>Prue Sinclair</strong>
            <span>Founder, HR Pivot Works</span>
          </figcaption>
        </figure>
      </div>
      <div className="wrap">
        <OnTheDesk />
      </div>
    </section>
  )
}

/* ───────────────────────── How we help ───────────────────────── */

function SituationBody({ s }: { s: (typeof SITUATIONS)[number] }) {
  return (
    <>
      <p className="situation-body">{s.body}</p>
      <ul className="services">
        {s.services.map((sv) => (
          <li key={sv.name}>
            <h4>{sv.name}</h4>
            <p>{sv.line}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

function Help() {
  const narrow = useNarrow()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const reduce = useReducedMotion()
  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (active + d + SITUATIONS.length) % SITUATIONS.length
    setActive(n)
    tabs.current[n]?.focus()
  }
  return (
    <section className="section help" id="help" aria-labelledby="help-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="help-h">Start with what’s on your desk.</h2>
          <p>Most people don’t arrive asking for a service. They arrive with a situation. Here are the four we see most, and the work that sits behind each.</p>
        </div>
        {narrow ? (
          <div className="situations-stack">
            {SITUATIONS.map((s) => (
              <article key={s.id} className="situation-card">
                <h3>{s.title}</h3>
                <SituationBody s={s} />
              </article>
            ))}
          </div>
        ) : (
          <div className="situations">
            <div className="situation-tabs" role="tablist" aria-label="Situations" aria-orientation="vertical" onKeyDown={onKey}>
              {SITUATIONS.map((s, n) => (
                <button
                  key={s.id}
                  ref={(el) => { tabs.current[n] = el }}
                  role="tab"
                  type="button"
                  id={`tab-${s.id}`}
                  aria-selected={active === n}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={active === n ? 0 : -1}
                  onClick={() => setActive(n)}
                >
                  {s.title}
                </button>
              ))}
            </div>
            {SITUATIONS.map((s, n) => (
              <div key={s.id} role="tabpanel" id={`panel-${s.id}`} aria-labelledby={`tab-${s.id}`} hidden={active !== n} className="situation-panel" tabIndex={0}>
                {active === n && (
                  <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
                    <h3 className="sr-only">{s.title}</h3>
                    <SituationBody s={s} />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}
        <p className="help-foot">
          Not sure which of these it is? That’s common, and it’s what the first conversation is for. <a className="text-link" href={CALENDLY} target="_blank" rel="noopener">Schedule a time with Prue<span className="sr-only"> (opens Calendly in a new tab)</span></a>
        </p>
      </div>
    </section>
  )
}

/* ───────────────────────── How we work ───────────────────────── */

function Work() {
  return (
    <section className="section work" id="work" aria-labelledby="work-h">
      <div className="wrap">
        <div className="work-grid">
          <div className="work-intro">
            <h2 id="work-h">We listen. We understand. We get things done.</h2>
            <p>Some owners come to us with a specific problem. Others know something isn’t working but aren’t sure where to begin. Either way we start by understanding your business, your people, and what’s really happening behind the scenes.</p>
            <div className="work-photo">
              <img src={`${IMAGES}/two-cups.webp`} alt="Two coffee cups on a small table mid-conversation" width="1600" height="1067" loading="lazy" decoding="async" />
            </div>
          </div>
          <div>
            <ol className="steps">
              {STEPS.map((s, n) => (
                <li key={s.name}>
                  <span className="step-n" aria-hidden="true">{n + 1}</span>
                  <div>
                    <h3>{s.name}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <aside className="flex-note">
              <h3>Just the help you need, when you need it.</h3>
              <p>You don’t need to go through all five steps or commit to a lengthy engagement. One challenge or a bigger project, hourly, by project or on retainer. We agree a clear scope before any work begins.</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Prue and advisors ───────────────────────── */

function People() {
  return (
    <section className="section prue" id="prue" aria-labelledby="prue-h">
      <div className="wrap">
        <div className="prue-grid">
          <div className="prue-side">
            <img className="prue-photo" src={`${IMAGES}/office-dusk.webp`} alt="An empty office at dusk with a single desk lamp still on" width="1600" height="2000" loading="lazy" decoding="async" />
            <p className="prue-side-note">Being at the top can be lonely. Having someone experienced, independent and confidential to talk things through with can make all the difference.</p>
          </div>
          <div className="prue-copy">
            <h2 id="prue-h">{PRUE.name}</h2>
            <p className="prue-role">{PRUE.role}</p>
            {PRUE.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <blockquote className="prue-quote">
              <p>{PRUE.quote}</p>
            </blockquote>
            <div className="prue-actions">
              <Schedule tone="light" />
              <a className="text-link on-dark" href={LINKEDIN} target="_blank" rel="noopener">Prue on LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        </div>
        <div className="advisors">
          <h3>The advisors Prue brings in</h3>
          <p className="advisors-intro">When a situation needs deeper technology or process expertise, these are the people who join the work.</p>
          <ul>
            {ADVISORS.map((a) => (
              <li key={a.name}>
                <img src={`${BRAND}/${a.photo}.webp`} alt="" width="96" height="96" loading="lazy" decoding="async" />
                <div>
                  <h4>{a.name}</h4>
                  <p>{a.line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Proof ───────────────────────── */

function Attribution({ t }: { t: Testimonial }) {
  return (
    <figcaption>
      <img src={`${BRAND}/${t.photo}.webp`} alt="" width="56" height="56" loading="lazy" decoding="async" />
      <span><strong>{t.name}</strong><span>{t.role}</span></span>
    </figcaption>
  )
}

function Proof() {
  return (
    <section className="section proof" id="proof" aria-labelledby="proof-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="proof-h">From people who have worked with Prue.</h2>
          <p>Founders, board members and executives, in their own words and under their own names.</p>
        </div>
        <figure className="quote-featured">
          <blockquote><p>{FEATURED.quote}</p></blockquote>
          <Attribution t={FEATURED} />
        </figure>
        <ul className="quotes">
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              <figure>
                <blockquote><p>{t.quote}</p></blockquote>
                <Attribution t={t} />
              </figure>
            </li>
          ))}
        </ul>
        <Pending>Two or three recent advisory engagements, described with the client’s permission: the situation, what Prue did, and what changed. Further testimonials from CEOs, CFOs and COOs are available on request.</Pending>
      </div>
    </section>
  )
}

/* ───────────────────────── From the Field ───────────────────────── */

function Newsletter() {
  const [sent, setSent] = useState<{ name: string; email: string } | null>(null)
  const [error, setError] = useState('')
  const id = useId()
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('first_name') ?? '').trim()
    const email = String(f.get('email') ?? '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter an email address like name@company.com.')
      return
    }
    setError('')
    setSent({ name, email })
  }
  if (sent) {
    return (
      <div className="newsletter" role="status">
        <h3>You’re on the list{sent.name ? `, ${sent.name}` : ''}.</h3>
        <p>The next issue of Leadership & People Insight will arrive at {sent.email}. One email a month, and you can unsubscribe from any of them.</p>
      </div>
    )
  }
  return (
    <form className="newsletter" onSubmit={submit} noValidate aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`}>Get the monthly letter</h3>
      <p>Leadership & People Insight: one grounded story from the field each month. No sales emails.</p>
      <div className="field">
        <label htmlFor={`${id}-name`}>First name</label>
        <input id={`${id}-name`} name="first_name" type="text" autoComplete="given-name" />
      </div>
      <div className="field">
        <label htmlFor={`${id}-email`}>Work email</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" required aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-err` : undefined} />
        {error && <p className="field-error" id={`${id}-err`}>{error}</p>}
      </div>
      <button className="btn btn-ink" type="submit">Subscribe to the letter</button>
    </form>
  )
}

function Field() {
  return (
    <section className="section field-section" id="field" aria-labelledby="field-h">
      <div className="wrap field-grid">
        <div>
          <div className="section-head">
            <h2 id="field-h">From the Field</h2>
            <p>Prue writes about what she sees inside growing businesses: the people decisions, the leadership calls, and what AI is actually doing to the work.</p>
          </div>
          <ul className="articles">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <a href={`https://hrpivotworks.com/${a.slug}/`}>
                  <span className="article-title">{a.title}</span>
                  <span className="article-note">{a.note}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="text-link" href="https://hrpivotworks.com/blog/">Read every article</a>
        </div>
        <div className="field-aside">
          <img className="field-photo" src={`${IMAGES}/notebook.webp`} alt="An open notebook and a pen on an oak desk in window light" width="1600" height="2000" loading="lazy" decoding="async" />
          <Newsletter />
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Questions ───────────────────────── */

function Questions() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="section questions" id="questions" aria-labelledby="q-h">
      <div className="wrap questions-grid">
        <div className="section-head">
          <h2 id="q-h">Questions business owners often ask</h2>
          <p>If yours isn’t here, ask it directly: <a className="text-link" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
        <div className="faq">
          {FAQ.map((f, n) => {
            const isOpen = open === n
            return (
              <div className="faq-item" key={f.q} data-open={isOpen || undefined}>
                <h3>
                  <button type="button" id={`faq-b-${n}`} aria-expanded={isOpen} aria-controls={`faq-p-${n}`} onClick={() => setOpen(isOpen ? null : n)}>
                    <span>{f.q}</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path className="faq-v" d="M9 3v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </button>
                </h3>
                <div className="faq-panel" id={`faq-p-${n}`} role="region" aria-labelledby={`faq-b-${n}`} aria-hidden={!isOpen}>
                  <div className="faq-inner">
                    {f.a.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Closing and footer ───────────────────────── */

function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-h">
      <img className="closing-photo" src={`${IMAGES}/two-chairs.webp`} alt="" width="2400" height="1029" loading="lazy" decoding="async" />
      <div className="wrap closing-inner">
        <h2 id="closing-h">Not sure where to start? Let’s talk.</h2>
        <p>You don’t need to have all the answers. Sometimes an experienced, independent perspective is the best place to begin. Thirty minutes, confidential, and complimentary.</p>
        <div className="closing-actions">
          <Schedule tone="light" />
          <a className="text-link on-dark" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <img className="footer-logo" src={`${BRAND}/logo-lockup-clear.webp`} alt="HR Pivot Works" width="860" height="165" loading="lazy" />
          <p>Independent advisory on business, leadership and workforce decisions, founded by Prudence “Prue” Sinclair.</p>
        </div>
        <nav aria-label="Footer">
          <h2>On this page</h2>
          <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </nav>
        <div>
          <h2>Contact</h2>
          <ul>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a href={CALENDLY} target="_blank" rel="noopener">Schedule a conversation<span className="sr-only"> (opens Calendly in a new tab)</span></a></li>
            <li><a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a></li>
          </ul>
        </div>
        <div>
          <h2>Legal</h2>
          <ul>{LEGAL.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
        </div>
      </div>
      <div className="wrap">
        <p className="footer-base">© 2026 HR Pivot Works. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Help />
        <Work />
        <People />
        <Proof />
        <Field />
        <Questions />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
