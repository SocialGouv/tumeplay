import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Styles from '../../../styles/Styles';
import PropTypes from 'prop-types';

AnswerButton.propTypes = {
  onPress: PropTypes.func,
  questionKey: PropTypes.number,
  item: PropTypes.object,
};

export default function AnswerButton(props) {
  return (
    <TouchableOpacity
      key={props.questionKey}
      style={{flex: 2, paddingTop: 2, paddingBottom: 2, maxHeight: 55}}
      onPress={() => props.onPress(props.questionKey)}>
      <View style={[Styles.bottomButton, {width: '70%'}]}>
        <Text style={[Styles.bottomButtonText, {fontSize: 16}]}>
          {props.item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
