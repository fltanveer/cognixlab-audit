import {
  ArrowUpRight, CopyDeckSection, FindingsSection, Head, MethodSection, PinLegend, PrioritySection,
  ReportHero, ReportShell, RolloutSection, ScoreSection, TableSection, WorksSection, countBySev, rich,
} from '../../../src/report'
import { CompareStage, DevicePair, EvidenceToday, FullScroll } from '../../../src/report/stages'
import { DATE, FINDINGS, FIRST_FIVE, FRAMEWORKS, LIVE_PINS, MOBILE_PINS, PAGES, ROLLOUT, SCORES, SCORE_TOTAL, SITEMAP, SLUG, URL, WORKS } from './content'
import { ANNOTATIONS, COPY_DECK } from './proposal'
import { NavDemo } from './NavDemo'

const PROPOSAL = 'proposal/'
const HAS_PROPOSAL = ANNOTATIONS.length > 0
/** Links to the live proposal are held back until it is sent to the client. Flip to true to show them. */
const SHOW_PROPOSAL_LINKS = false
const LINKS = HAS_PROPOSAL && SHOW_PROPOSAL_LINKS

const SECTIONS = [
  ['score', '01', 'Where it stands'],
  ['evidence', '02', 'What a visitor sees'],
  ['method', '03', 'Method & scope'],
  ['findings', '04', 'Findings'],
  ['pages', '05', 'Page by page'],
  ['works', '06', 'What works'],
  ['priority', '07', 'Do these five first'],
  ['strategy', '08', 'What the site has to do'],
  ...(HAS_PROPOSAL ? ([['rebuild', '09', 'The proposed landing page'], ['copy', '10', 'Copy, written']] as const) : []),
  ['rollout', HAS_PROPOSAL ? '11' : '09', 'Rollout'],
] as const

const counts = countBySev(FINDINGS)
const base = { slug: SLUG, url: URL }

export default function App() {
  return (
    <ReportShell
      brand="HR Pivot Works"
      brandSub="audit & redesign"
      sections={SECTIONS}
      findings={FINDINGS}
      proposal={LINKS ? PROPOSAL : undefined}
      footer={[`UX, content and conversion audit of ${URL}.`, `${DATE} · ${FINDINGS.length} findings · ${counts.critical} critical`]}
    >
      <ReportHero
        eyebrow={`UX, content & conversion audit · ${DATE}`}
        title="The judgement is real. The site keeps it in a picture."
        lede={<>
          hrpivotworks.com has a clear action, a founder with 25 years behind her and thirteen thoughtful articles. A visitor meets none of that cleanly: the headline is a JPEG that shrinks to 7 px type on a phone, the offer is described three different ways, the middle of the homepage has lost its layout, and the articles have no link. This report sets out {FINDINGS.length} findings with the evidence for each, and proposes a landing page with the copy written.
        </>}
        actions={<>
          {LINKS && <a className="btn btn--primary" href={PROPOSAL}>Open the proposed landing page <ArrowUpRight /></a>}
          <a className={LINKS ? 'btn' : 'btn btn--primary'} href="#priority">Jump to the five fixes</a>
        </>}
        meta={[
          ['Property', URL],
          ['Platform', 'WordPress · Elementor'],
          ['Pages reviewed', '10 of 25'],
          ['Viewports', '1440 · 390 px'],
          ['Pages with an h1', '2 of 10'],
          ['Findings', `${counts.critical} / ${counts.major} / ${counts.minor}`],
        ]}
      />

      <ScoreSection
        id="score" n="01" title="Where it stands"
        sub="Each axis is scored 0–100 against what a founder or CEO needs in order to book a first conversation. Scores are judgement, not a tool output; the evidence behind each one is in the findings."
        total={SCORE_TOTAL} baseline={55} scores={SCORES}
        note="Mean of the six axes. The conversion path scores highest because one well-named action is already in place; everything around it holds it back."
        kpis={[
          { value: '~7', unit: 'px', text: <>Height of the hero's body text on a 390 px phone. It is part of an image, so it cannot be enlarged or reflowed.</>, source: 'Measured in-browser' },
          { value: '3', text: <>Different service lists (8, 6 and 6 items) with no name in common, plus two different five-step processes.</>, source: 'Page text, 3 pages' },
          { value: '1.92', unit: ':1', text: <>Contrast of white text on the cyan buttons. The minimum for body-size text is 4.5:1.</>, source: 'Computed colours' },
          { value: '0', text: <>Links to the 13 published articles from any of the 10 pages sampled.</>, source: 'Link crawl' },
        ]}
      />

      <section id="evidence" className="sec band">
        <Head n="02" title="What a visitor sees today" sub={`Captured ${DATE} at 1440 px and on a 390 px phone. Each marker opens the finding it evidences.`} />
        <div className="stage-frame"><EvidenceToday {...base} pins={LIVE_PINS} mobilePins={MOBILE_PINS} /></div>
        <PinLegend pins={LIVE_PINS} />

        <div className="hp">
          <div className="band__copy">
            <p className="band__kicker mono">F-01 · Critical</p>
            <h3>This is the hero at the size a phone shows it.</h3>
            <p>Not a thumbnail: the image on the right is the homepage hero exactly as it renders at 390 px wide. The headline survives. The two sentences that say who the firm helps, and the line about 25 years of experience, do not.</p>
            <a href="#F-01" className="band__link">Read F-01 →</a>
          </div>
          <figure className="hp__shot">
            <img src={`/${SLUG}/shots/live-hero-phone.webp`} alt="The homepage hero image as rendered on a 390 px phone; the body text is too small to read" width={390} height={190} />
            <figcaption>hero image · 358 × 152 px on screen · designed at 1,439 × 612 px</figcaption>
          </figure>
        </div>

        <div className="band__split">
          <div className="band__copy">
            <p className="band__kicker mono">F-04 · Major</p>
            <h3>The menu says “From the Field”. The link asks for an email.</h3>
            <p>The label promises articles. The link scrolls down the homepage to a signup form. The thirteen articles exist at <code>/blog/</code>, and nothing on the site points to them.</p>
            <a href="#F-04" className="band__link">Read F-04 →</a>
          </div>
          <div className="stage-frame stage-frame--li"><NavDemo /></div>
        </div>

        <h3 className="band__h3">The whole homepage, top to bottom</h3>
        <p className="band__p">Watch for the section after the signup form, where the layout drops away (<a href="#F-03" className="band__link">F-03</a>).</p>
        <div className="stage-frame"><FullScroll {...base} name="live-desktop-full" alt="The current homepage from top to bottom; the services and process sections run edge to edge without a layout" /></div>
      </section>

      <MethodSection
        id="method" n="03" frameworks={FRAMEWORKS}
        sub={<>Ten pages were loaded in Chrome at 1440 × 900 and at 390 × 844 (phone profile): Home, Our Services, How We Work, About, Our Team, Contact, Immigration, Join Our Team, the article index and one article. For each, the rendered page was captured in full and the DOM was queried for headings, landmarks, images, links, form fields, resolved fonts and colours. Contrast ratios are computed from the browser's resolved colour values. Also read: the served HTML, response headers, <code>robots.txt</code>, the six sitemaps and the public REST endpoint. Graded against Nielsen's heuristics, WCAG 2.2 AA, and conversion criteria for an advisory sold on trust.</>}
      />

      <FindingsSection id="findings" n="04" findings={FINDINGS} />

      <TableSection
        id="pages" n="05" title="Page by page"
        sub="What each page is doing now, and what holds it back. Four of the nine are not reachable from the menu."
        head={['Page', 'What is there', 'Assessment']} rows={PAGES}
        note={<><b>One name for each thing.</b> “Our Services” and “How We Help”, “Our Team” and “Executive Team”, “From the Field” and “Leadership &amp; People Insight” are three pairs of names for three pages. Pick one of each and use it in the menu, the title, the heading and the address.</>}
      />

      <WorksSection id="works" n="06" sub="The site has real assets. The proposed page keeps every one of them." items={WORKS} />

      <PrioritySection id="priority" n="07" title="Do these five first" sub="Ordered by business impact per hour spent, not by severity label. All five can be done on the existing site this week." items={FIRST_FIVE} />

      <section id="strategy" className="sec">
        <Head n="08" title="What the site has to do" sub="A site converts when it is built around one decision taken by one person. Everything below follows from naming that person and that decision." />
        <div className="who">
          <div className="who__main">
            <p className="who__k mono">Who converts</p>
            <p className="who__v">A founder, CEO or owner of a business with roughly 5 to 200 people, facing a decision about a person, a leadership team or the shape of the workforce that they cannot talk through with anyone inside the company.</p>
            <p className="who__k mono">The one decision</p>
            <p className="who__q">“Can I tell this person what is really going on, and will thirty minutes with her be worth it?”</p>
          </div>
          <div className="who__side">
            <p className="who__k mono">The second audience</p>
            <p>A board member or investor looking for an interim or fractional Chief People Officer for a portfolio company. They scan for track record and availability, and need the same booking link.</p>
          </div>
        </div>
        <div className="actions3">
          <div><span className="mono">Primary</span><b>Schedule a confidential conversation</b><p>Already the right action and the right words. Keep it identical everywhere, including the phone header.</p></div>
          <div><span className="mono">Secondary</span><b>Write to Prue</b><p>A visible email address, for people who would rather describe the situation in private first.</p></div>
          <div><span className="mono">Tertiary</span><b>Read From the Field</b><p>The monthly articles and their signup, for owners who are not ready yet.</p></div>
        </div>
        <p className="note"><b>Why the person comes before the services.</b> Nobody books a confidential conversation with a list of eight advisory lines. They book it with someone they believe will understand. The current site introduces Prue in the fourth menu item; the proposed page puts her name, face and way of working on the first screen and lets the services follow.</p>

        <h3 className="sub">Site structure, after the landing page</h3>
        <p className="head__sub">Seven pages, each with one job and one next step, all reachable from the menu or footer.</p>
        <div className="sitemap">
          {SITEMAP.map(([name, d, job, hub]) => (
            <div key={name} className={`sm ${hub ? 'sm--hub' : ''}`}>
              <b>{name}</b>
              <p>{d}</p>
              <span className="mono">{job}</span>
            </div>
          ))}
        </div>
      </section>

      {HAS_PROPOSAL && (
        <section id="rebuild" className="sec band">
          <Head n="09" title="The proposed landing page" sub={<>Built, not drawn: a working page in the firm's own colours, with its real copy, people and testimonials. Drag the divider to compare the first screen.{LINKS && <> <a href={PROPOSAL} className="band__link">Open it full size →</a></>}</>} />
          <div className="stage-frame"><CompareStage {...base} /></div>
          <div className="band__split band__split--rev">
            <div className="stage-frame"><DevicePair {...base} desktop="proposal-desktop" mobile="proposal-mobile" desktopAlt="Proposed homepage at 1440 px" mobileAlt="Proposed homepage on a 390 px phone" /></div>
          </div>
          <ol className="annot">
            {ANNOTATIONS.map(([a, b], i) => (
              <li key={a}><span className="mono">{i + 1}</span><p><b>{a}</b> {rich(b)}</p></li>
            ))}
          </ol>
          <h3 className="band__h3">The whole page, top to bottom</h3>
          <div className="stage-frame"><FullScroll {...base} /></div>
          {LINKS && <div className="band__cta">
            <a className="btn btn--green" href={PROPOSAL}>Open the proposed landing page <ArrowUpRight /></a>
            <span>Desktop and phone. The booking buttons open the firm's real scheduling page; the signup form sends nothing.</span>
          </div>}
        </section>
      )}

      {HAS_PROPOSAL && (
        <CopyDeckSection id="copy" n="10" rows={COPY_DECK} sub="The strings for the page, ready to paste. Anything the firm has to confirm or supply is flagged. Nothing here invents a client name, a metric or a quotation." />
      )}

      <RolloutSection
        id="rollout" n={HAS_PROPOSAL ? '11' : '09'} steps={ROLLOUT}
        sub="The first block needs no design work. It takes about a day and removes the faults a visitor can see."
        note={<><b>What this report did not check.</b> Timings are from single lab loads on a fast connection, not field data from real visitors; treat them as indicative. Forms were not submitted, so delivery, confirmation messages and spam protection were not tested. The booking flow on Calendly, the newsletter emails, analytics and the WordPress admin were not inspected. Fifteen pages in the sitemap (legal pages, older articles, tag and category archives) were not reviewed individually. No testing was done with assistive technology or with users. Photography on the proposed page marked as generated was made with Gemini for this proposal and should be replaced or approved before launch.</>}
      />
    </ReportShell>
  )
}
