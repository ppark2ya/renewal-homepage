"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, Globe } from "lucide-react";

const navItems = [
  { label: "Location", href: "/location" },
  { label: "FX Rate Check", href: "/fx-rate" },
  {
    label: "THE Free",
    href: "/the-free",
    subItems: [
      { label: "About", href: "/the-free/about" },
      { label: "Top-up / Usage History", href: "/the-free/usage-history" },
    ],
  },
  { label: "Customer Center", href: "/customer-center" },
];

const rightNavItems = [
  { label: "About Dozn", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);

  const theFreeItem = navItems.find((item) => item.label === "THE Free");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Main header bar */}
      <div
        className={`w-full transition-all duration-300 ${isScrolled || isNavHovered ? "bg-white/[0.97]" : "bg-transparent"} ${isScrolled ? "shadow-md" : ""}`}
        onMouseLeave={() => {
          setIsNavHovered(false);
          setActiveNavItem(null);
        }}
      >
        {/* Container */}
        <div
          className={`mx-auto flex w-full items-center justify-between px-4 transition-all duration-300 md:px-8 lg:px-16 xl:px-24 2xl:px-[320px] ${isNavHovered ? "h-[50px]" : "h-[60px]"}`}
        >
          {/* Logo */}
          <Link href="/" className="relative flex h-[30px] w-[90px] shrink-0 items-center">
            <ImageWithFallback
              src={`${process.env.NEXT_PUBLIC_R2_BASE_URL}/dozn_exchange_logo.svg`}
              alt="Dozn"
              fill
              className="object-contain"
              fallbackSrc="/images/dozn-logo.svg"
            />
          </Link>

          {/* Center Nav - Desktop */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            onMouseEnter={() => setIsNavHovered(true)}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[16px] leading-[30px] text-[#111] transition-colors hover:font-bold"
                onMouseEnter={() => setActiveNavItem(item.label)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Nav - Desktop */}
          <div className="hidden items-center gap-6 lg:flex">
            {rightNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[14px] leading-[30px] text-[#111] transition-colors hover:text-[#111]/70"
              >
                {item.label}
              </Link>
            ))}
            {/* Globe Icon */}
            <Button variant="ghost" size="icon" className="size-6" aria-label="Language">
              <Globe className="h-5 w-5 text-[#111]" />
            </Button>
          </div>

          {/* Hamburger - Mobile using Sheet */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-10 lg:hidden"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-full flex-col border-none bg-black p-0"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              {/* Navigation - Centered */}
              <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-[30px] pb-[60px]">
                {navItems.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-4">
                    <Link
                      href={item.href}
                      className="text-[16px] font-bold capitalize leading-[30px] text-white transition-colors duration-200 hover:text-[#BBC4D3]"
                      onClick={() => setIsMenuOpen(false)}
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
                            onClick={() => setIsMenuOpen(false)}
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
        </div>

        {/* Desktop Cover Dropdown */}
        <div
          className={`hidden w-full overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 lg:block ${isNavHovered && activeNavItem === "THE Free" ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}
          onMouseEnter={() => setIsNavHovered(true)}
        >
          <div className="mx-auto flex w-full justify-center gap-16 px-4 py-6 2xl:px-[320px]">
            {theFreeItem?.subItems?.map((subItem) => (
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
      </div>
    </header>
  );
}
