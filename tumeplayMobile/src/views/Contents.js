import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import ContentCard from '../components/Contents/ContentCard';
import Container from '../components/global/Container';
import {GET_CONTENTS} from '../services/api/contents';
import GestureRecognizer from '../lib/swipe';
import Icon from 'react-native-vector-icons/Ionicons';

const ContentsPage = props => {
  const {route, navigation} = props;

  const backgroundColor = route.params.backgroundColor;
  const [contents, setContents] = useState([]);

  const {data, loading} = useQuery(GET_CONTENTS, {
    variables: {theme_id: route.params.theme_id},
  });

  const contents_ids = contents.map(content => content.id);

  useEffect(() => {
    if (data && !loading) {
      setContents(data.contents);
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
    directionalOffsetThreshold: 80,
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
    height: '100%',
  },
  listContainer: {
    marginTop: 15,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 15,
  },
});

export default ContentsPage;
