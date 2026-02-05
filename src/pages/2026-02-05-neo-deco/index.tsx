import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ─── Color Palette ───────────────────────────────────────────
const c = {
  noir:       '#0D0B0E',
  surface:    '#141216',
  card:       '#1A171D',
  gold:       '#C9A96E',
  goldLight:  '#E4D5A8',
  goldDark:   '#A08340',
  champagne:  '#F5E6C8',
  ivory:      '#FAF7F2',
  emerald:    '#2D6A4F',
  ruby:       '#9B2335',
  text:       '#E8E4DF',
  textMuted:  'rgba(232, 228, 223, 0.55)',
  border:     'rgba(201, 169, 110, 0.15)',
  borderGold: 'rgba(201, 169, 110, 0.35)',
}

// ─── Gold Gradient CSS ────────────────────────────────────────
const goldGradient = `linear-gradient(135deg, ${c.goldDark}, ${c.gold}, ${c.goldLight}, ${c.gold}, ${c.goldDark})`
const goldTextStyle: React.CSSProperties = {
  background: goldGradient,
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

// ─── Fonts ────────────────────────────────────────────────────
const serif = `'Playfair Display', Georgia, serif`
const sans = `'DM Sans', system-ui, sans-serif`

// ─── SVG Decorative Components ────────────────────────────────

function SunburstSVG({ size = 500, opacity = 0.06 }: { size?: number; opacity?: number }) {
  const rays = 24
  return (
    <svg width={size} height={size} viewBox="0 0 500 500" style={{ opacity }}>
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (360 / rays) * i
        return (
          <line
            key={i}
            x1="250" y1="250"
            x2="250" y2="0"
            stroke={c.gold}
            strokeWidth="1"
            transform={`rotate(${angle} 250 250)`}
          />
        )
      })}
      <circle cx="250" cy="250" r="8" fill={c.gold} opacity={0.3} />
      <circle cx="250" cy="250" r="80" fill="none" stroke={c.gold} strokeWidth="0.5" />
      <circle cx="250" cy="250" r="160" fill="none" stroke={c.gold} strokeWidth="0.5" />
    </svg>
  )
}

function ChevronDivider({ width = 120 }: { width?: number }) {
  return (
    <svg width={width} height="20" viewBox="0 0 120 20" style={{ display: 'block', margin: '0 auto' }}>
      <polyline points="0,18 30,2 60,18 90,2 120,18" fill="none" stroke={c.gold} strokeWidth="1.5" opacity={0.5} />
    </svg>
  )
}

function GeometricFrame({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: 'relative',
      padding: '3px',
      background: `linear-gradient(135deg, ${c.gold}40, ${c.gold}10, ${c.gold}40)`,
      ...style,
    }}>
      <div style={{ position: 'relative', padding: '2px', background: c.noir }}>
        <div style={{
          padding: '2px',
          background: `linear-gradient(135deg, ${c.gold}20, transparent, ${c.gold}20)`,
        }}>
          <div style={{ background: c.card }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function SteppedCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const transforms: Record<string, string> = {
    'top-left': 'none',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1)',
  }
  return (
    <svg
      width="40" height="40" viewBox="0 0 40 40"
      style={{ transform: transforms[position] }}
    >
      <path d="M0,0 L40,0 L40,8 L8,8 L8,40 L0,40 Z" fill={c.gold} opacity={0.3} />
      <path d="M0,0 L24,0 L24,4 L4,4 L4,24 L0,24 Z" fill={c.gold} opacity={0.2} />
    </svg>
  )
}

function DiamondSeparator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '40px 0' }}>
      <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, transparent, ${c.gold}60)` }} />
      <div style={{
        width: '10px', height: '10px',
        background: c.gold,
        transform: 'rotate(45deg)',
        opacity: 0.5,
      }} />
      <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, ${c.gold}60, transparent)` }} />
    </div>
  )
}

// ─── Animation Variants ───────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number], delay }
  })
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: 'easeOut' as const, delay }
  })
}

const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    pathLength: 1, opacity: 1,
    transition: { duration: 1.5, ease: 'easeInOut' as const, delay }
  })
}

// ─── Reusable Components ──────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: sans,
      fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
      fontWeight: 500,
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: c.gold,
    }}>
      {children}
    </span>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: serif,
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: 1.15,
      color: c.ivory,
      margin: '16px 0 0',
    }}>
      {children}
    </h2>
  )
}

function GoldButton({ children, variant = 'filled' }: { children: React.ReactNode; variant?: 'filled' | 'outline' }) {
  const [hovered, setHovered] = useState(false)
  const filled = variant === 'filled'
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        fontFamily: sans,
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        padding: '16px 40px',
        border: `1.5px solid ${c.gold}`,
        background: filled ? (hovered ? c.goldDark : c.gold) : (hovered ? `${c.gold}15` : 'transparent'),
        color: filled ? c.noir : c.gold,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </motion.button>
  )
}

function AnimatedLine({ delay = 0 }: { delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <svg ref={ref} width="100%" height="2" style={{ display: 'block' }}>
      <motion.line
        x1="0" y1="1" x2="100%" y2="1"
        stroke={c.gold}
        strokeWidth="1"
        opacity={0.3}
        variants={drawLine}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={delay}
      />
    </svg>
  )
}

// ─── Shimmer Animation for Gold Text ──────────────────────────

function ShimmerText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span style={{
      ...goldTextStyle,
      animation: 'goldShimmer 6s ease-in-out infinite',
      ...style,
    }}>
      {children}
    </span>
  )
}

// ─── NAV ──────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 clamp(24px, 5vw, 80px)',
        background: scrolled ? `${c.noir}ee` : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${c.border}` : '1px solid transparent',
        transition: 'all 0.5s ease',
      }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '80px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Experience', 'Suites'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontFamily: sans, fontSize: '0.75rem', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: c.textMuted, textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = c.gold)}
            onMouseLeave={e => (e.currentTarget.style.color = c.textMuted)}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: serif, fontSize: '1.4rem', fontWeight: 400,
            letterSpacing: '0.12em', ...goldTextStyle,
          }}>
            THE MERIDIAN
          </div>
          <div style={{
            fontFamily: sans, fontSize: '0.55rem', fontWeight: 500,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: c.textMuted, marginTop: '2px',
          }}>
            EST. 1926 — NEW YORK
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Gallery', 'Reserve'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontFamily: sans, fontSize: '0.75rem', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: item === 'Reserve' ? c.gold : c.textMuted,
              textDecoration: 'none', transition: 'color 0.3s',
              borderBottom: item === 'Reserve' ? `1px solid ${c.gold}40` : 'none',
              paddingBottom: item === 'Reserve' ? '2px' : 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = c.goldLight)}
            onMouseLeave={e => (e.currentTarget.style.color = item === 'Reserve' ? c.gold : c.textMuted)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: c.noir, overflow: 'hidden',
    }}>
      {/* Sunburst Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        <SunburstSVG size={900} opacity={0.04} />
      </motion.div>

      {/* Stepped corner accents */}
      <div style={{ position: 'absolute', top: '60px', left: '40px' }}>
        <SteppedCorner position="top-left" />
      </div>
      <div style={{ position: 'absolute', top: '60px', right: '40px' }}>
        <SteppedCorner position="top-right" />
      </div>
      <div style={{ position: 'absolute', bottom: '40px', left: '40px' }}>
        <SteppedCorner position="bottom-left" />
      </div>
      <div style={{ position: 'absolute', bottom: '40px', right: '40px' }}>
        <SteppedCorner position="bottom-right" />
      </div>

      {/* Geometric border lines */}
      <div style={{
        position: 'absolute', inset: '90px 60px 60px',
        border: `1px solid ${c.gold}15`,
        pointerEvents: 'none',
      }} />

      <motion.div style={{ y, opacity, textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 24px' }}>
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.3}>
          <ChevronDivider width={140} />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
          style={{ marginTop: '32px' }}
        >
          <SectionLabel>A LANDMARK OF MODERN LUXURY</SectionLabel>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.7}
          style={{
            fontFamily: serif,
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            margin: '24px 0',
            color: c.ivory,
          }}
        >
          <span style={{ fontStyle: 'italic', display: 'block' }}>Where</span>
          <ShimmerText style={{ fontSize: 'clamp(3.5rem, 12vw, 8.5rem)', fontWeight: 700 }}>
            Elegance
          </ShimmerText>
          <span style={{ fontStyle: 'italic', display: 'block', marginTop: '-8px' }}>Meets Legacy</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.9}
          style={{
            fontFamily: sans, fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            color: c.textMuted, maxWidth: '500px', margin: '0 auto',
            lineHeight: 1.7, fontWeight: 300,
          }}
        >
          A centennial celebration of Art Deco grandeur, reimagined for the modern connoisseur.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.1}
          style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}
        >
          <GoldButton variant="filled">Reserve a Suite</GoldButton>
          <GoldButton variant="outline">Explore</GoldButton>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1.5}
          style={{ marginTop: '60px' }}
        >
          <DiamondSeparator />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ marginTop: '8px' }}
        >
          <svg width="20" height="30" viewBox="0 0 20 30">
            <rect x="1" y="1" width="18" height="28" rx="9" fill="none" stroke={c.gold} strokeWidth="1" opacity={0.4} />
            <motion.circle
              cx="10" cy="10" r="2" fill={c.gold} opacity={0.6}
              animate={{ cy: [8, 18, 8] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── MARQUEE ──────────────────────────────────────────────────

function Marquee() {
  const words = ['GRANDEUR', '✦', 'LEGACY', '✦', 'ELEGANCE', '✦', 'REFINEMENT', '✦', 'OPULENCE', '✦', 'DISTINCTION', '✦']
  const repeated = [...words, ...words, ...words, ...words]
  return (
    <div style={{
      overflow: 'hidden', padding: '24px 0',
      borderTop: `1px solid ${c.border}`,
      borderBottom: `1px solid ${c.border}`,
      background: c.surface,
    }}>
      <motion.div
        animate={{ x: ['0%', '-25%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap' }}
      >
        {repeated.map((word, i) => (
          <span key={i} style={{
            fontFamily: serif,
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            fontWeight: 400,
            letterSpacing: '0.2em',
            color: word === '✦' ? c.gold : c.textMuted,
            opacity: word === '✦' ? 0.8 : 0.3,
          }}>
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── EXPERIENCE SECTION ───────────────────────────────────────

const experiences = [
  {
    number: '01',
    title: 'The Grand Lobby',
    desc: 'A soaring atrium of Carrara marble and hand-gilded plasterwork. The original 1926 chandelier—twelve hundred crystals—still catches the light exactly as Holabird & Root intended.',
    detail: 'Architecture & Design',
  },
  {
    number: '02',
    title: 'Rooftop Solarium',
    desc: 'Thirty stories above Manhattan, beneath a retractable geometric glass canopy. Seasonal botanicals, signature cocktails, and the kind of sunset that makes the whole city pause.',
    detail: 'Dining & Spirits',
  },
  {
    number: '03',
    title: 'The Deco Spa',
    desc: 'Treatments drawn from global traditions, performed in rooms inspired by the Chrysler Building\'s crown. Malachite soaking pools, eucalyptus steam, absolute silence.',
    detail: 'Wellness & Renewal',
  },
  {
    number: '04',
    title: 'Ballroom Aurelia',
    desc: 'Seating for three hundred beneath coffered ceilings with gold-leaf rosettes. The acoustics were designed by the same firm that did Carnegie Hall.',
    detail: 'Events & Celebrations',
  },
]

function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={ref} style={{
      padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)',
      background: c.noir, position: 'relative',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <SectionLabel>THE EXPERIENCE</SectionLabel>
          <SectionTitle>A Century of <br />Curated Luxury</SectionTitle>
          <div style={{ marginTop: '24px' }}><ChevronDivider /></div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.15 * (i + 1)}
            >
              <ExperienceRow {...exp} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceRow({ number, title, desc, detail }: {
  number: string; title: string; desc: string; detail: string; index: number
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderBottom: `1px solid ${c.border}`, cursor: 'default' }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '60px 1fr auto',
        gap: 'clamp(16px, 3vw, 32px)',
        padding: '36px 0',
        alignItems: 'start',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateX(8px)' : 'translateX(0)',
      }}>
        <span style={{
          fontFamily: serif, fontSize: '1.8rem', fontWeight: 300,
          ...goldTextStyle, opacity: 0.5,
        }}>
          {number}
        </span>

        <div>
          <h3 style={{
            fontFamily: serif, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 400, color: hovered ? c.ivory : c.text,
            transition: 'color 0.3s', margin: 0,
          }}>
            {title}
          </h3>
          <p style={{
            fontFamily: sans, fontSize: '0.9rem', color: c.textMuted,
            lineHeight: 1.7, margin: '8px 0 0', maxWidth: '560px',
            fontWeight: 300,
          }}>
            {desc}
          </p>
        </div>

        <span style={{
          fontFamily: sans, fontSize: '0.7rem', fontWeight: 500,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: hovered ? c.gold : c.textMuted,
          transition: 'color 0.3s', whiteSpace: 'nowrap',
          paddingTop: '8px',
        }}>
          {detail}
        </span>
      </div>
    </div>
  )
}

// ─── SUITES SECTION ───────────────────────────────────────────

const suites = [
  {
    name: 'The Chrysler Suite',
    size: '1,200 sq ft',
    price: 'From $2,800',
    features: ['City Skyline Views', 'Marble Bath', 'Private Bar'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=700&fit=crop',
  },
  {
    name: 'The Gatsby Penthouse',
    size: '2,400 sq ft',
    price: 'From $5,500',
    features: ['Central Park View', 'Grand Piano', 'Butler Service'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=700&fit=crop',
  },
  {
    name: 'The Emerald Room',
    size: '900 sq ft',
    price: 'From $1,600',
    features: ['Garden Terrace', 'Art Collection', 'Rain Shower'],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=700&fit=crop',
  },
]

function SuitesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="suites" ref={ref} style={{
      padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)',
      background: c.surface,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <SectionLabel>ACCOMMODATIONS</SectionLabel>
          <SectionTitle>Suites & Residences</SectionTitle>
          <div style={{ marginTop: '24px' }}><ChevronDivider /></div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
        }}>
          {suites.map((suite, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.15 * (i + 1)}
            >
              <SuiteCard {...suite} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SuiteCard({ name, size, price, features, image }: {
  name: string; size: string; price: string; features: string[]; image: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <GeometricFrame>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer', overflow: 'hidden' }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '320px' }}>
          <motion.img
            src={image}
            alt={name}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.85) contrast(1.05)',
            }}
          />
          {/* Gold overlay on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top, ${c.noir}dd, transparent)`,
                }}
              />
            )}
          </AnimatePresence>

          {/* Price badge */}
          <div style={{
            position: 'absolute', top: '16px', right: '16px',
            background: `${c.noir}cc`,
            border: `1px solid ${c.borderGold}`,
            padding: '8px 16px',
            fontFamily: sans, fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '0.1em', color: c.gold,
          }}>
            {price}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '28px 24px' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          }}>
            <h3 style={{
              fontFamily: serif, fontSize: '1.3rem', fontWeight: 400,
              color: c.ivory, margin: 0,
            }}>
              {name}
            </h3>
            <span style={{
              fontFamily: sans, fontSize: '0.7rem', fontWeight: 500,
              letterSpacing: '0.1em', color: c.textMuted,
            }}>
              {size}
            </span>
          </div>

          <div style={{
            display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap',
          }}>
            {features.map((f, i) => (
              <span key={i} style={{
                fontFamily: sans, fontSize: '0.65rem', fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: c.textMuted,
                padding: '6px 12px',
                border: `1px solid ${c.border}`,
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GeometricFrame>
  )
}

// ─── GALLERY SECTION ──────────────────────────────────────────

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop', caption: 'The Grand Facade', span: 2 },
  { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=400&fit=crop', caption: 'Lobby Detail', span: 1 },
  { src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=400&fit=crop', caption: 'Gilded Ceiling', span: 1 },
  { src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop', caption: 'Evening Terrace', span: 2 },
]

function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="gallery" ref={ref} style={{
      padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)',
      background: c.noir,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <SectionLabel>GALLERY</SectionLabel>
          <SectionTitle>Glimpses of Grandeur</SectionTitle>
          <div style={{ marginTop: '24px' }}><ChevronDivider /></div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.1 * (i + 1)}
            >
              <GalleryCard {...img} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryCard({ src, caption }: { src: string; caption: string; span: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', height: '280px' }}
    >
      <motion.img
        src={src}
        alt={caption}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.8) sepia(0.15)' }}
      />
      {/* Art Deco corner accents on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <div style={{ position: 'absolute', inset: '12px', border: `1px solid ${c.gold}50`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '12px', left: '12px' }}><SteppedCorner position="top-left" /></div>
            <div style={{ position: 'absolute', top: '12px', right: '12px' }}><SteppedCorner position="top-right" /></div>
            <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}><SteppedCorner position="bottom-left" /></div>
            <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}><SteppedCorner position="bottom-right" /></div>
            <div style={{
              position: 'absolute', bottom: '24px', left: '24px',
              fontFamily: sans, fontSize: '0.7rem', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: c.goldLight,
            }}>
              {caption}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── STATS SECTION ────────────────────────────────────────────

const stats = [
  { number: '1926', label: 'Year Established' },
  { number: '247', label: 'Luxury Suites' },
  { number: '98', label: 'Years of Service' },
  { number: '12', label: 'Global Awards' },
]

function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} style={{
      padding: '60px clamp(24px, 5vw, 80px)',
      background: c.surface,
      borderTop: `1px solid ${c.border}`,
      borderBottom: `1px solid ${c.border}`,
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '32px',
        textAlign: 'center',
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.1 * i}
          >
            <div style={{
              fontFamily: serif, fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 300, ...goldTextStyle,
            }}>
              {stat.number}
            </div>
            <div style={{
              fontFamily: sans, fontSize: '0.7rem', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: c.textMuted, marginTop: '8px',
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── TESTIMONIAL SECTION ──────────────────────────────────────

const testimonials = [
  {
    quote: 'The Meridian doesn\'t just honor the Art Deco era—it makes you feel like you\'re living in the most glamorous version of it. Every corner is a masterpiece.',
    author: 'Condé Nast Traveler',
    year: '2025',
  },
  {
    quote: 'We\'ve stayed at every landmark hotel in Manhattan. The Meridian is the only one that made us cancel our return flight just to stay another night.',
    author: 'James & Claire Whitfield',
    year: '2025',
  },
  {
    quote: 'The Ballroom Aurelia is, without exaggeration, the most beautiful event space in North America. Our clients are still talking about it.',
    author: 'Harper & Stone Events',
    year: '2024',
  },
]

function TestimonialSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={ref} style={{
      padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)',
      background: c.noir, position: 'relative',
    }}>
      {/* Subtle sunburst behind */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}>
        <SunburstSVG size={700} opacity={0.025} />
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0}>
          <SectionLabel>TESTIMONIALS</SectionLabel>
          <div style={{ marginTop: '24px' }}><ChevronDivider width={80} /></div>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0.3}
          style={{ marginTop: '48px', minHeight: '200px', position: 'relative' }}
        >
          {/* Gold quotation mark */}
          <div style={{
            fontFamily: serif, fontSize: '6rem', lineHeight: 1,
            ...goldTextStyle, opacity: 0.15,
            position: 'absolute', top: '-20px', left: '50%',
            transform: 'translateX(-50%)',
          }}>
            "
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p style={{
                fontFamily: serif, fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontWeight: 400, fontStyle: 'italic',
                color: c.text, lineHeight: 1.7,
                margin: '0 0 32px',
              }}>
                {testimonials[active].quote}
              </p>
              <div style={{
                fontFamily: sans, fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: c.gold,
              }}>
                {testimonials[active].author}
              </div>
              <div style={{
                fontFamily: sans, fontSize: '0.7rem', fontWeight: 400,
                color: c.textMuted, marginTop: '4px',
              }}>
                {testimonials[active].year}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '40px' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  background: i === active ? c.gold : `${c.gold}30`,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: i === active ? 'none' : 'rotate(45deg)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── CTA SECTION ──────────────────────────────────────────────

function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="reserve" ref={ref} style={{
      padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)',
      background: c.surface, position: 'relative', overflow: 'hidden',
    }}>
      {/* Background geometric pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(45deg, ${c.gold}05 25%, transparent 25%),
          linear-gradient(-45deg, ${c.gold}05 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, ${c.gold}05 75%),
          linear-gradient(-45deg, transparent 75%, ${c.gold}05 75%)
        `,
        backgroundSize: '60px 60px',
        backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0}>
          <DiamondSeparator />
          <SectionLabel>BEGIN YOUR LEGACY</SectionLabel>
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0.2}
          style={{
            fontFamily: serif,
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.1,
            color: c.ivory,
            margin: '24px 0',
          }}
        >
          Your Table <br />
          <ShimmerText style={{ fontWeight: 700 }}>Awaits</ShimmerText>
        </motion.h2>

        <motion.p variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0.4}
          style={{
            fontFamily: sans, fontSize: '1rem', color: c.textMuted,
            lineHeight: 1.7, margin: '0 0 40px', fontWeight: 300,
          }}
        >
          Reservations for dining, events, and suites are available year-round.
          Let our concierge craft your perfect evening.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0.6}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <GoldButton variant="filled">Make a Reservation</GoldButton>
          <GoldButton variant="outline">Contact Concierge</GoldButton>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0.8}>
          <DiamondSeparator />
        </motion.div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      padding: '60px clamp(24px, 5vw, 80px) 40px',
      background: c.noir,
      borderTop: `1px solid ${c.border}`,
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top: Logo centered */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            fontFamily: serif, fontSize: '1.6rem', fontWeight: 400,
            letterSpacing: '0.12em', ...goldTextStyle,
          }}>
            THE MERIDIAN
          </div>
          <div style={{
            fontFamily: sans, fontSize: '0.55rem', fontWeight: 500,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: c.textMuted, marginTop: '4px',
          }}>
            NEW YORK · SINCE 1926
          </div>
        </div>

        <AnimatedLine />

        {/* Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '32px',
          padding: '40px 0',
          textAlign: 'center',
        }}>
          {[
            { title: 'STAY', links: ['Suites', 'Residences', 'Penthouse', 'Rates'] },
            { title: 'DINE', links: ['Solarium', 'Lobby Bar', 'Private Dining', 'Menus'] },
            { title: 'EXPERIENCE', links: ['Spa', 'Events', 'Gallery', 'History'] },
            { title: 'CONNECT', links: ['Contact', 'Press', 'Careers', 'Newsletter'] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{
                fontFamily: sans, fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.2em', color: c.gold,
                marginBottom: '16px',
              }}>
                {col.title}
              </div>
              {col.links.map((link, j) => (
                <a key={j} href="#" style={{
                  display: 'block',
                  fontFamily: sans, fontSize: '0.8rem', fontWeight: 300,
                  color: c.textMuted, textDecoration: 'none',
                  padding: '4px 0', transition: 'color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = c.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = c.textMuted)}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <AnimatedLine />

        {/* Bottom */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '24px', flexWrap: 'wrap', gap: '16px',
        }}>
          <span style={{
            fontFamily: sans, fontSize: '0.65rem', fontWeight: 400,
            color: c.textMuted,
          }}>
            © 2026 The Meridian Hotel. A work of fiction by Landing Lab.
          </span>
          <span style={{
            fontFamily: sans, fontSize: '0.65rem', fontWeight: 400,
            color: c.textMuted,
          }}>
            DESIGNED WITH ✦ IN NEW YORK
          </span>
        </div>
      </div>
    </footer>
  )
}

// ─── GLOBAL STYLES ────────────────────────────────────────────

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { background: ${c.noir}; color: ${c.text}; overflow-x: hidden; }

      @keyframes goldShimmer {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }

      ::selection {
        background: ${c.gold}40;
        color: ${c.ivory};
      }

      /* Mobile responsive adjustments */
      @media (max-width: 768px) {
        /* Hide nav links on mobile, keep logo */
        nav > div > div:first-child,
        nav > div > div:last-child {
          display: none !important;
        }
        nav > div {
          justify-content: center !important;
        }
      }
    `}</style>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────

export default function NeoDeco() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <Hero />
      <Marquee />
      <ExperienceSection />
      <StatsSection />
      <SuitesSection />
      <GallerySection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </>
  )
}
