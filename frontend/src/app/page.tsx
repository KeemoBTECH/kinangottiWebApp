import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import FeatureCards from "@/components/ui/FeatureCards";
import CTASection from "@/components/ui/CTASection";
import NoticeBoard from "@/components/ui/NoticeBoard";
import StatsSection from "@/components/ui/StatsSection";
import PartnersSection from "@/components/ui/PartnersSection";
import Footer from "@/components/ui/Footer";
import HeroCarousel from "@/components/ui/HeroCarousel";
import NewsEvents from "@/components/ui/NewsEvents";
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroCarousel />
      <FeatureCards />
      <NewsEvents />
      <CTASection />
      <NoticeBoard />
      <StatsSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}