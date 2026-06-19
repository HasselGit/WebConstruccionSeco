import { ArrowRight, HardHat, Building2 } from "lucide-react";
import Link from "next/link";

export function AudienceSplit() {
  return (
    <section className="w-full py-24 md:py-32 bg-stark-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-corporate tracking-tight">Soluciones a Medida</h2>
          <p className="text-slate-grey text-lg max-w-2xl mx-auto">Selecciona tu perfil para acceder a herramientas y recursos diseñados específicamente para tus necesidades constructivas.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Architects & Engineers */}
          <Link href="/profesionales" className="group relative overflow-hidden bg-steel-silver p-10 md:p-14 transition-all hover:shadow-2xl hover:-translate-y-2 border border-gray-100 flex flex-col justify-between min-h-[360px]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Building2 className="w-48 h-48 text-corporate" />
            </div>
            <div className="relative z-10">
              <Building2 className="w-14 h-14 text-corporate mb-8" />
              <h3 className="text-3xl font-black text-corporate mb-4 leading-tight">Arquitectos e<br/>Ingenieros</h3>
              <p className="text-slate-grey text-lg mb-8 max-w-sm">Accede a nuestra biblioteca técnica offline, detalles constructivos en CAD, objetos BIM y normativas.</p>
            </div>
            <div className="relative z-10 flex items-center text-corporate font-bold text-lg group-hover:underline">
              Acceso Profesionales <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-3" />
            </div>
          </Link>

          {/* Installers & Contractors */}
          <Link href="/instaladores" className="group relative overflow-hidden bg-corporate p-10 md:p-14 transition-all hover:shadow-2xl hover:shadow-corporate/30 hover:-translate-y-2 flex flex-col justify-between min-h-[360px]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <HardHat className="w-48 h-48 text-stark-white" />
            </div>
            <div className="relative z-10">
              <HardHat className="w-14 h-14 text-stark-white mb-8" />
              <h3 className="text-3xl font-black text-stark-white mb-4 leading-tight">Instaladores y<br/>Contratistas</h3>
              <p className="text-steel-silver/90 text-lg mb-8 max-w-sm">Descubre nuestro catálogo de productos, guías de instalación rápida y cotizador de materiales por m².</p>
            </div>
            <div className="relative z-10 flex items-center text-stark-white font-bold text-lg group-hover:underline">
              Portal del Instalador <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-3" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
