import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, PartyPopper, Target, Users, BarChart3, Bell, Palette, Lock,
  Smile, CheckCircle, Rocket, Star, ClipboardList, Calendar, MessageCircle,
  PieChart, Check, Mail, Paintbrush, Sun, Moon, Twitter, Instagram, 
  Briefcase, Gamepad2
} from 'lucide-react'

// ============================================
// CLAYMORPHISM LANDING PAGE - DUAL THEME
// ============================================
// Light & Dark mode toggle with localStorage persistence
// - Soft, 3D clay-like UI aesthetic
// - Inner + outer shadows for depth
// - Rounded corners (squircle shapes)
// - Playful, friendly, tactile feel
// ============================================

// Light Theme Colors
const lightColors = {
  bg: '#F7F5F0',
  surface: '#FFFEF9',
  card: '#FFFFFF',
  cardHover: '#FAFAF5',
  border: 'rgba(0,0,0,0.06)',
  borderHover: 'rgba(147,112,219,0.4)',
  accentBlue: '#7C9FF5',
  accentPink: '#F5A0C4',
  accentPurple: '#B88BF5',
  text: '#2D2A33',
  textSecondary: '#5C5867',
  textMuted: '#8A8693',
  white: '#FFFFFF',
}

// Dark Theme Colors
const darkColors = {
  bg: '#000000',
  surface: '#0a0a0a',
  card: '#1a1a1a',
  cardHover: '#222222',
  border: 'rgba(255,255,255,0.1)',
  borderHover: 'rgba(96,165,250,0.5)',
  accentBlue: '#60A5FA',
  accentPink: '#F472B6',
  accentPurple: '#A78BFA',
  text: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.7)',
  textMuted: 'rgba(255,255,255,0.5)',
  white: '#FFFFFF',
}

// Light Theme Shadows
const lightClayShadow = {
  card: `
    0 10px 30px -10px rgba(0, 0, 0, 0.08),
    0 4px 10px -4px rgba(0, 0, 0, 0.04),
    inset 0 -2px 4px rgba(0, 0, 0, 0.02),
    inset 0 2px 4px rgba(255, 255, 255, 0.8)
  `,
  elevated: `
    0 20px 40px -10px rgba(0, 0, 0, 0.12),
    0 8px 16px -8px rgba(0, 0, 0, 0.06),
    0 0 40px -10px rgba(147, 112, 219, 0.15),
    inset 0 -2px 4px rgba(0, 0, 0, 0.02),
    inset 0 2px 4px rgba(255, 255, 255, 0.9)
  `,
  button: `
    0 6px 16px -4px rgba(0, 0, 0, 0.1),
    0 3px 6px -3px rgba(0, 0, 0, 0.05),
    inset 0 -2px 4px rgba(0, 0, 0, 0.03),
    inset 0 2px 4px rgba(255, 255, 255, 0.8)
  `,
  pressed: `
    0 2px 6px -1px rgba(0, 0, 0, 0.06),
    0 1px 3px -1px rgba(0, 0, 0, 0.04),
    inset 0 2px 4px rgba(0, 0, 0, 0.04),
    inset 0 -1px 2px rgba(255, 255, 255, 0.5)
  `,
  soft: `
    0 4px 12px -2px rgba(0, 0, 0, 0.05),
    0 2px 6px -2px rgba(0, 0, 0, 0.03),
    inset 0 -1px 2px rgba(0, 0, 0, 0.02),
    inset 0 1px 2px rgba(255, 255, 255, 0.7)
  `,
  glow: `
    0 0 30px rgba(147, 112, 219, 0.25),
    0 0 60px rgba(147, 112, 219, 0.1)
  `,
}

// Dark Theme Shadows
const darkClayShadow = {
  card: `
    0 20px 40px -10px rgba(0, 0, 0, 0.6),
    0 8px 16px -8px rgba(0, 0, 0, 0.4),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.05)
  `,
  elevated: `
    0 30px 60px -15px rgba(0, 0, 0, 0.7),
    0 12px 24px -12px rgba(0, 0, 0, 0.5),
    0 0 40px -10px rgba(96, 165, 250, 0.15),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.08)
  `,
  button: `
    0 10px 20px -5px rgba(0, 0, 0, 0.5),
    0 4px 8px -4px rgba(0, 0, 0, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.1)
  `,
  pressed: `
    0 4px 8px -2px rgba(0, 0, 0, 0.4),
    0 2px 4px -2px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 -1px 2px rgba(255, 255, 255, 0.05)
  `,
  soft: `
    0 8px 16px -4px rgba(0, 0, 0, 0.4),
    0 4px 8px -4px rgba(0, 0, 0, 0.2),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.03)
  `,
  glow: `
    0 0 30px rgba(96, 165, 250, 0.3),
    0 0 60px rgba(96, 165, 250, 0.15)
  `,
}

// Theme context type
type Theme = 'light' | 'dark'

// Floating 3D shape component
const FloatingShape = ({ 
  color, 
  size, 
  top, 
  left, 
  delay = 0,
  shape = 'circle',
  theme
}: { 
  color: string
  size: number
  top: string
  left: string
  delay?: number
  shape?: 'circle' | 'square' | 'pill'
  theme: Theme
}) => {
  const borderRadius = shape === 'circle' ? '50%' : shape === 'pill' ? size / 2 : size / 4
  const opacity = theme === 'light' ? 0.5 : 0.6
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: shape === 'pill' ? size / 2 : size,
        borderRadius,
        background: theme === 'light' 
          ? `linear-gradient(145deg, ${color}40, ${color}20)`
          : `linear-gradient(145deg, ${color}20, ${color}10)`,
        boxShadow: theme === 'light'
          ? `
              0 ${size / 4}px ${size / 2}px -${size / 8}px ${color}40,
              0 ${size / 8}px ${size / 4}px -${size / 8}px rgba(0,0,0,0.1),
              inset 0 -${size / 16}px ${size / 8}px ${color}20,
              inset 0 ${size / 16}px ${size / 8}px rgba(255,255,255,0.4)
            `
          : `
              0 ${size / 4}px ${size / 2}px -${size / 8}px ${color}30,
              0 ${size / 8}px ${size / 4}px -${size / 8}px rgba(0,0,0,0.3),
              inset 0 -${size / 16}px ${size / 8}px ${color}10,
              inset 0 ${size / 16}px ${size / 8}px rgba(255,255,255,0.05)
            `,
        border: `1px solid ${color}15`,
        zIndex: 0,
        opacity,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Clay Button component
const ClayButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  onClick,
  style: customStyle,
  colors,
  clayShadow,
}: { 
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  style?: React.CSSProperties
  colors: typeof lightColors
  clayShadow: typeof lightClayShadow
}) => {
  const sizes = {
    sm: { padding: '10px 20px', fontSize: '0.875rem' },
    md: { padding: '14px 28px', fontSize: '1rem' },
    lg: { padding: '18px 36px', fontSize: '1.125rem' },
  }
  
  const variants = {
    primary: {
      bg: `linear-gradient(145deg, ${colors.accentBlue}, ${colors.accentBlue}dd)`,
      color: colors.white,
      shadow: clayShadow.button,
      hoverShadow: clayShadow.glow,
    },
    secondary: {
      bg: `linear-gradient(145deg, ${colors.card}, ${colors.cardHover})`,
      color: colors.text,
      shadow: clayShadow.button,
      hoverShadow: clayShadow.elevated,
    },
    ghost: {
      bg: 'transparent',
      color: colors.accentBlue,
      shadow: 'none',
      hoverShadow: clayShadow.soft,
    },
  }
  
  const v = variants[variant]
  
  return (
    <motion.button
      onClick={onClick}
      style={{
        ...sizes[size],
        background: v.bg,
        color: v.color,
        border: variant === 'ghost' ? `1px solid ${colors.border}` : 'none',
        borderRadius: 16,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: v.shadow,
        fontFamily: 'inherit',
        ...customStyle,
      }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: v.hoverShadow,
        y: -2,
        borderColor: variant === 'ghost' ? colors.accentBlue : undefined,
      }}
      whileTap={{ 
        scale: 0.98,
        boxShadow: clayShadow.pressed,
        y: 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  )
}

// Clay Card component
const ClayCard = ({ 
  children, 
  delay = 0,
  className,
  style,
  colors,
  clayShadow,
}: { 
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
  colors: typeof lightColors
  clayShadow: typeof lightClayShadow
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        background: colors.card,
        borderRadius: 24,
        boxShadow: clayShadow.card,
        border: `1px solid ${colors.border}`,
        overflow: 'hidden',
        ...style,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: clayShadow.elevated,
        borderColor: colors.accentBlue,
        y: -4,
      }}
    >
      {children}
    </motion.div>
  )
}

// Clay Icon component (for features)
const ClayIcon = ({ 
  icon: Icon, 
  bgColor,
  theme
}: { 
  icon: React.ComponentType<{ size?: number; className?: string }>
  bgColor: string
  theme: Theme
}) => (
  <div
    style={{
      width: 64,
      height: 64,
      borderRadius: 20,
      background: theme === 'light'
        ? `linear-gradient(145deg, ${bgColor}40, ${bgColor}20)`
        : `linear-gradient(145deg, ${bgColor}30, ${bgColor}15)`,
      boxShadow: theme === 'light'
        ? `
            0 8px 16px -4px rgba(0, 0, 0, 0.1),
            0 0 20px ${bgColor}30,
            inset 0 -2px 4px rgba(0, 0, 0, 0.04),
            inset 0 2px 4px rgba(255, 255, 255, 0.6)
          `
        : `
            0 8px 16px -4px rgba(0, 0, 0, 0.4),
            0 0 20px ${bgColor}20,
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            inset 0 2px 4px rgba(255, 255, 255, 0.05)
          `,
      border: `1px solid ${bgColor}30`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Icon size={28} />
  </div>
)

// Theme Toggle Button
const ThemeToggle = ({ 
  theme, 
  toggleTheme 
}: { 
  theme: Theme
  toggleTheme: () => void 
}) => {
  const colors = theme === 'light' ? lightColors : darkColors
  const clayShadow = theme === 'light' ? lightClayShadow : darkClayShadow
  
  return (
    <motion.button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1000,
        width: 48,
        height: 48,
        borderRadius: 14,
        border: `1px solid ${colors.border}`,
        background: colors.card,
        boxShadow: clayShadow.button,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.text,
      }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: clayShadow.elevated,
        borderColor: colors.accentBlue,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

// Navigation
const Nav = ({ colors, clayShadow }: { colors: typeof lightColors; clayShadow: typeof lightClayShadow }) => {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <motion.nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 24px',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          borderRadius: 20,
          background: scrolled ? `${colors.surface}f0` : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? clayShadow.soft : 'none',
          border: scrolled ? `1px solid ${colors.border}` : '1px solid transparent',
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontWeight: 700,
            fontSize: '1.25rem',
            color: colors.text,
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: `linear-gradient(145deg, ${colors.accentBlue}, ${colors.accentPink})`,
              boxShadow: `
                0 6px 12px -3px rgba(96, 165, 250, 0.4),
                inset 0 -2px 4px rgba(0, 0, 0, 0.2),
                inset 0 2px 4px rgba(255, 255, 255, 0.2)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
            }}
          >
            <Sparkles size={18} />
          </div>
          Claymoji
        </motion.div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {['Features', 'Pricing', 'About'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                padding: '8px 16px',
                color: colors.textMuted,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                borderRadius: 12,
                transition: 'all 0.2s ease-out',
              }}
              whileHover={{ 
                color: colors.accentBlue,
                background: `${colors.accentBlue}15`,
              }}
            >
              {item}
            </motion.a>
          ))}
          <ClayButton size="sm" colors={colors} clayShadow={clayShadow}>Get Started</ClayButton>
        </div>
      </motion.div>
    </motion.nav>
  )
}

// Hero Section
const Hero = ({ colors, clayShadow, theme }: { colors: typeof lightColors; clayShadow: typeof lightClayShadow; theme: Theme }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
        background: theme === 'light'
          ? `linear-gradient(180deg, ${colors.bg} 0%, ${colors.surface} 50%, ${colors.bg} 100%)`
          : `linear-gradient(180deg, ${colors.bg} 0%, ${colors.surface} 50%, ${colors.bg} 100%)`,
      }}
    >
      {/* Floating shapes */}
      <FloatingShape color={colors.accentBlue} size={120} top="15%" left="8%" delay={0} shape="circle" theme={theme} />
      <FloatingShape color={colors.accentPink} size={80} top="25%" left="85%" delay={0.5} shape="square" theme={theme} />
      <FloatingShape color={colors.accentPurple} size={100} top="60%" left="5%" delay={1} shape="pill" theme={theme} />
      <FloatingShape color={colors.accentBlue} size={60} top="70%" left="90%" delay={1.5} shape="circle" theme={theme} />
      <FloatingShape color={colors.accentPink} size={90} top="80%" left="15%" delay={2} shape="square" theme={theme} />
      <FloatingShape color={colors.accentPurple} size={70} top="10%" left="75%" delay={0.8} shape="pill" theme={theme} />
      
      <motion.div
        style={{ y, opacity, position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800 }}
      >
        {/* Badge */}
        <motion.div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 50,
            background: colors.card,
            boxShadow: clayShadow.soft,
            border: `1px solid ${colors.border}`,
            marginBottom: 24,
            fontSize: '0.875rem',
            color: colors.textSecondary,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PartyPopper size={16} />
          New: Team collaboration is here
        </motion.div>
        
        {/* Headline */}
        <motion.h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: colors.text,
            marginBottom: 24,
            textShadow: theme === 'dark' ? '0 4px 20px rgba(0,0,0,0.5)' : 'none',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Make your ideas{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPink})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            come alive
          </span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p
          style={{
            fontSize: '1.25rem',
            color: colors.textSecondary,
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.6,
            textShadow: theme === 'dark' ? '0 2px 10px rgba(0,0,0,0.3)' : 'none',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          The playful productivity app that makes work feel like play. 
          Organize, collaborate, and create with joy.
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <ClayButton size="lg" colors={colors} clayShadow={clayShadow}>Start Free Trial</ClayButton>
          <ClayButton size="lg" variant="secondary" colors={colors} clayShadow={clayShadow}>Watch Demo</ClayButton>
        </motion.div>
        
        {/* Hero Image/Preview */}
        <motion.div
          style={{
            marginTop: 60,
            borderRadius: 24,
            background: colors.card,
            boxShadow: clayShadow.elevated,
            border: `1px solid ${colors.border}`,
            padding: 16,
            maxWidth: 700,
            margin: '60px auto 0',
          }}
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div
            style={{
              background: colors.surface,
              borderRadius: 16,
              padding: 24,
              minHeight: 300,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {/* Fake UI elements */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: colors.accentPink }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, background: colors.accentBlue }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, background: colors.accentPurple }} />
            </div>
            <div style={{ display: 'flex', gap: 16, flex: 1 }}>
              {/* Sidebar */}
              <div
                style={{
                  width: 140,
                  borderRadius: 16,
                  background: colors.card,
                  boxShadow: clayShadow.soft,
                  border: `1px solid ${colors.border}`,
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {[
                  { icon: ClipboardList, text: 'Tasks' },
                  { icon: Calendar, text: 'Calendar' },
                  { icon: MessageCircle, text: 'Chat' },
                  { icon: PieChart, text: 'Stats' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 10,
                      background: i === 0 ? `${colors.accentBlue}20` : 'transparent',
                      fontSize: '0.75rem',
                      color: i === 0 ? colors.accentBlue : colors.textMuted,
                      transition: 'all 0.2s ease-out',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <item.icon size={14} />
                    {item.text}
                  </div>
                ))}
              </div>
              {/* Main content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: CheckCircle, text: 'Launch new feature', color: colors.accentBlue },
                  { icon: Paintbrush, text: 'Design review', color: colors.accentPink },
                  { icon: Mail, text: 'Send weekly update', color: colors.accentPurple },
                ].map((task, i) => (
                  <motion.div
                    key={i}
                    style={{
                      padding: 12,
                      borderRadius: 14,
                      background: colors.card,
                      boxShadow: clayShadow.soft,
                      border: `1px solid ${colors.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontSize: '0.85rem',
                      color: colors.textSecondary,
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.15 }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: `${task.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: task.color,
                      }}
                    >
                      <task.icon size={16} />
                    </span>
                    {task.text}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Features Section
const Features = ({ colors, clayShadow, theme }: { colors: typeof lightColors; clayShadow: typeof lightClayShadow; theme: Theme }) => {
  const features = [
    {
      icon: Target,
      title: 'Smart Focus',
      description: 'AI-powered task prioritization that knows what matters most.',
      color: colors.accentBlue,
    },
    {
      icon: Users,
      title: 'Team Sync',
      description: 'Real-time collaboration that feels like working side by side.',
      color: colors.accentPink,
    },
    {
      icon: BarChart3,
      title: 'Visual Progress',
      description: 'Beautiful charts and insights that celebrate your wins.',
      color: colors.accentPurple,
    },
    {
      icon: Bell,
      title: 'Gentle Reminders',
      description: 'Friendly nudges that help you stay on track without stress.',
      color: colors.accentBlue,
    },
    {
      icon: Palette,
      title: 'Custom Themes',
      description: 'Make it yours with playful colors and personalization.',
      color: colors.accentPink,
    },
    {
      icon: Lock,
      title: 'Private & Secure',
      description: 'Your data stays yours with end-to-end encryption.',
      color: colors.accentPurple,
    },
  ]
  
  return (
    <section
      id="features"
      style={{
        padding: '100px 24px',
        background: colors.surface,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 64 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Everything you need, nothing you don't
          </h2>
          <p style={{ fontSize: '1.125rem', color: colors.textSecondary, maxWidth: 500, margin: '0 auto' }}>
            Packed with features that feel simple and spark joy.
          </p>
        </motion.div>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {features.map((feature, i) => (
            <ClayCard key={i} delay={i * 0.1} style={{ padding: 32 }} colors={colors} clayShadow={clayShadow}>
              <ClayIcon icon={feature.icon} bgColor={feature.color} theme={theme} />
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: colors.text,
                  margin: '20px 0 12px',
                }}
              >
                {feature.title}
              </h3>
              <p style={{ color: colors.textSecondary, lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </ClayCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Section
const Stats = ({ colors, clayShadow }: { colors: typeof lightColors; clayShadow: typeof lightClayShadow }) => {
  const stats = [
    { number: '50K+', label: 'Happy users', icon: Smile },
    { number: '2M+', label: 'Tasks completed', icon: CheckCircle },
    { number: '99%', label: 'Uptime', icon: Rocket },
    { number: '4.9', label: 'App Store rating', icon: Star },
  ]
  
  return (
    <section
      style={{
        padding: '80px 24px',
        background: `linear-gradient(180deg, ${colors.surface} 0%, ${colors.bg} 100%)`,
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 24,
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              style={{
                textAlign: 'center',
                padding: 32,
                borderRadius: 24,
                background: colors.card,
                boxShadow: clayShadow.card,
                border: `1px solid ${colors.border}`,
                transition: 'all 0.2s ease-out',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: clayShadow.elevated,
                borderColor: colors.accentBlue,
              }}
            >
              <div style={{ 
                marginBottom: 8,
                display: 'flex',
                justifyContent: 'center',
                color: colors.accentBlue,
              }}>
                <stat.icon size={32} />
              </div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPink})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.number}
              </div>
              <div style={{ color: colors.textMuted, fontSize: '0.9rem', marginTop: 4 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
const Testimonials = ({ colors, clayShadow }: { colors: typeof lightColors; clayShadow: typeof lightClayShadow }) => {
  const [active, setActive] = useState(0)
  
  const testimonials = [
    {
      quote: "Claymoji made me actually enjoy my todo list. The little animations when I complete a task? *Chef's kiss*",
      author: 'Sarah Chen',
      role: 'Product Designer at Figma',
      icon: Paintbrush,
      color: colors.accentBlue,
    },
    {
      quote: "My team went from chaotic Slack threads to actually organized work. Game changer.",
      author: 'Marcus Johnson',
      role: 'Engineering Lead at Stripe',
      icon: Users,
      color: colors.accentPink,
    },
    {
      quote: "Finally, a productivity app that doesn't make me feel guilty. It's like a supportive friend.",
      author: 'Emma Rodriguez',
      role: 'Founder at Bloom',
      icon: Briefcase,
      color: colors.accentPurple,
    },
  ]
  
  return (
    <section
      style={{
        padding: '100px 24px',
        background: colors.bg,
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 48 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Loved by teams everywhere
          </h2>
        </motion.div>
        
        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              style={{
                padding: 40,
                borderRadius: 32,
                background: colors.card,
                boxShadow: clayShadow.elevated,
                border: `1px solid ${colors.border}`,
                textAlign: 'center',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 24,
                  background: `linear-gradient(145deg, ${testimonials[active].color}40, ${testimonials[active].color}20)`,
                  boxShadow: `
                    0 12px 24px -6px ${testimonials[active].color}40,
                    inset 0 -4px 8px rgba(0, 0, 0, 0.2),
                    inset 0 4px 8px rgba(255, 255, 255, 0.1)
                  `,
                  border: `1px solid ${testimonials[active].color}30`,
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: testimonials[active].color,
                }}
              >
                {(() => {
                  const IconComponent = testimonials[active].icon
                  return <IconComponent size={36} />
                })()}
              </div>
              <p
                style={{
                  fontSize: '1.25rem',
                  color: colors.textSecondary,
                  lineHeight: 1.6,
                  marginBottom: 24,
                  fontStyle: 'italic',
                }}
              >
                "{testimonials[active].quote}"
              </p>
              <div style={{ fontWeight: 700, color: colors.text }}>
                {testimonials[active].author}
              </div>
              <div style={{ color: colors.textMuted, fontSize: '0.9rem' }}>
                {testimonials[active].role}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 32 : 12,
                  height: 12,
                  borderRadius: 6,
                  border: 'none',
                  background: i === active ? colors.accentBlue : colors.card,
                  cursor: 'pointer',
                  boxShadow: i === active ? `0 4px 8px ${colors.accentBlue}40` : clayShadow.soft,
                }}
                whileHover={{ scale: 1.2 }}
                layout
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Pricing Section
const Pricing = ({ colors, clayShadow }: { colors: typeof lightColors; clayShadow: typeof lightClayShadow }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: ['Up to 3 projects', 'Basic analytics', 'Email support', '1 team member'],
      color: colors.accentBlue,
      popular: false,
    },
    {
      name: 'Pro',
      price: '$12',
      description: 'For serious productivity',
      features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Up to 10 team members', 'Custom themes', 'Integrations'],
      color: colors.accentPink,
      popular: true,
    },
    {
      name: 'Team',
      price: '$29',
      description: 'For growing teams',
      features: ['Everything in Pro', 'Unlimited members', 'Admin controls', 'SSO & SAML', 'Dedicated support', 'API access'],
      color: colors.accentPurple,
      popular: false,
    },
  ]
  
  return (
    <section
      id="pricing"
      style={{
        padding: '100px 24px',
        background: colors.surface,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 64 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Simple, joyful pricing
          </h2>
          <p style={{ fontSize: '1.125rem', color: colors.textSecondary }}>
            Start free, upgrade when you're ready
          </p>
        </motion.div>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              style={{
                padding: 32,
                borderRadius: 28,
                background: plan.popular 
                  ? `linear-gradient(145deg, ${plan.color}30, ${plan.color}15)` 
                  : colors.card,
                boxShadow: plan.popular ? clayShadow.elevated : clayShadow.card,
                border: `1px solid ${plan.popular ? plan.color : colors.border}`,
                position: 'relative',
                transform: plan.popular ? 'scale(1.05)' : 'none',
                transition: 'all 0.2s ease-out',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                y: -8, 
                boxShadow: clayShadow.elevated,
                borderColor: colors.accentBlue,
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '6px 16px',
                    borderRadius: 50,
                    background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPink})`,
                    boxShadow: clayShadow.soft,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  Most Popular <Sparkles size={12} />
                </div>
              )}
              
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: colors.text,
                  marginBottom: 8,
                }}
              >
                {plan.name}
              </h3>
              <div
                style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  color: colors.text,
                  marginBottom: 4,
                }}
              >
                {plan.price}
                <span style={{ fontSize: '1rem', fontWeight: 500, color: colors.textMuted }}>/mo</span>
              </div>
              <p
                style={{
                  color: colors.textSecondary,
                  marginBottom: 24,
                }}
              >
                {plan.description}
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                {plan.features.map((feature, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 0',
                      color: colors.textSecondary,
                      fontSize: '0.95rem',
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: `${plan.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: plan.color,
                      }}
                    >
                      <Check size={12} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <ClayButton 
                variant={plan.popular ? 'primary' : 'secondary'}
                style={{ width: '100%' }}
                colors={colors}
                clayShadow={clayShadow}
              >
                Get Started
              </ClayButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTA = ({ colors, theme }: { colors: typeof lightColors; theme: Theme }) => (
  <section
    style={{
      padding: '100px 24px',
      background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.surface} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Background shapes */}
    <FloatingShape color={colors.accentBlue} size={200} top="10%" left="-5%" delay={0} theme={theme} />
    <FloatingShape color={colors.accentPink} size={150} top="60%" left="90%" delay={0.5} theme={theme} />
    <FloatingShape color={colors.accentPurple} size={100} top="20%" left="80%" delay={1} shape="square" theme={theme} />
    
    <motion.div
      style={{
        maxWidth: 700,
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          color: colors.text,
          marginBottom: 24,
        }}
      >
        Ready to make work{' '}
        <span
          style={{
            background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPink})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          feel like play?
        </span>
      </h2>
      <p
        style={{
          fontSize: '1.25rem',
          color: colors.textSecondary,
          marginBottom: 40,
          maxWidth: 500,
          margin: '0 auto 40px',
        }}
      >
        Join 50,000+ happy users who've transformed their productivity.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <ClayButton size="lg" colors={colors} clayShadow={theme === 'light' ? lightClayShadow : darkClayShadow}>Start Free Trial</ClayButton>
        <ClayButton size="lg" variant="ghost" colors={colors} clayShadow={theme === 'light' ? lightClayShadow : darkClayShadow}>Talk to Sales</ClayButton>
      </div>
    </motion.div>
  </section>
)

// Footer
const Footer = ({ colors, clayShadow }: { colors: typeof lightColors; clayShadow: typeof lightClayShadow }) => (
  <footer
    id="about"
    style={{
      padding: '60px 24px 40px',
      background: colors.bg,
      borderTop: `1px solid ${colors.border}`,
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 40,
      }}
    >
      {/* Logo */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontWeight: 700,
            fontSize: '1.25rem',
            color: colors.text,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: `linear-gradient(145deg, ${colors.accentBlue}, ${colors.accentPink})`,
              boxShadow: `
                0 4px 8px -2px rgba(96, 165, 250, 0.4),
                inset 0 -2px 4px rgba(0, 0, 0, 0.2),
                inset 0 2px 4px rgba(255, 255, 255, 0.2)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
            }}
          >
            <Sparkles size={16} />
          </div>
          Claymoji
        </div>
        <p style={{ color: colors.textMuted, fontSize: '0.9rem', lineHeight: 1.6 }}>
          Making productivity playful since 2024.
        </p>
        <p style={{ color: colors.textMuted, fontSize: '0.8rem', lineHeight: 1.6, marginTop: 12 }}>
          Built with React, Framer Motion & TypeScript
        </p>
      </div>
      
      {/* Links */}
      {[
        { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
        { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
        { title: 'Resources', links: ['Help Center', 'Community', 'Templates', 'API'] },
        { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
      ].map((col, i) => (
        <div key={i}>
          <h4 style={{ fontWeight: 700, color: colors.text, marginBottom: 16 }}>{col.title}</h4>
          {col.links.map((link, j) => (
            <motion.a
              key={j}
              href="#"
              style={{
                display: 'block',
                color: colors.textMuted,
                textDecoration: 'none',
                fontSize: '0.9rem',
                padding: '6px 0',
                transition: 'all 0.2s ease-out',
              }}
              whileHover={{ color: colors.accentBlue, x: 4 }}
            >
              {link}
            </motion.a>
          ))}
        </div>
      ))}
    </div>
    
    {/* Bottom */}
    <div
      style={{
        maxWidth: 1200,
        margin: '40px auto 0',
        paddingTop: 24,
        borderTop: `1px solid ${colors.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <div style={{ color: colors.textMuted, fontSize: '0.85rem' }}>
        © 2026 Claymoji. Made with love and lots of soft shadows.
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {[Twitter, Instagram, Briefcase, Gamepad2].map((Icon, i) => (
          <motion.a
            key={i}
            href="#"
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: colors.card,
              border: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: colors.textMuted,
              boxShadow: clayShadow.soft,
              transition: 'all 0.2s ease-out',
            }}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: clayShadow.button,
              borderColor: colors.accentBlue,
              color: colors.accentBlue,
            }}
          >
            <Icon size={16} />
          </motion.a>
        ))}
      </div>
    </div>
  </footer>
)

// Main Component
export default function ClaymorphismLanding() {
  const [theme, setTheme] = useState<Theme>('light')
  
  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('claymorphism-theme') as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    }
  }, [])
  
  // Save theme to localStorage when changed
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('claymorphism-theme', newTheme)
  }
  
  const colors = theme === 'light' ? lightColors : darkColors
  const clayShadow = theme === 'light' ? lightClayShadow : darkClayShadow
  
  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: colors.bg,
        minHeight: '100vh',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: ${colors.bg} !important;
          transition: background 0.3s ease;
        }
        
        /* Scrollbar styles */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${colors.bg};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${colors.card};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${colors.accentBlue};
        }
        
        @media (max-width: 768px) {
          nav > div > div:last-child a:not(:last-child) {
            display: none;
          }
        }
      `}</style>
      
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Nav colors={colors} clayShadow={clayShadow} />
      <Hero colors={colors} clayShadow={clayShadow} theme={theme} />
      <Features colors={colors} clayShadow={clayShadow} theme={theme} />
      <Stats colors={colors} clayShadow={clayShadow} />
      <Testimonials colors={colors} clayShadow={clayShadow} />
      <Pricing colors={colors} clayShadow={clayShadow} />
      <CTA colors={colors} theme={theme} />
      <Footer colors={colors} clayShadow={clayShadow} />
    </div>
  )
}
