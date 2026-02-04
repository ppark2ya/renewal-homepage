'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import ServiceInquiryModal from '@/features/inquiry/components/ServiceInquiryModal';

type ModalType = 'service' | 'partnership' | null;

/**
 * CTA 섹션 - 문의하기 버튼들
 * 하나의 상태로 모달 관리 (동시에 하나만 열림)
 */
export default function CTASection() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <section className="w-full overflow-hidden bg-[#FFD300]" aria-labelledby="cta-title">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-[30px] px-4 py-12 md:gap-[50px] md:py-[100px]">
        <SectionTitle>Begin And End Your Journey With Dozn Exchange.</SectionTitle>

        {/* Buttons */}
        <div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row lg:justify-center lg:gap-[16px]">
          <Button
            onClick={() => openModal('partnership')}
            className="h-[50px] rounded-[100px] border border-[#111] bg-[#111] px-6 text-[14px] font-medium text-white hover:bg-[#111]/90 md:px-[30px] md:text-[16px]"
          >
            Partnership / Rental Inquiries
          </Button>
          <Button
            onClick={() => openModal('service')}
            className="h-[50px] rounded-[100px] border border-[#111] bg-[#111] px-6 text-[14px] font-medium text-white hover:bg-[#111]/90 md:px-[30px] md:text-[16px]"
          >
            Service Inquiry
          </Button>
        </div>
      </div>

      {/* Service Inquiry Modal */}
      <ServiceInquiryModal
        isOpen={activeModal === 'service'}
        onClose={closeModal}
        title="Service Inquiry"
      />

      {/* Partnership Modal */}
      <ServiceInquiryModal
        isOpen={activeModal === 'partnership'}
        onClose={closeModal}
        title="Partnership / Rental Inquiries"
      />
    </section>
  );
}
