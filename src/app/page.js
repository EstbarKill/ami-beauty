import Hero from "@/components/home/Hero";
import PromoBar from "@/components/home/PromoBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AISection from "@/components/home/AISection";
import AboutSection from "@/components/home/AboutSection";
import TipsSection from "@/components/home/TipsSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoBar />
      <FeaturedProducts />
      <AISection />
      <AboutSection />
      <TipsSection />
      <ReviewsSection />
      <NewsletterCTA />
    </>
  );
}
