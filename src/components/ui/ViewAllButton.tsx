import { Button } from '@/components/ui/button';

interface ViewAllButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

/**
 * "View All" 스타일 버튼 공통 컴포넌트
 * HotspotSection, EventSection 등에서 사용
 */
export function ViewAllButton({
  children,
  onClick,
  className = '',
}: ViewAllButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`h-[50px] rounded-full border border-[#FFD300] bg-[#FFD300] px-8 text-[14px] font-medium text-[#111] hover:bg-[#111] hover:text-white md:text-[16px] ${className}`}
    >
      {children}
    </Button>
  );
}
