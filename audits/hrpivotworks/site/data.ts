// HR Pivot Works — proposed landing page copy.
// Drawn from the live site (hrpivotworks.com, captured 17 Nov 2026) and tightened. Nothing here is invented:
// services, process, people, testimonials and FAQ answers all exist on the live site.

export const CALENDLY = 'https://calendly.com/prudence-prudencesinclair/30min'
export const EMAIL = 'prue@hrpivotworks.com'
export const LINKEDIN = 'https://www.linkedin.com/in/prudencesinclair'
export const CTA = 'Schedule a confidential conversation'

export const NAV = [
  { href: '#help', label: 'How we help' },
  { href: '#work', label: 'How we work' },
  { href: '#prue', label: 'About Prue' },
  { href: '#proof', label: 'What clients say' },
  { href: '#field', label: 'From the Field' },
  { href: '#questions', label: 'Questions' },
]

export const HERO = {
  h1: 'When business gets complicated, experience matters.',
  standfirst:
    'HR Pivot Works is an independent advisory for founders, CEOs and business owners. Prue Sinclair helps you think through the difficult decisions about leadership, people and how the work gets done, then stays involved to get them done.',
  assurances: ['25+ years of executive experience', 'Direct, confidential advice', 'The first conversation is complimentary'],
}

/** What people arrive with. Situations named on the live site, not client quotes. */
export const ON_THE_DESK = [
  'A leadership team that isn’t working well together.',
  'A termination you want to handle properly.',
  'An executive who is struggling in the role.',
  'A restructuring you can’t afford to get wrong.',
  'AI arriving faster than anyone has planned for.',
  'Something isn’t working and you’re not sure where to begin.',
]

export interface Situation {
  id: string
  title: string
  body: string
  /** Service names exactly as the live homepage lists them. */
  services: { name: string; line: string }[]
}

export const SITUATIONS: Situation[] = [
  {
    id: 'decision',
    title: 'A people decision you can’t get wrong',
    body: 'Conflict between leaders, a struggling executive, a difficult termination. We help you understand your options, see the consequences before you act, and take practical action while treating everyone involved with professionalism and dignity.',
    services: [
      { name: 'Leadership & People Risk Advisory', line: 'Anticipate the human and organizational consequences of a decision before you make it.' },
      { name: 'Leadership Development & Complex People Situations', line: 'Support through sensitive employee matters, difficult transitions and high-stakes calls.' },
      { name: 'Compliance & Workforce Risk', line: 'Find the gaps in employment practices and policies before they become costly problems.' },
    ],
  },
  {
    id: 'leadership',
    title: 'Senior People leadership, without a full-time hire',
    body: 'Sometimes the business needs an experienced Chief People Officer for a season: through growth, a restructuring or a leadership transition. Prue steps in, sets direction, and builds what the next person will inherit.',
    services: [
      { name: 'Fractional & Interim Chief People Officer Leadership', line: 'Executive People leadership when you need strategic guidance or immediate cover, without a permanent executive hire.' },
    ],
  },
  {
    id: 'ai',
    title: 'AI is changing the work faster than the plan',
    body: 'Start with the work, not the technology. We look at how AI is already affecting roles, hiring and performance decisions, find where accountability is unclear, and help you introduce it without losing the judgment a good business depends on.',
    services: [
      { name: 'AI People Risk & Organizational Readiness', line: 'Assess how AI is affecting workflows, roles, skills and workforce decisions, and where the gaps are.' },
      { name: 'AI Governance & Change Management', line: 'Clear ownership, responsible practices and practical safeguards as AI becomes part of everyday work.' },
    ],
  },
  {
    id: 'change',
    title: 'The business is growing, restructuring or changing hands',
    body: 'The structure that got you here won’t carry the next stage. We align workforce plans, organization and leadership capability with where the business is going, including the people who work across borders.',
    services: [
      { name: 'Workforce Strategy & Organizational Transformation', line: 'Workforce plans, structures and leadership capability aligned with business priorities.' },
      { name: 'Immigration & Global Workforce', line: 'Understand workforce dependencies and coordinate global mobility matters alongside qualified legal counsel.' },
    ],
  },
]

export const STEPS = [
  { name: 'Assess', body: 'Understand the business, its challenges, priorities and opportunities.' },
  { name: 'Listen', body: 'Speak confidentially with leaders and employees to understand how work really gets done.' },
  { name: 'Redesign', body: 'Find ways to improve workflows, strengthen teams, develop capabilities, and use AI or automation where it makes sense.' },
  { name: 'Implement', body: 'Work alongside leadership to put practical solutions in place. We don’t just hand over recommendations.' },
  { name: 'Sustain', body: 'Help leaders measure progress, address new challenges and keep improvements working.' },
]

export const PRUE = {
  name: 'Prudence “Prue” Sinclair',
  role: 'Founder and CEO. Chief People Officer and advisor on business, leadership and workforce.',
  paragraphs: [
    'Prue has spent more than 25 years working alongside founders, CEOs, boards and executive teams. She has been brought into businesses during growth, mergers and acquisitions, restructuring, leadership conflict and significant transformation, in start-ups, scale-ups, private equity-backed companies, family businesses and international organizations.',
    'One of her greatest strengths is listening. What leaders believe is happening inside their business and what employees experience every day aren’t always the same. Through independent conversations, careful observation and a willingness to ask difficult questions, she uncovers problems, overlooked strengths and opportunities that never appear in a management report.',
    'Clients know her for seeing around corners, and for bringing calm and practical judgment to situations where the right decision isn’t obvious. Her international career and executive leadership studies at MIT Sloan shaped a broad business perspective.',
  ],
  quote: 'Sometimes a business needs a transformation. Sometimes it needs a difficult conversation. And sometimes a founder simply needs someone independent who understands the business and will tell them what they need to hear.',
}

export const ADVISORS = [
  { photo: 'marc-krellenstein', name: 'Marc Krellenstein, Ph.D.', line: 'Psychologist, computer scientist and technology executive. Advises on AI, human cognition and the future of work.' },
  { photo: 'galen-schreck', name: 'Galen Schreck', line: 'Technology executive, formerly at Forrester Research. Applies low-code and AI to compliance, data access and workflow automation.' },
  { photo: 'ellen-loth', name: 'Ellen Loth', line: 'Two decades at Forrester Research leading global teams. Streamlines business processes and leads change management.' },
]

export interface Testimonial { photo: string; name: string; role: string; quote: string }

export const FEATURED: Testimonial = {
  photo: 'marc-krellenstein',
  name: 'Marc Krellenstein',
  role: 'Founder, Northern Light Technology',
  quote: 'I continue to be impressed by her ability to analyze corporate environments and identify the most pressing issues, as well as understanding the ongoing AI transformation and how to apply it. She can be counted on to accurately assess HR and other problems and provide insight and tools for solving them.',
}

export const TESTIMONIALS: Testimonial[] = [
  {
    photo: 'john-mccray',
    name: 'John McCray',
    role: 'Co-Founder and Member, Board of Managers, Charlottesville Angel Network',
    quote: 'The company was growing rapidly in all areas. The situation was stressful and very fluid. Prudence was able to focus on the necessary priorities and bring order at this stressful time. She was tenacious in her pursuit of creative HR solutions and built a great team to support her.',
  },
  {
    photo: 'catherine-forster-connolly',
    name: 'Catherine Forster Connolly',
    role: 'Director and Owner, Merida Studio',
    quote: 'I worked with Prue while I ran a market research company, Pyramid Research, and she was excellent. She helped us with recruiting in a very challenging market and we hired many excellent people. She also advised me on HR issues and was excellent to work with.',
  },
  {
    photo: 'mark-sprague',
    name: 'Mark Sprague',
    role: 'Consultant, Decision Resources Group',
    quote: 'Prudence did a great job for Northern Light. Her team hit the ground running, instantly generating a productive Human Resources department. This team channeled a large number of talented employees into the organization.',
  },
  {
    photo: 'bob-kempf',
    name: 'Bob Kempf',
    role: 'Digital Media Executive',
    quote: 'She understands networks and networking and was also able to quickly understand and work within the bounds of our business model. … She’s personable and has a unique ability to get a candidate over the hump.',
  },
]

export const ARTICLES = [
  { title: 'The Decisions Nobody Prepares a Business Owner For', slug: 'leading-a-business-through-change', note: 'Building a business and leading one through change are two very different skills.' },
  { title: 'The Quiet Cost of Cutting Your People First', slug: 'the-quiet-cost-of-cutting-your-people-first', note: 'Layoffs, hiring freezes and deferred training, and what they cost later.' },
  { title: 'AI Adoption and Workforce Redesign', slug: 'ai-adoption-workforce-redesign', note: 'Technology companies can tell you what AI can do. They can’t tell you what your organization should become.' },
  { title: 'AI Workforce Redesign: The Hidden Costs of Job Cuts', slug: 'ai-workforce-redesign-hidden-cost-job-cuts', note: 'Eliminating a position may make financial sense. What else disappears with it?' },
  { title: 'Why Cutting Leadership Development Costs More Than You Think', slug: 'leadership-development-during-uncertainty', note: 'A cycle Prue has watched repeat in every downturn.' },
  { title: 'What Happens When Judgment Leaves the Room', slug: 'what-happens-when-judgment-leaves-the-room', note: 'The first issue of Leadership & People Insight.' },
]

export const FAQ = [
  {
    q: 'What exactly does HR Pivot Works do?',
    a: [
      'We help business owners, founders and CEOs navigate difficult decisions, solve leadership and employee problems, and find better ways to run their businesses.',
      'Sometimes we’re a confidential sounding board. Other times we’re helping resolve a difficult situation, strengthen a leadership team, redesign how work gets done, or introduce technology that makes a real difference.',
      'We bring experienced judgment, practical solutions and hands-on support. We’re not here to produce lengthy reports and walk away. We help get things done.',
    ],
  },
  {
    q: 'How can you help me understand what’s really happening in my business?',
    a: [
      'What appears in a report or job description doesn’t always reflect what’s happening day to day. We listen to your employees, speak with leadership, examine workflows and, where appropriate, use technology to understand how work actually gets done.',
      'This often reveals duplicated effort, inefficient processes, overlooked talent, communication gaps and opportunities for improvement. You gain a clearer picture of your business and the information you need to make better decisions.',
    ],
  },
  {
    q: 'Can you help if I’m dealing with a difficult employee or leadership problem?',
    a: [
      'Absolutely. These are often the situations where experienced, independent advice matters most.',
      'Whether it’s conflict between employees, a struggling executive, a difficult termination, poor communication, or a leadership team that isn’t working well together, we’ve handled complex people situations for more than 25 years. We help you understand your options, make thoughtful decisions, and take practical action while treating everyone involved with professionalism and dignity.',
    ],
  },
  {
    q: 'How can AI help my business, and where should I start?',
    a: [
      'Start with the work, not the technology. We help you identify repetitive tasks, inefficient workflows and processes that could be improved before investing in AI or automation.',
      'Where technology makes sense, we work with qualified specialists to explore practical solutions that fit your business, budget and people. The goal isn’t simply to replace tasks with technology. It’s to improve productivity, reduce unnecessary work, and give employees more opportunities to contribute their skills.',
    ],
  },
  {
    q: 'Do I need new software or an IT department to work with you?',
    a: [
      'Not necessarily. We begin by understanding the systems and tools you already use. Many businesses have valuable information and capabilities they’re not fully utilizing.',
      'Where appropriate, our technology specialists can help explore ways to connect existing systems, improve reporting or automate routine work. We don’t recommend technology for the sake of technology. Any solution should make business sense.',
    ],
  },
  {
    q: 'Is HR Pivot Works suitable for a small business?',
    a: [
      'Yes. Small and growing businesses are a central focus of our work. Whether you have 5 employees or 200, you face important decisions about your people, leadership, operations and future growth.',
      'You may not need a full-time executive or a large consulting firm. Sometimes you simply need someone experienced who understands your challenges and can help you move forward. We tailor our support to the size, needs and resources of your business.',
    ],
  },
  {
    q: 'What does working with HR Pivot Works look like?',
    a: [
      'It starts with a confidential conversation about what’s happening in your business. From there, we agree on what support would be most useful. You might need help with one immediate issue, an independent assessment, a specific project, or ongoing advisory support.',
      'Our approach is flexible. You don’t have to go through a five-step program or commit to services you don’t need. We work directly with you, keep things practical, and stay focused on getting results.',
    ],
  },
  {
    q: 'How much does it cost to work with you?',
    a: [
      'It depends on what you need, and we’re straightforward about that from the beginning. Some clients engage us for a specific challenge or short-term project. Others prefer ongoing advisory support or fractional executive leadership.',
      'We offer flexible arrangements, including hourly, project-based and retainer options, depending on the work involved. Our first conversation is complimentary. We’ll discuss your needs, explain how we could help, and agree on a clear scope before any work begins.',
    ],
  },
]

export const LEGAL = [
  { label: 'Privacy policy', href: 'https://hrpivotworks.com/privacy-policy/' },
  { label: 'Terms and conditions', href: 'https://hrpivotworks.com/terms-conditions/' },
  { label: 'Disclaimer', href: 'https://hrpivotworks.com/disclaimer/' },
  { label: 'Cookies', href: 'https://hrpivotworks.com/cookies/' },
]
