import React, {useContext, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import TopLevelPointIndicator from '../TopLevelPointIndicator';
import wave from '../../../assets/wave.png';
import thumbsup from '../../../assets/custom_images/thumbs_up.png';
import Button from '../../Button';
import {Fonts} from '../../../styles/Style';
import AppContext from '../../../../AppContext';

const QuizzAllRight = ({pointsEarned, navigation}) => {
  const context = useContext(AppContext);
  const points = context.points;
  const setPoints = context.setPoints;

  console.log('POINTS', pointsEarned);

  useEffect(() => {
    setPoints(points + pointsEarned);
  }, []);

  return (
    <View style={styles.container}>
      <TopLevelPointIndicator style={styles.pointIndicator} />
      <Text style={styles.title}>BIEN JOUÉ</Text>
      <Image source={wave} />
      <Text style={styles.subtitle}>Bravo</Text>
      <Image source={thumbsup} style={styles.imageThumb} />
      <Text style={styles.description}>
        Aucune mauvaise réponse dans cette série de questions :)
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.text}>Non pas tout de suite</Text>
      </TouchableOpacity>
      <Button text={'Je continue'} size={'large'} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  pointIndicator: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 30,
    lineHeight: 38,
    marginTop: 49,
  },
  subtitle: {
    fontFamily: Fonts.subtitle,
    fontSize: 22,
    lineHeight: 28,
    marginTop: 28,
    marginBottom: 17,
  },
  imageThumb: {
    width: 60,
    height: 60,
    marginBottom: 23,
  },
  description: {
    fontFamily: Fonts.strongText,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  button: {
    position: 'absolute',
    bottom: 5,
  },
});

export default QuizzAllRight;
