import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, PartyPopper, Target, Users, BarChart3, Bell, Palette, Lock,
  Smile, CheckCircle, Rocket, Star, ClipboardList, Calendar, MessageCircle,
  PieChart, Check, Mail, Paintbrush, Sun, Moon, Twitter, Instagram, 
  Briefcase, Gamepad2, Menu, X, Heart, Globe, Zap, Shield, Cloud, TrendingUp, Award
} from 'lucide-react'
import { useClaymorphismContent, type Feature, type Statistic, type Testimonial, type PricingTier, type LogoGridItem } from './useClaymorphismContent'

// Icon mapping for CMS icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Target, Users, BarChart3, Bell, Palette, Lock, Smile, CheckCircle, Rocket, Star,
  Heart, Globe, Zap, Shield, Cloud, TrendingUp, Award, MessageCircle, Paintbrush,
}

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

// Clay Modal component for dialogs
const ClayModal = ({
  isOpen,
  onClose,
  title,
  children,
  colors,
  clayShadow,
  theme,
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  colors: typeof lightColors
  clayShadow: typeof lightClayShadow
  theme: Theme
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: colors.card,
              borderRadius: 28,
              boxShadow: clayShadow.elevated,
              border: `1px solid ${colors.border}`,
              padding: 32,
              maxWidth: 600,
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              zIndex: 1001,
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: colors.text, margin: 0 }}>
                {title}
              </h3>
              <motion.button
                onClick={onClose}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  background: colors.surface,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.textMuted,
                }}
                whileHover={{ scale: 1.1, borderColor: colors.accentBlue, color: colors.accentBlue }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </motion.button>
            </div>
            {/* Content */}
            <div style={{ color: colors.textSecondary, lineHeight: 1.7 }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Clay Icon component (for features) - Premium 3D clay-styled icons
const ClayIcon = ({ 
  icon: Icon, 
  bgColor,
  theme
}: { 
  icon: React.ComponentType<{ size?: number; className?: string }>
  bgColor: string
  theme: Theme
}) => (
  <motion.div
    style={{
      width: 72,
      height: 72,
      borderRadius: 22,
      background: theme === 'light'
        ? `linear-gradient(145deg, ${bgColor}50, ${bgColor}30)`
        : `linear-gradient(145deg, ${bgColor}40, ${bgColor}20)`,
      boxShadow: theme === 'light'
        ? `
            0 12px 24px -6px ${bgColor}50,
            0 6px 12px -3px rgba(0, 0, 0, 0.1),
            0 0 30px ${bgColor}25,
            inset 0 -4px 8px ${bgColor}20,
            inset 0 4px 8px rgba(255, 255, 255, 0.7),
            inset 0 0 0 1px rgba(255, 255, 255, 0.4)
          `
        : `
            0 12px 24px -6px ${bgColor}30,
            0 6px 12px -3px rgba(0, 0, 0, 0.4),
            0 0 30px ${bgColor}15,
            inset 0 -4px 8px rgba(0, 0, 0, 0.3),
            inset 0 4px 8px rgba(255, 255, 255, 0.08),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05)
          `,
      border: `2px solid ${bgColor}40`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
    whileHover={{ 
      scale: 1.1, 
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.4 }
    }}
  >
    {/* Inner highlight blob for extra 3D effect */}
    <div
      style={{
        position: 'absolute',
        top: 4,
        left: 4,
        right: 4,
        height: '50%',
        borderRadius: '16px 16px 50% 50%',
        background: theme === 'light'
          ? 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}
    />
    <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={32} />
    </span>
  </motion.div>
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
const Nav = ({ 
  colors, 
  clayShadow,
  brandName,
}: { 
  colors: typeof lightColors; 
  clayShadow: typeof lightClayShadow
  brandName?: string
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
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
          background: scrolled || mobileMenuOpen ? `${colors.surface}f0` : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(20px)' : 'none',
          boxShadow: scrolled || mobileMenuOpen ? clayShadow.soft : 'none',
          border: scrolled || mobileMenuOpen ? `1px solid ${colors.border}` : '1px solid transparent',
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
          {brandName || 'Claymoji'}
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {['Features', 'Pricing', 'About'].map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              style={{
                padding: '8px 16px',
                color: colors.textMuted,
                background: 'transparent',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                borderRadius: 12,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease-out',
              }}
              whileHover={{ 
                color: colors.accentBlue,
                background: `${colors.accentBlue}15`,
              }}
            >
              {item}
            </motion.button>
          ))}
          <ClayButton size="sm" colors={colors} clayShadow={clayShadow}>Get Started</ClayButton>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            width: 44,
            height: 44,
            borderRadius: 12,
            border: `1px solid ${colors.border}`,
            background: colors.card,
            boxShadow: clayShadow.soft,
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.text,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            style={{
              maxWidth: 1200,
              margin: '8px auto 0',
              padding: '16px 24px',
              borderRadius: 20,
              background: `${colors.surface}f0`,
              backdropFilter: 'blur(20px)',
              boxShadow: clayShadow.card,
              border: `1px solid ${colors.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {['Features', 'Pricing', 'About'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                style={{
                  padding: '12px 16px',
                  color: colors.textSecondary,
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: 12,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  width: '100%',
                  transition: 'all 0.2s ease-out',
                }}
                whileHover={{ 
                  color: colors.accentBlue,
                  background: `${colors.accentBlue}15`,
                }}
              >
                {item}
              </motion.button>
            ))}
            <div style={{ paddingTop: 8 }}>
              <ClayButton 
                size="md" 
                colors={colors} 
                clayShadow={clayShadow}
                style={{ width: '100%' }}
              >
                Get Started
              </ClayButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Hero Section
const Hero = ({ 
  colors, 
  clayShadow, 
  theme,
  content,
  onWatchDemo,
}: { 
  colors: typeof lightColors; 
  clayShadow: typeof lightClayShadow; 
  theme: Theme
  content?: {
    badge?: { text: string; enabled: boolean }
    headline: string
    headlineHighlight?: string
    subheadline?: string
    ctaPrimary?: { text: string; url?: string }
    ctaSecondary?: { text: string; url?: string }
  }
  onWatchDemo?: () => void
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  return (
    <section
      id="hero"
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px 40px',
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
        {(content?.badge?.enabled !== false) && (
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
            {content?.badge?.text || 'New: Team collaboration is here'}
          </motion.div>
        )}
        
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
          {content?.headline || 'Make your ideas'}{' '}
          {content?.headlineHighlight && (
            <span
              className="gradient-text"
              style={{
                background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPink})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              {content.headlineHighlight}
            </span>
          )}
          {!content?.headlineHighlight && (
            <span
              className="gradient-text"
              style={{
                background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPink})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              come alive
            </span>
          )}
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
          {content?.subheadline || 'The playful productivity app that makes work feel like play. Organize, collaborate, and create with joy.'}
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <ClayButton size="lg" colors={colors} clayShadow={clayShadow}>
            {content?.ctaPrimary?.text || 'Start Free Trial'}
          </ClayButton>
          <ClayButton size="lg" variant="secondary" colors={colors} clayShadow={clayShadow} onClick={onWatchDemo}>
            {content?.ctaSecondary?.text || 'Watch Demo'}
          </ClayButton>
        </motion.div>
        
        {/* Hero Image/Preview - Enhanced Clay Style */}
        <motion.div
          style={{
            marginTop: 60,
            borderRadius: 32,
            background: theme === 'light'
              ? `linear-gradient(145deg, ${colors.card}, ${colors.cardHover})`
              : `linear-gradient(145deg, ${colors.card}, ${colors.surface})`,
            boxShadow: theme === 'light'
              ? `
                  0 30px 60px -15px rgba(0, 0, 0, 0.15),
                  0 15px 30px -10px rgba(0, 0, 0, 0.1),
                  0 0 50px rgba(147, 112, 219, 0.1),
                  inset 0 -4px 8px rgba(0, 0, 0, 0.03),
                  inset 0 4px 8px rgba(255, 255, 255, 0.8)
                `
              : `
                  0 30px 60px -15px rgba(0, 0, 0, 0.6),
                  0 15px 30px -10px rgba(0, 0, 0, 0.4),
                  0 0 50px rgba(96, 165, 250, 0.1),
                  inset 0 -4px 8px rgba(0, 0, 0, 0.3),
                  inset 0 4px 8px rgba(255, 255, 255, 0.05)
                `,
            border: `2px solid ${colors.border}`,
            padding: 20,
            maxWidth: 700,
            margin: '60px auto 0',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {/* Top highlight for 3D effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 60,
              background: theme === 'light'
                ? 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
              borderRadius: '30px 30px 0 0',
              pointerEvents: 'none',
            }}
          />
          
          <div
            style={{
              background: colors.surface,
              borderRadius: 20,
              padding: 24,
              minHeight: 300,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: theme === 'light'
                ? 'inset 0 2px 8px rgba(0,0,0,0.04)'
                : 'inset 0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            {/* Window controls - Clay style */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {[colors.accentPink, colors.accentBlue, colors.accentPurple].map((color, i) => (
                <motion.div 
                  key={i}
                  style={{ 
                    width: 14, 
                    height: 14, 
                    borderRadius: 7, 
                    background: `linear-gradient(145deg, ${color}, ${color}cc)`,
                    boxShadow: `
                      0 3px 6px -2px ${color}60,
                      inset 0 -1px 2px rgba(0,0,0,0.2),
                      inset 0 1px 2px rgba(255,255,255,0.3)
                    `,
                  }} 
                  whileHover={{ scale: 1.2 }}
                />
              ))}
              <div style={{ 
                flex: 1, 
                height: 8, 
                borderRadius: 4, 
                background: colors.border,
                marginLeft: 12,
              }} />
            </div>
            <div style={{ display: 'flex', gap: 16, flex: 1 }}>
              {/* Sidebar - Clay style */}
              <motion.div
                style={{
                  width: 140,
                  borderRadius: 18,
                  background: theme === 'light'
                    ? `linear-gradient(145deg, ${colors.card}, ${colors.cardHover})`
                    : `linear-gradient(145deg, ${colors.card}, ${colors.surface})`,
                  boxShadow: theme === 'light'
                    ? `
                        0 8px 16px -4px rgba(0,0,0,0.08),
                        inset 0 -2px 4px rgba(0,0,0,0.02),
                        inset 0 2px 4px rgba(255,255,255,0.6)
                      `
                    : `
                        0 8px 16px -4px rgba(0,0,0,0.4),
                        inset 0 -2px 4px rgba(0,0,0,0.2),
                        inset 0 2px 4px rgba(255,255,255,0.03)
                      `,
                  border: `1px solid ${colors.border}`,
                  padding: 14,
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
                  <motion.div
                    key={i}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 12,
                      background: i === 0 
                        ? `linear-gradient(145deg, ${colors.accentBlue}30, ${colors.accentBlue}15)` 
                        : 'transparent',
                      boxShadow: i === 0 
                        ? `0 4px 8px -2px ${colors.accentBlue}30, inset 0 1px 2px rgba(255,255,255,0.2)` 
                        : 'none',
                      fontSize: '0.75rem',
                      fontWeight: i === 0 ? 600 : 500,
                      color: i === 0 ? colors.accentBlue : colors.textMuted,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                    }}
                    whileHover={{ 
                      background: `${colors.accentBlue}15`,
                      x: 2,
                    }}
                  >
                    <item.icon size={14} />
                    {item.text}
                  </motion.div>
                ))}
              </motion.div>
              {/* Main content - Clay cards */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: CheckCircle, text: 'Launch new feature', color: colors.accentBlue, done: true },
                  { icon: Paintbrush, text: 'Design review', color: colors.accentPink, done: false },
                  { icon: Mail, text: 'Send weekly update', color: colors.accentPurple, done: false },
                ].map((task, i) => (
                  <motion.div
                    key={i}
                    style={{
                      padding: 14,
                      borderRadius: 16,
                      background: theme === 'light'
                        ? `linear-gradient(145deg, ${colors.card}, ${colors.cardHover})`
                        : `linear-gradient(145deg, ${colors.card}, ${colors.surface})`,
                      boxShadow: theme === 'light'
                        ? `
                            0 6px 12px -3px rgba(0,0,0,0.08),
                            inset 0 -2px 4px rgba(0,0,0,0.02),
                            inset 0 2px 4px rgba(255,255,255,0.6)
                          `
                        : `
                            0 6px 12px -3px rgba(0,0,0,0.4),
                            inset 0 -2px 4px rgba(0,0,0,0.2),
                            inset 0 2px 4px rgba(255,255,255,0.03)
                          `,
                      border: `1px solid ${colors.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontSize: '0.85rem',
                      color: colors.textSecondary,
                      textDecoration: task.done ? 'line-through' : 'none',
                      opacity: task.done ? 0.7 : 1,
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: task.done ? 0.7 : 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.15 }}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: theme === 'light'
                        ? `0 10px 20px -5px ${task.color}30, inset 0 -2px 4px rgba(0,0,0,0.02), inset 0 2px 4px rgba(255,255,255,0.6)`
                        : `0 10px 20px -5px ${task.color}20, inset 0 -2px 4px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.03)`,
                      borderColor: task.color,
                    }}
                  >
                    <motion.span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: `linear-gradient(145deg, ${task.color}40, ${task.color}20)`,
                        boxShadow: `
                          0 4px 8px -2px ${task.color}40,
                          inset 0 -1px 2px rgba(0,0,0,0.1),
                          inset 0 1px 2px rgba(255,255,255,0.2)
                        `,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: task.color,
                      }}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      <task.icon size={16} />
                    </motion.span>
                    {task.text}
                    {task.done && (
                      <Check size={14} style={{ marginLeft: 'auto', color: colors.accentBlue }} />
                    )}
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
const Features = ({ 
  colors, 
  clayShadow, 
  theme,
  content,
}: { 
  colors: typeof lightColors; 
  clayShadow: typeof lightClayShadow; 
  theme: Theme
  content?: Feature[]
}) => {
  // Map CMS content to component format, with fallbacks
  const getAccentColor = (accent?: string) => {
    if (accent === 'pink') return colors.accentPink
    if (accent === 'purple') return colors.accentPurple
    return colors.accentBlue
  }
  
  const defaultFeatures = [
    { icon: Target, title: 'Smart Focus', description: 'AI-powered task prioritization that knows what matters most.', color: colors.accentBlue },
    { icon: Users, title: 'Team Sync', description: 'Real-time collaboration that feels like working side by side.', color: colors.accentPink },
    { icon: BarChart3, title: 'Visual Progress', description: 'Beautiful charts and insights that celebrate your wins.', color: colors.accentPurple },
    { icon: Bell, title: 'Gentle Reminders', description: 'Friendly nudges that help you stay on track without stress.', color: colors.accentBlue },
    { icon: Palette, title: 'Custom Themes', description: 'Make it yours with playful colors and personalization.', color: colors.accentPink },
    { icon: Lock, title: 'Private & Secure', description: 'Your data stays yours with end-to-end encryption.', color: colors.accentPurple },
  ]
  
  const features = content?.length ? content.map(f => ({
    icon: iconMap[f.icon || 'Target'] || Target,
    title: f.title,
    description: f.description,
    color: getAccentColor(f.accentColor),
  })) : defaultFeatures
  
  return (
    <section
      id="features"
      style={{
        padding: '40px 24px',
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
const Stats = ({ 
  colors, 
  clayShadow, 
  theme: _theme,
  content,
}: { 
  colors: typeof lightColors; 
  clayShadow: typeof lightClayShadow; 
  theme: Theme
  content?: Statistic[]
}) => {
  const defaultStats = [
    { number: '50K+', label: 'Happy users', icon: Smile },
    { number: '2M+', label: 'Tasks completed', icon: CheckCircle },
    { number: '99%', label: 'Uptime', icon: Rocket },
    { number: '4.9', label: 'App Store rating', icon: Star },
  ]
  
  const stats = content?.length ? content.map(s => ({
    number: s.value,
    label: s.label,
    icon: iconMap[s.icon || 'Star'] || Star,
  })) : defaultStats
  
  return (
    <section
      id="stats"
      style={{
        padding: '40px 24px',
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
                className="stat-number"
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPink})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  display: 'inline-block',
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

// Logo Grid / Social Proof Section
const LogoGrid = ({ 
  colors, 
  clayShadow,
  content,
}: { 
  colors: typeof lightColors; 
  clayShadow: typeof lightClayShadow
  content?: LogoGridItem[]
}) => {
  const defaultCompanies = [
    { name: 'Notion', letter: 'N' },
    { name: 'Slack', letter: 'S' },
    { name: 'Linear', letter: 'L' },
    { name: 'Vercel', letter: 'V' },
    { name: 'Figma', letter: 'F' },
    { name: 'Stripe', letter: 'S' },
  ]
  
  const companies = content?.length ? content.map(c => ({
    name: c.companyName,
    letter: c.logo?.letter || c.companyName.charAt(0),
  })) : defaultCompanies
  
  return (
    <section
      id="social-proof"
      style={{
        padding: '60px 24px',
        background: colors.bg,
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.p
          style={{
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: colors.textMuted,
            marginBottom: 32,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trusted by teams at
        </motion.p>
        
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          {companies.map((company, i) => (
            <motion.div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                borderRadius: 16,
                background: colors.card,
                boxShadow: clayShadow.soft,
                border: `1px solid ${colors.border}`,
                color: colors.textMuted,
                fontSize: '1rem',
                fontWeight: 700,
                filter: 'grayscale(100%)',
                opacity: 0.7,
                transition: 'all 0.3s ease',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{
                filter: 'grayscale(0%)',
                opacity: 1,
                scale: 1.05,
                boxShadow: clayShadow.button,
                borderColor: colors.accentBlue,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: `linear-gradient(145deg, ${colors.accentBlue}40, ${colors.accentPink}40)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                }}
              >
                {company.letter}
              </div>
              {company.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
const Testimonials = ({ 
  colors, 
  clayShadow,
  content,
}: { 
  colors: typeof lightColors; 
  clayShadow: typeof lightClayShadow
  content?: Testimonial[]
}) => {
  const [active, setActive] = useState(0)
  
  const getAccentColor = (accent?: string) => {
    if (accent === 'pink') return colors.accentPink
    if (accent === 'purple') return colors.accentPurple
    return colors.accentBlue
  }
  
  const defaultTestimonials = [
    { quote: "Claymoji made me actually enjoy my todo list. The little animations when I complete a task? *Chef's kiss*", author: 'Sarah Chen', role: 'Product Designer at Figma', avatar: '👩‍🎨', color: colors.accentBlue },
    { quote: "My team went from chaotic Slack threads to actually organized work. Game changer for our remote team.", author: 'Marcus Johnson', role: 'Engineering Lead at Stripe', avatar: '👨‍💻', color: colors.accentPink },
    { quote: "Finally, a productivity app that doesn't make me feel guilty. It's like a supportive friend cheering me on.", author: 'Emma Rodriguez', role: 'Founder at Bloom', avatar: '👩‍💼', color: colors.accentPurple },
    { quote: "The claymorphism design is stunning. Our whole team actually looks forward to checking tasks now.", author: 'David Kim', role: 'Creative Director at Vercel', avatar: '🎨', color: colors.accentBlue },
  ]
  
  const testimonials = content?.length ? content.map(t => ({
    quote: t.quote,
    author: t.authorName,
    role: `${t.role || ''}${t.role && t.company ? ' at ' : ''}${t.company || ''}`.trim(),
    avatar: t.avatar?.emoji || '👤',
    color: getAccentColor(t.accentColor),
  })) : defaultTestimonials
  
  // Auto-cycle through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])
  
  return (
    <section
      id="testimonials"
      style={{
        padding: '40px 24px',
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
                  fontSize: '2.5rem',
                }}
              >
                {testimonials[active].avatar}
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
const Pricing = ({ 
  colors, 
  clayShadow,
  content,
}: { 
  colors: typeof lightColors; 
  clayShadow: typeof lightClayShadow
  content?: PricingTier[]
}) => {
  const getAccentColor = (accent?: string) => {
    if (accent === 'pink') return colors.accentPink
    if (accent === 'purple') return colors.accentPurple
    return colors.accentBlue
  }
  
  const defaultPlans = [
    { name: 'Free', price: '$0', description: 'Perfect for getting started', features: ['Up to 3 projects', 'Basic analytics', 'Email support', '1 team member'], color: colors.accentBlue, popular: false },
    { name: 'Pro', price: '$12', description: 'For serious productivity', features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Up to 10 team members', 'Custom themes', 'Integrations'], color: colors.accentPink, popular: true },
    { name: 'Team', price: '$29', description: 'For growing teams', features: ['Everything in Pro', 'Unlimited members', 'Admin controls', 'SSO & SAML', 'Dedicated support', 'API access'], color: colors.accentPurple, popular: false },
  ]
  
  const plans = content?.length ? content.map(p => ({
    name: p.name,
    price: p.price,
    billingPeriod: p.billingPeriod || '/mo',
    description: p.description || '',
    features: p.features || [],
    ctaText: p.ctaText || 'Get Started',
    color: getAccentColor(p.accentColor),
    popular: p.highlighted || false,
  })) : defaultPlans.map(p => ({ ...p, billingPeriod: '/mo', ctaText: 'Get Started' }))
  
  return (
    <section
      id="pricing"
      style={{
        padding: '40px 24px',
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
                <span style={{ fontSize: '1rem', fontWeight: 500, color: colors.textMuted }}>{plan.billingPeriod || '/mo'}</span>
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
                {plan.ctaText || 'Get Started'}
              </ClayButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
const About = ({ 
  colors, 
  clayShadow, 
  theme,
  content,
}: { 
  colors: typeof lightColors; 
  clayShadow: typeof lightClayShadow; 
  theme: Theme
  content?: {
    headline?: string
    description?: string
    values?: Array<{
      title: string
      description: string
      icon?: string
      accentColor?: 'blue' | 'pink' | 'purple'
    }>
  }
}) => {
  const getAccentColor = (accent?: string) => {
    if (accent === 'pink') return colors.accentPink
    if (accent === 'purple') return colors.accentPurple
    return colors.accentBlue
  }
  
  const defaultValues = [
    { icon: Heart, title: 'Built with Love', description: 'Every feature is crafted with care to bring joy to your daily workflow.', color: colors.accentPink },
    { icon: Globe, title: 'Remote First', description: 'Our global team understands the challenges of distributed work.', color: colors.accentBlue },
    { icon: Zap, title: 'Always Improving', description: 'Weekly updates and new features based on your feedback.', color: colors.accentPurple },
  ]
  
  const values = content?.values?.length ? content.values.map(v => ({
    icon: iconMap[v.icon || 'Heart'] || Heart,
    title: v.title,
    description: v.description,
    color: getAccentColor(v.accentColor),
  })) : defaultValues
  
  const headline = content?.headline || 'About Claymoji'
  const description = content?.description || "We believe productivity tools should feel good to use. That's why we built Claymoji — a playful workspace that helps you get things done without the stress."
  
  return (
    <section
      id="about"
      style={{
        padding: '40px 24px',
        background: colors.bg,
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 48 }}
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
            {headline}
          </h2>
          <p style={{ fontSize: '1.125rem', color: colors.textSecondary, maxWidth: 600, margin: '0 auto' }}>
            {description}
          </p>
        </motion.div>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {values.map((value, i) => (
            <motion.div
              key={i}
              style={{
                padding: 32,
                borderRadius: 24,
                background: colors.card,
                boxShadow: clayShadow.card,
                border: `1px solid ${colors.border}`,
                textAlign: 'center',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: clayShadow.elevated,
                borderColor: value.color,
                y: -4,
              }}
            >
              <ClayIcon icon={value.icon} bgColor={value.color} theme={theme} />
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: colors.text,
                  margin: '20px 0 12px',
                }}
              >
                {value.title}
              </h3>
              <p style={{ color: colors.textSecondary, lineHeight: 1.6 }}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTA = ({ 
  colors, 
  theme,
  content,
}: { 
  colors: typeof lightColors; 
  theme: Theme
  content?: {
    headline?: string
    headlineHighlight?: string
    subtext?: string
    buttons?: Array<{ text: string; url?: string; variant?: 'primary' | 'ghost' }>
  }
}) => (
  <section
    id="cta"
    style={{
      padding: '40px 24px',
      background: `linear-gradient(180deg, ${colors.surface} 0%, ${colors.bg} 100%)`,
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
        {content?.headline || 'Ready to make work'}{' '}
        <span
          className="gradient-text"
          style={{
            background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPink})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            display: 'inline-block',
          }}
        >
          {content?.headlineHighlight || 'feel like play?'}
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
        {content?.subtext || "Join 50,000+ happy users who've transformed their productivity."}
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        {content?.buttons?.length ? (
          content.buttons.map((btn, i) => (
            <ClayButton 
              key={i}
              size="lg" 
              variant={btn.variant === 'ghost' ? 'ghost' : 'primary'}
              colors={colors} 
              clayShadow={theme === 'light' ? lightClayShadow : darkClayShadow}
            >
              {btn.text}
            </ClayButton>
          ))
        ) : (
          <>
            <ClayButton size="lg" colors={colors} clayShadow={theme === 'light' ? lightClayShadow : darkClayShadow}>Start Free Trial</ClayButton>
            <ClayButton size="lg" variant="ghost" colors={colors} clayShadow={theme === 'light' ? lightClayShadow : darkClayShadow}>Talk to Sales</ClayButton>
          </>
        )}
      </div>
    </motion.div>
  </section>
)

// Footer - Clay aesthetic with card background
const Footer = ({ 
  colors, 
  clayShadow, 
  theme,
  brandName,
  tagline,
  onPrivacy,
  onTerms,
}: { 
  colors: typeof lightColors; 
  clayShadow: typeof lightClayShadow; 
  theme: Theme
  brandName?: string
  tagline?: string
  onPrivacy?: () => void
  onTerms?: () => void
}) => {
  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  // Handle link clicks - some scroll to sections, some open modals
  const handleLinkClick = (link: string) => {
    if (link === 'Privacy' && onPrivacy) {
      onPrivacy()
    } else if (link === 'Terms' && onTerms) {
      onTerms()
    } else {
      const sectionMap: Record<string, string> = {
        'Features': 'features',
        'Pricing': 'pricing',
        'About': 'about',
      }
      scrollToSection(sectionMap[link] || 'hero')
    }
  }
  
  const currentYear = new Date().getFullYear()
  
  return (
    <footer
      style={{
        padding: '80px 24px 40px',
        background: colors.surface,
        position: 'relative',
      }}
    >
      {/* Main footer card with clay styling */}
      <motion.div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 40,
          borderRadius: 32,
          background: theme === 'light'
            ? `linear-gradient(145deg, ${colors.card}, ${colors.cardHover})`
            : `linear-gradient(145deg, ${colors.card}, ${colors.surface})`,
          boxShadow: clayShadow.card,
          border: `1px solid ${colors.border}`,
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Top highlight for 3D effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            background: theme === 'light'
              ? 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
            borderRadius: '30px 30px 0 0',
            pointerEvents: 'none',
          }}
        />
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 48,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Logo & Description */}
          <div style={{ gridColumn: 'span 1' }}>
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontWeight: 700,
                fontSize: '1.35rem',
                color: colors.text,
                marginBottom: 16,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 14,
                  background: `linear-gradient(145deg, ${colors.accentBlue}, ${colors.accentPink})`,
                  boxShadow: `
                    0 8px 16px -4px rgba(96, 165, 250, 0.5),
                    inset 0 -3px 6px rgba(0, 0, 0, 0.2),
                    inset 0 3px 6px rgba(255, 255, 255, 0.3)
                  `,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.white,
                }}
              >
                <Sparkles size={20} />
              </div>
              {brandName || 'Claymoji'}
            </motion.div>
            <p style={{ color: colors.textSecondary, fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 16 }}>
              {tagline || 'Making productivity playful.'}
            </p>
            <p style={{ 
              color: colors.textMuted, 
              fontSize: '0.8rem', 
              lineHeight: 1.6,
              padding: '8px 12px',
              borderRadius: 10,
              background: theme === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
              display: 'inline-block',
            }}>
              Built with React, Framer Motion & TypeScript
            </p>
          </div>
          
          {/* Links */}
          {[
            { title: 'Product', links: ['Features', 'Pricing'] },
            { title: 'Company', links: ['About'] },
            { title: 'Legal', links: ['Privacy', 'Terms'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ 
                fontWeight: 700, 
                color: colors.text, 
                marginBottom: 20,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {col.title}
              </h4>
              {col.links.map((link, j) => (
                <motion.button
                  key={j}
                  onClick={() => handleLinkClick(link)}
                  style={{
                    display: 'block',
                    color: colors.textSecondary,
                    background: 'transparent',
                    border: 'none',
                    fontSize: '0.95rem',
                    padding: '8px 0',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    transition: 'all 0.2s ease-out',
                  }}
                  whileHover={{ color: colors.accentBlue, x: 6 }}
                >
                  {link}
                </motion.button>
              ))}
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
            margin: '40px 0 24px',
          }}
        />
        
        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ color: colors.textMuted, fontSize: '0.85rem' }}>
            © {currentYear} {brandName || 'Claymoji'}. Made with ❤️ and soft shadows.
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { Icon: Twitter, label: 'Twitter', color: colors.accentBlue },
              { Icon: Instagram, label: 'Instagram', color: colors.accentPink },
              { Icon: Briefcase, label: 'LinkedIn', color: colors.accentBlue },
              { Icon: Gamepad2, label: 'Discord', color: colors.accentPurple },
            ].map(({ Icon, label, color }, i) => (
              <motion.button
                key={i}
                onClick={() => scrollToSection('hero')}
                aria-label={label}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 14,
                  background: theme === 'light'
                    ? `linear-gradient(145deg, ${colors.surface}, ${colors.card})`
                    : `linear-gradient(145deg, ${colors.surface}, ${colors.bg})`,
                  border: `1px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: colors.textMuted,
                  boxShadow: theme === 'light'
                    ? `0 4px 8px -2px rgba(0,0,0,0.08), inset 0 -1px 2px rgba(0,0,0,0.02), inset 0 1px 2px rgba(255,255,255,0.5)`
                    : `0 4px 8px -2px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.03)`,
                  transition: 'all 0.2s ease-out',
                }}
                whileHover={{ 
                  scale: 1.15, 
                  boxShadow: `0 8px 16px -4px ${color}40`,
                  borderColor: color,
                  color: color,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

// Main Component
export default function ClaymorphismLanding() {
  const [theme, setTheme] = useState<Theme>('light')
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  
  // Fetch CMS content with fallbacks
  const content = useClaymorphismContent()
  
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
  
  // Extract brand info from site settings
  const { brandName, tagline } = content.siteSettings
  
  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: colors.bg,
        minHeight: '100vh',
        overflowX: 'hidden',
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
        
        /* Gradient text fallback for all browsers */
        .gradient-text, .stat-number {
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
        }
        
        /* Mobile Navigation */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
      
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Nav colors={colors} clayShadow={clayShadow} brandName={brandName} />
      <Hero colors={colors} clayShadow={clayShadow} theme={theme} content={content.heroSection} onWatchDemo={() => setDemoModalOpen(true)} />
      <LogoGrid colors={colors} clayShadow={clayShadow} content={content.logoGrid} />
      <Features colors={colors} clayShadow={clayShadow} theme={theme} content={content.features} />
      <Stats colors={colors} clayShadow={clayShadow} theme={theme} content={content.statistics} />
      <Testimonials colors={colors} clayShadow={clayShadow} content={content.testimonials} />
      <Pricing colors={colors} clayShadow={clayShadow} content={content.pricingTiers} />
      <About colors={colors} clayShadow={clayShadow} theme={theme} content={content.aboutSection} />
      <CTA colors={colors} theme={theme} content={content.ctaSection} />
      <Footer colors={colors} clayShadow={clayShadow} theme={theme} brandName={brandName} tagline={tagline} onPrivacy={() => setPrivacyModalOpen(true)} onTerms={() => setTermsModalOpen(true)} />
      
      {/* Demo Video Modal */}
      <ClayModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        title="Watch Demo"
        colors={colors}
        clayShadow={clayShadow}
        theme={theme}
      >
        <div style={{ 
          aspectRatio: '16/9', 
          background: theme === 'light' ? colors.surface : colors.bg,
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          border: `1px solid ${colors.border}`,
        }}>
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPink})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: `0 8px 24px ${colors.accentBlue}40`,
            }}>
              <Rocket size={32} color={colors.white} />
            </div>
            <p style={{ color: colors.textMuted, fontSize: '0.95rem' }}>
              Demo video coming soon! In the meantime, explore the features above.
            </p>
          </div>
        </div>
        <p>
          Claymoji is a playful productivity app that transforms how you organize work. 
          Our demo showcases the intuitive interface, smart task management, and delightful 
          animations that make getting things done feel like play.
        </p>
      </ClayModal>

      {/* Privacy Policy Modal */}
      <ClayModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="Privacy Policy"
        colors={colors}
        clayShadow={clayShadow}
        theme={theme}
      >
        <h4 style={{ color: colors.text, marginBottom: 12 }}>Your Privacy Matters</h4>
        <p style={{ marginBottom: 16 }}>
          At {brandName || 'Claymoji'}, we take your privacy seriously. This template is for 
          demonstration purposes and doesn't collect any personal data.
        </p>
        <h4 style={{ color: colors.text, marginBottom: 12 }}>What We Collect</h4>
        <p style={{ marginBottom: 16 }}>
          • Basic usage analytics (page views, feature usage)<br/>
          • Account information you provide (email, name)<br/>
          • Task and project data you create within the app
        </p>
        <h4 style={{ color: colors.text, marginBottom: 12 }}>How We Use It</h4>
        <p style={{ marginBottom: 16 }}>
          Your data is used solely to provide and improve our services. We never sell 
          your personal information to third parties.
        </p>
        <h4 style={{ color: colors.text, marginBottom: 12 }}>Data Security</h4>
        <p>
          We use industry-standard encryption and security measures to protect your data. 
          All data is stored securely and transmitted using TLS encryption.
        </p>
      </ClayModal>

      {/* Terms of Service Modal */}
      <ClayModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="Terms of Service"
        colors={colors}
        clayShadow={clayShadow}
        theme={theme}
      >
        <h4 style={{ color: colors.text, marginBottom: 12 }}>Terms of Use</h4>
        <p style={{ marginBottom: 16 }}>
          By using {brandName || 'Claymoji'}, you agree to these terms. This template 
          is provided for demonstration and educational purposes.
        </p>
        <h4 style={{ color: colors.text, marginBottom: 12 }}>Acceptable Use</h4>
        <p style={{ marginBottom: 16 }}>
          • Use the service for lawful purposes only<br/>
          • Don't attempt to disrupt or compromise our systems<br/>
          • Respect other users' privacy and content<br/>
          • Don't share your account credentials with others
        </p>
        <h4 style={{ color: colors.text, marginBottom: 12 }}>Intellectual Property</h4>
        <p style={{ marginBottom: 16 }}>
          The {brandName || 'Claymoji'} name, logo, and visual design are proprietary. 
          Your content remains yours, but you grant us license to display it within the service.
        </p>
        <h4 style={{ color: colors.text, marginBottom: 12 }}>Limitation of Liability</h4>
        <p>
          This service is provided "as is" without warranties. We're not liable for 
          any damages arising from your use of the service.
        </p>
      </ClayModal>
    </div>
  )
}
