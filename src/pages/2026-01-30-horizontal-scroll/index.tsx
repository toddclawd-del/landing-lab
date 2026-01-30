'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ════════════════════════════════════════════
// HORIZONTAL SCROLL GALLERY
// Pinned horizontal scrolling with GSAP
// Demonstrates: Pinning, horizontal transforms,
// card animations, progress indicators, snap points
// ════════════════════════════════════════════

const CONFIG = {
  // Scroll settings
  cardWidth: 400,
  cardGap: 32,
  snapDuration: 0.3,
  
  // Card animations
  enterScale: 0.8,
  exitScale: 0.8,
  enterRotation: 5,
  exitRotation: -5,
  
  // Colors
  accentColor: '#ec4899',
  bgColor: '#0a0a0a',
}

// Sample project data
const PROJECTS = [
  { id: 1, title: 'Aurora', category: 'Branding', color: '#ec4899' },
  { id: 2, title: 'Nebula', category: 'Web Design', color: '#8b5cf6' },
  { id: 3, title: 'Cosmos', category: 'App Design', color: '#06b6d4' },
  { id: 4, title: 'Stellar', category: 'Identity', color: '#f59e0b' },
  { id: 5, title: 'Quantum', category: 'Motion', color: '#22c55e' },
  { id: 6, title: 'Photon', category: 'Interactive', color: '#ef4444' },
  { id: 7, title: 'Gravity', category: 'Experience', color: '#3b82f6' },
  { id: 8, title: 'Horizon', category: 'Campaign', color: '#f97316' },
]

// ═══════════════════════════════════════════════════════════
// MAIN HORIZONTAL SCROLL SECTION
// Pinned container with horizontal scrolling cards
// ═══════════════════════════════════════════════════════════

function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const track = trackRef.current
    const totalWidth = track.scrollWidth - window.innerWidth
    
    // Main horizontal scroll animation
    const scrollTween = gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: prefersReducedMotion ? 0 : 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          setProgress(self.progress)
          setActiveIndex(Math.round(self.progress * (PROJECTS.length - 1)))
        },
      },
    })
    
    // Card animations as they enter/exit viewport
    if (!prefersReducedMotion) {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        
        gsap.fromTo(card, 
          {
            scale: CONFIG.enterScale,
            rotateY: CONFIG.enterRotation,
            opacity: 0.5,
          },
          {
            scale: 1,
            rotateY: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 80%',
              end: 'left 50%',
              scrub: true,
            },
          }
        )
        
        gsap.to(card, {
          scale: CONFIG.exitScale,
          rotateY: CONFIG.exitRotation,
          opacity: 0.5,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'right 50%',
            end: 'right 20%',
            scrub: true,
          },
        })
      })
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section ref={sectionRef} className="relative bg-neutral-950">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      
      {/* Progress Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {PROJECTS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex 
                ? 'bg-pink-500 scale-150' 
                : 'bg-neutral-600 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
      
      {/* Counter */}
      <div className="fixed bottom-8 left-8 z-50 font-mono text-neutral-400">
        <span className="text-4xl font-bold text-pink-500">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-2xl mx-2">/</span>
        <span className="text-2xl">{String(PROJECTS.length).padStart(2, '0')}</span>
      </div>
      
      {/* Horizontal Track */}
      <div className="h-screen overflow-hidden">
        <div 
          ref={trackRef}
          className="flex items-center h-full gap-8 px-[50vw]"
          style={{ perspective: '1000px' }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="flex-shrink-0 w-[400px] h-[500px] rounded-3xl overflow-hidden cursor-pointer group"
              style={{ 
                transformStyle: 'preserve-3d',
                background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
                border: `1px solid ${project.color}30`,
              }}
            >
              <div className="w-full h-full p-8 flex flex-col justify-between">
                {/* Top */}
                <div>
                  <p 
                    className="text-sm uppercase tracking-widest mb-2 opacity-60"
                    style={{ color: project.color }}
                  >
                    {project.category}
                  </p>
                  <h3 className="text-4xl font-bold text-white">{project.title}</h3>
                </div>
                
                {/* Center visual */}
                <div className="flex-1 flex items-center justify-center">
                  <div 
                    className="w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
                    style={{ background: project.color }}
                  />
                </div>
                
                {/* Bottom */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">View Project</span>
                  <span 
                    className="text-2xl group-hover:translate-x-2 transition-transform"
                    style={{ color: project.color }}
                  >
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: Filmstrip Gallery
// Continuous film-like horizontal scroll
// ═══════════════════════════════════════════════════════════

function FilmstripGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const filmRef = useRef<HTMLDivElement>(null)
  
  const frames = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    hue: (i * 30) % 360,
  }))
  
  useEffect(() => {
    if (!sectionRef.current || !filmRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const totalScroll = filmRef.current.scrollWidth - window.innerWidth
    
    gsap.to(filmRef.current, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: prefersReducedMotion ? 0 : 0.5,
      },
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section ref={sectionRef} className="bg-black">
      <div className="h-screen overflow-hidden flex items-center">
        {/* Film sprocket holes - top */}
        <div className="absolute top-8 left-0 right-0 flex gap-4 px-8">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="w-8 h-6 bg-neutral-900 rounded-sm flex-shrink-0" />
          ))}
        </div>
        
        {/* Film track */}
        <div 
          ref={filmRef}
          className="flex items-center gap-4 px-[50vw]"
        >
          {frames.map((frame) => (
            <div
              key={frame.id}
              className="flex-shrink-0 w-[300px] h-[400px] rounded-lg overflow-hidden relative"
              style={{ 
                background: `hsl(${frame.hue}, 60%, 50%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-bold text-black/20">
                  {frame.id}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-1 bg-black/20 rounded">
                  <div 
                    className="h-full bg-white/50 rounded"
                    style={{ width: `${(frame.id / frames.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Film sprocket holes - bottom */}
        <div className="absolute bottom-8 left-0 right-0 flex gap-4 px-8">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="w-8 h-6 bg-neutral-900 rounded-sm flex-shrink-0" />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: Stacking Cards
// Cards that stack and unstack as you scroll
// ═══════════════════════════════════════════════════════════

function StackingCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const cards = [
    { title: 'Strategy', color: '#ec4899' },
    { title: 'Design', color: '#8b5cf6' },
    { title: 'Development', color: '#06b6d4' },
    { title: 'Launch', color: '#22c55e' },
  ]
  
  useEffect(() => {
    if (!sectionRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      
      gsap.to(card, {
        y: () => -window.innerHeight * 0.7 * i,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => `top+=${window.innerHeight * 0.2 * i} top`,
          end: () => `top+=${window.innerHeight * (0.2 * i + 0.6)} top`,
          scrub: 1,
        },
      })
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section 
      ref={sectionRef} 
      className="relative bg-neutral-900"
      style={{ height: `${100 + cards.length * 50}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <p className="absolute top-8 left-8 text-pink-400 text-sm uppercase tracking-widest">
          Stacking Cards
        </p>
        
        <div className="relative w-[400px] h-[500px]">
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="absolute inset-0 rounded-3xl p-8 flex flex-col justify-between shadow-2xl"
              style={{ 
                background: `linear-gradient(135deg, ${card.color}, ${card.color}80)`,
                zIndex: cards.length - i,
                transform: `translateY(${i * 20}px) scale(${1 - i * 0.05})`,
              }}
            >
              <span className="text-white/60 text-sm uppercase tracking-widest">
                Step {i + 1}
              </span>
              <h3 className="text-5xl font-bold text-white">{card.title}</h3>
              <div className="w-12 h-12 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function HorizontalScrollShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Horizontal Scroll
          </h1>
          <p className="text-xl text-neutral-400">
            Pinned sections with smooth horizontal scrolling
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Scroll to experience
          </div>
        </div>
      </section>
      
      <HorizontalGallery />
      
      {/* Spacer */}
      <section className="h-screen flex items-center justify-center">
        <p className="text-neutral-500 text-xl">Continue scrolling...</p>
      </section>
      
      <FilmstripGallery />
      
      {/* Spacer */}
      <section className="h-screen flex items-center justify-center">
        <p className="text-neutral-500 text-xl">One more effect...</p>
      </section>
      
      <StackingCards />
      
      {/* Footer */}
      <section className="py-32 text-center">
        <p className="text-neutral-500">End of Horizontal Scroll Showcase</p>
      </section>
    </div>
  )
}
