import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Swiper from 'react-native-web-swiper';
import PropTypes from 'prop-types';

import Colors from '../../styles/Color';
import Styles from '../../styles/Styles';

Onboarding.propTypes = {
  slides: PropTypes.array,
  onDone: PropTypes.func,
};

export default function Onboarding(props) {
  const [slides] = useState(props.slides);

  const onboardStyle = {
    headerWrapper: {
      flex: 1,
      backgroundColor: Colors.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    headerLogo: {
      marginTop: 20,
      width: 200,
      height: 55,
      resizeMode: 'contain',
    },
    row: {
      flexDirection: 'row',
      height: 0,
      alignItems: 'center',
      margin: 20,
    },
    dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 1,
    },
    activeDotStyle: {
      backgroundColor: '#FFFFFF',
    },
    slideTextWrapper: {
      flex: 3,
      alignSelf: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 15,
    },
  };

  const {height} = Dimensions.get('window');
  const localStyle =
    Platform.OS === 'web'
      ? {
          height: height * 0.7,
          minHeight: height * 0.7,
          marginBottom: 10,
          flex: 1,
        }
      : {flex: 1};

  function _renderItem(item) {
    return (
      <View key={item.key} style={{flex: 1}}>
        <View style={{flex: 8, alignItems: 'center'}}>
          <Image style={Styles.contentPicture} source={item.picture} />
        </View>
        <View style={{flex: 1, alignSelf: 'center', marginTop: 7}}>
          <Text style={Styles.appTitle}>{item.title}</Text>
        </View>
        <View style={onboardStyle.slideTextWrapper}>
          <Text style={[Styles.text, {fontSize: 18}]}>{item.text}</Text>
        </View>
      </View>
    );
  }

  const _localSlides = slides.map(item => {
    return _renderItem(item);
  });

  return (
    <View style={{flex: 1}}>
      <View style={onboardStyle.headerWrapper}>
        <Image
          source={require('../../assets/pictures/boarding-logo.png')}
          style={onboardStyle.headerLogo}
        />
      </View>
      <Swiper
        controlsProps={{
          prevPos: 'bottom',
          nextPos: 'bottom',
          prevTitle: '<',
          nextTitle: '>',
          dotsTouchable: true,
          dotProps: {
            badgeStyle: onboardStyle.dotStyle,
          },
          dotActiveStyle: onboardStyle.activeDotStyle,
          PrevComponent: ({onPress}) => (
            <TouchableOpacity
              style={{left: -50, position: 'absolute'}}
              onPress={onPress}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/pictures/boarding/left-arrow.png')}
              />
            </TouchableOpacity>
          ),
          NextComponent: ({onPress}) => (
            <TouchableOpacity
              style={{right: -50, position: 'absolute'}}
              onPress={onPress}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/pictures/boarding/right-arrow.png')}
              />
            </TouchableOpacity>
          ),
        }}
        containerStyle={localStyle}
        style={{flex: 6, backgroundColor: Colors.backgroundColor}}>
        {_localSlides}
      </Swiper>
      <View>
        <TouchableOpacity onPress={props.onDone}>
          <View style={[Styles.bottomButton]}>
            <Text style={[Styles.bottomButtonText]}>Commencer</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
