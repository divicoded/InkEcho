import { Emotion } from '../types'

interface Props {
  emotion: Emotion | string
  rgb: string
  className?: string
}

// Per-emotion decorative sub-elements rendered inside each poem card.
// Each emotion gets its own motif + palette so the wall reads at a glance.
export default function PoemDecor({ emotion, rgb, className = '' }: Props) {
  const common = {
    className: `pointer-events-none absolute inset-0 overflow-hidden ${className}`,
    'aria-hidden': true,
  } as const

  // Floating motes shared by every emotion (inspired by the Poems/ modal
  // floating particles) - gives the panel a living, breathing quality.
  const motes = (
    <>
      {[
        { left: '12%', top: '22%', s: 6, d: '0s', dur: '9s' },
        { left: '82%', top: '34%', s: 9, d: '1.4s', dur: '12s' },
        { left: '64%', top: '72%', s: 5, d: '2.6s', dur: '10s' },
        { left: '28%', top: '84%', s: 7, d: '0.8s', dur: '11s' },
        { left: '46%', top: '14%', s: 4, d: '2s', dur: '8s' },
      ].map((m, i) => (
        <span
          key={i}
          className="decor-float absolute rounded-full"
          style={{
            left: m.left,
            top: m.top,
            width: m.s,
            height: m.s,
            background: `rgba(${rgb}, 0.55)`,
            boxShadow: `0 0 8px rgba(${rgb}, 0.5)`,
            animationDelay: m.d,
            animationDuration: m.dur,
          }}
        />
      ))}
    </>
  )

  switch (emotion) {
    case 'Love':
      // Floating hearts + pink gradient wash
      return (
        <div {...common}>
          {motes}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(120% 80% at 80% -10%, rgba(${rgb},0.35), transparent 60%)`,
            }}
          />
          {[
            { left: '12%', top: '18%', s: 14, d: '0s' },
            { left: '78%', top: '30%', s: 20, d: '1.4s' },
            { left: '60%', top: '70%', s: 11, d: '2.6s' },
            { left: '30%', top: '82%', s: 16, d: '0.8s' },
          ].map((h, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className="decor-float absolute text-rose-300/70"
              style={{ left: h.left, top: h.top, width: h.s, height: h.s, animationDelay: h.d }}
              fill="currentColor"
            >
              <path d="M12 21s-7.5-4.9-10-9.2C.4 8.4 2 5 5.3 5c2 0 3.4 1.2 4.2 2.4C10.3 6.2 11.7 5 13.7 5 17 5 18.6 8.4 17 11.8 14.5 16.1 12 21 12 21z" />
            </svg>
          ))}
        </div>
      )

    case 'Melancholy':
      // Muted gray drifting fog + falling drop
      return (
        <div {...common}>
          {motes}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(100% 90% at 50% 120%, rgba(${rgb},0.4), transparent 55%)`,
            }}
          />
          <svg
            viewBox="0 0 24 24"
            className="decor-float absolute left-[70%] top-[24%] w-4 text-slate-300/50"
            style={{ animationDelay: '0.6s' }}
            fill="currentColor"
          >
            <path d="M12 2c0 5-4 6-4 10a4 4 0 0 0 8 0c0-4-4-5-4-10z" />
          </svg>
          <div className="decor-drift absolute -left-10 top-1/3 h-24 w-40 rounded-full bg-slate-400/10 blur-2xl" />
        </div>
      )

    case 'Dreams':
      // Stars + crescent moon, violet glow
      return (
        <div {...common}>
          {motes}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(120% 80% at 85% 0%, rgba(${rgb},0.4), transparent 60%)`,
            }}
          />
          <svg viewBox="0 0 24 24" className="absolute right-5 top-4 w-7 text-violet-200/70" fill="currentColor">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
          {[
            { left: '16%', top: '60%', s: 3, d: '0s' },
            { left: '40%', top: '30%', s: 2, d: '1s' },
            { left: '64%', top: '74%', s: 4, d: '2s' },
            { left: '28%', top: '80%', s: 2, d: '1.5s' },
          ].map((st, i) => (
            <span
              key={i}
              className="decor-twinkle absolute rounded-full bg-violet-100"
              style={{ left: st.left, top: st.top, width: st.s, height: st.s, animationDelay: st.d }}
            />
          ))}
        </div>
      )

    case 'Nature':
      // Leaves + green gradient
      return (
        <div {...common}>
          {motes}
          <div
            className="absolute inset-0 opacity-35"
            style={{
              background: `radial-gradient(120% 80% at 15% 110%, rgba(${rgb},0.4), transparent 60%)`,
            }}
          />
          {[
            { left: '14%', top: '24%', r: -20, d: '0s' },
            { left: '74%', top: '64%', r: 25, d: '1.8s' },
            { left: '58%', top: '20%', r: 10, d: '1s' },
          ].map((lf, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className="decor-float absolute text-emerald-300/60"
              style={{ left: lf.left, top: lf.top, width: 16, height: 16, transform: `rotate(${lf.r}deg)`, animationDelay: lf.d }}
              fill="currentColor"
            >
              <path d="M5 21c0-9 7-16 16-16 0 9-7 16-16 16zM5 21c4-4 7-7 11-11" stroke="currentColor" strokeWidth="1" fill="currentColor" />
            </svg>
          ))}
        </div>
      )

    case 'Longing':
      // Waves + distant shore glow, indigo.
      // The path is drawn across a doubled viewBox (0..240) so the -50%
      // translate in `decor-wave` loops seamlessly with no visible jump.
      return (
        <div {...common}>
          {motes}
          <div
            className="absolute inset-0 opacity-35"
            style={{
              background: `radial-gradient(120% 70% at 50% 0%, rgba(${rgb},0.35), transparent 60%)`,
            }}
          />
          <svg viewBox="0 0 240 40" className="absolute bottom-0 left-0 w-[200%] text-indigo-300/40" preserveAspectRatio="none" fill="currentColor">
            <path className="decor-wave" d="M0 20 Q15 8 30 20 T60 20 T90 20 T120 20 T150 20 T180 20 T210 20 T240 20 V40 H0 Z" />
          </svg>
          <svg viewBox="0 0 240 40" className="absolute bottom-1 left-0 w-[200%] text-indigo-200/25" preserveAspectRatio="none" fill="currentColor">
            <path className="decor-wave-slow" d="M0 26 Q15 16 30 26 T60 26 T90 26 T120 26 T150 26 T180 26 T210 26 T240 26 V40 H0 Z" />
          </svg>
        </div>
      )

    case 'Reflective':
    default:
      // Quiet concentric rings + stone glow
      return (
        <div {...common}>
          {motes}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(120% 80% at 50% 0%, rgba(${rgb},0.3), transparent 60%)`,
            }}
          />
          <div className="decor-pulse absolute right-6 top-6 h-16 w-16 rounded-full border border-stone-300/20" />
          <div className="decor-pulse absolute right-10 top-10 h-8 w-8 rounded-full border border-stone-300/15" style={{ animationDelay: '1s' }} />
        </div>
      )
  }
}
