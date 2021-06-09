import {Platform} from 'react-native';

const autoScrollToTop = props => {
  if (Platform.OS === 'web') {
    const didFocusSubscription = props.navigation.addListener(
      'didFocus',
      () => {
        window.scrollTo(0, 0);
      },
    );

    const willBlurSubscription = props.navigation.addListener(
      'willBlur',
      () => {
        didFocusSubscription.remove();
        willBlurSubscription.remove();
      },
    );
  }
};

export default autoScrollToTop;
