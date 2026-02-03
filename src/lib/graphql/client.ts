import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '';

if (!endpoint && process.env.NODE_ENV === 'development') {
  console.warn('[Apollo] NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined');
}

/**
 * Apollo Client HTTP Link
 */
const httpLink = new HttpLink({
  uri: endpoint,
});

/**
 * Apollo Client 인스턴스 (Client Components용)
 *
 * @example
 * ```tsx
 * import { apolloClient } from '@/lib/graphql/client';
 * import { ApolloProvider } from '@apollo/client';
 *
 * <ApolloProvider client={apolloClient}>
 *   <App />
 * </ApolloProvider>
 * ```
 */
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

/**
 * 인증된 Apollo Client 생성 (Server Components용)
 *
 * @param token - Bearer 토큰
 * @returns 인증 헤더가 포함된 Apollo Client
 */
export function createAuthenticatedClient(token: string) {
  return new ApolloClient({
    link: new HttpLink({
      uri: endpoint,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
}
