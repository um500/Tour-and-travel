import Hero from "@/components/sections/Hero";
import CurrencySection from "@/components/sections/CurrencySection";
import HomeTours from "@/components/sections/HomeTours";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Live Exchange Rates */}
      <CurrencySection />

      {/* Trending + Popular Tours */}
      <HomeTours />
    </main>
  );
}
