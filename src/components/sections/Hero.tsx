import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-steel-silver overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute inset-0 z-0 bg-stark-white">
        <div className="absolute inset-0 bg-gradient-to-r from-stark-white via-stark-white/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-2/3 bg-slate-grey/10" style={{ clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)' }} />
      </div>
      
      <div className="container relative z-20 px-4 md:px-6">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-black text-corporate tracking-tighter leading-[1.05]">
            Innovación en <br />
            Construcción en Seco.
          </h1>
          <p className="text-lg md:text-2xl text-slate-grey max-w-2xl font-light leading-relaxed">
            Sistemas avanzados de Steel Framing y placas de yeso diseñados para el máximo rendimiento térmico, acústico y estético.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-corporate hover:bg-corporate/90 text-stark-white rounded-none px-10 h-16 text-lg shadow-xl shadow-corporate/20 transition-all hover:scale-105">
              Cotizar Proyecto
            </Button>
            <Button size="lg" variant="outline" className="rounded-none px-10 h-16 text-lg border-2 border-corporate text-corporate hover:bg-corporate hover:text-stark-white transition-all">
              Explorar Catálogo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
