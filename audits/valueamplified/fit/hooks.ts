import { useEffect, useRef, useState, type RefObject } from 'react'
import { useReducedMotion } from 'motion/react'

/** True while the element is on screen. Animations use it to pause off-screen. */
export function useOnScreen(ref: RefObject<Element | null>, amount = 0.35) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: amount })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, amount])
  return on
}

/** A looping clock in [0, 1) that only runs on screen and never under reduced motion. */
export function useLoop(ref: RefObject<Element | null>, seconds: number, still = 0.62) {
  const reduce = useReducedMotion()
  const on = useOnScreen(ref, 0.2)
  const [t, setT] = useState(still)
  useEffect(() => {
    if (reduce || !on) return
    let raf = 0
    let last = 0
    const start = performance.now() - t * seconds * 1000
    const tick = (now: number) => {
      // ~30 fps is plenty for this and halves the work
      if (now - last > 32) { last = now; setT((((now - start) / 1000) % seconds) / seconds) }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, on, seconds])
  return reduce ? still : t
}

/**
 * Steps a demo through `holds.length` beats while it is on screen, then loops.
 * Under reduced motion it rests on the last beat, which is the complete picture.
 */
export function usePlayback(holds: number[]) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const on = useOnScreen(ref, 0.45)
  const last = holds.length - 1
  const [step, setStep] = useState(last)
  const [run, setRun] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (reduce) { setStep(last); return }
    if (!on) return
    if (!started.current) { started.current = true; setStep(0) }
  }, [on, reduce, last])

  useEffect(() => {
    if (reduce || !on || !started.current) return
    const id = window.setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), holds[step])
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, on, reduce, run])

  const replay = () => { started.current = true; setStep(0); setRun((n) => n + 1) }
  return { ref, step, replay, reduce: !!reduce }
}
