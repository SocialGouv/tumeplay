import React, {useState} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

ProductContentList.propTypes = {
  item: PropTypes.object,
  products: PropTypes.array,
  shortMode: PropTypes.bool,
};

export default function ProductContentList(props) {
  const [productBox] = useState(props.item);
  const [customProducts] = useState(props.products);
  const [shortMode] = useState(props.shortMode);
  console.log(shortMode);

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
  function _renderProductList(items) {
    if (items !== undefined) {
      return items.map((item, key) => {
        var itemText = item.produit.title;

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
    _targetList =
      productBox.products.length > 0 ? productBox.products : customProducts;
  }

  return _renderProductList(_targetList);
}
