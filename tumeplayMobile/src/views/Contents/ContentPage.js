import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Platform,
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

const ContentPage = ({navigation, route}) => {
  const {user} = useContext(AppContext);
  const [content, setContent] = useState();
  const [count, setCount] = useState(0);
  const content_ids = route?.params?.content_ids;
  const content_id = useRef(route.params.content_id);

  const {data, loading} = useQuery(GET_SINGLE_CONTENT, {
    variables: {content_id: route?.params?.content_id},
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
      Event.contentSeen(tmpContent.id);
    }
  }, [data, loading]);

  const nextContent = () => {
    navigation.navigate('Content', {
      content_id: content_ids[count + 1],
      content_ids: content_ids,
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
      <View style={styles.imageContainer}>
        <ImageBackground style={styles.image} source={imageUrl}>
          <ImageBackground style={styles.image} source={bg}>
            <View style={styles.backLevel}>
              <TouchableOpacity
                style={styles.chevron}
                onPress={() => navigation.goBack()}>
                <Icon name="chevron-small-left" size={40} color="#000" />
                <Text>Retour</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.l}>
              {user.hasFinished ? (
                <></>
              ) : (
                <Text style={styles.level}>NIVEAU {user.level}</Text>
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
            </View>
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
  },
  level: {
    fontWeight: '600',
    paddingLeft: 40,
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
  title: {
    width: '80%',
    height: '100%',
    fontFamily: Fonts.title,
    zIndex: 2,
    paddingLeft: 40,
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
    fontFamily: Fonts.strongText,
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
});

export default ContentPage;
