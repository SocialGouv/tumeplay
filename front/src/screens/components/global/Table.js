import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
        
Table.propTypes = {
  textStyle: PropTypes.object,
  children: PropTypes.string,   
};
export default function Table(props) {
  return (
    <View
	    {...props}
	    style={[{display: "flex",flexDirection: 'column', flex: 1}]}
	>{props.children}</View>
  );
}

             