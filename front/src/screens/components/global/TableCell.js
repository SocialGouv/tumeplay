import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

TableCell.propTypes = {
  textStyle: PropTypes.object,
  children: PropTypes.string,   
};
export default function TableCell(props) {
  
  return (
    <View
	    {...props}
	    style={[{flexDirection: 'column', flex: 1, padding: 7, paddingTop: 10, paddingBottom: 0, borderWidth: 1, borderColor: "#FFFFFF"}, props.style]}
	>{props.children}</View>
  );
}

             