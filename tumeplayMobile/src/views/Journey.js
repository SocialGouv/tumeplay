import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, ScrollView} from 'react-native';
import wave from '../assets/wave.png';
import Container from '../components/global/Container';
import WrapperLevelBadges from '../components/Journey/WrapperLevelBadges';
import LevelPointsIndicator from '../components/LevelPointsIndicator';
import {GET_LEVELS} from '../services/api/levels';
import {GET_MODULES} from '../services/api/modules';
import Title from '../components/Title';

const Journey = () => {
  const useMultipleQuery = () => {
    const res1 = useQuery(GET_MODULES);
    const res2 = useQuery(GET_LEVELS);

    return [res1, res2];
  };

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

  const displayWrappers = levels?.map(level => {
    const associatedModules = modules?.filter(
      module => module.niveau?.value === level.value,
    );
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
      <LevelPointsIndicator points={'500'} style={styles.pointContainer} />
      <ScrollView>{displayWrappers}</ScrollView>
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
