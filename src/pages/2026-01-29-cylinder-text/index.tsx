import { CylinderText } from './components/CylinderText'

function CylinderTextPage() {
  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <a href="#" style={styles.logo}>
            <span style={styles.logoIcon}>◆</span>
            <span style={styles.logoText}>VERTEX</span>
          </a>
          <nav style={styles.nav}>
            <a href="#capabilities" style={styles.navLink}>Capabilities</a>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#contact" style={styles.ctaButton}>Get in Touch</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroTag}>
            <span style={styles.heroTagDot} />
            Now accepting projects for 2025
          </div>
          <h1 style={styles.heroTitle}>
            We craft digital
            <br />
            <span style={styles.heroTitleGradient}>experiences</span> that
            <br />
            captivate & convert
          </h1>
          <p style={styles.heroSubtitle}>
            VERTEX is a next-generation creative studio specializing in brand strategy,
            immersive design, and cutting-edge digital experiences for ambitious brands.
          </p>
          <div style={styles.heroButtons}>
            <a href="#capabilities" style={styles.heroPrimary}>
              Explore Our Work
              <span style={styles.arrow}>→</span>
            </a>
            <a href="#contact" style={styles.heroSecondary}>
              Start a Project
            </a>
          </div>
          <div style={styles.heroStats}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>150+</span>
              <span style={styles.statLabel}>Projects Delivered</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNumber}>12</span>
              <span style={styles.statLabel}>Years Experience</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNumber}>98%</span>
              <span style={styles.statLabel}>Client Satisfaction</span>
            </div>
          </div>
        </div>
        {/* Hero decorative elements */}
        <div style={styles.heroGradient} />
        <div style={styles.heroGridOverlay} />
      </section>

      {/* Scroll indicator */}
      <div style={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <div style={styles.scrollLine} />
      </div>

      {/* Cylinder Text Section */}
      <div id="capabilities">
        <CylinderText />
      </div>

      {/* Features Grid Section */}
      <section id="about" style={styles.features}>
        <div style={styles.featuresInner}>
          <div style={styles.featuresHeader}>
            <span style={styles.featuresLabel}>Why VERTEX</span>
            <h2 style={styles.featuresHeading}>
              Where vision meets precision
            </h2>
            <p style={styles.featuresSubtext}>
              We combine strategic thinking with flawless execution to deliver 
              digital experiences that elevate brands and drive measurable results.
            </p>
          </div>

          <div style={styles.grid}>
            {FEATURES.map((feature, index) => (
              <div key={index} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" style={styles.cta}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaHeading}>
            Ready to create something
            <br />
            <span style={styles.ctaGradient}>extraordinary?</span>
          </h2>
          <p style={styles.ctaText}>
            Let's discuss how we can bring your vision to life with immersive 
            digital experiences that leave lasting impressions.
          </p>
          <a href="mailto:hello@vertex.studio" style={styles.ctaButtonLarge}>
            Start Your Project
            <span style={styles.arrow}>→</span>
          </a>
        </div>
        <div style={styles.ctaOrb} />
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>
            <span style={styles.footerLogo}>◆ VERTEX</span>
            <p style={styles.footerTagline}>
              Crafting digital experiences that captivate and convert.
            </p>
          </div>
          <div style={styles.footerLinks}>
            <div style={styles.footerColumn}>
              <span style={styles.footerColTitle}>Services</span>
              <a href="#" style={styles.footerLink}>Brand Strategy</a>
              <a href="#" style={styles.footerLink}>Web Design</a>
              <a href="#" style={styles.footerLink}>3D & Motion</a>
              <a href="#" style={styles.footerLink}>Development</a>
            </div>
            <div style={styles.footerColumn}>
              <span style={styles.footerColTitle}>Company</span>
              <a href="#" style={styles.footerLink}>About</a>
              <a href="#" style={styles.footerLink}>Careers</a>
              <a href="#" style={styles.footerLink}>Contact</a>
            </div>
            <div style={styles.footerColumn}>
              <span style={styles.footerColTitle}>Connect</span>
              <a href="#" style={styles.footerLink}>Twitter</a>
              <a href="#" style={styles.footerLink}>LinkedIn</a>
              <a href="#" style={styles.footerLink}>Dribbble</a>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© 2025 VERTEX Studio. All rights reserved.</span>
          <span style={styles.footerCredits}>
            3D Cylinder effect by{' '}
            <a href="https://tympanus.net/codrops/" style={styles.footerCreditLink}>
              Codrops
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}

const FEATURES = [
  {
    icon: '◈',
    title: 'Strategic Foundation',
    description: 'We start with deep research and strategic thinking to ensure every design decision serves your business goals.',
  },
  {
    icon: '◇',
    title: 'Immersive Design',
    description: 'From 3D experiences to micro-interactions, we create interfaces that engage users on a deeper level.',
  },
  {
    icon: '△',
    title: 'Technical Excellence',
    description: 'Built with modern technologies and best practices for performance, accessibility, and scalability.',
  },
  {
    icon: '○',
    title: 'Seamless Collaboration',
    description: 'Transparent process with regular updates, so you always know exactly where your project stands.',
  },
]

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: '100vh',
    background: '#050505',
  },

  // Header
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '1.25rem 2rem',
    background: 'rgba(5, 5, 5, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  headerInner: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#ffffff',
  },
  logoIcon: {
    fontSize: '1.5rem',
    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoText: {
    fontSize: '1.125rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    color: '#ffffff',
    padding: '0.625rem 1.25rem',
    borderRadius: '100px',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 600,
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
  },

  // Hero
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8rem 2rem 4rem',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '900px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  heroTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(139, 92, 246, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    padding: '0.5rem 1rem',
    borderRadius: '100px',
    fontSize: '0.8125rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '2rem',
  },
  heroTagDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#22c55e',
    animation: 'pulse 2s infinite',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    color: '#ffffff',
    marginBottom: '1.5rem',
  },
  heroTitleGradient: {
    background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.7,
    maxWidth: '650px',
    margin: '0 auto 2.5rem',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '4rem',
  },
  heroPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    color: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: '100px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  heroSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'transparent',
    color: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: '100px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'border-color 0.2s, background 0.2s',
  },
  arrow: {
    transition: 'transform 0.2s',
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
  },
  statNumber: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.7))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statLabel: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  statDivider: {
    width: '1px',
    height: '40px',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  heroGradient: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120vw',
    height: '120vh',
    background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, rgba(236, 72, 153, 0.06) 40%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroGridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
  },

  // Scroll indicator
  scrollIndicator: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  scrollLine: {
    width: '1px',
    height: '40px',
    background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.6), transparent)',
  },

  // Features
  features: {
    padding: '8rem 2rem',
    background: '#050505',
    position: 'relative',
  },
  featuresInner: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featuresHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  featuresLabel: {
    display: 'inline-block',
    color: '#8b5cf6',
    fontSize: '0.8125rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  featuresHeading: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  },
  featuresSubtext: {
    fontSize: '1.125rem',
    color: 'rgba(255, 255, 255, 0.6)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.7,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '1rem',
    padding: '2rem',
    transition: 'transform 0.3s, border-color 0.3s, background 0.3s',
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '0.75rem',
  },
  featureDesc: {
    fontSize: '0.9375rem',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.6,
  },

  // CTA
  cta: {
    padding: '8rem 2rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 100%)',
  },
  ctaContent: {
    position: 'relative',
    zIndex: 2,
  },
  ctaHeading: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
  },
  ctaGradient: {
    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  ctaText: {
    fontSize: '1.125rem',
    color: 'rgba(255, 255, 255, 0.6)',
    maxWidth: '550px',
    margin: '0 auto 2.5rem',
    lineHeight: 1.7,
  },
  ctaButtonLarge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    color: '#ffffff',
    padding: '1.25rem 2.5rem',
    borderRadius: '100px',
    textDecoration: 'none',
    fontSize: '1.125rem',
    fontWeight: 600,
    boxShadow: '0 8px 40px rgba(139, 92, 246, 0.5)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  ctaOrb: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: '80vh',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  // Footer
  footer: {
    padding: '4rem 2rem 2rem',
    background: '#050505',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
  },
  footerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gap: '4rem',
    marginBottom: '3rem',
  },
  footerBrand: {
    maxWidth: '300px',
  },
  footerLogo: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '1rem',
    display: 'block',
  },
  footerTagline: {
    fontSize: '0.9375rem',
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: 1.6,
  },
  footerLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  footerColTitle: {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '0.5rem',
  },
  footerLink: {
    fontSize: '0.9375rem',
    color: 'rgba(255, 255, 255, 0.5)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  footerBottom: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.8125rem',
    color: 'rgba(255, 255, 255, 0.4)',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  footerCredits: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  footerCreditLink: {
    color: 'rgba(139, 92, 246, 0.7)',
    textDecoration: 'none',
  },
}

export default CylinderTextPage
