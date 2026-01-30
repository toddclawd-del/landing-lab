'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ════════════════════════════════════════════
// ADVANCED PARALLAX EFFECTS
// Multi-layer depth and motion parallax
// Demonstrates: Scroll parallax, mouse parallax,
// combined effects, 3D perspective, and text over image
// ════════════════════════════════════════════

const CONFIG = {
  // Scroll parallax
  scrollIntensity: 200,
  
  // Mouse parallax
  mouseIntensity: 30,
  mouseSmoothness: 0.1,
  
  // 3D perspective
  perspective: 1000,
  maxRotation: 15,
  
  // Colors
  accentColor: '#3b82f6',
  bgColor: '#0a0a0a',
}

// ═══════════════════════════════════════════════════════════
// SECTION 1: Multi-Layer Depth Parallax
// Multiple layers moving at different speeds
// ═══════════════════════════════════════════════════════════

function MultiLayerParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<(HTMLDivElement | null)[]>([])
  
  const layers = [
    { depth: 0.1, color: 'from-blue-900/20 to-transparent', size: 400 },
    { depth: 0.3, color: 'from-blue-700/30 to-transparent', size: 300 },
    { depth: 0.5, color: 'from-blue-500/40 to-transparent', size: 200 },
    { depth: 0.7, color: 'from-blue-400/50 to-transparent', size: 150 },
    { depth: 0.9, color: 'from-blue-300/60 to-transparent', size: 100 },
  ]
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    layersRef.current.forEach((layer, i) => {
      if (!layer) return
      
      gsap.to(layer, {
        y: () => CONFIG.scrollIntensity * layers[i].depth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-[150vh] relative overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <p className="text-blue-400 absolute top-8 left-1/2 -translate-x-1/2 text-sm uppercase tracking-widest z-10">
          Multi-Layer Depth Parallax
        </p>
        
        {/* Layers */}
        <div className="relative w-full h-full">
          {layers.map((layer, i) => (
            <div
              key={i}
              ref={(el) => { layersRef.current[i] = el }}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial ${layer.color}`}
              style={{
                width: layer.size,
                height: layer.size,
              }}
            />
          ))}
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-6xl md:text-8xl font-bold text-white/80">DEPTH</h2>
          </div>
        </div>
        
        <p className="text-neutral-500 absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          Each layer moves at a different speed creating depth
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: Mouse-Move Parallax
// Elements respond to cursor position
// ═══════════════════════════════════════════════════════════

function MouseParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  
  const elements = [
    { x: -200, y: -150, size: 100, depth: 0.3, color: '#3b82f6' },
    { x: 200, y: -100, size: 80, depth: 0.5, color: '#8b5cf6' },
    { x: -150, y: 150, size: 120, depth: 0.2, color: '#06b6d4' },
    { x: 250, y: 100, size: 60, depth: 0.7, color: '#f59e0b' },
    { x: 0, y: -200, size: 90, depth: 0.4, color: '#ef4444' },
    { x: -250, y: 0, size: 70, depth: 0.6, color: '#22c55e' },
  ]
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const container = containerRef.current
    let rafId: number
    
    function handleMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseRef.current = {
        x: (e.clientX - centerX) / rect.width,
        y: (e.clientY - centerY) / rect.height,
      }
    }
    
    function animate() {
      // Smooth interpolation
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * CONFIG.mouseSmoothness
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * CONFIG.mouseSmoothness
      
      elementsRef.current.forEach((el, i) => {
        if (!el) return
        
        const depth = elements[i].depth
        const x = elements[i].x + currentRef.current.x * CONFIG.mouseIntensity * depth
        const y = elements[i].y + currentRef.current.y * CONFIG.mouseIntensity * depth
        
        gsap.set(el, { x, y })
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
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-8 bg-neutral-950 relative overflow-hidden"
    >
      <p className="text-blue-400 absolute top-8 left-1/2 -translate-x-1/2 text-sm uppercase tracking-widest">
        Mouse-Move Parallax
      </p>
      
      {/* Floating elements */}
      <div className="relative w-full max-w-4xl h-[500px]">
        {elements.map((el, i) => (
          <div
            key={i}
            ref={(ref) => { elementsRef.current[i] = ref }}
            className="absolute left-1/2 top-1/2 rounded-full opacity-60"
            style={{
              width: el.size,
              height: el.size,
              backgroundColor: el.color,
              transform: `translate(${el.x}px, ${el.y}px)`,
              filter: `blur(${(1 - el.depth) * 4}px)`,
            }}
          />
        ))}
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white">Move your cursor</h2>
        </div>
      </div>
      
      <p className="text-neutral-500 absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        Elements respond to mouse position with varying intensity
      </p>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: Combined Scroll + Mouse Parallax
// Both effects working together
// ═══════════════════════════════════════════════════════════

function CombinedParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !bgRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Scroll parallax for background
    if (!prefersReducedMotion) {
      gsap.to(bgRef.current, {
        y: 150,
        scale: 1.2,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
    
    // Mouse parallax for content
    const container = containerRef.current
    const content = contentRef.current
    
    function handleMouseMove(e: MouseEvent) {
      if (prefersReducedMotion) return
      
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      gsap.to(content, {
        x: x * 30,
        y: y * 30,
        rotateY: x * 5,
        rotateX: -y * 5,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
    
    function handleMouseLeave() {
      gsap.to(content, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
    
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Parallax background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]" />
      </div>
      
      {/* Content */}
      <div className="relative h-screen flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div 
          ref={contentRef}
          className="text-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <p className="text-blue-400 mb-4 text-sm uppercase tracking-widest">
            Combined Parallax
          </p>
          <h2 className="text-5xl md:text-8xl font-bold mb-6">
            Scroll + Mouse
          </h2>
          <p className="text-xl text-neutral-400 max-w-lg mx-auto">
            Background responds to scroll while content follows your cursor
          </p>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: Parallax Text Over Image
// Text and image moving at different rates
// ═══════════════════════════════════════════════════════════

function TextOverImageParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    // Image moves slower (appears farther away)
    gsap.to(imageRef.current, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    
    // Text moves faster (appears closer)
    gsap.to(textRef.current, {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-screen relative overflow-hidden bg-neutral-950">
      {/* Background image (gradient placeholder) */}
      <div 
        ref={imageRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-pink-600/30"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Text content */}
      <div className="relative h-screen flex items-center justify-center">
        <div ref={textRef} className="text-center px-8">
          <p className="text-blue-400 mb-4 text-sm uppercase tracking-widest">
            Text Over Image
          </p>
          <h2 className="text-6xl md:text-9xl font-black leading-none tracking-tighter">
            PARALLAX
          </h2>
          <p className="text-xl text-neutral-300 mt-6 max-w-lg mx-auto">
            Text and background move at different rates creating depth
          </p>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 5: 3D Perspective Parallax
// Elements with true 3D perspective on scroll
// ═══════════════════════════════════════════════════════════

function PerspectiveParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const cards = [
    { title: 'Design', z: -200 },
    { title: 'Develop', z: -400 },
    { title: 'Deploy', z: -600 },
  ]
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
      },
    })
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      
      tl.fromTo(card,
        {
          z: cards[i].z,
          opacity: 0,
          scale: 0.8,
        },
        {
          z: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
        },
        i * 0.5
      )
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section ref={containerRef} className="h-screen relative overflow-hidden">
      <p className="text-blue-400 absolute top-8 left-1/2 -translate-x-1/2 text-sm uppercase tracking-widest z-10">
        3D Perspective Parallax
      </p>
      
      <div 
        className="h-full flex items-center justify-center"
        style={{ perspective: `${CONFIG.perspective}px`, perspectiveOrigin: '50% 50%' }}
      >
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: `translateZ(${cards[i].z}px)`,
              }}
            >
              <h3 className="text-4xl font-bold text-white">{card.title}</h3>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-neutral-500 absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        Cards fly towards you as you scroll
      </p>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function ParallaxLayersShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Parallax Layers
          </h1>
          <p className="text-xl text-neutral-400">
            Advanced depth and motion effects
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Scroll and move your cursor
          </div>
        </div>
      </section>
      
      <MultiLayerParallax />
      <MouseParallax />
      <CombinedParallax />
      <TextOverImageParallax />
      <PerspectiveParallax />
      
      {/* Footer */}
      <section className="py-32 text-center">
        <p className="text-neutral-500">End of Parallax Layers Showcase</p>
      </section>
    </div>
  )
}
