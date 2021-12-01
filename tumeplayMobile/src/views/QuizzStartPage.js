import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Button from '../components/Button';
import CategorieIndicator from '../components/CategorieIndicator';
import {Colors, Fonts} from '../styles/Style';
import bg from '../assets/Quiiz_BG.png';

const QuizzStartPage = ({navigation}) => {
  console.log(navigation);
  return (
    <ImageBackground source={bg} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.title}> Joue et teste tes connaissances !</Text>
      </TouchableOpacity>
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Prêt.e ?</Text>
          <Text style={styles.text}>
            Réponds à <Text style={styles.redText}>10 questions</Text> et gagne
            jusqu'à <Text style={styles.redText}>1000 points</Text>
          </Text>
        </View>
        <CategorieIndicator />
      </View>
      <Button size="medium" text="C'est parti" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 30,
    lineHeight: 38,
  },
  textContainer: {
    width: 230,
    height: 80,
    alignItems: 'center',
    marginBottom: 18,
  },
  text: {
    fontSize: 18,
    lineHeight: 27,
    fontWeiht: '600',
  },
  redText: {
    color: Colors.primary,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
});

export default QuizzStartPage;
