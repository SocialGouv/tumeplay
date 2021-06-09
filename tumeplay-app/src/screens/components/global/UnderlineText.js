import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

UnderlineText.propTypes = {
  textStyle: PropTypes.object,
  children: PropTypes.string,
  borderMargin: PropTypes.number,
  borderColor: PropTypes.string,
};
export default function UnderlineText(props) {
  const borderColor = props.borderColor ? props.borderColor : '#C80652';
  const borderMargin = props.borderMargin ? props.borderMargin : -3;
  return (
    <View>
      <Text style={[{position: 'relative', zIndex: 2}, {...props.textStyle}]}>
        {props.children}
      </Text>
      <View
        style={{
          borderBottomColor: borderColor,
          borderBottomWidth: 3,
          position: 'relative',
          marginTop: borderMargin,
        }}
      />
    </View>
  );
}
