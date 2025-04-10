// file path: client/tailwind.config.js

// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
      }
    }
  },
  plugins: [],
}
