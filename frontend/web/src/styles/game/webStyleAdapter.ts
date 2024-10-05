import { SharedStyles, sharedStyles, Style } from '../../shared/styles/sharedStyles'

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
export const getWebStyles = (): SharedStyles => {
  const webStyles: Partial<SharedStyles> = {
    colors: sharedStyles.colors,
  };

  (Object.keys(sharedStyles) as Array<keyof SharedStyles>).forEach((key) => {
    if (key !== 'colors') {
      webStyles[key] = {} as any;
      Object.entries(sharedStyles[key]).forEach(([subKey, subValue]) => {
        (webStyles[key] as any)[subKey] = convertToCSSStyle(subValue as Style);
      });
    }
  });

  return webStyles as SharedStyles;
};