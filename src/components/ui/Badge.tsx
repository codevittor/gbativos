import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'outline'
    | 'contrast'
    | 'verified'
    | 'delivery'
    | 'currency'
    | 'blue'
    | 'orange'
    | 'lemon'
    | 'purple'
    | 'amber'
    | 'emerald'
    | 'cyan'
    | 'glass';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  icon,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center font-medium select-none tracking-tight transition-all';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] rounded-full gap-1',
    md: 'px-2.5 py-1 text-xs rounded-full gap-1.5',
  };

  const variantClasses = {
    default: 'bg-surface-elevated text-secondary border border-border-subtle',
    outline: 'bg-transparent text-primary border border-border-strong',
    contrast: 'bg-accent-contrast text-accent-foreground font-semibold shadow-sm',
    verified: 'bg-accent-blue/15 text-accent-blue-light border border-accent-blue/30 font-mono',
    delivery: 'bg-surface-hover text-primary border border-border-subtle',
    currency: 'bg-surface-elevated text-primary font-mono border border-border-subtle',
    blue: 'bg-accent-blue/15 text-accent-blue-light border border-accent-blue/30 font-medium',
    orange: 'bg-accent-orange/15 text-accent-orange-light border border-accent-orange/30 font-medium',
    lemon: 'bg-accent-lemon text-black font-bold uppercase tracking-wider shadow-sm',
    purple: 'bg-accent-purple/15 text-accent-purple border border-accent-purple/30 font-medium',
    amber: 'bg-accent-amber/15 text-accent-amber border border-accent-amber/30 font-medium',
    emerald: 'bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30 font-medium',
    cyan: 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 font-medium',
    glass: 'bg-white/[0.06] backdrop-blur-md text-primary border border-white/[0.12]',
  };

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
