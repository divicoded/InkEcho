import { motion } from 'framer-motion'
import { MOODS } from '../data/poems'
import { getTheme } from '../data/poems'

interface Props {
  active: string
  onChange: (id: string) => void
}

export default function MoodSelector({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 px-4">
      {MOODS.map((mood) => {
        const theme = getTheme(mood.id)
        const isActive = active === mood.id
        return (
          <motion.button
            key={mood.id}
            onClick={() => onChange(mood.id)}
            data-cursor="hover"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative flex flex-col items-center rounded-2xl border px-5 py-3 transition-colors ${
              isActive
                ? 'border-white/40 bg-white/5'
                : 'border-white/10 bg-white/[0.02] hover:border-white/25'
            }`}
            style={isActive ? { boxShadow: `0 0 30px -8px rgba(${theme.rgb}, 0.6)` } : undefined}
          >
            <span
              className="font-display text-lg"
              style={{ color: isActive ? theme.accent : 'rgba(255,255,255,0.7)' }}
            >
              {mood.label}
            </span>
            <span className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.25em] text-white/35">
              {mood.id}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
