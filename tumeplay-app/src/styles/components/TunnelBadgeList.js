import {StyleSheet} from 'react-native';
import Colors from '../Color';

var Styles = {
  topLogoPicture: {
    width: '100%',
    resizeMode: 'contain',
    height: 175,
    maxWidth: 150,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 1,
  },
  topLogoText: {
    textAlign: 'center',
    position: 'absolute',
    top: '48%',
    color: '#FFFFFF',
    zIndex: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    fontFamily: Colors.textFont,
  },
  topLogoCounterWrapper: {
    alignItems: 'center',
    marginBottom: 15,
  },
  topLogoCounter: {
    marginTop: -18,
    zIndex: 0,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    borderWidth: 2,
    fontFamily: Colors.appTitleFont,
    borderColor: Colors.labelColor,
    color: Colors.labelColor,
    fontSize: 15,
  },
};

export default StyleSheet.create(Styles);
