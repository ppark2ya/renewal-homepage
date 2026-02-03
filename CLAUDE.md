# Project Guidelines for AI Assistants

> Dozn Exchange 홈페이지 리뉴얼 프로젝트

## Quick Reference

| 항목 | 내용 |
|------|------|
| Framework | Next.js 16 (App Router) |
| React | 19.2 + React Compiler |
| State/Data | Apollo Client 4 + GraphQL Codegen |
| Styling | Tailwind CSS 4 |
| i18n | next-intl |
| Language | TypeScript (strict mode) |

---

## 1. Project Architecture (Feature-based)

### 1.1 Directory Structure

```
src/
├── app/                          # Next.js App Router
│   └── [locale]/                 # 다국어 라우팅
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
│
├── features/                     # 기능/도메인별 모듈 (핵심)
│   ├── home/                     # 홈페이지 기능
│   │   ├── components/           # 홈 전용 컴포넌트
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CategorySection.tsx
│   │   │   ├── ProductSection.tsx
│   │   │   ├── ReviewSection.tsx
│   │   │   ├── HotspotSection.tsx
│   │   │   ├── EventSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── hooks/                # 홈 전용 훅
│   │   └── types.ts              # 홈 전용 타입
│   │
│   ├── exchange/                 # 환율 관련 기능
│   │   ├── components/
│   │   │   └── ExchangeRateSection.tsx
│   │   ├── hooks/
│   │   └── api/
│   │
│   └── inquiry/                  # 문의 관련 기능
│       ├── components/
│       │   └── ServiceInquiryModal.tsx
│       └── hooks/
│
├── components/                   # 공용 컴포넌트
│   ├── ui/                       # 기본 UI 컴포넌트
│   │   ├── ImageWithFallback.tsx
│   │   ├── ServerImage.tsx
│   │   └── NotificationAlertModal.tsx
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── providers/                # Context Providers
│       └── apollo-provider.tsx
│
├── lib/                          # 유틸리티 및 설정
│   ├── graphql/                  # GraphQL 관련
│   │   ├── client.ts             # Apollo Client 설정
│   │   ├── fetcher.ts            # Server-side fetcher
│   │   └── shim.ts               # Apollo 호환 shim
│   └── utils/                    # 일반 유틸리티
│       └── image.ts              # 이미지 처리
│
├── hooks/                        # 공용 커스텀 훅
├── types/                        # 공용 타입 정의
├── constants/                    # 상수 정의
│
├── generated/                    # 자동 생성 파일 (수정 금지)
│   └── graphql.ts
│
├── graphql/                      # GraphQL 스키마/쿼리
│   ├── queries/
│   ├── mutations/
│   └── schema.graphql
│
└── i18n/                         # 국제화 설정
    ├── routing.ts
    └── request.ts
```

### 1.2 Feature 모듈 구조 원칙

새로운 기능 추가 시 다음 구조를 따릅니다:

```
features/{feature-name}/
├── components/          # UI 컴포넌트
├── hooks/               # 커스텀 훅
├── api/                 # API 관련 (필요 시)
├── utils/               # 유틸리티 (필요 시)
├── types.ts             # 타입 정의
└── constants.ts         # 상수 (필요 시)
```

### 1.3 Import 경로 규칙

```typescript
// Feature 내부 import (상대 경로)
import { useExchangeRate } from '../hooks/useExchangeRate';

// Feature 간 import (절대 경로)
import { ExchangeRateSection } from '@/features/exchange/components/ExchangeRateSection';

// 공용 컴포넌트 import
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Header from '@/components/layout/Header';

// 유틸리티 import
import { apolloClient } from '@/lib/graphql/client';
import { getBlurDataURL } from '@/lib/utils/image';
```

---

## 2. Component Guidelines

### 2.1 Server vs Client Components

```typescript
// 기본값: Server Component
export default async function Section() {
  const data = await fetchData();
  return <div>{/* ... */}</div>;
}

// Client Component (필요 시에만)
'use client';
export default function InteractiveSection() {
  const [state, setState] = useState();
  return <div>{/* ... */}</div>;
}
```

**'use client' 추가 조건:**
- useState, useEffect 등 React hooks 사용
- 브라우저 API 접근 (window, document)
- Event handlers 필요
- embla-carousel 등 클라이언트 전용 라이브러리

### 2.2 Component Naming

```
컴포넌트:     PascalCase.tsx      (HeroSection.tsx, Button.tsx)
훅:          use + PascalCase.ts  (useExchangeRate.ts)
유틸리티:     kebab-case.ts       (image.ts, graphql-client.ts)
타입:        types.ts 또는 kebab-case.ts
CSS Module:  Component.module.css
```

---

## 3. Data Fetching

### 3.1 GraphQL Workflow

```bash
# 1. src/graphql/queries/ 또는 mutations/에 .graphql 파일 작성
# 2. 타입 생성
pnpm codegen

# 3. 생성된 훅 사용 (Client Component)
import { useGetExampleQuery } from '@/generated/graphql';
```

### 3.2 Server vs Client Data Fetching

```typescript
// Server Component - Apollo Client 직접 사용
import { apolloClient } from '@/lib/graphql/client';

export default async function Page() {
  const { data } = await apolloClient.query({ query: GET_DATA });
  return <div>{data}</div>;
}

// Client Component - Generated Hooks 사용
'use client';
import { useGetDataQuery } from '@/generated/graphql';

export default function ClientPage() {
  const { data, loading } = useGetDataQuery();
  return <div>{data}</div>;
}
```

### 3.3 Generated 파일 규칙

```
src/generated/graphql.ts
  - 직접 수정 금지
  - 커밋 전 pnpm codegen 실행 확인
  - import 시 타입과 훅 모두 사용 가능
```

---

## 4. Styling Guidelines

### 4.1 Tailwind CSS 우선

```tsx
// 기본: Tailwind CSS
<div className="flex items-center gap-4 p-6 rounded-lg bg-white shadow-md">

// 복잡한 애니메이션: CSS Module
import styles from './Component.module.css';
<div className={styles.animatedContainer}>
```

### 4.2 반응형 브레이크포인트

```
sm:   640px   (모바일 가로)
md:   768px   (태블릿)
lg:   1024px  (데스크탑)
xl:   1280px  (대형 데스크탑)
2xl:  1536px  (초대형)
```

---

## 5. Performance Checklist

### Critical (반드시 확인)
- [ ] 독립적 데이터 요청은 `Promise.all()` 병렬 처리
- [ ] 무거운 컴포넌트는 `next/dynamic` lazy loading
- [ ] 이미지는 적절한 width/height, sizes 명시
- [ ] `'use client'` 최소화

### Recommended
- [ ] React Compiler가 최적화하므로 수동 useMemo/useCallback 불필요
- [ ] barrel 파일(index.ts) 사용 금지 - 직접 import
- [ ] 리스트 렌더링 시 고유한 `key` prop

---

## 6. Image Handling

### 6.1 컴포넌트 선택

```typescript
// Client Component에서 일반 이미지
import ImageWithFallback from '@/components/ui/ImageWithFallback';

// Server Component에서 blur placeholder 필요 시
import ServerImage from '@/components/ui/ServerImage';
```

### 6.2 허용된 외부 이미지 도메인

```
pub-b8c324bfc986460fbdb1c9667951568a.r2.dev
```

---

## 7. Internationalization

### 7.1 사용법

```typescript
// Server Component
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('Section');

// Client Component
import { useTranslations } from 'next-intl';
const t = useTranslations('Section');
```

### 7.2 지원 언어
- `ko` (한국어)
- `en` (영어)

### 7.3 메시지 파일
```
messages/ko.json
messages/en.json
```

---

## 8. Scripts Reference

```bash
pnpm dev              # 개발 서버 (localhost:3000)
pnpm build            # 프로덕션 빌드
pnpm lint             # ESLint 검사
pnpm codegen          # GraphQL 타입 생성
pnpm codegen:watch    # GraphQL 타입 자동 생성 (watch)
```

---

## 9. Git Conventions

### Commit Message
```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
style: 스타일링 변경
docs: 문서 수정
chore: 설정/빌드 관련
```

### Branch Naming
```
feature/{기능명}
fix/{이슈번호}-{설명}
refactor/{대상}
```

---

## 10. DO / DON'T

### DO
- Server Component 우선 고려
- Feature 모듈 내 관련 코드 응집
- 타입 안전성 유지 (any 금지)
- 기존 코드 패턴 따르기

### DON'T
- `src/generated/` 파일 직접 수정
- barrel 파일(index.ts) 생성
- inline style 과다 사용
- console.log 커밋
- 불필요한 `'use client'` 선언
- Feature 간 순환 의존성

---

## 11. New Feature Checklist

새로운 기능 추가 시:

1. [ ] `src/features/{feature-name}/` 디렉토리 생성
2. [ ] 컴포넌트, 훅, 타입 파일 구조화
3. [ ] GraphQL 쿼리/뮤테이션 작성 후 `pnpm codegen`
4. [ ] 다국어 메시지 추가 (messages/*.json)
5. [ ] 반응형 디자인 확인 (sm, md, lg, xl)
6. [ ] 빌드 테스트 (`pnpm build`)

---

## 12. 추가 참고 자료

- React Best Practices: `.claude/skills/react-best-practices/SKILL.md`
- 성능 최적화 가이드: `.claude/skills/react-best-practices/AGENTS.md`
