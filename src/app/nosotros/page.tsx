import Image from "next/image";
import { HeartHandshake, ShieldCheck, TreePine } from "lucide-react";

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      {/* Hero de Filosofía */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-20">
        <span className="font-sans text-sm font-bold tracking-[0.15em] text-secondary uppercase mb-4 block">
          Stewardship Steel
        </span>
        <h1 className="font-heading text-5xl md:text-7xl text-primary font-bold mb-8 leading-tight">
          El Arte de <br className="hidden md:block"/>Construir Confianza
        </h1>
        <p className="font-sans text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto">
          No ensamblamos perfiles; construimos el escenario donde tu familia escribirá su historia. Creemos que el camino hacia la casa propia debe ser predecible, limpio y emocionante.
        </p>
      </div>

      {/* Imagen Inmersiva */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-32">
        <div className="relative aspect-video rounded-[3rem] overflow-hidden sunlight-shadow">
          <Image 
            src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
            alt="Familia en su nuevo hogar" 
            fill 
            className="object-cover" 
          />
        </div>
      </div>

      {/* Valores */}
      <div className="bg-white py-32 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 sunlight-shadow">
                <HeartHandshake className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="font-heading text-2xl text-primary font-bold mb-4">Acompañamiento Humano</h3>
              <p className="font-sans text-foreground/80 leading-relaxed">
                Entendemos la ansiedad de construir. Te llevamos de la mano durante todo el proceso constructivo con comunicación diaria y transparente.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 sunlight-shadow">
                <ShieldCheck className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="font-heading text-2xl text-primary font-bold mb-4">Ingeniería que Protege</h3>
              <p className="font-sans text-foreground/80 leading-relaxed">
                Cada muro está calculado para resistir los embates del tiempo. Solidez estructural y eficiencia térmica para un hogar invulnerable.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 sunlight-shadow">
                <TreePine className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="font-heading text-2xl text-primary font-bold mb-4">Respeto por el Entorno</h3>
              <p className="font-sans text-foreground/80 leading-relaxed">
                Construcción en seco significa cero consumo de agua, mínimos desperdicios y una obra limpia que respeta el lote que elegiste.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
