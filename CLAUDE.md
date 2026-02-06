# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dozn Exchange 홈페이지 리뉴얼 프로젝트 - Next.js 16 (App Router) with React 19, Apollo Client 4 + GraphQL, Tailwind CSS 4, and next-intl for i18n.

## Tech Stack

- **Runtime**: Node 20, pnpm 8.15.7
- **Framework**: Next.js 16 (App Router, standalone output)
- **UI**: React 19, Tailwind CSS 4, Radix UI
- **Data**: Apollo Client 4, GraphQL
- **i18n**: next-intl (`ko`, `en`)
- **Infra**: Docker Swarm, Drone CI, Portainer

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

## Deployment

### Docker
- **Dockerfile**: Node 20 + pnpm 8.15.7 멀티스테이지 빌드 (base → deps → build → runner)
- **docker-compose.yml**: 운영용 (replicas 2, rolling update start-first)
- **docker-compose.dev.yml**: 개발용 (replicas 1, 경량 리소스)
- 컨테이너 포트: `15100`
- `next.config.ts`에 `output: 'standalone'` 설정 필수

### Dockerfile Build Args
| Arg | 용도 |
|-----|------|
| `NEXT_PUBLIC_GRAPHQL_ENDPOINT` | GraphQL API 엔드포인트 |
| `HTTP_PROXY` / `HTTPS_PROXY` | 프록시 서버 설정 |
| `UID` / `GID` | 컨테이너 실행 유저 권한 (기본값 1001) |

### Drone CI (.drone.yml)
- **dev pipeline**: `dev-*`, `stg` 브랜치 push → `DRONE_BRANCH`를 이미지 태그로 빌드/푸시
- **prod pipeline**: tag push → `DRONE_TAG` + `latest`를 이미지 태그로 빌드/푸시
- 배포는 Portainer에서 docker-compose.yml 기반 stack으로 관리

### Drone CI Secrets
`DOCKER_REGISTRY`, `DOCKER_REPO`, `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `NEXT_PUBLIC_GRAPHQL_ENDPOINT`, `HTTP_PROXY`, `HTTPS_PROXY`, `UID`, `GID`

## Key Constraints

- Never modify files in `src/graphql/generated/` - run `pnpm codegen` instead
- Run `pnpm codegen` after modifying `.graphql` files
- External images only from: `pub-b8c324bfc986460fbdb1c9667951568a.r2.dev`
- Requires `NEXT_PUBLIC_GRAPHQL_ENDPOINT` environment variable

## Skills

React/Next.js 코드 작성 및 리팩토링 시 `/react-best-practices` 스킬을 활용하여 성능 최적화 패턴을 적용한다.

## Git Conventions

Commit prefixes: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`
