import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text, Button, Hr } from '@react-email/components';

interface BudgetEmailProps {
  clientName: string;
  projectDescription: string;
  signedUrl: string;
}

export const BudgetEmail = ({ clientName, projectDescription, signedUrl }: BudgetEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Tu presupuesto técnico para: {projectDescription}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerText}>PWA CONSTRUCCIÓN EN SECO</Text>
          </Section>
          
          <Section style={content}>
            <Text style={greeting}>Hola {clientName},</Text>
            <Text style={paragraph}>
              Adjuntamos el presupuesto técnico detallado correspondiente a tu solicitud para el proyecto: <strong>{projectDescription}</strong>.
            </Text>
            
            <Section style={buttonContainer}>
              <Button href={signedUrl} style={button}>
                Ver y Descargar Presupuesto (PDF)
              </Button>
            </Section>
            
            <Text style={paragraph}>
              Este enlace estará disponible por motivos de seguridad durante los próximos 7 días. Si necesitas cualquier modificación, no dudes en responder a este correo.
            </Text>
            
            <Hr style={hr} />
            <Text style={footer}>
              Departamento de Presupuestos Ténicos<br />
              Sistemas de Construcción en Seco Premium
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BudgetEmail;

const main = { backgroundColor: '#f8fafc', fontFamily: 'Helvetica, Arial, sans-serif' };
const container = { margin: '0 auto', padding: '20px 0 48px', width: '580px' };
const header = { padding: '24px', backgroundColor: '#0f172a', borderRadius: '8px 8px 0 0', textAlign: 'center' as const };
const headerText = { color: '#ffffff', fontSize: '20px', fontWeight: 'bold', letterSpacing: '2px' };
const content = { backgroundColor: '#ffffff', padding: '32px', borderRadius: '0 0 8px 8px', border: '1px solid #e2e8f0' };
const greeting = { fontSize: '18px', color: '#0f172a', fontWeight: 'bold' };
const paragraph = { fontSize: '14px', lineHeight: '24px', color: '#475569' };
const buttonContainer = { textAlign: 'center' as const, marginTop: '32px', marginBottom: '32px' };
const button = { backgroundColor: '#3b82f6', borderRadius: '4px', color: '#fff', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' as const, display: 'block', padding: '12px 24px' };
const hr = { borderColor: '#e2e8f0', margin: '32px 0' };
const footer = { fontSize: '12px', color: '#94a3b8', textAlign: 'center' as const };
