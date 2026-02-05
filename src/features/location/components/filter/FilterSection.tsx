'use client';

import type { ReactNode } from 'react';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

export default function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[16px] font-bold leading-[30px] text-[#FF8C00] capitalize">
        {title}
      </h3>
      <div className="flex flex-wrap gap-[10px]">{children}</div>
    </div>
  );
}
