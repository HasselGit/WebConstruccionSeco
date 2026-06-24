import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-background overflow-hidden">
      {/* Columna Izquierda: Texto y CTA */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 lg:py-0 z-10">
        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="font-sans text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-6 block">
            Stewardship Steel
          </span>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8">
            Nuestra Filosofía: <br />
            <span className="text-primary/90 italic font-medium">El Arte de Construir Confianza</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-foreground/80 leading-relaxed mb-10 max-w-lg">
            Entendemos la construcción no como un simple ensamblaje industrial, sino como un acto de administración responsable de los sueños y la seguridad de cada familia. Tu futuro hogar, construido con calidez humana y precisión absoluta.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link 
              href="/contacto" 
              className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-sans font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Comenzar tu Proyecto
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              href="/dashboard" 
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary/10 text-primary px-8 py-4 rounded-full font-sans font-semibold hover:bg-primary/5 transition-all w-full sm:w-auto"
            >
              <Wrench className="w-4 h-4 text-primary/70" />
              Acceso Profesionales
            </Link>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Imagen Cinemática */}
      <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen">
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10 pointer-events-none"></div>
        {/* Usamos un fade en el borde izquierdo para suavizar la transición en escritorio */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 hidden lg:block pointer-events-none"></div>
        <Image 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
          alt="Familia en un hogar moderno y cálido de construcción en seco"
          fill
          priority={true}
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
