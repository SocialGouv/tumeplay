import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, FlatList, Platform, Dimensions} from 'react-native';
import LevelPointsIndicator from '../components/LevelPointsIndicator';
import Title from '../components/Title';
import {Colors, Fonts} from '../styles/Style';
import Button from '../components/Button';
import {useQuery} from '@apollo/client';
import {GET_FRESH_CONTENTS} from '../services/api/contents';
import FreshContentCard from '../components/Contents/FreshContentCard';
import AppContext from '../../AppContext';
import Container from '../components/global/Container';

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
    <Container background={null} style={styles.container}>
      <Title />
      <LevelPointsIndicator
        style={styles.levelIndicator}
        points={points}
        onPress={() => navigation.navigate('Journey')}
      />
      <Text style={styles.text}>{displayText()}</Text>
      <Button
        text="Teste tes connaissances"
        size="intermediate"
        style={{backgroundColor: Colors.primary}}
        onPress={() => navigation.navigate('QuizzStartPage')}
        icon
      />
      <Text style={styles.subtitle}> DERNIERS CONTENUS AJOUTÉS</Text>
      <FlatList
        data={freshContents}
        renderItem={renderItem}
        directionalLockEnabled={true}
        keyExtractor={item => item.id}
        numColumns={2}
        style={styles.listContainer}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  levelIndicator: {
    marginTop: 18,
  },
  text: {
    width: 340,
    textAlign: 'center',
    fontFamily: Fonts.text,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 27,
  },
  subtitle: {
    fontFamily: Fonts.subtitle,
    alignSelf: 'flex-start',
    marginHorizontal: 5,
  },
  listContainer: {
    maxHeight: Dimensions.get('window').width > 375 ? 350 : 300,
  },
});

export default HomePage;
