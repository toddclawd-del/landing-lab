'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ════════════════════════════════════════════
// SCROLL PROGRESS INDICATORS
// Various ways to show scroll progress
// Demonstrates: Progress bars, circular indicators,
// section dots, timelines, and chapter markers
// ════════════════════════════════════════════

const CONFIG = {
  // Colors
  accentColor: '#14b8a6',
  trackColor: '#262626',
  
  // Sections
  sections: [
    { id: 'intro', title: 'Introduction', color: '#14b8a6' },
    { id: 'features', title: 'Features', color: '#8b5cf6' },
    { id: 'process', title: 'Process', color: '#f59e0b' },
    { id: 'results', title: 'Results', color: '#ef4444' },
    { id: 'conclusion', title: 'Conclusion', color: '#22c55e' },
  ],
}

// ═══════════════════════════════════════════════════════════
// COMPONENT: Horizontal Progress Bar
// Fixed bar at top showing overall scroll progress
// ═══════════════════════════════════════════════════════════

function HorizontalProgressBar() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setProgress(self.progress),
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-800 z-50">
      <div 
        className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-75"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// COMPONENT: Circular Progress
// Fixed circular indicator showing scroll progress
// ═══════════════════════════════════════════════════════════

function CircularProgress() {
  const [progress, setProgress] = useState(0)
  const circumference = 2 * Math.PI * 40 // radius = 40
  
  useEffect(() => {
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setProgress(self.progress),
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <svg width="100" height="100" className="transform -rotate-90">
        {/* Track */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#262626"
          strokeWidth="4"
        />
        {/* Progress */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          className="transition-all duration-75"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-teal-400">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// COMPONENT: Section Dots
// Fixed dots indicating current section
// ═══════════════════════════════════════════════════════════

function SectionDots() {
  const [activeSection, setActiveSection] = useState(0)
  const [sectionProgress, setSectionProgress] = useState(0)
  
  useEffect(() => {
    CONFIG.sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(i),
        onEnterBack: () => setActiveSection(i),
        onUpdate: (self) => {
          if (i === activeSection) {
            setSectionProgress(self.progress)
          }
        },
      })
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [activeSection])
  
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col gap-4">
        {CONFIG.sections.map((section, i) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3"
          >
            {/* Dot */}
            <div className="relative">
              <div 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeSection 
                    ? 'scale-125' 
                    : 'scale-100 bg-neutral-600'
                }`}
                style={{ 
                  backgroundColor: i === activeSection ? section.color : undefined,
                }}
              />
              {/* Progress ring for active section */}
              {i === activeSection && (
                <svg 
                  className="absolute -inset-1 w-5 h-5 transform -rotate-90"
                  viewBox="0 0 20 20"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke={section.color}
                    strokeWidth="2"
                    strokeDasharray={2 * Math.PI * 8}
                    strokeDashoffset={2 * Math.PI * 8 * (1 - sectionProgress)}
                    opacity="0.5"
                  />
                </svg>
              )}
            </div>
            
            {/* Label */}
            <span 
              className={`text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${
                i === activeSection ? 'text-white' : 'text-neutral-500'
              }`}
            >
              {section.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// COMPONENT: Timeline Progress
// Vertical timeline that fills as you scroll
// ═══════════════════════════════════════════════════════════

function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const steps = [
    { title: 'Discovery', desc: 'Understanding your needs and goals' },
    { title: 'Strategy', desc: 'Planning the perfect approach' },
    { title: 'Design', desc: 'Creating beautiful experiences' },
    { title: 'Development', desc: 'Building with precision' },
    { title: 'Launch', desc: 'Deploying to the world' },
  ]
  
  useEffect(() => {
    if (!containerRef.current || !progressRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Animate the timeline progress line
    gsap.to(progressRef.current, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: prefersReducedMotion ? 0 : 1,
      },
    })
    
    // Animate each step
    stepsRef.current.forEach((step, i) => {
      if (!step) return
      
      gsap.fromTo(step,
        { opacity: 0.3, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: step,
            start: 'top 70%',
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
    <section id="process" className="py-32 px-8 bg-neutral-950 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <p className="text-teal-400 mb-4 text-sm uppercase tracking-widest">
          Timeline Progress
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Our Process</h2>
        
        <div ref={containerRef} className="relative pl-8">
          {/* Timeline track */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-800">
            <div 
              ref={progressRef}
              className="w-full bg-gradient-to-b from-teal-400 to-cyan-400"
              style={{ height: '0%' }}
            />
          </div>
          
          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { stepsRef.current[i] = el }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-teal-400 -translate-x-1.5 border-4 border-neutral-950" />
                
                <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50">
                  <span className="text-teal-400 text-sm font-mono">0{i + 1}</span>
                  <h3 className="text-2xl font-bold mt-2">{step.title}</h3>
                  <p className="text-neutral-400 mt-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════
// COMPONENT: Chapter Markers
// Book-like chapter indicators
// ═══════════════════════════════════════════════════════════

function ChapterMarkers() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [chapterProgress, setChapterProgress] = useState(0)
  
  const chapters = [
    { num: 1, title: 'The Beginning' },
    { num: 2, title: 'Rising Action' },
    { num: 3, title: 'The Climax' },
    { num: 4, title: 'Resolution' },
  ]
  
  useEffect(() => {
    chapters.forEach((chapter, i) => {
      ScrollTrigger.create({
        trigger: `#chapter-${chapter.num}`,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setCurrentChapter(i),
        onEnterBack: () => setCurrentChapter(i),
        onUpdate: (self) => {
          if (i === currentChapter) {
            setChapterProgress(self.progress)
          }
        },
      })
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [currentChapter])
  
  return (
    <>
      {/* Fixed chapter indicator */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/90 backdrop-blur-sm rounded-full px-6 py-3 border border-neutral-700">
        <div className="flex items-center gap-4">
          <span className="text-teal-400 font-mono text-sm">
            Chapter {chapters[currentChapter]?.num}
          </span>
          <span className="text-neutral-400">|</span>
          <span className="text-white font-medium">
            {chapters[currentChapter]?.title}
          </span>
          <div className="w-24 h-1 bg-neutral-700 rounded overflow-hidden">
            <div 
              className="h-full bg-teal-400 transition-all duration-100"
              style={{ width: `${chapterProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Chapter sections */}
      {chapters.map((chapter) => (
        <section
          key={chapter.num}
          id={`chapter-${chapter.num}`}
          className="min-h-screen flex items-center justify-center px-8"
        >
          <div className="text-center">
            <span className="text-8xl md:text-9xl font-bold text-neutral-800">
              {chapter.num}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">{chapter.title}</h2>
            <p className="text-neutral-500 mt-4 max-w-md mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </section>
      ))}
    </>
  )
}

// ═══════════════════════════════════════════════════════════
// CONTENT SECTIONS
// ═══════════════════════════════════════════════════════════

function ContentSections() {
  return (
    <>
      <section id="intro" className="min-h-screen flex items-center justify-center px-8 bg-neutral-900">
        <div className="text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Introduction</h2>
          <p className="text-xl text-neutral-400">
            Scroll down to see the progress indicators in action. 
            Watch the horizontal bar, circular indicator, and section dots.
          </p>
        </div>
      </section>
      
      <section id="features" className="min-h-screen flex items-center justify-center px-8 bg-neutral-950">
        <div className="text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Features</h2>
          <p className="text-xl text-neutral-400">
            Multiple progress indicators working simultaneously to provide 
            different levels of feedback about your scroll position.
          </p>
        </div>
      </section>
    </>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════

export default function ScrollProgressShowcase() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Progress indicators */}
      <HorizontalProgressBar />
      <CircularProgress />
      <SectionDots />
      
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8 pt-16">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Scroll Progress
          </h1>
          <p className="text-xl text-neutral-400">
            Visual indicators for scroll position
          </p>
          <div className="mt-12 text-neutral-500 animate-bounce">
            ↓ Scroll to track progress
          </div>
        </div>
      </section>
      
      <ContentSections />
      <TimelineSection />
      
      <section id="results" className="min-h-screen flex items-center justify-center px-8 bg-neutral-900">
        <div className="text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Results</h2>
          <p className="text-xl text-neutral-400">
            Progress indicators help users understand where they are 
            in long-form content and how much remains.
          </p>
        </div>
      </section>
      
      <section id="conclusion" className="min-h-screen flex items-center justify-center px-8 bg-neutral-950">
        <div className="text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Conclusion</h2>
          <p className="text-xl text-neutral-400">
            Combine multiple progress indicators for the best user experience 
            based on your content structure.
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <section className="py-32 text-center">
        <p className="text-neutral-500">End of Scroll Progress Showcase</p>
      </section>
    </div>
  )
}
