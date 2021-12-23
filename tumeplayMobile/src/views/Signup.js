import React, {useEffect} from 'react';
import {Text, StyleSheet, ImageBackground, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import EncryptedStorage from 'react-native-encrypted-storage';
import Button from '../components/Button';
import {Colors, Fonts} from '../styles/Style';
import {useMutation} from '@apollo/client';
import {POST_MOBILE_USER} from '../services/api/mobile_users';

const Signup = ({user, setUser}) => {
  let tmpUser = {...user};

  const generateID = () => {
    const user_id =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    tmpUser.user_id = user_id;
    setUser({...tmpUser});
  };

  const [signUpUser] = useMutation(POST_MOBILE_USER, {
    onError(error) {
      console.log('ERR', error);
    },
  });

  const handleUserAge = value => {
    tmpUser.isUnder25 = value;
    setUser({...tmpUser});
  };

  const handleChangeName = e => {
    tmpUser.first_name = e;
    setUser({...tmpUser});
  };

  const handleChangeRegion = e => {
    tmpUser.region = e;
    setUser({...tmpUser});
  };

  const handleValidation = async () => {
    tmpUser.isSignedUp = true;
    tmpUser.points = 0;
    try {
      await signUpUser({
        variables: {
          first_name: tmpUser.first_name,
          isOnboarded: tmpUser.isOnboarded,
          isSignedUp: tmpUser.isSignedUp,
          isUnder25: tmpUser.isUnder25,
          points: tmpUser.points,
          user_id: tmpUser.user_id,
        },
      });
      setUser({...tmpUser});
    } catch (err) {
      console.log('ICI', err);
    }
    await EncryptedStorage.setItem(
      'user',
      JSON.stringify({
        user_id: tmpUser.user_id,
        first_name: tmpUser.first_name,
        isOnboarded: tmpUser.isOnboarded,
        isSignedUp: tmpUser.isSignedUp,
        isUnder25: tmpUser.isOnboarded,
        points: tmpUser.points,
        region: tmpUser.region,
      }),
    );
  };

  const radio_props = [
    {label: '14-18 ans', value: true, key: '14-18 ans'},
    {label: '18-25 ans', value: true, key: '18-25 ans'},
    {label: '+ de 25 ans', value: false, key: '+ de 25 ans'},
  ];

  const radio_props_location = [
    {
      label: 'Région Ile-de-France',
      value: 'Région Ile-de-France',
      key: 'Région Ile-de-France',
    },
    {
      label: 'Région Nouvelle Aquitaine',
      value: 'Région Nouvelle Aquitaine',
      key: 'Région Nouvelle Aquitaine',
    },
    {label: 'Région Guyane', value: 'Région Guyane', key: 'Région Guyane'},
    {label: 'Autres régions', value: 'Autres régions', key: 'Autres régions'},
  ];

  useEffect(() => {
    generateID();
  }, []);

  return (
    <ImageBackground style={styles.container}>
      <Text style={styles.title}>Ton profil</Text>
      <TextInput
        style={styles.textInput}
        name="firstname"
        placeholder="Ton prénom"
        onChangeText={e => handleChangeName(e)}
      />
      <RNPickerSelect
        onValueChange={e => handleUserAge(e)}
        style={{...pickerSelectStyle}}
        placeholder={{label: "Ta tranche d'âge", value: null}}
        name="isUnder25"
        items={radio_props}
      />
      <RNPickerSelect
        onValueChange={e => handleChangeRegion(e)}
        style={{...pickerSelectStyle}}
        placeholder={{label: 'Tu habites', value: null}}
        name="region"
        items={radio_props_location}
      />
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
  textInput: {
    width: 350,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    fontSize: 18,
  },
  button: {
    bottom: 0,
  },
});

const pickerSelectStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: Colors.grey,
    borderRadius: 4,
    color: Colors.corail,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputIOSContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
});

export default Signup;
