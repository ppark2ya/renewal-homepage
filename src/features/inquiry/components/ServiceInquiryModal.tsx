"use client";

import { useState, useEffect } from "react";

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function ServiceInquiryModal({
  isOpen,
  onClose,
    title
}: ServiceInquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    contactNumber: "",
    inquiry: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop - 모바일에서는 숨김 */}

      <div
        className="absolute inset-0 hidden bg-black/50 md:block"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex h-full w-full flex-col bg-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] md:mx-4 md:h-auto lg:max-h-[90vh] md:max-w-[768px] md:rounded-none">
        {/* Header */}
        <div className="flex h-[54px] shrink-0 items-center justify-between px-4">
          <h2 className="font-pretendard text-[24px] font-normal leading-[40px] text-[#111]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex size-6 items-center justify-center text-[#111] transition-colors hover:text-gray-600"
            aria-label="Close modal"
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

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-y-auto"
        >
          <div className="flex flex-col gap-5 px-4 pb-8 pt-4">
            {/* Name & Company - 데스크톱: 2열, 모바일: 1열 */}
            <div className="flex flex-col gap-5 md:flex-row md:gap-5">
              <div className="flex flex-1 flex-col">
                <label className="font-pretendard text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Please Enter Your Name"
                  className="w-full border-b border-[#D8DCE9] bg-white px-2 py-[5px] font-pretendard text-[14px] leading-[30px] text-[#111] placeholder:text-[#BBC4D3] focus:border-[#FF8C00] focus:outline-none"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label className="font-pretendard text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                  Company / Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Please Enter Company Or Organization"
                  className="w-full border-b border-[#D8DCE9] bg-white px-2 py-[5px] font-pretendard text-[14px] leading-[30px] text-[#111] placeholder:text-[#BBC4D3] focus:border-[#FF8C00] focus:outline-none"
                />
              </div>
            </div>

            {/* Email & Contact - 데스크톱: 2열, 모바일: 1열 */}
            <div className="flex flex-col gap-5 md:flex-row md:gap-5">
              <div className="flex flex-1 flex-col">
                <label className="font-pretendard text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Please Enter Your Email"
                  className="w-full border-b border-[#D8DCE9] bg-white px-2 py-[5px] font-pretendard text-[14px] leading-[30px] text-[#111] placeholder:text-[#BBC4D3] focus:border-[#FF8C00] focus:outline-none"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label className="font-pretendard text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Please Enter Contact Number"
                  className="w-full border-b border-[#D8DCE9] bg-white px-2 py-[5px] font-pretendard text-[14px] leading-[30px] text-[#111] placeholder:text-[#BBC4D3] focus:border-[#FF8C00] focus:outline-none"
                />
              </div>
            </div>

            {/* Inquiry Details */}
            <div className="flex flex-col gap-2">
              <label className="font-pretendard text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                Inquiry Details
              </label>
              <textarea
                name="inquiry"
                value={formData.inquiry}
                onChange={handleInputChange}
                placeholder="Please Enter Your Inquiry"
                rows={5}
                className="w-full resize-none border border-[#D8DCE9] bg-white p-2 font-pretendard text-[14px] leading-[30px] text-[#111] placeholder:text-[#BBC4D3] focus:border-[#FF8C00] focus:outline-none"
              />
            </div>

            {/* Privacy Notice */}
            <div className="flex flex-col gap-[10px]">
              <div className="rounded bg-[#F3F7FC] px-[15px] py-[10px]">
                <p className="font-pretendard text-[13px] leading-[20px] text-[#717895]">
                  Items Collected: Company name, Name, Contact information,
                  Email
                  <br />
                  Purpose of Collection: To provide consultation for Dozen
                  Exchange partnership/rental/service inquiries
                  <br />
                  Retention Period: Until the purpose of using the personal
                  information is achieved
                  <br />※ You may refuse to consent to the collection and use of
                  personal information; however, refusal may limit your ability
                  to use the relevant services.
                </p>
              </div>

              {/* Checkbox */}
              <label className="flex cursor-pointer items-center gap-2">
                <div className="flex h-[30px] items-center">
                  <button
                    type="button"
                    onClick={() => setIsAgreed(!isAgreed)}
                    className={`flex size-5 items-center justify-center rounded-full transition-colors ${
                      isAgreed ? "bg-[#4A90D9]" : "bg-[#BBC4D3]"
                    }`}
                  >
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <span className="font-pretendard text-[14px] leading-[30px] text-[#111]">
                  I Agree To The Collection And Use Of My Personal Information.
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="h-[50px] w-full shrink-0 bg-[#FFD300] font-pretendard text-[16px] leading-[24px] text-[#111] transition-colors hover:bg-[#FFD300]/90"
          >
            문의하기
          </button>
        </form>
      </div>
    </div>
  );
}
