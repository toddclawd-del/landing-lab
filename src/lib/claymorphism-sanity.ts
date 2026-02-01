/**
 * Claymorphism - Sanity CMS Integration
 * 
 * GROQ queries and types for fetching CMS content.
 * Uses the shared sanity client from src/lib/sanity.ts
 */

import { sanityClient, urlFor } from './sanity'

// =====================================
// TYPE DEFINITIONS
// =====================================

export interface SiteSettings {
  _id: string
  brandName: string
  tagline?: string
  logo?: any // Sanity image reference
  lightColors?: ColorTheme
  darkColors?: ColorTheme
  socialLinks?: SocialLink[]
}

export interface ColorTheme {
  bg?: string
  surface?: string
  card?: string
  accentBlue?: string
  accentPink?: string
  accentPurple?: string
  text?: string
  textSecondary?: string
  textMuted?: string
}

export interface SocialLink {
  platform: 'twitter' | 'instagram' | 'linkedin' | 'discord' | 'github' | 'youtube'
  url: string
}

export interface HeroSection {
  _id: string
  badge?: {
    text: string
    enabled: boolean
  }
  headline: string
  headlineHighlight?: string
  subheadline?: string
  ctaPrimary?: {
    text: string
    url?: string
  }
  ctaSecondary?: {
    text: string
    url?: string
  }
  demoVideoUrl?: string
}

export interface Feature {
  _id: string
  title: string
  description: string
  icon?: string
  accentColor?: 'blue' | 'pink' | 'purple'
  order?: number
}

export interface Statistic {
  _id: string
  value: string
  label: string
  icon?: string
  order?: number
}

export interface Testimonial {
  _id: string
  quote: string
  authorName: string
  role?: string
  company?: string
  avatar?: {
    type: 'emoji' | 'image'
    emoji?: string
    image?: any
  }
  accentColor?: 'blue' | 'pink' | 'purple'
  featured?: boolean
}

export interface PricingTier {
  _id: string
  name: string
  price: string
  billingPeriod?: string
  description?: string
  features?: string[]
  ctaText?: string
  ctaUrl?: string
  highlighted?: boolean
  accentColor?: 'blue' | 'pink' | 'purple'
  order?: number
}

export interface AboutSection {
  _id: string
  headline?: string
  description?: string
  values?: Array<{
    title: string
    description: string
    icon?: string
    accentColor?: 'blue' | 'pink' | 'purple'
  }>
}

export interface CtaSection {
  _id: string
  headline?: string
  headlineHighlight?: string
  subtext?: string
  buttons?: Array<{
    text: string
    url?: string
    variant?: 'primary' | 'ghost'
  }>
}

export interface LogoGridItem {
  _id: string
  companyName: string
  logo?: {
    type: 'letter' | 'image'
    letter?: string
    image?: any
  }
  url?: string
  order?: number
}

export interface FooterLink {
  _id: string
  label: string
  url?: string
  category: 'product' | 'company' | 'legal' | 'resources'
  order?: number
  external?: boolean
}

// Full page content bundle
export interface ClaymorphismContent {
  siteSettings?: SiteSettings
  heroSection?: HeroSection
  features: Feature[]
  statistics: Statistic[]
  testimonials: Testimonial[]
  pricingTiers: PricingTier[]
  aboutSection?: AboutSection
  ctaSection?: CtaSection
  logoGrid: LogoGridItem[]
  footerLinks: FooterLink[]
}

// =====================================
// GROQ QUERIES
// =====================================

const SITE_SETTINGS_QUERY = `
  *[_type == "claySiteSettings"][0] {
    _id,
    brandName,
    tagline,
    logo,
    lightColors,
    darkColors,
    socialLinks[] {
      platform,
      url
    }
  }
`

const HERO_SECTION_QUERY = `
  *[_type == "clayHeroSection"][0] {
    _id,
    badge,
    headline,
    headlineHighlight,
    subheadline,
    ctaPrimary,
    ctaSecondary,
    demoVideoUrl
  }
`

const FEATURES_QUERY = `
  *[_type == "clayFeature"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    accentColor,
    order
  }
`

const STATISTICS_QUERY = `
  *[_type == "clayStatistic"] | order(order asc) {
    _id,
    value,
    label,
    icon,
    order
  }
`

const TESTIMONIALS_QUERY = `
  *[_type == "clayTestimonial"] | order(featured desc) {
    _id,
    quote,
    authorName,
    role,
    company,
    avatar,
    accentColor,
    featured
  }
`

const PRICING_TIERS_QUERY = `
  *[_type == "clayPricingTier"] | order(order asc) {
    _id,
    name,
    price,
    billingPeriod,
    description,
    features,
    ctaText,
    ctaUrl,
    highlighted,
    accentColor,
    order
  }
`

const ABOUT_SECTION_QUERY = `
  *[_type == "clayAboutSection"][0] {
    _id,
    headline,
    description,
    values[] {
      title,
      description,
      icon,
      accentColor
    }
  }
`

const CTA_SECTION_QUERY = `
  *[_type == "clayCtaSection"][0] {
    _id,
    headline,
    headlineHighlight,
    subtext,
    buttons[] {
      text,
      url,
      variant
    }
  }
`

const LOGO_GRID_QUERY = `
  *[_type == "clayLogoGridItem"] | order(order asc) {
    _id,
    companyName,
    logo,
    url,
    order
  }
`

const FOOTER_LINKS_QUERY = `
  *[_type == "clayFooterLink"] | order(category asc, order asc) {
    _id,
    label,
    url,
    category,
    order,
    external
  }
`

// Combined query for initial page load (more efficient)
const ALL_CONTENT_QUERY = `
{
  "siteSettings": ${SITE_SETTINGS_QUERY},
  "heroSection": ${HERO_SECTION_QUERY},
  "features": ${FEATURES_QUERY},
  "statistics": ${STATISTICS_QUERY},
  "testimonials": ${TESTIMONIALS_QUERY},
  "pricingTiers": ${PRICING_TIERS_QUERY},
  "aboutSection": ${ABOUT_SECTION_QUERY},
  "ctaSection": ${CTA_SECTION_QUERY},
  "logoGrid": ${LOGO_GRID_QUERY},
  "footerLinks": ${FOOTER_LINKS_QUERY}
}
`

// =====================================
// FETCH FUNCTIONS
// =====================================

/**
 * Fetch all Claymorphism content in a single request
 */
export async function getClaymorphismContent(): Promise<ClaymorphismContent | null> {
  try {
    const content = await sanityClient.fetch<ClaymorphismContent>(ALL_CONTENT_QUERY)
    return content
  } catch (error) {
    console.warn('Failed to fetch Claymorphism content from Sanity:', error)
    return null
  }
}

/**
 * Fetch individual sections (useful for partial updates)
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityClient.fetch<SiteSettings>(SITE_SETTINGS_QUERY)
  } catch (error) {
    console.warn('Failed to fetch site settings:', error)
    return null
  }
}

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    return await sanityClient.fetch<HeroSection>(HERO_SECTION_QUERY)
  } catch (error) {
    console.warn('Failed to fetch hero section:', error)
    return null
  }
}

export async function getFeatures(): Promise<Feature[]> {
  try {
    return await sanityClient.fetch<Feature[]>(FEATURES_QUERY) || []
  } catch (error) {
    console.warn('Failed to fetch features:', error)
    return []
  }
}

export async function getStatistics(): Promise<Statistic[]> {
  try {
    return await sanityClient.fetch<Statistic[]>(STATISTICS_QUERY) || []
  } catch (error) {
    console.warn('Failed to fetch statistics:', error)
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await sanityClient.fetch<Testimonial[]>(TESTIMONIALS_QUERY) || []
  } catch (error) {
    console.warn('Failed to fetch testimonials:', error)
    return []
  }
}

export async function getPricingTiers(): Promise<PricingTier[]> {
  try {
    return await sanityClient.fetch<PricingTier[]>(PRICING_TIERS_QUERY) || []
  } catch (error) {
    console.warn('Failed to fetch pricing tiers:', error)
    return []
  }
}

export async function getAboutSection(): Promise<AboutSection | null> {
  try {
    return await sanityClient.fetch<AboutSection>(ABOUT_SECTION_QUERY)
  } catch (error) {
    console.warn('Failed to fetch about section:', error)
    return null
  }
}

export async function getCtaSection(): Promise<CtaSection | null> {
  try {
    return await sanityClient.fetch<CtaSection>(CTA_SECTION_QUERY)
  } catch (error) {
    console.warn('Failed to fetch CTA section:', error)
    return null
  }
}

export async function getLogoGrid(): Promise<LogoGridItem[]> {
  try {
    return await sanityClient.fetch<LogoGridItem[]>(LOGO_GRID_QUERY) || []
  } catch (error) {
    console.warn('Failed to fetch logo grid:', error)
    return []
  }
}

export async function getFooterLinks(): Promise<FooterLink[]> {
  try {
    return await sanityClient.fetch<FooterLink[]>(FOOTER_LINKS_QUERY) || []
  } catch (error) {
    console.warn('Failed to fetch footer links:', error)
    return []
  }
}

// Re-export urlFor for image handling
export { urlFor }
