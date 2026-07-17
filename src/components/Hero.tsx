import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ onExplore }: { onExplore: () => void }) {
  const root = useRef<HTMLDivElement>(null)

  // Mouse parallax for the title.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 18 })
  const py = useSpring(my, { stiffness: 60, damping: 18 })
  const titleX = useTransform(px, [-0.5, 0.5], [-18, 18])
  const titleY = useTransform(py, [-0.5, 0.5], [-12, 12])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title .char', {
        yPercent: 120,
        opacity: 0,
        stagger: 0.04,
        duration: 1.1,
        ease: 'power4.out',
        delay: 0.2,
      })
      gsap.from('.hero-line', {
        opacity: 0,
        y: 24,
        stagger: 0.18,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5)
    my.set(e.clientY / window.innerHeight - 0.5)
  }

  const title = 'InkEcho'

  return (
    <section
      ref={root}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.h1
        style={{ x: titleX, y: titleY }}
        className="hero-title font-display text-[18vw] font-semibold leading-none text-glow sm:text-8xl md:text-9xl"
      >
        {title.split('').map((c, i) => (
          <span key={i} className="char inline-block overflow-hidden align-bottom">
            <span className="inline-block bg-gradient-to-br from-white via-white/80 to-white/40 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-shift">
              {c}
            </span>
          </span>
        ))}
      </motion.h1>

      {/* Shimmer divider under the title (inspired by the Poems/ header) */}
      <div className="hero-line mt-6 h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/2 animate-shimmer rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      </div>

      <p className="hero-line mt-6 max-w-xl font-serif text-lg italic text-white/70 sm:text-2xl">
        Where ink becomes voice, and voice becomes echo.
      </p>
      <p className="hero-line mt-3 max-w-xl font-sans text-sm text-white/40 sm:text-base">
        Yet in my world… Ink becomes code, and code becomes story.
      </p>

      <motion.button
        className="hero-line mt-12 rounded-full border border-white/20 px-8 py-3 font-sans text-sm uppercase tracking-[0.3em] text-white/80 transition-colors hover:border-white/60 hover:text-white"
        onClick={onExplore}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        data-cursor="hover"
      >
        Enter the anthology
      </motion.button>

      <div className="hero-line absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-white/30">
        scroll
      </div>
    </section>
  )
}
