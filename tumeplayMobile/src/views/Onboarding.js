import React, {createRef, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from '../components/Text';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import Button from '../components/Button';
import wave from '../assets/wave.png';
import bg1 from '../assets/BG.png';
import bg2 from '../assets/BG_2.png';
import bg3 from '../assets/BG_3.png';
import {Colors, Fonts} from '../styles/Style';
import Swiper from 'react-native-swiper';
import Container from '../components/global/Container';
import config from '../../config';

export default function Onboarding({user, setUser}) {
  const swiper = createRef();
  const {width} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [steps, setSteps] = useState([
    {
      title: 'EN APPRENDRE PLUS SUR LA SEXUALITÉ',
      img: '✌️',
      html: "Choisis une ou plusieurs thématiques et<span style='color:red'> consulte des contenus </span> pensés pour toi",
    },
    {
      title: 'EN APPRENDRE PLUS SUR LA SEXUALITÉ',
      img: '🤓',
      html: "Joue et <span style='color:red;'>teste tes connaissances</span> sur la sexualité. Prêt.e ?</span>",
    },
    {
      title: 'EN APPRENDRE PLUS SUR LA SEXUALITÉ',
      img: '🎉',
      html: "Grâce aux badges remportés, joue, accumule des récompenses, et <span style='color:red;'> commande gratuitement un kit</span> de ton choix ...",
    },
  ]);

  const [customBackground, setCustomBackground] = useState(bg1);

  const changeBackground = index => {
    setCurrentIndex(index);
    if (index === 0) {
      setCustomBackground(bg1);
    }
    if (index === 1) {
      setCustomBackground(bg2);
    }
    if (index === 2) {
      setCustomBackground(bg3);
    }
  };

  const title = 'EN APPRENDRE PLUS SUR LA SEXUALITÉ';

  const finishOnboarding = () => {
    let tmpUser = user;
    tmpUser.isOnboarded = true;
    setUser({...tmpUser});
  };
  const displaySwipperContent = steps.map((step, i) => {
    return (
      <View key={i}>
        <Text style={styles.stepImg}>{step.img}</Text>
        <RenderHtml
          baseStyle={styles.description}
          contentWidth={width}
          source={step}
        />
      </View>
    );
  });

  return (
    <Container style={styles.container} background={customBackground}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.imgTitle} source={wave} />
        <Swiper
          ref={swiper}
          onIndexChanged={index => changeBackground(index)}
          loop={false}
          containerStyle={styles.swipperContainer}
          dotColor={Colors.corail}
          activeDotColor={Colors.black}
          paginationStyle={{position: 'absolute', bottom: '10%'}}
          horizontal>
          {displaySwipperContent}
        </Swiper>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text={currentIndex === 2 ? 'Je commence' : 'Suivant'}
          size={'large'}
          icon={true}
          style={styles.button}
          onPress={() => {
            if (currentIndex === 2) {
              finishOnboarding();
            } else {
              swiper.current.scrollBy(currentIndex + 1, true);
            }
          }}
        />
      </View>
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
    marginVertical: config.deviceWidth * 0.05,
  },
  title: {
    paddingHorizontal: config.deviceWidth * 0.08,
    paddingTop: config.deviceWidth * 0.08,
    paddingBottom: 7,
    fontSize: config.deviceWidth * 0.08,
    textAlign: 'center',
    fontFamily: Fonts.title,
    lineHeight: config.deviceWidth * 0.1,
  },
  swipperContainer: {
    flex: 1,
    minHeight: config.deviceWidth <= 350 ? '47%' : '40%',
  },
  imgTitle: {
    marginBottom: config.deviceWidth * 0.05,
  },
  stepImg: {
    textAlign: 'center',
    fontSize: config.deviceWidth * 0.12,
    marginVertical: config.deviceWidth * 0.02,
  },
  description: {
    paddingHorizontal: config.deviceWidth * 0.1,
    lineHeight: 27,
    fontSize: config.deviceWidth * 0.045,
    fontFamily: Fonts.strongText,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: config.deviceWidth * 0.08,
  },
});
