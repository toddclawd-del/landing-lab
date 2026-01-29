import { Link } from 'react-router-dom'

interface LandingPage {
  slug: string
  title: string
  inspiration: string
  date: string
}

const pages: LandingPage[] = [
  {
    slug: 'bento-grid',
    title: 'Bento Grid 2.0',
    inspiration: 'Interactive bento tiles with hover reveals, animated gradients, micro-interactions',
    date: '2026-01-29'
  },
  {
    slug: 'voodoo-bracket',
    title: 'Voodoo Bracket',
    inspiration: 'March Madness bracket picker with Voodoo Ranger beer branding',
    date: '2026-01-28'
  },
  {
    slug: 'sunny-side',
    title: 'Sunny Side Restaurant',
    inspiration: 'Warm, playful Denver brunch spot — fun colors, not crypto vibes',
    date: '2026-01-28'
  },
  {
    slug: 'kinetic-typography',
    title: 'Kinetic Typography',
    inspiration: 'Bold animated text with scroll-triggered motion',
    date: '2026-01-28'
  },
  {
    slug: 'vercel-minimal',
    title: 'Vercel Minimal',
    inspiration: 'Clean light theme with prism gradient hero — Vercel style',
    date: '2026-01-27'
  },
  {
    slug: 'aurora-mesh',
    title: 'Aurora Mesh',
    inspiration: 'SaaS landing with animated aurora background',
    date: '2026-01-27'
  }
]

export function Home() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Landing Lab</h1>
        <p style={styles.subtitle}>Recreating beautiful landing pages to study the craft</p>
      </header>
      
      <div style={styles.grid}>
        {pages.map((page) => (
          <Link key={page.slug} to={`/${page.slug}`} style={styles.card}>
            <div style={styles.cardContent}>
              <span style={styles.date}>{page.date}</span>
              <h2 style={styles.cardTitle}>{page.title}</h2>
              <p style={styles.cardDesc}>{page.inspiration}</p>
            </div>
            <div style={styles.arrow}>→</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#fff',
    fontFamily: 'Inter, -apple-system, sans-serif',
    padding: '4rem 2rem'
  },
  header: {
    maxWidth: '800px',
    margin: '0 auto 4rem',
    textAlign: 'center'
  },
  title: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: 'rgba(255,255,255,0.6)'
  },
  grid: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#fff',
    transition: 'all 0.2s ease'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  date: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'monospace'
  },
  cardTitle: {
    fontSize: '1.35rem',
    fontWeight: 600
  },
  cardDesc: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.6)'
  },
  arrow: {
    fontSize: '1.5rem',
    color: 'rgba(255,255,255,0.4)'
  }
}
