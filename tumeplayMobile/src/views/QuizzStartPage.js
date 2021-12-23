import React, {useEffect, useState} from 'react';
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
import {useQuery} from '@apollo/client';
import {GET_MODULES} from '../services/api/modules';
import _ from 'lodash';

const QuizzStartPage = ({navigation}) => {
  const {data, loading} = useQuery(GET_MODULES);
  const [modules, setModules] = useState(null);
  const [module, setModule] = useState();
  const [questions, setQuestions] = useState([]);
  const random = Math.floor(Math.random() * modules?.length);
  const [thematique, setThematique] = useState();

  useEffect(() => {
    if (data && !loading) {
      setModules(data.modules);
    }
  }, [data, loading]);

  useEffect(() => {
    if (modules) {
      setModule(modules[random]);
      setQuestions(modules[random]?.questionsArray);
      setThematique(modules[random]?.thematique.title);
    }
  }, [modules]);

  return (
    <ImageBackground source={bg} style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text>Retour</Text>
      </TouchableOpacity>
      <Text style={styles.title}> Joue et teste tes connaissances !</Text>
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
        isDisabled={loading}
        icon
        onPress={() => {
          navigation.navigate('QuizzModule', {
            questions: _.shuffle(questions),
            module_id: module.id,
          });
        }}
        style={styles.button}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 15,
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 30,
    lineHeight: 38,
    marginTop: 90,
    marginBottom: 48,
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
  button: {
    position: 'absolute',
    bottom: 45,
  },
});

export default QuizzStartPage;
