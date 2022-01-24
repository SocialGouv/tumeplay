import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
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
  const points = useContext(AppContext).points;
  const [freshContents, setFreshContents] = useState([]);
  const freshContentsIds = freshContents?.map(content => content.id);
  const {data, loading} = useQuery(GET_FRESH_CONTENTS);

  useEffect(() => {
    if (data && !loading) {
      setFreshContents(data.contents);
    }
  }, [data, loading]);

  const displayText = () => {
    if (points > 0 && points < 3000) {
      return (
        <Text style={styles.text}>
          Plus que{' '}
          <Text style={[styles.text, {color: Colors.primary}]}>
            {3000 - points} points
          </Text>{' '}
          pour gagner ta box !
        </Text>
      );
    } else if (points > 3000) {
      return (
        <Text style={styles.text}>
          Bravo ! Tu as assez de points pour commander une box
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>Gagne des points pour commander une box</Text>
      );
    }
  };

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
          points={points}
          onPress={() => navigation.navigate('Parcours')}
        />
        <View style={styles.middleContent}>
          <Text style={styles.text}>{displayText()}</Text>
          <Button
            text="Teste tes connaissances"
            size="large"
            style={{backgroundColor: Colors.primary}}
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
  },
  levelIndicator: {
    marginVertical: 20,
  },
  middleContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: config.deviceWidth <= 320 ? 30 : 50,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.strongText,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 27,
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
