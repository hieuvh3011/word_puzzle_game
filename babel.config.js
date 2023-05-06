module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '@app',
        rootPathSuffix: 'src',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js', '.json'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
  retainLines: true,
  env: {
    production: {
      plugins: [
        [
          'babel-plugin-root-import',
          {
            rootPathPrefix: '@app',
            rootPathSuffix: 'src',
            extensions: [
              '.ts',
              '.tsx',
              '.js',
              '.ios.js',
              '.android.js',
              '.json',
            ],
          },
        ],
      ],
    },
  },
};
