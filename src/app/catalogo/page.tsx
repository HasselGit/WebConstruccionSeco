'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2, ChevronRight, Calculator, Send } from 'lucide-react';

// Simulamos los modelos base para obtener la imagen
const MODELS_BASE = {
  "86": { title: "Modelo 86m²", basePrice: 45000, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
  "103": { title: "Modelo 103m²", basePrice: 53000, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
  "116": { title: "Modelo 116m²", basePrice: 60000, img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
  "175": { title: "Modelo 175m² Premium", basePrice: 95000, img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" }
};

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const modeloId = searchParams.get('modelo') || '86';
  const modelData = MODELS_BASE[modeloId as keyof typeof MODELS_BASE] || MODELS_BASE["86"];

  const [aberturasDVH, setAberturasDVH] = useState(false);
  const [metrosExtra, setMetrosExtra] = useState(0);
  const [terminacionesPremium, setTerminacionesPremium] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [total, setTotal] = useState(modelData.basePrice);

  useEffect(() => {
    let currentTotal = modelData.basePrice;
    if (aberturasDVH) currentTotal += 3500;
    if (terminacionesPremium) currentTotal += 5800;
    currentTotal += (metrosExtra * 600); // 600 usd el metro de galeria
    setTotal(currentTotal);
  }, [aberturasDVH, metrosExtra, terminacionesPremium, modelData.basePrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simular llamada a la API /api/presupuestos
      const res = await fetch('/api/presupuestos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteNombre: "Cotización Web",
          clienteEmail: "contacto@stewardship.com",
          items: [
            { descripcion: `Construcción ${modelData.title}`, unidad: "Global", cantidad: 1, precioUnitario: modelData.basePrice, importe: modelData.basePrice },
            ...(aberturasDVH ? [{ descripcion: "Upgrade Aberturas DVH", unidad: "Global", cantidad: 1, precioUnitario: 3500, importe: 3500 }] : []),
            ...(terminacionesPremium ? [{ descripcion: "Terminaciones Premium", unidad: "Global", cantidad: 1, precioUnitario: 5800, importe: 5800 }] : []),
            ...(metrosExtra > 0 ? [{ descripcion: "Metros Extra Galería", unidad: "m2", cantidad: metrosExtra, precioUnitario: 600, importe: metrosExtra * 600 }] : [])
          ],
          subtotal: total,
          iva: total * 0.21,
          total: total * 1.21
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Redirigir o mostrar la URL firmada (o enlace de WhatsApp)
        if (data.url) {
          window.open(data.url, '_blank');
        } else {
          alert('Presupuesto generado exitosamente.');
        }
      }
    } catch (error) {
      console.error(error);
      alert('Error al generar presupuesto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Columna Izquierda: Visual e Info */}
      <div className="space-y-8">
        <div className="relative aspect-video rounded-[2rem] overflow-hidden sunlight-shadow">
          <Image src={modelData.img} alt={modelData.title} fill className="object-cover" priority />
        </div>
        <div>
          <h1 className="font-heading text-4xl md:text-5xl text-primary font-bold mb-4">{modelData.title}</h1>
          <p className="font-sans text-lg text-foreground/80 leading-relaxed">
            Estás a un paso de concretar tu sueño. Utiliza nuestro cotizador dinámico para personalizar los adicionales y recibir un presupuesto formal en segundos.
          </p>
        </div>
      </div>

      {/* Columna Derecha: Cotizador */}
      <div className="bg-white rounded-[2rem] p-8 md:p-10 sunlight-shadow border border-border/50 flex flex-col">
        <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-6">
          <Calculator className="w-8 h-8 text-secondary" />
          <h2 className="font-heading text-2xl text-primary font-bold">Cotizador Interactivo</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
          
          <label className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:bg-surface transition-colors cursor-pointer group">
            <div className="pt-1">
              <input 
                type="checkbox" 
                checked={aberturasDVH} 
                onChange={(e) => setAberturasDVH(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-secondary focus:ring-secondary/50 transition-all" 
              />
            </div>
            <div>
              <p className="font-sans font-bold text-primary group-hover:text-secondary transition-colors">Mejora: Aberturas DVH Alta Prestación</p>
              <p className="font-sans text-sm text-foreground/70">Aislación acústica y térmica extrema para todo el hogar.</p>
            </div>
          </label>

          <label className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:bg-surface transition-colors cursor-pointer group">
            <div className="pt-1">
              <input 
                type="checkbox" 
                checked={terminacionesPremium} 
                onChange={(e) => setTerminacionesPremium(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-secondary focus:ring-secondary/50 transition-all" 
              />
            </div>
            <div>
              <p className="font-sans font-bold text-primary group-hover:text-secondary transition-colors">Paquete Terminaciones Premium</p>
              <p className="font-sans text-sm text-foreground/70">Pisos de porcelanato importado, griferías de primera y revestimiento texturado exterior.</p>
            </div>
          </label>

          <div className="p-4 rounded-xl border border-border/50 bg-surface/50">
            <div className="flex justify-between mb-2">
              <p className="font-sans font-bold text-primary">Metros Extra de Galería Semicubierta</p>
              <p className="font-sans font-bold text-secondary">{metrosExtra} m²</p>
            </div>
            <input 
              type="range" 
              min="0" max="30" step="1" 
              value={metrosExtra} 
              onChange={(e) => setMetrosExtra(parseInt(e.target.value))}
              className="w-full accent-secondary" 
            />
            <p className="font-sans text-xs text-foreground/60 mt-2">Personaliza el espacio exterior para tus eventos familiares.</p>
          </div>

          <div className="mt-auto pt-8">
            <div className="flex justify-between items-end mb-6 bg-surface p-6 rounded-2xl border border-secondary/20">
              <div>
                <p className="font-sans text-sm font-bold text-primary/60 uppercase tracking-widest mb-1">Inversión Estimada</p>
                <p className="font-sans text-xs text-foreground/60">Precio base + adicionales seleccionados</p>
              </div>
              <p className="font-heading text-4xl font-bold text-primary">USD {total.toLocaleString()}</p>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-full font-sans font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-70"
            >
              {isSubmitting ? 'Generando Documento Oficial...' : 'Generar y Enviar Presupuesto'}
              {!isSubmitting && <Send className="w-5 h-5" />}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <div className="min-h-screen bg-background py-16 md:py-24 px-6 md:px-12">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-64 w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mb-4"></div>
          <p className="font-sans text-primary animate-pulse">Cargando módulo de configuración...</p>
        </div>
      }>
        <ConfiguratorContent />
      </Suspense>
    </div>
  );
}
