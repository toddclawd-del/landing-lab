import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion'

// ============================================
// LIQUID MOTION LANDING PAGE
// Trend: Morphing blobs, fluid hover effects, 
// water-like animations, organic UI
// ============================================

// Color palette - Deep ocean with luminous accents
const colors = {
  bg: '#050510',
  bgLight: '#0a0a1a',
  primary: '#6366f1', // Indigo
  secondary: '#8b5cf6', // Violet
  accent: '#06b6d4', // Cyan
  accent2: '#f472b6', // Pink
  accent3: '#22d3ee', // Light cyan
  text: '#f8fafc',
  textMuted: 'rgba(248, 250, 252, 0.6)',
  glass: 'rgba(99, 102, 241, 0.1)',
}

// ============================================
// SVG FILTERS - For liquid distortion effects
// ============================================
const LiquidFilters = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      {/* Goo/Metaball effect filter */}
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>

      {/* Liquid distortion filter */}
      <filter id="liquid-distort" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.015"
          numOctaves="2"
          result="noise"
          seed="1"
        >
          <animate
            attributeName="baseFrequency"
            values="0.015;0.02;0.015"
            dur="10s"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
      </filter>

      {/* Gradient definitions */}
      <linearGradient id="blob-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={colors.primary} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
      <linearGradient id="blob-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={colors.secondary} />
        <stop offset="100%" stopColor={colors.accent2} />
      </linearGradient>
      <linearGradient id="blob-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.accent3} />
      </linearGradient>
    </defs>
  </svg>
)

// ============================================
// MORPHING BLOB - Animated organic shape
// ============================================
const MorphingBlob = ({ 
  size = 400, 
  color = 'url(#blob-gradient-1)', 
  duration = 8,
  delay = 0,
  style = {} 
}: { 
  size?: number
  color?: string
  duration?: number
  delay?: number
  style?: React.CSSProperties 
}) => {
  const paths = [
    'M60,-38.4C73.5,-18.3,77.7,8.8,68.5,30.4C59.3,52,36.6,68.1,11.3,73.6C-14,79.1,-42,74,-57.9,56.1C-73.8,38.2,-77.6,7.5,-68.8,-17.6C-60,-42.7,-38.6,-62.2,-14.8,-66.9C9,-71.6,46.5,-58.5,60,-38.4Z',
    'M54.2,-42.8C66.4,-26.5,69.8,-4.5,64.1,15.2C58.4,34.9,43.6,52.3,24.7,61.3C5.8,70.3,-17.2,70.9,-35.5,60.9C-53.8,50.9,-67.4,30.3,-70.6,7.7C-73.8,-14.9,-66.6,-39.5,-51.1,-56.4C-35.6,-73.3,-11.8,-82.5,6.4,-76.8C24.6,-71.1,42,-59.1,54.2,-42.8Z',
    'M62.5,-48.3C76.2,-32.9,78.8,-8.1,72.2,13.6C65.6,35.3,49.8,53.9,30.5,62.5C11.2,71.1,-11.6,69.7,-32.3,60.5C-53,51.3,-71.6,34.3,-77.4,12.8C-83.2,-8.7,-76.2,-34.7,-60.4,-50.6C-44.6,-66.5,-20,-72.3,2.3,-74C24.6,-75.7,48.8,-63.7,62.5,-48.3Z',
    'M47.5,-36.4C60.5,-23.4,69.1,-5.4,66.4,11.5C63.7,28.4,49.7,44.2,33.2,53.1C16.7,62,-2.3,64,-21.3,58.4C-40.3,52.8,-59.3,39.6,-66.7,21.2C-74.1,2.8,-69.9,-20.8,-57.6,-33.7C-45.3,-46.6,-25,-48.8,-5.9,-47.4C13.2,-46,34.5,-49.4,47.5,-36.4Z',
  ]

  return (
    <motion.svg
      viewBox="-100 -100 200 200"
      style={{
        width: size,
        height: size,
        position: 'absolute',
        filter: 'blur(0.5px)',
        ...style,
      }}
    >
      <motion.path
        fill={color}
        initial={{ d: paths[0], opacity: 0, scale: 0.8 }}
        animate={{
          d: paths,
          opacity: 0.8,
          scale: 1,
        }}
        transition={{
          d: {
            duration: duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay,
          },
          opacity: { duration: 1, delay },
          scale: { duration: 1, delay },
        }}
      />
    </motion.svg>
  )
}

// ============================================
// LIQUID BUTTON - Blobby organic CTA
// ============================================
const LiquidButton = ({ 
  children, 
  primary = false 
}: { 
  children: React.ReactNode
  primary?: boolean 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'relative',
        padding: '16px 32px',
        fontSize: '1rem',
        fontWeight: 600,
        color: primary ? colors.bg : colors.text,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        overflow: 'visible',
        zIndex: 1,
      }}
    >
      {/* Liquid blob background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -10,
          background: primary 
            ? `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` 
            : 'transparent',
          border: primary ? 'none' : `2px solid ${colors.primary}`,
          borderRadius: 50,
          zIndex: -1,
          filter: isHovered ? 'url(#goo)' : 'none',
        }}
        animate={{
          borderRadius: isHovered ? [50, 40, 60, 45, 50] : 50,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      
      {/* Button text */}
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
    </motion.button>
  )
}

// ============================================
// LIQUID CARD - Card with fluid hover effect
// ============================================
const LiquidCard = ({ 
  title, 
  description, 
  icon, 
  color,
  index 
}: { 
  title: string
  description: string
  icon: string
  color: string
  index: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: '40px',
        background: colors.glass,
        backdropFilter: 'blur(20px)',
        borderRadius: 24,
        border: `1px solid rgba(255,255,255,0.1)`,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      {/* Liquid blob on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 300,
              height: 300,
              marginLeft: -150,
              marginTop: -150,
              background: color,
              borderRadius: '50%',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.div
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? [0, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${color}40, ${color}20)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          marginBottom: 24,
        }}
      >
        {icon}
      </motion.div>

      {/* Content */}
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        color: colors.text,
        marginBottom: 12,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '1rem',
        color: colors.textMuted,
        lineHeight: 1.6,
      }}>
        {description}
      </p>

      {/* Arrow indicator */}
      <motion.div
        animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.5 }}
        style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          fontSize: '1.5rem',
          color: color,
        }}
      >
        →
      </motion.div>
    </motion.div>
  )
}

// ============================================
// LIQUID IMAGE - Image with liquid distortion hover
// ============================================
const LiquidImage = ({ 
  src, 
  title, 
  category,
  index 
}: { 
  src: string
  title: string
  category: string
  index: number
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        aspectRatio: index === 0 ? '16/12' : '4/5',
      }}
    >
      {/* Image with liquid distortion */}
      <motion.img
        src={src}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: isHovered ? 'url(#liquid-distort)' : 'none',
          transition: 'filter 0.3s ease',
        }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Overlay */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, ${colors.bg}ee, transparent)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 24,
        }}
      >
        <span style={{ 
          fontSize: '0.875rem', 
          color: colors.accent,
          fontWeight: 600,
          marginBottom: 8,
        }}>
          {category}
        </span>
        <h4 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: colors.text,
        }}>
          {title}
        </h4>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// METABALL CURSOR - Liquid cursor follower
// ============================================
const MetaballCursor = () => {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 30 })
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 30 })
  
  const trailX = useSpring(cursorX, { stiffness: 100, damping: 30 })
  const trailY = useSpring(cursorY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY])

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      pointerEvents: 'none', 
      zIndex: 9999,
      filter: 'url(#goo)',
    }}>
      {/* Main cursor blob */}
      <motion.div
        style={{
          position: 'absolute',
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: colors.accent,
          x: smoothX,
          y: smoothY,
          marginLeft: -10,
          marginTop: -10,
        }}
      />
      {/* Trail blob */}
      <motion.div
        style={{
          position: 'absolute',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: colors.primary,
          opacity: 0.5,
          x: trailX,
          y: trailY,
          marginLeft: -20,
          marginTop: -20,
        }}
      />
    </div>
  )
}

// ============================================
// LIQUID MARQUEE - Infinite scrolling text
// ============================================
const LiquidMarquee = () => {
  const words = ['Fluid', 'Organic', 'Morphing', 'Dynamic', 'Liquid', 'Flowing', 'Alive', 'Infinite']

  return (
    <div style={{
      overflow: 'hidden',
      padding: '40px 0',
      borderTop: `1px solid rgba(255,255,255,0.1)`,
      borderBottom: `1px solid rgba(255,255,255,0.1)`,
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'flex',
          gap: 80,
          whiteSpace: 'nowrap',
        }}
      >
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 800,
              color: 'transparent',
              WebkitTextStroke: `1px ${colors.textMuted}`,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ============================================
// NAV COMPONENT
// ============================================
const Nav = () => {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    return scrollY.on('change', (y) => setScrolled(y > 50))
  }, [scrollY])

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false)
  }, [isMobile])

  const navItems = ['Work', 'Services', 'About', 'Contact']

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '20px 5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: scrolled || mobileMenuOpen ? 'rgba(5, 5, 16, 0.95)' : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '1.2rem' }}>💧</span>
          </div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: colors.text,
          }}>
            Liquidflow
          </span>
        </motion.div>

        {/* Desktop Nav Links */}
        <div style={{ 
          display: isMobile ? 'none' : 'flex', 
          gap: 40, 
          alignItems: 'center' 
        }}>
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: colors.accent }}
              style={{
                color: colors.textMuted,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
            >
              {item}
            </motion.a>
          ))}
          <LiquidButton primary>Get Started</LiquidButton>
        </div>

        {/* Mobile Hamburger */}
        {isMobile && (
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 8,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              zIndex: 101,
            }}
          >
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 8 : 0,
              }}
              style={{
                width: 24,
                height: 2,
                background: colors.text,
                borderRadius: 2,
                transformOrigin: 'center',
              }}
            />
            <motion.span
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              style={{
                width: 24,
                height: 2,
                background: colors.text,
                borderRadius: 2,
              }}
            />
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -8 : 0,
              }}
              style={{
                width: 24,
                height: 2,
                background: colors.text,
                borderRadius: 2,
                transformOrigin: 'center',
              }}
            />
          </motion.button>
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80%',
              maxWidth: 320,
              background: 'rgba(5, 5, 16, 0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 99,
              paddingTop: 100,
              paddingLeft: 40,
              paddingRight: 40,
              borderLeft: `1px solid rgba(255,255,255,0.1)`,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    color: colors.text,
                    textDecoration: 'none',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: 16 }}
              >
                <LiquidButton primary>Get Started</LiquidButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 98,
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================
// HERO SECTION
// ============================================
const Hero = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <motion.section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 5%',
      }}
    >
      {/* Morphing blob background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        filter: 'blur(60px)',
        opacity: 0.5,
      }}>
        <MorphingBlob 
          size={600} 
          color="url(#blob-gradient-1)"
          style={{ top: '10%', left: '10%' }}
          duration={10}
        />
        <MorphingBlob 
          size={500} 
          color="url(#blob-gradient-2)"
          style={{ top: '40%', right: '5%' }}
          duration={12}
          delay={2}
        />
        <MorphingBlob 
          size={400} 
          color="url(#blob-gradient-3)"
          style={{ bottom: '10%', left: '30%' }}
          duration={8}
          delay={4}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div style={{
          textAlign: 'center',
          maxWidth: 900,
          position: 'relative',
          zIndex: 10,
        }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: colors.glass,
              borderRadius: 100,
              marginBottom: 32,
              border: `1px solid rgba(255,255,255,0.1)`,
            }}
          >
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: colors.accent,
              animation: 'pulse 2s infinite',
            }} />
            <span style={{ color: colors.textMuted, fontSize: '0.875rem' }}>
              Design that flows naturally
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 24,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span style={{ color: colors.text }}>Where Design</span>
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent}, ${colors.accent2})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 5s ease infinite',
            }}>
              Becomes Fluid
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              color: colors.textMuted,
              lineHeight: 1.7,
              maxWidth: 600,
              margin: '0 auto 40px',
            }}
          >
            We craft digital experiences that feel alive. Organic motion, 
            liquid interfaces, and designs that adapt and flow with your users.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center' }}
          >
            <LiquidButton primary>View Our Work</LiquidButton>
            <LiquidButton>Book a Call</LiquidButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ color: colors.textMuted, fontSize: '0.75rem' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: 24,
            height: 40,
            border: `2px solid ${colors.textMuted}`,
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 8,
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 4,
              height: 8,
              background: colors.accent,
              borderRadius: 2,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

// ============================================
// SERVICES SECTION
// ============================================
const Services = () => {
  const services = [
    {
      icon: '🌊',
      title: 'Liquid UI Design',
      description: 'Interfaces that flow and adapt. Organic shapes, smooth transitions, and motion that feels natural.',
      color: colors.primary,
    },
    {
      icon: '✨',
      title: 'Motion Design',
      description: 'Animation that tells a story. We bring static designs to life with purposeful, delightful movement.',
      color: colors.accent,
    },
    {
      icon: '🔮',
      title: '3D Experiences',
      description: 'Immersive digital worlds. WebGL-powered environments that respond to every interaction.',
      color: colors.secondary,
    },
    {
      icon: '💎',
      title: 'Brand Identity',
      description: 'Visual systems that morph and evolve. Fluid logos and living brand elements.',
      color: colors.accent2,
    },
  ]

  return (
    <section id="services" style={{ padding: '120px 5%' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 60 }}
        >
          <span style={{
            fontSize: '0.875rem',
            color: colors.accent,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}>
            Services
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: colors.text,
            marginTop: 16,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            What We Create
          </h2>
        </motion.div>

        {/* Services grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {services.map((service, index) => (
            <LiquidCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// WORK SECTION
// ============================================
const Work = () => {
  const projects = [
    { src: 'https://picsum.photos/800/600?random=1', title: 'Aqua Finance', category: 'Brand + Web' },
    { src: 'https://picsum.photos/600/800?random=2', title: 'Nebula AI', category: 'Product Design' },
    { src: 'https://picsum.photos/600/800?random=3', title: 'Flux Studio', category: 'Motion Design' },
    { src: 'https://picsum.photos/800/600?random=4', title: 'Drift Commerce', category: 'E-commerce' },
    { src: 'https://picsum.photos/600/800?random=5', title: 'Ripple Health', category: 'App Design' },
  ]

  return (
    <section id="work" style={{ padding: '80px 5% 120px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            marginBottom: 60,
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <span style={{
              fontSize: '0.875rem',
              color: colors.accent,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}>
              Portfolio
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: colors.text,
              marginTop: 16,
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Selected Work
            </h2>
          </div>
          <LiquidButton>View All Projects</LiquidButton>
        </motion.div>

        {/* Masonry-style grid - responsive */}
        <div className="work-grid" style={{
          display: 'grid',
          gap: 24,
        }}>
          <div className="work-span-2">
            <LiquidImage {...projects[0]} index={0} />
          </div>
          <div>
            <LiquidImage {...projects[1]} index={1} />
          </div>
          <div>
            <LiquidImage {...projects[2]} index={2} />
          </div>
          <div className="work-span-2">
            <LiquidImage {...projects[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// STATS SECTION
// ============================================
const Stats = () => {
  const stats = [
    { value: '250+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '15+', label: 'Design Awards' },
    { value: '8', label: 'Years Experience' },
  ]

  return (
    <section style={{ 
      padding: '80px 5%', 
      background: colors.bgLight,
    }}>
      <div className="stats-grid" style={{ 
        maxWidth: 1200, 
        margin: '0 auto',
        display: 'grid',
        gap: 40,
      }}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '1rem',
              color: colors.textMuted,
              marginTop: 8,
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ============================================
// CTA SECTION
// ============================================
const CTA = () => {
  return (
    <section style={{ 
      position: 'relative',
      padding: '160px 5%',
      overflow: 'hidden',
    }}>
      {/* Animated blob background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        filter: 'blur(80px)',
        opacity: 0.4,
      }}>
        <MorphingBlob 
          size={700} 
          color="url(#blob-gradient-1)"
          style={{ top: '-20%', left: '20%' }}
        />
        <MorphingBlob 
          size={500} 
          color="url(#blob-gradient-2)"
          style={{ bottom: '-10%', right: '10%' }}
          delay={3}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          position: 'relative',
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 800,
          color: colors.text,
          marginBottom: 24,
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          Ready to make your <br />
          <span style={{
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent2})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            brand flow?
          </span>
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: colors.textMuted,
          marginBottom: 40,
          lineHeight: 1.7,
        }}>
          Let's create something fluid together. Book a discovery call 
          and let's explore the possibilities.
        </p>
        <LiquidButton primary>Start a Project</LiquidButton>
      </motion.div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  const links = {
    Company: ['About', 'Careers', 'Press', 'Contact'],
    Services: ['UI Design', 'Motion', '3D', 'Branding'],
    Resources: ['Blog', 'Case Studies', 'Newsletter', 'FAQ'],
    Social: ['Twitter', 'Dribbble', 'LinkedIn', 'Instagram'],
  }

  return (
    <footer style={{ 
      padding: '80px 5%',
      borderTop: `1px solid rgba(255,255,255,0.1)`,
    }}>
      <div className="footer-grid" style={{ 
        maxWidth: 1400, 
        margin: '0 auto',
        display: 'grid',
        gap: 40,
      }}>
        {/* Brand */}
        <div className="footer-brand">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span>💧</span>
            </div>
            <span style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: colors.text,
            }}>
              Liquidflow
            </span>
          </div>
          <p style={{
            fontSize: '0.875rem',
            color: colors.textMuted,
            lineHeight: 1.6,
          }}>
            Crafting fluid digital experiences since 2018.
          </p>
        </div>

        {/* Links */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: colors.text,
              marginBottom: 20,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              {title}
            </h4>
            {items.map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ color: colors.accent, x: 4 }}
                style={{
                  display: 'block',
                  color: colors.textMuted,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  marginBottom: 12,
                  transition: 'color 0.2s',
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1400,
        margin: '60px auto 0',
        paddingTop: 24,
        borderTop: `1px solid rgba(255,255,255,0.1)`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ color: colors.textMuted, fontSize: '0.875rem' }}>
          © 2026 Liquidflow. All rights reserved.
        </span>
        <span style={{ color: colors.textMuted, fontSize: '0.875rem' }}>
          Made with 💧 in Denver
        </span>
      </div>
    </footer>
  )
}

// ============================================
// GLOBAL STYLES
// ============================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: ${colors.bg};
      color: ${colors.text};
      overflow-x: hidden;
      cursor: none;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: ${colors.bg};
    }
    ::-webkit-scrollbar-thumb {
      background: ${colors.primary};
      border-radius: 4px;
    }

    /* Hide default cursor on desktop */
    @media (hover: hover) {
      body { cursor: none; }
      a, button { cursor: none; }
    }

    /* Work grid - responsive */
    .work-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .work-span-2 {
      grid-column: span 2;
    }

    /* Stats grid - responsive */
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
    }

    /* Footer grid - responsive */
    .footer-grid {
      grid-template-columns: repeat(5, 1fr);
    }

    /* Tablet adjustments */
    @media (max-width: 1024px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .footer-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      .footer-brand {
        grid-column: span 3;
        margin-bottom: 20px;
      }
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
      body { cursor: auto; }
      
      .work-grid {
        grid-template-columns: 1fr;
      }
      .work-span-2 {
        grid-column: span 1;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }
      
      .footer-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .footer-brand {
        grid-column: span 2;
      }
    }

    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      .footer-grid {
        grid-template-columns: 1fr;
      }
      .footer-brand {
        grid-column: span 1;
      }
    }
  `}</style>
)

// ============================================
// MAIN COMPONENT
// ============================================
export default function LiquidMotion() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <GlobalStyles />
      <LiquidFilters />
      {!isMobile && <MetaballCursor />}
      <Nav />
      <main>
        <Hero />
        <LiquidMarquee />
        <Services />
        <Work />
        <Stats />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
