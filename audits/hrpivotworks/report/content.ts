// HR Pivot Works — audit content. The site was first reviewed on 17 November 2026,
// edited substantially by its owners on 18 November, and re-crawled on 19 November.
// Every number here is from the 19 November crawl (see Method).
// Inline markup: `code`, **bold**, *em*.
import type { Finding } from '../../../src/report'
import type { Pin, MiniPin } from '../../../src/report/stages'

export const SLUG = 'hrpivotworks'
export const URL = 'hrpivotworks.com'
export const DATE = '19 November 2026'

export const FINDINGS: Finding[] = [
  {
    id: 'F-01', sev: 'critical', fw: 'WCAG 1.4.5 Images of text · 1.4.4 Resize text · Findability',
    title: 'The headline, the promise and the proof line are a JPEG',
    observed: 'The homepage hero is one image, `when-business-gets-complicated-banner-v2.jpg` (1,439 × 612 px). The eyebrow, the headline "When Business Gets Complicated, Experience Matters.", the tagline and two paragraphs are pixels inside it. The page has **0 `h1` elements**; the first real heading is an `h3`, "How We Help". On a 390 px phone the image renders at 358 × 152 px, a quarter of its designed size, which puts the two body lines at roughly 7–8 px. The closing banner, "Not Sure Where to Start? Let\'s Talk.", is built the same way.',
    impact: 'The single most important sentence on the site cannot be read on a phone without pinching, cannot be selected, translated or enlarged, and does not reflow. Search engines and AI assistants get it only as alt text. A founder arriving from LinkedIn on a phone sees a small lavender picture and a button.',
    fix: 'Set the hero as live text: one `h1` for the headline, a standfirst paragraph, the proof line, and the button directly under it. Keep the wave artwork as a background. Do the same for the closing banner. Section 10 shows a first look at it built.',
  },
  {
    id: 'F-02', sev: 'critical', fw: 'Trust & credibility · Conversion',
    title: 'There is no longer any proof on the site',
    observed: 'Until 18 November the homepage carried five named testimonials. They were removed in that day\'s edits, and the word "testimonial" no longer appears anywhere in the homepage source. Across the 12 pages reviewed there are now **0 testimonials, 0 client names, 0 case examples and 0 outcomes**. The new Who We Work With page lists three kinds of client (founders and business owners; family offices and family-owned businesses; private equity and venture capital) without naming or describing any.',
    impact: 'The firm asks a founder to book a confidential conversation about their hardest problem, on the strength of its own description of itself. For an advisory sold on judgement, other people\'s words are the main evidence, and there are none.',
    fix: 'Bring the testimonials back as a static, readable set with name, role and photograph; lead with the ones that speak to judgement under pressure. Ask two or three recent clients for a sentence about a decision Prue helped them make, and publish them, anonymised by role and sector if they prefer.',
  },
  {
    id: 'F-03', sev: 'major', fw: 'Content strategy · Conversion · N8 Aesthetic and minimalist design',
    title: 'The homepage now says very little about what the firm does',
    observed: 'After the 18 November edits the homepage is 3,673 px tall (it was 5,517 px). The services, the working method and the testimonials were taken off it. What remains: the hero image, three short cards that link elsewhere, a newsletter form, the FAQ and a closing banner. The newsletter form, asking for first name, last name and email, is the fourth thing on the page, before any service is named. No service, no step of the process and no person appears on the homepage outside the image and the FAQ.',
    impact: 'Removing the broken section was right. But a visitor who does not click away now learns what the firm offers only by opening the FAQ. The page asks for an email address before it has made its case.',
    fix: 'Put a short, properly laid-out summary of the services and the five-step process back on the homepage, each linking to its page. Add Prue\'s photograph and two lines about her. Move the newsletter form below them.',
  },
  {
    id: 'F-04', sev: 'major', fw: 'Conversion · IA · N3 User control and freedom',
    title: 'The new pages are thin, and five pages end without a next step',
    observed: 'Who We Work With holds 83 words: one paragraph and three bullet points. Business Ownership, Investment & Transition Advisory holds about 150 words and a list. Neither has a button or a link in its content. The same is true of About, Our Services (apart from two "learn more" links) and Immigration: **five pages whose content contains no way to book or make contact**. On Our Services, two of the seven cards have a button, labelled differently ("Learn More" and "See more"); the other five lead nowhere.',
    impact: 'Each of these pages is where a visitor decides whether the firm is for them. At that moment the only action available is the small "Let\'s Talk" in the header, which is removed on phones.',
    fix: 'End every page with the same action, "Schedule a Confidential Conversation with Prue". Give each of the seven services its own short page or none, with one button label. Expand Who We Work With with a sentence on what each kind of client typically needs.',
  },
  {
    id: 'F-05', sev: 'major', fw: 'IA · Findability · Platform',
    title: 'Three pages have no link from anywhere, and the cache is serving the old homepage',
    observed: 'The 18 November edits pointed "From the Field" at the articles, which fixes the earlier dead end. But on 19 November the site\'s cache was still serving a copy of the homepage in which that link scrolls to the signup form and the third card is missing; a request that bypassed the cache returned the corrected page. Separately, across the 12 pages crawled there are **0 links to How We Work, 0 to Contact Us and 0 to Join Our Team**. How We Work lost its only link when its section was removed from the homepage.',
    impact: 'Some visitors are seeing a version of the homepage the owners believe they have replaced. The clearest page on the site, How We Work, and the Contact page can now be reached only from a search engine.',
    fix: 'Purge the page cache after each round of edits. Add How We Work and Contact to the menu, and give the footer real links to every page.',
  },
  {
    id: 'F-06', sev: 'major', fw: 'Conversion · N10 Help and documentation',
    title: 'The Contact page has no contact details',
    observed: 'The page holds a heading, a three-field form (name, email, optional message) and a LinkedIn badge: 46 words in all. There is no email address, no telephone number and no location. The firm\'s address, `prue@hrpivotworks.com`, appears only on the Join Our Team page. The source also carries a second, hidden copy of the form and a hidden Google Maps embed searching for "United State".',
    impact: 'An owner with a sensitive problem often wants to write a private email or see where the adviser is based before booking a call. Neither is possible. The business cannot be placed geographically at all, which matters for employment and immigration work.',
    fix: 'Put the email address, the scheduling link and the region served on the Contact page, in the footer of every page, and in the site\'s structured data. Remove the hidden form and map. Say what happens after the form is sent and how quickly.',
  },
  {
    id: 'F-07', sev: 'major', fw: 'Platform · Security · N1 Visibility of system status',
    title: 'Five stylesheets are requested over http and blocked on every page',
    observed: 'Every page requests five stylesheets from `http://hrpivotworks.com/…` (`base-desktop.css`, `base-mobile.css` and three font files). Browsers block them as mixed content and log an error for each; this happened on **12 of 12 pages**. The new header banner is also referenced over `http://` on several pages. The sitemap lists every URL as `http://`, and the footer LinkedIn icon links to `http://linkedin.com`. All of this points at the WordPress address being stored as `http`.',
    impact: 'Styles the builder expects to be present are silently missing, which makes layout faults harder to diagnose. Search engines are handed redirecting URLs in the sitemap. No response carries HSTS, so the first request can still travel unencrypted.',
    fix: 'In WordPress Settings → General set both addresses to `https://hrpivotworks.com`. In Elementor → Tools run Replace URL (http → https) and Regenerate CSS. Resave the Yoast sitemap. Add an HSTS header at the host.',
  },
  {
    id: 'F-08', sev: 'major', fw: 'WCAG 1.4.3 Contrast (minimum)',
    title: 'White text on the brand cyan measures 1.92:1',
    observed: 'Buttons "Explore Our Services", "About Us", "Learn More", "See more", "Schedule Time With Prue", "Schedule a Call" and "SEND" set white text on cyan `#36CCE6`: **1.92:1** against a 4.5:1 requirement. Two of those buttons were added in the 18 November edits. On the blog, "Read More" is tan `#CDAB85` on white at 12 px (2.15:1) and excerpts are `#777` (4.48:1). The footer link is `#046BD2` on near-black (3.48:1).',
    impact: 'The secondary buttons on every page are hard to read for anyone with low vision, in sunlight, or on a dim phone. They are the route to the services and the booking link.',
    fix: 'Keep cyan as a fill only with navy `#0B1033` text (about 9:1), or use it as an accent on dark surfaces. For text on white use the brand purple `#5B2D8E` (about 9:1). Darken blog meta text to at least `#595959` and raise it to 14 px.',
  },
  {
    id: 'F-09', sev: 'major', fw: 'Findability · SEO · AI discovery',
    title: 'Ten of twelve pages have no description, and the homepage is titled "Home"',
    observed: 'The homepage `<title>` is "Home - HR Pivot Works". **10 of 12** pages have no meta description, including Home, Our Services, About, Contact and both pages added on 18 November. The Our Leadership Team page is still titled "Executive Team" and described as "HR Pivot Works - Founder\'s Story - Prudence Sinclair". Neither new page is in the sitemap yet. Structured data is the Yoast default; the eight FAQ answers are not marked up as `FAQPage`, and there is no `Person` entry for the founder.',
    impact: 'Google and LinkedIn write their own snippets from whatever text comes first, which is a button label. The FAQ, which answers exactly what owners search for ("how much does it cost", "is it suitable for a small business"), is invisible as a rich result and harder for assistants to quote.',
    fix: 'Title: "HR Pivot Works — independent advice for founders and CEOs on people, leadership and change". Write a 150-character description for each page. Add `FAQPage` markup to the questions and a `Person` entry for Prudence Sinclair linked to her LinkedIn profile.',
  },
  {
    id: 'F-10', sev: 'major', fw: 'WCAG 1.3.1 Info and relationships · 2.4.6 Headings and labels · 2.4.1 Bypass blocks',
    title: 'No h1 on ten pages, and four pages still lack a main landmark',
    observed: '**10 of 12** pages have no `h1`; page titles such as "OUR SERVICES" and "WHO WE WORK WITH" are `h2`. The blog article has two `h1` elements with the same text. The homepage outline starts at `h3`. A `<main>` landmark is now present on eight pages, which is an improvement, but is missing from the homepage, the article index and both new pages.',
    impact: 'Screen-reader users who navigate by heading get no page title on most pages. Search engines get no primary topic for them.',
    fix: 'One `h1` per page carrying its title, `h2` for sections, `h3` inside them. Wrap the content of the remaining four pages in `<main id="content">`.',
  },
  {
    id: 'F-11', sev: 'major', fw: 'Performance · Platform',
    title: 'The new header banner doubled the weight of every inner page',
    observed: 'The banner added on 18 November is a 1,920 × 400 px PNG weighing **874 KB**, used behind the heading of every page except the homepage. Inner pages now transfer about 1.5 MB each; before the change they were about 0.7 MB. The header logo is still a 1,024 × 683 px PNG weighing 566 KB, shown at 168 × 84 px. In this run the banner was the largest element painted on every inner page, at 5.7 to 9.0 s on desktop (one page took far longer) and 4.3 to 11.5 s on the phone profile. Before the change the same pages measured 2.8 to 4.9 s. The article cover is a 1.1 MB PNG.',
    impact: 'The site got visibly slower on the day it was tidied. Google\'s "good" threshold for the largest paint is 2.5 s; only the homepage met it on desktop in this run. Nearly 1.5 MB of every inner page is two images.',
    fix: 'Export the banner as a WebP or compressed JPEG (under 80 KB at this size) and the logo as an SVG or a 336 px WebP (under 15 KB). That alone removes about 1.3 MB per page. Turn on page caching at the host for the rest.',
  },
  {
    id: 'F-12', sev: 'major', fw: 'Mobile · WCAG 2.5.8 Target size · Conversion',
    title: 'On a phone the header loses its button and footer targets are 18 px tall',
    observed: 'At 390 px the header "Let\'s Talk" button is removed, leaving a logo and a menu icon; the open menu lists five pages and no way to book or make contact. Footer links (Disclaimer, Terms & Conditions, Cookies) are 18–19 px tall and the LinkedIn icon is 18 × 18 px. Layout shift on the phone homepage measured 0.125, above the 0.1 "good" threshold.',
    impact: 'After the first screen there is no persistent way to act on a phone, and on the five pages that have no button in their content (F-04) there is no way to act at all without opening the menu and going elsewhere.',
    fix: 'Keep a compact booking button in the mobile header. Make every target at least 44 × 44 px with 8 px between neighbours.',
  },
  {
    id: 'F-13', sev: 'major', fw: 'Content · Credibility · Editorial',
    title: 'Ten articles share one cover, eight are "Uncategorized", and the byline is not the author',
    observed: 'The article index now has a proper header, and it shows ten cards with the same cover image, cropped so the title reads "EADERSHIP". **8 of 10** carry the category label "UNCATEGORIZED". Several titles are issue labels rather than headlines ("Leadership & People Insight – May 2026 – HR Pivot Works"). The article sampled is written in the first person by the founder ("Over the years I\'ve worked with founders…") but is bylined "Ranjika". Comments are open and empty. Card text is 12 px.',
    impact: 'The writing is the strongest material on the site, and with the testimonials gone it is the only evidence of how the firm thinks. The index makes it look like ten copies of one post, signed by someone else.',
    fix: 'Give each article its own headline as the title and a distinct cover or a typographic card. Assign every post to one of three or four categories. Set the author to Prudence Sinclair with a short bio and photo. Turn comments off.',
  },
  {
    id: 'F-14', sev: 'major', fw: 'Trust & credibility · WCAG 1.1.1 Non-text content',
    title: 'Three advisers have a photo and a paragraph, but no name, title or link',
    observed: 'On the team page, now headed "Our Leadership Team", Marc Krellenstein, Galen Schreck and Ellen Loth each appear as a circular photo followed by body text. Their names occur only inside the first sentence; there is no heading, no role in the firm and no link to a profile. All three photos have empty alt text.',
    impact: 'A visitor scanning the page cannot tell who the people are or what they do here. Their backgrounds (Forrester Research, a founder of Northern Light) are real credibility that is easy to miss.',
    fix: 'Give each person a heading with their name, a one-line role ("Adviser, AI and organisational behaviour"), a two-sentence bio and a LinkedIn link. Add alt text.',
  },
  {
    id: 'F-15', sev: 'major', fw: 'Content · Legal risk',
    title: 'The Immigration page reads as legal advice and has no next step',
    observed: 'The page states that the firm is "dedicated to determining an employee\'s legal eligibility to work and reside in the country" and that "we specialize in immigration status, offering expert advice and assistance to help CEOs navigate the complexities of immigration legal requirements". The card that links to it on Our Services describes the same work more carefully: "working alongside qualified legal specialists when needed". The page has one heading, five paragraphs and no button.',
    impact: 'Two descriptions of the same service differ on the point that matters most: whether the firm gives legal advice. That is worth a lawyer\'s read. The page also leaves an interested reader with nowhere to go.',
    fix: 'Rewrite the page in the card\'s terms: what the firm does (workforce planning, coordination, working alongside counsel) and what it does not (legal advice). Add the booking button.',
  },
  {
    id: 'F-16', sev: 'minor', fw: 'N2 Match with the real world · N4 Consistency',
    title: 'One page now has three names, and others still have two',
    observed: 'The team page is "Our Team" in the menu, "Executive Team" in its title and address, and "Our Leadership Team" in its heading. "Our Services" opens a page titled and addressed "How We Help". "From the Field" opens "Leadership & People Insight". The firm describes itself as "Independent Advisory" in the hero image and "Strategic Business, Leadership & Workforce Advisory" in the logo.',
    impact: 'Each mismatch is small; together they make the site feel assembled at different times. Shared links and browser tabs show a different name from the one clicked.',
    fix: 'One name per page, used in the menu, the title, the heading and the address. One descriptor under the logo, repeated in the title tag and on LinkedIn.',
  },
  {
    id: 'F-17', sev: 'minor', fw: 'Forms · Conversion',
    title: 'The newsletter form asks for three fields, and articles use a different one',
    observed: 'The homepage form asks for first name, last name and email. The Last Name field carries an envelope icon. Articles use a second, differently styled signup form from another provider.',
    impact: 'Each extra field lowers completion, and two form systems mean two lists to reconcile.',
    fix: 'Ask for email only, or first name and email. Use one provider and one form design.',
  },
  {
    id: 'F-18', sev: 'minor', fw: 'Visual craft · Content',
    title: 'The Join Our Team page has a drop-cap fault and reads as a different site',
    observed: 'The first letter of several paragraphs is rendered small and cyan and detached from its word ("D o You Have Grit", "J oin our vibrant"). Headings are all capitals ("WHY CHOOSE WORK WITH US?"). The imagery is stock photography. No page links to it.',
    impact: 'Prospective associates see a less careful page than clients do. Because it is unlinked, it only matters to people sent the address directly.',
    fix: 'Remove the drop-cap setting, correct the heading to "Why work with us", and bring the page into the same template as the rest of the site. Link it from the footer.',
  },
  {
    id: 'F-19', sev: 'minor', fw: 'Platform · Security hygiene',
    title: 'Author accounts are listed publicly and no security headers are sent',
    observed: '`/wp-json/wp/v2/users` returns the site\'s author accounts with their login slugs to any visitor. The author archive `/author/ranjika08/` is in the sitemap. Responses carry no `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options` or `X-Content-Type-Options` header. The WordPress and Elementor version numbers are published in the page source.',
    impact: 'None of this is a breach, but login names plus version numbers are what automated attacks start from, and a compromised site is a serious problem for a firm selling confidentiality.',
    fix: 'Restrict the users endpoint to logged-in requests, remove author archives from the sitemap, add the four headers at the host, and hide the generator tags. Confirm two-factor login is on for every account.',
  },
  {
    id: 'F-20', sev: 'minor', fw: 'Content · Copy',
    title: 'Small inconsistencies in visible copy',
    observed: 'Two buttons that do the same job on Our Services are labelled "Learn More" and "See more". The hidden map searches for "United State". "WHY CHOOSE WORK WITH US?" has an extra word. Long paragraphs are centred on the How We Work and Join pages.',
    impact: 'Each one is trivial. On a site whose promise is experienced judgement and attention, they are noticed.',
    fix: 'Use one label for links of the same kind. Correct the two strings. Left-align any paragraph longer than two lines.',
  },
]

export const SCORES = [
  { label: 'Proof & credibility', value: 22 },
  { label: 'Findability (search / AI)', value: 34 },
  { label: 'Accessibility & mobile', value: 40 },
  { label: 'Clarity of the offer', value: 42 },
  { label: 'Visual craft & layout', value: 44 },
  { label: 'Conversion path', value: 56 },
]
export const SCORE_TOTAL = 40

// [framework, critical, major, minor] — sums to the findings above
export const FRAMEWORKS = [
  ['Business, content & conversion', 1, 6, 2],
  ['Information architecture & findability', 0, 2, 1],
  ['WCAG 2.2 AA / accessibility & mobile', 1, 3, 0],
  ['Visual craft, platform & performance', 0, 2, 2],
] as const

export const LIVE_PINS: Pin[] = [
  { n: 1, x: 50, y: 36, ids: ['F-01', 'F-10'], text: 'The whole hero is one image. No `h1`; the first heading on the page is an `h3`.' },
  { n: 2, x: 10, y: 4.8, ids: ['F-11'], text: 'The logo is a 566 KB PNG, 1,024 px wide, shown at 168 px.' },
  { n: 3, x: 65, y: 4.8, ids: ['F-05'], text: '"From the Field" now leads to the articles, but the cached homepage still sends it to a signup form.' },
  { n: 4, x: 91.7, y: 4.8, ids: ['F-12'], text: 'The only persistent button; it is removed from the header on phones.' },
  { n: 5, x: 50, y: 66.9, ids: ['F-08'], text: 'The primary button reads well. The cyan secondary buttons below it measure 1.92:1.' },
  { n: 6, x: 24, y: 84.5, ids: ['F-03'], text: 'Three cards that link elsewhere. Services, method and testimonials are no longer on this page.' },
]
export const MOBILE_PINS: MiniPin[] = [
  { n: 1, x: 50, y: 21 },
  { n: 4, x: 90, y: 5 },
]

export const CHANGES = [
  ['Homepage', 'The unstyled services and process sections and the testimonial carousel were removed. The page went from 5,517 to 3,673 px. A third card, "Who We Work With", was added.', 'The broken layout is gone, which was the most visible fault. The page now says too little (F-03) and has lost its proof (F-02).'],
  ['Services', 'The homepage list was removed, leaving the Our Services page as the only list. A seventh service, Business Ownership, Investment & Transition Advisory, was added with its own page.', 'One list and one process is a real improvement. Two of seven services have a page; five do not (F-04).'],
  ['Menu', '"From the Field" now points to the articles.', 'Fixed, once the cache is cleared (F-05).'],
  ['Page headers', 'Stock photographs were replaced with one light banner, so headings are now dark text on a pale ground.', 'More consistent and easier to read. The image is 874 KB and slowed every inner page (F-11).'],
  ['New page', 'Who We Work With: one paragraph and three bullet points.', 'A useful idea, 83 words long, with no next step (F-04).'],
  ['Structure', 'A `main` landmark was added to eight pages. The team page heading became "Our Leadership Team".', 'Good. Four pages still lack the landmark and no page gained an `h1` (F-10).'],
] as const

export const PAGES = [
  ['Home', '3,673 px desktop, 4,311 px phone. Hero image, three cards, newsletter form, FAQ, closing banner.', 'Hero is an image (F-01). No services, process or proof on the page (F-02, F-03). The FAQ is the best-written part of the site.'],
  ['Our Services', 'Titled "How We Help". Seven service cards under the new banner.', 'One list now. Two cards have a button, with different labels; no way to book (F-04).'],
  ['Who We Work With', 'New. 83 words: a paragraph and three bullets.', 'Thin, and ends without a next step (F-04). No heading 1 or description (F-09, F-10).'],
  ['Ownership & Transition Advisory', 'New. About 150 words and a six-item list.', 'Clear and specific. No button, no description (F-04, F-09).'],
  ['How We Work', 'Five numbered steps, a flexibility statement, a contact form.', 'Still the clearest page on the site. No page links to it any more (F-05).'],
  ['About Us', 'Rewritten and shorter, under the new banner.', 'Good voice ("It\'s lonely at the top"). No photo of the founder, no button (F-04).'],
  ['Our Team', 'Headed "Our Leadership Team", titled "Executive Team". Founder bio, then three advisers.', 'The founder\'s bio is strong. Advisers have no names as headings, roles or links (F-14).'],
  ['From the Field', 'The menu now opens the article index, which has a proper header.', 'Identical covers, "Uncategorized", wrong byline (F-13).'],
  ['Contact', 'No page links to it. Three-field form and a LinkedIn badge.', 'No email, phone or location (F-06).'],
  ['Immigration', 'Linked from one service card. Five paragraphs.', 'Wording goes further than the service card on legal advice (F-15). No next step.'],
  ['Join Our Team', 'No page links to it. Long recruiting page for associates.', 'Drop-cap fault, all-caps headings, the only place the email address appears (F-18).'],
] as const

export const WORKS = [
  ['The 18 November edits went in the right direction.', 'The broken section is gone, there is one service list and one process, the menu leads to the articles, and page headers are consistent. The fixes below build on that work.'],
  ['One action, named the same way, in four places.', '"Schedule a Confidential Conversation with Prue" appears under the hero, after the FAQ and in the closing banner, and always opens the same 30-minute booking page. The word "confidential" is exactly right for this buyer.'],
  ['The FAQ answers real questions in a real voice.', '"Start with the work, not the technology." "We\'re not here to produce lengthy reports and walk away." Eight questions an owner would actually ask, including cost.'],
  ['The founder\'s story is specific.', '25+ years, executive studies at MIT Sloan, known for the ability to "see around corners", and a clear statement that her greatest strength is listening.'],
  ['How We Work is concrete.', 'Assess, Listen, Redesign, Implement, Sustain, and "Just the help you need, when you need it". It deserves a place on the homepage.'],
  ['Every homepage image has alt text,', 'including the two banners, whose alt text carries their headline. A skip link, `lang="en-US"`, a canonical URL and a viewport tag are all present.'],
  ['`robots.txt` allows everything,', 'including AI crawlers, and Yoast produces a full sitemap. The plumbing for being found is in place; the content is what is missing.'],
  ['There is a real publishing habit.', 'Thirteen articles, most of them substantial and written from experience. Few advisory firms of this size have that.'],
] as const

export const FIRST_FIVE = [
  ['Make the hero real text.', 'One `h1`, one standfirst, the proof line and the button, set in HTML over the existing wave artwork. This fixes the phone experience, the missing heading and the weakest search signal in one change.', 'F-01'],
  ['Put the testimonials back, in a form people can read.', 'A static set with names, roles and photographs, on the homepage and the About page. They existed a week ago; this is an afternoon\'s work.', 'F-02'],
  ['Compress two images.', 'The new banner (874 KB) and the logo (566 KB) are on every page. Re-exporting them removes about 1.3 MB per page and most of the slowdown.', 'F-11'],
  ['Give every page a next step, and link the orphans.', 'The same booking button at the end of each page. How We Work and Contact in the menu. The email address on the Contact page and in the footer. Then purge the cache.', 'F-04'],
  ['Switch the site address to https and fix the cyan buttons.', 'Two settings changes and a CSS regeneration clear the blocked-stylesheet errors; navy text on the cyan buttons takes them from 1.92:1 to about 9:1.', 'F-07'],
] as const

export const SITEMAP = [
  ['Home', 'The promise in live text, the situations the firm helps with, how it works, Prue, proof, questions, the next step.', 'Convince & route', true],
  ['How we help', 'The seven services, grouped by the situation the owner is in, each with a short page.', 'Qualify', false],
  ['Who we work with', 'The three kinds of client, with what each typically needs and an example.', 'Qualify', false],
  ['How we work', 'Assess, Listen, Redesign, Implement, Sustain, and the promise that you only take the steps you need.', 'Reassure', false],
  ['About', 'Prue\'s story and photograph, then the three advisers with names, roles and links.', 'Trust', false],
  ['From the Field', 'The articles, each with its own headline, category and the founder\'s byline. Signup at the top.', 'Authority', true],
  ['Contact', 'Booking link, email address, region served, and a short form that says what happens next.', 'Convert', true],
] as const

export const ROLLOUT = [
  ['Day one — finish what the edits started.', 'Purge the cache. Compress the banner and the logo. Set both WordPress addresses to https and regenerate the builder CSS. Add How We Work and Contact to the menu. Put the email address on the Contact page and in the footer.'],
  ['Week one — restore the case.', 'Rebuild the hero as live text. Bring the testimonials back as a static set. Put a summary of services and the process on the homepage. Add the booking button to the end of every page. Write a title and description for each page.'],
  ['Weeks two and three — rebuild the homepage.', 'Design and build a new homepage in the direction previewed in section 10: situations, process, founder, testimonials, FAQ with markup, closing action. Fix the cyan buttons and heading structure site-wide as part of it.'],
  ['Weeks three to five — bring the other pages into line.', 'A short page for each service. Who We Work With expanded. Advisers get names, roles and links. Articles get headlines, categories, the right byline and distinct covers. Immigration wording reviewed with counsel.'],
  ['Ongoing — earn the proof.', 'Ask each client at the end of an engagement for two sentences about the decision Prue helped with. Publish one article a month under her name and link it from LinkedIn to the site, not the other way round.'],
] as const
