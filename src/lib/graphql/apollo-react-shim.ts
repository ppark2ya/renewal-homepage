'use client';

// Re-export hooks used by generated graphql.ts from @apollo/client/react
export { useQuery, useLazyQuery, useSuspenseQuery } from '@apollo/client/react';

// Re-export types used by generated graphql.ts
export type {
  QueryHookOptions,
  LazyQueryHookOptions,
  SuspenseQueryHookOptions,
  UseSuspenseQueryResult,
  SkipToken,
} from '@apollo/client/react';

// Polyfill skipToken for React Server Components compatibility
// This is needed because skipToken doesn't exist in RSC bundle
export const skipToken: unique symbol = Symbol.for('apollo.skipToken');
