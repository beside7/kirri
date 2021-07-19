module.exports = function (api) {
  api.cache(true);
  return {
      presets: ["babel-preset-expo", "module:metro-react-native-babel-preset", "mobx"],
      plugins: [
        ['react-native-paper/babel', {}],
        [
            "babel-plugin-styled-components",
            {
                "ssr": false
            }
        ],
        [
            "module-resolver",
            {
                alias: {
                    "@screens": "./src/screens",
                    "@components": "./src/components",
                    "@utils": "./src/utils",
                    "@contexts": "./src/contexts",
                    "@config": "./src/config",
                    "@assets": "./assets",
                    "@type-definition": "./src/types",
                    "@apis": "./src/apis",
                    "@store": "./src/store"
                }
            }
        ],
        "@babel/plugin-transform-flow-strip-types",
        ["@babel/plugin-proposal-decorators", { "legacy": true}],
        // ["@babel/plugin-proposal-class-properties", { "loose": true}],
        [
            "babel-plugin-inline-import",
            {
              "extensions": [".svg"]
            }
          ]
      ]
  }; 
};