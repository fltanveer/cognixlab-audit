import {
  ArrowUpRight, FindingsSection, Head, MethodSection, PinLegend, PrioritySection,
  ReportHero, ReportShell, RolloutSection, ScoreSection, TableSection, WorksSection, countBySev, rich,
} from '../../../src/report'
import { CompareStage, DevicePair, EvidenceToday, FullScroll } from '../../../src/report/stages'
import { DATE, FINDINGS, FIRST_FIVE, FRAMEWORKS, LINKEDIN_ROWS, LIVE_PINS, MOBILE_PINS, ROLLOUT, SCORES, SCORE_TOTAL, SITEMAP, SLUG, URL, WORKS } from './content'
import { ANNOTATIONS } from './proposal'
import { LinkedInDemo } from './LinkedInDemo'

const PROPOSAL = 'proposal/'
const HAS_PROPOSAL = ANNOTATIONS.length > 0
/** Set to false to hold back every link to the proposed page. */
const SHOW_PROPOSAL_LINKS = false
const LINKS = HAS_PROPOSAL && SHOW_PROPOSAL_LINKS

const SECTIONS = [
  ['score', '01', 'Where it stands'],
  ['evidence', '02', 'What a visitor sees'],
  ['method', '03', 'Method & scope'],
  ['findings', '04', 'Findings'],
  ['linkedin', '05', 'LinkedIn & social'],
  ['works', '06', 'What works'],
  ['priority', '07', 'Do these five first'],
  ['strategy', '08', 'What the site has to do'],
  ...(HAS_PROPOSAL ? ([['rebuild', '09', 'A first look at the direction']] as const) : []),
  ['rollout', HAS_PROPOSAL ? '10' : '09', 'Rollout'],
] as const

const counts = countBySev(FINDINGS)
const base = { slug: SLUG, url: URL }

export default function App() {
  return (
    <ReportShell
      brand="SMH Innovations"
      brandSub="audit"
      sections={SECTIONS}
      findings={FINDINGS}
      proposal={LINKS ? PROPOSAL : undefined}
      footer={[`UX, content and conversion audit of ${URL} and the LinkedIn company page.`, `${DATE} · ${FINDINGS.length} findings · ${counts.critical} critical`]}
    >
      <ReportHero
        eyebrow={`UX, content & conversion audit · ${DATE}`}
        title="Physicians run this firm. The website never says so."
        lede={<>
          SMH Innovations is a physician-led locum tenens and medical staffing company with an active, well-written LinkedIn page. Its website is a medical-clinic template whose headline does not name the service, offers hospitals and clinicians the same generic form, and shows no open roles. The LinkedIn page that does the real work links to a web address with four w's, which does not exist. This report sets out {FINDINGS.length} findings with the evidence for each, and ends with a first look at where the fixes lead.
        </>}
        actions={<>
          {LINKS && <a className="btn btn--primary" href={PROPOSAL}>Open the proposed landing page <ArrowUpRight /></a>}
          <a className={LINKS ? 'btn' : 'btn btn--primary'} href="#priority">Jump to the five fixes</a>
        </>}
        meta={[
          ['Property', URL],
          ['Platform', 'Static HTML template'],
          ['Pages on the site', '10'],
          ['Social profiles', 'LinkedIn only'],
          ['Open roles shown', '0'],
          ['Findings', `${counts.critical} / ${counts.major} / ${counts.minor}`],
        ]}
      />

      <ScoreSection
        id="score" n="01" title="Where it stands"
        sub="Each axis is scored 0–100 against what a hospital leader or a clinician needs in order to make contact. Scores are judgement, not a tool output; the evidence behind each one is in the findings."
        total={SCORE_TOTAL} baseline={55} scores={SCORES}
        note="Mean of the six axes. The firm is more credible than its website: the gap is presentation, not substance."
        kpis={[
          { value: '4', unit: ' w’s', text: <>In the website address on the LinkedIn page: <code>wwww.smhinnovations.com</code>. It has no DNS record.</>, source: 'LinkedIn · DNS lookup' },
          { value: '0', text: <>Times “physician-led” appears on the website. It is the first thing the firm says about itself elsewhere.</>, source: 'Page text' },
          { value: '0', text: <>Open roles, specialties or testimonials on the site, while roles are advertised on job boards.</>, source: 'Page text · web search' },
          { value: '2.1', unit: ':1', text: <>Contrast of the white-on-cyan buttons that lead to the contact form. The minimum is 4.5:1.</>, source: 'Computed colours' },
        ]}
      />

      <section id="evidence" className="sec band">
        <Head n="02" title="What a visitor sees today" sub={`Captured ${DATE} at 1440 px and on a 390 px phone. Each marker opens the finding it evidences.`} />
        <div className="stage-frame"><EvidenceToday {...base} pins={LIVE_PINS} mobilePins={MOBILE_PINS} /></div>
        <PinLegend pins={LIVE_PINS} />

        <div className="band__split">
          <div className="band__copy">
            <p className="band__kicker mono">F-01 · Critical</p>
            <h3>One extra “w”, and every LinkedIn visitor hits an error.</h3>
            <p>The company page lists its website as <code>wwww.smhinnovations.com</code>. That address has no DNS record. The firm posts several times a week; this is where each of those posts leads.</p>
            <a href="#F-01" className="band__link">Read F-01 →</a>
          </div>
          <div className="stage-frame stage-frame--li"><LinkedInDemo /></div>
        </div>

        <div className="pair">
          <figure>
            <img src={`/${SLUG}/shots/live-practice.webp`} alt="The Areas of Practice section: the Locum Tenens tab is highlighted while the Physicians panel and a stock clinic photograph are shown" width={1440} height={900} loading="lazy" />
            <figcaption><b>The clinic template, still visible.</b> “Areas of Practice”, a stock consultation photograph, and a highlighted tab that does not match the panel beneath it. <a href="#F-04" className="band__link">F-04 →</a></figcaption>
          </figure>
          <figure>
            <img src={`/${SLUG}/shots/live-form.webp`} alt="The contact form with five required fields and consent text in very small type under it" width={1440} height={900} loading="lazy" />
            <figcaption><b>One form for everyone.</b> Five required fields, a “Subject”, and consent to text messages in 9.75 px type under the button. <a href="#F-11" className="band__link">F-11 →</a></figcaption>
          </figure>
        </div>

        <h3 className="band__h3">The whole homepage, top to bottom</h3>
        <p className="band__p">About 620 words. No specialty, no location served, no role, no client (<a href="#F-05" className="band__link">F-05</a>).</p>
        <div className="stage-frame"><FullScroll {...base} name="live-desktop-full" alt="The current homepage from top to bottom" /></div>
      </section>

      <MethodSection
        id="method" n="03" frameworks={FRAMEWORKS}
        sub={<>All ten pages of the site were fetched; six were loaded in Chrome at 1440 × 900 and at 390 × 844 (phone profile), captured in full, and queried for headings, landmarks, images, links, form fields, resolved fonts and colours. Contrast ratios are computed from the browser's resolved colour values. Also read: response headers, <code>robots.txt</code> and <code>sitemap.xml</code> (both missing), third-party requests and cookies set on load, and DNS for the address shown on LinkedIn. The public LinkedIn company page was read logged out, as a prospect first sees it, and web search was used to find other profiles and job-board listings. Graded against Nielsen's heuristics, WCAG 2.2 AA, and conversion criteria for a two-sided staffing business.</>}
      />

      <FindingsSection id="findings" n="04" findings={FINDINGS} />

      <TableSection
        id="linkedin" n="05" title="LinkedIn and social presence"
        sub="Reviewed logged out. LinkedIn is the only network the firm uses, and it uses it well; the page's settings let the posts down."
        head={['Field', 'What it says now', 'Assessment']} rows={LINKEDIN_ROWS}
        note={<><b>What the posts tell us about the business.</b> The firm recruits providers, matches them to shifts and coordinates credentialing with client facilities, whose own teams handle primary source verification. It uses a partner platform, OnCall, for recruitment, credentialing, scheduling and payroll. It sponsored the LocumSmart Education Conference in Nashville in November 2026. It describes itself as “a close-knit team” where “every provider and facility gets to know us by name”. None of this is on the website, and all of it should be.</>}
      />

      <WorksSection id="works" n="06" sub="The substance is there. Any redesign should be built from these." items={WORKS} />

      <PrioritySection id="priority" n="07" title="Do these five first" sub="Ordered by business impact per hour spent, not by severity label. The first takes a minute." items={FIRST_FIVE} />

      <section id="strategy" className="sec">
        <Head n="08" title="What the site has to do" sub="This is a two-sided business, so the site has two people to convince and one decision for each." />
        <div className="who">
          <div className="who__main">
            <p className="who__k mono">Who converts first</p>
            <p className="who__v">A chief medical officer, hospitalist director or medical staff office lead with a gap in the schedule, who has used large agencies and found them slow or careless.</p>
            <p className="who__k mono">Their one decision</p>
            <p className="who__q">“Will these people send me someone good, and will I be able to reach a person when something changes?”</p>
          </div>
          <div className="who__side">
            <p className="who__k mono">The second audience</p>
            <p>A physician, NP, PA or CRNA weighing locum work. They ask whether the agency understands clinical life, what roles exist, and who handles licensing, travel and pay.</p>
          </div>
        </div>
        <div className="actions3">
          <div><span className="mono">Facilities</span><b>Request coverage</b><p>Role, specialty and dates. A short form, or the phone number, which is always visible.</p></div>
          <div><span className="mono">Providers</span><b>Find an assignment</b><p>Credential, specialty and licences, then the open roles that match.</p></div>
          <div><span className="mono">Both</span><b>Call (912) 349-9671</b><p>Tap-to-call in the header on every screen size.</p></div>
        </div>
        <p className="note"><b>Why “physician-led” goes first.</b> Hospitals and clinicians share one worry about staffing agencies: that the recruiter has never worked a shift. This firm's owners have. That single fact answers both audiences, and it is currently absent from the site.</p>

        <h3 className="sub">Site structure</h3>
        <p className="head__sub">Six pages, each with one job. The homepage comes first.</p>
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
          <Head n="09" title="A first look at the proposed direction" sub="One screen, to show where the fixes lead: the current homepage on the left, a proposed first screen on the right, using the firm's own logo, people and words. Drag the divider to compare." />
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
      )}

      <RolloutSection
        id="rollout" n={HAS_PROPOSAL ? '10' : '09'} steps={ROLLOUT}
        sub="The first block needs no design work and removes the fault that costs real enquiries."
        note={<><b>What this report did not check.</b> Timings are from single lab loads on a fast connection, not field data; treat them as indicative. The contact form was not submitted, so delivery and confirmation were not tested. LinkedIn was read logged out, so employee details, the full post history and analytics reflect only the public view; follower and reaction counts are as shown on the day. Job-board listings were found through web search and were not verified with the firm. Whether the eighth profile page should still exist is a question for the firm; the report notes only that it is live. Nothing here is legal advice on tracking or message consent. No testing was done with assistive technology, on Safari or Firefox, or with users. The proposed first screen is a direction for discussion, not a finished design.</>}
      />
    </ReportShell>
  )
}
