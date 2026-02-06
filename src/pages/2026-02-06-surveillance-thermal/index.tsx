import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ============================================================================
// SURVEILLANCE THERMAL - Landing Page
// ============================================================================
// A landing page inspired by the 2026 Surveillance Design trend
// Combines thermal/infrared heatmap aesthetics with CCTV grid overlays,
// tracking lines, and metadata typography — a visual commentary on
// living inside the algorithm.
// ============================================================================

// Color Palette - Thermal Infrared Spectrum
const colors = {
  // Backgrounds
  void: '#050505',
  dark: '#0a0a0c',
  surface: '#101014',
  card: '#16161a',
  
  // Thermal spectrum (cold to hot)
  coldest: '#1a0a2e',     // Deep purple-black
  cold: '#2d1b69',        // Purple
  cool: '#6b21a8',        // Violet
  warm: '#c026d3',        // Magenta
  warmer: '#ef4444',      // Red
  hot: '#f97316',         // Orange
  hottest: '#fbbf24',     // Yellow
  white: '#fef3c7',       // Hot white
  
  // UI
  text: '#e8e8ec',
  textMuted: 'rgba(232, 232, 236, 0.55)',
  textDim: 'rgba(232, 232, 236, 0.35)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderHot: 'rgba(239, 68, 68, 0.4)',
  
  // Accents
  cyan: '#06b6d4',
  green: '#22c55e',
}

// ============================================================================
// SVG Overlays & Filters
// ============================================================================

function ScanlineOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.03) 2px,
          rgba(0, 0, 0, 0.03) 4px
        )`,
      }}
    />
  )
}

function GridOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  )
}

function ThermalGradient() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="thermalGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={colors.coldest} />
          <stop offset="20%" stopColor={colors.cold} />
          <stop offset="35%" stopColor={colors.cool} />
          <stop offset="50%" stopColor={colors.warm} />
          <stop offset="65%" stopColor={colors.warmer} />
          <stop offset="80%" stopColor={colors.hot} />
          <stop offset="95%" stopColor={colors.hottest} />
          <stop offset="100%" stopColor={colors.white} />
        </linearGradient>
        <linearGradient id="thermalHorizontal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.coldest} />
          <stop offset="25%" stopColor={colors.cool} />
          <stop offset="50%" stopColor={colors.warm} />
          <stop offset="75%" stopColor={colors.hot} />
          <stop offset="100%" stopColor={colors.hottest} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
    </svg>
  )
}

// ============================================================================
// Utility Components
// ============================================================================

function Timestamp() {
  const [time, setTime] = useState(new Date())
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: colors.textMuted }}>
      {time.toISOString().replace('T', ' ').slice(0, 19)}
    </span>
  )
}

function TrackingBadge({ id, status = 'active' }: { id: string; status?: 'active' | 'monitoring' | 'alert' }) {
  const statusColors = {
    active: colors.green,
    monitoring: colors.cyan,
    alert: colors.warmer,
  }
  
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.25rem 0.75rem',
      background: 'rgba(0, 0, 0, 0.6)',
      border: `1px solid ${colors.border}`,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.7rem',
      color: colors.textMuted,
      letterSpacing: '0.05em',
    }}>
      <motion.span
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: statusColors[status],
          boxShadow: `0 0 8px ${statusColors[status]}`,
        }}
      />
      {id}
    </div>
  )
}

function DetectionBox({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Corner brackets */}
      <div style={{
        position: 'absolute',
        top: -4,
        left: -4,
        width: 20,
        height: 20,
        borderTop: `2px solid ${colors.warmer}`,
        borderLeft: `2px solid ${colors.warmer}`,
      }} />
      <div style={{
        position: 'absolute',
        top: -4,
        right: -4,
        width: 20,
        height: 20,
        borderTop: `2px solid ${colors.warmer}`,
        borderRight: `2px solid ${colors.warmer}`,
      }} />
      <div style={{
        position: 'absolute',
        bottom: -4,
        left: -4,
        width: 20,
        height: 20,
        borderBottom: `2px solid ${colors.warmer}`,
        borderLeft: `2px solid ${colors.warmer}`,
      }} />
      <div style={{
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 20,
        height: 20,
        borderBottom: `2px solid ${colors.warmer}`,
        borderRight: `2px solid ${colors.warmer}`,
      }} />
      {label && (
        <div style={{
          position: 'absolute',
          top: -24,
          left: 0,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: colors.warmer,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

function ScanningLine() {
  return (
    <motion.div
      animate={{ y: ['0%', '100%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${colors.hot}, transparent)`,
        boxShadow: `0 0 20px ${colors.hot}, 0 0 40px ${colors.warmer}`,
        opacity: 0.6,
      }}
    />
  )
}

function ThermalBlob({ size = 300, top, left, right, bottom, delay = 0 }: {
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [0.8, 1, 0.9, 1.1, 0.8],
        opacity: [0.3, 0.5, 0.4, 0.5, 0.3],
      }}
      transition={{ duration: 8, repeat: Infinity, delay }}
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.hot} 0%, ${colors.warm} 30%, ${colors.cool} 60%, transparent 70%)`,
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }}
    />
  )
}

// ============================================================================
// Navigation
// ============================================================================

function Nav() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95])
  
  return (
    <motion.nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 2rem',
      }}
    >
      <motion.div
        style={{
          background: `rgba(10, 10, 12, ${bgOpacity.get()})`,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${colors.border}`,
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            {/* Thermal eye logo */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="url(#thermalHorizontal)" strokeWidth="2" />
              <circle cx="16" cy="16" r="8" fill="url(#thermalGradient)" />
              <circle cx="16" cy="16" r="3" fill={colors.white} />
            </svg>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: '1.1rem',
              color: colors.text,
              letterSpacing: '-0.02em',
            }}>
              VANTA
            </span>
          </div>
          <TrackingBadge id="SYS_ONLINE" status="active" />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {['Protocol', 'Analysis', 'Network', 'Archive'].map((item) => (
            <motion.a
              key={item}
              href="#"
              whileHover={{ color: colors.hot }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                color: colors.textMuted,
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {item}
            </motion.a>
          ))}
          <Timestamp />
        </div>
      </motion.div>
    </motion.nav>
  )
}

// ============================================================================
// Hero Section
// ============================================================================

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: colors.void,
      }}
    >
      {/* Thermal blobs */}
      <ThermalBlob size={500} top="10%" left="-10%" delay={0} />
      <ThermalBlob size={400} top="40%" right="-15%" delay={2} />
      <ThermalBlob size={300} bottom="10%" left="30%" delay={4} />
      
      {/* Scanning line */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <ScanningLine />
      </div>
      
      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div style={{
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 10,
        }}>
          {/* System status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <TrackingBadge id="NODE_7F3A" status="monitoring" />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: colors.textDim,
            }}>
              //
            </span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: colors.textDim,
              letterSpacing: '0.1em',
            }}>
              THERMAL_PROTOCOL v2.4.1
            </span>
          </motion.div>
          
          {/* Main headline with thermal gradient */}
          <DetectionBox label="SUBJECT_IDENTIFIED">
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 700,
              lineHeight: 1,
              margin: 0,
              padding: '1rem 2rem',
              background: `linear-gradient(135deg, ${colors.hottest} 0%, ${colors.hot} 25%, ${colors.warmer} 50%, ${colors.warm} 75%, ${colors.cool} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              See Beyond
              <br />
              The Visible
            </h1>
          </DetectionBox>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: colors.textMuted,
              maxWidth: '600px',
              margin: '2rem auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Advanced thermal analysis protocols for the surveillance age.
            <br />
            <span style={{ color: colors.textDim }}>
              Privacy-first. Transparency-focused. Human-centered.
            </span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '1rem 2rem',
                background: `linear-gradient(135deg, ${colors.hot} 0%, ${colors.warmer} 100%)`,
                border: 'none',
                color: colors.void,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              Initialize Protocol
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, borderColor: colors.hot }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '1rem 2rem',
                background: 'transparent',
                border: `1px solid ${colors.border}`,
                color: colors.text,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'border-color 0.3s',
              }}
            >
              View Docs
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: colors.textDim,
          letterSpacing: '0.2em',
        }}>
          SCROLL
        </span>
        <div style={{
          width: 1,
          height: 30,
          background: `linear-gradient(to bottom, ${colors.hot}, transparent)`,
        }} />
      </motion.div>
    </section>
  )
}

// ============================================================================
// Thermal Stats Bar
// ============================================================================

function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const stats = [
    { value: '2.4M', label: 'DATA POINTS', suffix: '/sec' },
    { value: '99.7', label: 'ACCURACY', suffix: '%' },
    { value: '0.03', label: 'LATENCY', suffix: 'ms' },
    { value: '847', label: 'ACTIVE NODES', suffix: '' },
  ]
  
  return (
    <section
      ref={ref}
      style={{
        background: colors.dark,
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`,
        padding: '3rem 2rem',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              background: `linear-gradient(135deg, ${colors.hottest} 0%, ${colors.hot} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {stat.value}
              <span style={{ fontSize: '1.25rem' }}>{stat.suffix}</span>
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: colors.textDim,
              letterSpacing: '0.15em',
              marginTop: '0.5rem',
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ============================================================================
// Features Section - CCTV Style Cards
// ============================================================================

function CCTVCard({ title, description, icon, index, feedId }: {
  title: string
  description: string
  icon: React.ReactNode
  index: number
  feedId: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: colors.card,
        border: `1px solid ${isHovered ? colors.borderHot : colors.border}`,
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
    >
      {/* CCTV header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        background: colors.surface,
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: colors.warmer,
              boxShadow: `0 0 8px ${colors.warmer}`,
            }}
          />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            color: colors.textMuted,
            letterSpacing: '0.1em',
          }}>
            {feedId}
          </span>
        </div>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          color: colors.textDim,
        }}>
          REC ●
        </span>
      </div>
      
      {/* Content */}
      <div style={{ padding: '2rem' }}>
        <div style={{
          width: 56,
          height: 56,
          background: `linear-gradient(135deg, ${colors.hot}20, ${colors.warm}20)`,
          border: `1px solid ${colors.borderHot}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}>
          {icon}
        </div>
        
        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: colors.text,
          margin: '0 0 0.75rem 0',
        }}>
          {title}
        </h3>
        
        <p style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '0.95rem',
          color: colors.textMuted,
          lineHeight: 1.6,
          margin: 0,
        }}>
          {description}
        </p>
      </div>
      
      {/* Hover scanning effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '100%',
                height: 3,
                background: `linear-gradient(90deg, transparent, ${colors.hot}, transparent)`,
                boxShadow: `0 0 15px ${colors.hot}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Features() {
  const features = [
    {
      title: 'Thermal Mapping',
      description: 'Real-time infrared visualization of data flows and network activity patterns.',
      feedId: 'CAM_01',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.hot} strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      ),
    },
    {
      title: 'Anomaly Detection',
      description: 'AI-powered pattern recognition identifies thermal signatures outside normal parameters.',
      feedId: 'CAM_02',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.hot} strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Privacy Shield',
      description: 'End-to-end encryption ensures thermal data remains secure and anonymized.',
      feedId: 'CAM_03',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.hot} strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: 'Network Mesh',
      description: 'Distributed sensor network with sub-millisecond synchronization protocols.',
      feedId: 'CAM_04',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.hot} strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <circle cx="4" cy="4" r="2" />
          <circle cx="20" cy="4" r="2" />
          <circle cx="4" cy="20" r="2" />
          <circle cx="20" cy="20" r="2" />
          <path d="M5.5 5.5l4.5 4.5M14 10l4.5-4.5M10 14l-4.5 4.5M14 14l4.5 4.5" />
        </svg>
      ),
    },
  ]
  
  return (
    <section style={{
      background: colors.void,
      padding: '6rem 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: colors.hot,
            letterSpacing: '0.2em',
            marginBottom: '1rem',
          }}>
            // CAPABILITIES
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: colors.text,
            margin: 0,
          }}>
            System Protocols
          </h2>
        </div>
        
        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {features.map((feature, i) => (
            <CCTVCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Heatmap Visualization Section
// ============================================================================

function HeatmapVisualization() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  // Generate grid cells with random "heat" values
  const gridSize = 12
  const cells = Array.from({ length: gridSize * gridSize }, (_, i) => ({
    id: i,
    heat: Math.random(),
  }))
  
  const getHeatColor = (heat: number) => {
    if (heat > 0.8) return colors.hottest
    if (heat > 0.65) return colors.hot
    if (heat > 0.5) return colors.warmer
    if (heat > 0.35) return colors.warm
    if (heat > 0.2) return colors.cool
    return colors.cold
  }
  
  return (
    <section
      ref={ref}
      style={{
        background: colors.dark,
        padding: '6rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '4rem',
        alignItems: 'center',
      }}>
        {/* Text content */}
        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: colors.hot,
            letterSpacing: '0.2em',
            marginBottom: '1rem',
          }}>
            // THERMAL_ANALYSIS
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: colors.text,
            margin: '0 0 1.5rem 0',
          }}>
            Real-Time Heat Distribution
          </h2>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1.1rem',
            color: colors.textMuted,
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}>
            Our proprietary algorithm transforms raw sensor data into intuitive thermal
            visualizations. Identify hotspots, track patterns, and predict anomalies
            before they impact your operations.
          </p>
          
          {/* Legend */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
          }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: colors.textDim,
            }}>
              COLD
            </span>
            <div style={{
              flex: 1,
              height: 12,
              background: `linear-gradient(90deg, ${colors.cold}, ${colors.cool}, ${colors.warm}, ${colors.warmer}, ${colors.hot}, ${colors.hottest})`,
              maxWidth: 200,
            }} />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: colors.textDim,
            }}>
              HOT
            </span>
          </div>
        </div>
        
        {/* Heatmap grid */}
        <div style={{
          position: 'relative',
          padding: '1rem',
          background: colors.surface,
          border: `1px solid ${colors.border}`,
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <TrackingBadge id="GRID_SECTOR_A7" status="active" />
            <Timestamp />
          </div>
          
          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gap: 3,
          }}>
            {cells.map((cell, i) => (
              <motion.div
                key={cell.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? {
                  opacity: [0.5, 1, 0.7, 1],
                  scale: 1,
                } : {}}
                transition={{
                  delay: i * 0.005,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
                style={{
                  aspectRatio: '1',
                  background: getHeatColor(cell.heat),
                  opacity: 0.7 + cell.heat * 0.3,
                }}
              />
            ))}
          </div>
          
          {/* Detection overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              top: '30%',
              left: '40%',
              width: 80,
              height: 80,
              border: `2px solid ${colors.warmer}`,
              boxShadow: `0 0 20px ${colors.warmer}40`,
            }}
          >
            <div style={{
              position: 'absolute',
              top: -20,
              left: 0,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              color: colors.warmer,
            }}>
              ANOMALY_DETECTED
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Network Visualization Section
// ============================================================================

function NetworkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const nodes = [
    { id: 1, x: 50, y: 20, size: 12, heat: 0.9 },
    { id: 2, x: 20, y: 50, size: 10, heat: 0.7 },
    { id: 3, x: 80, y: 40, size: 14, heat: 0.95 },
    { id: 4, x: 35, y: 80, size: 8, heat: 0.5 },
    { id: 5, x: 65, y: 70, size: 11, heat: 0.8 },
    { id: 6, x: 90, y: 85, size: 9, heat: 0.6 },
  ]
  
  const connections = [
    [1, 2], [1, 3], [2, 4], [3, 5], [4, 5], [5, 6], [2, 5], [3, 6],
  ]
  
  const getNodeColor = (heat: number) => {
    if (heat > 0.8) return colors.hottest
    if (heat > 0.6) return colors.hot
    return colors.warm
  }
  
  return (
    <section
      ref={ref}
      style={{
        background: colors.void,
        padding: '6rem 2rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: colors.hot,
            letterSpacing: '0.2em',
            marginBottom: '1rem',
          }}>
            // NETWORK_TOPOLOGY
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: colors.text,
            margin: 0,
          }}>
            Distributed Sensor Network
          </h2>
        </div>
        
        {/* Network visualization */}
        <div style={{
          position: 'relative',
          height: 400,
          background: colors.dark,
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
        }}>
          {/* Grid background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />
          
          <svg
            viewBox="0 0 100 100"
            style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connections */}
            {connections.map(([from, to], i) => {
              const fromNode = nodes.find(n => n.id === from)!
              const toNode = nodes.find(n => n.id === to)!
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={colors.borderHot}
                  strokeWidth="0.3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                />
              )
            })}
            
            {/* Data pulse animation along connections */}
            {connections.map(([from, to], i) => {
              const fromNode = nodes.find(n => n.id === from)!
              const toNode = nodes.find(n => n.id === to)!
              return (
                <motion.circle
                  key={`pulse-${from}-${to}`}
                  r="0.8"
                  fill={colors.hot}
                  filter="url(#glow)"
                  initial={{ cx: fromNode.x, cy: fromNode.y }}
                  animate={isInView ? {
                    cx: [fromNode.x, toNode.x],
                    cy: [fromNode.y, toNode.y],
                  } : {}}
                  transition={{
                    delay: i * 0.3,
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              )
            })}
            
            {/* Nodes */}
            {nodes.map((node, i) => (
              <motion.g key={node.id}>
                {/* Glow */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size + 3}
                  fill={getNodeColor(node.heat)}
                  opacity={0.2}
                  initial={{ scale: 0 }}
                  animate={isInView ? {
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{
                    delay: i * 0.1,
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                {/* Core */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size / 2.5}
                  fill={getNodeColor(node.heat)}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                />
              </motion.g>
            ))}
          </svg>
          
          {/* Status indicators */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <TrackingBadge id="MESH_ACTIVE" status="active" />
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              color: colors.textDim,
            }}>
              6 NODES ONLINE
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
          }}>
            <Timestamp />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Data Feed Section
// ============================================================================

function DataFeed() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const feedItems = [
    { time: '02:47:31', type: 'THERMAL', value: '37.2°C', status: 'NORMAL' },
    { time: '02:47:28', type: 'MOTION', value: 'DETECTED', status: 'ALERT' },
    { time: '02:47:25', type: 'THERMAL', value: '38.1°C', status: 'ELEVATED' },
    { time: '02:47:22', type: 'SYNC', value: 'NODE_4', status: 'COMPLETE' },
    { time: '02:47:19', type: 'THERMAL', value: '36.8°C', status: 'NORMAL' },
    { time: '02:47:16', type: 'PING', value: '0.03ms', status: 'OK' },
  ]
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ALERT': return colors.warmer
      case 'ELEVATED': return colors.hot
      case 'COMPLETE':
      case 'OK':
      case 'NORMAL': return colors.green
      default: return colors.textMuted
    }
  }
  
  return (
    <section
      ref={ref}
      style={{
        background: colors.dark,
        padding: '6rem 2rem',
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: colors.hot,
            letterSpacing: '0.2em',
            marginBottom: '1rem',
          }}>
            // LIVE_FEED
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: colors.text,
            margin: 0,
          }}>
            System Activity Log
          </h2>
        </div>
        
        <div style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.8rem',
        }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '100px 100px 1fr 100px',
            gap: '1rem',
            padding: '0.75rem 1rem',
            background: colors.card,
            color: colors.textDim,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <span>TIME</span>
            <span>TYPE</span>
            <span>VALUE</span>
            <span>STATUS</span>
          </div>
          
          {/* Rows */}
          {feedItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 100px 1fr 100px',
                gap: '1rem',
                padding: '0.75rem 1rem',
                borderBottom: i < feedItems.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}
            >
              <span style={{ color: colors.textDim }}>{item.time}</span>
              <span style={{ color: colors.textMuted }}>{item.type}</span>
              <span style={{ color: colors.text }}>{item.value}</span>
              <span style={{ color: getStatusColor(item.status) }}>{item.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA Section
// ============================================================================

function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: colors.void,
        padding: '8rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Background thermal blobs */}
      <ThermalBlob size={600} top="-20%" left="-20%" delay={0} />
      <ThermalBlob size={500} bottom="-30%" right="-20%" delay={2} />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <TrackingBadge id="INITIALIZE_READY" status="monitoring" />
        
        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          color: colors.text,
          margin: '2rem 0',
          lineHeight: 1.1,
        }}>
          Ready to See
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${colors.hottest} 0%, ${colors.hot} 50%, ${colors.warmer} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            What's Hidden?
          </span>
        </h2>
        
        <p style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '1.1rem',
          color: colors.textMuted,
          maxWidth: '500px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
        }}>
          Join the network. Deploy thermal analysis across your infrastructure
          and gain insights invisible to the naked eye.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '1rem 2.5rem',
              background: `linear-gradient(135deg, ${colors.hot} 0%, ${colors.warmer} 100%)`,
              border: 'none',
              color: colors.void,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Request Access
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, borderColor: colors.hot }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '1rem 2.5rem',
              background: 'transparent',
              border: `1px solid ${colors.border}`,
              color: colors.text,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'border-color 0.3s',
            }}
          >
            Schedule Demo
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// Footer
// ============================================================================

function Footer() {
  return (
    <footer style={{
      background: colors.dark,
      borderTop: `1px solid ${colors.border}`,
      padding: '4rem 2rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#thermalHorizontal)" strokeWidth="2" />
                <circle cx="16" cy="16" r="8" fill="url(#thermalGradient)" />
                <circle cx="16" cy="16" r="3" fill={colors.white} />
              </svg>
              <span style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                color: colors.text,
              }}>
                VANTA
              </span>
            </div>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.9rem',
              color: colors.textDim,
              lineHeight: 1.6,
            }}>
              Advanced thermal analysis
              <br />for the surveillance age.
            </p>
          </div>
          
          {/* Links */}
          {[
            { title: 'PROTOCOL', links: ['Overview', 'Documentation', 'API Reference', 'Changelog'] },
            { title: 'NETWORK', links: ['Status', 'Nodes', 'Security', 'Compliance'] },
            { title: 'COMPANY', links: ['About', 'Careers', 'Press', 'Contact'] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                color: colors.hot,
                letterSpacing: '0.15em',
                marginBottom: '1rem',
              }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {col.links.map((link) => (
                  <motion.a
                    key={link}
                    href="#"
                    whileHover={{ color: colors.text }}
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '0.9rem',
                      color: colors.textMuted,
                      textDecoration: 'none',
                    }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '2rem',
          borderTop: `1px solid ${colors.border}`,
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: colors.textDim,
          }}>
            © 2026 VANTA SYSTEMS. ALL RIGHTS RESERVED.
          </div>
          <TrackingBadge id="BUILD_v2.4.1" status="active" />
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// Main Export
// ============================================================================

export default function SurveillanceThermal() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          background: ${colors.void};
          color: ${colors.text};
          font-family: 'Space Grotesk', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        
        ::selection {
          background: ${colors.hot};
          color: ${colors.void};
        }
      `}</style>
      
      <ThermalGradient />
      <ScanlineOverlay />
      <GridOverlay />
      
      <Nav />
      <Hero />
      <StatsBar />
      <Features />
      <HeatmapVisualization />
      <NetworkSection />
      <DataFeed />
      <CTA />
      <Footer />
    </>
  )
}
