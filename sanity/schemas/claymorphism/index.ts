/**
 * Claymorphism Schema Index
 * 
 * Add these schemas to your Sanity Studio configuration:
 * 
 * import { claymorphismSchemas } from './schemas/claymorphism'
 * 
 * export default defineConfig({
 *   schema: {
 *     types: [...claymorphismSchemas, ...otherSchemas],
 *   },
 * })
 */

import siteSettings from './siteSettings'
import heroSection from './heroSection'
import feature from './feature'
import statistic from './statistic'
import testimonial from './testimonial'
import pricingTier from './pricingTier'
import aboutSection from './aboutSection'
import ctaSection from './ctaSection'
import logoGridItem from './logoGridItem'
import footerLink from './footerLink'

export const claymorphismSchemas = [
  siteSettings,
  heroSection,
  feature,
  statistic,
  testimonial,
  pricingTier,
  aboutSection,
  ctaSection,
  logoGridItem,
  footerLink,
]

export {
  siteSettings,
  heroSection,
  feature,
  statistic,
  testimonial,
  pricingTier,
  aboutSection,
  ctaSection,
  logoGridItem,
  footerLink,
}
