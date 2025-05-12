// File: client/postcss.config.cjs

const tailwindcss = require('@tailwindcss/postcss'); 
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [tailwindcss, autoprefixer],
};




// import tailwindcss from '@tailwindcss/postcss';
// import autoprefixer from 'autoprefixer';

// export default {
//   plugins: [
//     tailwindcss(),
//     autoprefixer()
//   ]
// };
