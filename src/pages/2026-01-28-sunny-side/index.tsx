/**
 * Sunny Side - Denver Brunch Restaurant Landing
 * 
 * A fun, warm, and inviting restaurant website design.
 * NOT the typical dark crypto/SaaS vibe — this is bright, 
 * playful, and makes you want breakfast.
 * 
 * Design notes:
 * - Warm color palette: sunny yellow, soft orange, cream, sage
 * - Mix of serif (headings) + clean sans-serif (body)
 * - Playful but not childish
 * - Clear CTAs for menu and reservations
 * - Location-focused (Denver pride)
 */

import { useState } from 'react'

// ============================================
// Menu Data
// ============================================

const menuHighlights = [
  {
    name: 'The Denver Scramble',
    description: 'Farm eggs, green chili, pepper jack, avocado, crispy potatoes',
    price: '$16',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    tag: 'Fan Favorite',
  },
  {
    name: 'Buttermilk Stack',
    description: 'Three fluffy pancakes, whipped butter, pure maple syrup',
    price: '$14',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    tag: null,
  },
  {
    name: 'Avocado Toast',
    description: 'Sourdough, smashed avo, everything seasoning, poached eggs',
    price: '$15',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    tag: 'Vegetarian',
  },
  {
    name: 'Huevos Rancheros',
    description: 'Crispy tortillas, black beans, ranchero sauce, queso fresco',
    price: '$17',
    image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=400&h=300&fit=crop',
    tag: 'Spicy',
  },
]

// ============================================
// Main Component
// ============================================

export default function SunnySide() {
  const [reservationHover, setReservationHover] = useState(false)

  return (
    <div style={styles.page}>
      {/* Navigation */}
      <nav className="sunny-nav" style={styles.nav}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>☀️</span>
          <span style={styles.logoText}>Sunny Side</span>
        </div>
        <div className="sunny-nav-links" style={styles.navLinks}>
          <a href="#menu" style={styles.navLink}>Menu</a>
          <a href="#about" style={styles.navLink}>About</a>
          <a href="#location" style={styles.navLink}>Visit</a>
          <a 
            href="#reserve" 
            style={{
              ...styles.navButton,
              ...(reservationHover ? styles.navButtonHover : {}),
            }}
            onMouseEnter={() => setReservationHover(true)}
            onMouseLeave={() => setReservationHover(false)}
          >
            Reserve a Table
          </a>
        </div>
        {/* Mobile nav button */}
        <a 
          href="#reserve" 
          className="sunny-nav-mobile"
          style={{
            ...styles.navButton,
            display: 'none',
          }}
        >
          Reserve
        </a>
      </nav>

      {/* Hero Section */}
      <section className="sunny-hero" style={styles.hero}>
        <div className="sunny-hero-content" style={styles.heroContent}>
          <p style={styles.heroTagline}>Denver's Favorite Brunch Spot</p>
          <h1 style={styles.heroTitle}>
            Start Your Day<br />
            <span style={styles.heroTitleAccent}>Sunny Side Up</span>
          </h1>
          <p style={styles.heroDescription}>
            Farm-fresh breakfast & brunch in the heart of RiNo. 
            Good vibes, great coffee, and food that makes you smile.
          </p>
          <div className="sunny-hero-buttons" style={styles.heroButtons}>
            <a href="#menu" style={styles.primaryButton}>View Menu</a>
            <a href="#reserve" style={styles.secondaryButton}>Make Reservation</a>
          </div>
        </div>
        <div style={styles.heroImage}>
          <img 
            src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=500&fit=crop" 
            alt="Delicious brunch spread"
            className="sunny-hero-img"
            style={styles.heroImg}
          />
          <div className="sunny-hero-image-decor" style={styles.heroImageDecor} />
        </div>
      </section>

      {/* Features Strip - Marquee */}
      <section className="sunny-features" style={styles.features}>
        <div className="sunny-marquee">
          <div className="sunny-marquee-content">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="sunny-marquee-group">
                <span style={styles.feature}><span style={styles.featureIcon}>🌿</span> Locally Sourced</span>
                <span style={styles.featureDot}>✦</span>
                <span style={styles.feature}><span style={styles.featureIcon}>☕</span> Fresh Roasted Coffee</span>
                <span style={styles.featureDot}>✦</span>
                <span style={styles.feature}><span style={styles.featureIcon}>🥑</span> Veggie Friendly</span>
                <span style={styles.featureDot}>✦</span>
                <span style={styles.feature}><span style={styles.featureIcon}>🏔️</span> Mountain Views</span>
                <span style={styles.featureDot}>✦</span>
                <span style={styles.feature}><span style={styles.featureIcon}>🍳</span> Made Fresh Daily</span>
                <span style={styles.featureDot}>✦</span>
                <span style={styles.feature}><span style={styles.featureIcon}>❤️</span> Family Owned</span>
                <span style={styles.featureDot}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="sunny-about" style={styles.about}>
        <div style={styles.aboutImage}>
          <img 
            src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=500&h=600&fit=crop"
            alt="Sunny restaurant interior"
            style={styles.aboutImg}
          />
        </div>
        <div className="sunny-about-content" style={styles.aboutContent}>
          <p style={styles.sectionTag}>Our Story</p>
          <h2 style={styles.sectionTitle}>Where Every Morning Feels Like Sunday</h2>
          <p style={styles.aboutText}>
            We started Sunny Side in 2019 with a simple idea: breakfast should make you happy. 
            Not just fed — genuinely, ridiculously happy.
          </p>
          <p style={styles.aboutText}>
            Our team sources ingredients from Colorado farms, roasts our coffee in-house, 
            and treats every guest like a neighbor popping by for a bite. Whether you're 
            fueling up for a mountain adventure or recovering from one, we've got you.
          </p>
          <div style={styles.aboutSignature}>
            <span style={styles.signatureName}>— Maria & Jake</span>
            <span style={styles.signatureTitle}>Founders</span>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="sunny-menu" style={styles.menu}>
        <div style={styles.menuHeader}>
          <p style={styles.sectionTag}>The Good Stuff</p>
          <h2 style={styles.sectionTitleDark}>Menu Highlights</h2>
          <p style={styles.menuSubtitle}>
            Can't-miss dishes that keep our regulars coming back every weekend
          </p>
        </div>
        <div style={styles.menuGrid}>
          {menuHighlights.map((item) => (
            <div key={item.name} className="sunny-menu-card" style={styles.menuCard}>
              <div className="sunny-menu-card-image" style={styles.menuCardImage}>
                <img src={item.image} alt={item.name} className="sunny-menu-img" style={styles.menuImg} />
                {item.tag && <span style={styles.menuTag}>{item.tag}</span>}
              </div>
              <div style={styles.menuCardContent}>
                <div style={styles.menuCardHeader}>
                  <h3 style={styles.menuItemName}>{item.name}</h3>
                  <span style={styles.menuItemPrice}>{item.price}</span>
                </div>
                <p style={styles.menuItemDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.menuCta}>
          <a href="#" style={styles.outlineButton}>See Full Menu →</a>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="sunny-location" style={styles.location}>
        <div style={styles.locationContent}>
          <p style={styles.sectionTag}>Find Us</p>
          <h2 style={styles.sectionTitle}>In the Heart of RiNo</h2>
          <div className="sunny-location-details" style={styles.locationDetails}>
            <div style={styles.locationBlock}>
              <h4 style={styles.locationLabel}>Address</h4>
              <p style={styles.locationText}>
                2850 Larimer Street<br />
                Denver, CO 80205
              </p>
            </div>
            <div style={styles.locationBlock}>
              <h4 style={styles.locationLabel}>Hours</h4>
              <p style={styles.locationText}>
                Mon–Fri: 7am – 3pm<br />
                Sat–Sun: 8am – 4pm
              </p>
            </div>
            <div style={styles.locationBlock}>
              <h4 style={styles.locationLabel}>Contact</h4>
              <p style={styles.locationText}>
                (303) 555-0147<br />
                hello@sunnysidedenver.com
              </p>
            </div>
          </div>
        </div>
        <div style={styles.locationMap}>
          <div style={styles.mapPlaceholder}>
            <span style={styles.mapIcon}>📍</span>
            <p style={styles.mapText}>RiNo Arts District</p>
            <a href="#" style={styles.mapLink}>Get Directions →</a>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section id="reserve" className="sunny-reserve" style={styles.reserve}>
        <div style={styles.reserveContent}>
          <h2 style={styles.reserveTitle}>Ready for the Best Brunch in Denver?</h2>
          <p style={styles.reserveText}>
            Walk-ins welcome, but weekends fill up fast. 
            Reserve ahead and skip the wait.
          </p>
          <a href="#" style={styles.reserveButton}>
            Book a Table
          </a>
          <p style={styles.reserveNote}>Or call us at (303) 555-0147</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="sunny-footer" style={styles.footer}>
        <div className="sunny-footer-top" style={styles.footerTop}>
          <div style={styles.footerBrand}>
            <span style={styles.footerLogo}>☀️ Sunny Side</span>
            <p style={styles.footerTagline}>Denver's happiest breakfast.</p>
          </div>
          <div className="sunny-footer-links" style={styles.footerLinks}>
            <a href="#" style={styles.footerLink}>Menu</a>
            <a href="#" style={styles.footerLink}>About</a>
            <a href="#" style={styles.footerLink}>Catering</a>
            <a href="#" style={styles.footerLink}>Careers</a>
          </div>
          <div className="sunny-footer-social" style={styles.footerSocial}>
            <a href="#" style={styles.socialLink}>Instagram</a>
            <a href="#" style={styles.socialLink}>Facebook</a>
            <a href="#" style={styles.socialLink}>TikTok</a>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© 2026 Sunny Side Denver. Made with 🍳 in Colorado.</p>
        </div>
      </footer>

      {/* Animations + Mobile Responsive Styles */}
      <style>{`
        /* Hero image floating animation */
        .sunny-hero-img {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        /* Marquee animation */
        .sunny-marquee {
          overflow: hidden;
          width: 100%;
        }
        .sunny-marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .sunny-marquee-group {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding-right: 2rem;
          flex-shrink: 0;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .sunny-marquee:hover .sunny-marquee-content {
          animation-play-state: paused;
        }
        
        /* Menu card hover effects */
        .sunny-menu-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sunny-menu-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(93, 78, 55, 0.15);
        }
        .sunny-menu-img {
          transition: transform 0.5s ease;
        }
        .sunny-menu-card:hover .sunny-menu-img {
          transform: scale(1.08);
        }
        .sunny-menu-card-image {
          overflow: hidden;
        }
        
        /* Reserve section animated background */
        .sunny-reserve {
          position: relative;
          overflow: hidden;
        }
        .sunny-reserve::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%);
          animation: pulse-bg 8s ease-in-out infinite;
        }
        @keyframes pulse-bg {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(10%, 10%) scale(1.1); opacity: 0.8; }
        }
        

        @media (max-width: 900px) {
          /* Nav */
          .sunny-nav {
            padding: 1rem !important;
            gap: 1rem;
          }
          .sunny-nav-links {
            display: none !important;
          }
          .sunny-nav-mobile {
            display: flex !important;
          }
          
          /* Hero */
          .sunny-hero {
            grid-template-columns: 1fr !important;
            padding: 2rem 1.5rem !important;
            gap: 2rem !important;
          }
          .sunny-hero-content {
            padding-right: 0 !important;
            text-align: center;
          }
          .sunny-hero-buttons {
            justify-content: center;
          }
          .sunny-hero-image-decor {
            display: none;
          }
          
          /* Features */
          .sunny-features {
            flex-wrap: wrap !important;
            gap: 1.5rem !important;
            padding: 2rem 1.5rem !important;
          }
          
          /* About */
          .sunny-about {
            grid-template-columns: 1fr !important;
            padding: 3rem 1.5rem !important;
            gap: 2rem !important;
          }
          .sunny-about-content {
            padding-left: 0 !important;
          }
          
          /* Menu */
          .sunny-menu {
            padding: 3rem 1.5rem !important;
          }
          
          /* Location */
          .sunny-location {
            grid-template-columns: 1fr !important;
            padding: 3rem 1.5rem !important;
            gap: 2rem !important;
          }
          .sunny-location-details {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          /* Reserve */
          .sunny-reserve {
            padding: 3rem 1.5rem !important;
          }
          
          /* Footer */
          .sunny-footer {
            padding: 2rem 1.5rem !important;
          }
          .sunny-footer-top {
            flex-direction: column !important;
            gap: 2rem !important;
            text-align: center;
          }
          .sunny-footer-links,
          .sunny-footer-social {
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  )
}

// ============================================
// Styles
// ============================================

const colors = {
  yellow: '#FFD93D',
  yellowLight: '#FFF4CC',
  orange: '#FF914D',
  cream: '#FFF9F0',
  sage: '#87A878',
  brown: '#5D4E37',
  brownLight: '#8B7355',
  white: '#FFFFFF',
  dark: '#2D2D2D',
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: colors.dark,
    background: colors.cream,
    minHeight: '100vh',
  },
  
  // Navigation
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 4rem',
    background: colors.cream,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoIcon: {
    fontSize: '1.75rem',
  },
  logoText: {
    fontFamily: "'Georgia', serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    color: colors.brown,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: colors.brownLight,
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'color 0.2s ease',
  },
  navButton: {
    background: colors.orange,
    color: colors.white,
    padding: '0.75rem 1.5rem',
    borderRadius: '50px',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 600,
    transition: 'all 0.2s ease',
  },
  navButtonHover: {
    background: '#E67D3A',
    transform: 'translateY(-2px)',
  },

  // Hero
  hero: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    padding: '4rem',
    maxWidth: '1400px',
    margin: '0 auto',
    alignItems: 'center',
  },
  heroContent: {
    paddingRight: '2rem',
  },
  heroTagline: {
    color: colors.orange,
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  heroTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    color: colors.brown,
    marginBottom: '1.5rem',
  },
  heroTitleAccent: {
    color: colors.orange,
  },
  heroDescription: {
    fontSize: '1.2rem',
    lineHeight: 1.7,
    color: colors.brownLight,
    marginBottom: '2rem',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
  },
  primaryButton: {
    background: colors.yellow,
    color: colors.brown,
    padding: '1rem 2rem',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    border: `2px solid ${colors.yellow}`,
  },
  secondaryButton: {
    background: 'transparent',
    color: colors.brown,
    padding: '1rem 2rem',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    border: `2px solid ${colors.brown}`,
    transition: 'all 0.2s ease',
  },
  heroImage: {
    position: 'relative',
  },
  heroImg: {
    width: '100%',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(93, 78, 55, 0.2)',
  },
  heroImageDecor: {
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    width: '100%',
    height: '100%',
    background: colors.yellow,
    borderRadius: '20px',
    zIndex: -1,
  },

  // Features
  features: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1.25rem 0',
    background: colors.sage,
    overflow: 'hidden',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: colors.white,
    fontWeight: 600,
    fontSize: '1rem',
    whiteSpace: 'nowrap',
  },
  featureIcon: {
    fontSize: '1.25rem',
  },
  featureDot: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.75rem',
  },
  featureText: {
    color: colors.white,
    fontWeight: 600,
    fontSize: '1rem',
  },

  // About
  about: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6rem',
    padding: '6rem 4rem',
    maxWidth: '1400px',
    margin: '0 auto',
    alignItems: 'center',
  },
  aboutImage: {
    position: 'relative',
  },
  aboutImg: {
    width: '100%',
    borderRadius: '20px',
  },
  aboutContent: {
    paddingLeft: '2rem',
  },
  sectionTag: {
    color: colors.orange,
    fontWeight: 600,
    fontSize: '0.9rem',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
  },
  sectionTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
    fontWeight: 700,
    color: colors.brown,
    marginBottom: '1.5rem',
    lineHeight: 1.2,
  },
  sectionTitleDark: {
    fontFamily: "'Georgia', serif",
    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
    fontWeight: 700,
    color: colors.brown,
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  aboutText: {
    fontSize: '1.1rem',
    lineHeight: 1.8,
    color: colors.brownLight,
    marginBottom: '1rem',
  },
  aboutSignature: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
  },
  signatureName: {
    fontFamily: "'Georgia', serif",
    fontSize: '1.25rem',
    fontStyle: 'italic',
    color: colors.brown,
  },
  signatureTitle: {
    color: colors.brownLight,
    fontSize: '0.9rem',
    marginTop: '0.25rem',
  },

  // Menu
  menu: {
    padding: '6rem 4rem',
    background: colors.white,
  },
  menuHeader: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto 4rem',
  },
  menuSubtitle: {
    fontSize: '1.1rem',
    color: colors.brownLight,
  },
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  menuCard: {
    background: colors.cream,
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  menuCardImage: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
  },
  menuImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  menuTag: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: colors.orange,
    color: colors.white,
    padding: '0.35rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  menuCardContent: {
    padding: '1.25rem',
  },
  menuCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
  },
  menuItemName: {
    fontFamily: "'Georgia', serif",
    fontSize: '1.2rem',
    fontWeight: 600,
    color: colors.brown,
  },
  menuItemPrice: {
    color: colors.orange,
    fontWeight: 700,
    fontSize: '1.1rem',
  },
  menuItemDesc: {
    fontSize: '0.95rem',
    color: colors.brownLight,
    lineHeight: 1.5,
  },
  menuCta: {
    textAlign: 'center',
    marginTop: '3rem',
  },
  outlineButton: {
    display: 'inline-block',
    color: colors.brown,
    padding: '1rem 2rem',
    border: `2px solid ${colors.brown}`,
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'all 0.2s ease',
  },

  // Location
  location: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    padding: '6rem 4rem',
    background: colors.cream,
    maxWidth: '1400px',
    margin: '0 auto',
  },
  locationContent: {},
  locationDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    marginTop: '2rem',
  },
  locationBlock: {},
  locationLabel: {
    color: colors.orange,
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '0.5rem',
  },
  locationText: {
    color: colors.brownLight,
    fontSize: '1rem',
    lineHeight: 1.7,
  },
  locationMap: {
    background: colors.sage,
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  mapPlaceholder: {
    textAlign: 'center',
    color: colors.white,
  },
  mapIcon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '1rem',
  },
  mapText: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem',
  },
  mapLink: {
    color: colors.white,
    textDecoration: 'underline',
  },

  // Reserve
  reserve: {
    background: colors.yellow,
    padding: '6rem 4rem',
    textAlign: 'center',
  },
  reserveContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  reserveTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
    fontWeight: 700,
    color: colors.brown,
    marginBottom: '1rem',
  },
  reserveText: {
    fontSize: '1.15rem',
    color: colors.brownLight,
    marginBottom: '2rem',
  },
  reserveButton: {
    display: 'inline-block',
    background: colors.brown,
    color: colors.white,
    padding: '1.25rem 3rem',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1.1rem',
    transition: 'all 0.2s ease',
  },
  reserveNote: {
    marginTop: '1rem',
    fontSize: '0.95rem',
    color: colors.brownLight,
  },

  // Footer
  footer: {
    background: colors.brown,
    padding: '4rem',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingBottom: '3rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  footerBrand: {},
  footerLogo: {
    fontSize: '1.5rem',
    fontFamily: "'Georgia', serif",
    color: colors.white,
    fontWeight: 700,
  },
  footerTagline: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: '0.5rem',
  },
  footerLinks: {
    display: 'flex',
    gap: '2rem',
  },
  footerLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  footerSocial: {
    display: 'flex',
    gap: '1.5rem',
  },
  socialLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  copyright: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.9rem',
  },
}
