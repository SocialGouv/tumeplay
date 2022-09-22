import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import Container from '../components/global/Container';
import handleRedirection from '../services/handleRedirection';
import Button from '../components/Button';
import AppContext from '../../AppContext';
import Event from '../services/api/matomo';
import {Divider} from 'react-native-paper';
import config from '../../config';
import {Colors} from '../styles/Style';
import Icon from 'react-native-vector-icons/Entypo';
import diceIcon from '../assets/diceIcon.png';

const GameChoice = ({navigation}) => {
  const {user} = useContext(AppContext);
  return (
    <Container style={styles.container}>
      <View style={styles.backLevel}>
        <TouchableOpacity
          style={styles.chevron}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-small-left" size={25} color="#000" />
          <Text>Retour</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>Tumeplay Classique</Text>
        <Image
          style={{
            alignSelf: 'center',
            width: 90,
            height: 90,
          }}
          source={diceIcon}
        />
        <Button
          text="Mode Classique"
          size="medium"
          special
          left
          onPress={() => {
            Event.playEvent('home');
            navigation.navigate('Jouer', handleRedirection(user));
          }}
          icon
          style={styles.button}
        />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.box}>
        <View style={styles.header}>
          <Text style={styles.title}>Découvre Sextus</Text>
          <Text style={styles.subtitle}>Une nouvelle façon de jouer</Text>
        </View>
        <Button
          text="Sextus"
          size="medium"
          left
          icon
          special
          onPress={() => {
            Event.playSextusEvent('StartGame');
            navigation.navigate('Sextus');
          }}
          style={styles.button}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  backLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 20,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  chevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: config.deviceWidth * 0.05,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: config.deviceWidth * 0.04,
    fontStyle: 'italic',
  },
  box: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {},
});

export default GameChoice;
