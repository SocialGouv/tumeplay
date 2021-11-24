import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import RadioForm from 'react-native-simple-radio-button';
import Button from '../components/Button';
import {Colors, Fonts} from '../styles/Style';

const Signup = ({user, setUser}) => {
  let tmpUser = user;

  const handleUserAge = value => {
    tmpUser.isUnder25 = value;
    setUser({...tmpUser});
  };

  const handleChange = e => {
    tmpUser.region = e;
    setUser({...tmpUser});
  };

  const handleValidation = async () => {
    tmpUser.isSignedUp = true;
    setUser({...tmpUser});
    try {
      await EncryptedStorage.setItem(
        'user',
        JSON.stringify({
          user_id: tmpUser.user_id,
          isOnboarded: tmpUser.isOnboarded,
          isSignedUp: tmpUser.isSignedUp,
          isUnder25: tmpUser.isUnder25,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const radio_props = [
    {label: '14-18 ans', value: true},
    {label: '18-25 ans', value: true},
    {label: '+ de 25 ans', value: false},
  ];

  const radio_props_location = [
    {label: 'Région Ile-de-France', value: 'Région Ile-de-France'},
    {label: 'Région Nouvelle Aquitaine', value: 'Région Nouvelle Aquitaine'},
    {label: 'Région Guyane', value: 'Région Guyane'},
    {label: 'Autres régions', value: 'Autres régions'},
  ];

  return (
    <ImageBackground style={styles.container}>
      <Text style={styles.title}>Ton profil</Text>
      <View>
        <Text style={styles.subtitle}>Quelle est ta tranche d'âge ?</Text>
        <View style={styles.radioContainer}>
          <RadioForm
            radio_props={radio_props}
            buttonColor={'#B3B3B3'}
            selectedButtonColor={Colors.black}
            style={styles.labelStyle}
            buttonSize={15}
            labelWrapStyle={styles.radio}
            wrapStyle={styles.radio}
            animation={false}
            onPress={value => handleUserAge(value)}
          />
        </View>
      </View>
      <View style={{marginTop: 35}}>
        <Text style={styles.subtitle}>Tu habites </Text>
        <View style={styles.radioContainer}>
          <RadioForm
            radio_props={radio_props_location}
            buttonColor={'#B3B3B3'}
            selectedButtonColor={Colors.black}
            style={styles.labelStyle}
            buttonSize={15}
            labelWrapStyle={styles.radio}
            wrapStyle={styles.radio}
            animation={false}
            onPress={value => handleChange(value)}
          />
        </View>
      </View>
      <Button
        style={styles.button}
        text={'Je continue'}
        size={'large'}
        onPress={() => handleValidation()}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 18,
    paddingHorizontal: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    lineHeight: 40,
    fontFamily: Fonts.title,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: Fonts.strongText,
    marginBottom: 25,
  },
  radioContainer: {
    marginLeft: 35,
  },
  labelStyle: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: Fonts.text,
  },
  radio: {
    paddingVertical: 11,
  },
  button: {
    position: 'fixed',
    bottom: 0,
  },
});

export default Signup;
