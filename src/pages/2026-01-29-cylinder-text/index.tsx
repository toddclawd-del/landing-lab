/**
 * Cylinder Text Landing Page
 * Clean, minimal design with hero + cylinder text
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
  const triggerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const textWrapper = textWrapperRef.current
    const trigger = triggerRef.current
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[]

    if (!wrapper || !textWrapper || !trigger || items.length === 0) return

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

    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger,
      start: 'top top',
      end: '+=2000',
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
      scrollTrigger.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={styles.container}>
      {/* Back button */}
      <Link to="/" style={styles.backButton}>
        ← Back
      </Link>

      {/* Hero Section */}
      <section style={styles.hero}>
        {/* Wordmark */}
        <div style={styles.wordmark}>STUDIO</div>
        
        {/* Main statement */}
        <h1 style={styles.heroTitle}>We create.</h1>
        
        {/* Scroll indicator */}
        <div style={styles.scrollIndicator}>
          <span style={styles.scrollText}>Scroll</span>
          <span style={styles.scrollArrow}>↓</span>
        </div>
      </section>

      {/* Cylinder Text Section */}
      <section ref={triggerRef} style={styles.cylinderSection}>
        <div ref={wrapperRef} style={styles.wrapper}>
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
      </section>

      {/* Spacer for scroll */}
      <div style={styles.spacer} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        html, body { overflow-x: hidden; }
      `}</style>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: '#5046e4',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    minHeight: '100vh',
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
  },
  
  // Hero
  hero: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  wordmark: {
    position: 'absolute',
    top: 28,
    right: 24,
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: '0.2em',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 'clamp(4rem, 15vw, 12rem)',
    fontWeight: 700,
    fontStyle: 'italic',
    letterSpacing: '-0.03em',
    margin: 0,
    textAlign: 'center',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    color: 'rgba(255, 255, 255, 0.5)',
    animation: 'bounce 2s ease-in-out infinite',
  },
  scrollText: {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  scrollArrow: {
    fontSize: 18,
  },

  // Cylinder section
  cylinderSection: {
    minHeight: '100vh',
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
  
  // Spacer
  spacer: {
    height: '100vh',
  },
}

export default CylinderTextPage
