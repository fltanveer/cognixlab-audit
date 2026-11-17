// Shared evidence stages: real screenshots in device frames, a before/after
// slider, and the whole proposed page scrolling. All take the audit's slug so
// images resolve under /<slug>/shots/, which the privacy gate covers.
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion, animate } from 'motion/react'
import { Phone, Stage, Window } from '../kit'
import '../kit/stageshow.css'
import './stages.css'

export interface Pin { n: number; x: number; y: number; ids: string[]; text: string }
export interface MiniPin { n: number; x: number; y: number }
interface Base { slug: string; url: string }

const shot = (slug: string, name: string) => `/${slug}/shots/${name}.webp`

function Pins({ pins, all }: { pins: MiniPin[]; all: Pin[] }) {
  return (
    <>
      {pins.map((p) => (
        <a key={p.n} href={`#${(all.find((l) => l.n === p.n)?.ids ?? ['findings'])[0]}`} className="ev-pin" style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-label={`Marker ${p.n}`}>
          {p.n}
        </a>
      ))}
    </>
  )
}

/** The live site today: desktop window with numbered pins, phone alongside. */
export function EvidenceToday({ slug, url, pins, mobilePins = [] }: Base & { pins: Pin[]; mobilePins?: MiniPin[] }) {
  const desktop = <img src={shot(slug, 'live-desktop')} alt={`The current ${url} homepage at 1440 px wide`} width={1440} height={900} />
  const mobile = <img src={shot(slug, 'live-mobile')} alt="The current homepage on a 390 px phone" />
  return (
    <Stage width={1040} height={640} compact={{ below: 720, width: 358, height: 560 }} className="ev ev--today">
      {(_s, _r, layout) =>
        layout === 'wide' ? (
          <>
            <Window url={url} urlShape="pill" nav className="ev-win ev-win--today">
              <div className="ev-shot">{desktop}<Pins pins={pins} all={pins} /></div>
            </Window>
            <Phone width={250} frame="pro" className="ev-phone">
              <div className="ev-phone__screen">{mobile}</div>
            </Phone>
          </>
        ) : (
          <Phone width={300} frame="pro" className="ev-phone ev-phone--solo">
            <div className="ev-phone__screen">{mobile}<Pins pins={mobilePins} all={pins} /></div>
          </Phone>
        )
      }
    </Stage>
  )
}

/** Drag to compare the live first screen with the proposed one. */
export function CompareStage({ slug, url }: Base) {
  return (
    <Stage width={1040} height={640} compact={{ below: 720, width: 358, height: 300 }} className="ev ev--cmp">
      {() => (
        <Window url={url} urlShape="pill" nav className="ev-win ev-win--cmp">
          <Compare slug={slug} />
        </Window>
      )}
    </Stage>
  )
}

function Compare({ slug }: { slug: string }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const touched = useRef(false)
  useEffect(() => {
    if (!inView || reduce || touched.current) return
    const c = animate(88, 50, { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3, onUpdate: (v) => !touched.current && setPos(v) })
    return () => c.stop()
  }, [inView, reduce])
  return (
    <div className="cmp" ref={ref} style={{ ['--pos' as string]: `${pos}%` }}>
      <img src={shot(slug, 'proposal-desktop')} alt="Proposed homepage, first screen" width={1440} height={900} className="cmp__img" />
      <img src={shot(slug, 'live-desktop')} alt="Current homepage, first screen" width={1440} height={900} className="cmp__img cmp__img--before" />
      <span className="cmp__tag cmp__tag--l">Today</span>
      <span className="cmp__tag cmp__tag--r">Proposed</span>
      <span className="cmp__handle" aria-hidden="true"><span className="cmp__knob"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M7 5 3 9l4 4M11 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span>
      <input
        className="cmp__range"
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        aria-label="Drag to compare the current homepage with the proposed one"
        onChange={(e) => { touched.current = true; setPos(Number(e.target.value)) }}
      />
    </div>
  )
}

/** A desktop window and a phone showing the same named pair of screenshots. */
export function DevicePair({ slug, url, desktop, mobile, desktopAlt, mobileAlt, className = 'ev--after' }: Base & { desktop: string; mobile: string; desktopAlt: string; mobileAlt: string; className?: string }) {
  const phone = <img src={shot(slug, mobile)} alt={mobileAlt} />
  return (
    <Stage width={1040} height={560} compact={{ below: 720, width: 358, height: 560 }} className={`ev ${className}`}>
      {(_s, _r, layout) =>
        layout === 'wide' ? (
          <>
            <Window url={url} urlShape="pill" nav className="ev-win ev-win--after">
              <div className="ev-shot"><img src={shot(slug, desktop)} alt={desktopAlt} width={1440} height={900} /></div>
            </Window>
            <Phone width={262} frame="pro" className="ev-phone ev-phone--after">
              <div className="ev-phone__screen">{phone}</div>
            </Phone>
          </>
        ) : (
          <Phone width={300} frame="pro" className="ev-phone ev-phone--solo">
            <div className="ev-phone__screen">{phone}</div>
          </Phone>
        )
      }
    </Stage>
  )
}

/** One tall screenshot scrolling slowly inside a window. */
export function FullScroll({ slug, url, name = 'proposal-full', alt = 'The proposed landing page from top to bottom' }: Base & { name?: string; alt?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  return (
    <Stage width={1040} height={600} compact={{ below: 720, width: 358, height: 480 }} className="ev ev--full">
      {() => (
        <div className="fs-mask">
          <Window url={url} urlShape="pill" nav className="ev-win ev-win--full">
            <div className="fs" ref={ref} data-run={(inView && !reduce) || undefined}>
              <img src={shot(slug, name)} alt={alt} />
            </div>
          </Window>
        </div>
      )}
    </Stage>
  )
}
