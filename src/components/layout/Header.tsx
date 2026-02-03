"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

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
  const [isMenuVisible, setIsMenuVisible] = useState(false);
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

  // Handle menu open animation
  useEffect(() => {
    if (isMenuOpen) {
      // Small delay to trigger animation after mount
      requestAnimationFrame(() => {
        setIsMenuVisible(true);
      });
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Main header bar */}
      <div
        className={`w-full backdrop-blur-sm transition-all duration-300 ${isScrolled || isNavHovered ? "bg-white/[0.97]" : "bg-transparent"} ${isScrolled ? "shadow-md" : ""}`}
        onMouseLeave={() => {
          setIsNavHovered(false);
          setActiveNavItem(null);
        }}
      >
        {/* Container */}
        <div className={`mx-auto flex w-full items-center justify-between px-4 transition-all duration-300 md:px-8 lg:px-16 xl:px-24 2xl:px-[320px] ${isNavHovered ? "h-[50px]" : "h-[60px]"}`}>
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
            <button
              className="flex size-6 items-center justify-center text-[#111]"
              aria-label="Language"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
          </div>

          {/* Hamburger - Mobile */}
          <button
            className="flex size-10 items-center justify-center lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
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

      {/* Mobile Menu - Full Screen Overlay */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-50 flex flex-col bg-black transition-opacity duration-300 ease-out lg:hidden ${
            isMenuVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Header with close button */}
          <div
            className={`flex h-[60px] shrink-0 items-center justify-end px-10 py-8 transition-all duration-300 ease-out ${
              isMenuVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isMenuVisible ? "100ms" : "0ms" }}
          >
            <button
              className="flex size-6 items-center justify-center text-white transition-transform duration-200 hover:scale-110"
              onClick={handleCloseMenu}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation - Centered */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-8 pb-[60px] px-[30px]">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className={`flex flex-col items-center gap-4 transition-all duration-300 ease-out ${
                  isMenuVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isMenuVisible ? `${150 + index * 50}ms` : "0ms",
                }}
              >
                <Link
                  href={item.href}
                  className="text-[16px] font-bold capitalize leading-[30px] text-white transition-colors duration-200 hover:text-[#BBC4D3]"
                  onClick={handleCloseMenu}
                >
                  {item.label}
                </Link>
                {item.subItems && (
                  <div className="flex flex-col items-center gap-4">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={`text-[14px] leading-[20px] text-[#BBC4D3] transition-all duration-300 ease-out hover:text-white ${
                          isMenuVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isMenuVisible
                            ? `${200 + index * 50 + subIndex * 30}ms`
                            : "0ms",
                        }}
                        onClick={handleCloseMenu}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
