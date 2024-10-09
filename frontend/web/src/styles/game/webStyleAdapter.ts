import { UseTheme } from 'shared/components/ThemeContext';
import { SharedStyles, sharedStyles, Style, ColorScheme } from '../../shared/styles/sharedStyles';

// Convert shared style to CSS-in-JS style
const convertToCSSStyle = (style: Style): React.CSSProperties => {
  const cssStyle: Record<string, any> = {};
  Object.entries(style).forEach(([key, value]) => {
    if (key === 'flexDirection') {
      cssStyle.display = 'flex';
    }
    cssStyle[key] = value;
  });
  return cssStyle as React.CSSProperties;
};

// Process shared styles for web
export const getWebStyles = (): SharedStyles & { currentTheme: ColorScheme }=> {
  const { theme } = UseTheme();

  const webStyles: SharedStyles = {
    ...sharedStyles,
    colors: {
      light: sharedStyles.colors.light,
      dark: sharedStyles.colors.dark
    }
  };

  (Object.keys(sharedStyles) as Array<keyof SharedStyles>).forEach((key) => {
    if (key !== 'colors') {
      webStyles[key] = {} as any;
      Object.entries(sharedStyles[key]).forEach(([subKey, subValue]) => {
        (webStyles[key] as any)[subKey] = convertToCSSStyle(subValue as Style);
      });
    }
  });

  const currentTheme = webStyles.colors[theme];

  return {
    ...webStyles,
    currentTheme
  };
};