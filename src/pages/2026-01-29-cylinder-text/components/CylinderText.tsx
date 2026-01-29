/**
 * 3D Cylinder Text Scroll Animation
 * Adapted for landing page showcase - displays capabilities/services
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CAPABILITIES = [
  'Brand Strategy',
  'Visual Identity',
  'Web Design',
  'Motion Graphics',
  '3D Experiences',
  'Product Design',
  'Interactive Art',
  'Digital Campaigns',
  'App Development',
  'Creative Direction',
  'Immersive Media',
  'Experience Design',
]

export function CylinderText() {
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
      const offset = 0.35
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
      end: '+=2500',
      pin: wrapper,
      scrub: 1.5,
      animation: gsap.fromTo(
        textWrapper,
        { rotateX: -80 },
        { rotateX: 280, ease: 'none' }
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
    <section style={styles.section}>
      <div ref={triggerRef} style={styles.trigger}>
        <div ref={wrapperRef} style={styles.wrapper}>
          {/* Section header */}
          <div style={styles.header}>
            <span style={styles.label}>Our Capabilities</span>
            <h2 style={styles.heading}>What We Create</h2>
            <p style={styles.subtitle}>Scroll to explore our full spectrum of services</p>
          </div>

          {/* 3D Cylinder */}
          <ul ref={textWrapperRef} style={styles.textWrapper}>
            {CAPABILITIES.map((item, index) => (
              <li
                key={item}
                ref={(el) => { itemRefs.current[index] = el }}
                style={styles.textItem}
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Decorative gradient orbs */}
          <div style={styles.orbPurple} />
          <div style={styles.orbPink} />
          <div style={styles.orbBlue} />
        </div>
      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: '#050505',
    position: 'relative',
  },
  trigger: {
    minHeight: '100vh',
  },
  wrapper: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    perspective: '60vw',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
  },
  header: {
    position: 'absolute',
    top: '12%',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    zIndex: 10,
  },
  label: {
    display: 'inline-block',
    color: '#8b5cf6',
    fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginBottom: '0.75rem',
    background: 'rgba(139, 92, 246, 0.1)',
    padding: '0.5rem 1rem',
    borderRadius: '100px',
    border: '1px solid rgba(139, 92, 246, 0.2)',
  },
  heading: {
    fontSize: 'clamp(1.75rem, 4vw, 3rem)',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0.5rem 0',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: 400,
  },
  textWrapper: {
    position: 'absolute',
    fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
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
    textShadow: '0 0 80px rgba(139, 92, 246, 0.5), 0 4px 30px rgba(0, 0, 0, 0.5)',
    background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  orbPurple: {
    position: 'absolute',
    width: '40vw',
    height: '40vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
    top: '20%',
    left: '-10%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  orbPink: {
    position: 'absolute',
    width: '35vw',
    height: '35vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
    bottom: '10%',
    right: '-5%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  },
  orbBlue: {
    position: 'absolute',
    width: '25vw',
    height: '25vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    top: '40%',
    right: '10%',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },
}

export default CylinderText
