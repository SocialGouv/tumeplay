import {useQuery} from '@apollo/client';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import Text from '../components/Text';
import ContentCard from '../components/Contents/ContentCard';
import Container from '../components/global/Container';
import {GET_CONTENTS} from '../services/api/contents';
import GestureRecognizer from '../lib/swipe';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../AppContext';
import RNPickerSelect from 'react-native-picker-select';
import {Colors} from '../styles/Style';
import {GET_LEVELS} from '../services/api/levels';
import {GET_COLOR_THEME} from '../services/api/themes';
import config from '../../config';

const ContentsPage = props => {
  const {route, navigation} = props;
  const {user} = useContext(AppContext);
  const [theme_id, setTheme_id] = useState(route?.params?.theme_id);
  const [selectedLevel, setSelectedLevel] = useState(user.level);
  const [levels, setLevels] = useState([]);
  const thematiques = route?.params?.thematiques;
  const image = route?.params?.image;
  const [backgroundColor, setBackgroundColor] = useState(
    route.params.backgroundColor,
  );
  const [contents, setContents] = useState([]);
  const content_ids = contents.map(content => content.id);
  const currentThematique = thematiques.find(theme => theme.id === theme_id);
  const {data, loading} = useQuery(GET_CONTENTS, {
    variables: {theme_id: theme_id, level: selectedLevel},
  });

  const {data: data2, loading: loading2} = useQuery(GET_LEVELS);

  const {data: data3, loading: loading3} = useQuery(GET_COLOR_THEME, {
    variables: {theme_id: theme_id},
  });

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
    if (data3 && !loading3) {
      setBackgroundColor(data3.thematiqueMobiles[0].color);
    }
  }, [data, loading, data2, loading2, data3, loading3]);

  const renderItem = ({item}) => {
    return (
      <ContentCard
        key={item.id}
        item={item}
        image={image}
        theme_id={theme_id}
        locked={user.level < selectedLevel}
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
    console.log(value);
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
            placeholder={{
              label: currentThematique?.title,
              value: currentThematique.id,
            }}
            name="theme"
            onValueChange={e => handleNewTheme(e)}
            items={thematiques_props}
            Icon={() => {
              return (
                <FontAwsomeIcon
                  name="caret-down"
                  size={15}
                  style={styles.icon}
                  color="#000"
                />
              );
            }}
          />
          <RNPickerSelect
            style={{
              ...pickerSelectStyle,
            }}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: `NIV ${selectedLevel}`,
              value: selectedLevel,
            }}
            onValueChange={e => handleNewLevel(e)}
            name="level"
            items={levels_props}
            Icon={() => {
              return (
                <FontAwsomeIcon
                  name="caret-down"
                  size={15}
                  style={styles.icon}
                  color="#000"
                />
              );
            }}
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 10,
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
    fontSize: config.deviceWidth * 0.035,
    fontWeight: '700',
    paddingVertical: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputIOS: {
    width: '100%',
    fontSize: config.deviceWidth * 0.035,
    marginTop: 4,
    fontWeight: '700',
    paddingVertical: 5,
    borderColor: Colors.black,
    borderBottomColor: Colors.black,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputIOSContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  chevronDown: {
    color: Colors.black,
  },
});

export default ContentsPage;
