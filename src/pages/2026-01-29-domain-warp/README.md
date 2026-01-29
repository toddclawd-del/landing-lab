# Calm — Domain Warp Landing Page

A premium shader-powered landing page with smooth scroll animations and CMS integration.

![Calm Landing Page](https://toddclawd-del.github.io/landing-lab/#/domain-warp)

## ✨ What's Included

- **Organic shader backgrounds** — Mesmerizing domain warp effect
- **3D animated shapes** — Sphere, torus, octahedron, torus knot
- **GSAP scroll animations** — Smooth reveals and parallax
- **Sanity CMS** — Edit all content without touching code
- **Mobile responsive** — Looks great on all devices
- **One-click deploy** — Vercel-ready

---

## 🚀 Quick Start (15 minutes)

### Step 1: Get the Code

```bash
# Clone the template
git clone https://github.com/toddclawd-del/landing-lab.git my-landing-page
cd my-landing-page

# Install dependencies
npm install
```

### Step 2: Set Up Sanity (Your Content Editor)

1. **Create a free Sanity account** at [sanity.io](https://www.sanity.io/)

2. **Create a new project:**
   ```bash
   npm create sanity@latest -- --template clean --create-project "My Landing Page" --dataset production
   ```

3. **Add the schema** — Copy `sanity/schemas/landingPage.ts` to your new Sanity Studio's schemas folder

4. **Get your Project ID** from [sanity.io/manage](https://www.sanity.io/manage)

### Step 3: Connect Sanity to Your Site

Create a `.env` file in your project root:

```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

### Step 4: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add your environment variables (same as `.env`)
4. Click Deploy

**That's it!** Your site is live. ✨

---

## 📝 Editing Your Content

Once set up, all content is editable in Sanity Studio:

| Field | What It Controls |
|-------|------------------|
| **Brand Name** | Logo text in header & footer |
| **Tagline** | Small text above headline |
| **Headline** | Main hero text |
| **Headline Emphasis** | Italicized part of headline |
| **Subheadline** | Paragraph below headline |
| **Features** | 4 feature cards (title, description, 3D shape) |
| **Quote** | Philosophy section text |
| **CTA Title/Subtitle** | Bottom call-to-action section |
| **Colors** | Cream, Sky, Amber, Earth palette |

### To edit content:
1. Go to your Sanity Studio (usually `your-project.sanity.studio`)
2. Click "Landing Page"
3. Edit any field
4. Click Publish
5. Your live site updates automatically!

---

## 🎨 Customizing the Shader

The shader parameters are tunable in the code:

```javascript
// In index.tsx, find the Leva controls:
scale: 4.9        // Pattern scale
warpIntensity: 6.3  // How "warped" the effect is
animSpeed: 0.34     // Animation speed
octaves: 4          // Detail level
```

For live editing during development, set `<Leva hidden={false} />`.

---

## 🏗️ Project Structure

```
src/pages/2026-01-29-domain-warp/
├── index.tsx        # Main page component
├── README.md        # This file

src/lib/
├── sanity.ts        # Sanity client & content fetching

sanity/schemas/
├── landingPage.ts   # CMS schema (copy to your Studio)
```

---

## 💡 Tips

- **Images:** Add an `image` field to the Sanity schema if you need hero images
- **Links:** To add external links (Twitter, etc.), edit the footer in `index.tsx`
- **Analytics:** Add your tracking script to `index.html`
- **Domain:** Configure in Vercel dashboard → Settings → Domains

---

## 🆘 Need Help?

- **Sanity docs:** [sanity.io/docs](https://www.sanity.io/docs)
- **Vercel docs:** [vercel.com/docs](https://vercel.com/docs)
- **GSAP docs:** [gsap.com/docs](https://gsap.com/docs/v3/)

---

## 📜 License

This template is licensed for use on a single project. For multiple projects, please purchase additional licenses.

---

Built with ❤️ using React, Three.js, GSAP, and Sanity
