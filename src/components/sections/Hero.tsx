import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full h-[819px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzlTyOlqrgNUeLY10R3WEjTFjC_hdKnKRn0DckmLdGhrwh3DSymhmgAom9AmMI4C6UTLyFGXXM97HxoSjAd3OdtExZk30ZyU854lvdsI4dNLg2aW66ZFPi0DUgY6W1Sc2C0VRJ557qzM_oS3-65tTCfvdmaCLFaztkpeIiTqPTZRtTmN_vwGmVKKO1shbc8fKj33wQPSOpzyUurX5JdiO3YkV0LtRFS16Fo4I7De31Y4DmOKEu5xjPdr847v5r7ZJDr2QEeU5TB3E')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stark-white/90 via-stark-white/40 to-transparent"></div>
      </div>
      <div className="relative z-10 px-4 md:px-10 w-full max-w-3xl">
        <div className="space-y-4">
          <span className="text-xs font-bold tracking-[0.2em] text-corporate uppercase">
            Integridad Técnica
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
            El Plano para la <br/><span className="text-corporate font-extrabold">Excelencia</span>
          </h1>
          <p className="text-lg text-slate-grey max-w-lg">
            Acelere los flujos de trabajo estructurales con una PWA de alto rendimiento diseñada para ingeniería de precisión y ejecución impecable en campo.
          </p>
          <div className="pt-8">
            <Link href="/catalogo" className="inline-flex items-center gap-2 bg-corporate text-stark-white px-8 py-4 rounded-lg text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all">
              Explorar Sistemas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
