'use client';

import { useEffect, useRef } from 'react';
import { db } from '@/lib/db';

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const isSyncing = useRef(false);

  useEffect(() => {
    // Si no estamos en el navegador, no hacer nada
    if (typeof window === 'undefined' || !db) return;

    const syncPendingLeads = async () => {
      // Protección contra Bucle Infinito (Microcortes)
      if (isSyncing.current || !navigator.onLine || !db) return;
      
      isSyncing.current = true;

      try {
        const pending = await db.leads_pending.toArray();
        if (pending.length === 0) {
          isSyncing.current = false;
          return;
        }

        console.log(`[Auto-Sync] Vaciando cola de ${pending.length} leads...`);

        for (const lead of pending) {
          // Sanitización Estricta PM-2026
          const payload = {
            ...lead,
            latitude: lead.latitude ?? null,
            longitude: lead.longitude ?? null,
            addressManual: lead.addressManual || "",
            modelId: lead.modelId || "",
            selectedUpgrades: lead.selectedUpgrades || [],
          };

          // Intentar el envío al Backend
          const res = await fetch('/api/presupuestos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (res.ok) {
            // Confirmado por API, limpiar de Dexie
            if (lead.id) {
              await db.leads_pending.delete(lead.id);
              console.log(`[Auto-Sync] Lead ${lead.id} sincronizado exitosamente.`);
            }
          } else {
            console.warn(`[Auto-Sync] Fallo en API para lead ${lead.id}, reteniendo en local.`);
          }
        }
      } catch (error) {
        console.error('[Auto-Sync] Error procesando la cola:', error);
      } finally {
        // Desbloquear al finalizar barrido
        isSyncing.current = false;
      }
    };

    // Suscribirse a la vuelta de la red
    window.addEventListener('online', syncPendingLeads);
    
    // Intento inicial por si había red al cargar la página pero quedaron remanentes
    if (navigator.onLine) {
      syncPendingLeads();
    }

    return () => {
      window.removeEventListener('online', syncPendingLeads);
    };
  }, []);

  return <>{children}</>;
}
