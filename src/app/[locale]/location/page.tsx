import Header from '@/components/layout/Header';
import LocationPage from '@/features/location/components/LocationPage';

export default function Location() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-[60px]">
        <LocationPage />
      </main>
    </div>
  );
}
