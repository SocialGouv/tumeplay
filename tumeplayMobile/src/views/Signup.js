import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const Signup = ({user, setUser}) => {
  let tmpUser = user;

  const handleUserAge = arg => {
    tmpUser.isUnder25 = arg;
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

  return (
    <View>
      <View>
        <Text>Quel est ton age ?</Text>
        <View style={style.buttonContainer}>
          <TouchableOpacity
            style={style.button}
            onPress={() => handleUserAge(true)}>
            <Text>- 25 ans</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={() => handleUserAge(false)}>
            <Text>+ 25 ans</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={style.input} onChangeText={handleChange} />
      </View>
      <TouchableOpacity onPress={() => handleValidation()}>
        <Text>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#F1E1A3',
    borderRadius: 15,
    marginHorizontal: 5,
    paddingHorizontal: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default Signup;
