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
import ProductConflictModal from '../components/tunnel/ProductConflictModal';
import ProductMondialRelayErrorModal from '../components/tunnel/ProductMondialRelayErrorModal';
import ProductSelectHeader from '../components/tunnel/ProductSelectHeader';

import useIsMounted from '../../hooks/isMounted';
import autoScrollToTop from '../../hooks/autoScrollToTop';
import {useQuery} from '@apollo/client';
import {GET_BOXES, GET_BOX_MESURES} from '../../services/api/boxes';
import _ from 'lodash'

TunnelProductSelect.propTypes = {
  navigation: PropTypes.object
};
export default function TunnelProductSelect(props) {
  const [selectedItem, setSelectedItem] = useState({});
  const [localBoxs, setLocalBoxs] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNotEnoughModal, setShowNotEnoughModal] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [showMondialRelayErrorModal, setShowMondialRelayErrorModal] = useState(false);
  const isMounted = useIsMounted();
  const neededTokens = 1000;

  autoScrollToTop(props);

  const error = _.get(props.navigation, 'state.params.error', null)
  
  const {data: box, loading, refetch: refetchBoxes} = useQuery(GET_BOXES);
  const {data: boxes_sur_mesure, loading2, refetch: refetchBoxMesure} = useQuery(GET_BOX_MESURES);

  const fetchAllBoxes = () => {
    if (process.env.REACT_APP_ZONE === 'guyane' && !loading && box && !loading2 && boxes_sur_mesure) {
      const boxes = box.boxes;
      const allBoxes = [...boxes, boxes_sur_mesure.boxSurMesure];
      setLocalBoxs(allBoxes)
    } else if (!loading && box && !loading2 && boxes_sur_mesure) {
      const boxes = box.boxes;
      const allBoxes = [...boxes];
      setLocalBoxs(allBoxes)
    }
  }

  useEffect(() => {
    if (error) {
      refetchBoxes();
      refetchBoxMesure();

      switch (error) {
        case 409:
          setShowConflictModal(true);
          break;
        case 405:
        case 500:
          setShowMondialRelayErrorModal(true);
          break;
      }

      props.navigation.state.params.error = null
    }
  }, [error])

  useEffect(() => {
    fetchAllBoxes();
  }, [box, boxes_sur_mesure]);


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


  const ConflictBoxModal = forwardRef(() => (
    <ProductConflictModal
      showModal={showConflictModal}
      onClose={() => setShowConflictModal(false)}
    />
  ));
  
  const MondialRelayErrorModal = forwardRef(() => (
    <ProductMondialRelayErrorModal
      showModal={showMondialRelayErrorModal}
      onClose={() => setShowMondialRelayErrorModal(false)}
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
        selectedProducts: selectedProducts
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
          navigation={props.navigation}
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
        <ConflictBoxModal />
        <MondialRelayErrorModal />
      </View>
    </SafeAreaView>
  );
}
