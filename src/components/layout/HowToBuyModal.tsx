import React from 'react';
import { ShoppingBag, ShieldCheck, Zap, KeyRound, CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export interface HowToBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToBuyModal: React.FC<HowToBuyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Como Funciona a Compra no GB Ativos"
      subtitle="Processo automatizado, seguro e transparente do pedido à entrega."
      footer={
        <Button variant="primary" size="md" onClick={onClose} className="rounded-lg font-semibold">
          Entendido, explorar catálogo
        </Button>
      }
    >
      <div className="space-y-3">
        {/* Step 1 */}
        <div className="flex gap-3.5 p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <div className="w-7 h-7 rounded-md bg-accent-contrast text-accent-foreground font-mono font-bold flex items-center justify-center shrink-0 text-xs shadow-sm">
            1
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-semibold text-primary flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-accent-purple" />
              Selecione o Ativo Desejado
            </h4>
            <p className="text-xs text-secondary leading-relaxed">
              Navegue pelas categorias e utilize os filtros para selecionar o ativo que atende sua operação (BM com gasto consolidado, Google Ads, Proxy ou Contingência).
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-3.5 p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <div className="w-7 h-7 rounded-md bg-accent-contrast text-accent-foreground font-mono font-bold flex items-center justify-center shrink-0 text-xs shadow-sm">
            2
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-semibold text-primary flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" />
              Identificação & Checkout Seguro
            </h4>
            <p className="text-xs text-secondary leading-relaxed">
              Preencha seus dados cadastrais (Nome, CPF para nota, E-mail e WhatsApp). Não há saldo interno: cada compra gera uma cobrança individual.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-3.5 p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <div className="w-7 h-7 rounded-md bg-accent-contrast text-accent-foreground font-mono font-bold flex items-center justify-center shrink-0 text-xs shadow-sm">
            3
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-semibold text-primary flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent-lemon" />
              Pagamento Instantâneo
            </h4>
            <p className="text-xs text-secondary leading-relaxed">
              Pague via Pix (QR Code dinâmico com confirmação em até 10 segundos), Cartão de Crédito ou Criptoativos USDT.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex gap-3.5 p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <div className="w-7 h-7 rounded-md bg-accent-contrast text-accent-foreground font-mono font-bold flex items-center justify-center shrink-0 text-xs shadow-sm">
            4
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-semibold text-primary flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-accent-cyan" />
              Liberação Imediata dos Acessos
            </h4>
            <p className="text-xs text-secondary leading-relaxed">
              Para produtos de entrega automática, o link de convite da BM, cookies de sessão (JSON) e códigos 2FA são liberados diretamente na tela e enviados por e-mail com instruções passo a passo.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs text-secondary flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-accent-lemon shrink-0 mt-0.5" />
          <span>
            Precisa de um volume grande ou ativos sob medida? Fale diretamente com nossa equipe no WhatsApp para cotação personalizada.
          </span>
        </div>
      </div>
    </Modal>
  );
};
