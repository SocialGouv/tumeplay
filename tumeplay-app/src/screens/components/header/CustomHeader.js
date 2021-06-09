import React from 'react';
import {View, Platform} from 'react-native';
import PropTypes from 'prop-types';

import CustomHeaderLeft from './CustomHeaderLeft';
import CustomHeaderRight from './CustomHeaderRight';

CustomHeader.propTypes = {
  navigation: PropTypes.object,
  withBack: PropTypes.bool,
  availableTokens: PropTypes.number,
};

export default function CustomHeader(props) {
  const wrapperStyle = {
    backgroundColor: '#000000',
    flex: 1,
    height: 55,
    maxHeight: 55,
    paddingBottom: 10,
  };
  let headerStyle = {
    backgroundColor: '#000000',
    borderBottomWidth: 2,
    borderBottomColor: '#3D1D0B',
    height: 55,
    maxHeight: 55,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (Platform.OS === 'web') {
    headerStyle = {
      ...headerStyle,
      ...{
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 0,
      },
    };
  }

  return (
    <View style={wrapperStyle}>
      <View style={headerStyle}>
        <CustomHeaderLeft
          navigation={props.navigation}
          withBack={props.withBack}
        />
        <CustomHeaderRight navigation={props.navigation} />
      </View>
    </View>
  );
}
