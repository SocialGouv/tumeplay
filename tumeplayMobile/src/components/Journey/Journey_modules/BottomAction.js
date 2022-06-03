import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import TextBase from '../../Text';
import Button from '../../Button';
import config from '../../../../config';
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../../../AppContext';

const BottomAction = ({style, selectedModule}) => {
  const {doneModules_ids} = useContext(AppContext);

  const done = doneModules_ids.includes(parseInt(selectedModule.id));
  const navigation = useNavigation();
  const handleNavigation = () => {
    if (selectedModule) {
      navigation.navigate('QuizzModule', {
        module_id: selectedModule?.id,
        module_title: selectedModule?.title,
        questions: selectedModule?.questionsArray,
        theme: {
          id: selectedModule?.thematique_mobile?.id,
          title: selectedModule?.thematique_mobile?.title,
          color: selectedModule?.thematique_mobile?.color,
          image: selectedModule?.thematique_mobile?.image,
        },
        clearModuleData: true,
        retry: done,
      });
    }
  };

  return (
    <View style={style}>
      <TextBase style={styles.title}>{selectedModule?.title}</TextBase>
      <TextBase style={styles.text}>Prét.e à relever ce défis ?</TextBase>
      <Button
        special
        size="small"
        text="Jouer"
        icon
        left
        style={styles.button}
        onPress={handleNavigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  text: {
    paddingVertical: 35,
  },
  button: {
    position: 'absolute',
    width: config.deviceWidth * 0.3,
    bottom: config.deviceHeight > 667 ? 50 : 15,
    right: 20,
  },
});

export default BottomAction;
