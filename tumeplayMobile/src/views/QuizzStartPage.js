import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
  const doneModules_ids = context.doneModules_ids;
  const user_id = context.strapi_user_id;
  const user = context.user;
  const setUser = context.setUser;
  const {data, loading} = useQuery(GET_MODULES);
  const [modules, setModules] = useState(null);
  const [module, setModule] = useState();
  const [questions, setQuestions] = useState([]);
  const random = Math.floor(Math.random() * modules?.length);
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
      setRemainingModules([...tmpRemainings]);
    }
  };

  useEffect(() => {
    identifyRemainingModules();
  }, [modules]);

  useEffect(() => {
    if (remainingModules) {
      if (remainingModules?.length > 1) {
        setModule(remainingModules[random]);
        setQuestions(remainingModules[random]?.questionsArray);
        setThematique(remainingModules[random]?.thematique.title);
      } else {
        setModule(remainingModules[0]);
        setQuestions(remainingModules[0]?.questionsArray);
        setThematique(remainingModules[0]?.thematique.title);
      }
    }
  }, [remainingModules]);

  const handleStartQuizz = async () => {
    let response = null;
    try {
      response = await createHistory({
        variables: {
          user_id: user_id,
          module_id: module?.id,
          status: 'pending',
        },
      });
    } catch (error) {
      console.log('Erreur au lancement du quizz:', error);
    }
    const history_id = response?.data?.createHistorique?.historique?.id;
    if (user) {
      user.history = [
        {
          id: history_id,
          module_id: module?.id,
          status: 'pending',
        },
      ];
      setUser({...user});
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
            <Text style={styles.text}>Prêt.e ?</Text>
            <Text style={styles.text}>
              Réponds à <Text style={styles.redText}>10 questions</Text> et
              gagne jusqu'à <Text style={styles.redText}>1000 points</Text>
            </Text>
          </View>
          <CategorieIndicator thematique={thematique} />
        </View>
        <Button
          size="medium"
          text="C'est parti"
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
