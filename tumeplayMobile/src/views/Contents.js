import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import ContentCard from '../components/ContentCard';
import Title from '../components/Title';
import {GET_CONTENTS} from '../services/api/contents';

const ContentsPage = props => {
  const {route, navigation, image} = props;

  const backgroundColor = route.params.backgroundColor;
  const [contents, setContents] = useState([]);

  const {data, loading} = useQuery(GET_CONTENTS, {
    variables: {theme_id: route.params.theme_id},
  });

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
        backgroundColor={backgroundColor}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go BACK</Text>
      </TouchableOpacity>
      <Title />
      <View style={styles.listContainer}>
        <FlatList
          data={contents}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  listContainer: {
    marginTop: 15,
  },
});

export default ContentsPage;
