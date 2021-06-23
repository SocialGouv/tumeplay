import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import Modal from 'react-native-modal';

import ProductContentList from './ProductContentList';
import ProductCustomSelectList from './ProductCustomSelectList';

import ModalCloseButton from '../global/ModalCloseButton';
import Styles from '../../../styles/Styles';
import Colors from '../../../styles/Color';
import ModalStyle from '../../../styles/components/Modal';

ProductModal.propTypes = {
  navigation: PropTypes.object,
  item: PropTypes.object,
  onOrder: PropTypes.func,
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  allProducts: PropTypes.array,
};

export default function ProductModal(props) {
  const [productBox] = useState(props.item);
  const [showModal] = useState(props.showModal);
  const [selectedItems, setSelectedItems] = useState([]);

  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardStyle = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: 7,
      marginTop: 20,
    },
    buttonWrapper: {
      flex: 1,
    },
    picture: {
      height: 250,
      width: '100%',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    },
    textContainer: {
      padding: 15,
    },
    title: {
      color: '#F1732C',
      fontSize: 28,
      fontFamily: Colors.titleCard,
    },
    subtitle: {
      color: '#F1732C',
      fontSize: 20,
    },
    text: {
      color: '#4F4F4F',
      fontSize: 14,
      marginBottom: 25,
      marginTop: 10,
      lineHeight: 22,
    },
    stockText: {
      color: '#4F4F4F',
      fontSize: 10,
      fontStyle: 'italic',
      marginTop: 5,
      marginBottom: 10
    },
    readMoreWrapper: {
      position: 'absolute',
      right: 15,
      bottom: 15,
    },
    readMore: {
      color: '#F1732C',
    },
    internalScrollView: {
      flex: 1,
      paddingBottom: screenWidth < 400 ? 95 : 0,
    },
    innerProductModal: {
      backgroundColor: '#FFFFFF',
      marginBottom: 10,
      marginTop: 10,
      borderRadius: 7,
      marginLeft: screenWidth < 400 ? 7 : 'auto',
      marginRight: screenWidth < 400 ? 7 : 'auto',
      paddingLeft: 0,
      paddingRight: 0,
    },
  });

  function stayInTouch() {
    props.onClose();
    props.navigation.navigate('StayInTouch', {
      outOfStock: true,
    });
  }

  function onOrder() {
    if (props.item.available || productBox.__typename === 'BoxSurMesure') {
      props.onOrder(selectedItems);
    } else {
      stayInTouch();
    }
  }

  function onSelectChange(selectedItems) {
    setSelectedItems(selectedItems);
  }

  if (productBox.title === undefined) {
    return <View></View>;
  }
  return (
    <Modal
      visible={showModal}
      isVisible={showModal}
      style={ModalStyle.modal}
      animationType="fade"
      ariaHideApp={false}
      backdropOpacity={0}
      transparent={true}>
      <View style={ModalStyle.backdrop}></View>

      <View style={[ModalStyle.innerModal, cardStyle.innerProductModal]}>
        <ModalCloseButton onClose={props.onClose} />

        <ScrollView style={cardStyle.internalScrollView}>
          <View>
            <Image
              style={cardStyle.picture}
              source={'http://localhost:1337' + productBox.image.url}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              paddingLeft: 15,
              paddingRight: 15,
            }}>
            {productBox.__typename === 'Box' && productBox.stock <= 30 ?
              <View>
                <Text style={cardStyle.title}>{productBox.title}</Text>
                <Text style={cardStyle.stockText}>Stock restant : {productBox.stock} boites</Text>
              </View>
              :
              <Text style={cardStyle.title}>{productBox.title}</Text>
            }
            <Text style={cardStyle.text}>{productBox.description}</Text>
          </View>

          {productBox.__typename === 'Box' && (
            <View style={{paddingLeft: 15, paddingRight: 15}}>
              <Text style={cardStyle.subtitle}>
                Ce que tu trouveras dans ta box :
              </Text>
              <ProductContentList item={productBox} />
            </View>
          )}
          {productBox.__typename === 'BoxSurMesure' && (
            <View
              style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 80}}>
              <ProductCustomSelectList
                onSelectChange={onSelectChange}
                allProducts={productBox.produits}
              />
            </View>
          )}
        </ScrollView>
        <View
          style={{
            marginTop: 15,
            marginBottom: 15,
            position: 'absolute',
            bottom: -30,
            width: '100%',
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 30,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            onPress={onOrder}
            style={[Styles.bottomButton, {borderRadius: 25}]}>
            <Text style={[Styles.bottomCommText]}>Commander</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
