import {StyleSheet} from 'react-native';
import Colors from '../Color';

var Styles = {
  container: {
    backgroundColor: Colors.backgroundColor,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    flexDirection: 'column',
  },
  title: {
    fontFamily: Colors.titleCard,
    color: Colors.secondaryText,
    fontSize: 24,
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: Colors.textFont,
    color: Colors.secondaryText,
    fontSize: 15,
  },
  productTitle: {
    fontFamily: Colors.titleCard,
    fontSize: 25,
    color: Colors.titleCardColor,
  },
  emailAdress: {
    fontFamily: Colors.textFontBold,
  },
  splitterWrapper: {
    flex: 0.15,
  },
  splitterPicture: {
    width: 35,
    minHeight: 8,
    marginTop: 5,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  pictureAndTextWrapper: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
    width: '100%',
    maxHeight: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  pictureAndTextPicture: {
    width: 17,
    height: 17,
    marginRight: 10,
    marginTop: 1,
    resizeMode: 'contain',
  },
  label: {
    fontFamily: Colors.textFont,
    color: Colors.secondaryText,
    fontSize: 12,
  }
};

export default StyleSheet.create(Styles);
