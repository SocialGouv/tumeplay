import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../../styles/Color';

ProductCustomSelectListRow.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  onQtyAdjust: PropTypes.func,
  rowHeight: PropTypes.number,
  onLayout: PropTypes.func,
};

export default function ProductCustomSelectListRow(props) {
  const [item] = useState(props.item);
  const [isSelected, setIsSelected] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(0);

  const localStylesheet = StyleSheet.create({
    picture: {
      marginLeft: 7,
      marginRight: 7,
      paddingTop: 0,
      resizeMode: 'contain',
    },
    normalPicture: {
      width: 26,
      height: 26,
      marginTop: 3,
    },
    smallPicture: {
      width: 18,
      height: 18,
      marginTop: 0,
    },
    rowStyle: {
      flexDirection: 'row',
      flex: 1,
      shadowColor: '#4F4F4F',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 5,
      marginBottom: 15,
      borderRadius: 7,
      padding: 9,
      justifyContent: 'flex-start',
      alignSelf: 'center',
      alignItems: 'stretch',
      minWidth: '100%',
    },
    selectedRowStyle: {},
  });

  const _targetPicture = isSelected
    ? require('../../../assets/pictures/filled-minus.png')
    : require('../../../assets/pictures/filled-plus.png');

  function onPress() {
    const _newState = !isSelected;
    const _selectAllowed = props.onPress(item, _newState);

    if (_selectAllowed) {
      setIsSelected(!isSelected);
      setLocalQuantity(1);
    }
  }

  function adjustQuantity(mode) {
    const newQuantity = mode == 'sub' ? localQuantity - 1 : localQuantity + 1;
    const _adjustAllowed = props.onQtyAdjust(item, newQuantity, mode);

    if (_adjustAllowed) {
      setLocalQuantity(newQuantity);

      if (newQuantity <= 0) {
        onPress();
      }
    }
  }

  const _title = item.qty ? item.qty + ' ' + item.title : item.title;
  const _height = props.rowHeight > 0 ? {minHeight: props.rowHeight} : {};

  return (
    <View>
      <TouchableOpacity
        style={[
          localStylesheet.rowStyle,
          isSelected ? localStylesheet.selectedRowStyle : false,
          _height,
        ]}
        onLayout={props.onLayout}
        onPress={() => {
          onPress(item);
        }}>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          <Image
            style={{width: '100%', resizeMode: 'contain', height: '100%'}}
            source={item.picture}
          />
        </View>
        <View
          style={{
            flex: 0.7,
            paddingLeft: 5,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: '#F1732E',
              fontFamily: 'Chivo-Regular',
              fontSize: 15,
            }}>
            {_title}
          </Text>
          <Text
            style={{
              color: '#4F4F4F',
              fontFamily: 'Chivo-Regular',
              fontSize: 15,
            }}>
            {item.description}
          </Text>
        </View>
        <Text
          style={{
            flex: 0.1,
            paddingLeft: 5,
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            alignSelf: 'center',
          }}>
          {!isSelected && (
            <Image
              style={[localStylesheet.picture, localStylesheet.normalPicture]}
              source={_targetPicture}
            />
          )}
          {isSelected && (
            <View
              style={{
                alignSelf: 'center',
                flex: 1,
                flexDirection: 'column',
                minHeight: 70,
              }}>
              <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                  adjustQuantity('add');
                }}>
                <Image
                  style={[
                    localStylesheet.picture,
                    localStylesheet.smallPicture,
                  ]}
                  source={require('../../../assets/pictures/products/add.png')}
                />
              </TouchableOpacity>

              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Colors.textFont,
                  color: Colors.labelColor,
                }}>
                {localQuantity}
              </Text>

              <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                  adjustQuantity('sub');
                }}>
                <Image
                  style={[
                    localStylesheet.picture,
                    localStylesheet.smallPicture,
                  ]}
                  source={require('../../../assets/pictures/products/remove.png')}
                />
              </TouchableOpacity>
            </View>
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
