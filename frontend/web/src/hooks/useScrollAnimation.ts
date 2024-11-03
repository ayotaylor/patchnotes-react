import { useEffect, useRef } from 'react';
import { useAnimatedValue } from '../utils/animation/animation';

export const useScrollAnimation = (threshold: number = 100) => {
  const scrollY = useRef(0);
  const [opacity, animateOpacity] = useAnimatedValue(1);
  const [scale, animateScale] = useAnimatedValue(1);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - scrollY.current;
      scrollY.current = currentScroll;

      if (Math.abs(delta) > threshold) {
        if (delta > 0) {
          // Scrolling down
          animateOpacity(0, { duration: 200 });
          animateScale(0.95, { duration: 200 });
        } else {
          // Scrolling up
          animateOpacity(1, { duration: 200 });
          animateScale(1, { duration: 200 });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { opacity, scale };
};