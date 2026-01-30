"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Location", href: "/location" },
  { label: "FX Rate Check", href: "/fx-rate" },
  { label: "THE Free", href: "/the-free" },
  { label: "Customer Center", href: "/customer-center" },
];

const rightNavItems = [
  { label: "About Dozn", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <span className="text-xl font-bold text-[#111]">dozn</span>
        </Link>

        {/* Center Nav - Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[16px] leading-[30px] text-[#111] transition-colors hover:text-[#111]/70"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Nav - Desktop */}
        <div className="hidden items-center gap-4 md:flex">
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
          className="flex size-10 items-center justify-center md:hidden"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <nav className="flex flex-col px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-3 text-[16px] leading-[30px] text-[#111]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            {rightNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-3 text-[14px] leading-[30px] text-[#111]/70"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
