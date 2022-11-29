import React from 'react';
import {FlatList, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import ThemeCard from '../content/ThemeCard';
import _ from 'lodash';

LandingThemeGrid.propTypes = {
  themes: PropTypes.array,
  onPress: PropTypes.func,
};

export default function LandingThemeGrid(props) {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const numColumns = screenWidth <= 450 ? 1 : 2;

  return (
    <FlatList
      scrollEnabled={true}
      data={_.orderBy(props.themes, ['title'], ['asc'])}
      style={{paddingLeft: 15, paddingRight: 15}}
      renderItem={({item}) => {
        return <ThemeCard item={item} onPress={props.onPress} />;
      }}
      numColumns={numColumns}
    />
  );
}
