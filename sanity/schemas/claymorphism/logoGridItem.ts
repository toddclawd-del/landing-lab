/**
 * Claymorphism - Logo Grid Item Schema
 * Document for "Trusted by" company logos
 */

export default {
  name: 'clayLogoGridItem',
  title: 'Logo Grid Company',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Logo Type',
          type: 'string',
          options: {
            list: [
              { title: 'Letter (First Letter)', value: 'letter' },
              { title: 'Image', value: 'image' },
            ],
          },
          initialValue: 'letter',
        },
        {
          name: 'letter',
          title: 'Display Letter',
          type: 'string',
          description: 'Single letter to display (defaults to first letter of company name)',
          hidden: ({ parent }: { parent: { type: string } }) => parent?.type !== 'letter',
        },
        {
          name: 'image',
          title: 'Logo Image',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }: { parent: { type: string } }) => parent?.type !== 'image',
        },
      ],
    },
    {
      name: 'url',
      title: 'Company URL',
      type: 'url',
      description: 'Optional link to company website',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'companyName', order: 'order' },
    prepare({ title, order }: { title: string; order: number }) {
      return {
        title: `${order !== undefined ? `${order}. ` : ''}${title}`,
      }
    },
  },
}
