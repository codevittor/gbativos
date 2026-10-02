import React from 'react';
import { ShieldCheck, Lock, ArrowUpRight } from 'lucide-react';

export interface FooterProps {
  onNavigateToCatalog?: () => void;
  onOpenHowToBuy?: () => void;
  onOpenWarranty?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToCatalog,
  onOpenHowToBuy,
  onOpenWarranty,
}) => {
  return (
    <footer className="w-full border-t border-border-subtle bg-surface/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-accent-contrast text-accent-foreground flex items-center justify-center font-mono font-bold text-sm">
                GB
              </div>
              <span className="font-bold text-base tracking-tight text-primary">
                GB ATIVOS
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Plataforma especializada no fornecimento de ativos digitais de alta tração para anunciantes, gestores de tráfego e agências de performance.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-muted">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                Segurança Ativa
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-primary" />
                LGPD Compliance
              </span>
            </div>
          </div>

          {/* Column 2: Navegação */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase text-primary tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => {
                    if (onNavigateToCatalog) {
                      e.preventDefault();
                      onNavigateToCatalog();
                    }
                  }}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  Catálogo Completo
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenHowToBuy}
                  className="text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  Como Funciona a Compra
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWarranty}
                  className="text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  Termos & Garantia de 24h
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Categorias */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase text-primary tracking-wider">
              Principais Ativos
            </h4>
            <ul className="space-y-2 text-xs text-secondary">
              <li>Business Managers Brasil (BRL)</li>
              <li>Business Managers USA / Global (USD)</li>
              <li>Contas Faturadas Google Ads</li>
              <li>WhatsApp Cloud API Oficial</li>
              <li>Proxies Residenciais Estáticos</li>
            </ul>
          </div>

          {/* Column 4: Atendimento & Parcerias */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase text-primary tracking-wider">
              Parcerias & Suporte
            </h4>
            <p className="text-xs text-secondary leading-relaxed">
              Atendimento executivo de segunda a sábado das 08h às 22h.
            </p>
            <div className="pt-1">
              <a
                href="https://wa.me/?text=Olá,%20gostaria%20de%20falar%20com%20o%20suporte%20do%20GB%20Ativos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
              >
                <span>Falar com o Operador no WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-10 mt-10 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted font-mono">
          <p>© {new Date().getFullYear()} GB Ativos. Todos os direitos reservados.</p>
          <p className="max-w-xl text-center sm:text-right leading-normal">
            Avisos Legais: GB Ativos é uma entidade independente e não possui vínculo direto, patrocínio ou afiliação oficial com Meta Platforms Inc. ou Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
};
