import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import ProductCustomSelectListRow from './ProductCustomSelectListRow';

ProductCustomSelectList.propTypes = {
  item: PropTypes.object,
  shortMode: PropTypes.bool,
};

export default function ProductCustomSelectList(props) {
  const [productBox] = useState(props.item);
  const [allProducts] = useState(props.allProducts);
  const [selectAllowed, setSelectAllowed] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [maxRowHeight, setMaxRowHeight] = useState(0);
  // Because we need a synchronous way of doin' it ...
  var rowHeight = 0;

  function countProducts() {
    let _total = 0;

    for (const localProduct of selectedProducts) {
      _total += localProduct.qty;
    }

    return _total;
  }

  function onPress(item, _newState) {
    // not at max OR we were at max, now we deselect one.
    const _limitReached = countProducts() + 1 > 4;
    const _isAllowed = !_limitReached || (_limitReached && !_newState);

    setSelectAllowed(_isAllowed);

    if (_isAllowed) {
      let _newProducts = [...selectedProducts];

      if (!_newState) {
        _newProducts = _newProducts.filter(
          localItem => localItem.item.id !== item.id,
        );
      } else {
        _newProducts.push({item: item, qty: 1});
      }

      setSelectedProducts(_newProducts);
      props.onSelectChange(_newProducts);
    }

    return _isAllowed;
  }

  function onQuantityAdjust(item, _newQty, mode) {
    const _totalProducts = countProducts();
    const _newTotal = mode == 'sub' ? _totalProducts - 1 : _totalProducts + 1;
    const _limitReached = _newTotal > 4;

    if (!_limitReached) {
      let _newProducts = [...selectedProducts];

      _newProducts = _newProducts.filter(
        localItem => localItem.item.id !== item.id,
      );

      _newProducts.push({item: item, qty: _newQty});

      setSelectedProducts(_newProducts);
      props.onSelectChange(_newProducts);
    }

    return !_limitReached;
  }

  function _onChildLayout(event) {
    if (event.nativeEvent.layout.height > rowHeight) {
      rowHeight = event.nativeEvent.layout.height;

      setMaxRowHeight(rowHeight);
    } else {
      if (rowHeight > maxRowHeight) {
        setMaxRowHeight(rowHeight);
      }
    }
  }

  function _renderProductList(items) {
    if (items !== undefined) {
      return items.map((item, key) => {
        if (item.isOrderable) {
          return (
            <ProductCustomSelectListRow
              key={key}
              item={item}
              onPress={onPress}
              rowHeight={maxRowHeight}
              onLayout={_onChildLayout}
              onQtyAdjust={onQuantityAdjust}
              selectAllowed={selectAllowed}
            />
          );
        }
      });
    } else {
      return <View></View>;
    }
  }

  if (productBox === undefined) {
    return null;
  }

  return _renderProductList(allProducts);
}
