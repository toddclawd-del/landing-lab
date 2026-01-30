'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

// ════════════════════════════════════════════
// ELASTIC / BOUNCY EFFECTS
// Physics-based spring animations
// Demonstrates: Elastic buttons, bouncy cards,
// spring navigation, jelly text, rubber band scroll
// ════════════════════════════════════════════

const CONFIG = {
  // Elastic settings
  elasticEase: 'elastic.out(1, 0.3)',
  bounceEase: 'bounce.out',
  backEase: 'back.out(2)',
  
  // Spring physics
  stiffness: 0.15,
  damping: 0.7,
  mass: 1,
  
  // Colors
  accentColor: '#ec4899',
  bgColor: '#0a0a0a',
}

// ═══════════════════════════════════════════════════════════
// SECTION 1: Elastic Button Hover
// Buttons with springy hover effects
// ═══════════════════════════════════════════════════════════

function ElasticButtons() {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])
  
  const buttons = [
    { text: 'Elastic', color: '#ec4899' },
    { text: 'Bounce', color: '#8b5cf6' },
    { text: 'Spring', color: '#06b6d4' },
  ]
  
  function handleMouseEnter(index: number) {
    const button = buttonsRef.current[index]
    if (!button) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    gsap.to(button, {
      scale: 1.1,
      duration: 0.6,
      ease: CONFIG.elasticEase,
    })
  }
  
  function handleMouseLeave(index: number) {
    const button = buttonsRef.current[index]
    if (!button) return
    
    gsap.to(button, {
      scale: 1,
      duration: 0.6,
      ease: CONFIG.elasticEase,
    })
  }
  
  function handleMouseDown(index: number) {
    const button = buttonsRef.current[index]
    if (!button) return
    
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
    })
  }
  
  function handleMouseUp(index: number) {
    const button = buttonsRef.current[index]
    if (!button) return
    
    gsap.to(button, {
      scale: 1.1,
      duration: 0.8,
      ease: CONFIG.elasticEase,
    })
  }
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <p className="text-pink-400 mb-12 text-sm uppercase tracking-widest">
          Elastic Button Hover
        </p>
        
        <div className="flex flex-wrap gap-6 justify-center">
          {buttons.map((button, i) => (
            <button
              key={i}
              ref={(el) => { buttonsRef.current[i] = el }}
              className="px-12 py-6 rounded-2xl font-bold text-xl text-white shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              style={{ backgroundColor: button.color }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              onMouseDown={() => handleMouseDown(i)}
              onMouseUp={() => handleMouseUp(i)}
              aria-label={`${button.text} button with elastic effect`}
            >
              {button.text}
            </button>
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-lg">
          Hover and click to see elastic spring effects
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: Bouncy Cards
// Cards with bounce animation on interaction
// ═══════════════════════════════════════════════════════════

function BouncyCards() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const cards = [
    { title: 'Design', icon: '🎨' },
    { title: 'Develop', icon: '⚡' },
    { title: 'Deploy', icon: '🚀' },
    { title: 'Scale', icon: '📈' },
  ]
  
  function handleClick(index: number) {
    const card = cardsRef.current[index]
    if (!card) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    // Bounce sequence
    gsap.timeline()
      .to(card, {
        y: -30,
        scale: 1.05,
        duration: 0.15,
        ease: 'power2.out',
      })
      .to(card, {
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: CONFIG.bounceEase,
      })
  }
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8 bg-neutral-950">
      <div className="text-center">
        <p className="text-pink-400 mb-12 text-sm uppercase tracking-widest">
          Bouncy Cards
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <button
              key={i}
              ref={(el) => { cardsRef.current[i] = el as HTMLDivElement }}
              className="w-36 h-44 md:w-44 md:h-52 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer border border-pink-500/20 hover:border-pink-500/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              onClick={() => handleClick(i)}
              aria-label={`${card.title} - Click to see bounce effect`}
            >
              <span className="text-4xl mb-3" aria-hidden="true">{card.icon}</span>
              <span className="font-bold text-white">{card.title}</span>
            </button>
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-lg">
          Click cards to see bounce effect
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: Spring-Loaded Navigation
// Nav items with spring animation on hover
// ═══════════════════════════════════════════════════════════

function SpringNavigation() {
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(2) // Middle item
  
  const items = ['Home', 'About', 'Work', 'Services', 'Contact']
  
  function handleMouseEnter(index: number) {
    setActiveIndex(index)
    
    const item = itemsRef.current[index]
    if (!item || !indicatorRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Move indicator with spring
    gsap.to(indicatorRef.current, {
      x: item.offsetLeft,
      width: item.offsetWidth,
      duration: prefersReducedMotion ? 0.1 : 0.6,
      ease: CONFIG.elasticEase,
    })
    
    // Scale item with spring
    gsap.to(item, {
      scale: 1.1,
      duration: prefersReducedMotion ? 0.1 : 0.4,
      ease: CONFIG.backEase,
    })
    
    // Reset other items
    itemsRef.current.forEach((el, i) => {
      if (el && i !== index) {
        gsap.to(el, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    })
  }
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <p className="text-pink-400 mb-16 text-sm uppercase tracking-widest">
          Spring-Loaded Navigation
        </p>
        
        <nav className="relative inline-flex gap-2 bg-neutral-800/50 p-2 rounded-full">
          {/* Sliding indicator */}
          <div
            ref={indicatorRef}
            className="absolute top-2 h-[calc(100%-16px)] bg-pink-500/20 rounded-full pointer-events-none"
            style={{ 
              left: 0, 
              width: 0,
            }}
          />
          
          {items.map((item, i) => (
            <a
              key={item}
              ref={(el) => { itemsRef.current[i] = el }}
              href="#"
              className={`relative px-6 py-3 rounded-full font-medium transition-colors ${
                i === activeIndex ? 'text-pink-400' : 'text-neutral-400 hover:text-white'
              }`}
              onMouseEnter={() => handleMouseEnter(i)}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <p className="text-neutral-500 mt-16 text-lg">
          Hover over nav items to see spring indicator
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: Jelly Text Effect
// Text that wobbles like jelly on hover
// ═══════════════════════════════════════════════════════════

function JellyText() {
  const textRef = useRef<HTMLHeadingElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])
  
  const text = 'JELLY'
  
  useEffect(() => {
    if (!textRef.current) return
    
    // Split into characters
    textRef.current.innerHTML = text
      .split('')
      .map((char, i) => `<span class="inline-block cursor-pointer" data-index="${i}">${char}</span>`)
      .join('')
    
    charsRef.current = Array.from(textRef.current.querySelectorAll('span'))
    
    // Add hover listeners
    charsRef.current.forEach((char, i) => {
      char.addEventListener('mouseenter', () => handleCharHover(i))
    })
    
    return () => {
      charsRef.current.forEach((char, i) => {
        char.removeEventListener('mouseenter', () => handleCharHover(i))
      })
    }
  }, [])
  
  function handleCharHover(index: number) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    charsRef.current.forEach((char, i) => {
      const distance = Math.abs(i - index)
      const delay = distance * 0.05
      const intensity = Math.max(0, 1 - distance * 0.3)
      
      gsap.timeline()
        .to(char, {
          y: -20 * intensity,
          scaleY: 1.3 * intensity + (1 - intensity),
          scaleX: 0.8 * intensity + (1 - intensity),
          duration: 0.15,
          delay,
          ease: 'power2.out',
        })
        .to(char, {
          y: 0,
          scaleY: 1,
          scaleX: 1,
          duration: 0.8,
          ease: CONFIG.elasticEase,
        })
    })
  }
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8 bg-neutral-950">
      <div className="text-center">
        <p className="text-pink-400 mb-12 text-sm uppercase tracking-widest">
          Jelly Text Effect
        </p>
        
        <h2
          ref={textRef}
          className="text-[10rem] md:text-[15rem] font-black leading-none bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
        >
          {text}
        </h2>
        
        <p className="text-neutral-500 mt-12 text-lg">
          Hover over each letter for jelly wobble
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 5: Rubber Band Scroll
// Content stretches when over-scrolling
// ═══════════════════════════════════════════════════════════

function RubberBandContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)
  const currentY = useRef(0)
  
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const container = containerRef.current
    const content = contentRef.current
    
    function handleMouseDown(e: MouseEvent) {
      setIsDragging(true)
      startY.current = e.clientY
      currentY.current = 0
    }
    
    function handleMouseMove(e: MouseEvent) {
      if (!isDragging) return
      
      const delta = e.clientY - startY.current
      currentY.current = delta
      
      // Rubber band resistance
      const resistance = 0.3
      const stretchedDelta = delta * resistance
      
      gsap.set(content, {
        y: stretchedDelta,
        scaleY: 1 + Math.abs(stretchedDelta) * 0.001,
      })
    }
    
    function handleMouseUp() {
      setIsDragging(false)
      
      gsap.to(content, {
        y: 0,
        scaleY: 1,
        duration: 1,
        ease: CONFIG.elasticEase,
      })
    }
    
    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <p className="text-pink-400 mb-12 text-sm uppercase tracking-widest">
          Rubber Band Content
        </p>
        
        <div
          ref={containerRef}
          className="cursor-grab active:cursor-grabbing select-none"
        >
          <div
            ref={contentRef}
            className="w-80 h-80 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-500/30"
            style={{ transformOrigin: 'center center' }}
          >
            <div className="text-center text-white">
              <span className="text-5xl mb-4 block">↕️</span>
              <p className="font-bold text-xl">Drag me!</p>
            </div>
          </div>
        </div>
        
        <p className="text-neutral-500 mt-12 text-lg">
          Click and drag to stretch, release to snap back
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 6: Elastic Modal
// Modal with bouncy open/close animation
// ═══════════════════════════════════════════════════════════

function ElasticModal() {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  
  function openModal() {
    setIsOpen(true)
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    gsap.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: prefersReducedMotion ? 0 : 0.3 }
    )
    
    gsap.fromTo(modalRef.current,
      { scale: 0.5, opacity: 0, y: 50 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        duration: prefersReducedMotion ? 0 : 0.8, 
        ease: CONFIG.elasticEase 
      }
    )
  }
  
  function closeModal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    gsap.to(backdropRef.current, { 
      opacity: 0, 
      duration: prefersReducedMotion ? 0 : 0.2 
    })
    
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 30,
      duration: prefersReducedMotion ? 0 : 0.3,
      ease: 'power2.in',
      onComplete: () => setIsOpen(false),
    })
  }
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8 bg-neutral-950">
      <div className="text-center">
        <p className="text-pink-400 mb-12 text-sm uppercase tracking-widest">
          Elastic Modal
        </p>
        
        <button
          onClick={openModal}
          className="px-8 py-4 bg-pink-500 text-white font-bold text-xl rounded-xl hover:bg-pink-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          aria-label="Open elastic modal"
        >
          Open Modal
        </button>
        
        {/* Modal */}
        {isOpen && (
          <>
            <div
              ref={backdropRef}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={closeModal}
            />
            <div
              ref={modalRef}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-neutral-800 rounded-3xl p-8 z-50 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="elastic-modal-title"
            >
              <h3 id="elastic-modal-title" className="text-2xl font-bold mb-4">Elastic Modal</h3>
              <p className="text-neutral-400 mb-6">
                This modal opens with a bouncy elastic animation and closes smoothly.
              </p>
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800"
                aria-label="Close modal"
              >
                Close
              </button>
            </div>
          </>
        )}
        
        <p className="text-neutral-500 mt-12 text-lg">
          Click to open modal with elastic animation
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function ElasticEffectsShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Elastic Effects
          </h1>
          <p className="text-xl text-neutral-400">
            Bouncy, springy physics-based animations
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Scroll to bounce around
          </div>
        </div>
      </section>
      
      <ElasticButtons />
      <BouncyCards />
      <SpringNavigation />
      <JellyText />
      <RubberBandContent />
      <ElasticModal />
      
      {/* Footer */}
      <section className="py-32 text-center">
        <p className="text-neutral-500">End of Elastic Effects Showcase</p>
      </section>
    </div>
  )
}
