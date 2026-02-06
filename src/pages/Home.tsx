import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  FlaskConical, Palette, Building2, Droplets, Type, Zap, Magnet, ArrowLeftRight,
  Image, Hash, Grid3x3, ScrollText, Layers, Pin, Sparkles, Square, Waves,
  RotateCcw, LayoutGrid, Trophy, Egg, Mountain, Triangle, ArrowDown,
  Github, Heart, CircleDot
} from 'lucide-react'

// Color System from design proposal
const colors = {
  bg: '#000000',
  surface: '#0a0a0a',
  card: '#1a1a1a',
  border: 'rgba(255,255,255,0.1)',
  borderHover: '#60A5FA',
  accentBlue: '#60A5FA',
  accentPink: '#F472B6',
  text: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.7)',
  textMuted: 'rgba(255,255,255,0.5)',
}

interface LandingPage {
  slug: string
  title: string
  inspiration: string
  date: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  featured?: boolean
}

const pages: LandingPage[] = [
  // Latest Landing Page
  {
    slug: 'surveillance-thermal',
    title: 'Surveillance Thermal',
    inspiration: 'Thermal heatmap design — infrared gradients, CCTV grid overlays, tracking boxes, data anxiety aesthetic, VANTA systems',
    date: '2026-02-06',
    icon: CircleDot,
    featured: true
  },
  {
    slug: 'neo-deco',
    title: 'Neo Deco',
    inspiration: 'Art Deco revival — gold gradients, geometric patterns, luxury serif typography, sunburst motifs, The Meridian hotel',
    date: '2026-02-05',
    icon: Triangle,
  },
  {
    slug: 'claymorphism',
    title: 'Claymorphism',
    inspiration: 'Soft 3D clay-like UI with inner/outer shadows, pastel palette, playful productivity SaaS',
    date: '2026-02-01',
    icon: Palette,
  },
  {
    slug: 'creative-agency',
    title: 'Creative Agency',
    inspiration: 'Dark minimal design studio — GSAP parallax hero, work showcase, magnetic buttons, smooth scroll',
    date: '2026-01-31',
    icon: Building2
  },
  {
    slug: 'liquid-motion',
    title: 'Liquid Motion',
    inspiration: 'Fluid design with morphing blobs, liquid hover effects, metaball cursors, organic UI',
    date: '2026-01-31',
    icon: Droplets
  },
  // GSAP Interaction Modules
  {
    slug: 'text-reveal',
    title: 'Text Reveal',
    inspiration: 'GSAP Module: 6 text animation techniques — character, word, line reveals, scramble, clip-path',
    date: '2026-01-30',
    icon: Type
  },
  {
    slug: 'scroll-velocity',
    title: 'Scroll Velocity',
    inspiration: 'GSAP Module: Velocity-based effects — text skew, responsive marquee, stretch/squash, momentum',
    date: '2026-01-30',
    icon: Zap
  },
  {
    slug: 'magnetic-buttons',
    title: 'Magnetic Buttons',
    inspiration: 'GSAP Module: Magnetic cursor interactions — buttons, nav, elastic snap-back, fleeing particles',
    date: '2026-01-30',
    icon: Magnet
  },
  {
    slug: 'horizontal-scroll',
    title: 'Horizontal Scroll',
    inspiration: 'GSAP Module: Pinned horizontal galleries — filmstrip, stacking cards, progress indicators',
    date: '2026-01-30',
    icon: ArrowLeftRight
  },
  {
    slug: 'image-reveal',
    title: 'Image Reveal',
    inspiration: 'GSAP Module: Image reveal effects — clip-path wipes, blur, parallax zoom, before/after',
    date: '2026-01-30',
    icon: Image
  },
  {
    slug: 'counter-animations',
    title: 'Counter Animations',
    inspiration: 'GSAP Module: Number animations — slot machine, odometer, scroll-linked, staggered stats',
    date: '2026-01-30',
    icon: Hash
  },
  {
    slug: 'stagger-grids',
    title: 'Stagger Grids',
    inspiration: 'GSAP Module: Grid animations — cascade reveals, ripple hover, shuffle, wave patterns',
    date: '2026-01-30',
    icon: Grid3x3
  },
  {
    slug: 'scroll-progress',
    title: 'Scroll Progress',
    inspiration: 'GSAP Module: Progress indicators — horizontal bar, circular, section dots, timeline',
    date: '2026-01-30',
    icon: ScrollText
  },
  {
    slug: 'parallax-layers',
    title: 'Parallax Layers',
    inspiration: 'GSAP Module: Advanced parallax — multi-layer depth, mouse parallax, 3D perspective',
    date: '2026-01-30',
    icon: Layers
  },
  {
    slug: 'pinned-sections',
    title: 'Pinned Sections',
    inspiration: 'GSAP Module: ScrollTrigger pinning — content swap, card stacking, step-by-step reveal',
    date: '2026-01-30',
    icon: Pin
  },
  {
    slug: 'elastic-effects',
    title: 'Elastic Effects',
    inspiration: 'GSAP Module: Bouncy physics — elastic buttons, jelly text, spring nav, rubber band',
    date: '2026-01-30',
    icon: CircleDot
  },
  // Landing Page Templates
  {
    slug: 'neo-brutalism',
    title: 'Neo-Brutalism',
    inspiration: 'Bold, unapologetic design with hard shadows, clashing colors, and chunky typography',
    date: '2026-01-30',
    icon: Square
  },
  {
    slug: 'domain-warp',
    title: 'Domain Warp',
    inspiration: 'Scandinavian clean SaaS landing with organic domain warping shader background',
    date: '2026-01-29',
    icon: Waves
  },
  {
    slug: 'cylinder-text',
    title: 'Cylinder Text',
    inspiration: '3D rotating text cylinder with scroll-driven animation — creative studio showcase',
    date: '2026-01-29',
    icon: RotateCcw
  },
  {
    slug: 'bento-grid',
    title: 'Bento Grid 2.0',
    inspiration: 'Interactive bento tiles with hover reveals, animated gradients, micro-interactions',
    date: '2026-01-29',
    icon: LayoutGrid
  },
  {
    slug: 'voodoo-bracket',
    title: 'Voodoo Bracket',
    inspiration: 'March Madness bracket picker with Voodoo Ranger beer branding',
    date: '2026-01-28',
    icon: Trophy
  },
  {
    slug: 'sunny-side',
    title: 'Sunny Side Restaurant',
    inspiration: 'Warm, playful Denver brunch spot — fun colors, not crypto vibes',
    date: '2026-01-28',
    icon: Egg
  },
  {
    slug: 'kinetic-typography',
    title: 'Kinetic Typography',
    inspiration: 'Bold animated text with scroll-triggered motion',
    date: '2026-01-28',
    icon: Type
  },
  {
    slug: 'vercel-minimal',
    title: 'Vercel Minimal',
    inspiration: 'Clean light theme with prism gradient hero — Vercel style',
    date: '2026-01-27',
    icon: Triangle
  },
  {
    slug: 'aurora-mesh',
    title: 'Aurora Mesh',
    inspiration: 'SaaS landing with animated aurora background',
    date: '2026-01-27',
    icon: Mountain
  }
]

// Card component with hover state
function PageCard({ page }: { page: LandingPage }) {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = page.icon
  
  return (
    <Link 
      to={`/${page.slug}`} 
      style={{
        ...styles.card,
        background: isHovered ? colors.card : colors.card,
        borderColor: isHovered ? colors.accentBlue : colors.border,
        transform: isHovered ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
        boxShadow: isHovered 
          ? `0 20px 40px -10px rgba(0,0,0,0.5), 0 0 30px ${colors.accentBlue}20`
          : '0 4px 12px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {page.featured && (
        <div style={styles.featuredBadge}>
          <Sparkles size={12} style={{ marginRight: 4 }} /> Latest
        </div>
      )}
      <div style={{
        ...styles.cardIcon,
        color: isHovered ? colors.accentBlue : colors.textSecondary,
      }}>
        <IconComponent size={32} />
      </div>
      <div style={styles.cardContent}>
        <span style={styles.date}>{page.date}</span>
        <h2 style={{
          ...styles.cardTitle,
          color: isHovered ? colors.accentBlue : colors.text,
        }}>{page.title}</h2>
        <p style={styles.cardDesc}>{page.inspiration}</p>
      </div>
      <div style={{
        ...styles.arrow,
        color: isHovered ? colors.accentBlue : colors.textMuted,
        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
      }}>→</div>
    </Link>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: colors.bg,
    color: colors.text,
    fontFamily: 'Inter, -apple-system, sans-serif',
  },
  
  // Hero Section
  header: {
    padding: '6rem 2rem 4rem',
    textAlign: 'center',
    background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.surface} 100%)`,
    borderBottom: `1px solid ${colors.border}`,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  logoIcon: {
    color: colors.accentBlue,
  },
  logoText: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    background: `linear-gradient(135deg, ${colors.text}, ${colors.accentBlue})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  tagline: {
    fontSize: '1.25rem',
    color: colors.textSecondary,
    maxWidth: '500px',
    margin: '0 auto 2rem',
  },
  cta: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1.75rem',
    background: colors.accentBlue,
    color: colors.text,
    borderRadius: '12px',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.2s ease-out',
    boxShadow: `0 4px 12px ${colors.accentBlue}40`,
  },
  
  // Gallery Section
  gallerySection: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 700,
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: '1rem',
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: '3rem',
  },
  
  // Card Grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem',
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '16px',
    textDecoration: 'none',
    color: colors.text,
    transition: 'all 0.2s ease-out',
    position: 'relative',
    overflow: 'hidden',
  },
  featuredBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.25rem 0.75rem',
    background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPink})`,
    borderRadius: '50px',
    fontSize: '0.75rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: '1rem',
    transition: 'color 0.2s ease-out',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: 1,
  },
  date: {
    fontSize: '0.8rem',
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    transition: 'color 0.2s ease-out',
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: colors.textSecondary,
    lineHeight: 1.5,
  },
  arrow: {
    fontSize: '1.25rem',
    marginTop: '1rem',
    alignSelf: 'flex-end',
    transition: 'all 0.2s ease-out',
  },
  
  // Footer
  footer: {
    padding: '3rem 2rem',
    background: colors.surface,
    borderTop: `1px solid ${colors.border}`,
    marginTop: '4rem',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  footerBrand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '0.75rem',
  },
  footerLogo: {
    color: colors.accentBlue,
  },
  footerCredits: {
    color: colors.textMuted,
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  footerLinks: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
  },
  footerLink: {
    color: colors.textSecondary,
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease-out',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  footerDivider: {
    color: colors.textMuted,
  },
}

// Main Home component with responsive grid
export function Home() {
  return (
    <div style={styles.container}>
      <style>{`
        .landing-lab-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .landing-lab-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .landing-lab-grid {
            grid-template-columns: 1fr;
          }
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px ${colors.accentBlue}50;
        }
        .footer-link:hover {
          color: ${colors.accentBlue};
        }
      `}</style>
      
      {/* Hero Section */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}><FlaskConical size={40} /></span>
          <span style={styles.logoText}>Landing Lab</span>
        </div>
        <p style={styles.tagline}>
          Recreating beautiful landing pages to study the craft
        </p>
        <div style={styles.cta}>
          <a href="#gallery" className="cta-button" style={styles.ctaButton}>
            Explore Demos <ArrowDown size={18} />
          </a>
        </div>
      </header>
      
      {/* Gallery Section */}
      <section id="gallery" style={styles.gallerySection}>
        <h2 style={styles.sectionTitle}>Gallery</h2>
        <p style={styles.sectionSubtitle}>
          {pages.length} interactive experiments and landing page recreations
        </p>
        
        <div className="landing-lab-grid">
          {pages.map((page) => (
            <PageCard key={page.slug} page={page} />
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <span style={styles.footerLogo}><FlaskConical size={24} /></span>
            <span>Landing Lab</span>
          </div>
          <p style={styles.footerCredits}>
            Built with React, TypeScript, Framer Motion, and GSAP
          </p>
          <div style={styles.footerLinks}>
            <a 
              href="https://github.com/toddclawd-del/landing-lab" 
              className="footer-link"
              style={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} /> GitHub
            </a>
            <span style={styles.footerDivider}>•</span>
            <span style={styles.footerLink}>
              Made with <Heart size={14} style={{ color: colors.accentPink }} /> in Denver
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
