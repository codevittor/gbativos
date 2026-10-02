import React, { useState, useEffect } from 'react';
import { HelpCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

export interface HeaderProps {
  totalStockCount: number;
  onNavigateToCatalog?: () => void;
  onOpenHowToBuy?: () => void;
  onOpenWarranty?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalStockCount,
  onNavigateToCatalog,
  onOpenHowToBuy,
  onOpenWarranty,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic header blur and border on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090A0F]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'bg-black/25 backdrop-blur-md border-b border-white/[0.05]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Brand & Real-time Live Status */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
            <a
              href="#catalog"
              className="flex items-center gap-2.5 group focus:outline-none"
              onClick={(e) => {
                if (onNavigateToCatalog) {
                  e.preventDefault();
                  onNavigateToCatalog();
                }
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-mono font-black text-xs tracking-tight shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-200">
                GB
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-white leading-none">
                  GB ATIVOS
                </span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5">
                  MARKETPLACE PRO
                </span>
              </div>
            </a>

            {/* Subtle Vertical Divider */}
            <div className="hidden sm:block h-4 w-px bg-white/10" />

            {/* Live Stock Counter Badge - Sleek, Unwrapped & Cohesive */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs font-mono text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-white">{totalStockCount}</span>
              <span className="text-zinc-400 font-sans">ativos online</span>
            </div>
          </div>

          {/* Zone 2: Airy, Modern Navigation (No Cluttered Capsules) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#catalog"
              onClick={(e) => {
                if (onNavigateToCatalog) {
                  e.preventDefault();
                  onNavigateToCatalog();
                }
              }}
              className="px-3.5 py-1.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-all duration-150 font-medium"
            >
              Catálogo
            </a>
            <button
              onClick={onOpenHowToBuy}
              className="px-3.5 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all duration-150 font-medium cursor-pointer"
            >
              Como Comprar
            </button>
            <button
              onClick={onOpenWarranty}
              className="px-3.5 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all duration-150 font-medium cursor-pointer"
            >
              Garantia 24h
            </button>
            <a
              href="https://wa.me/?text=Olá,%20tenho%20interesse%20em%20me%20tornar%20parceiro%20do%20GB%20Ativos"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all duration-150 font-medium inline-flex items-center gap-1 group"
            >
              <span>Parceiros</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            </a>
          </nav>

          {/* Zone 3: Polished Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenHowToBuy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] transition-all duration-150 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
              <span>Ajuda & FAQ</span>
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={onNavigateToCatalog}
              className="text-xs px-3.5 py-1.5 h-8 font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.5),0_0_12px_rgba(255,255,255,0.12)] hover:shadow-[0_0_16px_rgba(255,255,255,0.2)] transition-all"
            >
              Explorar Catálogo
            </Button>
          </div>

          {/* Mobile Menu Trigger & Stock Badge */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-zinc-300 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>{totalStockCount}</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.08] transition-colors"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glassmorphic Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#090A0F]/95 backdrop-blur-2xl px-5 py-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1 text-sm font-medium">
            <a
              href="#catalog"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToCatalog?.();
              }}
              className="px-3 py-2.5 rounded-lg text-white hover:bg-white/[0.06] transition-colors"
            >
              Catálogo de Ativos
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHowToBuy?.();
              }}
              className="text-left px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              Como Funciona a Compra
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWarranty?.();
              }}
              className="text-left px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              Garantia & Procedimentos (24h)
            </button>
            <a
              href="https://wa.me/?text=Olá,%20tenho%20interesse%20em%20me%20tornar%20parceiro%20do%20GB%20Ativos"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-between"
            >
              <span>Seja Parceiro / Fornecedor</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500" />
            </a>
          </nav>

          <div className="pt-2 border-t border-white/[0.06] flex flex-col gap-2">
            <Button
              variant="primary"
              size="md"
              className="w-full text-xs font-semibold py-2.5"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToCatalog?.();
              }}
            >
              Ver Catálogo Completo ({totalStockCount} ativos)
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
