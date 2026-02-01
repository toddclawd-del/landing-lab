/**
 * Claymorphism - Testimonial Schema
 * Document for customer testimonials carousel
 */

export default {
  name: 'clayTestimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Job title (e.g., "Product Designer")',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company name (e.g., "Figma")',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Avatar Type',
          type: 'string',
          options: {
            list: [
              { title: 'Emoji', value: 'emoji' },
              { title: 'Image', value: 'image' },
            ],
          },
          initialValue: 'emoji',
        },
        {
          name: 'emoji',
          title: 'Emoji',
          type: 'string',
          description: 'Single emoji character',
          hidden: ({ parent }: { parent: { type: string } }) => parent?.type !== 'emoji',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }: { parent: { type: string } }) => parent?.type !== 'image',
        },
      ],
    },
    {
      name: 'accentColor',
      title: 'Card Accent Color',
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
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this testimonial prominently',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'company',
      quote: 'quote',
    },
    prepare({ title, subtitle, quote }: { title: string; subtitle: string; quote: string }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} - "${quote?.substring(0, 50)}..."` : `"${quote?.substring(0, 60)}..."`,
      }
    },
  },
}
