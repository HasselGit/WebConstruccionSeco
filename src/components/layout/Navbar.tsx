"use client";
import Link from "next/link";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { Map } from "lucide-react";

export function Navbar() {
  const isOnline = useOnlineStatus();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-heading text-2xl font-bold text-primary tracking-tight">
            Stewardship<span className="text-secondary italic font-serif ml-1">Steel</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/catalogo" className="font-sans text-sm font-bold text-primary/80 hover:text-secondary transition-colors uppercase tracking-wider">
            Modelos
          </Link>
          <Link href="/obras" className="font-sans text-sm font-bold text-primary/80 hover:text-secondary transition-colors uppercase tracking-wider">
            Obras
          </Link>
          <Link href="/dashboard" className="font-sans text-sm font-bold text-primary hover:text-secondary transition-colors uppercase tracking-wider">
            Mi Hogar
          </Link>
        </div>

        {/* CTA & Status */}
        <div className="flex items-center gap-4">
          
          {/* Status Indicator sutil */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-sans font-bold px-2 py-1 rounded-full border border-border/30">
            <span className="relative flex h-2 w-2">
              {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-full w-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
          </div>

          {/* Primary CTA */}
          <Link 
            href="/factibilidad" 
            className="flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:bg-secondary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Map className="w-4 h-4" />
            <span className="hidden sm:block">Validar Terreno</span>
          </Link>

        </div>

      </div>
    </nav>
  );
}
