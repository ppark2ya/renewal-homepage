"use client";

import { useState } from "react";

const currencies = [
  { flag: "🇺🇸", code: "USD", name: "US Dollar", buyRate: "63.32", sellRate: "930.00" },
  { flag: "🇯🇵", code: "JPY", name: "Japanese Yen", buyRate: "830.00", sellRate: "1,480.02" },
  { flag: "🇨🇳", code: "CNY", name: "Chinese Yuan", buyRate: "192.84", sellRate: "98.31" },
  { flag: "🇪🇺", code: "EUR", name: "Euro", buyRate: "932.04", sellRate: "161.73" },
  { flag: "🇬🇧", code: "GBP", name: "British Pound", buyRate: "1,082.04", sellRate: "" },
  { flag: "🇭🇰", code: "HKD", name: "Hong Kong Dollar", buyRate: "98.31", sellRate: "" },
  { flag: "🇹🇼", code: "TWD", name: "Taiwan Dollar", buyRate: "161.73", sellRate: "" },
];

export default function ExchangeRateSection() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  return (
    <section className="w-full bg-white py-8 md:py-[100px]">
      <div className="mx-auto max-w-[1920px] px-4 md:px-10 xl:px-[320px]">
        <h2 className="mb-6 text-center text-[24px] font-bold leading-[1.3] text-[#111] md:mb-10 md:text-[40px] md:leading-[60px]">
          Spot the best exchange rates in seconds!
        </h2>

        {/* Tab toggle */}
        <div className="mx-auto mb-8 flex w-fit overflow-hidden rounded-full bg-[#F5F5F5] p-1">
          <button
            onClick={() => setActiveTab("buy")}
            className={`rounded-full px-5 py-2 text-[14px] font-medium transition-colors md:px-8 md:text-[16px] ${
              activeTab === "buy"
                ? "bg-[#FFD900] text-[#111]"
                : "text-[#111]/50"
            }`}
          >
            KRW → Foreign Currency
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`rounded-full px-5 py-2 text-[14px] font-medium transition-colors md:px-8 md:text-[16px] ${
              activeTab === "sell"
                ? "bg-[#FFD900] text-[#111]"
                : "text-[#111]/50"
            }`}
          >
            Foreign Currency → KRW
          </button>
        </div>

        {/* Currency grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7 md:gap-4">
          {currencies.map((currency) => (
            <div
              key={currency.code}
              className="flex flex-col items-center gap-2 rounded-[16px] bg-[#F5F5F5] p-4 md:gap-3 md:p-6"
            >
              <span className="text-[32px] md:text-[40px]">
                {currency.flag}
              </span>
              <span className="text-[14px] font-medium text-[#111] md:text-[16px]">
                {currency.code}
              </span>
              <span className="text-[18px] font-bold text-[#111] md:text-[24px]">
                {currency.buyRate}
              </span>
            </div>
          ))}
        </div>

        {/* Source text */}
        <p className="mt-6 text-center text-[12px] text-[#111]/30 md:mt-10 md:text-[14px]">
          * Exchange rates are based on the standard rate of the Seoul Money
          Brokerage. Actual exchange rates may vary.
        </p>
      </div>
    </section>
  );
}
