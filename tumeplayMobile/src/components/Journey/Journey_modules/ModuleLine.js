import {StyleSheet, TouchableOpacity} from 'react-native';
import TextBase from '../../Text';
import React, {useContext, useEffect, useRef} from 'react';
import ModuleDifficultyBadge from './ModuleDifficultyBadge';
import CompletionIcon from './CompletionIcon';
import config from '../../../../config';
import AppContext from '../../../../AppContext.js';

const ModuleLine = ({module, index, setSelectedModule}) => {
  const {doneModules_ids} = useContext(AppContext);
  const done = doneModules_ids.includes(parseInt(module.id));
  const tmpModule = useRef(module);

  const handleModuleSelection = () => {
    let tmp = {...tmpModule.current, isSelected: !tmpModule.current.isSelected};
    tmpModule.current = tmp;
    setSelectedModule(tmp);
  };

  useEffect(() => {
    tmpModule.current = module;
  }, [tmpModule.current]);

  return (
    <TouchableOpacity
      onPress={() => handleModuleSelection()}
      style={styles.line}>
      <CompletionIcon
        done={done}
        isSelected={module?.isSelected}
        module={tmpModule}
        index={index}
        handleModuleSelection={handleModuleSelection}
        setSelectedModule={setSelectedModule}
      />
      <TextBase style={styles.text}>{module?.title}</TextBase>
      <ModuleDifficultyBadge level={module?.niveau?.value} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  line: {
    display: 'flex',
    flexDirection: 'row',
    width: config.deviceWidth * 0.9,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  text: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
});

export default ModuleLine;
