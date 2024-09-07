const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname); // Initialize default config
const config = {
  resolver: {
    // Ensure resolver is initialized
    unstable_enablePackageExports: true,
    unstable_conditionNames: ["react-native", "browser", "require"],
  },
};

module.exports = mergeConfig(defaultConfig, config);
