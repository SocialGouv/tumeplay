import React, {useContext, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import TopLevelPointIndicator from '../TopLevelPointIndicator';
import wave from '../../../assets/wave.png';
import thumbsup from '../../../assets/custom_images/thumbs_up.png';
import Button from '../../Button';
import {Colors, Fonts} from '../../../styles/Style';
import AppContext from '../../../../AppContext';
import {useMutation} from '@apollo/client';
import {bgColors} from '../../../styles/Style';
import {
  CREATE_HISTORY,
  UPDATE_MOBILE_USER_POINTS,
} from '../../../services/api/mobile_users';
import Container from '../../global/Container';
import config from '../../../../config';

const QuizzAllRight = ({pointsEarned, navigation, module_id}) => {
  const context = useContext(AppContext);
  const points = context.points;
  const user_id = context.strapi_user_id;
  const setPoints = context.setPoints;
  const history = context.userHistory;

  const [createHistory] = useMutation(CREATE_HISTORY);
  const [updatePoints] = useMutation(UPDATE_MOBILE_USER_POINTS);

  const checkUserHistory = async () => {
    if (history?.module?.id === module_id) {
      //RAF : Update historique existant => Le cas où le user aurait quitté sans finir tout le quizz
    } else {
      //Create historique => Cas nominal ou le user a fini le quizz
      try {
        await createHistory({
          variables: {
            user_id: user_id,
            module_id: module_id,
            status: 'success',
          },
        });
      } catch (err) {
        console.log('Error on history creation', err);
      }
    }
  };

  useEffect(() => {
    checkUserHistory();
    updatePoints({
      variables: {
        user_id: user_id,
        points: points + pointsEarned,
      },
    });
    setPoints(points + pointsEarned);
  }, []);

  return (
    <Container style={styles.container}>
      <TopLevelPointIndicator style={styles.pointIndicator} />
      <Text style={styles.title}>BIEN JOUÉ</Text>
      <Image source={wave} />
      <Text style={styles.subtitle}>Bravo</Text>
      <Image source={thumbsup} style={styles.imageThumb} />
      <Text style={styles.description}>
        Aucune mauvaise réponse dans cette série de questions :)
      </Text>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.text}>Non, pas tout de suite</Text>
        </TouchableOpacity>
        <Button
          icon={true}
          text={'Je continue'}
          size={'large'}
          style={styles.button}
          onPress={() => navigation.navigate('QuizzStartPage')}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: bgColors[2],
  },
  pointIndicator: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: config.deviceWidth <= 375 ? 25 : 30,
    lineHeight: 38,
    marginTop: 49,
    color: Colors.black,
    paddingBottom: 5,
  },
  subtitle: {
    fontFamily: Fonts.subtitle,
    fontSize: 22,
    lineHeight: 28,
    marginTop: 28,
    marginBottom: 17,
    color: Colors.black,
  },
  imageThumb: {
    width: config.deviceWidth <= 375 ? 30 : 60,
    height: config.deviceWidth <= 375 ? 30 : 60,
    marginBottom: 23,
  },
  description: {
    fontFamily: Fonts.strongText,
    fontSize: config.deviceWidth <= 375 ? 14 : 18,
    lineHeight: 27,
    textAlign: 'center',
    paddingHorizontal: 30,
    color: Colors.black,
  },
  text: {
    fontSize: config.deviceWidth <= 375 ? 14 : 18,
    fontWeight: '600',
    lineHeight: 24,
    color: Colors.black,
    textAlign: 'center',
    paddingBottom: 12,
  },
  bottomContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    bottom: 35,
    width: '100%',
  },
  button: {
    width: '100%',
  },
});

export default QuizzAllRight;
