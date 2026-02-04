import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'

// ============================================================================
// CYBER BRUTALISM LANDING PAGE
// A fusion of cyberpunk aesthetics with brutalist structure
// Glitch effects, terminal UI, neon accents, digital noise
// ============================================================================

// Color Palette
const colors = {
  // Backgrounds
  void: '#050508',
  dark: '#0a0a0f',
  darker: '#08080c',
  surface: '#0d0d15',
  
  // Neons
  cyan: '#00ffff',
  magenta: '#ff00ff',
  pink: '#ff2d6a',
  green: '#00ff41',
  blue: '#0080ff',
  yellow: '#ffff00',
  
  // Text
  text: '#e0e0e0',
  textMuted: '#808090',
  textDim: '#505060',
  
  // Grid/Lines
  grid: '#1a1a2e',
  gridBright: '#2a2a4e',
  border: '#2a2a3e',
}

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

// Scanlines overlay - CRT effect
const ScanLines = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      background: `repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0) 0px,
        rgba(0, 0, 0, 0) 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
      )`,
    }}
  />
)

// Noise texture overlay
const NoiseOverlay = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 9998,
      opacity: 0.03,
      background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
)

// Cyber grid background with perspective
const CyberGrid = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    }}
  >
    {/* Horizontal grid */}
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '-50%',
        right: '-50%',
        height: '60vh',
        background: `
          linear-gradient(${colors.grid} 1px, transparent 1px)
        `,
        backgroundSize: '100% 40px',
        transform: 'perspective(500px) rotateX(60deg)',
        transformOrigin: 'bottom center',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
      }}
    />
    {/* Vertical grid lines */}
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '-50%',
        right: '-50%',
        height: '60vh',
        background: `
          linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)
        `,
        backgroundSize: '80px 100%',
        transform: 'perspective(500px) rotateX(60deg)',
        transformOrigin: 'bottom center',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
      }}
    />
    {/* Glow line at horizon */}
    <div
      style={{
        position: 'absolute',
        bottom: '30vh',
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${colors.cyan}40, ${colors.magenta}40, transparent)`,
        filter: 'blur(4px)',
      }}
    />
  </div>
)

// ============================================================================
// GLITCH TEXT COMPONENT
// ============================================================================

interface GlitchTextProps {
  children: string
  style?: React.CSSProperties
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
}

const GlitchText = ({ children, style, as = 'span' }: GlitchTextProps) => {
  const Tag = as
  const glitchId = useRef(Math.random().toString(36).substr(2, 9))
  
  return (
    <Tag
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style,
      }}
    >
      <style>{`
        @keyframes glitch-${glitchId.current} {
          0%, 90%, 100% {
            transform: translate(0);
            opacity: 1;
          }
          92% {
            transform: translate(-3px, 1px);
            opacity: 0.8;
          }
          94% {
            transform: translate(3px, -1px);
            opacity: 0.9;
          }
          96% {
            transform: translate(-2px, -1px);
            opacity: 0.7;
          }
          98% {
            transform: translate(2px, 1px);
            opacity: 0.9;
          }
        }
        @keyframes glitch-clip-${glitchId.current} {
          0%, 90%, 100% {
            clip-path: inset(0 0 0 0);
          }
          92% {
            clip-path: inset(20% 0 40% 0);
          }
          94% {
            clip-path: inset(60% 0 10% 0);
          }
          96% {
            clip-path: inset(40% 0 30% 0);
          }
          98% {
            clip-path: inset(10% 0 70% 0);
          }
        }
      `}</style>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      {/* Cyan offset layer */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: colors.cyan,
          zIndex: 0,
          animation: `glitch-${glitchId.current} 3s infinite`,
          opacity: 0.8,
          mixBlendMode: 'screen',
        }}
      >
        {children}
      </span>
      {/* Magenta offset layer */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: colors.magenta,
          zIndex: 0,
          animation: `glitch-${glitchId.current} 3s infinite reverse`,
          opacity: 0.8,
          mixBlendMode: 'screen',
          animationDelay: '-0.1s',
        }}
      >
        {children}
      </span>
    </Tag>
  )
}

// ============================================================================
// NEON GLOW TEXT
// ============================================================================

interface GlowTextProps {
  children: React.ReactNode
  color?: string
  intensity?: 'low' | 'medium' | 'high'
  style?: React.CSSProperties
}

const GlowText = ({ children, color = colors.cyan, intensity = 'medium', style }: GlowTextProps) => {
  const blurValues = { low: '10px', medium: '20px', high: '40px' }
  
  return (
    <span
      style={{
        color,
        textShadow: `
          0 0 5px ${color},
          0 0 ${blurValues[intensity]} ${color},
          0 0 ${parseInt(blurValues[intensity]) * 2}px ${color}40
        `,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

// ============================================================================
// TERMINAL CARD COMPONENT
// ============================================================================

interface TerminalCardProps {
  title: string
  children: React.ReactNode
  accentColor?: string
  delay?: number
}

const TerminalCard = ({ title, children, accentColor = colors.cyan, delay = 0 }: TerminalCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: colors.surface,
        border: `1px solid ${isHovered ? accentColor : colors.border}`,
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: isHovered ? `0 0 30px ${accentColor}20, inset 0 0 30px ${accentColor}05` : 'none',
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          background: colors.darker,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        {/* Title */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: colors.textMuted,
            flex: 1,
            textAlign: 'center',
          }}
        >
          {title}
        </span>
        {/* Status indicator */}
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: accentColor,
            boxShadow: `0 0 10px ${accentColor}`,
          }}
        />
      </div>
      {/* Content */}
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </motion.div>
  )
}

// ============================================================================
// CYBER BUTTON COMPONENT
// ============================================================================

interface CyberButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  color?: string
  onClick?: () => void
  style?: React.CSSProperties
}

const CyberButton = ({ 
  children, 
  variant = 'primary', 
  color = colors.cyan,
  onClick,
  style 
}: CyberButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    padding: '14px 28px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'all 0.3s',
    ...style,
  }
  
  const variants = {
    primary: {
      background: isHovered ? color : 'transparent',
      color: isHovered ? colors.void : color,
      border: `2px solid ${color}`,
      boxShadow: isHovered 
        ? `0 0 30px ${color}60, inset 0 0 30px ${color}20` 
        : `0 0 10px ${color}30`,
    },
    secondary: {
      background: `${color}15`,
      color: color,
      border: `1px solid ${color}40`,
      boxShadow: isHovered ? `0 0 20px ${color}30` : 'none',
    },
    ghost: {
      background: 'transparent',
      color: colors.text,
      border: `1px solid ${colors.border}`,
      boxShadow: 'none',
    },
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ ...baseStyles, ...variants[variant] }}
    >
      {/* Glitch line effect on hover */}
      <AnimatePresence>
        {isHovered && variant === 'primary' && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            exit={{ x: '200%' }}
            transition={{ duration: 0.5, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: `linear-gradient(90deg, transparent, ${colors.text}30, transparent)`,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.button>
  )
}

// ============================================================================
// ASCII BORDER DECORATION
// ============================================================================

const ASCIIBorder = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: 'relative',
      padding: '24px',
    }}
  >
    {/* Corners */}
    <span
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '14px',
        color: colors.cyan,
        opacity: 0.6,
      }}
    >
      ╔═══
    </span>
    <span
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '14px',
        color: colors.cyan,
        opacity: 0.6,
      }}
    >
      ═══╗
    </span>
    <span
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '14px',
        color: colors.magenta,
        opacity: 0.6,
      }}
    >
      ╚═══
    </span>
    <span
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '14px',
        color: colors.magenta,
        opacity: 0.6,
      }}
    >
      ═══╝
    </span>
    {children}
  </div>
)

// ============================================================================
// STATUS BADGE
// ============================================================================

interface StatusBadgeProps {
  status: 'online' | 'processing' | 'error'
  label: string
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const statusColors = {
    online: colors.green,
    processing: colors.yellow,
    error: colors.pink,
  }
  
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        background: `${statusColors[status]}15`,
        border: `1px solid ${statusColors[status]}40`,
        borderRadius: '2px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        color: statusColors[status],
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      <motion.div
        animate={{ opacity: status === 'processing' ? [1, 0.3, 1] : 1 }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: statusColors[status],
          boxShadow: `0 0 8px ${statusColors[status]}`,
        }}
      />
      {label}
    </div>
  )
}

// ============================================================================
// TYPING TEXT COMPONENT
// ============================================================================

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
        }
      }, 50)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])
  
  useEffect(() => {
    const cursor = setInterval(() => setShowCursor(v => !v), 500)
    return () => clearInterval(cursor)
  }, [])
  
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {displayText}
      <span style={{ opacity: showCursor ? 1 : 0, color: colors.cyan }}>▋</span>
    </span>
  )
}

// ============================================================================
// NAVIGATION
// ============================================================================

const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = ['// PROTOCOL', '// SYSTEMS', '// NETWORK', '// ARCHIVE']
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? `${colors.void}ee` : 'transparent',
        borderBottom: scrolled ? `1px solid ${colors.border}` : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: `2px solid ${colors.cyan}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            color: colors.cyan,
            boxShadow: `0 0 15px ${colors.cyan}40`,
          }}
        >
          CB
        </div>
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: colors.text,
          }}
        >
          CYBR.BRUTL
        </span>
      </div>
      
      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '32px' }}>
        {navLinks.map((link, i) => (
          <motion.a
            key={i}
            href="#"
            whileHover={{ color: colors.cyan }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: colors.textMuted,
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'color 0.2s',
            }}
          >
            {link}
          </motion.a>
        ))}
      </div>
      
      {/* CTA */}
      <CyberButton variant="secondary" color={colors.cyan} style={{ padding: '10px 20px', fontSize: '12px' }}>
        JACK IN →
      </CyberButton>
    </motion.nav>
  )
}

// ============================================================================
// HERO SECTION
// ============================================================================

const Hero = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '120px 40px 80px',
        overflow: 'hidden',
      }}
    >
      <motion.div style={{ y, opacity }}>
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}
        >
          <StatusBadge status="online" label="SYSTEM ACTIVE" />
        </motion.div>
        
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '24px' }}
        >
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(48px, 10vw, 100px)',
              fontWeight: 900,
              lineHeight: 1,
              margin: 0,
              color: colors.text,
            }}
          >
            <GlitchText>BREAK THE</GlitchText>
            <br />
            <GlowText color={colors.cyan} intensity="high">
              <GlitchText>MACHINE</GlitchText>
            </GlowText>
          </h1>
        </motion.div>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: colors.textMuted,
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: 1.8,
          }}
        >
          <TypingText 
            text="// Digital rebellion meets raw interface design. We build systems that refuse to conform." 
            delay={800}
          />
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <CyberButton variant="primary" color={colors.cyan}>
            INITIALIZE PROTOCOL
          </CyberButton>
          <CyberButton variant="ghost">
            VIEW DOCUMENTATION
          </CyberButton>
        </motion.div>
        
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            marginTop: '80px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'UPTIME', value: '99.99%', color: colors.green },
            { label: 'LATENCY', value: '<10ms', color: colors.cyan },
            { label: 'NODES', value: '2,847', color: colors.magenta },
            { label: 'ACTIVE', value: '12.4K', color: colors.yellow },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '28px',
                  fontWeight: 700,
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.color}60`,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: colors.textDim,
                  letterSpacing: '0.1em',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: colors.textDim,
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '8px' }}>SCROLL</div>
          <div style={{ color: colors.cyan }}>↓</div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// FEATURES SECTION
// ============================================================================

const Features = () => {
  const features = [
    {
      title: 'NEURAL_PROCESS',
      command: '$ run neural_sync --mode=active',
      description: 'Autonomous processing systems that adapt in real-time. Zero intervention required.',
      icon: '◈',
      color: colors.cyan,
    },
    {
      title: 'GRID_COMPUTE',
      command: '$ deploy cluster --nodes=unlimited',
      description: 'Distributed infrastructure that scales infinitely. No single point of failure.',
      icon: '◇',
      color: colors.magenta,
    },
    {
      title: 'CRYPTO_LAYER',
      command: '$ encrypt --protocol=quantum',
      description: 'Military-grade encryption by default. Every packet, every transaction, every time.',
      icon: '◆',
      color: colors.green,
    },
    {
      title: 'DATA_STREAM',
      command: '$ stream --latency=realtime',
      description: 'Sub-millisecond data pipelines. When speed is the only metric that matters.',
      icon: '○',
      color: colors.pink,
    },
  ]
  
  return (
    <section style={{ padding: '120px 40px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <ASCIIBorder>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: colors.textDim,
                letterSpacing: '0.2em',
                marginBottom: '16px',
              }}
            >
              {'// CAPABILITIES'}
            </div>
            <h2
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: colors.text,
                margin: 0,
              }}
            >
              SYSTEM <GlowText color={colors.cyan}>MODULES</GlowText>
            </h2>
          </motion.div>
        </ASCIIBorder>
        
        {/* Feature grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '60px',
          }}
        >
          {features.map((feature, i) => (
            <TerminalCard 
              key={i} 
              title={`${feature.title}.sys`}
              accentColor={feature.color}
              delay={i * 0.1}
            >
              {/* Command line */}
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: feature.color,
                  marginBottom: '16px',
                  padding: '8px 12px',
                  background: colors.darker,
                  borderRadius: '2px',
                  overflowX: 'auto',
                }}
              >
                {feature.command}
              </div>
              
              {/* Icon */}
              <div
                style={{
                  fontSize: '32px',
                  color: feature.color,
                  marginBottom: '16px',
                  textShadow: `0 0 20px ${feature.color}`,
                }}
              >
                {feature.icon}
              </div>
              
              {/* Description */}
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '14px',
                  color: colors.textMuted,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </TerminalCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SHOWCASE/WORK SECTION
// ============================================================================

const Showcase = () => {
  const projects = [
    { 
      id: 'PRJ-001',
      name: 'NEON PROTOCOL', 
      type: 'INFRASTRUCTURE',
      status: 'DEPLOYED',
      color: colors.cyan 
    },
    { 
      id: 'PRJ-002',
      name: 'GHOST NETWORK', 
      type: 'SECURITY',
      status: 'ACTIVE',
      color: colors.magenta 
    },
    { 
      id: 'PRJ-003',
      name: 'VOID ENGINE', 
      type: 'COMPUTE',
      status: 'PROCESSING',
      color: colors.green 
    },
  ]
  
  return (
    <section style={{ padding: '120px 40px', background: colors.darker, position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px' }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: colors.textDim,
              letterSpacing: '0.2em',
              marginBottom: '16px',
            }}
          >
            {'// ACTIVE_DEPLOYMENTS'}
          </div>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: colors.text,
              margin: 0,
            }}
          >
            PROJECT <GlowText color={colors.magenta}>INDEX</GlowText>
          </h2>
        </motion.div>
        
        {/* Project list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                background: `${project.color}10`,
                borderLeft: `3px solid ${project.color}`,
              }}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto auto',
                alignItems: 'center',
                gap: '24px',
                padding: '24px',
                background: colors.surface,
                borderLeft: '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {/* ID */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: colors.textDim,
                }}
              >
                {project.id}
              </span>
              
              {/* Name */}
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '18px',
                  fontWeight: 600,
                  color: colors.text,
                }}
              >
                {project.name}
              </span>
              
              {/* Type */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: colors.textMuted,
                  padding: '6px 12px',
                  background: colors.darker,
                  borderRadius: '2px',
                }}
              >
                {project.type}
              </span>
              
              {/* Status */}
              <StatusBadge 
                status={project.status === 'DEPLOYED' ? 'online' : project.status === 'ACTIVE' ? 'online' : 'processing'} 
                label={project.status} 
              />
            </motion.div>
          ))}
        </div>
        
        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ 
            marginTop: '40px', 
            textAlign: 'center',
          }}
        >
          <CyberButton variant="secondary" color={colors.magenta}>
            VIEW ALL ARCHIVES →
          </CyberButton>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// CONSOLE/TERMINAL SECTION
// ============================================================================

const ConsoleBanner = () => {
  const lines = [
    '> INITIALIZING CYBER_BRUTALIST FRAMEWORK...',
    '> LOADING NEURAL INTERFACE MODULES...',
    '> ESTABLISHING SECURE CONNECTION...',
    '> GRID SYNCHRONIZATION COMPLETE.',
    '> ALL SYSTEMS OPERATIONAL.',
    '',
    '> READY FOR INPUT_',
  ]
  
  return (
    <section style={{ padding: '80px 40px', position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0. }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: colors.void,
          border: `1px solid ${colors.border}`,
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {/* Console header */}
        <div
          style={{
            padding: '12px 16px',
            background: colors.darker,
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: colors.textMuted,
              marginLeft: '16px',
            }}
          >
            terminal — bash — 80×24
          </span>
        </div>
        
        {/* Console content */}
        <div
          style={{
            padding: '24px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            lineHeight: 1.8,
          }}
        >
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{
                color: line.startsWith('>') && line.includes('COMPLETE') 
                  ? colors.green 
                  : line.includes('READY') 
                    ? colors.cyan 
                    : colors.textMuted,
              }}
            >
              {line || '\u00A0'}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// CTA SECTION
// ============================================================================

const CTA = () => (
  <section
    style={{
      padding: '160px 40px',
      position: 'relative',
      zIndex: 1,
      overflow: 'hidden',
    }}
  >
    {/* Background glow */}
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: `radial-gradient(circle, ${colors.cyan}15 0%, transparent 70%)`,
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }}
    />
    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: colors.textDim,
          letterSpacing: '0.3em',
          marginBottom: '24px',
        }}
      >
        {'// TRANSMISSION_INCOMING'}
      </div>
      
      <h2
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 900,
          color: colors.text,
          margin: '0 0 24px',
          lineHeight: 1.1,
        }}
      >
        READY TO
        <br />
        <GlowText color={colors.cyan} intensity="high">
          JACK IN?
        </GlowText>
      </h2>
      
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '16px',
          color: colors.textMuted,
          maxWidth: '500px',
          margin: '0 auto 40px',
          lineHeight: 1.8,
        }}
      >
        Enter the grid. Join thousands of operators building the future of decentralized systems.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <CyberButton variant="primary" color={colors.cyan}>
          CONNECT NOW
        </CyberButton>
        <CyberButton variant="secondary" color={colors.magenta}>
          REQUEST ACCESS
        </CyberButton>
      </div>
    </motion.div>
  </section>
)

// ============================================================================
// FOOTER
// ============================================================================

const Footer = () => (
  <footer
    style={{
      padding: '60px 40px 40px',
      background: colors.void,
      borderTop: `1px solid ${colors.border}`,
      position: 'relative',
      zIndex: 1,
    }}
  >
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
      }}
    >
      {/* Brand */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div
            style={{
              width: 28,
              height: 28,
              border: `2px solid ${colors.cyan}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: colors.cyan,
            }}
          >
            CB
          </div>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: colors.text,
            }}
          >
            CYBR.BRUTL
          </span>
        </div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: colors.textDim,
            lineHeight: 1.7,
          }}
        >
          Breaking the machine,
          <br />
          one interface at a time.
        </p>
      </div>
      
      {/* Links */}
      {[
        {
          title: '// PROTOCOL',
          links: ['Documentation', 'API Reference', 'Changelog', 'Status'],
        },
        {
          title: '// NETWORK',
          links: ['Github', 'Discord', 'Twitter', 'Matrix'],
        },
        {
          title: '// LEGAL',
          links: ['Privacy', 'Terms', 'Security', 'Compliance'],
        },
      ].map((group, i) => (
        <div key={i}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: colors.cyan,
              letterSpacing: '0.1em',
              marginBottom: '20px',
            }}
          >
            {group.title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {group.links.map((link, j) => (
              <a
                key={j}
                href="#"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  color: colors.textMuted,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = colors.text)}
                onMouseLeave={e => (e.currentTarget.style.color = colors.textMuted)}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
    
    {/* Bottom bar */}
    <div
      style={{
        maxWidth: '1200px',
        margin: '60px auto 0',
        paddingTop: '20px',
        borderTop: `1px solid ${colors.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: colors.textDim,
        }}
      >
        © 2026 CYBR.BRUTL // ALL SYSTEMS RESERVED
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: colors.textDim,
        }}
      >
        BUILD_v2.4.1 // NODE_ID: 0x7F3A
      </span>
    </div>
  </footer>
)

// ============================================================================
// MAIN APP
// ============================================================================

export default function CyberBrutalism() {
  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
      {/* Global styles */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          background: ${colors.dark};
          color: ${colors.text};
          font-family: 'JetBrains Mono', monospace;
          overflow-x: hidden;
        }
        ::selection {
          background: ${colors.cyan};
          color: ${colors.void};
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${colors.void};
        }
        ::-webkit-scrollbar-thumb {
          background: ${colors.border};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${colors.cyan};
        }
      `}</style>
      
      {/* Background layers */}
      <CyberGrid />
      <NoiseOverlay />
      <ScanLines />
      
      {/* Content */}
      <Nav />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Features />
        <Showcase />
        <ConsoleBanner />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
