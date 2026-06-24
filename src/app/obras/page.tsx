import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const WORKS = [
  {
    id: 1,
    title: "Residencia Los Canales",
    location: "Barrio Cerrado, Plottier",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Llave en Mano", "116 m²", "Terminado"]
  },
  {
    id: 2,
    title: "Vivienda Familiar RM",
    location: "Neuquén Capital",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Premium", "175 m²", "Terminado"]
  },
  {
    id: 3,
    title: "Casa de Fin de Semana",
    location: "Mari Menuco",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Modelo 86 m²", "Diseño Compacto"]
  },
  {
    id: 4,
    title: "Proyecto Los Olivos",
    location: "Centenario",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Modelo 103 m²", "Con Galería"]
  }
];

export default function ObrasPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-sans text-sm font-bold tracking-[0.15em] text-secondary uppercase mb-4 block">
            Prueba Social y Respaldo
          </span>
          <h1 className="font-heading text-5xl md:text-6xl text-primary font-bold mb-6 leading-tight">
            Nuestras Obras Realizadas
          </h1>
          <p className="font-sans text-lg md:text-xl text-foreground/80">
            Descubre cómo transformamos lotes vacíos en hogares llenos de vida. Cada obra es un testimonio de nuestra velocidad, limpieza y calidad constructiva innegociable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {WORKS.map((work) => (
            <div key={work.id} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden sunlight-shadow mb-6">
                <Image 
                  src={work.image} 
                  alt={work.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="px-4">
                <div className="flex items-center gap-2 mb-3">
                  {work.tags.map(tag => (
                    <span key={tag} className="bg-surface-variant text-primary font-sans text-xs font-bold px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-heading text-3xl text-primary font-bold mb-2">{work.title}</h3>
                <p className="font-sans text-foreground/70 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  {work.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
