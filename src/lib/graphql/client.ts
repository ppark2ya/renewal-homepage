import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { convertLang } from '@/lib/i18n';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '';

if (!endpoint && process.env.NODE_ENV === 'development') {
  console.warn('[Apollo] NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined');
}

/**
 * locale 기반 Apollo Client 생성 (Client Components용)
 *
 * @param locale - 현재 언어 코드 (예: 'ko', 'en', 'jp', 'cn')
 * @returns lang 헤더가 포함된 Apollo Client
 */
export function createApolloClient(locale: string) {
  return new ApolloClient({
    link: new HttpLink({
      uri: endpoint,
      headers: {
        'accept-language': convertLang(locale),
      },
    }),
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
}

/**
 * Server Component용 Apollo Client 생성
 *
 * @param lang - 언어 코드
 * @param token - Bearer 토큰 (선택)
 * @returns lang 헤더가 포함된 Apollo Client
 */
export function createServerClient(lang: string, token?: string) {
  const headers: Record<string, string> = { 'accept-language': convertLang(lang) };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: endpoint,
      headers,
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
