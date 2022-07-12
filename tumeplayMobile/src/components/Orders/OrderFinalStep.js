import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import Text from '../Text';
import Container from '../../components/global/Container';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import config from '../../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Title from '../Title';
import congrats from '../../assets/custom_images/congrats.png';
import SponsorshipTextInfos from '../Sponsorship/SponsorshipTextInfos';
import Button from '../Button';

const OrderFinalStep = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Sponsorship', {
      path: 'Order',
    });
  };

  return (
    <Container style={styles.container}>
      <TouchableOpacity
        style={styles.topButton}
        onPress={() => navigation.navigate('Home', {screen: 'Accueil'})}>
        <Icon name="close" size={25} />
        <Text>Femer</Text>
      </TouchableOpacity>
      <Title title="MERCI !" />
      <Image source={congrats} style={styles.image} />
      <Text style={styles.title}>
        Ta commande de kit a bien été prise en compte !
      </Text>
      <Text style={styles.text}>
        Nous t'avons envoyé un email de confirmation
      </Text>
      <View style={styles.bottomContainer}>
        <SponsorshipTextInfos />
        <Button
          text={'Je parraine des amis'}
          size="large"
          icon={true}
          style={styles.button}
          onPress={handlePress}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: config.deviceHeight * 0.1,
    alignItems: 'center',
  },
  topButton: {
    position: 'absolute',
    top: config.deviceHeight * 0.06,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-start',
    height: config.deviceHeight * 0.4,
    width: '100%',
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    borderRadius: 50,
  },
  image: {
    width: 40,
    height: 40,
    marginVertical: 25,
  },
  title: {
    fontWeight: '600',
    fontSize: config.deviceWidth * 0.05,
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontWeight: '400',
    fontSize: config.deviceWidth * 0.04,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
});

export default OrderFinalStep;
