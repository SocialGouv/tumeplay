import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Button from '../components/Button';
import wave from '../assets/wave.png';
import bg1 from '../assets/BG.png';
import bg2 from '../assets/BG_2.png';
import bg3 from '../assets/BG_3.png';
import {Colors, Fonts} from '../styles/Style';
import Swiper from 'react-native-swiper';
import Container from '../components/global/Container';

export default function Onboarding({user, setUser}) {
  const [steps, setSteps] = useState([
    {
      title: 'EN APPRENDRE PLUS SUR LA SEXUALITÉ',
      img: '✌️',
      description:
        'Choisis une ou plusieurs thématiques et consulte des contenus pensés pour toi ',
    },
    {
      title: 'EN APPRENDRE PLUS SUR LA SEXUALITÉ',
      img: '🤓',
      description: 'Joue et teste tes connaissances sur la sexualité. Prêt.e ?',
    },
    {
      title: 'EN APPRENDRE PLUS SUR LA SEXUALITÉ',
      img: '🎉',
      description:
        'Grâce aux badges remportés , commande gratuitement une des box de ton choix remplie de préservatifs et autres accessoires',
    },
  ]);

  const [customBackground, setCustomBackground] = useState(bg1);

  const changeBackground = currentIndex => {
    if (currentIndex === 0) {
      setCustomBackground(bg1);
    }
    if (currentIndex === 1) {
      setCustomBackground(bg2);
    }
    if (currentIndex === 2) {
      setCustomBackground(bg3);
    }
  };

  const title = 'EN APPRENDRE PLUS SUR LA SEXUALITÉ';

  const finishOnboarding = () => {
    let tmpUser = user;
    tmpUser.isOnboarded = true;
    tmpUser.points = 0;
    setUser({...tmpUser});
  };

  const displaySwipperContent = steps.map((step, i) => {
    return (
      <View key={i}>
        <Text style={styles.stepImg}>{step.img}</Text>
        <Text style={styles.description}>{step.description}</Text>
      </View>
    );
  });

  return (
    <Container style={styles.container} background={customBackground}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.imgTitle} source={wave} />
        <Swiper
          onIndexChanged={index => changeBackground(index)}
          loop={false}
          containerStyle={styles.swipperContainer}
          dotColor={Colors.corail}
          activeDotColor={Colors.black}
          horizontal>
          {displaySwipperContent}
        </Swiper>
      </View>
      <Button
        text={'Je commence'}
        size={'large'}
        icon={true}
        style={styles.button}
        onPress={() => finishOnboarding()}
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    paddingHorizontal: 35,
    paddingTop: 35,
    paddingBottom: 7,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: Fonts.title,
    lineHeight: 38,
    color: Colors.black,
  },
  swipperContainer: {
    flex: 1,
    minHeight: 270,
  },
  imgTitle: {
    marginBottom: 35,
  },
  stepImg: {
    textAlign: 'center',
    fontSize: 60,
    marginVertical: 20,
  },
  description: {
    paddingHorizontal: 35,
    lineHeight: 27,
    fontSize: 18,
    fontFamily: Fonts.strongText,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 30,
  },
});
