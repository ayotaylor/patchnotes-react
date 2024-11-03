type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const createResponsiveClasses = (
  baseClasses: string,
  responsiveClasses: Partial<Record<BreakpointKey, string>>
): string => {
  return [
    baseClasses,
    ...Object.entries(responsiveClasses).map(
      ([breakpoint, classes]) => `${breakpoint}:${classes}`
    )
  ].join(' ');
};

export const createVariantClasses = (
  baseClasses: string,
  variants: Record<string, boolean>,
  variantClasses: Record<string, string>
): string => {
  return [
    baseClasses,
    ...Object.entries(variants)
      .filter(([_, active]) => active)
      .map(([variant]) => variantClasses[variant])
  ].join(' ');
};