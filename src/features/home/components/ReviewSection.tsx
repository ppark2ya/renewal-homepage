"use client";

import { useState, useEffect, useCallback } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    id: 1,
    flag: "/images/flags/us.svg",
    location: "Blue Line Park Cheongsapo Station",
    text: "Absolutely impressed with Dozn Exchange!\nThe user-friendly kiosk made currency exchange a breeze, and the rates were competitive.\nWill definitely be using it again on my next trip!",
  },
  {
    id: 2,
    flag: "/images/flags/jp.svg",
    location: "江南駅 荷物預かり所",
    text: "近くに両替する場所がないのに荷物も預けることができ、\n両替もできていいですね。",
  },
  {
    id: 3,
    flag: "/images/flags/cn.svg",
    location: "明洞站 5 号出口前",
    text: "中国朋友来拜访了，所以一起拜访了。\n因为很容易使用，所以很好！ 离地铁站也很近。",
  },
  {
    id: 4,
    flag: "/images/flags/us.svg",
    location: "Hongdae Square Lab Luggage Storage",
    text: "Dozn kiosk was very easy to use, and the entire exchange process didn't take long.\nIt was fast, simple, and very convenient.\nIt was nice to be able to exchange money without having to line up or talk to the staff.",
  },
  {
    id: 5,
    flag: "/images/flags/jp.svg",
    location: "明洞スマートラゲージ",
    text: "無人両替機はとても使いやすく、操作が簡単で速いです。\n短い時間で両替が終わるので本当に便利でした。\n次の韓国旅行にまた訪れます！",
  },
  {
    id: 6,
    flag: "/images/flags/cn.svg",
    location: "新论岘站第一大药房",
    text: "不用排队、不用和工作人员沟通，\n自己就能轻松兑换。\n汇率也透明，让人用得很放心。",
  },
];

function FlagIcon({ src }: { src: string }) {
  const isJapanFlag = src.includes("jp.svg");

  return (
    <div
      className={`relative size-[24px] overflow-hidden bg-white ${
        isJapanFlag ? "border border-[#D8DCE9]" : ""
      }`}
    >
      <ImageWithFallback
        src={src}
        alt="Country flag"
        fill
        className="object-cover"
        sizes="24px"
        fallbackType="icon"
      />
    </div>
  );
}

interface ReviewCardProps {
  review: (typeof reviews)[0];
  variant?: "default" | "medium" | "mobile";
}

function ReviewCard({ review, variant = "default" }: ReviewCardProps) {
  const variantClasses = {
    default: "w-[413px] h-auto p-[32px]",
    medium: "w-[300px] h-[410px] p-6 overflow-hidden",
    mobile: "w-full h-full p-[32px] items-center text-center",
  };

  return (
    <div
      className={`flex flex-col gap-[8px] rounded-[16px] bg-white shadow-[0px_4px_12px_0px_rgba(255,115,0,0.25)] ${variantClasses[variant]}`}
    >
      <FlagIcon src={review.flag} />
      <p className="text-[16px] font-bold capitalize leading-[30px] tracking-[-1px] text-[#FF8C00] lg:text-[20px]">
        ★ ★ ★ ★ ★
      </p>
      <h4 className="text-[14px] font-bold capitalize leading-[30px] text-[#111] lg:text-[16px]">
        {review.location}
      </h4>
      <p
        className={`whitespace-pre-wrap text-[14px] leading-[24px] text-[#111] lg:text-[16px] lg:leading-[30px] ${variant === "medium" ? "line-clamp-6" : ""}`}
      >
        {review.text}
      </p>
    </div>
  );
}

export default function ReviewSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="w-full overflow-hidden bg-[#FFD300] py-8 px-4 lg:py-[100px] 2xl:px-[320px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[30px] md:gap-[50px]">
        <h2 className="text-center text-[24px] font-normal capitalize leading-[1.3] text-[#111] md:text-[32px] lg:text-[40px] lg:leading-[60px]">
          Why Everyone Chooses Dozn Exchange
        </h2>

        {/* 1279px 이상: 3열 2행 그리드 (6개 카드, 기본 크기) */}
        <div className="hidden xl:grid xl:grid-cols-3 xl:gap-[16px]">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} variant="default" />
          ))}
        </div>

        {/* 980px ~ 1279px: 3열 2행 그리드 (6개 카드, 300x410 비율) */}
        <div className="hidden lg:grid xl:hidden lg:grid-cols-3 lg:gap-[16px]">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} variant="medium" />
          ))}
        </div>

        {/* 980px 미만: Embla 캐러셀 (드래그 + 자동 재생) */}
        <div className="w-full lg:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="min-w-0 flex-[0_0_100%] px-2"
                >
                  <ReviewCard review={review} variant="mobile" />
                </div>
              ))}
            </div>
          </div>

          {/* 페이저 dots */}
          <div className="mt-4 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === selectedIndex ? "w-6 bg-[#111]" : "w-2 bg-[#111]/20"
                }`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
