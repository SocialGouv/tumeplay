import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LevelPointsIndicator = ({points}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NIVEAU 1</Text>
      <Text style={styles.text}>{points} / 3000 </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#ECC160',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  text: {},
});

export default LevelPointsIndicator;
