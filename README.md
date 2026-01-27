# 🎨 Landing Lab

A daily experiment in modern landing page design. Each night, a new landing page is created based on current design trends.

## Structure

```
landing-lab/
├── src/
│   └── pages/
│       ├── 2026-01-27-glassmorphism/    # Each page is dated + named
│       ├── 2026-01-28-brutalist/
│       └── ...
├── LEARNINGS.md                          # Concepts & techniques learned
└── ARCHIVE.md                            # Index of all pages with scores
```

## Running Locally

```bash
npm install
npm run dev
```

## Adding a New Landing Page

1. Research current design trends (Awwwards, Dribbble, Behance, Land-book, etc.)
2. Create `src/pages/YYYY-MM-DD-[trend-name]/`
3. Build the page with `index.tsx` and any components
4. Update `src/App.tsx` to route to new page (or make it the default)
5. Update `ARCHIVE.md` with reference link and score
6. Update `LEARNINGS.md` with concepts learned

## Tech Stack

- React 18 + TypeScript + Vite
- Framer Motion (animations)
- GSAP (advanced animations)
- React Three Fiber (3D elements when needed)
- CSS Modules or inline styles

## Standards

- Target score: 84+ (client-ready)
- Score on final version, not first attempt
- Each page should be portfolio-worthy

---

*Curated nightly by Todd 🤙*
