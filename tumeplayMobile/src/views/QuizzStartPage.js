import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
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
import CustomModal from '../components/global/CustomModal';

const QuizzStartPage = ({navigation}) => {
  const context = useContext(AppContext);
  const {doneModules_ids, strapi_user_id, user, setUser} = context;
  const {data, loading} = useQuery(GET_MODULES, {
    variables: {
      level: user?.level,
    },
  });
  const [modules, setModules] = useState(null);
  const [isModulePending] = useState(user?.pending_module !== null);
  const [module, setModule] = useState();
  const [questions, setQuestions] = useState([]);
  const random = Math.floor(Math.random() * modules?.length);
  const [thematique, setThematique] = useState();
  const [remainingModules, setRemainingModules] = useState();
  const [isVisible, setIsVisible] = useState(false);

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
      setRemainingModules([...tmpRemainings]);
    }
  };

  useEffect(() => {
    identifyRemainingModules();
  }, [modules]);

  useEffect(() => {
    if (remainingModules) {
      const currentModule = isModulePending
        ? remainingModules.find(x => x.id === user.pending_module)
        : remainingModules[remainingModules?.length > 1 ? random : 0];
      setModule(currentModule);
      setQuestions(currentModule?.questionsArray);
      setThematique(currentModule?.thematique.title);
    }
  }, [remainingModules]);

  const handleStartQuizz = async () => {
    let response = null;
    if (!isModulePending) {
      try {
        response = await createHistory({
          variables: {
            user_id: strapi_user_id,
            module_id: module?.id,
            status: 'pending',
          },
        });
      } catch (error) {
        console.log('Erreur au lancement du quizz:', error);
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
      const history_id = response?.data?.createHistorique?.historique?.id;
      let tmpHistory = [...user.history];
      tmpHistory.push({
        id: history_id,
        module_id: module?.id,
        status: 'pending',
      });
      setUser({...user, history: tmpHistory});
    }
    navigation.navigate('QuizzModule', {
      questions: _.shuffle(questions),
      module_id: module?.id,
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
            {isModulePending ? (
              <Text style={styles.text}>Continue !</Text>
            ) : (
              <>
                <Text style={styles.text}>Prêt.e ?</Text>
                <Text style={styles.text}>
                  Réponds à <Text style={styles.redText}>10 questions</Text> et
                  gagne jusqu'à <Text style={styles.redText}>1000 points</Text>
                </Text>
              </>
            )}
          </View>
          <CategorieIndicator thematique={thematique} />
        </View>
        <Button
          size="medium"
          text={isModulePending ? 'Je continue' : "C'est parti"}
          isDisabled={loading}
          icon
          onPress={() => handleStartQuizz()}
          style={styles.button}
        />
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
    color: Colors.black,
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
    color: Colors.black,
  },
  redText: {
    color: Colors.primary,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  middleContent: {paddingBottom: 50},
  button: {
    marginBottom: config.deviceWidth * 0.08,
  },
});

export default QuizzStartPage;
