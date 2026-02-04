'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { FAMILY_SITES } from '@/constants/data';
import { R2_BASE_URL } from '@/constants';

/**
 * 푸터 컴포넌트
 * - 회사 정보
 * - Family Site 드롭다운
 * - 이용약관, 개인정보처리방침 링크
 */
export default function Footer() {
  return (
    <footer className="w-full bg-[#F6F8F9]" role="contentinfo">
      <div className="mx-auto flex h-auto w-full max-w-[1920px] flex-col items-start justify-between gap-6 px-4 py-8 md:h-[300px] md:flex-row md:py-[40px] 2xl:px-[320px]">
        {/* Left: Logo & Company Info */}
        <div className="flex flex-col gap-[20px]">
          {/* Logo */}
          <Link href="/" className="relative h-[30px] w-[69px]" aria-label="Dozn 홈">
            <ImageWithFallback
              src={`${R2_BASE_URL}/dozn_logo.png`}
              alt="Dozn"
              fill
              className="object-contain"
              sizes="69px"
              fallbackSrc="/images/dozn-logo.svg"
            />
          </Link>

          {/* Company Info */}
          <address className="flex flex-col text-[14px] leading-[30px] tracking-[-0.7px] text-[#717895] not-italic">
            <p>주소 : 서울시 서초구 강남대로 465, B동 16층 (서초동 1303-22, 강남교보타워)</p>
            <p>
              고객센터 : <a href="tel:1566-0979" className="hover:underline">1566-0979</a> ｜
              사업자등록번호 : 378-88-00880 ｜ 통신판매업신고 : 2018-서울서초-0267호
            </p>
          </address>

          {/* Legal Links */}
          <nav
            className="flex w-[242px] items-center gap-[32px] text-[14px] leading-[1.5] text-[#111]"
            aria-label="법적 고지"
          >
            <Link href="/terms" className="hover:underline">
              이용약관
            </Link>
            <Link href="/privacy" className="font-bold underline decoration-solid hover:no-underline">
              개인정보처리방침
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-[12px] leading-normal text-[#717895]">
            Copyright © DOZN. All rights reserved.
          </p>
        </div>

        {/* Right: Family Site dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex w-[200px] items-center justify-between rounded-[8px] border border-[#D8DCE9] bg-white px-[14px] py-[10px] hover:bg-white"
            >
              <span className="text-[14px] leading-[20px] text-[#111]">Family Site</span>
              <ChevronDown className="h-5 w-5 text-[#111]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[200px] rounded-[8px] border border-[#D8DCE9] bg-white shadow-lg"
          >
            {FAMILY_SITES.map((site) => (
              <DropdownMenuItem key={site.name} asChild>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-[14px] py-[10px] text-[14px] text-[#111] hover:bg-[#F6F8F9]"
                >
                  {site.name}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </footer>
  );
}
