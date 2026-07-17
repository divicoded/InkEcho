import { useEffect, useState } from 'react'

interface Props {
  number?: number
}

interface Meteor {
  id: number
  left: number
  delay: number
  duration: number
  size: number
}

// Ambient drifting meteors - a react-bits.dev inspired accent layer.
export default function Meteors({ number = 18 }: Props) {
  const [meteors, setMeteors] = useState<Meteor[]>([])

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    const count = isMobile ? Math.min(number, 8) : number
    const items: Meteor[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 100),
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
      size: 0.6 + Math.random() * 1.4,
    }))
    setMeteors(items)
  }, [number])

  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden" aria-hidden>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor"
          style={{
            left: `${m.left}%`,
            top: '-10%',
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
            ['--s' as string]: m.size,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
