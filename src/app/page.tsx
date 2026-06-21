import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AudienceSplit } from "@/components/sections/AudienceSplit";
import { TechnicalFeatures } from "@/components/sections/TechnicalFeatures";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-stark-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AudienceSplit />
        <TechnicalFeatures />
      </main>
      <Footer />
    </div>
  );
}
