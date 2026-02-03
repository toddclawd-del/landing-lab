import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ============================================================================
// HUMAN SCRIBBLE / NAIVE DESIGN LANDING PAGE
// ============================================================================
// Trend: Hand-drawn, playful, imperfect aesthetic pushing back against AI polish
// Philosophy: "Embrace the mess — naive, imperfect, and human"
// Key elements: Scribble accents, wobbly lines, handwriting fonts, paper textures
// ============================================================================

// --- Color Palette ---
const colors = {
  cream: '#FDF8F3',
  paper: '#F5EDE4',
  ink: '#1A1612',
  inkLight: '#4A433B',
  inkMuted: '#8A8178',
  coral: '#E85D4C',
  mustard: '#E8A84C',
  sage: '#7DB87D',
  sky: '#6BB5D8',
  lavender: '#9B8DC8',
  blush: '#E8A0A0',
}

// --- Paper Texture Overlay ---
const PaperTexture = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: 0.04,
      mixBlendMode: 'multiply',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
)

// --- SVG Hand-drawn Elements ---
const ScribbleUnderline = ({ color = colors.coral, width = 200, delay = 0 }: { color?: string; width?: number; delay?: number }) => (
  <motion.svg
    width={width}
    height="12"
    viewBox="0 0 200 12"
    fill="none"
    style={{ overflow: 'visible' }}
    initial={{ pathLength: 0, opacity: 0 }}
    whileInView={{ pathLength: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: 'easeOut' }}
  >
    <motion.path
      d="M2 8c20-4 40 2 60-2s40 4 60 0 40-2 60 2 15 0 15-2"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    />
  </motion.svg>
)

const ScribbleCircle = ({ color = colors.mustard, size = 80 }: { color?: string; size?: number }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    style={{ overflow: 'visible' }}
    initial={{ pathLength: 0, rotate: -10 }}
    whileInView={{ pathLength: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: 'easeOut' }}
  >
    <motion.path
      d="M40 8c18 0 32 14 32 32s-14 32-32 32S8 58 8 40 22 8 40 8c2 0 4 1 5 2"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut' }}
    />
  </motion.svg>
)

const ScribbleArrow = ({ color = colors.ink, direction = 'right' }: { color?: string; direction?: 'right' | 'down' }) => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    style={{ 
      overflow: 'visible',
      transform: direction === 'down' ? 'rotate(90deg)' : 'none'
    }}
    initial={{ x: -10, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <path
      d="M4 20c8-2 16 2 24 0m-8-8c4 4 8 8 8 8s-4 4-8 8"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </motion.svg>
)

const ScribbleStar = ({ color = colors.mustard, size = 40 }: { color?: string; size?: number }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    initial={{ scale: 0, rotate: -45 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
  >
    <path
      d="M20 4l4 12h12l-10 8 4 12-10-8-10 8 4-12L4 16h12z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
      fillOpacity="0.2"
    />
  </motion.svg>
)

const DoodleFlower = ({ color = colors.coral, size = 50 }: { color?: string; size?: number }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="none"
    initial={{ scale: 0, rotate: -180 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
  >
    <circle cx="25" cy="25" r="6" fill={color} />
    <path d="M25 6c2 6-2 10-2 13m0-13c-2 6 2 10 2 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M25 44c2-6-2-10-2-13m0 13c-2-6 2-10 2-13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M6 25c6 2 10-2 13-2m-13 0c6-2 10 2 13 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M44 25c-6 2-10-2-13-2m13 0c-6-2-10 2-13 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </motion.svg>
)

const Squiggle = ({ color = colors.sage }: { color?: string }) => (
  <motion.svg
    width="120"
    height="20"
    viewBox="0 0 120 20"
    fill="none"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{ originX: 0 }}
  >
    <path
      d="M2 10c10-8 20 8 30 0s20 8 30 0 20 8 30 0 20 8 26 0"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </motion.svg>
)

// --- Wobbly Text Animation ---
const WobblyText = ({ children, style = {}, delay = 0 }: { children: string; style?: React.CSSProperties; delay?: number }) => {
  const letters = children.split('')
  return (
    <span style={{ display: 'inline-flex', ...style }}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0, rotate: Math.random() * 10 - 5 }}
          whileInView={{ y: 0, opacity: 1, rotate: Math.random() * 4 - 2 }}
          viewport={{ once: true }}
          transition={{ 
            delay: delay + i * 0.03,
            duration: 0.4,
            type: 'spring',
            stiffness: 200,
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}

// --- Doodle Button ---
const DoodleButton = ({ 
  children, 
  color = colors.coral,
  filled = true,
  onClick
}: { 
  children: React.ReactNode
  color?: string
  filled?: boolean
  onClick?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: '16px 32px',
        background: filled ? color : 'transparent',
        border: `3px solid ${color}`,
        borderRadius: '4px',
        color: filled ? colors.cream : color,
        fontFamily: "'Caveat', cursive",
        fontSize: '1.4rem',
        fontWeight: 700,
        cursor: 'pointer',
        overflow: 'visible',
      }}
      whileHover={{ scale: 1.05, rotate: isHovered ? 2 : 0 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
      {/* Hand-drawn corner accents */}
      <svg
        style={{ position: 'absolute', top: -8, left: -8, width: 20, height: 20 }}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M2 18V6c0-2 2-4 4-4h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg
        style={{ position: 'absolute', bottom: -8, right: -8, width: 20, height: 20, transform: 'rotate(180deg)' }}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M2 18V6c0-2 2-4 4-4h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </motion.button>
  )
}

// --- Service Card ---
const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  color,
  index 
}: { 
  title: string
  description: string
  icon: React.ReactNode
  color: string
  index: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, rotate: 0 }}
      style={{
        background: colors.paper,
        border: `3px solid ${colors.ink}`,
        borderRadius: '8px',
        padding: '32px',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* Corner doodle */}
      <div style={{ position: 'absolute', top: -15, right: 20 }}>
        {icon}
      </div>
      
      <h3 style={{
        fontFamily: "'Caveat', cursive",
        fontSize: '1.8rem',
        color: colors.ink,
        marginBottom: '12px',
      }}>
        {title}
      </h3>
      
      <div style={{ marginBottom: '16px' }}>
        <ScribbleUnderline color={color} width={100} />
      </div>
      
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '1rem',
        color: colors.inkLight,
        lineHeight: 1.7,
      }}>
        {description}
      </p>
    </motion.div>
  )
}

// --- Work Card ---
const WorkCard = ({ 
  title, 
  category, 
  image, 
  color,
  index 
}: { 
  title: string
  category: string
  image: string
  color: string
  index: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
      }}
    >
      {/* Image container with hand-drawn border */}
      <div style={{
        position: 'relative',
        aspectRatio: '4/3',
        overflow: 'hidden',
        border: `4px solid ${colors.ink}`,
        borderRadius: '8px',
      }}>
        <motion.img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Hover overlay with scribbles */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `${color}CC`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.span
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 5 }}
                exit={{ scale: 0 }}
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: '2rem',
                  color: colors.cream,
                }}
              >
                View Project →
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Title with hand-drawn underline */}
      <div style={{ marginTop: '16px' }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.85rem',
          color: colors.inkMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          {category}
        </span>
        <h3 style={{
          fontFamily: "'Caveat', cursive",
          fontSize: '1.6rem',
          color: colors.ink,
          marginTop: '4px',
        }}>
          {title}
        </h3>
      </div>
      
      {/* Decorative scribble */}
      <div style={{ position: 'absolute', top: -20, right: -10 }}>
        <ScribbleStar color={color} size={30} />
      </div>
    </motion.div>
  )
}

// --- Testimonial Card ---
const TestimonialCard = ({ 
  quote, 
  author, 
  role,
  color,
  index 
}: { 
  quote: string
  author: string
  role: string
  color: string
  index: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? 2 : -2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        background: colors.cream,
        border: `3px solid ${colors.ink}`,
        borderRadius: '8px',
        padding: '32px',
        position: 'relative',
      }}
    >
      {/* Quotation mark doodle */}
      <span style={{
        position: 'absolute',
        top: '16px',
        left: '20px',
        fontFamily: "'Caveat', cursive",
        fontSize: '4rem',
        color: color,
        opacity: 0.5,
        lineHeight: 1,
      }}>
        "
      </span>
      
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '1.1rem',
        color: colors.ink,
        lineHeight: 1.8,
        marginBottom: '24px',
        paddingTop: '24px',
      }}>
        {quote}
      </p>
      
      <div>
        <span style={{
          fontFamily: "'Caveat', cursive",
          fontSize: '1.4rem',
          color: colors.ink,
        }}>
          {author}
        </span>
        <span style={{
          display: 'block',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.9rem',
          color: colors.inkMuted,
          marginTop: '4px',
        }}>
          {role}
        </span>
      </div>
      
      {/* Corner flower */}
      <div style={{ position: 'absolute', bottom: -15, right: 20 }}>
        <DoodleFlower color={color} size={35} />
      </div>
    </motion.div>
  )
}

// --- Floating Doodles Background ---
const FloatingDoodles = () => {
  const doodles = [
    { type: 'star', color: colors.mustard, x: '5%', y: '15%', size: 30 },
    { type: 'circle', color: colors.coral, x: '90%', y: '20%', size: 50 },
    { type: 'flower', color: colors.sage, x: '10%', y: '45%', size: 40 },
    { type: 'star', color: colors.sky, x: '85%', y: '50%', size: 25 },
    { type: 'squiggle', color: colors.lavender, x: '15%', y: '75%', size: 80 },
    { type: 'circle', color: colors.blush, x: '80%', y: '80%', size: 40 },
  ]
  
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {doodles.map((doodle, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: doodle.x,
            top: doodle.y,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {doodle.type === 'star' && <ScribbleStar color={doodle.color} size={doodle.size} />}
          {doodle.type === 'circle' && <ScribbleCircle color={doodle.color} size={doodle.size} />}
          {doodle.type === 'flower' && <DoodleFlower color={doodle.color} size={doodle.size} />}
          {doodle.type === 'squiggle' && <Squiggle color={doodle.color} />}
        </motion.div>
      ))}
    </div>
  )
}

// --- Navigation ---
const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? `${colors.cream}F0` : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? `2px solid ${colors.ink}` : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <DoodleFlower color={colors.coral} size={35} />
        <span style={{
          fontFamily: "'Caveat', cursive",
          fontSize: '1.8rem',
          fontWeight: 700,
          color: colors.ink,
        }}>
          Scribble Studio
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {['Work', 'Services', 'About', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: colors.ink,
              textDecoration: 'none',
              position: 'relative',
            }}
            whileHover={{ y: -2 }}
          >
            {item}
          </motion.a>
        ))}
        <DoodleButton color={colors.coral} filled={false}>
          Let's Talk!
        </DoodleButton>
      </div>
    </motion.nav>
  )
}

// --- Hero Section ---
const Hero = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 32px 80px',
        position: 'relative',
      }}
    >
      <motion.div
        style={{ y, opacity, maxWidth: '1000px', textAlign: 'center' }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <ScribbleStar color={colors.mustard} size={24} />
          <span style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '1.3rem',
            color: colors.inkLight,
          }}>
            A human-made creative studio
          </span>
          <ScribbleStar color={colors.mustard} size={24} />
        </motion.div>
        
        {/* Main Headline */}
        <h1 style={{
          fontFamily: "'Caveat', cursive",
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          fontWeight: 700,
          color: colors.ink,
          lineHeight: 1.1,
          marginBottom: '24px',
        }}>
          <WobblyText delay={0.4}>We make brands</WobblyText>
          <br />
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <WobblyText delay={0.6}>feel like </WobblyText>
            <span style={{ color: colors.coral, position: 'relative' }}>
              <WobblyText delay={0.8}>friends</WobblyText>
              <span style={{ position: 'absolute', bottom: -5, left: 0, width: '100%' }}>
                <ScribbleUnderline color={colors.coral} width={200} delay={1} />
              </span>
            </span>
          </span>
        </h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: colors.inkLight,
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 40px',
          }}
        >
          Imperfect on purpose. We craft authentic brand identities that 
          feel warm, playful, and unmistakably human in a world of AI polish.
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}
        >
          <DoodleButton color={colors.coral}>
            See Our Work
          </DoodleButton>
          <DoodleButton color={colors.ink} filled={false}>
            Say Hello
          </DoodleButton>
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '1rem',
            color: colors.inkMuted,
          }}>
            Scroll down
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ScribbleArrow color={colors.inkMuted} direction="down" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// --- Services Section ---
const Services = () => {
  const services = [
    {
      title: 'Brand Identity',
      description: 'Logos, colors, and visual systems that capture your personality—with a healthy dose of character.',
      icon: <DoodleFlower color={colors.coral} size={40} />,
      color: colors.coral,
    },
    {
      title: 'Illustration',
      description: 'Hand-drawn artwork that tells your story in ways stock photos never could.',
      icon: <ScribbleStar color={colors.mustard} size={35} />,
      color: colors.mustard,
    },
    {
      title: 'Web Design',
      description: 'Websites that feel like a warm conversation, not a corporate brochure.',
      icon: <ScribbleCircle color={colors.sage} size={45} />,
      color: colors.sage,
    },
    {
      title: 'Packaging',
      description: 'Designs that make people smile when they unbox your product.',
      icon: <DoodleFlower color={colors.sky} size={40} />,
      color: colors.sky,
    },
  ]
  
  return (
    <section id="services" style={{ padding: '120px 32px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <Squiggle color={colors.sage} />
          <h2 style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: colors.ink,
            marginTop: '16px',
          }}>
            <WobblyText>What We Do</WobblyText>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.1rem',
            color: colors.inkLight,
            marginTop: '16px',
            maxWidth: '500px',
            margin: '16px auto 0',
          }}>
            Every project is made with real human hands 
            <br />(and a lot of coffee ☕)
          </p>
        </div>
        
        {/* Services grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
        }}>
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Work Section ---
const Work = () => {
  const projects = [
    { title: 'Sunny Bakery', category: 'Brand Identity', image: 'https://picsum.photos/seed/bakery/800/600', color: colors.mustard },
    { title: 'Little Wolf Coffee', category: 'Packaging', image: 'https://picsum.photos/seed/coffee/800/600', color: colors.sage },
    { title: 'Happy Plants Co', category: 'Web Design', image: 'https://picsum.photos/seed/plants/800/600', color: colors.coral },
    { title: 'Cozy Books', category: 'Illustration', image: 'https://picsum.photos/seed/books/800/600', color: colors.sky },
    { title: 'Gentle Skin', category: 'Brand Identity', image: 'https://picsum.photos/seed/skincare/800/600', color: colors.blush },
    { title: 'Playful Pets', category: 'Packaging', image: 'https://picsum.photos/seed/pets/800/600', color: colors.lavender },
  ]
  
  return (
    <section id="work" style={{ padding: '120px 32px', background: colors.paper, position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <ScribbleUnderline color={colors.coral} width={150} />
          <h2 style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: colors.ink,
            marginTop: '16px',
          }}>
            <WobblyText>Selected Work</WobblyText>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.1rem',
            color: colors.inkLight,
            marginTop: '16px',
          }}>
            A collection of brands we've helped feel more human
          </p>
        </div>
        
        {/* Projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
        }}>
          {projects.map((project, i) => (
            <WorkCard key={i} {...project} index={i} />
          ))}
        </div>
        
        {/* View all link */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <motion.a
            href="#"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1.4rem',
              color: colors.coral,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
            }}
            whileHover={{ x: 5 }}
          >
            See all projects <ScribbleArrow color={colors.coral} />
          </motion.a>
        </div>
      </div>
    </section>
  )
}

// --- About Section ---
const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <section id="about" style={{ padding: '120px 32px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Image with doodle frame */}
          <div style={{ position: 'relative' }}>
            <motion.div
              style={{
                border: `4px solid ${colors.ink}`,
                borderRadius: '8px',
                overflow: 'hidden',
                transform: 'rotate(-2deg)',
              }}
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="https://picsum.photos/seed/team/600/500"
                alt="Our team"
                style={{ width: '100%', display: 'block' }}
              />
            </motion.div>
            
            {/* Decorative elements */}
            <div style={{ position: 'absolute', top: -30, right: -20 }}>
              <ScribbleStar color={colors.mustard} size={50} />
            </div>
            <div style={{ position: 'absolute', bottom: -20, left: -15 }}>
              <DoodleFlower color={colors.coral} size={45} />
            </div>
          </div>
          
          {/* Text content */}
          <div>
            <Squiggle color={colors.lavender} />
            <h2 style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: colors.ink,
              marginTop: '16px',
              marginBottom: '24px',
            }}>
              We're a tiny team with big hearts
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.1rem',
              color: colors.inkLight,
              lineHeight: 1.8,
              marginBottom: '20px',
            }}>
              Scribble Studio was born from a simple belief: in a world of AI-generated 
              perfection, imperfection is a superpower. We're a band of designers, 
              illustrators, and dreamers who believe brands should feel like friends, 
              not faceless corporations.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.1rem',
              color: colors.inkLight,
              lineHeight: 1.8,
              marginBottom: '32px',
            }}>
              Every wobbly line we draw, every playful doodle we make—it's all 
              intentional. Because the best brands aren't perfect. They're real.
            </p>
            
            {/* Stats */}
            <div style={{ display: 'flex', gap: '40px' }}>
              {[
                { number: '50+', label: 'Happy Brands' },
                { number: '8', label: 'Years Making' },
                { number: '∞', label: 'Coffee Cups' },
              ].map((stat, i) => (
                <div key={i}>
                  <span style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '2.5rem',
                    color: colors.coral,
                  }}>
                    {stat.number}
                  </span>
                  <span style={{
                    display: 'block',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.9rem',
                    color: colors.inkMuted,
                  }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// --- Testimonials Section ---
const Testimonials = () => {
  const testimonials = [
    {
      quote: "Working with Scribble Studio felt like collaborating with old friends. They captured our personality in ways we couldn't have imagined—and made it look effortless.",
      author: "Sarah Chen",
      role: "Founder, Sunny Bakery",
      color: colors.mustard,
    },
    {
      quote: "In a sea of generic brands, they helped us stand out by being unapologetically ourselves. Our customers actually comment on how 'friendly' our packaging feels!",
      author: "Marcus Webb",
      role: "CEO, Little Wolf Coffee",
      color: colors.sage,
    },
    {
      quote: "The team gets it. They understand that perfect isn't always best. Our new brand identity has personality, warmth, and makes people smile.",
      author: "Emma Torres",
      role: "Creative Director, Happy Plants",
      color: colors.coral,
    },
  ]
  
  return (
    <section style={{ padding: '120px 32px', background: colors.paper, position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <DoodleFlower color={colors.blush} size={50} />
          <h2 style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: colors.ink,
            marginTop: '16px',
          }}>
            <WobblyText>Kind Words</WobblyText>
          </h2>
        </div>
        
        {/* Testimonials grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
        }}>
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// --- CTA Section ---
const CTA = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <section
      ref={ref}
      style={{
        padding: '120px 32px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '700px', margin: '0 auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
          <ScribbleStar color={colors.mustard} size={35} />
          <DoodleFlower color={colors.coral} size={40} />
          <ScribbleStar color={colors.sage} size={35} />
        </div>
        
        <h2 style={{
          fontFamily: "'Caveat', cursive",
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          color: colors.ink,
          marginBottom: '24px',
          lineHeight: 1.2,
        }}>
          Ready to make your brand feel more{' '}
          <span style={{ color: colors.coral, position: 'relative' }}>
            human
            <span style={{ position: 'absolute', bottom: -8, left: 0, width: '100%' }}>
              <ScribbleUnderline color={colors.coral} width={180} />
            </span>
          </span>
          ?
        </h2>
        
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '1.2rem',
          color: colors.inkLight,
          lineHeight: 1.7,
          marginBottom: '40px',
        }}>
          Let's grab a virtual coffee and chat about your project.
          <br />
          No corporate jargon, we promise.
        </p>
        
        <DoodleButton color={colors.coral}>
          Start a Conversation →
        </DoodleButton>
      </motion.div>
    </section>
  )
}

// --- Footer ---
const Footer = () => (
  <footer style={{
    padding: '60px 32px 40px',
    background: colors.ink,
    color: colors.cream,
    position: 'relative',
    zIndex: 1,
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        marginBottom: '60px',
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <DoodleFlower color={colors.coral} size={30} />
            <span style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1.5rem',
              fontWeight: 700,
            }}>
              Scribble Studio
            </span>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.95rem',
            color: `${colors.cream}99`,
            lineHeight: 1.7,
          }}>
            Making brands feel like friends since 2018.
          </p>
        </div>
        
        {/* Links */}
        {[
          { title: 'Studio', links: ['Work', 'Services', 'About', 'Careers'] },
          { title: 'Connect', links: ['Instagram', 'Dribbble', 'Twitter', 'LinkedIn'] },
          { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
        ].map((section) => (
          <div key={section.title}>
            <h4 style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1.3rem',
              marginBottom: '16px',
            }}>
              {section.title}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {section.links.map((link) => (
                <li key={link} style={{ marginBottom: '8px' }}>
                  <a
                    href="#"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.95rem',
                      color: `${colors.cream}99`,
                      textDecoration: 'none',
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Bottom bar */}
      <div style={{
        borderTop: `1px solid ${colors.cream}22`,
        paddingTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.9rem',
          color: `${colors.cream}66`,
        }}>
          © 2026 Scribble Studio. Made with ♥ and lots of scribbles.
        </span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <ScribbleStar color={colors.mustard} size={20} />
          <DoodleFlower color={colors.coral} size={20} />
          <ScribbleCircle color={colors.sage} size={20} />
        </div>
      </div>
    </div>
  </footer>
)

// --- Main Component ---
const HumanScribble = () => {
  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap"
        rel="stylesheet"
      />
      
      <div style={{ 
        background: colors.cream,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <PaperTexture />
        <FloatingDoodles />
        <Nav />
        <Hero />
        <Services />
        <Work />
        <About />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </>
  )
}

export default HumanScribble
