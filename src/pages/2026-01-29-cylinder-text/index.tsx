/**
 * Cylinder Text Landing Page
 * Clean, minimal design with hero + cylinder text + projects
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

const PROJECTS = [
  { number: '01', title: 'Nike', category: 'Brand Identity' },
  { number: '02', title: 'Spotify', category: 'Web Experience' },
  { number: '03', title: 'Apple', category: 'Campaign' },
  { number: '04', title: 'Airbnb', category: 'Product Design' },
  { number: '05', title: 'Stripe', category: 'Visual Identity' },
]

function CylinderTextPage() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textWrapperRef = useRef<HTMLUListElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const textWrapper = textWrapperRef.current
    const trigger = triggerRef.current
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[]
    const projects = projectRefs.current.filter(Boolean) as HTMLDivElement[]

    if (!wrapper || !textWrapper || !trigger || items.length === 0) return

    // Calculate cylinder positions
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

    // Cylinder scroll animation
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

    // Project slide-in animations
    projects.forEach((project, index) => {
      const fromLeft = index % 2 === 0
      
      gsap.fromTo(
        project,
        { 
          x: fromLeft ? -200 : 200, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    const handleResize = () => calculatePositions()
    window.addEventListener('resize', handleResize)

    return () => {
      scrollTrigger.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>◆</span>
          <span style={styles.logoText}>STUDIO</span>
        </Link>
        <nav style={styles.nav}>
          <a href="#work" style={styles.navLink}>Work</a>
          <a href="#about" style={styles.navLink}>About</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>We create.</h1>
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

      {/* Projects Section */}
      <section id="work" style={styles.projectsSection}>
        <h2 style={styles.projectsTitle}>Selected Work</h2>
        
        <div style={styles.projectsList}>
          {PROJECTS.map((project, index) => (
            <div
              key={project.number}
              ref={(el) => { projectRefs.current[index] = el }}
              style={{
                ...styles.projectItem,
                textAlign: index % 2 === 0 ? 'left' : 'right',
              }}
            >
              <span style={styles.projectNumber}>{project.number}</span>
              <div style={styles.projectInfo}>
                <span style={styles.projectCategory}>{project.category}</span>
                <h3 style={styles.projectName}>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerCta}>
            <h3 style={styles.footerHeading}>Let's work together</h3>
            <a href="mailto:hello@studio.co" style={styles.footerEmail}>hello@studio.co</a>
          </div>
          
          <div style={styles.footerLinks}>
            <div style={styles.footerCol}>
              <span style={styles.footerLabel}>Social</span>
              <a href="#" style={styles.footerLink}>Instagram</a>
              <a href="#" style={styles.footerLink}>Twitter</a>
              <a href="#" style={styles.footerLink}>LinkedIn</a>
            </div>
            <div style={styles.footerCol}>
              <span style={styles.footerLabel}>Menu</span>
              <a href="#work" style={styles.footerLink}>Work</a>
              <a href="#about" style={styles.footerLink}>About</a>
              <a href="#contact" style={styles.footerLink}>Contact</a>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <span style={styles.footerCopy}>© 2026 Studio. All rights reserved.</span>
          <span style={styles.footerCredit}>
            Design by <a href="https://tympanus.net/codrops/" style={styles.footerCreditLink}>Codrops</a>
          </span>
        </div>
      </footer>

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
  
  // Header
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#ffffff',
  },
  logoIcon: {
    fontSize: '1.25rem',
    opacity: 0.8,
  },
  logoText: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    transition: 'color 0.2s ease',
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
  
  // Projects section
  projectsSection: {
    padding: '15vh 8vw',
    minHeight: '100vh',
  },
  projectsTitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginBottom: '10vh',
  },
  projectsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8vh',
  },
  projectItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    opacity: 0,
  },
  projectNumber: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
    fontWeight: 500,
    letterSpacing: '0.1em',
  },
  projectInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  projectCategory: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
    fontWeight: 400,
  },
  projectName: {
    color: '#ffffff',
    fontSize: 'clamp(3rem, 10vw, 8rem)',
    fontWeight: 700,
    fontStyle: 'italic',
    letterSpacing: '-0.03em',
    margin: 0,
    lineHeight: 1,
  },

  // Footer
  footer: {
    padding: '8vh 8vw 4vh',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '4rem',
    marginBottom: '6vh',
  },
  footerCta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  footerHeading: {
    color: '#ffffff',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    fontStyle: 'italic',
    letterSpacing: '-0.02em',
    margin: 0,
  },
  footerEmail: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    paddingBottom: '0.25rem',
    width: 'fit-content',
  },
  footerLinks: {
    display: 'flex',
    gap: '4rem',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  footerLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
  },
  footerLink: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontSize: '0.9375rem',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  },
  footerCopy: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: '0.8125rem',
  },
  footerCredit: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: '0.8125rem',
  },
  footerCreditLink: {
    color: 'rgba(255, 255, 255, 0.5)',
    textDecoration: 'none',
  },
}

export default CylinderTextPage
