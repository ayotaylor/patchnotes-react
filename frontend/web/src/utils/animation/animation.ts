import { useEffect, useRef } from 'react';
import { AnimationConfig, TransitionConfig } from './types';

export const useAnimatedValue = (initialValue: number) => {
  const value = useRef(initialValue);
  const frame = useRef(0);

  const animate = (
    toValue: number,
    { duration = 300, easing = 'ease-out', delay = 0 }: AnimationConfig = {}
  ) => {
    cancelAnimationFrame(frame.current);

    return new Promise<void>((resolve) => {
      const startValue = value.current;
      const startTime = performance.now();

      const updateValue = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        value.current = startValue + (toValue - startValue) * progress;

        if (progress < 1) {
          frame.current = requestAnimationFrame(updateValue);
        } else {
          resolve();
        }
      };

      setTimeout(() => {
        frame.current = requestAnimationFrame(updateValue);
      }, delay);
    });
  };

  return [value, animate] as const;
};

export const useTransition = (config: TransitionConfig) => {
  const element = useRef<HTMLElement | null>(null);

  const start = () => {
    if (!element.current) return;

    element.current.style.transition = `${config.property} ${
      config.duration || 300
    }ms ${config.easing || 'ease-out'}`;

    requestAnimationFrame(() => {
      if (!element.current) return;
      element.current.style[config.property as any] = config.to as string;
    });
  };

  const reset = () => {
    if (!element.current) return;
    element.current.style[config.property as any] = config.from as string;
  };

  return [element, start, reset] as const;
};