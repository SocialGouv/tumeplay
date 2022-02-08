import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../../components/Text';
import AppContext from '../../../AppContext';
import * as Progress from 'react-native-progress';

const TopLevelPointIndicator = ({style}) => {
  const {user, doneModules_ids} = useContext(AppContext);

  const fullProgressLength = 6;

  const progress = doneModules_ids.length / fullProgressLength;

  return (
    <View style={[style, styles.container]}>
      <Text>
        Niveau <Text>{user.level}</Text>
      </Text>
      <Progress.Bar
        progress={progress}
        width={70}
        color={'#51B070'}
        unfilledColor="#DFD7CD"
        borderColor="#DFD7CD"
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
    alignItems: 'center',
  },

  progressBar: {
    marginHorizontal: 18,
  },
});

export default TopLevelPointIndicator;
