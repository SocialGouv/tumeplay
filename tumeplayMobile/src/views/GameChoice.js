import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../components/Text';
import React, {useContext} from 'react';
import Container from '../components/global/Container';
import handleRedirection from '../services/handleRedirection';
import AppContext from '../../AppContext';
import Event from '../services/api/matomo';
import {Divider} from 'react-native-paper';
import config from '../../config';
import {Colors} from '../styles/Style';
import Icon from 'react-native-vector-icons/Entypo';
import GameCard from '../components/GameChoice/GameCard';

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
      <Divider style={styles.divider} />
      <View>
        <Text style={styles.title}>Selectionne ton jeu</Text>
        <View>
          <GameCard
            title="Tumeplay Classique"
            text="Challenge-toi en répondant à notre quiz par thématique"
            onPress={() => {
              Event.playEvent('home');
              navigation.navigate('QuizzModule', handleRedirection(user));
            }}
          />
          <GameCard
            title="Sextus"
            text="Sauras-tu trouver notre mot caché en 6 essais"
            onPress={() => {
              Event.playSextusEvent('StartGame');
              navigation.navigate('Sextus');
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  backLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: config.deviceWidth * 0.05,
    color: Colors.black,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default GameChoice;
