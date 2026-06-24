import Image from "next/image";

export function OriginSection() {
  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 w-full bg-background">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Columna Izquierda: Imagen */}
        <div className="md:col-span-5 mb-12 md:mb-0 order-2 md:order-1 relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden sunlight-shadow border border-border/50 relative">
            <Image 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
              alt="Arquitecto y clientes colaborando en el diseño de su hogar"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
        
        {/* Columna Derecha: Texto */}
        <div className="md:col-span-7 md:pl-8 lg:pl-16 order-1 md:order-2">
          <span className="font-sans text-sm font-bold text-secondary tracking-[0.15em] uppercase block mb-4">
            Herencia y Visión
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-primary font-bold mb-8 leading-tight">
            Nuestro Origen
          </h2>
          <div className="space-y-6 text-foreground/80 font-sans text-lg leading-relaxed">
            <p>
              Nacimos de la convicción de que la ingeniería de precisión puede coexistir con la calidez humana. Con décadas de experiencia en el sistema Steel Framing, Stewardship Steel se ha consolidado como un referente en construcción en seco, no solo por la excelencia técnica, sino por la integridad de nuestros procesos.
            </p>
            <p>
              Inspirados en la precisión del acero y la flexibilidad del diseño moderno, transformamos materiales industriales en hogares acogedores. Cada tornillo, cada perfil y cada placa son tratados con el respeto que merece el futuro refugio de una familia. Nuestra trayectoria es el reflejo de miles de metros cuadrados de confianza construida paso a paso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
