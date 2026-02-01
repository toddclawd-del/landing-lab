/**
 * Claymorphism - Footer Link Schema
 * Document for footer navigation links
 */

export default {
  name: 'clayFooterLink',
  title: 'Footer Link',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Link Label',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Can be external URL, internal path, or section ID (e.g., #features)',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Product', value: 'product' },
          { title: 'Company', value: 'company' },
          { title: 'Legal', value: 'legal' },
          { title: 'Resources', value: 'resources' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within category',
    },
    {
      name: 'external',
      title: 'External Link',
      type: 'boolean',
      description: 'Opens in new tab',
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: 'Category & Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'label', category: 'category', order: 'order' },
    prepare({ title, category, order }: { title: string; category: string; order: number }) {
      return {
        title: `${order !== undefined ? `${order}. ` : ''}${title}`,
        subtitle: category,
      }
    },
  },
}
