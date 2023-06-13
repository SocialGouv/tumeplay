import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Container from '../components/global/Container';
import React from 'react';
import Text from '../components/Text';
import {useNavigation} from '@react-navigation/native';
import SponsorCard from '../components/Menu/SponsorCard';
import config from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinkOpenner from '../components/global/LinkOpenner';

const Menu = () => {
  const navigation = useNavigation();
  return (
    <Container style={styles.container}>
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
});

export default Menu;
