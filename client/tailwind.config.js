// File Path: client/tailwind.config.js

// tailwind.config.js
import aspectRatio from '@tailwindcss/aspect-ratio'
import lineClamp from '@tailwindcss/line-clamp'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // Custom breakpoints
      xs: '375px',  // iPhone SE / small devices
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    spacing: {
      // Custom Spacing Scale
      4.5: '1.125rem',
      18: '4.5rem',
      22: '5.5rem',
    },
    fontSize: {
      // Mobile-friendly font sizes
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
    },
    extend: {
      colors: {
        pinks: {
          100: '#E8BECE', // Fairy Tale Pink
          200: '#D49FB3', // Amaranth Pink
          300: '#CE9EB1', // Puce (lightest)
          400: '#C995A9', // Puce (lighter)
          500: '#C4849C', // Puce (darker)
          600: '#BB809F', // Puce (darkest)
          700: '#BB6886', // Blush
          800: '#A98090', // Mountbatten Pink
          900: '#966D7D', // Mountbatten Pink (darker)
          950: '#914C67', // Quinacridone Magenta
        },
        cyans: {
          100: '#3ABBD1', // Moonstone
          200: '#309D9F', // Dark Cyan
          300: '#2A8485', // Teal
          400: '#237071', // Caribbean Current
          500: '#1A5556', // Dark Slate Grey
        },
        blues: {
          100: '#8DDDE7', // Non Photo Blue
          200: '#3491B7', // Bondi Blue
          300: '#3D6B9B', // Lapis Lazuli
          400: '#37577E', // YinMn Blue (lighter)
          500: '#3E4473', // Marian Blue (lighter)
          600: '#33599F', // YinMn Blue (darker)
          700: '#30508C', // YinMn Blue (darkest)
          800: '#2A4576', // Marian Blue (darker)
          900: '#20355D', // Delft Blue
          950: '#182A4C', // Space Cadet
        },
        reds: {
          100: '#CC3E4C', // Rusty Red
          200: '#B83240', // Cardinal
          300: '#A02D38', // Auburn
          400: '#84242E', // Burgundy
          500: '#661C23', // Chocolate Cosmos
        },
        magentas: {
          100: '#D475E2', // French Mauve (lighter)
          200: '#C46DD1', // French Mauve (darker)
          300: '#AF61BB', // Amethyst (lighter)
          400: '#9651A0', // Purpureus
          500: '#7E4287', // Plum
        },
        purples: {
          100: '#DBBDE7', // Thistle
          200: '#CEB3DA', // Pink Lavender
          300: '#BFA6C9', // Lilac (lighter)
          400: '#AF97B8', // Lilac (darker)
          500: '#9A84A2', // Mountbatten Purple-Pink
          600: '#AF71DC', // Floral Lavender
          700: '#9960C2', // Amethyst (darker)
          800: '#8052A0', // Royal Purple (lighter)
          900: '#714790', // Royal Purple (darker)
          950: '#5F3C78', // Eminence
        }
      },
      backgroundColor: {
        // Dark Space (Backgrounds & Canvas)
        'bg-space': '#182A4C',     // blues-950 - Space Cadet
        'bg-deep': '#20355D',      // blues-900 - Delft Blue
        'bg-shadow': '#2A4576',    // blues-800 - Marian Blue (darker)
        // Dreamy Pinks (Clouds, Inner Spirals, Focus Areas)
        'pink-soft': '#E8BECE',    // pinks-100 - Fairy Tale Pink
        'pink-mid': '#CE9EB1',     // pinks-300 - Puce (lightest)
        'pink-dark': '#C4849C',    // pinks-500 - Puce (darker)
      },
      textColor: {
        // Electric Nebulas (Magnetic Accents)
        'pulse-magenta': '#D475E2', // magentas-100 - French Mauve (lighter)
        'pulse-red': '#CC3E4C',     // reds-100 - Rusty Red
        'pulse-glow': '#D49FB3',    // pinks-200 - Amaranth Pink
        // Depth + Gravity (Moods, Foreground Overlays)
        'depth-purple': '#714790',  // purples-900 - Royal Purple (darker)
        'depth-magenta': '#7E4287', // magentas-500 - Plum
        'depth-cyan': '#237071',    // cyans-400 - Caribbean Current
      },
      borderColor: {
        // Glow Accents (Highlight Rings, Hovers, Borders)
        'glow-cyan': '#3ABBD1',     // cyans-100 - Moonstone
        'glow-blue': '#8DDDE7',     // blues-100 - Non Photo Blue
        'glow-purple': '#AF71DC',   // purples-600 - Floral Lavender
      },
      fontFamily: {
        ephesis: ['Ephesis', 'cursive'],              // for "inner"
        barlow: ['Barlow Condensed', 'sans-serif'],   // for "Orbit"
        work: ['Work Sans', 'sans-serif'],            // site body option
        mulish: ['Mulish', 'sans-serif'],             // site body option
      },
      boxShadow: {
        'glow-cyan': '0 0 12px 2px rgba(58, 187, 209, 0.5)',      // cyans-100
        'glow-purple': '0 0 14px 2px rgba(175, 113, 220, 0.45)',  // purples-600
        'glow-pink': '0 0 10px 2px rgba(232, 190, 206, 0.4)',     // pinks-100
        'glow-blue': '0 0 10px 2px rgba(141, 221, 231, 0.45)',    // blues-100
        'depth-soft': '0 8px 16px rgba(0, 0, 0, 0.25)',           // for subtle elevation
        'nebula': '0 0 35px 5px rgba(212, 117, 226, 0.25)',       // magentas-100 / dreamy effect
        'orbit-ring': '0 0 20px 3px rgba(52, 145, 183, 0.3)',     // blues-200 for rings/glows
      },
    },
  },
  plugins: [
    aspectRatio, // Enables utilities like aspect-w-16 aspect-h-9 for responsive media
    lineClamp,   // Allows text truncation with utilities like line-clamp-3 to control max lines
  ],
}
