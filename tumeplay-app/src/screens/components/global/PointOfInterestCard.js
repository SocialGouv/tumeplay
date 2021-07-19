import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';

import TunnelCartSummaryStyle from '../../../styles/components/TunnelCartSummary';
import Styles from '../../../styles/Styles';
import TimeTable from './TimeTable';

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
  const [timeTable, setTimeTable] = useState()

  const createTimeTableObject = (item) => {
    let timeTable;
    if(item.openingHours) {
      timeTable = [
        {day: item.openingHours.monday_title, value: [item.openingHours.monday_value], type: 'referent'},
        {day: item.openingHours.tuesday_title, value: [item.openingHours.tuesday_value], type: 'referent'},
        {day: item.openingHours.wednesday_title, value: [item.openingHours.wednesday_value], type: 'referent'},
        {day: item.openingHours.thursday_title, value: [item.openingHours.thursday_value], type: 'referent'},
        {day: item.openingHours.friday_title, value: [item.openingHours.friday_value], type: 'referent'},
        {day: item.openingHours.saturday_title, value: [item.openingHours.saturday_value], type: 'referent'},
        {day: item.openingHours.sunday_title, value: [item.openingHours.sunday_value], type: 'referent'},
      ]
      setTimeTable([...timeTable]);
    } else {
      timeTable = [
        {day: "Lundi", value: item.Horaires_Lundi.string.slice(0,2).map(k => k)},
        {day: "Mardi", value: item.Horaires_Mardi.string.slice(0,2).map(k => k)},
        {day: "Mercredi", value: item.Horaires_Mercredi.string.slice(0,2).map(k => k)},
        {day: "Jeudi", value: item.Horaires_Jeudi.string.slice(0,2).map(k => k)},
        {day: "Vendredi", value: item.Horaires_Vendredi.string.slice(0,2).map(k => k)},
        {day: "Samedi", value: item.Horaires_Samedi.string.slice(0,2).map(k => k)},
        {day: "Dimanche", value:  item.Horaires_Dimanche.string.slice(0,2).map(k => k)},
      ];
      setTimeTable([...timeTable]);
    }
  }

  useEffect(() => {
    createTimeTableObject(item)
  }, [])

  // function renderTimeTable() {
  //   var _return = [];
  //   var i = 0;

  //   for (const timetable in item.horaires) {
  //     const dayTable = item.horaires[timetable];
  //     let time = dayTable.am;
  //     if (dayTable.pm) {
  //       time = time + ' ' + dayTable.pm;
  //     }
  //     i = i + 1;

  //     _return.push(
  //       <Text key={i} style={[textStyle, {textTransform: 'capitalize'}]}>
  //         {timetable} : {time}
  //       </Text>,
  //     );
  //   }

  //   return (
  //     <View style={{height: localHeight, overflow: 'hidden', paddingLeft: 27}}>
  //       {_return}
  //     </View>
  //   );
  // }

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
          {item.LgAdr1 || item.name}
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
              {item.LgAdr3 || item.address}
              {'\n'}
              {item.CP || item.address_zipcode} {item.Ville || item.address_city}
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
        <TimeTable localHeight={localHeight} timeTable={timeTable} />
      </View>
    </TouchableOpacity>
  );
}
