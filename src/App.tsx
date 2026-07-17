import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { POEMS, getTheme } from './data/poems'
import InkShader from './components/InkShader'
import Meteors from './components/Meteors'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Nav from './components/Nav'
import Hero from './components/Hero'
import MoodSelector from './components/MoodSelector'
import PoemCard from './components/PoemCard'
import PoemModal from './components/PoemModal'
import { Poem } from './types'
import { initSmoothScroll, getLenis, destroySmoothScroll } from './lib/smoothScroll'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [activeMood, setActiveMood] = useState('All')
  const [selected, setSelected] = useState<Poem | null>(null)
  const [showTop, setShowTop] = useState(false)

  const theme = useMemo(() => getTheme(activeMood), [activeMood])
  const featured = useMemo(() => POEMS.find((p) => p.featured) ?? null, [])
  const wallPoems = useMemo(
    () => (activeMood === 'All' ? POEMS : POEMS.filter((p) => p.emotion === activeMood)),
    [activeMood]
  )

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const lenis = initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToWall = () => {
    const el = document.getElementById('wall')
    const lenis = getLenis()
    if (el && lenis) lenis.scrollTo(el, { offset: -20 })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`relative min-h-screen bg-gradient-to-b ${theme.gradient} text-white`}>
      <InkShader rgb={theme.rgb} />
      <Meteors />
      {/* Animated mesh grid (inspired by the Poems/ wall) for subtle depth */}
      <div className="mesh-overlay" aria-hidden />
      <div className="noise-overlay" />
      <CustomCursor />
      <Nav />

      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>

      <main className="relative z-10">
        <Hero onExplore={scrollToWall} />

        {featured && (
          <section className="mx-auto max-w-6xl px-4 sm:px-8">
            <motion.button
              onClick={() => setSelected(featured)}
              data-cursor="hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="glass-card group relative block w-full overflow-hidden rounded-3xl p-8 text-left sm:p-10"
              style={{ boxShadow: `0 0 70px -25px rgba(${getTheme(featured.emotion).rgb}, 0.7)` }}
            >
              <span
                className="font-sans text-[10px] uppercase tracking-[0.3em]"
                style={{ color: getTheme(featured.emotion).accent }}
              >
                featured · {featured.date}
              </span>
              <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">{featured.title}</h2>
              <p className="mt-3 max-w-2xl font-serif text-base leading-relaxed text-white/55">
                {featured.preview}
              </p>
              <span
                className="mt-5 inline-block font-sans text-xs uppercase tracking-[0.2em] opacity-70 transition-opacity group-hover:opacity-100"
                style={{ color: getTheme(featured.emotion).accent }}
              >
                read the featured piece →
              </span>
            </motion.button>
          </section>
        )}

        <section id="wall" className="mx-auto max-w-6xl px-4 pb-32 pt-16 sm:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl text-white/90 sm:text-4xl">The Anthology</h2>
            <p className="mt-2 font-serif text-base italic text-white/45">
              Eight pieces, each a different weather of the soul.
            </p>
          </div>

          <div className="mb-12">
            <MoodSelector active={activeMood} onChange={setActiveMood} />
          </div>

          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {wallPoems.map((poem, i) => (
                <PoemCard key={poem.id} poem={poem} index={i} onOpen={setSelected} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <footer className="border-t border-white/10 py-10 text-center">
          <p className="font-script text-2xl text-white/50">InkEcho</p>
          <p className="mt-2 font-sans text-xs uppercase tracking-[0.3em] text-white/30">
            where ink becomes voice
          </p>
        </footer>
      </main>

      <AnimatePresence>
        {selected && <PoemModal poem={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={scrollTop}
            data-cursor="hover"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="fixed bottom-6 right-6 z-[60] rounded-full border border-white/20 bg-white/5 p-3 text-white/80 backdrop-blur-md transition-colors hover:border-white/50 hover:text-white"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
