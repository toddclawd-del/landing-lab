# 🧠 Landing Lab — Learnings

Design techniques and concepts learned from building landing pages. 

> **Format:** Each entry includes:
> 1. **Concepts & Techniques** — The "why" and design theory
> 2. **Implementation Notes** — What was built

---

## 2026-01-27 — Aurora Mesh Gradients

**Reference:** [Deposit Photos - Web Design Trends 2025](https://blog.depositphotos.com/web-design-trends-2025.html) | [Paddle Creative - Glassmorphism](https://www.paddlecreative.co.uk/blog/the-best-web-design-trends-of-2025)

### 🎓 Concepts & Techniques

**1. Animated Mesh Gradients (Aurora Effect)**
- Multiple radial gradients that slowly drift across the canvas create an "aurora borealis" effect
- Using `screen` blend mode makes overlapping gradients brighten rather than muddy
- Subtle sine wave motion (`Math.sin(time * 0.01)`) creates organic, non-mechanical movement
- Dark background (#030014) makes colors pop while maintaining readability

**2. Grain Texture Overlay**
- SVG-based noise filter creates film grain effect without image assets
- Adds tactile, premium feel that flat colors lack
- Low opacity (0.4) prevents visual noise while adding depth
- Works well with dark themes—softens digital "harshness"

**3. Glassmorphism in Navigation**
- `backdrop-filter: blur(12px)` creates frosted glass effect
- Semi-transparent background + blur = content visible but separated
- Subtle bottom border (1px, 5% opacity) defines edge without harsh lines

**4. Scroll-Linked Parallax**
- Hero content fades and moves up as user scrolls (useTransform from framer-motion)
- Creates depth illusion—foreground moves faster than background
- Offset config `["start start", "end start"]` tracks element from viewport entry to exit

**5. Staggered Reveal Animations**
- Feature cards animate with increasing delay (`delay: index * 0.1`)
- Creates "cascade" effect that guides eye down the page
- `useInView` with `once: true` prevents re-triggering—feels intentional, not jumpy

**6. Micro-interactions**
- Button hover lifts (`whileHover: { y: -8 }`) provides tactile feedback
- Arrow slides on CTA hover (`transform: translateX(4px)`)
- Scale on press (`whileTap: { scale: 0.95 }`) confirms click registered

**7. Typography Hierarchy**
- Display: 5.5rem, weight 800, tight letter-spacing (-0.03em)
- Body: Contrast with 60% opacity white for secondary text
- Gradient text on key words creates visual focal points

**8. Marquee Pattern**
- Infinite horizontal scroll with low-opacity text
- Functions as visual separator AND brand reinforcement
- `screen` blend mode would make text glow on dark backgrounds

### 📋 Implementation Notes

**Components Built:**
- `AuroraMesh` — Canvas-based animated gradient background with 5 color points
- `GrainOverlay` — SVG noise filter as CSS background-image
- `Nav` — Glassmorphism sticky nav with blur backdrop
- `Hero` — Parallax section with badge, title, CTAs, stats
- `FeatureCard` — Hover-interactive cards with in-view detection
- `Marquee` — Infinite scrolling text strip
- `Testimonials` — Auto-cycling carousel with dot navigation
- `CtaSection` — Final conversion block
- `Footer` — Multi-column links layout

**Key Dependencies:**
- `framer-motion` — All animations (scroll, hover, tap, inView)
- React `useRef`, `useEffect`, `useState` — Canvas animation, carousel state

**Score: 88/100**

| Category | Score | Notes |
|----------|-------|-------|
| Visual Impact | 23/25 | Aurora effect is stunning; could add more depth with 3D elements |
| Modern Feel | 19/20 | Hits all 2025 trends: glassmorphism, grain, animated gradients |
| Code Quality | 14/15 | Clean component structure; could extract more reusable hooks |
| Animation/Motion | 14/15 | Smooth scroll-linked parallax, staggered reveals work well |
| Responsiveness | 13/15 | Solid mobile styles; nav could use mobile menu |
| Performance | 5/10 | Canvas animation runs continuously; could throttle when not visible |

---

## Template

### YYYY-MM-DD — [Trend Name]

**Reference:** [Link to inspiration]

#### 🎓 Concepts & Techniques

*Design theory, why this trend works, visual principles...*

#### 📋 Implementation Notes

*What was built, key components, animations used...*

**Score: XX/100**

| Category | Score | Notes |
|----------|-------|-------|
| Visual Impact | /25 | |
| Modern Feel | /20 | |
| Code Quality | /15 | |
| Animation/Motion | /15 | |
| Responsiveness | /15 | |
| Performance | /10 | |

---
