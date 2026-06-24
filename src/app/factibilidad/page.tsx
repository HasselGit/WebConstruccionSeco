'use client';

import { useState } from 'react';
import { db } from '@/lib/db';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { MapPin, Navigation, Map, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function FactibilidadPage() {
  const isOnline = useOnlineStatus();
  
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  
  const [isScanning, setIsScanning] = useState(false);
  const [gpsFailed, setGpsFailed] = useState(false);
  const [addressManual, setAddressManual] = useState('');
  
  const [isSaved, setIsSaved] = useState(false);

  const handleScanLocation = () => {
    if (!name || !whatsapp) {
      alert("Por favor, ingresa tu Nombre y WhatsApp antes de validar el terreno.");
      return;
    }

    setIsScanning(true);
    setGpsFailed(false);

    if (!navigator.geolocation) {
      handleGpsFailure();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setIsScanning(false);
        const { latitude, longitude } = position.coords;
        
        try {
          if (db) {
            await db.leads_pending.add({
              name,
              whatsapp,
              type: 'factibilidad',
              latitude,
              longitude,
              timestamp: Date.now()
            });
            setIsSaved(true);
          }
        } catch (error) {
          console.error("Error guardando localmente en Dexie", error);
        }
      },
      (error) => {
        console.warn("GPS Denegado o sin señal", error);
        handleGpsFailure();
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleGpsFailure = () => {
    setIsScanning(false);
    setGpsFailed(true);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp || !addressManual) return;

    try {
      if (db) {
        await db.leads_pending.add({
          name,
          whatsapp,
          type: 'factibilidad',
          addressManual,
          timestamp: Date.now()
        });
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error guardando manual en Dexie", error);
    }
  };

  if (isSaved) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-brand-background flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100/50">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-heading text-4xl text-primary font-bold mb-4">Ubicación Registrada</h2>
          
          {!isOnline ? (
            <div className="bg-secondary/10 border border-secondary rounded-2xl p-6 max-w-md">
              <p className="font-sans text-lg text-secondary font-semibold">
                Modo Offline Activo. Guardamos los datos de tu terreno de forma segura en tu dispositivo. Se enviarán automáticamente al recuperar señal.
              </p>
            </div>
          ) : (
            <p className="font-sans text-lg text-foreground/80 max-w-md">
              Tus datos han sido registrados con éxito y sincronizados con nuestro sistema.
            </p>
          )}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-brand-background pt-32 pb-24 px-6 md:px-12 font-sans flex justify-center items-start">
        <div className="w-full max-w-lg bg-white rounded-[2rem] p-8 md:p-10 sunlight-shadow border border-border/50">
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
              <Map className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-primary">Valida la Factibilidad de tu Terreno</h1>
              <p className="text-sm text-foreground/60">Análisis técnico automatizado</p>
            </div>
          </div>

          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Nombre Completo</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="w-full bg-surface-variant/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow"
                placeholder="Ej: Familia López"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2">WhatsApp</label>
              <input 
                type="tel" 
                value={whatsapp} 
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full bg-surface-variant/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow"
                placeholder="+54 9 11 1234-5678"
              />
            </div>

            {/* Botón de Escaneo GPS */}
            {!gpsFailed && (
              <button 
                onClick={handleScanLocation}
                disabled={isScanning}
                className="w-full mt-4 bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md disabled:opacity-70"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Buscando satélites...
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5" />
                    Escanear mi Ubicación Actual
                  </>
                )}
              </button>
            )}

            {/* Fallback Manual con Animación Suave (AJUSTE DE CONTROL PM) */}
            <div className={`overflow-hidden transition-all duration-500 ease-out will-change-transform
              ${gpsFailed ? 'opacity-100 translate-y-0 max-h-96 mt-6' : 'opacity-0 -translate-y-4 max-h-0 mt-0'}`}>
              
              <div className="bg-surface/50 border-l-4 border-secondary p-4 rounded-r-xl mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/70">
                  El escaneo GPS no está disponible. Por favor ingresa la ubicación manualmente.
                </p>
              </div>

              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Dirección del Lote</label>
                  <input 
                    type="text" 
                    value={addressManual} 
                    onChange={e => setAddressManual(e.target.value)}
                    required
                    className="w-full bg-surface-variant/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow"
                    placeholder="Ingresá la dirección o localidad de tu lote"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md"
                >
                  <MapPin className="w-5 h-5" />
                  Registrar Manualmente
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
