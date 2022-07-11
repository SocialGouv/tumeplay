import {TouchableOpacity, StyleSheet, View, Share} from 'react-native';
import Text from '../Text';
import React, {useContext} from 'react';
import Container from '../global/Container';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import config from '../../../config';
import SponsorshipTextInfos from './SponsorshipTextInfo';
import SponsorshipInfoCard from './SponsorshipInfoCard';
import Button from '../Button';
import AppContext from '../../../AppContext';

const Sponsorship = ({route}) => {
  const path = route?.params?.path;
  const {user} = useContext(AppContext);
  const navigation = useNavigation();
  const handleNavigation = () => {
    if (path === 'Order') {
      navigation.navigate('OrderFinalStep');
    } else {
      navigation.navigate('Menu');
    }
  };

  const handleShare = async () => {
    await Share.share({
      message: `Rejoins moi sur Tumeplay avec mon code parainage : TUNOUSPLAY${user.id}`,
      title: 'Tumeplay Mobile',
    });
  };

  return (
    <Container style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => handleNavigation()}>
        <Icon name="chevron-left" size={40} />
        <Text>Retour</Text>
      </TouchableOpacity>
      <Divider style={styles.divider} />
      <SponsorshipTextInfos />
      <SponsorshipInfoCard sponsor_code={`TUNOUSPLAY${user.id}`} />
      <View style={styles.bottomContainer}>
        <Text style={styles.code}>TUNOUSPLAY{user.id}</Text>
        <Button
          size="intermediate"
          text="Je partage mon code"
          onPress={handleShare}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  divider: {
    width: config.deviceWidth,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    height: 83,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: config.deviceWidth,
    height: config.deviceHeight / 3.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 50,
  },
  code: {
    fontSize: 22,
    fontWeight: '600',
  },
});

export default Sponsorship;
