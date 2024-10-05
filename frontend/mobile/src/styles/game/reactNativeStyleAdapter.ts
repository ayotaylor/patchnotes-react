import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { SharedStyles, sharedStyles, Style } from '../../shared/styles/sharedStyles'

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type StyleSheetType = ReturnType<typeof StyleSheet.create>;

type ProcessedStyles = {
  [K in keyof SharedStyles]: K extends 'colors'
    ? SharedStyles[K]
    : StyleSheetType;
};

// Process shared styles for React Native
export const getReactNativeStyles = (): ProcessedStyles => {
  const rnStyles = { ...sharedStyles } as unknown as ProcessedStyles;

  (Object.keys(sharedStyles) as Array<keyof SharedStyles>).forEach((key) => {
    if (key !== 'colors') {
      rnStyles[key] = StyleSheet.create(sharedStyles[key] as NamedStyles<any>);
    }
  });

  return rnStyles;
};