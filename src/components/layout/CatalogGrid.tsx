import React from 'react';
import { PackageX } from 'lucide-react';
import type { Asset } from '../../types/asset';
import { AssetCard } from './AssetCard';
import { Button } from '../ui/Button';

export interface CatalogGridProps {
  assets: Asset[];
  onSelectAsset: (asset: Asset) => void;
  onResetFilters: () => void;
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({
  assets,
  onSelectAsset,
  onResetFilters,
}) => {
  if (assets.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto px-4">
        <div className="w-12 h-12 rounded-full bg-surface border border-border-strong flex items-center justify-center mx-auto text-secondary">
          <PackageX className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-primary">Nenhum ativo encontrado</h3>
        <p className="text-sm text-secondary">
          Não encontramos nenhum ativo que coincida com a combinação de filtros ou termo pesquisado.
        </p>
        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={onResetFilters}>
            Limpar Todos os Filtros
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6 pt-6">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} onSelect={onSelectAsset} />
      ))}
    </div>
  );
};
