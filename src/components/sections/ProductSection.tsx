export default function ProductSection() {
  const brands = [
    { name: "OLIVE YOUNG", width: "w-[120px] md:w-[200px]" },
    { name: "DAISO", width: "w-[80px] md:w-[130px]" },
    { name: "GS25", width: "w-[60px] md:w-[100px]" },
    { name: "CU", width: "w-[40px] md:w-[60px]" },
    { name: "eSIM", width: "w-[80px] md:w-[120px]" },
  ];

  return (
    <section className="w-full bg-[#111] py-8 md:py-[100px]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-4 md:gap-10">
        {/* Title */}
        <div className="flex flex-col items-center gap-3 text-center md:gap-[30px]">
          <h2 className="text-[24px] font-bold leading-[1.3] text-white md:text-[40px] md:leading-[60px]">
            Before you travel, stop by Dozn Exchange!
          </h2>
          <p className="max-w-[679px] text-[14px] leading-[1.4] text-white/70 md:text-[20px] md:leading-[40px]">
            Exchange your money and grab Olive Young, GS25, CU, and Daiso gift
            cards Even eSIMs are ready to go!
          </p>
        </div>

        {/* Brand Logos */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={`flex h-[30px] items-center justify-center md:h-[40px] ${brand.width}`}
            >
              <span className="text-[14px] font-bold text-white/40 md:text-[18px]">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
