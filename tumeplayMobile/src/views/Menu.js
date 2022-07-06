import {StyleSheet, TouchableOpacity} from 'react-native';
import Container from '../components/global/Container';
import React from 'react';
import Text from '../components/Text';
import {useNavigation} from '@react-navigation/native';
import SponsorCard from '../components/Menu/SponsorCard';
import config from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Menu = ({route}) => {
  // const user = route.params.user;
  const navigation = useNavigation();
  return (
    <Container style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Icon name="close" size={25} />
        <Text>Femer</Text>
      </TouchableOpacity>
      <SponsorCard navigation={navigation} />
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
});

export default Menu;
