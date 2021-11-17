import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Container from './src/components/Container';
import Thematiques from './src/views/Thematiques';

const App = () => {
  return (
    <Container>
      <Text>Tumeplay !!</Text>
      <Thematiques />
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 100,
  },
});

export default App;
