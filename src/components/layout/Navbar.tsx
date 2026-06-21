"use client";
import Link from "next/link";
import { useOnlineStatus } from "@/hooks/use-online-status";

export function Navbar() {
  const isOnline = useOnlineStatus();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-stark-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl md:text-2xl font-extrabold text-corporate tracking-tight">
            CONSTRUCCIÓN<span className="text-slate-grey">SECO</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/catalogo" className="hidden md:block text-sm font-semibold text-slate-grey hover:text-corporate transition-colors">
            Catálogo
          </Link>
          <Link href="/biblioteca" className="hidden md:block text-sm font-semibold text-slate-grey hover:text-corporate transition-colors">
            Biblioteca
          </Link>
          <Link href="/dashboard" className="hidden md:block text-sm font-semibold text-slate-grey hover:text-corporate transition-colors">
            Contratistas
          </Link>
          
          {/* Offline/Online Indicator */}
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold px-3 py-1.5 rounded-full bg-steel-silver border border-gray-200 shadow-sm">
            <span className={`relative flex h-2 w-2 md:h-2.5 md:w-2.5`}>
              {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-full w-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="text-slate-grey uppercase tracking-wider">{isOnline ? 'PWA Online' : 'Modo Offline'}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
