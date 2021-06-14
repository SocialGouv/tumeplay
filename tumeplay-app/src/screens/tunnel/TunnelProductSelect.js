import React, {useState, useEffect, forwardRef} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import Styles from '../../styles/Styles';

import UserService from '../../services/User';
import RemoteApi from '../../services/RemoteApi';

import CustomFooter from '../CustomFooter';
import ContactButton from '../components/global/ContactButton';
import ProductCard from '../components/tunnel/ProductCard';
import ProductModal from '../components/tunnel/ProductModal';
import ProductNotEnoughTokensModal from '../components/tunnel/ProductNotEnoughTokensModal';
import ProductSelectHeader from '../components/tunnel/ProductSelectHeader';

import useIsMounted from '../../hooks/isMounted';
import autoScrollToTop from '../../hooks/autoScrollToTop';
import {useQuery} from '@apollo/client';
import {GET_BOXES} from '../../services/api/boxes';

TunnelProductSelect.propTypes = {
  navigation: PropTypes.object,
};
export default function TunnelProductSelect(props) {
  const [selectedItem, setSelectedItem] = useState({});
  const [localBoxs, setLocalBoxs] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNotEnoughModal, setShowNotEnoughModal] = useState(false);
  const isMounted = useIsMounted();
  const neededTokens = 1000;

  autoScrollToTop(props);

  const {data, loading} = useQuery(GET_BOXES);

  useEffect(() => {
    if (!loading && data) {
      setLocalBoxs(data.boxes);
    }
  }, [data, loading]);

  async function _onBoxClicked(selectedItem) {
    const _tokens = await UserService.getTokensAmount();

    if (_tokens >= neededTokens) {
      setSelectedItem(selectedItem);
      setShowModal(true);
    } else {
      setShowNotEnoughModal(true);
    }
  }

  function _toggleModal() {
    setShowModal(!showModal);
  }

  function _toggleNotEnoughModal() {
    setShowNotEnoughModal(!showNotEnoughModal);
  }

  const ForwardedNotEnoughModal = forwardRef(() => (
    <ProductNotEnoughTokensModal
      showModal={showNotEnoughModal}
      onClose={_toggleNotEnoughModal}
    />
  ));

  const ForwardedBoxModal = forwardRef(() => (
    <ProductModal
      navigation={props.navigation}
      onOrder={_onOrder}
      showModal={showModal}
      item={selectedItem}
      onClose={_toggleModal}
    />
  ));

  async function orderProduct(selectedProducts) {
    const _tokens = await UserService.getTokensAmount();

    if (_tokens >= neededTokens) {
      setShowModal(false);

      props.navigation.navigate('TunnelDeliverySelect', {
        selectedItem: selectedItem,
        selectedProducts: selectedProducts,
      });
    }
  }

  function _onOrder(selectedProducts) {
    orderProduct(selectedProducts);
  }

  function _renderBoxsCards() {
    return localBoxs.map((item, key) => {
      return (
        <ProductCard
          key={key}
          item={item}
          onPress={() => _onBoxClicked(item)}
        />
      );
    });
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <View style={[Styles.safeAreaViewInner, {flex: 1}]}>
        <ScrollView style={{flex: 0.9}}>
          <ProductSelectHeader />

          {_renderBoxsCards()}

          <ContactButton />

          <CustomFooter
            navigation={props.navigation}
            containerStyle={{paddingLeft: 0, paddingRight: 0}}
          />
        </ScrollView>
        <ForwardedBoxModal />
        <ForwardedNotEnoughModal />
      </View>
    </SafeAreaView>
  );
}
