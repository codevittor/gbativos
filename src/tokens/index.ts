/**
 * GB ATIVOS - DESIGN TOKENS
 * Definição centralizada de tokens semânticos, primitivos e acentos de cor.
 */

export const tokens = {
  colors: {
    bgCanvas: 'var(--bg-canvas)',
    bgSurface: 'var(--bg-surface)',
    bgSurfaceElevated: 'var(--bg-surface-elevated)',
    bgSurfaceHover: 'var(--bg-surface-hover)',
    bgSurfaceActive: 'var(--bg-surface-active)',
    bgSurfaceGlass: 'var(--bg-surface-glass)',
    bgInput: 'var(--bg-input)',
    bgPill: 'var(--bg-pill)',

    borderSubtle: 'var(--border-subtle)',
    borderGlass: 'var(--border-glass)',
    borderStrong: 'var(--border-strong)',
    borderGlow: 'var(--border-glow)',

    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    textMuted: 'var(--text-muted)',

    accentContrast: 'var(--accent-contrast)',
    accentContrastForeground: 'var(--accent-contrast-foreground)',

    // Accents
    accentPurple: 'var(--accent-purple)',
    accentLemon: 'var(--accent-lemon)',
    accentAmber: 'var(--accent-amber)',
    accentRose: 'var(--accent-rose)',
    accentEmerald: 'var(--accent-emerald)',
    accentCyan: 'var(--accent-cyan)',
  },
  radii: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    full: 'var(--radius-full)',
  },
  spacing: {
    1: 'var(--space-1)',
    2: 'var(--space-2)',
    3: 'var(--space-3)',
    4: 'var(--space-4)',
    5: 'var(--space-5)',
    6: 'var(--space-6)',
    7: 'var(--space-7)',
    8: 'var(--space-8)',
    10: 'var(--space-10)',
    12: 'var(--space-12)',
    14: 'var(--space-14)',
    16: 'var(--space-16)',
  },
  modals: {
    md: 'var(--modal-max-w-md)',
    lg: 'var(--modal-max-w-lg)',
    xl: 'var(--modal-max-w-xl)',
    '2xl': 'var(--modal-max-w-2xl)',
  },
} as const;

export type ThemeTokens = typeof tokens;
