import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_THEMES} from '../services/api/themes';
import Container from '../components/Container';

export default function Thematiques() {
  const {data, loading} = useQuery(GET_THEMES);
  const [thematiques, setThematiques] = useState([]);

  const displayThematiques = thematiques.map(theme => {
    return (
      <View key={theme.id}>
        <Text>{theme.title}</Text>
      </View>
    );
  });

  useEffect(() => {
    if (data && !loading) {
      setThematiques(data.thematiques);
    }
  }, [data, loading]);

  return <View>{displayThematiques}</View>;
}
