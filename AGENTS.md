# Tutor Atlas – Static Site Playbook

## 1. Environment & Tooling

- The project is now a pure static stack: semantic HTML, compiled Tailwind CSS, and lightweight vanilla JS.
- There is **no** React, Vite, TypeScript, or component runtime. Do not reintroduce them.
- Tailwind is compiled with the new `@tailwindcss/cli` (v4). Run `pnpm run build:css` whenever `css/tailwind.css` or markup changes.
- There are no runtime dependencies; `package.json` only exposes the Tailwind build command.

## 2. Directory Layout

- `index.html` – marketing/landing page with all main sections and join form.
- `privacy.html`, `terms.html` – standalone legal pages sharing the same CSS.
- `css/tailwind.css` – source file containing Tailwind imports, theme tokens, base styles, and component helpers (e.g., `.form-checkbox`).
- `css/styles.css` – compiled stylesheet that ships with the site. Never hand-edit; always regenerate via the CLI.
- `js/main.js` – all interactive behavior (mobile menu toggle, persona tabs, smooth scroll, form validation/submission state).
- `images/` – static assets copied from the old Vite `public/images` folder. Keep filenames/paths stable because the markup references them directly.

## 3. Tailwind Workflow

- Edit `css/tailwind.css`, then run `pnpm run build:css` (adds `--minify` by default and scans `index.html`, `privacy.html`, `terms.html`, and `js/**/*.js`).
- If you need a watch loop during development: `pnpm dlx @tailwindcss/cli -i css/tailwind.css -o css/styles.css --watch --content ...` (same content flags as the script).
- Only add new utility classes that actually appear in markup/JS so the CLI keeps tree-shaking clean.

## 4. JavaScript Responsibilities (`js/main.js`)

- Mobile nav: `[data-mobile-menu-button]` toggles `#mobile-menu` and swaps menu/close icons.
- Persona tabs: `[data-persona-button]` controls `[data-persona-panel]` sections; keep data attributes in sync when editing markup.
- Smooth scroll: any element with `data-scroll-target="#foo"` scrolls the matching section.
- Join form: validates `name` plus at least one contact method, POSTs to the Apps Script URL (`GOOGLE_APPS_SCRIPT_URL`), swaps between form and thank-you states, and shows inline status banners.
- Always guard features so the script can safely run on pages without those elements.

## 5. Form & External Integrations

- Submission endpoint: `https://script.google.com/macros/s/AKfycbzZuaLiGcWtfcYb70gT2IW8AMOfyTGwAFg_7S8yVobeGCsvOSTimlzRyXaPHoK8Cj_T/exec` (no-CORS POST, `Content-Type: text/plain;charset=utf-8`).
- Contact details baked into content: `hellotutoratlas@gmail.com`, `https://tutor.tutoratlas.sg`, effective date “January 2025”. Keep these aligned across all pages.

## 6. Icons & Media

- All icons are Lucide SVG symbols defined at the top of `index.html` (`symbol#icon-*`). When adding a new icon, add the `<symbol>` once and reuse via `<use href="#icon-name">`.
- Image paths are relative (e.g., `images/solution-illustration.jpg`). Replace assets by overwriting the files; keep names the same unless you sweep markup.

## 7. QA Checklist

1. `pnpm run build:css` succeeds without warnings (watch for future Tailwind CLI prompts about approved build scripts).
2. Open each HTML file directly in the browser (desktop + responsive dev tools) and verify:
   - Header/nav links jump to the correct sections.
   - Mobile navigation opens/closes and collapses after tapping a link.
   - Persona tabs swap copy correctly.
   - CTA buttons smooth-scroll to `#join`.
   - Join form validation blocks empty submissions, shows inline statuses, and resets after the success timeout.
3. Confirm legal pages still link back to `index.html` and use the shared typography.

## 8. Git & Housekeeping

- The repository now only contains static assets. Do not re-add `client/`, `dist/`, or other build artifacts.
- Never commit `css/styles.css` edits made by hand; always regenerate from the Tailwind source.
- Clean up after temporary CLI invocations (no stray lockfiles or cache directories).
- When describing changes, highlight both the HTML/JS updates and any Tailwind source edits so reviewers know whether `build:css` needs to run.
