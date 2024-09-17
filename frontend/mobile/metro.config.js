const path = require('path');
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    watchFolders: [
      path.resolve(__dirname, '..'),
    ],
    resolver: {
      extraNodeModules: new Proxy({}, {
        get: (target, name) => path.join(__dirname, `node_modules/${name}`)
      }),
    },
  };
})();