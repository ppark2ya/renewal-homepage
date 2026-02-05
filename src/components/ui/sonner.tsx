'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#111] group-[.toaster]:border-[#d8dce9] group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg',
          description: 'group-[.toast]:text-[#717895]',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-[#111]',
          cancelButton:
            'group-[.toast]:bg-gray-100 group-[.toast]:text-[#717895]',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
