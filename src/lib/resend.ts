import { Resend } from 'resend';

// Inicializa Resend solo si existe la variable de entorno para evitar crasheos en build time o dev sin keys
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
