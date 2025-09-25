// Tipos para el sistema de diseño de Doctor Veritatis

export type Breakpoint = keyof typeof import('../constants/design').BREAKPOINTS;
export type ZIndex = keyof typeof import('../constants/design').Z_INDEX;
export type Transition = keyof typeof import('../constants/design').TRANSITIONS;
export type Spacing = keyof typeof import('../constants/design').SPACING;
export type BorderRadius = keyof typeof import('../constants/design').BORDER_RADIUS;
export type Shadow = keyof typeof import('../constants/design').SHADOWS;

// Tipos de componentes
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption' | 'lead';
export type TypographyColor = 'primary' | 'secondary' | 'muted' | 'white' | 'error' | 'success' | 'warning';
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TypographyAlign = 'left' | 'center' | 'right';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type SeparatorOrientation = 'horizontal' | 'vertical';

// Tipos de utilidades
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

// Tipos de tema
export type ThemeMode = 'light' | 'dark' | 'auto';
export type ColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Tipos de animación
export type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';
export type AnimationDirection = 'in' | 'out' | 'in-out';
export type AnimationDuration = 'fast' | 'normal' | 'slow';

// Tipos de layout
export type LayoutType = 'default' | 'sidebar' | 'fullscreen' | 'modal';
export type SidebarPosition = 'left' | 'right';
export type SidebarBehavior = 'overlay' | 'push' | 'fixed';

// Tipos de responsive
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;
export type ResponsiveProps<T> = {
  [K in keyof T]: ResponsiveValue<T[K]>;
};

// Tipos de utilidades de clase
export type ClassName = string | string[] | Record<string, boolean> | undefined;
export type ClassNames = ClassName | ClassName[];

// Tipos de props base
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

// Tipos de props de accesibilidad
export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  role?: string;
  tabIndex?: number;
}

// Tipos de props de interacción
export interface InteractionProps {
  onClick?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
}

// Tipos de props de formulario
export interface FormProps {
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

// Tipos de props de validación
export interface ValidationProps {
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
  successMessage?: string;
  warning?: boolean;
  warningMessage?: string;
}
