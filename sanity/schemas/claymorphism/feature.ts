/**
 * Claymorphism - Feature Schema
 * Orderable document for features grid
 */

export default {
  name: 'clayFeature',
  title: 'Feature',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., Target, Users, BarChart3, Bell, Palette, Lock)',
      options: {
        list: [
          { title: 'Target', value: 'Target' },
          { title: 'Users', value: 'Users' },
          { title: 'BarChart3', value: 'BarChart3' },
          { title: 'Bell', value: 'Bell' },
          { title: 'Palette', value: 'Palette' },
          { title: 'Lock', value: 'Lock' },
          { title: 'Zap', value: 'Zap' },
          { title: 'Heart', value: 'Heart' },
          { title: 'Globe', value: 'Globe' },
          { title: 'Rocket', value: 'Rocket' },
          { title: 'Star', value: 'Star' },
          { title: 'Shield', value: 'Shield' },
          { title: 'Cloud', value: 'Cloud' },
          { title: 'MessageCircle', value: 'MessageCircle' },
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
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
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
    select: { title: 'title', subtitle: 'description', order: 'order' },
    prepare({ title, subtitle, order }: { title: string; subtitle: string; order: number }) {
      return {
        title: `${order !== undefined ? `${order}. ` : ''}${title}`,
        subtitle,
      }
    },
  },
}
