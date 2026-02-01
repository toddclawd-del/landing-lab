/**
 * Claymorphism - Pricing Tier Schema
 * Document for pricing plans
 */

export default {
  name: 'clayPricingTier',
  title: 'Pricing Tier',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'e.g., Free, Pro, Team, Enterprise',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Price display (e.g., "$0", "$12", "Custom")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'billingPeriod',
      title: 'Billing Period',
      type: 'string',
      initialValue: '/mo',
      description: 'e.g., /mo, /year, one-time',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'string',
      description: 'Brief plan description (e.g., "Perfect for getting started")',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of features included in this plan',
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Started',
    },
    {
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'string',
    },
    {
      name: 'highlighted',
      title: 'Highlighted (Popular)',
      type: 'boolean',
      description: 'Mark as most popular plan with special styling',
      initialValue: false,
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
      description: 'Lower numbers appear first (left)',
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
    select: { title: 'name', price: 'price', highlighted: 'highlighted', order: 'order' },
    prepare({ title, price, highlighted, order }: { title: string; price: string; highlighted: boolean; order: number }) {
      return {
        title: `${order !== undefined ? `${order}. ` : ''}${title} - ${price}`,
        subtitle: highlighted ? '⭐ Popular' : '',
      }
    },
  },
}
