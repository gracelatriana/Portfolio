# Personal Portfolio Website (Bilingual EN / ID)

A fast, static, single-page portfolio for an Information Systems student, built
with **[Astro](https://astro.build)** and **[Tailwind CSS](https://tailwindcss.com)**,
designed for deployment to **Vercel** (static output).

The site is **bilingual**: the UI is in **English by default** with a small
**EN / ID** toggle in the header that switches to **Indonesian**. All content is
**data-driven** — you update your bio, education, projects, etc. by editing YAML
data files, without touching any markup.

> **Note:** This project was scaffolded with clearly-labeled placeholder content.
> Every value that needs your real information is prefixed with `[PLACEHOLDER ...]`
> or uses obvious dummy values like `Your Name` and `your.email@example.com`.
> Search the `src/content/` folder for `PLACEHOLDER` to find everything to replace.

---

## Quick start

Requires **Node.js 18+** (Node 22 recommended).

```bash
npm install      # install dependencies (needs network access to npm registry)
npm run dev      # start the dev server at http://localhost:4321
npm run build    # produce the static site in ./dist
npm run preview  # preview the production build locally
```

> **If `npm install` fails with a 403 / network error**, your environment does
> not have access to the public npm registry. Run `npm install` again from a
> machine or CI environment that has internet access. All dependencies and
> versions are already declared in `package.json`; nothing else is needed.

---

## Filling in your content

All content lives in **`src/content/`**. Each translatable field has an English
(`en`) and Indonesian (`id`) variant, so translations stay in the data, not in
the code.

| File                          | What to edit                                                        |
| ----------------------------- | ------------------------------------------------------------------- |
| `src/content/site.yaml`       | Your name, tagline, role target, value prop, bio, email, location, LinkedIn, GitHub, and file paths for resume/headshot. |
| `src/content/education.yaml`  | Education entries (degree, institution, dates, coursework, honors). |
| `src/content/experience.yaml` | Internships / work (title, org, dates, achievement bullets).        |
| `src/content/projects.yaml`   | Projects (title, description, tech tags, optional GitHub/demo links).|
| `src/content/research.yaml`   | Research / publications (optional — see below).                     |
| `src/content/skills.yaml`     | Skill groups by category.                                           |
| `src/content/certifications.yaml` | Certifications (optional — see below).                          |

Editing UI labels (nav text, button text, section titles) is done in
**`src/i18n/ui.ts`** — but you normally will not need to.

### Bilingual field format

```yaml
bio:
  en: "English version of the text."
  id: "Versi Bahasa Indonesia dari teks."
```

Fields like tech `tags` and skill `items` are language-neutral, so they are
plain lists (no `en`/`id`).

### Dates and "Present"

Dates use a simple `YYYY-MM` (or `YYYY`) format, e.g. `2024-06`. For a current
role or ongoing degree, **omit `endDate`** — the site automatically shows
**"Present"** (English) / **"Sekarang"** (Indonesian).

Education and experience entries are sorted **reverse-chronologically**
automatically based on `startDate` — you do not need to order them manually.

### Optional sections (Research & Certifications)

If you have no research or no certifications, **delete the entries** from
`research.yaml` / `certifications.yaml` (leave the file with just comments or an
empty list `[]`). The section **and its navigation link disappear
automatically** — no empty sections are shown.

### Optional links

For projects, research, and certifications, **omit** a link field
(`githubUrl`, `demoUrl`, `link`, `credentialUrl`) if it does not exist. The
corresponding button/link simply will not render — no broken links.

---

## Files you must add

Place these in the **`public/`** folder (see `public/README-ASSETS.md`):

| File           | Purpose                                                        |
| -------------- | -------------------------------------------------------------- |
| `resume.pdf`   | Your CV. Served by the "Download Resume" button.               |
| `headshot.jpg` | Your professional photo (hero). Missing photo → initials tile. |
| `og-image.png` | Social preview image (1200×630px recommended). Optional.       |

The resume can be replaced anytime by dropping a new `resume.pdf` into `public/`;
no code change is required.

---

## Project structure

```
astro.config.mjs        # Astro config: static output + i18n (en default, id)
tailwind.config.mjs     # Color palette (navy/teal) + fonts (Sora/Inter)
public/                 # Static assets: resume.pdf, headshot.jpg, favicon, og-image
src/
├── content/            # ← YOUR CONTENT lives here (YAML data files)
│   └── config.ts       #   Zod schemas (validate content at build time)
├── i18n/
│   ├── ui.ts           #   UI label translations (EN/ID)
│   └── utils.ts        #   Translation + date/formatting helpers
├── layouts/
│   └── BaseLayout.astro#   HTML shell, SEO/OG meta, fonts, header, footer
├── components/         #   Section + UI components (Hero, About, ...)
│   └── PortfolioPage.astro  # Composes all sections; loads content
├── styles/
│   └── global.css      #   Tailwind layers + shared component classes
└── pages/
    ├── index.astro     #   English site  → /
    └── id/index.astro  #   Indonesian    → /id/
```

## How the bilingual routing works

- **English** is the default locale and is served at the root: `/`.
- **Indonesian** is served under `/id/`.
- The **EN / ID toggle** in the header links between the two.
- UI strings come from `src/i18n/ui.ts`; content strings come from the `en`/`id`
  fields in the YAML data files.

---

## Design system

- **Colors:** background `#FFFFFF`, alt sections `#F8FAFC`, headings `#0F172A`,
  body text `#475569`, primary navy `#1E3A8A`, secondary teal `#0891B2`,
  borders `#E2E8F0`.
- **Fonts:** `Sora` for headings, `Inter` for body (self-hosted via
  `@fontsource`).
- **Responsive:** mobile, tablet, and desktop layouts; sticky header with a
  mobile hamburger menu.
- **Minimal JS:** static HTML/CSS by default; the only client scripts are the
  mobile menu toggle and a progressive-enhancement fade-in-on-scroll (content is
  fully visible without JS).

---

## Deploying to Vercel

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In [Vercel](https://vercel.com), click **Add New → Project** and import the repo.
3. Vercel auto-detects Astro. Confirm the settings:
   - **Framework Preset:** Astro
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Vercel runs the build and serves the static `dist/` output.
5. Every push to the connected branch triggers an automatic redeploy.

**Before deploying**, update the `site` URL in `astro.config.mjs` to your real
Vercel domain so the sitemap and Open Graph/canonical URLs are correct:

```js
// astro.config.mjs
export default defineConfig({
  site: "https://your-actual-domain.vercel.app",
  // ...
});
```

> Alternatively, this static output also deploys to Netlify or GitHub Pages
> without changes to the source.

---

## Verifying quality (recommended after `npm install`)

- `npm run build` — must succeed. Content schema errors (from `config.ts`) fail
  the build with a clear message pointing to the offending file/field.
- Check the layout at mobile (375px), tablet (768px), and desktop (1280px+).
- Run a Lighthouse audit against `npm run preview` and confirm Performance and
  Accessibility scores of 90+.
- Confirm the resume download, LinkedIn, GitHub, and project links all work and
  open external links in a new tab.
