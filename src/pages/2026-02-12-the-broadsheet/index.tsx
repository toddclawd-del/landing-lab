import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './styles.css'

// Types
interface Story {
  id: string
  category: string
  headline: string
  subheadline?: string
  excerpt?: string
  author: string
  date: string
  readTime?: string
  image?: string
  featured?: boolean
}

interface WeatherData {
  temp: number
  city: string
  condition: string
}

// Mock data
const heroStory: Story = {
  id: '1',
  category: 'TECHNOLOGY',
  headline: 'The Architecture of Tomorrow Emerges From Silicon Dreams',
  subheadline: 'How artificial intelligence is reshaping the way we design, build, and inhabit our cities',
  excerpt: 'In the gleaming towers of San Francisco and the ancient streets of Tokyo, a quiet revolution unfolds. Architects and urban planners, once armed with nothing more than pencils and vision, now collaborate with algorithms that dream in dimensions humans cannot perceive. The buildings of tomorrow are being born not on drafting tables, but in the electric synapses of neural networks trained on centuries of human habitation.',
  author: 'ALEXANDRA CHEN',
  date: 'February 12, 2026',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
  featured: true
}

const sidebarStories: Story[] = [
  {
    id: '2',
    category: 'FINANCE',
    headline: 'Markets Rally as Central Banks Signal Policy Shift',
    author: 'MARCUS WEBB',
    date: 'Feb 12',
  },
  {
    id: '3',
    category: 'SCIENCE',
    headline: 'Breakthrough in Quantum Computing Promises New Era',
    author: 'DR. ELENA ROSS',
    date: 'Feb 12',
  },
  {
    id: '4',
    category: 'OPINION',
    headline: 'Why the Future of Work Is Already Here',
    author: 'JAMES OKONKWO',
    date: 'Feb 12',
  },
]

const mainStories: Story[] = [
  {
    id: '5',
    category: 'CULTURE',
    headline: 'The Unexpected Renaissance of Analog Photography',
    excerpt: 'In an age of infinite digital storage, a generation discovers the meditative quality of 36 exposures.',
    author: 'SARAH KIM',
    date: 'Feb 12',
    image: 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=600&q=80',
  },
  {
    id: '6',
    category: 'BUSINESS',
    headline: 'Small Towns Become Unlikely Tech Hubs',
    excerpt: 'Remote work reshapes American geography as workers flee coastal cities for affordable heartland communities.',
    author: 'DAVID MARTINEZ',
    date: 'Feb 12',
    image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=600&q=80',
  },
  {
    id: '7',
    category: 'HEALTH',
    headline: 'The Science of Sleep Gets a Wake-Up Call',
    excerpt: 'New research challenges everything we thought we knew about our nightly rest.',
    author: 'DR. AMARA SINGH',
    date: 'Feb 12',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80',
  },
]

const briefStories: Story[] = [
  { id: '8', category: 'SPORTS', headline: 'Championship Finals Set After Historic Upset', author: 'Staff', date: 'Feb 12' },
  { id: '9', category: 'POLITICS', headline: 'Senate Passes Landmark Infrastructure Bill', author: 'Staff', date: 'Feb 12' },
  { id: '10', category: 'ARTS', headline: 'Museum Acquires Lost Masterpiece', author: 'Staff', date: 'Feb 12' },
  { id: '11', category: 'TECH', headline: 'New Chip Architecture Promises 10x Efficiency', author: 'Staff', date: 'Feb 12' },
  { id: '12', category: 'WORLD', headline: 'Climate Summit Yields Surprise Agreement', author: 'Staff', date: 'Feb 12' },
]

// Utility functions
const formatDate = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short' })
}

// Components
const Masthead = ({ isDark, setIsDark, weather }: { isDark: boolean; setIsDark: (v: boolean) => void; weather: WeatherData | null }) => {
  const [currentDate] = useState(new Date())
  const [editionNumber] = useState(Math.floor(Math.random() * 100) + 200)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0])
  const scale = useTransform(scrollY, [0, 100], [1, 0.95])

  return (
    <motion.header className="masthead" style={{ opacity, scale }}>
      <div className="masthead-top">
        <nav className="masthead-nav">
          {['News', 'Opinion', 'Business', 'Tech', 'Culture', 'Science'].map((item) => (
            <a key={item} href="#" className="nav-link">{item}</a>
          ))}
        </nav>
        <button 
          className="theme-toggle" 
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀' : '☾'}
        </button>
      </div>
      
      <motion.div 
        className="masthead-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1>THE BROADSHEET</h1>
      </motion.div>
      
      <motion.div 
        className="masthead-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span className="edition">Vol. 12, No. {editionNumber}</span>
        <span className="date">{formatDate(currentDate)}</span>
        <span className="update-info">
          Updated {formatTime(currentDate)}
          {weather && ` • ${weather.city}, ${weather.temp}°F`}
        </span>
      </motion.div>
      
      <div className="masthead-rule" />
    </motion.header>
  )
}

const StickyMasthead = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div 
        className="sticky-masthead"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        exit={{ y: -60 }}
        transition={{ duration: 0.3 }}
      >
        <span className="sticky-title">THE BROADSHEET</span>
        <nav className="sticky-nav">
          {['News', 'Opinion', 'Business', 'Tech'].map((item) => (
            <a key={item} href="#" className="sticky-nav-link">{item}</a>
          ))}
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
)

const BreakingNewsBanner = () => (
  <motion.div 
    className="breaking-banner"
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    transition={{ duration: 0.4 }}
  >
    <span className="breaking-label">⚡ BREAKING</span>
    <span className="breaking-text">Global leaders announce historic climate accord • 3 min ago</span>
  </motion.div>
)

const HeroStory = ({ story }: { story: Story }) => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <motion.article 
      ref={ref}
      className="hero-story"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="hero-image-container">
        <motion.img 
          src={story.image} 
          alt="" 
          className="hero-image"
          style={{ y: imageY }}
        />
      </div>
      
      <div className="hero-content">
        <span className="category-label">{story.category}</span>
        <div className="double-rule" />
        
        <h2 className="hero-headline">{story.headline}</h2>
        
        <div className="single-rule" />
        
        <p className="hero-subheadline">{story.subheadline}</p>
        
        <div className="byline">
          By <span className="author">{story.author}</span> • {story.date}
          {story.readTime && <span className="read-time"> • {story.readTime}</span>}
        </div>
        
        <p className="hero-excerpt drop-cap">{story.excerpt}</p>
      </div>
    </motion.article>
  )
}

const Sidebar = ({ stories }: { stories: Story[] }) => (
  <motion.aside 
    className="sidebar"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <div className="sidebar-header">
      <span>ALSO TODAY</span>
      <div className="single-rule" />
    </div>
    
    {stories.map((story, i) => (
      <article key={story.id} className="sidebar-story">
        <span className="category-label small">{story.category}</span>
        <h3 className="sidebar-headline">{story.headline}</h3>
        <div className="byline small">
          By <span className="author">{story.author}</span> • {story.date}
        </div>
        {i < stories.length - 1 && <div className="dotted-rule" />}
      </article>
    ))}
  </motion.aside>
)

const StoryCard = ({ story, index }: { story: Story; index: number }) => (
  <motion.article 
    className="story-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    {story.image && (
      <div className="story-image-container">
        <img src={story.image} alt="" className="story-image" />
      </div>
    )}
    <span className="category-label small">{story.category}</span>
    <h3 className="story-headline">{story.headline}</h3>
    {story.excerpt && <p className="story-excerpt">{story.excerpt}</p>}
    <div className="byline small">
      By <span className="author">{story.author}</span> • {story.date}
    </div>
  </motion.article>
)

const PullQuote = ({ quote, attribution }: { quote: string; attribution: string }) => (
  <motion.blockquote 
    className="pull-quote"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6 }}
  >
    <p>"{quote}"</p>
    <cite>— {attribution}</cite>
  </motion.blockquote>
)

const BriefCard = ({ story, index }: { story: Story; index: number }) => (
  <motion.article 
    className="brief-card"
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
    <span className="brief-bullet">•</span>
    <div className="brief-content">
      <span className="category-label tiny">{story.category}</span>
      <h4 className="brief-headline">{story.headline}</h4>
    </div>
  </motion.article>
)

const NewsletterCTA = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <motion.section 
      className="newsletter-cta"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="newsletter-title">THE MORNING EDITION</h3>
      <div className="single-rule short" />
      <p className="newsletter-desc">Essential stories, delivered daily at 7 AM.</p>
      
      {!subscribed ? (
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="newsletter-input"
            required
          />
          <button type="submit" className="newsletter-button">→</button>
        </form>
      ) : (
        <p className="newsletter-success">Welcome to the fold.</p>
      )}
      
      <p className="newsletter-count">Join 12,847 readers</p>
    </motion.section>
  )
}

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-section">
        <h4>SECTIONS</h4>
        <ul>
          <li><a href="#">News</a></li>
          <li><a href="#">Opinion</a></li>
          <li><a href="#">Business</a></li>
          <li><a href="#">Technology</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>MORE</h4>
        <ul>
          <li><a href="#">Culture</a></li>
          <li><a href="#">Science</a></li>
          <li><a href="#">Sports</a></li>
          <li><a href="#">Archive</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>ABOUT</h4>
        <ul>
          <li><a href="#">Masthead</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Advertise</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>LEGAL</h4>
        <ul>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Cookies</a></li>
        </ul>
      </div>
    </div>
    
    <div className="footer-bottom">
      <div className="double-rule" />
      <p className="footer-copyright">
        © 2026 The Broadsheet. All rights reserved.
        <span className="footer-established">Est. 2026</span>
      </p>
    </div>
  </footer>
)

// Main Component
export default function TheBroadsheet() {
  const [isDark, setIsDark] = useState(false)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [showStickyHeader, setShowStickyHeader] = useState(false)

  // Fetch weather (with fallback)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Try geolocation first
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords
              const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
              )
              const data = await res.json()
              // Reverse geocode for city name (simplified)
              setWeather({
                temp: Math.round(data.current_weather.temperature * 9/5 + 32),
                city: 'Your Location',
                condition: 'Clear'
              })
            },
            () => {
              // Fallback to Denver
              setWeather({ temp: 45, city: 'Denver', condition: 'Clear' })
            }
          )
        } else {
          setWeather({ temp: 45, city: 'Denver', condition: 'Clear' })
        }
      } catch {
        setWeather({ temp: 45, city: 'Denver', condition: 'Clear' })
      }
    }
    fetchWeather()
  }, [])

  // Sticky header logic
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyHeader(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`broadsheet ${isDark ? 'dark' : ''}`}>
      <StickyMasthead visible={showStickyHeader} />
      <BreakingNewsBanner />
      <Masthead isDark={isDark} setIsDark={setIsDark} weather={weather} />
      
      <main className="main-content">
        {/* Hero + Sidebar Grid */}
        <section className="hero-section">
          <HeroStory story={heroStory} />
          <Sidebar stories={sidebarStories} />
        </section>
        
        <div className="section-divider">
          <div className="double-rule" />
        </div>
        
        {/* Main Stories Grid */}
        <section className="stories-section">
          <div className="stories-grid">
            {mainStories.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </div>
          
          <div className="column-rule" />
          
          <PullQuote 
            quote="The future is already here — it's just not very evenly distributed."
            attribution="WILLIAM GIBSON"
          />
        </section>
        
        <div className="section-divider">
          <div className="double-rule" />
          <span className="section-label">AROUND THE WORLD</span>
        </div>
        
        {/* Briefs Section */}
        <section className="briefs-section">
          <div className="briefs-grid">
            {briefStories.map((story, i) => (
              <BriefCard key={story.id} story={story} index={i} />
            ))}
          </div>
        </section>
        
        <div className="section-divider">
          <div className="single-rule" />
        </div>
        
        {/* Newsletter CTA */}
        <NewsletterCTA />
      </main>
      
      <Footer />
      
      {/* Back to gallery link */}
      <a href="#/" className="back-link">← Back to Gallery</a>
    </div>
  )
}
