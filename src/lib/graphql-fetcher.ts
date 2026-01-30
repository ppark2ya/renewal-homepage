'use client';

import type { DocumentNode, TypedDocumentNode, OperationVariables } from '@apollo/client';
import { apolloClient, createAuthenticatedClient } from './graphql-client';

// Apollo Client 기본 훅 re-export (react-query와 유사한 API)
export { useQuery, useMutation, useLazyQuery, useSubscription } from '@apollo/client/react';

/**
 * Server Component용 GraphQL 쿼리 실행
 *
 * React Best Practices: async-parallel - 독립적인 쿼리는 Promise.all로 병렬 실행
 *
 * @example
 * ```ts
 * // Server Component에서
 * const { data } = await fetchGraphQL(GetUsersDocument);
 *
 * // 병렬 쿼리 실행
 * const [users, posts] = await Promise.all([
 *   fetchGraphQL(GetUsersDocument),
 *   fetchGraphQL(GetPostsDocument),
 * ]);
 * ```
 */
export async function fetchGraphQL<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: {
    variables?: TVariables;
    token?: string;
  }
) {
  const client = options?.token ? createAuthenticatedClient(options.token) : apolloClient;

  const result = await client.query({
    query: document,
    variables: options?.variables as TVariables,
    fetchPolicy: 'no-cache',
  });

  return result as { data: TData };
}

/**
 * Server Component용 GraphQL 뮤테이션 실행
 *
 * @example
 * ```ts
 * const { data } = await mutateGraphQL(CreateUserDocument, {
 *   variables: { input: { name: 'John', email: 'john@example.com' } },
 * });
 * ```
 */
export async function mutateGraphQL<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: {
    variables?: TVariables;
    token?: string;
  }
) {
  const client = options?.token ? createAuthenticatedClient(options.token) : apolloClient;

  const result = await client.mutate({
    mutation: document,
    variables: options?.variables as TVariables,
  });

  return result as { data: TData | null | undefined };
}
