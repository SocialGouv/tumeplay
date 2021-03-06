import {View, StyleSheet, Image} from 'react-native';
import TextBase from '../Text';
import React, {useContext} from 'react';
import config from '../../../config';
import AppContext from '../../../AppContext';

const ThemeCard = props => {
  const {style, selectedTheme, moduleCount} = props;
  const {apiUrl} = useContext(AppContext);

  return (
    <View style={[style, styles.box]}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: apiUrl + selectedTheme?.image?.url}}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <TextBase numberOfLines={2} style={styles.text}>
            {selectedTheme?.title}
          </TextBase>
          <TextBase style={styles.text}>
            {moduleCount > 0
              ? moduleCount + ' ' + 'défis restants'
              : moduleCount + ' ' + 'défi'}
          </TextBase>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#000',
    width: config.deviceWidth * 0.4,
    height:
      config.deviceHeight > 667
        ? config.deviceHeight * 0.08
        : config.deviceHeight * 0.09,
    borderRadius: config.deviceWidth * 0.03,
    paddingLeft: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 20,
    marginLeft: 5,
  },
  text: {
    color: '#fff',
    fontSize:
      config.deviceHeight >= 667
        ? config.deviceHeight * 0.012
        : config.deviceHeight * 0.016,
    fontWeight: 'bold',
    paddingVertical: 1,
    textAlign: 'left',
    width:
      config.deviceHeight > 667
        ? config.deviceWidth * 0.3
        : config.deviceWidth * 0.2,
  },
  imageContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    width: 25,
    height: 25,
    paddingVertical: 1,
    padding: 5,
  },
});
export default ThemeCard;
