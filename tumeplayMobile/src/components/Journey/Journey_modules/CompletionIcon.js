import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import check from '../../../assets/white-check.png';
import React from 'react';

const CompletionIcon = ({done, module, handleModuleSelection}) => {
  const completeStyle = {
    backgroundColor: done ? '#51B070' : 'transparent',
    borderColor: done ? '#51B070' : '#000',
    borderWidth: 2,
  };

  const isSelectedStyle = {
    padding: 5,
    borderColor: '#000',
  };

  return (
    <TouchableOpacity
      style={[
        styles.round,
        done && completeStyle,
        module?.current?.isSelected && !done && isSelectedStyle,
      ]}
      onPress={e => handleModuleSelection(e)}>
      {!done && module?.current?.isSelected && (
        <View style={styles.innerCircle} />
      )}
      {done && <Image source={check} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  round: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#000',
  },
});

export default CompletionIcon;
