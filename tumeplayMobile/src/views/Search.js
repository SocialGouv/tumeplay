import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/Text';
import React, {useContext, useState} from 'react';
import Container from '../components/global/Container';
import config from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import AppContext from '../../AppContext';
import ContentCard from '../components/Contents/ContentCard';
import {Colors} from '../styles/Style';
import _ from 'lodash';

const Search = () => {
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [contents, setContents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(false);
  const {apiUrl, readContentIDs} = useContext(AppContext);

  const handleChangeText = text => {
    setSearchText(text);
  };

  const handleSearch = () => {
    setIsSearching(true);
    fetch(`${apiUrl}/contents?_q=${searchText}`)
      .then(res =>
        res.json().then(data => {
          data.length > 0 ? setContents(data) : setNoResults(true);
        }),
      )
      .catch(err => console.log(err))
      .finally(() => setIsSearching(false));
  };

  const renderItem = ({item}) => {
    return (
      <ContentCard
        item={item}
        navigation={navigation}
        search={true}
        readContentIDs={readContentIDs}
        content_ids={contents.map(content => content.id)}
        backgroundColor={item?.thematique_mobile?.color}
        theme_id={item?.thematique_mobile?.id}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Icon name="close" size={25} />
        <Text>Fermer</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Ta recherche :</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Saisis ici un mot-clé"
          onChangeText={handleChangeText}
        />
        <Button
          size="small"
          text="Ok"
          style={styles.searchButton}
          onPress={() => handleSearch()}
        />
      </View>
      <Text style={styles.title}>Nos contenus</Text>
      {!isSearching && contents.length === 0 && !noResults && (
        <Text style={styles.redText}>
          Saisis un mot-clé dans la barre de recherche
        </Text>
      )}
      {!isSearching && contents.length === 0 && noResults && (
        <View style={styles.textContainer}>
          <Text>🙁 </Text>
          <Text style={styles.redText}>
            Pas de résultat pour cette recherche, tape un autre mot-clé.
          </Text>
        </View>
      )}
      {!isSearching && contents.length > 0 && (
        <FlatList
          keyExtractor={item => item.id}
          data={_.sortBy(contents, ['niveau.value']) || []}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginTop: config.deviceHeight * 0.06,
  },
  button: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1.4,
    height: 35,
    width: '70%',
    borderColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
  },
  searchButton: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
  },
  list: {
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  redText: {
    marginTop: 10,
    color: Colors.primary,
  },
  title: {
    marginTop: 14,
    fontWeight: 'bold',
  },
});

export default Search;
