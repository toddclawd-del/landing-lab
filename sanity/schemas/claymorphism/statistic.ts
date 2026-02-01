/**
 * Claymorphism - Statistic Schema
 * Orderable document for stats section
 */

export default {
  name: 'clayStatistic',
  title: 'Statistic',
  type: 'document',
  fields: [
    {
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The stat number/value (e.g., "50K+", "99%", "4.9")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'What the stat represents (e.g., "Happy users")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name',
      options: {
        list: [
          { title: 'Smile', value: 'Smile' },
          { title: 'CheckCircle', value: 'CheckCircle' },
          { title: 'Rocket', value: 'Rocket' },
          { title: 'Star', value: 'Star' },
          { title: 'Users', value: 'Users' },
          { title: 'TrendingUp', value: 'TrendingUp' },
          { title: 'Award', value: 'Award' },
          { title: 'Zap', value: 'Zap' },
        ],
      },
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
    select: { title: 'value', subtitle: 'label', order: 'order' },
    prepare({ title, subtitle, order }: { title: string; subtitle: string; order: number }) {
      return {
        title: `${order !== undefined ? `${order}. ` : ''}${title}`,
        subtitle,
      }
    },
  },
}
