import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ['ink', 'becomes', 'voice', 'becomes', 'echo']

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timers: number[] = []
    WORDS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), 380 * (i + 1)))
    })
    timers.push(window.setTimeout(onDone, 380 * (WORDS.length + 1) + 600))
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  // Smooth progress fill that eases toward 100% as the words reveal.
  useEffect(() => {
    const target = (step / WORDS.length) * 100
    const id = window.setTimeout(() => setProgress(target), 120)
    return () => clearTimeout(id)
  }, [step])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink-950"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Soft radial bloom behind the wordmark */}
        <div className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full bg-white/[0.06] blur-3xl" />

        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-script text-6xl text-white/90 text-glow sm:text-7xl"
        >
          InkEcho
        </motion.div>

        <div className="mt-6 flex h-8 items-center gap-2 text-sm tracking-[0.3em] text-white/50">
          {WORDS.slice(0, step).map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="animate-[floaty_4s_ease-in-out_infinite]"
            >
              {w}
            </motion.span>
          ))}
          <span className="ml-1 inline-block h-4 w-px animate-pulse bg-white/60" />
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-white/40 via-white/90 to-white/40"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        <span className="mt-3 font-sans text-[10px] uppercase tracking-[0.4em] text-white/30">
          {Math.round(progress)}%
        </span>
      </motion.div>
    </AnimatePresence>
  )
}
