import { ArrowRight, Compass, Box } from "lucide-react";
import Link from "next/link";

export function AudienceSplit() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 bg-stark-white border-y border-gray-200">
      {/* Architects & Engineers */}
      <Link href="/profesionales" className="group relative overflow-hidden border-b md:border-b-0 md:border-r border-gray-200 p-8 md:p-20 transition-all hover:bg-steel-silver cursor-pointer">
        <div className="space-y-6 relative z-10">
          <div className="w-12 h-12 bg-corporate text-stark-white rounded-xl flex items-center justify-center mb-8">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-semibold text-slate-800">Para Arquitectos e Ingenieros</h2>
          <p className="text-lg text-slate-grey">
            Integración detallada de BIM, documentación técnica y certificaciones de rendimiento para proyectos de alta especificación.
          </p>
          <ul className="space-y-3 pt-4">
            {["Sincronización con Revit y CAD", "Datos de Rendimiento Acústico y Fuego", "Calculadoras de Carga Estructural"].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex items-center text-xs font-bold tracking-widest uppercase text-corporate group-hover:translate-x-2 transition-transform">
          Especificar Ahora <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </Link>

      {/* Installers & Contractors */}
      <Link href="/instaladores" className="group relative overflow-hidden p-8 md:p-20 transition-all hover:bg-steel-silver cursor-pointer">
        <div className="space-y-6 relative z-10">
          <div className="w-12 h-12 bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center mb-8">
            <Box className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-semibold text-slate-800">Para Instaladores y Contratistas</h2>
          <p className="text-lg text-slate-grey">
            Programación de obra en tiempo real, gestión de inventarios y herramientas de campo técnicas optimizadas para móviles.
          </p>
          <ul className="space-y-3 pt-4">
            {["Guías de Instalación Fuera de Línea", "Seguimiento de Entrega de Materiales", "Herramientas de Reporte de QA/QC"].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex items-center text-xs font-bold tracking-widest uppercase text-corporate group-hover:translate-x-2 transition-transform">
          Acceder a Herramientas de Campo <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </Link>
    </section>
  );
}
