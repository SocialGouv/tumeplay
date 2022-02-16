module.exports = {
  assets: ['./src/assets/fonts/'], // stays the same
  dependencies: {
    'react-native-matomo': {
      platforms: {
        ios: null, // this will disable autolinking for this package on iOS
      },
    },
  },
};
