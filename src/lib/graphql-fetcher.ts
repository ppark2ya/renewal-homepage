import { graphqlClient, createAuthenticatedClient } from './graphql-client';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { GraphQLClient, RequestOptions } from 'graphql-request';

/**
 * 타입 안전한 GraphQL 쿼리 실행 (Server Component용)
 *
 * React Best Practices: async-parallel - 독립적인 쿼리는 Promise.all로 병렬 실행
 *
 * @example
 * ```ts
 * // Server Component에서
 * const data = await fetchGraphQL(GetUserDocument, { id: '1' });
 *
 * // 병렬 쿼리 실행
 * const [users, posts] = await Promise.all([
 *   fetchGraphQL(GetUsersDocument),
 *   fetchGraphQL(GetPostsDocument),
 * ]);
 * ```
 */
export async function fetchGraphQL<TResult, TVariables extends Record<string, unknown>>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  client: GraphQLClient = graphqlClient
): Promise<TResult> {
  const options = {
    document,
    variables,
  } as unknown as RequestOptions<TVariables, TResult>;

  return client.request<TResult>(options);
}

/**
 * 인증이 필요한 GraphQL 쿼리 실행
 *
 * @example
 * ```ts
 * const data = await fetchAuthGraphQL(token, GetMeDocument);
 * ```
 */
export async function fetchAuthGraphQL<TResult, TVariables extends Record<string, unknown>>(
  token: string,
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult> {
  const client = createAuthenticatedClient(token);
  return fetchGraphQL(document, variables, client);
}

/**
 * SWR/React Query용 fetcher 생성
 *
 * React Best Practices: client-swr-dedup - SWR로 자동 요청 중복 제거
 *
 * @example
 * ```ts
 * const fetcher = createGraphQLFetcher(GetUserDocument);
 * const { data } = useSWR('user', () => fetcher({ id: '1' }));
 * ```
 */
export function createGraphQLFetcher<TResult, TVariables extends Record<string, unknown>>(
  document: TypedDocumentNode<TResult, TVariables>
) {
  return (variables?: TVariables): Promise<TResult> => {
    return fetchGraphQL(document, variables);
  };
}
