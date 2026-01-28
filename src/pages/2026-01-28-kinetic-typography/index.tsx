import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

// Utility: Split text into characters with spans
const SplitText = ({ 
  children, 
  className = '',
  charClassName = '',
  delay = 0,
  stagger = 0.03,
  type = 'chars' // 'chars' | 'words' | 'lines'
}: { 
  children: string; 
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  type?: 'chars' | 'words' | 'lines';
}) => {
  const items = useMemo(() => {
    if (type === 'words') return children.split(' ');
    if (type === 'lines') return children.split('\n');
    return children.split('');
  }, [children, type]);

  return (
    <span className={className} aria-label={children}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className={`${styles.splitChar} ${charClassName}`}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.215, 0.61, 0.355, 1]
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom' }}
        >
          {item === ' ' ? '\u00A0' : item}
          {type === 'words' && i < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
};

// Magnetic text that follows cursor
const MagneticText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
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

// Scroll-triggered text reveal
const ScrollRevealText = ({ 
  children, 
  className = '',
  direction = 'up' 
}: { 
  children: React.ReactNode; 
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
      x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Typewriter effect
const Typewriter = ({ 
  words, 
  className = '' 
}: { 
  words: string[]; 
  className?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className={styles.cursor}
      >
        |
      </motion.span>
    </span>
  );
};

// Infinite marquee
const Marquee = ({ children, speed = 20, direction = 'left' }: { 
  children: React.ReactNode; 
  speed?: number;
  direction?: 'left' | 'right';
}) => {
  return (
    <div className={styles.marqueeContainer}>
      <motion.div
        className={styles.marqueeTrack}
        animate={{ 
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

// Character wave animation on hover
const WaveText = ({ children, className = '' }: { children: string; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const chars = children.split('');

  return (
    <motion.span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'inline-flex' }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          animate={isHovered ? {
            y: [0, -20, 0],
            color: ['#ffffff', '#60a5fa', '#ffffff']
          } : { y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.03,
            ease: 'easeOut'
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Scramble text effect
const ScrambleText = ({ children, className = '' }: { children: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayText, setDisplayText] = useState(children);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    if (!isInView) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        children
          .split('')
          .map((_char, i) => {
            if (i < iteration) return children[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      iteration += 1/3;
      if (iteration >= children.length) {
        clearInterval(interval);
        setDisplayText(children);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, children]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
};

// Word rotate/flip component
const RotatingWords = ({ words, className = '' }: { words: string[]; className?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={`${styles.rotatingWordsContainer} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 50, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -50, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          className={styles.rotatingWord}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// Main navigation
const Nav = () => (
  <motion.nav
    className={styles.nav}
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className={styles.navContent}>
      <MagneticText className={styles.logo}>
        <WaveText>kinetic.</WaveText>
      </MagneticText>
      <div className={styles.navLinks}>
        {['Work', 'About', 'Contact'].map((item, i) => (
          <motion.a
            key={item}
            href="#"
            className={styles.navLink}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            {item}
          </motion.a>
        ))}
      </div>
    </div>
  </motion.nav>
);

// Hero section
const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={containerRef} className={styles.hero}>
      <motion.div className={styles.heroContent} style={{ opacity, y, scale }}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className={styles.badgeDot} />
          Typography in Motion
        </motion.div>
        
        <h1 className={styles.heroTitle}>
          <SplitText delay={0.6} stagger={0.04}>
            Words that
          </SplitText>
          <br />
          <span className={styles.accentLine}>
            <RotatingWords 
              words={['move', 'inspire', 'dance', 'connect']} 
              className={styles.rotatingAccent}
            />
          </span>
        </h1>

        <motion.p
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          We create <Typewriter words={['experiences', 'emotions', 'stories', 'impact']} className={styles.typewriter} />
          <br />
          through kinetic typography.
        </motion.p>

        <motion.div
          className={styles.heroCtas}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            className={styles.primaryBtn}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Project
            <motion.span
              className={styles.btnArrow}
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </motion.button>
          <motion.button
            className={styles.secondaryBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Reel
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};

// Marquee section
const MarqueeSection = () => (
  <section className={styles.marqueeSection}>
    <Marquee speed={25}>
      <span className={styles.marqueeText}>
        MOTION • TYPOGRAPHY • DESIGN • ANIMATION • KINETIC • CREATIVE • 
      </span>
    </Marquee>
    <Marquee speed={30} direction="right">
      <span className={styles.marqueeTextOutline}>
        STORYTELLING • IMPACT • BRAND • EXPERIENCE • VISUAL • DYNAMIC • 
      </span>
    </Marquee>
  </section>
);

// Services section
const ServicesSection = () => {
  const services = [
    {
      number: '01',
      title: 'Kinetic Branding',
      description: 'Transform static logos into living, breathing brand expressions that captivate and engage.'
    },
    {
      number: '02', 
      title: 'Motion Systems',
      description: 'Comprehensive animation guidelines that bring consistency and life to every touchpoint.'
    },
    {
      number: '03',
      title: 'Type Experiences',
      description: 'Interactive typography that responds, morphs, and creates memorable digital moments.'
    },
    {
      number: '04',
      title: 'Video & Titles',
      description: 'Cinematic title sequences and video typography that elevate your visual storytelling.'
    }
  ];

  return (
    <section className={styles.services}>
      <ScrollRevealText className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>What we do</span>
        <h2 className={styles.sectionTitle}>
          <ScrambleText>Services</ScrambleText>
        </h2>
      </ScrollRevealText>

      <div className={styles.servicesGrid}>
        {services.map((service, i) => (
          <motion.div
            key={service.number}
            className={styles.serviceCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
          >
            <span className={styles.serviceNumber}>{service.number}</span>
            <h3 className={styles.serviceTitle}>
              <WaveText>{service.title}</WaveText>
            </h3>
            <p className={styles.serviceDesc}>{service.description}</p>
            <motion.span 
              className={styles.serviceArrow}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Big statement section
const StatementSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = "Typography is the voice of design. When it moves, it speaks louder.".split(' ');

  return (
    <section ref={ref} className={styles.statement}>
      <p className={styles.statementText}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className={styles.statementWord}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: [0.215, 0.61, 0.355, 1]
            }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </p>
    </section>
  );
};

// Stats section
const StatsSection = () => {
  const stats = [
    { value: '150+', label: 'Projects Completed' },
    { value: '12', label: 'Years Experience' },
    { value: '40+', label: 'Global Clients' },
    { value: '8', label: 'Design Awards' }
  ];

  return (
    <section className={styles.stats}>
      {stats.map((stat, i) => (
        <ScrollRevealText key={stat.label} direction={i % 2 === 0 ? 'up' : 'down'}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        </ScrollRevealText>
      ))}
    </section>
  );
};

// Featured work section
const WorkSection = () => {
  const projects = [
    { title: 'Nike Motion', category: 'Brand Animation', image: 'https://picsum.photos/800/600?random=1' },
    { title: 'Spotify Wrapped', category: 'Type System', image: 'https://picsum.photos/800/600?random=2' },
    { title: 'Apple Events', category: 'Title Sequence', image: 'https://picsum.photos/800/600?random=3' }
  ];

  return (
    <section className={styles.work}>
      <ScrollRevealText className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Featured</span>
        <h2 className={styles.sectionTitle}>
          <ScrambleText>Selected Work</ScrambleText>
        </h2>
      </ScrollRevealText>

      <div className={styles.workGrid}>
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className={styles.workCard}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.7 }}
          >
            <motion.div 
              className={styles.workImageContainer}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img src={project.image} alt={project.title} className={styles.workImage} />
              <motion.div
                className={styles.workOverlay}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span>View Project →</span>
              </motion.div>
            </motion.div>
            <div className={styles.workInfo}>
              <span className={styles.workCategory}>{project.category}</span>
              <h3 className={styles.workTitle}>{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// CTA section
const CtaSection = () => (
  <section className={styles.cta}>
    <ScrollRevealText>
      <h2 className={styles.ctaTitle}>
        <SplitText type="words" stagger={0.08}>
          Ready to bring your words to life?
        </SplitText>
      </h2>
    </ScrollRevealText>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <motion.a
        href="#"
        className={styles.ctaButton}
        whileHover={{ scale: 1.05, backgroundColor: '#60a5fa' }}
        whileTap={{ scale: 0.95 }}
      >
        <WaveText>Let's Talk</WaveText>
      </motion.a>
    </motion.div>
  </section>
);

// Footer
const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerLeft}>
        <MagneticText className={styles.footerLogo}>kinetic.</MagneticText>
        <p className={styles.footerTagline}>Typography in motion since 2014</p>
      </div>
      <div className={styles.footerRight}>
        <div className={styles.footerColumn}>
          <h4>Connect</h4>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
        <div className={styles.footerColumn}>
          <h4>Contact</h4>
          <a href="#">hello@kinetic.design</a>
          <a href="#">+1 (555) 123-4567</a>
        </div>
      </div>
    </div>
    <div className={styles.footerBottom}>
      <Marquee speed={40}>
        <span className={styles.footerMarquee}>
          © 2026 Kinetic Design Studio • All Rights Reserved • Made with ♥ and lots of keyframes • 
        </span>
      </Marquee>
    </div>
  </footer>
);

// Main component
const KineticTypography = () => {
  return (
    <div className={styles.page}>
      <Nav />
      <Hero />
      <MarqueeSection />
      <ServicesSection />
      <StatementSection />
      <StatsSection />
      <WorkSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default KineticTypography;
