import { Theme } from '../theme/types';

export interface TailwindConfig {
  content: string[];
  theme: {
    extend: {
      colors: Record<string, string>;
      spacing: Record<string, string | number>;
      fontFamily: Record<string, string[]>;
      fontSize: Record<string, [string, { lineHeight: string }]>;
      borderRadius: Record<string, string>;
      boxShadow: Record<string, string>;
      screens: Record<string, string>;
      animation: Record<string, string>;
      keyframes: Record<string, Record<string, Record<string, string>>>;
    };
  };
  plugins: any[];
}
