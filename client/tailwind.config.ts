// File: client/tailwind.config.ts

import type { Config } from 'tailwindcss';
import aspectRatio from '@tailwindcss/aspect-ratio'
import lineClamp from '@tailwindcss/line-clamp'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
