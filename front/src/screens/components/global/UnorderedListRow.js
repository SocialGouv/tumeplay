import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

UnorderedListRow.propTypes = {
  children: PropTypes.object,
};

export default function UnorderedListRow(props) {
  return (
    <View style={{flexDirection: 'row', marginTop: 3, marginBottom: 3}}>
      <Text>{'\u2022'}</Text>
      <Text style={{flex: 1, paddingLeft: 5}}>{props.children}</Text>
    </View>
  );
}
