interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 섹션 제목 공통 컴포넌트
 * 모든 섹션에서 일관된 제목 스타일을 적용
 */
export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`text-center text-[24px] font-normal capitalize leading-[1.3] text-[#111] md:text-[32px] lg:text-[40px] lg:leading-[60px] ${className}`}
    >
      {children}
    </h2>
  );
}
