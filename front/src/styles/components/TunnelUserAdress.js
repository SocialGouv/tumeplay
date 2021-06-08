import {StyleSheet} from 'react-native';

var Styles = {
  inputWrapper: {
    flex: 0.25,
    marginTop: 20,
  },
  requiredFieldsWrapper: {
    flex: 0.08,
    marginTop: 25,
    paddingTop: 2,
    paddingBottom: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  invalidTextField: {
    backgroundColor: '#FDC3C3',
  },
};

export default StyleSheet.create(Styles);
