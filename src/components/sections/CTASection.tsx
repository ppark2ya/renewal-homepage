"use client";

import { useState } from "react";
import ServiceInquiryModal from "@/components/modals/ServiceInquiryModal";

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full bg-white py-12 md:py-[100px]">
      <div className="flex w-full flex-col items-center gap-8 px-4 xl:px-[360px] md:gap-[50px]">
        <h2 className="text-center text-[24px] font-bold leading-[1.3] text-[#111] md:text-[40px] md:leading-[60px]">
          Begin and end your journey
          <br className="md:hidden" /> with Dozn Exchange.
        </h2>

        {/* Buttons */}
        <div className="flex w-full max-w-[343px] flex-col gap-4 md:max-w-none md:flex-row md:justify-center md:gap-[50px]">
          <button className="h-[50px] rounded-full border-2 border-[#111] px-8 text-[16px] font-medium text-[#111] transition-colors hover:bg-[#111] hover:text-white md:w-[300px]">
            Find Nearby Kiosks
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-[50px] rounded-full bg-[#FFD900] px-8 text-[16px] font-medium text-[#111] transition-colors hover:bg-[#F5C800] md:w-[300px]"
          >
            Service Inquiry
          </button>
        </div>
      </div>

      <ServiceInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
