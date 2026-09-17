/**
 * UI strings (navigation labels, button text, section headings).
 * These are chrome/labels — content data lives in `src/content/*`.
 *
 * To add or change a UI label, edit the `en` and `id` values below.
 */
export const languages = {
  en: "English",
  id: "Bahasa Indonesia",
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = "en";

export const ui = {
  en: {
    "nav.about": "About",
    "nav.education": "Education",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.research": "Research",
    "nav.skills": "Skills",
    "nav.certifications": "Certifications",
    "nav.contact": "Contact",

    "hero.downloadResume": "Download Resume",
    "hero.contactMe": "Contact Me",
    "hero.viewProjects": "View Projects",

    "section.about": "About",
    "section.education": "Education",
    "section.experience": "Experience",
    "section.projects": "Projects",
    "section.research": "Research & Publications",
    "section.skills": "Technical Skills",
    "section.certifications": "Certifications",
    "section.contact": "Get in Touch",

    "about.quickFacts": "Quick Facts",
    "about.university": "University",
    "about.graduation": "Expected Graduation",
    "about.location": "Location",

    "experience.present": "Present",
    "projects.viewCode": "View Code",
    "projects.liveDemo": "Live Demo",
    "projects.featured": "Featured",
    "research.readMore": "Read More",
    "certifications.verify": "Verify Credential",

    "contact.intro":
      "I am open to internships, entry-level roles, and collaboration. Feel free to reach out.",
    "contact.emailMe": "Email Me",
    "contact.email": "Email",
    "contact.location": "Location",

    "footer.builtWith": "Built with Astro & Tailwind CSS.",
    "footer.rights": "All rights reserved.",

    "a11y.skipToContent": "Skip to content",
    "a11y.openMenu": "Open navigation menu",
    "a11y.closeMenu": "Close navigation menu",
    "a11y.switchLanguage": "Switch language",
    "a11y.opensNewTab": "opens in a new tab",
  },
  id: {
    "nav.about": "Tentang",
    "nav.education": "Pendidikan",
    "nav.experience": "Pengalaman",
    "nav.projects": "Proyek",
    "nav.research": "Penelitian",
    "nav.skills": "Keahlian",
    "nav.certifications": "Sertifikasi",
    "nav.contact": "Kontak",

    "hero.downloadResume": "Unduh CV",
    "hero.contactMe": "Hubungi Saya",
    "hero.viewProjects": "Lihat Proyek",

    "section.about": "Tentang Saya",
    "section.education": "Pendidikan",
    "section.experience": "Pengalaman",
    "section.projects": "Proyek",
    "section.research": "Penelitian & Publikasi",
    "section.skills": "Keahlian Teknis",
    "section.certifications": "Sertifikasi",
    "section.contact": "Hubungi Saya",

    "about.quickFacts": "Fakta Singkat",
    "about.university": "Universitas",
    "about.graduation": "Perkiraan Kelulusan",
    "about.location": "Lokasi",

    "experience.present": "Sekarang",
    "projects.viewCode": "Lihat Kode",
    "projects.liveDemo": "Demo Langsung",
    "projects.featured": "Unggulan",
    "research.readMore": "Selengkapnya",
    "certifications.verify": "Verifikasi Kredensial",

    "contact.intro":
      "Saya terbuka untuk magang, posisi entry-level, dan kolaborasi. Jangan ragu untuk menghubungi saya.",
    "contact.emailMe": "Kirim Email",
    "contact.email": "Email",
    "contact.location": "Lokasi",

    "footer.builtWith": "Dibuat dengan Astro & Tailwind CSS.",
    "footer.rights": "Hak cipta dilindungi.",

    "a11y.skipToContent": "Lewati ke konten",
    "a11y.openMenu": "Buka menu navigasi",
    "a11y.closeMenu": "Tutup menu navigasi",
    "a11y.switchLanguage": "Ganti bahasa",
    "a11y.opensNewTab": "terbuka di tab baru",
  },
} as const;

export type UIKey = keyof (typeof ui)["en"];
