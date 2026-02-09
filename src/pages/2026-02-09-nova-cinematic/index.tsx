import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './styles.module.css'

gsap.registerPlugin(ScrollTrigger)

// Stat counter component
function StatCounter({ 
  value, 
  suffix = '', 
  prefix = '' 
}: { 
  value: number
  suffix?: string
  prefix?: string
}) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return

    const el = counterRef.current
    
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true
        
        gsap.fromTo(el, 
          { textContent: 0 },
          {
            textContent: value,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              el.textContent = prefix + Math.round(Number(el.textContent?.replace(/\D/g, '') || 0)) + suffix
            }
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [value, suffix, prefix])

  return <span ref={counterRef}>{prefix}0{suffix}</span>
}

export default function NovaCinematic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const productPinRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Scroll progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      })

      // Hero parallax - text moves slower
      gsap.to(heroRef.current, {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Product pin and animation
      if (productPinRef.current && productRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: productPinRef.current,
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true,
            anticipatePin: 1
          }
        })

        // Product reveal sequence
        tl.fromTo(productRef.current, 
          { 
            scale: 0.8, 
            rotateX: 20,
            rotateY: -15,
            opacity: 0.5,
            filter: 'blur(10px)'
          },
          { 
            scale: 1, 
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.3
          }
        )
        .to(productRef.current, {
          rotateY: 15,
          duration: 0.3
        })
        .to(productRef.current, {
          rotateY: -10,
          rotateX: -5,
          scale: 1.1,
          duration: 0.4
        })

        // Text reveals during scroll
        const revealTexts = document.querySelectorAll(`.${styles.revealText}`)
        revealTexts.forEach((text, i) => {
          gsap.fromTo(text,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: productPinRef.current,
                start: `${15 + i * 25}% top`,
                end: `${30 + i * 25}% top`,
                scrub: true
              }
            }
          )
          gsap.to(text, {
            opacity: 0,
            y: -40,
            scrollTrigger: {
              trigger: productPinRef.current,
              start: `${40 + i * 25}% top`,
              end: `${55 + i * 25}% top`,
              scrub: true
            }
          })
        })
      }

      // Feature sections parallax
      const features = document.querySelectorAll(`.${styles.featureSection}`)
      features.forEach((feature) => {
        const image = feature.querySelector(`.${styles.featureImage}`)
        if (image) {
          gsap.fromTo(image,
            { y: 80 },
            {
              y: -80,
              ease: 'none',
              scrollTrigger: {
                trigger: feature,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          )
        }
      })

      // Fade in sections
      const fadeIns = document.querySelectorAll(`.${styles.fadeIn}`)
      fadeIns.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={styles.page}>
      {/* Progress Bar */}
      <div ref={progressRef} className={styles.progressBar} />

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.logo}>NOVA</div>
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#specs">Specs</a>
            <a href="#compare">Compare</a>
          </div>
          <button className={styles.navCta}>Pre-order</button>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div ref={heroRef} className={styles.heroContent}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Hear Beyond
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Immersive spatial audio. Industry-leading noise cancellation.<br />
            Experience sound without limits.
          </motion.p>
          <motion.div
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span className={styles.scrollText}>Scroll to explore</span>
            <div className={styles.scrollArrow}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Reveal Section - Pinned */}
      <section ref={productPinRef} className={styles.productPin}>
        <div className={styles.productStage}>
          {/* Product */}
          <div ref={productRef} className={styles.product}>
            <div className={styles.productGlow} />
            <div className={styles.productShape}>
              {/* Headphone silhouette */}
              <div className={styles.headband} />
              <div className={styles.earLeft}>
                <div className={styles.earCup}>
                  <div className={styles.earInner} />
                  <div className={styles.earRing} />
                </div>
              </div>
              <div className={styles.earRight}>
                <div className={styles.earCup}>
                  <div className={styles.earInner} />
                  <div className={styles.earRing} />
                </div>
              </div>
            </div>
          </div>

          {/* Reveal Text Layers */}
          <div className={`${styles.revealText} ${styles.reveal1}`}>
            <span className={styles.revealLabel}>Spatial Audio</span>
            <h2 className={styles.revealHeadline}>Sound that surrounds you</h2>
          </div>
          <div className={`${styles.revealText} ${styles.reveal2}`}>
            <span className={styles.revealLabel}>Active Noise Cancellation</span>
            <h2 className={styles.revealHeadline}>Silence the world</h2>
          </div>
          <div className={`${styles.revealText} ${styles.reveal3}`}>
            <span className={styles.revealLabel}>Adaptive EQ</span>
            <h2 className={styles.revealHeadline}>Tuned for your ears</h2>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={`${styles.stat} ${styles.fadeIn}`}>
            <span className={styles.statNumber}>
              <StatCounter value={40} suffix="dB" />
            </span>
            <span className={styles.statLabel}>Noise Cancellation</span>
          </div>
          <div className={`${styles.stat} ${styles.fadeIn}`}>
            <span className={styles.statNumber}>
              <StatCounter value={30} suffix="hrs" />
            </span>
            <span className={styles.statLabel}>Battery Life</span>
          </div>
          <div className={`${styles.stat} ${styles.fadeIn}`}>
            <span className={styles.statNumber}>
              <StatCounter value={360} suffix="°" />
            </span>
            <span className={styles.statLabel}>Spatial Audio</span>
          </div>
          <div className={`${styles.stat} ${styles.fadeIn}`}>
            <span className={styles.statNumber}>
              <StatCounter value={20} prefix="<" suffix="ms" />
            </span>
            <span className={styles.statLabel}>Ultra-Low Latency</span>
          </div>
        </div>
      </section>

      {/* Feature Spotlight 1 */}
      <section className={`${styles.featureSection} ${styles.featureDark}`}>
        <div className={styles.featureGrid}>
          <div className={`${styles.featureContent} ${styles.fadeIn}`}>
            <span className={styles.featureTag}>Materials</span>
            <h2 className={styles.featureHeadline}>
              Precision-machined<br />aluminum
            </h2>
            <p className={styles.featureBody}>
              Every curve is sculpted from premium aluminum alloy, 
              then anodized in our signature matte black finish. 
              The result is a headphone that feels as good as it sounds.
            </p>
          </div>
          <div className={styles.featureVisual}>
            <div className={`${styles.featureImage} ${styles.featureMaterial}`}>
              <div className={styles.materialSwatch}>
                <div className={styles.swatchTexture} />
                <div className={styles.swatchHighlight} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Spotlight 2 */}
      <section className={`${styles.featureSection} ${styles.featureLight}`}>
        <div className={styles.featureGrid}>
          <div className={styles.featureVisual}>
            <div className={`${styles.featureImage} ${styles.featureDriver}`}>
              <div className={styles.driverDiagram}>
                <div className={styles.driverRing} />
                <div className={styles.driverCore} />
                <div className={styles.driverPulse} />
              </div>
            </div>
          </div>
          <div className={`${styles.featureContent} ${styles.fadeIn}`}>
            <span className={styles.featureTag}>Driver</span>
            <h2 className={styles.featureHeadline}>
              Custom 50mm<br />titanium drivers
            </h2>
            <p className={styles.featureBody}>
              Our largest drivers ever, engineered in-house for 
              unprecedented bass response and crystalline highs. 
              Hear details you've never noticed before.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className={styles.comparisonSection}>
        <div className={`${styles.comparisonContent} ${styles.fadeIn}`}>
          <h2 className={styles.sectionTitle}>Before & After</h2>
          <p className={styles.sectionSubtitle}>
            Experience the transformation with Adaptive EQ
          </p>
        </div>
        <div className={`${styles.comparisonSlider} ${styles.fadeIn}`}>
          <div className={styles.comparisonTrack}>
            <div className={styles.waveformBefore}>
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className={styles.waveBar} 
                  style={{ 
                    height: `${20 + Math.random() * 30}%`,
                    opacity: 0.4 + Math.random() * 0.3
                  }} 
                />
              ))}
            </div>
            <div className={styles.waveformAfter}>
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className={styles.waveBarActive} 
                  style={{ 
                    height: `${30 + Math.sin(i * 0.3) * 30 + Math.random() * 20}%`,
                  }} 
                />
              ))}
            </div>
          </div>
          <div className={styles.comparisonLabels}>
            <span>Standard</span>
            <span>With Nova</span>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={styles.videoSection}>
        <div className={styles.videoBackground}>
          <div className={styles.videoPulse} />
          <div className={styles.videoPulse} style={{ animationDelay: '1s' }} />
          <div className={styles.videoPulse} style={{ animationDelay: '2s' }} />
        </div>
        <div className={`${styles.videoContent} ${styles.fadeIn}`}>
          <h2 className={styles.videoHeadline}>
            Sound that moves with you
          </h2>
          <p className={styles.videoSubtext}>
            Dynamic head tracking keeps audio anchored in space,<br />
            so the music stays where you put it.
          </p>
          <button className={styles.playButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
            </svg>
            Watch the film
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={`${styles.ctaContent} ${styles.fadeIn}`}>
          <h2 className={styles.ctaHeadline}>Ready to hear beyond?</h2>
          <p className={styles.ctaSubtext}>
            Pre-order now. Ships March 2026.
          </p>
          <div className={styles.ctaPrice}>
            <span className={styles.priceAmount}>$549</span>
          </div>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaPrimary}>Pre-order Nova</button>
            <button className={styles.ctaSecondary}>Compare models</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>NOVA</div>
          <div className={styles.footerLinks}>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#support">Support</a>
          </div>
          <div className={styles.footerCopyright}>
            © 2026 Nova Audio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
