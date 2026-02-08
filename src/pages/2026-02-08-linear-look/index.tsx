import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation, type Variants } from 'framer-motion'
import {
  Zap,
  Shield,
  GitBranch,
  Layers,
  Command,
  Sparkles,
  ArrowRight,
  Github,
  Twitter,
} from 'lucide-react'

// ============================================================================
// DESIGN TOKENS - The Linear Look Palette (Updated to match linear.app)
// ============================================================================

const colors = {
  bg: {
    base: '#08090A',           // was #0A0A0B - slightly darker
    elevated: '#262626',       // was #141417 - matches Linear
    surface: '#1C1C21',
  },
  text: {
    primary: '#F7F8F8',        // was #FAFAFA
    secondary: '#8A8F98',      // was #A1A1AA - Linear's actual gray
    tertiary: '#505050',       // was #52525B
  },
  border: {
    default: 'rgba(255, 255, 255, 0.06)',
    hover: 'rgba(255, 255, 255, 0.12)',
  },
  accent: '#5E6AD2',           // Linear's desaturated indigo (replaces vibrant purple)
  cta: {
    bg: '#E6E6E6',             // Off-white CTA button
    text: '#08090A',           // Dark text on light CTA
  },
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// ============================================================================
// SUBTLE AMBIENT GLOW (Much more restrained)
// ============================================================================

function AmbientGlow() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(94, 106, 210, 0.08) 0%, transparent 60%)`,
      }}
    />
  )
}

// ============================================================================
// SIMPLE CARD (No animated borders)
// ============================================================================

interface SimpleCardProps {
  children: React.ReactNode
  className?: string
  span?: 'default' | 'wide' | 'tall' | 'large'
}

function SimpleCard({ children, className = '', span = 'default' }: SimpleCardProps) {
  const spanClasses = {
    default: '',
    wide: 'md:col-span-2',
    tall: 'md:row-span-2',
    large: 'md:col-span-2 md:row-span-2',
  }

  return (
    <motion.div
      className={`relative group rounded-xl ${spanClasses[span]} ${className}`}
      variants={scaleIn}
    >
      <div
        className="rounded-xl p-6 h-full transition-colors duration-200"
        style={{
          background: `rgba(255, 255, 255, 0.02)`,
          border: `1px solid ${colors.border.default}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colors.border.hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = colors.border.default
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

// ============================================================================
// PRODUCT UI MOCK (Linear-style - LARGE and dominant like the real site)
// ============================================================================

function LargeProductScreenshot() {
  // Inbox items - left panel
  const inboxItems = [
    { id: 'ENG-135', title: 'Refactor sonic crawler', subtitle: 'nan assigned you', time: '2h', priority: 'urgent' },
    { id: 'LLM-001', title: 'LLM Chatbot', subtitle: 'New project update by raissa', time: '8h', priority: 'normal' },
    { id: 'ENG-159', title: 'Error uploading images via API', subtitle: 'SLA breached', time: '1d', priority: 'high' },
    { id: 'DES-498', title: 'Redesign users settings...', subtitle: 'karri mentioned you', time: '2d', priority: 'normal' },
    { id: 'ENG-160', title: 'Holtzmann engine is broken', subtitle: 'You asked to be reminded about this issue', time: '4d', priority: 'normal' },
  ]

  const priorityColors: Record<string, string> = {
    urgent: '#F97316',
    high: '#EF4444',
    normal: '#8A8F98',
  }

  return (
    <motion.div
      className="relative w-full mt-12 md:mt-16"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Wide container - extends beyond content width like Linear */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Subtle ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 20%, rgba(94, 106, 210, 0.08) 0%, transparent 70%)`,
            filter: 'blur(60px)',
            transform: 'translateY(40px)',
          }}
        />
        
        {/* Main app UI - mimics Linear's actual layout */}
        <div
          className="relative rounded-t-xl overflow-hidden"
          style={{
            background: '#1C1C21',
            boxShadow: '0 -20px 80px -20px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Two-panel layout like Linear */}
          <div className="flex min-h-[420px] md:min-h-[520px]">
            {/* Left sidebar - Inbox */}
            <div
              className="w-1/3 md:w-[320px] flex-shrink-0"
              style={{ borderRight: `1px solid ${colors.border.default}` }}
            >
              {/* Sidebar header */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: `1px solid ${colors.border.default}` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: colors.text.primary }}>Inbox</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <span className="text-xs" style={{ color: colors.text.tertiary }}>⌘</span>
                  </div>
                </div>
              </div>

              {/* Inbox items */}
              <div className="p-2">
                {inboxItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg mb-1"
                    style={{
                      background: idx === 0 ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                    }}
                  >
                    {/* Priority dot */}
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: priorityColors[item.priority] }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: colors.text.tertiary }}>{item.id}</span>
                        <span className="text-sm truncate" style={{ color: colors.text.primary }}>{item.title}</span>
                      </div>
                      <span className="text-xs" style={{ color: colors.text.tertiary }}>{item.subtitle}</span>
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: colors.text.tertiary }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel - Issue detail */}
            <div className="flex-1 p-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6 text-sm">
                <span style={{ color: colors.accent }}>⚙ Engineering</span>
                <span style={{ color: colors.text.tertiary }}>›</span>
                <span style={{ color: colors.text.secondary }}>🌾 Spice harvester</span>
                <span style={{ color: colors.text.tertiary }}>›</span>
                <span style={{ color: colors.text.tertiary }}>ENG-135</span>
              </div>

              {/* Issue title */}
              <h2
                className="text-2xl md:text-3xl mb-6"
                style={{ color: colors.text.primary, fontWeight: 510 }}
              >
                Refactor sonic crawler
              </h2>

              {/* Code snippet / comment preview */}
              <div
                className="rounded-lg p-4 mb-4"
                style={{
                  background: colors.bg.base,
                  border: `1px solid ${colors.border.default}`,
                }}
              >
                <p className="text-sm mb-3" style={{ color: colors.text.secondary }}>
                  <span style={{ color: colors.accent }}>Comment.documentContent</span> is defined wrongly. It should be a{' '}
                  <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'rgba(255,255,255,0.06)', color: '#F97316' }}>LazyManyToOne</code>
                </p>
                <pre className="text-xs overflow-x-auto" style={{ color: colors.text.tertiary }}>
                  <span style={{ color: colors.text.tertiary }}>{'/** The document content that this comment is associated with. */'}</span>{'\n'}
                  <span style={{ color: colors.accent }}>@ManyToOne</span>{'(() => DocumentContent,'}<span style={{ color: '#4ADE80' }}>{"'comments'"}</span>{', { optional: '}<span style={{ color: '#F97316' }}>true</span>{' })'}{'\n'}
                  <span style={{ color: colors.accent }}>public</span>{' documentContent?: DocumentContent;'}
                </pre>
              </div>

              <p className="text-sm" style={{ color: colors.text.secondary }}>
                We would be accessing <code className="px-1 py-0.5 rounded text-xs" style={{ background: 'rgba(255,255,255,0.06)' }}>CachedPromise{'<DocumentContent>'}</code>
                <br />
                property touch.
              </p>
            </div>
          </div>

          {/* Left nav rail - absolute positioned */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 hidden md:flex flex-col items-center py-4 gap-3"
            style={{
              background: '#161619',
              borderRight: `1px solid ${colors.border.default}`,
            }}
          >
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: colors.accent }}>
              <span className="text-xs text-white font-medium">L</span>
            </div>
            <div className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{ color: colors.text.tertiary }}>📥</div>
            <div className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{ color: colors.text.tertiary }}>📋</div>
            <div className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{ color: colors.text.tertiary }}>🗂</div>
            <div className="mt-auto w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: '#5E6AD2', color: 'white' }}>1</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// GRID BACKGROUND
// ============================================================================

function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 70%)',
      }}
    />
  )
}

// ============================================================================
// SECTION WRAPPER
// ============================================================================

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.section
      ref={ref}
      className={`py-20 md:py-28 ${className}`}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  )
}

// ============================================================================
// FEATURE DATA
// ============================================================================

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built on a modern stack optimized for speed. Every interaction feels instant.',
    span: 'default' as const,
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified. Your data is encrypted at rest and in transit.',
    span: 'default' as const,
  },
  {
    icon: GitBranch,
    title: 'Git-Native Workflow',
    description: 'Automatic sync with GitHub, GitLab, and Bitbucket. Branches become environments.',
    span: 'wide' as const,
  },
  {
    icon: Layers,
    title: 'Composable Architecture',
    description: 'Modular by design. Pick the features you need, leave the rest.',
    span: 'default' as const,
  },
  {
    icon: Command,
    title: 'Keyboard First',
    description: 'Power users rejoice. Every action has a shortcut. ⌘K opens everything.',
    span: 'default' as const,
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    description: 'Smart suggestions, auto-categorization, and predictive workflows that learn from your team.',
    span: 'wide' as const,
  },
]

// Customer logos placeholder
const customers = ['Vercel', 'Stripe', 'Figma', 'Notion', 'Linear', 'Raycast']

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function LinearLook() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: colors.bg.base,
        color: colors.text.primary,
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      {/* Accessibility: reduced motion support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ====================== NAV ====================== */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: `rgba(8, 9, 10, 0.8)`,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${colors.border.default}`,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: colors.accent,
              }}
            >
              <Command className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg tracking-tight" style={{ fontWeight: 510 }}>Linear</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Customers', 'Docs'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors duration-200"
                style={{ color: colors.text.secondary, fontWeight: 450 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.text.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.secondary)}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm hidden sm:block transition-colors duration-200"
              style={{ color: colors.text.secondary }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.text.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.secondary)}
            >
              Sign in
            </a>
            <button
              className="px-4 py-2 rounded-[10px] text-sm font-medium transition-opacity duration-200 hover:opacity-90"
              style={{
                background: colors.cta.bg,
                color: colors.cta.text,
              }}
            >
              Start Building
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ====================== HERO ====================== */}
      <section className="relative pt-32 pb-8 md:pt-44 md:pb-12 overflow-hidden">
        <GridBackground />
        <AmbientGlow />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* No badge/pill - Linear doesn't have announcements in hero */}

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6"
            style={{
              color: colors.text.primary,
              lineHeight: 1.15,
              fontWeight: 510,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Linear is a purpose-built tool for
            <br />
            planning and building products
          </motion.h1>

          <motion.p
            className="text-base md:text-lg max-w-xl mx-auto mb-8"
            style={{ color: colors.text.secondary, lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Meet the system for modern software development.
            <br />
            Streamline issues, projects, and product roadmaps.
          </motion.p>

          <motion.div
            className="flex flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Primary CTA - Light button (Linear style) */}
            <button
              className="px-5 py-2.5 rounded-lg font-medium transition-opacity duration-200 hover:opacity-90"
              style={{
                background: colors.cta.bg,
                color: colors.cta.text,
                fontSize: '15px',
              }}
            >
              Start building
            </button>

            {/* Secondary - Plain text link with arrow (NOT a styled button) */}
            <a
              href="#"
              className="flex items-center gap-1.5 transition-colors duration-200"
              style={{
                color: colors.text.primary,
                fontSize: '15px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.text.secondary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.primary)}
            >
              New: Linear Reviews (Beta)
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Product Screenshot - LARGE and dominant like Linear's */}
        <LargeProductScreenshot />
      </section>

      {/* ====================== CUSTOMER LOGOS (Replaces stats bar) ====================== */}
      <Section>
        <motion.div
          className="max-w-5xl mx-auto px-6"
          variants={fadeInUp}
        >
          <p
            className="text-sm text-center mb-8"
            style={{ color: colors.text.tertiary }}
          >
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {customers.map((name) => (
              <span
                key={name}
                className="text-lg font-medium"
                style={{ color: colors.text.tertiary }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ====================== FEATURES ====================== */}
      <Section>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2
              className="text-3xl md:text-4xl tracking-tight mb-4"
              style={{ fontWeight: 510, letterSpacing: '-0.02em' }}
            >
              Everything you need to ship faster
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.text.secondary }}>
              A complete toolkit designed for modern development teams.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={staggerContainer}
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <SimpleCard key={feature.title} span={feature.span}>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: `rgba(94, 106, 210, 0.1)`,
                      border: `1px solid rgba(94, 106, 210, 0.15)`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: colors.accent }} />
                  </div>
                  <h3
                    className="text-lg mb-2"
                    style={{ fontWeight: 510 }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: colors.text.secondary, lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </SimpleCard>
              )
            })}
          </motion.div>
        </div>
      </Section>

      {/* ====================== SHOWCASE CARD ====================== */}
      <Section>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="relative rounded-xl overflow-hidden"
            style={{
              background: colors.bg.elevated,
              border: `1px solid ${colors.border.default}`,
            }}
            variants={scaleIn}
          >
            <div className="relative p-8 md:p-12">
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3
                    className="text-2xl md:text-3xl mb-4 tracking-tight"
                    style={{ fontWeight: 510, letterSpacing: '-0.02em' }}
                  >
                    Built for developers,
                    <br />
                    loved by teams
                  </h3>
                  <p className="mb-6" style={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                    Every feature is designed with keyboard shortcuts, API access, and
                    extensibility in mind. Integrate with your existing tools seamlessly.
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      className="px-4 py-2 rounded-[10px] text-sm font-medium transition-colors duration-200"
                      style={{
                        background: colors.bg.surface,
                        border: `1px solid ${colors.border.hover}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = colors.text.tertiary
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = colors.border.hover
                      }}
                    >
                      Read Documentation
                    </button>
                    <a
                      href="#"
                      className="text-sm flex items-center gap-1 transition-opacity duration-200 hover:opacity-80"
                      style={{ color: colors.accent }}
                    >
                      API Reference <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                {/* Code snippet mock */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: colors.bg.base,
                    border: `1px solid ${colors.border.default}`,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '14px',
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
                  </div>
                  <pre style={{ color: colors.text.secondary }}>
                    <span style={{ color: colors.accent }}>import</span> {'{'} Linear {'}'}{' '}
                    <span style={{ color: colors.accent }}>from</span>{' '}
                    <span style={{ color: '#4ADE80' }}>'@linear/sdk'</span>
                    {'\n\n'}
                    <span style={{ color: colors.accent }}>const</span> client ={' '}
                    <span style={{ color: colors.accent }}>new</span>{' '}
                    <span style={{ color: colors.text.primary }}>Linear</span>
                    {'({ apiKey })'}
                    {'\n\n'}
                    <span style={{ color: colors.text.tertiary }}>// Create an issue</span>
                    {'\n'}
                    <span style={{ color: colors.accent }}>await</span> client.
                    <span style={{ color: colors.text.primary }}>createIssue</span>
                    {'({'}
                    {'\n'}
                    {'  title: '}
                    <span style={{ color: '#4ADE80' }}>"Ship faster"</span>
                    {','}
                    {'\n'}
                    {'  teamId: '}
                    <span style={{ color: '#4ADE80' }}>"TEAM_123"</span>
                    {'\n}'}
                    {')'}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ====================== CTA SECTION ====================== */}
      <Section className="relative">
        {/* Very subtle ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(94, 106, 210, 0.06) 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-5xl tracking-tight mb-6"
            style={{ fontWeight: 510, letterSpacing: '-0.02em' }}
            variants={fadeInUp}
          >
            Ready to build faster?
          </motion.h2>
          <motion.p
            className="text-lg mb-10"
            style={{ color: colors.text.secondary }}
            variants={fadeInUp}
          >
            Join thousands of teams shipping better products with Linear.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <button
              className="px-8 py-4 rounded-xl font-medium text-lg transition-opacity duration-200 hover:opacity-90"
              style={{
                background: colors.cta.bg,
                color: colors.cta.text,
              }}
            >
              <span className="flex items-center gap-2">
                Get Started — It's Free
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </motion.div>
        </div>
      </Section>

      {/* ====================== FOOTER ====================== */}
      <footer
        className="py-12 px-6"
        style={{
          borderTop: `1px solid ${colors.border.default}`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{
                  background: colors.accent,
                }}
              >
                <Command className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm" style={{ color: colors.text.tertiary }}>
                © 2026 Linear. All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Security'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm transition-colors duration-200"
                  style={{ color: colors.text.tertiary }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.text.secondary)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.tertiary)}
                >
                  {item}
                </a>
              ))}
              <a
                href="#"
                className="transition-colors duration-200"
                style={{ color: colors.text.tertiary }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.text.secondary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.tertiary)}
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="transition-colors duration-200"
                style={{ color: colors.text.tertiary }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.text.secondary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.tertiary)}
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
