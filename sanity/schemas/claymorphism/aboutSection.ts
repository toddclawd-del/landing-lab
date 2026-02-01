/**
 * Claymorphism - About Section Schema
 * Singleton document for the about section
 */

export default {
  name: 'clayAboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Section headline (e.g., "About Claymoji")',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Main about text',
    },
    {
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Heart', value: 'Heart' },
                  { title: 'Globe', value: 'Globe' },
                  { title: 'Zap', value: 'Zap' },
                  { title: 'Users', value: 'Users' },
                  { title: 'Shield', value: 'Shield' },
                  { title: 'Star', value: 'Star' },
                  { title: 'Rocket', value: 'Rocket' },
                  { title: 'Target', value: 'Target' },
                ],
              },
            },
            {
              name: 'accentColor',
              title: 'Accent Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue', value: 'blue' },
                  { title: 'Pink', value: 'pink' },
                  { title: 'Purple', value: 'purple' },
                ],
              },
              initialValue: 'blue',
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(4),
    },
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }: { title: string }) {
      return { title: title || 'About Section' }
    },
  },
}
