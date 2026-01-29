# BLUEPRINT.md — Brand-First Design Process

## The Mistake: Colors ≠ Brand

Slapping brand colors on a template doesn't make it feel like a brand. A cohesive brand identity requires intentional decisions across multiple dimensions — not just hex codes.

## The Process: Ask Before Building

Before touching code, work through these questions:

### 1. Vibe Check
- What's the *feeling* the shader/hero evokes? (organic, sharp, playful, serious)
- Should the UI **lean into** that feeling or **contrast** it?
- Keywords to define: warm/cool, minimal/rich, serious/friendly

### 2. Typography
Don't default to Inter. Typography sets personality:
- **Serif** → literary, premium, calm, established
- **Geometric sans** → modern, techy, clean
- **Humanist sans** → friendly, approachable, warm
- **Display/quirky** → bold, playful, memorable

Pair intentionally: Fraunces (headings) + Inter (body) worked because Fraunces has warmth that echoes organic shader forms.

### 3. Visual Motifs
Elements from the hero should bleed into the UI:
- Organic blob shapes as dividers
- Gradient backgrounds pulling from palette
- Curved/pill buttons vs sharp rectangles
- Shadow colors tinted with brand hues (not pure black)

### 4. Layout Philosophy
Cards are safe but forgettable. Consider:
- **Editorial/magazine** — staggered, asymmetric, breathing room
- **Full-bleed sections** — alternating backgrounds
- **Numbered sequences** — implies intentionality
- **No containers** — let typography and whitespace do the work

### 5. Iconography
Generic icons (○ ◇ □ △) are placeholder-tier. Options:
- Custom SVG illustrations matching the aesthetic
- Line art with brand colors
- Animated/interactive icons
- Abstract shapes that echo the visual language

### 6. The Feeling Test
Define the target feeling in two words:
- "Expensive + Friendly" → warm palette, generous whitespace, refined type, soft shadows
- "Bold + Playful" → saturated colors, chunky type, unexpected layouts
- "Minimal + Premium" → restrained palette, lots of air, sharp details

Everything should pass the test: "Does this feel [word 1] and [word 2]?"

---

## Domain Warp Case Study

**Shader vibe:** Warm, organic, flowing (cream/sky/amber/earth palette)

**Target feeling:** Expensive + Friendly

**Decisions made:**
| Element | Before | After |
|---------|--------|-------|
| Font | Inter (safe) | Fraunces serif (warm, character) |
| Layout | Card grid | Editorial staggered flow |
| Icons | Unicode shapes | Custom flowing SVGs |
| Sections | White boxes | Blob dividers, gradient CTAs, dark quote block |
| Buttons | Sharp rectangles | Pill shapes (borderRadius: 100) |
| Shadows | Gray | Brown-tinted (rgba(53, 35, 20, 0.08)) |
| Labels | ALL CAPS | Italic serif |

**Result:** Feels like a brand, not a template.

---

## Checklist Before Shipping

- [ ] Typography has personality (not just "clean sans-serif")
- [ ] At least one visual motif echoes the hero/shader
- [ ] Colors appear in shadows, gradients, and accents — not just buttons
- [ ] Layout has rhythm and breathing room
- [ ] Icons/illustrations feel custom, not stock
- [ ] Passes the two-word feeling test
- [ ] Would someone screenshot this? (the "portfolio-worthy" test)

---

*Last updated: 2026-01-29*
*Lesson learned: Brand is holistic. Start with feeling, not features.*
