import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

TableRow.propTypes = {
  textStyle: PropTypes.object,
  children: PropTypes.string,
};
export default function TableRow(props) {
  
  return (
    <View
	    style={[{flexDirection: 'row', flex: 1}]}
	>{props.children}</View>
  );
}
             