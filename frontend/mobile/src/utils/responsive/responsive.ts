import { Dimensions, ScaledSize } from 'react-native';
import { ResponsiveValue, ResponsiveInfo, BreakpointKey } from './types';
import { useEffect, useState } from 'react';

// TODO: come back to this
export const getBreakpoint = (width: number): BreakpointKey => {
  if (width >= 1536) return 'xxl';
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
};

export const useResponsive = (): ResponsiveInfo => {
  const [dimensions, setDimensions] = useState<ScaledSize>(
    Dimensions.get('window')
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => {
      if (subscription?.remove) {
        subscription.remove();
      }
    };
  }, []);

  return {
    width: dimensions.width,
    height: dimensions.height,
    breakpoint: getBreakpoint(dimensions.width),
    isPortrait: dimensions.height > dimensions.width,
    isLandscape: dimensions.width > dimensions.height,
  };
};

export const getResponsiveValue = <T>(
  responsive: ResponsiveValue<T>,
  breakpoint: BreakpointKey
): T => {
  if (responsive[breakpoint]) return responsive[breakpoint]!;

  const breakpointOrder: BreakpointKey[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);

  for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
    const value = responsive[breakpointOrder[i]];
    if (value !== undefined) return value;
  }

  return responsive.base;
};