import React from 'react';
import { Search, X, Check, Zap, Shield, RotateCcw, SlidersHorizontal } from 'lucide-react';
import type { AssetCategory, AssetCurrency, AssetFilterState } from '../../types/asset';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export interface CategoryOption {
  key: 'all' | AssetCategory;
  label: string;
}

export const CATEGORIES: CategoryOption[] = [
  { key: 'all', label: 'Todos os Ativos' },
  { key: 'bm_br', label: 'BMs Brasil (BRL)' },
  { key: 'bm_usd', label: 'BMs Dólar / Euro' },
  { key: 'google_ads', label: 'Google Ads' },
  { key: 'bm_api', label: 'WhatsApp API' },
  { key: 'no_spend', label: 'Contingência / Pronta Entrega' },
  { key: 'proxy', label: 'Proxies Residenciais' },
];

export interface FilterBarProps {
  filters: AssetFilterState;
  onFilterChange: (newFilters: Partial<AssetFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalAllCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
  totalAllCount,
}) => {
  const isFiltered =
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.currency !== 'all' ||
    filters.spendRange !== 'all' ||
    filters.onlyAutomatic ||
    filters.onlyVerified ||
    filters.noDebtOnly;

  return (
    <div id="catalog" className="w-full space-y-4 pt-8">
      {/* Top Search & Filter Bar Control Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input with Clean Styling */}
        <div className="flex-1 max-w-xl">
          <Input
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Buscar por código (BM-BR-01), gasto alto, em dólar, sem dívida..."
            leftIcon={<Search className="w-4 h-4 text-secondary" />}
            rightIcon={
              filters.search ? (
                <button
                  onClick={() => onFilterChange({ search: '' })}
                  className="text-secondary hover:text-primary transition-colors p-1"
                  aria-label="Limpar busca"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-muted border border-white/[0.08]">
                  ⌘K
                </kbd>
              )
            }
          />
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-secondary">
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.07] backdrop-blur-md">
            Exibindo <strong className="text-primary font-bold">{totalFilteredCount}</strong> de {totalAllCount}
          </span>
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              className="text-xs text-secondary hover:text-primary rounded-lg"
            >
              Resetar
            </Button>
          )}
        </div>
      </div>

      {/* Segmented Control / Pill Tabs (Clean, refined rounded-xl dock) */}
      <div className="p-1 rounded-xl bg-[#121217]/90 border border-white/[0.08] backdrop-blur-md flex items-center gap-1 overflow-x-auto no-scrollbar shadow-inner">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onFilterChange({ category: cat.key })}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-accent-contrast text-accent-foreground font-semibold shadow-sm'
                  : 'text-secondary hover:text-primary hover:bg-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Fast Filters / Clean Controls */}
      <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
        {/* Currency Capsule Selector */}
        <div className="flex items-center gap-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-lg px-2 py-1">
          <span className="text-secondary text-[11px] font-mono mr-1">Moeda:</span>
          {(['all', 'BRL', 'USD', 'EUR'] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => onFilterChange({ currency: curr as 'all' | AssetCurrency })}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                filters.currency === curr
                  ? 'bg-accent-contrast text-accent-foreground font-bold shadow-sm'
                  : 'text-secondary hover:text-primary hover:bg-white/[0.04]'
              }`}
            >
              {curr === 'all' ? 'Todas' : curr}
            </button>
          ))}
        </div>

        {/* Spend Range Select */}
        <div className="flex items-center gap-1.5 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-lg px-2.5 py-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-secondary" />
          <span className="text-secondary text-[11px] font-mono">Gasto:</span>
          <select
            value={filters.spendRange}
            onChange={(e) =>
              onFilterChange({
                spendRange: e.target.value as AssetFilterState['spendRange'],
              })
            }
            className="bg-transparent text-primary text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="all" className="bg-[#121217] text-primary">Qualquer Histórico</option>
            <option value="zero" className="bg-[#121217] text-primary">Sem Gasto (R$ 0)</option>
            <option value="low" className="bg-[#121217] text-primary">Até R$ 20.000</option>
            <option value="medium" className="bg-[#121217] text-primary">R$ 20.000 a R$ 50.000</option>
            <option value="high" className="bg-[#121217] text-primary">Mais de R$ 50.000</option>
          </select>
        </div>

        {/* Quick Boolean Filters with Clean Low-Opacity Badges */}
        <button
          onClick={() => onFilterChange({ onlyAutomatic: !filters.onlyAutomatic })}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all cursor-pointer ${
            filters.onlyAutomatic
              ? 'bg-accent-lemon text-black font-semibold border-accent-lemon'
              : 'bg-white/[0.03] backdrop-blur-md border-white/[0.08] text-secondary hover:text-primary hover:border-white/[0.14]'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${filters.onlyAutomatic ? 'text-black' : 'text-accent-lemon'}`} />
          <span>Entrega Automática</span>
          {filters.onlyAutomatic && <Check className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        <button
          onClick={() => onFilterChange({ onlyVerified: !filters.onlyVerified })}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all cursor-pointer ${
            filters.onlyVerified
              ? 'bg-accent-emerald/15 text-accent-emerald font-medium border-accent-emerald/30'
              : 'bg-white/[0.03] backdrop-blur-md border-white/[0.08] text-secondary hover:text-primary hover:border-white/[0.14]'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-accent-emerald" />
          <span>Verificado (CNPJ/KYC)</span>
          {filters.onlyVerified && <Check className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        <button
          onClick={() => onFilterChange({ noDebtOnly: !filters.noDebtOnly })}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all cursor-pointer ${
            filters.noDebtOnly
              ? 'bg-accent-purple/15 text-accent-purple font-medium border-accent-purple/30'
              : 'bg-white/[0.03] backdrop-blur-md border-white/[0.08] text-secondary hover:text-primary hover:border-white/[0.14]'
          }`}
        >
          <span>Sem Dívida</span>
          {filters.noDebtOnly && <Check className="w-3.5 h-3.5 ml-0.5" />}
        </button>
      </div>
    </div>
  );
};
