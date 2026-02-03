import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/features/home/components/HeroSection";
import CategorySection from "@/features/home/components/CategorySection";
import ProductSection from "@/features/home/components/ProductSection";
import ReviewSection from "@/features/home/components/ReviewSection";
import HotspotSection from "@/features/home/components/HotspotSection";
import ExchangeRateSection from "@/features/exchange/components/ExchangeRateSection";
import EventSection from "@/features/home/components/EventSection";
import CTASection from "@/features/home/components/CTASection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <ProductSection />
        <ReviewSection />
        <HotspotSection />
        <ExchangeRateSection />
        <EventSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
