import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill' | 'outline' | 'glass' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-all duration-150 select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer';

    // Variant classes consuming tokenized Tailwind classes
    const variantClasses = {
      primary:
        'bg-accent-contrast text-accent-foreground font-semibold hover:opacity-90 active:scale-[0.98] shadow-sm',
      secondary:
        'bg-surface-elevated text-primary border border-border-subtle hover:bg-surface-hover hover:border-border-glass active:scale-[0.98]',
      ghost:
        'bg-transparent text-secondary hover:text-primary hover:bg-white/[0.05] active:scale-[0.98]',
      pill:
        'bg-pill text-secondary border border-border-subtle rounded-full hover:text-primary hover:border-border-glass active:scale-[0.98]',
      outline:
        'bg-transparent text-primary border border-border-strong hover:bg-white/[0.05] hover:border-accent-contrast active:scale-[0.98]',
      glass:
        'bg-white/[0.06] backdrop-blur-xl text-primary border border-white/[0.12] hover:bg-white/[0.10] active:scale-[0.98]',
      purple:
        'bg-accent-purple text-white font-semibold hover:opacity-90 shadow-glow-purple active:scale-[0.98]',
    };

    // Size classes with smooth organic radii
    const sizeClasses = {
      sm: variant === 'pill' ? 'px-3 py-1.5 text-xs gap-1.5' : 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
      md: variant === 'pill' ? 'px-4 py-2 text-sm gap-2' : 'px-4 py-2 text-sm rounded-xl gap-2',
      lg: variant === 'pill' ? 'px-6 py-2.5 text-base gap-2.5' : 'px-5 py-2.5 text-base rounded-xl gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
