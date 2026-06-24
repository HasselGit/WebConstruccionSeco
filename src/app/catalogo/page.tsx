'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Calculator, Send, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/db';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const MODELS_BASE = {
  "86": { title: "Modelo 86m²", basePrice: 45000, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
  "103": { title: "Modelo 103m²", basePrice: 53000, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
  "116": { title: "Modelo 116m²", basePrice: 60000, img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
  "175": { title: "Modelo 175m² Premium", basePrice: 95000, img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" }
};

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const isOnline = useOnlineStatus();
  
  const modeloId = searchParams.get('modelo') || '86';
  const modelData = MODELS_BASE[modeloId as keyof typeof MODELS_BASE] || MODELS_BASE["86"];

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  
  const [aberturasDVH, setAberturasDVH] = useState(false);
  const [metrosExtra, setMetrosExtra] = useState(0);
  const [terminacionesPremium, setTerminacionesPremium] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [total, setTotal] = useState(modelData.basePrice);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    let currentTotal = modelData.basePrice;
    if (aberturasDVH) currentTotal += 3500;
    if (terminacionesPremium) currentTotal += 5800;
    currentTotal += (metrosExtra * 600);
    setTotal(currentTotal);
  }, [aberturasDVH, metrosExtra, terminacionesPremium, modelData.basePrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp) {
      alert("Tu Nombre y WhatsApp son obligatorios para enviarte la cotización oficial.");
      return;
    }

    setIsSubmitting(true);
    
    const selectedUpgrades = [];
    if (aberturasDVH) selectedUpgrades.push("DVH");
    if (terminacionesPremium) selectedUpgrades.push("Premium");
    if (metrosExtra > 0) selectedUpgrades.push(`MetrosExtra:${metrosExtra}`);
    
    // 1. Guardar siempre en Dexie localmente como backup (Soporte Offline Extremo - PendingLead)
    try {
      if (db) {
        await db.leads_pending.add({
          name,
          whatsapp,
          type: 'cotizacion',
          modelId: modeloId,
          selectedUpgrades,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error("No se pudo guardar la cotización en Dexie local", error);
    }

    // 2. Si no hay conexión, terminamos el flujo de forma amable. SyncProvider hará el envío en background.
    if (!isOnline) {
      setIsSubmitting(false);
      setIsSuccess(true);
      return;
    }

    // 3. Disparo al Backend de Presupuestos (Si hay red)
    try {
      const res = await fetch('/api/presupuestos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'cotizacion',
          name,
          whatsapp,
          modelId: modeloId,
          selectedUpgrades,
          timestamp: Date.now()
        })
      });

      if (res.ok) {
        // Todo salió bien en el server
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error en API:", error);
      // Falla de red intermitente o servidor caído.
      // Dexie ya capturó el Lead, así que el usuario verá éxito igual.
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`flex flex-col items-center justify-center p-12 text-center bg-white rounded-[2rem] sunlight-shadow w-full max-w-2xl mx-auto border border-border/50 transition-all duration-1000 ease-out will-change-transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100/50">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-heading text-4xl text-primary font-bold mb-4">¡Cotización Congelada!</h2>
        <p className="font-sans text-lg text-foreground/80 max-w-md">
          Hemos congelado el precio de <strong className="text-primary">USD {total.toLocaleString()}</strong> para tu {modelData.title}.
          Nuestro asesor se comunicará contigo al <strong>{whatsapp}</strong> a la brevedad.
        </p>
        {!isOnline && (
          <div className="mt-6 bg-secondary/10 border border-secondary rounded-2xl p-4">
            <p className="font-sans text-sm text-secondary font-semibold">
              (Se enviará automáticamente al recuperar conexión a Internet)
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto transition-all duration-1000 ease-out will-change-transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Columna Izquierda: Visual e Info */}
      <div className="space-y-8">
        <div className="relative aspect-video rounded-[2rem] overflow-hidden sunlight-shadow">
          <Image src={modelData.img} alt={modelData.title} fill className="object-cover" priority />
        </div>
        <div>
          <h1 className="font-heading text-4xl md:text-5xl text-primary font-bold mb-4">{modelData.title}</h1>
          <p className="font-sans text-lg text-foreground/80 leading-relaxed">
            Personaliza tu hogar y obtén tu presupuesto transparente al instante. Congela este valor hoy mismo para proteger tus ahorros.
          </p>
        </div>
      </div>

      {/* Columna Derecha: Cotizador */}
      <div className="bg-white rounded-[2rem] p-8 md:p-10 sunlight-shadow border border-border/50 flex flex-col">
        <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-6">
          <Calculator className="w-8 h-8 text-secondary" />
          <h2 className="font-heading text-2xl text-primary font-bold">Configuración Final</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-border/30">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary/60 mb-2">Nombre Completo</label>
              <input 
                type="text" 
                required
                value={name} 
                onChange={e => setName(e.target.value)}
                className="w-full bg-surface-variant/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow"
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary/60 mb-2">WhatsApp</label>
              <input 
                type="tel" 
                required
                value={whatsapp} 
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full bg-surface-variant/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow"
                placeholder="+54 9..."
              />
            </div>
          </div>

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
              <p className="font-sans font-bold text-primary group-hover:text-secondary transition-colors">Aberturas DVH Alta Prestación</p>
              <p className="font-sans text-sm text-foreground/70">Aislación térmica extrema y hermeticidad garantizada.</p>
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
              <p className="font-sans font-bold text-primary group-hover:text-secondary transition-colors">Terminaciones Premium</p>
              <p className="font-sans text-sm text-foreground/70">Pisos de porcelanato importado y revestimiento texturado.</p>
            </div>
          </label>

          <div className="p-4 rounded-xl border border-border/50 bg-surface/50">
            <div className="flex justify-between mb-2">
              <p className="font-sans font-bold text-primary">Metros Extra de Galería</p>
              <p className="font-sans font-bold text-secondary">{metrosExtra} m²</p>
            </div>
            <input 
              type="range" 
              min="0" max="30" step="1" 
              value={metrosExtra} 
              onChange={(e) => setMetrosExtra(parseInt(e.target.value))}
              className="w-full accent-secondary" 
            />
          </div>

          <div className="mt-auto pt-6">
            <div className="flex justify-between items-end mb-6 bg-surface p-6 rounded-2xl border border-secondary/20">
              <div>
                <p className="font-sans text-sm font-bold text-primary/60 uppercase tracking-widest mb-1">Total Congelado</p>
                <p className="font-sans text-xs text-foreground/60">Garantía por 30 días hábiles</p>
              </div>
              <p className="font-heading text-4xl font-bold text-primary">USD {total.toLocaleString()}</p>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !name || !whatsapp}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-full font-sans font-bold text-lg hover:bg-primary/90 transition-all shadow-lg disabled:opacity-70"
            >
              {isSubmitting ? 'Procesando Documentos...' : 'Congelar y Cotizar'}
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
    <>
      <Navbar />
      <div className="min-h-screen bg-background py-16 md:py-24 px-6 md:px-12">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center h-64 w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mb-4"></div>
            <p className="font-sans text-primary animate-pulse">Cargando motor de cotización...</p>
          </div>
        }>
          <ConfiguratorContent />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
