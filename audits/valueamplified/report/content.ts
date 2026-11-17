// Value Amplified — audit content. Every number was measured on the live site
// on 18 November 2026 (see Method). Inline markup: `code`, **bold**, *em*.
import type { Finding } from '../../../src/report'
import type { Pin, MiniPin } from '../../../src/report/stages'

export const SLUG = 'valueamplified'
export const URL = 'www.valueamplified.com'
export const DATE = '18 November 2026'

export const FINDINGS: Finding[] = [
  {
    id: 'F-01', sev: 'critical', fw: 'Trust & credibility · Conversion',
    title: 'The founders are the proof, and the homepage does not name them',
    observed: 'The homepage says "Our founders led Scrum.org for more than a decade" and "We\'ve led product and delivery teams at IBM, Rational Software, Tasktop". It never says who. Dave West and Eric Naiburg are named, pictured and described only on the About page. Across the 12 pages reviewed there are **0 testimonials, 0 client names, 0 case studies and 0 outcomes**; the only figures are on About (30+ years, 11 years leading Scrum.org, 18 months of research).',
    impact: 'A head of product or engineering deciding whether to bring in an advisory wants to know who would be in the room. The firm\'s strongest asset, a former CEO and COO of Scrum.org, reads on the first page as an anonymous "we". With no client evidence yet, the people are the only proof available, and it is one click away.',
    fix: 'Put both founders on the first screen of the homepage: photographs, names, and one line each ("CEO of Scrum.org for more than a decade"). Add Dr. Alan Brown under "grounded in research". As engagements complete, add two or three short client statements; until then, quote what the research has found.',
  },
  {
    id: 'F-02', sev: 'critical', fw: 'Conversion · N3 User control and freedom',
    title: 'The first screen offers two things to read and no way to start',
    observed: 'The two buttons in the hero are "Research" and "Recent Blogs". The header holds five links (Home, About, Services, Blog, Research) and no button; there is no Contact item and no contact page. The homepage\'s only route to the firm is "Get in touch" at 2,970 px of a 3,287 px page, and it opens the visitor\'s mail program. The three service cards sit below the first screen.',
    impact: 'A visitor who is ready to talk has to scroll to the bottom of the page and then leave the site for their email client. Many work machines have no mail program configured, so the button does nothing. The hero sends the warmest visitors away from the services and into the reading list.',
    fix: 'Put one button, "Get in touch", in the header on every page and make it the primary button in the hero, with "See how we help" beside it. Point every "Get in touch" at the same short form. Keep Research and Blog in the menu, where they already are.',
  },
  {
    id: 'F-03', sev: 'major', fw: 'Performance · WCAG 4.1.2 Name, role, value',
    title: 'The Keynotes page loads 16 video players and 21 MB',
    observed: 'The Keynotes, Conversations & Facilitation page embeds **16 YouTube players**. Loading and scrolling it made **569 requests and transferred 21.1 MB**, of which 17.5 MB was script. The other pages reviewed transferred 2.9 to 3.8 MB. None of the 16 frames has a title, so each is announced to a screen reader only as "frame".',
    impact: 'This is the page an event organiser opens to judge a speaker, often on a phone or conference wifi. It is the heaviest page on the site by a factor of five, and the recordings are indistinguishable to anyone not looking at them.',
    fix: 'Show each recording as a still image with a play button and load the player only when it is clicked. Give every one a title ("Dave West: The Future of Scrum, 2024"). Lead with three recordings and link to the rest.',
  },
  {
    id: 'F-04', sev: 'major', fw: 'Performance · Platform',
    title: 'Every page costs about 300 requests and 3 MB',
    observed: 'The homepage made **300 requests** and transferred 3.8 MB, including 186 scripts totalling 2.8 MB. The HTML document alone is 2.3 MB uncompressed. Other pages made 283 to 335 requests. On a phone profile the homepage\'s first load painted its headline at 4.5 s and finished loading at 7.5 s; repeat loads were much faster because the platform caches aggressively. Layout shift was near zero everywhere.',
    impact: 'The first visit, which is the one that matters for someone arriving from LinkedIn or a search, is the slow one. Google\'s "good" threshold for the largest paint is 2.5 s. Most of the weight is the site builder\'s own runtime, which limits how much can be recovered.',
    fix: 'Remove unused apps and widgets from the site (each adds scripts to every page), keep the blog and member features only where they are used, and replace decorative animated elements with static ones. Re-measure with field data from Search Console once the site has traffic.',
  },
  {
    id: 'F-05', sev: 'major', fw: 'WCAG 1.3.1 Info and relationships · 2.4.6 Headings and labels · Findability',
    title: 'On the service pages the label is the h1 and the headline is an h2',
    observed: 'On all five service pages the `h1` is the small capitalised label ("ONE-DAY TEAM AI PROCESS WORKSHOP FOR AGILE TEAMS", 27 px) and the real headline ("Your team doesn\'t need another framework…", about 50 px) is an `h2`. On the homepage "Join the Inner Circle" is an `h3` at 45 px while "WORK WITH US" is an `h2` at 16 px. The research paper has 42 headings whose levels begin at `h6` and alternate between `h5` and `h6` for long runs. On the research index both cards carry the heading "White Paper".',
    impact: 'Heading levels are how screen-reader users skim a page and one of the ways search engines weigh it. Here the levels follow visual styling choices, so the outline reads out of order and the most persuasive sentence on each service page is demoted.',
    fix: 'Make the headline the `h1` on each service page and set the label as plain text above it. Use `h2` for sections and `h3` within them, chosen by structure, then style them as needed. Give each research card its paper\'s title as the heading.',
  },
  {
    id: 'F-06', sev: 'major', fw: 'Mobile · Conversion · Visual hierarchy',
    title: 'On a phone the headline comes second and the buttons sit under the consent banner',
    observed: 'At 390 px the purple "WHAT WE DELIVER" box is placed above the headline, so the `h1` starts 410 px down the first screen. The cookie banner then covers the bottom 211 px, a quarter of the screen. The two hero buttons fall at about 717 px and 787 px, underneath it. A first-time phone visitor sees a logo, three bullet phrases and the top of the headline.',
    impact: 'The site\'s best line, "AI amplifies what you already do, so choose what it amplifies", is half-hidden on the device most people will first see it on, and nothing on the first screen can be tapped except the menu and the consent buttons.',
    fix: 'On small screens put the headline first, then the standfirst and the primary button, and move the deliverables below. Use the consent tool\'s compact bottom bar so it covers no more than about 100 px.',
  },
  {
    id: 'F-07', sev: 'major', fw: 'Content strategy · N4 Consistency and standards',
    title: 'Three services on the homepage, four everywhere else, under three sets of names',
    observed: 'The homepage shows three services. The Services page is headed "Four ways to work with us" and the menu lists four: Product Marketing Workshops for Growth is missing from the homepage. The same workshop is called "AI Process Workshop for Agile Teams" on the homepage, "One-Day Team AI Process Workshop" in the menu and "One-Day Team AI Process Workshop for Agile Teams" on its own page. The talks are "Keynotes, Conversations and Facilitation" in one place and "Keynotes, Conversations & Facilitation" in another.',
    impact: 'A visitor comparing the homepage with the menu cannot tell whether there are three offers or four, or whether two names are the same thing. It also splits search signals for each service across several phrasings.',
    fix: 'Decide the four names once and use them identically in the menu, the homepage cards, the Services page, each page title and each `h1`. Show all four on the homepage.',
  },
  {
    id: 'F-08', sev: 'major', fw: 'Visual craft · Typography',
    title: 'The whole site is set in Verdana, in fifteen sizes',
    observed: 'Every text node on the homepage resolves to Verdana, a system font. It is not installed on Android, where the browser substitutes its default. The homepage uses **15 size-and-weight combinations**, including 15.75 px, 16.88 px and 20.25 px. The `h1` is 72 px bold in a column about 430 px wide, so it breaks into five lines of two or three words. Body text is 15.75 px grey.',
    impact: 'Verdana at display sizes is wide and heavy, which is why the headline needs five lines and the hero has no room for anything else. It gives a firm writing about the newest shift in software a look from an earlier decade, and Android visitors see a different typeface from everyone else.',
    fix: 'Choose one web font family that is served with the site, so it renders the same everywhere. Set a scale of six sizes (for example 16, 18, 22, 28, 40, 60 px). Widen the headline column so the `h1` sets in three lines.',
  },
  {
    id: 'F-09', sev: 'major', fw: 'Forms · Conversion · N4 Consistency',
    title: '"Get in touch" does two different things, and the forms are at the bottom of long pages',
    observed: 'On the homepage "Get in touch" opens an email. On the Services page the same words scroll to a form. Each service page ends with its own form, after 2,983 to 5,513 px of content on desktop and up to 10,465 px on a phone. The service forms require first name, last name, email and a free-text answer ("About your team*"). There is no telephone number, no calendar link, and the postal address appears only in the privacy policy.',
    impact: 'The same label behaving differently makes the site feel less dependable at the moment of commitment. A required essay question is the largest single cause of abandoned enquiry forms, and there is no lighter alternative for someone who only wants to ask a quick question.',
    fix: 'One enquiry form, reached from every "Get in touch". Ask for name, work email and an optional message, with the service pre-selected from the page it was opened on. Say when a reply will come and who it will come from.',
  },
  {
    id: 'F-10', sev: 'minor', fw: 'Findability · SEO',
    title: 'The homepage title starts with "Home" and the About description repeats itself',
    observed: 'The homepage `<title>` is "Home | Value Amplified AI product operating model". The About description reads "Meet Value Amplified founders Dave West and Eric Naiburg; see how Value Amplified founders Dave West and Eric…". The privacy page has no description. Structured data describes the firm as a `LocalBusiness` at a street address in Harrisburg, Pennsylvania; there is no `Organization` or `Person` entry for the founders.',
    impact: 'Search results show the first words of the title; "Home" wastes them. Repeated names in a description read as keyword stuffing. `LocalBusiness` tells search engines this is a walk-in premises, which is not how the firm works.',
    fix: 'Title: "Value Amplified | AI-era product delivery advisory". Rewrite the About description as one plain sentence. Change the schema type to `Organization` (or `ProfessionalService`) and add `Person` entries for the founders linked to their LinkedIn profiles.',
  },
  {
    id: 'F-11', sev: 'minor', fw: 'Trust & credibility · Content',
    title: 'The blog shows view counts of 6 and 13',
    observed: 'Each article card displays its view count, comment count and likes: for example "6 views, 0 comments, 3 likes" and "13 views, 0 comments". Comments are open on every article and none has any.',
    impact: 'On a new site small numbers are normal, but displaying them tells every visitor that few people have read the piece. It works against writing that is otherwise substantial.',
    fix: 'Turn off the view, comment and like counters in the blog settings, and turn comments off until there is an audience to moderate. Keep the reading time and date.',
  },
  {
    id: 'F-12', sev: 'minor', fw: 'Visual craft · Imagery',
    title: 'Service icons are small photographs in three styles, and the hero box is decoration',
    observed: 'The three service icons are 300 px JPEG images shown at about 64 px, each in a different illustration style, served from files named `ai-generated-IMAGE.jpg`. The purple hero panel holds three phrases beside coloured squares and a faint pattern, with roughly a third of its area empty. There is no photograph of a person on the homepage.',
    impact: 'Mismatched icons at a small size look soft and unconsidered next to careful copy. The hero\'s largest element carries the least information on the page.',
    fix: 'Replace the icons with one consistent vector set in the brand colours, or remove them and let the coloured top borders identify the cards. Use the hero panel for the founders or for the four services.',
  },
  {
    id: 'F-13', sev: 'minor', fw: 'WCAG 2.5.8 Target size · 2.4.4 Link purpose · Mobile',
    title: 'Footer links are 15 px tall on a phone and three links are all called "Learn more"',
    observed: 'At 390 px the footer text is 12 px and its links (Privacy, the email address) are 15 px tall; the LinkedIn icon is 24 × 24 px. The three "Learn more →" links on the homepage are 22 px tall and share the same text. On the blog index 37 pieces of text are below 14 px.',
    impact: 'Small targets are hard to hit accurately, and three identical link names are indistinguishable in a screen reader\'s list of links.',
    fix: 'Give every tappable item at least 44 × 44 px of target area. Make each card a single link named for its service ("About the one-day workshop"). Raise small text to at least 14 px.',
  },
  {
    id: 'F-14', sev: 'minor', fw: 'Visual craft · Privacy',
    title: 'The consent banner is the vendor default and mentions advertising',
    observed: 'The banner is a black panel with bright blue buttons and the vendor\'s logo, unlike anything else on the site. Its text says the site uses tracking "to display advertisements according to users\' interests". Before a choice was made, the page contacted only the site builder, an error-reporting service and the consent service itself, which is correct behaviour. Accept and Deny are given equal weight, which is also correct.',
    impact: 'The first thing a visitor reads is a third party\'s wording about advertising, on a site that appears to run none. It sets a tone the firm did not choose.',
    fix: 'Style the banner in the site\'s colours and typeface and rewrite its text to describe what is actually used. If no advertising or analytics cookies are set, say so, or remove the banner where the law allows.',
  },
  {
    id: 'F-15', sev: 'minor', fw: 'IA · N6 Recognition over recall',
    title: 'The footer has no links to the services, research or founders',
    observed: 'The footer on every page contains the logo, a copyright line, "Privacy", the email address and a LinkedIn icon. Service pages run to 5,500 px on desktop; a reader who reaches the end has no onward links except the form above.',
    impact: 'The bottom of a page is where interested readers decide where to go next. Here the only option is to scroll back to the top.',
    fix: 'Add a footer with the four services, Research, Blog, About, the email address and a "Get in touch" button.',
  },
  {
    id: 'F-16', sev: 'minor', fw: 'Content · Copy',
    title: 'A few slips in visible copy',
    observed: 'On the workshop page: "nobody is quite sure who answer for what an agent has produced" and "It works, it\'s explainable and its instrumented". Its meta description reads "In a one focused day AI process workshop for agile teams". "Recent Blogs" on the hero button means recent articles.',
    impact: 'Minor, but the firm sells clarity of thought, and these sit on its most commercial page.',
    fix: 'Correct to "who answers for", "it\'s instrumented", "In one focused day, your team decides…", and "Recent articles".',
  },
]

export const SCORES = [
  { label: 'Proof & credibility', value: 36 },
  { label: 'Conversion path', value: 42 },
  { label: 'Visual craft & layout', value: 52 },
  { label: 'Accessibility & mobile', value: 60 },
  { label: 'Findability (search / AI)', value: 64 },
  { label: 'Clarity of the offer', value: 68 },
]
export const SCORE_TOTAL = 54

// [framework, critical, major, minor] — sums to the findings above
export const FRAMEWORKS = [
  ['Business, content & conversion', 2, 2, 2],
  ['Information architecture & findability', 0, 0, 2],
  ['WCAG 2.2 AA / accessibility & mobile', 0, 2, 1],
  ['Visual craft, platform & performance', 0, 3, 2],
] as const

export const LIVE_PINS: Pin[] = [
  { n: 1, x: 40, y: 30, ids: ['F-08'], text: 'The headline is 72 px bold Verdana in a narrow column: five lines of two or three words.' },
  { n: 2, x: 15, y: 88.5, ids: ['F-02'], text: 'The only two buttons on the first screen lead to reading: "Research" and "Recent Blogs".' },
  { n: 3, x: 86, y: 4.2, ids: ['F-02', 'F-09'], text: 'No button and no Contact item in the header. There is no contact page.' },
  { n: 4, x: 92, y: 42, ids: ['F-06', 'F-12'], text: 'The largest element in the hero is decorative. On a phone it is placed above the headline.' },
  { n: 5, x: 30, y: 76, ids: ['F-01'], text: '"We\'re a research-based advisory": the founders are not named or shown anywhere on this page.' },
]
export const MOBILE_PINS: MiniPin[] = [
  { n: 4, x: 50, y: 22 },
  { n: 2, x: 50, y: 86 },
]

export const PAGES = [
  ['Home', '3,287 px desktop, 4,034 px phone. Hero, three service cards, three reasons, newsletter, closing panel.', 'Strong headline. Founders unnamed (F-01). No way to start on the first screen (F-02). Three services where there are four (F-07).'],
  ['Services', 'Four cards and an enquiry form.', 'Clear and well written. Its "Get in touch" behaves differently from the homepage\'s (F-09).'],
  ['Service pages (4)', 'Problem, what you leave with, method, sample agenda, form. 2,983 to 5,513 px on desktop.', 'The best pages on the site: specific and concrete. Label is the `h1` (F-05). Form only at the very end, with a required essay field (F-09).'],
  ['Keynotes', 'Talk list, formats, and 16 embedded recordings.', '21 MB and 569 requests; recordings untitled (F-03).'],
  ['Research', 'Two white papers and a signup.', 'Substantial, free to read, no gate. Both cards headed "White Paper" (F-05).'],
  ['Research paper', '15,485 px desktop, 25,794 px phone. Contents list, seven principles, form.', 'Serious work. Heading levels out of order (F-05).'],
  ['About', 'Mission, convictions, three numbers, founders and adviser with LinkedIn links.', 'Everything the homepage is missing lives here (F-01).'],
  ['Blog', 'Seven articles in four categories.', 'Frequent and recent. Shows single-figure view counts and empty comments (F-11).'],
  ['Privacy', 'Policy text with the company\'s postal address.', 'The only place the address appears (F-09). No description (F-10).'],
] as const

export const WORKS = [
  ['The headline is a position, not a description.', '"AI amplifies what you already do, so choose what it amplifies" is memorable, arguable and carried through the service pages and talks. Keep it word for word.'],
  ['The service pages are concrete.', '"Sound familiar?", "What your team leaves with", a sample agenda with times, a 30-day checkpoint. A buyer can picture the day. Few advisory sites do this.'],
  ['The voice is plain and confident.', '"You don\'t need a transformation program." "Agents do work; only people are accountable."'],
  ['The research is real and ungated.', 'Two long papers readable without giving an email address, plus seven recent articles.'],
  ['The basics are in place on every page.', 'One `h1` on 12 of 12 pages, a description on 11 of 12, a skip link, visible keyboard focus, no sideways scrolling at 390 px, and near-zero layout shift.'],
  ['The site is open to assistants.', '`robots.txt` allows AI crawlers and an `llms.txt` describes the firm accurately.'],
  ['Consent is handled correctly.', 'Nothing beyond the platform and the consent tool loads before a choice is made, and Deny is as prominent as Accept.'],
  ['The main colours pass contrast comfortably.', 'Navy on white is 16:1, purple on white 10.8:1, white on purple 10.8:1, and the yellow labels on purple 5.8:1.'],
] as const

export const FIRST_FIVE = [
  ['Name and show the founders on the homepage.', 'Two photographs and two lines under the hero. The material already exists on the About page.', 'F-01'],
  ['Put "Get in touch" in the header and make it the hero\'s main button.', 'Point it, and every other "Get in touch", at one short form. Move Research and Blog out of the hero; they are in the menu.', 'F-02'],
  ['On phones, put the headline first and shrink the consent bar.', 'Reorder the hero for small screens and switch the consent tool to its compact layout.', 'F-06'],
  ['Stop the Keynotes page loading 16 players.', 'Swap each embed for a titled thumbnail that loads the player on click. Cuts the page from about 21 MB to about 3 MB.', 'F-03'],
  ['Show four services, under one set of names.', 'Add Product Marketing Workshops to the homepage and make the workshop\'s name identical in the menu, the card and its page.', 'F-07'],
] as const

export const COMPARE_NOTES: [string, string][] = [
  ['A way to start, twice.', '"Get in touch" in the header and as the main hero button, with "See how we help" beside it.'],
  ['The founders, named.', 'Photographs of Dave West and Eric Naiburg with the one fact that matters most: they led Scrum.org as CEO and COO for more than a decade.'],
  ['Four services, visible at once.', 'The hero panel now lists all four, each with the outcome in a line, using one set of names.'],
  ['The same headline, in three lines.', 'A served typeface and a wider column; the second half takes the brand purple.'],
  ['The research still has its place.', 'A single line under the hero points to the newest paper.'],
]

export const ROLLOUT = [
  ['Day one — open the door.', 'Add "Get in touch" to the header and hero and point every instance at one form. Reorder the phone hero. Switch the consent tool to its compact layout and rewrite its text. Turn off blog counters and comments. Correct the copy slips.'],
  ['Week one — show who you are.', 'Add the founders to the homepage. Show all four services under agreed names. Make each service page\'s headline its `h1`. Fix the homepage title, the About description and the schema type.'],
  ['Weeks two and three — the look.', 'Choose a served typeface and a six-step scale; rebuild the hero to the proposed first screen. Replace the icons. Add a real footer. Replace the 16 embedded players with click-to-load thumbnails.'],
  ['Ongoing — earn the proof.', 'After each workshop or program, ask for two sentences from the sponsor and permission to name the organisation or its sector. Add them to the homepage and the relevant service page as they arrive.'],
] as const
