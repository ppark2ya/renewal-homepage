'use client';

import { APILoadingStatus } from '@vis.gl/react-google-maps';
import { cn } from '@/lib/utils';

interface MapErrorPlaceholderProps {
  status: APILoadingStatus;
  className?: string;
}

function getErrorMessage(status: APILoadingStatus): string {
  switch (status) {
    case APILoadingStatus.AUTH_FAILURE:
      return 'API 키 인증에 실패했습니다';
    case APILoadingStatus.FAILED:
      return 'API 로드에 실패했습니다';
    case APILoadingStatus.NOT_LOADED:
      return 'API가 로드되지 않았습니다';
    default:
      return '알 수 없는 오류가 발생했습니다';
  }
}

export default function MapErrorPlaceholder({
  status,
  className,
}: MapErrorPlaceholderProps) {
  return (
    <div
      className={cn(
        'relative w-full h-full bg-gray-100 flex items-center justify-center',
        className
      )}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(#999 1px, transparent 1px), linear-gradient(90deg, #999 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Error content */}
      <div className="relative z-10 flex flex-col items-center gap-4 p-8 text-center">
        {/* Map error icon */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400"
        >
          {/* Map outline */}
          <path
            d="M10 20L30 10L50 20L70 10V60L50 70L30 60L10 70V20Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path d="M30 10V60" stroke="currentColor" strokeWidth="2" />
          <path d="M50 20V70" stroke="currentColor" strokeWidth="2" />

          {/* X mark overlay */}
          <circle cx="55" cy="55" r="18" fill="#EF4444" />
          <path
            d="M48 48L62 62M62 48L48 62"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-700">
            지도를 불러올 수 없습니다
          </h3>
          <p className="text-sm text-gray-500">{getErrorMessage(status)}</p>
        </div>
      </div>
    </div>
  );
}
