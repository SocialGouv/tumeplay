import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_THEMES} from '../services/api/themes';
import wave from '../assets/wave.png';
import {Colors, Fonts, bgColors} from '../styles/Style';
import ThemeCard from '../components/ThemeCard';
import dynamite from '../assets/custom_images/dynamite.png';
import hello from '../assets/custom_images/hello.png';
import metal from '../assets/custom_images/metal.png';
import peach from '../assets/custom_images/peach.png';
import peace from '../assets/custom_images/peace.png';
import thumbs_up from '../assets/custom_images/thumbs_up.png';
import Title from '../components/Title';

export default function Thematiques(props) {
  const {navigation} = props;
  const {data, loading} = useQuery(GET_THEMES);
  const [thematiques, setThematiques] = useState([]);

  const images = [dynamite, peace, peach, thumbs_up, metal, hello];

  const displayThematiques = thematiques?.map((theme, index) => {
    return (
      <ThemeCard
        key={index}
        index={index}
        theme={theme}
        backgroundColor={bgColors[index]}
        image={images[index]}
        navigation={navigation}
      />
    );
  });

  useEffect(() => {
    if (data && !loading) {
      setThematiques(data.thematiques);
    }
  }, [data, loading]);

  return (
    <View style={styles.container}>
      <Title />
      <Text style={styles.subtitle}>
        Sélectionne le thème qui t'intéresse le plus
      </Text>
      <View style={styles.themeContainer}>{displayThematiques}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: Fonts.title,
    lineHeight: 38,
    color: Colors.black,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 25,
    alignContent: 'flex-start',
    textAlign: 'left',
    fontFamily: Fonts.subtitle,
    paddingLeft: 2,
    paddingRight: 18,
  },
  themeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
