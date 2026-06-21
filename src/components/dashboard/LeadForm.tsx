'use client';

import { useState, useEffect } from 'react';
import { MapPin, Navigation, WifiOff, CheckCircle2, AlertCircle } from 'lucide-react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    projectDescription: '',
    addressFallback: ''
  });
  
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Monitor online status
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const requestGPS = () => {
    setGpsStatus('loading');
    setErrorMessage('');
    
    if (!navigator.geolocation) {
      setGpsStatus('error');
      setErrorMessage('Tu navegador no soporta geolocalización. Usa la entrada manual.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setGpsStatus('success');
      },
      (error) => {
        setGpsStatus('error');
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage('Permiso de ubicación denegado. Por favor ingresa la dirección manualmente.');
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage('Ubicación no disponible. Por favor ingresa la dirección manualmente.');
            break;
          case error.TIMEOUT:
            setErrorMessage('Se agotó el tiempo de espera. Por favor ingresa la dirección manualmente.');
            break;
          default:
            setErrorMessage('Error desconocido de GPS. Por favor ingresa la dirección manualmente.');
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');

    try {
      const newLead = {
        clientName: formData.clientName,
        projectDescription: formData.projectDescription,
        location: {
          lat: location?.lat || 0,
          lng: location?.lng || 0,
          addressFallback: formData.addressFallback
        },
        timestamp: Date.now(),
      };

      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      // Guardado en Firestore. Firebase gestionará la cola offline nativamente.
      // Lo hacemos sin await para que resuelva instantáneo en la UI aunque no haya red.
      addDoc(collection(db, 'leads'), newLead).catch(err => {
        console.error('Error en background con Firestore:', err);
      });

      setSaveStatus('success');
      setTimeout(() => {
        setFormData({ clientName: '', projectDescription: '', addressFallback: '' });
        setLocation(null);
        setGpsStatus('idle');
        setSaveStatus('idle');
      }, 3000);

    } catch (err) {
      console.error('Error guardando lead:', err);
      alert('Error crítico guardando la información en el dispositivo.');
      setSaveStatus('idle');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Registrar Nueva Obra</h2>
            <p className="text-sm text-slate-500">Captura un nuevo prospecto en terreno</p>
          </div>
          {!isOnline && (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest border border-amber-200">
              <WifiOff className="w-4 h-4" /> MODO OFFLINE
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Nombre del Cliente / Empresa</label>
            <input 
              required
              type="text" 
              value={formData.clientName}
              onChange={e => setFormData(f => ({ ...f, clientName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate focus:border-transparent outline-none transition-all"
              placeholder="Ej. Constructora Apex SA"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Descripción del Proyecto</label>
            <textarea 
              required
              rows={3}
              value={formData.projectDescription}
              onChange={e => setFormData(f => ({ ...f, projectDescription: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate focus:border-transparent outline-none transition-all resize-none"
              placeholder="Ej. Tabiques interiores para 3 oficinas comerciales..."
            />
          </div>

          {/* Sección de Geolocalización */}
          <div className="space-y-4 md:col-span-2 bg-slate-50 p-5 rounded-lg border border-slate-200">
            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-slate-500 flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" /> Ubicación de la Obra
              </label>
              
              {gpsStatus === 'idle' && (
                <button 
                  type="button" 
                  onClick={requestGPS}
                  className="w-full py-3 px-4 bg-white border-2 border-corporate text-corporate rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors flex justify-center items-center gap-2"
                >
                  <Navigation className="w-4 h-4" /> OBTENER COORDENADAS GPS
                </button>
              )}

              {gpsStatus === 'loading' && (
                <div className="w-full py-3 px-4 bg-slate-100 text-slate-500 rounded-lg font-medium text-sm flex justify-center items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                  Buscando satélites...
                </div>
              )}

              {gpsStatus === 'success' && (
                <div className="w-full py-3 px-4 bg-green-50 text-green-700 border border-green-200 rounded-lg font-medium text-sm flex justify-between items-center">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> GPS Capturado Exactamente</span>
                  <span className="font-mono text-xs opacity-70">{location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}</span>
                </div>
              )}

              {gpsStatus === 'error' && (
                <div className="w-full py-3 px-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm flex items-start gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>

            {/* Fallback Input - Always show if GPS error, or user can choose to fill it anyway */}
            {(gpsStatus === 'error' || gpsStatus === 'idle') && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold tracking-widest uppercase text-slate-500">O Ingresa la Dirección Manualmente</label>
                <input 
                  type="text" 
                  value={formData.addressFallback}
                  onChange={e => setFormData(f => ({ ...f, addressFallback: e.target.value }))}
                  required={gpsStatus === 'error'}
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate focus:border-transparent outline-none transition-all"
                  placeholder="Calle, Número, Ciudad"
                />
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button 
            type="submit"
            disabled={saveStatus === 'saving' || saveStatus === 'success'}
            className={`px-8 py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-2 
              ${saveStatus === 'success' ? 'bg-green-600 text-white' : 
                saveStatus === 'saving' ? 'bg-slate-400 text-white cursor-not-allowed' : 
                'bg-corporate text-white hover:bg-slate-800 shadow-md hover:shadow-lg'}`}
          >
            {saveStatus === 'idle' && 'GUARDAR PROSPECTO'}
            {saveStatus === 'saving' && 'GUARDANDO...'}
            {saveStatus === 'success' && <><CheckCircle2 className="w-5 h-5" /> ¡GUARDADO!</>}
          </button>
        </div>
      </form>
    </div>
  );
}
