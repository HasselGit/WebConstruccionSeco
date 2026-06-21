import { CheckCircle2 } from "lucide-react";

export function TechnicalFeatures() {
  return (
    <section className="py-24 px-4 md:px-10 bg-stark-white">
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-corporate tracking-widest uppercase">Nuestros Estándares</span>
        <h2 className="text-3xl font-semibold mt-4 text-slate-800">Componentes de Ingeniería de Precisión</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
        {/* Large Feature */}
        <div className="md:col-span-8 bg-white border border-gray-200 p-8 rounded-xl flex flex-col md:flex-row gap-6 hover:shadow-sm transition-shadow">
          <div className="flex-1 space-y-4">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full uppercase tracking-widest">Ecológico</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full uppercase tracking-widest">Acústico</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Estructura de Gran Calibre Serie-S7</h3>
            <p className="text-sm text-slate-grey leading-relaxed">El referente de la industria para construcción residencial de gran altura. Fabricado con un 95% de acero reciclado y probado para resistencia sísmica en entornos de zona 4.</p>
            <button className="text-corporate text-xs font-bold tracking-widest uppercase border-b border-corporate pb-1 hover:opacity-70 transition-opacity mt-4">Especificaciones Técnicas</button>
          </div>
          <div className="flex-1 min-h-[200px] bg-steel-silver rounded-lg overflow-hidden">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDexxfupOoMKCshgsv2JixEGV3zHf0ihUcHwnJsUVJICTOZ21mG7ozpJo7C5FdCciAu0p4_FDMO5Yo1t0zC5vuiHdW8-eBJJGbgmyZMflOH6Lz5J2RLA0bSvyqyxsmvGowiE_SxlosUsGFO-bp5N4AtoweNYyJXp7BhptZ99s4a9SsmlQtnEIPahlWGyBbFMGuseOI1vij840TAW3Ug6Kem2kDr9zEqzY0tx-h0Wnp5iaLM4UvCugIcu5rQatM2cWwp3l7ZR-l8ftM" alt="Perfil de acero" />
          </div>
        </div>

        {/* Small Feature 1 */}
        <div className="md:col-span-4 bg-corporate text-stark-white p-8 rounded-xl flex flex-col justify-between">
          <CheckCircle2 className="w-10 h-10 opacity-50 mb-8" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Listo para PWA</h3>
            <p className="text-sm text-blue-200">Acceda a sus reportes de obra y planos 100% fuera de línea. Sincronice automáticamente cuando vuelva a tener conexión.</p>
          </div>
        </div>

        {/* Small Feature 2 */}
        <div className="md:col-span-4 bg-white border border-gray-200 p-8 rounded-xl hover:bg-steel-silver transition-colors group">
          <div className="h-40 bg-steel-silver rounded-lg mb-6 overflow-hidden">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTf1E2mnQSX6piaWlzCS-IDc_VKFHng-BdOOaq0u4YKr6gbWrMJyW6888OTiRrIZfIi-IpK6WTG8IwPojomkX7wn8a08XYdgT8Jmc7VQJtI_XgTUKh-KqhdxQjUMPy7WqdWkKFCKAJn-N86XLVBy9BQVZGbms9OPASHtepzORk5RjOsi0jA20jtVlNlwzXskqlJg8fzB1Cf5V_1o85GQLEROhHY6EEJ4k3PaxqlQnmbbDEDWgPLVtho3xMw569Wrg5UYmLkvVap0M" alt="Herramientas" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Sincronización de Campo</h3>
          <p className="text-sm text-slate-grey">Comunicación fluida entre la oficina de arquitectura y el sitio de trabajo.</p>
        </div>

        {/* Dynamic Feature */}
        <div className="md:col-span-8 bg-stark-white border border-gray-200 p-8 rounded-xl flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Métricas de Rendimiento en Vivo</h3>
              <p className="text-sm text-slate-grey mt-1">Monitoreo de integridad estructural en proyectos activos.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold tracking-widest text-slate-800">SITIOS ACTIVOS: 142</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border-l-2 border-corporate pl-4">
              <span className="text-xs font-bold tracking-widest text-slate-grey uppercase">Eficiencia</span>
              <div className="text-3xl font-bold text-slate-800 mt-2">98.4%</div>
            </div>
            <div className="border-l-2 border-corporate pl-4">
              <span className="text-xs font-bold tracking-widest text-slate-grey uppercase">Reciclado</span>
              <div className="text-3xl font-bold text-slate-800 mt-2">82%</div>
            </div>
            <div className="border-l-2 border-corporate pl-4">
              <span className="text-xs font-bold tracking-widest text-slate-grey uppercase">Reducción</span>
              <div className="text-3xl font-bold text-slate-800 mt-2">-14%</div>
            </div>
            <div className="border-l-2 border-corporate pl-4">
              <span className="text-xs font-bold tracking-widest text-slate-grey uppercase">A Tiempo</span>
              <div className="text-3xl font-bold text-slate-800 mt-2">100%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
