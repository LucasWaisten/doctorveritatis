// Configuración del sistema de diseño para Doctor Veritatis

import { BREAKPOINTS, Z_INDEX, TRANSITIONS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY, COLORS } from '../constants/design';

export const DESIGN_CONFIG = {
  breakpoints: BREAKPOINTS,
  zIndex: Z_INDEX,
  transitions: TRANSITIONS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  typography: TYPOGRAPHY,
  colors: COLORS,
} as const;

export const COMPONENT_CONFIG = {
  button: {
    defaultVariant: 'primary' as const,
    defaultSize: 'md' as const,
    disabledOpacity: 0.5,
    loadingSpinnerSize: {
      xs: 'w-3 h-3',
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-4 h-4',
      xl: 'w-5 h-5',
    },
  },
  card: {
    defaultVariant: 'default' as const,
    defaultPadding: 'md' as const,
    hoverElevation: true,
  },
  badge: {
    defaultVariant: 'default' as const,
    defaultSize: 'md' as const,
  },
  typography: {
    defaultVariant: 'body' as const,
    defaultColor: 'primary' as const,
    defaultWeight: 'normal' as const,
    defaultAlign: 'left' as const,
  },
  container: {
    defaultSize: 'lg' as const,
    defaultPadding: 'md' as const,
    maxWidths: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      full: '100%',
    },
  },
  sidebar: {
    defaultOpen: true,
    mobileDefaultOpen: false,
    breakpoint: 768,
    zIndex: Z_INDEX.fixed,
    transitionDuration: TRANSITIONS.normal,
  },
} as const;

export const THEME_CONFIG = {
  light: {
    background: '#ffffff',
    foreground: '#171717',
    primary: COLORS.primary[600],
    secondary: COLORS.gray[600],
    muted: COLORS.gray[500],
    accent: COLORS.primary[100],
    border: COLORS.gray[200],
    input: COLORS.gray[200],
    ring: COLORS.primary[500],
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#ededed',
    primary: COLORS.primary[500],
    secondary: COLORS.gray[400],
    muted: COLORS.gray[400],
    accent: COLORS.primary[900],
    border: COLORS.gray[800],
    input: COLORS.gray[800],
    ring: COLORS.primary[500],
  },
} as const;

export const ANIMATION_CONFIG = {
  durations: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easings: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    cubicBezier: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    slideInUp: {
      from: { transform: 'translateY(10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideInDown: {
      from: { transform: 'translateY(-10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideInLeft: {
      from: { transform: 'translateX(-10px)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
    slideInRight: {
      from: { transform: 'translateX(10px)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
    scaleIn: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    scaleOut: {
      from: { transform: 'scale(1)', opacity: 1 },
      to: { transform: 'scale(0.95)', opacity: 0 },
    },
  },
} as const;

export const ACCESSIBILITY_CONFIG = {
  focusRing: {
    width: '2px',
    style: 'solid',
    color: COLORS.primary[500],
    offset: '2px',
  },
  reducedMotion: {
    respect: true,
    fallback: 'none',
  },
  highContrast: {
    support: true,
    forcedColors: 'active',
  },
  screenReader: {
    srOnly: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0',
    },
  },
} as const;

export const RESPONSIVE_CONFIG = {
  breakpoints: BREAKPOINTS,
  containerQueries: true,
  fluidTypography: true,
  fluidSpacing: true,
  mobileFirst: true,
} as const;
