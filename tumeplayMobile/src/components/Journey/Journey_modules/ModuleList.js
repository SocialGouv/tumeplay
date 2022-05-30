import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TextBase from '../../Text';
import Icon from 'react-native-vector-icons/Entypo';
import Container from '../../global/Container';
import ThemeIndicator from '../../ThemeIndicator';
import {useQuery} from '@apollo/client';
import {GET_MODULES_BY_THEMATIQUES} from '../../../services/api/modules';
import Title from '../../Title';
import ModuleLine from './ModuleLine';
import _ from 'lodash';
import config from '../../../../config';
import BottomAction from './BottomAction';

const ModuleList = ({navigation, route}) => {
  const theme = route.params.theme;
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  console.log(theme.id);

  const {data: data1, loading: loading1} = useQuery(
    GET_MODULES_BY_THEMATIQUES,
    {
      variables: {
        theme_id: theme?.id?.toString(),
      },
    },
  );

  const displayModule = _.orderBy(modules, ['niveau.value'], ['asc']).map(
    (module, index) => {
      return (
        <ModuleLine
          module={module}
          key={index}
          setSelectedModule={setSelectedModule}
        />
      );
    },
  );

  useEffect(() => {
    if (!loading1) {
      console.log(data1);
      setModules([...data1?.modules]);
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
      <View style={{flex: selectedModule?.isSelected ? 0.8 : 1}}>
        <Title title={modules.length + ' ' + 'DÉFIS'} />
        <TextBase style={styles.difficulty}> DIFFICULTÉ</TextBase>
        <ScrollView
          disableScrollViewPanResponder={false}
          showsVerticalScrollIndicator={false}>
          {displayModule}
        </ScrollView>
      </View>
      {selectedModule?.isSelected && (
        <BottomAction
          style={styles.bottom_part}
          selectedModule={selectedModule}
        />
      )}
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
  difficulty: {
    alignSelf: 'flex-end',
    marginRight: config.deviceWidth >= 390 ? 12 : 0,
  },
  bottom_part: {
    backgroundColor: '#FFF',
    flex: 0.2,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});

export default ModuleList;
