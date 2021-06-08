import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import Colors from '../styles/Color';
import CustomHeader from '../screens/components/header/CustomHeader';
import ContentScreen from '../screens/ContentScreen';
import TunnelDeliverySelect from '../screens/tunnel/TunnelDeliverySelect';
import TunnelProductSelect from '../screens/tunnel/TunnelProductSelect';
import TunnelBadgeList from '../screens/tunnel/TunnelBadgeList';
import TunnelUserAddress from '../screens/tunnel/TunnelUserAddress';
import TunnelCartSummary from '../screens/tunnel/TunnelCartSummary';
import TunnelOrderConfirm from '../screens/tunnel/TunnelOrderConfirm';
import TunnelPickupSelect from '../screens/tunnel/TunnelPickupSelect';
import LandingScreen from '../screens/LandingScreen';
import QuizzFinishScreen from '../screens/QuizzFinishScreen';
import LegalTermsScreen from '../screens/LegalTermsScreen';
import ChartScreen from '../screens/ChartScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import StayInTouchScreen from '../screens/StayInTouchScreen';
import StayInTouchConfirmScreen from '../screens/StayInTouchConfirmScreen';
import GlobalStatisticsScreen from '../screens/GlobalStatisticsScreen';

const AppStack = createStackNavigator(
  {
    LandingScreen: {
      screen: LandingScreen,
    },
    ContentScreen: {
      screen: ContentScreen,
      navigationOptions: ({navigation}) => ({
        params: navigation.state.params,
        header: <CustomHeader navigation={navigation} withBack={true} />,
      }),
    },
    QuizzFinishScreen: {
      screen: QuizzFinishScreen,
    },
    GlobalStatistics: {
      screen: GlobalStatisticsScreen,
      navigationOptions: ({navigation}) => ({
        params: navigation.state.params,
        header: <CustomHeader navigation={navigation} withBack={true} />,
      }),
    },
    TunnelProductSelect: {
      screen: TunnelProductSelect,
      navigationOptions: ({navigation}) => ({
        params: navigation.state.params,
        header: <CustomHeader navigation={navigation} withBack={true} />,
      }),
    },
    TunnelBadgeList: {
      screen: TunnelBadgeList,
      navigationOptions: ({navigation}) => ({
        params: navigation.state.params,
        header: <CustomHeader navigation={navigation} withBack={true} />,
      }),
    },
    TunnelDeliverySelect: {
      screen: TunnelDeliverySelect,
    },
    TunnelUserAddress: {
      screen: TunnelUserAddress,
    },
    TunnelCartSummary: {
      screen: TunnelCartSummary,
    },
    TunnelOrderConfirm: {
      screen: TunnelOrderConfirm,
    },
    TunnelPickupSelect: {
      screen: TunnelPickupSelect,
    },
    LegalTerms: {
      screen: LegalTermsScreen,
      navigationOptions: ({navigation}) => ({
        params: navigation.state.params,
        header: <CustomHeader navigation={navigation} withBack={true} />,
      }),
    },
    Chart: {
      screen: ChartScreen,
      navigationOptions: ({navigation}) => ({
        params: navigation.state.params,
        header: <CustomHeader navigation={navigation} withBack={true} />,
      }),
    },
    Contact: {
      screen: ContactUsScreen,
      navigationOptions: ({navigation}) => ({
        params: navigation.state.params,
        header: <CustomHeader navigation={navigation} withBack={true} />,
      }),
    },
    StayInTouch: {
      screen: StayInTouchScreen,
      navigationOptions: ({navigation}) => ({
        params: navigation.state.params,
        header: <CustomHeader navigation={navigation} />,
      }),
    },
    StayInTouchConfirm: {
      screen: StayInTouchConfirmScreen,
      navigationOptions: ({navigation}) => ({
        params: navigation.state.params,
        header: <CustomHeader navigation={navigation} />,
      }),
    },
  },
  {
    initialRouteName: 'LandingScreen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({navigation}) => ({
      header: <CustomHeader navigation={navigation} />,
      headerTintColor: Colors.backgroundColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  },
);

export default AppStack;
