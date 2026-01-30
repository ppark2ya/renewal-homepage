# Claude/Gemini AI Assistant Guidelines

이 문서는 AI 어시스턴트가 프로젝트 작업 시 따라야 할 가이드라인을 정의합니다.

## 필수 참조 스킬

작업을 진행할 때 반드시 다음 스킬 파일들을 참고해주세요:

### React Best Practices
- **파일 경로**: `.claude/skills/react-best-practices/SKILL.md`
- **전체 가이드**: `.claude/skills/react-best-practices/AGENTS.md`
- **적용 시점**:
  - 새로운 React 컴포넌트 또는 Next.js 페이지 작성 시
  - 데이터 페칭 구현 시 (클라이언트 또는 서버 사이드)
  - 성능 이슈를 위한 코드 리뷰 시
  - 기존 React/Next.js 코드 리팩토링 시
  - 번들 사이즈 또는 로드 시간 최적화 시

## 기술 스택

이 프로젝트는 다음 기술 스택을 사용합니다:

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: CSS/Tailwind CSS
- **Internationalization**: next-intl

## 코딩 규칙

### 우선순위별 최적화 카테고리

| 우선순위 | 카테고리 | 영향도 |
|----------|----------|--------|
| 1 | Waterfall 제거 | CRITICAL |
| 2 | 번들 사이즈 최적화 | CRITICAL |
| 3 | 서버 사이드 성능 | HIGH |
| 4 | 클라이언트 사이드 데이터 페칭 | MEDIUM-HIGH |
| 5 | 리렌더 최적화 | MEDIUM |

### 핵심 규칙 요약

1. **비동기 처리**: 독립적인 작업에는 `Promise.all()` 사용
2. **번들 최적화**: barrel 파일 피하고 직접 import
3. **동적 로딩**: 무거운 컴포넌트는 `next/dynamic` 사용
4. **Server Components**: 가능한 한 Server Component 활용
5. **캐싱**: `React.cache()` 및 LRU 캐시 활용

## 프로젝트 구조

```
src/
├── app/           # Next.js App Router 페이지
├── components/    # 재사용 가능한 컴포넌트
├── hooks/         # 커스텀 React 훅
├── lib/           # 유틸리티 및 헬퍼 함수
├── styles/        # 글로벌 스타일
└── types/         # TypeScript 타입 정의
```

## 작업 시 체크리스트

코드 작성 또는 수정 시 다음 사항을 확인해주세요:

- [ ] SKILL.md의 해당 규칙을 확인했는가?
- [ ] 불필요한 리렌더링이 발생하지 않는가?
- [ ] 번들 사이즈에 미치는 영향을 고려했는가?
- [ ] Server Component로 구현 가능한 부분인가?
- [ ] 적절한 에러 처리가 되어 있는가?
- [ ] TypeScript 타입이 올바르게 정의되어 있는가?
