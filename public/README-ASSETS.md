# Files you must add to this `public/` folder

The site references these files. Add your own versions here (the filenames must
match, or update the paths in `src/content/site.yaml`):

| File           | Referenced in `site.yaml` | Purpose                                              |
| -------------- | ------------------------- | ---------------------------------------------------- |
| `resume.pdf`   | `resumeFile`              | Your CV/resume. Served by the "Download Resume" button. |
| `headshot.jpg` | `headshot`                | Your professional photo (shown in the hero).         |
| `og-image.png` | `ogImage`                 | Social share preview image (recommended 1200×630px). |

Notes:

- **Missing `headshot.jpg`** degrades gracefully: the hero shows your initials
  on a navy tile instead of a broken image.
- **Missing `resume.pdf`** means the download button will 404 until you add it.
- **`og-image.png`** is optional; if absent, link previews fall back to a plain
  text card.
- `favicon.svg` is already provided as a placeholder — replace it if you like.

You can delete this file once your assets are in place.
