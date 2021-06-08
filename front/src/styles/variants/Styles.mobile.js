import Colors from '../Color';
import {StyleSheet} from 'react-native';

// If !browser && screenWidth > 320
var Styles = {
  appTitle: {
    fontSize: 30,
  },
  tunnelTitle: {
    fontSize: 30,
  },
  text: {
    fontSize: 20,
    marginTop: 0,
  },
  viewopacitytunneletap3: {
    flex: 0.1,
  },
  viewopacitytunneletap4: {
    flex: 0.2,
  },
  tunnelButtonText: {
    fontSize: 18,
  },
  questionText: {
    fontSize: 30,
  },
  finishText: {
    fontSize: 33,
  },
  descText: {
    fontSize: 30,
  },
  imgtexte: {
    fontSize: 22,
    marginTop: -60,
  },
  bottomCommText: {
    fontSize: 18,
  },
  PictureBravo: {
    width: 60,
    height: 60,
  },
  PictureFinish: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  descTextCom: {
    fontSize: 24,
  },
  titreText: {
    fontSize: 28,
  },
  textCommImg: {
    fontSize: 18,
  },
  titreTextList: {
    fontSize: 24,
  },
  bottomButtonText: {
    fontSize: 18,
    padding: 12,
  },

  answerText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
  },
  labelText: {
    fontSize: 16,
  },
  inputTypeText: {
    height: 35,
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 18,
  },
  landingBottomText: {
    fontSize: 20,
  },
  safeAreaViewInner: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.backgroundColor,
  },
  optionlivraison: {
    flex: 0.28,
    paddingTop: 4,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
};

export default StyleSheet.create(Styles);
