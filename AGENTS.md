# Agent Guidelines for Tutor Atlas

This document provides guidelines for AI agents working on the Tutor Atlas codebase.

## Build, Lint, and Test Commands

```bash
# Development server (runs with hot reload)
pnpm dev

# Build for production (client + server bundle)
pnpm build

# Start production server
pnpm start

# Type check (no emit)
pnpm check

# Format code with Prettier
pnpm format

# Run tests
pnpm test

# Run tests in watch mode
pnpm vitest

# Run a single test file
pnpm vitest run server/googleSheets.test.ts

# Run tests matching a pattern
pnpm vitest run -t "Google Sheets Integration"

# Database migrations
pnpm db:push

# Generate and run migrations
pnpm db:generate && pnpm db:migrate
```

## Project Structure

```
tutor-landing-page/
├── client/               # React frontend (Vite)
│   └── src/
│       ├── components/   # UI components (shadcn/ui)
│       ├── pages/        # Page components
│       ├── hooks/        # Custom React hooks
│       ├── contexts/     # React contexts
│       └── lib/          # Utilities (trpc, config, utils)
├── server/               # Node.js backend
│   └── _core/           # Core server modules (trpc, cookies, oauth, etc.)
├── shared/              # Shared code (types, constants)
├── drizzle/             # Database schema and migrations
└── dist/                # Build output
```

## Code Style Guidelines

### TypeScript

- Always enable `strict: true` (already configured in tsconfig.json)
- Use explicit types for function parameters and return values
- Avoid `any` type; use `unknown` when type is truly uncertain
- Use `as const` for literal values that should be readonly
- Export types from `shared/types.ts` for cross-module usage

### Imports

```typescript
// External imports (alphabetical)
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

// Path aliases
@/          → client/src/
@shared/    → shared/
@components/→ client/src/components/
@ui/        → client/src/components/ui/
@lib/       → client/src/lib/
@hooks/     → client/src/hooks/
```

### Naming Conventions

- **Variables/Functions**: `camelCase` (e.g., `formData`, `handleSubmit`)
- **Components/Classes**: `PascalCase` (e.g., `Home`, `HttpError`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `COOKIE_NAME`)
- **Files**: `kebab-case` for non-component files, `PascalCase` for components
- **Database columns**: `camelCase` (matching TypeScript)

### React Components

```tsx
// Functional components with hooks
export default function Home() {
  // State at top
  const [formData, setFormData] = useState({...});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mutations
  const submitMutation = trpc.form.submit.useMutation({...});

  // Event handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ...
  };

  return <div>...</div>;
}
```

### Styling

- Use Tailwind CSS with shadcn/ui components
- Use `cn()` utility for conditional classes:
  ```typescript
  import { cn } from "@/lib/utils";
  <div className={cn("base-class", condition && "conditional-class")} />
  ```
- Use `class-variance-authority` (cva) for component variants
- Avoid inline styles; use Tailwind classes instead

### Error Handling

- Use `HttpError` class for HTTP errors with status codes:
  ```typescript
  throw new HttpError(400, "Invalid input");
  throw new NotFoundError("Resource not found");
  ```
- Use tRPC's `TRPCError` for API errors:
  ```typescript
  throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  ```
- Use `zod` for input validation in tRPC procedures
- Log errors with context using `console.warn` or `console.error`
- Use try/catch with async/await, always handle cleanup in `finally`

### tRPC Procedures

```typescript
// Define router in server/routers.ts
export const appRouter = router({
  form: router({
    submit: publicProcedure
      .input(z.object({ name: z.string(), email: z.string().email() }))
      .mutation(async ({ input }) => {
        // validation, business logic
        return { success: true };
      }),
  }),
});

// Use on client
const submitMutation = trpc.form.submit.useMutation({
  onSuccess: () => {
    /* handle success */
  },
  onError: error => {
    /* handle error */
  },
});
await submitMutation.mutateAsync(formData);
```

### Database (Drizzle ORM)

```typescript
// Schema definitions in drizzle/schema.ts
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name"),
  // Use JSDoc comments for documentation
});

// Inferred types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
```

### Testing (Vitest)

- Place test files alongside source files: `*.test.ts`
- Use `describe` blocks for organization
- Include timeout for async tests:
  ```typescript
  it(
    "should do something",
    async () => {
      // test
    },
    { timeout: 15000 }
  );
  ```

### Additional Guidelines

- Use `superjson` for tRPC serialization (handles Dates, Sets, etc.)
- Use `zod` for runtime validation (already integrated with tRPC)
- Use `sonner` for toast notifications on the client
- Use `wouter` for routing (React Router alternative)
- Environment variables: Use `import.meta.env` in client, `process.env` in server
- API endpoints should start with `/api/` for proper gateway routing
- Add JSDoc comments for complex functions and exported types
- Keep components focused; extract logic to custom hooks when complex
- Use `console.warn` for non-critical failures, `console.error` for critical issues

## Environment Setup

- Package manager: `pnpm@10.4.1`
- Node.js version: Use the version specified in `packageManager`
- Database: MySQL (via mysql2 driver)
- Copy `.env.example` to `.env` and fill in credentials
- Required env vars: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`
