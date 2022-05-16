import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import TextBase from '../Text';
import Icon from 'react-native-vector-icons/Entypo';
import Container from '../global/Container';
import ThemeIndicator from '../ThemeIndicator';
import {useQuery} from '@apollo/client';
import {GET_MODULES_BY_THEMATIQUES} from '../../services/api/modules';
import Title from '../Title';
import ModuleLine from './ModuleLine';

const ModuleList = ({navigation, route}) => {
  const theme = route.params.theme;
  const [modules, setModules] = useState([]);

  const {data: data1, loading: loading1} = useQuery(
    GET_MODULES_BY_THEMATIQUES,
    {
      variables: {
        theme_id: theme.id,
      },
    },
  );

  const displayModule = modules.map((module, index) => (
    <ModuleLine module={module} index={index} />
  ));

  useEffect(() => {
    if (!loading1) {
      setModules([...data1.modules]);
    }
  }, [data1, loading1]);

  return (
    <Container style={styles.container}>
      <View style={styles.backLevel}>
        <TouchableOpacity
          style={styles.chevron}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-small-left" size={25} color="#000" />
          <TextBase>Retour</TextBase>
        </TouchableOpacity>
        <ThemeIndicator theme={theme} />
      </View>
      <Title title={modules.length + ' ' + 'DÉFIS'} />
      <TextBase> Difficulté</TextBase>
      {displayModule}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  backLevel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  chevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ModuleList;
