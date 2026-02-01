/**
 * Claymorphism - Site Settings Schema
 * Singleton document for global site configuration
 */

export default {
  name: 'claySiteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand' },
    { name: 'colors', title: 'Colors' },
    { name: 'social', title: 'Social Links' },
  ],
  fields: [
    {
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      group: 'brand',
      validation: (Rule: any) => Rule.required(),
      description: 'Main brand name displayed in nav and footer',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'brand',
      description: 'Short brand tagline (e.g., "Making productivity playful")',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'brand',
      options: {
        hotspot: true,
      },
      description: 'Optional logo image (falls back to icon if not set)',
    },
    // Light Theme Colors
    {
      name: 'lightColors',
      title: 'Light Theme Colors',
      type: 'object',
      group: 'colors',
      fields: [
        { name: 'bg', title: 'Background', type: 'string', description: 'Hex color (e.g., #F7F5F0)' },
        { name: 'surface', title: 'Surface', type: 'string' },
        { name: 'card', title: 'Card', type: 'string' },
        { name: 'accentBlue', title: 'Accent Blue', type: 'string' },
        { name: 'accentPink', title: 'Accent Pink', type: 'string' },
        { name: 'accentPurple', title: 'Accent Purple', type: 'string' },
        { name: 'text', title: 'Text', type: 'string' },
        { name: 'textSecondary', title: 'Text Secondary', type: 'string' },
        { name: 'textMuted', title: 'Text Muted', type: 'string' },
      ],
    },
    // Dark Theme Colors
    {
      name: 'darkColors',
      title: 'Dark Theme Colors',
      type: 'object',
      group: 'colors',
      fields: [
        { name: 'bg', title: 'Background', type: 'string' },
        { name: 'surface', title: 'Surface', type: 'string' },
        { name: 'card', title: 'Card', type: 'string' },
        { name: 'accentBlue', title: 'Accent Blue', type: 'string' },
        { name: 'accentPink', title: 'Accent Pink', type: 'string' },
        { name: 'accentPurple', title: 'Accent Purple', type: 'string' },
        { name: 'text', title: 'Text', type: 'string' },
        { name: 'textSecondary', title: 'Text Secondary', type: 'string' },
        { name: 'textMuted', title: 'Text Muted', type: 'string' },
      ],
    },
    // Social Links
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Discord', value: 'discord' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
            },
            { name: 'url', title: 'URL', type: 'url' },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: 'brandName' },
    prepare({ title }: { title: string }) {
      return { title: title || 'Site Settings' }
    },
  },
}
