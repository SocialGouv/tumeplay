import {StyleSheet} from 'react-native';
import Colors from '../Color';

var Styles = {
  topLogoPicture: {
    width: '100%',
    resizeMode: 'contain',
    height: 175,
    zIndex: 1,
    marginTop: 20,
  },
  topLogoCounterWrapper: {
    alignItems: 'center',
    marginBottom: 15,
  },
  topLogoCounter: {
    marginTop: -33,
    zIndex: 0,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 0,
    minWidth: 120,
    borderRadius: 20,
    borderWidth: 2,
    fontFamily: Colors.appTitleFont,
    borderColor: Colors.labelColor,
    color: Colors.labelColor,
    fontSize: 20,
  },
};

export default StyleSheet.create(Styles);
