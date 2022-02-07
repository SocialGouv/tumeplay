import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Fonts} from '../styles/Style';

const Feedback = () => {
  return (
    <>
      <Text style={[styles.text, {fontWeight: '600'}]}>
        As-tu trouvé ce contenu intéressant ?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.badge}>
          <Text>👍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.badge}>
          <Text>👎</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.strongText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  buttonContainer: {
    display: 'flex',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  badge: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFEED7',
  },
});

export default Feedback;
