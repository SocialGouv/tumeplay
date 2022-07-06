import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Text from '../components/Text';
import {useQuery} from '@apollo/client';
import {GET_THEMES} from '../services/api/themes';
import {Fonts} from '../styles/Style';
import ThemeCard from '../components/ThemeCard';

import Title from '../components/Title';
import background from '../assets/Main_BG.png';
import Container from '../components/global/Container';
import TopLevelPointIndicator from '../components/Quizz/TopLevelPointIndicator';
import AppContext from '../../AppContext';

export default function Thematiques(props) {
  const {navigation} = props;
  const {user, apiUrl} = useContext(AppContext);
  const {data, loading} = useQuery(GET_THEMES, {
    variables: {level: user.level},
  });
  const [thematiques, setThematiques] = useState([]);

  const renderItem = ({item, index}) => {
    return (
      <ThemeCard
        key={item.id}
        index={index}
        theme={item}
        thematiques={thematiques}
        backgroundColor={item.color}
        borderColors={item.border_color}
        image={apiUrl + item.image?.url}
        navigation={navigation}
      />
    );
  };

  useEffect(() => {
    if (!loading && data) {
      setThematiques(data.thematiqueMobiles);
    }
  }, [data, loading]);

  return (
    <Container style={styles.container} source={background}>
      <TopLevelPointIndicator style={styles.pointsIndicator} />
      <Title title="Informe-toi" />
      <Text style={styles.subtitle}>Sélectionne un thème qui t'intéresse</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={thematiques}
          renderItem={renderItem}
          directionalLockEnabled={true}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={styles.themeContainer}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  pointsIndicator: {
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: Fonts.title,
    lineHeight: 38,

    marginTop: 12,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 25,
    alignContent: 'flex-start',
    textAlign: 'left',
    fontFamily: Fonts.subtitle,
    paddingLeft: 18,
    marginTop: 13,
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  themeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
