'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ════════════════════════════════════════════
// TEXT REVEAL SHOWCASE
// Multiple text animation techniques using GSAP
// Demonstrates: SplitText-like effects, staggered reveals,
// scramble text, clip-path reveals, and 3D transforms
// ════════════════════════════════════════════

const CONFIG = {
  // Character reveal
  charStagger: 0.03,
  charDuration: 0.6,
  charEase: 'power3.out',
  
  // Word reveal
  wordStagger: 0.08,
  wordDuration: 0.8,
  wordEase: 'power2.out',
  
  // Line reveal
  lineStagger: 0.15,
  lineDuration: 1,
  lineEase: 'power4.out',
  
  // Scramble
  scrambleDuration: 1.5,
  scrambleChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*',
  
  // Colors
  primaryColor: '#f0f0f0',
  accentColor: '#6366f1',
  bgColor: '#0a0a0a',
}

// ═══════════════════════════════════════════════════════════
// UTILITY: Manual text splitting (SplitText alternative)
// ═══════════════════════════════════════════════════════════

function splitTextIntoSpans(element: HTMLElement, type: 'chars' | 'words' | 'lines') {
  const text = element.textContent || ''
  element.innerHTML = ''
  
  if (type === 'chars') {
    text.split('').forEach((char) => {
      const span = document.createElement('span')
      span.className = 'split-char'
      span.style.display = 'inline-block'
      span.textContent = char === ' ' ? '\u00A0' : char
      element.appendChild(span)
    })
  } else if (type === 'words') {
    text.split(' ').forEach((word, i, arr) => {
      const span = document.createElement('span')
      span.className = 'split-word'
      span.style.display = 'inline-block'
      span.textContent = word
      element.appendChild(span)
      if (i < arr.length - 1) {
        element.appendChild(document.createTextNode('\u00A0'))
      }
    })
  } else if (type === 'lines') {
    // For lines, we wrap in divs
    const lines = text.split('\n')
    lines.forEach((line) => {
      const div = document.createElement('div')
      div.className = 'split-line'
      div.style.overflow = 'hidden'
      const inner = document.createElement('span')
      inner.style.display = 'block'
      inner.textContent = line
      div.appendChild(inner)
      element.appendChild(div)
    })
  }
  
  return element.querySelectorAll(`.split-${type.slice(0, -1)}${type === 'lines' ? ' span' : ''}, .split-line span`)
}

// ═══════════════════════════════════════════════════════════
// SECTION 1: Character-by-Character from Bottom
// ═══════════════════════════════════════════════════════════

function CharacterReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      const chars = splitTextIntoSpans(textRef.current!, 'chars')
      
      // Initial state: characters below and rotated
      gsap.set(chars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        transformOrigin: 'bottom center',
      })
      
      // Animate on scroll
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: CONFIG.charDuration,
        stagger: CONFIG.charStagger,
        ease: CONFIG.charEase,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-4xl">
        <p className="text-indigo-400 mb-4 text-sm uppercase tracking-widest">Character Reveal</p>
        <h2 
          ref={textRef}
          className="text-5xl md:text-7xl font-bold leading-tight"
          style={{ perspective: '1000px' }}
        >
          Every character emerges from below
        </h2>
        <p className="text-neutral-500 mt-6 text-lg">
          Each character animates up with a 3D rotation, creating a cascading wave effect.
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: Word-by-Word Fade In
// ═══════════════════════════════════════════════════════════

function WordReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      const words = splitTextIntoSpans(textRef.current!, 'words')
      
      gsap.set(words, {
        opacity: 0,
        y: 40,
        filter: 'blur(10px)',
      })
      
      gsap.to(words, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: CONFIG.wordDuration,
        stagger: CONFIG.wordStagger,
        ease: CONFIG.wordEase,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-8 bg-neutral-950">
      <div className="max-w-4xl">
        <p className="text-indigo-400 mb-4 text-sm uppercase tracking-widest">Word Reveal</p>
        <h2 
          ref={textRef}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Words fade in one by one with blur
        </h2>
        <p className="text-neutral-500 mt-6 text-lg">
          Each word fades in from below with a blur-to-sharp transition.
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: Line-by-Line with Mask
// ═══════════════════════════════════════════════════════════

function LineReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])
  
  const lines = [
    'Design is not just',
    'what it looks like.',
    'Design is how it works.'
  ]
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      linesRef.current.forEach((line, i) => {
        if (!line) return
        const inner = line.querySelector('span')
        if (!inner) return
        
        gsap.set(inner, { y: '100%' })
        
        gsap.to(inner, {
          y: '0%',
          duration: CONFIG.lineDuration,
          ease: CONFIG.lineEase,
          delay: i * CONFIG.lineStagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-4xl">
        <p className="text-indigo-400 mb-4 text-sm uppercase tracking-widest">Line Reveal</p>
        <div className="text-5xl md:text-7xl font-bold leading-tight">
          {lines.map((line, i) => (
            <div 
              key={i}
              ref={(el) => { linesRef.current[i] = el }}
              className="overflow-hidden"
            >
              <span className="block">{line}</span>
            </div>
          ))}
        </div>
        <p className="text-neutral-500 mt-6 text-lg">
          Lines slide up from a masked container, revealing one at a time.
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: Scramble Text Effect
// ═══════════════════════════════════════════════════════════

function ScrambleReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  const targetText = 'SCRAMBLED REALITY'
  
  useEffect(() => {
    if (!containerRef.current || !textRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      textRef.current.textContent = targetText
      return
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          scrambleText(textRef.current!, targetText)
        }
      },
      { threshold: 0.5 }
    )
    
    observer.observe(containerRef.current)
    
    return () => observer.disconnect()
  }, [isVisible])
  
  function scrambleText(element: HTMLElement, finalText: string) {
    const chars = CONFIG.scrambleChars
    const duration = CONFIG.scrambleDuration * 1000
    const startTime = performance.now()
    
    function update() {
      const elapsed = performance.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      let result = ''
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === ' ') {
          result += ' '
        } else if (progress > i / finalText.length) {
          result += finalText[i]
        } else {
          result += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      
      element.textContent = result
      
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }
    
    update()
  }
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-8 bg-neutral-950">
      <div className="max-w-4xl text-center">
        <p className="text-indigo-400 mb-4 text-sm uppercase tracking-widest">Scramble Effect</p>
        <h2 
          ref={textRef}
          className="text-5xl md:text-8xl font-mono font-bold tracking-wider"
        >
          {'█'.repeat(targetText.length)}
        </h2>
        <p className="text-neutral-500 mt-6 text-lg">
          Characters scramble through random letters before settling on the final text.
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 5: Gradient Clip-Path Reveal
// ═══════════════════════════════════════════════════════════

function GradientReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.set(textRef.current, {
        clipPath: 'inset(0 100% 0 0)',
      })
      
      gsap.to(textRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-4xl">
        <p className="text-indigo-400 mb-4 text-sm uppercase tracking-widest">Gradient Reveal</p>
        <h2 
          ref={textRef}
          className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Revealing Gradients
        </h2>
        <p className="text-neutral-500 mt-6 text-lg">
          A clip-path wipe reveals the gradient text from left to right.
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 6: 3D Flip Per Character
// ═══════════════════════════════════════════════════════════

function FlipReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      const chars = splitTextIntoSpans(textRef.current!, 'chars')
      
      gsap.set(chars, {
        rotateY: -90,
        opacity: 0,
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
      })
      
      gsap.to(chars, {
        rotateY: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-8 bg-neutral-950">
      <div className="max-w-4xl" style={{ perspective: '1000px' }}>
        <p className="text-indigo-400 mb-4 text-sm uppercase tracking-widest">3D Flip</p>
        <h2 
          ref={textRef}
          className="text-5xl md:text-7xl font-bold leading-tight"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Characters flip into view
        </h2>
        <p className="text-neutral-500 mt-6 text-lg">
          Each character rotates in 3D space with a bouncy overshoot effect.
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function TextRevealShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100 min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Text Reveal
          </h1>
          <p className="text-xl text-neutral-400">
            Six different text animation techniques using GSAP
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Scroll to explore
          </div>
        </div>
      </section>
      
      <CharacterReveal />
      <WordReveal />
      <LineReveal />
      <ScrambleReveal />
      <GradientReveal />
      <FlipReveal />
      
      {/* Footer */}
      <section className="py-32 text-center">
        <p className="text-neutral-500">End of Text Reveal Showcase</p>
      </section>
    </div>
  )
}
