'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ════════════════════════════════════════════
// COUNTER ANIMATIONS
// Number counting and odometer effects
// Demonstrates: Counting with easing, decimals,
// slot machine effects, and scroll-triggered stats
// ════════════════════════════════════════════

const CONFIG = {
  // Counter settings
  defaultDuration: 2,
  defaultEase: 'power2.out',
  
  // Slot machine
  slotSpins: 10,
  slotDuration: 0.1,
  
  // Odometer
  odometerDigits: 6,
  
  // Colors
  accentColor: '#a855f7',
  bgColor: '#0a0a0a',
}

// ═══════════════════════════════════════════════════════════
// UTILITY: Format number with commas
// ═══════════════════════════════════════════════════════════

function formatNumber(num: number, decimals = 0): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

// ═══════════════════════════════════════════════════════════
// HOOK: useCounter
// Reusable counter animation hook
// ═══════════════════════════════════════════════════════════

function useCounter(
  targetValue: number,
  options: {
    duration?: number
    decimals?: number
    startOnView?: boolean
    prefix?: string
    suffix?: string
  } = {}
) {
  const {
    duration = CONFIG.defaultDuration,
    decimals = 0,
    startOnView = true,
    prefix = '',
    suffix = '',
  } = options
  
  const [value, setValue] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  
  useEffect(() => {
    if (!ref.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    function animate() {
      if (hasAnimated.current) return
      hasAnimated.current = true
      
      if (prefersReducedMotion) {
        setValue(targetValue)
        setIsComplete(true)
        return
      }
      
      const counter = { value: 0 }
      gsap.to(counter, {
        value: targetValue,
        duration,
        ease: CONFIG.defaultEase,
        onUpdate: () => setValue(counter.value),
        onComplete: () => setIsComplete(true),
      })
    }
    
    if (startOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animate()
          }
        },
        { threshold: 0.5 }
      )
      observer.observe(ref.current)
      return () => observer.disconnect()
    } else {
      animate()
    }
  }, [targetValue, duration, startOnView])
  
  const displayValue = `${prefix}${formatNumber(value, decimals)}${suffix}`
  
  return { ref, value, displayValue, isComplete }
}

// ═══════════════════════════════════════════════════════════
// SECTION 1: Basic Counter with Easing
// Simple counting up animation
// ═══════════════════════════════════════════════════════════

function BasicCounters() {
  const counter1 = useCounter(1500, { suffix: '+' })
  const counter2 = useCounter(98.7, { decimals: 1, suffix: '%' })
  const counter3 = useCounter(42000, { prefix: '$', suffix: 'M' })
  
  return (
    <section className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-purple-400 mb-12 text-sm uppercase tracking-widest text-center">
          Basic Counters with Easing
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div ref={counter1.ref} className="text-center">
            <div className="text-6xl md:text-7xl font-bold text-white mb-4 tabular-nums">
              {counter1.displayValue}
            </div>
            <p className="text-neutral-400 text-lg">Happy Customers</p>
          </div>
          
          <div ref={counter2.ref} className="text-center">
            <div className="text-6xl md:text-7xl font-bold text-white mb-4 tabular-nums">
              {counter2.displayValue}
            </div>
            <p className="text-neutral-400 text-lg">Satisfaction Rate</p>
          </div>
          
          <div ref={counter3.ref} className="text-center">
            <div className="text-6xl md:text-7xl font-bold text-white mb-4 tabular-nums">
              {counter3.displayValue}
            </div>
            <p className="text-neutral-400 text-lg">Revenue Generated</p>
          </div>
        </div>
        
        <p className="text-neutral-500 mt-16 text-center text-lg">
          Numbers count up when they enter the viewport
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 2: Slot Machine Effect
// Individual digits spin like a slot machine
// ═══════════════════════════════════════════════════════════

function SlotMachineCounter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const digitsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const targetNumber = '847592'
  const digits = targetNumber.split('')
  
  useEffect(() => {
    if (!containerRef.current || hasAnimated) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          if (prefersReducedMotion) {
            digitsRef.current.forEach((digit, i) => {
              if (digit) digit.textContent = digits[i]
            })
            return
          }
          
          // Animate each digit
          digitsRef.current.forEach((digit, i) => {
            if (!digit) return
            
            const targetDigit = parseInt(digits[i])
            let currentSpin = 0
            const totalSpins = CONFIG.slotSpins + i * 2 // Stagger spins
            
            function spin() {
              if (!digit) return
              if (currentSpin < totalSpins) {
                digit.textContent = String(Math.floor(Math.random() * 10))
                currentSpin++
                setTimeout(spin, CONFIG.slotDuration * 1000 * (1 + currentSpin / totalSpins))
              } else {
                digit.textContent = String(targetDigit)
                gsap.fromTo(digit, 
                  { scale: 1.2 },
                  { scale: 1, duration: 0.3, ease: 'back.out(2)' }
                )
              }
            }
            
            setTimeout(spin, i * 100)
          })
        }
      },
      { threshold: 0.5 }
    )
    
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [hasAnimated, digits])
  
  return (
    <section className="py-32 px-8 bg-neutral-950">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-purple-400 mb-12 text-sm uppercase tracking-widest">
          Slot Machine Effect
        </p>
        
        <div 
          ref={containerRef}
          className="flex justify-center gap-2 md:gap-4"
        >
          {digits.map((_, i) => (
            <div
              key={i}
              className="w-16 h-24 md:w-24 md:h-36 bg-neutral-800 rounded-xl flex items-center justify-center border border-neutral-700 shadow-xl"
            >
              <div
                ref={(el) => { digitsRef.current[i] = el }}
                className="text-5xl md:text-7xl font-bold text-purple-400 tabular-nums"
              >
                0
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-lg">
          Digits spin randomly before landing on final values
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 3: Odometer Style
// Rolling odometer with CSS overflow
// ═══════════════════════════════════════════════════════════

function OdometerCounter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const columnsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const targetNumber = '024680'
  const digits = targetNumber.split('')
  
  useEffect(() => {
    if (!containerRef.current || hasAnimated) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          columnsRef.current.forEach((column, i) => {
            if (!column) return
            
            const targetDigit = parseInt(digits[i])
            const targetY = -targetDigit * 100 // Each digit is 100% of container
            
            gsap.to(column, {
              y: `${targetY}%`,
              duration: prefersReducedMotion ? 0 : 2 + i * 0.3,
              ease: 'power2.out',
              delay: prefersReducedMotion ? 0 : i * 0.1,
            })
          })
        }
      },
      { threshold: 0.5 }
    )
    
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [hasAnimated, digits])
  
  return (
    <section className="py-32 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-purple-400 mb-12 text-sm uppercase tracking-widest">
          Odometer Style
        </p>
        
        <div 
          ref={containerRef}
          className="flex justify-center gap-1 md:gap-2"
        >
          {digits.map((_, i) => (
            <div
              key={i}
              className="w-14 h-20 md:w-20 md:h-28 bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700 relative"
            >
              <div
                ref={(el) => { columnsRef.current[i] = el }}
                className="absolute left-0 right-0"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <div
                    key={digit}
                    className="h-20 md:h-28 flex items-center justify-center text-4xl md:text-6xl font-bold text-white tabular-nums"
                  >
                    {digit}
                  </div>
                ))}
              </div>
              
              {/* Gradient overlays */}
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-lg">
          Digits roll up like a mechanical odometer
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: Scroll-Linked Counter
// Counter that animates based on scroll position
// ═══════════════════════════════════════════════════════════

function ScrollLinkedCounter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const ctx = gsap.context(() => {
      const counter = { value: 0 }
      
      gsap.to(counter, {
        value: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: prefersReducedMotion ? 0 : 1,
          onUpdate: () => setValue(Math.round(counter.value)),
        },
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-[200vh] relative bg-neutral-950">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-purple-400 mb-8 text-sm uppercase tracking-widest">
            Scroll-Linked Counter
          </p>
          
          <div 
            ref={valueRef}
            className="text-[12rem] md:text-[16rem] font-bold leading-none bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tabular-nums"
          >
            {value}%
          </div>
          
          {/* Progress bar */}
          <div className="w-64 md:w-96 h-2 bg-neutral-800 rounded-full mx-auto mt-8 overflow-hidden">
            <div 
              ref={progressRef}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100"
              style={{ width: `${value}%` }}
            />
          </div>
          
          <p className="text-neutral-500 mt-8 text-lg">
            Counter follows your scroll position
          </p>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// SECTION 5: Animated Stats Grid
// Multiple stats that animate with stagger
// ═══════════════════════════════════════════════════════════

function AnimatedStatsGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hasAnimated, setHasAnimated] = useState(false)
  const [values, setValues] = useState([0, 0, 0, 0, 0, 0])
  
  const stats = [
    { label: 'Projects Completed', target: 248, suffix: '' },
    { label: 'Active Users', target: 15.7, suffix: 'K', decimals: 1 },
    { label: 'Countries', target: 45, suffix: '' },
    { label: 'Team Members', target: 32, suffix: '' },
    { label: 'Years Experience', target: 12, suffix: '' },
    { label: 'Awards Won', target: 27, suffix: '' },
  ]
  
  useEffect(() => {
    if (!containerRef.current || hasAnimated) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          if (prefersReducedMotion) {
            setValues(stats.map(s => s.target))
            return
          }
          
          stats.forEach((stat, i) => {
            const counter = { value: 0 }
            gsap.to(counter, {
              value: stat.target,
              duration: 2,
              delay: i * 0.15,
              ease: 'power2.out',
              onUpdate: () => {
                setValues(prev => {
                  const newValues = [...prev]
                  newValues[i] = counter.value
                  return newValues
                })
              },
            })
            
            // Card animation
            if (statsRef.current[i]) {
              gsap.fromTo(statsRef.current[i],
                { opacity: 0, y: 30 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: 'power2.out',
                }
              )
            }
          })
        }
      },
      { threshold: 0.3 }
    )
    
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])
  
  return (
    <section className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-purple-400 mb-12 text-sm uppercase tracking-widest text-center">
          Animated Stats Grid
        </p>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { statsRef.current[i] = el }}
              className="bg-neutral-800/50 rounded-2xl p-6 text-center border border-neutral-700/50 opacity-0"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
                {stat.decimals 
                  ? values[i].toFixed(stat.decimals)
                  : Math.round(values[i])
                }
                {stat.suffix}
              </div>
              <p className="text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>
        
        <p className="text-neutral-500 mt-12 text-center text-lg">
          Stats animate with staggered timing
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function CounterAnimationsShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Counters
          </h1>
          <p className="text-xl text-neutral-400">
            Number animations and counting effects
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Scroll to count
          </div>
        </div>
      </section>
      
      <BasicCounters />
      <SlotMachineCounter />
      <OdometerCounter />
      <ScrollLinkedCounter />
      <AnimatedStatsGrid />
      
      {/* Footer */}
      <section className="py-32 text-center bg-neutral-950">
        <p className="text-neutral-500">End of Counter Animations Showcase</p>
      </section>
    </div>
  )
}
