import {View, StyleSheet, Pressable} from 'react-native';
import Text from '../Text';
import React from 'react';
import config from '../../../config';
import {Colors} from '../../styles/Style';
import Icon from 'react-native-vector-icons/Ionicons';

const GameCard = props => {
  const {title, text, onPress, style} = props;
  return (
    <Pressable
      style={({pressed}) => [
        styles.card,
        {
          backgroundColor: pressed ? 'white' : Colors.background,
        },
      ]}
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.middleContainer}>
        <Text style={styles.text}>{text}</Text>
        <Icon name="md-arrow-forward" size={30} style={styles.icon} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 16,
    height: 110,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: config.deviceWidth * 0.05,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: config.deviceWidth * 0.04,
    width: '80%',
  },
});

export default GameCard;
