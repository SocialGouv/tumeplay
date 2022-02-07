import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {REACT_APP_URL} from '@env';
import {Colors, Fonts} from '../../styles/Style';
import bg from '../../assets/test.png';
import Button from '../../components/Button';
import {useQuery} from '@apollo/client';
import {GET_SINGLE_CONTENT} from '../../services/api/contents';
import Feedback from '../../components/Feedback';
import Container from '../../components/global/Container';

const ContentPage = ({navigation, route}) => {
  const [content, setContent] = useState();
  const [nextContentID, setNextContentID] = useState('');
  const [remainingIDs, setRemainingIDs] = useState();
  const [count, setCount] = useState(0);

  const randomNextID = () => {
    let contents_ids = route?.params?.contents_ids;
    let remaining_ids = contents_ids?.filter(id => content?.id !== id);
    setRemainingIDs(remaining_ids);
    const random = Math.floor(Math.random() * remaining_ids?.length);
    if (remaining_ids) {
      setNextContentID(remaining_ids[random]);
    }
  };

  const {data, loading} = useQuery(GET_SINGLE_CONTENT, {
    variables: {content_id: route?.params?.content_id},
  });

  useEffect(() => {
    if (data && !loading) {
      setContent(data.contents[0]);
    }
  }, [content, data, loading]);

  useEffect(() => {
    randomNextID();
  }, [content]);

  const nextContent = () => {
    navigation.navigate('Content', {
      content_id: nextContentID,
      contents_ids: remainingIDs,
    });
    setCount(count + 1);
  };

  const goToQuizz = () => {
    navigation.navigate('QuizzStartPage');
  };

  const imageUrl = {uri: REACT_APP_URL + content?.image?.url};

  return (
    <Container style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground style={styles.image} source={imageUrl}>
          <ImageBackground style={styles.image} source={bg}>
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => navigation.goBack()}>
              <Text style={styles.chevron}>{'<'}</Text>
              <Text style={styles.title} numberOfLines={4}>
                {content?.title}
              </Text>
            </TouchableOpacity>
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
        <Feedback />
        <View style={styles.divider} />
        <View style={styles.buttonsContainer}>
          {count > 4 && (
            <Button
              size="medium"
              text="Jouer"
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
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '35%',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
  chevron: {
    fontSize: 35,
    paddingVertical: 25,
    alignContent: 'flex-start',
  },
  title: {
    width: '80%',
    height: '100%',
    paddingHorizontal: 15,
    paddingVertical: 35,
    fontFamily: Fonts.title,
    fontSize: 30,
    lineHeight: 30,
    zIndex: 2,
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
    textAlign: 'justify',
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
