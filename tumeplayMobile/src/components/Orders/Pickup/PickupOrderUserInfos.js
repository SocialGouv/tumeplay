import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import PoiInfos from './PoiInfos';
import {TextInput} from 'react-native-paper';
import config from '../../../../config';
import Text from '../../Text';
import Button from '../../Button';
import PickupOrderConfirm from './PickupOrderConfirm';

const PickupOrderUserInfos = props => {
  const {
    selectedPOI,
    setSelectedPOI,
    userInfos,
    setUserInfos,
    orderConfirm,
    setOrderConfirm,
    box,
  } = props;

  const itemFields = [
    {
      id: 1,
      kind: 'default',
      label: 'NOM',
      name: 'last_name',
      isNumber: false,
    },
    {
      id: 2,
      kind: 'default',
      label: 'PRÉNOM',
      name: 'first_name',
      isNumber: false,
    },
    {
      id: 3,
      kind: 'default',
      label: 'EMAIL',
      name: 'email',
      isNumber: false,
    },
    {
      id: 4,
      kind: 'default',
      label: 'NUMERO DE TÉLÉPONE',
      name: 'phone_number',
      isNumber: true,
    },
  ];

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Champs Obligatoire'),
    last_name: Yup.string().required('Champs Obligatoire'),
    email: Yup.string()
      .email('Email non valide')
      .required('Champs Obligatoire'),
    phone_number: Yup.string().length(10).required('Champs Obligatoire'),
  });

  const handleFormValidation = values => {
    setUserInfos({...values});
    setOrderConfirm(true);
  };

  return (
    <View style={styles.container}>
      <PoiInfos selectedPOI={selectedPOI} setSelectedPOI={setSelectedPOI} />
      {!orderConfirm ? (
        <Formik initialValues={userInfos} validationSchema={validationSchema}>
          {({values, errors, touched, handleChange, handleBlur}) => (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={itemFields}
                renderItem={({item}) => (
                  <>
                    <TextInput
                      label={item.label}
                      style={styles.input}
                      value={values[item.name].trim()}
                      onBlur={handleBlur(item.name)}
                      onChangeText={handleChange(item.name)}
                      underlineColor={errors[item.name] ? '#D42201' : '#EAE2D7'}
                      keyboardType={item.isNumber ? 'numeric' : 'default'}
                      activeUnderlineColor="#D42201"
                    />
                    {errors[item.name] && touched[item.name] && (
                      <Text style={styles.errorMessage}>
                        {errors[item.name]}
                      </Text>
                    )}
                  </>
                )}
              />
              {!!values.first_name && !Object.keys(errors).length && (
                <Button
                  style={styles.button}
                  text="Je continue"
                  size="intermediate"
                  icon={true}
                  onPress={() => handleFormValidation(values)}
                />
              )}
            </>
          )}
        </Formik>
      ) : (
        <PickupOrderConfirm
          selectedPOI={selectedPOI}
          userInfos={userInfos}
          setOrderConfirm={setOrderConfirm}
          setSelectedPOI={setSelectedPOI}
          box={box}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginHorizontal: 22,
    backgroundColor: '#FFFFFF',
    marginVertical: config.deviceWidth > 375 ? 10 : 0,
  },
  errorMessage: {
    fontSize: 10,
    paddingLeft: 22,
    color: '#D42201',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 30,
  },
});

export default PickupOrderUserInfos;
