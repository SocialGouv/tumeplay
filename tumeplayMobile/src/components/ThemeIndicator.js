import {View, StyleSheet, Image} from 'react-native';
import React, {useContext} from 'react';
import TextBase from './Text';
import AppContext from '../../AppContext';

const ThemeIndicator = props => {
  const {theme} = props;
  const {apiUrl} = useContext(AppContext);

  return (
    <View style={[styles.container, {backgroundColor: theme?.color}]}>
      <Image
        source={{uri: `${apiUrl}${theme?.image?.url}`}}
        style={{width: 30, height: 30}}
      />
      <TextBase>{theme?.title}</TextBase>
    </View>
  );
};

export default ThemeIndicator;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
