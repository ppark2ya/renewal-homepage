const events = [
  {
    id: 1,
    title: "Korea Beauty Festival",
    date: "2024.06.01 ~ 2024.06.30",
    image: null,
  },
  {
    id: 2,
    title: "all nights INCHEON Wolmi·Gaekangjang night market",
    date: "2024.06.14 ~ 2024.06.29",
    image: null,
  },
  {
    id: 3,
    title: "Seoul City Tour Bus",
    date: "2024.04.01 ~ 2024.12.31",
    image: null,
  },
];

export default function EventSection() {
  return (
    <section className="w-full bg-[#F5F5F5] py-8 md:py-[100px]">
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="mb-6 text-center text-[24px] font-bold leading-[1.3] text-[#111] md:mb-10 md:text-[40px] md:leading-[60px]">
          Events to Watch in Korea Right Now
        </h2>

        {/* Event cards - horizontal scroll */}
        <div className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 md:mx-0 md:gap-[50px] md:px-0">
          {events.map((event) => (
            <div
              key={event.id}
              className="w-[280px] shrink-0 cursor-pointer md:w-[320px]"
            >
              {/* Thumbnail */}
              <div className="flex h-[210px] items-center justify-center overflow-hidden rounded-[16px] bg-[#D4D4D4] md:h-[300px]">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A3A3A3"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              {/* Info */}
              <div className="mt-4 flex flex-col gap-1">
                <span className="text-[13px] text-[#111]/40 md:text-[14px]">
                  {event.date}
                </span>
                <h4 className="line-clamp-2 text-[15px] font-medium leading-[22px] text-[#111] md:text-[18px] md:leading-[30px]">
                  {event.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* See More button */}
        <div className="mt-8 flex justify-center">
          <button className="rounded-full border border-[#111] px-8 py-3 text-[14px] font-medium text-[#111] transition-colors hover:bg-[#111] hover:text-white">
            See More
          </button>
        </div>
      </div>
    </section>
  );
}
