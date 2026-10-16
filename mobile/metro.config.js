const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

// Expo configures Metro for the pnpm workspace automatically (it watches the
// repo root, so packages/* and the website's public/fonts resolve).
// withUniwindConfig must stay the outermost wrapper.
const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './src/uniwind-types.d.ts',
});
