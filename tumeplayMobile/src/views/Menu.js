import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import Container from '../components/global/Container';
import React from 'react';
import Text from '../components/Text';
import {useNavigation} from '@react-navigation/native';
import SponsorCard from '../components/Menu/SponsorCard';
import config from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinkOpenner from '../components/global/LinkOpenner';
import Event from '../services/api/matomo';

const Menu = () => {
  const navigation = useNavigation();
  const handleCall = () => {
    const phoneNumber = '0800235236';
    const dialNumber = `tel:${phoneNumber}`;

    Linking.openURL(dialNumber).catch(error => {
      console.log(
        "Erreur lors de l'ouverture du composeur téléphonique:",
        error,
      );
    });
    Event.sosButtonClickEvent();
  };
  return (
    <Container style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Icon name="close" color="#000" size={25} />
        <Text>Fermer</Text>
      </TouchableOpacity>
      <SponsorCard navigation={navigation} />
      <View style={styles.linkContainer}>
        <LinkOpenner
          url={'https://tumeplay.fabrique.social.gouv.fr/legal/mobile'}
          style={styles.link}>
          <Icon name="open-in-new" size={15} style={styles.icon} />

          <Text>Mentions légales</Text>
        </LinkOpenner>
        <LinkOpenner
          url={'https://tumeplay.fabrique.social.gouv.fr/confidentiality'}
          style={styles.link}>
          <Icon name="open-in-new" size={15} style={styles.icon} />

          <Text>Politique de Confidentialité</Text>
        </LinkOpenner>
        <LinkOpenner url={'https://www.tumeplay.com/cgu'} style={styles.link}>
          <Icon name="open-in-new" size={15} style={styles.icon} />
          <Text>Conditions Générales d'Utilisation</Text>
        </LinkOpenner>
        <View style={styles.sosContainer}>
          <TouchableOpacity style={styles.sosButton} onPress={handleCall}>
            <Icon color="#ffffff" name="call" size={24} />
            <Text style={styles.sosContent}>SOS Sexualité</Text>
          </TouchableOpacity>
          <Text style={styles.sosTitle}>
            Sexualité / Contraception / IVG - 0 800 235 236 :
          </Text>
          <Text style={styles.sosDescription}>
            Numéro gratuit pour répondre à toutes les questions sur les
            sexualités, la contraception et l’IVG.
          </Text>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  button: {
    position: 'absolute',
    top: config.deviceHeight * 0.06,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'flex-start',
  },
  icon: {
    marginRight: 10,
  },
  sosContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  sosButton: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderRadius: 16,
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    color: 'white',
    width: '50%',
  },
  sosContent: {
    color: 'white',
    paddingLeft: 10,
    fontWeight: '600',
  },
  sosTitle: {
    fontWeight: '600',
  },
  sosDescription: {
    textAlign: 'center',
  },
});

export default Menu;
