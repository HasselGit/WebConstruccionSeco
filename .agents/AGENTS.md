# Directrices Base de Stewardship Steel (Obligatorio para cualquier agente IA)

Este documento contiene la arquitectura técnica, decisiones de diseño y el estado actual de la PWA `WebConstruccionSeco` (operando comercialmente como **Stewardship Steel**). TODO agente que retome el proyecto DEBE leer y acatar estas directrices antes de proponer cambios para evitar reprocesos.

## 1. Arquitectura Técnica y Stack
- **Framework Core**: Next.js 16 (App Router) + React 19.
- **Estética y Diseño**: **Dvele Aesthetic (B2C Premium)**. Todo diseño debe usar contenedores amplios (`py-24`), tipografía `Playfair Display` (Heading) y `Hanken Grotesk` (Sans). Las transiciones deben ser cinemáticas y aceleradas por hardware (`duration-1000 transition-all ease-out will-change-transform`).
- **Backend & Base de Datos Global**: Firebase (Firestore/Storage) vía `firebase-admin`.
- **Motor Offline & PWA (Local)**: **Dexie.js** es el corazón del almacenamiento local offline de la PWA. El componente `SyncProvider.tsx` gestiona la sincronización automática hacia Firebase.

## 2. Motor de Captación Híbrida PWA (Dexie.js)
- **Regla de SSR**: La instancia de Dexie (`src/lib/db.ts`) debe chequear **obligatoriamente** `typeof window !== 'undefined'` al instanciarse para no quebrar el renderizado SSR de Vercel.
- **Bóveda `leads_pending`**: Todo formulario (como `/factibilidad` o `/catalogo`) debe guardar en primera instancia el lead (tipo `PendingLead`) en Dexie localmente.
- **Auto-Sync**: El componente `src/components/providers/SyncProvider.tsx` inyectado en `layout.tsx` escucha el evento `window.addEventListener('online')` y barre la cola de IndexedDB, disparando POST a `/api/presupuestos`. Cuenta con protección de bucles (`isSyncing = useRef(false)`) y sanitización estricta (`latitude = null` si es carga manual).

## 3. Rutas y Flujos B2C Principales
- `/dashboard` (**Portal de Mi Hogar**): Una línea de tiempo inmersiva donde la familia hace tracking de las 5 fases de su obra.
- `/factibilidad`: Geolocalización nativa (`navigator.geolocation`) con **Graceful Fallback** animado hacia un input de texto si el usuario deniega el GPS.
- `/catalogo`: Cotizador dinámico que exige Nombre y WhatsApp antes de procesar el pago o generar el lead. Usar siempre `<Suspense>` debido al uso de `useSearchParams()`.
- `/obras` y `/nosotros`: Páginas de prueba social con alto impacto visual.

## 4. Despliegue en Producción
- **Plataforma**: Vercel. Proyecto: `webconstruccionseco`.
- **Iconografía**: Prohibido usar librerías externas o SVG en crudo. Utilizar EXCLUSIVAMENTE los iconos vectoriales de `lucide-react` para garantizar que la app funcione al 100% en áreas sin cobertura (Modo Avión).

## 5. Reglas Operativas Críticas
1. Todo componente cliente que use React Hooks (`useState`, `useEffect`) o invoque a `Dexie` debe incluir explícitamente `'use client'` al principio del archivo.
2. Si un usuario queda sin conexión, **no se arrojan errores alert**. Se disparan carteles de éxito (estilo Terracota) informando que la gestión quedó resguardada en su dispositivo y se enviará luego.
3. Si la arquitectura cambia, **este documento `.agents/AGENTS.md` debe ser obligatoriamente actualizado**.
