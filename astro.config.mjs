import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Update `site` to your real deployed URL before deploying (used for sitemap + Open Graph absolute URLs).
export default defineConfig({
  site: "https://your-portfolio.vercel.app",
  output: "static",
  integrations: [tailwind(), sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "id"],
    routing: {
      // English is served at the root (/), Indonesian at /id/.
      prefixDefaultLocale: false,
    },
  },
});
