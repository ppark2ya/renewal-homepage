'use client';

import { useState } from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Globe } from 'lucide-react';
import { useScrollPosition } from '@/hooks';
import { NAV_ITEMS, RIGHT_NAV_ITEMS } from '@/constants/data';
import { R2_BASE_URL } from '@/constants';
import type { NavItem } from '@/types';

interface DesktopNavProps {
  navItems: NavItem[];
  activeNavItem: string | null;
  onNavItemHover: (label: string) => void;
}

function DesktopNav({ navItems,  activeNavItem, onNavItemHover }: DesktopNavProps) {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navItems.map((item) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isActive = activeNavItem === item.label;

        return (
          <div key={item.label} className="relative">
            <Link
              href={item.href}
              className="text-[16px] leading-[30px] text-[#111] transition-colors hover:font-bold"
              onMouseEnter={() => onNavItemHover(item.label)}
            >
              {item.label}
            </Link>
            {/* Submenu dropdown */}
            {hasSubItems && (
              <div
                className={`absolute left-1/2 z-50 -translate-x-1/2 pt-3 transition-all duration-200 w-[200vw] ${
                  isActive ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
              >
                <div className="flex flex-col items-center gap-3 whitespace-nowrap bg-white px-6 py-4 shadow-lg">
                  {item.subItems?.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="text-[14px] text-[#666] transition-colors hover:text-[#111]"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  navItems: NavItem[];
}

function MobileNav({ isOpen, onOpenChange, navItems }: MobileNavProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-10 lg:hidden" aria-label="메뉴 열기">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col border-none bg-black p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-[30px] pb-[60px]">
          {navItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-4">
              <Link
                href={item.href}
                className="text-[16px] font-bold capitalize leading-[30px] text-white transition-colors duration-200 hover:text-[#BBC4D3]"
                onClick={() => onOpenChange(false)}
              >
                {item.label}
              </Link>
              {item.subItems && (
                <div className="flex flex-col items-center gap-4">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="text-[14px] leading-[20px] text-[#BBC4D3] transition-all duration-300 ease-out hover:text-white"
                      onClick={() => onOpenChange(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

/**
 * 헤더 컴포넌트
 * - 스크롤 시 배경색 변경 (useScrollPosition 훅 사용)
 * - 데스크탑: 드롭다운 서브메뉴
 * - 모바일: Sheet 사이드 메뉴
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const { isScrolled } = useScrollPosition();

  const handleMouseLeave = () => {
    setIsNavHovered(false);
    setActiveNavItem(null);
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled || isNavHovered ? 'bg-white/[0.97]' : 'bg-transparent'
        } ${isScrolled ? 'shadow-md' : ''}`}
        onMouseLeave={handleMouseLeave}
      >
        {/* Container */}
        <div
          onMouseEnter={() => setIsNavHovered(true)}
          className={`mx-auto flex w-full items-center justify-between px-4 transition-all duration-300 md:px-8 lg:px-16 xl:px-24 2xl:px-[320px] h-[60px]`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative flex h-[30px] w-[90px] shrink-0 items-center"
            aria-label="Dozn Exchange 홈"
          >
            <ImageWithFallback
              src={`${R2_BASE_URL}/dozn_exchange_logo.svg`}
              alt="Dozn Exchange"
              fill
              className="object-contain"
              fallbackSrc="/images/dozn-logo.svg"
            />
          </Link>

          {/* Center Nav - Desktop */}
          <DesktopNav
            navItems={NAV_ITEMS}
            activeNavItem={activeNavItem}
            onNavItemHover={setActiveNavItem}
          />

          {/* Right Nav - Desktop */}
          <div className="hidden items-center gap-6 lg:flex">
            {RIGHT_NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[14px] leading-[30px] text-[#111] transition-colors hover:text-[#111]/70"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="ghost" size="icon" className="size-6" aria-label="언어 선택">
              <Globe className="h-5 w-5 text-[#111]" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <MobileNav isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} navItems={NAV_ITEMS} />
        </div>

      </div>
    </header>
  );
}
