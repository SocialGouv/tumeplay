import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Vibration,
} from 'react-native';
import Text from '../components/Text';
import Button from '../components/Button';
import CategorieIndicator from '../components/CategorieIndicator';
import {Colors, Fonts} from '../styles/Style';
import bg from '../assets/Quiiz_BG.png';
import {useQuery} from '@apollo/client';
import {GET_MODULES} from '../services/api/modules';
import _ from 'lodash';
import Container from '../components/global/Container';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../config';

import GestureRecognizer from '../lib/swipe';
import AppContext from '../../AppContext';
import {CREATE_HISTORY} from '../services/api/mobile_users';
import {useMutation} from '@apollo/client';

const QuizzStartPage = ({navigation}) => {
  const context = useContext(AppContext);
  const {doneModules_ids, strapi_user_id, user, reloadUser} = context;
  const {data, loading} = useQuery(GET_MODULES, {
    variables: {
      level: user?.level,
    },
  });
  const [modules, setModules] = useState(null);
  const [module, setModule] = useState();
  const [questions, setQuestions] = useState([]);
  const [thematique, setThematique] = useState();
  const [remainingModules, setRemainingModules] = useState();

  const [createHistory] = useMutation(CREATE_HISTORY);

  useEffect(() => {
    if (data && !loading) {
      setModules(data.modules);
    }
  }, [data, loading]);

  const identifyRemainingModules = () => {
    let tmpRemainings = [];
    modules?.map(item => {
      if (!doneModules_ids.includes(item.id)) {
        tmpRemainings.push(item);
      }
    });
    if (tmpRemainings) {
      setRemainingModules(tmpRemainings);
    }
  };

  useEffect(() => {
    if (doneModules_ids && modules) {
      identifyRemainingModules();
    }
  }, [doneModules_ids, modules]);

  useEffect(() => {
    if (remainingModules && modules) {
      const random = Math.floor(Math.random() * remainingModules?.length);
      const currentModule = user?.pending_module
        ? modules.find(x => x.id === user.pending_module)
        : remainingModules[remainingModules?.length > 1 ? random : 0];
      setModule(currentModule);
      setQuestions(currentModule?.questionsArray);
      setThematique(currentModule?.thematique.title);
    }
  }, [remainingModules]);

  const handleStartQuizz = async () => {
    if (!user.pending_module) {
      try {
        await createHistory({
          variables: {
            user_id: strapi_user_id,
            module_id: module?.id,
            status: 'pending',
          },
        });
        reloadUser();
      } catch (error) {
        console.log('Erreur au lancement du quizz:', error);
        Vibration.vibrate(200);
        Alert.alert(
          "Une erreur s'est produite au lancement du quizz",
          'Merci de relancer un quizz',
          [
            {
              text: 'Annuler',
              onPress: () => {
                navigation.navigate('Home');
              },
            },
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('Home');
              },
            },
          ],
        );
      }
    }
    navigation.navigate('QuizzModule', {
      questions: _.shuffle(questions),
      module_id: module?.id,
      clearModuleData: true,
    });
  };

  return (
    <Container background={bg}>
      <GestureRecognizer
        style={styles.container}
        config={config}
        onSwipeLeft={() => navigation.goBack()}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="md-arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}> Joue et teste tes connaissances !</Text>
        <View style={styles.middleContent}>
          <View style={styles.textContainer}>
            {user.pending_module ? (
              <Text style={styles.text}>Continue !</Text>
            ) : (
              <>
                <Text style={styles.text}>Prêt.e ?</Text>
                <Text style={styles.text}>
                  Réponds à <Text style={styles.redText}>10 questions</Text> et
                  avance dans ton parcours
                </Text>
              </>
            )}
          </View>
          <CategorieIndicator thematique={thematique} />
        </View>
        <View style={styles.buttonContainer}>
          {module && (
            <Button
              size="medium"
              text={user.pending_module ? 'Je continue' : "C'est parti"}
              isDisabled={loading}
              icon
              onPress={() => handleStartQuizz()}
            />
          )}
        </View>
      </GestureRecognizer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 30,
    lineHeight: 38,

    textAlign: 'center',
  },
  textContainer: {
    width: 230,
    height: 80,
    alignItems: 'center',
    marginBottom: 18,
  },
  text: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '600',
  },
  redText: {
    color: Colors.primary,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  middleContent: {paddingBottom: 50},
  buttonContainer: {
    marginBottom: config.deviceWidth * 0.08,
  },
});

export default QuizzStartPage;
