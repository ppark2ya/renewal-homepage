import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // GraphQL 스키마 URL
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',

  // GraphQL 쿼리/뮤테이션 파일 위치
  documents: ['src/graphql/**/*.graphql', 'src/graphql/**/*.ts'],

  // 생성 옵션
  generates: {
    // 로컬 스키마 SDL 파일 생성 (VSCode GraphQL extension용)
    'src/graphql/schema.graphql': {
      plugins: ['schema-ast'],
    },
    'src/graphql/generated/graphql.ts': {
      plugins: [
        {
          add: {
            content: `/* eslint-disable */
// @ts-nocheck`,
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        // TypeScript 설정
        strictScalars: true,
        useTypeImports: true,
        skipTypename: false,

        // Apollo 훅 설정
        withHooks: true, // useQuery, useMutation 훅 생성
        withHOC: false, // HOC는 생성하지 않음
        withComponent: false, // React 컴포넌트는 생성하지 않음
        withSuspense: false, // Suspense 훅 생성 안함 (skipToken 호환성 문제)

        // Apollo Client v4 호환
        apolloClientVersion: 4,
        apolloReactHooksImportFrom: '../../lib/graphql/apollo-react-shim',
        apolloReactCommonImportFrom: '../../lib/graphql/shim',

        // 커스텀 스칼라 타입 매핑 (필요시 추가)
        scalars: {
          DateTime: 'string',
          JSON: 'Record<string, unknown>',
        },
      },
    },
  },

  // watch 모드 설정
  watch: false,

  // 에러 발생 시에도 계속 진행
  ignoreNoDocuments: true,
};

export default config;
