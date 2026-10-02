import type { AssetCategory, AssetCurrency } from '../types/asset';

export const formatCurrency = (amount: number, currency: AssetCurrency = 'BRL'): string => {
  if (currency === 'BRL') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  if (currency === 'EUR') {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return `${amount}`;
};

export const formatPriceBRL = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
};

export const getCategoryLabel = (category: AssetCategory): string => {
  const map: Record<AssetCategory, string> = {
    bm_br: 'BM Brasil',
    bm_usd: 'BM Global',
    google_ads: 'Google Ads',
    bm_api: 'WhatsApp API',
    no_spend: 'Contingência',
    proxy: 'Proxy Residencial',
    profiles: 'Perfis Farmados',
  };
  return map[category] || category;
};
