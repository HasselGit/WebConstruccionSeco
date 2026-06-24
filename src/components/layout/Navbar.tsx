"use client";
import Link from "next/link";
import { useOnlineStatus } from "@/hooks/use-online-status";

export function Navbar() {
  const isOnline = useOnlineStatus();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-heading text-2xl font-bold text-primary tracking-tight">
            Stewardship<span className="text-secondary italic font-serif ml-1">Steel</span>
          </Link>
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/obras" className="hidden md:block font-sans text-sm font-semibold text-primary/80 hover:text-secondary transition-colors">
            Obras Realizadas
          </Link>
          <Link href="/nosotros" className="hidden md:block font-sans text-sm font-semibold text-primary/80 hover:text-secondary transition-colors">
            Nuestra Filosofía
          </Link>
          <Link href="/dashboard" className="hidden md:block font-sans text-sm font-semibold text-primary/80 hover:text-secondary transition-colors">
            Área Técnica
          </Link>
          
          {/* Offline/Online Indicator */}
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-sans font-bold px-3 py-1.5 rounded-full bg-surface-variant border border-border/50 shadow-sm">
            <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
              {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-full w-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="text-primary/70 uppercase tracking-wider">{isOnline ? 'PWA Activa' : 'Modo Offline'}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
