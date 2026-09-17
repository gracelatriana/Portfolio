# Design Document

## Overview

A static, single-page portfolio site built with **Astro** and **Tailwind CSS**, deployed to **Vercel**. Content (education, experience, projects, research, skills, certifications, site metadata) is stored in structured data files under `src/content/`, decoupled from presentation components, so the site owner can update content by editing data files without touching markup or styling.

The page is a single scrollable route (`/`) with a sticky header providing anchor navigation to each section. No backend/server is required; the contact form (if used) integrates with a no-backend form service (Formspree) via a plain HTML form action, falling back to a `mailto:` link if the owner prefers zero third-party dependency.

## Architecture

```
astro.config.mjs
tailwind.config.mjs
package.json

public/
├── resume.pdf
├── headshot.jpg
└── favicon.svg

src/
├── content/
│   ├── config.ts              # Content Collections schema definitions
│   ├── site.yaml               # name, tagline, bio, email, socials, resume path
│   ├── education.yaml
│   ├── experience.yaml
│   ├── projects.yaml
│   ├── research.yaml
│   ├── skills.yaml
│   └── certifications.yaml
│
├── layouts/
│   └── BaseLayout.astro       # <html> shell, meta/OG tags, header, footer, font imports
│
├── components/
│   ├── Header.astro           # sticky nav + social icons + resume button
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── About.astro
│   ├── Education.astro
│   ├── Experience.astro
│   ├── Projects.astro
│   ├── ProjectCard.astro
│   ├── Research.astro
│   ├── Skills.astro
│   ├── Certifications.astro
│   ├── Contact.astro
│   └── SectionHeading.astro   # shared section title style
│
└── pages/
    └── index.astro             # composes all section components in order
```

### Rendering approach

- Astro components are `.astro` files that render to static HTML at build time — no client-side framework runtime is shipped unless explicitly opted into with a client directive (not needed for this site).
- Content Collections (`src/content/*` + `config.ts` schema) give type-checked, structured content. Each YAML file is parsed against a Zod schema, so a malformed entry fails the build loudly instead of rendering broken markup.
- Sections that can legitimately be empty (Research, Certifications) are conditionally rendered: the parent `index.astro` checks collection length and skips the component (and its nav link) if empty, satisfying Requirements 5.3 and 7.2.

## Components and Interfaces

### Content Collection Schemas (`src/content/config.ts`)

```ts
site:            { name, tagline, roleTarget, bio, email, location, linkedin, github, resumeFile, ogImage }
education:       { degree, institution, startDate, endDate, coursework?[], honors?[] }
experience:      { title, organization, startDate, endDate?, bullets[] }
projects:        { title, description, tags[], githubUrl?, demoUrl?, image?, featured? }
research:        { title, venue, date, summary, link? }
skills:          { category, items[] }   // one entry per category
certifications:  { name, issuer, date, credentialUrl? }
```

`endDate` absent on experience/education renders as "Present" (Requirement 3.3).

### Component Responsibilities

- **Header.astro**: sticky top bar; anchor links generated from a static list filtered by which optional sections are non-empty; resume download button; LinkedIn/GitHub icons. Mobile: collapses into a hamburger menu.
- **Hero.astro**: pulls from `site.yaml`; renders name, tagline, photo, CTA buttons, social icons.
- **About.astro**: bio text + quick facts (university, grad date) sourced from `site.yaml` + latest `education` entry.
- **Education.astro / Experience.astro**: map over sorted collection entries (sorted by `startDate` descending at build time), render via a shared timeline-style layout.
- **Projects.astro**: grid of `ProjectCard.astro`, each rendering tags as pill badges and conditionally rendering GitHub/demo links only if present (Requirement 4.2).
- **Research.astro / Certifications.astro**: list layout; parent page omits the component entirely when the collection is empty.
- **Skills.astro**: renders one column/block per category with items as tag chips.
- **Contact.astro**: email (mailto), LinkedIn, GitHub, optional Formspree `<form>` (progressive enhancement — plain HTML form POST, works without JS).

## Data Models

Data lives entirely in YAML under `src/content/`. Example shape for `projects.yaml`:

```yaml
- title: "Inventory Management System"
  description: "Full-stack system for tracking warehouse inventory with real-time alerts."
  tags: ["React", "PostgreSQL", "Node.js"]
  githubUrl: "https://github.com/username/repo"
  demoUrl: "https://demo.example.com"
  featured: true
```

This structure directly satisfies Requirement 13 (content maintainability): adding a project is appending one YAML block; no `.astro` file changes needed.

## Visual Design

- **Colors:** background `#FFFFFF` / alt sections `#F8FAFC`; text `#0F172A` (headings) / `#475569` (body); primary accent `#1E3A8A` (navy); secondary accent `#0891B2` (teal); borders `#E2E8F0`.
- **Typography:** `Sora` for headings, `Inter` for body — loaded via `@fontsource` or Google Fonts link, self-hosted preferred for performance.
- **Layout:** max-width content container (~1100px), generous vertical section padding (py-20/24), card-based grids for Projects, timeline layout for Education/Experience.
- **Motion:** minimal `fade-in-on-scroll` via a small CSS/IntersectionObserver utility (progressive enhancement, not required for content visibility — degrades gracefully with JS off).

## Error Handling

- **Missing/malformed content:** Zod schema validation in `config.ts` fails the Astro build with a clear error pointing to the offending file/field — caught at build time, never in production.
- **Missing optional fields** (e.g., no `demoUrl`): components use conditional rendering (`{demoUrl && (...)}`) so no broken links or empty attributes render (Requirement 4.2).
- **Empty optional collections** (Research, Certifications): guarded at the `index.astro` composition level — component and its nav entry are both skipped.
- **Contact form submission failure** (if Formspree used): form's native HTML validation covers required fields; network/service errors surface Formspree's own hosted error response since no custom JS handling is added for MVP.

## Testing Strategy

Per user preference, automated tests are not included unless requested. Verification for this project will instead rely on:

1. **Build-time validation:** `astro build` failing on schema mismatches acts as the primary content-correctness gate.
2. **Manual responsive check:** verify layout at mobile (375px), tablet (768px), and desktop (1280px+) widths.
3. **Lighthouse audit:** run against the production build to confirm Performance/Accessibility ≥ 90 (Requirement 11.3).
4. **Manual link check:** confirm resume download, LinkedIn, GitHub, and all project/certification/research links resolve and open in new tabs where specified.
5. **Social preview check:** validate Open Graph tags render correctly using a link-preview debugging tool (e.g., LinkedIn Post Inspector) after deployment.
