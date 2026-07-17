import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Poem } from '../types'
import { getTheme } from '../data/poems'
import PoemDecor from './PoemDecor'

interface Props {
  poem: Poem
  index: number
  onOpen: (poem: Poem) => void
}

export default function PoemCard({ poem, index, onOpen }: Props) {
  const theme = getTheme(poem.emotion)
  const ref = useRef<HTMLButtonElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 })
  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(my, [-0.5, 0.5], ['0%', '100%'])

  const onMove = (e: React.MouseEvent) => {
    if (isTouch) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={ref}
      layoutId={`poem-${poem.id}`}
      onClick={() => onOpen(poem)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      className="perspective-1000 group relative block w-full text-left"
    >
      <motion.div
        style={isTouch ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-8"
      >
        {/* Tactile "tape" strips (inspired by the Poems/ wall) */}
        <span
          className="pointer-events-none absolute -left-3 -top-2 h-6 w-14 -rotate-12 rounded-md"
          style={{
            background: `linear-gradient(135deg, rgba(${theme.rgb}, 0.85), rgba(${theme.rgb}, 0.55))`,
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.15)',
          }}
        />
        <span
          className="pointer-events-none absolute -bottom-2 -right-3 h-5 w-12 rotate-12 rounded-md"
          style={{
            background: `linear-gradient(135deg, rgba(${theme.rgb}, 0.8), rgba(${theme.rgb}, 0.5))`,
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.15)',
          }}
        />
        <PoemDecor emotion={poem.emotion} rgb={theme.rgb} />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(420px circle at ${x} ${y}, rgba(${theme.rgb}, 0.22), transparent 60%)`
            ),
          }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(180px circle at ${x} ${y}, rgba(255,255,255,0.35), transparent 55%)`
            ),
          }}
        />
        <div className="flex items-center justify-between">
          <span
            className="rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-[0.25em]"
            style={{ color: theme.accent, borderColor: `rgba(${theme.rgb}, 0.4)` }}
          >
            {poem.category}
          </span>
          {poem.featured && (
            <span className="font-script text-xl text-white/70">featured</span>
          )}
        </div>

        <h3 className="poem-card-title mt-5 font-display text-2xl text-white sm:text-3xl">
          {poem.title}
        </h3>
        <p className="mt-3 font-serif text-base leading-relaxed text-white/55">
          {poem.preview}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="font-sans text-xs text-white/35">{poem.date}</span>
          <span
            className="font-sans text-xs uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100"
            style={{ color: theme.accent }}
          >
            read →
          </span>
        </div>
      </motion.div>
    </motion.button>
  )
}
