/**
 * Creative Agency Landing Page
 * Dark, minimal design with smooth scroll animations
 * Uses GSAP ScrollTrigger for scroll-driven effects
 */

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// Data
// ============================================================================

const SERVICES = [
  { 
    icon: '✦', 
    title: 'Brand Identity', 
    description: 'Strategic brand development that tells your story and connects with your audience.' 
  },
  { 
    icon: '◈', 
    title: 'Web Design', 
    description: 'Beautiful, functional websites that convert visitors into customers.' 
  },
  { 
    icon: '◉', 
    title: 'Motion Design', 
    description: 'Dynamic animations that bring your brand to life across all platforms.' 
  },
  { 
    icon: '▣', 
    title: 'Product Design', 
    description: 'User-centered design that makes complex simple and delightful.' 
  },
]

const WORK = [
  { 
    id: 1, 
    title: 'Nebula', 
    category: 'Brand Identity', 
    year: '2024',
    color: '#6366f1',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop'
  },
  { 
    id: 2, 
    title: 'Flux', 
    category: 'Web Experience', 
    year: '2024',
    color: '#f43f5e',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop'
  },
  { 
    id: 3, 
    title: 'Aura', 
    category: 'Product Design', 
    year: '2023',
    color: '#10b981',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop'
  },
  { 
    id: 4, 
    title: 'Vertex', 
    category: 'Motion Design', 
    year: '2023',
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&h=600&fit=crop'
  },
]

const STATS = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '12', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '40+', label: 'Awards Won' },
]

const TESTIMONIALS = [
  {
    quote: "Studio transformed our brand identity completely. The attention to detail and creative vision exceeded our expectations.",
    author: "Sarah Chen",
    role: "CEO, TechFlow",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    quote: "Working with Studio was a game-changer. They delivered a website that truly captures our company's essence.",
    author: "Marcus Johnson",
    role: "Founder, Elevate",
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    quote: "The team's creativity and professionalism are unmatched. Our conversion rates doubled after the redesign.",
    author: "Emily Rodriguez",
    role: "CMO, Quantum",
    image: "https://i.pravatar.cc/150?img=5"
  },
]

// ============================================================================
// Components
// ============================================================================

function ScrollIndicator() {
  return (
    <motion.div 
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Scroll</span>
      <motion.div 
        className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="relative z-10">
        <motion.span 
          className="text-4xl mb-6 block"
          animate={{ rotate: isHovered ? 90 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {service.icon}
        </motion.span>
        <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
        <p className="text-white/50 leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  )
}

function WorkCard({ work, index }: { work: typeof WORK[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <motion.img
        src={work.image}
        alt={work.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      
      {/* Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Color Accent */}
      <motion.div 
        className="absolute top-4 right-4 w-3 h-3 rounded-full"
        style={{ backgroundColor: work.color }}
        animate={{ scale: isHovered ? 1.5 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <motion.div
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs text-white/50 tracking-wider uppercase">{work.category} · {work.year}</span>
          <h3 className="text-2xl font-bold text-white mt-1">{work.title}</h3>
        </motion.div>
        
        <motion.div
          className="mt-4 flex items-center gap-2 text-sm text-white/70"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <span>View Project</span>
          <span>→</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

function StatItem({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
      <div className="text-white/40 text-sm tracking-wider uppercase">{stat.label}</div>
    </motion.div>
  )
}

// Testimonial Card
function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  return (
    <motion.div
      className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Quote mark */}
      <div className="absolute top-6 right-8 text-6xl text-white/10 font-serif">"</div>
      
      <p className="text-white/70 text-lg leading-relaxed mb-6 relative z-10">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center gap-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-white">{testimonial.author}</div>
          <div className="text-sm text-white/40">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

// Primary CTA - Animated gradient border with dark interior
function BorderFlowButton({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white overflow-hidden ${className}`}
    >
      {/* Animated flowing border */}
      <span className="absolute inset-0 rounded-xl overflow-hidden">
        <span 
          className="absolute inset-[-200%] animate-[spin_4s_linear_infinite]"
          style={{
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              #6366f1 60deg,
              #f43f5e 120deg,
              #f59e0b 180deg,
              #f43f5e 240deg,
              #6366f1 300deg,
              transparent 360deg
            )`,
          }}
        />
      </span>
      {/* Dark inner */}
      <span className="absolute inset-[2px] rounded-[10px] bg-neutral-950" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Secondary CTA - Ghost outline that fills on hover
function GhostButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative px-8 py-4 rounded-xl font-medium border border-white/20 overflow-hidden ${className}`}
    >
      {/* Fill animation on hover */}
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{ scale: 0, borderRadius: '100%' }}
        animate={{ 
          scale: isHovered ? 1.5 : 0, 
          borderRadius: isHovered ? '0%' : '100%' 
        }}
        transition={{ duration: 0.4 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <span className={`relative z-10 transition-colors duration-300 ${isHovered ? 'text-black' : 'text-white'}`}>
        {children}
      </span>
    </motion.button>
  )
}

// Header CTA - Pill with indicator dot
function PillButton({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors ${className}`}
    >
      <span>{children}</span>
      <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
        <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
      </span>
    </motion.button>
  )
}

// Contact Modal
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: integrate with Formspree, Resend, or your backend
    console.log('Form submitted:', formState)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: '', email: '', message: '' })
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              ✕
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/50">We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-2">Start a Project</h3>
                <p className="text-white/50 mb-6">Tell us about your project and we'll get back to you within 24 hours.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <BorderFlowButton className="w-full">
                    Send Message →
                  </BorderFlowButton>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// Main Page
// ============================================================================

export default function CreativeAgencyPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    // Hero parallax - reduced movement to prevent overlap
    if (heroRef.current && titleRef.current) {
      gsap.to(titleRef.current, {
        y: 100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '80% top',
          scrub: true,
        },
      })
    }

    // Services section reveal
    const servicesEl = servicesRef.current
    if (servicesEl) {
      gsap.fromTo(
        servicesEl,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: servicesEl,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      {/* Header - Glassmorphism with entrance animation */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-3 rounded-2xl backdrop-blur-xl bg-neutral-950/70 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        {/* Back link */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm group"
        >
          <motion.span 
            className="inline-block"
            whileHover={{ x: -3 }}
          >
            ←
          </motion.span>
          <span className="hidden sm:inline">Back</span>
        </Link>
        
        {/* Logo with icon */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">STUDIO</span>
        </div>
        
        {/* CTA with pill indicator */}
        <PillButton onClick={() => setIsContactOpen(true)}>Contact</PillButton>
      </motion.header>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Animated mesh gradient background - unique visual */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
          
          {/* Animated blob 1 - indigo */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
              left: '10%',
              top: '20%',
            }}
            animate={{
              x: [0, 100, 50, 0],
              y: [0, 50, 100, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Animated blob 2 - rose */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)',
              right: '15%',
              bottom: '20%',
            }}
            animate={{
              x: [0, -80, -40, 0],
              y: [0, -60, 40, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Animated blob 3 - amber accent */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[80px]"
            style={{
              background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
              left: '50%',
              top: '60%',
            }}
            animate={{
              x: [0, 60, -30, 0],
              y: [0, -40, 60, 0],
              scale: [1, 1.2, 0.95, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Grain overlay for texture */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-white/40 text-sm tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Creative Agency
          </motion.p>
          
          <motion.h1
            ref={titleRef}
            className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            We craft
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-rose-400 to-amber-400">
              digital
            </span>
            <br />
            experiences
          </motion.h1>
          
          <motion.p
            className="mt-8 text-white/50 text-lg max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Award-winning design studio focused on brands, products, and immersive experiences.
          </motion.p>
        </div>
        
        <ScrollIndicator />
      </section>

      {/* Services */}
      <section ref={servicesRef} className="relative z-20 py-32 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white/30 text-sm tracking-[0.3em] uppercase">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 max-w-2xl">
              Services tailored to elevate your brand
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="py-32 px-6 md:px-12 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="text-white/30 text-sm tracking-[0.3em] uppercase">Selected Work</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Projects that speak
              </h2>
            </div>
            <GhostButton className="self-start md:self-auto">
              View All Work →
            </GhostButton>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WORK.map((work, index) => (
              <WorkCard key={work.id} work={work} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white/30 text-sm tracking-[0.3em] uppercase">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              What our clients say
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={testimonial.author} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-32 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/30 text-sm tracking-[0.3em] uppercase">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              A team obsessed with craft
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              We're a collective of designers, developers, and strategists who believe in the power of thoughtful design. Every pixel matters, every interaction counts.
            </p>
            <p className="text-white/50 text-lg leading-relaxed">
              Based in Denver, working globally. We partner with ambitious brands to create digital experiences that leave lasting impressions.
            </p>
          </motion.div>
          
          <motion.div
            className="relative aspect-square rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
              alt="Studio team collaborating in a modern office space"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-b from-neutral-900/50 to-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Let's create something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
              extraordinary
            </span>
          </motion.h2>
          
          <motion.p
            className="text-white/50 text-lg mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to elevate your brand? We'd love to hear about your project.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <BorderFlowButton className="text-lg" onClick={() => setIsContactOpen(true)}>
              Start a Project →
            </BorderFlowButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-white/30 text-sm">© 2024 Studio. All rights reserved.</span>
          <div className="flex gap-8">
            {['Twitter', 'Instagram', 'Dribbble', 'LinkedIn'].map((social) => (
              <button 
                key={social} 
                type="button"
                className="text-white/30 hover:text-white text-sm transition-colors"
                aria-label={`Follow us on ${social}`}
              >
                {social}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}

export { CreativeAgencyPage }
