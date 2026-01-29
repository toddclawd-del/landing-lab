import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// ============================================
// RESPONSIVE HOOK
// ============================================
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
};

const useIsMobile = () => useMediaQuery('(max-width: 768px)');
const useIsTablet = () => useMediaQuery('(max-width: 1024px)');

// ============================================
// DESIGN TOKENS
// ============================================
const colors = {
  bg: '#0A0A0F',
  bgLight: '#12121A',
  bgCard: '#16161F',
  accent1: '#8B5CF6', // violet
  accent2: '#3B82F6', // blue
  accent3: '#10B981', // emerald
  accent4: '#F59E0B', // amber
  accent5: '#EC4899', // pink
  text: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.6)',
  textDim: 'rgba(255,255,255,0.4)',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.15)',
};

// ============================================
// ANIMATED GRADIENT BACKGROUND (Pseudo-Video)
// ============================================
const AnimatedGradient = ({ 
  colors: gradientColors, 
  style = {} 
}: { 
  colors: string[]; 
  style?: React.CSSProperties 
}) => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      borderRadius: 'inherit',
      ...style
    }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: '-50%',
          background: `conic-gradient(from 0deg, ${gradientColors.join(', ')})`,
          filter: 'blur(60px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

// ============================================
// FLOATING ORB (Video-like motion element)
// ============================================
const FloatingOrb = ({ 
  color, 
  size = 120, 
  delay = 0 
}: { 
  color: string; 
  size?: number; 
  delay?: number;
}) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}80 0%, ${color}00 70%)`,
        filter: 'blur(40px)',
      }}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -25, 15, -10, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// ============================================
// MAGNETIC WRAPPER
// ============================================
const MagneticWrapper = ({ 
  children, 
  className = '',
  strength = 0.15
}: { 
  children: React.ReactNode; 
  className?: string;
  strength?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// BENTO TILE (Core component)
// ============================================
interface BentoTileProps {
  children: React.ReactNode;
  span?: 'normal' | 'wide' | 'tall' | 'large';
  delay?: number;
  accentColor?: string;
  hoverContent?: React.ReactNode;
  style?: React.CSSProperties;
  gradient?: boolean;
  gradientColors?: string[];
}

const BentoTile = ({ 
  children, 
  span = 'normal',
  delay = 0,
  accentColor = colors.accent1,
  hoverContent,
  style = {},
  gradient = false,
  gradientColors = [colors.accent1, colors.accent2]
}: BentoTileProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const getSpanStyle = (): React.CSSProperties => {
    switch (span) {
      case 'wide': return { gridColumn: 'span 2' };
      case 'tall': return { gridRow: 'span 2' };
      case 'large': return { gridColumn: 'span 2', gridRow: 'span 2' };
      default: return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: colors.bgCard,
        borderRadius: 24,
        border: `1px solid ${isHovered ? colors.borderHover : colors.border}`,
        padding: '1.5rem',
        overflow: 'hidden',
        cursor: 'pointer',
        minHeight: span === 'tall' || span === 'large' ? 340 : 160,
        boxShadow: isHovered 
          ? `0 20px 60px -15px ${accentColor}30, 0 0 0 1px ${accentColor}20`
          : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.4s ease, border-color 0.3s ease',
        ...getSpanStyle(),
        ...style
      }}
    >
      {/* Animated gradient background for special tiles */}
      {gradient && (
        <AnimatedGradient 
          colors={gradientColors} 
          style={{ opacity: isHovered ? 0.15 : 0.08 }}
        />
      )}

      {/* Hover reveal overlay */}
      <AnimatePresence>
        {isHovered && hoverContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${accentColor}15 0%, ${colors.bgCard}ee 100%)`,
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              borderRadius: 24,
              zIndex: 10,
            }}
          >
            {hoverContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scale effect on hover */}
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'relative', zIndex: 1, height: '100%' }}
      >
        {children}
      </motion.div>

      {/* Corner accent glow */}
      <motion.div
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
};

// ============================================
// WAVE TEXT (Hover animation)
// ============================================
const WaveText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <span className={className} style={{ display: 'inline-flex' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            y: hoveredIndex !== null && Math.abs(hoveredIndex - i) <= 2 
              ? -8 * (1 - Math.abs(hoveredIndex - i) * 0.3)
              : 0,
            color: hoveredIndex !== null && Math.abs(hoveredIndex - i) <= 1
              ? colors.accent1
              : colors.text
          }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

// ============================================
// COUNTER ANIMATION
// ============================================
const AnimatedCounter = ({ 
  value, 
  suffix = '',
  prefix = ''
}: { 
  value: number; 
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// ============================================
// GLASSMORPHIC BUTTON
// ============================================
const GlassButton = ({ 
  children, 
  primary = false,
  onClick
}: { 
  children: React.ReactNode; 
  primary?: boolean;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: '0.875rem 1.75rem',
        borderRadius: 12,
        border: primary ? 'none' : `1px solid ${colors.border}`,
        background: primary 
          ? `linear-gradient(135deg, ${colors.accent1} 0%, ${colors.accent2} 100%)`
          : 'rgba(255,255,255,0.05)',
        backdropFilter: primary ? 'none' : 'blur(12px)',
        color: colors.text,
        fontSize: '0.95rem',
        fontWeight: 500,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease',
        boxShadow: isHovered && primary 
          ? `0 10px 40px ${colors.accent1}40`
          : 'none',
      }}
    >
      {children}
      <motion.span
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </motion.button>
  );
};

// ============================================
// SERVICE ICON
// ============================================
const ServiceIcon = ({ type }: { type: 'design' | 'dev' | 'brand' | 'motion' | 'strategy' }) => {
  const icons: Record<string, React.ReactNode> = {
    design: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    dev: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    brand: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    motion: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    strategy: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  };
  return <>{icons[type]}</>;
};

// ============================================
// NAVIGATION
// ============================================
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isMobile ? '1rem 1.25rem' : '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${colors.border}` : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <MagneticWrapper>
        <WaveText 
          text="PRISM" 
          className=""
        />
      </MagneticWrapper>

      <div style={{ 
        display: 'flex', 
        gap: isMobile ? '0' : '2.5rem', 
        alignItems: 'center',
        fontSize: '0.9rem',
        fontWeight: 500,
      }}>
        {!isMobile && ['Work', 'Services', 'About', 'Contact'].map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{
              color: colors.textMuted,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            whileHover={{ color: colors.text }}
          >
            {item}
          </motion.a>
        ))}
        <GlassButton primary>Let's Talk</GlassButton>
      </div>
    </motion.nav>
  );
};

// ============================================
// HERO SECTION
// ============================================
const Hero = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isMobile ? '6rem 1.25rem 3rem' : '8rem 4rem 4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Floating orbs background */}
      <FloatingOrb color={colors.accent1} size={isMobile ? 120 : 200} delay={0} />
      <FloatingOrb color={colors.accent2} size={isMobile ? 90 : 150} delay={2} />
      <FloatingOrb color={colors.accent3} size={isMobile ? 100 : 180} delay={4} />

      {/* Hero content grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
        gap: isTablet ? '3rem' : '4rem',
        alignItems: 'center',
        maxWidth: 1400,
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Left: Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: `linear-gradient(135deg, ${colors.accent1}20 0%, ${colors.accent2}20 100%)`,
              borderRadius: 100,
              fontSize: '0.85rem',
              color: colors.accent1,
              marginBottom: '1.5rem',
              border: `1px solid ${colors.accent1}30`,
            }}
          >
            ✦ Digital Design Studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
            }}
          >
            We craft
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${colors.accent1} 0%, ${colors.accent2} 50%, ${colors.accent3} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              digital experiences
            </span>
            <br />
            that inspire.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontSize: '1.15rem',
              color: colors.textMuted,
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: '2rem',
            }}
          >
            Studio Prism transforms ambitious ideas into stunning digital 
            realities. From brand strategy to immersive web experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ display: 'flex', gap: '1rem' }}
          >
            <GlassButton primary>View Our Work</GlassButton>
            <GlassButton>Learn More</GlassButton>
          </motion.div>
        </div>

        {/* Right: Bento Grid Preview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gridTemplateRows: isMobile ? 'repeat(4, 100px)' : 'repeat(3, 120px)',
          gap: isMobile ? '0.75rem' : '1rem',
        }}>
          {/* Large feature tile */}
          <BentoTile 
            span="large" 
            delay={0.3}
            gradient
            gradientColors={[colors.accent1, colors.accent5]}
            accentColor={colors.accent1}
          >
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <span style={{ 
                fontSize: '0.8rem', 
                color: colors.textDim,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Featured
              </span>
              <div>
                <h3 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  Nexus AI
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: colors.textMuted 
                }}>
                  Complete brand & web platform
                </p>
              </div>
            </div>
          </BentoTile>

          {/* Tall tile */}
          <BentoTile 
            span="tall" 
            delay={0.4}
            accentColor={colors.accent3}
            hoverContent={
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎨</p>
                <p style={{ fontSize: '0.9rem', color: colors.textMuted }}>
                  View Project
                </p>
              </div>
            }
          >
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
              <p style={{ 
                fontSize: '0.85rem', 
                color: colors.textMuted,
                lineHeight: 1.5
              }}>
                "Prism understood our vision perfectly."
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: colors.textDim,
                marginTop: '0.75rem'
              }}>
                — Sarah Chen, Founder
              </p>
            </div>
          </BentoTile>

          {/* Small tiles */}
          <BentoTile delay={0.5} accentColor={colors.accent2}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                fontSize: '2.5rem', 
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.accent2}, ${colors.accent3})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                <AnimatedCounter value={150} suffix="+" />
              </p>
              <p style={{ 
                fontSize: '0.75rem', 
                color: colors.textDim,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Projects
              </p>
            </div>
          </BentoTile>

          <BentoTile delay={0.6} accentColor={colors.accent4}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                fontSize: '2.5rem', 
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.accent4}, ${colors.accent5})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                <AnimatedCounter value={98} suffix="%" />
              </p>
              <p style={{ 
                fontSize: '0.75rem', 
                color: colors.textDim,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Satisfaction
              </p>
            </div>
          </BentoTile>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: colors.textDim }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: 20,
            height: 30,
            borderRadius: 10,
            border: `2px solid ${colors.border}`,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: colors.accent1,
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// SERVICES SECTION
// ============================================
const Services = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const services = [
    { 
      type: 'design' as const, 
      title: 'UI/UX Design', 
      desc: 'Intuitive interfaces that users love',
      color: colors.accent1
    },
    { 
      type: 'dev' as const, 
      title: 'Development', 
      desc: 'Performant, scalable solutions',
      color: colors.accent2
    },
    { 
      type: 'brand' as const, 
      title: 'Branding', 
      desc: 'Memorable visual identities',
      color: colors.accent3
    },
    { 
      type: 'motion' as const, 
      title: 'Motion', 
      desc: 'Animations that tell stories',
      color: colors.accent4
    },
    { 
      type: 'strategy' as const, 
      title: 'Strategy', 
      desc: 'Data-driven decision making',
      color: colors.accent5
    },
  ];

  return (
    <section id="services" style={{
      padding: isMobile ? '4rem 1.25rem' : '6rem 4rem',
      maxWidth: 1400,
      margin: '0 auto',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          marginBottom: '1rem',
        }}>
          What we do
        </h2>
        <p style={{ color: colors.textMuted, maxWidth: 500 }}>
          Full-spectrum digital services tailored to your unique vision.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
        gap: isMobile ? '0.75rem' : '1rem',
      }}>
        {services.map((service, i) => (
          <BentoTile
            key={service.type}
            delay={i * 0.1}
            accentColor={service.color}
            hoverContent={
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{ color: service.color, marginBottom: '0.5rem' }}
                >
                  <ServiceIcon type={service.type} />
                </motion.div>
                <p style={{ fontSize: '0.85rem' }}>Explore →</p>
              </div>
            }
          >
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div style={{ color: service.color }}>
                <ServiceIcon type={service.type} />
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 600,
                  marginBottom: '0.25rem' 
                }}>
                  {service.title}
                </h3>
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: colors.textMuted 
                }}>
                  {service.desc}
                </p>
              </div>
            </div>
          </BentoTile>
        ))}
      </div>
    </section>
  );
};

// ============================================
// WORK SHOWCASE (Bento Portfolio)
// ============================================
const Work = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const projects = [
    {
      title: 'Quantum Labs',
      category: 'Brand + Web',
      colors: [colors.accent1, colors.accent2],
      span: 'large' as const,
    },
    {
      title: 'Solace Health',
      category: 'App Design',
      colors: [colors.accent3, colors.accent2],
      span: 'normal' as const,
    },
    {
      title: 'Drift Commerce',
      category: 'E-commerce',
      colors: [colors.accent4, colors.accent5],
      span: 'tall' as const,
    },
    {
      title: 'Echo Audio',
      category: 'Brand Identity',
      colors: [colors.accent5, colors.accent1],
      span: 'wide' as const,
    },
    {
      title: 'Vertex Finance',
      category: 'Dashboard',
      colors: [colors.accent2, colors.accent3],
      span: 'normal' as const,
    },
  ];

  return (
    <section id="work" style={{
      padding: isMobile ? '4rem 1.25rem' : '6rem 4rem',
      background: colors.bgLight,
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ 
            marginBottom: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}>
              Selected Work
            </h2>
            <p style={{ color: colors.textMuted, maxWidth: 500 }}>
              A glimpse into our latest projects and collaborations.
            </p>
          </div>
          <GlassButton>View All</GlassButton>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gridAutoRows: isMobile ? '160px' : '180px',
          gap: isMobile ? '0.75rem' : '1.25rem',
        }}>
          {projects.map((project, i) => (
            <BentoTile
              key={project.title}
              span={project.span}
              delay={i * 0.1}
              gradient
              gradientColors={project.colors}
              accentColor={project.colors[0]}
              style={{
                minHeight: project.span === 'large' || project.span === 'tall' ? 380 : 180,
              }}
              hoverContent={
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {project.title}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: colors.textMuted }}>
                    View Case Study →
                  </p>
                </div>
              }
            >
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: colors.textDim,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.25rem'
                }}>
                  {project.category}
                </span>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700 
                }}>
                  {project.title}
                </h3>
              </div>
            </BentoTile>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// STATS SECTION
// ============================================
const Stats = () => {
  const isMobile = useIsMobile();
  
  const stats = [
    { value: 8, suffix: '+', label: 'Years Experience' },
    { value: 150, suffix: '+', label: 'Projects Delivered' },
    { value: 45, suffix: 'M+', label: 'Users Reached' },
    { value: 12, suffix: '', label: 'Industry Awards' },
  ];

  return (
    <section style={{
      padding: isMobile ? '4rem 1.25rem' : '6rem 4rem',
      maxWidth: 1400,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: isMobile ? '1rem' : '2rem',
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{
              textAlign: 'center',
              padding: '2rem',
            }}
          >
            <p style={{
              fontSize: 'clamp(3rem, 5vw, 4rem)',
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.textMuted} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
            }}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: colors.textDim,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTA = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="contact" style={{
      padding: isMobile ? '5rem 1.25rem' : '8rem 4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        pointerEvents: 'none',
        opacity: 0.5
      }}>
        <FloatingOrb color={colors.accent1} size={300} delay={0} />
        <FloatingOrb color={colors.accent2} size={250} delay={3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1.5rem',
        }}>
          Ready to build
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${colors.accent1} 0%, ${colors.accent2} 50%, ${colors.accent3} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            something extraordinary?
          </span>
        </h2>
        <p style={{
          fontSize: '1.15rem',
          color: colors.textMuted,
          marginBottom: '2.5rem',
          maxWidth: 500,
          margin: '0 auto 2.5rem',
        }}>
          Let's turn your vision into reality. We're ready when you are.
        </p>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <GlassButton primary>Start a Project</GlassButton>
          <GlassButton>Schedule a Call</GlassButton>
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  const isMobile = useIsMobile();
  
  const links = [
    { section: 'Studio', items: ['About', 'Team', 'Careers', 'Contact'] },
    { section: 'Services', items: ['Design', 'Development', 'Branding', 'Motion'] },
    { section: 'Social', items: ['Twitter', 'LinkedIn', 'Dribbble', 'Instagram'] },
  ];

  return (
    <footer style={{
      padding: isMobile ? '2.5rem 1.25rem' : '4rem',
      borderTop: `1px solid ${colors.border}`,
      background: colors.bgLight,
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
        gap: isMobile ? '2rem' : '4rem',
      }}>
        <div>
          <WaveText text="PRISM" className="" />
          <p style={{
            color: colors.textMuted,
            fontSize: '0.9rem',
            marginTop: '1rem',
            maxWidth: 300,
            lineHeight: 1.6,
          }}>
            Crafting digital experiences that inspire and transform. 
            Based in San Francisco, working worldwide.
          </p>
        </div>
        
        {links.map((group) => (
          <div key={group.section}>
            <h4 style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: colors.textDim,
              marginBottom: '1rem',
            }}>
              {group.section}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {group.items.map((item) => (
                <li key={item} style={{ marginBottom: '0.5rem' }}>
                  <motion.a
                    href="#"
                    style={{
                      color: colors.textMuted,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease',
                    }}
                    whileHover={{ color: colors.text }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: 1400,
        margin: '4rem auto 0',
        paddingTop: '2rem',
        borderTop: `1px solid ${colors.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.85rem',
        color: colors.textDim,
      }}>
        <p>© 2026 Studio Prism. All rights reserved.</p>
        <p>Built with ♥ in San Francisco</p>
      </div>
    </footer>
  );
};

// ============================================
// MAIN EXPORT
// ============================================
const BentoGrid = () => {
  return (
    <div style={{
      background: colors.bg,
      color: colors.text,
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      minHeight: '100vh',
    }}>
      <Nav />
      <Hero />
      <Services />
      <Work />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default BentoGrid;
