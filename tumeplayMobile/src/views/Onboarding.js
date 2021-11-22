import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import Button from '../components/Button';
import StepIndicator from 'react-native-step-indicator';
import wave from '../assets/wave.png';

export default function Onboarding({user, setUser}) {
  const [steps, setSteps] = useState([
    {
      title: 'EN APPRENDRE PLUS SUR LA SEXUALITÉ',
      img: '✌️',
      description:
        'Choisis une ou plusieurs thématiques et consulte des contenus pensés pour toi ',
    },
    {
      title: 'EN APPRENDRE PLUS SUR LA SEXUALITÉ',
      img: '🤓',
      description: 'Joue et teste tes connaissances sur la sexualité. Prêt.e ?',
    },
    {
      title: 'EN APPRENDRE PLUS SUR LA SEXUALITÉ',
      img: '🎉',
      description:
        'Grâce aux badges remportés , commande gratuitement une des box de ton choix remplie de préservatifs et autres accessoires',
    },
  ]);
  const [currentStep, setCurrentStep] = useState(steps[0]);

  const finishOnboarding = () => {
    let tmpUser = user;
    tmpUser.isOnboarded = true;
    setUser({...tmpUser});
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.stepTitle}>{currentStep.title}</Text>
        <Image source={wave} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.stepImg}>{currentStep.img}</Text>
          <Text>{currentStep.description}</Text>
        </View>
        <View style={{width: 50}} horizontal>
          <StepIndicator
            customStyles={styles.indicatorStyles}
            stepCount={steps.length}
            currentPosition={steps.indexOf(currentStep)}
            onPress={step => setCurrentStep(steps[step])}
          />
        </View>
      </View>
      <Button
        text={'Je commence'}
        size={'large'}
        onPress={() => finishOnboarding()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 25,
  },
  containerStep: {
    alignItems: 'center',
    width: 150,
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginVertical: 20,
  },
  stepTitle: {
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 38,
    color: '#000000',
  },
  stepImg: {
    textAlign: 'center',
    fontSize: 60,
    marginBottom: 20,
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 200,
  },
  stepDescription: {
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 20,
  },
  indicatorStyles: {
    stepIndicatorSize: 7,
    currentStepIndicatorSize: 10,
    separatorStrokeWidth: 0,
    separatorStrokeFinishedWidth: 0,
    stepStrokeWidth: 0,
    stepIndicatorFinishedColor: '#EDC38B',
    stepIndicatorUnFinishedColor: '#F1A383',
    stepIndicatorCurrentColor: '#000',
    stepStrokeCurrentColor: '#000',
    stepIndicatorLabelCurrentColor: '#000',
    stepIndicatorLabelFinishedColor: '#EDC38B',
    stepIndicatorLabelUnFinishedColor: '#F1A383',
    separatorFinishedColor: '#EDC38B',
    separatorUnFinishedColor: '#F1A383',
    currentStepIndicatorLabelFontSize: 0,
  },
});
