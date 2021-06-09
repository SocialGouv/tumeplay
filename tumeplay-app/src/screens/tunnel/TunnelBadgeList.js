import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import Styles from '../../styles/Styles';

import CustomFooter from '../CustomFooter';
import ContactButton from '../components/global/ContactButton';
import BadgeListHeader from '../components/tunnel/BadgeListHeader';

import autoScrollToTop from '../../hooks/autoScrollToTop';

TunnelBadgeList.propTypes = {
  navigation: PropTypes.object,
};
export default function TunnelBadgeList(props) {
  autoScrollToTop(props);

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <View style={[Styles.safeAreaViewInner, {flex: 1}]}>
        <ScrollView style={{flex: 0.9}}>
          <BadgeListHeader />

          <ContactButton />

          <CustomFooter
            navigation={props.navigation}
            containerStyle={{paddingLeft: 0, paddingRight: 0}}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
