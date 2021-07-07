import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import Styles from '../styles/Styles'
import Colors from '../styles/Color'

const LandingPage = (props) => {

  const france = require('../assets/pictures/France.png')
  const guyane = require('../assets/pictures/Guyane.png')

  const handleRedirection = (name) => {
    if(name === 'guyane') {
      window.location.href = 'https://guyane.tumeplay.numericite.fr/'
    } else {
      props.navigation.navigate('LandingScreen')
    }
  }

  return(
    <View style={style.container}>
      <Text style={Styles.appTitle}>D'ou viens tu ?</Text>
      <View style={style.cardContainer}>
        <TouchableOpacity style={style.card} onPress={() => {handleRedirection('metropole')}}>
          <Text style={style.text}>
            Hexagone
          </Text>
          <Image style={style.image} resizeMode='contain' source={france}/>
        </TouchableOpacity>
        <TouchableOpacity style={style.card} onPress={() => {handleRedirection('guyane')}}>
          <Text style={style.text}>
            Guyane
          </Text>
          <Image style={style.image} resizeMode='contain' source={guyane}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: Colors.backgroundColor,
    textAlign: 'center'
  },
  title: {
    color: Colors.secondaryText,
    fontFamily: Colors.appTitleFont,
    fontSize: 30,
    lineHeight: 34,
    marginVertical: 15,
    paddingBottom: 0,
    flex: 2,
  },
  cardContainer: {
    flexDirection: 'row',
    marginVertical: 75,
    height: '25rem',
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: Colors.mainColor,
    borderRadius: 15,
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 1,
  },
  text: {
    color: Colors.titleCardColor,
    fontFamily: Colors.appTitleFont,
    fontSize: 30,
    marginVertical: 10,
    paddingBottom: 0,
  },
  image: {
    width: 250,
    height: 250,
    marginHorizontal: "10%",
    marginVertical: "10%",
    opacity: 0.6
  }
})

export default LandingPage;
