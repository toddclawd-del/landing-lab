# Landing Lab Standards

Every landing page in this lab should be **client-ready** — polished enough to pitch to real clients.

---

## Required Elements

### 1. 🎨 Interesting UI Piece
At least one standout UI element that catches the eye:
- Animated text reveal (split-text, typewriter, fade-in)
- Creative button hover effects (magnetic, elastic, fill)
- Interactive micro-interactions
- Scroll-triggered animations

### 2. ✨ Interesting Header
The nav should have personality:
- Scroll-based state change (glassmorphism, color shift, shrink)
- Logo animation on hover
- Smooth transitions between states
- Mobile-friendly (hamburger or simplified)

### 3. 📦 One Cool Module
A section that showcases creative design:
- Gallery with hover reveals
- Testimonials carousel
- Animated stats/counters
- Interactive cards
- Parallax sections
- Creative CTA blocks

---

## Design Quality

### Colors
- **No generic palettes** — research and curate colors for the specific brand/industry
- Use 4-6 colors max: primary, secondary, accent, neutrals
- Consider warm vs cool, contrast ratios, accessibility
- Document hex codes in a `colors` object

### Typography
- **Custom font pairing** — not just system fonts
- Heading font with character (serif, display, or unique sans)
- Clean body font for readability
- Load from Google Fonts or self-host
- Example: Fraunces + DM Sans, Playfair + Source Sans

### Spacing & Layout
- Consistent section padding (use rem units)
- Proper visual hierarchy
- Responsive grid layouts
- Mobile-first considerations

---

## Technical Requirements

### Animation
- Use CSS animations for simple effects
- GSAP for complex scroll-triggered animations
- Framer Motion for React-based animations
- Keep animations performant (transform/opacity only)

### Responsiveness
- Mobile breakpoint at 768px minimum
- Test on actual devices
- Navigation must work on mobile
- Images should be responsive

### Performance
- Optimize images (use appropriate sizes)
- Lazy load below-fold content
- Minimize JS bundle where possible

---

## File Structure

```
src/pages/YYYY-MM-DD-project-name/
├── index.tsx          # Main component
├── styles.module.css  # Optional: CSS modules
└── components/        # Optional: sub-components
```

---

## Checklist Before Shipping

- [ ] Interesting UI element implemented
- [ ] Header has scroll behavior
- [ ] At least one cool module/section
- [ ] Custom color palette (documented)
- [ ] Custom font pairing (loaded)
- [ ] Mobile responsive
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Added to Home.tsx list
- [ ] Added route in App.tsx

---

## Reference: Sunny Side (2026-01-28)

The Sunny Side restaurant landing is the gold standard:

**UI:** Animated headline reveal, logo spin on hover  
**Header:** Glassmorphism on scroll  
**Module:** Instagram gallery with hover overlays  
**Colors:** Terracotta, Sage, Cream, Peach  
**Fonts:** Fraunces (headings) + DM Sans (body)  
**Extras:** Marquee features strip, floating hero image, menu card hovers

Use this as a reference when building new pages.
