import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import LevelPointsIndicator from '../components/LevelPointsIndicator';
import Title from '../components/Title';
import {Colors, Fonts} from '../styles/Style';
import Button from '../components/Button';
import {useQuery} from '@apollo/client';
import {GET_FRESH_CONTENTS} from '../services/api/contents';
import FreshContentCard from '../components/Contents/FreshContentCard';
import AppContext from '../../AppContext';

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
      return 'Gagne des points pour commander une box';
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
    <View style={styles.container}>
      <Title />
      <LevelPointsIndicator points={points} />
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
        keyExtractor={item => item.id}
        numColumns={2}
        style={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    width: 340,
    textAlign: 'center',
    fontFamily: Fonts.text,
    fontSize: 16,
    lineHeight: 27,
  },
  subtitle: {
    fontFamily: Fonts.subtitle,
    alignSelf: 'flex-start',
    marginHorizontal: 5,
  },
  listContainer: {
    maxHeight: 350,
  },
});

export default HomePage;
