"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceInquiryModal from "@/features/inquiry/components/ServiceInquiryModal";

export default function CTASection() {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);

  return (
    <section className="w-full overflow-hidden bg-[#FFD300]">
      {/* Container: py-[100px] gap-[50px] w-[1920px] */}
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-[30px] px-4 py-12 md:gap-[50px] md:py-[100px]">
        {/* Title: text-[40px] leading-[60px] */}
        <h2 className="text-center text-[24px] font-normal capitalize leading-[1.3] text-[#111] md:text-[32px] lg:text-[40px] lg:leading-[60px]">
          Begin And End Your Journey With Dozn Exchange.
        </h2>

        {/* Buttons: gap-[16px] */}
        <div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row lg:justify-center lg:gap-[16px]">
          <Button
            onClick={() => setIsPartnershipModalOpen(true)}
            className="h-[50px] rounded-[100px] border border-[#111] bg-[#111] px-6 text-[14px] font-medium text-white hover:bg-[#111]/90 md:px-[30px] md:text-[16px]"
          >
            Partnership / Rental Inquiries
          </Button>
          <Button
            onClick={() => setIsServiceModalOpen(true)}
            className="h-[50px] rounded-[100px] border border-[#111] bg-[#111] px-6 text-[14px] font-medium text-white hover:bg-[#111]/90 md:px-[30px] md:text-[16px]"
          >
            Service Inquiry
          </Button>
        </div>
      </div>

      <ServiceInquiryModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title={"Service Inquiry"}
      />

      <ServiceInquiryModal
        isOpen={isPartnershipModalOpen}
        onClose={() => setIsPartnershipModalOpen(false)}
        title={"Partnership / Rental Inquiries"}
      />
    </section>
  );
}
