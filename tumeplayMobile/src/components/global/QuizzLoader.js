import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Container from './Container';
import {Colors} from '../../styles/Style';
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../../AppContext';

const QuizzLoader = ({route}) => {
  const navigation = useNavigation();
  const {user} = useContext(AppContext);

  useEffect(() => {
    if (route.params.homeScreen) {
      navigation.navigate('QuizzModule', {
        module_id: user.pending_module ? user.pending_module : user.next_module,
        questions: user.pending_module
          ? user.pending_module_questions
          : user.next_module_questions,
        clearModuleData: true,
      });
    } else {
      navigation.navigate('QuizzModule', {
        module_id: route.params.module_id,
        questions: route.params.questions,
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
