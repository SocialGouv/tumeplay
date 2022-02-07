import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import LevelPointsIndicator from '../components/LevelPointsIndicator';
import Title from '../components/Title';
import {Colors, Fonts} from '../styles/Style';
import Button from '../components/Button';
import {useQuery} from '@apollo/client';
import {GET_FRESH_CONTENTS} from '../services/api/contents';
import FreshContentCard from '../components/Contents/FreshContentCard';
import AppContext from '../../AppContext';
import Container from '../components/global/Container';
import Carousel from 'react-native-snap-carousel';
import config from '../../config';

const HomePage = ({navigation}) => {
  //here we calculate the number of point from the user
  const [freshContents, setFreshContents] = useState([]);
  const freshContentsIds = freshContents?.map(content => content.id);
  const {data, loading} = useQuery(GET_FRESH_CONTENTS);

  useEffect(() => {
    if (data && !loading) {
      setFreshContents(data.contents);
    }
  }, [data, loading]);

  const renderItem = ({item}) => {
    return (
      <FreshContentCard
        content={item}
        navigation={navigation}
        freshContentsIds={freshContentsIds}
      />
    );
  };

  return (
    <ScrollView>
      <Container background={null} style={styles.container}>
        <Title />
        <LevelPointsIndicator
          style={styles.levelIndicator}
          onPress={() => navigation.navigate('Parcours')}
        />
        <View style={styles.middleContent}>
          <Text style={styles.text}>
            Prêt.e à tester tes connaissances sur la sexualité ?
          </Text>
          <Button
            text="Jouer"
            size="medium"
            special
            left
            onPress={() => navigation.navigate('QuizzStartPage')}
            icon
          />
        </View>
        <Text style={styles.subtitle}> Derniers contenus ajoutés</Text>
        <View style={styles.carouselContainer}>
          <Carousel
            data={freshContents}
            renderItem={renderItem}
            sliderWidth={config.deviceWidth}
            itemWidth={170}
            keyExtractor={item => item.id}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100%',
  },
  levelIndicator: {
    marginVertical: 20,
  },
  middleContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: config.deviceWidth <= 375 ? 30 : 30,
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.strongText,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    paddingBottom: 12,
    color: Colors.black,
  },
  carouselContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 14,
  },
  subtitle: {
    fontFamily: Fonts.subtitle,
    color: Colors.black,
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 12,
    fontSize: 18,
    marginHorizontal: Dimensions.get('window').width > 375 ? 15 : 10,
  },
  listContainer: {},
});

export default HomePage;
