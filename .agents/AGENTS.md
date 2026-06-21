# Directrices Base de WebConstruccionSeco (Obligatorio para cualquier agente IA)

Este documento contiene la arquitectura técnica, decisiones de diseño y el estado actual de la PWA `WebConstruccionSeco`. TODO agente que retome el proyecto DEBE leer y acatar estas directrices antes de proponer cambios.

## 1. Arquitectura Técnica y Stack
- **Framework Core**: Next.js 16 (App Router) + React 19.
- **Estilos**: Vanilla CSS y módulos. *Regla de Oro: NUNCA MODIFICAR CSS o componentes visuales de las páginas. La UX y UI (diseñada originalmente con Stitch) son intocables a menos que se indique estrictamente lo contrario.*
- **Backend & Base de Datos**: Firebase (Firestore para base de datos y Firebase Storage para archivos físicos). (Nota: Supabase y Dexie.js fueron descartados).
- **PWA & Offline**: Se utiliza `serwist` para la gestión de Service Workers. Firebase Firestore está configurado con `enableMultiTabIndexedDbPersistence()` para manejo nativo offline de los datos.
- **Comunicaciones**: Resend para correos transaccionales (envío de presupuestos en la API) y un enlace dinámico para interactuar con WhatsApp.
- **Generación de PDFs**: `@react-pdf/renderer` para renderizado en el servidor (Node.js/Next API Routes) exportando Buffers a memoria y Firebase.

## 2. Decisiones de Backend y Almacenamiento
- Todo almacenamiento de documentos en el Backend (API presupuestos) usa Firebase Admin SDK (`firebase-admin`).
- Las URLs generadas por la API de presupuestos devuelven siempre una **URL Firmada (`getSignedUrl`) con 7 días exactos de validez** por seguridad. Jamás exponer URLs públicas no controladas.
- Sincronización transparente: Firestore en el frontend retiene cambios locales y los vuelca automáticamente al recuperar conexión.

## 3. Despliegue en Producción
- **Plataforma**: Vercel.
- **Identidad del CLI**: El proyecto está enlazado a Vercel bajo el nombre estricto y en minúsculas `webconstruccionseco` (forzado en `vercel.json` para evitar crash por camelCase).
- **Variables de Entorno**: Las variables del entorno (GCP, Resend, etc.) se inyectan al entorno de Vercel usando la CLI de Vercel por terminal. Localmente residen en `.env.local` (excluido del repositorio).

## 4. Archivos de Infraestructura Crítica
- `src/lib/firebase.ts`: Cliente frontend de Firebase (Auth, Firestore, Storage) preparado para modo offline.
- `src/lib/firebase-admin.ts`: Singleton del servidor Admin SDK (`getAdminApp`) para evitar errores 'App already exists' en el Hot Reload de Next.js. El parseo de la `FIREBASE_PRIVATE_KEY` aplica `.replace(/\\n/g, '\n')` de forma obligatoria.
- `src/app/api/presupuestos/route.ts`: Endpoint backend. Ejecuta el pipeline: React-PDF -> Firebase Storage -> Resend -> Devolución de URL firmada.
- `push_env.js`: Script utilitario en raíz para migrar `.env.local` a la nube de Vercel automáticamente.

## 5. Reglas Operativas
1. Todo componente cliente que use React Hook (`useState`, `useEffect`) debe incluir explícitamente `'use client'` al principio del archivo para prevenir errores en el Next.js App Router Server Component.
2. Cualquier nuevo agente convocado debe apegarse al patrón de separación de responsabilidades: el Backend en App Routes procesa, Firebase/Admin centraliza, y el Cliente solo presenta la data.
3. Si la arquitectura cambia, **este documento `.agents/AGENTS.md` debe ser obligatoriamente actualizado**.
