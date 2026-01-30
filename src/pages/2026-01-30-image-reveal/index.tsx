'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ════════════════════════════════════════════
// IMAGE REVEAL EFFECTS
// Various ways to reveal images with animations
// Demonstrates: Clip-paths, blur effects, parallax,
// mask reveals, and before/after comparisons
// ════════════════════════════════════════════

const CONFIG = {
  // Reveal timings
  revealDuration: 1.2,
  blurAmount: 20,
  
  // Parallax
  parallaxIntensity: 100,
  
  // Colors
  accentColor: '#06b6d4',
  overlayColor: '#0a0a0a',
}

// Placeholder images using gradients
const IMAGES = {
  landscape: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  portrait: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  nature: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  urban: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  abstract: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
}

// ═══════════════════════════════════════════════════════════
// SECTION 1: Clip-Path Wipe Reveals
// Various directional wipe reveals using clip-path
// ═══════════════════════════════════════════════════════════

function ClipPathReveals() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])
  
  const reveals = [
    { 
      title: 'Left to Right',
      from: 'inset(0 100% 0 0)',
      to: 'inset(0 0% 0 0)',
    },
    { 
      title: 'Right to Left',
      from: 'inset(0 0 0 100%)',
      to: 'inset(0 0 0 0%)',
    },
    { 
      title: 'Top to Bottom',
      from: 'inset(0 0 100% 0)',
      to: 'inset(0 0 0% 0)',
    },
    { 
      title: 'Center Out',
      from: 'inset(50% 50% 50% 50%)',
      to: 'inset(0% 0% 0% 0%)',
    },
    { 
      title: 'Diamond',
      from: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      to: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    },
    { 
      title: 'Circle Expand',
      from: 'circle(0% at 50% 50%)',
      to: 'circle(75% at 50% 50%)',
    },
  ]
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    imagesRef.current.forEach((img, i) => {
      if (!img) return
      
      gsap.fromTo(img, 
        { clipPath: reveals[i].from },
        {
          clipPath: reveals[i].to,
          duration: CONFIG.revealDuration,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section ref={containerRef} className="py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-cyan-400 mb-8 text-sm uppercase tracking-widest text-center">
          Clip-Path Wipe Reveals
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reveals.map((reveal, i) => (
            <div key={i} className="space-y-4">
              <div
                ref={(el) => { imagesRef.current[i] = el }}
                className="aspect-[4/3] rounded-2xl"
                style={{ background: Object.values(IMAGES)[i % 5] }}
              />
              <p className="text-neutral-400 text-center">{reveal.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: Scale + Blur Reveal
// Image scales down and deblurs as it enters viewport
// ═══════════════════════════════════════════════════════════

function ScaleBlurReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    })
    
    tl.fromTo(imageRef.current, 
      { 
        scale: 1.5, 
        filter: 'blur(20px) saturate(0)',
      },
      { 
        scale: 1, 
        filter: 'blur(0px) saturate(1)',
        ease: 'power2.out',
      }
    )
    
    if (overlayRef.current) {
      tl.fromTo(overlayRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0
      )
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section className="py-32 px-8 bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <p className="text-cyan-400 mb-8 text-sm uppercase tracking-widest text-center">
          Scale + Blur Reveal
        </p>
        
        <div 
          ref={containerRef}
          className="aspect-video rounded-3xl overflow-hidden relative"
        >
          <div
            ref={imageRef}
            className="w-full h-full"
            style={{ background: IMAGES.landscape }}
          />
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-neutral-950"
          />
        </div>
        
        <p className="text-neutral-500 mt-8 text-center text-lg">
          Image scales down and sharpens as you scroll
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: Parallax Zoom on Scroll
// Image zooms and moves with parallax effect
// ═══════════════════════════════════════════════════════════

function ParallaxZoom() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    gsap.fromTo(imageRef.current,
      {
        scale: 1.3,
        y: -CONFIG.parallaxIntensity,
      },
      {
        scale: 1,
        y: CONFIG.parallaxIntensity,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-cyan-400 mb-8 text-sm uppercase tracking-widest text-center">
          Parallax Zoom
        </p>
        
        <div 
          ref={containerRef}
          className="aspect-[16/9] rounded-3xl overflow-hidden"
        >
          <div
            ref={imageRef}
            className="w-full h-full"
            style={{ background: IMAGES.nature }}
          />
        </div>
        
        <p className="text-neutral-500 mt-8 text-center text-lg">
          Image moves and scales with scroll for depth effect
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: Split Mask Reveal
// Image reveals from both sides meeting in the middle
// ═══════════════════════════════════════════════════════════

function SplitMaskReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftMaskRef = useRef<HTMLDivElement>(null)
  const rightMaskRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current || !leftMaskRef.current || !rightMaskRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    })
    
    tl.to(leftMaskRef.current, {
      x: '-100%',
      duration: 1,
      ease: 'power3.inOut',
    })
    .to(rightMaskRef.current, {
      x: '100%',
      duration: 1,
      ease: 'power3.inOut',
    }, 0)
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section className="py-32 px-8 bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <p className="text-cyan-400 mb-8 text-sm uppercase tracking-widest text-center">
          Split Mask Reveal
        </p>
        
        <div 
          ref={containerRef}
          className="aspect-video rounded-3xl overflow-hidden relative"
        >
          {/* Image */}
          <div
            className="w-full h-full"
            style={{ background: IMAGES.urban }}
          />
          
          {/* Left mask */}
          <div
            ref={leftMaskRef}
            className="absolute inset-y-0 left-0 w-1/2 bg-neutral-950"
          />
          
          {/* Right mask */}
          <div
            ref={rightMaskRef}
            className="absolute inset-y-0 right-0 w-1/2 bg-neutral-950"
          />
          
          {/* Center line */}
          <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-400/50" />
        </div>
        
        <p className="text-neutral-500 mt-8 text-center text-lg">
          Curtains part to reveal the image from center
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 5: Before/After Slider
// Interactive comparison slider
// ═══════════════════════════════════════════════════════════

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const isDragging = useRef(false)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const container = containerRef.current
    
    function handleMouseMove(e: MouseEvent) {
      if (!isDragging.current) return
      
      const rect = container.getBoundingClientRect()
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
      setPosition(x)
    }
    
    function handleMouseUp() {
      isDragging.current = false
      document.body.style.cursor = ''
    }
    
    function handleTouchMove(e: TouchEvent) {
      if (!isDragging.current) return
      
      const rect = container.getBoundingClientRect()
      const touch = e.touches[0]
      const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100))
      setPosition(x)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleMouseUp)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [])
  
  function startDrag() {
    isDragging.current = true
    document.body.style.cursor = 'ew-resize'
  }
  
  return (
    <section className="py-32 px-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-cyan-400 mb-8 text-sm uppercase tracking-widest text-center">
          Before / After Slider
        </p>
        
        <div 
          ref={containerRef}
          className="aspect-video rounded-3xl overflow-hidden relative cursor-ew-resize select-none"
        >
          {/* After (full width) */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-neutral-600">AFTER</span>
            </div>
          </div>
          
          {/* Before (clipped) */}
          <div
            className="absolute inset-0"
            style={{ 
              background: IMAGES.abstract,
              clipPath: `inset(0 ${100 - position}% 0 0)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-white/80">BEFORE</span>
            </div>
          </div>
          
          {/* Slider handle */}
          <div
            ref={sliderRef}
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            {/* Handle grip */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
              <span className="text-neutral-900 text-xl">⟷</span>
            </div>
          </div>
        </div>
        
        <p className="text-neutral-500 mt-8 text-center text-lg">
          Drag the slider to compare before and after
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 6: Staggered Grid Reveal
// Multiple images reveal with stagger
// ═══════════════════════════════════════════════════════════

function StaggeredGridReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])
  
  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    hue: (i * 60) % 360,
  }))
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    gsap.fromTo(imagesRef.current,
      {
        clipPath: 'inset(100% 0 0 0)',
        scale: 1.2,
      },
      {
        clipPath: 'inset(0% 0 0 0)',
        scale: 1,
        duration: 1,
        stagger: {
          each: 0.15,
          from: 'random',
        },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
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
      <div className="max-w-5xl mx-auto">
        <p className="text-cyan-400 mb-8 text-sm uppercase tracking-widest text-center">
          Staggered Grid Reveal
        </p>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {images.map((img, i) => (
            <div
              key={img.id}
              ref={(el) => { imagesRef.current[i] = el }}
              className="aspect-square rounded-2xl overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, hsl(${img.hue}, 70%, 60%), hsl(${img.hue + 30}, 70%, 50%))`,
              }}
            />
          ))}
        </div>
        
        <p className="text-neutral-500 mt-8 text-center text-lg">
          Images reveal with random stagger timing
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function ImageRevealShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Image Reveal
          </h1>
          <p className="text-xl text-neutral-400">
            Creative ways to reveal images with GSAP
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Scroll to reveal
          </div>
        </div>
      </section>
      
      <ClipPathReveals />
      <ScaleBlurReveal />
      <ParallaxZoom />
      <SplitMaskReveal />
      <BeforeAfterSlider />
      <StaggeredGridReveal />
      
      {/* Footer */}
      <section className="py-32 text-center">
        <p className="text-neutral-500">End of Image Reveal Showcase</p>
      </section>
    </div>
  )
}
