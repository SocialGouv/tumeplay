import {View, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';

const HomeOrdersInput = () => {
  const [userInfos, setUserInfos] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone_number: '',
  });

  const inputLabels = [
    {label: 'NOM', name: 'first_name'},
    {label: 'PRENOM', name: 'last_name'},
    {label: 'EMAIL', name: 'email'},
    {label: ' ADRESSE', name: 'address'},
    {label: 'NUMÉRO DE TÉLÉPHONE', name: 'phone_number'},
  ];

  const handleFormValidation = values => {
    console.log(values);
  };

  return (
    <Formik initialValues={userInfos} onSubmit={handleFormValidation}>
      {({handleChange, handleSubmit, values}) => (
        <View>
          {inputLabels.map((input, index) => {
            return (
              <TextInput
                key={index}
                style={styles.input}
                label={input.label}
                underlineColor="#EAE2D7"
                activeUnderlineColor="#D42201"
                value={values[input.name]}
                onChangeText={handleChange(input.name)}
              />
            );
          })}
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default HomeOrdersInput;

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 22,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
  },
});
