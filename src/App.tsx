import React, { useState, useMemo } from 'react';
import type { Asset, AssetFilterState } from './types/asset';
import { mockAssets } from './mocks/assets';
import {
  Header,
  Hero,
  FilterBar,
  CatalogGrid,
  AssetDetailsModal,
  HowToBuyModal,
  WarrantyModal,
  Footer,
} from './components/layout';

const initialFilters: AssetFilterState = {
  search: '',
  category: 'all',
  currency: 'all',
  spendRange: 'all',
  onlyAutomatic: false,
  onlyVerified: false,
  noDebtOnly: false,
};

export const App: React.FC = () => {
  const [filters, setFilters] = useState<AssetFilterState>(initialFilters);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isHowToBuyOpen, setIsHowToBuyOpen] = useState(false);
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);

  // Total stock count across all assets
  const totalStockCount = useMemo(() => {
    return mockAssets.reduce((acc, curr) => acc + curr.stock, 0);
  }, []);

  // Filter change helper
  const handleFilterChange = (newFilters: Partial<AssetFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  // Scroll to catalog section smoothly
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select asset to view details modal
  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  // Filtered Assets with intelligent search
  const filteredAssets = useMemo(() => {
    return mockAssets.filter((asset) => {
      // 1. Category Filter
      if (filters.category !== 'all' && asset.category !== filters.category) {
        return false;
      }

      // 2. Currency Filter
      if (filters.currency !== 'all' && asset.currency !== filters.currency) {
        return false;
      }

      // 3. Spend Range Filter
      if (filters.spendRange === 'zero' && asset.totalSpent > 0) {
        return false;
      }
      if (filters.spendRange === 'low' && (asset.totalSpent <= 0 || asset.totalSpent > 20000)) {
        return false;
      }
      if (
        filters.spendRange === 'medium' &&
        (asset.totalSpent <= 20000 || asset.totalSpent > 50000)
      ) {
        return false;
      }
      if (filters.spendRange === 'high' && asset.totalSpent <= 50000) {
        return false;
      }

      // 4. Boolean Flags
      if (filters.onlyAutomatic && asset.deliveryType !== 'automatic') {
        return false;
      }
      if (filters.onlyVerified && !asset.isVerified) {
        return false;
      }
      if (filters.noDebtOnly && asset.hasDebt) {
        return false;
      }

      // 5. Intelligent Search Query Parsing
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();

        // Intelligent keyword interpretations
        if (query === 'gasto alto' || query === 'alto gasto') {
          return asset.totalSpent >= 50000;
        }
        if (query === 'sem dívida' || query === 'sem divida' || query === 'limpo') {
          return !asset.hasDebt;
        }
        if (query === 'com dívida' || query === 'com divida' || query === 'divida') {
          return asset.hasDebt;
        }
        if (query === 'em dólar' || query === 'em dolar' || query === 'dolar' || query === 'usd') {
          return asset.currency === 'USD';
        }
        if (query === 'em euro' || query === 'euro' || query === 'eur') {
          return asset.currency === 'EUR';
        }
        if (query === 'em real' || query === 'real' || query === 'brl' || query === 'brasil') {
          return asset.currency === 'BRL';
        }
        if (query === 'verificada' || query === 'verificado' || query === 'cnpj' || query === 'kyc') {
          return asset.isVerified;
        }
        if (query === 'automática' || query === 'automatica' || query === 'instantaneo' || query === '24/7') {
          return asset.deliveryType === 'automatic';
        }

        // Standard text search across fields
        const matchTitle = asset.title.toLowerCase().includes(query);
        const matchCode = asset.code.toLowerCase().includes(query);
        const matchDescription = asset.description.toLowerCase().includes(query);
        const matchFeatures = asset.features.some((f) => f.toLowerCase().includes(query));
        const matchDailyLimit = asset.dailyLimit.toLowerCase().includes(query);
        const matchYear = asset.creationYear.toString().includes(query);

        return (
          matchTitle ||
          matchCode ||
          matchDescription ||
          matchFeatures ||
          matchDailyLimit ||
          matchYear
        );
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-canvas text-primary flex flex-col relative overflow-x-clip">
      {/* Background Image Layer Behind Header & Hero Section */}
      <div className="absolute top-0 left-0 right-0 h-[680px] sm:h-[760px] lg:h-[820px] pointer-events-none z-0 overflow-hidden">
        <img
          src="/hero-bg.png"
          alt=""
          className="w-full h-full object-cover object-top opacity-60 mix-blend-screen select-none scale-105"
        />
        {/* Gradients ensuring perfect text contrast and seamless fade into catalog canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-canvas" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/75 via-transparent to-canvas/75" />
      </div>

      {/* Top Header */}
      <Header
        totalStockCount={totalStockCount}
        onNavigateToCatalog={scrollToCatalog}
        onOpenHowToBuy={() => setIsHowToBuyOpen(true)}
        onOpenWarranty={() => setIsWarrantyOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 pt-16">
        {/* Hero Section */}
        <Hero
          onScrollToCatalog={scrollToCatalog}
          onOpenWarrantyModal={() => setIsWarrantyOpen(true)}
        />

        {/* Catalog Showcase Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Filter Bar with Smart Search & Category Pills */}
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalFilteredCount={filteredAssets.length}
            totalAllCount={mockAssets.length}
          />

          {/* Catalog Grid */}
          <CatalogGrid
            assets={filteredAssets}
            onSelectAsset={handleSelectAsset}
            onResetFilters={handleResetFilters}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onNavigateToCatalog={scrollToCatalog}
        onOpenHowToBuy={() => setIsHowToBuyOpen(true)}
        onOpenWarranty={() => setIsWarrantyOpen(true)}
      />

      {/* Modals */}
      <AssetDetailsModal
        asset={selectedAsset}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <HowToBuyModal
        isOpen={isHowToBuyOpen}
        onClose={() => setIsHowToBuyOpen(false)}
      />

      <WarrantyModal
        isOpen={isWarrantyOpen}
        onClose={() => setIsWarrantyOpen(false)}
      />
    </div>
  );
};

export default App;
