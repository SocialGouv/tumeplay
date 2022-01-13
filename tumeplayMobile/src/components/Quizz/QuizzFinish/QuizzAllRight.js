import React, {useContext, useEffect} from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import TopLevelPointIndicator from '../TopLevelPointIndicator';
import wave from '../../../assets/wave.png';
import thumbsup from '../../../assets/custom_images/thumbs_up.png';
import Button from '../../Button';
import {Fonts} from '../../../styles/Style';
import AppContext from '../../../../AppContext';
import {useMutation} from '@apollo/client';
import {
  CREATE_HISTORY,
  UPDATE_MOBILE_USER_POINTS,
} from '../../../services/api/mobile_users';
import Container from '../../global/Container';

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
      //Update historique existant => Le cas où le user aurait quitté sans finir tout le quizz
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
        console.log(err);
      }
    }
  };

  useEffect(() => {
    checkUserHistory();
    updatePoints({
      variables: {
        user_id: history?.user?.id,
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
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.text}>Non pas tout de suite</Text>
      </TouchableOpacity>
      <Button text={'Je continue'} size={'large'} style={styles.button} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  pointIndicator: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 30,
    lineHeight: 38,
    marginTop: 49,
  },
  subtitle: {
    fontFamily: Fonts.subtitle,
    fontSize: 22,
    lineHeight: 28,
    marginTop: 28,
    marginBottom: 17,
  },
  imageThumb: {
    width: 60,
    height: 60,
    marginBottom: 23,
  },
  description: {
    fontFamily: Fonts.strongText,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  button: {
    position: 'absolute',
    bottom: 35,
  },
});

export default QuizzAllRight;
