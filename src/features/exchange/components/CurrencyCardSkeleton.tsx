export function CurrencyCardSkeleton() {
  return (
    <article className="flex w-full flex-col items-center justify-center overflow-hidden rounded-[20px] bg-white">
      <div className="flex w-full flex-col items-center gap-[10px] py-4 md:py-[20px]">
        <div className="flex flex-col items-center gap-[10px]">
          <div className="h-[24px] w-[36px] animate-pulse rounded bg-gray-200" />
          <div className="h-[16px] w-[40px] animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex items-end gap-1">
          <div className="h-[30px] w-[80px] animate-pulse rounded bg-gray-200" />
        </div>
      </div>
      <div className="h-[30px] w-full animate-pulse bg-gray-200" />
    </article>
  );
}
