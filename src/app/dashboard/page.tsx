import LeadForm from '@/components/dashboard/LeadForm';
import PendingLeads from '@/components/dashboard/PendingLeads';
import PdfGenerateButton from '@/components/dashboard/PdfGenerateButton';

export const metadata = {
  title: 'Dashboard de Contratistas | Construcción en Seco',
  description: 'Panel de gestión y registro de obras en terreno',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-corporate tracking-tight">Tablero de Contratistas</h1>
          <p className="text-slate-600 mt-2 text-lg">
            Registra nuevos prospectos y sincroniza tus capturas desde el terreno.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column - Registration Form */}
          <div className="lg:col-span-2 space-y-8">
            <LeadForm />
          </div>

          {/* Sidebar - Pending Sync & Stats */}
          <div className="space-y-8">
            {/* Generate PDF Test Action */}
            <PdfGenerateButton />

            {/* Estadísticas Básicas */}
            <div className="bg-corporate text-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4 opacity-80">Rendimiento Mensual</h3>
              <div className="text-4xl font-light tracking-tight mb-2">12</div>
              <div className="text-sm opacity-90">Obras registradas este mes</div>
            </div>

            {/* Offline Leads Queue */}
            <PendingLeads />
          </div>

        </div>
      </div>
    </div>
  );
}
