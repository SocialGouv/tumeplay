import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import EncryptedStorage from 'react-native-encrypted-storage';
import Button from '../components/Button';
import {Colors, Fonts} from '../styles/Style';
import {useMutation} from '@apollo/client';
import {POST_MOBILE_USER} from '../services/api/mobile_users';
import bg from '../assets/BG_PROFIL.png';
import Container from '../components/global/Container';

const Signup = ({user, setUser}) => {
  let tmpUser = {...user};

  const generateID = () => {
    const user_id =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    tmpUser.user_id = user_id;
    setUser({...tmpUser});
  };

  const setUserInStorage = async () => {
    tmpUser.isSignedUp = true;
    tmpUser.points = 0;
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
    setUser({...tmpUser});
  };

  const [signUpUser] = useMutation(POST_MOBILE_USER, {
    onError(error) {
      console.log('error on signup', error);
    },
    onCompleted() {
      setUserInStorage();
    },
  });

  const handleUserAge = value => {
    if (value === '14-18 ans' || value === '18-25 ans') {
      tmpUser.isUnder25 = true;
    } else {
      tmpUser.isUnder25 = false;
    }
    console.log(value);
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
    await signUpUser({
      variables: {
        first_name: tmpUser.first_name,
        isOnboarded: tmpUser.isOnboarded,
        isSignedUp: true,
        isUnder25: tmpUser.isUnder25,
        points: 0,
        user_id: tmpUser.user_id,
      },
    });
  };

  const radio_props_age = [
    {label: '14-18 ans', value: '14-18 ans', key: '14-18 ans'},
    {label: '18-25 ans', value: '18-25 ans', key: '18-25 ans'},
    {label: '+ de 25 ans', value: '+ de 25 ans', key: '+ de 25 ans'},
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
    <Container background={bg}>
      <Text style={styles.title}>ton profil</Text>
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.textInput}
          name="firstname"
          placeholder="Ton prénom"
          placeholderTextColor={Colors.darkgrey}
          onChangeText={e => handleChangeName(e)}
        />
        <RNPickerSelect
          onValueChange={e => handleUserAge(e)}
          style={{...pickerSelectStyle}}
          useNativeAndroidPickerStyle={false}
          placeholder={{label: "Ta tranche d'âge", value: null}}
          name="isUnder25"
          items={radio_props_age}
        />
        <RNPickerSelect
          onValueChange={e => handleChangeRegion(e)}
          style={{...pickerSelectStyle}}
          useNativeAndroidPickerStyle={false}
          placeholder={{label: 'Tu habites', value: null}}
          name="region"
          items={radio_props_location}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          text={'Je continue'}
          size={'large'}
          onPress={() => handleValidation()}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  infoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 18,
    paddingTop: 50,
  },
  title: {
    marginTop: 33,
    fontSize: 30,
    lineHeight: 40,
    fontFamily: Fonts.title,
    textAlign: 'center',
    color: Colors.black,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: Fonts.strongText,
    marginBottom: 25,
  },
  textInput: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    fontSize: 18,
    color: Colors.black,
    paddingBottom: 20,
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 30,
  },
});

const pickerSelectStyle = StyleSheet.create({
  placeholder: {
    color: Colors.darkgrey,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  inputAndroid: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    fontSize: 18,
    paddingVertical: 20,
  },
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    borderColor: Colors.grey,
    borderRadius: 4,
    color: Colors.black,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputIOSContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    marginHorizontal: 18,
  },
});

export default Signup;
