import { useEffect, useRef, useState } from 'react'
import './styles.css'

// Audio visualizer bar component
const VisualizerBar = ({ index }: { index: number }) => {
  const [height, setHeight] = useState(20)
  
  useEffect(() => {
    const animate = () => {
      const newHeight = 20 + Math.random() * 60
      setHeight(newHeight)
    }
    const interval = setInterval(animate, 150 + Math.random() * 300)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div 
      className="visualizer-bar"
      style={{ 
        height: `${height}%`,
        animationDelay: `${index * 50}ms`
      }}
    />
  )
}

// Feature card component
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: string
  title: string
  description: string
  delay: number 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])
  
  return (
    <div 
      ref={ref}
      className={`feature-card ${isVisible ? 'visible' : ''}`}
    >
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  )
}

// Stars background component
const StarsBackground = () => {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 60}%`,
    size: Math.random() * 2 + 1,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2
  }))
  
  return (
    <div className="stars-container">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  )
}

export default function Neonwave() {
  const [heroVisible, setHeroVisible] = useState(false)
  const [email, setEmail] = useState('')
  
  useEffect(() => {
    // Trigger hero animation on mount
    const timer = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission placeholder
    alert(`Welcome to the grid, ${email}!`)
    setEmail('')
  }
  
  return (
    <div className="neonwave-page">
      {/* VHS Scanlines Overlay */}
      <div className="scanlines" />
      
      {/* Navigation */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <span className="nav-logo-text">NEONWAVE</span>
        </a>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#visualizer" className="nav-link">Experience</a>
          <button className="nav-cta">Launch App</button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="hero">
        <StarsBackground />
        
        {/* Sunset gradient background */}
        <div className="sunset-gradient" />
        
        {/* Retro sun with slices */}
        <div className="retro-sun">
          <div className="sun-glow" />
        </div>
        
        {/* Perspective grid */}
        <div className="perspective-grid" />
        
        {/* Hero content */}
        <div className={`hero-content ${heroVisible ? 'visible' : ''}`}>
          <h1 className="hero-title chrome-text">NEONWAVE</h1>
          <p className="hero-subtitle">
            Music Production Reimagined for the Retro Future
          </p>
          <a href="#cta" className="hero-cta neon-button">
            Enter the Grid
          </a>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">
          <span className="neon-text">THE TOOLKIT</span>
        </h2>
        <div className="features-grid">
          <FeatureCard
            icon="◈"
            title="ANALOG SOUL"
            description="Hardware-modeled synths that feel alive. Every oscillator, every filter — captured in digital perfection."
            delay={0}
          />
          <FeatureCard
            icon="◇"
            title="TIME WARP"
            description="Instant 80s processing chain presets. From subtle warmth to full VHS tape saturation."
            delay={150}
          />
          <FeatureCard
            icon="◆"
            title="GRID SEQUENCER"
            description="Visual beatmaking with neon precision. See your rhythm. Feel the pulse."
            delay={300}
          />
        </div>
      </section>
      
      {/* Visualizer Section */}
      <section id="visualizer" className="visualizer-section">
        <div className="visualizer-container">
          <h2 className="visualizer-title">FEEL THE FREQUENCY</h2>
          <div className="visualizer">
            {Array.from({ length: 32 }, (_, i) => (
              <VisualizerBar key={i} index={i} />
            ))}
          </div>
          <p className="visualizer-text">
            Real-time audio visualization powered by WebAudio
          </p>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="cta" className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            <span className="neon-text-cyan">50,000+</span> producers riding the wave
          </h2>
          <p className="cta-subtitle">
            Join the retrowave revolution. Get early access.
          </p>
          <form className="cta-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="cta-input"
              required
            />
            <button type="submit" className="neon-button cta-button">
              Get Early Access
            </button>
          </form>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <span className="footer-logo">NEONWAVE</span>
          <div className="footer-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Support</a>
          </div>
          <p className="footer-copy">© 2026 Neonwave Inc. All rights reserved.</p>
        </div>
        <div className="footer-glow" />
      </footer>
    </div>
  )
}
