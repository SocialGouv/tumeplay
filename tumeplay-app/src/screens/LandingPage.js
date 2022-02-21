import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../styles/Color';

const REACT_APP_ZONE = process.env.REACT_APP_ZONE;
const REACT_APP_OTHER_ZONE_URL = process.env.REACT_APP_OTHER_ZONE_URL;

const LandingPage = props => {
  const france = require('../assets/pictures/cartefrance.svg');
  const guyane = require('../assets/pictures/carteguyane.svg');
  const logo = require('../assets/pictures/logoTumeplay.svg');
  const param = '?zone_choice=true';

  const handleRedirection = name => {
		console.log(navigator.userAgent)
    if (REACT_APP_ZONE === name) {
      if (name === 'metropole' && navigator.userAgent.match(/Android/i)) {
        window.location.href = 'landing.html';
      } else {
        props.navigation.navigate('LandingScreen');
      }
    } else {
      if (name === 'metropole') {
        window.location.href = REACT_APP_OTHER_ZONE_URL + 'landing.html';
      } else {
        window.location.href = REACT_APP_OTHER_ZONE_URL + param;
      }
    }
  };

  return (
    <View style={style.container}>
      <Image style={style.logo} source={logo} resizeMode="contain" />
      <View style={style.titleContainer}>
        <Text style={style.title}>Hello ! Où es-tu ?</Text>
      </View>
      <View style={style.cardContainer}>
        <View style={style.column}>
          <TouchableOpacity
            style={style.card}
            onPress={() => {
              handleRedirection('metropole');
            }}>
            <Image style={style.image} resizeMode="contain" source={france} />
          </TouchableOpacity>
          <TouchableOpacity style={style.button}>
            <Text
              style={style.text}
              onPress={() => {
                handleRedirection('metropole');
              }}>
              Hexagone
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.column}>
          <TouchableOpacity
            style={style.card}
            onPress={() => {
              handleRedirection('guyane');
            }}>
            <Image style={style.image} resizeMode="contain" source={guyane} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={() => {
              handleRedirection('guyane');
            }}>
            <Text style={style.text}>Guyane</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: Colors.backgroundColor,
    textAlign: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  appTitle: {
    color: Colors.secondaryText,
    fontFamily: Colors.appTitleFont,
    fontSize: 44,
    lineHeight: 34,
    marginBottom: 0,
    paddingBottom: 0,
    flex: 2,
  },
  dot: {
    fontSize: 20,
    color: Colors.mainButton,
  },
  title: {
    color: Colors.mainButton,
    fontFamily: Colors.appTitleFont,
    fontSize: 30,
    lineHeight: 34,
    marginTop: 5,
    paddingBottom: 0,
    flex: 2,
  },
  cardContainer: {
    flexDirection: 'row',
    marginVertical: 50,
    height: '25rem',
  },
  column: {
    flexDirection: 'column',
    width: '50%',
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  text: {
    color: '#FFFF',
    fontFamily: Colors.appTitleFont,
    fontSize: 20,
    marginVertical: 10,
    paddingBottom: 0,
  },
  image: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    alignSelf: 'center',
    cursor: 'pointer',
    opacity: 1,
  },
  button: {
    backgroundColor: Colors.mainButton,
    borderRadius: 35,
    marginHorizontal: 20,
  },
});

export default LandingPage;
