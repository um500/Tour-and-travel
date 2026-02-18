import Hero from "@/components/sections/Hero";
import HomeTours from "@/components/sections/HomeTours";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Trending + Popular Tours */}
      <HomeTours />
    </>
  );
}
