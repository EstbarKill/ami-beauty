import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AISection from "@/components/home/AISection";
import TipsSection from "@/components/home/TipsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <AISection />
      <TipsSection />
    </main>
  );
}
