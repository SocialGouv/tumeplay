import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../Button';
import config from '../../../config';

const CustomToolTip = props => {
  const {isLastStep, handleNext, handleStop, currentStep} = props;
  return (
    <View style={styles.tooltipContainer}>
      <View style={{width: '70%'}}>
        <Text style={styles.toolTipText}>
          {currentStep && currentStep.text}
        </Text>
      </View>
      <Button
        onPress={isLastStep ? handleStop : handleNext}
        size="small"
        text="Ok"
        icon={true}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 24,
    alignItems: 'center',
    // justifyContent: 'center',
    width: '80%',
    height: config.deviceHeight * 0.15,
    backgroundColor: '#ffffff',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 8,
  },
  toolTipText: {
    fontSize:
      config.deviceWidth > 375
        ? config.deviceWidth * 0.04
        : config.deviceWidth * 0.035,
  },
});

export default CustomToolTip;
