/**
 * Cylinder Text Landing Page
 * Full landing page featuring the 3D cylinder text animation
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const CAPABILITIES = [
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
    <div style={styles.page}>
      {/* Back button */}
      <Link to="/" style={styles.backButton}>← Back</Link>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>◆</span>
          <span>VERTEX</span>
        </div>
        <nav style={styles.nav}>
          <a href="#capabilities" style={styles.navLink}>Capabilities</a>
          <a href="#contact" style={styles.ctaBtn}>Get in Touch</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          We craft digital<br />
          <span style={styles.heroHighlight}>experiences</span> that<br />
          captivate & convert
        </h1>
        <p style={styles.heroSub}>
          VERTEX is a creative studio specializing in brand strategy, 
          immersive design, and cutting-edge digital experiences.
        </p>
        <div style={styles.heroButtons}>
          <a href="#capabilities" style={styles.primaryBtn}>Explore Our Work →</a>
          <a href="#contact" style={styles.secondaryBtn}>Start a Project</a>
        </div>
      </section>

      {/* Cylinder Text Section */}
      <section id="capabilities">
        <div ref={wrapperRef} style={styles.wrapper}>
          <p ref={titleRef} style={styles.title}>
            Scroll to explore our capabilities
          </p>

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
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.featuresTitle}>Why Work With Us</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎯</div>
            <h3 style={styles.featureTitle}>Strategic Foundation</h3>
            <p style={styles.featureDesc}>Every project starts with deep research and strategic thinking.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>✨</div>
            <h3 style={styles.featureTitle}>Immersive Design</h3>
            <p style={styles.featureDesc}>We create experiences that engage and delight users.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>Technical Excellence</h3>
            <p style={styles.featureDesc}>Built with modern tools and best practices.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🤝</div>
            <h3 style={styles.featureTitle}>Collaboration</h3>
            <p style={styles.featureDesc}>We work as an extension of your team.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to start your project?</h2>
        <p style={styles.ctaSub}>Let's create something amazing together.</p>
        <a href="mailto:hello@vertex.studio" style={styles.ctaButton}>Get in Touch →</a>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span>© 2026 VERTEX Studio</span>
          <span style={styles.footerCredit}>
            Inspired by <a href="https://tympanus.net/codrops/" style={styles.footerLink}>Codrops</a>
          </span>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #5046e4 0%, #3730a3 100%)',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    color: '#ffffff',
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
    padding: '8px 12px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    zIndex: 50,
    background: 'rgba(80, 70, 228, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 700,
    fontSize: '1.25rem',
  },
  logoIcon: {
    color: '#ffffff',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  ctaBtn: {
    color: '#5046e4',
    background: '#ffffff',
    textDecoration: 'none',
    padding: '0.6rem 1.25rem',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  hero: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '6rem 2rem 4rem',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
  },
  heroHighlight: {
    background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: 'rgba(255, 255, 255, 0.7)',
    maxWidth: '600px',
    marginBottom: '2.5rem',
    lineHeight: 1.6,
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryBtn: {
    background: '#ffffff',
    color: '#5046e4',
    padding: '1rem 2rem',
    borderRadius: 12,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1rem',
  },
  secondaryBtn: {
    background: 'rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: 12,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.3)',
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
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    fontWeight: 400,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    margin: 0,
  },
  textWrapper: {
    position: 'absolute',
    fontSize: 'clamp(2rem, 5vw, 4rem)',
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
    textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
  },
  features: {
    padding: '6rem 2rem',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  featuresTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '3rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '2rem',
    borderRadius: 16,
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  featureDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.95rem',
    lineHeight: 1.5,
  },
  cta: {
    padding: '6rem 2rem',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    marginBottom: '1rem',
  },
  ctaSub: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1.125rem',
    marginBottom: '2rem',
  },
  ctaButton: {
    display: 'inline-block',
    background: '#ffffff',
    color: '#5046e4',
    padding: '1rem 2.5rem',
    borderRadius: 12,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1.1rem',
  },
  footer: {
    padding: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  footerInner: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.875rem',
  },
  footerCredit: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  footerLink: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
}

export default CylinderTextPage
