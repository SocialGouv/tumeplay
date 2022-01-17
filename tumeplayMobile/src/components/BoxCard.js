import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image, View} from 'react-native';
import {Fonts} from '../styles/Style';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const BoxCard = props => {
  const {index, title, description, moreInfo, box, image} = props;

  const getInitialState = () => {
    return {
      value: 1,
    };
  };

  return (
    <View style={styles.boxCard}>
      <RadioForm style={styles.radio}>
        <RadioButton key={index}>
          <RadioButtonInput
            obj={box}
            index={index}
            borderWidth={1}
            buttonInnerColor={'#000000'}
            buttonOuterColor={'#000000'}
            buttonSize={5}
            buttonOuterSize={0}
            buttonStyle={{}}
          />
        </RadioButton>
      </RadioForm>
      <View>
        <Text style={styles.titleIndex}>BOX {index}</Text>
        <Text style={styles.titleBox}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.moreInfo}>+ d'infos</Text>
      </View>
      <Image style={styles.image} source={image} />
    </View>
  );
};

const styles = StyleSheet.create({
  boxCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 12,
  },
  radio: {
    paddingHorizontal: 20,
  },
  titleIndex: {
    color: 'red',
    fontSize: 16,
    lineHeight: 22,
  },
  titleBox: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  description: {
    color: Colors.black,
    fontWeight: '400',
    fontSize: 14,
  },
  moreInfo: {
    color: 'red',
    fontWeight: '400',
    fontSize: 14,
  },
  image: {
    position: 'absolute',
    right: 0,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 90,
  },
});

export default BoxCard;
