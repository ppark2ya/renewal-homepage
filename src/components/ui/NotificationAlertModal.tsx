"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface NotificationAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Currency = {
  code: string;
  name: string;
  flag: string;
};

const CURRENCIES: Currency[] = [
  { code: "TWD", name: "대만 달러", flag: "/images/flags/tw.svg" },
  { code: "JPY", name: "일본 엔", flag: "/images/flags/jp.svg" },
  { code: "USD", name: "미국 달러", flag: "/images/flags/us.svg" },
  { code: "CNY", name: "중국 위안", flag: "/images/flags/cn.svg" },
  { code: "HKD", name: "홍콩 달러", flag: "/images/flags/hk.svg" },
  { code: "SGD", name: "싱가포르 달러", flag: "/images/flags/sg.svg" },
];

export default function NotificationAlertModal({
  isOpen,
  onClose,
}: NotificationAlertModalProps) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setPhoneNumber("");
      setIsAgreed(false);
      setSelectedCurrencies([]);
      setSelectAll(false);
    }
  }, [isOpen]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and hyphens
    const value = e.target.value.replace(/[^0-9-]/g, "");
    setPhoneNumber(value);
  };

  const handleCurrencyToggle = (code: string) => {
    setSelectedCurrencies((prev) => {
      if (prev.includes(code)) {
        const newSelected = prev.filter((c) => c !== code);
        if (newSelected.length !== CURRENCIES.length) {
          setSelectAll(false);
        }
        return newSelected;
      } else {
        const newSelected = [...prev, code];
        if (newSelected.length === CURRENCIES.length) {
          setSelectAll(true);
        }
        return newSelected;
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCurrencies([]);
      setSelectAll(false);
    } else {
      setSelectedCurrencies(CURRENCIES.map((c) => c.code));
      setSelectAll(true);
    }
  };

  const canProceedToNextStep = phoneNumber.trim().length > 0 && isAgreed;

  const handleNext = () => {
    if (step === 1 && canProceedToNextStep) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    console.log("Notification Alert Submitted:", {
      phoneNumber,
      selectedCurrencies: selectAll ? "All" : selectedCurrencies,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 hidden bg-black/50 md:block"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex h-full w-full flex-col bg-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] md:mx-4 md:h-auto md:max-h-[90vh] md:max-w-[768px]">
        {/* Header */}
        <div className="flex h-[60px] shrink-0 items-center justify-between px-4">
          <h2 className="text-[24px] font-normal leading-[40px] text-[#111]">
            외화 입고 / 환율 알림 신청
          </h2>
          <button
            onClick={onClose}
            className="flex size-6 items-center justify-center text-[#111] transition-colors hover:text-gray-600"
            aria-label="모달 닫기"
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
        <div className="flex flex-1 flex-col overflow-y-auto">
          {step === 1 ? (
            /* Step 1: Phone Number and Privacy Agreement */
            <div className="flex flex-col gap-8 px-4 pb-8 pt-4">
              {/* Phone Input */}
              <div className="flex flex-col">
                <label className="text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                  연락처
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="연락처를 입력해 주세요"
                  className="w-full border-b border-[#D8DCE9] bg-white px-2 py-[5px] text-[14px] leading-[30px] text-[#111] placeholder:text-[#BBC4D3] focus:border-[#FF8C00] focus:outline-none"
                />
              </div>

              {/* Privacy Agreement Section */}
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-2 bg-[#F3F7FC] p-4">
                  <p className="text-[14px] leading-[30px] text-[#717895]">
                    주식회사 더즌은 원화 환전 서비스를 처리하기 위해 다음과 같이
                    개인정보를 수집 및 이용하며, 이용자의 개인정보를 안전하게
                    취급하는데 최선을 다하고 있습니다.
                  </p>

                  {/* Privacy Info Table */}
                  <div className="flex flex-col">
                    <div className="flex border-y border-[#D8DCE9]">
                      <div className="flex items-center justify-center px-5 py-[10px]">
                        <span className="text-[14px] font-bold leading-[20px] text-[#717895]">
                          수집목적
                        </span>
                      </div>
                      <div className="flex flex-1 items-center justify-center py-[10px]">
                        <span className="text-[14px] leading-[20px] text-[#717895]">
                          외화 입고 / 환율 알림 서비스
                        </span>
                      </div>
                    </div>
                    <div className="flex border-b border-[#D8DCE9]">
                      <div className="flex items-center justify-center px-5 py-[10px]">
                        <span className="text-[14px] font-bold leading-[20px] text-[#717895]">
                          수집항목
                        </span>
                      </div>
                      <div className="flex flex-1 items-center justify-center py-[10px]">
                        <span className="text-[14px] leading-[20px] text-[#717895]">
                          전화번호
                        </span>
                      </div>
                    </div>
                    <div className="flex border-b border-[#D8DCE9]">
                      <div className="flex items-center justify-center px-5 py-[10px]">
                        <span className="text-[14px] font-bold leading-[20px] text-[#717895]">
                          보유기간
                        </span>
                      </div>
                      <div className="flex flex-1 items-center justify-center py-[10px]">
                        <span className="text-[14px] leading-[20px] text-[#717895]">
                          동의 철회 시 까지
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[14px] leading-[30px] text-[#717895]">
                    위 동의를 거부할 권리가 있으며, 동의를 거부하실 경우 외화
                    입고/환율 알림 서비스 이용이 제한됩니다.
                  </p>
                </div>

                {/* Agreement Checkbox */}
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
                  <span className="text-[14px] leading-[30px] text-[#111]">
                    개인정보 수집 및 이용에 동의합니다. (필수)
                  </span>
                </label>
              </div>
            </div>
          ) : (
            /* Step 2: Currency Selection */
            <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-4">
              <h3 className="text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                알림 받을 통화 (중복 선택 가능)
              </h3>

              <div className="flex flex-wrap gap-[10px]">
                {/* All Button */}
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className={`flex h-10 items-center justify-center rounded-full px-5 py-[10px] text-[14px] leading-[20px] transition-colors ${
                    selectAll
                      ? "border border-[#FFD300] bg-[#FFF2B2] text-[#111]"
                      : "border border-[#D8DCE9] bg-white text-[#111]"
                  }`}
                >
                  All
                </button>

                {/* Currency Buttons */}
                {CURRENCIES.map((currency) => (
                  <button
                    key={currency.code}
                    type="button"
                    onClick={() => handleCurrencyToggle(currency.code)}
                    className={`flex h-10 items-center gap-2 rounded-full px-5 py-[10px] text-[14px] leading-[20px] transition-colors ${
                      selectedCurrencies.includes(currency.code)
                        ? "border border-[#FFD300] bg-[#FFF2B2] text-[#111]"
                        : "border border-[#D8DCE9] bg-white text-[#111]"
                    }`}
                  >
                    <div className="relative size-6 overflow-hidden">
                      <Image
                        src={currency.flag}
                        alt={currency.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>{currency.code}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Button */}
        {step === 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceedToNextStep}
            className={`h-[50px] w-full shrink-0 text-[16px] leading-[24px] transition-colors ${
              canProceedToNextStep
                ? "bg-[#FFD300] text-[#111] hover:bg-[#FFD300]/90"
                : "cursor-not-allowed bg-[#BBC4D3] text-[#717895]"
            }`}
          >
            다음
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="h-[50px] w-full shrink-0 bg-[#FFD300] text-[16px] leading-[24px] text-[#111] transition-colors hover:bg-[#FFD300]/90"
          >
            알림 신청하기
          </button>
        )}
      </div>
    </div>
  );
}
