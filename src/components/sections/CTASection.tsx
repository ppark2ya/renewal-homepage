export default function CTASection() {
  return (
    <section className="w-full bg-white py-12 md:py-[100px]">
      <div className="mx-auto flex max-w-[1920px] flex-col items-center gap-8 px-4 md:gap-[50px] md:px-10 xl:px-[320px]">
        <h2 className="text-center text-[24px] font-bold leading-[1.3] text-[#111] md:text-[40px] md:leading-[60px]">
          Begin and end your journey
          <br className="md:hidden" /> with Dozn Exchange.
        </h2>

        {/* Buttons */}
        <div className="flex w-full max-w-[343px] flex-col gap-4 md:max-w-none md:flex-row md:justify-center md:gap-[50px]">
          <button className="h-[50px] rounded-full border-2 border-[#111] px-8 text-[16px] font-medium text-[#111] transition-colors hover:bg-[#111] hover:text-white md:w-[300px]">
            Find Nearby Kiosks
          </button>
          <button className="h-[50px] rounded-full bg-[#FFD900] px-8 text-[16px] font-medium text-[#111] transition-colors hover:bg-[#F5C800] md:w-[300px]">
            Service Inquiry
          </button>
        </div>
      </div>
    </section>
  );
}
