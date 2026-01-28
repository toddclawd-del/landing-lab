import { motion } from 'framer-motion'
import styles from './styles.module.css'

const logos = [
  { name: 'OpenAI', icon: '◯' },
  { name: 'Stripe', icon: '◈' },
  { name: 'Shopify', icon: '◇' },
  { name: 'Netflix', icon: '◆' },
  { name: 'Notion', icon: '□' },
  { name: 'Linear', icon: '◎' },
]

const features = [
  {
    title: 'Lightning Fast',
    description: 'Deploy in seconds with zero configuration. Your code goes live the moment you push.',
    icon: '⚡',
  },
  {
    title: 'Global Edge',
    description: 'Automatically distributed across 100+ edge locations for instant loading worldwide.',
    icon: '🌐',
  },
  {
    title: 'Built for Scale',
    description: 'From prototype to production, handle millions of requests without breaking a sweat.',
    icon: '📈',
  },
]

export default function VercelMinimal() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <span className={styles.logo}>▲ Acme</span>
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#docs">Docs</a>
            <a href="#enterprise">Enterprise</a>
          </div>
        </div>
        <div className={styles.navRight}>
          <a href="#login" className={styles.navLogin}>Log In</a>
          <button className={styles.navCta}>Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.heroTitle}>
            Build and deploy<br />
            <span className={styles.heroGradient}>on the modern web.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            The platform for developers to build, deploy, and scale 
            applications with zero configuration.
          </p>
          <div className={styles.heroCtas}>
            <button className={styles.ctaPrimary}>
              Start Deploying
              <span className={styles.ctaArrow}>→</span>
            </button>
            <button className={styles.ctaSecondary}>Get a Demo</button>
          </div>
        </motion.div>

        {/* Prism Graphic */}
        <motion.div 
          className={styles.prismContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.prism}>
            <div className={styles.prismFace1}></div>
            <div className={styles.prismFace2}></div>
            <div className={styles.prismFace3}></div>
          </div>
          <div className={styles.prismGlow}></div>
        </motion.div>
      </section>

      {/* Logo Bar */}
      <section className={styles.logoBar}>
        <p className={styles.logoBarText}>Trusted by the best teams</p>
        <div className={styles.logos}>
          {logos.map((logo) => (
            <div key={logo.name} className={styles.logoItem}>
              <span className={styles.logoIcon}>{logo.icon}</span>
              <span className={styles.logoName}>{logo.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid - Visual Intrigue */}
      <section className={styles.bentoSection}>
        <div className={styles.bentoGrid}>
          <motion.div 
            className={`${styles.bentoCard} ${styles.bentoLarge}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className={styles.bentoGradient}></div>
            <div className={styles.bentoContent}>
              <span className={styles.bentoLabel}>Performance</span>
              <h3>Sub-second deploys</h3>
              <p>From git push to live in milliseconds.</p>
            </div>
            <div className={styles.bentoMetric}>
              <span className={styles.metricValue}>~50ms</span>
              <span className={styles.metricLabel}>avg deploy</span>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.bentoCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.bentoOrbs}>
              <div className={styles.orb1}></div>
              <div className={styles.orb2}></div>
              <div className={styles.orb3}></div>
            </div>
            <div className={styles.bentoContent}>
              <span className={styles.bentoLabel}>Scale</span>
              <h3>100+ edge locations</h3>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.bentoCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.bentoLines}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className={styles.line} style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
            <div className={styles.bentoContent}>
              <span className={styles.bentoLabel}>Analytics</span>
              <h3>Real-time insights</h3>
            </div>
          </motion.div>
          
          <motion.div 
            className={`${styles.bentoCard} ${styles.bentoWide}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className={styles.bentoCode}>
              <code>
                <span className={styles.codeComment}>// Deploy with one command</span><br/>
                <span className={styles.codeKeyword}>$</span> vercel --prod
              </code>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.featuresHeader}>
          <span className={styles.featuresTag}>Features</span>
          <h2 className={styles.featuresTitle}>
            Everything you need.<br />
            Nothing you don't.
          </h2>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Start building today.</h2>
        <p className={styles.ctaSubtitle}>
          Join thousands of developers shipping faster with Acme.
        </p>
        <div className={styles.ctaButtons}>
          <button className={styles.ctaPrimary}>
            Get Started Free
            <span className={styles.ctaArrow}>→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <span className={styles.logo}>▲ Acme</span>
            <p className={styles.footerTagline}>Build faster. Deploy smarter.</p>
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
              <a href="#">Docs</a>
              <a href="#">Support</a>
              <a href="#">API</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 Acme Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
