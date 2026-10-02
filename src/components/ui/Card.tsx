import React, { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'featured';
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'glass',
      interactive = false,
      padding = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-6',
    };

    const variantClasses = {
      default: 'bg-surface border border-border-subtle rounded-xl text-primary',
      glass: 'glass-card rounded-xl text-primary',
      featured: 'glass-card-featured rounded-xl text-primary',
    };

    const interactiveClasses = interactive
      ? 'cursor-pointer hover:border-border-strong hover:-translate-y-1 transition-all duration-150 active:scale-[0.99]'
      : '';

    return (
      <div
        ref={ref}
        className={`${variantClasses[variant]} ${paddingClasses[padding]} ${interactiveClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
