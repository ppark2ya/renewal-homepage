"use client";

import { useState } from "react";

const reviews = [
  {
    id: 1,
    flag: "🇺🇸",
    location: "Blue Line Park Cheongsapo Station",
    text: "Absolutely impressed with Dozn Exchange! The user-friendly kiosk made currency exchange a breeze, and the rates were competitive. Will definitely be using it again on my next trip!",
  },
  {
    id: 2,
    flag: "🇯🇵",
    location: "江南駅 荷物預かり所",
    text: "近くに両替する場所がないのに荷物も預けることができ、両替もできていいですね。",
  },
  {
    id: 3,
    flag: "🇨🇳",
    location: "明洞站 5 号出口前",
    text: "中国朋友来拜访了，所以一起拜访了。因为很容易使用，所以很好！离地铁站也很近。",
  },
  {
    id: 4,
    flag: "🇬🇧",
    location: "Hongdae Square Lab Luggage Storage",
    text: "Dozn kiosk was very easy to use, and the entire exchange process didn't take long. It was fast, simple, and very convenient. It was nice to be able to exchange money without having to line up or talk to the staff.",
  },
  {
    id: 5,
    flag: "🇯🇵",
    location: "明洞スマートラゲージ",
    text: "無人両替機はとても使いやすく、操作が簡単で速いです。短い時間で両替が終わるので本当に便利でした。次の韓国旅行にまた訪れます！",
  },
  {
    id: 6,
    flag: "🇨🇳",
    location: "新论岘站第一大药房",
    text: "不用排队、不用和工作人员沟通，自己就能轻松兑换。汇率也透明，让人用得很放心。",
  },
];

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="flex flex-col gap-2 rounded-[16px] bg-white p-8 shadow-sm">
      <span className="text-[24px]">{review.flag}</span>
      <div className="flex gap-1 text-[#FFD900]">
        {"★ ★ ★ ★ ★".split(" ").map((s, i) => (
          <span key={i} className="text-[16px]">
            {s}
          </span>
        ))}
      </div>
      <h4 className="text-[16px] font-semibold leading-[30px] text-[#111]">
        {review.location}
      </h4>
      <p className="text-[14px] leading-[24px] text-[#111]/70">
        {review.text}
      </p>
    </div>
  );
}

export default function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="w-full bg-[#FFD900] py-8 md:py-[100px]">
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="mb-6 text-center text-[24px] font-bold leading-[1.3] text-[#111] md:mb-[50px] md:text-[40px] md:leading-[60px]">
          Why Everyone Chooses Dozn Exchange
        </h2>

        {/* Desktop: 3x2 grid */}
        <div className="hidden grid-cols-3 gap-4 md:grid">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile: Single card carousel */}
        <div className="md:hidden">
          <ReviewCard review={reviews[currentIndex]} />
          {/* Pager dots */}
          <div className="mt-4 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${i === currentIndex
                  ? "w-6 bg-[#111]"
                  : "w-2 bg-[#111]/20"
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
