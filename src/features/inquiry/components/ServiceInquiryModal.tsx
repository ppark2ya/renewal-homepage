"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function ServiceInquiryModal({
  isOpen,
  onClose,
  title,
}: ServiceInquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    contactNumber: "",
    inquiry: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-full max-h-[100vh] w-full max-w-[768px] flex-col gap-0 rounded-none p-0 md:h-auto md:max-h-[90vh]">
        <DialogHeader className="flex h-[54px] shrink-0 flex-row items-center justify-between border-b-0 px-4">
          <DialogTitle className="text-[24px] font-normal leading-[40px] text-[#111]">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-8 pt-4">
            {/* Name & Company - 데스크톱: 2열, 모바일: 1열 */}
            <div className="flex flex-col gap-5 md:flex-row md:gap-5">
              <div className="flex flex-1 flex-col gap-1">
                <Label className="text-[16px] font-bold leading-[30px] text-[#FF8C00]">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Please Enter Your Name"
                  className="h-auto rounded-none border-0 border-b border-[#D8DCE9] px-2 py-[5px] text-[14px] leading-[30px] placeholder:text-[#BBC4D3] focus-visible:border-[#FF8C00] focus-visible:ring-0"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Label className="text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                  Company / Organization
                </Label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Please Enter Company Or Organization"
                  className="h-auto rounded-none border-0 border-b border-[#D8DCE9] px-2 py-[5px] text-[14px] leading-[30px] placeholder:text-[#BBC4D3] focus-visible:border-[#FF8C00] focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Email & Contact - 데스크톱: 2열, 모바일: 1열 */}
            <div className="flex flex-col gap-5 md:flex-row md:gap-5">
              <div className="flex flex-1 flex-col gap-1">
                <Label className="text-[16px] font-bold leading-[30px] text-[#FF8C00]">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Please Enter Your Email"
                  className="h-auto rounded-none border-0 border-b border-[#D8DCE9] px-2 py-[5px] text-[14px] leading-[30px] placeholder:text-[#BBC4D3] focus-visible:border-[#FF8C00] focus-visible:ring-0"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Label className="text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                  Contact Number
                </Label>
                <Input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Please Enter Contact Number"
                  className="h-auto rounded-none border-0 border-b border-[#D8DCE9] px-2 py-[5px] text-[14px] leading-[30px] placeholder:text-[#BBC4D3] focus-visible:border-[#FF8C00] focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Inquiry Details */}
            <div className="flex flex-col gap-2">
              <Label className="text-[16px] font-bold leading-[30px] text-[#FF8C00]">
                Inquiry Details
              </Label>
              <Textarea
                name="inquiry"
                value={formData.inquiry}
                onChange={handleInputChange}
                placeholder="Please Enter Your Inquiry"
                rows={5}
                className="min-h-[150px] rounded-none border-[#D8DCE9] p-2 text-[14px] leading-[30px] placeholder:text-[#BBC4D3] focus-visible:border-[#FF8C00] focus-visible:ring-0"
              />
            </div>

            {/* Privacy Notice */}
            <div className="flex flex-col gap-[10px]">
              <div className="rounded bg-[#F3F7FC] px-[15px] py-[10px]">
                <p className="text-[13px] leading-[20px] text-[#717895]">
                  Items Collected: Company name, Name, Contact information, Email
                  <br />
                  Purpose of Collection: To provide consultation for Dozen Exchange
                  partnership/rental/service inquiries
                  <br />
                  Retention Period: Until the purpose of using the personal information is achieved
                  <br />※ You may refuse to consent to the collection and use of personal
                  information; however, refusal may limit your ability to use the relevant services.
                </p>
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="privacy-agreement"
                  checked={isAgreed}
                  onCheckedChange={(checked) => setIsAgreed(checked === true)}
                  className="h-5 w-5 rounded-full border-none bg-[#BBC4D3] data-[state=checked]:bg-[#4A90D9] data-[state=checked]:text-white"
                />
                <Label
                  htmlFor="privacy-agreement"
                  className="cursor-pointer text-[14px] leading-[30px] text-[#111]"
                >
                  I Agree To The Collection And Use Of My Personal Information.
                </Label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-auto shrink-0">
            <Button
              type="submit"
              className="h-[50px] w-full rounded-none bg-[#FFD300] text-[16px] leading-[24px] text-[#111] hover:bg-[#FFD300]/90"
            >
              문의하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
