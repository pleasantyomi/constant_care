const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

// The app's own lint setup; the website's root eslint.config.mjs ignores mobile/.
module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'src/uniwind-types.d.ts'],
  },
]);
