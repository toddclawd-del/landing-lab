import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'

// ============================================
// ARCHIVAL INDEX - Museum Catalog Aesthetic
// ============================================
// A design that treats projects like artifacts worth studying.
// Numbered specimens, editorial typography, catalog-style layouts.

// ============================================
// TYPOGRAPHY & COLORS
// ============================================
const fonts = {
  serif: '"Playfair Display", Georgia, serif',
  mono: '"JetBrains Mono", "SF Mono", monospace',
  sans: '"Inter", -apple-system, sans-serif',
}

const colors = {
  cream: '#FAF8F5',
  paper: '#F5F2ED',
  ink: '#1A1915',
  inkLight: '#4A4840',
  inkMuted: '#8A8678',
  accent: '#C4A574', // warm gold
  accentDark: '#96785A',
  border: '#E5E0D8',
  borderDark: '#D4CEC3',
}

// ============================================
// PAPER TEXTURE OVERLAY
// ============================================
const PaperTexture = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
)

// ============================================
// NAVIGATION
// ============================================
const Nav = () => {
  const [scrolled, setScrolled] = useState(false)

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 50)
    })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? `${colors.cream}F0` : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${colors.border}` : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: fonts.serif, fontSize: 20, fontWeight: 600, color: colors.ink }}>
          Archive
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.inkMuted, letterSpacing: '0.05em' }}>
          est. 2019
        </span>
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {['Collection', 'Index', 'About', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href="#"
            whileHover={{ y: -2 }}
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.inkLight,
              textDecoration: 'none',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {item}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  )
}

// ============================================
// HERO SECTION
// ============================================
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '120px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative catalog number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          position: 'absolute',
          top: 120,
          left: 48,
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.inkMuted,
          letterSpacing: '0.1em',
        }}
      >
        CAT. NO. 001—2026
      </motion.div>

      <motion.div style={{ y, opacity }} className="hero-content">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.accent,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 24,
            textAlign: 'center',
          }}
        >
          Design Archive & Collection
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontFamily: fonts.serif,
            fontSize: 'clamp(48px, 10vw, 120px)',
            fontWeight: 400,
            color: colors.ink,
            textAlign: 'center',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: 32,
          }}
        >
          Documenting
          <br />
          <span style={{ fontStyle: 'italic' }}>the craft</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontFamily: fonts.sans,
            fontSize: 18,
            color: colors.inkLight,
            textAlign: 'center',
            maxWidth: 480,
            lineHeight: 1.6,
            marginBottom: 48,
          }}
        >
          A curated collection of design work, processes, and artifacts—
          documented with care and organized with intention.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ display: 'flex', gap: 16 }}
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '16px 32px',
              background: colors.ink,
              color: colors.cream,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Browse Collection
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '16px 32px',
              background: 'transparent',
              color: colors.ink,
              border: `1px solid ${colors.borderDark}`,
              cursor: 'pointer',
            }}
          >
            View Index
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 48,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.inkMuted, letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: 1,
            height: 32,
            background: colors.inkMuted,
          }}
        />
      </motion.div>
    </section>
  )
}

// ============================================
// SPECIMEN CARD (Core Component)
// ============================================
interface SpecimenCardProps {
  number: string
  title: string
  category: string
  year: string
  description: string
  imageUrl: string
  index: number
}

const SpecimenCard = ({ number, title, category, year, description, imageUrl, index }: SpecimenCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/5',
          overflow: 'hidden',
          background: colors.paper,
          border: `1px solid ${colors.border}`,
          marginBottom: 16,
        }}
      >
        <motion.img
          src={imageUrl}
          alt={title}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Catalog number overlay */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            fontFamily: fonts.mono,
            fontSize: 10,
            color: colors.cream,
            background: colors.ink,
            padding: '4px 8px',
            letterSpacing: '0.1em',
          }}
        >
          {number}
        </div>
        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 16,
                background: 'linear-gradient(to top, rgba(26,25,21,0.9), transparent)',
              }}
            >
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 13,
                  color: colors.cream,
                  lineHeight: 1.5,
                }}
              >
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Meta info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            color: colors.accent,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {category}
        </span>
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            color: colors.inkMuted,
            letterSpacing: '0.05em',
          }}
        >
          {year}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: fonts.serif,
          fontSize: 18,
          fontWeight: 500,
          color: colors.ink,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
    </motion.div>
  )
}

// ============================================
// COLLECTION SECTION
// ============================================
const specimens = [
  {
    number: 'SP-001',
    title: 'Botanical Studies',
    category: 'Print',
    year: '2024',
    description: 'A series of detailed botanical illustrations exploring the intersection of nature and geometric form.',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=750&fit=crop',
  },
  {
    number: 'SP-002',
    title: 'Type Specimen Vol. I',
    category: 'Typography',
    year: '2024',
    description: 'Custom typeface development documenting the evolution from sketch to final letterform.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=750&fit=crop',
  },
  {
    number: 'SP-003',
    title: 'Material Archive',
    category: 'Object',
    year: '2023',
    description: 'A collection of textures, materials, and samples gathered from studio explorations.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=750&fit=crop',
  },
  {
    number: 'SP-004',
    title: 'Grid Systems',
    category: 'Editorial',
    year: '2023',
    description: 'Documentation of modular grid systems and their application across various media.',
    imageUrl: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=600&h=750&fit=crop',
  },
  {
    number: 'SP-005',
    title: 'Color Index',
    category: 'Research',
    year: '2024',
    description: 'An ongoing study of color relationships, palettes, and their psychological effects.',
    imageUrl: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=600&h=750&fit=crop',
  },
  {
    number: 'SP-006',
    title: 'Form Studies',
    category: 'Sculpture',
    year: '2024',
    description: 'Three-dimensional explorations of balance, tension, and negative space.',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=750&fit=crop',
  },
]

const CollectionSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 48px',
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              color: colors.inkMuted,
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: 12,
            }}
          >
            SELECTED WORKS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 400,
              color: colors.ink,
              lineHeight: 1.1,
            }}
          >
            The Collection
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.inkMuted,
            letterSpacing: '0.05em',
          }}
        >
          {specimens.length} items cataloged
        </motion.div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 48,
        }}
      >
        {specimens.map((specimen, index) => (
          <SpecimenCard key={specimen.number} {...specimen} index={index} />
        ))}
      </div>
    </section>
  )
}

// ============================================
// INDEX TABLE SECTION
// ============================================
const indexItems = [
  { id: '001', name: 'Botanical Studies', type: 'Print', date: '2024.01.15', status: 'Archived' },
  { id: '002', name: 'Type Specimen Vol. I', type: 'Typography', date: '2024.02.28', status: 'Active' },
  { id: '003', name: 'Material Archive', type: 'Object', date: '2023.11.10', status: 'Archived' },
  { id: '004', name: 'Grid Systems', type: 'Editorial', date: '2023.08.22', status: 'Archived' },
  { id: '005', name: 'Color Index', type: 'Research', date: '2024.03.05', status: 'Active' },
  { id: '006', name: 'Form Studies', type: 'Sculpture', date: '2024.04.12', status: 'Active' },
  { id: '007', name: 'Motion Principles', type: 'Animation', date: '2024.05.01', status: 'In Progress' },
  { id: '008', name: 'Sound Design Notes', type: 'Audio', date: '2024.05.18', status: 'In Progress' },
]

const IndexSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 48px',
        background: colors.paper,
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: 48 }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.inkMuted,
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: 12,
          }}
        >
          FULL CATALOG
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: fonts.serif,
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 400,
            color: colors.ink,
            lineHeight: 1.1,
          }}
        >
          Index
        </motion.h2>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${colors.borderDark}` }}>
              {['No.', 'Title', 'Type', 'Date', 'Status'].map((header) => (
                <th
                  key={header}
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    color: colors.inkMuted,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textAlign: 'left',
                    padding: '12px 16px 12px 0',
                    fontWeight: 500,
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {indexItems.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  cursor: 'pointer',
                }}
                whileHover={{ background: colors.cream }}
              >
                <td
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    color: colors.inkMuted,
                    padding: '20px 16px 20px 0',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.id}
                </td>
                <td
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 16,
                    color: colors.ink,
                    padding: '20px 16px 20px 0',
                  }}
                >
                  {item.name}
                </td>
                <td
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    color: colors.accent,
                    padding: '20px 16px 20px 0',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.type}
                </td>
                <td
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    color: colors.inkMuted,
                    padding: '20px 16px 20px 0',
                  }}
                >
                  {item.date}
                </td>
                <td
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    color: item.status === 'Active' ? '#4A7C59' : item.status === 'In Progress' ? colors.accent : colors.inkMuted,
                    padding: '20px 0',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.status}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ============================================
// ABOUT SECTION
// ============================================
const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 48px',
        borderTop: `1px solid ${colors.border}`,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 32,
      }}
    >
      {/* Left column */}
      <div style={{ gridColumn: 'span 4' }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.inkMuted,
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: 12,
          }}
        >
          ABOUT THE ARCHIVE
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: fonts.serif,
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400,
            color: colors.ink,
            lineHeight: 1.2,
          }}
        >
          A dedication
          <br />
          <span style={{ fontStyle: 'italic' }}>to process</span>
        </motion.h2>
      </div>

      {/* Right column */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ gridColumn: 'span 6', gridColumnStart: 7 }}
      >
        <p
          style={{
            fontFamily: fonts.sans,
            fontSize: 17,
            color: colors.inkLight,
            lineHeight: 1.8,
            marginBottom: 24,
          }}
        >
          This archive exists to document the creative process—not just the finished work, 
          but the explorations, experiments, and iterations that lead to it. Each entry is 
          cataloged with the same care one might give to a museum artifact.
        </p>
        <p
          style={{
            fontFamily: fonts.sans,
            fontSize: 17,
            color: colors.inkLight,
            lineHeight: 1.8,
            marginBottom: 32,
          }}
        >
          We believe that documenting craft creates a deeper appreciation for it. That 
          organizing with intention reveals connections. And that treating every project 
          as worthy of preservation honors the work itself.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48 }}>
          {[
            { value: '127', label: 'Items Cataloged' },
            { value: '6', label: 'Active Projects' },
            { value: '2019', label: 'Year Founded' },
          ].map((stat, index) => (
            <div key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              >
                <div
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 36,
                    color: colors.ink,
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    color: colors.inkMuted,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ============================================
// NEWSLETTER/CONTACT SECTION
// ============================================
const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 48px',
        background: colors.ink,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.inkMuted,
          letterSpacing: '0.1em',
          marginBottom: 24,
        }}
      >
        STAY INFORMED
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          color: colors.cream,
          lineHeight: 1.2,
          marginBottom: 16,
        }}
      >
        Join the catalog
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontFamily: fonts.sans,
          fontSize: 16,
          color: colors.inkMuted,
          maxWidth: 400,
          marginBottom: 32,
          lineHeight: 1.6,
        }}
      >
        Receive updates when new work is added to the archive.
        No spam—just documentation.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ display: 'flex', gap: 12, maxWidth: 400, width: '100%' }}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="your@email.com"
          style={{
            flex: 1,
            fontFamily: fonts.mono,
            fontSize: 13,
            padding: '14px 16px',
            background: 'transparent',
            border: `1px solid ${colors.inkMuted}`,
            color: colors.cream,
            outline: 'none',
          }}
        />
        <motion.button
          whileHover={{ background: colors.cream, color: colors.ink }}
          whileTap={{ scale: 0.98 }}
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '14px 24px',
            background: colors.accent,
            color: colors.ink,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Subscribe
        </motion.button>
      </motion.form>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  return (
    <footer
      style={{
        padding: '48px',
        borderTop: `1px solid ${colors.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: fonts.serif, fontSize: 18, fontWeight: 600, color: colors.ink }}>
          Archive
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.inkMuted, letterSpacing: '0.05em' }}>
          © 2026
        </span>
      </div>

      <div style={{ display: 'flex', gap: 32 }}>
        {['Twitter', 'Instagram', 'LinkedIn', 'Behance'].map((link) => (
          <motion.a
            key={link}
            href="#"
            whileHover={{ color: colors.accent }}
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              color: colors.inkMuted,
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'color 0.3s ease',
            }}
          >
            {link}
          </motion.a>
        ))}
      </div>

      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          color: colors.inkMuted,
          letterSpacing: '0.05em',
        }}
      >
        CAT. NO. 2026.02.02
      </div>
    </footer>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ArchivalIndex() {
  return (
    <div
      style={{
        background: colors.cream,
        minHeight: '100vh',
        fontFamily: fonts.sans,
      }}
    >
      <PaperTexture />
      <Nav />
      <Hero />
      <CollectionSection />
      <IndexSection />
      <AboutSection />
      <ContactSection />
      <Footer />

      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background: ${colors.accent};
          color: ${colors.cream};
        }
        
        input::placeholder {
          color: ${colors.inkMuted};
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          
          nav {
            padding: 16px 24px !important;
          }
          
          nav > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
