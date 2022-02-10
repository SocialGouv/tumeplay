import React, {useContext, useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Text from '../../../components/Text';
import TopLevelPointIndicator from '../TopLevelPointIndicator';
import wave from '../../../assets/wave.png';
import thumbsup from '../../../assets/custom_images/thumbs_up.png';
import Button from '../../Button';
import {Fonts} from '../../../styles/Style';
import AppContext from '../../../../AppContext';
import {useMutation} from '@apollo/client';
import {bgColors} from '../../../styles/Style';
import {UPDATE_MOBILE_USER_HISTORY} from '../../../services/api/mobile_users';
import Container from '../../global/Container';
import config from '../../../../config';
import _ from 'lodash';
import Event from '../../../services/api/matomo';

const QuizzAllRight = ({navigation, module_id}) => {
  const context = useContext(AppContext);
  const {user, reloadUser} = context;

  const [updateHistory] = useMutation(UPDATE_MOBILE_USER_HISTORY);

  const checkUserHistory = async () => {
    if (user?.history) {
      let currentHistory = user?.history.find(
        history => history.module_id === module_id,
      );
      try {
        await updateHistory({
          variables: {
            history_id: currentHistory?.id,
            module_id: currentHistory?.module_id,
            status: 'success',
          },
        });
        reloadUser();
      } catch (error) {
        console.log("Erreur à l'update : ", error);
        Alert.alert(
          'Désolé !',
          " Un problème est survenu à l'enregistrement de tes résultats",
          [
            {
              text: 'Annuler',
              onPress: () => {
                navigation.navigate('Home');
              },
            },
            {
              text: 'Recommencer',
              onPress: () => {
                navigation.navigate('QuizzStartPage');
              },
            },
          ],
        );
      }
    }
  };

  useEffect(() => {
    Event.quizzDone();
    checkUserHistory();
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

    paddingBottom: 5,
  },
  subtitle: {
    fontFamily: Fonts.subtitle,
    fontSize: 22,
    lineHeight: 28,
    marginTop: 28,
    marginBottom: 17,
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
  },
  text: {
    fontSize: config.deviceWidth <= 375 ? 14 : 18,
    fontWeight: '600',
    lineHeight: 24,

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
