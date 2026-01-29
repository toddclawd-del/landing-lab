import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configure with environment variables or defaults
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-29',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// Types for the landing page content
export interface LandingPageContent {
  _id: string
  brandName: string
  tagline: string
  headline: string
  headlineEmphasis: string
  subheadline: string
  featuresLabel: string
  featuresTitle: string
  featuresTitleEmphasis: string
  features: Array<{
    title: string
    description: string
    shape: 'sphere' | 'torus' | 'octahedron' | 'torusKnot'
  }>
  quote: string
  quoteEmphasis: string
  quoteHighlight: string
  ctaTitle: string
  ctaSubtitle: string
  colors: {
    cream: string
    sky: string
    amber: string
    earth: string
  }
}

// Fetch landing page content
export async function getLandingPageContent(): Promise<LandingPageContent | null> {
  try {
    const content = await sanityClient.fetch<LandingPageContent>(`
      *[_type == "landingPage"][0] {
        _id,
        brandName,
        tagline,
        headline,
        headlineEmphasis,
        subheadline,
        featuresLabel,
        featuresTitle,
        featuresTitleEmphasis,
        features[] {
          title,
          description,
          shape
        },
        quote,
        quoteEmphasis,
        quoteHighlight,
        ctaTitle,
        ctaSubtitle,
        colors {
          cream,
          sky,
          amber,
          earth
        }
      }
    `)
    return content
  } catch (error) {
    console.warn('Sanity fetch failed, using defaults:', error)
    return null
  }
}
