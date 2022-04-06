import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../Button';
import config from '../../../config';

const CustomToolTip = props => {
  const {isLastStep, handleNext, handleStop, currentStep} = props;
  return (
    <View style={styles.tooltipContainer}>
      <View style={{width: '70%', position: 'absolute', top: 16, left: 16}}>
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

    width: '80%',
    height: config.deviceHeight * 0.13,
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
        ? config.deviceWidth * 0.036
        : config.deviceWidth * 0.035,
    fontWeight: '600',
  },
});

export default CustomToolTip;
