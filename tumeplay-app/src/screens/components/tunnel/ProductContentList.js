import React, {useState} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import UserService from '../../../services/User';

ProductContentList.propTypes = {
  item: PropTypes.object,
  products: PropTypes.array,
  shortMode: PropTypes.bool,
};

export default function ProductContentList(props) {
  const [productBox] = useState(props.item);
  const [customProducts] = useState(props.products);
  const [shortMode] = useState(props.shortMode);
  //added for ABTesting
  const ABtestingPath = UserService.localUser.path === 'B';

  function renderRow(key, itemQty, itemText) {
    const itemLabel = itemQty ? itemQty + ' ' + itemText : itemText;
    return (
      <View key={key} style={{flexDirection: 'row'}}>
        <Text style={{color: '#4F4F4F', fontSize: 14}}>{'\u2022'}</Text>
        <Text style={{flex: 1, paddingLeft: 5, color: '#4F4F4F', fontSize: 14}}>
          {itemLabel}
        </Text>
      </View>
    );
  }
  //modified for ABTesting purpose
  function _renderProductList(items) {
    if (items !== undefined) {
      return items.map((item, key) => {
        // When shortmode, it's a sub-sub-item
        var itemText = ABtestingPath ? item.title : item.produit.title;
        if (shortMode && typeof item.item !== 'undefined') {
          if (typeof item.produit.title !== 'undefined') {
            itemText = ABtestingPath ? item.title : item.produit.title;
          } else {
            itemText = ABtestingPath ? item.title : item.produit.title;
          }
        }

        let displayRow = true;
        let quantity = null;
        if (productBox.__typename === 'BoxSurMesure') {
          const customProduct = customProducts.find(
            _ => _.produit === item.produit.id,
          );
          displayRow = !!customProduct;
          if (displayRow) {
            quantity = customProduct.quantity;
          }
        }

        if (displayRow) {
          return renderRow(key, quantity, itemText);
        }
      });
    } else {
      return <View></View>;
    }
  }

  if (productBox === undefined) {
    return null;
  }

  let _targetList;
  if (productBox.__typename === 'BoxSurMesure') {
    _targetList =
      productBox.produits.length > 0 ? productBox.produits : customProducts;
  } else {
    //modified for ABTesting purpose
    if (ABtestingPath) {
      _targetList =
        productBox.ABProduct.length > 0 ? productBox.ABProduct : customProducts;
    } else {
      _targetList =
        productBox.products.length > 0 ? productBox.products : customProducts;
    }
  }

  return _renderProductList(_targetList);
}
