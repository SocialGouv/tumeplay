import {useQuery} from '@apollo/client';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import ContentCard from '../components/Contents/ContentCard';
import Container from '../components/global/Container';
import {GET_CONTENTS} from '../services/api/contents';
import GestureRecognizer from '../lib/swipe';
import Icon from 'react-native-vector-icons/Ionicons';
import TopLevelPointIndicator from '../components/Quizz/TopLevelPointIndicator';
import AppContext from '../../AppContext';

const ContentsPage = props => {
  const {route, navigation} = props;
  const {user} = useContext(AppContext);

  const backgroundColor = route.params.backgroundColor;
  const [contents, setContents] = useState([]);

  const {data, loading} = useQuery(GET_CONTENTS, {
    variables: {theme_id: route.params.theme_id, level: user.level},
  });

  const contents_ids = contents.map(content => content.id);

  useEffect(() => {
    if (data && !loading) {
      setContents(
        data.contents.map(c => {
          let tmpContent = JSON.parse(JSON.stringify(c));
          tmpContent.image = {
            url: tmpContent.etiquette?.image?.url
              ? tmpContent.etiquette?.image?.url
              : tmpContent.image?.url,
          };
          return tmpContent;
        }),
      );
    }
  }, [data, loading]);

  const renderItem = ({item}) => {
    return (
      <ContentCard
        key={item.id}
        item={item}
        contents_ids={contents_ids}
        backgroundColor={backgroundColor}
        navigation={navigation}
      />
    );
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 10,
  };

  return (
    <Container style={styles.container}>
      <GestureRecognizer
        style={styles.container}
        config={config}
        onSwipeLeft={() => navigation.goBack()}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="md-arrow-back" size={30} color="#000" />
          </TouchableOpacity>
          <View>
            <TopLevelPointIndicator />
          </View>
        </View>
        {/* <View style={styles.listContainer}> */}
        <FlatList
          data={contents}
          style={styles.listContainer}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        {/* </View> */}
      </GestureRecognizer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginTop: 15,
  },
  headerContainer: {
    display: 'flex',
    width: '130%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 15,
    justifyContent: 'space-between',
  },
});

export default ContentsPage;
