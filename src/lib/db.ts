import Dexie, { type Table } from 'dexie';

export interface PendingLead {
  id?: number;
  type: 'factibilidad' | 'cotizacion';
  name: string;
  whatsapp: string;
  latitude?: number | null;
  longitude?: number | null;
  addressManual?: string;
  modelId?: string;
  selectedUpgrades?: string[];
  timestamp: number;
}

class StewardshipDB extends Dexie {
  leads_pending!: Table<PendingLead>;

  constructor() {
    super('StewardshipDatabase');
    this.version(1).stores({
      leads_pending: '++id, type, timestamp'
    });
  }
}

export const db = typeof window !== 'undefined' ? new StewardshipDB() : null;
