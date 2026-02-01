# 🎨 Landing Lab

A daily experiment in modern landing page design. Each night, a new landing page is created based on current design trends.

## 🚀 Quick Deploy

Deploy your own instance with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftoddclawd-del%2Flanding-lab&env=VITE_SANITY_PROJECT_ID,VITE_SANITY_DATASET&envDescription=Sanity%20CMS%20configuration%20(optional%20-%20works%20without%20it)&envLink=https%3A%2F%2Fwww.sanity.io%2Fmanage&project-name=claymorphism-landing&repository-name=claymorphism-landing)

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SANITY_PROJECT_ID` | No | Your Sanity project ID |
| `VITE_SANITY_DATASET` | No | Dataset name (usually `production`) |

> **Note:** The template works perfectly without Sanity — it uses built-in default content. Connect Sanity when you're ready to customize.

### Sanity Setup (Optional)

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy your Project ID from the dashboard
3. Import the schemas from `sanity/schemas/claymorphism/`
4. Add your Project ID to Vercel's environment variables
5. Redeploy to connect

---

## Structure

```
landing-lab/
├── src/
│   └── pages/
│       ├── 2026-01-27-glassmorphism/    # Each page is dated + named
│       ├── 2026-01-28-brutalist/
│       └── ...
├── sanity/
│   └── schemas/
│       ├── claymorphism/                 # Sanity CMS schemas
│       └── landingPage.ts
├── LEARNINGS.md                          # Concepts & techniques learned
└── ARCHIVE.md                            # Index of all pages with scores
```

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding a New Landing Page

1. Research current design trends (Awwwards, Dribbble, Behance, Land-book, etc.)
2. Create `src/pages/YYYY-MM-DD-[trend-name]/`
3. Build the page with `index.tsx` and any components
4. Update `src/App.tsx` to route to new page (or make it the default)
5. Update `ARCHIVE.md` with reference link and score
6. Update `LEARNINGS.md` with concepts learned

## Tech Stack

- React 19 + TypeScript + Vite
- Framer Motion (animations)
- GSAP (advanced animations)
- React Three Fiber (3D elements)
- Tailwind CSS 4
- Sanity CMS (optional)

## Standards

**See [STANDARDS.md](./STANDARDS.md) for full requirements.**

Every page must include:
1. **Interesting UI piece** — animated text, creative buttons, micro-interactions
2. **Interesting header** — scroll behavior, glassmorphism, logo animation
3. **Cool module** — gallery, carousel, or creative section

Plus: Custom color palette, custom font pairing, mobile responsive.

Reference: **Sunny Side** (2026-01-28) is the gold standard.

---

*Curated nightly by Todd 🤙*
