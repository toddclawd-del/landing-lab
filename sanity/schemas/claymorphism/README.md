# Claymorphism Template - Sanity CMS Schemas

This document describes all editable content types for the Claymorphism landing page template.

## Quick Start

1. **Install schemas in your Sanity Studio:**
   ```ts
   // sanity.config.ts
   import { claymorphismSchemas } from './schemas/claymorphism'
   
   export default defineConfig({
     schema: {
       types: [...claymorphismSchemas],
     },
   })
   ```

2. **Configure environment variables in your frontend:**
   ```env
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production
   ```

3. **The template automatically falls back to demo content** when CMS is not configured.

---

## Content Types

### 🏠 Site Settings (`claySiteSettings`)
**Type:** Singleton

Global brand configuration that appears across the site.

| Field | Type | Description |
|-------|------|-------------|
| `brandName` | string | Main brand name (nav, footer, etc.) |
| `tagline` | string | Short brand slogan |
| `logo` | image | Optional logo image |
| `lightColors` | object | Light theme color palette |
| `darkColors` | object | Dark theme color palette |
| `socialLinks` | array | Social media links (twitter, instagram, etc.) |

---

### 🎯 Hero Section (`clayHeroSection`)
**Type:** Singleton

The main landing section at the top of the page.

| Field | Type | Description |
|-------|------|-------------|
| `badge.text` | string | Announcement badge text |
| `badge.enabled` | boolean | Show/hide badge |
| `headline` | string | Main headline text |
| `headlineHighlight` | string | Gradient-colored part of headline |
| `subheadline` | text | Supporting description |
| `ctaPrimary.text` | string | Primary button label |
| `ctaPrimary.url` | string | Primary button link |
| `ctaSecondary.text` | string | Secondary button label |
| `ctaSecondary.url` | string | Secondary button link |
| `demoVideoUrl` | url | YouTube/Vimeo URL for demo modal |

---

### ⭐ Features (`clayFeature`)
**Type:** Document (orderable)

Product features displayed in a grid.

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Feature name |
| `description` | text | Brief explanation |
| `icon` | string | Lucide icon name (Target, Users, etc.) |
| `accentColor` | string | blue, pink, or purple |
| `order` | number | Display order (lower = first) |

**Available Icons:**
Target, Users, BarChart3, Bell, Palette, Lock, Zap, Heart, Globe, Rocket, Star, Shield, Cloud, MessageCircle

---

### 📊 Statistics (`clayStatistic`)
**Type:** Document (orderable)

Key metrics/social proof numbers.

| Field | Type | Description |
|-------|------|-------------|
| `value` | string | The number (e.g., "50K+", "99%") |
| `label` | string | What it represents |
| `icon` | string | Lucide icon name |
| `order` | number | Display order |

---

### 💬 Testimonials (`clayTestimonial`)
**Type:** Document

Customer quotes for the testimonial carousel.

| Field | Type | Description |
|-------|------|-------------|
| `quote` | text | The testimonial text |
| `authorName` | string | Customer name |
| `role` | string | Job title |
| `company` | string | Company name |
| `avatar.type` | string | "emoji" or "image" |
| `avatar.emoji` | string | Emoji character (if type=emoji) |
| `avatar.image` | image | Photo (if type=image) |
| `accentColor` | string | Card accent color |
| `featured` | boolean | Show prominently |

---

### 💰 Pricing Tiers (`clayPricingTier`)
**Type:** Document (orderable)

Pricing plans displayed in columns.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Plan name (Free, Pro, Team) |
| `price` | string | Price display ("$0", "$12", "Custom") |
| `billingPeriod` | string | "/mo", "/year", etc. |
| `description` | string | Brief plan description |
| `features` | array<string> | List of included features |
| `ctaText` | string | Button label |
| `ctaUrl` | string | Button link |
| `highlighted` | boolean | Mark as "Most Popular" |
| `accentColor` | string | Accent color |
| `order` | number | Display order (left to right) |

---

### 📖 About Section (`clayAboutSection`)
**Type:** Singleton

Company information and values.

| Field | Type | Description |
|-------|------|-------------|
| `headline` | string | Section title |
| `description` | text | Company description |
| `values[]` | array | Company values/cards |
| `values[].title` | string | Value name |
| `values[].description` | text | Value description |
| `values[].icon` | string | Lucide icon |
| `values[].accentColor` | string | Card accent |

---

### 🚀 CTA Section (`clayCtaSection`)
**Type:** Singleton

Final call-to-action block.

| Field | Type | Description |
|-------|------|-------------|
| `headline` | string | Main CTA text |
| `headlineHighlight` | string | Gradient-colored part |
| `subtext` | text | Supporting text |
| `buttons[]` | array | CTA buttons |
| `buttons[].text` | string | Button label |
| `buttons[].url` | string | Button link |
| `buttons[].variant` | string | "primary" or "ghost" |

---

### 🏢 Logo Grid (`clayLogoGridItem`)
**Type:** Document (orderable)

"Trusted by" company logos.

| Field | Type | Description |
|-------|------|-------------|
| `companyName` | string | Company name |
| `logo.type` | string | "letter" or "image" |
| `logo.letter` | string | Display letter |
| `logo.image` | image | Logo image |
| `url` | url | Company website |
| `order` | number | Display order |

---

### 🔗 Footer Links (`clayFooterLink`)
**Type:** Document

Navigation links in the footer.

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | Link text |
| `url` | string | URL or section ID (#features) |
| `category` | string | product, company, legal, resources |
| `order` | number | Order within category |
| `external` | boolean | Open in new tab |

---

## Color Customization

Both light and dark themes can be customized via Site Settings:

```ts
lightColors: {
  bg: '#F7F5F0',        // Page background
  surface: '#FFFEF9',    // Section backgrounds
  card: '#FFFFFF',       // Card backgrounds
  accentBlue: '#7C9FF5', // Primary accent
  accentPink: '#F5A0C4', // Secondary accent
  accentPurple: '#B88BF5', // Tertiary accent
  text: '#2D2A33',       // Primary text
  textSecondary: '#5C5867', // Secondary text
  textMuted: '#8A8693',  // Muted text
}
```

---

## Fallback Behavior

The template includes complete default content for demo purposes. When CMS data is unavailable:

1. **Brand Name:** "Claymoji"
2. **All sections:** Populated with sample content
3. **No blank states:** Template works out of the box

This allows you to:
- Demo the template without Sanity setup
- Gradually migrate content to CMS
- Always have a working fallback

---

## Frontend Integration

The template uses a custom hook for data fetching:

```tsx
import { useClaymorphismContent } from './useClaymorphismContent'

function MyComponent() {
  const content = useClaymorphismContent()
  
  // content.isLoading - true while fetching
  // content.isCmsConnected - true if CMS has data
  // content.siteSettings - merged with defaults
  // content.features - from CMS or defaults
  // etc.
}
```

---

## Tips for Content Editors

1. **Images:** Use high-contrast images for avatar photos
2. **Icons:** Stick to the available icon list for consistency
3. **Colors:** Blue, pink, and purple work best with the clay aesthetic
4. **Order fields:** Use 10, 20, 30... to leave room for insertions
5. **Testimonials:** Add at least 3-4 for the carousel to feel complete
