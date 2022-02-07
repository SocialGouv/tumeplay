import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_THEMES} from '../services/api/themes';
import {Colors, Fonts, bgColors, borderColors} from '../styles/Style';
import ThemeCard from '../components/ThemeCard';
import dynamite from '../assets/custom_images/dynamite.png';
import hello from '../assets/custom_images/hello.png';
import metal from '../assets/custom_images/metal.png';
import peach from '../assets/custom_images/peach.png';
import peace from '../assets/custom_images/peace.png';
import thumbs_up from '../assets/custom_images/thumbs_up.png';
import Title from '../components/Title';
import background from '../assets/Main_BG.png';
import Container from '../components/global/Container';
import TopLevelPointIndicator from '../components/Quizz/TopLevelPointIndicator';

export default function Thematiques(props) {
  const {navigation} = props;
  const {data, loading} = useQuery(GET_THEMES);
  const [thematiques, setThematiques] = useState([]);

  const images = [dynamite, peace, peach, thumbs_up, metal, hello];

  const renderItem = ({item, index}) => {
    return (
      <ThemeCard
        key={item.id}
        index={index}
        theme={item}
        backgroundColor={bgColors[index]}
        borderColors={borderColors[index]}
        image={images[index]}
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
    color: Colors.black,
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
    // justifyContent: 'center',
  },
});
