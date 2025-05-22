// postcss.config.cjs
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    tailwind(),
    autoprefixer(),
  ],
};
