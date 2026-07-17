import Lenis from 'lenis'

let lenis: Lenis | null = null

/**
 * Initialise a single global Lenis instance for buttery smooth scrolling.
 * Returns the instance so callers can hook into it (e.g. scrollTo).
 */
export function initSmoothScroll(): Lenis {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  })

  // Drive Lenis from a single rAF loop.
  const raf = (time: number) => {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

export function destroySmoothScroll() {
  lenis?.destroy()
  lenis = null
}
