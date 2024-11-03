import { useState, useEffect } from 'react';
import { Theme } from '../../theme/types';
import { ResponsiveValue, ResponsiveInfo, BreakpointKey } from './types';

export const getBreakpoint = (width: number): BreakpointKey => {
  if (width >= 1536) return 'xxl';
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
};

export const useResponsive = (): ResponsiveInfo => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width: dimensions.width,
    height: dimensions.height,
    breakpoint: getBreakpoint(dimensions.width),
    isPortrait: dimensions.height > dimensions.width,
    isLandscape: dimensions.width > dimensions.height,
  };
};

export const up = (breakpoint: BreakpointKey) => {
  const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  };
  return `@media (min-width: ${breakpoints[breakpoint]}px)`;
};

export const down = (breakpoint: BreakpointKey) => {
  const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  };
  return `@media (max-width: ${breakpoints[breakpoint] - 0.05}px)`;
};

export const between = (start: BreakpointKey, end: BreakpointKey) => {
  const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  };
  return `@media (min-width: ${breakpoints[start]}px) and (max-width: ${breakpoints[end] - 0.05}px)`;
};