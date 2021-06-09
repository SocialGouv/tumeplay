import React from 'react';
import {Image, View, FlatList, Text} from 'react-native';
import PropTypes from 'prop-types';
import CustomTouchableOpacity from '../global/CustomTouchableOpacity';

import LandingStyle from '../../../styles/components/LandingScreen';

import TextWithSound from '../global/TextWithSound';

LandingThemeGrid.propTypes = {
  themes: PropTypes.array,
  onPress: PropTypes.func,
};

export default function LandingThemeGrid(props) {
  const numColumns = 2;
  let currentIndex = 0;
  return (
    <FlatList
      scrollEnabled={true}
      data={props.themes}
      style={{paddingLeft: 15, paddingRight: 15}}
      renderItem={({item}) => {
        // That's a really dirty way; but strangely the only one working.
        const localStyle =
          currentIndex % 2 === 0 ? {marginRight: 7} : {marginLeft: 7};
        currentIndex = currentIndex + 1;
        return (
          <View style={[LandingStyle.gridContainer, localStyle]}>
            <CustomTouchableOpacity
              style={LandingStyle.gridItemButton}
              onPress={() => {
                props.onPress(item);
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={item.picture ? item.picture : null}
                  style={LandingStyle.gridItemPicture}
                />
              </View>

              <View style={LandingStyle.gridItemTextContainer}>
                <TextWithSound
                  style={LandingStyle.gridItemText}
                >
                  {item.value}
                </TextWithSound>
              </View>
            </CustomTouchableOpacity>
          </View>
        );
      }}
      numColumns={numColumns}
    />
  );
}
