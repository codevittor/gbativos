import React from 'react';
import { ShieldAlert, ShieldCheck, CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export interface WarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WarrantyModal: React.FC<WarrantyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Termos de Garantia & Procedimentos"
      subtitle="Regras transparentes para proteção e segurança da sua operação de tráfego."
      footer={
        <Button variant="primary" size="md" onClick={onClose} className="rounded-lg font-semibold">
          Compreendi as condições
        </Button>
      }
    >
      <div className="space-y-3">
        {/* Coverage Highlights */}
        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
          <div className="p-1.5 rounded-md bg-accent-amber/10 text-accent-amber shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-primary">Prazo de Garantia de 24 Horas</h4>
            <p className="text-xs text-secondary mt-0.5 leading-relaxed">
              Você possui até 24 horas a partir da entrega para realizar o primeiro login no perfil/BM e validar que o ativo está exatamente conforme anunciado (gastos, limites, verificação e ausência de restrições prévias).
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
          <div className="p-1.5 rounded-md bg-accent-emerald/10 text-accent-emerald shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-primary">Cobertura de Substituição Imediata</h4>
            <p className="text-xs text-secondary mt-0.5 leading-relaxed">
              Se o ativo apresentar qualquer restrição imposta pela plataforma antes do seu primeiro anúncio ser submetido, realizamos a substituição imediata por outro ativo de calibre igual ou superior.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
          <div className="p-1.5 rounded-md bg-accent-purple/10 text-accent-purple shrink-0 mt-0.5">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-primary">Boas Práticas & Limitações da Garantia</h4>
            <p className="text-xs text-secondary mt-0.5 leading-relaxed">
              A garantia não cobre bloqueios decorrentes de criativos reprovados por violação de políticas de anúncio da Meta/Google (nicho black não camuflado), uso de proxies sujos ou alteração brusca de dados fundamentais sem o período de aquecimento recomendado.
            </p>
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-2">
          <h5 className="text-[11px] font-mono font-semibold uppercase text-primary">
            Procedimento Obrigatório de Acesso:
          </h5>
          <ul className="space-y-1.5 text-xs text-secondary">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
              Utilizar navegador antidetect isolado (Dolphin, AdsPower, Incogniton ou GoLogin).
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
              Conectar com Proxy residencial do mesmo país da conta.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
              Importar cookies de sessão fornecidos no pacote de entrega.
            </li>
          </ul>
        </div>

        <div className="text-xs text-secondary flex items-center gap-2 pl-1 pt-1">
          <HelpCircle className="w-4 h-4 text-muted" />
          <span>Dúvidas ou suporte emergencial? Nosso canal direto está disponível das 08h às 22h.</span>
        </div>
      </div>
    </Modal>
  );
};
