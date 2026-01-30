"use client";

import { useState } from "react";

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceInquiryModal({
  isOpen,
  onClose,
}: ServiceInquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    contactNumber: "",
    inquiry: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);

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
    // TODO: 폼 제출 로직 구현
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 mx-4 w-full max-w-[640px] rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <h2 className="text-[20px] font-semibold text-[#111] md:text-[24px]">
            Rental / Partnership Inquiry
          </h2>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Name & Company Row */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[14px] font-semibold text-[#FF9500]"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Please Enter Your Name"
                  className="w-full border-b border-gray-200 pb-2 text-[14px] text-[#111] placeholder:text-gray-400 focus:border-[#FF9500] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-[14px] font-semibold text-[#FF9500]"
                >
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Please Enter Company Or Organization"
                  className="w-full border-b border-gray-200 pb-2 text-[14px] text-[#111] placeholder:text-gray-400 focus:border-[#FF9500] focus:outline-none"
                />
              </div>
            </div>

            {/* Email & Contact Row */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[14px] font-semibold text-[#FF9500]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Please Enter Your Email"
                  className="w-full border-b border-gray-200 pb-2 text-[14px] text-[#111] placeholder:text-gray-400 focus:border-[#FF9500] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="contactNumber"
                  className="mb-2 block text-[14px] font-semibold text-[#FF9500]"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Please Enter Contact Number"
                  className="w-full border-b border-gray-200 pb-2 text-[14px] text-[#111] placeholder:text-gray-400 focus:border-[#FF9500] focus:outline-none"
                />
              </div>
            </div>

            {/* Inquiry Details */}
            <div>
              <label
                htmlFor="inquiry"
                className="mb-2 block text-[14px] font-semibold text-[#FF9500]"
              >
                Inquiry Details
              </label>
              <textarea
                id="inquiry"
                name="inquiry"
                value={formData.inquiry}
                onChange={handleInputChange}
                placeholder="Please Enter Your Inquiry"
                rows={5}
                className="w-full resize-none rounded-lg border border-gray-200 p-3 text-[14px] text-[#111] placeholder:text-gray-400 focus:border-[#FF9500] focus:outline-none"
              />
            </div>

            {/* Privacy Notice */}
            <div className="rounded-lg bg-[#F5F5F5] p-4 text-[12px] leading-relaxed text-gray-600">
              <p>
                <strong>Items Collected:</strong> Company name, Name, Contact
                information, Email
              </p>
              <p>
                <strong>Purpose of Collection:</strong> To provide consultation
                for Dozen Exchange partnership/rental/service inquiries
              </p>
              <p>
                <strong>Retention Period:</strong> Until the purpose of using
                the personal information is achieved
              </p>
              <p className="mt-2 text-[11px] text-gray-500">
                ※ You may refuse to consent to the collection and use of
                personal information; however, refusal may limit your ability to
                use the relevant services.
              </p>
            </div>

            {/* Agreement Checkbox */}
            <label className="flex cursor-pointer items-center gap-2">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="flex size-5 items-center justify-center rounded-full border-2 border-gray-300 transition-colors peer-checked:border-[#4A90D9] peer-checked:bg-[#4A90D9]">
                  <svg
                    className="size-3 text-white opacity-0 peer-checked:opacity-100"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                </div>
                {isAgreed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="size-3 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="text-[13px] text-[#111]">
                I Agree To The Collection And Use Of My Personal Information.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-[#FFD900] py-4 text-[16px] font-semibold text-[#111] transition-colors hover:bg-[#FFD900]/90"
          >
            문의하기
          </button>
        </form>
      </div>
    </div>
  );
}
