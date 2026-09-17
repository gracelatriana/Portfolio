import { defineCollection, z } from "astro:content";

/**
 * Bilingual helper: a field that has an English and Indonesian variant.
 * Content stays data-driven and per-locale — translations live in the YAML
 * data files, never hardcoded in components.
 *
 * Usage in YAML:
 *   bio:
 *     en: "English text"
 *     id: "Teks Bahasa Indonesia"
 */
const localized = z.object({
  en: z.string(),
  id: z.string(),
});

const localizedArray = z.object({
  en: z.array(z.string()),
  id: z.array(z.string()),
});

/** Site-wide metadata, bio, and social links. Single entry (`site.yaml`). */
const siteCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    tagline: localized,
    roleTarget: localized,
    valueProp: localized,
    bio: localized,
    email: z.string().email(),
    location: localized,
    linkedin: z.string().url(),
    github: z.string().url(),
    resumeFile: z.string(), // path under /public, e.g. "/resume.pdf"
    headshot: z.string(), // path under /public, e.g. "/headshot.jpg"
    ogImage: z.string().optional(), // path under /public
  }),
});

const educationCollection = defineCollection({
  type: "data",
  schema: z.object({
    degree: localized,
    institution: localized,
    startDate: z.string(), // ISO-ish, e.g. "2022-09"
    endDate: z.string().optional(), // omit / null => "Present"
    coursework: localizedArray.optional(),
    honors: localizedArray.optional(),
  }),
});

const experienceCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: localized,
    organization: localized,
    startDate: z.string(),
    endDate: z.string().optional(), // omit => "Present"
    bullets: localizedArray,
  }),
});

const projectsCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: localized,
    description: localized,
    tags: z.array(z.string()), // tech tags are language-neutral
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0), // manual sort, lower = first
  }),
});

const researchCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: localized,
    venue: localized,
    date: z.string(),
    summary: localized,
    link: z.string().url().optional(),
  }),
});

const skillsCollection = defineCollection({
  type: "data",
  schema: z.object({
    category: localized,
    items: z.array(z.string()), // skill names are language-neutral
    order: z.number().default(0),
  }),
});

const certificationsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: localized,
    issuer: localized,
    date: z.string(),
    credentialUrl: z.string().url().optional(),
  }),
});

export const collections = {
  site: siteCollection,
  education: educationCollection,
  experience: experienceCollection,
  projects: projectsCollection,
  research: researchCollection,
  skills: skillsCollection,
  certifications: certificationsCollection,
};
