import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Container from './Container';
import {Colors} from '../../styles/Style';
import {useNavigation} from '@react-navigation/native';

const QuizzLoader = ({route}) => {
  const navigation = useNavigation();
  const {
    module_id,
    module_title,
    theme,
    questions,
    homeScreen,
    retry,
    clearModuleData,
  } = route.params;

  useEffect(() => {
    navigation.navigate('QuizzModule', {
      module_id: module_id,
      module_title: module_title,
      questions: questions,
      theme: theme,
      clearModuleData: clearModuleData,
      retry: retry,
    });
  }, [route]);

  return (
    <Container style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default QuizzLoader;
