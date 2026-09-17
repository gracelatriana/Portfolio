# Implementation Plan

- [x] 1. Scaffold the Astro + Tailwind project
  - Initialize Astro project, add Tailwind integration, configure `tailwind.config.mjs` with the professional color palette and font families
  - Set up base folder structure (`src/components`, `src/layouts`, `src/content`, `public`)
  - _Requirements: 11.2, 14.1_

- [x] 2. Define content collection schemas
  - Create `src/content/config.ts` with Zod schemas for site, education, experience, projects, research, skills, certifications
  - _Requirements: 13.1_

- [x] 3. Populate content data files with placeholder content (EN + ID)
  - Create `site.yaml`, `education.yaml`, `experience.yaml`, `projects.yaml`, `research.yaml`, `skills.yaml`, `certifications.yaml` using the site owner's actual bio, education, experience, projects, research, skills, and certifications
  - Add `resume.pdf` and `headshot.jpg` to `public/`
  - _Requirements: 1.1, 2.1, 2.2, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 13.1_

- [x] 4. Build BaseLayout with meta/SEO tags
  - Implement `BaseLayout.astro` with `<title>`, meta description, Open Graph tags, font loading
  - _Requirements: 12.1, 12.2_

- [x] 5. Build Header and Footer components
  - Sticky header with anchor nav (conditionally including Research/Certifications links only if those collections are non-empty), resume download button, LinkedIn/GitHub icons, mobile hamburger menu
  - Footer with socials and copyright
  - _Requirements: 8.1, 9.1 (partial), 10.1, 10.2, 10.3_

- [x] 6. Build Hero section
  - Name, tagline/role target, short value prop, photo, CTA buttons (Download Resume, Contact Me), social icons
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 7. Build About section
  - Bio text and quick facts pulled from `site.yaml`/`education.yaml`
  - _Requirements: 2.1_

- [x] 8. Build Education section
  - Reverse-chronological list from `education` collection; render coursework/honors when present
  - _Requirements: 2.2, 2.3, 2.4_

- [x] 9. Build Experience section
  - Reverse-chronological entries from `experience` collection; render "Present" when `endDate` absent; bulleted achievements
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 10. Build Projects section and ProjectCard component
  - Grid of cards with title, description, tags, conditional GitHub/demo links opening in new tabs
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 11. Build Research section (with empty-state handling)
  - List of research entries with title, venue, date, summary, optional link; section and its nav entry omitted entirely when collection is empty
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 12. Build Skills section
  - Categorized skill groups rendered from `skills` collection
  - _Requirements: 6.1, 6.2_

- [x] 13. Build Certifications section (with empty-state handling)
  - List of certifications with name, issuer, date, optional verification link; section and nav entry omitted when empty
  - _Requirements: 7.1, 7.2_

- [x] 14. Build Contact section
  - Email (mailto) and/or Formspree form, LinkedIn, GitHub, optional location
  - _Requirements: 9.1, 9.2_

- [x] 15. Compose index.astro (via shared PortfolioPage.astro for EN `/` and ID `/id/`)
  - Assemble all sections in order inside BaseLayout, wiring conditional rendering for optional sections
  - _Requirements: 13.2_

- [x] 16. Responsive and accessibility pass
  - Verify layout at mobile/tablet/desktop breakpoints; check color contrast, alt text, semantic landmarks
  - _Requirements: 11.1_

- [ ] 17. Production build and Lighthouse check
  - Run `astro build`, serve output, run Lighthouse audit, address any Performance/Accessibility issues below 90
  - NOTE: Not run in this environment — the npm registry is blocked (INTEGRATIONS_ONLY), so `npm install` and `astro build` cannot execute here. Dependencies/versions are declared in `package.json`. Run `npm install && npm run build` once registry access is available.
  - _Requirements: 11.2, 11.3_

- [ ] 18. Deploy to Vercel (or chosen static host)
  - Connect repo, configure build settings, verify live deployment and social preview card via Open Graph
  - NOTE: Deployment is handled outside this task (orchestrator/user). See README "Deploying to Vercel".
  - _Requirements: 12.2, 14.1, 14.2_
