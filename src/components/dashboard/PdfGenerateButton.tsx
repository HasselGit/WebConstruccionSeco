'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';

export default function PdfGenerateButton() {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/presupuestos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: 'Cliente de Prueba',
          projectDescription: 'Construcción en Seco Premium',
          items: [
            { name: 'Perfil C-70 de Acero', quantity: 20, price: 12.80 },
            { name: 'Placa de Yeso Ultra-Lite FR', quantity: 15, price: 42.50 },
          ],
          total: (20 * 12.80) + (15 * 42.50)
        })
      });
      if (!res.ok) throw new Error('Error al generar PDF');
      
      const data = await res.json();
      setSignedUrl(data.urlFirmada);
    } catch (e) {
      alert('Falló la generación: ' + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const shareWhatsApp = () => {
    if (!signedUrl) return;
    const text = encodeURIComponent(`¡Hola! Aquí tienes el presupuesto formal de tu obra: ${signedUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
      <h3 className="text-sm font-bold tracking-widest uppercase text-slate-800 mb-2">Motor de Presupuestos</h3>
      <p className="text-xs text-slate-500 mb-4">Firebase Storage + PDF Edge</p>
      
      {!signedUrl ? (
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-slate-800 text-white text-xs font-bold px-4 py-3 rounded-lg uppercase tracking-widest hover:bg-slate-900 transition-colors disabled:opacity-50"
        >
          {loading ? 'GENERANDO EN NUBE...' : 'GENERAR PDF PRUEBA'}
        </button>
      ) : (
        <div className="space-y-3 animate-in fade-in zoom-in duration-300">
          <a 
            href={signedUrl} 
            download
            className="block w-full bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-4 py-3 rounded-lg uppercase tracking-widest hover:bg-green-100 transition-colors"
          >
            DESCARGAR PDF
          </a>
          <button 
            onClick={shareWhatsApp}
            className="w-full bg-[#25D366] text-white text-xs font-bold px-4 py-3 rounded-lg uppercase tracking-widest hover:bg-[#1ebe5d] transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <Share2 className="w-4 h-4" /> COMPARTIR POR WHATSAPP
          </button>
          <button 
            onClick={() => setSignedUrl(null)}
            className="text-xs text-slate-500 underline mt-2"
          >
            Generar otro
          </button>
        </div>
      )}
    </div>
  );
}
