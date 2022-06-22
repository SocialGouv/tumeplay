import {View, Image, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import warning from '../../assets/Exclamation.png';
import RenderHTML from 'react-native-render-html';
import RadioButton from '../global/RadioButton';
import config from '../../../config';
import RNPickerSelect from 'react-native-picker-select';

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

  const picker_props = [{}];

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

  return (
    <View style={styles.container}>
      <Image source={warning} />
      <Text>
        La livraison de kit chez un référent n'est pas encore disponible.
      </Text>
      <Text>
        Un.e référent.e t'accompagne pour répondre à tes questions autour de la
        sexualité :
      </Text>
      <RenderHTML source={htmlText} contentWidth={config.deviceWidth} />
      <Text>
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
      {selectedAnswer && (
        <RNPickerSelect
          placeholder={{label: "Ta tranche d'âge", value: null}}
          name="isUnder25"
          items={picker_props}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
});

export default ReferentIntention;
