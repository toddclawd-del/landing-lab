'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ════════════════════════════════════════════
// STAGGERED GRID ANIMATIONS
// Grid-based animations with various stagger patterns
// Demonstrates: Cascade reveals, ripple hovers,
// shuffle animations, and masonry reveals
// ════════════════════════════════════════════

const CONFIG = {
  // Grid settings
  gridCols: 6,
  gridRows: 4,
  
  // Stagger timing
  staggerEach: 0.05,
  itemDuration: 0.6,
  
  // Ripple effect
  rippleSpeed: 100, // ms per unit distance
  
  // Colors
  accentColor: '#f59e0b',
  bgColor: '#0a0a0a',
}

// ═══════════════════════════════════════════════════════════
// SECTION 1: Cascade Reveal
// Grid items animate in with various cascade patterns
// ═══════════════════════════════════════════════════════════

function CascadeReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const [pattern, setPattern] = useState<'start' | 'center' | 'edges' | 'random'>('start')
  
  const items = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    hue: (i * 15) % 360,
  }))
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    // Reset items
    gsap.set(itemsRef.current, { opacity: 0, scale: 0.5, rotation: -10 })
    
    // Animate with selected pattern
    gsap.to(itemsRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: CONFIG.itemDuration,
      ease: 'back.out(1.7)',
      stagger: {
        each: CONFIG.staggerEach,
        from: pattern,
        grid: [4, 6],
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [pattern])
  
  return (
    <section className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-amber-400 mb-4 text-sm uppercase tracking-widest text-center">
          Cascade Reveal
        </p>
        
        {/* Pattern selector */}
        <div className="flex justify-center gap-4 mb-12">
          {(['start', 'center', 'edges', 'random'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPattern(p)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                pattern === p 
                  ? 'bg-amber-500 text-black' 
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-4 md:grid-cols-6 gap-3"
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { itemsRef.current[i] = el }}
              className="aspect-square rounded-xl"
              style={{ 
                background: `linear-gradient(135deg, hsl(${item.hue}, 70%, 50%), hsl(${item.hue + 30}, 70%, 40%))`,
              }}
            />
          ))}
        </div>
        
        <p className="text-neutral-500 mt-8 text-center text-lg">
          Click pattern buttons to see different stagger origins
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: Ripple Hover Effect
// Hovering one item creates a ripple that affects neighbors
// ═══════════════════════════════════════════════════════════

function RippleHover() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const cols = 8
  const rows = 5
  const items = Array.from({ length: cols * rows }, (_, i) => ({ id: i }))
  
  const handleMouseEnter = useCallback((index: number) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const hoveredRow = Math.floor(index / cols)
    const hoveredCol = index % cols
    
    itemsRef.current.forEach((item, i) => {
      if (!item) return
      
      const row = Math.floor(i / cols)
      const col = i % cols
      
      // Calculate distance from hovered item
      const distance = Math.sqrt(
        Math.pow(row - hoveredRow, 2) + Math.pow(col - hoveredCol, 2)
      )
      
      // Animate based on distance
      gsap.to(item, {
        scale: 1 - distance * 0.05,
        opacity: 1 - distance * 0.1,
        duration: 0.3,
        delay: distance * 0.03,
        ease: 'power2.out',
      })
    })
  }, [])
  
  const handleMouseLeave = useCallback(() => {
    gsap.to(itemsRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      stagger: {
        each: 0.02,
        from: 'random',
      },
    })
  }, [])
  
  return (
    <section className="py-32 px-8 bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <p className="text-amber-400 mb-12 text-sm uppercase tracking-widest text-center">
          Ripple Hover Effect
        </p>
        
        <div 
          ref={containerRef}
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          onMouseLeave={handleMouseLeave}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { itemsRef.current[i] = el }}
              className="aspect-square rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 cursor-pointer"
              onMouseEnter={() => handleMouseEnter(i)}
            />
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-center text-lg">
          Hover over items to see ripple effect spread to neighbors
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: Shuffle Animation
// Grid items shuffle and reorder on click
// ═══════════════════════════════════════════════════════════

function ShuffleGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      hue: (i * 30) % 360,
    }))
  )
  
  const shuffle = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Shuffle array
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    
    if (prefersReducedMotion) {
      setItems(shuffled)
      return
    }
    
    // Animate out
    const elements = containerRef.current?.children
    if (!elements) return
    
    const tl = gsap.timeline()
    
    tl.to(elements, {
      scale: 0.8,
      opacity: 0.5,
      duration: 0.2,
      stagger: {
        each: 0.02,
        from: 'random',
      },
    })
    .call(() => setItems(shuffled))
    .to(elements, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
      stagger: {
        each: 0.03,
        from: 'random',
      },
    })
  }, [items])
  
  return (
    <section className="py-32 px-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-amber-400 mb-4 text-sm uppercase tracking-widest text-center">
          Shuffle Animation
        </p>
        
        <button
          onClick={shuffle}
          className="block mx-auto mb-12 px-8 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors"
        >
          Shuffle Grid
        </button>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-3 md:grid-cols-4 gap-4"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="aspect-square rounded-2xl flex items-center justify-center text-3xl font-bold text-white/80"
              style={{ 
                background: `linear-gradient(135deg, hsl(${item.hue}, 70%, 50%), hsl(${item.hue + 40}, 70%, 40%))`,
              }}
            >
              {item.id + 1}
            </div>
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-center text-lg">
          Click shuffle to see items rearrange with animation
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: Masonry Reveal
// Varied height items reveal with stagger
// ═══════════════════════════════════════════════════════════

function MasonryReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const items = [
    { id: 1, span: 2, height: 'h-64' },
    { id: 2, span: 1, height: 'h-48' },
    { id: 3, span: 1, height: 'h-32' },
    { id: 4, span: 1, height: 'h-40' },
    { id: 5, span: 2, height: 'h-48' },
    { id: 6, span: 1, height: 'h-56' },
    { id: 7, span: 1, height: 'h-36' },
    { id: 8, span: 1, height: 'h-44' },
    { id: 9, span: 1, height: 'h-52' },
    { id: 10, span: 2, height: 'h-40' },
  ]
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    gsap.fromTo(itemsRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: {
          each: 0.1,
          from: 'start',
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section className="py-32 px-8 bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <p className="text-amber-400 mb-12 text-sm uppercase tracking-widest text-center">
          Masonry Reveal
        </p>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { itemsRef.current[i] = el }}
              className={`${item.height} rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-600/30 border border-amber-500/20`}
              style={{ 
                gridColumn: `span ${item.span}`,
              }}
            />
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-center text-lg">
          Varied height items reveal sequentially
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 5: Wave Animation
// Items animate in a wave pattern continuously
// ═══════════════════════════════════════════════════════════

function WaveAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const cols = 10
  const rows = 6
  const items = Array.from({ length: cols * rows }, (_, i) => ({ id: i }))
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    // Create continuous wave animation
    itemsRef.current.forEach((item, i) => {
      if (!item) return
      
      const col = i % cols
      const row = Math.floor(i / cols)
      
      gsap.to(item, {
        y: -10,
        scale: 1.1,
        backgroundColor: '#f59e0b',
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: (col + row) * 0.1,
      })
    })
    
    return () => {
      itemsRef.current.forEach(item => {
        if (item) gsap.killTweensOf(item)
      })
    }
  }, [])
  
  return (
    <section className="py-32 px-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-amber-400 mb-12 text-sm uppercase tracking-widest text-center">
          Wave Animation
        </p>
        
        <div 
          ref={containerRef}
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { itemsRef.current[i] = el }}
              className="aspect-square rounded bg-amber-500/30"
            />
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-center text-lg">
          Continuous wave pattern across the grid
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function StaggerGridsShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Stagger Grids
          </h1>
          <p className="text-xl text-neutral-400">
            Grid animations with creative stagger patterns
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Scroll to explore
          </div>
        </div>
      </section>
      
      <CascadeReveal />
      <RippleHover />
      <ShuffleGrid />
      <MasonryReveal />
      <WaveAnimation />
      
      {/* Footer */}
      <section className="py-32 text-center bg-neutral-950">
        <p className="text-neutral-500">End of Stagger Grids Showcase</p>
      </section>
    </div>
  )
}
