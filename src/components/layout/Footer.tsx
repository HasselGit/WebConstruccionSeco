import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border/40 py-20 px-6 md:px-12 mt-auto font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Marca Global */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="font-heading text-2xl font-bold text-primary tracking-tight mb-4 block">
            Stewardship<span className="text-secondary italic font-serif ml-1">Steel</span>
          </Link>
          <p className="text-sm text-foreground/70 leading-relaxed pr-4">
            Transformando la experiencia constructiva. Edificamos hogares que abrazan la vida familiar, combinando tecnología de vanguardia y calidad artesanal.
          </p>
        </div>

        {/* Links B2C */}
        <div className="col-span-1 space-y-6">
          <h4 className="text-xs font-bold tracking-widest text-primary/60 uppercase">Nuestra Filosofía</h4>
          <ul className="space-y-3 text-sm font-medium text-foreground/80">
            <li><Link className="hover:text-secondary transition-colors" href="/nosotros">El Arte de Construir</Link></li>
            <li><Link className="hover:text-secondary transition-colors" href="/obras">Obras Realizadas</Link></li>
            <li><Link className="hover:text-secondary transition-colors" href="/catalogo">Modelos y Cotizaciones</Link></li>
          </ul>
        </div>

        <div className="col-span-1 space-y-6">
          <h4 className="text-xs font-bold tracking-widest text-primary/60 uppercase">Servicios</h4>
          <ul className="space-y-3 text-sm font-medium text-foreground/80">
            <li><Link className="hover:text-secondary transition-colors" href="/factibilidad">Validar Terreno</Link></li>
            <li><Link className="hover:text-secondary transition-colors" href="/dashboard">Portal de Mi Hogar</Link></li>
            <li><Link className="hover:text-secondary transition-colors" href="#">Llave en Mano</Link></li>
          </ul>
        </div>

        <div className="col-span-1 space-y-6">
          <h4 className="text-xs font-bold tracking-widest text-primary/60 uppercase">Contacto</h4>
          <ul className="space-y-3 text-sm font-medium text-foreground/80">
            <li><a className="hover:text-secondary transition-colors" href="#">Agendar Asesoría</a></li>
            <li><a className="hover:text-secondary transition-colors" href="#">WhatsApp Directo</a></li>
            <li><a className="hover:text-secondary transition-colors" href="#">Preguntas Frecuentes</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/50">
          © {new Date().getFullYear()} STEWARDSHIP STEEL. TODOS LOS DERECHOS RESERVADOS.
        </span>
        <div className="flex gap-6">
          <Link href="#" className="text-foreground/50 text-xs font-bold tracking-widest uppercase hover:text-secondary transition-colors">Privacidad</Link>
          <Link href="#" className="text-foreground/50 text-xs font-bold tracking-widest uppercase hover:text-secondary transition-colors">Legales</Link>
        </div>
      </div>
    </footer>
  );
}
