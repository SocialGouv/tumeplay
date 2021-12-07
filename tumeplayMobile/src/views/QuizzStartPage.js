import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Button from '../components/Button';
import CategorieIndicator from '../components/CategorieIndicator';
import {Colors, Fonts} from '../styles/Style';
import bg from '../assets/Quiiz_BG.png';
import AppContext from '../../AppContext';
import {useQuery} from '@apollo/client';
import {GET_MODULES} from '../services/api/modules';

const QuizzStartPage = ({navigation, route}) => {
  const context = useContext(AppContext);
  const thematiques = context?.thematiques;
  const random = Math.floor(Math.random() * thematiques.length);
  const thematique = thematiques[random];

  const [module, setModule] = useState();
  const {data, loading} = useQuery(GET_MODULES);
  const [questions, setQuestions] = useState([]);
  const questions_ids = questions.map(ques => ques.id);

  useEffect(() => {
    if (data && !loading) {
      setModule(data.modules);
      setQuestions(data.modules[0]?.questionsArray);
    }
  }, [data, loading]);

  return (
    <ImageBackground source={bg} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.title}> Joue et teste tes connaissances !</Text>
      </TouchableOpacity>
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Prêt.e ?</Text>
          <Text style={styles.text}>
            Réponds à <Text style={styles.redText}>10 questions</Text> et gagne
            jusqu'à <Text style={styles.redText}>1000 points</Text>
          </Text>
        </View>
        <CategorieIndicator thematique={thematique} />
      </View>
      <Button
        size="medium"
        text="C'est parti"
        onPress={() => {
          navigation.navigate('QuizzModule', {
            questions: questions,
            question: questions[Math.floor(Math.random() * questions?.length)],
            questions_ids: questions_ids,
          });
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 30,
    lineHeight: 38,
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
});

export default QuizzStartPage;
