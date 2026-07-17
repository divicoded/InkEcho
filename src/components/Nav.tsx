import { motion } from 'framer-motion'

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10"
    >
      <motion.a
        href="/Poems/index.html"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
        data-cursor="hover"
        className="liquid-logo group relative flex items-center gap-2 rounded-2xl px-4 py-2"
      >
        <span className="liquid-logo-shine" aria-hidden />
        <span className="font-script text-3xl leading-none text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.45)]">
          InkEcho
        </span>
      </motion.a>
      <a
        href="/Poems/index.html"
        target="_blank"
        rel="noreferrer"
        data-cursor="hover"
        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-sans text-xs uppercase tracking-[0.3em] text-white/50 backdrop-blur-md transition-all hover:border-white/30 hover:text-white"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/40 transition-colors group-hover:bg-white" />
        archive
      </a>
    </motion.header>
  )
}
