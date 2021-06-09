import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

import QuizzAnswerStyle from '../../../styles/components/QuizzAnswer';

NextButton.propTypes = {
  onPress: PropTypes.func,
};

export default function NextButton(props) {
  return (
    <TouchableOpacity
      style={QuizzAnswerStyle.nextButtonWrapper}
      onPress={props.onPress}>
      <View style={QuizzAnswerStyle.nextButton}>
        <Image
          style={QuizzAnswerStyle.nextButtonPicture}
          source={require('../../../assets/pictures/right-arrow.png')}
        />
      </View>
    </TouchableOpacity>
  );
}
