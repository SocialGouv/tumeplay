import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../components/Text';
import {Fonts} from '../styles/Style';
import {useMutation} from '@apollo/client';
import {POST_FEEDBACK} from '../services/api/feedbacks';

const Feedback = ({content}) => {
  const [isFeedbackPositive, setIsFeedbackPositive] = useState(null);
  const [hasFeedback, setHasFeedback] = useState(false);

  const [createFeedbackQuery] = useMutation(POST_FEEDBACK, {
    onError(error) {
      console.log('error on create feedback', error);
    },
    onCompleted() {
      setHasFeedback(true);
    },
  });

  const createFeedback = async isPositive => {
    await createFeedbackQuery({
      variables: {
        content: content.id,
        appreciation: isPositive ? 1 : 0,
      },
    });
    setIsFeedbackPositive(isPositive);
  };

  useEffect(() => {
    setHasFeedback(false);
  }, [content]);

  return (
    <>
      <Text style={[styles.text, {fontWeight: '600'}]}>
        As-tu trouvé ce contenu intéressant ?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.badge,
            hasFeedback && isFeedbackPositive && styles.selectedGood,
          ]}
          disabled={hasFeedback}
          onPress={() => {
            createFeedback(true);
          }}>
          <Text>👍</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.badge,
            hasFeedback && !isFeedbackPositive && styles.selectedWrong,
          ]}
          disabled={hasFeedback}
          onPress={() => {
            createFeedback(false);
          }}>
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
  selectedGood: {
    backgroundColor: '#DDF4ED',
  },
  selectedWrong: {
    backgroundColor: '#FEE6E1',
  },
});

export default Feedback;
