import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './styles.module.css';

// Animated gradient mesh background
const AuroraMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let time = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const gradientPoints = [
      { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, color: '#6366f1' },
      { x: 0.8, y: 0.2, vx: -0.0002, vy: 0.0003, color: '#8b5cf6' },
      { x: 0.5, y: 0.7, vx: 0.0002, vy: -0.0002, color: '#a855f7' },
      { x: 0.3, y: 0.8, vx: 0.0001, vy: -0.0001, color: '#ec4899' },
      { x: 0.7, y: 0.5, vx: -0.0003, vy: 0.0001, color: '#06b6d4' },
    ];
    
    const animate = () => {
      time += 1;
      
      // Update gradient points
      gradientPoints.forEach(point => {
        point.x += point.vx + Math.sin(time * 0.01) * 0.0001;
        point.y += point.vy + Math.cos(time * 0.01) * 0.0001;
        
        if (point.x < 0 || point.x > 1) point.vx *= -1;
        if (point.y < 0 || point.y > 1) point.vy *= -1;
        
        point.x = Math.max(0, Math.min(1, point.x));
        point.y = Math.max(0, Math.min(1, point.y));
      });
      
      // Clear with dark background
      ctx.fillStyle = '#030014';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw radial gradients
      gradientPoints.forEach(point => {
        const gradient = ctx.createRadialGradient(
          point.x * canvas.width,
          point.y * canvas.height,
          0,
          point.x * canvas.width,
          point.y * canvas.height,
          canvas.width * 0.5
        );
        
        gradient.addColorStop(0, point.color + '40');
        gradient.addColorStop(0.5, point.color + '10');
        gradient.addColorStop(1, 'transparent');
        
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className={styles.auroraCanvas} />;
};

// Grain overlay component
const GrainOverlay = () => (
  <div className={styles.grain} />
);

// Navigation
const Nav = () => (
  <motion.nav 
    className={styles.nav}
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className={styles.logo}>
      <span className={styles.logoIcon}>◈</span>
      <span>Lumina</span>
    </div>
    <div className={styles.navLinks}>
      <a href="#features">Features</a>
      <a href="#about">About</a>
      <a href="#pricing">Pricing</a>
      <motion.button 
        className={styles.navCta}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.button>
    </div>
  </motion.nav>
);

// Hero section
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section ref={ref} className={styles.hero}>
      <motion.div 
        className={styles.heroContent}
        style={{ y, opacity }}
      >
        <motion.div 
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className={styles.badgeDot} />
          Now in Public Beta
        </motion.div>
        
        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Design without
          <br />
          <span className={styles.gradient}>boundaries</span>
        </motion.h1>
        
        <motion.p 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          The next generation design platform that transforms your creative
          workflow with AI-powered tools and real-time collaboration.
        </motion.p>
        
        <motion.div 
          className={styles.heroCtas}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.button 
            className={styles.primaryCta}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
            <span className={styles.ctaArrow}>→</span>
          </motion.button>
          <motion.button 
            className={styles.secondaryCta}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>
        
        <motion.div 
          className={styles.heroStats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className={styles.stat}>
            <span className={styles.statNumber}>50K+</span>
            <span className={styles.statLabel}>Active Users</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>99.9%</span>
            <span className={styles.statLabel}>Uptime</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>4.9★</span>
            <span className={styles.statLabel}>Rating</span>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div 
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

// Feature card component
const FeatureCard = ({ icon, title, description, index }: { 
  icon: string; 
  title: string; 
  description: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div 
      ref={ref}
      className={styles.featureCard}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </motion.div>
  );
};

// Features section
const Features = () => {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'Built for speed with instant previews and zero lag editing experience.' },
    { icon: '🎨', title: 'AI Design Tools', description: 'Generate layouts, suggest colors, and create assets with AI assistance.' },
    { icon: '🔄', title: 'Real-time Sync', description: 'Collaborate with your team in real-time with instant updates.' },
    { icon: '🔒', title: 'Enterprise Security', description: 'Bank-level encryption and SOC 2 compliance for your data.' },
    { icon: '📱', title: 'Responsive Export', description: 'Export pixel-perfect designs for any device automatically.' },
    { icon: '🚀', title: 'One-Click Deploy', description: 'Push your designs to production with a single click.' },
  ];
  
  return (
    <section id="features" className={styles.features}>
      <div className={styles.sectionHeader}>
        <motion.span 
          className={styles.sectionTag}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Features
        </motion.span>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Everything you need to
          <br />
          <span className={styles.gradient}>create magic</span>
        </motion.h2>
      </div>
      
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

// Marquee text
const Marquee = () => {
  const words = ['DESIGN', 'CREATE', 'INNOVATE', 'TRANSFORM', 'BUILD', 'IMAGINE'];
  
  return (
    <div className={styles.marqueeWrapper}>
      <motion.div 
        className={styles.marquee}
        animate={{ x: [0, -1920] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...words, ...words].map((word, i) => (
          <span key={i} className={styles.marqueeWord}>
            {word}
            <span className={styles.marqueeDot}>◈</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Testimonial section
const Testimonials = () => {
  const testimonials = [
    { quote: "Lumina transformed how our team designs. We ship 3x faster now.", author: "Sarah Chen", role: "Design Lead, Stripe" },
    { quote: "The AI features are mind-blowing. It's like having a design assistant.", author: "Marcus Johnson", role: "Creative Director, Figma" },
    { quote: "Best investment we made for our design workflow this year.", author: "Elena Rodriguez", role: "VP Design, Airbnb" },
  ];
  
  const [active, setActive] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialsInner}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className={styles.testimonial}
            initial={false}
            animate={{ 
              opacity: active === i ? 1 : 0,
              scale: active === i ? 1 : 0.95,
              position: active === i ? 'relative' : 'absolute'
            }}
            transition={{ duration: 0.5 }}
          >
            <p className={styles.testimonialQuote}>"{t.quote}"</p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar}>{t.author[0]}</div>
              <div>
                <div className={styles.testimonialName}>{t.author}</div>
                <div className={styles.testimonialRole}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
        
        <div className={styles.testimonialDots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.testimonialDot} ${active === i ? styles.active : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA section
const CtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section ref={ref} className={styles.ctaSection}>
      <motion.div 
        className={styles.ctaContent}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.ctaTitle}>
          Ready to transform your
          <br />
          <span className={styles.gradient}>design workflow?</span>
        </h2>
        <p className={styles.ctaSubtitle}>
          Join 50,000+ designers who are already creating the future.
        </p>
        <motion.button 
          className={styles.ctaPrimary}
          whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(99, 102, 241, 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Free Trial
        </motion.button>
        <p className={styles.ctaNote}>No credit card required · 14-day free trial</p>
      </motion.div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerBrand}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◈</span>
          <span>Lumina</span>
        </div>
        <p className={styles.footerTagline}>Design without boundaries.</p>
      </div>
      
      <div className={styles.footerLinks}>
        <div className={styles.footerColumn}>
          <h4>Product</h4>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Changelog</a>
        </div>
        <div className={styles.footerColumn}>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
        </div>
        <div className={styles.footerColumn}>
          <h4>Resources</h4>
          <a href="#">Documentation</a>
          <a href="#">Support</a>
          <a href="#">API</a>
        </div>
      </div>
    </div>
    
    <div className={styles.footerBottom}>
      <p>© 2026 Lumina. All rights reserved.</p>
      <div className={styles.footerSocial}>
        <a href="#">𝕏</a>
        <a href="#">in</a>
        <a href="#">◉</a>
      </div>
    </div>
  </footer>
);

// Main component
export default function AuroraMeshLanding() {
  return (
    <div className={styles.container}>
      <AuroraMesh />
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
