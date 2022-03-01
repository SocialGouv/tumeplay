import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import Text from '../components/Text';
import {Fonts} from '../styles/Style';

const ThemeCard = props => {
  const {theme, backgroundColor, borderColors, image, navigation, thematiques} =
    props;

  return (
    <TouchableOpacity
      key={theme?.id}
      style={[
        styles.cardContainer,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ]}
      onPress={() => {
        navigation.navigate('ContentsPage', {
          theme_id: theme.id,
          theme_title: theme.title,
          backgroundColor: backgroundColor,
          thematiques: thematiques,
        });
      }}>
      <Image style={styles.image} source={{uri: image}} />
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
    width: 40,
    height: 40,
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
