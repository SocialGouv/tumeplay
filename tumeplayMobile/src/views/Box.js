import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import wave from '../assets/wave.png';
import BoxCard from '../components/BoxCard';
import Container from '../components/global/Container';
import {Colors, Fonts} from '../styles/Style';
import box1 from '../assets/box1.png';
import box2 from '../assets/box2.png';
import box3 from '../assets/box3.png';
import Icon from 'react-native-vector-icons/Ionicons';

const Box = ({navigation}) => {
  const boxes = [
    {
      label: 'param1',
      title: 'DÉCOUVRE TON CORPS',
      description: 'Un contenu ludique',
      moreInfo: 'lorem ipsum',
      image: box1,
    },
    {
      label: 'param2',
      title: 'LES PREMIÈRES FOIS',
      description: 'Se lancer sans prise de tête',
      moreInfo: 'lorem ipsum',
      image: box2,
    },
    {
      label: 'param3',
      title: 'EXPLORE TA SEXUALITÉ',
      description: 'Expérimente et développe ton plaisir',
      moreInfo: 'lorem ipsum',
      image: box3,
    },
  ];
  return (
    <Container style={styles.container}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="md-arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Ta box</Text>
      <Image style={styles.wave} source={wave} />
      <View style={styles.subtitleContainer}>
        <Text style={styles.congrats}>Bravo !</Text>
        <Text style={styles.description}>
          Tu as assez de points pour commander une box de ton choix
        </Text>
      </View>
      <View style={styles.boxList}>
        {boxes &&
          boxes.map((box, index) => {
            return (
              <View key={index} style={styles.box}>
                <BoxCard
                  index={index + 1}
                  title={box.title}
                  description={box.description}
                  moreInfo={box.moreInfo}
                  box={box}
                  image={box.image}
                  navigation={navigation}
                />
              </View>
            );
          })}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    paddingVertical: 21,
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 28,
    lineHeight: 38,
    color: Colors.black,
  },
  subtitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  congrats: {
    color: 'red',
    fontSize: 22,
    fontWeight: '600',
  },
  description: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  wave: {
    width: 26,
    height: 10,
  },
  boxList: {
    width: '100%',
  },
  box: {
    marginBottom: 2,
  },
  backButton: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 16,
  },
});

export default Box;
