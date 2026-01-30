'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

// ════════════════════════════════════════════
// MAGNETIC INTERACTIONS
// Elements that attract to and follow the cursor
// Demonstrates: Magnetic fields, elastic snap-back,
// smooth cursor tracking, and interactive galleries
// ════════════════════════════════════════════

const CONFIG = {
  // Magnetic effect
  magneticRadius: 100,
  magneticStrength: 0.4,
  
  // Spring physics
  springStiffness: 0.15,
  springDamping: 0.7,
  
  // Snap-back
  snapBackDuration: 0.6,
  snapBackEase: 'elastic.out(1, 0.5)',
  
  // Colors
  accentColor: '#f97316',
  bgColor: '#0a0a0a',
}

// ═══════════════════════════════════════════════════════════
// UTILITY: Distance calculation
// ═══════════════════════════════════════════════════════════

function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

// ═══════════════════════════════════════════════════════════
// COMPONENT: Magnetic Button
// Button that follows cursor within a magnetic field
// ═══════════════════════════════════════════════════════════

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  radius?: number
  strength?: number
}

function MagneticButton({ 
  children, 
  className = '',
  radius = CONFIG.magneticRadius,
  strength = CONFIG.magneticStrength,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    if (!buttonRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const button = buttonRef.current
    const text = textRef.current
    
    function handleMouseMove(e: MouseEvent) {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distance = getDistance(e.clientX, e.clientY, centerX, centerY)
      
      if (distance < radius) {
        const distanceRatio = 1 - distance / radius
        const x = (e.clientX - centerX) * strength * distanceRatio
        const y = (e.clientY - centerY) * strength * distanceRatio
        
        gsap.to(button, {
          x,
          y,
          duration: 0.3,
          ease: 'power2.out',
        })
        
        // Text moves slightly more
        if (text) {
          gsap.to(text, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      }
    }
    
    function handleMouseLeave() {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: CONFIG.snapBackDuration,
        ease: CONFIG.snapBackEase,
      })
      
      if (text) {
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: CONFIG.snapBackDuration,
          ease: CONFIG.snapBackEase,
        })
      }
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [radius, strength])
  
  return (
    <button
      ref={buttonRef}
      className={`relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${className}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      <span ref={textRef} className="relative z-10 block">
        {children}
      </span>
    </button>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 1: Magnetic Buttons Showcase
// ═══════════════════════════════════════════════════════════

function MagneticButtonsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <p className="text-orange-400 mb-12 text-sm uppercase tracking-widest">
          Hover near the buttons
        </p>
        
        <div className="flex flex-wrap gap-8 justify-center">
          <MagneticButton 
            className="px-12 py-6 bg-orange-500 text-black font-bold text-xl rounded-full hover:bg-orange-400 transition-colors"
            strength={0.5}
            radius={150}
          >
            Get Started
          </MagneticButton>
          
          <MagneticButton 
            className="px-12 py-6 border-2 border-orange-500 text-orange-500 font-bold text-xl rounded-full hover:bg-orange-500/10 transition-colors"
            strength={0.4}
            radius={120}
          >
            Learn More
          </MagneticButton>
          
          <MagneticButton 
            className="px-12 py-6 bg-neutral-800 text-white font-bold text-xl rounded-full hover:bg-neutral-700 transition-colors"
            strength={0.3}
            radius={100}
          >
            Contact
          </MagneticButton>
        </div>
        
        <p className="text-neutral-500 mt-16 text-lg max-w-lg mx-auto">
          Buttons attract to your cursor with elastic physics, then snap back when you leave
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: Magnetic Navigation
// Nav links with magnetic attraction
// ═══════════════════════════════════════════════════════════

function MagneticNavSection() {
  const navItems = ['Home', 'Work', 'About', 'Services', 'Contact']
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8 bg-neutral-950">
      <div className="text-center">
        <p className="text-orange-400 mb-16 text-sm uppercase tracking-widest">
          Magnetic Navigation
        </p>
        
        <nav className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center">
          {navItems.map((item) => (
            <MagneticButton
              key={item}
              className="text-4xl md:text-6xl font-bold text-neutral-300 hover:text-orange-400 transition-colors"
              strength={0.5}
              radius={100}
            >
              {item}
            </MagneticButton>
          ))}
        </nav>
        
        <p className="text-neutral-500 mt-16 text-lg">
          Each nav item has its own magnetic field
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: Elastic Circle Button
// Button with dramatic elastic snap-back
// ═══════════════════════════════════════════════════════════

function ElasticCircleButton() {
  const buttonRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!buttonRef.current || !innerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const button = buttonRef.current
    const inner = innerRef.current
    
    function handleMouseMove(e: MouseEvent) {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distance = getDistance(e.clientX, e.clientY, centerX, centerY)
      const maxRadius = rect.width
      
      if (distance < maxRadius) {
        const distanceRatio = 1 - distance / maxRadius
        const x = (e.clientX - centerX) * 0.6 * distanceRatio
        const y = (e.clientY - centerY) * 0.6 * distanceRatio
        
        gsap.to(button, {
          x: x * 0.5,
          y: y * 0.5,
          duration: 0.4,
          ease: 'power2.out',
        })
        
        gsap.to(inner, {
          x: x * 0.8,
          y: y * 0.8,
          scale: 1.1,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    }
    
    function handleMouseLeave() {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      })
      
      gsap.to(inner, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      })
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <p className="text-orange-400 mb-16 text-sm uppercase tracking-widest">
          Elastic Snap-Back
        </p>
        
        <div
          ref={buttonRef}
          className="w-64 h-64 md:w-80 md:h-80 mx-auto cursor-pointer relative"
        >
          <div
            ref={innerRef}
            className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/30"
          >
            <span className="text-3xl md:text-4xl font-bold text-black">
              PLAY
            </span>
          </div>
        </div>
        
        <p className="text-neutral-500 mt-16 text-lg max-w-md mx-auto">
          Move your cursor around the button — it stretches dramatically, then snaps back with elastic physics
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: Magnetic Image Gallery
// Images that tilt and shift towards cursor
// ═══════════════════════════════════════════════════════════

function MagneticGallery() {
  const images = [
    { id: 1, aspect: 'aspect-[3/4]', size: 'col-span-2 row-span-2' },
    { id: 2, aspect: 'aspect-square', size: 'col-span-1' },
    { id: 3, aspect: 'aspect-square', size: 'col-span-1' },
    { id: 4, aspect: 'aspect-[4/3]', size: 'col-span-2' },
    { id: 5, aspect: 'aspect-square', size: 'col-span-1' },
    { id: 6, aspect: 'aspect-[3/4]', size: 'col-span-1 row-span-2' },
  ]
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24 bg-neutral-950">
      <div className="max-w-6xl w-full">
        <p className="text-orange-400 mb-12 text-sm uppercase tracking-widest text-center">
          Magnetic Gallery
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <MagneticImage key={img.id} className={`${img.size} ${img.aspect}`} />
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-center text-lg">
          Each image tilts and shifts towards your cursor
        </p>
      </div>
    </section>
  )
}

function MagneticImage({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const container = containerRef.current
    const image = imageRef.current
    
    function handleMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      gsap.to(image, {
        rotateY: x * 15,
        rotateX: -y * 15,
        x: x * 20,
        y: y * 20,
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
    
    function handleMouseLeave() {
      gsap.to(image, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }
    
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <div
      ref={containerRef}
      className={`${className} cursor-pointer overflow-hidden rounded-2xl`}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={imageRef}
        className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/20"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-full h-full flex items-center justify-center text-orange-400/50 text-2xl font-bold">
          ✦
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 5: Floating Particles
// Particles that flee from cursor
// ═══════════════════════════════════════════════════════════

function FleeingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<(HTMLDivElement | null)[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 12,
  }))
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const container = containerRef.current
    let rafId: number
    
    function handleMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    
    function animate() {
      particlesRef.current.forEach((particle) => {
        if (!particle) return
        
        const rect = particle.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const particleX = rect.left - containerRect.left + rect.width / 2
        const particleY = rect.top - containerRect.top + rect.height / 2
        
        const dx = mouseRef.current.x - particleX
        const dy = mouseRef.current.y - particleY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const force = (150 - distance) / 150
          const angle = Math.atan2(dy, dx)
          
          gsap.to(particle, {
            x: -Math.cos(angle) * force * 50,
            y: -Math.sin(angle) * force * 50,
            scale: 1 - force * 0.3,
            duration: 0.3,
            ease: 'power2.out',
          })
        } else {
          gsap.to(particle, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
          })
        }
      })
      
      rafId = requestAnimationFrame(animate)
    }
    
    container.addEventListener('mousemove', handleMouseMove)
    rafId = requestAnimationFrame(animate)
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <p className="text-orange-400 mb-8 text-sm uppercase tracking-widest">
          Fleeing Particles
        </p>
        
        <div
          ref={containerRef}
          className="w-full max-w-2xl aspect-square mx-auto relative bg-neutral-900/50 rounded-3xl overflow-hidden"
        >
          {particles.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => { particlesRef.current[i] = el }}
              className="absolute rounded-full bg-orange-400"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                opacity: 0.6 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-lg max-w-md mx-auto">
          Particles flee from your cursor with elastic physics
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function MagneticButtonsShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Magnetic
          </h1>
          <p className="text-xl text-neutral-400">
            Interactive elements with magnetic cursor attraction
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Hover to interact
          </div>
        </div>
      </section>
      
      <MagneticButtonsSection />
      <MagneticNavSection />
      <ElasticCircleButton />
      <MagneticGallery />
      <FleeingParticles />
      
      {/* Footer */}
      <section className="py-32 text-center bg-neutral-950">
        <p className="text-neutral-500">End of Magnetic Interactions Showcase</p>
      </section>
    </div>
  )
}
