import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  size?: 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  size = 'lg',
  children,
  footer,
}) => {
  // Lock body scroll on modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    md: 'max-w-modal-md',
    lg: 'max-w-modal-lg',
    xl: 'max-w-modal-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Deep Frosted Glass Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Window with Glassmorphism */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${sizeClasses[size]} bg-[#121217]/95 backdrop-blur-2xl border border-white/[0.10] rounded-xl shadow-2xl overflow-hidden z-10 my-8 transition-all animate-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between p-6 border-b border-border-subtle bg-white/[0.02]">
            <div className="space-y-1.5 pr-6">
              {badge && <div className="mb-2">{badge}</div>}
              {title && (
                <h3 className="text-lg sm:text-xl font-bold text-primary tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-secondary leading-relaxed">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-secondary hover:text-primary p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-border-subtle transition-all cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* If no header, floating close button */}
        {!title && !subtitle && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-secondary hover:text-primary p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-border-subtle transition-all cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-5 border-t border-border-subtle bg-white/[0.02] backdrop-blur-md">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
