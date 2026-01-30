'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ════════════════════════════════════════════
// SCROLLTRIGGER PINNING
// Advanced pinning techniques with content animations
// Demonstrates: Hero with content swap, card stacking,
// pinned sidebar, and step-by-step reveals
// ════════════════════════════════════════════

const CONFIG = {
  // Animation settings
  contentFadeDuration: 0.5,
  cardStackOffset: 20,
  
  // Colors
  accentColor: '#ef4444',
  bgColor: '#0a0a0a',
}

// ═══════════════════════════════════════════════════════════
// SECTION 1: Pinned Hero with Content Swap
// Hero stays pinned while content cycles through
// ═══════════════════════════════════════════════════════════

function PinnedHeroContentSwap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  
  const contents = [
    {
      title: 'Innovative Design',
      subtitle: 'Creating the future',
      description: 'We push boundaries to create designs that inspire and captivate audiences worldwide.',
      color: '#ef4444',
    },
    {
      title: 'Expert Development',
      subtitle: 'Building with precision',
      description: 'Our team crafts robust, scalable solutions using cutting-edge technologies.',
      color: '#f59e0b',
    },
    {
      title: 'Strategic Growth',
      subtitle: 'Scaling your success',
      description: 'We develop strategies that drive measurable results and sustainable growth.',
      color: '#22c55e',
    },
    {
      title: 'Global Reach',
      subtitle: 'Connecting worldwide',
      description: 'Expand your presence and connect with audiences across the globe.',
      color: '#3b82f6',
    },
  ]
  
  useEffect(() => {
    if (!containerRef.current || !heroRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const ctx = gsap.context(() => {
      // Pin the hero section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * contents.length}`,
        pin: heroRef.current,
        pinSpacing: true,
      })
      
      // Animate content changes
      contents.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => `${i * window.innerHeight} top`,
          end: () => `${(i + 1) * window.innerHeight} top`,
          onEnter: () => {
            setActiveIndex(i)
            if (!prefersReducedMotion) {
              animateContent(i)
            }
          },
          onEnterBack: () => {
            setActiveIndex(i)
            if (!prefersReducedMotion) {
              animateContent(i)
            }
          },
        })
      })
      
      function animateContent(index: number) {
        contentsRef.current.forEach((content, i) => {
          if (!content) return
          
          if (i === index) {
            gsap.fromTo(content,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: CONFIG.contentFadeDuration, ease: 'power2.out' }
            )
          } else {
            gsap.to(content, { opacity: 0, duration: 0.2 })
          }
        })
      }
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="bg-neutral-950">
      <div ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background gradient based on active content */}
        <div 
          className="absolute inset-0 transition-colors duration-700"
          style={{ backgroundColor: `${contents[activeIndex].color}10` }}
        />
        
        {/* Progress dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {contents.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'scale-150' : 'bg-neutral-600'
              }`}
              style={{ backgroundColor: i === activeIndex ? contents[activeIndex].color : undefined }}
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl px-8 text-center">
          <p className="text-red-400 mb-4 text-sm uppercase tracking-widest">
            Pinned Hero with Content Swap
          </p>
          
          {contents.map((content, i) => (
            <div
              key={i}
              ref={(el) => { contentsRef.current[i] = el }}
              className={`${i === activeIndex ? 'block' : 'hidden'}`}
            >
              <p 
                className="text-lg mb-2 font-medium"
                style={{ color: content.color }}
              >
                {content.subtitle}
              </p>
              <h2 className="text-5xl md:text-7xl font-bold mb-6">{content.title}</h2>
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                {content.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Counter */}
        <div className="absolute bottom-8 left-8 font-mono text-neutral-500">
          <span className="text-2xl font-bold" style={{ color: contents[activeIndex].color }}>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="mx-2">/</span>
          <span>{String(contents.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: Card Stack That Unstacks
// Stacked cards spread out as you scroll
// ═══════════════════════════════════════════════════════════

function CardStackUnstack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const cards = [
    { title: 'Strategy', color: '#ef4444', content: 'Define your goals and roadmap' },
    { title: 'Design', color: '#f59e0b', content: 'Create beautiful user experiences' },
    { title: 'Develop', color: '#22c55e', content: 'Build with modern technologies' },
    { title: 'Deploy', color: '#3b82f6', content: 'Launch and scale globally' },
    { title: 'Iterate', color: '#8b5cf6', content: 'Continuously improve and grow' },
  ]
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: prefersReducedMotion ? 0 : 1,
        },
      })
      
      // Animate each card spreading out
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        
        const offset = (i - (cards.length - 1) / 2) * 280 // Spread horizontally
        const rotation = (i - (cards.length - 1) / 2) * 5 // Slight rotation
        
        tl.to(card, {
          x: offset,
          y: 0,
          rotation: rotation,
          scale: 1,
          opacity: 1,
          duration: 1,
        }, 0)
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="h-screen flex items-center justify-center bg-neutral-900 relative overflow-hidden">
      <p className="text-red-400 absolute top-8 left-1/2 -translate-x-1/2 text-sm uppercase tracking-widest z-10">
        Card Stack Unstack
      </p>
      
      <div className="relative w-80 h-96">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            className="absolute top-0 left-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-xl"
            style={{
              backgroundColor: card.color,
              transform: `translateY(${i * CONFIG.cardStackOffset}px) scale(${1 - i * 0.02})`,
              zIndex: cards.length - i,
              opacity: 1 - i * 0.15,
            }}
          >
            <span className="text-white/60 text-sm font-mono">0{i + 1}</span>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-white/80">{card.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-neutral-500 absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        Scroll to spread the cards
      </p>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: Pinned Sidebar with Scrolling Content
// Sidebar stays fixed while content scrolls
// ═══════════════════════════════════════════════════════════

function PinnedSidebar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeSection, setActiveSection] = useState(0)
  
  const sections = [
    { id: 'overview', title: 'Overview', content: 'Get a comprehensive understanding of our approach and methodology.' },
    { id: 'research', title: 'Research', content: 'Deep dive into user research and market analysis for informed decisions.' },
    { id: 'ideation', title: 'Ideation', content: 'Brainstorm and generate creative solutions to complex problems.' },
    { id: 'prototyping', title: 'Prototyping', content: 'Build and test prototypes to validate concepts quickly.' },
    { id: 'testing', title: 'Testing', content: 'Rigorous testing ensures quality and user satisfaction.' },
    { id: 'launch', title: 'Launch', content: 'Strategic launch planning for maximum impact and adoption.' },
  ]
  
  useEffect(() => {
    if (!containerRef.current || !sidebarRef.current) return
    
    const ctx = gsap.context(() => {
      // Pin the sidebar
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: sidebarRef.current,
        pinSpacing: false,
      })
      
      // Track active section
      sectionsRef.current.forEach((section, i) => {
        if (!section) return
        
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(i),
          onEnterBack: () => setActiveSection(i),
        })
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="relative bg-neutral-950">
      <div className="flex">
        {/* Pinned Sidebar */}
        <div 
          ref={sidebarRef}
          className="w-80 h-screen flex-shrink-0 p-8 border-r border-neutral-800 hidden md:block"
        >
          <p className="text-red-400 mb-8 text-sm uppercase tracking-widest">
            Pinned Sidebar
          </p>
          
          <nav className="space-y-4">
            {sections.map((section, i) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block py-2 px-4 rounded-lg transition-all duration-300 ${
                  i === activeSection
                    ? 'bg-red-500/20 text-red-400 border-l-2 border-red-400'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <span className="font-mono text-sm mr-2">0{i + 1}</span>
                {section.title}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Scrolling Content */}
        <div className="flex-1 p-8 md:p-16">
          {sections.map((section, i) => (
            <div
              key={section.id}
              id={section.id}
              ref={(el) => { sectionsRef.current[i] = el }}
              className="min-h-screen flex items-center"
            >
              <div className="max-w-2xl">
                <span className="text-red-400 font-mono">0{i + 1}</span>
                <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-6">{section.title}</h2>
                <p className="text-xl text-neutral-400 leading-relaxed">
                  {section.content}
                </p>
                <p className="text-neutral-500 mt-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                  quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: Step-by-Step Reveal While Pinned
// Progressive reveal of steps during pinned scroll
// ═══════════════════════════════════════════════════════════

function StepByStepReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  
  const steps = [
    { icon: '🎯', title: 'Define Goals', desc: 'Set clear objectives for your project' },
    { icon: '🔍', title: 'Research', desc: 'Understand your users and market' },
    { icon: '✏️', title: 'Design', desc: 'Create intuitive user experiences' },
    { icon: '⚡', title: 'Build', desc: 'Develop with modern technologies' },
    { icon: '🚀', title: 'Launch', desc: 'Deploy and go live worldwide' },
  ]
  
  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: prefersReducedMotion ? 0 : 1,
        },
      })
      
      // Animate connecting line
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: steps.length, ease: 'none' },
        0
      )
      
      // Animate each step
      stepsRef.current.forEach((step, i) => {
        if (!step) return
        
        tl.fromTo(step,
          { opacity: 0.2, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5 },
          i * 0.8
        )
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="h-screen flex items-center justify-center bg-neutral-900 relative overflow-hidden">
      <p className="text-red-400 absolute top-8 left-1/2 -translate-x-1/2 text-sm uppercase tracking-widest z-10">
        Step-by-Step Reveal
      </p>
      
      <div className="w-full max-w-5xl px-8">
        {/* Connecting line */}
        <div className="relative h-1 bg-neutral-800 rounded mb-12 mx-16">
          <div 
            ref={lineRef}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-orange-500 rounded origin-left"
            style={{ width: '100%', transform: 'scaleX(0)' }}
          />
        </div>
        
        {/* Steps */}
        <div className="flex justify-between">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepsRef.current[i] = el }}
              className="flex flex-col items-center text-center opacity-20"
            >
              <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-3xl mb-4 border-2 border-neutral-700">
                {step.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{step.title}</h3>
              <p className="text-neutral-400 text-sm max-w-[120px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-neutral-500 absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        Scroll to reveal each step progressively
      </p>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function PinnedSectionsShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Pinned Sections
          </h1>
          <p className="text-xl text-neutral-400">
            ScrollTrigger pinning with animated content
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Scroll to experience pinning
          </div>
        </div>
      </section>
      
      <PinnedHeroContentSwap />
      
      {/* Spacer */}
      <section className="h-[50vh] flex items-center justify-center">
        <p className="text-neutral-500 text-xl">Continue scrolling...</p>
      </section>
      
      <CardStackUnstack />
      
      {/* Spacer */}
      <section className="h-[50vh] flex items-center justify-center bg-neutral-950">
        <p className="text-neutral-500 text-xl">More pinning ahead...</p>
      </section>
      
      <PinnedSidebar />
      
      <StepByStepReveal />
      
      {/* Footer */}
      <section className="py-32 text-center bg-neutral-950">
        <p className="text-neutral-500">End of Pinned Sections Showcase</p>
      </section>
    </div>
  )
}
