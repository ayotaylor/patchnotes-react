/** @type {import('tailwindcss').Config} */
import { lightTheme } from './src/theme/theme';
import { createTailwindConfig } from './src/tailwind/config';

const config = createTailwindConfig(lightTheme);
export default config;
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

