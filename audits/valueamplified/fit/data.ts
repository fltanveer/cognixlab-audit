// Copy and data for the "Where Cognixlab fits" page.
// REAL = published by Value Amplified or Cognixlab on their own sites.
// SAMPLE = invented for the demos and labelled as such on the page.

export const BOOK = 'https://cognixlab.co/contact#book'

/** REAL. Verbatim from valueamplified.com and cognixlab.co. */
export const BELIEFS = [
  {
    theirs: 'AI amplifies what you already do, so choose what it amplifies.',
    ours: 'If you want a chatbot bolted onto a broken process, we’re the wrong team. We fix the process first.',
    note: 'Neither of us starts with the tool.',
  },
  {
    theirs: 'Bet. Build. Prove.',
    ours: 'Assess, Architect, Implement, Optimize. Each phase ends with something you can hold, so you decide the next step with evidence.',
    note: 'Both methods stop at evidence before they go on.',
  },
  {
    theirs: 'Agents do work; only people are accountable.',
    ours: 'You own what we build. Your code, your accounts, your data.',
    note: 'Ownership stays with a named person, not with the vendor or the agent.',
  },
  {
    theirs: 'You don’t need a transformation program.',
    ours: 'AI only where it earns its place.',
    note: 'Small, measured steps instead of a programme.',
  },
] as const

/** SAMPLE. One bet in Value Amplified's own format, and what a pilot measured. */
export const BET = {
  believe: 'An agent can draft the first pass of every code review, so reviewers start from findings instead of a blank diff.',
  measure: 'Median hours from pull request opened to first human review.',
  by: 'Day 30 checkpoint',
  baseline: 26,
  unit: 'h',
  series: [
    { day: 0, v: 26 }, { day: 5, v: 24 }, { day: 10, v: 19 }, { day: 15, v: 15 },
    { day: 20, v: 12 }, { day: 25, v: 10 }, { day: 30, v: 9 },
  ],
}

/** SAMPLE. */
export const BOARD = {
  keep: ['Sprint Goal', 'Definition of Done', 'Sprint Review with customers'],
  letGo: ['Task-hour estimates', 'Status-only stand-ups'],
  try: ['Agent-drafted reviews', 'Evidence in Sprint Review', 'Bets, not batches'],
}

/** SAMPLE. Agent workflows, each with a named owner and a signal to watch. */
export const WORKFLOWS = [
  { name: 'First-pass code review', owner: 'Priya N.', role: 'Engineering lead', signal: 'Review wait', value: '9 h', spark: [26, 24, 19, 15, 12, 10, 9], state: 'ok' },
  { name: 'Backlog triage', owner: 'Marcus L.', role: 'Product Owner', signal: 'Re-ordered by a person', value: '31%', spark: [58, 52, 47, 40, 36, 33, 31], state: 'ok' },
  { name: 'Release notes draft', owner: 'Ana R.', role: 'Delivery lead', signal: 'Edits before publish', value: '4.2', spark: [9, 8, 7.5, 6, 5.5, 4.8, 4.2], state: 'due' },
  { name: 'Support reply suggestions', owner: null, role: null, signal: 'Sent without edit', value: '72%', spark: [40, 48, 55, 61, 66, 70, 72], state: 'none' },
] as const

/** SAMPLE. Share of agent output reviewed by its named owner within 24 h, by week. */
export const EVIDENCE_90 = [38, 41, 47, 52, 58, 61, 67, 72, 76, 80, 83, 86, 88]

/** SAMPLE. An Amplifier Pulse before a keynote. */
export const PULSE = {
  invited: 210,
  responses: 148,
  questions: [
    { q: 'We can say which outcome our last release moved.', agree: 31 },
    { q: 'AI is part of how the team works, not only how individuals work.', agree: 44 },
    { q: 'It is clear who answers for what an agent produces.', agree: 22 },
    { q: 'Our Definition of Done covers work an agent wrote.', agree: 18 },
    { q: 'Sprint Reviews inspect evidence, not only output.', agree: 37 },
  ],
  headline: 'Output is up. Ownership is not.',
  findings: [
    'Fewer than one in four can say who answers for agent work.',
    'AI use is individual in most teams; the way of working has not changed.',
    'Only 18% have a Definition of Done that covers agent-written work.',
  ],
}

/** REAL. Published on cognixlab.co/work. */
export const FIELD = [
  { name: 'Auto Inspect', what: 'Vehicle inspection report', before: '45 min', after: '1 min 47 s', beforeSec: 2700, afterSec: 107, sector: 'Insurance and inspections', href: 'https://cognixlab.co/work/auto-inspect' },
  { name: 'PKNail', what: 'Site scan to native Revit model', before: '18 h', after: '45 min', beforeSec: 64800, afterSec: 2700, sector: 'Architecture, engineering and construction', href: 'https://cognixlab.co/work/pknail' },
] as const

/** REAL step names and durations as Cognixlab publishes them. No prices and no pricing link on this page. */
export const PILOT_STEPS = [
  { theirs: 'Bet', ours: 'Workflow Review', time: '45 minutes, free', body: 'We map one workflow with you on the call and say honestly whether AI, automation or nothing is the fix. No slides, no pitch.', holds: 'A go or no-go on the workflow' },
  { theirs: 'Bet', ours: 'Workflow Assessment', time: 'About 2 weeks', body: 'Process map with the cost of each manual step, a data readiness report and a working proof of concept on real data. This is where the baseline is set.', holds: 'Baseline, proof of concept, scoped pilot' },
  { theirs: 'Build', ours: 'AI Pilot', time: '4 to 6 weeks', body: 'One workflow automated end to end, inside the tools the team already uses, with access controls and a monitoring dashboard.', holds: 'Working software and a handover' },
  { theirs: 'Prove', ours: 'Measure against the baseline', time: 'At your checkpoint', body: 'The same measure the bet named, read on the same date the team agreed. Scale, adjust or stop is the team’s decision, not ours.', holds: 'Evidence the team inspects' },
] as const

export const LINE = {
  wedo: ['Workflow automation and AI agents', 'Custom software and integrations', 'Product and UX design', 'Monitoring, handover and documentation'],
  wedont: ['Operating-model advice', 'Agile coaching', 'Training and certification', 'Keynotes and facilitation'],
}

/** REAL. */
export const PROOF = [
  { name: 'JVS Management', kind: 'Agile coaching and consulting firm', line: 'A clearer digital presence for an agile coaching and consulting firm.', service: 'Product & UX', href: 'https://cognixlab.co/work/jvs-management' },
  { name: 'Auto Inspect', kind: 'Insurance and inspections', line: 'Vehicle inspection reports in 1 min 47 s, from four phone photos. Manual drafting took 45 min.', service: 'AI & Software', href: 'https://cognixlab.co/work/auto-inspect' },
  { name: 'PKNail', kind: 'Architecture, engineering and construction', line: 'Scan-to-model time from 18 h to 45 min, as native Revit elements with no hand tracing.', service: 'AI & Software', href: 'https://cognixlab.co/work/pknail' },
] as const
