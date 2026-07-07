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
- `assets/` — logo, favicons, photo, and share image
- `netlify.toml` — headers, caching, 404 handling
- `robots.txt`, `sitemap.xml` — SEO

## Assets
Real brand assets live in `assets/`: the app-icon favicons (256/512/1024), the
horizontal lockup, a white-keyed transparent lockup, the light logo, the
mono-white mark, your photo (`jordan-fletcher.jpg`), and a generated
`og-image.png` (1200×630) for link previews.

## Before launch — quick checklist
Done: logo + favicons wired in, your photo in About, real email
(jordan@7thsensesolutions.com) and LinkedIn, named client testimonials,
campaigns figure (600+), OG/Twitter share image.

Still to confirm:
- Verify the remaining stat numbers (funnels, automations, revenue influenced) — only "600+ campaigns" and "9+ years" are your real figures so far.
- Confirm the exact testimonial wording with Saguaro, Show Me Care, and Crossroads Donuts, and add each contact's name/title if you'd like (currently shown as business + role).
- Point the newsletter form at your Mailchimp action (`#newsletterForm` in `index.html`).
- Update the domain in `sitemap.xml`, `robots.txt`, and the Open Graph URLs once the domain is live.

## Palette note
Your brand tokens (Signal Blue, Growth Emerald, Ivory) are the only colors
referenced anywhere — all defined once at the top of `styles.css` under `:root`.
Change them there and the whole site updates.
