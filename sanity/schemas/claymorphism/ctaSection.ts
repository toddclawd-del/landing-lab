/**
 * Claymorphism - CTA Section Schema
 * Singleton document for the final call-to-action section
 */

export default {
  name: 'clayCtaSection',
  title: 'CTA Section',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main CTA headline (e.g., "Ready to make work")',
    },
    {
      name: 'headlineHighlight',
      title: 'Headline Highlight',
      type: 'string',
      description: 'Gradient-colored part (e.g., "feel like play?")',
    },
    {
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 2,
      description: 'Supporting text below headline',
    },
    {
      name: 'buttons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Button Text', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
            {
              name: 'variant',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary (Filled)', value: 'primary' },
                  { title: 'Ghost (Outline)', value: 'ghost' },
                ],
              },
              initialValue: 'primary',
            },
          ],
          preview: {
            select: { title: 'text', subtitle: 'variant' },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(3),
    },
  ],
  preview: {
    select: { title: 'headline', subtitle: 'headlineHighlight' },
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      return { title: `${title} ${subtitle || ''}`.trim() || 'CTA Section' }
    },
  },
}
