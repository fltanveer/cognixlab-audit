import { useState } from 'react'
import { BELIEFS, BOOK, LINE, PILOT_STEPS, PROOF } from './data'
import { HeroScene, Staircase } from './Iso'
import { BeforeAfter, BetPilot, FieldEvidence, KeepBoard, Pulse, Sample, Signals } from './demos'

const IMG = '/valueamplified/images'
const BRAND = '/valueamplified/brand'

function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Theirs({ children }: { children: string }) {
  return <span className="who who--va"><img src={`${BRAND}/logo.svg`} alt="" width={46} height={19} />{children}</span>
}
function Ours({ children }: { children: string }) {
  return <span className="who who--cl"><i aria-hidden="true" />{children}</span>
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="top">
        <div className="wrap top__in">
          <a href="https://cognixlab.co" className="top__logo" target="_blank" rel="noreferrer"><img src={`${BRAND}/cognixlab-logo.webp`} alt="Cognixlab" width={150} height={30} /></a>
          <span className="top__for">Prepared for <img src={`${BRAND}/logo.svg`} alt="Value Amplified" width={78} height={32} /></span>
          <nav aria-label="Page">
            <a href="#services">What we add</a>
            <a href="#pilot">A first pilot</a>
            <a href="#line">The line</a>
          </nav>
          <a className="btn btn--lime btn--sm" href={BOOK} target="_blank" rel="noreferrer">Book a Workflow Review</a>
        </div>
      </header>

      <main id="main">
        {/* ------------------------------------------------ 1 hero */}
        <section className="hero wrap">
          <div className="hero__copy">
            <h1>You help leaders choose what AI amplifies. We build it and measure it.</h1>
            <p className="lede">Your workshops end with a team that knows what to keep, what to let go and what to try. Cognixlab is the studio that turns one of those bets into working software inside the tools the team already uses, then reads the result against the baseline you agreed.</p>
            <div className="hero__actions">
              <a className="btn btn--lime" href={BOOK} target="_blank" rel="noreferrer">Book a Workflow Review</a>
              <a className="btn btn--ghost" href="../">Back to the audit</a>
            </div>
          </div>
          <div className="hero__art">
            <HeroScene />
            <ol className="hero__legend">
              <li><b>Decide</b><span>A team writes its bets. Your room, your method.</span><Theirs>Value Amplified</Theirs></li>
              <li><b>Build</b><span>One bet becomes a pilot in the team’s own tools.</span><Ours>Cognixlab</Ours></li>
              <li><b>Prove</b><span>The measure the bet named, read at the checkpoint.</span><span className="who who--both">The team decides</span></li>
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------ 2 beliefs */}
        <section className="sec wrap" aria-labelledby="h-beliefs">
          <div className="sec__head">
            <h2 id="h-beliefs">The same belief, from two ends</h2>
            <p>These are your sentences and ours, as published. They are why this page exists.</p>
          </div>
          <div className="beliefs">
            <div className="beliefs__head" aria-hidden="true"><Theirs>Value Amplified says</Theirs><Ours>Cognixlab says</Ours></div>
            {BELIEFS.map((b) => (
              <div className="belief" key={b.theirs}>
                <blockquote className="belief__q belief__q--va" cite="https://www.valueamplified.com"><span className="vh">Value Amplified: </span>{b.theirs}</blockquote>
                <blockquote className="belief__q belief__q--cl" cite="https://cognixlab.co/about"><span className="vh">Cognixlab: </span>{b.ours}</blockquote>
                <p className="belief__note">{b.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------ 3 the gap */}
        <section className="sec gap" aria-labelledby="h-gap">
          <div className="wrap gap__in">
            <div className="gap__copy">
              <h2 id="h-gap">After the workshop, who builds the bet?</h2>
              <p>A team leaves your one-day workshop with three to five bets, each with a measure and a date, and a checkpoint 30 days out. A leadership team leaves the program with two or three product teams running and evidence due after 90 days.</p>
              <p>Between the bet and the checkpoint somebody has to build the thing. Sometimes the team can. When it can’t, or when its backlog is the reason the bet exists, the evidence at the checkpoint is thinner than the thinking deserved.</p>
              <p>That gap is the only place we are proposing to stand.</p>
            </div>
            <img className="gap__img" src={`${IMG}/workshop-wall.webp`} alt="Blank sticky notes in purple, green and yellow on a dark wall after a workshop" width={1600} height={1200} loading="lazy" />
          </div>
          <div className="wrap">
            <div className="tl" role="img" aria-label="Two timelines. Workshop: workshop day, bets written, then an open slot marked build, then the 30-day checkpoint. Program: leadership workshop, two or three product teams running, then an open slot marked build, then evidence after 90 days.">
              {[
                { name: 'One-Day Team AI Process Workshop', tone: 'purple', steps: ['Workshop day', '3 to 5 bets written'], end: '30-day checkpoint' },
                { name: 'AI-Era Product Operating Model Program', tone: 'green', steps: ['Leadership workshop', '2 or 3 product teams running'], end: 'Evidence after 90 days' },
              ].map((r) => (
                <div className="tl__row" key={r.name} aria-hidden="true">
                  <p className="tl__name"><i className={`sq sq--${r.tone}`} />{r.name}</p>
                  <div className="tl__track">
                    {r.steps.map((s) => <span className="tl__step" key={s}>{s}</span>)}
                    <span className="tl__step tl__step--open"><b>Build</b><em>the open slot</em></span>
                    <span className="tl__step tl__step--end">{r.end}</span>
                  </div>
                </div>
              ))}
              <p className="tl__src" aria-hidden="true">Stages as described on valueamplified.com. The build step is ours to add.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ 4 services */}
        <section className="sec wrap" id="services" aria-labelledby="h-services">
          <div className="sec__head">
            <h2 id="h-services">What we would add to each of your services</h2>
            <p>Five services, five additions. Each demo below runs on invented numbers and is marked as such. None describes a client of yours or a result we are promising.</p>
          </div>

          <article className="svc">
            <div className="svc__copy">
              <p className="svc__theirs"><i className="sq sq--purple" />One-Day Team AI Process Workshop</p>
              <h3>From bet to measured pilot</h3>
              <p>Your team writes the bet: what they believe, how they will measure it, by when. We take one bet, set the baseline in a two-week assessment, and build the pilot in four to six weeks.</p>
              <p>At the checkpoint the team inspects a number, not an intention. The keep / let go / try map stays live alongside it.</p>
              <ul className="svc__gets"><li>Baseline measured before anything is built</li><li>One workflow automated in the team’s tools</li><li>The bet’s own measure, read on the bet’s own date</li></ul>
            </div>
            <div className="svc__demo"><BetPilot /><KeepBoard /></div>
          </article>

          <article className="svc">
            <div className="svc__copy">
              <p className="svc__theirs"><i className="sq sq--green" />AI-Era Product Operating Model Program</p>
              <h3>Agent workflows with a named owner and signals to watch</h3>
              <p>Your program asks for “a named owner for every outcome and agent workflow, and signals to watch.” That sentence is a product requirement. We build the workflows and the board that shows, for each one, who answers for it and what the signal is doing.</p>
              <p>An agent workflow with no owner is flagged, not hidden. The evidence due after 90 days comes from the same board.</p>
              <ul className="svc__gets"><li>Every workflow tied to one accountable person</li><li>Signals read from the systems of record</li><li>A 90-day view leadership can act on</li></ul>
            </div>
            <div className="svc__demo"><Signals /></div>
          </article>

          <article className="svc">
            <div className="svc__copy">
              <p className="svc__theirs"><i className="sq sq--navy" />Keynotes, Conversations &amp; Facilitation</p>
              <h3>Amplifier Pulse, from survey to readout without the hand work</h3>
              <p>Your Keynote + Amplifier Pulse format runs a five-to-seven question survey beforehand and delivers a one-page readout afterwards. Collecting, counting and laying that page out is manual work that repeats for every event.</p>
              <p>We would automate it: responses in, readout assembled, ready for the speaker to edit. It is also the workflow we suggest reviewing first, because it is yours and it is small.</p>
              <ul className="svc__gets"><li>Survey, tally and layout in one flow</li><li>A readout the speaker edits, not builds</li><li>The same page design for every event</li></ul>
            </div>
            <div className="svc__demo"><Pulse /></div>
          </article>

          <article className="svc svc--small">
            <div className="svc__copy">
              <p className="svc__theirs"><i className="sq sq--yellow" />Product Marketing Workshops for Growth</p>
              <h3>The new messaging, built and shipped</h3>
              <p>Your workshop series rebuilds messaging, targeting and the marketing mix. Our Product &amp; UX team designs and builds the pages that carry it, so the work does not stop at a document. The first screen proposed in your own audit is an example of the hand-off.</p>
            </div>
            <div className="svc__demo"><BeforeAfter /></div>
          </article>

          <article className="svc svc--small">
            <div className="svc__copy">
              <p className="svc__theirs"><i className="sq sq--ink" />Research</p>
              <h3>Field evidence your papers could cite</h3>
              <p>Your research draws on surveys and what you observe in organisations. Built pilots produce a different kind of evidence: a baseline, a change and a number. With each client’s permission, joint pilots could give your papers cases of their own.</p>
              <p>The two results here are ours, already published. They show the form such evidence takes.</p>
            </div>
            <div className="svc__demo"><FieldEvidence /></div>
          </article>
        </section>

        {/* ------------------------------------------------ 5 pilot */}
        <Pilot />

        {/* ------------------------------------------------ 6 the line */}
        <section className="sec wrap" id="line" aria-labelledby="h-line">
          <div className="sec__head">
            <h2 id="h-line">Where the line is</h2>
            <p>We are a build studio. We do not advise on how organisations should work, and we would not start.</p>
          </div>
          <div className="line">
            <div className="line__col">
              <h3><Ours>What Cognixlab does</Ours></h3>
              <ul>{LINE.wedo.map((x) => <li key={x}><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>{x}</li>)}</ul>
            </div>
            <div className="line__col line__col--no">
              <h3><Theirs>What stays yours</Theirs></h3>
              <ul>{LINE.wedont.map((x) => <li key={x}><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 8h8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>{x}<span>We don’t offer this</span></li>)}</ul>
            </div>
            <div className="line__rules">
              <img src={`${IMG}/patch-cables.webp`} alt="Neatly routed dark cables joining two pieces of equipment, with one lime status light" width={1600} height={1200} loading="lazy" />
              <ul>
                <li><b>The client relationship stays yours.</b> We work as your build partner, in the open, or not at all.</li>
                <li><b>You own what we build.</b> Your code, your accounts, your data. We document and hand over.</li>
                <li><b>We will say when AI is not the fix.</b> Sometimes the right answer is an integration or a rule.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ 7 proof */}
        <section className="sec wrap" aria-labelledby="h-proof">
          <div className="sec__head">
            <h2 id="h-proof">Work you can check</h2>
            <p>Three published projects. One is a firm in your field. We have no numbers for it and have not made any up.</p>
          </div>
          <div className="proof">
            {PROOF.map((p) => (
              <a className="proof__card" key={p.name} href={p.href} target="_blank" rel="noreferrer">
                <span className="proof__kind">{p.kind}</span>
                <h3>{p.name}</h3>
                <p>{p.line}</p>
                <span className="proof__foot"><span className="tag">{p.service}</span><span className="proof__go">Read the case<span className="vh"> on cognixlab.co, new tab</span> <Arrow /></span></span>
              </a>
            ))}
          </div>
          <p className="people">You would be working with <b>Zakaria Mahmud</b> and <b>AR Tanveer</b>, Cognixlab’s co-founders.</p>
        </section>

        {/* ------------------------------------------------ 8 close */}
        <section className="close" aria-labelledby="h-close">
          <img className="close__bg" src={`${IMG}/handoff-desk.webp`} alt="" width={2400} height={1029} loading="lazy" />
          <div className="wrap close__in">
            <h2 id="h-close">A first step that costs you 45 minutes</h2>
            <p>Bring your own Amplifier Pulse workflow to a free Workflow Review. We map it with you on the call and tell you whether automating it is worth doing. If it is not, you will have lost three quarters of an hour and learned how we work.</p>
            <div className="hero__actions">
              <a className="btn btn--lime" href={BOOK} target="_blank" rel="noreferrer">Book a Workflow Review</a>
              <a className="btn btn--ghost" href="../">Back to the audit</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot__in">
          <img src={`${BRAND}/cognixlab-logo.webp`} alt="Cognixlab" width={120} height={24} />
          <p>Prepared privately for Value Amplified. Demos use sample data. Quotations and project figures are as published on valueamplified.com and cognixlab.co in November 2026.</p>
          <a href="https://cognixlab.co" target="_blank" rel="noreferrer">cognixlab.co</a>
        </div>
      </footer>
    </>
  )
}

function Pilot() {
  const [active, setActive] = useState(0)
  return (
    <section className="sec pilot" id="pilot" aria-labelledby="h-pilot">
      <div className="wrap">
        <div className="sec__head">
          <h2 id="h-pilot">How a first joint pilot would run</h2>
          <p>Your three words on the left, our four steps on the right. Each step ends with something to hold before anyone commits to the next. <Sample>Proposed, not agreed</Sample></p>
        </div>
        <div className="pilot__grid">
          <ol className="pilot__steps">
            {PILOT_STEPS.map((s, i) => (
              <li key={s.ours} data-on={i === active || undefined}>
                <button type="button" onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} aria-pressed={i === active}>
                  <span className="pilot__n">{i + 1}</span>
                  <span className="pilot__main">
                    <span className="pilot__map"><span className="pilot__theirs">{s.theirs}</span><Arrow /><b>{s.ours}</b></span>
                    <span className="pilot__time">{s.time}</span>
                    <span className="pilot__body">{s.body}</span>
                    <span className="pilot__holds">You hold: {s.holds}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="pilot__art">
            <Staircase active={active} />
            <p>Step names and durations are the ones Cognixlab publishes for every engagement.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
