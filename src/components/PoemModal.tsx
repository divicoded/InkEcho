import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Copy, Check } from 'lucide-react'
import { Poem } from '../types'
import { getTheme } from '../data/poems'
import { getLenis } from '../lib/smoothScroll'
import WhisperReader from './WhisperReader'
import PoemDecor from './PoemDecor'

interface Props {
  poem: Poem
  onClose: () => void
}

export default function PoemModal({ poem, onClose }: Props) {
  const theme = getTheme(poem.emotion)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  const wordCount = poem.body.trim().split(/\s+/).length
  const readingTime = Math.max(1, Math.round(wordCount / 200))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    // Pause Lenis so the background doesn't scroll behind the modal.
    getLenis()?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      getLenis()?.start()
    }
  }, [onClose])

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    setProgress(max > 0 ? el.scrollTop / max : 0)
  }

  const copyPoem = async () => {
    const text = `${poem.title}\n\n${poem.body}${poem.author ? `\n\n- ${poem.author}` : ''}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        layoutId={`poem-${poem.id}`}
        className="glass-panel relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl"
        style={{ boxShadow: `0 0 80px -20px rgba(${theme.rgb}, 0.5)` }}
      >
        {/* Unified dark scrim behind ALL content so the header and body
            read as one cohesive surface (no light/dark split). */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/80"
          aria-hidden
        />

        <div
          className="h-1 w-full origin-left"
          style={{
            transform: `scaleX(${progress})`,
            background: theme.accent,
            transition: 'transform 0.1s linear',
          }}
        />

        <div className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-10">
          <div>
            <span
              className="font-sans text-[10px] uppercase tracking-[0.3em]"
              style={{ color: theme.accent }}
            >
              {poem.category} · {poem.date} · {readingTime} min read
            </span>
            <h2 className="mt-1 font-display text-3xl text-white sm:text-4xl">{poem.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyPoem}
              data-cursor="hover"
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
              aria-label="Copy poem"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'copied' : 'copy'}
            </button>
            <button
              onClick={onClose}
              data-cursor="hover"
              className="rounded-full border border-white/15 p-2 text-white/70 transition-colors hover:border-white/50 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Subtle divider to separate header from body without a tonal cliff */}
        <div className="relative z-10 mx-6 mt-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent sm:mx-10" />

        <div
          ref={scrollRef}
          onScroll={onScroll}
          data-lenis-prevent
          className="hide-scrollbar relative mt-6 flex-1 overflow-y-auto px-6 pb-10 sm:px-10"
        >
          {/* Per-emotion decorative sub-elements, fixed behind the text */}
          <PoemDecor emotion={poem.emotion} rgb={theme.rgb} className="opacity-60" />
          {/* Light readability scrim so animated decor never hurts legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" aria-hidden />
          <div className="relative z-10">
            <WhisperReader body={poem.body} accent={theme.accent} />
            {poem.author && (
              <p className="mt-8 text-right font-script text-2xl text-white/60">
                - {poem.author}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
