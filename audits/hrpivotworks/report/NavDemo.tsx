import { useState } from 'react'
import { Badge, Card, Stage, Window, type Act } from '../../../src/kit'
import '../../../src/kit/stageshow.css'
import { SLUG } from './content'

// Both frames are real captures of the live homepage: the first screen, and
// the place the "From the Field" link scrolls to.
type S = { phase: 'home' | 'form'; url: string; hint: boolean; facts: boolean }
const INITIAL: S = { phase: 'home', url: 'hrpivotworks.com', hint: false, facts: false }
const POSTER: S = { phase: 'form', url: 'hrpivotworks.com/#leadership', hint: false, facts: true }

async function script(a: Act<S>) {
  await a.wait(900)
  a.put({ hint: true })
  await a.move({ at: 'field', x: 0.5, y: 0.55 })
  await a.wait(300)
  await a.click({ at: 'field', x: 0.5, y: 0.55 })
  a.put({ phase: 'form', url: 'hrpivotworks.com/#leadership', hint: false })
  await a.wait(1500)
  a.put({ facts: true })
  await a.wait(4200)
}

export function NavDemo() {
  const [run, setRun] = useState(0)
  return (
    <div className="nd-host">
      <Stage
        key={run}
        width={880}
        height={520}
        compact={{ below: 640, width: 592, height: 560 }}
        initial={INITIAL}
        poster={POSTER}
        script={script}
        play="once"
        cursor={{ at: { wide: { x: 800, y: 440 }, compact: { x: 520, y: 380 } }, ripple: true }}
        className="nd"
      >
        {(s) => (
          <>
            <Window url={s.url} urlShape="pill" nav className="nd-win">
              <div className="nd-view" data-phase={s.phase}>
                <div className="nd-strip">
                  <img src={`/${SLUG}/shots/live-desktop.webp`} alt="The live homepage, first screen, with From the Field in the navigation" width={1440} height={900} />
                  <img src={`/${SLUG}/shots/live-anchor.webp`} alt="Where the link lands: the newsletter signup form further down the homepage" width={1440} height={900} />
                </div>
                <span className="nd-hit" data-target="field" data-cursor="pointer" data-on={s.hint || undefined} />
              </div>
            </Window>
            <Card className="nd-sat" pad="medium" gap={10}>
              <div className="nd-sat__head">“From the Field” links to</div>
              <div className="nd-sat__val">/#leadership</div>
              <div className="nd-sat__rows" data-on={s.facts || undefined}>
                <div className="nd-sat__row"><span>Lands on</span><Badge tone="warning" dot>Signup form</Badge></div>
                <div className="nd-sat__row"><span>Articles at /blog/</span><Badge tone="success" dot>13 published</Badge></div>
                <div className="nd-sat__row"><span>Links to /blog/</span><Badge tone="danger" dot>0 in 10 pages</Badge></div>
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
