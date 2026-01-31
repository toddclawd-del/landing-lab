# 🧠 Landing Lab — Learnings

Design techniques and concepts learned from building landing pages. 

> **Format:** Each entry includes:
> 1. **Concepts & Techniques** — The "why" and design theory
> 2. **Implementation Notes** — What was built

---

## 2026-01-31 — Liquid Motion Design

**Reference:** [Design Shack - Liquid Animation](https://designshack.net/articles/trends/liquid-animation/) | [Envato Hub - Liquid Design Deep Dive](https://hub.author.envato.com/trend-deep-dive-liquid-design/) | [Apple Liquid Glass](https://www.apple.com/au/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) | [Patreon Rebrand](https://news.patreon.com/articles/patreon-redesigned)

### 🎓 Concepts & Techniques

**1. The Psychology of Fluid Motion**
- Liquid animations tap into our primal relationship with water — they feel natural, soothing, alive
- Static UI feels mechanical; fluid UI feels organic and responsive
- The brain is wired to notice smooth, continuous motion — it's calming yet attention-grabbing
- Liquid design is a rebellion against the rigid grid — it says "this interface breathes"
- Used well, it creates a sense of premium craftsmanship (think Apple's design philosophy)

**2. Morphing Blob Shapes (The Signature Element)**
- Organic, amorphous shapes that continuously shift and evolve
- SVG paths with multiple keyframes create the "breathing" effect
- Key principle: the shape should feel ALIVE, not just moving randomly
- Use easeInOut timing for smooth, natural transitions between states
- Blurred blobs in backgrounds create ambient depth without distraction

**3. The Goo/Metaball Effect**
- SVG filter combining Gaussian blur + color matrix creates the "liquid surface tension" look
- `filter: url(#goo)` — the blur softens edges, the color matrix sharpens them back
- Elements appear to merge and separate like water droplets
- Perfect for cursors, navigation, and interactive elements
- The effect works best with limited elements — too many becomes chaotic

**4. Liquid Hover States**
- Traditional hovers are instant; liquid hovers are gradual transformations
- Border-radius animations create organic shape morphing (50px → 40px → 60px → 45px)
- Scale + shadow changes simulate physical "lifting" or "pressing"
- The distortion should match the interaction — subtle for browse, dramatic for action

**5. Displacement Map Distortion**
- SVG filters (feTurbulence + feDisplacementMap) create water-ripple effects on images
- The "noise" seed determines the ripple pattern — animate it for flowing water
- Scale parameter controls intensity — 20-40 for subtle, 60+ for dramatic
- Apply sparingly — full-page distortion is disorienting, targeted distortion is delightful

**6. Color Theory for Liquid UI**
- Gradients are essential — solid colors feel flat, gradients feel dimensional
- Cool tones (indigo, cyan, violet) evoke water/tech; warm tones (pink, coral) evoke organic
- `mix-blend-mode: screen` makes overlapping elements glow rather than muddy
- Dark backgrounds make liquid effects pop — the luminosity contrast is key
- Animated gradient shifts (background-position animation) create "living" surfaces

**7. The Metaball Cursor Pattern**
- Custom cursor + trailing blob that follows with spring physics
- Spring stiffness (300) vs damping (30) creates the "liquid lag" feel
- Multiple trailing blobs with different spring values = viscous fluid simulation
- Apply the goo filter to merge cursor + trail for true metaball effect
- Hide on mobile — liquid cursors don't translate to touch interfaces

**8. Liquid Typography**
- Text that ripples, morphs, or flows on interaction
- Key constraint: maintain readability at all times — distortion should be decorative, not obstructive
- Gradient text with animated background-position creates shimmer effects
- Character-level animation (staggered reveals) + liquid easing = elegant text entrances
- Works best on display text (headlines), not body copy

**9. Performance Considerations**
- SVG filters are GPU-accelerated but can be expensive at scale
- Limit continuous animations to one hero element; others should be interaction-triggered
- Use `will-change: transform` for smooth blob morphing
- On mobile, reduce complexity — fewer blobs, simpler paths, shorter animations
- Blur radius affects performance linearly — 40px is usually the sweet spot

**10. When Liquid Design Works**
- Creative agencies, design studios, premium brands, innovative tech products
- Products that want to feel cutting-edge and alive
- Dark mode interfaces where luminosity creates depth
- Hero sections, loading states, cursors, CTAs — high-impact touchpoints
- NOT recommended for: data-heavy dashboards, accessibility-critical sites, high-content pages

### 📋 Implementation Notes

**Components Built:**
- `LiquidFilters` — SVG defs for goo/metaball effect, liquid distortion, gradient definitions
- `MorphingBlob` — Animated SVG path component with configurable size, color, duration, delay
- `LiquidButton` — CTA with border-radius morphing on hover, goo filter application
- `LiquidCard` — Service cards with expanding blob glow on hover, AnimatePresence
- `LiquidImage` — Portfolio images with displacement map distortion on hover
- `MetaballCursor` — Custom cursor with trailing blob, spring physics, goo filter merge
- `LiquidMarquee` — Infinite scrolling text with stroke-only typography
- `Nav` — Glassmorphism nav with scroll-triggered appearance
- `Hero` — Multiple morphing blobs (blurred), gradient text animation, scroll parallax
- `Services` — Grid of liquid cards with staggered scroll reveals
- `Work` — Masonry portfolio with liquid image hover effects
- `Stats` — Animated stat counters with gradient numbers
- `CTA` — Full-width section with ambient morphing blob background
- `Footer` — Multi-column layout with brand consistency

**Key Dependencies:**
- `framer-motion` — useMotionValue, useSpring, AnimatePresence, useScroll, useTransform
- SVG filters — feTurbulence, feDisplacementMap, feGaussianBlur, feColorMatrix
- Google Fonts: Space Grotesk (display) + Inter (body)

**Color Palette:**
- Background: `#050510` (deep space)
- Background Light: `#0a0a1a`
- Primary: `#6366f1` (indigo)
- Secondary: `#8b5cf6` (violet)
- Accent: `#06b6d4` (cyan)
- Accent 2: `#f472b6` (pink)
- Accent 3: `#22d3ee` (light cyan)
- Text: `#f8fafc`
- Muted: `rgba(248, 250, 252, 0.6)`

**Animation Techniques Used:**
- SVG path morphing with multiple keyframe states
- Spring physics for cursor/blob following (stiffness: 100-300, damping: 25-35)
- Border-radius keyframe animations for organic shape shifts
- Blur-based metaball effect (filter: url(#goo))
- Displacement map distortion for liquid image hover
- Gradient text with animated background-position
- Staggered scroll reveals with useInView
- Parallax scroll transforms (y, opacity)

**Score: 89/100**

| Category | Score | Notes |
|----------|-------|-------|
| Visual Impact | 23/25 | Morphing blobs create striking depth; metaball cursor is memorable |
| Modern Feel | 19/20 | Hits 2026 liquid design trend perfectly; Apple/Patreon DNA visible |
| Code Quality | 14/15 | Clean SVG filter system, reusable blob component, TypeScript |
| Animation/Motion | 14/15 | Smooth path morphing, spring cursor, liquid hover distortion |
| Responsiveness | 12/15 | Mobile-first with cursor removal; grid collapse could be smoother |
| Performance | 7/10 | SVG filters + continuous blob animation; throttled well but runs always |

---

## 2026-01-30 — Neo-Brutalism

**Reference:** [Bejamas - Neubrutalism Trend](https://bejamas.com/blog/neubrutalism-web-design-trend) | [HubSpot - Neo Brutalism Guide](https://blog.hubspot.com/website/neo-brutalism) | [Figma](https://figma.com) & [Gumroad](https://gumroad.com) (canonical examples)

### 🎓 Concepts & Techniques

**1. The Anti-Design Philosophy**
- Neo-brutalism emerged as a rebellion against the "safe" aesthetic of neumorphism and glassmorphism
- It draws from brutalist architecture: raw, honest, function-first
- The goal is to create designs that are MEMORABLE, not necessarily "pretty"
- It's anti-bland — refuses to blend into the sea of soft gradients and subtle shadows

**2. Hard Offset Shadows (The Signature Look)**
- Instead of soft CSS box-shadows, neo-brutalism uses solid color offset rectangles
- `box-shadow: 8px 8px 0 #000` — no blur, no spread, pure offset
- Creates a "sticker" or "cut-out" effect where elements feel lifted off the page
- On hover, increase the offset to simulate the element "lifting" further
- Isometric feel at 45° angles is common (equal x and y offset)

**3. Clashing Color Theory**
- Traditional color harmony (complementary, analogous) is intentionally violated
- High-saturation primaries sit next to each other: electric yellow, hot pink, bright blue
- The clashing creates ENERGY and TENSION — your eye can't rest
- Pure black is embraced (avoided in most modern UI) as the grounding element
- Warm off-white backgrounds soften the intensity while maintaining contrast

**4. Thick Black Outlines**
- 2-4px solid black borders on EVERYTHING: buttons, cards, badges, shapes
- Creates visual definition and separates elements clearly
- Reminiscent of comic books, pop art, and 90s web design
- The weight should be consistent across the design system

**5. Typography as Decoration**
- Chunky display fonts (Space Grotesk, Space Mono, Archivo Black) dominate
- Text is often THE visual element, not just content
- Uppercase headlines with tight letter-spacing create impact
- Highlighted words with background color + border = "sticker" text effect
- Rotation on text blocks (-2° to 2°) adds playful energy

**6. Geometric Floating Shapes**
- Simple shapes (squares, circles) float in the background
- They're purely decorative — reinforcing the "playful chaos" aesthetic
- Animated with subtle bobbing motion (translateY, rotate)
- Each shape gets its own accent color from the palette

**7. Function Over Form (But Make It Fun)**
- Despite the chaos, neo-brutalism prioritizes readability and UX
- Generous whitespace between elements aids scanning
- Clear visual hierarchy through size and weight, not subtlety
- Navigation is straightforward; only the aesthetics are "loud"

**8. Hover States That Transform**
- Buttons "lift" on hover: decrease x/y position while increasing shadow offset
- This creates a physical, tactile feeling — like pressing a rubber stamp backwards
- Spring animations (stiffness: 300-400, damping: 20-25) feel responsive but not jittery
- Scale rarely changes; it's about POSITION and SHADOW

**9. The Marquee Pattern**
- Infinite scrolling text strips are a neo-brutalist staple
- Creates movement without requiring user interaction
- Bold typography + high-contrast colors = attention without being annoying
- Borders top and bottom anchor the strip in the layout

**10. When Neo-Brutalism Works**
- Creative agencies, design studios, art/culture sites, indie brands
- Products targeting younger, design-savvy audiences
- Brands that want to stand out and have personality
- NOT recommended for: healthcare, finance, enterprise B2B, accessibility-focused sites

### 📋 Implementation Notes

**Components Built:**
- `BrutalButton` — Hard shadow buttons with hover lift animation (spring physics)
- `BrutalCard` — Offset shadow cards with scroll-triggered reveal + hover transform
- `MarqueeStrip` — Infinite scrolling text with configurable direction/colors
- `Nav` — Fixed nav with scroll-triggered background + border appearance
- `Hero` — Floating geometric shapes, sticker text highlights, staggered reveals
- `Services` — Grid of colored cards with emoji icons
- `Work` — Project portfolio with hover overlay reveals (AnimatePresence)
- `Testimonials` — Quote cards with brutal styling
- `CTA` — Bold split-text headline with rotating background shapes
- `Footer` — Multi-column links with brand consistency

**Key Dependencies:**
- `framer-motion` — Spring physics, AnimatePresence, useInView, whileHover/whileTap
- Google Fonts: Space Grotesk (display) + Inter (body)

**Color Palette:**
- Background: `#FFFEF5` (warm off-white)
- Black: `#1a1a1a`
- Yellow: `#FFE600` (electric)
- Pink: `#FF5CAA` (hot)
- Blue: `#3B82F6` (bright)
- Green: `#22C55E` (lime)
- Purple: `#A855F7` (vivid)
- Orange: `#FF6B35` (burnt)

**Animation Techniques Used:**
- Spring physics for hover transforms (`stiffness: 400, damping: 25`)
- Staggered scroll reveals with `useInView` + `delay: index * 0.1`
- Floating background shapes with infinite `y` and `rotate` animations
- AnimatePresence for project card hover overlays
- Infinite marquee with CSS animation

**Score: 91/100**

| Category | Score | Notes |
|----------|-------|-------|
| Visual Impact | 24/25 | Immediately distinctive; hard shadows and clashing colors demand attention |
| Modern Feel | 19/20 | Peak 2026 trend; Figma/Gumroad DNA with fresh creative agency execution |
| Code Quality | 14/15 | Clean component architecture; reusable BrutalButton/BrutalCard patterns |
| Animation/Motion | 14/15 | Spring hover physics, floating shapes, scroll reveals, marquee strips |
| Responsiveness | 13/15 | Mobile-first padding; nav simplified on mobile; grid collapses well |
| Performance | 7/10 | No heavy assets; floating shape animations run continuously |

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

## 2026-01-29 — Bento Grid 2.0

**Reference:** [Haddington Creative - 2026 Trends](https://www.haddingtoncreative.com/post/the-top-web-design-trends-of-2026) | [Mockuuups Studio - Best Bento Grids](https://mockuuups.studio/blog/post/best-bento-grid-design-examples/) | [WriterDock - Bento Grids & Beyond](https://writerdock.in/blog/bento-grids-and-beyond-7-ui-trends-dominating-web-design-2026)

### 🎓 Concepts & Techniques

**1. The Bento Box Philosophy**
- Inspired by Japanese lunch boxes where food is organized in modular compartments
- Each tile is self-contained—functions independently but creates harmony as a whole
- Allows dense information display without clutter; users "scan" tiles like scanning a menu
- In 2026, Bento has evolved from static to "Active Grid"—tiles respond, reveal, animate

**2. Variable Aspect Ratios (Breaking the Square)**
- Traditional grids use uniform squares; modern Bento uses mixed sizes
- `span: 'large'` (2x2), `span: 'wide'` (2x1), `span: 'tall'` (1x2) create visual hierarchy
- Large tiles = primary content, small tiles = secondary/accent
- Tall cards work especially well for mobile-first designs (vertical scroll)

**3. Hover Reveal Patterns**
- Static tiles are passive; interactive tiles create engagement
- `AnimatePresence` enables smooth content transitions on hover
- Reveal patterns: overlay with secondary info, zoom into detail, play video/animation
- Hover state should provide *new* information, not just visual feedback

**4. Colored Soft Shadows (Glow Effects)**
- Traditional drop shadows are black/gray; modern shadows match accent colors
- `box-shadow: 0 20px 60px -15px ${accentColor}30` creates a "glow" effect
- Colored shadows make elements feel like they're emitting light, not just elevated
- Pair with dark backgrounds for maximum impact

**5. Animated Gradient Backgrounds (Pseudo-Video)**
- Rotating conic gradients with heavy blur simulate ambient video
- Less weight than actual video files; achieves similar "living" feel
- Use `filter: blur(60px)` on a rotating element for smooth diffusion
- Lower opacity (0.08-0.15) keeps content readable while adding depth

**6. The "Tile Personality" Concept**
- Each tile can have its own accent color, creating a diverse but unified palette
- Hover states intensify that tile's personality (brighter glow, more opacity)
- This technique guides the eye without explicit visual hierarchy markers

**7. Micro-Interactions Within Tiles**
- Corner glows that appear on hover
- Scale transforms (1.02x) that make tiles feel "lifted"
- Content that shifts/reveals secondary information
- These small touches make the grid feel tactile and responsive

**8. Staggered Grid Animations**
- Tiles animate in with `delay: index * 0.1` for cascade effect
- `useInView` with `once: true` prevents re-triggering on scroll back
- Animation direction should follow reading pattern (left-to-right, top-to-bottom)

**9. Glassmorphism Integration**
- Hover overlays use `backdrop-filter: blur(8px)` for frosted glass effect
- Semi-transparent backgrounds (10-15% opacity) let underlying content show through
- Works best when there's something interesting beneath (gradients, images)

**10. Responsive Grid Collapse Strategy**
- Desktop: Full bento with varied spans (4+ columns)
- Tablet: Reduce to 2-3 columns, `large` becomes `wide`
- Mobile: Single column, all spans become `normal`
- Use CSS Grid's `repeat()` with media queries or React hooks for breakpoints

### 📋 Implementation Notes

**Components Built:**
- `BentoTile` — Core tile component with hover detection, AnimatePresence reveals, colored shadows
- `AnimatedGradient` — Rotating conic gradient with blur for pseudo-video backgrounds
- `FloatingOrb` — Animated blur circles for ambient background motion
- `MagneticWrapper` — Cursor-following wrapper with spring physics
- `WaveText` — Character-level hover animation with color shift
- `AnimatedCounter` — Number count-up animation triggered on scroll
- `GlassButton` — Glassmorphic buttons with hover states
- `ServiceIcon` — SVG icons for service tiles
- `Nav` — Fixed nav with scroll-triggered glassmorphism
- `Hero` — Two-column layout with text + bento grid preview
- `Services` — 5-column service cards with hover reveals
- `Work` — Portfolio bento grid with gradient backgrounds
- `Stats` — Animated counters in grid layout
- `CTA` — Centered call-to-action with floating orbs
- `Footer` — Multi-column links layout

**Key Dependencies:**
- `framer-motion` — AnimatePresence, useInView, useMotionValue, useSpring
- React hooks — useRef, useEffect, useState, custom `useMediaQuery`

**Animation Techniques Used:**
- Hover-triggered content reveals with AnimatePresence
- Rotating conic gradients for "video-like" tile backgrounds
- Spring physics for magnetic cursor following
- Staggered scroll-in animations
- Scale/shadow transitions on hover
- Character-level wave animations
- Counter animations with useInView trigger

**Responsive Strategy:**
- Custom `useMediaQuery` hook for breakpoint detection
- `useIsMobile()` and `useIsTablet()` convenience hooks
- Conditional grid column counts, gaps, and padding
- Nav links hidden on mobile, button simplified
- Bento spans collapse gracefully on smaller screens

**Score: 90/100**

| Category | Score | Notes |
|----------|-------|-------|
| Visual Impact | 23/25 | Stunning hover effects, animated gradients, colored glows |
| Modern Feel | 19/20 | Nails 2026 Bento 2.0: interactive tiles, variable ratios, micro-interactions |
| Code Quality | 14/15 | Clean component architecture, TypeScript, custom hooks |
| Animation/Motion | 14/15 | Hover reveals, AnimatePresence, spring physics, gradient rotation |
| Responsiveness | 13/15 | Mobile hooks, adaptive grids; could add hamburger menu |
| Performance | 7/10 | No heavy assets; continuous gradient animations run (could throttle) |

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
