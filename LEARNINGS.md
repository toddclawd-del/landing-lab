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

## 2026-01-28 — Kinetic Typography

**Reference:** [Webflow - 8 Web Design Trends 2026](https://webflow.com/blog/web-design-trends-2026) | [TheeDigital - Web Design Trends 2026](https://www.theedigital.com/blog/web-design-trends) | [Habito Studio](https://www.habito.studio)

### 🎓 Concepts & Techniques

**1. The Psychology of Moving Text**
- Static text is passive; moving text demands attention
- The brain is wired to track motion—kinetic type exploits this for engagement
- Movement should reinforce meaning: words like "move" or "connect" feel more powerful when they literally move
- Too much motion = chaos; restraint is key—animate the important parts, let the rest breathe

**2. Character-Level Animation (Split Text)**
- Breaking text into individual characters enables letter-by-letter reveals
- Staggered delays (0.03-0.05s between chars) create a "wave" effect that guides the eye
- Transform origin matters: `bottom` makes letters appear to rise from a baseline
- 3D transforms like `rotateX` add depth without true 3D rendering

**3. The Easing Sweet Spot**
- Cubic bezier `[0.215, 0.61, 0.355, 1]` (ease-out-cubic) feels natural for reveals
- Linear motion feels mechanical; ease-out gives "settling" feeling
- Spring physics (via `useSpring`) creates organic, weighted motion
- Different easings for different emotions: snappy = energetic, soft = elegant

**4. Typewriter Effect Psychology**
- Mimics human typing speed (80-120ms per character)
- Creates anticipation—users wait to see what word comes next
- Deletion phase (faster, ~50ms) feels natural because humans backspace quickly
- Blinking cursor is a universal "something is happening" signal

**5. Magnetic/Cursor-Reactive Elements**
- Elements that follow the cursor create playfulness and delight
- Spring damping (25-35) prevents jittery tracking
- Subtle movement range (10-20% of cursor offset) feels responsive but not annoying
- Returns to origin on mouse leave—completion is satisfying

**6. The Scramble Effect**
- Random characters resolving into readable text = "decoding" metaphor
- Common in tech/hacker aesthetics but works anywhere for emphasis
- Frame rate matters: 30fps (33ms intervals) is smooth enough without burning CPU
- Iteration speed should be fast enough to not test patience (~1-2 seconds total)

**7. Word Rotation/Flip Animations**
- Cycling through words keeps content fresh without page reloads
- 3D `rotateX` on exit/enter creates "slot machine" or "flip board" effect
- Timing: 2-3 seconds per word is long enough to read, short enough to maintain interest
- AnimatePresence handles enter/exit states cleanly in React

**8. Hierarchy Through Motion**
- Primary content animates first, secondary follows
- Delay creates visual rhythm: badge → title → subtitle → CTAs
- Static elements feel "stable" while animated elements grab focus
- Motion should flow in reading direction (top→down, left→right in LTR languages)

**9. The Wave Hover Effect**
- Characters ripple in sequence on hover—playful and tactile
- Short delays (0.03s) between characters create smooth wave
- Works best on short text (logos, CTAs)—long text becomes visually busy
- Color shift during wave adds extra dimension

**10. Scroll-Triggered Reveals**
- Content appearing as you scroll creates "discovery" feeling
- `useInView` with `once: true` = animate once, don't re-trigger on scroll back
- Negative margin (`-100px`) triggers animation before element hits viewport center
- Direction variants (up/down/left/right) add spatial logic to layouts

### 📋 Implementation Notes

**Components Built:**
- `SplitText` — Character/word/line splitting with staggered reveal animation
- `MagneticText` — Cursor-following text with spring physics
- `ScrollRevealText` — Directional scroll-triggered animation wrapper
- `Typewriter` — Classic typing effect with word cycling and deletion
- `Marquee` — Infinite horizontal scroll (left/right direction support)
- `WaveText` — Character-level wave animation on hover with color shift
- `ScrambleText` — Random characters resolving to readable text on scroll-in
- `RotatingWords` — 3D flip animation cycling through word array
- `Nav` — Fixed nav with magnetic logo and wave text
- `Hero` — Parallax section with rotating accent word and typewriter subtitle
- `ServicesSection` — Grid of hover-lift cards with wave title effect
- `StatementSection` — Word-by-word scroll reveal for impact statement
- `StatsSection` — Alternating direction reveals with gradient numbers
- `WorkSection` — Project cards with image hover zoom and overlay
- `CtaSection` — Split text CTA with wave button
- `Footer` — Magnetic logo with footer marquee

**Key Dependencies:**
- `framer-motion` — AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring
- React hooks — useRef, useEffect, useState, useMemo

**Animation Techniques Used:**
- Character-level staggered reveals
- 3D transforms (rotateX) for flip effects
- Spring physics for magnetic cursor tracking
- Typewriter with deletion phase
- Scramble/decode text effect
- Wave animation on hover
- Scroll-linked parallax (opacity, y, scale)
- Infinite marquee with CSS animation

**Score: 89/100**

| Category | Score | Notes |
|----------|-------|-------|
| Visual Impact | 22/25 | Strong kinetic hero with gradient rotating text; marquee adds movement |
| Modern Feel | 19/20 | Nails 2026 trends: kinetic type, minimal copy, dark mode, motion-first |
| Code Quality | 14/15 | Clean component separation; reusable animation components |
| Animation/Motion | 14/15 | Wide variety of text animations; wave, scramble, rotate, typewriter all work smoothly |
| Responsiveness | 13/15 | Mobile-first CSS; nav hides links on mobile; could add hamburger menu |
| Performance | 7/10 | No heavy canvas; marquees run continuously; respects prefers-reduced-motion |

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
