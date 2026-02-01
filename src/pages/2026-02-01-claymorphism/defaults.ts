/**
 * Claymorphism - Default/Fallback Content
 * 
 * These are used when CMS data is not available (demo mode).
 * Structured to match the CMS schema types.
 */

import type {
  SiteSettings,
  HeroSection,
  Feature,
  Statistic,
  Testimonial,
  PricingTier,
  AboutSection,
  CtaSection,
  LogoGridItem,
  FooterLink,
} from '../../lib/claymorphism-sanity'

// =====================================
// DEFAULT SITE SETTINGS
// =====================================

export const defaultSiteSettings: SiteSettings = {
  _id: 'default-site-settings',
  brandName: 'Claymoji',
  tagline: 'Making productivity playful',
  socialLinks: [
    { platform: 'twitter', url: '#' },
    { platform: 'instagram', url: '#' },
    { platform: 'linkedin', url: '#' },
    { platform: 'discord', url: '#' },
  ],
}

// =====================================
// DEFAULT HERO SECTION
// =====================================

export const defaultHeroSection: HeroSection = {
  _id: 'default-hero',
  badge: {
    text: 'New: Team collaboration is here',
    enabled: true,
  },
  headline: 'Make your ideas',
  headlineHighlight: 'come alive',
  subheadline: 'The playful productivity app that makes work feel like play. Organize, collaborate, and create with joy.',
  ctaPrimary: {
    text: 'Start Free Trial',
    url: '#pricing',
  },
  ctaSecondary: {
    text: 'Watch Demo',
    url: '#demo',
  },
}

// =====================================
// DEFAULT FEATURES
// =====================================

export const defaultFeatures: Feature[] = [
  {
    _id: 'feature-1',
    title: 'Smart Focus',
    description: 'AI-powered task prioritization that knows what matters most.',
    icon: 'Target',
    accentColor: 'blue',
    order: 1,
  },
  {
    _id: 'feature-2',
    title: 'Team Sync',
    description: 'Real-time collaboration that feels like working side by side.',
    icon: 'Users',
    accentColor: 'pink',
    order: 2,
  },
  {
    _id: 'feature-3',
    title: 'Visual Progress',
    description: 'Beautiful charts and insights that celebrate your wins.',
    icon: 'BarChart3',
    accentColor: 'purple',
    order: 3,
  },
  {
    _id: 'feature-4',
    title: 'Gentle Reminders',
    description: 'Friendly nudges that help you stay on track without stress.',
    icon: 'Bell',
    accentColor: 'blue',
    order: 4,
  },
  {
    _id: 'feature-5',
    title: 'Custom Themes',
    description: 'Make it yours with playful colors and personalization.',
    icon: 'Palette',
    accentColor: 'pink',
    order: 5,
  },
  {
    _id: 'feature-6',
    title: 'Private & Secure',
    description: 'Your data stays yours with end-to-end encryption.',
    icon: 'Lock',
    accentColor: 'purple',
    order: 6,
  },
]

// =====================================
// DEFAULT STATISTICS
// =====================================

export const defaultStatistics: Statistic[] = [
  {
    _id: 'stat-1',
    value: '50K+',
    label: 'Happy users',
    icon: 'Smile',
    order: 1,
  },
  {
    _id: 'stat-2',
    value: '2M+',
    label: 'Tasks completed',
    icon: 'CheckCircle',
    order: 2,
  },
  {
    _id: 'stat-3',
    value: '99%',
    label: 'Uptime',
    icon: 'Rocket',
    order: 3,
  },
  {
    _id: 'stat-4',
    value: '4.9',
    label: 'App Store rating',
    icon: 'Star',
    order: 4,
  },
]

// =====================================
// DEFAULT TESTIMONIALS
// =====================================

export const defaultTestimonials: Testimonial[] = [
  {
    _id: 'testimonial-1',
    quote: "Claymoji made me actually enjoy my todo list. The little animations when I complete a task? *Chef's kiss*",
    authorName: 'Sarah Chen',
    role: 'Product Designer',
    company: 'Figma',
    avatar: { type: 'emoji', emoji: '👩‍🎨' },
    accentColor: 'blue',
    featured: true,
  },
  {
    _id: 'testimonial-2',
    quote: 'My team went from chaotic Slack threads to actually organized work. Game changer for our remote team.',
    authorName: 'Marcus Johnson',
    role: 'Engineering Lead',
    company: 'Stripe',
    avatar: { type: 'emoji', emoji: '👨‍💻' },
    accentColor: 'pink',
  },
  {
    _id: 'testimonial-3',
    quote: "Finally, a productivity app that doesn't make me feel guilty. It's like a supportive friend cheering me on.",
    authorName: 'Emma Rodriguez',
    role: 'Founder',
    company: 'Bloom',
    avatar: { type: 'emoji', emoji: '👩‍💼' },
    accentColor: 'purple',
  },
  {
    _id: 'testimonial-4',
    quote: 'The claymorphism design is stunning. Our whole team actually looks forward to checking tasks now.',
    authorName: 'David Kim',
    role: 'Creative Director',
    company: 'Vercel',
    avatar: { type: 'emoji', emoji: '🎨' },
    accentColor: 'blue',
  },
]

// =====================================
// DEFAULT PRICING TIERS
// =====================================

export const defaultPricingTiers: PricingTier[] = [
  {
    _id: 'pricing-1',
    name: 'Free',
    price: '$0',
    billingPeriod: '/mo',
    description: 'Perfect for getting started',
    features: ['Up to 3 projects', 'Basic analytics', 'Email support', '1 team member'],
    ctaText: 'Get Started',
    highlighted: false,
    accentColor: 'blue',
    order: 1,
  },
  {
    _id: 'pricing-2',
    name: 'Pro',
    price: '$12',
    billingPeriod: '/mo',
    description: 'For serious productivity',
    features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Up to 10 team members', 'Custom themes', 'Integrations'],
    ctaText: 'Get Started',
    highlighted: true,
    accentColor: 'pink',
    order: 2,
  },
  {
    _id: 'pricing-3',
    name: 'Team',
    price: '$29',
    billingPeriod: '/mo',
    description: 'For growing teams',
    features: ['Everything in Pro', 'Unlimited members', 'Admin controls', 'SSO & SAML', 'Dedicated support', 'API access'],
    ctaText: 'Get Started',
    highlighted: false,
    accentColor: 'purple',
    order: 3,
  },
]

// =====================================
// DEFAULT ABOUT SECTION
// =====================================

export const defaultAboutSection: AboutSection = {
  _id: 'default-about',
  headline: 'About Claymoji',
  description: "We believe productivity tools should feel good to use. That's why we built Claymoji — a playful workspace that helps you get things done without the stress.",
  values: [
    {
      title: 'Built with Love',
      description: 'Every feature is crafted with care to bring joy to your daily workflow.',
      icon: 'Heart',
      accentColor: 'pink',
    },
    {
      title: 'Remote First',
      description: 'Our global team understands the challenges of distributed work.',
      icon: 'Globe',
      accentColor: 'blue',
    },
    {
      title: 'Always Improving',
      description: 'Weekly updates and new features based on your feedback.',
      icon: 'Zap',
      accentColor: 'purple',
    },
  ],
}

// =====================================
// DEFAULT CTA SECTION
// =====================================

export const defaultCtaSection: CtaSection = {
  _id: 'default-cta',
  headline: 'Ready to make work',
  headlineHighlight: 'feel like play?',
  subtext: "Join 50,000+ happy users who've transformed their productivity.",
  buttons: [
    { text: 'Start Free Trial', url: '#pricing', variant: 'primary' },
    { text: 'Talk to Sales', url: '#contact', variant: 'ghost' },
  ],
}

// =====================================
// DEFAULT LOGO GRID
// =====================================

export const defaultLogoGrid: LogoGridItem[] = [
  { _id: 'logo-1', companyName: 'Notion', logo: { type: 'letter', letter: 'N' }, order: 1 },
  { _id: 'logo-2', companyName: 'Slack', logo: { type: 'letter', letter: 'S' }, order: 2 },
  { _id: 'logo-3', companyName: 'Linear', logo: { type: 'letter', letter: 'L' }, order: 3 },
  { _id: 'logo-4', companyName: 'Vercel', logo: { type: 'letter', letter: 'V' }, order: 4 },
  { _id: 'logo-5', companyName: 'Figma', logo: { type: 'letter', letter: 'F' }, order: 5 },
  { _id: 'logo-6', companyName: 'Stripe', logo: { type: 'letter', letter: 'S' }, order: 6 },
]

// =====================================
// DEFAULT FOOTER LINKS
// =====================================

export const defaultFooterLinks: FooterLink[] = [
  { _id: 'footer-1', label: 'Features', url: '#features', category: 'product', order: 1 },
  { _id: 'footer-2', label: 'Pricing', url: '#pricing', category: 'product', order: 2 },
  { _id: 'footer-3', label: 'About', url: '#about', category: 'company', order: 1 },
  { _id: 'footer-4', label: 'Privacy', url: '#', category: 'legal', order: 1 },
  { _id: 'footer-5', label: 'Terms', url: '#', category: 'legal', order: 2 },
]

// =====================================
// ALL DEFAULTS BUNDLE
// =====================================

export const allDefaults = {
  siteSettings: defaultSiteSettings,
  heroSection: defaultHeroSection,
  features: defaultFeatures,
  statistics: defaultStatistics,
  testimonials: defaultTestimonials,
  pricingTiers: defaultPricingTiers,
  aboutSection: defaultAboutSection,
  ctaSection: defaultCtaSection,
  logoGrid: defaultLogoGrid,
  footerLinks: defaultFooterLinks,
}
