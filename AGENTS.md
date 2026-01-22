# AGENT PLAYBOOK FOR TUTORATLAS
This guide briefs autonomous and semi-autonomous agents working inside `tutor-landing-page`. Favor accuracy, determinism, and minimal churn.

## 1. Environment & Tooling
- Package manager: `pnpm` (see `package.json` for exact version lock).
- Runtime: Node 20+ compatible; project targets modern evergreen browsers via Vite + ESNext output.
- Framework: React 19 + TypeScript + Vite + Tailwind CSS v4; routing handled by `wouter`.
- UI foundations: Radix UI primitives, CVA for variants, Tailwind utility classes, Sonner toasts, Framer Motion, Recharts.
- Path alias: `@/*` resolves to `client/src/*` (defined in `tsconfig.json` and `vite.config.ts`).
- No specialized Cursor or Copilot rule files detected in `.cursor/` or `.github/` as of this writing.

## 2. Core Commands (run from repo root)
```
pnpm install        # Install dependencies respecting pnpm lock
pnpm dev            # Launch Vite dev server with HMR
pnpm build          # Production build → dist/
pnpm preview        # Serve dist/ to validate prod output
pnpm check          # TypeScript --noEmit verification
pnpm format         # Prettier formatting based on .prettierrc
```

- Use `pnpm exec <tool>` for ad-hoc CLIs (e.g., `pnpm exec tailwindcss -i ...`).
- The repo currently lacks an automated test script. See §8 for guidance on adding Vitest.

## 3. Running Targeted Checks or Tests
- **Type-only target:** `pnpm check -- --watch` narrows scope via incremental TS.
- **Single component sanity:** start `pnpm dev`, navigate directly to the route/component under inspection.
- **Automated tests (not yet configured):** plan to install Vitest + Testing Library. Once added, prefer scripts like `pnpm test src/components/foo.test.tsx --runInBand` for single specs. Call that out in PRs until implemented.
- Document any temporary testing harness (Storybook, Cypress, etc.) inside this file when introduced.

## 4. Repository Layout Highlights
- `client/src/main.tsx` bootstraps React into `#root`; keep providers close to root.
- `client/src/App.tsx` hosts the router, tooltip, toaster, and theme provider.
- `client/src/pages/` holds route-level components (Home, Privacy, Terms, NotFound).
- `client/src/components/ui/` mirrors shadcn-inspired primitives; treat them as shared building blocks.
- `client/src/components/ErrorBoundary.tsx` is the only class component—wrap new trees inside it if rendering outside App.
- `client/src/contexts/`, `/hooks/`, `/lib/`, `/const.ts` store shared logic.
- `vite.config.ts` sets project root to `client/`, so static assets live in `client/public/`.

## 5. TypeScript Configuration Expectations
- `strict: true`; fix type holes rather than sprinkling `any`.
- `module`: `ESNext`; `moduleResolution`: `bundler`; rely on Vite plugin-resolved imports.
- JSX emit preserved; React 19 automatic JSX runtime applies.
- `types`: `node`, `vite/client`; add others (e.g., `vitest`) via tsconfig when tooling expands.
- `paths`: `@/*` alias—prefer this over long relative paths.
- Keep incremental build artifacts inside `node_modules/typescript/tsbuildinfo` (already configured).

## 6. Formatting & Styling (Prettier + ESLint expectations)
- Enforced via `.prettierrc`: semicolons on, double quotes, 2 spaces, trailing commas `es5`, `arrowParens: "avoid"`.
- Run `pnpm format` before PRs; avoid manual reflow outside Prettier rules.
- Maintain LF endings; do not mix CRLF.
- ESLint config not provided—follow TypeScript + React best practices and mention any lint additions here when configured.

## 7. Import Ordering & Module Boundaries
- Structure imports as: React/Node built-ins → third-party packages → alias (`@/…`) → relative paths.
- Combine related named imports; avoid default + namespace mixes unless required.
- Side-effect imports (CSS, polyfills) should appear after libraries but before application code.
- Use `type` modifiers (`import type { Foo }`) for type-only imports to reduce bundle churn.

## 8. Testing Strategy Placeholder
- There is **no** test runner today. Call this out in reviews when relevant.
- Recommended setup: Vitest + @testing-library/react + jsdom. Script suggestion:
  - `"test": "vitest"`
  - `"test:ui": "vitest --ui"`
- Once added, single test command example: `pnpm test src/components/ui/button.test.tsx`.
- Until then, rely on TypeScript (`pnpm check`), component stories, and manual verification in `pnpm dev`.

## 9. React Component Guidelines
- Prefer functional components; only ErrorBoundary uses a class.
- Type props with explicit interfaces or `React.ComponentProps<typeof Base>` helpers.
- When extending native elements, intersect `React.ComponentProps<"button">` etc. with custom props.
- Default exports only for top-level pages or unique singletons; keep reusable components as named exports.
- Keep components pure; derive state from props; memoize with `useMemo` only when profiling proves value.

## 10. Hooks & State Management
- Custom hooks go under `client/src/hooks`. Names must start with `use`.
- `usePersistFn` is provided to retain stable references without `useCallback` pitfalls—use it when passing callbacks to deeply memoized children.
- `useTheme` throws when invoked outside `ThemeProvider`; maintain this invariant for other contexts.
- Share cross-route state via context providers rather than lifting into `App` unless global.
- For async fetching, TanStack Query is available; co-locate queries near feature code and wrap the app with QueryClientProvider if you introduce it.

## 11. Styling, Tailwind, and CVA Usage
- Tailwind CSS v4 via `@tailwindcss/vite`; prefer utility classes instead of bespoke CSS when possible.
- Use `cn` helper from `@/lib/utils` to merge class names safely, especially when conditional.
- For variant-heavy components, rely on `class-variance-authority` (`cva`) definitions stored next to the component.
- Keep data-slot attributes (`data-slot="button"`) when present—they power downstream theming.
- Scope bespoke CSS to the component via CSS Modules or `@layer components` once tailwind config exists (not yet in repo but can be added).

## 12. Theme & Design Tokens
- Theme provider lives in `client/src/contexts/ThemeContext.tsx`.
- `defaultTheme="light"`; flipping to dark requires updating CSS variables in `client/src/index.css` (once defined) for coherence.
- If you enable theme switching, pass `switchable` to `ThemeProvider` and wire UI controls through `useTheme()`'s `toggleTheme`.
- Persisted theme stored in `localStorage` under key `theme` when switchable.

## 13. Accessibility & UX Expectations
- Radix primitives already include ARIA defaults—preserve structure and labelled relationships.
- Provide descriptive text on icons (use `aria-label` or visually hidden text) when icons stand alone.
- Focus visible styles rely on theme tokens; do not remove outline utilities.
- For toasts (Sonner) and dialogs, ensure mount points remain inside ThemeProvider for consistent tokens.

## 14. Routing with Wouter
- Router configured via `<R base={import.meta.env.BASE_URL}>`; any new routes must respect Vite `base`.
- Define primary routes inside `<Switch>` in `App.tsx`; unspecified paths fall through to `<Route component={NotFound} />`.
- For dynamic params, use wouter’s pattern matching (`/users/:id`) and hooks like `useRoute` if needed.
- Consider auth gating at the route level—comment in App reminds you to evaluate authentication needs before exposing private pages.

## 15. Error Handling & Resilience
- Wrap page trees with `ErrorBoundary` to avoid white screens; boundary displays stack trace and reload control.
- Within async effects, catch and surface errors via Sonner toasts (`toast.error("…")`) or inline UI states.
- Use `console.error` sparingly; prefer logging utilities if/when added.
- Validate external inputs with `zod` where applicable (dependency already present).

## 16. Data & Forms
- `react-hook-form` and `@hookform/resolvers` are available; set up resolvers with Zod for schema validation.
- For data fetching/mutations, prefer TanStack Query for caching, retries, and background refetching.
- Keep form components in `components/ui/form.tsx` aligned with shadcn conventions (already scaffolded).

## 17. Animations & Motion
- `framer-motion` is installed; use for meaningful transitions (route transitions, hero animations).
- Embla Carousel + `react-resizable-panels` can power interactive layouts; ensure hydration safety by guarding browser-only APIs with `typeof window !== "undefined"` checks when necessary.

## 18. Asset & Static Handling
- Public assets belong in `client/public`. Vite copies them to dist root.
- Importing images from `client/src` leverages Vite asset pipeline; use `new URL("./asset.png", import.meta.url).href` when needed.
- Keep favicons/manifest updated if the marketing site evolves.

## 19. Performance Considerations
- Tree-shake Radix by importing only the components you use (already the case: `@radix-ui/react-button` style subpackages).
- Lazy-load heavyweight pages with `React.lazy` + Suspense when splitting is warranted.
- Memoize expensive derived data; avoid unnecessary `useMemo` wrappers.
- Audit bundle via `pnpm build -- --mode analyze` once you introduce `rollup-plugin-visualizer`.

## 20. Git & PR Workflow
- Clone-specific instructions: stay on feature branches; do not commit directly to main unless instructed.
- Before opening a PR: run `pnpm install`, `pnpm check`, `pnpm build`, and `pnpm format`.
- Reference this AGENT file in PR descriptions when clarifying conventions.
- Avoid committing secrets (`.env`, credentials). Add new ignored files to `.gitignore` if needed.

## 21. Adding New Tooling or Rules
- When introducing ESLint, Vitest, Storybook, or other infra, document the commands, config locations, and single-test guidance here immediately.
- Same applies to Cursor/Copilot rule files—if you add `.cursor/rules/*.md` or `.github/copilot-instructions.md`, summarize their intent in this section to keep agents aligned.

## 22. Checklist Before You Ship
1. Dependencies installed via pnpm (respect lockfile).
2. Code formatted with `pnpm format`.
3. Types validated through `pnpm check`.
4. Build validated using `pnpm build` (and optionally `pnpm preview`).
5. Manual verification in `pnpm dev` for the features touched.
6. Update this AGENT guide whenever workflow conventions shift.

Stay deliberate, keep diffs focused, and document any repo-wide assumptions back in this file so future agents land faster.
