import {View, Pressable, StyleSheet} from 'react-native';
import Text from '../Text';
import React from 'react';
import {Colors} from '../../styles/Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import config from '../../../config';

const Keyboard = props => {
  const {onKeyPress, globalRedLetters, globalYellowLetters, style} = props;

  const keyboardLetters = [
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
    [
      <Icon name="backspace" size={15} />,
      'W',
      'X',
      'C',
      'V',
      'B',
      'N',
      <Icon name="sign-in-alt" size={15} />,
    ],
  ];

  const displayCorrectCellStyle = (pressed, letter) => {
    if (globalRedLetters.includes(letter)) {
      return [{...styles.cell}, {backgroundColor: '#E85439'}];
    } else if (globalYellowLetters.includes(letter)) {
      return [
        {...styles.cell},
        {backgroundColor: '#F5A623', borderColor: '#F5A623'},
      ];
    } else if (letter.props?.name === 'sign-in-alt') {
      return pressed
        ? [{...styles.cell, ...styles.customCellPressed}]
        : [{...styles.customButton}];
    } else {
      return pressed ? [{...styles.cell, ...styles.cellPressed}] : styles.cell;
    }
  };

  const displayCorrectTextStyle = (pressed, letter) => {
    if (letter.props?.name === 'sign-in-alt') {
      return styles.whiteText;
    }
    if (
      globalRedLetters.includes(letter) ||
      globalYellowLetters.includes(letter)
    ) {
      return styles.whiteText;
    }
    return pressed ? styles.whiteText : styles.text;
  };

  return (
    <View style={[style, styles.container]}>
      {keyboardLetters.map((row, i) => {
        return (
          <View style={styles.row} key={'key-row' + i}>
            {row.map((letter, j) => {
              return (
                <Pressable
                  key={'Press' + i + j}
                  value={letter}
                  style={({pressed}) =>
                    displayCorrectCellStyle(pressed, letter)
                  }
                  onPress={() => onKeyPress(letter)}>
                  {({pressed}) => (
                    <Text style={displayCorrectTextStyle(pressed, letter)}>
                      {letter}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 40,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cell: {
    width: config.deviceWidth / 13,
    paddingVertical: 9,
    margin: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  customButton: {
    width: config.deviceWidth / 6,
    paddingVertical: 9,
    margin: 4,
    borderRadius: 5,
    borderWidth: 1,
    color: 'white',
    borderColor: Colors.black,
    backgroundColor: Colors.black,
    alignItems: 'center',
  },
  cellPressed: {
    backgroundColor: Colors.primary,
  },
  customCellPressed: {
    backgroundColor: Colors.primary,
    width: config.deviceWidth / 6,
  },
  cellDisabled: {
    borderColor: 'grey',
  },
  text: {
    fontWeight: 'bold',
    fontSize: config.deviceWidth * 0.03,
  },

  whiteText: {
    fontWeight: 'bold',
    fontSize: config.deviceWidth * 0.03,
    color: '#FFF',
  },
  textDisabled: {
    color: 'grey',
  },
});

export default Keyboard;
