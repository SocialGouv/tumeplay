import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GET_CONTENTS} from '../services/api/contents';

const ContentsPage = props => {
  const {route, navigation} = props;

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

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Text>Content !!</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default ContentsPage;
