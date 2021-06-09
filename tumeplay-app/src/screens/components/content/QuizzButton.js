import React, {useState, useEffect, useRef} from 'react';
import {Text, Image, View, TouchableOpacity, Platform} from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../../../styles/Styles';

import QuizzPortal from './Portal';
import useIsMounted from '../../../hooks/isMounted';

QuizzButton.propTypes = {
  onClick: PropTypes.func,
};

export default function QuizzButton(props) {
  // See QuizzPortal : on web, we cannot use fixed as it's won't scroll due to parent containers
  // So we extract it and set it on body.
  const quizzButtonRef = useRef();

  const isMounted = useIsMounted();
  const isWeb = Platform.OS === 'web';
  const wrapperStyle = {
    left: isWeb ? '50%' : 0,
    marginLeft: isWeb ? '-25%' : undefined,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: isWeb ? undefined : 'absolute',
  };

  const [localBottom, setLocalBottom] = useState(75);

  useEffect(() => {
    if (isMounted.current) {
      const handleScroll = event => {
        if (quizzButtonRef.current) {
          const scrollTop = event.target.scrollingElement.scrollTop;
          const clientHeight = event.target.scrollingElement.clientHeight;
          const scrollBottom = scrollTop + clientHeight;
          const maxHeight = event.target.scrollingElement.scrollHeight;
          const maxDelta = 250;

          let _localBottom = 75;

          if (scrollTop > 0 && maxHeight - scrollBottom <= maxDelta) {
            _localBottom = maxDelta - (maxHeight - scrollBottom);

            if (_localBottom < 75) {
              _localBottom = 75;
            }
          }
          setLocalBottom(_localBottom);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isMounted]);

  if (Platform.OS === 'web') {
    return (
      <QuizzPortal portalClass={'web-quizz-button'}>
        <View
          ref={quizzButtonRef}
          style={[wrapperStyle, {bottom: localBottom}]}>
          <TouchableOpacity
            style={[Styles.bottomButton, {borderRadius: 25}]}
            onPress={props.onClick}>
            <View
              style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'row'}}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/pictures/answer-quizz.png')}
              />
              <Text style={[Styles.tunnelButtonText]}>Répondre au quiz</Text>
            </View>
          </TouchableOpacity>
        </View>
      </QuizzPortal>
    );
  } else {
    return (
      <View style={wrapperStyle}>
        <TouchableOpacity
          style={[Styles.bottomButton, {borderRadius: 25}]}
          onPress={props.onClick}>
          <View style={{paddingTop: 8, paddingBottom: 8}}>
            <Text style={[Styles.tunnelButtonText]}>Répondre au quiz</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
