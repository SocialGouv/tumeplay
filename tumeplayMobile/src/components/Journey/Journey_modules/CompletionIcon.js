import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import check from '../../../assets/white-check.png';
import React, {useRef, useEffect} from 'react';

const CompletionIcon = ({done, module, setSelectedModule}) => {
  const tmpModule = useRef(module);
  const completeStyle = {
    backgroundColor: done ? '#51B070' : 'transparent',
    borderColor: done ? '#51B070' : '#D8D8D8',
    borderWidth: 2,
  };

  const handleModuleSelection = e => {
    e.preventDefault();
    let tmp = {...tmpModule.current, isSelected: !tmpModule.current.isSelected};
    tmpModule.current = tmp;
    setSelectedModule(tmp);
  };

  const isSelectedStyle = {
    padding: 5,
    borderColor: '#D8D8D8',
  };

  useEffect(() => {
    tmpModule.current = module;
  }, [tmpModule.current]);

  return (
    <TouchableOpacity
      style={[
        styles.round,
        done && completeStyle,
        tmpModule?.current?.isSelected && !done && isSelectedStyle,
      ]}
      onPress={e => handleModuleSelection(e)}>
      {!done && tmpModule?.current?.isSelected && (
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
    backgroundColor: '#D8D8D8',
  },
});

export default CompletionIcon;
