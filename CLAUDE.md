# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dozn Exchange 홈페이지 리뉴얼 프로젝트 - Next.js 16 (App Router) with React 19, Apollo Client 4 + GraphQL, Tailwind CSS 4, and next-intl for i18n.

## Commands

```bash
pnpm dev              # Development server (localhost:3000)
pnpm build            # Production build
pnpm lint             # ESLint
pnpm codegen          # Generate GraphQL types from schema
pnpm codegen:watch    # Watch mode for GraphQL codegen
```

## Architecture

### Feature-based Structure
```
src/
├── app/[locale]/         # Next.js App Router with i18n routing
├── features/             # Domain modules (home, exchange, inquiry)
│   └── {feature}/
│       ├── components/   # Feature-specific components
│       ├── hooks/        # Feature-specific hooks
│       └── types.ts      # Feature types
├── components/           # Shared components (ui/, layout/, providers/)
├── lib/graphql/          # Apollo Client setup
├── generated/            # Auto-generated GraphQL types (DO NOT EDIT)
└── graphql/              # GraphQL queries and mutations
```

### GraphQL Workflow
1. Write `.graphql` files in `src/graphql/queries/` or `mutations/`
2. Run `pnpm codegen` to generate types
3. Use generated hooks in Client Components: `import { useGetDataQuery } from '@/graphql/generated/graphql'`
4. Use `fetchGraphQL()` from `@/lib/graphql/fetcher` in Server Components

### Server vs Client Components
- Default to Server Components
- Add `'use client'` only when needed (useState, useEffect, browser APIs, event handlers, embla-carousel)
- React Compiler is enabled - manual useMemo/useCallback generally not needed

### Data Fetching
```typescript
// Server Component
import { fetchGraphQL } from '@/lib/graphql/fetcher';
const { data } = await fetchGraphQL(GetDataDocument);

// Client Component
import { useGetDataQuery } from '@/graphql/generated/graphql';
const { data, loading } = useGetDataQuery();

// Parallel fetching for independent requests
const [a, b] = await Promise.all([fetchGraphQL(A), fetchGraphQL(B)]);
```

### Import Conventions
- Feature internal: relative paths (`../hooks/useX`)
- Cross-feature/shared: absolute paths (`@/features/...`, `@/components/...`, `@/lib/...`)
- Never use barrel files (index.ts) - import directly

### i18n
- Server: `const t = await getTranslations('Section')` from `next-intl/server`
- Client: `const t = useTranslations('Section')` from `next-intl`
- Locales: `ko`, `en` - message files in `messages/`

## Key Constraints

- Never modify files in `src/graphql/generated/` - run `pnpm codegen` instead
- Run `pnpm codegen` after modifying `.graphql` files
- External images only from: `pub-b8c324bfc986460fbdb1c9667951568a.r2.dev`
- Requires `NEXT_PUBLIC_GRAPHQL_ENDPOINT` environment variable

## Git Conventions

Commit prefixes: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`
