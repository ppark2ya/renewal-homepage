"use client";

import { useState } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from "lucide-react";

// KRW → Foreign Currency (buy) - 15 cards
const buyCurrencies = [
  { flag: "/images/flags/tw.svg", code: "TWD", rate: "43.32", change: "up" },
  { flag: "/images/flags/jp.svg", code: "JPY", rate: "930.00", change: "up" },
  { flag: "/images/flags/us.svg", code: "USD", rate: "1,450.02", change: "down" },
  { flag: "/images/flags/hk.svg", code: "HKD", rate: "191.73", change: "down" },
  { flag: "/images/flags/cn.svg", code: "CNY", rate: "192.84", change: "up" },
  { flag: "/images/flags/sg.svg", code: "SGD", rate: "98.31", change: "up" },
  { flag: "/images/flags/th.svg", code: "THB", rate: "42.15", change: "up" },
  { flag: "/images/flags/vn.svg", code: "VND", rate: "0.058", change: "down" },
  { flag: "/images/flags/ph.svg", code: "PHP", rate: "25.12", change: "up" },
  { flag: "/images/flags/my.svg", code: "MYR", rate: "326.45", change: "down" },
  { flag: "/images/flags/id.svg", code: "IDR", rate: "0.089", change: "up" },
  { flag: "/images/flags/eu.svg", code: "EUR", rate: "1,580.32", change: "up" },
  { flag: "/images/flags/gb.svg", code: "GBP", rate: "1,845.67", change: "down" },
  { flag: "/images/flags/au.svg", code: "AUD", rate: "945.23", change: "up" },
  { flag: "/images/flags/ca.svg", code: "CAD", rate: "1,078.90", change: "down" },
];

// Foreign Currency → KRW (sell) - 6 cards
const sellCurrencies = [
  { flag: "/images/flags/tw.svg", code: "TWD", rate: "42.85", change: "down" },
  { flag: "/images/flags/jp.svg", code: "JPY", rate: "925.50", change: "down" },
  { flag: "/images/flags/us.svg", code: "USD", rate: "1,445.00", change: "up" },
  { flag: "/images/flags/hk.svg", code: "HKD", rate: "190.25", change: "up" },
  { flag: "/images/flags/cn.svg", code: "CNY", rate: "191.50", change: "down" },
  { flag: "/images/flags/sg.svg", code: "SGD", rate: "97.80", change: "down" },
];

const INITIAL_DISPLAY_COUNT = 6;
const CLOSE_ANIMATION_DURATION = 300; // ms

function FlagIcon({ src, code }: { src: string; code: string }) {
  return (
    <div className="relative h-[24px] w-[36px] overflow-hidden">
      <ImageWithFallback
        src={src}
        alt={code}
        width={36}
        height={24}
        className="object-cover"
        fallbackType="icon"
      />
    </div>
  );
}

type AnimationState = "idle" | "opening" | "closing";

function CurrencyCard({
  currency,
  index,
  animationState,
  totalExtraCards,
}: {
  currency: (typeof buyCurrencies)[0];
  index: number;
  animationState: AnimationState;
  totalExtraCards: number;
}) {
  // Cards beyond initial 6 get staggered animation
  const isExtraCard = index >= INITIAL_DISPLAY_COUNT;
  const extraCardIndex = index - INITIAL_DISPLAY_COUNT;

  // Opening: 첫 번째 추가 카드부터 순서대로 (0, 1, 2, ...)
  // Closing: 마지막 추가 카드부터 역순으로 (totalExtraCards-1, totalExtraCards-2, ...)
  const getAnimationDelay = () => {
    if (!isExtraCard || animationState === "idle") return undefined;
    if (animationState === "opening") {
      return `${extraCardIndex * 50}ms`;
    } else {
      // 역순: 마지막 카드가 먼저 사라짐
      const reverseIndex = totalExtraCards - 1 - extraCardIndex;
      return `${reverseIndex * 50}ms`;
    }
  };

  const getAnimationClass = () => {
    if (!isExtraCard) return "";
    if (animationState === "opening") return "animate-fadeSlideIn";
    if (animationState === "closing") return "animate-fadeSlideOut";
    return "";
  };

  return (
    <div
      className={`flex w-full flex-col items-center justify-center overflow-hidden rounded-[20px] bg-white ${getAnimationClass()}`}
      style={{
        animationDelay: getAnimationDelay(),
        animationFillMode: animationState === "opening" ? "backwards" : "forwards",
      }}
    >
      {/* Rate info: py-[20px] gap-[10px] */}
      <div className="flex w-full flex-col items-center gap-[10px] py-4 md:py-[20px]">
        <div className="flex flex-col items-center gap-[10px]">
          <FlagIcon src={currency.flag} code={currency.code} />
          <span className="text-center text-[14px] leading-[16px] tracking-[-0.5px] text-[#111] md:text-[16px]">
            {currency.code}
          </span>
        </div>
        <div className="flex items-end gap-1 text-center">
          <span className="text-[20px] font-bold leading-[30px] tracking-[-0.5px] text-[#111] md:text-[24px]">
            {currency.rate}
          </span>
          <span className="text-[12px] leading-[20px] text-[#C7CBDA] md:text-[14px]">KRW</span>
        </div>
      </div>
      {/* Change indicator */}
      <div
        className={`flex w-full items-center justify-center gap-2 text-[12px] capitalize leading-[30px] text-white md:text-[14px] ${
          currency.change === "up" ? "bg-[#FF2C2C]" : "bg-[#2C7CFF]"
        }`}
      >
        <span>{currency.change === "up" ? "▲" : "▼"}</span>
        <span>An hour ago</span>
      </div>
    </div>
  );
}

type ExchangeRateChangeType = "buy" | "sell";

export default function ExchangeRateSection() {
  const [activeTab, setActiveTab] = useState<ExchangeRateChangeType>("buy");
  const [showAll, setShowAll] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>("idle");

  // Get currencies based on active tab
  const currencies = activeTab === "buy" ? buyCurrencies : sellCurrencies;
  const totalExtraCards = currencies.length - INITIAL_DISPLAY_COUNT;

  // Check if there are more currencies to show
  const hasMore = currencies.length > INITIAL_DISPLAY_COUNT;

  // Handle show more/less toggle
  const handleToggle = () => {
    if (!showAll) {
      // Opening
      setShowAll(true);
      setAnimationState("opening");
      // Reset animation state after animation completes
      setTimeout(() => {
        setAnimationState("idle");
      }, CLOSE_ANIMATION_DURATION + totalExtraCards * 50);
    } else {
      // Closing - play fade out animation first
      setAnimationState("closing");
      // After animation completes, hide the cards
      setTimeout(() => {
        setShowAll(false);
        setAnimationState("idle");
      }, CLOSE_ANIMATION_DURATION + totalExtraCards * 50);
    }
  };

  // Reset when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab as ExchangeRateChangeType);
    setShowAll(false);
    setAnimationState("idle");
  };

  return (
    <section className="w-full overflow-hidden bg-[#FFF9DF]">
      {/* Container: py-[100px] w-[1920px] */}
      <div className="mx-auto flex w-full flex-col items-center gap-[30px] px-4 py-8 md:gap-[50px] md:py-[100px] 2xl:px-[320px]">
        {/* Title: text-[40px] leading-[60px] */}
        <h2 className="text-center text-[24px] font-normal capitalize leading-[1.3] text-[#111] md:text-[32px] lg:text-[40px] lg:leading-[60px]">
          Spot The Best Exchange Rates In Seconds!
        </h2>

        {/* Tab toggle - Using shadcn Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-[300px] lg:w-auto">
          <TabsList className="flex h-auto w-full flex-col gap-2 rounded-[20px] bg-[#FFD300] p-4 lg:flex-row lg:gap-0 lg:rounded-full lg:p-1">
            <TabsTrigger
              value="buy"
              className="w-full rounded-full px-6 py-3 text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:text-[#111] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#111]/50 lg:w-auto lg:px-8 lg:py-2 lg:text-[16px]"
            >
              KRW → Foreign Currency
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="w-full rounded-full px-6 py-3 text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:text-[#111] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#111]/50 lg:w-auto lg:px-8 lg:py-2 lg:text-[16px]"
            >
              Foreign Currency → KRW
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Currency cards grid: 2 cols on mobile, 6 cols on lg+ */}
        <div className="grid w-full max-w-[1280px] grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-4">
          {currencies.map((currency, index) => {
            const isExtraCard = index >= INITIAL_DISPLAY_COUNT;
            // 숨겨진 카드는 렌더링하지 않음 (showAll이 true이거나 closing 중일 때만 표시)
            if (isExtraCard && !showAll) return null;

            return (
              <CurrencyCard
                key={`${currency.code}-${index}`}
                currency={currency}
                index={index}
                animationState={animationState}
                totalExtraCards={totalExtraCards}
              />
            );
          })}
        </div>

        {/* Show More / Show Less button - only show if there are more than 6 currencies */}
        {hasMore && (
          <Button
            variant="ghost"
            onClick={handleToggle}
            disabled={animationState !== "idle"}
            className={`flex items-center gap-2 text-[14px] text-[#111] hover:bg-transparent hover:text-[#111]/70 md:text-[16px] ${
              animationState !== "idle" ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                showAll && animationState !== "closing" ? "rotate-180" : ""
              }`}
            />
            <span>{showAll && animationState !== "closing" ? "Show Less" : "Show More"}</span>
          </Button>
        )}

        {/* Disclaimer text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[12px] leading-[1.6] text-[#111]/50 md:text-[14px]">
            The above exchange rates are based on the lowest-rate device. Available currencies and
            rates may vary by branch.
          </p>
          <p className="text-[12px] leading-[1.6] text-[#111]/50 md:text-[14px]">
            Daily foreign currency purchase limit : USD 4,000
          </p>
        </div>
      </div>
    </section>
  );
}
