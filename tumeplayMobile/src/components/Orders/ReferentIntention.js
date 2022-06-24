import {View, Image, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import warning from '../../assets/Exclamation.png';
import RenderHTML from 'react-native-render-html';
import RadioButton from '../global/RadioButton';
import config from '../../../config';
import RNPickerSelect from 'react-native-picker-select';
import {Colors} from '../../styles/Style';

const ReferentIntention = ({user}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([
    {
      text: 'Oui',
      selected: false,
      id: 1,
    },
    {
      text: 'Non',
      selected: false,
      id: 2,
    },
  ]);

  const htmlText = {
    html: '<ul><li>Infirmier.e de collège / lycée</li><li>Personne travaillant dans un CeGID / CRIPS etc.</li></ul>',
  };

  const yes_picker_props = [
    {
      label: 'C’est l’occasion de poser des questions',
      value: 'C’est l’occasion de poser des questions',
      key: 'C’est l’occasion de poser des questions',
    },
    {
      label: 'Je préfère, c’est plus discret vis-à-vis de mes parents',
      value: 'Je préfère, c’est plus discret vis-à-vis de mes parents',
      key: 'Je préfère, c’est plus discret vis-à-vis de mes parents',
    },
    {
      label: 'Il n’y a pas de point relais près de chez moi ',
      value: 'Il n’y a pas de point relais près de chez moi ',
      key: 'Il n’y a pas de point relais près de chez moi ',
    },
    {
      label: 'Je peux y aller accompagné.e',
      value: 'Je peux y aller accompagné.e',
      key: 'Je peux y aller accompagné.e',
    },
    {
      label: 'Autre (Précise la raison en quelques mots)',
      value: 'Autre (Précise la raison en quelques mots)',
      key: 'Autre (Précise la raison en quelques mots)',
    },
  ];

  const no_picker_props = [
    {
      label: 'Je ne veux pas parler de sexualité avec un référent.e',
      value: 'Je ne veux pas parler de sexualité avec un référent.e',
      key: 'Je ne veux pas parler de sexualité avec un référent.e',
    },
    {
      label: 'Je n’ai pas besoin de parler à un référent.e',
      value: 'Je n’ai pas besoin de parler à un référent.e',
      key: 'Je n’ai pas besoin de parler à un référent.e',
    },
    {
      label: 'C’est contraignant pour récupérer le kit (rdv etc.)',
      value: 'C’est contraignant pour récupérer le kit (rdv etc.)',
      key: 'C’est contraignant pour récupérer le kit (rdv etc.)',
    },
    {
      label: 'Autre (Précise la raison en quelques mots)',
      value: 'Autre (Précise la raison en quelques mots)',
      key: 'Autre (Précise la raison en quelques mots)',
    },
  ];

  const handleAnswerSelection = answer => {
    const newAnswers = answers.map(a => {
      if (a.id === answer.id) {
        return {...a, selected: true};
      }
      return {...a, selected: false};
    });
    setAnswers(newAnswers);
    setSelectedAnswer(answer);
  };

  const handleAnswerChange = a => {
    console.log(a);
  };

  return (
    <View style={styles.container}>
      <Image source={warning} style={styles.image} />
      <Text
        style={[
          styles.title,
          {alignSelf: 'center', textAlign: 'center', paddingHorizontal: '5%'},
        ]}>
        La livraison de kit chez un référent{' '}
        <Text style={styles.bold}>n'est pas encore disponible.</Text>
      </Text>
      <Text style={styles.description}>
        Un.e référent.e t'accompagne pour répondre à tes questions autour de la
        sexualité :
      </Text>
      <RenderHTML
        source={htmlText}
        contentWidth={config.deviceWidth}
        baseStyle={styles.description}
      />
      <Text style={[styles.title, styles.bold]}>
        Serais-tu intéressé.e pour récupérer ton kit auprès d'un référent.e ?
      </Text>
      {answers.map((answer, i) => {
        return (
          <RadioButton
            key={answer.id}
            text={answer.text}
            selected={answer.selected}
            onPress={() => handleAnswerSelection(answer)}
          />
        );
      })}
      {selectedAnswer && selectedAnswer?.text === 'oui' ? (
        <RNPickerSelect
          placeholder={{label: 'Pour quelle raison ?', value: null}}
          name="yesAnswer"
          items={yes_picker_props}
          onValueChange={e => handleAnswerChange(e)}
          style={{...pickerSelectStyle}}
          useNativeAndroidPickerStyle={false}
        />
      ) : (
        <RNPickerSelect
          placeholder={{label: 'Pour quelle raison ?', value: null}}
          name="noAnswer"
          items={no_picker_props}
          onValueChange={e => handleAnswerChange(e)}
          style={{...pickerSelectStyle}}
          useNativeAndroidPickerStyle={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
    padding: 20,
  },
  image: {
    alignSelf: 'center',
    marginBottom: '5%',
  },
  title: {
    fontSize: config.deviceWidth * 0.047,
    marginBottom: '5%',
  },
  description: {
    fontSize: config.deviceWidth * 0.04,
  },
  dropdown: {
    fontSize: config.deviceWidth * 0.04,
    marginVertical: '5%',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  bold: {
    fontWeight: '600',
  },
});

const pickerSelectStyle = StyleSheet.create({
  placeholder: {
    color: Colors.darkgrey,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  inputAndroid: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    fontSize: config.deviceWidth * 0.04,
    paddingVertical: 20,
    color: 'black',
  },
  inputIOS: {
    fontSize: config.deviceWidth * 0.04,
    paddingVertical: 12,
    borderColor: Colors.grey,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputIOSContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
});

export default ReferentIntention;
