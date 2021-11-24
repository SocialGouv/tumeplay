import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {Fonts} from '../styles/Style';

const ThemeCard = props => {
  const {theme, backgroundColor, image, navigation} = props;

  return (
    <TouchableOpacity
      key={theme?.id}
      style={[styles.cardContainer, {backgroundColor: backgroundColor}]}
      onPress={() => {
        navigation.navigate('ContentsPage', {
          theme_id: theme.id,
          backgroundColor: backgroundColor,
        });
      }}>
      <Image style={styles.image} source={image} />
      <Text style={styles.text}>{theme?.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: 15,
  },
  text: {
    fontFamily: Fonts.subtitle,
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});

export default ThemeCard;
