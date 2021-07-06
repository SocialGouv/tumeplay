import React from 'react';
import { FlatList  } from 'react-native';
import PropTypes from 'prop-types';
import ThemeCard from '../content/ThemeCard';

LandingThemeGrid.propTypes = {
  themes: PropTypes.array,
  onPress: PropTypes.func,
};

export default function LandingThemeGrid(props) {
  const numColumns = 2;
  
  return (
    <FlatList
      scrollEnabled={true}
      data={props.themes}
      style={{paddingLeft: 15, paddingRight: 15}}
      renderItem={({item}) => {
        return (
          <ThemeCard item={item} onPress={props.onPress} />
        );
      }}
      numColumns={numColumns}
    />
  );
}
