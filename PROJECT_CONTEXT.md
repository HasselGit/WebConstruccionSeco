# Contexto del Proyecto: PWA Construcción en Seco

## Objetivo
Desarrollar una Progressive Web App (PWA) de alto nivel para una empresa líder en construcción en seco. El diseño visual debe ser una réplica fiel de los mockups generados en Stitch.

## Estado Actual (Último Checkpoint)
- Fases 1, 2 y 3 del plan de implementación completadas.
- Fase 4 (UI Base) iniciada. Se crearon los componentes `Navbar.tsx`, `Hero.tsx` y `AudienceSplit.tsx` con la paleta de colores inyectada, pero el usuario ha solicitado que estos se mejoren iterativamente para igualar **exactamente** la complejidad visual de Stitch.
- **Acción requerida para la próxima IA:** Analizar el HTML provisto por Stitch y reconstruir la UI para que sea 1:1, sin perder la modularidad de React.

## Stack Tecnológico y Reglas Arquitectónicas
- **Framework:** Next.js 16+ (App Router). 
  - *Regla Crítica:* El comando de desarrollo es `next dev --webpack` (Turbopack está desactivado intencionalmente para compatibilidad con Serwist en desarrollo).
- **Estilos:** Tailwind CSS v4 (configuración CSS-first en `src/app/globals.css` usando `@theme inline`) + componentes de **Shadcn/ui**.
  - Colores corporativos configurados: `--color-corporate` (#0B3C5D), `--color-slate-grey` (#708090), `--color-steel-silver` (#F0F4F8).
- **PWA (Service Workers):** `serwist` y `@serwist/next`.
  - *Regla Crítica:* Serwist está deshabilitado en `process.env.NODE_ENV !== "production"` para evitar bucles de recarga infinitos.
  - Manifest nativo: `src/app/manifest.ts` (Actualmente sin íconos para evitar 404s).
- **Base de Datos / Storage Backend:** Supabase (Cliente en `src/lib/supabase.ts`).
- **Almacenamiento Offline (Cliente):** IndexedDB con **Dexie.js** (`src/lib/idb.ts`) para cachear catálogo de productos.
- **Generación de PDFs:** `@react-pdf/renderer` debe usarse **exclusivamente del lado del servidor** (Ej: `src/app/api/presupuestos/route.ts`). El servidor subirá el PDF a Supabase Storage y retornará un Signed URL.
- **Resiliencia de Red / UI:**
  - Fallback de Navegación Offline: `src/app/offline-fallback/page.tsx`.
  - Hook de red: `src/hooks/use-online-status.ts`.
  - Fallback de GPS: Si falla la geolocalización, siempre mostrar input manual de dirección.

## Tareas Pendientes (Roadmap)
1. Perfeccionar la Home Page igualando el diseño de Stitch.
2. Construir la ruta `/catalogo` (Catálogo Interactivo Desktop/Móvil).
3. Construir la ruta `/biblioteca` (Librería Técnica).
4. Construir la ruta de cotización (Selector de Sistemas).
5. Implementar Backend Server-Side de PDFs y Supabase.
