/**
 * Claymorphism - Content Hook
 * 
 * Custom hook that fetches CMS content and merges with defaults.
 * Provides graceful fallback when CMS is not configured.
 */

import { useState, useEffect } from 'react'
import {
  getClaymorphismContent,
  type ClaymorphismContent,
  type SiteSettings,
  type HeroSection,
  type Feature,
  type Statistic,
  type Testimonial,
  type PricingTier,
  type AboutSection,
  type CtaSection,
  type LogoGridItem,
  type FooterLink,
} from '../../lib/claymorphism-sanity'

import {
  defaultSiteSettings,
  defaultHeroSection,
  defaultFeatures,
  defaultStatistics,
  defaultTestimonials,
  defaultPricingTiers,
  defaultAboutSection,
  defaultCtaSection,
  defaultLogoGrid,
  defaultFooterLinks,
} from './defaults'

export interface ClaymorphismContentState {
  isLoading: boolean
  isCmsConnected: boolean
  siteSettings: SiteSettings
  heroSection: HeroSection
  features: Feature[]
  statistics: Statistic[]
  testimonials: Testimonial[]
  pricingTiers: PricingTier[]
  aboutSection: AboutSection
  ctaSection: CtaSection
  logoGrid: LogoGridItem[]
  footerLinks: FooterLink[]
}

/**
 * Hook to fetch and manage Claymorphism content
 * Falls back to defaults when CMS is not available
 */
export function useClaymorphismContent(): ClaymorphismContentState {
  const [isLoading, setIsLoading] = useState(true)
  const [isCmsConnected, setIsCmsConnected] = useState(false)
  const [content, setContent] = useState<ClaymorphismContent | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        const cmsContent = await getClaymorphismContent()
        
        if (cmsContent) {
          setContent(cmsContent)
          // Check if we got any meaningful data from CMS
          const hasData = !!(cmsContent.siteSettings || 
                         cmsContent.heroSection || 
                         cmsContent.features.length > 0)
          setIsCmsConnected(hasData)
        }
      } catch (error) {
        console.warn('CMS fetch failed, using defaults:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  // Merge CMS content with defaults
  // CMS values take precedence when available
  return {
    isLoading,
    isCmsConnected,
    siteSettings: content?.siteSettings || defaultSiteSettings,
    heroSection: content?.heroSection || defaultHeroSection,
    features: content?.features?.length ? content.features : defaultFeatures,
    statistics: content?.statistics?.length ? content.statistics : defaultStatistics,
    testimonials: content?.testimonials?.length ? content.testimonials : defaultTestimonials,
    pricingTiers: content?.pricingTiers?.length ? content.pricingTiers : defaultPricingTiers,
    aboutSection: content?.aboutSection || defaultAboutSection,
    ctaSection: content?.ctaSection || defaultCtaSection,
    logoGrid: content?.logoGrid?.length ? content.logoGrid : defaultLogoGrid,
    footerLinks: content?.footerLinks?.length ? content.footerLinks : defaultFooterLinks,
  }
}

// Re-export types for convenience
export type {
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
}
