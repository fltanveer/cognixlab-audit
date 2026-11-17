import {
  FindingsSection, Head, MethodSection, PinLegend, PrioritySection, ReportHero, ReportShell,
  RolloutSection, ScoreSection, TableSection, WorksSection, countBySev,
} from '../../../src/report'
import { CompareStage, EvidenceToday, FullScroll } from '../../../src/report/stages'
import { COMPARE_NOTES, DATE, FINDINGS, FIRST_FIVE, FRAMEWORKS, LIVE_PINS, MOBILE_PINS, PAGES, ROLLOUT, SCORES, SCORE_TOTAL, SLUG, URL, WORKS } from './content'

const SECTIONS = [
  ['score', '01', 'Where it stands'],
  ['evidence', '02', 'What a visitor sees'],
  ['method', '03', 'Method & scope'],
  ['findings', '04', 'Findings'],
  ['pages', '05', 'Page by page'],
  ['works', '06', 'What works'],
  ['priority', '07', 'Do these five first'],
  ['strategy', '08', 'What the site has to do'],
  ['compare', '09', 'A proposed first screen'],
  ['rollout', '10', 'Rollout'],
] as const

const counts = countBySev(FINDINGS)
const base = { slug: SLUG, url: URL }

export default function App() {
  return (
    <ReportShell
      brand="Value Amplified"
      brandSub="audit"
      sections={SECTIONS}
      findings={FINDINGS}
      footer={[`UX, content and conversion audit of ${URL}.`, `${DATE} · ${FINDINGS.length} findings · ${counts.critical} critical`]}
    >
      <ReportHero
        eyebrow={`UX, content & conversion audit · ${DATE}`}
        title="A sharp argument, with nobody standing behind it and nowhere to go next."
        lede={<>
          valueamplified.com has a headline worth keeping, service pages that say exactly what a client gets, and real research. What it lacks is on the first screen: the two people whose record makes the firm credible are not named there, and the only buttons lead to articles. This report sets out {FINDINGS.length} findings with the evidence for each, and shows a proposed first screen beside the current one.
        </>}
        actions={<><a className="btn btn--primary" href="#priority">Jump to the five fixes</a><a className="btn" href="#compare">See the proposed first screen</a></>}
        meta={[
          ['Property', URL],
          ['Platform', 'Wix'],
          ['Pages reviewed', '12 of 19'],
          ['Viewports', '1440 · 390 px'],
          ['Ways to make contact on the first screen', '0'],
          ['Findings', `${counts.critical} / ${counts.major} / ${counts.minor}`],
        ]}
      />

      <ScoreSection
        id="score" n="01" title="Where it stands"
        sub="Each axis is scored 0–100 against what a product or technology leader needs in order to start a conversation. Scores are judgement, not a tool output; the evidence behind each one is in the findings."
        total={SCORE_TOTAL} baseline={55} scores={SCORES}
        note="Mean of the six axes. The offer is clear and the foundations are sound; proof and the path to an enquiry pull the total down."
        kpis={[
          { value: '0', text: <>Founder names, testimonials, clients or case studies on the homepage. The founders appear only on About.</>, source: 'Page text, 12 pages' },
          { value: '2,970', unit: 'px', text: <>How far down the 3,287 px homepage the only "Get in touch" sits. It opens an email program.</>, source: 'Link positions' },
          { value: '21', unit: 'MB', text: <>Transferred by the Keynotes page, which embeds 16 video players. Other pages: about 3 MB.</>, source: 'Network log' },
          { value: '410', unit: 'px', text: <>Where the headline starts on a 390 px phone, below a decorative box and above a consent banner.</>, source: 'Measured in-browser' },
        ]}
      />

      <section id="evidence" className="sec band">
        <Head n="02" title="What a visitor sees today" sub={`Captured ${DATE} at 1440 px and on a 390 px phone, as a first-time visitor. Each marker opens the finding it evidences.`} />
        <div className="stage-frame"><EvidenceToday {...base} pins={LIVE_PINS} mobilePins={MOBILE_PINS} /></div>
        <PinLegend pins={LIVE_PINS} />

        <div className="pair">
          <figure>
            <img src={`/${SLUG}/shots/live-keynotes.webp`} alt="The Keynotes page showing a grid of embedded YouTube players" width={1440} height={900} loading="lazy" />
            <figcaption><b>Sixteen players, loaded at once.</b> The Keynotes page transfers 21 MB; none of the recordings has a title for assistive technology. <a href="#F-03" className="band__link">F-03 →</a></figcaption>
          </figure>
          <figure>
            <img src={`/${SLUG}/shots/live-service.webp`} alt="A service page whose small capitalised label is the h1 and whose large headline is an h2" width={1440} height={900} loading="lazy" />
            <figcaption><b>The yellow label is the page's h1.</b> The sentence beneath it, the best line on the page, is marked as a subheading. <a href="#F-05" className="band__link">F-05 →</a></figcaption>
          </figure>
        </div>

        <h3 className="band__h3">The whole homepage, top to bottom</h3>
        <p className="band__p">Five sections. The founders are not in any of them (<a href="#F-01" className="band__link">F-01</a>), and the one route to the firm is in the last (<a href="#F-02" className="band__link">F-02</a>).</p>
        <div className="stage-frame"><FullScroll {...base} name="live-desktop-full" alt="The current homepage from top to bottom" /></div>
      </section>

      <MethodSection
        id="method" n="03" frameworks={FRAMEWORKS}
        sub={<>Twelve pages were loaded in Chrome at 1440 × 900 and at 390 × 844 (phone profile): Home, Services, the four service pages, Research, one research paper, About, the blog index, one article and the privacy policy. For each, the rendered page was captured in full and the DOM was queried for headings, landmarks, images, links, form fields and resolved fonts. Contrast ratios for the brand colour pairs were calculated from their hex values. Also read: response headers, <code>robots.txt</code>, <code>llms.txt</code>, the five sitemaps, and which hosts are contacted before cookie consent. Graded against Nielsen's heuristics, WCAG 2.2 AA, and conversion criteria for an advisory sold on expertise.</>}
      />

      <FindingsSection id="findings" n="04" findings={FINDINGS} />

      <TableSection
        id="pages" n="05" title="Page by page"
        sub="What each page is doing now, and what holds it back."
        head={['Page', 'What is there', 'Assessment']} rows={PAGES}
      />

      <WorksSection id="works" n="06" sub="This is a well-made site in several respects. None of the following should change." items={WORKS} />

      <PrioritySection id="priority" n="07" title="Do these five first" sub="Ordered by business impact per hour spent, not by severity label. All five can be done in the site builder without a redesign." items={FIRST_FIVE} />

      <section id="strategy" className="sec">
        <Head n="08" title="What the site has to do" sub="A site converts when it is built around one decision taken by one person. Everything below follows from naming that person and that decision." />
        <div className="who">
          <div className="who__main">
            <p className="who__k mono">Who converts</p>
            <p className="who__v">A head of product, engineering or technology whose agile teams are already using AI, and who can see that output has gone up while it has become harder to say what was achieved or who is accountable.</p>
            <p className="who__k mono">The one decision</p>
            <p className="who__q">“Do these people know enough about how teams really work to be worth a conversation?”</p>
          </div>
          <div className="who__side">
            <p className="who__k mono">The second audience</p>
            <p>An event or community organiser choosing a speaker. They want a recording, a list of talks and a quick way to ask about dates.</p>
          </div>
        </div>
        <div className="actions3">
          <div><span className="mono">Primary</span><b>Get in touch</b><p>One label, one short form, in the header and the hero of every page.</p></div>
          <div><span className="mono">Secondary</span><b>See how we help</b><p>The four services, for visitors who want to understand the offer first.</p></div>
          <div><span className="mono">Tertiary</span><b>Read the research</b><p>The papers and the newsletter, for leaders who are months away from buying.</p></div>
        </div>
        <p className="note"><b>Why the founders belong on the first screen.</b> The question this buyer is asking is about people, not services. The firm has an unusually strong answer, the former CEO and COO of Scrum.org, and currently gives it on the second page. Until there are client results to show, that answer is the proof.</p>
      </section>

      <section id="compare" className="sec band">
        <Head n="09" title="A proposed first screen" sub="One screen, not a redesign: the current homepage on the left, a proposal on the right, using the firm's own logo, colours, headline and facts. Drag the divider to compare." />
        <div className="stage-frame"><CompareStage {...base} /></div>
        <ol className="annot">
          {COMPARE_NOTES.map(([a, b], i) => (
            <li key={a}><span className="mono">{i + 1}</span><p><b>{a}</b> {b}</p></li>
          ))}
        </ol>
      </section>

      <RolloutSection
        id="rollout" n="10" steps={ROLLOUT}
        sub="The first block needs no design work and can be done in the site builder in a day."
        note={<><b>What this report did not check.</b> Timings are from single lab loads on a fast connection, not field data from real visitors; treat them as indicative. Forms were not submitted, so delivery, confirmation messages and spam protection were not tested. Behaviour after accepting cookies, the newsletter emails and analytics were not inspected. Seven pages in the sitemap (six articles and one research paper) were not reviewed individually. Contrast was calculated for the brand colour pairs, not for every text element. No testing was done with assistive technology, on Safari or Firefox, or with users. The proposed first screen is a single static image for comparison; it is not a built page.</>}
      />
    </ReportShell>
  )
}
