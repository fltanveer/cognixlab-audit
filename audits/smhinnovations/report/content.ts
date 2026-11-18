// SMH Innovations — audit content. Every number was measured on the live site
// and the public LinkedIn page on 18 November 2026 (see Method).
// Inline markup: `code`, **bold**, *em*.
import type { Finding } from '../../../src/report'
import type { Pin, MiniPin } from '../../../src/report/stages'

export const SLUG = 'smhinnovations'
export const URL = 'smhinnovations.com'
export const DATE = '18 November 2026'

export const FINDINGS: Finding[] = [
  {
    id: 'F-01', sev: 'critical', fw: 'Business · Findability · N1 Visibility of system status',
    title: 'LinkedIn sends visitors to an address with four w\'s that does not exist',
    observed: 'The LinkedIn company page lists its website as `wwww.smhinnovations.com`. That host has no DNS record: both `http://` and `https://` fail with "could not resolve host". The live site is `smhinnovations.com`. LinkedIn is the firm\'s only active channel, with eight posts in the last three weeks, 116 followers and a conference sponsorship being promoted, and it is the only social profile the website links to.',
    impact: 'Every hospital leader or clinician who reads a post, opens the company page and clicks the website sees a browser error. The firm is paying for conference sponsorship and posting several times a week to earn exactly that click.',
    fix: 'Edit the LinkedIn page\'s website field to `https://smhinnovations.com` today. It is one field and takes a minute. Then check the same field on every job board profile.',
  },
  {
    id: 'F-02', sev: 'critical', fw: 'Content strategy · N2 Match with the real world',
    title: 'The headline does not say what the company is, and "physician-led" is nowhere on the site',
    observed: 'The `h1` reads "Find Your Ideal Staffers That Are" followed by five words typed one at a time: Professional, Motivated, Goal-Oriented, Skilled, Compassionate. It names no profession and no service. On LinkedIn the firm says "Physician-led locum tenens solves many of the problems hospitals face", and its job-board profile opens with "physician-led healthcare staffing organization". The phrase **"physician-led" appears 0 times** on the website. The page title is "SMH Innovations" with no descriptor. "We are your local locums company" appears three times, beside "the national healthcare sector".',
    impact: 'A hospital executive comparing agencies has seconds to learn what makes this one different. The answer, that it is run by practising physicians, is the firm\'s whole case and is missing from the page. "Staffers" could describe any temp agency.',
    fix: 'Lead with the claim: "Physician-led locum tenens and medical staffing." Follow with who is placed (physicians, advanced practice professionals, CRNAs) and where. Set it as static text. Decide whether the firm is local or national and say one of them.',
  },
  {
    id: 'F-03', sev: 'critical', fw: 'Conversion · IA · N7 Flexibility and efficiency',
    title: 'Two audiences, one generic form, and no open roles',
    observed: 'The site serves hospitals that need coverage and clinicians who want assignments. Both are given the same button, "Contact Us", and the same form with five required fields, including "Subject". There are **0 job listings, specialties or locations** on the site. Meanwhile the firm\'s roles are advertised on third-party job boards: searches returned listings for hospitalist, infectious disease, ENT, neurosurgery stroke call and cardiothoracic APP positions in the Savannah area.',
    impact: 'A physician who sees one of those postings and visits the site to check the firm finds no roles and nothing to apply to. A facility with an urgent gap is asked to write a subject line. Each has to work out how to phrase a request the site should already understand.',
    fix: 'Two doors from the first screen: "Request coverage" for facilities and "Find an assignment" for providers, each with its own short form (facility: role, specialty, dates; provider: credential, specialty, licences). Add an open-roles list fed from the same system that posts to the job boards.',
  },
  {
    id: 'F-04', sev: 'major', fw: 'Visual craft · N4 Consistency and standards · Platform',
    title: 'The site is a medical-clinic template with the clinic still showing',
    observed: 'Section anchors are `#department`, `#doctors` and `#X-ray`. The three service images are files named `crutches.png`, `xray.png` and `pulmonary.png`; the visible one is a stock photograph of a doctor with a patient. The services are headed "Areas of Practice", and a card titled "For The Patients" promises "heightened patient contentment", though the firm does not treat patients. When the page loads, the tab highlighted is "Locum Tenens Staffing" while the panel shown is "We Staff Physicians". Three of the four social icons link to `#`. The footer says "Copyright 2023" and credits the template designer. The "U.S. Clinician Employment Trends" link opens a 2021 PDF.',
    impact: 'Visitors from healthcare recognise a clinic template immediately. It reads as a firm that has not looked at its own site, which is the opposite of the attention to detail its LinkedIn posts promise.',
    fix: 'Rebuild the page around staffing: remove the patient card, rename the sections, replace the stock clinic photograph, fix the default tab, remove the dead icons, and update the year and the report. The proposed page in section 09 shows the result.',
  },
  {
    id: 'F-05', sev: 'major', fw: 'Trust & credibility · Conversion',
    title: 'No evidence of a single placement',
    observed: 'The site contains **0 testimonials, 0 client or facility names, 0 numbers and 0 specialties**. The founding year (2022, from LinkedIn) is not on the site. NALTO membership is one line of footer text beside a logo. The only quotation is from Sir James Paget, a surgeon who died in 1899. The copy relies on phrases such as "unwavering dedication", "esteemed hospital partners" and "setting us far apart from our competitors".',
    impact: 'Hospitals choose staffing partners on track record and risk. Superlatives without a fact behind them lower trust rather than raise it, and there is nothing here a credentialing or procurement lead could check.',
    fix: 'State the checkable facts first: physician-led, founded 2022, NALTO member, based in the Savannah area, the credentials placed. Ask two facility contacts and two providers for a sentence each and publish them with name and role. Replace the 1899 quotation with one of those.',
  },
  {
    id: 'F-06', sev: 'major', fw: 'Trust & credibility · Content · WCAG 2.4.4 Link purpose',
    title: 'The team carousel repeats itself, and a removed profile is still live',
    observed: 'Seven people are shown in a sliding carousel. Because the slider duplicates its slides, the page contains each name up to three times: 18 team headings and 36 profile links. Each profile page holds one or two sentences (25 to 50 words), has no `h1`, no credentials list and no LinkedIn link, and makes 81 requests to display them. One photograph\'s alt text reads "Marley Castle" for Marley Mountcastle. An eighth profile, for a Managing Director, has been taken out of the carousel in the page source, but its page at `masud.html` still loads and still gives that title.',
    impact: 'The physicians are the firm\'s differentiator, and they are presented as a slideshow of thumbnails with almost nothing behind them. A profile for someone no longer shown on the homepage can be found through search and contradicts it.',
    fix: 'Show the team as a static grid with name, role, board certification, where they practise and a LinkedIn link. Expand each bio to a short paragraph. Decide whether the eighth profile should exist; if not, remove the page and redirect its address.',
  },
  {
    id: 'F-07', sev: 'major', fw: 'Findability · SEO · AI discovery',
    title: 'Search engines are given a title and nothing else',
    observed: 'The homepage has no meta description, no canonical link, no Open Graph or Twitter tags and no structured data. `robots.txt` and `sitemap.xml` both return the host\'s "File Not Found" page. The title is "SMH Innovations"; profile pages are titled with a name only. The site answers at both `smhinnovations.com` and `www.smhinnovations.com` with no redirect between them. The whole site is one page of about 620 words, eight short profile pages and a privacy policy.',
    impact: 'A link shared on LinkedIn or in an email previews with no image and no description. Searches such as "locum tenens Savannah" or "physician staffing Georgia" have nothing specific to match. Another organisation called SMH Innovations also has a LinkedIn page, so the name alone does not identify this firm.',
    fix: 'Title: "SMH Innovations | Physician-led locum tenens and medical staffing". Add a 150-character description, share image, canonical link, `Organization` and `EmploymentAgency` structured data, a sitemap and a robots file. Redirect `www` to the bare domain. Add a page each for facilities, providers and open roles.',
  },
  {
    id: 'F-08', sev: 'major', fw: 'WCAG 1.4.3 Contrast (minimum)',
    title: 'The brand cyan measures 2.1:1 wherever it carries text',
    observed: 'Cyan `#00C4E3` is used for text on white (the active menu item, names, "Physicians.", footer headings) and as the fill behind white text on both buttons, "Contact Us" and "Send message". Each case measures **2.1:1** against a requirement of 4.5:1. White on the green tab is 2.84:1. The consent text under the form is 9.75 px.',
    impact: 'The two buttons a visitor must press to make contact are the hardest text on the page to read, particularly outdoors or on a ward workstation with a dim screen.',
    fix: 'Keep cyan as an accent and as a fill with dark text (about 9:1 with navy). Use a deep teal or navy for text and for button fills with white labels. Set the smallest text at 14 px.',
  },
  {
    id: 'F-09', sev: 'major', fw: 'Privacy · Platform',
    title: 'A visitor-tracking script runs on every page with no notice',
    observed: 'Every page loads a website-visitor tracker from Apollo.io, which sets a third-party cookie and is designed to identify the companies that visit. There is no cookie or consent notice on the site. The privacy policy (updated April 2026) discusses cookies and tracking in general terms but does not name this service. One of the tracker\'s requests returns an error (HTTP 400) on each load. The contact section also embeds a Google Map centred on the Savannah area rather than on the office address, in a frame with no title.',
    impact: 'Hospital compliance teams and privacy-aware clinicians notice undisclosed trackers. Some US state privacy laws require this kind of tracking to be disclosed, so it is worth a legal check. The failing request suggests the tool is not fully working in any case.',
    fix: 'Decide whether the tracker is needed. If it stays, name it in the privacy policy and add a short notice with a way to decline. Fix or remove the failing request. Give the map frame a title, or replace it with the written address and a link to directions.',
  },
  {
    id: 'F-10', sev: 'major', fw: 'Mobile · WCAG 2.5.8 Target size · 4.1.2 Name, role, value',
    title: 'On a phone the number and email disappear, and the menu button is not a button',
    observed: 'At 390 px the top bar holding the phone number and email address is hidden, so the first tap-to-call link is in the footer of a 7,191 px page. The menu control is a `span` measuring 28 × 27 px with no role, name or keyboard focus. Team name links are 24 px tall. Layout shift on the phone profile measured 0.118, above the 0.1 "good" threshold.',
    impact: 'Locum work is arranged by phone. A physician on a break or an administrator walking between units cannot call from the first screen, and a screen-reader or keyboard user cannot open the menu at all.',
    fix: 'Keep a tap-to-call button in the phone header. Make the menu a real `button` with a label and a 44 × 44 px target. Give links in lists at least 44 px of height.',
  },
  {
    id: 'F-11', sev: 'major', fw: 'Forms · Conversion · Consent',
    title: 'Five required fields, and marketing consent is bundled into the Send button',
    observed: 'The form requires full name, email, subject, phone and message. The email and phone fields are plain text inputs, so phones do not show the right keyboard and the browser does not check the format. Placeholders are "John Doe" and "example@gmail.com". Beneath the form, in 9.75 px type, pressing Send is defined as consent to receive "Email/SMS/MMS" messages. There is no way to send an enquiry without giving that consent, and no indication of what happens next.',
    impact: 'Every required field loses some enquiries, and "Subject" and a mandatory phone number are the two most often abandoned. Consent to text messages that is neither optional nor clearly presented is a weak basis for sending them and should be reviewed.',
    fix: 'Ask only for what is needed to reply. Use `type="email"` and `type="tel"` with autocomplete. Make message consent a separate, unticked, optional checkbox in readable type. After sending, say who will reply and how.',
  },
  {
    id: 'F-12', sev: 'major', fw: 'WCAG 1.3.1 Info and relationships · 2.4.1 Bypass blocks · 1.1.1 Non-text content',
    title: 'No landmarks, no skip link, and decoration announced as content',
    observed: 'The homepage has no `nav` or `main` element and no skip link. Heading levels jump (an `h4` before the first `h3`; the Paget quotation is an `h3`). The `h1` contains all five rotating words, so it is read aloud as one long sentence. Decorative images carry alt text such as "shape1", "icon", "service" and "avatar". Both frames are untitled. Profile pages have no `h1`.',
    impact: 'A screen-reader user must listen through the header on every page, hears "shape1, shape2, shape" before any content, and gets a headline that makes no sense when read in full.',
    fix: 'Add `nav` and `main` landmarks and a skip link. One static `h1`, `h2` for sections, `h3` within them. Give decorative images empty alt text and meaningful ones a description. Title the frames.',
  },
  {
    id: 'F-13', sev: 'minor', fw: 'Content · Copy',
    title: 'The copy is inflated where it should be specific',
    observed: '"Staffers" is not a word clinicians use for themselves. "Our unwavering dedication revolves around elevating patient outcomes, satisfaction, and key performance metrics." "Heightened patient contentment." One paragraph ends with two full stops. The LinkedIn posts, by contrast, are concrete: "Listening to what providers want from an assignment. Matching them thoughtfully to open shifts. Coordinating credentialing with client facilities."',
    impact: 'The website sounds like a brochure and the LinkedIn page sounds like people. The second voice is the one that persuades.',
    fix: 'Rewrite the site in the LinkedIn voice: short sentences that say what the team does, in order. Use "physicians", "providers" and "clinicians".',
  },
  {
    id: 'F-14', sev: 'minor', fw: 'Social presence · Findability',
    title: 'The LinkedIn page is filed under hospitals and its tagline does not mention staffing',
    observed: 'Industry is set to "Hospitals and Health Care"; comparable agencies in LinkedIn\'s own "similar pages" list are under "Staffing and Recruiting". The tagline is "Committed to providing exceptional patient care with our hospital partners and serving our communities." The About text is the website\'s paragraph and does not contain the words "locum tenens" or "staffing". No other social profiles were found, and the site\'s Facebook, Twitter and Instagram icons lead nowhere.',
    impact: 'People who filter LinkedIn by industry to find a staffing partner will not see the page, and a reader of the header alone would think this is a hospital group.',
    fix: 'Industry: "Staffing and Recruiting". Tagline: "Physician-led locum tenens and medical staffing." Rewrite About to open with what the firm does. Remove the unused social icons from the site.',
  },
  {
    id: 'F-15', sev: 'minor', fw: 'Performance · Platform',
    title: 'Small pages that load like large ones',
    observed: 'The homepage makes 90 requests and transfers 2.0 MB; one 505 px image, `crutches.png`, is 365 KB. A profile page with 40 words of content makes 81 requests because it loads the full template, the map and the tracker. The fixed desktop header is 126 px tall. The largest paint on desktop measured 2.6 s in a single lab run.',
    impact: 'Nothing here is slow enough to lose visitors on a good connection. It is wasted weight on hospital networks and phones, and it is cheap to fix.',
    fix: 'Convert images to WebP at display size, load the map only on the contact section, and drop unused scripts from the profile pages.',
  },
]

export const SCORES = [
  { label: 'Findability (search / social)', value: 22 },
  { label: 'Proof & credibility', value: 28 },
  { label: 'Clarity of the offer', value: 30 },
  { label: 'Conversion path', value: 35 },
  { label: 'Accessibility & mobile', value: 40 },
  { label: 'Visual craft & layout', value: 45 },
]
export const SCORE_TOTAL = 33

// [framework, critical, major, minor] — sums to the findings above
export const FRAMEWORKS = [
  ['Business, content & conversion', 2, 3, 1],
  ['Information architecture, findability & social', 1, 1, 1],
  ['WCAG 2.2 AA / accessibility & mobile', 0, 3, 0],
  ['Visual craft, platform, privacy & performance', 0, 2, 1],
] as const

export const LIVE_PINS: Pin[] = [
  { n: 1, x: 28, y: 47, ids: ['F-02'], text: 'The headline types one adjective at a time and never names the service. "Physician-led" is not on the site.' },
  { n: 2, x: 59, y: 73, ids: ['F-03', 'F-08'], text: 'One button for hospitals and clinicians alike. White on cyan measures 2.1:1.' },
  { n: 3, x: 35, y: 1.8, ids: ['F-10'], text: 'Phone and email sit in a top bar that is hidden on phones.' },
  { n: 4, x: 82, y: 9.5, ids: ['F-04'], text: 'The menu\'s anchors are still the clinic template\'s: `#department`, `#doctors`.' },
  { n: 5, x: 68, y: 63, ids: ['F-05'], text: '"The best of the best." The only supporting line is a superlative; there is no fact a hospital could check.' },
]
export const MOBILE_PINS: MiniPin[] = [
  { n: 1, x: 12, y: 30 },
  { n: 3, x: 88, y: 5 },
]

export const LINKEDIN_ROWS = [
  ['Website', '`wwww.smhinnovations.com`', '**Does not resolve.** Four w\'s. The highest-priority fix in this report (F-01).'],
  ['Tagline', '"Committed to providing exceptional patient care with our hospital partners and serving our communities."', 'Reads as a hospital group. Does not say staffing or locum tenens.'],
  ['About', 'The website\'s "unwavering dedication" paragraph, word for word', 'Never says what the firm does. The posts explain it better.'],
  ['Industry', 'Hospitals and Health Care', 'Peers in the "similar pages" list are under Staffing and Recruiting.'],
  ['Size · founded', '11–50 employees · 2022 · 10 people listed', 'Useful, checkable facts that the website omits.'],
  ['Followers', '116', 'Small, but the engagement is real: the conference recap drew 26 reactions and 10 comments.'],
  ['Posting', 'Eight posts in three weeks, mostly around the LEC26 conference the firm sponsored', '**The strongest asset the firm has.** Specific, human, consistent. It names the process (listen, match, coordinate credentialing) and the platform used.'],
  ['Other networks', 'None found. The site\'s Facebook, Twitter and Instagram icons link to `#`.', 'Fine to be on one network. Remove the icons that go nowhere.'],
] as const

export const WORKS = [
  ['The LinkedIn posts are good.', 'They say plainly what the team does: "Listening to what providers want from an assignment. Matching them thoughtfully to open shifts. Coordinating credentialing with client facilities." That is the copy the website needs.'],
  ['The team is real, named and photographed.', 'Five physicians and two operations leads, with consistent portraits. Few agencies of this size can show doctors as owners.'],
  ['The three-card idea is right.', 'Providers, facilities and patients is nearly the correct split. Make it two, providers and facilities, and it becomes the structure of the whole site.'],
  ['Contact details are complete and consistent.', 'One phone number, one email address and a postal address, the same everywhere they appear.'],
  ['The form has proper labels', 'attached to every field, and the page declares its language and viewport correctly.'],
  ['Security basics are in place.', 'The site sits behind a firewall, redirects to HTTPS and sends frame and content-type protection headers.'],
  ['There is a privacy policy, recently updated,', 'and the form\'s consent wording includes opt-out instructions. The intent is right; the presentation needs work.'],
  ['The logo is distinctive and works small.', 'The grey and cyan mark is recognisable on LinkedIn and in the header.'],
] as const

export const FIRST_FIVE = [
  ['Fix the LinkedIn website field.', 'Change `wwww.smhinnovations.com` to `https://smhinnovations.com`. One minute, and it repairs the path every post is trying to create.', 'F-01'],
  ['Change the headline to say what the firm is.', '"Physician-led locum tenens and medical staffing", as static text, with the title tag and a description to match.', 'F-02'],
  ['Put tap-to-call in the phone header and fix the two buttons.', 'Show the number on small screens; make the menu a real button; switch button fills to a dark teal or navy so the labels can be read.', 'F-10'],
  ['Split the form in two and cut the fields.', 'One for facilities, one for providers, three or four fields each, with message consent as an optional checkbox.', 'F-03'],
  ['Remove what belongs to the template.', 'The patient card, the dead social icons, the 2023 copyright, the 2021 PDF, the clinic photograph, the designer credit, and the orphaned profile page.', 'F-04'],
] as const

export const SITEMAP = [
  ['Home', 'Physician-led staffing, the two doors, how it works, the team, the facts.', 'Convince & route', true],
  ['For facilities', 'What coverage looks like, how credentialing is coordinated, a request form.', 'Convert', true],
  ['For providers', 'Assignment types, what the team handles (travel, scheduling, payroll), a short profile form.', 'Convert', true],
  ['Open roles', 'A live list by specialty, credential and location, fed from the firm\'s platform.', 'Rank & land', false],
  ['Our physicians', 'A static grid, then a real page for each person.', 'Trust', false],
  ['Contact', 'Phone, email, address, hours, and both forms.', 'Convert', false],
] as const

export const ROLLOUT = [
  ['Today — stop the leak.', 'Correct the LinkedIn website field. Check the same field on every job board. Add a meta description and title to the homepage.'],
  ['This week — on the existing site.', 'Static headline. Tap-to-call on phones. Readable buttons. Remove the patient card, dead icons, old PDF and stale copyright. Decide on the eighth profile page. Decide on the visitor tracker and disclose it.'],
  ['Weeks two and three — rebuild the homepage.', 'Build the proposed page in section 09: two doors, two short forms, the team as a grid, how it works in the firm\'s own words, the facts a hospital can check.'],
  ['Weeks three to five — give each audience a page.', 'For facilities, for providers, open roles connected to the platform, and a proper profile for each physician. Sitemap, robots file, structured data.'],
  ['Ongoing — collect the proof.', 'After each assignment ask the facility contact and the provider for one sentence. Keep posting on LinkedIn as now, and link each post to the relevant page on the site.'],
] as const
