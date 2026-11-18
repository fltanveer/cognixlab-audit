import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  ACTIONS, ADDRESS, CLOSING, CONSENT, EMAIL, FACILITIES, FOOTER_LINKS, HERO, LINKEDIN, NAV, PHONE, PROVIDERS, ROLES, STAFF, STEPS, TEAM, WHY,
} from './data'

const BRAND = '/smhinnovations/brand'
const IMAGES = '/smhinnovations/images'

/** Marks something the client still has to supply or connect. Shown on purpose so nothing is invented. */
function Pending({ tag = 'To be supplied', children }: { tag?: string; children: ReactNode }) {
  return <p className="pending"><span className="pending-tag">{tag}</span><span>{children}</span></p>
}

function PhoneIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

/* ───────────────────────── Header ───────────────────────── */

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])
  return (
    <header className="site-header" data-open={open || undefined}>
      <div className="wrap header-row">
        <a className="logo" href="#top" aria-label="SMH Innovations, home">
          <img src={`${BRAND}/logo.webp`} alt="SMH Innovations" width="306" height="45" />
        </a>
        <nav className="nav-desktop" aria-label="Primary">
          {NAV.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={PHONE.href}><PhoneIcon /><span>{PHONE.label}</span></a>
          <a className="btn btn-quiet btn-compact header-btn" href={ACTIONS.provider.href}>{ACTIONS.provider.label}</a>
          <a className="btn btn-ink btn-compact header-btn" href={ACTIONS.facility.href}>{ACTIONS.facility.label}</a>
          <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="menu-bars" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className="nav-mobile" aria-label="Primary, mobile" hidden={!open}>
        <div className="wrap">
          {NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a href={EMAIL.href}>{EMAIL.label}</a>
        </div>
      </nav>
    </header>
  )
}

/* ───────────────────────── Hero ───────────────────────── */


function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-h">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-h">{HERO.h1}</h1>
          <p className="standfirst">{HERO.standfirst}</p>
          <div className="doors">
            {HERO.doors.map((d) => (
              <div key={d.key} className={`door door-${d.key}`}>
                <p className="door-kicker">{d.kicker}</p>
                <h2 className="door-title">{d.title}</h2>
                <p className="door-text">{d.text}</p>
                <a className={`btn ${d.key === 'facility' ? 'btn-ink' : 'btn-cyan'}`} href={d.action.href}>{d.action.label}</a>
              </div>
            ))}
          </div>
          <p className="hero-contact">
            Or call <a href={PHONE.href}>{PHONE.label}</a>, or write to <a href={EMAIL.href}>{EMAIL.label}</a>.
          </p>
        </div>
        <aside className="roster" aria-labelledby="roster-h">
          <p className="roster-kicker">{HERO.roster.kicker}</p>
          <h2 id="roster-h" className="roster-title">{HERO.roster.title}</h2>
          <ul className="roster-list">
            {HERO.roster.people.map(([slug, line]) => {
              const p = TEAM.find((t) => t.slug === slug)!
              return (
                <li key={slug}>
                  <img src={`${BRAND}/${slug}.webp`} alt="" width="270" height="348" />
                  <div>
                    <p className="roster-name">{p.name}</p>
                    <p className="roster-line">{line}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="roster-foot">{HERO.roster.foot} <a href="#team">{HERO.roster.link}</a></p>
        </aside>
      </div>
      <div className="wrap">
        <dl className="facts">
          {HERO.facts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v === 'NALTO' ? <img src={`${BRAND}/nalto.webp`} alt="NALTO, the National Association of Locum Tenens Organizations" width="142" height="45" /> : v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ───────────────────────── What we staff ───────────────────────── */

function Staff() {
  return (
    <section className="section staff" id="staff" aria-labelledby="staff-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="staff-h">{STAFF.heading}</h2>
          <p>{STAFF.intro}</p>
        </div>
        <div className="staff-grid">
          <div>
            <h3 className="list-h">How long</h3>
            <dl className="deflist">
              {STAFF.types.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
            </dl>
          </div>
          <div>
            <h3 className="list-h">Who</h3>
            <dl className="deflist">
              {STAFF.who.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
            </dl>
          </div>
        </div>
        <div className="recent">
          <h3 className="list-h">{STAFF.recentLabel}</h3>
          <ul>{STAFF.recent.map((r) => <li key={r}>{r}</li>)}</ul>
          <p className="fine">{STAFF.recentNote}</p>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Forms ───────────────────────── */

interface FieldDef { name: string; label: string; type?: 'text' | 'email' | 'tel' | 'select' | 'textarea'; autoComplete?: string; required?: boolean; options?: string[]; hint?: string; wide?: boolean }

const FACILITY_FIELDS: FieldDef[] = [
  { name: 'name', label: 'Your name', autoComplete: 'name', required: true },
  { name: 'role', label: 'Your role', autoComplete: 'organization-title', required: true },
  { name: 'facility', label: 'Hospital or facility', autoComplete: 'organization', required: true, wide: true },
  { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', autoComplete: 'tel' },
  { name: 'need', label: 'Specialty and dates needed', type: 'textarea', required: true, wide: true, hint: 'For example: hospitalist, nights, from March for twelve weeks.' },
]
const PROVIDER_FIELDS: FieldDef[] = [
  { name: 'name', label: 'Your name', autoComplete: 'name', required: true },
  { name: 'credential', label: 'Credential', type: 'select', required: true, options: ['MD / DO', 'NP', 'PA', 'CRNA'] },
  { name: 'specialty', label: 'Specialty', required: true },
  { name: 'licenses', label: 'State license(s)', required: true, hint: 'For example: GA, FL.' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', autoComplete: 'tel' },
]

function EnquiryForm({ id, title, fields, submit, done }: { id: string; title: string; fields: FieldDef[]; submit: string; done: { title: string; text: string } }) {
  const uid = useId()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const doneRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Record<string, string> = {}
    for (const f of fields) {
      const v = String(data.get(f.name) ?? '').trim()
      if (f.required && !v) next[f.name] = `Enter ${f.label.replace(' (optional)', '').toLowerCase()}.`
      else if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) next[f.name] = 'Enter an email address like name@hospital.org.'
    }
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) { formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return }
    setSent(true)
    requestAnimationFrame(() => doneRef.current?.focus())
  }

  if (sent) {
    return (
      <div className="form-card form-done" id={id} ref={doneRef} tabIndex={-1} role="status">
        <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="17" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m11 18.500 5 5 9-10" fill="none" stroke="currentColor" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <h3>{done.title}</h3>
        <p>{done.text}</p>
        <p className="fine">This is a prototype. Nothing was sent.</p>
        <button className="btn btn-quiet" onClick={() => setSent(false)}>Send another</button>
      </div>
    )
  }

  return (
    <form className="form-card" id={id} ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-t`}>
      <h3 id={`${uid}-t`}>{title}</h3>
      <div className="fields">
        {fields.map((f) => {
          const fid = `${uid}-${f.name}`
          const err = errors[f.name]
          const common = { id: fid, name: f.name, autoComplete: f.autoComplete, 'aria-invalid': err ? true : undefined, 'aria-describedby': [f.hint && `${fid}-h`, err && `${fid}-e`].filter(Boolean).join(' ') || undefined, required: f.required }
          return (
            <div key={f.name} className={`field ${f.wide || f.type === 'textarea' ? 'field-wide' : ''}`}>
              <label htmlFor={fid}>{f.label}</label>
              {f.type === 'select' ? (
                <select {...common} defaultValue="">
                  <option value="" disabled>Choose one</option>
                  {f.options!.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea {...common} rows={3} />
              ) : (
                <input {...common} type={f.type ?? 'text'} />
              )}
              {f.hint && <p className="hint" id={`${fid}-h`}>{f.hint}</p>}
              {err && <p className="error" id={`${fid}-e`}>{err}</p>}
            </div>
          )
        })}
      </div>
      <label className="consent">
        <input type="checkbox" name="sms" />
        <span>{CONSENT}</span>
      </label>
      <div className="form-foot">
        <button className="btn btn-ink" type="submit">{submit}</button>
        <p className="fine">We reply by email or phone. See our <a href="https://smhinnovations.com/privacypolicy.html">privacy policy</a>.</p>
      </div>
    </form>
  )
}

function Audience({ id, data, image, alt, children, flip }: { id: string; data: typeof FACILITIES | typeof PROVIDERS; image: string; alt: string; children: ReactNode; flip?: boolean }) {
  return (
    <section className={`section audience ${flip ? 'audience-flip' : ''}`} id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap audience-grid">
        <div className="audience-copy">
          <h2 id={`${id}-h`}>{data.heading}</h2>
          <p className="lead">{data.lead}</p>
          <p>{data.body}</p>
          <ul className="points">
            {data.points.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
          </ul>
          <img className="audience-img" src={`${IMAGES}/${image}.webp`} alt={alt} loading="lazy" width="1600" height="2000" />
        </div>
        <div className="audience-form">{children}</div>
      </div>
    </section>
  )
}

/* ───────────────────────── How it works ───────────────────────── */

function How() {
  return (
    <section className="section how" id="how" aria-labelledby="how-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="how-h">How it works</h2>
          <p>Four steps, the same for every assignment.</p>
        </div>
        <div className="how-grid">
          <ol className="steps">
            {STEPS.map(([t, d], i) => (
              <li key={t}><span className="step-n" aria-hidden="true">{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>
            ))}
          </ol>
          <img className="how-img" src={`${IMAGES}/schedule-board.webp`} alt="A wall-mounted magnetic planning board with blank coloured cards arranged in a grid" loading="lazy" width="1600" height="1067" />
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Team ───────────────────────── */

function Team() {
  return (
    <section className="section team" id="team" aria-labelledby="team-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="team-h">Our physicians and team</h2>
          <p>Five physicians lead the company. These are the people you will talk to.</p>
        </div>
        <ul className="team-grid">
          {TEAM.map((p) => (
            <li key={p.slug} className="person">
              <img src={`${BRAND}/${p.slug}.webp`} alt="" loading="lazy" width="270" height="348" />
              <h3>{p.name}</h3>
              <p className="person-role">{p.role}</p>
              <p className="person-bio">{p.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────── Why + roles ───────────────────────── */

function Why() {
  return (
    <section className="section why" id="why" aria-labelledby="why-h">
      <div className="wrap why-grid">
        <div>
          <h2 id="why-h">{WHY.heading}</h2>
          <figure className="quote">
            <blockquote><p>{WHY.quote}</p></blockquote>
            <figcaption>{WHY.source}</figcaption>
          </figure>
          <p className="why-second">{WHY.second}</p>
        </div>
        <div className="why-side">
          <Pending>{WHY.pending}</Pending>
        </div>
      </div>
    </section>
  )
}

function Roles() {
  return (
    <section className="section roles" id="roles" aria-labelledby="roles-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="roles-h">{ROLES.heading}</h2>
          <p>{ROLES.intro}</p>
        </div>
        <div className="roles-slot">
          <div className="roles-rows" aria-hidden="true"><i /><i /><i /></div>
          <Pending tag="To be connected">{ROLES.pending}</Pending>
          <div className="roles-actions">
            <a className="btn btn-ink" href={PHONE.href}>Call {PHONE.label}</a>
            <a className="btn btn-quiet" href={ACTIONS.provider.href}>{ACTIONS.provider.label}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Closing + footer ───────────────────────── */

function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-h">
      <img className="closing-img" src={`${IMAGES}/marsh-light.webp`} alt="" loading="lazy" width="2400" height="1029" />
      <div className="wrap closing-in">
        <h2 id="closing-h">{CLOSING.heading}</h2>
        <p>{CLOSING.text}</p>
        <p className="closing-phone"><a href={PHONE.href}>{PHONE.label}</a></p>
        <div className="closing-actions">
          <a className="btn btn-cyan" href={ACTIONS.facility.href}>{ACTIONS.facility.label}</a>
          <a className="btn btn-outline-light" href={ACTIONS.provider.href}>{ACTIONS.provider.label}</a>
          <a className="closing-mail" href={EMAIL.href}>{EMAIL.label}</a>
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
          <img src={`${BRAND}/logo.webp`} alt="SMH Innovations" width="306" height="45" className="footer-logo" />
          <p>Physician-led locum tenens and medical staffing.</p>
          <p className="footer-nalto"><img src={`${BRAND}/nalto.webp`} alt="" width="142" height="45" /><span>Member of NALTO, the National Association of Locum Tenens Organizations.</span></p>
        </div>
        <div>
          <h2>Contact</h2>
          <address>
            {ADDRESS.map((l) => <span key={l}>{l}</span>)}
            <a href={PHONE.href}>{PHONE.label}</a>
            <a href={EMAIL.href}>{EMAIL.label}</a>
          </address>
        </div>
        <div>
          <h2>On this page</h2>
          <ul>{NAV.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
        </div>
        <div>
          <h2>More</h2>
          <ul>{FOOTER_LINKS.map(([label, href]) => <li key={href}><a href={href} rel="noopener">{label}</a></li>)}</ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} SMH Innovations LLC. All rights reserved.</p>
        <a href={LINKEDIN} rel="noopener">SMH Innovations on LinkedIn</a>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="mobile-bar" role="region" aria-label="Quick actions">
      <a className="btn btn-quiet btn-compact" href={ACTIONS.provider.href}>{ACTIONS.provider.label}</a>
      <a className="btn btn-ink btn-compact" href={ACTIONS.facility.href}>{ACTIONS.facility.label}</a>
    </div>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Staff />
        <Audience id="facilities" data={FACILITIES} image="corridor" alt="An empty hospital corridor in early morning light">
          <EnquiryForm id="facilities-form" title="Request coverage" fields={FACILITY_FIELDS} submit="Send coverage request" done={{ title: 'Coverage request sent', text: 'A person on our team will reply by email or phone.' }} />
        </Audience>
        <Audience id="providers" data={PROVIDERS} image="badge-hands" alt="A clinician's hands clipping an ID badge to a scrub top, a stethoscope around the neck" flip>
          <EnquiryForm id="providers-form" title="Find an assignment" fields={PROVIDER_FIELDS} submit="Send my details" done={{ title: 'Details sent', text: 'A person on our team will reply by email or phone to talk about what you are looking for.' }} />
        </Audience>
        <How />
        <Team />
        <Why />
        <Roles />
        <Closing />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
