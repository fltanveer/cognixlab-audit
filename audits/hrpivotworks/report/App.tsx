import {
  ArrowUpRight, FindingsSection, Head, MethodSection, PinLegend, PrioritySection,
  ReportHero, ReportShell, RolloutSection, ScoreSection, TableSection, WorksSection, countBySev, rich,
} from '../../../src/report'
import { CompareStage, DevicePair, EvidenceToday, FullScroll } from '../../../src/report/stages'
import { CHANGES, DATE, FINDINGS, FIRST_FIVE, FRAMEWORKS, LIVE_PINS, MOBILE_PINS, PAGES, ROLLOUT, SCORES, SCORE_TOTAL, SITEMAP, SLUG, URL, WORKS } from './content'
import { ANNOTATIONS } from './proposal'

const PROPOSAL = 'proposal/'
/** Links to the proposed page are held back. Flip to true to show them. */
const SHOW_PROPOSAL_LINKS = false

const SECTIONS = [
  ['score', '01', 'Where it stands'],
  ['evidence', '02', 'What a visitor sees'],
  ['changes', '03', 'What changed this week'],
  ['method', '04', 'Method & scope'],
  ['findings', '05', 'Findings'],
  ['pages', '06', 'Page by page'],
  ['works', '07', 'What works'],
  ['priority', '08', 'Do these five first'],
  ['strategy', '09', 'What the site has to do'],
  ['rebuild', '10', 'A first look at the direction'],
  ['rollout', '11', 'Rollout'],
] as const

const counts = countBySev(FINDINGS)
const base = { slug: SLUG, url: URL }

export default function App() {
  return (
    <ReportShell
      brand="HR Pivot Works"
      brandSub="audit"
      sections={SECTIONS}
      findings={FINDINGS}
      proposal={SHOW_PROPOSAL_LINKS ? PROPOSAL : undefined}
      footer={[`UX, content and conversion audit of ${URL}.`, `${DATE} · ${FINDINGS.length} findings · ${counts.critical} critical`]}
    >
      <ReportHero
        eyebrow={`UX, content & conversion audit · ${DATE}`}
        title="The judgement is real. The site keeps it in a picture."
        lede={<>
          hrpivotworks.com has a clear action, a founder with 25 years behind her and thirteen thoughtful articles. The site was tidied on 18 November, and the most visible fault, a section with no layout, is gone. What remains: the headline is a JPEG that shrinks to 7 px type on a phone, the testimonials were removed and nothing replaced them, the homepage no longer says what the firm does, and a new banner image has made every inner page slower. This report sets out {FINDINGS.length} findings with the evidence for each, and ends with a first look at where the fixes lead.
        </>}
        actions={<>
          {SHOW_PROPOSAL_LINKS && <a className="btn btn--primary" href={PROPOSAL}>Open the proposed landing page <ArrowUpRight /></a>}
          <a className={SHOW_PROPOSAL_LINKS ? 'btn' : 'btn btn--primary'} href="#priority">Jump to the five fixes</a>
          <a className="btn" href="#changes">What changed this week</a>
        </>}
        meta={[
          ['Property', URL],
          ['Platform', 'WordPress · Elementor'],
          ['Pages reviewed', '12 of 28'],
          ['Viewports', '1440 · 390 px'],
          ['Pages with an h1', '2 of 12'],
          ['Findings', `${counts.critical} / ${counts.major} / ${counts.minor}`],
        ]}
      />

      <ScoreSection
        id="score" n="01" title="Where it stands"
        sub="Each axis is scored 0–100 against what a founder or CEO needs in order to book a first conversation. Scores are judgement, not a tool output; the evidence behind each one is in the findings."
        total={SCORE_TOTAL} baseline={55} scores={SCORES}
        note="Mean of the six axes. The conversion path scores highest because one well-named action is in place; proof scores lowest because there is now none on the site."
        kpis={[
          { value: '~7', unit: 'px', text: <>Height of the hero's body text on a 390 px phone. It is part of an image, so it cannot be enlarged or reflowed.</>, source: 'Measured in-browser' },
          { value: '0', text: <>Testimonials, client names or outcomes on the site. Five testimonials were removed on 18 November.</>, source: 'Page text, 12 pages' },
          { value: '874', unit: ' KB', text: <>Weight of the new header banner on every inner page. Those pages went from about 0.7 MB to 1.5 MB.</>, source: 'Network log' },
          { value: '1.92', unit: ':1', text: <>Contrast of white text on the cyan buttons. The minimum for body-size text is 4.5:1.</>, source: 'Computed colours' },
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

        <div className="pair">
          <figure>
            <img src={`/${SLUG}/shots/live-www.webp`} alt="The new Who We Work With page: a banner, one paragraph and three bullet points" width={1440} height={1186} loading="lazy" />
            <figcaption><b>A new page, 83 words long.</b> One paragraph, three bullets, and no way to take the next step. <a href="#F-04" className="band__link">F-04 →</a></figcaption>
          </figure>
          <figure>
            <img src={`/${SLUG}/shots/live-services.webp`} alt="The Our Services page with seven service cards, two of which have a button" width={1440} height={2184} loading="lazy" />
            <figcaption><b>One service list now, which is right.</b> Two of the seven cards have a button, with different labels; none leads to a booking. <a href="#F-04" className="band__link">F-04 →</a></figcaption>
          </figure>
        </div>

        <h3 className="band__h3">The whole homepage, top to bottom</h3>
        <p className="band__p">Hero image, three cards, a signup form, the FAQ. No services, no method and no testimonials (<a href="#F-02" className="band__link">F-02</a>, <a href="#F-03" className="band__link">F-03</a>).</p>
        <div className="stage-frame"><FullScroll {...base} name="live-desktop-full" alt="The current homepage from top to bottom" /></div>
      </section>

      <TableSection
        id="changes" n="03" title="What changed this week"
        sub="The site was first reviewed on 17 November. Its owners edited every main page on 18 November and added two. This is what moved, and what it did."
        head={['Area', 'What changed', 'Effect']} rows={CHANGES}
        note={<><b>The direction is right.</b> Removing a broken section, settling on one service list and fixing the menu are exactly the right first moves. Three side effects need attention: the proof went out with the carousel, the homepage lost its content along with its fault, and the new banner is far heavier than it needs to be.</>}
      />

      <MethodSection
        id="method" n="04" frameworks={FRAMEWORKS}
        sub={<>Twelve pages were loaded in Chrome at 1440 × 900 and at 390 × 844 (phone profile) on 19 November: Home, Our Services, Who We Work With, the Ownership &amp; Transition page, How We Work, About, Our Team, Contact, Immigration, Join Our Team, the article index and one article. For each, the rendered page was captured in full and the DOM was queried for headings, landmarks, images, links, form fields, resolved fonts and colours. Contrast ratios are computed from the browser's resolved colour values. The homepage was fetched both through the site's cache and past it. Also read: response headers, <code>robots.txt</code>, the sitemaps and the public REST endpoint. Results were compared with the 17 November crawl. Graded against Nielsen's heuristics, WCAG 2.2 AA, and conversion criteria for an advisory sold on trust.</>}
      />

      <FindingsSection id="findings" n="05" findings={FINDINGS} />

      <TableSection
        id="pages" n="06" title="Page by page"
        sub="What each page is doing now, and what holds it back. Three of the eleven have no link from any other page."
        head={['Page', 'What is there', 'Assessment']} rows={PAGES}
        note={<><b>One name for each thing.</b> “Our Services” and “How We Help”; “Our Team”, “Executive Team” and “Our Leadership Team”; “From the Field” and “Leadership &amp; People Insight”. Pick one of each and use it in the menu, the title, the heading and the address.</>}
      />

      <WorksSection id="works" n="07" sub="The site has real assets, and this week's edits added to them." items={WORKS} />

      <PrioritySection id="priority" n="08" title="Do these five first" sub="Ordered by business impact per hour spent, not by severity label. All five can be done on the existing site this week." items={FIRST_FIVE} />

      <section id="strategy" className="sec">
        <Head n="09" title="What the site has to do" sub="A site converts when it is built around one decision taken by one person. Everything below follows from naming that person and that decision." />
        <div className="who">
          <div className="who__main">
            <p className="who__k mono">Who converts</p>
            <p className="who__v">A founder, CEO or owner of a business with roughly 5 to 200 people, facing a decision about a person, a leadership team or the shape of the workforce that they cannot talk through with anyone inside the company.</p>
            <p className="who__k mono">The one decision</p>
            <p className="who__q">“Can I tell this person what is really going on, and will thirty minutes with her be worth it?”</p>
          </div>
          <div className="who__side">
            <p className="who__k mono">The second audience</p>
            <p>An investor, board member or family office looking for experienced help through a transition, or an interim Chief People Officer for a portfolio company. The new Who We Work With page names them; they scan for track record.</p>
          </div>
        </div>
        <div className="actions3">
          <div><span className="mono">Primary</span><b>Schedule a confidential conversation</b><p>Already the right action and the right words. Put it at the end of every page and in the phone header.</p></div>
          <div><span className="mono">Secondary</span><b>Write to Prue</b><p>A visible email address, for people who would rather describe the situation in private first.</p></div>
          <div><span className="mono">Tertiary</span><b>Read From the Field</b><p>The monthly articles and their signup, for owners who are not ready yet.</p></div>
        </div>
        <p className="note"><b>Why the person and the proof come before the services.</b> Nobody books a confidential conversation with a list of seven advisory lines. They book it with someone they believe will understand, because other people say she did. The site currently shows neither Prue nor anyone speaking for her on its first page.</p>

        <h3 className="sub">Site structure</h3>
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

      <section id="rebuild" className="sec band">
        <Head n="10" title="A first look at the proposed direction" sub="One screen, to show where the fixes lead: the current homepage on the left, a proposed first screen on the right, using the firm's own colours, headline and photograph. Drag the divider to compare." />
        <div className="stage-frame"><CompareStage {...base} /></div>
        <div className="band__split band__split--rev">
          <div className="stage-frame"><DevicePair {...base} desktop="proposal-desktop" mobile="proposal-mobile" desktopAlt="Proposed first screen at 1440 px" mobileAlt="Proposed first screen on a 390 px phone" /></div>
        </div>
        <ol className="annot">
          {ANNOTATIONS.map(([a, b], i) => (
            <li key={a}><span className="mono">{i + 1}</span><p><b>{a}</b> {rich(b)}</p></li>
          ))}
        </ol>
      </section>

      <RolloutSection
        id="rollout" n="11" steps={ROLLOUT}
        sub="The first block needs no design work. It takes about a day and finishes what this week's edits started."
        note={<><b>What this report did not check.</b> Timings are from single lab loads on a fast connection, not field data from real visitors, and vary from run to run; treat them as indicative. The site was being edited during the review, so details may have moved again. Forms were not submitted, so delivery, confirmation messages and spam protection were not tested. The booking flow on Calendly, the newsletter emails, analytics and the WordPress admin were not inspected. Sixteen further pages (legal pages and older articles) and the tag and category archives were not reviewed individually. No testing was done with assistive technology or with users. The proposed first screen is a direction for discussion, not a finished design.</>}
      />
    </ReportShell>
  )
}
