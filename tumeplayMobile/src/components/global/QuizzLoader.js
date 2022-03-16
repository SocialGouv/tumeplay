import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Container from './Container';
import {Colors} from '../../styles/Style';
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../../AppContext';
import {useQuery} from '@apollo/client';
import {GET_SINGLE_MODULE} from '../../services/api/modules';

const QuizzLoader = ({route}) => {
  const navigation = useNavigation();
  const {user} = useContext(AppContext);
  const [theme, setTheme] = useState({});

  const {data, loading} = useQuery(GET_SINGLE_MODULE, {
    variables: {module_id: route.params.module_id},
  });

  useEffect(() => {
    if (data && !loading) {
      setTheme({...data?.modules[0]});
    }
  }, [data, loading, route]);

  console.log('LOAD', theme);

  useEffect(() => {
    if (route.params.homeScreen) {
      let module_id, questions;
      let retry = false;
      if (user.random_module) {
        module_id = user.random_module;
        questions = user.random_module_questions;
        retry = true;
      } else if (user.pending_module) {
        module_id = user.pending_module;
        questions = user.pending_module_questions;
      } else {
        module_id = user.next_module;
        questions = user.next_module_questions;
      }
      navigation.navigate('QuizzModule', {
        module_id: module_id,
        questions: questions,
        theme: theme,
        clearModuleData: true,
        retry,
      });
    } else {
      navigation.navigate('QuizzModule', {
        module_id: route.params.module_id,
        questions: route.params.questions,
        theme: theme,
        clearModuleData: route.params.clearModuleData,
        retry: route.params.retry,
      });
    }
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
