import React from 'react';
import { ArrowDown, ShieldCheck, Zap, Lock, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';

export interface HeroProps {
  onScrollToCatalog: () => void;
  onOpenWarrantyModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToCatalog,
  onOpenWarrantyModal,
}) => {
  return (
    <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-border-subtle/80 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Top Tag Pill with Dark Glass */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/[0.14] backdrop-blur-xl text-xs font-mono shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse"></span>
          <span className="text-zinc-300">ESTOQUE EXCLUSIVO</span>
          <span className="text-zinc-600">|</span>
          <span className="text-white font-medium">ATUALIZADO HOJE</span>
        </div>

        {/* Main Headline with Drop Shadow for Crisp Readability */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.12] drop-shadow-md">
          Ativos de Alta Performance para{' '}
          <span className="underline decoration-blue-500/80 underline-offset-8">
            Escala no Tráfego Pago
          </span>
        </h1>

        {/* Subtitle with High Contrast & Soft Text Shadow */}
        <p className="text-sm sm:text-base text-zinc-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
          Business Managers com histórico de faturamento consolidado, contas Google Ads verificadas, proxies residenciais e pacotes de contingência imediata com entrega automatizada.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={onScrollToCatalog}
            rightIcon={<ArrowDown className="w-4 h-4" />}
            className="w-full sm:w-auto font-semibold rounded-lg shadow-lg shadow-black/40"
          >
            Acessar Catálogo Disponível
          </Button>

          <Button
            variant="glass"
            size="md"
            onClick={onOpenWarrantyModal}
            leftIcon={<ShieldCheck className="w-4 h-4 text-secondary" />}
            className="w-full sm:w-auto rounded-lg bg-black/40 backdrop-blur-xl border-white/[0.14] hover:bg-black/60"
          >
            Termos de Garantia (24h)
          </Button>
        </div>

        {/* Key Trust Pillars Grid with Floating Dark Glass Cards */}
        <div className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          {/* Card 1: Entrega 24/7 */}
          <div className="p-3.5 rounded-xl bg-black/55 backdrop-blur-xl border border-white/[0.12] hover:border-white/[0.22] transition-all flex items-start gap-3 shadow-md">
            <div className="p-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-accent-orange shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Entrega 24/7</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Instantâneo via Pix ou Cripto</p>
            </div>
          </div>

          {/* Card 2: Garantia Ativa */}
          <div className="p-3.5 rounded-xl bg-black/55 backdrop-blur-xl border border-white/[0.12] hover:border-white/[0.22] transition-all flex items-start gap-3 shadow-md">
            <div className="p-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-accent-emerald shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Garantia Ativa</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Substituição contra restrição</p>
            </div>
          </div>

          {/* Card 3: Histórico Real */}
          <div className="p-3.5 rounded-xl bg-black/55 backdrop-blur-xl border border-white/[0.12] hover:border-white/[0.22] transition-all flex items-start gap-3 shadow-md">
            <div className="p-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-accent-blue-light shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Histórico Real</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Faturamento BRL, USD e EUR</p>
            </div>
          </div>

          {/* Card 4: Segurança Máxima */}
          <div className="p-3.5 rounded-xl bg-black/55 backdrop-blur-xl border border-white/[0.12] hover:border-white/[0.22] transition-all flex items-start gap-3 shadow-md">
            <div className="p-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-accent-purple shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Segurança Máxima</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">2FA, cookies & sessões JSON</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
