import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {REACT_APP_URL} from '@env';

const ThemePicker = props => {
  const {theme, index, selectedIndex, length, circleSize, onPress} = props;
  const [rotation, setRotation] = useState(0);
  const [oldRotation, setOldRotation] = useState(0);
  const [animation1] = useState(new Animated.Value(0));
  const isSelected = selectedIndex === index;
  const angle = 360 / length;

  useEffect(() => {
    let tmpRotation = 0;
    const limit =
      selectedIndex <= index
        ? index - selectedIndex
        : index + (length - selectedIndex);
    for (var i = 0; i < limit; i++) {
      tmpRotation += angle;
    }
    setRotation(tmpRotation);
  }, [selectedIndex]);

  useEffect(() => {
    animation1.setValue(oldRotation);
    if (animation1) {
      Animated.timing(animation1, {
        toValue: oldRotation > rotation ? 360 + rotation : rotation,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
    setOldRotation(rotation);
  }, [rotation]);

  return (
    <>
      <Animated.View
        style={[
          styles.roundedView,
          {
            backgroundColor: theme?.color,
            borderColor: isSelected ? '#000' : '#C6C6FE',
            transform: [
              {
                rotate: animation1.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
              {translateX: circleSize / 2 - 68},
              {translateY: circleSize / 2 - 68},
              {
                rotate: '-' + rotation + 'deg',
              },
              {rotate: '180deg'},
            ],
          },
        ]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
          <Text>{rotation}</Text>
          <Image
            source={{uri: REACT_APP_URL + theme?.image?.url}}
            style={styles.image}
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  roundedView: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 70,
    height: 70,
    margin: -35,
    borderRadius: 50,
    border: 8,
    borderWidth: 6,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default ThemePicker;
