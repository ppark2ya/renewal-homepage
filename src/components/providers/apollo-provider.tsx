'use client';

import { useMemo } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { createApolloClient } from '@/lib/graphql/client';

interface ApolloWrapperProps {
  locale: string;
  children: React.ReactNode;
}

export function ApolloWrapper({ locale, children }: ApolloWrapperProps) {
  const client = useMemo(() => createApolloClient(locale), [locale]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
