import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { BudgetTemplate } from '@/lib/pdf-templates/BudgetTemplate';
import React from 'react';
import { adminStorage } from '@/lib/firebase-admin';

// Node.js runtime is required because @react-pdf/renderer uses Yoga layout engine
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Generar el Stream del PDF desde el servidor
    const stream = await renderToStream(React.createElement(BudgetTemplate, { data: body }) as any);
    
    // Convertir Stream a Buffer para subirlo a Firebase
    const chunks: Buffer[] = [];
    for await (const chunk of stream as any) {
      chunks.push(Buffer.from(chunk));
    }
    const pdfBuffer = Buffer.concat(chunks);

    // Subir a Firebase Storage
    const fileName = `presupuestos/Presupuesto_${Date.now()}.pdf`;
    const bucket = adminStorage().bucket();
    const file = bucket.file(fileName);
    
    await file.save(pdfBuffer, {
      contentType: 'application/pdf',
      public: false,
    });

    // Generar Signed URL válida por exactamente 7 días
    const [signedUrl] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, 
    });

    // Enviar correo con Resend utilizando el helper
    try {
      const { resend } = await import('@/lib/resend');
      if (resend) {
        const { render } = await import('@react-email/render');
        const { BudgetEmail } = await import('@/components/emails/BudgetEmail');
        
        const html = await render(React.createElement(BudgetEmail, {
          clientName: body.clientName || 'Cliente',
          projectDescription: body.projectDescription || 'Obra Técnica',
          signedUrl: signedUrl
        }));

        await resend.emails.send({
          from: 'PWA Presupuestos <onboarding@resend.dev>',
          to: body.email || 'developer@example.com', // fallback si el frontend no envía email
          subject: `Presupuesto Formal: ${body.clientName || 'Proyecto'}`,
          html: html,
        });
        console.log('Correo enviado exitosamente vía Resend');
      }
    } catch (emailError) {
      console.error('Error enviando correo Resend (no crítico):', emailError);
    }

    // Retorno estructurado con { urlFirmada }
    return NextResponse.json({ urlFirmada: signedUrl }, { status: 200 });

  } catch (error) {
    console.error('Error al generar o subir PDF en servidor:', error);
    return NextResponse.json({ error: 'Falló la generación del presupuesto PDF' }, { status: 500 });
  }
}
