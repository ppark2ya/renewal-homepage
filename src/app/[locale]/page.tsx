import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CategorySection from "@/components/sections/CategorySection";
import ProductSection from "@/components/sections/ProductSection";
import ReviewSection from "@/components/sections/ReviewSection";
import HotspotSection from "@/components/sections/HotspotSection";
import ExchangeRateSection from "@/components/sections/ExchangeRateSection";
import EventSection from "@/components/sections/EventSection";
import CTASection from "@/components/sections/CTASection";

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
