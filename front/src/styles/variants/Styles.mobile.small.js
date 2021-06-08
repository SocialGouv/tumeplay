import Colors from '../Color';
import {StyleSheet} from 'react-native';

// if !browser && screenWidth <= 320
const Styles = {
  appTitle: {
    fontSize: 20,
  },
  tunnelTitle: {
    fontSize: 22,
  },
  text: {
    fontSize: 18,
    marginTop: 5,
  },
  viewopacitytunneletap3: {
    flex: 0.2,
  },
  viewopacitytunneletap4: {
    flex: 0.32,
  },
  tunnelButtonText: {
    fontSize: 16,
  },
  questionText: {
    fontSize: 22,
  },
  finishText: {
    fontSize: 30,
  },
  descText: {
    fontSize: 22,
  },
  imgtexte: {
    fontSize: 18,
    paddingBottom: 5,
    marginTop: -72,
  },
  bottomComm: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  bottomCommText: {
    fontSize: 16,
  },
  PictureBravo: {
    height: 45,
    width: 45,
  },
  PictureFinish: {
    width: 80,
    height: 80,
    marginTop: 40,
  },
  descTextCom: {
    fontSize: 20,
  },
  titreText: {
    fontSize: 24,
  },
  textCommImg: {
    fontSize: 16,
  },
  titreTextList: {
    fontSize: 20,
  },
  bottomButtonText: {
    fontSize: 14,
    padding: 8,
  },
  answerText: {
    marginTop: 0,
    marginBottom: 10,
    paddingTop: 10,
    fontSize: 14,
  },
  labelText: {
    fontSize: 16,
  },
  inputTypeText: {
    height: 30,
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 13,
  },
  landingBottomText: {
    fontSize: 18,
  },
  safeAreaViewInner: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.backgroundColor,
  },
  optionlivraison: {
    flex: 0.4,
    paddingTop: 4,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
};

export default StyleSheet.create(Styles);
