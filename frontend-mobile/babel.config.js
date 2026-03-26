module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@atoms': './presentation/atoms',
            '@molecules': './presentation/molecules',
            '@organisms': './presentation/organisms',
            '@pages': './presentation/pages',
            '@templates': './presentation/templates',
            '@models': './data/models',
            '@repositories': './data/repositories',
            '@context': './shared-resources/context',
            '@hooks': './shared-resources/hooks',
            '@navigation': './shared-resources/navigation',
            '@theme': './shared-resources/theme',
            '@utils': './shared-resources/utils',
          },
        },
      ],
    ],
  };
};
