export function Footer() {
  return (
    <footer className="bg-stark-white border-t border-gray-200 py-16 px-4 md:px-10 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <span className="text-xl font-bold tracking-tight text-corporate mb-4 block">CONSTRUCCIÓN<span className="text-slate-grey">SECO</span></span>
          <p className="text-sm text-slate-grey">La infraestructura digital para el entorno construido moderno. Desarrollada para la eficiencia.</p>
        </div>
        <div className="col-span-1 space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-slate-800 uppercase">Recursos</h4>
          <ul className="space-y-2 text-sm text-slate-grey">
            <li><a className="hover:text-corporate" href="/biblioteca">Biblioteca Técnica</a></li>
            <li><a className="hover:text-corporate" href="#">Manuales del Sistema</a></li>
            <li><a className="hover:text-corporate" href="#">Documentos Técnicos</a></li>
          </ul>
        </div>
        <div className="col-span-1 space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-slate-800 uppercase">Herramientas</h4>
          <ul className="space-y-2 text-sm text-slate-grey">
            <li><a className="hover:text-corporate" href="#">Calculadora de Carga</a></li>
            <li><a className="hover:text-corporate" href="#">Programador de Obra</a></li>
            <li><a className="hover:text-corporate" href="/cotizador">Motor de Cotización</a></li>
          </ul>
        </div>
        <div className="col-span-1 space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-slate-800 uppercase">Soporte</h4>
          <ul className="space-y-2 text-sm text-slate-grey">
            <li><a className="hover:text-corporate" href="#">Contactar Ingeniería</a></li>
            <li><a className="hover:text-corporate" href="#">Capacitación Técnica</a></li>
            <li><a className="hover:text-corporate" href="#">Política de Privacidad</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-grey">© 2024 CONSTRUCCION SECO INC. TODOS LOS DERECHOS RESERVADOS.</span>
        <div className="flex gap-4">
          <span className="text-slate-grey text-sm hover:text-corporate cursor-pointer">Ajustes</span>
          <span className="text-slate-grey text-sm hover:text-corporate cursor-pointer">Ayuda</span>
        </div>
      </div>
    </footer>
  );
}
