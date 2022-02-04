import {StyleSheet, TouchableOpacity, Text, Alert, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import _ from 'lodash';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button';

const HomeOrdersInput = props => {
  const navigation = useNavigation();
  const {userInfos, setUserInfos, setOrderConfirm} = props;

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Champs Obligatoire'),
    last_name: Yup.string().required('Champs Obligatoire'),
    email: Yup.string()
      .email('Email non valide')
      .required('Champs Obligatoire'),
    address: Yup.string().required('Champs Obligatoire'),
    phone_number: Yup.string().required('Champs Obligatoire'),
  });

  const [geogouvData, setGeogouvData] = useState([]);
  const [hideResults, setHideResults] = useState(true);

  const handleFormValidation = values => {
    setUserInfos({...values});
    setOrderConfirm(true);
  };

  const validateZipCode = zipcode => {
    const authorizedZipCode = ['75', '78', '91', '92', '93', '94', '95', '33'];
    return authorizedZipCode.includes(zipcode.substring(0, 2));
  };

  const handleAdressChange = (item, values, setFieldValue) => {
    if (validateZipCode(item.postcode)) {
      values.address = item.label;
      setFieldValue('address', values.address);
      setHideResults(true);
    } else {
      Alert.alert(
        "La commande de kit n'est pas disponible dans ta région",
        'La commande de kit est uniquement disponible en Île-de-France et en Aquitaine',
        [
          {
            text: "Revenir à l'accueil",
            onPress: () => navigation.navigate('Home'),
          },
          {
            text: "Modifier l'adresse",
            onPress: () => {
              console.log('return screen');
            },
          },
        ],
      );
    }
  };

  const handleAutocomplete = async address => {
    if (address) {
      const res = await axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${address}&type=housenumber&autocomplete=1`,
      );
      let tmpRes = res?.data?.features;
      tmpRes = tmpRes.map(_ => _.properties);
      if (tmpRes.length > 0) {
        setGeogouvData(tmpRes);
        setHideResults(false);
      }
    } else {
      setHideResults(true);
    }
  };

  return (
    <Formik
      initialValues={userInfos}
      onSubmit={handleFormValidation}
      validationSchema={validationSchema}>
      {({values, errors, touched, handleBlur, handleChange, setFieldValue}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            label="NOM"
            onBlur={handleBlur('last_name')}
            underlineColor="#EAE2D7"
            activeUnderlineColor="#D42201"
            value={values.last_name}
            onChangeText={handleChange('last_name')}
          />
          {errors.last_name && touched.last_name && (
            <Text style={styles.errorMessage}>{errors.last_name}</Text>
          )}
          <TextInput
            style={styles.input}
            label="PRÉNOM"
            onBlur={handleBlur('first_name')}
            underlineColor="#EAE2D7"
            activeUnderlineColor="#D42201"
            value={values.first_name}
            onChangeText={handleChange('first_name')}
          />
          {errors.first_name && touched.first_name ? (
            <Text style={styles.errorMessage}>{errors.first_name}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            label="EMAIL"
            onBlur={handleBlur('email')}
            underlineColor="#EAE2D7"
            activeUnderlineColor="#D42201"
            value={values.email}
            onChangeText={handleChange('email')}
          />
          {errors.email && touched.email ? (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          ) : null}
          <Autocomplete
            containerStyle={styles.specialInput}
            inputContainerStyle={styles.specialInput}
            listStyle={styles.listResult}
            data={geogouvData}
            renderTextInput={() => (
              <>
                <TextInput
                  style={styles.input}
                  label="ADRESSE"
                  onBlur={handleBlur('address')}
                  underlineColor="#EAE2D7"
                  activeUnderlineColor="#D42201"
                  value={values.address}
                  onChangeText={text => {
                    setFieldValue('address', text);
                    handleAutocomplete(text);
                  }}
                />
                {errors.address && touched.address ? (
                  <Text style={styles.errorMessage}>{errors.address}</Text>
                ) : null}
              </>
            )}
            hideResults={hideResults}
            flatListProps={{
              renderItem: ({item}) => (
                <TouchableOpacity
                  style={styles.displayResults}
                  onPress={() =>
                    handleAdressChange(item, values, setFieldValue)
                  }>
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <TextInput
            style={styles.input}
            label="NUMERO DE TÉLÉPONE"
            onBlur={handleBlur('phone_number')}
            underlineColor="#EAE2D7"
            activeUnderlineColor="#D42201"
            value={values.phone_number}
            onChangeText={handleChange('phone_number')}
          />
          {errors.phone_number && touched.phone_number ? (
            <Text style={styles.errorMessage}>{errors.phone_number}</Text>
          ) : null}
          {values.phone_number !== '' && !errors.phone_number && (
            <Button
              style={styles.button}
              text="Je continue"
              size="intermediate"
              icon={true}
              onPress={() => handleFormValidation(values)}
            />
          )}
        </View>
      )}
    </Formik>
  );
};

export default HomeOrdersInput;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  input: {
    marginHorizontal: 22,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
  },
  specialInput: {
    borderWidth: 0,
  },
  listResult: {
    paddingHorizontal: 10,
    width: '30',
  },
  errorMessage: {
    fontSize: 10,
    paddingLeft: 22,
    color: '#D42201',
  },
  displayResults: {
    backgroundColor: '#FFF',
    paddingLeft: 22,
    height: 30,
  },
  button: {
    alignSelf: 'center',
  },
});
