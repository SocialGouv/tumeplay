import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, Image, View} from 'react-native';
import {Fonts} from '../styles/Style';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from 'react-native-simple-radio-button';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useRoute} from '@react-navigation/native';

const BoxCard = props => {
  const {index, title, description, moreInfo, box, image, navigation} = props;
  const [value, setValue] = useState(0);
  const route = useRoute();
  return (
    <View style={styles.boxCard}>
      {route.name === 'Box' && (
        <RadioForm style={styles.radio}>
          <RadioButton key={index}>
            <RadioButtonInput
              obj={box}
              index={index}
              borderWidth={1}
              isSelected={value === index}
              onPress={(value, index) => {
                navigation.navigate('BoxOrder', {
                  index: index,
                  box: box,
                });
                return setValue(value);
              }}
              buttonInnerColor={'#000'}
              buttonOuterColor={'#000'}
              buttonSize={10}
              buttonOuterSize={15}
              buttonStyle={{}}
            />
          </RadioButton>
        </RadioForm>
      )}
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
    paddingLeft: 20,
  },
  radio: {
    paddingRight: 20,
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
    textDecorationLine: 'underline',
  },
  image: {
    position: 'absolute',
    right: 0,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 90,
  },
});

export default BoxCard;
