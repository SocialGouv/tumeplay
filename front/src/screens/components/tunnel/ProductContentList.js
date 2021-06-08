import React, {useState} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

ProductContentList.propTypes = {
  item: PropTypes.object,
  shortMode: PropTypes.bool,
};

export default function ProductContentList(props) {
  const [productBox] = useState(props.item);
  const [customProducts] = useState(props.products);
  const [shortMode] = useState(props.shortMode);

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
        // When shortmode, it's a sub-sub-item
        var itemText = item.title;
        if (shortMode && typeof item.item !== 'undefined') {
          if (typeof item.item.shortTitle !== 'undefined') {
            itemText = item.item.shortTitle;
          } else {
            itemText = item.item.shortDescription;
          }
        }
        return renderRow(key, item.qty, itemText);
      });
    } else {
      return <View></View>;
    }
  }

  if (productBox === undefined) {
    return null;
  }

  const _targetList =
    productBox.products.length > 0 ? productBox.products : customProducts;

  return _renderProductList(_targetList);
}
