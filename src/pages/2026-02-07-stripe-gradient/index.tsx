import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './stripe.css'

// ========================================
// ANIMATED GRADIENT CANVAS (Stripe's Signature)
// ========================================
const AnimatedGradient = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const isVisibleRef = useRef(true)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // High DPI support
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    
    // Gradient colors from spec
    const colors = [
      { r: 110, g: 195, b: 244 }, // Light blue
      { r: 58, g: 58, b: 255 },   // Deep blue
      { r: 255, g: 97, b: 171 },  // Pink
      { r: 230, g: 57, b: 70 },   // Red-coral
    ]
    
    // Blob positions (normalized 0-1)
    const blobs = colors.map((color, i) => ({
      x: 0.25 + (i % 2) * 0.5,
      y: 0.25 + Math.floor(i / 2) * 0.5,
      vx: (Math.random() - 0.5) * 0.002,
      vy: (Math.random() - 0.5) * 0.002,
      radius: 0.35 + Math.random() * 0.15,
      color,
    }))
    
    let time = 0
    
    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      
      time += 0.003
      
      const width = rect.width
      const height = rect.height
      
      // Clear canvas
      ctx.fillStyle = '#0A2540'
      ctx.fillRect(0, 0, width, height)
      
      // Update and draw blobs
      blobs.forEach((blob, i) => {
        // Organic movement
        blob.x += blob.vx + Math.sin(time + i) * 0.001
        blob.y += blob.vy + Math.cos(time + i * 0.7) * 0.001
        
        // Bounce at edges
        if (blob.x < 0.1 || blob.x > 0.9) blob.vx *= -1
        if (blob.y < 0.1 || blob.y > 0.9) blob.vy *= -1
        
        // Clamp
        blob.x = Math.max(0.1, Math.min(0.9, blob.x))
        blob.y = Math.max(0.1, Math.min(0.9, blob.y))
        
        // Draw radial gradient blob
        const x = blob.x * width
        const y = blob.y * height
        const radius = blob.radius * Math.min(width, height)
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.8)`)
        gradient.addColorStop(0.5, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.3)`)
        gradient.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`)
        
        ctx.globalCompositeOperation = 'lighter'
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      })
      
      // Reset composite
      ctx.globalCompositeOperation = 'source-over'
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    // Intersection observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas)
    
    animate()
    
    // Handle resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="stripe-gradient-canvas"
      aria-hidden="true"
    />
  )
}

// ========================================
// COUNTER ANIMATION HOOK
// ========================================
const useCounter = (end: number, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const hasStarted = useRef(false)
  
  useEffect(() => {
    if (!startOnView || !isInView || hasStarted.current) return
    hasStarted.current = true
    
    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, end, duration, startOnView])
  
  return { count, ref }
}

// ========================================
// COMPONENTS
// ========================================

// Hero Section
const Hero = () => {
  return (
    <section className="stripe-hero">
      <div className="stripe-hero-content">
        <motion.div
          className="stripe-hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Triple-layered text for blend effect */}
          <h1 className="stripe-hero-title">
            <span className="text-layer text-above">
              Financial infrastructure<br />for the internet
            </span>
            <span className="text-layer text-blended" aria-hidden="true">
              Financial infrastructure<br />for the internet
            </span>
            <span className="text-layer text-overlay" aria-hidden="true">
              Financial infrastructure<br />for the internet
            </span>
          </h1>
        </motion.div>
        
        <motion.p
          className="stripe-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Millions of companies of all sizes use Stripe online and in person to accept payments, 
          send payouts, automate financial processes, and ultimately grow revenue.
        </motion.p>
        
        <motion.div
          className="stripe-hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="stripe-btn stripe-btn-primary">
            Start now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z"/>
            </svg>
          </button>
          <button className="stripe-btn stripe-btn-secondary">
            <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Contact sales
          </button>
        </motion.div>
      </div>
      
      {/* Skewed gradient overlay at bottom */}
      <div className="stripe-hero-skew" />
    </section>
  )
}

// Stats Section
const Stats = () => {
  const stat1 = useCounter(250)
  const stat2 = useCounter(50)
  const stat3 = useCounter(135)
  const stat4 = useCounter(99.999)
  
  const stats = [
    { ref: stat1.ref, value: `${stat1.count}M+`, label: 'API requests per day' },
    { ref: stat2.ref, value: `${stat2.count}+`, label: 'Countries with local acquiring' },
    { ref: stat3.ref, value: `${stat3.count}+`, label: 'Currencies and payment methods' },
    { ref: stat4.ref, value: `${(stat4.count / 1000).toFixed(3)}%`, label: 'Uptime SLA' },
  ]
  
  return (
    <section className="stripe-stats">
      <div className="stripe-container">
        <div className="stripe-stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              ref={stat.ref}
              className="stripe-stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="stripe-stat-value">{stat.value}</div>
              <div className="stripe-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Customer Card
interface CustomerCardProps {
  name: string
  logo: string
  metrics: { value: string; label: string }[]
  products: string[]
  delay?: number
}

const CustomerCard = ({ logo, metrics, products, delay = 0 }: CustomerCardProps) => (
  <motion.div
    className="stripe-customer-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4 }}
  >
    <div className="stripe-customer-logo">{logo}</div>
    <div className="stripe-customer-metrics">
      {metrics.map((m, i) => (
        <div key={i} className="stripe-customer-metric">
          <span className="metric-value">{m.value}</span>
          <span className="metric-label">{m.label}</span>
        </div>
      ))}
    </div>
    <div className="stripe-customer-products">
      {products.map((p, i) => (
        <span key={i} className="stripe-product-tag">{p}</span>
      ))}
    </div>
    <a href="#" className="stripe-customer-link">
      Read the story
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z"/>
      </svg>
    </a>
  </motion.div>
)

// Customers Section
const Customers = () => {
  const customers = [
    {
      name: 'Figma',
      logo: 'Figma',
      metrics: [
        { value: '40%', label: 'Increase in revenue' },
        { value: '2x', label: 'Faster checkout' },
      ],
      products: ['Payments', 'Billing', 'Invoicing'],
    },
    {
      name: 'Notion',
      logo: 'Notion',
      metrics: [
        { value: '15M+', label: 'Active users' },
        { value: '99.9%', label: 'Payment success' },
      ],
      products: ['Payments', 'Billing'],
    },
    {
      name: 'OpenAI',
      logo: 'OpenAI',
      metrics: [
        { value: '100M+', label: 'API requests/day' },
        { value: '<100ms', label: 'Latency' },
      ],
      products: ['Payments', 'Billing', 'Connect'],
    },
    {
      name: 'Shopify',
      logo: 'Shopify',
      metrics: [
        { value: '$1B+', label: 'Daily volume' },
        { value: '175+', label: 'Countries' },
      ],
      products: ['Payments', 'Connect', 'Identity'],
    },
  ]
  
  return (
    <section className="stripe-customers">
      <div className="stripe-container">
        <motion.div
          className="stripe-section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Powering the world's best companies</h2>
          <p>From startups to Fortune 500s, the most innovative companies build on Stripe.</p>
        </motion.div>
        
        <div className="stripe-customers-grid">
          {customers.map((customer, i) => (
            <CustomerCard key={customer.name} {...customer} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Integration Paths Section
const Integrations = () => {
  const paths = [
    {
      title: 'No-code',
      description: "Use Stripe's prebuilt solutions with no code required.",
      icon: '◻️',
      link: 'Explore no-code',
    },
    {
      title: 'Pre-integrated',
      description: 'Connect to hundreds of platforms that already use Stripe.',
      icon: '🔗',
      link: 'View integrations',
    },
    {
      title: 'Build your own',
      description: 'Use our APIs, SDKs, and webhooks to build anything.',
      icon: '⚙️',
      link: 'Start building',
    },
  ]
  
  return (
    <section className="stripe-integrations">
      <div className="stripe-container">
        <motion.div
          className="stripe-section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Designed for developers</h2>
          <p>Get started in minutes with our robust documentation, SDKs, and API libraries.</p>
        </motion.div>
        
        <div className="stripe-integrations-grid">
          {paths.map((path, i) => (
            <motion.div
              key={path.title}
              className="stripe-integration-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="integration-icon">{path.icon}</div>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <a href="#" className="stripe-link">
                {path.link}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z"/>
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// API Code Block
const CodeDemo = () => {
  const codeSnippet = `const stripe = require('stripe')('sk_test_...');

const session = await stripe.checkout.sessions.create({
  line_items: [{
    price: 'price_H5ggYwtDq4fbrJ',
    quantity: 1,
  }],
  mode: 'payment',
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
});`
  
  return (
    <section className="stripe-code-demo">
      <div className="stripe-container">
        <div className="stripe-code-split">
          <motion.div
            className="stripe-code-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="stripe-code-label">Developer tools</span>
            <h2>Ship faster with prebuilt integrations</h2>
            <p>
              Reduce time to market with our APIs that handle everything from 
              payments to identity verification to tax calculation.
            </p>
            <a href="#" className="stripe-btn stripe-btn-primary">
              Read the docs
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z"/>
              </svg>
            </a>
          </motion.div>
          
          <motion.div
            className="stripe-code-block"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="code-header">
              <div className="code-dots">
                <span /><span /><span />
              </div>
              <span className="code-filename">checkout.js</span>
            </div>
            <pre><code>{codeSnippet}</code></pre>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  const columns = [
    {
      title: 'Products',
      links: ['Payments', 'Billing', 'Connect', 'Payouts', 'Atlas', 'Radar', 'Issuing', 'Terminal'],
    },
    {
      title: 'Solutions',
      links: ['Startups', 'Enterprises', 'SaaS', 'Platforms', 'Ecommerce', 'Marketplaces'],
    },
    {
      title: 'Developers',
      links: ['Documentation', 'API Reference', 'API Status', 'Changelog', 'Build a Stripe App'],
    },
    {
      title: 'Company',
      links: ['About', 'Customers', 'Partners', 'Jobs', 'Newsroom', 'Stripe Press'],
    },
  ]
  
  return (
    <footer className="stripe-footer">
      <div className="stripe-container">
        <div className="stripe-footer-grid">
          <div className="stripe-footer-brand">
            <svg className="stripe-logo" viewBox="0 0 60 25" fill="#635BFF">
              <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.03 1.04-.06 1.48zm-6.3-5.63c-1.03 0-2.14.83-2.24 2.8h4.51c-.05-1.97-1.24-2.8-2.27-2.8zM41.24 20.57V5.57h4.36v1.58c.93-1.28 2.49-1.94 4.03-1.94.47 0 .93.04 1.35.14v4.14c-.57-.18-1.18-.27-1.84-.27-1.36 0-2.73.58-3.54 1.58v9.77h-4.36zM26.7 20.57V6.2c0-.56.02-1.48.09-2.2h4.41c.07.37.13 1.15.13 1.64 1.1-1.3 2.83-2 4.6-2 2.96 0 4.52 1.94 4.52 5.08v11.85H36.1V9.98c0-1.36-.46-2.32-1.84-2.32-1.26 0-2.49.65-3.2 1.58v11.33H26.7zM22.3 3.52c0 1.3-.93 2.32-2.47 2.32-1.54 0-2.47-1.02-2.47-2.32s.93-2.31 2.47-2.31c1.54 0 2.47 1.01 2.47 2.31zm-4.65 17.05V5.57h4.36v15h-4.36zM8.07 20.57l-5.9-15h4.78l3.63 10.14L14.21 5.57h4.78l-5.9 15H8.07zM0 8.37h4.18V5.17L0 4.31v4.06z"/>
            </svg>
            <p className="footer-tagline">The new standard in online payments</p>
          </div>
          
          {columns.map((col) => (
            <div key={col.title} className="stripe-footer-col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="stripe-footer-bottom">
          <div className="footer-legal">
            <span>© 2026 Stripe, Inc.</span>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
          <div className="footer-locale">
            <button>🇺🇸 United States (English)</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ========================================
// MAIN PAGE
// ========================================
export default function StripeGradient() {
  return (
    <div className="stripe-page">
      {/* Full-page gradient background */}
      <div className="stripe-gradient-fullpage">
        <AnimatedGradient />
      </div>
      
      {/* Content layers */}
      <Hero />
      <Stats />
      <Customers />
      <CodeDemo />
      <Integrations />
      <Footer />
    </div>
  )
}
