import React, { useState } from 'react';
import {
  Zap,
  MessageCircle,
  CheckCircle2,
  Calendar,
  Layers,
  Coins,
  CreditCard,
  AlertTriangle,
  Lock,
  ArrowRight,
  ExternalLink,
  Check,
} from 'lucide-react';
import type { Asset } from '../../types/asset';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrency, formatPriceBRL, getCategoryLabel } from '../../utils/formatters';

export interface AssetDetailsModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  onInitiateCheckout?: (asset: Asset) => void;
}

export const AssetDetailsModal: React.FC<AssetDetailsModalProps> = ({
  asset,
  isOpen,
  onClose,
  onInitiateCheckout,
}) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'warranty'>('specs');

  if (!asset) return null;

  const handleCheckoutClick = () => {
    if (asset.deliveryType === 'whatsapp') {
      const msg = encodeURIComponent(
        `Olá GB Ativos! Tenho interesse no ativo [${asset.code}] - ${asset.title}. Poderia me atender?`
      );
      window.open(`https://wa.me/?text=${msg}`, '_blank');
      return;
    }

    if (onInitiateCheckout) {
      onInitiateCheckout(asset);
    } else {
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
      }, 4000);
    }
  };

  const whatsappMessageUrl = `https://wa.me/?text=${encodeURIComponent(
    `Olá GB Ativos! Tenho interesse no ativo [${asset.code}] - ${asset.title}. Poderia me atender?`
  )}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      badge={
        <div className="flex items-center gap-1.5">
          <Badge variant="lemon" size="sm">
            {asset.code}
          </Badge>
          <Badge variant="purple" size="sm">
            {getCategoryLabel(asset.category)}
          </Badge>
          {asset.deliveryType === 'automatic' ? (
            <Badge variant="default" size="sm" icon={<Zap className="w-3 h-3 text-accent-lemon" />}>
              24/7 Auto
            </Badge>
          ) : (
            <Badge variant="default" size="sm" icon={<MessageCircle className="w-3 h-3 text-secondary" />} >
              WhatsApp
            </Badge>
          )}
        </div>
      }
      title={asset.title}
      subtitle={`Moeda nativa: ${asset.currency} • Criada no ano ${asset.creationYear} • ${asset.stock} unidade(s) disponível(is)`}
      footer={
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
          <div className="flex items-center gap-3">
            <div className="text-left">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                Valor do Ativo
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-primary">
                {formatPriceBRL(asset.price)}
              </span>
            </div>
            <span className="text-xs text-secondary hidden sm:inline font-mono">
              (Pix • USDT • Cartão)
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="ghost" size="md" onClick={onClose} className="w-1/3 sm:w-auto rounded-lg">
              Voltar
            </Button>

            {asset.deliveryType === 'automatic' ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleCheckoutClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-2/3 sm:w-auto font-semibold rounded-lg"
              >
                Comprar Agora
              </Button>
            ) : (
              <a
                href={whatsappMessageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-2/3 sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                  className="w-full font-semibold rounded-lg"
                >
                  Negociar no WhatsApp
                </Button>
              </a>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Notice of simulated checkout */}
        {checkoutSuccess && (
          <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Simulação de pedido ativada para {asset.code}! Na etapa de pagamentos integraremos o QR Code Pix e webhook de baixa automática.
            </span>
          </div>
        )}

        {/* Action Tabs */}
        <div className="p-1 rounded-lg bg-black/40 border border-white/[0.08] backdrop-blur-md flex items-center gap-1">
          <button
            onClick={() => setActiveTab('specs')}
            className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-accent-contrast text-accent-foreground font-semibold shadow-sm'
                : 'text-secondary hover:text-primary hover:bg-white/[0.04]'
            }`}
          >
            Ficha Técnica
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'features'
                ? 'bg-accent-contrast text-accent-foreground font-semibold shadow-sm'
                : 'text-secondary hover:text-primary hover:bg-white/[0.04]'
            }`}
          >
            Recursos Inclusos ({asset.features.length})
          </button>
          <button
            onClick={() => setActiveTab('warranty')}
            className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'warranty'
                ? 'bg-accent-contrast text-accent-foreground font-semibold shadow-sm'
                : 'text-secondary hover:text-primary hover:bg-white/[0.04]'
            }`}
          >
            Garantia 24h
          </button>
        </div>

        {/* Description Callout */}
        <div className="text-xs sm:text-sm text-secondary leading-relaxed bg-white/[0.02] p-3.5 rounded-lg border border-white/[0.06]">
          {asset.description}
        </div>

        {/* Tab 1: Ficha Técnica */}
        {activeTab === 'specs' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {/* Total Spent */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[11px] font-mono text-secondary flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-accent-amber" />
                  Gasto Acumulado
                </span>
                <p className="text-base font-bold font-mono text-primary mt-1">
                  {asset.totalSpent > 0
                    ? formatCurrency(asset.totalSpent, asset.currency)
                    : 'R$ 0,00 (Sem gasto)'}
                </p>
              </div>

              {/* Daily Limit */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[11px] font-mono text-secondary flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-accent-cyan" />
                  Limite Diário
                </span>
                <p className="text-base font-bold font-mono text-primary mt-1 truncate">
                  {asset.dailyLimit}
                </p>
              </div>

              {/* Accounts Count */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[11px] font-mono text-secondary flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-accent-purple" />
                  Contas de Anúncio
                </span>
                <p className="text-base font-bold font-mono text-primary mt-1">
                  {asset.accountsCount} {asset.accountsCount === 1 ? 'Conta' : 'Contas'}
                </p>
              </div>

              {/* Creation Year */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[11px] font-mono text-secondary flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  Ano de Criação
                </span>
                <p className="text-base font-bold font-mono text-primary mt-1">
                  {asset.creationYear}
                </p>
              </div>

              {/* Payment Method */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[11px] font-mono text-secondary flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-secondary" />
                  Cobrança
                </span>
                <p className="text-base font-bold font-mono text-primary mt-1">
                  {asset.isPrepaid ? 'Pré-Pago' : 'Pós-Pago'}
                </p>
              </div>

              {/* Debt Status */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[11px] font-mono text-secondary flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Status Financeiro
                </span>
                <p
                  className={`text-base font-bold font-mono mt-1 ${
                    asset.hasDebt ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {asset.hasDebt ? 'Com Fatura' : 'Zero Dívida'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Recursos Inclusos */}
        {activeTab === 'features' && (
          <div className="space-y-2 animate-in fade-in duration-150">
            {asset.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs sm:text-sm text-primary"
              >
                <div className="p-0.5 rounded text-accent-emerald shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Termo de Garantia 24h */}
        {activeTab === 'warranty' && (
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2.5 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Lock className="w-4 h-4 text-accent-purple" />
              <span>Garantia de 24 Horas para Primeiro Login</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Você tem 24h a partir da entrega para acessar o ativo em seu navegador antidetect (Dolphin, AdsPower, etc.) com o proxy correspondente. Caso identifique qualquer divergência de faturamento, limite ou restrição prévia anterior à vinculação de campanhas, a substituição é garantida e imediata.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
