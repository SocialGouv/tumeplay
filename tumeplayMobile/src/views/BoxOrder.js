import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Container from '../components/global/Container';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeOrdersInput from '../components/Orders/HomeOrdersInput';

const Box = ({navigation, route}) => {
  const {box} = route.params;
  const [selected, setSelected] = useState(true);
  const [deliveryMode, setDeliveryMode] = useState('home');
  return (
    <Container style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="md-arrow-back" size={30} color="#000" />
        <Text>retour</Text>
      </TouchableOpacity>
      <View style={styles.boxContainer}>
        <Text>Tu as séléctionné</Text>
        <View>
          <Text style={styles.redText}>KIT {box.number}</Text>
          <Text style={styles.boxTitle}>{box.title}</Text>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.subtitle}>
            Où souhaites-tu recevoir ton kit ?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setDeliveryMode('home')}
              style={[
                styles.buttons,
                styles.buttonLeft,
                deliveryMode === 'home'
                  ? styles.activeButton
                  : styles.nonActiveButton,
              ]}>
              <Text
                style={
                  deliveryMode === 'home' ? styles.whiteText : styles.blackText
                }>
                A DOMICILE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // disabled={true}
              onPress={() => setDeliveryMode('pickup')}
              style={[
                styles.buttons,
                styles.buttonRight,
                deliveryMode === 'pickup'
                  ? styles.activeButton
                  : styles.nonActiveButton,
              ]}>
              <Text
                style={
                  deliveryMode === 'pickup'
                    ? styles.whiteText
                    : styles.blackText
                }>
                EN POINT RELAIS
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.divider, {marginBottom: 0}]} />
          <View style={styles.inputContainer}>
            {deliveryMode === 'home' && <HomeOrdersInput />}
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    paddingVertical: 21,
  },
  boxContainer: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 22,
  },
  backButton: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  redText: {
    color: '#D42201',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    paddingLeft: 22,
  },
  boxTitle: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    paddingLeft: 22,
  },
  divider: {
    width: '100%',
    borderColor: '#EAE2D7',
    borderWidth: 1,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    paddingLeft: 22,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 26,
  },
  buttons: {
    borderColor: '#EAE2D7',
    borderWidth: 1,
    minHeight: 38,
    width: 125,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#000',
  },
  buttonRight: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  whiteText: {
    color: '#FFF',
  },
  blackText: {
    color: '#000',
  },
  activeButton: {
    backgroundColor: '#000',
  },
  nonActiveButton: {
    backgroundColor: '#FFFF',
  },
  inputContainer: {
    backgroundColor: '#FFFF',
    minHeight: '100%',
  },
});

export default Box;
