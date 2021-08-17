import {StyleSheet} from 'react-native';
import Colors from '../Color';

var Styles = {
  backlinkButton: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
    width: '100%',
    maxHeight: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  backlinkArrow: {
    width: 17,
    height: 17,
    marginRight: 10,
    resizeMode: 'contain',
  },
  backlinkText: {
    color: '#FFFFFF',
    fontFamily: Colors.textFont,
  },
};

export default StyleSheet.create(Styles);
