import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  FlatList,
} from 'react-native';
import Text from '../../components/Text';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import _ from 'lodash';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button';
import config from '../../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const HomeOrdersInput = props => {
  const navigation = useNavigation();
  const {userInfos, setUserInfos, setOrderConfirm, setUserAdressInformations} =
    props;

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Champs Obligatoire'),
    last_name: Yup.string().required('Champs Obligatoire'),
    email: Yup.string()
      .email('Email non valide')
      .required('Champs Obligatoire'),
    address: Yup.string().required('Champs Obligatoire'),
    phone_number: Yup.string().length(10).required('Champs Obligatoire'),
  });

  const [geogouvData, setGeogouvData] = useState([]);
  const [hideResults, setHideResults] = useState(true);

  const itemFields = [
    {
      id: 1,
      kind: 'autocomplete',
      label: 'ADRESSE',
      name: 'address',
      isNumber: false,
    },
    {
      id: 2,
      kind: 'default',
      label: 'NOM',
      name: 'last_name',
      isNumber: false,
    },
    {
      id: 3,
      kind: 'default',
      label: 'PRÉNOM',
      name: 'first_name',
      isNumber: false,
    },
    {
      id: 4,
      kind: 'default',
      label: 'EMAIL',
      name: 'email',
      isNumber: false,
    },
    {
      id: 5,
      kind: 'default',
      label: 'NUMERO DE TÉLÉPONE',
      name: 'phone_number',
      isNumber: true,
    },
  ];

  const handleFormValidation = values => {
    setUserInfos({...values});
    setOrderConfirm(true);
  };

  const validateZipCode = zipcode => {
    const authorizedZipCode = [
      '75',
      '77',
      '78',
      '91',
      '92',
      '93',
      '94',
      '95',
      '33',
      '16',
      '17',
      '19',
      '23',
      '24',
      '40',
      '47',
      '64',
      '79',
      '86',
      '87',
    ];
    return authorizedZipCode.includes(zipcode.substring(0, 2));
  };

  const handleAdressChange = (item, values, setFieldValue) => {
    if (validateZipCode(item.postcode)) {
      values.address = item.label;
      setFieldValue('address', values.address);
      setUserAdressInformations({...item});
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
    <KeyboardAwareScrollView>
      <Formik
        initialValues={userInfos}
        onSubmit={handleFormValidation}
        validationSchema={validationSchema}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <View style={styles.innerContainer}>
            <FlatList
              contentContainerStyle={{paddingBottom: 90}}
              showsVerticalScrollIndicator={false}
              data={itemFields}
              renderItem={({item}) => {
                if (item.kind === 'autocomplete') {
                  return (
                    <View>
                      <Autocomplete
                        containerStyle={styles.specialInput}
                        inputContainerStyle={styles.specialInput}
                        listContainerStyle={{}}
                        listStyle={styles.listResult}
                        data={geogouvData}
                        renderTextInput={() => (
                          <>
                            <TextInput
                              style={styles.input}
                              label={item.label}
                              onBlur={handleBlur(item.name)}
                              underlineColor={
                                errors[item.name] ? '#D42201' : '#EAE2D7'
                              }
                              activeUnderlineColor="#D42201"
                              value={values.address}
                              onChangeText={text => {
                                setFieldValue(item.name, text);
                                handleAutocomplete(text);
                              }}
                            />
                            {errors[item.name] && touched[item.name] ? (
                              <Text style={styles.errorMessage}>
                                {errors[item.name]}
                              </Text>
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
                    </View>
                  );
                } else {
                  return (
                    <>
                      {hideResults && (
                        <TextInput
                          style={styles.input}
                          label={item.label}
                          onBlur={handleBlur(item.name)}
                          underlineColor={
                            errors[item.name] ? '#D42201' : '#EAE2D7'
                          }
                          activeUnderlineColor="#D42201"
                          value={values[item.name]}
                          onChangeText={handleChange(item.name)}
                          keyboardType={item.isNumber ? 'numeric' : 'default'}
                        />
                      )}

                      {hideResults &&
                        errors[item.name] &&
                        touched[item.name] && (
                          <Text style={styles.errorMessage}>
                            {errors[item.name]}
                          </Text>
                        )}
                    </>
                  );
                }
              }}
              keyExtractor={item => item.id}
            />
            {!!values.first_name && !Object.keys(errors).length && (
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  text="Je continue"
                  size="intermediate"
                  icon={true}
                  onPress={() => handleFormValidation(values)}
                />
              </View>
            )}
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default HomeOrdersInput;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
  },
  input: {
    marginHorizontal: 22,
    backgroundColor: '#FFFFFF',
    marginVertical: config.deviceWidth > 375 ? 10 : 0,
  },
  specialInput: {
    borderWidth: 0,
  },
  listResult: {
    paddingHorizontal: 10,
    width: 30,
  },
  errorMessage: {
    fontSize: 10,
    paddingLeft: 22,
    color: '#D42201',
  },
  displayResults: {
    backgroundColor: '##FFF',
    paddingVertical: 12,
    paddingLeft: 22,
    height: 'auto',
  },
  button: {
    alignSelf: 'center',
  },
  buttonContainer: {
    // marginBottom: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
  },
});
