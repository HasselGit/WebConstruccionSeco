'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Clock, Home, Key, HardHat } from "lucide-react";

const PHASES = [
  { id: 1, title: "Fundaciones y Platea", status: "completed", description: "Bases sólidas de hormigón armado completadas.", date: "12 Mar 2026", icon: HardHat },
  { id: 2, title: "Montaje de Paneles", status: "active", description: "Ensamblaje milimétrico de perfilería de acero estructural.", date: "En curso", icon: Home },
  { id: 3, title: "Aislamiento y Emplacado", status: "pending", description: "Instalación del sistema EIFS y OSB.", date: "Próximamente", icon: Clock },
  { id: 4, title: "Instalaciones y Acabados", status: "pending", description: "Cañerías, cableado y revestimientos interiores.", date: "Pendiente", icon: Clock },
  { id: 5, title: "Entrega de Llaves", status: "pending", description: "Limpieza profunda y entrega oficial.", date: "Pendiente", icon: Key },
];

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Encabezado Cinematográfico */}
        <div className={`mb-20 text-center md:text-left transition-all duration-1000 ease-out will-change-transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="font-heading text-4xl md:text-6xl text-primary font-bold tracking-tight mb-4">
            Tu próximo capítulo <br className="hidden md:block"/> se está construyendo
          </h1>
          <p className="text-foreground/70 text-lg md:text-xl font-light tracking-wide max-w-2xl">
            Bienvenido al portal de tu hogar. Sigue el latido de tu obra con transparencia total.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Timeline Vertical Elegante */}
          <div className="lg:col-span-5 relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-border/40"></div>
            
            <div className="space-y-12">
              {PHASES.map((phase, idx) => {
                const isCompleted = phase.status === 'completed';
                const isActive = phase.status === 'active';
                
                return (
                  <div key={phase.id} className="relative flex items-start gap-6 group">
                    <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 ease-out 
                      ${isCompleted ? 'bg-secondary text-white shadow-md' : isActive ? 'bg-primary text-white shadow-lg shadow-primary/20 animate-pulse' : 'bg-surface border border-border text-foreground/40'}`}>
                      <phase.icon className={`w-6 h-6 ${isActive ? 'opacity-100' : 'opacity-80'}`} strokeWidth={isActive || isCompleted ? 2 : 1.5} />
                    </div>
                    
                    <div className={`pt-2 transition-all duration-700 ease-out ${isActive ? 'translate-x-2' : ''}`}>
                      <p className="text-xs font-bold tracking-widest uppercase text-foreground/50 mb-1">{`Fase 0${phase.id}`}</p>
                      <h3 className={`font-heading text-2xl font-bold mb-2 ${isActive ? 'text-primary' : isCompleted ? 'text-primary/80' : 'text-foreground/40'}`}>
                        {phase.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isActive || isCompleted ? 'text-foreground/80' : 'text-foreground/40'}`}>
                        {phase.description}
                      </p>
                      <p className={`text-xs mt-2 font-semibold tracking-wide ${isActive ? 'text-secondary' : 'text-foreground/40'}`}>
                        {phase.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tarjeta Inmersiva Cinematográfica */}
          <div className="lg:col-span-7">
            <div className="sticky top-32 bg-white rounded-[2rem] p-6 md:p-8 sunlight-shadow border border-border/30 overflow-hidden group">
              <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden mb-8">
                {/* Aceleración por hardware forzada y animaciones Dvele */}
                <Image 
                  src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                  alt="Avance de obra en Fase 2" 
                  fill 
                  className="object-cover transition-all duration-1000 ease-out will-change-transform scale-105 group-hover:scale-100" 
                  priority
                />
                
                {/* Etiqueta flotante premium */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-secondary"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">En Directo</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-heading text-2xl text-primary font-bold mb-3">Tu panel estructural ha sido ensamblado</h4>
                <p className="font-sans text-foreground/80 leading-relaxed text-sm">
                  Nuestros ingenieros acaban de fijar el anillo perimetral con precisión milimétrica. El esqueleto de acero de tu vivienda ya domina el lote, garantizando la fortaleza que acompañará a tu familia por generaciones.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
