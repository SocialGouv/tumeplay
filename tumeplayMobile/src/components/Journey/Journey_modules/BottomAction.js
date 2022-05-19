import {StyleSheet, View} from 'react-native';
import React from 'react';
import TextBase from '../../Text';
import Button from '../../Button';
import config from '../../../../config';

const BottomAction = ({style, selectedModule}) => {
  console.log(selectedModule);

  return (
    <View style={style}>
      <TextBase style={styles.title}>{selectedModule?.title}</TextBase>
      <TextBase style={styles.text}>Prét.e à relever ce défis ?</TextBase>
      <Button
        special
        size="small"
        text="Jouer"
        icon
        left
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  text: {
    paddingVertical: 35,
  },
  button: {
    position: 'absolute',
    width: config.deviceWidth * 0.3,
    bottom: config.deviceHeight > 667 ? 50 : 15,
    right: 20,
  },
});

export default BottomAction;
