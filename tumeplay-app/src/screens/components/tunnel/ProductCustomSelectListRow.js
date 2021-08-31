import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../../styles/Color';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

ProductCustomSelectListRow.propTypes = {
  item: PropTypes.object,
  stock: PropTypes.object,
  onPress: PropTypes.func,
  onQtyAdjust: PropTypes.func,
};

export default function ProductCustomSelectListRow(props) {
  const [item] = useState(props.item);
  const [stock] = useState(props.stock);
  const [isSelected, setIsSelected] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(0);

  const localStylesheet = StyleSheet.create({
    picture: {
      marginRight: 7,
      marginLeft: 7,
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
      justifyContent: 'flex-start',
      alignSelf: 'center',
      alignItems: 'stretch',
      minWidth: '100%',
      opacity: stock <= 0 ? 0.5 : 1,
    },
    selectedRowStyle: {},
  });

  const _targetPicture = isSelected
    ? require('../../../assets/pictures/filled-minus.png')
    : require('../../../assets/pictures/filled-plus.png');

  function onPress(item) {
    const touched = !isSelected;
    const _selectAllowed = props.onPress(item, stock, touched);

    if (_selectAllowed && localQuantity === 0) {
      setIsSelected(!isSelected);
      setLocalQuantity(1);
    }
  }

  function adjustQuantity(mode) {
    let newQuantity = 0;
    if (mode === 'sub') {
      newQuantity = localQuantity ? localQuantity - 1 : localQuantity;
    } else {
      newQuantity = localQuantity + 1;
    }

    // const newQuantity = mode === 'sub' ? localQuantity - 1 : localQuantity + 1;
    const _adjustAllowed = props.onQtyAdjust(item, newQuantity, stock, mode);

    if (_adjustAllowed) {
      setLocalQuantity(newQuantity);

      if (newQuantity <= 0) {
				setIsSelected(false);
      }
    }
  }

  return (
    <View>
      <TouchableOpacity
        style={[
          localStylesheet.rowStyle,
          isSelected ? localStylesheet.selectedRowStyle : false,
        ]}
        onLayout={props.onLayout}
        onPress={() => {
          onPress(item);
        }}>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'start',
            borderBottomLeftRadius: 7,
            borderTopLeftRadius: 7,
          }}>
          <Image
            style={{
              width: '100%',
              resizeMode: 'cover',
              height: '100%',
              borderBottomLeftRadius: 7,
              borderTopLeftRadius: 7,
            }}
            source={REACT_APP_API_URL + item.image.url}
          />
        </View>
        <View
          style={{
            flex: 0.7,
            paddingLeft: 10,
            paddingVertical: 12,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: '#F1732E',
              fontFamily: 'Chivo-Regular',
              fontSize: 15,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: '#4F4F4F',
              fontFamily: 'Chivo-Regular',
              fontSize: 15,
            }}>
            {item.description}
          </Text>
          {stock <= 4 && stock != 0 && (
            <Text
              style={{
                color: '#4F4F4F',
                fontFamily: 'Chivo-Regular',
                fontSize: 10,
              }}>
              {stock} restants
            </Text>
          )}
          {stock <= 0 && (
            <Text
              style={{
                color: '#F1732E',
                fontFamily: 'Chivo-Regular',
                fontSize: 10,
              }}>
              indisponible
            </Text>
          )}
        </View>
        <Text
          style={{
            flex: 0.1,
            paddingLeft: 5,
            paddingVertical: 10,
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            alignSelf: 'center',
          }}>
          {!isSelected && stock > 0 && (
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
