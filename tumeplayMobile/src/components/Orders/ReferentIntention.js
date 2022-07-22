import {
  View,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import Text from '../../components/Text';
import React, {useState, useEffect} from 'react';
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
  const [otherInformations, setOtherInformations] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [answers] = useState([
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
      console.log('error on intention creation', error);
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
      label: 'Oui, pour poser des questions',
      value: 'Oui, pour poser des questions',
      key: 1,
    },
    {
      label: 'Oui c’est plus discret vis-à-vis de mes parents',
      value: 'Oui c’est plus discret vis-à-vis de mes parents',
      key: 2,
    },
    {
      label: 'Pas de point relais près de chez moi',
      value: 'Pas de point relais près de chez moi',
      key: 3,
    },
    {
      label: 'Je peux y aller accompagné.e',
      value: 'Je peux y aller accompagné.e',
      key: 4,
    },
    {
      label: 'Autre (Précise la raison)',
      value: 'Autre (Précise la raison)',
      key: 5,
    },
  ];

  const no_picker_props = [
    {
      label: 'Pas envie de parler de sexualité avec un.e référent.e',
      value: 'Pas envie de parler de sexualité avec un.e référent.e',
      key: 1,
    },
    {
      label: 'Pas besoin de parler à un.e référent.e',
      value: 'Pas besoin de parler à un.e référent.e',
      key: 2,
    },
    {
      label: 'C’est compliqué pour récupérer le kit (rdv …)',
      value: 'C’est compliqué pour récupérer le kit (rdv …)',
      key: 3,
    },
    {
      label: 'Autre (Précise la raison)',
      value: 'Autre (Précise la raison)',
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
          other_informations: otherInformations.toString(),
          utilisateurs_mobile: user.id,
        },
      });
    } catch {
      Alert.alert('Erreur', "Une erreur est survenue lors de l'enregistrement");
    }
  };

  return (
    <ScrollView style={styles.container}>
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
      <View style={{paddingLeft: 10, width: '90%', marginBottom: 10}}>
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
        answers.map((answer, _i) => {
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
          name={selectedAnswer === 1 ? 'yesAnswer' : 'noAnswer'}
          items={selectedAnswer === 1 ? yes_picker_props : no_picker_props}
          onValueChange={e => handlePickerAnswerSelection(e)}
          style={{...pickerSelectStyle}}
          useNativeAndroidPickerStyle={false}
          pickerProps={{numberOfLines: 10}}
          textInputProps={{multiline: true}}
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
      {!isDone && precisedAnswer === 'Autre (Précise la raison)' && (
        <TextInput
          style={styles.textInput}
          placeholder="Précise la raison"
          onChangeText={e => setOtherInformations(e)}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    marginTop: 10,
    padding: 20,
    position: 'relative',
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
    color: Colors.black,
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
    // position: 'absolute',
    alignSelf: 'center',
    // bottom: 0,
    marginTop: '10%',
  },
  imageHand: {
    width: 30,
    height: 30,
    left: -10,
  },
  textInput: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    height: 50,
    marginTop: 10,
    fontSize: 18,
    color: 'black',
    paddingBottom: 5,
    textAlignVertical: 'center',
  },
});

const pickerSelectStyle = StyleSheet.create({
  placeholder: {
    color: Colors.darkgrey,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  inputAndroid: {
    minWidth: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    fontSize: config.deviceWidth * 0.04,
    paddingRight: 30, // to ensure the text is never behind the icon
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
