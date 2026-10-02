import React from 'react';
import { Zap, MessageCircle, ShieldCheck, Check, AlertCircle, ArrowUpRight, Flame } from 'lucide-react';
import type { Asset } from '../../types/asset';
import { formatCurrency, formatPriceBRL, getCategoryLabel } from '../../utils/formatters';

export interface AssetCardProps {
  asset: Asset;
  onSelect: (asset: Asset) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onSelect }) => {
  // Only the highest tier accounts (spend >= 80k or ID asset-01) get the colorful Top Tier banner
  const isTopTier = asset.totalSpent >= 80000 || asset.id === 'asset-01';
  const isAutomatic = asset.deliveryType === 'automatic';

  return (
    <div
      onClick={() => onSelect(asset)}
      className={`group relative flex flex-col justify-between rounded-xl transition-all duration-200 cursor-pointer overflow-hidden select-none hover:-translate-y-1 border border-white/[0.07] hover:border-white/[0.18] ${
        isTopTier
          ? 'bg-[#0E0F14] shadow-lg'
          : 'bg-[#0E0E12]'
      }`}
    >
      {/* =========================================================================
          TOP BANNER: THE ASSET PASS / FINANCIAL HEADER
          - Top Tier: Browser Tab Relief Cutout (curved obsidian surface covering the gradient)
          - Standard: Discreet dark obsidian with subtle monochromatic glass finish
          ========================================================================= */}
      {isTopTier ? (
        <div className="relative h-[156px] w-full overflow-hidden select-none">
          {/* Background: Royal Blue into Warm Sunset Orange Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#172554] via-[#1E40AF] to-[#EA580C]" />

          {/* Glossy diagonal glass sheen (inspired by premium banking card mockup) */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30 pointer-events-none" />

          {/* Top-Left: Fintech Overlapping Translucent Circles Symbol */}
          <div className="absolute top-3.5 left-4 sm:left-5 z-0 flex -space-x-1.5" aria-hidden="true">
            <div className="w-5 h-5 rounded-full bg-white/35 border border-white/50 shadow-sm backdrop-blur-xs" />
            <div className="w-5 h-5 rounded-full bg-white/20 border border-white/35 backdrop-blur-xs" />
          </div>

          {/* Top-Right: Financial Metric (Total Spent) & Top Tier Pill in the Spacious Gradient */}
          <div className="absolute top-3.5 right-4 sm:right-5 z-0 text-right max-w-[48%]">
            <div className="flex items-center justify-end gap-1 mb-1.5">
              <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-white backdrop-blur-sm shadow-sm">
                <Flame className="w-2.5 h-2.5 text-orange-400" />
                TOP TIER
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white leading-none drop-shadow-sm">
              {formatCurrency(asset.totalSpent, asset.currency)}
            </div>
            <span className="text-[9px] font-mono tracking-widest text-white/80 uppercase mt-1 block">
              GASTO COMPROVADO
            </span>
          </div>

          {/* The Browser Tab / Window Relief Cutout (Lower, more compact tab leaving more degradê visible) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 360 156"
            preserveAspectRatio="none"
          >
            {/* Cutout filling from the tab boundary down to the card body */}
            <path
              d="M 0,90 L 158,90 C 186,90 186,134 214,134 L 336,134 C 350,134 360,142 360,150 L 360,158 L 0,158 Z"
              fill="#0E0F14"
            />
            {/* Subtle hairline edge accent defining the tab curve */}
            <path
              d="M 0,90 L 158,90 C 186,90 186,134 214,134 L 336,134 C 350,134 360,142 360,150"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          </svg>

          {/* Content Inside the Browser Tab Relief (Positioned lower, comfortably inside the smaller tab) */}
          <div className="absolute top-[100px] left-4 sm:left-5 z-20 max-w-[54%]">
            <h4 className="font-bold text-sm sm:text-base text-white tracking-tight leading-tight truncate">
              {getCategoryLabel(asset.category)}
            </h4>
            <div className="text-[10px] text-zinc-400 font-mono tracking-tight mt-1 flex items-center gap-1.5 truncate">
              <span>{asset.code}</span>
              <span className="text-zinc-600">•</span>
              <span>{asset.isPrepaid ? 'Pré-Pago' : 'Pós-Pago'}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Card Header: Discreet Dark Obsidian */
        <div className="relative p-4 sm:p-5 bg-[#131318] border-b border-white/[0.06] text-white">
          <div className="flex items-start justify-between gap-3">
            {/* Left: Card Emblem & Asset Identification */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="flex -space-x-1 shrink-0" aria-hidden="true">
                  <div className="w-4 h-4 rounded-full border border-white/20 bg-white/15" />
                  <div className="w-4 h-4 rounded-full border border-white/15 bg-white/10" />
                </div>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider bg-white/[0.05] border border-white/[0.08] text-primary">
                  {asset.code}
                </span>
              </div>
              <div className="text-xs font-medium tracking-wide truncate text-secondary">
                {getCategoryLabel(asset.category)}
              </div>
            </div>

            {/* Right: Total Spent Metric */}
            <div className="text-right shrink-0">
              <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight leading-none text-primary">
                {asset.totalSpent > 0 ? (
                  formatCurrency(asset.totalSpent, asset.currency)
                ) : (
                  <span className="text-sm font-normal text-muted">Sem Gasto</span>
                )}
              </div>
              <span className="text-[9px] font-mono tracking-wider uppercase mt-1 block text-muted">
                GASTO COMPROVADO
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MIDDLE BODY: TITLE, SUBTITLE & SIMULATED PILL SWITCH
          ========================================================================= */}
      <div className={`p-4 sm:p-5 ${isTopTier ? 'pt-3 sm:pt-3.5' : ''} flex-1 flex flex-col justify-between space-y-3.5`}>
        {/* Title and Switch Row (Zero awkward clipping) */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="font-semibold text-sm sm:text-base text-primary leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-white transition-colors">
              {asset.title}
            </h3>
            <p className="text-[11px] text-secondary font-mono">
              Safra {asset.creationYear} • {isTopTier ? `Limite ${asset.dailyLimit}` : (asset.isPrepaid ? 'Pré-Pago' : 'Pós-Pago')}
            </p>
          </div>

          {/* Delivery Indicator Switch */}
          <div
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono transition-colors ${
              isAutomatic
                ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                : 'bg-white/[0.03] border border-white/[0.08] text-secondary'
            }`}
          >
            {isAutomatic ? (
              <Zap className="w-3 h-3 text-blue-400" />
            ) : (
              <MessageCircle className="w-3 h-3 text-secondary" />
            )}
            <span>{isAutomatic ? '24/7 AUTO' : 'WHATSAPP'}</span>
          </div>
        </div>

        {/* =========================================================================
            STRUCTURED SPECS STRIP (Fluid, clean, zero text-overflow)
            ========================================================================= */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs">
          {/* Spec 1: Daily Limit */}
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-muted uppercase block truncate">Limite</span>
            <span className="font-semibold text-primary text-[11px] block mt-0.5 truncate" title={asset.dailyLimit}>
              {asset.dailyLimit}
            </span>
          </div>

          {/* Spec 2: Accounts Count */}
          <div className="border-l border-white/[0.06] pl-2 min-w-0">
            <span className="text-[10px] font-mono text-muted uppercase block truncate">Contas</span>
            <span className="font-semibold text-primary text-[11px] block mt-0.5 truncate">
              {asset.accountsCount} {asset.accountsCount === 1 ? 'liberada' : 'ativas'}
            </span>
          </div>

          {/* Spec 3: Year */}
          <div className="border-l border-white/[0.06] pl-2 min-w-0">
            <span className="text-[10px] font-mono text-muted uppercase block truncate">Ano</span>
            <span className="font-semibold text-primary text-[11px] block mt-0.5 truncate">
              {asset.creationYear}
            </span>
          </div>
        </div>

        {/* Status Chips Row: Verification & Debt Status */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {asset.isVerified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/25 text-blue-400">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              Verificado (CNPJ)
            </span>
          )}

          {asset.hasDebt ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-orange-500/15 border border-orange-500/30 text-orange-400">
              <AlertCircle className="w-3 h-3 text-orange-400" />
              Com Fatura
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-secondary">
              <Check className="w-3 h-3 text-emerald-400" />
              Sem Dívida
            </span>
          )}

          {asset.stock <= 2 && (
            <span className="text-[10px] font-mono text-amber-400/90 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              Últimas unidades
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          CARD FOOTER: PRICE & ACTION CTA
          ========================================================================= */}
      <div className="p-4 sm:p-5 border-t border-white/[0.05] bg-[#0A0B0E] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono text-muted block">
            {asset.stock} em estoque
          </span>
          <div className="text-base sm:text-lg font-bold font-mono text-primary mt-0.5">
            {formatPriceBRL(asset.price)}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(asset);
          }}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
            isTopTier
              ? 'bg-white text-black hover:bg-zinc-200 active:scale-95 shadow-sm'
              : 'bg-white/[0.06] hover:bg-white text-secondary hover:text-black border border-white/[0.08]'
          }`}
        >
          <span>Ver Detalhes</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =========================================================================
          BOTTOM ACCENT 3D RIM (Top Tier gets the glowing accent rim, standard gets subtle line)
          ========================================================================= */}
      {isTopTier ? (
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-orange-500 to-amber-500" />
      ) : (
        <div className="h-0.5 w-full bg-white/[0.04]" />
      )}
    </div>
  );
};
