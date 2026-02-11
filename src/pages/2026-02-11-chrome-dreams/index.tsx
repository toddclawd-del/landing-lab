import { useEffect, useRef, useState } from 'react'
import './styles.css'

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

// Animated counter component
function Counter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, isInView } = useInView(0.5)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// Chrome Orb component
function ChromeOrb({ size = 200, delay = 0, className = '' }: { size?: number; delay?: number; className?: string }) {
  return (
    <div 
      className={`chrome-orb ${className}`}
      style={{ 
        width: size, 
        height: size,
        animationDelay: `${delay}s`
      }}
    />
  )
}

// Torus shape component
function ChromeTorus({ size = 120, delay = 0, className = '' }: { size?: number; delay?: number; className?: string }) {
  return (
    <div 
      className={`chrome-torus ${className}`}
      style={{ 
        width: size, 
        height: size * 0.4,
        animationDelay: `${delay}s`
      }}
    />
  )
}

// Feature card component
function FeatureCard({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) {
  const { ref, isInView } = useInView()

  return (
    <div 
      ref={ref}
      className={`feature-card ${isInView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  )
}

// Main component
export default function ChromeDreams() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const bentoRef = useInView(0.3)
  const ctaRef = useInView(0.5)

  // Mouse follow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Parallax effect for hero elements
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const scrollY = window.scrollY
      const orbs = heroRef.current.querySelectorAll('.chrome-orb, .chrome-torus')
      orbs.forEach((orb, i) => {
        const speed = 0.1 + (i * 0.05)
        ;(orb as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="chrome-dreams">
      {/* Mouse follow glow */}
      <div 
        className="mouse-glow"
        style={{ 
          left: mousePos.x,
          top: mousePos.y
        }}
      />

      {/* Starfield background */}
      <div className="starfield">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <span className="chrome-text">PRISM</span>
          </a>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#" className="nav-link nav-cta">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-shapes">
          <ChromeOrb size={180} delay={0} className="orb-1" />
          <ChromeOrb size={100} delay={0.5} className="orb-2" />
          <ChromeOrb size={60} delay={1} className="orb-3" />
          <ChromeTorus size={140} delay={0.3} className="torus-1" />
          <ChromeTorus size={80} delay={0.8} className="torus-2" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span className="badge-text">Now in public beta</span>
          </div>
          
          <h1 className="hero-title">
            <span className="chrome-text glitch" data-text="DESIGN">DESIGN</span>
            <br />
            <span className="chrome-text glitch" data-text="WITHOUT">WITHOUT</span>
            <br />
            <span className="chrome-text glitch" data-text="LIMITS">LIMITS</span>
          </h1>

          <p className="hero-subtitle">
            The creative suite that keeps up with your imagination.
            <br />
            No learning curve. No compromises. Just pure creation.
          </p>

          <div className="hero-cta">
            <button className="btn-y2k btn-primary">
              Start Creating Free
              <span className="btn-glow" />
            </button>
            <button className="btn-y2k btn-secondary">
              Watch Demo
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value chrome-text"><Counter end={50} suffix="K+" /></span>
              <span className="stat-label">Creators</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value chrome-text"><Counter end={10} suffix="M+" /></span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value chrome-text"><Counter end={99} suffix=".9%" /></span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2 className="section-title">
              <span className="chrome-text">Built for the future</span>
            </h2>
          </div>

          <div className="features-grid">
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Real-time collaboration that actually works. See changes instantly across your entire team."
              delay={0}
            />
            <FeatureCard
              icon="∞"
              title="Infinite Canvas"
              description="No boundaries, no constraints. Your workspace expands to match your biggest ideas."
              delay={100}
            />
            <FeatureCard
              icon="✨"
              title="AI-Powered"
              description="Your creative copilot. Generate, iterate, and refine faster than ever before."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="bento-section" id="about">
        <div 
          ref={bentoRef.ref}
          className={`bento-container ${bentoRef.isInView ? 'in-view' : ''}`}
        >
          <div className="bento-grid">
            {/* Large cell with chrome orb */}
            <div className="bento-cell cell-lg cell-orb">
              <div className="cell-orb-container">
                <ChromeOrb size={160} delay={0} />
              </div>
              <div className="cell-content">
                <span className="cell-label">3D INTEGRATION</span>
                <h3 className="cell-title">Native 3D objects</h3>
              </div>
            </div>

            {/* Stats cell */}
            <div className="bento-cell cell-stats">
              <div className="stats-display">
                <span className="stats-number chrome-text"><Counter end={247} /></span>
                <span className="stats-unit">ms</span>
              </div>
              <span className="cell-label">AVG. LATENCY</span>
            </div>

            {/* Quote cell */}
            <div className="bento-cell cell-quote">
              <blockquote className="quote">
                "The millennium called. It wants its aesthetic back — 
                <span className="quote-highlight">and we said YES.</span>"
              </blockquote>
            </div>

            {/* Mockup cell */}
            <div className="bento-cell cell-lg cell-mockup">
              <div className="mockup-window">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <span className="mockup-title">prism.app</span>
                </div>
                <div className="mockup-content">
                  <div className="mockup-sidebar">
                    <div className="mockup-tool" />
                    <div className="mockup-tool" />
                    <div className="mockup-tool" />
                    <div className="mockup-tool" />
                  </div>
                  <div className="mockup-canvas">
                    <div className="mockup-shape shape-1" />
                    <div className="mockup-shape shape-2" />
                    <div className="mockup-shape shape-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Features mini cell */}
            <div className="bento-cell cell-features">
              <div className="mini-features">
                <div className="mini-feature">
                  <span className="mini-icon">🎨</span>
                  <span className="mini-text">Color AI</span>
                </div>
                <div className="mini-feature">
                  <span className="mini-icon">📐</span>
                  <span className="mini-text">Smart Guides</span>
                </div>
                <div className="mini-feature">
                  <span className="mini-icon">🔄</span>
                  <span className="mini-text">Auto Layout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div 
          ref={ctaRef.ref}
          className={`cta-container ${ctaRef.isInView ? 'in-view' : ''}`}
        >
          <div className="cta-orbs">
            <ChromeOrb size={80} delay={0} className="cta-orb-1" />
            <ChromeOrb size={50} delay={0.3} className="cta-orb-2" />
          </div>
          
          <h2 className="cta-title">
            <span className="chrome-text">Ready to create at the speed of light?</span>
          </h2>
          
          <p className="cta-subtitle">
            Join 50,000+ creators already building the future.
          </p>
          
          <button className="btn-y2k btn-primary btn-lg">
            Get Started Free
            <span className="btn-glow" />
          </button>

          <p className="cta-note">No credit card required • Free forever for individuals</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="chrome-text footer-logo">PRISM</span>
            <p className="footer-tagline">Create at the speed of light</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <span className="footer-heading">Product</span>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Changelog</a>
            </div>
            <div className="footer-column">
              <span className="footer-heading">Resources</span>
              <a href="#">Documentation</a>
              <a href="#">Tutorials</a>
              <a href="#">Community</a>
            </div>
            <div className="footer-column">
              <span className="footer-heading">Company</span>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span>© 2026 PRISM. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
