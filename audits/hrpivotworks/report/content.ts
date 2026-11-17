// HR Pivot Works — audit content. Every number here was measured on the live
// site on 17–18 November 2026 (see Method). Inline markup: `code`, **bold**, *em*.
import type { Finding } from '../../../src/report'
import type { Pin, MiniPin } from '../../../src/report/stages'

export const SLUG = 'hrpivotworks'
export const URL = 'hrpivotworks.com'
export const DATE = '18 November 2026'

export const FINDINGS: Finding[] = [
  {
    id: 'F-01', sev: 'critical', fw: 'WCAG 1.4.5 Images of text · 1.4.4 Resize text · Findability',
    title: 'The headline, the promise and the proof line are a JPEG',
    observed: 'The homepage hero is one image, `when-business-gets-complicated-banner-v2.jpg` (1,439 × 612 px). The eyebrow, the headline "When Business Gets Complicated, Experience Matters.", the tagline and two paragraphs are pixels inside it. The page has **0 `h1` elements**; the first real heading is an `h3`, "How We Help". On a 390 px phone the image renders at 358 × 152 px, a quarter of its designed size, which puts the two body lines at roughly 7–8 px. The closing banner, "Not Sure Where to Start? Let\'s Talk.", is built the same way.',
    impact: 'The single most important sentence on the site cannot be read on a phone without pinching, cannot be selected, translated or enlarged, and does not reflow. Search engines and AI assistants get it only as alt text. A founder arriving from LinkedIn on a phone sees a small lavender picture and a button.',
    fix: 'Set the hero as live text: one `h1` for the headline, a standfirst paragraph, the proof line, and the button directly under it. Keep the wave artwork as a background. Do the same for the closing banner. The proposed page in section 09 shows it built.',
  },
  {
    id: 'F-02', sev: 'critical', fw: 'Content strategy · N4 Consistency and standards',
    title: 'Three different service lists and two different ways of working',
    observed: 'The homepage lists **8 services** (Leadership & People Risk Advisory, Fractional & Interim Chief People Officer Leadership, AI People Risk & Organizational Readiness…). The Our Services page lists **6 different ones** (Business & Workforce Intelligence, Business & Leadership Advisory, AI & Workflow Transformation…). A third list of 6 (HR & AI Risk Advisory, Compliance and Risk Mitigation, Immigration Advisory…) is still in the homepage source, hidden. No service name appears on more than one list. The process has the same problem: the homepage gives five steps (Set the Direction, Map the Work, Access Capacity, Redesign Work, Implement & Improve); the How We Work page gives five others (Assess, Listen, Redesign, Implement, Sustain).',
    impact: 'A buyer who reads two pages cannot say what the firm sells or how an engagement runs. For an advisory whose product is clear judgement, three versions of the offer reads as the opposite. It also splits every search signal across twenty service names.',
    fix: 'Choose one list and one process, and use them word for word on every page. Organise the list around the situation the owner is in (a hard people decision, senior People leadership without a full-time hire, AI changing the work, growth or restructuring), then name the service under each. Delete the hidden blocks from the homepage.',
  },
  {
    id: 'F-03', sev: 'critical', fw: 'Visual craft · Layout · N8 Aesthetic and minimalist design',
    title: 'The middle of the homepage renders without a layout',
    observed: 'From "OUR SERVICES" to "Testimonials", roughly 1,400 px of the desktop page, the content has no container, no padding and no columns. Headings and paragraphs start at x = 0, flush against the left edge of the window, and run the full 1,440 px width. Eight services stack as bare heading-and-paragraph pairs with no spacing between them. On a phone the same text touches the screen edge. The sections above and below (dark cards, FAQ) are laid out normally. Loading the page\'s blocked stylesheets over HTTPS (see F-07) did not change it, so this is the section\'s own styling, not a network fault. The page was last modified on 17 November 2026, so it may be mid-edit.',
    impact: 'This is the part of the page that says what the firm does, and it is the part that looks broken. A visitor who scrolls past the hero meets a wall of edge-to-edge text in a different visual language from the rest of the site.',
    fix: 'Put the section in the same container as the rest of the page (max-width about 1,100 px, 24 px side padding on phones), set the services as a grid of cards or a two-column list with clear spacing, and check the result at 390, 768 and 1,440 px before publishing.',
  },
  {
    id: 'F-04', sev: 'major', fw: 'IA · N6 Recognition over recall · Findability',
    title: '"From the Field" opens a signup form; the 13 articles have no link',
    observed: 'The fifth navigation item, "From the Field", points to `/#leadership`, which scrolls the homepage to the newsletter signup form. The articles themselves live at `/blog/` (13 posts in the sitemap). Across the 10 pages sampled there are **0 links to `/blog/`**. The Contact page, the Immigration page and the Join Our Team page are also absent from the navigation and footer; How We Work is reachable only from one button on the homepage.',
    impact: 'The firm\'s best evidence of how it thinks, thirteen first-person articles, can be reached only from a search engine or a newsletter email. A visitor who clicks the label expecting to read is asked for an email address instead.',
    fix: 'Point "From the Field" at `/blog/` and put the signup form at the top of that page and at the end of each article. Add Contact to the navigation and How We Work to the services page. Give the footer real links to every page.',
  },
  {
    id: 'F-05', sev: 'major', fw: 'Trust & credibility · Conversion',
    title: 'The proof describes a recruiter from twenty years ago',
    observed: 'Five testimonials sit in a carousel that shows one at a time. Their content: "Prudence cold-called me for a job at Northern Light 20+ years ago… a very successful recruiter and HR Director"; "helped us with recruiting in a very challenging market"; "a wealth of experience in recruiting". The sixth slide is not a testimonial: it is the firm\'s own note offering "additional testimonials… upon request", signed Prudence Sinclair, with the company logo in the headshot slot. There are no client names, sectors, situations or outcomes anywhere on the site.',
    impact: 'The site sells a strategic adviser to founders and CEOs. The evidence it offers is for recruiting and HR operations, from named people who are real and credible but are speaking about a different job. The strongest proof the firm says it has, from CEOs, CFOs and COOs, is held back behind a request.',
    fix: 'Show the five quotes together, statically, with name, role and photo, so they can be read and compared. Lead with the ones that speak to judgement under pressure (McCray, Krellenstein). Ask two or three recent clients for a sentence about a decision Prue helped them make, and publish them, anonymised by role and sector if they prefer. Remove the sixth slide.',
  },
  {
    id: 'F-06', sev: 'major', fw: 'Conversion · N10 Help and documentation',
    title: 'The Contact page has no contact details',
    observed: 'The page holds a heading, a three-field form (name, email, optional message) and a LinkedIn badge. There is no email address, no telephone number and no location. The firm\'s address, `prue@hrpivotworks.com`, appears only on the Join Our Team page. The source also carries a second, hidden copy of the form and a hidden Google Maps embed searching for "United State". The page is not linked from the navigation or the footer.',
    impact: 'An owner with a sensitive problem often wants to write a private email or see where the adviser is based before booking a call. Neither is possible. The business cannot be placed geographically at all, which matters for employment and immigration work.',
    fix: 'Put the email address, the scheduling link and the region served on the Contact page, in the footer of every page, and in the site\'s structured data. Remove the hidden form and map. Say what happens after the form is sent and how quickly.',
  },
  {
    id: 'F-07', sev: 'major', fw: 'Platform · Security · N1 Visibility of system status',
    title: 'Five stylesheets are requested over http and blocked on every page',
    observed: 'Every page sampled requests five stylesheets from `http://hrpivotworks.com/…` (`base-desktop.css`, `base-mobile.css` and three font files). Browsers block them as mixed content and log an error for each; this happened on **10 of 10 pages**, desktop and mobile. The sitemap lists every URL as `http://`, and the footer LinkedIn icon links to `http://linkedin.com`. All of this points at the WordPress address being stored as `http`.',
    impact: 'Styles the builder expects to be present are silently missing, which makes layout faults harder to diagnose. Search engines are handed 100% redirecting URLs in the sitemap. No response carries HSTS, so the first request can still travel unencrypted.',
    fix: 'In WordPress Settings → General set both addresses to `https://hrpivotworks.com`. In Elementor → Tools run Replace URL (http → https) and Regenerate CSS. Resave the Yoast sitemap. Add an HSTS header at the host.',
  },
  {
    id: 'F-08', sev: 'major', fw: 'WCAG 1.4.3 Contrast (minimum)',
    title: 'White text on the brand cyan measures 1.92:1',
    observed: 'Buttons "Explore Our Services", "About Us", "Schedule Time With Prue", "Schedule a Call" and "SEND" set white text on cyan `#36CCE6`: **1.92:1** against a 4.5:1 requirement. The word "work" in the heading "How we work" is cyan on white, also 1.92:1. On the blog, "Read More" is tan `#CDAB85` on white at 12 px (2.15:1) and excerpts are `#777` (4.48:1). The footer link is `#046BD2` on near-black (3.48:1).',
    impact: 'The secondary buttons on every page are hard to read for anyone with low vision, in sunlight, or on a dim phone. They are the route to the services and the booking link.',
    fix: 'Keep cyan as a fill only with navy `#0B1033` text (about 9:1), or use it as an accent on dark surfaces. For text on white use the brand purple `#5B2D8E` (about 9:1). Darken blog meta text to at least `#595959` and raise it to 14 px.',
  },
  {
    id: 'F-09', sev: 'major', fw: 'Findability · SEO · AI discovery',
    title: 'Eight of ten pages have no description, and the homepage is titled "Home"',
    observed: 'The homepage `<title>` is "Home - HR Pivot Works". **8 of 10** sampled pages have no meta description, including Home, Our Services, About and Contact. The homepage share text is auto-scraped and begins "Schedule a Confidential Conversation › How We Help Experienced advice…". The Executive Team page\'s description is "HR Pivot Works - Founder\'s Story - Prudence Sinclair". Structured data is the Yoast default; the eight FAQ answers are not marked up as `FAQPage`, and there is no `Person` entry for the founder.',
    impact: 'Google and LinkedIn write their own snippets from whatever text comes first, which is a button label. The FAQ, which answers exactly what owners search for ("how much does it cost", "is it suitable for a small business"), is invisible as a rich result and harder for assistants to quote.',
    fix: 'Title: "HR Pivot Works — independent advice for founders and CEOs on people, leadership and change". Write a 150-character description for each page. Add `FAQPage` markup to the questions and a `Person` entry for Prudence Sinclair linked to her LinkedIn profile.',
  },
  {
    id: 'F-10', sev: 'major', fw: 'WCAG 1.3.1 Info and relationships · 2.4.6 Headings and labels · 2.4.1 Bypass blocks',
    title: 'No h1 on eight pages, no main landmark, placeholder headings in the source',
    observed: '**8 of 10** pages have no `h1`; page titles such as "OUR SERVICES" and "EXECUTIVE TEAM" are `h2`. The blog article has two `h1` elements with the same text. The homepage outline starts at `h3`, contains three hidden headings that read "Info Card", and two empty `h3` elements. No page has a `<main>` landmark; the skip link targets `#content`.',
    impact: 'Screen-reader users who navigate by heading or landmark get no page title and a jumbled outline, and can land on placeholder text. Search engines get no primary topic for most pages.',
    fix: 'One `h1` per page carrying its title, `h2` for sections, `h3` inside them. Delete the hidden and empty headings. Wrap page content in `<main id="content">`.',
  },
  {
    id: 'F-11', sev: 'major', fw: 'Performance · Platform',
    title: 'A 566 KB logo on every page, and 77 requests to draw the homepage',
    observed: 'The header logo is served as a 1,024 × 683 px PNG weighing **566 KB** and shown at 168 × 84 px. The homepage makes **77 requests**, including 34 stylesheets and 30 scripts; other pages make 57–74. Time to first byte ranged from 1.1 s to 2.2 s across 20 loads. Largest Contentful Paint on desktop ranged from 2.8 s to 4.9 s; on the mobile profile it reached 8.6 s on About and 6.9 s on How We Work. The article cover image is a 1.1 MB PNG. Layout shift was near zero on every page but the blog (0.12 on mobile).',
    impact: 'Half a megabyte is spent on a logo before any content loads, on every visit. The server is slow to answer, and Google\'s "good" threshold for Largest Contentful Paint is 2.5 s, which no desktop page met in this run.',
    fix: 'Replace the logo with an SVG or a 336 px-wide WebP (under 15 KB). Convert article covers to WebP at display size. Turn on page caching at the host and remove unused plugins and Elementor widgets to cut the stylesheet and script count.',
  },
  {
    id: 'F-12', sev: 'major', fw: 'Mobile · WCAG 2.5.8 Target size · Conversion',
    title: 'On a phone the header loses its button and the small targets get smaller',
    observed: 'At 390 px the header "Let\'s Talk" button is removed, leaving a logo and a menu icon; the open menu lists five pages and no way to book or make contact. The testimonial carousel\'s position dots are **6 × 6 px** and its arrows 25 × 25 px. Footer links (Disclaimer, Terms & Conditions, Cookies) are 18–19 px tall and the LinkedIn icon is 18 × 18 px. A single testimonial in 21 px italic fills most of a screen. The homepage is 7,162 px tall on a phone.',
    impact: 'After the first screen there is no persistent way to act on a phone. Carousel controls that small cannot be hit reliably, so most phone visitors will read one testimonial at most.',
    fix: 'Keep a compact booking button in the mobile header. Replace the carousel with a static list. Make every target at least 44 × 44 px with 8 px between neighbours. Set testimonial text at 16–17 px upright.',
  },
  {
    id: 'F-13', sev: 'major', fw: 'Content · Credibility · Editorial',
    title: 'Ten articles share one cover, eight are "Uncategorized", and the byline is not the author',
    observed: 'The article index shows ten cards with the same cover image, cropped so the title reads "EADERSHIP". **8 of 10** carry the category label "UNCATEGORIZED". Several titles are issue labels rather than headlines ("Leadership & People Insight – May 2026 – HR Pivot Works"). The article sampled is written in the first person by the founder ("Over the years I\'ve worked with founders…") but is bylined "Ranjika". Comments are open and empty. Card text is 12 px.',
    impact: 'The writing is the strongest material on the site and the index makes it look like ten copies of one post. A first-person leadership article signed by someone else undercuts the authority it is meant to build.',
    fix: 'Give each article its own headline as the title and a distinct cover or a typographic card. Assign every post to one of three or four categories. Set the author to Prudence Sinclair with a short bio and photo. Turn comments off.',
  },
  {
    id: 'F-14', sev: 'major', fw: 'Trust & credibility · WCAG 1.1.1 Non-text content',
    title: 'Three advisers have a photo and a paragraph, but no name, title or link',
    observed: 'On the team page, Marc Krellenstein, Galen Schreck and Ellen Loth each appear as a circular photo followed by body text. Their names occur only inside the first sentence; there is no heading, no role in the firm and no link to a profile. All three photos have empty alt text. The page is "Our Team" in the navigation and "Executive Team" in its title and heading.',
    impact: 'A visitor scanning the page cannot tell who the people are or what they do here. Their backgrounds (Forrester Research, a founder of Northern Light) are real credibility that is easy to miss.',
    fix: 'Give each person a heading with their name, a one-line role ("Adviser, AI and organisational behaviour"), a two-sentence bio and a LinkedIn link. Add alt text. Use one name for the page everywhere.',
  },
  {
    id: 'F-15', sev: 'major', fw: 'Content · Legal risk',
    title: 'The Immigration page reads as legal advice and has no next step',
    observed: 'The page states that the firm is "dedicated to determining an employee\'s legal eligibility to work and reside in the country" and that "we specialize in immigration status, offering expert advice and assistance to help CEOs navigate the complexities of immigration legal requirements". The homepage describes the same service more carefully: coordinating matters and working "with qualified legal counsel when specialized legal advice is required". The page has one heading, five paragraphs, no button and no link, and is not in the navigation.',
    impact: 'Two descriptions of the same service differ on the point that matters most: whether the firm gives legal advice. That is worth a lawyer\'s read. The page also leaves an interested reader with nowhere to go.',
    fix: 'Rewrite the page in the homepage\'s terms: what the firm does (workforce planning, coordination, working alongside counsel) and what it does not (legal advice). Add the booking button and link the page from the services list.',
  },
  {
    id: 'F-16', sev: 'minor', fw: 'N2 Match with the real world · N4 Consistency',
    title: 'Navigation labels and page names disagree, and the descriptor changes',
    observed: '"Our Services" opens a page titled "How We Help" with the heading "OUR SERVICES". "Our Team" opens "Executive Team". "From the Field" is elsewhere called "Leadership & People Insight". The firm describes itself as "Independent Advisory" in the hero image and "Strategic Business, Leadership & Workforce Advisory" in the logo.',
    impact: 'Each mismatch is small; together they make the site feel assembled at different times. Shared links and browser tabs show a different name from the one clicked.',
    fix: 'One name per page, used in the navigation, the title, the heading and the URL. One descriptor under the logo, repeated in the title tag and on LinkedIn.',
  },
  {
    id: 'F-17', sev: 'minor', fw: 'Forms · Conversion',
    title: 'The newsletter form is the second thing on the page and asks for three fields',
    observed: 'Directly under the two intro cards, before any service is named, the homepage asks for first name, last name and email. The Last Name field carries an envelope icon. Articles use a second, differently styled signup form from another provider.',
    impact: 'A first-time visitor is asked to subscribe before learning what the firm does. Each extra field lowers completion, and two form systems mean two lists to reconcile.',
    fix: 'Move the signup to the articles section and the article pages. Ask for email only, or first name and email. Use one provider and one form design.',
  },
  {
    id: 'F-18', sev: 'minor', fw: 'Visual craft · Content',
    title: 'The Join Our Team page has a drop-cap fault and reads as a different site',
    observed: 'The first letter of several paragraphs is rendered small and cyan and detached from its word ("D o You Have Grit", "J oin our vibrant"). Headings are all capitals ("WHY CHOOSE WORK WITH US?"). The imagery is stock photography. The page is not linked from the navigation or footer.',
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
    title: 'Small errors in visible copy',
    observed: 'The third process step on the homepage is "Access Capacity", where the text describes assessing it. The hidden map searches for "United State". "WHY CHOOSE WORK WITH US?" has an extra word. The homepage uses 16 different size-and-weight combinations of one typeface, and long paragraphs are centred on the How We Work and Join pages.',
    impact: 'Each one is trivial. On a site whose promise is experienced judgement and attention, they are noticed.',
    fix: 'Correct the three strings. Reduce the type scale to five or six steps and left-align any paragraph longer than two lines.',
  },
]

export const SCORES = [
  { label: 'Clarity of the offer', value: 30 },
  { label: 'Visual craft & layout', value: 30 },
  { label: 'Findability (search / AI)', value: 32 },
  { label: 'Proof & credibility', value: 36 },
  { label: 'Accessibility & mobile', value: 38 },
  { label: 'Conversion path', value: 58 },
]
export const SCORE_TOTAL = 37

// [framework, critical, major, minor] — sums to the findings above
export const FRAMEWORKS = [
  ['Business, content & conversion', 1, 5, 2],
  ['Information architecture & findability', 0, 2, 1],
  ['WCAG 2.2 AA / accessibility & mobile', 1, 3, 0],
  ['Visual craft, platform & performance', 1, 2, 2],
] as const

export const LIVE_PINS: Pin[] = [
  { n: 1, x: 50, y: 36, ids: ['F-01', 'F-10'], text: 'The whole hero is one image. No `h1`; the first heading on the page is an `h3`.' },
  { n: 2, x: 10, y: 4.8, ids: ['F-11'], text: 'The logo is a 566 KB PNG, 1,024 px wide, shown at 168 px.' },
  { n: 3, x: 65, y: 4.8, ids: ['F-04'], text: '"From the Field" scrolls to a signup form. The 13 articles are not linked.' },
  { n: 4, x: 91.7, y: 4.8, ids: ['F-12'], text: 'The only persistent button; it is removed from the header on phones.' },
  { n: 5, x: 50, y: 66.9, ids: ['F-08'], text: 'The primary button reads well. The cyan secondary buttons below it measure 1.92:1.' },
  { n: 6, x: 30, y: 84.5, ids: ['F-02'], text: '"How We Help" here; "Our Services" in the menu; three different lists behind them.' },
]
export const MOBILE_PINS: MiniPin[] = [
  { n: 1, x: 50, y: 21 },
  { n: 4, x: 90, y: 5 },
]

export const PAGES = [
  ['Home', '5,517 px desktop, 7,162 px phone. Hero image, two cards, newsletter form, services, process, testimonials, FAQ, closing banner.', 'Hero is an image (F-01). Services section unstyled (F-03). Signup asked for before the offer is explained (F-17). The FAQ is the best-written part of the site.'],
  ['Our Services', 'Titled "How We Help". Six service cards on a dark ground.', 'Clean and readable, but a different list from the homepage (F-02). No button, no link onward.'],
  ['How We Work', 'Five numbered steps, a flexibility statement, a contact form.', 'The clearest page on the site. Different steps from the homepage (F-02). Reachable only from one homepage button (F-04).'],
  ['About Us', 'Seven paragraphs on a dark ground under a stock handshake photo.', 'Good voice ("being at the top can be lonely"). No photo of the founder, no button, no link to the team.'],
  ['Our Team', 'Titled "Executive Team". Founder bio, then three advisers.', 'The founder\'s bio is strong. Advisers have no names as headings, roles or links (F-14).'],
  ['From the Field', 'Menu item scrolls to the homepage signup. Articles live at `/blog/`.', '13 articles with no link from the site (F-04). Identical covers, "Uncategorized", wrong byline (F-13).'],
  ['Contact', 'Not in the menu. Three-field form and a LinkedIn badge.', 'No email, phone or location (F-06).'],
  ['Immigration', 'Not in the menu. Five paragraphs.', 'Wording goes further than the homepage on legal advice (F-15). No next step.'],
  ['Join Our Team', 'Not in the menu. Long recruiting page for associates.', 'Drop-cap fault, all-caps headings, the only place the email address appears (F-18).'],
] as const

export const WORKS = [
  ['One action, named the same way, in four places.', '"Schedule a Confidential Conversation" appears under the hero, after the FAQ and in the closing banner, and always opens the same 30-minute booking page. The word "confidential" is exactly right for this buyer.'],
  ['The FAQ answers real questions in a real voice.', '"Start with the work, not the technology." "We\'re not here to produce lengthy reports and walk away." Eight questions an owner would actually ask, including cost. The rebuild moves this voice to the top of the page.'],
  ['The testimonials are from named, findable people', 'with photographs and roles. They need re-ordering and company, not replacing.'],
  ['The founder\'s story is specific.', '25+ years, executive studies at MIT Sloan, known for the ability to "see around corners", and a clear statement that her greatest strength is listening.'],
  ['Every homepage image has alt text,', 'including the two banners, whose alt text carries their headline. A skip link, `lang="en-US"`, a canonical URL and a viewport tag are all present.'],
  ['`robots.txt` allows everything,', 'including AI crawlers, and Yoast produces a full sitemap. The plumbing for being found is in place; the content is what is missing.'],
  ['Layout shift is near zero', 'on nine of ten pages, and nothing overflows horizontally at 390 px.'],
  ['There is a real publishing habit.', 'Thirteen articles, most of them substantial and written from experience. Few advisory firms of this size have that.'],
] as const

export const FIRST_FIVE = [
  ['Make the hero real text.', 'One `h1`, one standfirst, the proof line and the button, set in HTML over the existing wave artwork. This fixes the phone experience, the missing heading and the weakest search signal in one change.', 'F-01'],
  ['Repair the services section of the homepage.', 'Give it the same container and spacing as the rest of the page and delete the hidden blocks and "Info Card" placeholders. An hour in the page builder.', 'F-03'],
  ['Agree one service list and one process.', 'Decide the names once, then paste them into the homepage, the services page and the How We Work page so all three match.', 'F-02'],
  ['Open the doors that are closed.', 'Point "From the Field" at the articles. Add Contact to the menu. Put `prue@hrpivotworks.com` and the region served on the Contact page and in the footer.', 'F-04'],
  ['Switch the site address to https and fix the cyan buttons.', 'Two settings changes and a CSS regeneration clear ten blocked-stylesheet errors per visit; navy text on the cyan buttons takes them from 1.92:1 to about 9:1.', 'F-07'],
] as const

export const SITEMAP = [
  ['Home', 'The promise in live text, the four situations, how it works, Prue, proof, questions, the next step.', 'Convince & route', true],
  ['How we help', 'One service list, grouped by the situation the owner is in. Immigration and compliance sit here, worded with counsel.', 'Qualify', false],
  ['How we work', 'Assess, Listen, Redesign, Implement, Sustain, and the promise that you only take the steps you need.', 'Reassure', false],
  ['About', 'Prue\'s story and photograph, then the three advisers with names, roles and links.', 'Trust', false],
  ['From the Field', 'The articles, each with its own headline, category and the founder\'s byline. Signup at the top.', 'Authority', true],
  ['Contact', 'Booking link, email address, region served, and a short form that says what happens next.', 'Convert', true],
  ['Join us', 'For associates. Linked from the footer, in the same template.', 'Recruit', false],
] as const

export const ROLLOUT = [
  ['Day one — fix what is broken.', 'Set both WordPress addresses to https and regenerate the builder CSS. Repair the homepage services section. Point "From the Field" at `/blog/`. Add the email address to the Contact page and footer. Replace the 566 KB logo.'],
  ['Week one — say one thing.', 'Agree the single service list and the single process. Rebuild the hero as live text. Write a title and description for every page. Correct the Immigration page wording with counsel.'],
  ['Weeks two and three — rebuild the homepage.', 'Build the proposed landing page in section 09 on the existing platform: situations, process, founder, static testimonials, FAQ with markup, closing action. Fix the cyan buttons and heading structure site-wide as part of it.'],
  ['Weeks three to five — bring the other pages into line.', 'Services, How We Work, About and Contact in the same template. Advisers get names, roles and links. Articles get headlines, categories, the right byline and distinct covers.'],
  ['Ongoing — earn the proof.', 'Ask each client at the end of an engagement for two sentences about the decision Prue helped with. Publish one article a month under her name and link it from LinkedIn to the site, not the other way round.'],
] as const
