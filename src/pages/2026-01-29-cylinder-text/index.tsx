/**
 * Cylinder Text Landing Page
 * Clean, minimal design following the original Codrops reference
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  'Design',
  'Development',
  'Branding',
  'Marketing',
  'Copywriting',
  'Content',
  'Illustration',
  'Video',
  'Photography',
  '3D Graphics',
  'Animation',
  'Strategy',
]

function CylinderTextPage() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textWrapperRef = useRef<HTMLUListElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const textWrapper = textWrapperRef.current
    const title = titleRef.current
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[]

    if (!wrapper || !textWrapper || !title || items.length === 0) return

    const calculatePositions = () => {
      const offset = 0.4
      const radius = Math.min(window.innerWidth, window.innerHeight) * offset
      const spacing = 180 / items.length

      items.forEach((item, index) => {
        const angle = (index * spacing * Math.PI) / 180
        const rotationAngle = index * -spacing

        const x = 0
        const y = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        item.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotationAngle}deg)`
      })
    }

    calculatePositions()

    const trigger = ScrollTrigger.create({
      trigger: title,
      start: 'center center',
      end: '+=2000vh',
      pin: wrapper,
      scrub: 2,
      animation: gsap.fromTo(
        textWrapper,
        { rotateX: -80 },
        { rotateX: 270, ease: 'none' }
      ),
    })

    const handleResize = () => calculatePositions()
    window.addEventListener('resize', handleResize)

    return () => {
      trigger.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={styles.container}>
      {/* Back button */}
      <Link to="/" style={styles.backButton}>
        ← Back
      </Link>

      {/* Branding */}
      <div style={styles.branding}>CYLINDER TEXT</div>

      {/* Main cylinder section */}
      <div ref={wrapperRef} style={styles.wrapper}>
        <p ref={titleRef} style={styles.title}>
          Keep scrolling to see the animation
        </p>

        <ul ref={textWrapperRef} style={styles.textWrapper}>
          {ITEMS.map((item, index) => (
            <li
              key={item}
              ref={(el) => { itemRefs.current[index] = el }}
              style={styles.textItem}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }
      `}</style>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '300vh',
    background: '#5046e4',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
  },
  backButton: {
    position: 'fixed',
    top: 24,
    left: 24,
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    zIndex: 100,
    transition: 'color 0.2s ease',
  },
  branding: {
    position: 'fixed',
    top: 24,
    right: 24,
    color: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: '0.15em',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: 100,
  },
  wrapper: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    perspective: '70vw',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10rem',
  },
  title: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
    fontWeight: 400,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    margin: 0,
  },
  textWrapper: {
    position: 'absolute',
    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
    lineHeight: 1,
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transformOrigin: 'center center',
    fontWeight: 700,
    textAlign: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  textItem: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '100%',
    backfaceVisibility: 'hidden',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    fontStyle: 'italic',
  },
}

export default CylinderTextPage
