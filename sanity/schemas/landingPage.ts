/**
 * Sanity Schema for Domain Warp Landing Page
 * 
 * Add this to your Sanity Studio's schema.ts:
 * import landingPage from './landingPage'
 * export const schema = { types: [landingPage] }
 */

export default {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'features', title: 'Features' },
    { name: 'quote', title: 'Quote Section' },
    { name: 'cta', title: 'Call to Action' },
    { name: 'colors', title: 'Colors' },
  ],
  fields: [
    // Brand
    {
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      group: 'brand',
      validation: (Rule: any) => Rule.required(),
    },
    
    // Hero Section
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'hero',
      description: 'Small text above the headline (e.g., "Let your work breathe")',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      group: 'hero',
      description: 'Main headline text',
    },
    {
      name: 'headlineEmphasis',
      title: 'Headline Emphasis',
      type: 'string',
      group: 'hero',
      description: 'Italicized part of the headline',
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      group: 'hero',
      rows: 3,
    },
    
    // Features Section
    {
      name: 'featuresLabel',
      title: 'Features Label',
      type: 'string',
      group: 'features',
      description: 'Small text above features title',
    },
    {
      name: 'featuresTitle',
      title: 'Features Title',
      type: 'string',
      group: 'features',
    },
    {
      name: 'featuresTitleEmphasis',
      title: 'Features Title Emphasis',
      type: 'string',
      group: 'features',
      description: 'Italicized part of the features title',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'features',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            {
              name: 'shape',
              title: '3D Shape',
              type: 'string',
              options: {
                list: [
                  { title: 'Sphere', value: 'sphere' },
                  { title: 'Torus (Donut)', value: 'torus' },
                  { title: 'Octahedron', value: 'octahedron' },
                  { title: 'Torus Knot', value: 'torusKnot' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'shape' },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(4),
    },
    
    // Quote Section
    {
      name: 'quote',
      title: 'Quote Text',
      type: 'string',
      group: 'quote',
    },
    {
      name: 'quoteEmphasis',
      title: 'Quote Emphasis',
      type: 'string',
      group: 'quote',
      description: 'Italicized part of quote',
    },
    {
      name: 'quoteHighlight',
      title: 'Quote Highlight',
      type: 'string',
      group: 'quote',
      description: 'Colored/highlighted part of quote',
    },
    
    // CTA Section
    {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      group: 'cta',
    },
    {
      name: 'ctaSubtitle',
      title: 'CTA Subtitle',
      type: 'text',
      group: 'cta',
      rows: 2,
    },
    
    // Colors
    {
      name: 'colors',
      title: 'Color Palette',
      type: 'object',
      group: 'colors',
      fields: [
        { name: 'cream', title: 'Background (Cream)', type: 'string', description: 'Hex color, e.g. #fffbf7' },
        { name: 'sky', title: 'Accent (Sky)', type: 'string', description: 'Hex color, e.g. #73b7df' },
        { name: 'amber', title: 'Accent (Amber)', type: 'string', description: 'Hex color, e.g. #eca461' },
        { name: 'earth', title: 'Dark (Earth)', type: 'string', description: 'Hex color, e.g. #352314' },
      ],
    },
  ],
  
  preview: {
    select: { title: 'brandName' },
  },
}
