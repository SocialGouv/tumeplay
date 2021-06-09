import React from 'react';
import {View, Image} from 'react-native';

import TunnelCartSummaryStyle from '../../../styles/components/TunnelCartSummary';

export default function Splitter() {
  return (
    <View style={TunnelCartSummaryStyle.splitterWrapper}>
      <Image
        style={TunnelCartSummaryStyle.splitterPicture}
        source={require('../../../assets/pictures/splitter.png')}
      />
    </View>
  );
}
