export interface ThemeColors {
  primary: {
    light: string;
    main: string;
    dark: string;
    contrast: string;
  };
  secondary: {
    light: string;
    main: string;
    dark: string;
    contrast: string;
  };
  background: {
    main: string;
    paper: string;
    card: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  border: {
    light: string;
    main: string;
    dark: string;
  };
  status: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
}

export interface ThemeSpacing {
  xs: number;   // 4
  sm: number;   // 8
  md: number;   // 16
  lg: number;   // 24
  xl: number;   // 32
  xxl: number;  // 48
}

export interface ThemeBreakpoints {
  xs: number;   // 0
  sm: number;   // 640
  md: number;   // 768
  lg: number;   // 1024
  xl: number;   // 1280
  xxl: number;  // 1536
}

export interface ThemeTypography {
  fontFamily: {
    sans: string;
    mono: string;
    display: string;
  };
  fontSize: {
    xs: number;   // 12
    sm: number;   // 14
    md: number;   // 16
    lg: number;   // 18
    xl: number;   // 20
    xxl: number;  // 24
    display: number;  // 32
  };
  fontWeight: {
    light: number;    // 300
    regular: number;  // 400
    medium: number;   // 500
    semibold: number; // 600
    bold: number;     // 700
  };
  lineHeight: {
    tight: number;    // 1.25
    normal: number;   // 1.5
    relaxed: number;  // 1.75
  };
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeBorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  breakpoints: ThemeBreakpoints;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  borderRadius: ThemeBorderRadius;
  isDark: boolean;
}