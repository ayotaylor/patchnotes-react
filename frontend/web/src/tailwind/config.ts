import { Theme } from '../theme/types';
import { TailwindConfig } from './types';

function createColorVariables(colors: Theme['colors']): Record<string, string> {
  const flattenColors = (
    obj: Record<string, any>,
    prefix: string = ''
  ): Record<string, string> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'string') {
        acc[newKey] = value;
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(acc, flattenColors(value, newKey));
      }
      return acc;
    }, {} as Record<string, string>);
  };

  return flattenColors(colors);
}

function createSpacingVariables(spacing: Theme['spacing']): Record<string, string | number> {
  return Object.entries(spacing).reduce((acc, [key, value]) => {
    acc[key] = value + 'px';
    // Add numeric values for arbitrary values
    acc[value.toString()] = value + 'px';
    return acc;
  }, {} as Record<string, string | number>);
}

function createFontConfig(theme: Theme) {
  const { typography } = theme;

  const fontSize = Object.entries(typography.fontSize).reduce((acc, [key, value]) => {
    acc[key] = [
      `${value}px`,
      { lineHeight: `${value * typography.lineHeight.normal}px` }
    ];
    return acc;
  }, {} as Record<string, [string, { lineHeight: string }]>);

  const fontFamily = Object.entries(typography.fontFamily).reduce((acc, [key, value]) => {
    acc[key] = value.split(', ');
    return acc;
  }, {} as Record<string, string[]>);

  return { fontSize, fontFamily };
}

export function createTailwindConfig(theme: Theme): TailwindConfig {
  const { fontSize, fontFamily } = createFontConfig(theme);

  const config: TailwindConfig = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html'
    ],
    theme: {
      extend: {
        colors: createColorVariables(theme.colors),
        spacing: createSpacingVariables(theme.spacing),
        fontFamily,
        fontSize,
        borderRadius: {
          'none': '0',
          'sm': `${theme.borderRadius.sm}px`,
          'md': `${theme.borderRadius.md}px`,
          'lg': `${theme.borderRadius.lg}px`,
          'xl': `${theme.borderRadius.xl}px`,
          'full': `${theme.borderRadius.full}px`,
        },
        boxShadow: {
          'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        },
        screens: {
          'sm': `${theme.breakpoints.sm}px`,
          'md': `${theme.breakpoints.md}px`,
          'lg': `${theme.breakpoints.lg}px`,
          'xl': `${theme.breakpoints.xl}px`,
          '2xl': `${theme.breakpoints.xxl}px`,
        },
        animation: {
          'fade-in': 'fadeIn 0.3s ease-in-out',
          'slide-up': 'slideUp 0.4s ease-out',
          'slide-down': 'slideDown 0.4s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  };

  return config;
}