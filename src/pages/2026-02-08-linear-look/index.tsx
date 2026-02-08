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
// DESIGN TOKENS - The Linear Look Palette
// ============================================================================

const colors = {
  bg: {
    base: '#0A0A0B',
    elevated: '#141417',
    surface: '#1C1C21',
  },
  text: {
    primary: '#FAFAFA',
    secondary: '#A1A1AA',
    tertiary: '#52525B',
  },
  border: {
    default: 'rgba(255, 255, 255, 0.06)',
    hover: 'rgba(255, 255, 255, 0.12)',
  },
  glow: {
    purple: '#8B5CF6',
    blue: '#3B82F6',
    teal: '#14B8A6',
    pink: '#EC4899',
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
  hidden: { opacity: 0, scale: 0.95 },
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
// GLOW BLOB COMPONENT
// ============================================================================

interface GlowBlobProps {
  color: string
  size: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  delay?: number
}

function GlowBlob({ color, size, top, left, right, bottom, delay = 0 }: GlowBlobProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        filter: 'blur(80px)',
        mixBlendMode: 'screen',
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -25, 15, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 12,
        ease: 'easeInOut',
        repeat: Infinity,
        delay,
      }}
    />
  )
}

// ============================================================================
// ANIMATED BORDER SHINE CARD
// ============================================================================

interface ShineCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

function ShineCard({ children, className = '', delay = 0 }: ShineCardProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Animated border gradient */}
      <div
        className="absolute -inset-px rounded-xl overflow-hidden"
        style={{
          background: `conic-gradient(from ${delay * 45}deg, transparent, rgba(255,255,255,0.5), transparent 60%)`,
          animation: `spin 4s linear infinite`,
          animationDelay: `${delay * 0.5}s`,
        }}
      />
      {/* Inner card */}
      <div
        className="relative rounded-xl p-6 h-full"
        style={{
          background: colors.bg.elevated,
          backdropFilter: 'blur(16px)',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

// ============================================================================
// GLASSMORPHISM CARD
// ============================================================================

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  span?: 'default' | 'wide' | 'tall' | 'large'
}

function GlassCard({ children, className = '', span = 'default' }: GlassCardProps) {
  const spanClasses = {
    default: '',
    wide: 'md:col-span-2',
    tall: 'md:row-span-2',
    large: 'md:col-span-2 md:row-span-2',
  }

  return (
    <motion.div
      className={`relative group rounded-xl overflow-hidden ${spanClasses[span]} ${className}`}
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Animated shine border */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'conic-gradient(from 180deg, transparent, rgba(255,255,255,0.4), transparent 60%)',
            animation: 'spin 3s linear infinite',
          }}
        />
      </div>
      
      {/* Card content */}
      <div
        className="relative m-px rounded-xl p-6 h-full transition-all duration-200"
        style={{
          background: `rgba(255, 255, 255, 0.03)`,
          backdropFilter: 'blur(16px)',
          border: `1px solid ${colors.border.default}`,
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

// ============================================================================
// CIRCUIT BOARD DECORATION
// ============================================================================

function CircuitDecoration({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      width="200"
      height="300"
      viewBox="0 0 200 300"
      fill="none"
    >
      {/* Vertical line */}
      <motion.path
        d="M100 0 L100 120 L150 170 L150 300"
        stroke="url(#circuitGradient)"
        strokeWidth="1"
        strokeDasharray="8 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      {/* Branch 1 */}
      <motion.path
        d="M100 60 L40 60 L40 140"
        stroke="url(#circuitGradient)"
        strokeWidth="1"
        strokeDasharray="8 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
      />
      {/* Branch 2 */}
      <motion.path
        d="M150 200 L180 200 L180 260"
        stroke="url(#circuitGradient)"
        strokeWidth="1"
        strokeDasharray="8 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
      />
      {/* Nodes */}
      <motion.circle
        cx="100"
        cy="60"
        r="4"
        fill={colors.glow.purple}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.circle
        cx="40"
        cy="60"
        r="3"
        fill={colors.glow.blue}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />
      <motion.circle
        cx="150"
        cy="170"
        r="4"
        fill={colors.glow.teal}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />
      <motion.circle
        cx="180"
        cy="200"
        r="3"
        fill={colors.glow.pink}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1.8 }}
      />
      
      <defs>
        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.glow.purple} stopOpacity="0.6" />
          <stop offset="50%" stopColor={colors.glow.blue} stopOpacity="0.4" />
          <stop offset="100%" stopColor={colors.glow.teal} stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
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
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
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

const stats = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '< 50ms', label: 'API Latency' },
  { value: '10M+', label: 'Weekly Events' },
  { value: '2,400+', label: 'Companies' },
]

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
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Global spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
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
          background: `rgba(10, 10, 11, 0.8)`,
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
                background: `linear-gradient(135deg, ${colors.glow.purple}, ${colors.glow.blue})`,
              }}
            >
              <Command className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight">Linear</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Customers', 'Docs'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors duration-200"
                style={{ color: colors.text.secondary }}
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
              className="text-sm hidden sm:block"
              style={{ color: colors.text.secondary }}
            >
              Sign in
            </a>
            <motion.button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                background: `linear-gradient(135deg, ${colors.glow.purple}, ${colors.glow.blue})`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Building
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ====================== HERO ====================== */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <GridBackground />
        
        {/* Glow blobs */}
        <GlowBlob color={colors.glow.purple} size={600} top="-10%" left="10%" delay={0} />
        <GlowBlob color={colors.glow.blue} size={500} top="20%" right="5%" delay={2} />
        <GlowBlob color={colors.glow.teal} size={400} bottom="10%" left="30%" delay={4} />
        
        {/* Circuit decorations */}
        <CircuitDecoration className="left-8 top-40 opacity-40 hidden lg:block" />
        <CircuitDecoration className="right-8 top-60 opacity-40 hidden lg:block scale-x-[-1]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-sm"
            style={{
              background: `rgba(139, 92, 246, 0.1)`,
              border: `1px solid rgba(139, 92, 246, 0.3)`,
              color: colors.glow.purple,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4" />
            Now with AI-powered workflows
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6"
            style={{
              background: `linear-gradient(180deg, ${colors.text.primary} 0%, ${colors.text.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Build products at the
            <br />
            speed of thought
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: colors.text.secondary, lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            The modern platform for issue tracking and project management.
            Purpose-built for high-performance teams.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              className="px-6 py-3 rounded-lg font-medium flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${colors.glow.purple}, ${colors.glow.blue})`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              className="px-6 py-3 rounded-lg font-medium flex items-center gap-2"
              style={{
                background: 'transparent',
                border: `1px solid ${colors.border.hover}`,
                color: colors.text.primary,
              }}
              whileHover={{
                scale: 1.05,
                borderColor: colors.text.secondary,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ====================== STATS BAR ====================== */}
      <Section>
        <motion.div
          className="max-w-5xl mx-auto px-6"
          variants={fadeInUp}
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl"
            style={{
              background: colors.bg.elevated,
              border: `1px solid ${colors.border.default}`,
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center py-4"
                style={{
                  borderRight: i < stats.length - 1 && i !== 1 ? `1px solid ${colors.border.default}` : 'none',
                }}
              >
                <div
                  className="text-2xl md:text-3xl font-bold mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${colors.text.primary}, ${colors.glow.purple})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: colors.text.tertiary }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ====================== BENTO FEATURES ====================== */}
      <Section>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
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
                <GlassCard key={feature.title} span={feature.span}>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: `rgba(139, 92, 246, 0.1)`,
                      border: `1px solid rgba(139, 92, 246, 0.2)`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: colors.glow.purple }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p style={{ color: colors.text.secondary, lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </GlassCard>
              )
            })}
          </motion.div>
        </div>
      </Section>

      {/* ====================== SHOWCASE CARD ====================== */}
      <Section>
        <div className="max-w-5xl mx-auto px-6">
          <ShineCard className="overflow-hidden" delay={0}>
            <div className="relative p-8 md:p-12">
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(ellipse at 30% 50%, ${colors.glow.purple}30, transparent 60%)`,
                }}
              />
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">
                    Built for developers,
                    <br />
                    loved by teams
                  </h3>
                  <p className="mb-6" style={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                    Every feature is designed with keyboard shortcuts, API access, and
                    extensibility in mind. Integrate with your existing tools seamlessly.
                  </p>
                  <div className="flex items-center gap-4">
                    <motion.button
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{
                        background: colors.bg.surface,
                        border: `1px solid ${colors.border.hover}`,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Read Documentation
                    </motion.button>
                    <a
                      href="#"
                      className="text-sm flex items-center gap-1"
                      style={{ color: colors.glow.purple }}
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
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <pre style={{ color: colors.text.secondary }}>
                    <span style={{ color: colors.glow.purple }}>import</span> {'{'} Linear {'}'}{' '}
                    <span style={{ color: colors.glow.purple }}>from</span>{' '}
                    <span style={{ color: colors.glow.teal }}>'@linear/sdk'</span>
                    {'\n\n'}
                    <span style={{ color: colors.glow.purple }}>const</span> client ={' '}
                    <span style={{ color: colors.glow.purple }}>new</span>{' '}
                    <span style={{ color: colors.glow.blue }}>Linear</span>
                    {'({ apiKey })'}
                    {'\n\n'}
                    <span style={{ color: colors.text.tertiary }}>// Create an issue</span>
                    {'\n'}
                    <span style={{ color: colors.glow.purple }}>await</span> client.
                    <span style={{ color: colors.glow.blue }}>createIssue</span>
                    {'({'}
                    {'\n'}
                    {'  title: '}
                    <span style={{ color: colors.glow.teal }}>"Ship faster"</span>
                    {','}
                    {'\n'}
                    {'  teamId: '}
                    <span style={{ color: colors.glow.teal }}>"TEAM_123"</span>
                    {'\n}'}
                    {')'}
                  </pre>
                </div>
              </div>
            </div>
          </ShineCard>
        </div>
      </Section>

      {/* ====================== CTA SECTION ====================== */}
      <Section className="relative">
        {/* Background glows */}
        <GlowBlob color={colors.glow.purple} size={500} top="0" left="20%" delay={0} />
        <GlowBlob color={colors.glow.blue} size={400} bottom="0" right="25%" delay={2} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-semibold tracking-tight mb-6"
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
            <motion.button
              className="px-8 py-4 rounded-xl font-medium text-lg relative overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${colors.glow.purple}, ${colors.glow.blue})`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine effect on hover */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shine 1.5s ease-in-out infinite',
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Get Started — It's Free
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
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
                  background: `linear-gradient(135deg, ${colors.glow.purple}, ${colors.glow.blue})`,
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
                >
                  {item}
                </a>
              ))}
              <a href="#" style={{ color: colors.text.tertiary }}>
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" style={{ color: colors.text.tertiary }}>
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Shine keyframes */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
