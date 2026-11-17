// Start here. See audits/hrpivotworks/report/App.tsx for a complete report
// (score, evidence stages, page table, strategy, proposal, rollout).
import { FindingsSection, ReportHero, ReportShell, countBySev } from '../../../src/report'
import { DATE, FINDINGS, URL } from './content'

const SECTIONS = [['findings', '01', 'Findings']] as const
const counts = countBySev(FINDINGS)

export default function App() {
  return (
    <ReportShell
      brand="__TITLE__"
      brandSub="audit"
      sections={SECTIONS}
      findings={FINDINGS}
      footer={[`UX, content and conversion audit of ${URL}.`, `${DATE} · ${FINDINGS.length} findings · ${counts.critical} critical`]}
    >
      <ReportHero
        eyebrow={`UX, content & conversion audit · ${DATE}`}
        title="Audit in preparation."
        lede="Findings will appear here."
        actions={<a className="btn btn--primary" href="#findings">Findings</a>}
        meta={[['Property', URL]]}
      />
      <FindingsSection id="findings" n="01" findings={FINDINGS} />
    </ReportShell>
  )
}
