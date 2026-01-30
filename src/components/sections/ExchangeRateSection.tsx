"use client";

import { useState } from "react";

const currencies = [
  { flag: "🇹🇼", code: "TWD", name: "Taiwan", buyRate: "43.32", sellRate: "41.50", change: "-0.45", isUp: false },
  { flag: "🇯🇵", code: "JPY", name: "Japan", buyRate: "930.00", sellRate: "1,480.02", change: "0.12", isUp: true },
  { flag: "🇺🇸", code: "USD", name: "USA", buyRate: "1,450.02", sellRate: "930.00", change: "-0.05", isUp: false },
  { flag: "🇭🇰", code: "HKD", name: "Hong Kong", buyRate: "191.73", sellRate: "98.31", change: "-0.23", isUp: false },
  { flag: "🇨🇳", code: "CNY", name: "China", buyRate: "192.84", sellRate: "98.31", change: "0.01", isUp: true },
  { flag: "🇸🇬", code: "SGD", name: "Singapore", buyRate: "98.31", sellRate: "161.73", change: "0.15", isUp: true },
  { flag: "🇻🇳", code: "VND", name: "Vietnam", buyRate: "5.42", sellRate: "4.80", change: "-0.10", isUp: false },
];

export default function ExchangeRateSection() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  return (
    <section className="w-full bg-[#FFFBF2] py-8 md:py-[100px]">
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="mb-6 text-center text-[24px] font-bold leading-[1.3] text-[#111] md:mb-10 md:text-[40px] md:leading-[60px]">
          Spot The Best Exchange Rates in Seconds!
        </h2>

        {/* Tab toggle */}
        <div className="mx-auto mb-8 flex w-fit overflow-hidden rounded-full bg-white border border-[#FFD900] p-1">
          <button
            onClick={() => setActiveTab("buy")}
            className={`rounded-full px-5 py-2 text-[14px] font-bold transition-colors md:px-8 md:text-[16px] ${activeTab === "buy"
              ? "bg-[#FFD900] text-[#111]"
              : "text-[#111]/50 bg-transparent"
              }`}
          >
            KRW → Foreign Currency
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`rounded-full px-5 py-2 text-[14px] font-bold transition-colors md:px-8 md:text-[16px] ${activeTab === "sell"
              ? "bg-[#FFD900] text-[#111]"
              : "text-[#111]/50 bg-transparent"
              }`}
          >
            Foreign Currency → KRW
          </button>
        </div>

        {/* Currency grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4 gap-y-4 md:gap-4">
          {currencies.map((currency) => (
            <div
              key={currency.code}
              className="flex flex-col items-center gap-1 rounded-[20px] bg-white p-4 shadow-sm md:gap-2 md:p-6 text-center"
            >
              <div className="mb-2 text-[48px] leading-none md:text-[60px]">
                {currency.flag}
              </div>
              <span className="text-[14px] font-bold text-[#111]/60 md:text-[16px]">
                {currency.code}
              </span>
              <span className="text-[16px] font-bold text-[#111] md:text-[18px]">
                {currency.name}
              </span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[20px] font-extrabold text-[#111] md:text-[24px]">
                  {activeTab === "buy" ? currency.buyRate : currency.sellRate}
                </span>
                <span className={`text-[12px] md:text-[13px] font-medium ${currency.isUp ? 'text-blue-500' : 'text-red-500'}`}>
                  {currency.isUp ? '▲' : '▼'} {Math.abs(Number(currency.change))}%
                </span>
              </div>
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
