const { getDefaultConfig } = require('expo/metro-config');
   const { mergeConfig } = require('@react-native/metro-config');
   const exclusionList = require('metro-config/src/defaults/exclusionList');

   /**
    * Metro configuration
    * https://facebook.github.io/metro/docs/configuration
    *
    * @type {import('metro-config').MetroConfig}
    */
   const defaultConfig = getDefaultConfig(__dirname);

   const config = {
     resolver: {
       unstable_enablePackageExports: true,
       unstable_conditionNames: ["react-native", "browser", "require"],
       blacklistRE: exclusionList([/node_modules\/.*\/node_modules\/.*/, /\.git\/.*/]),
     },
     watchFolders: [
       './components',
     ],
     transformer: {
       workerPath: require.resolve('metro-transform-worker'),
     },
     maxWorkers: 2,
     resetCache: true,
     cacheStores: [],
   };

   module.exports = mergeConfig(defaultConfig, config);