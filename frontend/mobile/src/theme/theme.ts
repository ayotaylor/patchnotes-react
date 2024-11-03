import { Theme } from './types';

const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },
  // borderRadius: {
  //   none: 0,
  //   sm: 4,    // 0.25rem equivalent
  //   md: 6,    // 0.375rem equivalent
  //   lg: 8,    // 0.5rem equivalent
  //   xl: 12,   // 0.75rem equivalent
  //   full: 9999, // Effectively creates a fully rounded element
  // },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      display: 'Montserrat, Inter, system-ui, sans-serif',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      display: 32,
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
};

export const lightTheme: Theme = {
  ...baseTheme,
  colors: {
    primary: {
      light: '#4ADE80',
      main: '#10B981',
      dark: '#059669',
      contrast: '#FFFFFF',
    },
    secondary: {
      light: '#A78BFA',
      main: '#8B5CF6',
      dark: '#7C3AED',
      contrast: '#FFFFFF',
    },
    background: {
      main: '#FFFFFF',
      paper: '#F9FAFB',
      card: '#F3F4F6',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      disabled: '#9CA3AF',
      inverse: '#FFFFFF',
    },
    border: {
      light: '#E5E7EB',
      main: '#D1D5DB',
      dark: '#9CA3AF',
    },
    status: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
    },
  },
  isDark: false,
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    primary: {
      light: '#4ADE80',
      main: '#10B981',
      dark: '#059669',
      contrast: '#FFFFFF',
    },
    secondary: {
      light: '#A78BFA',
      main: '#8B5CF6',
      dark: '#7C3AED',
      contrast: '#FFFFFF',
    },
    background: {
      main: '#111827',
      paper: '#1F2937',
      card: '#374151',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      disabled: '#6B7280',
      inverse: '#111827',
    },
    border: {
      light: '#374151',
      main: '#4B5563',
      dark: '#6B7280',
    },
    status: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
    },
  },
  isDark: true,
};