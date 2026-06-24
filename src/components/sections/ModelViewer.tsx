'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Car, Maximize, Layers, Image as ImageIcon, Map, ShieldCheck, ArrowRight } from "lucide-react";

const MODELS = [
  {
    id: "86",
    title: "Modelo 86m²",
    subtitle: "El inicio perfecto para tu familia",
    description: "Compacta, brillante y sumamente cálida. Diseñada para maximizar cada metro cuadrado sin sacrificar el confort.",
    specs: [
      { icon: BedDouble, label: "2 Dormitorios" },
      { icon: Bath, label: "2 Baños" },
      { icon: Maximize, label: "86 m² Cubiertos" },
    ],
    images: {
      design: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      layout: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    }
  },
  {
    id: "103",
    title: "Modelo 103m²",
    subtitle: "Espacios que invitan a compartir",
    description: "Integra tu vida interior con el aire libre. La galería y la cochera expanden tus posibilidades de disfrutar el hogar.",
    specs: [
      { icon: BedDouble, label: "3 Dormitorios" },
      { icon: Car, label: "Cochera + Galería" },
      { icon: Maximize, label: "103 m² Totales" },
    ],
    images: {
      design: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      layout: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    }
  },
  {
    id: "116",
    title: "Modelo 116m²",
    subtitle: "Comodidad sin concesiones",
    description: "Un balance maestro entre privacidad y espacios comunes fluidos, perfecto para familias en pleno crecimiento.",
    specs: [
      { icon: BedDouble, label: "3 Dormitorios" },
      { icon: Bath, label: "2 Baños Completos" },
      { icon: Maximize, label: "116 m² Cubiertos" },
    ],
    images: {
      design: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      layout: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    }
  },
  {
    id: "175",
    title: "Modelo 175m²",
    subtitle: "Categoría Premium y Amplitud",
    description: "Una experiencia de lujo orgánico. Incluye lavadero independiente, suite master y ambientes pensados para el máximo disfrute.",
    specs: [
      { icon: BedDouble, label: "4 Dormitorios" },
      { icon: Layers, label: "Lavadero Independiente" },
      { icon: Maximize, label: "175 m² Totales" },
    ],
    images: {
      design: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      layout: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    }
  }
];

export function ModelViewer() {
  // Estado para manejar qué tab está activa en cada tarjeta independientemente
  const [activeTabs, setActiveTabs] = useState<Record<string, 'design' | 'layout' | 'technical'>>({
    "86": 'design',
    "103": 'design',
    "116": 'design',
    "175": 'design',
  });

  const handleTabChange = (id: string, tab: 'design' | 'layout' | 'technical') => {
    setActiveTabs(prev => ({ ...prev, [id]: tab }));
  };

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 bg-background w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-sm font-bold tracking-[0.15em] text-secondary uppercase mb-4 block">
            Descubre Tu Futuro Hogar
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-primary font-bold mb-6">
            Línea de Modelos
          </h2>
          <p className="font-sans text-lg text-foreground/80">
            Cada uno de nuestros modelos está diseñado pensando en la calidez de la vida familiar, respaldado por la solidez y tecnología del Steel Framing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {MODELS.map((model) => {
            const currentTab = activeTabs[model.id];

            return (
              <div key={model.id} className="bg-white rounded-[2rem] overflow-hidden sunlight-shadow border border-border/50 flex flex-col group">
                
                {/* Visualizador Multimedia */}
                <div className="relative aspect-video w-full overflow-hidden bg-surface-variant">
                  {/* Pestañas superpuestas */}
                  <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
                    <div className="bg-white/80 backdrop-blur-md p-1 rounded-full flex gap-1 shadow-sm border border-white/20">
                      <button 
                        onClick={() => handleTabChange(model.id, 'design')}
                        className={`px-4 py-2 rounded-full text-xs font-sans font-bold flex items-center gap-2 transition-all duration-300 ${currentTab === 'design' ? 'bg-primary text-white shadow-md' : 'text-primary/70 hover:bg-white'}`}
                      >
                        <ImageIcon className="w-4 h-4" /> Diseño
                      </button>
                      <button 
                        onClick={() => handleTabChange(model.id, 'layout')}
                        className={`px-4 py-2 rounded-full text-xs font-sans font-bold flex items-center gap-2 transition-all duration-300 ${currentTab === 'layout' ? 'bg-primary text-white shadow-md' : 'text-primary/70 hover:bg-white'}`}
                      >
                        <Map className="w-4 h-4" /> Distribución
                      </button>
                      <button 
                        onClick={() => handleTabChange(model.id, 'technical')}
                        className={`px-4 py-2 rounded-full text-xs font-sans font-bold flex items-center gap-2 transition-all duration-300 ${currentTab === 'technical' ? 'bg-secondary text-white shadow-md' : 'text-primary/70 hover:bg-white'}`}
                      >
                        <Layers className="w-4 h-4" /> Capa Técnica
                      </button>
                    </div>
                  </div>

                  {/* Renderizado Condicional del Contenido */}
                  <div className="relative w-full h-full">
                    {/* Imagen de Diseño */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentTab === 'design' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                      <Image src={model.images.design} alt={`Render del modelo ${model.title}`} fill className="object-cover" />
                    </div>
                    
                    {/* Imagen de Distribución */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentTab === 'layout' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                      <Image src={model.images.layout} alt={`Plano del modelo ${model.title}`} fill className="object-cover" />
                    </div>

                    {/* Capa Técnica con Glassmorphism */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentTab === 'technical' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                      <Image src={model.images.design} alt={`Estructura del modelo ${model.title}`} fill className="object-cover grayscale blur-sm" />
                      <div className="absolute inset-0 bg-primary/70 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
                        <ShieldCheck className="w-12 h-12 text-secondary mb-4 opacity-90" />
                        <h4 className="font-heading text-2xl font-bold mb-3">La Arquitectura Oculta</h4>
                        <p className="font-sans text-sm max-w-sm leading-relaxed text-white/90">
                          Tu hogar está protegido por perfilería PGC/PGU de 100mm de alta resistencia, rigidizado con paneles OSB estructurales, envuelto en barrera hidrófuga inteligente y rematado con el sistema EIFS para una aislación térmica que abraza a tu familia en cualquier clima.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información del Modelo */}
                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <h3 className="font-heading text-3xl text-primary font-bold mb-1">{model.title}</h3>
                  <p className="font-sans text-sm font-semibold text-secondary mb-4 tracking-wide">{model.subtitle}</p>
                  
                  <p className="font-sans text-foreground/80 leading-relaxed mb-8 flex-1">
                    {model.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-6 mb-8">
                    {model.specs.map((spec, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                        <spec.icon className="w-6 h-6 text-primary/60 mb-2 stroke-[1.5]" />
                        <span className="font-sans text-xs font-semibold text-primary/80">{spec.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA para el Embudo */}
                  <Link 
                    href={`/catalogo?modelo=${model.id}`}
                    className="w-full inline-flex justify-center items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-sans font-bold hover:bg-secondary/90 hover:shadow-lg transition-all"
                  >
                    Configurar y Cotizar Llave en Mano
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
