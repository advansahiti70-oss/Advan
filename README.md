# Advan Sahiti — Portfolio

Personal portfolio of **Advan Sahiti**, Web Developer, Front-End Developer and AI Developer.
Built with React and Vite, styled with plain CSS around the Ocean & Coral palette.

- **Sections:** Home · About · Expertise · Projects (TwoMindsDev case study) · Contact
- **Links:** [GitHub](https://github.com/advansahiti70-oss) · [Instagram](https://www.instagram.com/advan66/) · [TwoMindsDev](https://twomindsdev.com/)

## Getting started

Requires Node.js 20.19+ (22 recommended, see `.nvmrc`).

```bash
npm install
npm run dev        # local development server
npm run build      # production build → dist/
npm run preview    # serve the production build on http://localhost:4173
```

## Editing content

All copy and links live in `src/data/`, so content changes never require touching components.

| File | What it controls |
| --- | --- |
| `src/data/site.js` | Name, titles, stack, GitHub/Instagram links, email, navigation items |
| `src/data/about.js` | About section copy and focus areas |
| `src/data/skills.js` | Expertise disciplines and their skills |
| `src/data/projects.js` | Project case studies |

**Add an email address.** Set `email` in `src/data/site.js`. The contact section then shows an Email option and the “Get in Touch” button opens the visitor’s email app. While it is empty, no email is shown anywhere and the button points to Instagram.

**Add a technology.** Append `{ name: 'TypeScript', icon: 'typescript' }` to a discipline in `skills.js`, then register the logo in `src/components/BrandIcon.jsx` (`import { siTypescript } from 'simple-icons'`). Items without an `icon` render as a plain list entry.

**Add a project.** Append an object to `projects.js` with the same shape as TwoMindsDev. Each project renders as a full case study; the layout direction alternates automatically.

**Use a real screenshot.** Save an image in `public/projects/` (for example `twomindsdev.webp`, about 1600px wide; 16:10 or a taller full-page capture both work) and set `preview.image: './projects/twomindsdev.webp'`. Until then the frame shows a wireframe mockup, captioned on the page as an *illustrative preview*.

## Design system

The palette is defined once, as CSS custom properties, in `src/styles/tokens.css`:

| Token | Value | Role |
| --- | --- | --- |
| `--color-ocean` | `#102B35` | Page background |
| `--color-deep` | `#1A3B46` | Panels and selected sections |
| `--color-coral` | `#FF8975` | Calls to action and highlights |
| `--color-text` | `#F1F7F5` | Headlines and primary text |
| `--color-muted` | `#A9C2C7` | Secondary text |
| `--color-line` | `#34515A` | Decorative borders and dividers |

Components use semantic aliases (`--bg`, `--surface`, `--accent`, …), so changing a palette value updates the whole site.
`node scripts/contrast.mjs` checks every text and control pairing against WCAG AA. Notably, coral buttons use ocean-colored labels (6.4:1), because white on coral is only 2.1:1.

Typography: **Bricolage Grotesque** (display and body), **Instrument Serif** italic (accent words) and **JetBrains Mono** (editorial labels), all self-hosted through Fontsource.

## Accessibility

- Semantic landmarks and a single, ordered heading outline; a skip link to the main content.
- Visible coral focus rings; all interactive outlines meet 3:1 contrast.
- Accessible mobile menu: `aria-expanded`, focus moved into the menu, Escape to close, background made `inert`.
- External links open in a new tab with `rel="noopener noreferrer"` and announce that they do.
- `prefers-reduced-motion` turns off smooth scrolling, entrance animations and the animated hero figure.

## Testing

```bash
npm run lint
npm run build && npm run test:e2e   # Playwright, desktop + mobile
```

The end-to-end suite checks the required copy, exact profile URLs, link safety attributes, section navigation (desktop and mobile menu), the absence of invented email addresses or forms, horizontal overflow from 320px to 1920px, reduced-motion behaviour, and runs an axe-core WCAG 2.2 A/AA scan.
`node scripts/screenshots.mjs` captures review screenshots of a running preview.

## Deployment

The build output in `dist/` is static and uses relative asset paths, so it works on any static host, at a domain root or under a sub-path.

**GitHub Pages** (workflow included, `.github/workflows/deploy.yml`):

1. In the repository on GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Merge to `main` (or run the workflow manually from the **Actions** tab). The site is published at `https://<user>.github.io/<repo>/`.

Netlify, Vercel or Cloudflare Pages also work: use the build command `npm run build` with the output directory `dist`.

## Credits

Logos from [Simple Icons](https://simpleicons.org/) (CC0). Fonts are licensed under the SIL Open Font License.
