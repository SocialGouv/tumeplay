import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Onboarding({user, setUser}) {
  const finishOnboarding = () => {
    let tmpUser = user;
    tmpUser.isOnboarded = true;
    setUser({...tmpUser});
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={finishOnboarding}>
        <Text>Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
