import { useState } from 'react'
import { Badge, Card, Spinner, Stage, Window, type Act } from '../../../src/kit'
import '../../../src/kit/stageshow.css'
import { SLUG } from './content'

// Frame one is a real capture of the public LinkedIn page. The error frame is
// a drawing of what a browser shows for a host with no DNS record.
type S = { phase: 'page' | 'loading' | 'error'; url: string; hint: boolean; facts: boolean }
const INITIAL: S = { phase: 'page', url: 'linkedin.com/company/smh-innovations', hint: false, facts: false }
const POSTER: S = { phase: 'error', url: 'wwww.smhinnovations.com', hint: false, facts: true }

async function script(a: Act<S>) {
  await a.wait(900)
  a.put({ hint: true })
  await a.move({ at: 'site', x: 0.5, y: 0.55 })
  await a.wait(300)
  await a.click({ at: 'site', x: 0.5, y: 0.55 })
  a.put({ phase: 'loading', url: 'wwww.smhinnovations.com', hint: false })
  await a.wait(1400)
  a.put({ phase: 'error' })
  await a.wait(900)
  a.put({ facts: true })
  await a.wait(4200)
}

export function LinkedInDemo() {
  const [run, setRun] = useState(0)
  return (
    <div className="ld-host">
      <Stage
        key={run}
        width={880}
        height={540}
        compact={{ below: 640, width: 592, height: 580 }}
        initial={INITIAL}
        poster={POSTER}
        script={script}
        play="once"
        cursor={{ at: { wide: { x: 800, y: 460 }, compact: { x: 520, y: 400 } }, ripple: true }}
        className="ld"
      >
        {(s) => (
          <>
            <Window url={s.url} urlShape="pill" nav className="ld-win">
              <div className="ld-view" data-phase={s.phase}>
                <div className="ld-shot">
                  <img src={`/${SLUG}/shots/linkedin.webp`} alt="The public LinkedIn page for SMH Innovations, showing the Website field as wwww.smhinnovations.com" width={1280} height={900} />
                </div>
                <div className="ld-load"><Spinner size={22} /></div>
                <div className="ld-err">
                  <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><rect x="6" y="9" width="28" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M6 15h28" stroke="currentColor" strokeWidth="2" /><path d="M16 21l8 6M24 21l-8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  <div className="ld-err__t">This site can’t be reached</div>
                  <div className="ld-err__b">Check if there is a typo in <b>wwww.smhinnovations.com</b>.</div>
                  <div className="ld-err__c">DNS_PROBE_FINISHED_NXDOMAIN</div>
                </div>
                <span className="ld-hit" data-target="site" data-cursor="pointer" data-on={s.hint || undefined} />
              </div>
            </Window>
            <Card className="ld-sat" pad="medium" gap={10}>
              <div className="ld-sat__head">LinkedIn website field</div>
              <div className="ld-sat__val"><mark>wwww</mark>.smhinnovations.com</div>
              <div className="ld-sat__rows" data-on={s.facts || undefined}>
                <div className="ld-sat__row"><span>DNS lookup</span><Badge tone="danger" dot>No record</Badge></div>
                <div className="ld-sat__row"><span>smhinnovations.com</span><Badge tone="success" dot>Live site</Badge></div>
                <div className="ld-sat__row"><span>Posts, last 3 weeks</span><Badge tone="neutral">8</Badge></div>
              </div>
            </Card>
          </>
        )}
      </Stage>
      <button className="replay" onClick={() => setRun((n) => n + 1)}>
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Replay
      </button>
    </div>
  )
}
