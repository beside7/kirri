module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: ['react-native-reanimated/plugin',
      [
        "module-resolver",
        {
          "root": ["./src"],
          "alias": {
            "imgs": "./assets/images",
            "icons": "./assets/icons",
            "fonts": "./assets/fonts",
          }
        }
      ]
    ],
  };
};
