//for mobile

// import { useRef, useState } from 'react';
// import { PanResponder, Animated } from 'react-native';

// export const useGestureAnimation = (config: {
//   threshold?: number;
//   onSwipe?: (direction: 'left' | 'right') => void;
// }) => {
//   const pan = useRef(new Animated.ValueXY()).current;
//   const [swiping, setSwiping] = useState(false);

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: () => {
//       setSwiping(true);
//       pan.setOffset({
//         x: pan.x._value,
//         y: pan.y._value,
//       });
//     },
//     onPanResponderMove: Animated.event(
//       [null, { dx: pan.x, dy: pan.y }],
//       { useNativeDriver: false }
//     ),
//     onPanResponderRelease: (_, gesture) => {
//       setSwiping(false);
//       pan.flattenOffset();

//       const threshold = config.threshold || 100;

//       if (Math.abs(gesture.dx) > threshold) {
//         const direction = gesture.dx > 0 ? 'right' : 'left';
//         config.onSwipe?.(direction);
//       }

//       Animated.spring(pan, {
//         toValue: { x: 0, y: 0 },
//         useNativeDriver: false,
//       }).start();
//     },
//   });

//   return {
//     pan,
//     swiping,
//     panResponder,
//   };
// };