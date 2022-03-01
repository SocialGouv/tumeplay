import {useQuery} from '@apollo/client';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import Text from '../components/Text';
import ContentCard from '../components/Contents/ContentCard';
import Container from '../components/global/Container';
import {GET_CONTENTS} from '../services/api/contents';
import GestureRecognizer from '../lib/swipe';
import Icon from 'react-native-vector-icons/Entypo';
import AppContext from '../../AppContext';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';
import {Colors} from '../styles/Style';
import {GET_LEVELS} from '../services/api/levels';

const ContentsPage = props => {
  const {route, navigation} = props;
  const {user} = useContext(AppContext);
  const [theme_id, setTheme_id] = useState(route?.params?.theme_id);
  const [selectedLevel, setSelectedLevel] = useState(user.level);
  const [levels, setLevels] = useState([]);
  const thematiques = route?.params?.thematiques;
  const image = route?.params?.image;
  const backgroundColor = route.params.backgroundColor;
  const [contents, setContents] = useState([]);
  const content_ids = contents.map(content => content.id);

  const {data, loading} = useQuery(GET_CONTENTS, {
    variables: {theme_id: theme_id, level: selectedLevel},
  });

  const {data: data2, loading: loading2} = useQuery(GET_LEVELS);

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
    if (data2 && !loading2) {
      setLevels(data2.niveaus);
    }
  }, [data, loading, data2, loading2]);

  const renderItem = ({item}) => {
    return (
      <ContentCard
        key={item.id}
        item={item}
        image={image}
        theme_title={route?.params?.theme_title}
        locked={user.level !== selectedLevel}
        content_ids={content_ids}
        backgroundColor={backgroundColor}
        navigation={navigation}
      />
    );
  };

  const thematiques_props = thematiques.map(theme => {
    return {label: theme.title, value: theme.id, key: theme.id};
  });

  const levels_props = levels.map(level => {
    return {label: `NIV ${level.value}`, value: level.value, key: level.id};
  });

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 10,
  };

  const handleNewTheme = value => {
    setTheme_id(value);
  };

  const handleNewLevel = value => {
    setSelectedLevel(value);
  };

  return (
    <Container style={styles.container}>
      <GestureRecognizer
        style={styles.container}
        config={config}
        onSwipeLeft={() => navigation.goBack()}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.chevron}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-small-left" size={40} color="#000" />
            <Text>Retour</Text>
          </TouchableOpacity>
          <RNPickerSelect
            style={{...pickerSelectStyle}}
            useNativeAndroidPickerStyle={false}
            placeholder={{label: 'Catégorie', value: null}}
            name="theme"
            onValueChange={e => handleNewTheme(e)}
            items={thematiques_props}
          />
          <RNPickerSelect
            style={{...pickerSelectStyle}}
            useNativeAndroidPickerStyle={false}
            placeholder={{label: `NIV ${selectedLevel}`, value: selectedLevel}}
            onValueChange={e => handleNewLevel(e)}
            name="level"
            items={levels_props}
          />
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
    flexDirection: 'row',
    paddingRight: 15,
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const pickerSelectStyle = StyleSheet.create({
  placeholder: {
    color: Colors.black,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  inputAndroid: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black,
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 5,
    color: 'black',
  },
  inputIOS: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '700',
    paddingVertical: 5,
    borderColor: Colors.black,
    borderBottomColor: Colors.black,
    borderRadius: 4,
    color: 'black',
  },
  inputIOSContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
});

export default ContentsPage;
