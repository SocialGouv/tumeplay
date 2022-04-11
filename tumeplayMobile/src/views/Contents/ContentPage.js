import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import Text from '../../components/Text';
import {REACT_APP_URL} from '@env';
import {Colors, Fonts} from '../../styles/Style';
import bg from '../../assets/test.png';
import Button from '../../components/Button';
import {useQuery} from '@apollo/client';
import {GET_SINGLE_CONTENT} from '../../services/api/contents';
import Feedback from '../../components/Feedback';
import Icon from 'react-native-vector-icons/Entypo';
import config from '../../../config';
import AppContext from '../../../AppContext';
import Event from '../../services/api/matomo';
import GestureRecognizer from 'react-native-swipe-gestures';
import EncryptedStorage from 'react-native-encrypted-storage';
import _ from 'lodash';
import ReadIndicator from '../../components/Contents/ReadIndicator';
import {useFocusEffect} from '@react-navigation/native';

const ContentPage = ({navigation, route}) => {
  const {user} = useContext(AppContext);
  const [content, setContent] = useState();
  const [theme, setTheme] = useState();
  const [count, setCount] = useState(0);
  const content_ids = route?.params?.content_ids;
  const content_id = useRef(route.params.content_id);
  const theme_id = route?.params?.theme_id;
  const [readContentIDs, setReadContentIDs] = useState(
    route?.params?.readContentIDs,
  );
  const current_content_id = route?.params?.content_id;
  const [displayReadIndicator, setDisplayReadIndicator] = useState(false);
  const backgroundColor = route?.params?.backgroundColor;

  const {data, loading} = useQuery(GET_SINGLE_CONTENT, {
    variables: {
      content_id: route?.params?.content_id,
      theme_id: theme_id,
    },
  });

  const saveContentID = async () => {
    let tmpContent_ids = [...readContentIDs];
    if (!tmpContent_ids.includes(current_content_id)) {
      tmpContent_ids.push(current_content_id);
      tmpContent_ids = _.uniq(tmpContent_ids);
      await EncryptedStorage.setItem(
        'readContentIDs',
        JSON.stringify({
          content_ids: tmpContent_ids,
        }),
      );
    }
    Event.contentRead(current_content_id);
  };

  const retrieveReadContentIds = async () => {
    let encryptedContentIds = await EncryptedStorage.getItem('readContentIDs');
    if (encryptedContentIds) {
      let tmpContentIDs = JSON.parse(encryptedContentIds);
      setReadContentIDs([...tmpContentIDs.content_ids]);
    } else {
      setReadContentIDs([]);
    }
    setDisplayReadIndicator(_.includes(readContentIDs, current_content_id));
  };

  useEffect(() => {
    retrieveReadContentIds();
    let readTimeout = setTimeout(saveContentID, 5000);

    return () => {
      clearTimeout(readTimeout);
    };
  }, [current_content_id]);

  useFocusEffect(() => {
    retrieveReadContentIds();
  });

  useEffect(() => {
    if (data && !loading) {
      let tmpContent = JSON.parse(JSON.stringify(data.contents[0]));
      tmpContent.image = {
        url: tmpContent.etiquette?.image?.url
          ? tmpContent.etiquette?.image?.url
          : tmpContent.image?.url,
      };
      setContent(tmpContent);
      setTheme(data.thematiqueMobile);
      Event.contentSeen(tmpContent.id);
    }
  }, [data, loading]);

  const nextContent = () => {
    navigation.navigate('Content', {
      content_id: content_ids[count + 1],
      content_ids: content_ids,
      theme_id: theme_id,
      level: route.params.level,
    });
    setCount(count + 1);
  };

  const previousContent = () => {
    if (count === 0) {
      navigation.goBack();
    } else {
      setCount(count - 1);
      navigation.navigate('Content', {
        content_id: count > 1 ? content_ids[count - 1] : content_id.current,
        content_ids: content_ids,
        theme_id: theme_id,
        level: route.params.level,
      });
    }
  };

  const goToQuizz = () => {
    Event.playEvent('content');
    navigation.navigate('Jouer', {
      module_id: user.next_module,
      questions: user.nextQuestions,
      clearModuleData: true,
    });
  };

  const onSwipe = direction => {
    if (direction === 'SWIPE_LEFT') {
      nextContent();
    } else if (direction === 'SWIPE_RIGHT') {
      previousContent();
    }
  };

  const imageUrl = {uri: REACT_APP_URL + content?.image?.url};

  return (
    <GestureRecognizer
      style={styles.container}
      onSwipe={direction => onSwipe(direction)}>
      <View style={styles.backLevel}>
        <TouchableOpacity
          style={styles.chevron}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-small-left" size={25} color="#000" />
          <Text>Retour</Text>
        </TouchableOpacity>
        <View style={styles.topInfoContainer}>
          <Image
            source={{uri: REACT_APP_URL + theme?.image?.url}}
            style={styles.themeImage}
          />
          <Text style={styles.topRightInfo}>{theme?.title}</Text>
          <View style={styles.borderVertical} />
          <Text style={styles.topRightInfo}>NIV {route?.params?.level}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground style={styles.image} source={imageUrl}>
          <ImageBackground style={styles.image} source={bg}>
            {displayReadIndicator && (
              <ReadIndicator
                style={styles.readIndicator}
                backgroundColor={backgroundColor}
              />
            )}
            <Text
              style={[
                styles.title,
                content?.title.length > 50
                  ? styles.bigTitle
                  : styles.smallTitle,
              ]}
              numberOfLines={4}>
              {content?.title}
            </Text>
          </ImageBackground>
        </ImageBackground>
      </View>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{content?.text}</Text>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.divider} />
        <Feedback content={content} />
        <View style={styles.divider} />
        <View style={styles.buttonsContainer}>
          {count > 4 && (
            <Button
              size="medium"
              text="Jouer"
              special
              left
              icon
              style={[styles.button, styles.redButton]}
              styleText={{alignItems: 'center'}}
              onPress={() => goToQuizz()}
            />
          )}
          <Button
            size={'medium'}
            text={'Suivant'}
            style={styles.button}
            onPress={() => nextContent()}
          />
        </View>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  backLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 20,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  borderVertical: {
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: Colors.grey,
  },
  themeImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    alignSelf: 'flex-end',
  },
  imageContainer: {
    width: '100%',
    height: '25%',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  chevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightInfo: {
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
  title: {
    width: '80%',
    height: '100%',
    paddingLeft: 40,
    zIndex: 2,
    fontWeight: '800',
  },
  smallTitle: {
    fontSize: config.deviceWidth <= 400 ? 20 : 30,
    paddingTop: 10,
    lineHeight: 30,
  },
  bigTitle: {
    fontSize: config.deviceWidth <= 400 ? 16 : 22,
  },
  textContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    borderBottomColor: '#EAE2D7',
    width: '100%',
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  buttonContainer: {
    display: 'flex',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  badge: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFEED7',
  },
  button: {
    display: 'flex',
    textAlign: 'center',
  },
  redButton: {
    backgroundColor: Colors.primary,
    color: '#FFFFFF',
    marginRight: 10,
  },
  footerContainer: {
    display: 'flex',
    width: '80%',
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
  },
  readIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default ContentPage;
