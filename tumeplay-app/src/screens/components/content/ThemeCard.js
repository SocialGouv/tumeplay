import React, {useState} from 'react';

import {Image, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import CustomTouchableOpacity from '../global/CustomTouchableOpacity';

import LandingStyle from '../../../styles/components/LandingScreen';

import ReactHowler from 'react-howler';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
const REACT_APP_ZONE = process.env.REACT_APP_ZONE

ThemeCard.propTypes = {
  item: PropTypes.any,
};

export default function ThemeCard(props) {
  const {item, onPress} = props;

  let currentIndex = 0;

  const soundPicture = require('../../../assets/pictures/sound.png');

  const localStyle =
    currentIndex % 2 === 0 ? {marginRight: 7} : {marginLeft: 7};
  currentIndex = currentIndex + 1;

  const [play, setPlay] = useState(false);

  function onPlayStop() {
    console.log('Stop asked : ' + play);

    setPlay(false);
  }

  async function togglePlay(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!play) {
      console.log('Asking top force stop.');
      await window.Howler.stop();
    }

    setTimeout(function() {
      setPlay(!play);
    }, 200);
  }

  return (
    <View style={[LandingStyle.gridContainer, localStyle]}>
      <CustomTouchableOpacity
        style={LandingStyle.gridItemButton}
        onPress={() => {
          onPress(item);
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            source={
              item.image[0]
                ? REACT_APP_API_URL + item.image[0].url
                : null
            }
            style={LandingStyle.gridItemPicture}
          />
        </View>

        <View style={LandingStyle.gridItemTextContainer}>
          <Text style={LandingStyle.gridItemText}>{item.title}</Text>
          {item.sound && REACT_APP_ZONE === 'guyane' && (
            <CustomTouchableOpacity
              onPress={e => {
                togglePlay(e);
                return false;
              }}
              style={{position: 'absolute', right: 15, top: 8}}>
              <Image
                style={{
                  marginLeft: 10,
                  width: 23,
                  height: 23,
                  resizeMode: 'contain',
                }}
                source={soundPicture}
              />
            </CustomTouchableOpacity>
          )}
          {item.sound && item.sound.url && (
            <ReactHowler
              src={REACT_APP_API_URL + item.sound.url}
              onEnd={onPlayStop}
              onStop={onPlayStop}
              playing={play}
            />
          )}
        </View>
      </CustomTouchableOpacity>
    </View>
  );
}
