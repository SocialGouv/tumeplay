import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ReactHowler from 'react-howler';
import CustomTouchableOpacity from './CustomTouchableOpacity';

TextWithSound.propTypes = {
  sound: PropTypes.string,
  useUrl: PropTypes.bool,
  children: PropTypes.object || PropTypes.string,
  // style: PropTypes.object,
};
export default function TextWithSound(props) {
  const [play, setPlay] = useState(false);
  const targetSound = props.sound ? ( props.useUrl ? props.sound : require('../../../assets/sounds/' + props.sound) ) : false;

  const soundPicture = require('../../../assets/pictures/sound.png');

  function onPlayStart() {
    setPlay(true)
  }

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
    <View>
      <Text style={props.style}>
        {props.children}
        {props.sound && (
          <CustomTouchableOpacity
            onPress={e => {
              togglePlay(e);
              return false;
            }}
            style={{position: 'relative', top: 5}}>
            <Image
              style={{
                marginLeft: 10,
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
              source={soundPicture}
            />
          </CustomTouchableOpacity>
        )}
      </Text>
      {props.sound && (
        <ReactHowler
          src={targetSound}
          onPlayStart={onPlayStart}
          onEnd={onPlayStop}
          onStop={onPlayStop}
          playing={play}
        />
      )}
    </View>
  );
}
