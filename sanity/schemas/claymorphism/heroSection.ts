/**
 * Claymorphism - Hero Section Schema
 * Singleton document for the hero/landing section
 */

export default {
  name: 'clayHeroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'badge',
      title: 'Announcement Badge',
      type: 'object',
      description: 'Optional announcement badge above headline',
      fields: [
        { name: 'text', title: 'Badge Text', type: 'string' },
        { name: 'enabled', title: 'Show Badge', type: 'boolean', initialValue: true },
      ],
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline (e.g., "Make your ideas")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'headlineHighlight',
      title: 'Headline Highlight',
      type: 'string',
      description: 'Gradient-colored part of headline (e.g., "come alive")',
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
      description: 'Supporting text below the headline',
    },
    {
      name: 'ctaPrimary',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'url', title: 'URL', type: 'string' },
      ],
    },
    {
      name: 'ctaSecondary',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'url', title: 'URL', type: 'string' },
      ],
    },
    {
      name: 'demoVideoUrl',
      title: 'Demo Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL for "Watch Demo" modal',
    },
  ],
  preview: {
    select: { title: 'headline', subtitle: 'headlineHighlight' },
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      return { title: `${title} ${subtitle || ''}`.trim() }
    },
  },
}
