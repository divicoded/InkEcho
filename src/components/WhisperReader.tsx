import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface Props {
  body: string
  accent: string
}

export default function WhisperReader({ body, accent }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const chars = el.querySelectorAll('.whisper-char')
    const anim = anime({
      targets: chars,
      opacity: [0, 1],
      translateY: [14, 0],
      delay: anime.stagger(6, { start: 200 }),
      duration: 900,
      easing: 'easeOutExpo',
    })
    return () => anim.pause()
  }, [body])

  const lines = body.split('\n')

  return (
    <div ref={containerRef} className="space-y-3 font-serif text-lg leading-loose text-white/85 sm:text-xl">
      {lines.map((line, li) => (
        <p key={li} className={line.trim() === '' ? 'h-3' : ''}>
          {line.split('').map((ch, ci) => (
            <span key={ci} className="whisper-char inline-block opacity-0" style={{ color: accent }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}
