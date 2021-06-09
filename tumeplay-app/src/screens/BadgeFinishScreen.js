import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';

import Colors from '../styles/Color';
import Styles from '../styles/Styles';

import User from '../services/User';
import useIsMounted from '../hooks/isMounted';

import UnderlineText from './components/global/UnderlineText';

import PropTypes from 'prop-types';

BadgeFinishScreen.propTypes = {
  onRetry: PropTypes.func,
  availableTokens: PropTypes.number,
  badgeInfoDetails: PropTypes.object,
};

export default function BadgeFinishScreen(props) {
  const [availableTokens, setAvailableTokens] = useState(props.availableTokens);

  const [eventListener, setEventListener] = useState(false);

  const isMounted = useIsMounted();

  useEffect(
    () => {
      async function _fetchUserData() {
        // Fetching token
        const _tokens = await User.getTokensAmount();
        // Fetching isAgeMoreThan25:

        if (isMounted.current) {
          setAvailableTokens(_tokens);

          const _listener = EventRegister.addEventListener(
            'tokensAmountChanged',
            data => {
              setAvailableTokens(data);
            },
          );
          setEventListener(_listener);
        }

        return () => {
          EventRegister.removeEventListener(eventListener);
        };
      }

      _fetchUserData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMounted],
  );

  const headerStyle = StyleSheet.create({
    container: {},
    textContainer: {
      position: 'relative',
      paddingRight: 0,
      marginRight: 15,
      borderColor: '#123321',
      backgroundColor: 'transparent',
    },
    text: {
      borderRadius: 20,
      padding: 5,
      paddingTop: 8,
      paddingBottom: 5,
      textAlign: 'center',
      minWidth: 150,
      backgroundColor: '#FFFFFF',
      borderWidth: 2,
      borderColor: Colors.mainButton,
      color: Colors.mainButton,
      overflow: 'hidden',
      fontFamily: Colors.appTitleFont,
      zIndex: 0,
    },
    picture: {
      position: 'absolute',
      right: 0,
      top: -0,
      width: 38,
      height: 38,
    },
  });

  // Rendering:

  const badgeItems = {
    tu_obtiens_le_badge: (
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          color: Colors.mainButton,
          fontFamily: Colors.titleCard,
        }}>
        Tu obtiens le badge :
      </Text>
    ),

    prochain_badge: (
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: Colors.mainButton,
          fontFamily: Colors.titleCard,
        }}>
        <b>
          {props.badgeInfoDetails && props.badgeInfoDetails.nextBadge
            ? `*Prochain badge: ${props.badgeInfoDetails.nextBadge.title}`
            : ''}
        </b>
      </Text>
    ),

    badge_title_item:
      props.badgeInfoDetails && props.badgeInfoDetails.updatedBadge ? (
        <Text
          style={[
            headerStyle.text,
            Styles.withShadow,
            {height: 40, minHeight: 40},
          ]}>
          {props.badgeInfoDetails.updatedBadge.title}
        </Text>
      ) : null,

    badge_picture: (
      <Image
        style={[Styles.PictureFinish, {marginTop: 25}]}
        source={
          props.badgeInfoDetails && props.badgeInfoDetails.updatedBadge
            ? props.badgeInfoDetails.updatedBadge.picture
            : undefined
        }
      />
    ),
  };

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 7,
        backgroundColor: '#FEE7E3',
        position: 'relative',
        minWidth: 330,
      }}>
      <Image
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          minHeight: '100%',
          borderRadius: 7,
          resizeMode: 'stretch',
        }}
        source={require('../assets/pictures/quizz-finish-background.png')}
      />

      <View style={{flex: 0.1}}></View>
      <View style={{flex: 0.15}}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text style={Styles.finishText}>
            <UnderlineText borderColor={'#F1732E'} borderMargin={-15}>
              Bravo !
            </UnderlineText>
          </Text>
        </View>
      </View>
      <View style={{flex: 0.15, paddingLeft: 40, paddingRight: 40}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: Colors.mainButton,
            fontFamily: Colors.titleCard,
          }}>
          Ton score s&apos;éleve a
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 40,
            color: Colors.mainButton,
            fontFamily: Colors.titleCard,
          }}>
          {availableTokens} points
        </Text>
        {props.badgeInfoDetails && props.badgeInfoDetails.updatedBadge
          ? badgeItems.tu_obtiens_le_badge
          : undefined}
      </View>

      <View style={{flex: 0.3, alignItems: 'center'}}>
        {badgeItems.badge_picture}

        {badgeItems.badge_title_item}

        {badgeItems.prochain_badge}
      </View>

      <View style={{flex: 0.2}}></View>

      <View
        style={{position: 'absolute', width: '100%', bottom: 25, zIndex: 1}}>
        <TouchableOpacity
          style={[Styles.bottomButton, {borderRadius: 25}]}
          onPress={props.onRetry}>
          <Text style={Styles.bottomCommText}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
