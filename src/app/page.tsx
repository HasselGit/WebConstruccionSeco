import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { OriginSection } from "@/components/sections/OriginSection";
import { FeaturesBento } from "@/components/sections/FeaturesBento";
import { TeamSection } from "@/components/sections/TeamSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <OriginSection />
        <FeaturesBento />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
