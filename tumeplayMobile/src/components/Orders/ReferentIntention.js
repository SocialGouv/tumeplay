import {View, Image, Text, StyleSheet, Alert} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import warning from '../../assets/Exclamation.png';
import RenderHTML from 'react-native-render-html';
import RadioButton from '../global/RadioButton';
import config from '../../../config';
import RNPickerSelect from 'react-native-picker-select';
import {Colors} from '../../styles/Style';
import Button from '../Button';
import {useMutation, useQuery} from '@apollo/client';
import {
  CREATE_REFERENT_INTENTION,
  GET_SURVEY_BY_USER,
} from '../../services/api/referents';
import hand from '../../assets/hand.png';
import Icon from 'react-native-vector-icons/Entypo';

const ReferentIntention = props => {
  const {user} = props;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [precisedAnswer, setPrecisedAnswer] = useState(null);
  const [isDone, setIsDone] = useState(false);
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

  const [create_referent_intention] = useMutation(CREATE_REFERENT_INTENTION, {
    onError(error) {
      console.log('error on signup', error);
    },
    onCompleted() {
      setIsDone(true);
    },
  });

  const get_user_intention = useQuery(GET_SURVEY_BY_USER, {
    variables: {
      utilisateurs_mobile: user.id,
    },
  });

  useEffect(() => {
    if (get_user_intention) {
      setIsDone(get_user_intention.data?.referentSurveys.length !== 0);
    }
  }, [get_user_intention]);

  const htmlText = {
    html: '<ul><li>Infirmier.e de collège / lycée</li><li>Personne travaillant dans un CeGID / CRIPS etc.</li></ul>',
  };

  const yes_picker_props = [
    {
      label: 'C’est l’occasion de poser des questions',
      value: 'C’est l’occasion de poser des questions',
      key: 1,
    },
    {
      label: 'Je préfère, c’est plus discret vis-à-vis de mes parents',
      value: 'Je préfère, c’est plus discret vis-à-vis de mes parents',
      key: 2,
    },
    {
      label: 'Il n’y a pas de point relais près de chez moi ',
      value: 'Il n’y a pas de point relais près de chez moi ',
      key: 3,
    },
    {
      label: 'Je peux y aller accompagné.e',
      value: 'Je peux y aller accompagné.e',
      key: 4,
    },
    {
      label: 'Autre (Précise la raison en quelques mots)',
      value: 'Autre (Précise la raison en quelques mots)',
      key: 5,
    },
  ];

  const no_picker_props = [
    {
      label: 'Je ne veux pas parler de sexualité avec un référent.e',
      value: 'Je ne veux pas parler de sexualité avec un référent.e',
      key: 1,
    },
    {
      label: 'Je n’ai pas besoin de parler à un référent.e',
      value: 'Je n’ai pas besoin de parler à un référent.e',
      key: 2,
    },
    {
      label: 'C’est contraignant pour récupérer le kit (rdv etc.)',
      value: 'C’est contraignant pour récupérer le kit (rdv etc.)',
      key: 3,
    },
    {
      label: 'Autre (Précise la raison en quelques mots)',
      value: 'Autre (Précise la raison en quelques mots)',
      key: 4,
    },
  ];

  const handleAnswerSelection = answer => {
    setSelectedAnswer(answer.id);
  };

  const handlePickerAnswerSelection = a => {
    setPrecisedAnswer(a);
  };

  const handleSave = async () => {
    try {
      await create_referent_intention({
        variables: {
          is_interested: selectedAnswer === 1 ? true : false,
          detailed_informations: precisedAnswer.toString(),
          utilisateurs_mobile: user.id,
        },
      });
    } catch {
      Alert.alert('Erreur', "Une erreur est survenue lors de l'enregistrement");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={warning} style={styles.image} />
      <Text
        style={[
          styles.title,
          {alignSelf: 'center', textAlign: 'center', paddingHorizontal: 35},
        ]}>
        La livraison de kit chez un référent{' '}
        <Text style={styles.bold}>n'est pas encore disponible.</Text>
      </Text>
      <View style={styles.middleContainer}>
        <Image source={hand} style={styles.imageHand} />
        <Text style={styles.description}>
          Un.e référent.e t'accompagne pour répondre à tes questions autour de
          la sexualité :
        </Text>
      </View>
      <View style={{paddingLeft: 10, width: '90%', marginBottom: 30}}>
        <RenderHTML
          source={htmlText}
          contentWidth={config.deviceWidth * 0.8}
          baseStyle={styles.description}
        />
      </View>
      {!isDone && (
        <Text style={[styles.title, styles.bold]}>
          Serais-tu intéressé.e pour récupérer ton kit auprès d'un référent.e ?
        </Text>
      )}
      {!isDone &&
        answers.map((answer, i) => {
          return (
            <RadioButton
              key={answer.id}
              text={answer.text}
              selected={answer.id === selectedAnswer}
              onPress={() => handleAnswerSelection(answer)}
            />
          );
        })}
      {!isDone && selectedAnswer && (
        <RNPickerSelect
          placeholder={{label: 'Pour quelle raison ?', value: null}}
          name={selectedAnswer.text === 'Oui' ? 'yesAnswer' : 'noAnswer'}
          items={
            selectedAnswer.text === 'Oui' ? yes_picker_props : no_picker_props
          }
          onValueChange={e => handlePickerAnswerSelection(e)}
          style={{...pickerSelectStyle}}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <Icon
              name="chevron-down"
              size={20}
              style={pickerSelectStyle.icon}
              color={Colors.grey}
            />
          )}
        />
      )}
      {!isDone && precisedAnswer !== null && (
        <Button
          style={styles.button}
          onPress={handleSave}
          text="Je valide la réponse"
          size="large"
          icon={true}
        />
      )}
      {isDone && (
        <Text style={[styles.title, styles.bold, {alignSelf: 'center'}]}>
          Merci ! Ton retour a été envoyé !
        </Text>
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
    width: '100%',
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    marginVertical: '5%',
  },
  imageHand: {
    width: 30,
    height: 30,
    left: -10,
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
    marginTop: '5%',
  },
  inputIOSContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 30,
  },
});

export default ReferentIntention;
