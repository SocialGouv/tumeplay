import React, {useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Text from '../components/Text';
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
    tmpUser.level = 1;
    await EncryptedStorage.setItem(
      'user',
      JSON.stringify({
        user_id: tmpUser.user_id,
        first_name: tmpUser.first_name,
        isOnboarded: tmpUser.isOnboarded,
        isSignedUp: tmpUser.isSignedUp,
        isUnder25: tmpUser.isOnboarded,
        ageRange: tmpUser.ageRange,
        level: tmpUser.level,
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
    tmpUser.isUnder25 = value !== '25+';
    tmpUser.ageRange = value;
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
        ageRange: tmpUser.ageRange,
        region: tmpUser.region,
        user_id: tmpUser.user_id,
      },
    });
  };

  const radio_props_age = [
    {label: '- de 13 ans', value: '-13', key: '- de 13 ans'},
    {label: '13-15 ans', value: '13-15', key: '13-15 ans'},
    {label: '16-18 ans', value: '16-18', key: '16-18 ans'},
    {label: '18-20 ans', value: '18-20', key: '18-20 ans'},
    {label: '20-22 ans', value: '20-22', key: '20-22 ans'},
    {label: '22-25 ans', value: '22-25', key: '22-25 ans'},
    {label: '+ de 25 ans', value: '25+', key: '+ de 25 ans'},
  ];

  const radio_props_location = [
    {
      label: 'Région Île-de-France',
      value: 'Ile-de-France',
      key: 'Région Ile-de-France',
    },
    {
      label: 'Région Nouvelle Aquitaine',
      value: 'Nouvelle Aquitaine',
      key: 'Région Nouvelle Aquitaine',
    },
    {label: 'Région Guyane', value: 'Guyane', key: 'Région Guyane'},
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
          special
          text={'Je valide mon profil'}
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
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    marginTop: 33,
    fontSize: 30,
    lineHeight: 40,
    fontFamily: Fonts.title,
    textAlign: 'center',
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
    color: 'black',
    paddingBottom: 20,
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 30,
    paddingHorizontal: 16,
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
    color: 'black',
  },
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    borderColor: Colors.grey,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputIOSContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
});

export default Signup;
