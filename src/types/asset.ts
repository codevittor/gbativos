/**
 * Contratos de Dados - Ativos do GB Ativos
 * Modelagem estrita das entidades de ativos e catálogos.
 */

export type AssetCategory =
  | 'bm_br'
  | 'bm_usd'
  | 'google_ads'
  | 'bm_api'
  | 'no_spend'
  | 'proxy'
  | 'profiles';

export type AssetCurrency = 'BRL' | 'USD' | 'EUR';

export type DeliveryType = 'automatic' | 'whatsapp';

export interface Asset {
  id: string;
  code: string; // Ex: BM-BR-01, GADS-USD-04
  title: string;
  category: AssetCategory;
  currency: AssetCurrency;
  totalSpent: number;
  creationYear: number;
  accountsCount: number;
  dailyLimit: string;
  isVerified: boolean;
  hasDebt: boolean;
  isPrepaid: boolean;
  deliveryType: DeliveryType;
  price: number;
  stock: number;
  description: string;
  features: string[];
}

export interface AssetCategoryOption {
  key: 'all' | AssetCategory;
  label: string;
  count?: number;
}

export interface AssetFilterState {
  search: string;
  category: 'all' | AssetCategory;
  currency: 'all' | AssetCurrency;
  spendRange: 'all' | 'zero' | 'low' | 'medium' | 'high'; // low: <10k, med: 10k-50k, high: >50k
  onlyAutomatic: boolean;
  onlyVerified: boolean;
  noDebtOnly: boolean;
}
