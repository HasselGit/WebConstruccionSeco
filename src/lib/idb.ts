import Dexie, { type EntityTable } from 'dexie';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  techSpecs: {
    thickness?: string;
    fireRating?: string;
    eco?: boolean;
    nrc?: string;
    stc?: string;
    load?: string;
    rValue?: string;
  };
  offlineAvailable: boolean;
}

export interface Lead {
  id?: number;
  clientName: string;
  projectDescription: string;
  location: {
    lat: number;
    lng: number;
    addressFallback?: string;
  };
  timestamp: number;
  synced: boolean;
}

const db = new Dexie('ConstruccionDatabase') as Dexie & {
  products: EntityTable<Product, 'id'>;
  leads_pending: EntityTable<Lead, 'id'>;
};

db.version(3).stores({
  products: 'id, category, offlineAvailable',
  leads_pending: '++id, synced, timestamp'
});

export const seedDatabase = async () => {
  const count = await db.products.count();
  if (count === 0) {
    await db.products.bulkAdd([
      {
        id: 'DW-125-FR',
        name: 'Placa de Yeso Ultra-Lite FR',
        description: 'Núcleo de yeso de alta densidad con aditivos resistentes al fuego para particiones residenciales y comerciales.',
        category: 'Sistemas de Drywall',
        price: 42.50,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc53sa-l4GGK_NfxRqLZqCBDsAvZ5hhtvbWXZvjwUhDess3yOoyc902R3bmGOXl-fpJvkSVcssrC0emrVN1oQ2iHgejQ-BgqxAM-IcmTezxSSoOAKDAnw1x7yQs0o6sQMbQCglrgpGc_vxJe87AnSljViKMO2agxhI4IPqKlYJzW9gBE-eKrBNSfYfQDgqxZuacVEnhsS2xpwRPb1u7ae0bUt3nc7Gqx0AvmeCdHMIpdhKNIFLSZWKLzk1v-68uBvppldk5ydfAX4',
        techSpecs: { thickness: '12.5mm', fireRating: '60 min', eco: true, stc: '32 dB', load: 'N/A', rValue: '0.05' },
        offlineAvailable: true
      },
      {
        id: 'SF-C70-55',
        name: 'Perfil C-70 de Acero',
        description: 'Perfil de acero galvanizado laminado en frío para ensamblajes de muros no portantes de alto rendimiento.',
        category: 'Estructuras de Acero',
        price: 12.80,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf8rJfDlcdGYsdW8wZEnPTeDVragqWcBCKADLP9VFaQYPlCbLj_c1zVcDfeg0MWr97HompLyv8lIBpAba5UZNXQDCpw6rV1LnCnQEI24Uf1jFVDyoJ4CrUafCd0g9gKqYwfzOgcm2if3SVmpk44sHGf85zzrzqb-Ws-Y56AB0IAv0-gB7h8Hz7W3YFcdeQvAum6ZT7XSrlPY_L8EDkJ4yIryh68UlTnRHQa60f4ZbsGgGNHogDYLQPGEAWtf-vgM6vEY-_i6roFwo',
        techSpecs: { thickness: '0.55mm G300', fireRating: '120 min*', load: '4.2 kN/m', rValue: 'Alta Cond.' },
        offlineAvailable: true
      },
      {
        id: 'ACP-MF-600',
        name: 'Panel Acústico X',
        description: 'Plafones de fibra mineral premium con absorción de sonido y reflectancia de luz superiores.',
        category: 'Soluciones de Techo',
        price: 18.90,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyQKKElqZOrasFsCTw-7KATzNIuqYTIC8Hy7BVHaHN27rrJfe7uvjd7SoNcjJGQgffDMCnXLl6yyztgg9JnfB9DjUkCC4nLXCC0xKKQ8Da7edFraWGb_tniH909fy60q5hGv9sjy__PPsCdBN1dYQuf2ri807WBgCEJmheUjmzpVdreeSnvUTE5dTMU9OF2sYFdy0wfOtd0ACKIs54T7jV5IwyIFHCShda0z-luEtf9mYjdKkb49wRwn_GtY0boIxtQ_06oYPcBFM',
        techSpecs: { thickness: '600x600mm', eco: true, nrc: 'NRC 0.85', fireRating: 'Clase A', stc: '38 dB (CAC)', load: 'Suspendido', rValue: '0.28' },
        offlineAvailable: true
      }
    ]);
  }
};

export { db };
