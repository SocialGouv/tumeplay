import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import ProductCustomSelectListRow from './ProductCustomSelectListRow';

ProductCustomSelectList.propTypes = {
  allProducts: PropTypes.array,
  shortMode: PropTypes.bool,
};

export default function ProductCustomSelectList(props) {
  const [allProducts] = useState(props.allProducts);
  const [selectAllowed, setSelectAllowed] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);

  function countProducts() {
    let _total = 0;

    for (const localProduct of selectedProducts) {
      _total += localProduct.quantity;
    }

    return _total;
  }

  function onPress(item, stock, _newState) {
    // not at max OR we were at max, now we deselect one.
    const _limitReached =
      countProducts() > 4 || countProducts() > stock;
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

  function onQuantityAdjust(item, _newQty, stock, mode) {
    const _totalProducts = countProducts();
    console.log('totalProducts', _totalProducts)
    const _newTotal = mode == 'sub' ? _totalProducts - 1 : _totalProducts + 1;
    console.log('_newTotal', _newTotal)
    const _limitReached = _newTotal > 4 || _newQty > stock;

    console.log('limitReached', _limitReached)

    if (!_limitReached) {
      let _newProducts = [...selectedProducts];
      _newProducts= _newProducts.filter(
        localItem =>
          localItem.item.id !== item.id,
      );
      _newProducts.push({item: {id: item.id}, produit: item.id, quantity: _newQty});
      setSelectedProducts(_newProducts);
      props.onSelectChange(_newProducts);
    }

    return !_limitReached;
  }

  function _renderProductList(items) {
    if (items !== undefined) {
      return items.map((item, key) => {
        return (
          <ProductCustomSelectListRow
            key={key}
            item={item.produit}
            stock={item.stock}
            onPress={onPress}
            onQtyAdjust={onQuantityAdjust}
            selectAllowed={selectAllowed}
          />
        );
      });
    } else {
      return <View></View>;
    }
  }

  return _renderProductList(allProducts);
}
