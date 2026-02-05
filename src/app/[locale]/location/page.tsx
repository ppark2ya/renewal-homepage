import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import LocationPage from '@/features/location/components/LocationPage';

function LocationPageContent() {
  return <LocationPage />;
}

export default function Location() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-[60px]">
        <Suspense fallback={<div className="flex h-[calc(100vh-60px)] items-center justify-center">Loading...</div>}>
          <LocationPageContent />
        </Suspense>
      </main>
    </div>
  );
}
