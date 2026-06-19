import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AudienceSplit } from "@/components/sections/AudienceSplit";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-stark-white">
      <Navbar />
      <Hero />
      <AudienceSplit />
    </main>
  );
}
