import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useContext} from 'react';
import Container from './Container';
import {Colors} from '../../styles/Style';
import {useNavigation} from '@react-navigation/native';
import handleRedirection from '../../services/handleRedirection';
import AppContext from '../../../AppContext';

const QuizzLoader = ({route}) => {
  const navigation = useNavigation();

  const {user} = useContext(AppContext);

  const {
    module_id,
    module_title,
    theme,
    questions,
    homeScreen,
    retry,
    clearModuleData,
  } = route.params.from === 'navbar' ? handleRedirection(user) : route.params;

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
