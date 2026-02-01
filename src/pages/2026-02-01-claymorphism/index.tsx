import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ============================================
// CLAYMORPHISM LANDING PAGE
// ============================================
// A soft, 3D clay-like UI aesthetic with:
// - Pastel color palette
// - Inner + outer shadows for 3D depth
// - Very rounded corners (squircle shapes)
// - Playful, friendly, tactile feel
// ============================================

// Color Palette - Soft pastels with depth
const colors = {
  // Backgrounds
  bg: '#F8F6FF',           // Soft lavender white
  bgAlt: '#FFF5F8',        // Soft pink white
  bgMint: '#F0FFF4',       // Soft mint white
  
  // Primary colors
  lavender: '#C4B5FD',     // Soft lavender
  lavenderLight: '#DDD6FE', // Lighter lavender
  lavenderDark: '#A78BFA',  // Deeper lavender
  
  // Secondary colors  
  mint: '#86EFAC',         // Soft mint
  mintLight: '#BBF7D0',    // Lighter mint
  mintDark: '#4ADE80',     // Deeper mint
  
  // Accent colors
  peach: '#FECACA',        // Soft peach
  peachDark: '#FCA5A5',    // Deeper peach
  sky: '#BAE6FD',          // Soft sky blue
  skyDark: '#7DD3FC',      // Deeper sky
  butter: '#FEF08A',       // Soft butter yellow
  butterDark: '#FDE047',   // Deeper butter
  
  // Neutrals
  text: '#1F2937',         // Dark gray text
  textMuted: '#6B7280',    // Muted text
  white: '#FFFFFF',
}

// Claymorphism shadow presets
const clayShadow = {
  // Standard clay card
  card: `
    0 20px 40px -10px rgba(168, 139, 250, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.1),
    inset 0 -4px 8px rgba(168, 139, 250, 0.15),
    inset 0 4px 8px rgba(255, 255, 255, 0.9)
  `,
  // Elevated clay
  elevated: `
    0 30px 60px -15px rgba(168, 139, 250, 0.3),
    0 12px 24px -12px rgba(0, 0, 0, 0.15),
    inset 0 -6px 12px rgba(168, 139, 250, 0.2),
    inset 0 6px 12px rgba(255, 255, 255, 0.95)
  `,
  // Button clay
  button: `
    0 10px 20px -5px rgba(168, 139, 250, 0.3),
    0 4px 8px -4px rgba(0, 0, 0, 0.1),
    inset 0 -2px 4px rgba(168, 139, 250, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.9)
  `,
  // Pressed button
  pressed: `
    0 4px 8px -2px rgba(168, 139, 250, 0.2),
    0 2px 4px -2px rgba(0, 0, 0, 0.08),
    inset 0 2px 4px rgba(168, 139, 250, 0.15),
    inset 0 -1px 2px rgba(255, 255, 255, 0.7)
  `,
  // Soft clay (for nav, etc)
  soft: `
    0 8px 16px -4px rgba(168, 139, 250, 0.15),
    0 4px 8px -4px rgba(0, 0, 0, 0.05),
    inset 0 -2px 4px rgba(168, 139, 250, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.8)
  `,
}

// Floating 3D shape component
const FloatingShape = ({ 
  color, 
  size, 
  top, 
  left, 
  delay = 0,
  shape = 'circle' 
}: { 
  color: string
  size: number
  top: string
  left: string
  delay?: number
  shape?: 'circle' | 'square' | 'pill'
}) => {
  const borderRadius = shape === 'circle' ? '50%' : shape === 'pill' ? size / 2 : size / 4
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: shape === 'pill' ? size / 2 : size,
        borderRadius,
        background: `linear-gradient(145deg, ${color}, ${color}dd)`,
        boxShadow: `
          0 ${size / 4}px ${size / 2}px -${size / 8}px ${color}80,
          0 ${size / 8}px ${size / 4}px -${size / 8}px rgba(0,0,0,0.1),
          inset 0 -${size / 16}px ${size / 8}px ${color}40,
          inset 0 ${size / 16}px ${size / 8}px rgba(255,255,255,0.7)
        `,
        zIndex: 0,
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
}: { 
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  style?: React.CSSProperties
}) => {
  const sizes = {
    sm: { padding: '10px 20px', fontSize: '0.875rem' },
    md: { padding: '14px 28px', fontSize: '1rem' },
    lg: { padding: '18px 36px', fontSize: '1.125rem' },
  }
  
  const variants = {
    primary: {
      bg: `linear-gradient(145deg, ${colors.lavender}, ${colors.lavenderDark})`,
      color: colors.white,
      shadow: clayShadow.button,
      hoverShadow: clayShadow.elevated,
    },
    secondary: {
      bg: `linear-gradient(145deg, ${colors.white}, ${colors.bg})`,
      color: colors.text,
      shadow: clayShadow.button,
      hoverShadow: clayShadow.elevated,
    },
    ghost: {
      bg: 'transparent',
      color: colors.lavenderDark,
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
        border: 'none',
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
  color = colors.white,
  delay = 0,
  className,
  style,
}: { 
  children: React.ReactNode
  color?: string
  delay?: number
  className?: string
  style?: React.CSSProperties
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        background: `linear-gradient(145deg, ${color}, ${color}f5)`,
        borderRadius: 24,
        boxShadow: clayShadow.card,
        overflow: 'hidden',
        ...style,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: clayShadow.elevated,
        y: -4,
      }}
    >
      {children}
    </motion.div>
  )
}

// Clay Icon component (for features)
const ClayIcon = ({ 
  emoji, 
  bgColor 
}: { 
  emoji: string
  bgColor: string 
}) => (
  <div
    style={{
      width: 64,
      height: 64,
      borderRadius: 20,
      background: `linear-gradient(145deg, ${bgColor}, ${bgColor}dd)`,
      boxShadow: `
        0 8px 16px -4px ${bgColor}60,
        inset 0 -3px 6px ${bgColor}40,
        inset 0 3px 6px rgba(255,255,255,0.8)
      `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.75rem',
    }}
  >
    {emoji}
  </div>
)

// Navigation
const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  
  useState(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })
  
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
          background: scrolled ? `${colors.white}f0` : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? clayShadow.soft : 'none',
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
              background: `linear-gradient(145deg, ${colors.lavender}, ${colors.lavenderDark})`,
              boxShadow: `
                0 6px 12px -3px ${colors.lavender}80,
                inset 0 -2px 4px ${colors.lavenderDark}40,
                inset 0 2px 4px rgba(255,255,255,0.8)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
            }}
          >
            ✨
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
              }}
              whileHover={{ 
                color: colors.text,
                background: `${colors.lavender}30`,
              }}
            >
              {item}
            </motion.a>
          ))}
          <ClayButton size="sm">Get Started</ClayButton>
        </div>
      </motion.div>
    </motion.nav>
  )
}

// Hero Section
const Hero = () => {
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
        background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgAlt} 50%, ${colors.bgMint} 100%)`,
      }}
    >
      {/* Floating shapes */}
      <FloatingShape color={colors.lavender} size={120} top="15%" left="8%" delay={0} shape="circle" />
      <FloatingShape color={colors.mint} size={80} top="25%" left="85%" delay={0.5} shape="square" />
      <FloatingShape color={colors.peach} size={100} top="60%" left="5%" delay={1} shape="pill" />
      <FloatingShape color={colors.sky} size={60} top="70%" left="90%" delay={1.5} shape="circle" />
      <FloatingShape color={colors.butter} size={90} top="80%" left="15%" delay={2} shape="square" />
      <FloatingShape color={colors.lavenderLight} size={70} top="10%" left="75%" delay={0.8} shape="pill" />
      
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
            background: colors.white,
            boxShadow: clayShadow.soft,
            marginBottom: 24,
            fontSize: '0.875rem',
            color: colors.textMuted,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span style={{ fontSize: '1rem' }}>🎉</span>
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
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Make your ideas{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.lavenderDark}, ${colors.mintDark})`,
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
            color: colors.textMuted,
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.6,
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
          <ClayButton size="lg">Start Free Trial</ClayButton>
          <ClayButton size="lg" variant="secondary">Watch Demo</ClayButton>
        </motion.div>
        
        {/* Hero Image/Preview */}
        <motion.div
          style={{
            marginTop: 60,
            borderRadius: 24,
            background: colors.white,
            boxShadow: clayShadow.elevated,
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
              background: `linear-gradient(145deg, ${colors.bg}, ${colors.bgAlt})`,
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
              <div style={{ width: 12, height: 12, borderRadius: 6, background: colors.peach }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, background: colors.butter }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, background: colors.mint }} />
            </div>
            <div style={{ display: 'flex', gap: 16, flex: 1 }}>
              {/* Sidebar */}
              <div
                style={{
                  width: 140,
                  borderRadius: 16,
                  background: colors.white,
                  boxShadow: clayShadow.soft,
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {['📋 Tasks', '📅 Calendar', '💬 Chat', '📊 Stats'].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 10,
                      background: i === 0 ? `${colors.lavender}40` : 'transparent',
                      fontSize: '0.75rem',
                      color: colors.text,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
              {/* Main content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { emoji: '✅', text: 'Launch new feature', color: colors.mint },
                  { emoji: '🎨', text: 'Design review', color: colors.lavender },
                  { emoji: '📧', text: 'Send weekly update', color: colors.peach },
                ].map((task, i) => (
                  <motion.div
                    key={i}
                    style={{
                      padding: 12,
                      borderRadius: 14,
                      background: colors.white,
                      boxShadow: clayShadow.soft,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontSize: '0.85rem',
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
                        background: `${task.color}50`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                      }}
                    >
                      {task.emoji}
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
const Features = () => {
  const features = [
    {
      emoji: '🎯',
      title: 'Smart Focus',
      description: 'AI-powered task prioritization that knows what matters most.',
      color: colors.lavender,
    },
    {
      emoji: '🤝',
      title: 'Team Sync',
      description: 'Real-time collaboration that feels like working side by side.',
      color: colors.mint,
    },
    {
      emoji: '📊',
      title: 'Visual Progress',
      description: 'Beautiful charts and insights that celebrate your wins.',
      color: colors.peach,
    },
    {
      emoji: '🔔',
      title: 'Gentle Reminders',
      description: 'Friendly nudges that help you stay on track without stress.',
      color: colors.sky,
    },
    {
      emoji: '🎨',
      title: 'Custom Themes',
      description: 'Make it yours with playful colors and personalization.',
      color: colors.butter,
    },
    {
      emoji: '🔒',
      title: 'Private & Secure',
      description: 'Your data stays yours with end-to-end encryption.',
      color: colors.lavenderLight,
    },
  ]
  
  return (
    <section
      id="features"
      style={{
        padding: '100px 24px',
        background: colors.white,
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
          <p style={{ fontSize: '1.125rem', color: colors.textMuted, maxWidth: 500, margin: '0 auto' }}>
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
            <ClayCard key={i} delay={i * 0.1} style={{ padding: 32 }}>
              <ClayIcon emoji={feature.emoji} bgColor={feature.color} />
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
              <p style={{ color: colors.textMuted, lineHeight: 1.6 }}>
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
const Stats = () => {
  const stats = [
    { number: '50K+', label: 'Happy users', emoji: '😊' },
    { number: '2M+', label: 'Tasks completed', emoji: '✅' },
    { number: '99%', label: 'Uptime', emoji: '🚀' },
    { number: '4.9', label: 'App Store rating', emoji: '⭐' },
  ]
  
  return (
    <section
      style={{
        padding: '80px 24px',
        background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.bg} 100%)`,
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
                background: colors.white,
                boxShadow: clayShadow.card,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: clayShadow.elevated }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{stat.emoji}</div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${colors.lavenderDark}, ${colors.mintDark})`,
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
const Testimonials = () => {
  const [active, setActive] = useState(0)
  
  const testimonials = [
    {
      quote: "Claymoji made me actually enjoy my todo list. The little animations when I complete a task? *Chef's kiss*",
      author: 'Sarah Chen',
      role: 'Product Designer at Figma',
      avatar: '👩‍🎨',
      color: colors.lavender,
    },
    {
      quote: "My team went from chaotic Slack threads to actually organized work. Game changer.",
      author: 'Marcus Johnson',
      role: 'Engineering Lead at Stripe',
      avatar: '👨‍💻',
      color: colors.mint,
    },
    {
      quote: "Finally, a productivity app that doesn't make me feel guilty. It's like a supportive friend.",
      author: 'Emma Rodriguez',
      role: 'Founder at Bloom',
      avatar: '👩‍💼',
      color: colors.peach,
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
                background: colors.white,
                boxShadow: clayShadow.elevated,
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
                  background: `linear-gradient(145deg, ${testimonials[active].color}, ${testimonials[active].color}dd)`,
                  boxShadow: `
                    0 12px 24px -6px ${testimonials[active].color}60,
                    inset 0 -4px 8px ${testimonials[active].color}40,
                    inset 0 4px 8px rgba(255,255,255,0.8)
                  `,
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
                  color: colors.text,
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
                  background: i === active ? colors.lavenderDark : colors.lavender,
                  cursor: 'pointer',
                  boxShadow: i === active ? `0 4px 8px ${colors.lavender}60` : 'none',
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
const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: ['Up to 3 projects', 'Basic analytics', 'Email support', '1 team member'],
      color: colors.sky,
      popular: false,
    },
    {
      name: 'Pro',
      price: '$12',
      description: 'For serious productivity',
      features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Up to 10 team members', 'Custom themes', 'Integrations'],
      color: colors.lavender,
      popular: true,
    },
    {
      name: 'Team',
      price: '$29',
      description: 'For growing teams',
      features: ['Everything in Pro', 'Unlimited members', 'Admin controls', 'SSO & SAML', 'Dedicated support', 'API access'],
      color: colors.mint,
      popular: false,
    },
  ]
  
  return (
    <section
      id="pricing"
      style={{
        padding: '100px 24px',
        background: colors.white,
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
          <p style={{ fontSize: '1.125rem', color: colors.textMuted }}>
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
                  ? `linear-gradient(145deg, ${plan.color}, ${plan.color}dd)` 
                  : colors.white,
                boxShadow: plan.popular ? clayShadow.elevated : clayShadow.card,
                position: 'relative',
                transform: plan.popular ? 'scale(1.05)' : 'none',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: clayShadow.elevated }}
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
                    background: colors.white,
                    boxShadow: clayShadow.soft,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: colors.lavenderDark,
                  }}
                >
                  Most Popular ✨
                </div>
              )}
              
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: plan.popular ? colors.white : colors.text,
                  marginBottom: 8,
                }}
              >
                {plan.name}
              </h3>
              <div
                style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  color: plan.popular ? colors.white : colors.text,
                  marginBottom: 4,
                }}
              >
                {plan.price}
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>/mo</span>
              </div>
              <p
                style={{
                  color: plan.popular ? 'rgba(255,255,255,0.8)' : colors.textMuted,
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
                      color: plan.popular ? colors.white : colors.text,
                      fontSize: '0.95rem',
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: plan.popular ? 'rgba(255,255,255,0.3)' : `${plan.color}50`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <ClayButton 
                variant={plan.popular ? 'secondary' : 'primary'}
                style={{ width: '100%' }}
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
const CTA = () => (
  <section
    style={{
      padding: '100px 24px',
      background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgAlt} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Background shapes */}
    <FloatingShape color={colors.lavender} size={200} top="10%" left="-5%" delay={0} />
    <FloatingShape color={colors.mint} size={150} top="60%" left="90%" delay={0.5} />
    <FloatingShape color={colors.peach} size={100} top="20%" left="80%" delay={1} shape="square" />
    
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
            background: `linear-gradient(135deg, ${colors.lavenderDark}, ${colors.mintDark})`,
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
          color: colors.textMuted,
          marginBottom: 40,
          maxWidth: 500,
          margin: '0 auto 40px',
        }}
      >
        Join 50,000+ happy users who've transformed their productivity.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <ClayButton size="lg">Start Free Trial</ClayButton>
        <ClayButton size="lg" variant="ghost">Talk to Sales</ClayButton>
      </div>
    </motion.div>
  </section>
)

// Footer
const Footer = () => (
  <footer
    style={{
      padding: '60px 24px 40px',
      background: colors.white,
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
              background: `linear-gradient(145deg, ${colors.lavender}, ${colors.lavenderDark})`,
              boxShadow: `
                0 4px 8px -2px ${colors.lavender}60,
                inset 0 -2px 4px ${colors.lavenderDark}40,
                inset 0 2px 4px rgba(255,255,255,0.8)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
            }}
          >
            ✨
          </div>
          Claymoji
        </div>
        <p style={{ color: colors.textMuted, fontSize: '0.9rem', lineHeight: 1.6 }}>
          Making productivity playful since 2024.
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
              }}
              whileHover={{ color: colors.lavenderDark, x: 4 }}
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
        borderTop: `1px solid ${colors.lavender}30`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <div style={{ color: colors.textMuted, fontSize: '0.85rem' }}>
        © 2026 Claymoji. Made with 💜 and lots of soft shadows.
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {['𝕏', '📷', '💼', '🎮'].map((icon, i) => (
          <motion.a
            key={i}
            href="#"
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: colors.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              boxShadow: clayShadow.soft,
            }}
            whileHover={{ scale: 1.1, boxShadow: clayShadow.button }}
          >
            {icon}
          </motion.a>
        ))}
      </div>
    </div>
  </footer>
)

// Main Component
export default function ClaymorphismLanding() {
  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: colors.bg,
        minHeight: '100vh',
        overflow: 'hidden',
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
        }
        
        /* Hide scrollbar but keep functionality */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${colors.bg};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${colors.lavender};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${colors.lavenderDark};
        }
        
        @media (max-width: 768px) {
          nav > div > div:last-child a:not(:last-child) {
            display: none;
          }
        }
      `}</style>
      
      <Nav />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
}
