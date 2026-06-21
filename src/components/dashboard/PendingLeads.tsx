'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Clock, Database } from 'lucide-react';

export default function PendingLeads() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    // Si estamos en el servidor, no intentamos usar Firestore directamente
    if (typeof window === 'undefined') return;

    const q = query(collection(db, 'leads'), orderBy('timestamp', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Firestore expone si el documento está en caché esperando subir
        isOffline: doc.metadata.hasPendingWrites 
      }));
      setLeads(data);
    }, (error) => {
      console.error("Error fetching leads from Firestore:", error);
    });

    return () => unsubscribe();
  }, []);

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Database className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Base de Datos Limpia</h3>
        <p className="text-sm text-slate-500 mt-1">Conectado a Firebase Firestore</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-gray-200 p-4">
        <h3 className="text-sm font-bold tracking-widest uppercase text-slate-600 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Últimos Leads (Firebase)
        </h3>
      </div>
      <ul className="divide-y divide-gray-100">
        {leads.map((lead) => (
          <li key={lead.id} className="p-4 hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-corporate">{lead.clientName}</h4>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1">{lead.projectDescription}</p>
              </div>
              {lead.isOffline && (
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-pulse">
                  Sincronizando...
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
