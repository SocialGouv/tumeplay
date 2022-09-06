import {View, StyleSheet} from 'react-native';
import Text from '../Text';
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    color: 'black',
    borderRadius: 5,
    padding: 16,
    width: '80%',
    height: config.deviceHeight * 0.12,
    backgroundColor: '#ffffff',
  },
  button: {
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
