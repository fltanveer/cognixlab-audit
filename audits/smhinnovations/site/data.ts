// All copy for the proposed SMH Innovations landing page.
// Facts come from smhinnovations.com, the company's LinkedIn page and its public
// job postings. Nothing here invents a client, a number, a quote or a guarantee.

export const PHONE = { label: '+1 (912) 349-9671', href: 'tel:+19123499671' }
export const EMAIL = { label: 'info@smhinnovations.com', href: 'mailto:info@smhinnovations.com' }
export const LINKEDIN = 'https://www.linkedin.com/company/smh-innovations/'
export const ADDRESS = ['463 Pooler Pkwy, PMB 132', 'Pooler, GA 31322']

export const ACTIONS = {
  facility: { label: 'Request coverage', href: '#facilities-form' },
  provider: { label: 'Find an assignment', href: '#providers-form' },
}

export const NAV = [
  ['Facilities', '#facilities'],
  ['Providers', '#providers'],
  ['How it works', '#how'],
  ['Team', '#team'],
  ['Open roles', '#roles'],
] as const

export const HERO = {
  h1: 'Physician-led locum tenens and medical staffing.',
  standfirst:
    'SMH Innovations is run by physicians. We place physicians, advanced practice professionals and CRNAs with hospitals and facilities across the country, in temporary, temp-to-perm and permanent roles.',
  doors: [
    { key: 'facility', kicker: 'Hospitals and facilities', title: 'I need coverage', text: 'Tell us the service, the dates and the role. A person on our team calls you back.', action: ACTIONS.facility, to: '#facilities' },
    { key: 'provider', kicker: 'Physicians, APPs and CRNAs', title: 'I’m a provider', text: 'Tell us what you want from an assignment. We match you to shifts that fit it.', action: ACTIONS.provider, to: '#providers' },
  ],
  facts: [
    ['Led by', 'Five physicians'],
    ['Founded', '2022'],
    ['Based in', 'Pooler, Georgia'],
    ['Member of', 'NALTO'],
  ],
  portraitCaption: 'The team behind SMH Innovations',
  // First-screen roster: the five physicians, each with a line drawn from their published bio.
  roster: {
    kicker: 'Who you will talk to',
    title: 'Five physicians run this company.',
    people: [
      ['spiro-mavromates', 'Managing Director · Internal medicine, hospital medicine leadership'],
      ['jerome-tuitt', 'Physician Partner · Board-certified internal medicine'],
      ['nicholas-mavromates', 'Physician Partner · Hospitalist, level 1 trauma experience'],
      ['craig-novack', 'Physician Partner · Medical director, born and raised in Savannah'],
      ['milan-podrecca', 'Physician Partner · Internal medicine, procedural skillset'],
    ],
    foot: 'With a business development lead and a travel coordinator beside them.',
    link: 'Meet the whole team',
  },
} as const

export const STAFF = {
  heading: 'What we staff',
  intro: 'Hospital medicine and subspecialty coverage, for the length of time you need it.',
  types: [
    ['Locum tenens', 'Temporary coverage for gaps, leave and growth.'],
    ['Temp-to-perm', 'An assignment that can become a permanent position when it suits both sides.'],
    ['Permanent', 'Full-time placements for physicians and advanced practice professionals.'],
  ],
  who: [
    ['Physicians', 'MD and DO'],
    ['Advanced practice professionals', 'Nurse practitioners and physician assistants'],
    ['CRNAs', 'Certified registered nurse anesthetists'],
  ],
  recentLabel: 'Recent searches have included',
  recent: ['Hospitalist', 'Infectious disease', 'ENT', 'Neurosurgery stroke call', 'Neurointerventional radiology', 'Cardiothoracic surgery APP', 'Pulmonology', 'Urology'],
  recentNote: 'Taken from our public job postings. This is not a list of current openings.',
} as const

export const FACILITIES = {
  heading: 'For hospitals and facilities',
  lead: 'When a service is short, you want to talk to someone who understands the service.',
  body: 'Our managing director and partners are physicians, several with years in hospital medicine. You deal with one person on our team, by name, from the first call to the last shift.',
  points: [
    ['Coverage for gaps, leave and growth', 'Locum physicians, APPs and CRNAs for the dates you need.'],
    ['A route to a permanent hire', 'When a locum turns out to be the right long-term fit, we can move to temp-to-perm.'],
    ['Credentialing, coordinated', 'We coordinate credentialing with your team. Your team keeps primary source verification.'],
  ],
} as const

export const PROVIDERS = {
  heading: 'For physicians, APPs and CRNAs',
  lead: 'An assignment is a schedule, a new facility and a new team. We handle the details so you can do the work.',
  body: 'We start by listening to what you want from an assignment, then match you to open shifts that fit. You will know the people on our team by name.',
  points: [
    ['Matched to what you asked for', 'Setting, schedule, location and length of assignment.'],
    ['Credentialing handled with the facility', 'We coordinate the paperwork with the client’s credentialing team.'],
    ['Travel, scheduling and payroll', 'Travel is arranged by our own team. Scheduling and payroll run through OnCall, the platform we use.'],
  ],
} as const

export const STEPS = [
  ['Listen', 'A facility tells us the service, the dates and the role. A provider tells us what they want from an assignment.'],
  ['Match', 'We match providers to open shifts, and put the two sides in touch.'],
  ['Credential', 'We coordinate credentialing with the client facility, whose own team handles primary source verification.'],
  ['Schedule, travel and pay', 'Scheduling and payroll run through OnCall, a partner platform. Travel is booked by our team.'],
] as const

export interface Person { slug: string; name: string; role: string; bio: string }
export const TEAM: Person[] = [
  { slug: 'spiro-mavromates', name: 'Spiro Mavromates, MD', role: 'Managing Director', bio: 'Internal medicine physician with over a decade of experience in new business development and hospital medicine leadership.' },
  { slug: 'jerome-tuitt', name: 'Jerome Tuitt, MD', role: 'Physician Partner', bio: 'Board-certified internal medicine physician, born in Miami and raised in Atlanta.' },
  { slug: 'nicholas-mavromates', name: 'Nicholas Mavromates, MD', role: 'Physician Partner', bio: 'Internal medicine trained hospitalist with level 1 trauma experience and a business background in acquisition, sales and management.' },
  { slug: 'craig-novack', name: 'Craig Novack, MD', role: 'Physician Partner', bio: 'Born and raised in Savannah, trained in internal medicine, and currently a medical director in Tampa, Florida.' },
  { slug: 'milan-podrecca', name: 'Milan Podrecca, MD', role: 'Physician Partner', bio: 'Internal medicine trained physician with a strong procedural skillset.' },
  { slug: 'jane-foley', name: 'Jane Foley', role: 'Director of Business Development', bio: 'More than 35 years of healthcare leadership and organizational management experience.' },
  { slug: 'marley-mountcastle', name: 'Marley Mountcastle', role: 'Corporate Travel', bio: 'Ten years in film production, where organization, problem-solving and fast decisions were the job.' },
]

export const WHY = {
  heading: 'Why physician-led',
  quote: 'Physician-led locum tenens solves many of the problems hospitals face, from coverage gaps to finding the right long-term fit.',
  source: 'SMH Innovations, on LinkedIn',
  second: 'Being a close-knit team means every provider and facility gets to know us by name.',
  pending: 'A reference from a facility leader or a provider SMH has placed, with their name, role and permission.',
} as const

export const ROLES = {
  heading: 'Open roles',
  intro: 'Current assignments will be listed here, so providers can see what is open before they call.',
  pending: 'A live feed of open assignments from the job board or the OnCall platform. Until it is connected, ask us what is open.',
} as const

export const CLOSING = {
  heading: 'Talk to the people who do the staffing.',
  text: 'Call, write, or send one of the two short forms. We are in Pooler, Georgia, and staff facilities nationwide.',
} as const

export const FOOTER_LINKS = [
  ['What is locum tenens?', 'https://www.nalto.org/what-is-locum-tenens/'],
  ['Privacy policy', 'https://smhinnovations.com/privacypolicy.html'],
  ['LinkedIn', LINKEDIN],
] as const

export const CONSENT =
  'Yes, SMH Innovations may also contact me by text message. Message and data rates may apply. Message frequency varies. Reply STOP at any time to opt out.'
