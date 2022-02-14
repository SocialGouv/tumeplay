import {useQuery} from '@apollo/client';
import React, {useEffect, useState, useContext} from 'react';
import {Image, StyleSheet, ScrollView} from 'react-native';
import wave from '../assets/wave.png';
import Container from '../components/global/Container';
import WrapperLevelBadges from '../components/Journey/WrapperLevelBadges';
import LevelPointsIndicator from '../components/LevelPointsIndicator';
import {GET_LEVELS} from '../services/api/levels';
import {GET_MODULES} from '../services/api/modules';
import Title from '../components/Title';
import _ from 'lodash';
import AppContext from '../../AppContext';

const Journey = () => {
  const useMultipleQuery = () => {
    const res1 = useQuery(GET_MODULES);
    const res2 = useQuery(GET_LEVELS);

    return [res1, res2];
  };

  const {user} = useContext(AppContext);

  const [{data: data1, loading: loading1}, {data: data2, loading: loading2}] =
    useMultipleQuery();
  const [modules, setModules] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (!loading1 && data1) {
      setModules([...data1.modules]);
    }
    if (!loading2 && data2) {
      setLevels([...data2.niveaus]);
    }
  }, [data1, loading1, loading2, data2]);

  let moduleIndex = 0;
  const displayWrappers = levels?.map(level => {
    let tmpModules = modules;
    let associatedModules = tmpModules?.filter(
      module => module.niveau?.value === level.value,
    );
    associatedModules = associatedModules.map(module => {
      let tmpModule = JSON.parse(JSON.stringify(module));
      let newModule = Object.assign(tmpModule, {module_index: moduleIndex});
      let history = user.history.find(
        h => h.module_id === module.id && h.status === 'success',
      );
      newModule.isDone = history ? true : false;
      moduleIndex += 1;
      return newModule;
    });
    associatedModules = associatedModules
      .filter(m => m.isDone)
      .concat(associatedModules.filter(m => !m.isDone));
    return (
      <WrapperLevelBadges
        key={level.id}
        level={level}
        associatedModules={associatedModules}
        loading={loading1}
      />
    );
  });

  return (
    <Container style={styles.container}>
      <Title title="Ton parcours" />
      <LevelPointsIndicator style={styles.pointContainer} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {displayWrappers}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    paddingVertical: 21,
  },
  pointContainer: {
    marginVertical: 18,
  },
});

export default Journey;
