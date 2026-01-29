import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence, useScroll } from 'framer-motion';

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
  delay = 0,
  style = {}
}: { 
  color: string; 
  size?: number; 
  delay?: number;
  style?: React.CSSProperties;
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
        ...style
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
// MAGNETIC WRAPPER (Desktop only)
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
  const isMobile = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
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
      style={{ x: isMobile ? 0 : springX, y: isMobile ? 0 : springY }}
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
  onClick?: () => void;
}

const BentoTile = ({ 
  children, 
  span = 'normal',
  delay = 0,
  accentColor = colors.accent1,
  hoverContent,
  style = {},
  gradient = false,
  gradientColors = [colors.accent1, colors.accent2],
  onClick
}: BentoTileProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isActive, setIsActive] = useState(false);
  const isMobile = useIsMobile();

  const getSpanStyle = (): React.CSSProperties => {
    switch (span) {
      case 'wide': return { gridColumn: 'span 2' };
      case 'tall': return { gridRow: 'span 2' };
      case 'large': return { gridColumn: 'span 2', gridRow: 'span 2' };
      default: return {};
    }
  };

  // Mobile: toggle on tap, Desktop: hover
  const handleInteraction = () => {
    if (isMobile && hoverContent) {
      setIsActive(!isActive);
    }
    onClick?.();
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
      onMouseEnter={() => !isMobile && setIsActive(true)}
      onMouseLeave={() => !isMobile && setIsActive(false)}
      onClick={handleInteraction}
      style={{
        position: 'relative',
        background: colors.bgCard,
        borderRadius: 24,
        border: `1px solid ${isActive ? colors.borderHover : colors.border}`,
        padding: '1.5rem',
        overflow: 'hidden',
        cursor: 'pointer',
        minHeight: span === 'tall' || span === 'large' ? 340 : 160,
        boxShadow: isActive 
          ? `0 20px 60px -15px ${accentColor}30, 0 0 0 1px ${accentColor}20`
          : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.4s ease, border-color 0.3s ease',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        ...getSpanStyle(),
        ...style
      }}
    >
      {/* Animated gradient background for special tiles */}
      {gradient && (
        <AnimatedGradient 
          colors={gradientColors} 
          style={{ opacity: isActive ? 0.15 : 0.08 }}
        />
      )}

      {/* Hover/Tap reveal overlay */}
      <AnimatePresence>
        {isActive && hoverContent && (
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

      {/* Scale effect on active */}
      <motion.div
        animate={{ scale: isActive ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'relative', zIndex: 1, height: '100%' }}
      >
        {children}
      </motion.div>

      {/* Corner accent glow */}
      <motion.div
        animate={{ opacity: isActive ? 0.5 : 0 }}
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

      {/* Mobile tap indicator */}
      {isMobile && hoverContent && (
        <div style={{
          position: 'absolute',
          bottom: 8,
          right: 12,
          fontSize: '0.7rem',
          color: colors.textDim,
          opacity: isActive ? 0 : 0.6,
          transition: 'opacity 0.3s',
        }}>
          Tap to explore
        </div>
      )}
    </motion.div>
  );
};

// ============================================
// WAVE TEXT (Hover animation - desktop only)
// ============================================
const WaveText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <span className={className} style={{ 
        fontSize: '1.5rem', 
        fontWeight: 800,
        letterSpacing: '-0.02em'
      }}>
        {text}
      </span>
    );
  }

  return (
    <span className={className} style={{ 
      display: 'inline-flex',
      fontSize: '1.5rem', 
      fontWeight: 800,
      letterSpacing: '-0.02em'
    }}>
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
        WebkitTapHighlightColor: 'transparent',
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
// SCROLL PROGRESS BAR
// ============================================
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: `linear-gradient(90deg, ${colors.accent1}, ${colors.accent2})`,
        transformOrigin: '0%',
        scaleX: scrollYProgress,
        zIndex: 9999,
      }}
    />
  );
};

// ============================================
// NAVIGATION
// ============================================
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
        <WaveText text="PRISM" />
      </MagneticWrapper>

      <div style={{ 
        display: 'flex', 
        gap: isMobile ? '0' : '2.5rem', 
        alignItems: 'center',
        fontSize: '0.9rem',
        fontWeight: 500,
      }}>
        {!isMobile && ['Work', 'Services', 'Process', 'Contact'].map((item, i) => (
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
      <FloatingOrb color={colors.accent1} size={isMobile ? 120 : 200} delay={0} style={{ top: '10%', left: '10%' }} />
      <FloatingOrb color={colors.accent2} size={isMobile ? 90 : 150} delay={2} style={{ top: '60%', right: '20%' }} />
      <FloatingOrb color={colors.accent3} size={isMobile ? 100 : 180} delay={4} style={{ bottom: '20%', left: '30%' }} />

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
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
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
              fontSize: isMobile ? '1rem' : '1.15rem',
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
            style={{ 
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <GlassButton primary>View Our Work</GlassButton>
            <GlassButton>Learn More</GlassButton>
          </motion.div>
        </div>

        {/* Right: Bento Grid Preview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gridTemplateRows: isMobile ? 'repeat(4, 90px)' : 'repeat(3, 120px)',
          gap: isMobile ? '0.6rem' : '1rem',
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
                fontSize: '0.75rem', 
                color: colors.textDim,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Featured
              </span>
              <div>
                <h3 style={{ 
                  fontSize: isMobile ? '1.25rem' : '1.75rem', 
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  Nexus AI
                </h3>
                <p style={{ 
                  fontSize: '0.85rem', 
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
                fontSize: isMobile ? '1.75rem' : '2.5rem', 
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.accent2}, ${colors.accent3})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                <AnimatedCounter value={150} suffix="+" />
              </p>
              <p style={{ 
                fontSize: '0.7rem', 
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
                fontSize: isMobile ? '1.75rem' : '2.5rem', 
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.accent4}, ${colors.accent5})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                <AnimatedCounter value={98} suffix="%" />
              </p>
              <p style={{ 
                fontSize: '0.7rem', 
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
// CLIENTS/PARTNERS BENTO SECTION
// ============================================
const Clients = () => {
  const isMobile = useIsMobile();
  
  const clients = [
    { name: 'Stripe', logo: '💳' },
    { name: 'Notion', logo: '📝' },
    { name: 'Linear', logo: '🎯' },
    { name: 'Vercel', logo: '▲' },
    { name: 'Figma', logo: '🎨' },
    { name: 'Framer', logo: '✨' },
  ];

  return (
    <section style={{
      padding: isMobile ? '3rem 1.25rem' : '4rem 4rem',
      maxWidth: 1400,
      margin: '0 auto',
    }}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          color: colors.textDim,
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '2rem'
        }}
      >
        Trusted by innovative teams
      </motion.p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
        gap: isMobile ? '0.5rem' : '1rem',
      }}>
        {clients.map((client, i) => (
          <BentoTile
            key={client.name}
            delay={i * 0.05}
            accentColor={colors.accent2}
            style={{ minHeight: isMobile ? 80 : 100 }}
          >
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>{client.logo}</span>
              <span style={{ 
                fontSize: '0.75rem', 
                color: colors.textMuted,
                fontWeight: 500
              }}>
                {client.name}
              </span>
            </div>
          </BentoTile>
        ))}
      </div>
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
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
        gap: isMobile ? '0.6rem' : '1rem',
      }}>
        {services.map((service, i) => (
          <BentoTile
            key={service.type}
            delay={i * 0.1}
            accentColor={service.color}
            span={isMobile && i === 4 ? 'wide' : 'normal'}
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
                  fontSize: '1rem', 
                  fontWeight: 600,
                  marginBottom: '0.25rem' 
                }}>
                  {service.title}
                </h3>
                <p style={{ 
                  fontSize: '0.75rem', 
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
// PROCESS SECTION (New Bento Section)
// ============================================
const Process = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const steps = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'We dive deep into your goals, audience, and market to uncover opportunities.',
      color: colors.accent1,
      span: 'wide' as const,
    },
    {
      num: '02',
      title: 'Strategy',
      desc: 'Craft a roadmap that aligns creative vision with business objectives.',
      color: colors.accent2,
      span: 'normal' as const,
    },
    {
      num: '03',
      title: 'Design',
      desc: 'Transform ideas into stunning visuals that resonate.',
      color: colors.accent3,
      span: 'tall' as const,
    },
    {
      num: '04',
      title: 'Build',
      desc: 'Engineer pixel-perfect, performant solutions.',
      color: colors.accent4,
      span: 'wide' as const,
    },
    {
      num: '05',
      title: 'Launch',
      desc: 'Deploy with confidence and ongoing support.',
      color: colors.accent5,
      span: 'normal' as const,
    },
  ];

  return (
    <section id="process" style={{
      padding: isMobile ? '4rem 1.25rem' : '6rem 4rem',
      background: colors.bgLight,
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
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
            How we work
          </h2>
          <p style={{ color: colors.textMuted, maxWidth: 500 }}>
            A proven process refined over hundreds of successful projects.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
          gridAutoRows: isMobile ? '140px' : '160px',
          gap: isMobile ? '0.6rem' : '1.25rem',
        }}>
          {steps.map((step, i) => (
            <BentoTile
              key={step.num}
              span={isMobile ? 'normal' : step.span}
              delay={i * 0.1}
              accentColor={step.color}
              gradient
              gradientColors={[step.color, colors.bgCard]}
            >
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <span style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: step.color,
                  opacity: 0.3,
                  lineHeight: 1,
                }}>
                  {step.num}
                </span>
                <div>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 600,
                    marginBottom: '0.5rem' 
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: colors.textMuted,
                    lineHeight: 1.5
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </BentoTile>
          ))}
        </div>
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
    {
      title: 'Nova AI',
      category: 'AI Platform',
      colors: [colors.accent1, colors.accent3],
      span: 'wide' as const,
    },
    {
      title: 'Pulse Fitness',
      category: 'Mobile App',
      colors: [colors.accent4, colors.accent2],
      span: 'normal' as const,
    },
    {
      title: 'Horizon Travel',
      category: 'Booking Platform',
      colors: [colors.accent3, colors.accent5],
      span: 'large' as const,
    },
    {
      title: 'Cipher Security',
      category: 'SaaS Dashboard',
      colors: [colors.accent2, colors.accent1],
      span: 'tall' as const,
    },
    {
      title: 'Bloom Garden',
      category: 'E-commerce',
      colors: [colors.accent3, colors.accent4],
      span: 'normal' as const,
    },
    {
      title: 'Atlas Maps',
      category: 'Data Viz',
      colors: [colors.accent2, colors.accent5],
      span: 'wide' as const,
    },
    {
      title: 'Spark Creative',
      category: 'Portfolio',
      colors: [colors.accent5, colors.accent4],
      span: 'normal' as const,
    },
    {
      title: 'Mint Finance',
      category: 'Fintech App',
      colors: [colors.accent3, colors.accent1],
      span: 'normal' as const,
    },
    {
      title: 'Zen Wellness',
      category: 'Health Platform',
      colors: [colors.accent4, colors.accent3],
      span: 'tall' as const,
    },
    {
      title: 'Rocket Launch',
      category: 'Startup Site',
      colors: [colors.accent1, colors.accent4],
      span: 'wide' as const,
    },
    {
      title: 'Crystal Clear',
      category: 'Analytics',
      colors: [colors.accent2, colors.accent4],
      span: 'normal' as const,
    },
    {
      title: 'Thunder Cloud',
      category: 'Infrastructure',
      colors: [colors.accent1, colors.accent5],
      span: 'large' as const,
    },
    {
      title: 'Ember Social',
      category: 'Social App',
      colors: [colors.accent5, colors.accent3],
      span: 'normal' as const,
    },
  ];

  return (
    <section id="work" style={{
      padding: isMobile ? '4rem 1.25rem' : '6rem 4rem',
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
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            gap: '1rem'
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
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gridAutoRows: isMobile ? '140px' : '180px',
          gap: isMobile ? '0.6rem' : '1.25rem',
        }}>
          {projects.map((project, i) => (
            <BentoTile
              key={project.title}
              span={isMobile ? (i < 2 ? 'wide' : 'normal') : project.span}
              delay={Math.min(i * 0.05, 0.5)}
              gradient
              gradientColors={project.colors}
              accentColor={project.colors[0]}
              style={{
                minHeight: (isMobile && i < 2) || project.span === 'large' || project.span === 'tall' ? 240 : 130,
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
                  fontSize: '0.7rem', 
                  color: colors.textDim,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.25rem'
                }}>
                  {project.category}
                </span>
                <h3 style={{ 
                  fontSize: isMobile ? '1.1rem' : '1.5rem', 
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
// TESTIMONIALS BENTO SECTION
// ============================================
const Testimonials = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const testimonials = [
    {
      quote: "Prism transformed our entire digital presence. The results exceeded every expectation.",
      author: "Alex Rivera",
      role: "CEO, Quantum Labs",
      color: colors.accent1,
      span: 'wide' as const,
    },
    {
      quote: "Their attention to detail is unmatched.",
      author: "Maria Chen",
      role: "Founder, Solace",
      color: colors.accent3,
      span: 'normal' as const,
    },
    {
      quote: "Working with Prism felt like having an extension of our own team. Highly recommend.",
      author: "James Park",
      role: "CTO, Vertex",
      color: colors.accent2,
      span: 'tall' as const,
    },
    {
      quote: "5 stars. Simply the best agency we've worked with.",
      author: "Sarah Kim",
      role: "CMO, Echo",
      color: colors.accent4,
      span: 'normal' as const,
    },
    {
      quote: "They don't just build websites — they build experiences that convert.",
      author: "David Liu",
      role: "VP Product, Drift",
      color: colors.accent5,
      span: 'wide' as const,
    },
  ];

  return (
    <section style={{
      padding: isMobile ? '4rem 1.25rem' : '6rem 4rem',
      background: colors.bgLight,
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem', textAlign: 'center' }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            marginBottom: '1rem',
          }}>
            What clients say
          </h2>
          <p style={{ color: colors.textMuted, maxWidth: 500, margin: '0 auto' }}>
            Don't take our word for it — hear from the teams we've helped succeed.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
          gridAutoRows: isMobile ? '140px' : '160px',
          gap: isMobile ? '0.6rem' : '1.25rem',
        }}>
          {testimonials.map((t, i) => (
            <BentoTile
              key={t.author}
              span={isMobile ? 'normal' : t.span}
              delay={i * 0.1}
              accentColor={t.color}
            >
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <p style={{ 
                  fontSize: isMobile ? '0.8rem' : '0.95rem', 
                  color: colors.text,
                  lineHeight: 1.6,
                  fontStyle: 'italic'
                }}>
                  "{t.quote}"
                </p>
                <div>
                  <p style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 600,
                    marginBottom: '0.1rem'
                  }}>
                    {t.author}
                  </p>
                  <p style={{ 
                    fontSize: '0.7rem', 
                    color: colors.textDim 
                  }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </BentoTile>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// STATS SECTION (Bento style)
// ============================================
const Stats = () => {
  const isMobile = useIsMobile();
  
  const stats = [
    { value: 8, suffix: '+', label: 'Years Experience', color: colors.accent1 },
    { value: 150, suffix: '+', label: 'Projects Delivered', color: colors.accent2 },
    { value: 45, suffix: 'M+', label: 'Users Reached', color: colors.accent3 },
    { value: 12, suffix: '', label: 'Industry Awards', color: colors.accent4 },
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
        gap: isMobile ? '0.6rem' : '1rem',
      }}>
        {stats.map((stat, i) => (
          <BentoTile
            key={stat.label}
            delay={i * 0.1}
            accentColor={stat.color}
            gradient
            gradientColors={[stat.color, colors.bgCard]}
            style={{ minHeight: isMobile ? 120 : 150 }}
          >
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                background: `linear-gradient(135deg, ${stat.color} 0%, ${colors.text} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.25rem',
                lineHeight: 1,
              }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: colors.textDim,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                {stat.label}
              </p>
            </div>
          </BentoTile>
        ))}
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION (Bento style)
// ============================================
const CTA = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="contact" style={{
      padding: isMobile ? '4rem 1.25rem' : '6rem 4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: isMobile ? '1rem' : '2rem',
        }}>
          {/* Main CTA tile */}
          <BentoTile
            gradient
            gradientColors={[colors.accent1, colors.accent2, colors.accent3]}
            accentColor={colors.accent1}
            style={{ 
              minHeight: isMobile ? 280 : 350,
              padding: isMobile ? '2rem 1.5rem' : '3rem'
            }}
          >
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}>
                Ready to build
                <br />
                <span style={{
                  background: `linear-gradient(135deg, ${colors.accent1} 0%, ${colors.accent2} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  something extraordinary?
                </span>
              </h2>
              <p style={{
                fontSize: isMobile ? '0.95rem' : '1.1rem',
                color: colors.textMuted,
                marginBottom: '2rem',
                maxWidth: 400,
              }}>
                Let's turn your vision into reality. We're ready when you are.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
              }}>
                <GlassButton primary>Start a Project</GlassButton>
                <GlassButton>Schedule a Call</GlassButton>
              </div>
            </div>
          </BentoTile>

          {/* Side tiles */}
          <div style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            gap: isMobile ? '1rem' : '2rem',
          }}>
            <BentoTile
              accentColor={colors.accent4}
              hoverContent={
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📧</p>
                  <p style={{ fontSize: '0.9rem' }}>hello@prism.studio</p>
                </div>
              }
            >
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📧</p>
                <p style={{ fontSize: '0.85rem', color: colors.textMuted }}>
                  Email Us
                </p>
              </div>
            </BentoTile>

            <BentoTile
              accentColor={colors.accent5}
              hoverContent={
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📍</p>
                  <p style={{ fontSize: '0.9rem' }}>San Francisco, CA</p>
                </div>
              }
            >
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</p>
                <p style={{ fontSize: '0.85rem', color: colors.textMuted }}>
                  Visit Us
                </p>
              </div>
            </BentoTile>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER (Bento style)
// ============================================
const Footer = () => {
  const isMobile = useIsMobile();
  
  const socialLinks = [
    { name: 'Twitter', icon: '𝕏' },
    { name: 'LinkedIn', icon: 'in' },
    { name: 'Dribbble', icon: '🏀' },
    { name: 'Instagram', icon: '📷' },
  ];

  return (
    <footer style={{
      padding: isMobile ? '3rem 1.25rem 2rem' : '4rem',
      borderTop: `1px solid ${colors.border}`,
      background: colors.bgLight,
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        {/* Social links as mini bento tiles */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: isMobile ? '0.5rem' : '1rem',
          marginBottom: '3rem'
        }}>
          {socialLinks.map((link, i) => (
            <BentoTile
              key={link.name}
              delay={i * 0.05}
              accentColor={colors.accent1}
              style={{ minHeight: isMobile ? 60 : 80 }}
            >
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}>{link.icon}</span>
              </div>
            </BentoTile>
          ))}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'flex-start',
          gap: '1.5rem',
          paddingTop: '2rem',
          borderTop: `1px solid ${colors.border}`,
        }}>
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <WaveText text="PRISM" />
            <p style={{
              color: colors.textMuted,
              fontSize: '0.85rem',
              marginTop: '0.75rem',
              maxWidth: 280,
            }}>
              Crafting digital experiences that inspire and transform.
            </p>
          </div>
          
          <div style={{ 
            textAlign: isMobile ? 'center' : 'right',
            fontSize: '0.8rem',
            color: colors.textDim
          }}>
            <p>© 2026 Studio Prism</p>
            <p style={{ marginTop: '0.25rem' }}>Built with ♥ in San Francisco</p>
          </div>
        </div>
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
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
    }}>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Clients />
      <Services />
      <Process />
      <Work />
      <Testimonials />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default BentoGrid;
