import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '';

if (!endpoint && process.env.NODE_ENV === 'development') {
  console.warn('[GraphQL] NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined');
}

/**
 * GraphQL 클라이언트 인스턴스
 *
 * @example
 * ```ts
 * import { graphqlClient } from '@/lib/graphql-client';
 *
 * const data = await graphqlClient.request(query, variables);
 * ```
 */
export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    // 필요시 인증 헤더 추가
    // 'Authorization': `Bearer ${token}`,
  },
});

/**
 * 인증된 GraphQL 클라이언트 생성
 *
 * @param token - Bearer 토큰
 * @returns 인증 헤더가 포함된 GraphQL 클라이언트
 */
export function createAuthenticatedClient(token: string): GraphQLClient {
  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
