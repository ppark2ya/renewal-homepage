"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

export default function NotificationAlertModal({ isOpen, onClose }: NotificationAlertModalProps) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-full max-h-[100vh] w-full max-w-[768px] flex-col gap-0 rounded-none p-0 md:h-auto md:max-h-[90vh]">
        <DialogHeader className="flex h-[60px] shrink-0 flex-row items-center justify-between border-b-0 px-4">
          <DialogTitle className="text-[24px] font-normal leading-[40px] text-[#111]">
            외화 입고 / 환율 알림 신청
          </DialogTitle>
        </DialogHeader>

        {/* Form Content */}
        <div className="flex min-h-0 flex-1 flex-col">
          {step === 1 ? (
            /* Step 1: Phone Number and Privacy Agreement */
            <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-4 pb-8 pt-4">
              {/* Phone Input */}
              <div className="flex flex-col gap-1">
                <Label className="text-[16px] font-bold leading-[30px] text-[#FF8C00]">연락처</Label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="연락처를 입력해 주세요"
                  className="h-auto rounded-none border-0 border-b border-[#D8DCE9] px-2 py-[5px] text-[14px] leading-[30px] placeholder:text-[#BBC4D3] focus-visible:border-[#FF8C00] focus-visible:ring-0"
                />
              </div>

              {/* Privacy Agreement Section */}
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-2 bg-[#F3F7FC] p-4">
                  <p className="text-[14px] leading-[30px] text-[#717895]">
                    주식회사 더즌은 원화 환전 서비스를 처리하기 위해 다음과 같이 개인정보를 수집 및
                    이용하며, 이용자의 개인정보를 안전하게 취급하는데 최선을 다하고 있습니다.
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
                        <span className="text-[14px] leading-[20px] text-[#717895]">전화번호</span>
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
                    위 동의를 거부할 권리가 있으며, 동의를 거부하실 경우 외화 입고/환율 알림 서비스
                    이용이 제한됩니다.
                  </p>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="privacy-agreement-notification"
                    checked={isAgreed}
                    onCheckedChange={(checked) => setIsAgreed(checked === true)}
                    className="h-5 w-5 rounded-full border-none bg-[#BBC4D3] data-[state=checked]:bg-[#4A90D9] data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor="privacy-agreement-notification"
                    className="cursor-pointer text-[14px] leading-[30px] text-[#111]"
                  >
                    개인정보 수집 및 이용에 동의합니다. (필수)
                  </Label>
                </div>
              </div>
            </div>
          ) : (
            /* Step 2: Currency Selection */
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-8 pt-4">
              <h3 className="text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                알림 받을 통화 (중복 선택 가능)
              </h3>

              <div className="flex flex-wrap gap-[10px]">
                {/* All Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSelectAll}
                  className={`h-10 rounded-full px-5 py-[10px] text-[14px] leading-[20px] ${
                    selectAll
                      ? "border-[#FFD300] bg-[#FFF2B2] text-[#111] hover:bg-[#FFF2B2]/80"
                      : "border-[#D8DCE9] bg-white text-[#111] hover:bg-gray-50"
                  }`}
                >
                  All
                </Button>

                {/* Currency Buttons */}
                {CURRENCIES.map((currency) => (
                  <Button
                    key={currency.code}
                    type="button"
                    variant="outline"
                    onClick={() => handleCurrencyToggle(currency.code)}
                    className={`flex h-10 items-center gap-2 rounded-full px-5 py-[10px] text-[14px] leading-[20px] ${
                      selectedCurrencies.includes(currency.code)
                        ? "border-[#FFD300] bg-[#FFF2B2] text-[#111] hover:bg-[#FFF2B2]/80"
                        : "border-[#D8DCE9] bg-white text-[#111] hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative size-6 overflow-hidden">
                      <Image src={currency.flag} alt={currency.name} width={24} height={24} className="object-contain" />
                    </div>
                    <span>{currency.code}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Button */}
        <div className="mt-auto shrink-0">
          {step === 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!canProceedToNextStep}
              className={`h-[50px] w-full rounded-none text-[16px] leading-[24px] ${
                canProceedToNextStep
                  ? "bg-[#FFD300] text-[#111] hover:bg-[#FFD300]/90"
                  : "cursor-not-allowed bg-[#BBC4D3] text-[#717895] hover:bg-[#BBC4D3]"
              }`}
            >
              다음
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              className="h-[50px] w-full rounded-none bg-[#FFD300] text-[16px] leading-[24px] text-[#111] hover:bg-[#FFD300]/90"
            >
              알림 신청하기
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
