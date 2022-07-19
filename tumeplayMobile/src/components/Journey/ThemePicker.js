import {TouchableOpacity, StyleSheet, Image, Animated} from 'react-native';
import config from '../../../config';
import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../../../AppContext';

const ThemePicker = props => {
  const {theme, index, selectedIndex, length, circleSize, onPress} = props;
  const [rotation, setRotation] = useState(0);
  const [oldRotation, setOldRotation] = useState(0);
  const [oldSpin, setOldSpin] = useState(0);
  const [animation1] = useState(new Animated.Value(0));
  const [animation2] = useState(new Animated.Value(0));
  const {apiUrl} = useContext(AppContext);
  const isSelected = selectedIndex.index === index;
  const angle = 360 / length;

  const calculateMoveDiff = () => {
    return selectedIndex.oldIndex <= 4 && selectedIndex.index >= 9
      ? selectedIndex.oldIndex + (length - selectedIndex.index)
      : selectedIndex.oldIndex >= 9 && selectedIndex.index <= 4
      ? selectedIndex.index + (length - selectedIndex.oldIndex)
      : Math.abs(selectedIndex.index - selectedIndex.oldIndex);
  };

  const calculateRotationValue = () => {
    return oldRotation > rotation
      ? selectedIndex.direction === 'right'
        ? 360 + rotation
        : rotation
      : selectedIndex.direction === 'right'
      ? rotation
      : oldRotation - (360 - rotation + oldRotation);
  };

  const calculateSpinvalue = () => {
    return oldSpin > -rotation
      ? selectedIndex.direction === 'left'
        ? -1 * (360 + oldSpin)
        : oldSpin
      : selectedIndex.direction === 'right'
      ? 360 + oldSpin
      : oldSpin;
  };

  useEffect(() => {
    let tmpRotation = 0;
    const limit =
      selectedIndex.index <= index
        ? index - selectedIndex.index
        : index + (length - selectedIndex.index);
    for (var i = 0; i < limit; i++) {
      tmpRotation += angle;
    }
    setRotation(tmpRotation);
  }, [selectedIndex.index]);

  useEffect(() => {
    if (animation1 && animation2) {
      animation1.setValue(oldRotation);
      animation2.setValue(calculateSpinvalue());

      const moveDiff = calculateMoveDiff();
      const toValue1 = calculateRotationValue();
      const duration = 200 * moveDiff;
      Animated.timing(animation1, {
        toValue: toValue1,
        duration: selectedIndex.duration || duration,
        useNativeDriver: true,
      }).start();

      Animated.timing(animation2, {
        toValue: -rotation,
        duration: selectedIndex.duration || duration,
        useNativeDriver: true,
      }).start();

      setOldRotation(rotation);
      setOldSpin(-rotation);
    }
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
              {translateX: circleSize / 2 - config.deviceWidth * 0.1},
              {translateY: circleSize / 2 - config.deviceWidth * 0.2},
              {
                rotate: animation2.interpolate({
                  inputRange: [-360, 360],
                  outputRange: ['-360deg', '360deg'],
                }),
              },
              {rotate: '180deg'},
            ],
          },
        ]}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.95}
          style={styles.touchZone}>
          <Image
            source={{uri: apiUrl + theme?.image?.url}}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchZone: {
    padding: 15,
    borderRadius: 50,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default ThemePicker;
