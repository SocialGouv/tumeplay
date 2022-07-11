import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import Text from '../components/Text';
import RNPickerSelect from 'react-native-picker-select';
import EncryptedStorage from 'react-native-encrypted-storage';
import Button from '../components/Button';
import {Colors, Fonts} from '../styles/Style';
import {useMutation} from '@apollo/client';
import {POST_MOBILE_USER} from '../services/api/mobile_users';
import bg from '../assets/BG_PROFIL.png';
import Container from '../components/global/Container';
import AppContext from '../../AppContext';
import axios from 'axios';

const Signup = ({user, setUser}) => {
  let tmpUser = {...user};
  const {reloadUser, apiUrl} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
      }),
    );
  };

  const [signUpUser] = useMutation(POST_MOBILE_USER, {
    onError(error) {
      setIsLoading(false);
      console.log('error on signup', error);
    },
    onCompleted() {
      setUserInStorage();
      reloadUser();
    },
  });

  const handleUserAge = value => {
    tmpUser.isUnder25 = value !== '25+';
    tmpUser.ageRange = value;
  };

  const handleChangeName = e => {
    tmpUser.first_name = e;
    setUser({...tmpUser});
  };

  const handleChangeRegion = e => {
    tmpUser.region = e;
    setUser({...tmpUser});
  };

  const handleChangeCode = e => {
    setError(false);
    tmpUser.sponsor_code = e;
    setUser({...tmpUser});
  };

  const handleValidation = async () => {
    setIsLoading(true);
    if (tmpUser.sponsor_code) {
      const validated_sponsor_code = await handleSponsorCodeValidation(
        tmpUser.sponsor_code,
      );
      if (validated_sponsor_code) {
        await signUpUser({
          variables: {
            first_name: tmpUser.first_name,
            isOnboarded: tmpUser.isOnboarded,
            isSignedUp: true,
            isUnder25: tmpUser.isUnder25,
            ageRange: tmpUser.ageRange,
            region: tmpUser.region,
            has_followed_tutorial: false,
            user_id: tmpUser.user_id,
            sponsor_code: tmpUser.sponsor_code,
          },
        });
      } else {
        setError(true);
        setIsLoading(false);
      }
    } else {
      await signUpUser({
        variables: {
          first_name: tmpUser.first_name,
          isOnboarded: tmpUser.isOnboarded,
          isSignedUp: true,
          isUnder25: tmpUser.isUnder25,
          ageRange: tmpUser.ageRange,
          region: tmpUser.region,
          has_followed_tutorial: false,
          user_id: tmpUser.user_id,
        },
      });
    }
  };

  const handleSponsorCodeValidation = async value => {
    const code = value.substring(10, value.length);
    const res = await axios.get(
      `${apiUrl}/utilisateurs-mobiles/count?id=${code}`,
    );
    return res.data === 1 ? true : false;
  };

  const radio_props_age = [
    {label: '13-15 ans', value: '13-15', key: '13-15 ans'},
    {label: '16-18 ans', value: '16-18', key: '16-18 ans'},
    {label: '19-21 ans', value: '19-21', key: '18-20 ans'},
    {label: '22-25 ans', value: '22-25', key: '20-22 ans'},
    {label: '+ de 25 ans', value: '25+', key: '+ de 25 ans'},
    {label: 'Autre', value: '-13', key: 'Autre'},
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
        <TextInput
          style={styles.textInput}
          name="sponsor_code"
          placeholder="Code de Parrainage ?"
          placeholderTextColor={Colors.darkgrey}
          onChangeText={e => handleChangeCode(e)}
        />
        {error && (
          <Text style={styles.error}>
            Ce code de parrainage n'existe pas ou n'est pas valide
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Button
            style={styles.button}
            special
            text={'Je valide mon profil'}
            size={'large'}
            onPress={() => handleValidation()}
          />
        )}
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
    height: 50,
    marginTop: 10,
    fontSize: 18,
    color: 'black',
    paddingBottom: 5,
    textAlignVertical: 'center',
  },
  error: {
    color: '#DC3545',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
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
