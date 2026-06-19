import Dexie, { type EntityTable } from 'dexie';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  technicalSheetUrl?: string;
  offlineAvailable: boolean;
}

const db = new Dexie('ConstruccionDatabase') as Dexie & {
  products: EntityTable<Product, 'id'>;
};

db.version(1).stores({
  products: 'id, category, offlineAvailable'
});

export { db };
export type { Product };
