import React, {useState, useEffect, forwardRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';

import PropTypes from 'prop-types';
import ProductNotEnoughTokensModal from '../tunnel/ProductNotEnoughTokensModal';

import User from '../../../services/User';
import Colors from '../../../styles/Color';

import useIsMounted from '../../../hooks/isMounted';

CustomHeaderRight.propTypes = {
  navigation: PropTypes.object,
  availableTokens: PropTypes.number,
};

export default function CustomHeaderRight(props) {
  const [availableTokens, setAvailableTokens] = useState(props.availableTokens);
  const [eventListener, setEventListener] = useState(false);
  const [eventListener25Years, setEventListener25Years] = useState(false);
  const [isAgeMoreThan25, setIsAgeMoreThan25] = useState(null);
  const [showNotEnoughModal, setShowNotEnoughModal] = useState(false);
  const isMounted = useIsMounted();

  const headerStyle = StyleSheet.create({
    container: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignContent: 'flex-end',
      alignItems: 'center',
    },
    textContainer: {
      position: 'relative',
      paddingRight: 0,
      marginRight: 15,
      borderColor: '#123321',
      backgroundColor: 'transparent',
    },
    text: {
      borderRadius: 15,
      padding: 5,
      paddingTop: 4,
      paddingBottom: 1,
      marginRight: 20,
      textAlign: 'right',
      width: 75,
      paddingLeft: 5,
      paddingRight: 20,
      backgroundColor: '#FFFFFF',
      borderWidth: 2,
      borderColor: Colors.mainButton,
      color: Colors.mainButton,
      fontFamily: Colors.textFont,
      overflow: 'hidden',
    },
    picture: {
      position: 'absolute',
      right: 0,
      top: -3,
      width: 33,
      height: 33,
    },
  });

  useEffect(
    () => {
      async function _fetchTokens() {
        const _tokens = await User.getTokensAmount();
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

      async function _fetchMoreThan25YO() {
        const _isAgeMoreThan25 = await User.getIsMoreThan25YearsOld();
        if (isMounted.current) {
          setIsAgeMoreThan25(_isAgeMoreThan25);

          const _listener = EventRegister.addEventListener(
            'isAgeMoreThan25Changed',
            data => {
              setIsAgeMoreThan25(data);
            },
          );
          setEventListener25Years(_listener);
        }

        return () => {
          EventRegister.removeEventListener(eventListener25Years);
        };
      }

      _fetchTokens();
      _fetchMoreThan25YO();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMounted],
  );

  function _gotoProductSelect() {
    console.log(
      `In CustomHeaderRight: ---> isAgeMoreThan25: ${isAgeMoreThan25}`,
    );
    if (isAgeMoreThan25 !== null && isAgeMoreThan25 !== undefined) {
      if (isAgeMoreThan25) {
        props.navigation.navigate('TunnelBadgeList');
      } else {
        if (availableTokens < 1000) {
          setShowNotEnoughModal(!showNotEnoughModal);
        } else {
          props.navigation.navigate('TunnelProductSelect');
        }
      }
    }
    if (isAgeMoreThan25 === null) {
      setShowNotEnoughModal(!showNotEnoughModal);
    }
  }

  function _toggleNotEnoughModal() {
    setShowNotEnoughModal(!showNotEnoughModal);
  }

  const ForwardedNotEnoughModal = forwardRef(() => (
    <ProductNotEnoughTokensModal
      showModal={showNotEnoughModal}
      isAgeMoreThan25={isAgeMoreThan25}
      onClose={_toggleNotEnoughModal}
    />
  ));

  return (
    <View style={headerStyle.container}>
      <View style={headerStyle.textContainer}>
        <TouchableOpacity onPress={_gotoProductSelect}>
          <Text style={headerStyle.text}>{availableTokens}</Text>
          <Image
            source={require('../../../assets/pictures/header-right.png')}
            style={headerStyle.picture}
          />
        </TouchableOpacity>
      </View>
      <ForwardedNotEnoughModal />
    </View>
  );
}
