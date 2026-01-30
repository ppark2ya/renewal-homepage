import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#222] text-white">
      <div className="w-full px-4 py-10 xl:px-[360px] md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Logo & Company Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-xl font-bold text-white">
              dozn
            </Link>
            <div className="flex flex-col gap-1 text-[13px] leading-[20px] text-white/60">
              <p>더즌익스체인지 주식회사 | 대표이사: OOO</p>
              <p>사업자등록번호: 000-00-00000</p>
              <p>
                서울특별시 강남구 테헤란로 000, 00층
              </p>
              <p>고객센터: 1588-0000</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-[14px] font-semibold">Service</h4>
              <Link
                href="/location"
                className="text-[13px] text-white/60 hover:text-white"
              >
                Location
              </Link>
              <Link
                href="/fx-rate"
                className="text-[13px] text-white/60 hover:text-white"
              >
                FX Rate Check
              </Link>
              <Link
                href="/the-free"
                className="text-[13px] text-white/60 hover:text-white"
              >
                THE Free
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-[14px] font-semibold">Company</h4>
              <Link
                href="/about"
                className="text-[13px] text-white/60 hover:text-white"
              >
                About Dozn
              </Link>
              <Link
                href="/contact"
                className="text-[13px] text-white/60 hover:text-white"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-[12px] text-white/40">
            &copy; {new Date().getFullYear()} Dozn Exchange. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
