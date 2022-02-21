import React, {useContext, useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../../../components/Text';
import TopLevelPointIndicator from '../TopLevelPointIndicator';
import wave from '../../../assets/wave.png';
import thumbsup from '../../../assets/custom_images/thumbs_up.png';
import Button from '../../Button';
import {Colors, Fonts} from '../../../styles/Style';
import AppContext from '../../../../AppContext';
import {bgColors} from '../../../styles/Style';
import Container from '../../global/Container';
import config from '../../../../config';
import _ from 'lodash';
import {ActivityIndicator} from 'react-native-paper';
import Event from '../../../services/api/matomo';

const QuizzAllRight = ({navigation, route, module_id}) => {
  const context = useContext(AppContext);
  const {user} = context;

  useEffect(() => {
    Event.quizzDone();
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
        {!user.pending_module ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home', {screen: 'Parcours'})}>
              <Text style={styles.text}>Non, pas tout de suite</Text>
            </TouchableOpacity>
            <Button
              icon={true}
              text={'Je continue'}
              size={'large'}
              style={styles.button}
              onPress={() =>
                navigation.navigate('QuizzModule', {
                  module_id: user.next_module,
                  questions: user.next_module_questions,
                  clearModuleData: true,
                })
              }
            />
          </>
        ) : (
          <ActivityIndicator size="large" color={Colors.primary} />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#DDF4ED',
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
