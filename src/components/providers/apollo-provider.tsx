'use client';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/lib/graphql-client';

interface ApolloWrapperProps {
  children: React.ReactNode;
}

/**
 * Apollo Provider 래퍼
 *
 * Client Components에서 Apollo 훅 사용을 위해 필요
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { ApolloWrapper } from '@/components/providers/apollo-provider';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ApolloWrapper>{children}</ApolloWrapper>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function ApolloWrapper({ children }: ApolloWrapperProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
