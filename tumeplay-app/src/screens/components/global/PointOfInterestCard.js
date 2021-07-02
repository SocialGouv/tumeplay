import React, {useState} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';

import TunnelCartSummaryStyle from '../../../styles/components/TunnelCartSummary';
import Styles from '../../../styles/Styles';

import PropTypes from 'prop-types';

PointOfInterestCard.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
};

export default function PointOfInterestCard(props) {
  const [localHeight, setLocalHeight] = useState(0);
  const item = props.item;
  const textStyle = {
    lineHeight: 21,
    color: '#4F4F4F',
    fontSize: 12,
    fontFamily: 'Chivo-Regular',
    flexWrap: 'wrap',
  };

  function renderTimeTable() {
    var _return = [];
    var i = 0;

    for (const timetable in item.horaires) {
      const dayTable = item.horaires[timetable];
      let time = dayTable.am;
      if (dayTable.pm) {
        time = time + ' ' + dayTable.pm;
      }
      i = i + 1;

      _return.push(
        <Text key={i} style={[textStyle, {textTransform: 'capitalize'}]}>
          {timetable} : {time}
        </Text>,
      );
    }

    return (
      <View style={{height: localHeight, overflow: 'hidden', paddingLeft: 27}}>
        {_return}
      </View>
    );
  }

  function displayTimeTable() {
    if (localHeight > 0) {
      setLocalHeight(0);
    } else {
      setLocalHeight(7 * 21);
    }
  }

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
      onPress={() => {
        props.onPress(item);
      }}>
      <View
        style={[
          Styles.withWhiteShadow,
          {
            padding: 10,
            backgroundColor: '#FFFFFF',
            borderRadius: 7,
          },
        ]}>
        <Text
          style={{
            fontFamily: 'Abel-Regular',
            color: '#C80352',
            fontSize: 20,
            marginBottom: 3,
          }}>
          {item.LgAdr1}
        </Text>
        <View
          style={[
            TunnelCartSummaryStyle.pictureAndTextWrapper,
            {position: 'relative'},
          ]}>
          <View style={{position: 'absolute', right: -5, top: 5}}>
            {props.isSelected && (
              <Image
                style={TunnelCartSummaryStyle.pictureAndTextPicture}
                source={require('../../../assets/pictures/filled-check.png')}
              />
            )}
            {!props.isSelected && (
              <Image
                style={TunnelCartSummaryStyle.pictureAndTextPicture}
                source={require('../../../assets/pictures/empty-circle.png')}
              />
            )}
          </View>
          <View>
            <Image
              style={TunnelCartSummaryStyle.pictureAndTextPicture}
              source={require('../../../assets/pictures/picto-pin.png')}
            />
          </View>
          <View style={{width: 0, flexGrow: 1, flex: 1}}>
            <Text
              style={[
                TunnelCartSummaryStyle.subTitle,
                TunnelCartSummaryStyle.emailAdress,
                textStyle,
                {lineHeight: 18, paddingRight: 10},
              ]}>
              {item.LgAdr3}
              {'\n'}
              {item.CP} {item.Ville}
            </Text>
          </View>
        </View>

        <View style={TunnelCartSummaryStyle.pictureAndTextWrapper}>
          <TouchableOpacity
            onPress={displayTimeTable}
            style={{flexDirection: 'row'}}>
            <View>
              <Image
                style={TunnelCartSummaryStyle.pictureAndTextPicture}
                source={require('../../../assets/pictures/picto-clock.png')}
              />
            </View>
            <View>
              {localHeight == 0 && (
                <Text
                  style={[
                    TunnelCartSummaryStyle.subTitle,
                    TunnelCartSummaryStyle.emailAdress,
                    textStyle,
                    {color: '#C80352', textDecorationLine: 'underline'},
                  ]}>
                  Voir les horaires
                </Text>
              )}
              {localHeight > 0 && (
                <Text
                  style={[
                    TunnelCartSummaryStyle.subTitle,
                    TunnelCartSummaryStyle.emailAdress,
                    textStyle,
                  ]}>
                  Cacher les horaires
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {renderTimeTable()}
      </View>
    </TouchableOpacity>
  );
}
