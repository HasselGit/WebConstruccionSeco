import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogClient } from "@/components/sections/CatalogClient";

export default function CatalogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stark-white">
      <Navbar />
      <CatalogClient />
      <Footer />
    </div>
  );
}
