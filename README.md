# 7th Sense Solutions — Website

Hand-coded HTML/CSS/JS. No build step, no dependencies.

## Deploy to Netlify

**Fastest (drag & drop):**
1. Go to https://app.netlify.com/drop
2. Drag this whole `7th-sense-site` folder onto the page.
3. It's live. (Netlify reads `netlify.toml` for headers, caching, and the 404.)

**Via Git (for ongoing edits):**
1. Push this folder to a GitHub repo.
2. In Netlify: Add new site → Import from Git → pick the repo.
3. Leave build command blank; publish directory `.`.

## Files
- `index.html` — the site
- `styles.css` — all styles (brand tokens live at the top of `:root`)
- `script.js` — interactions (stats, framework, reveals, forms)
- `404.html` — branded not-found page
- `favicon.svg` — brand mark
- `netlify.toml` — headers, caching, 404 handling
- `robots.txt`, `sitemap.xml` — SEO

## Before launch — quick checklist
- Replace placeholder stat numbers (search `data-count` in `index.html`).
- Swap testimonial placeholders for real, attributed quotes.
- Set the real email + LinkedIn URL in the contact section and footer.
- Add a real portrait (replace the `JF` placeholder block in the About section).
- Point the newsletter form at your Mailchimp action (`#newsletterForm` in `index.html`).
- Update the domain in `sitemap.xml`, `robots.txt`, and the Open Graph tags.
- Add an `og-image.png` (1200×630) for link previews.

## Palette note
Your brand tokens (Signal Blue, Growth Emerald, Ivory) are the only colors
referenced anywhere — all defined once at the top of `styles.css` under `:root`.
Change them there and the whole site updates.
