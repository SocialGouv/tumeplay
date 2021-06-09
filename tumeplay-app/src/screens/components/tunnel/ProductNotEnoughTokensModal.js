import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import Modal from 'react-native-modal';

import ModalCloseButton from '../global/ModalCloseButton';
import Colors from '../../../styles/Color';
import ModalStyle from '../../../styles/components/Modal';

ProductNotEnoughTokensModal.propTypes = {
  showModal: PropTypes.bool,
  isAgeMoreThan25: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function ProductNotEnoughTokensModal(props) {
  const [showModal] = useState(props.showModal);

  const customModal = StyleSheet.create({
    innerModal: {
      backgroundColor: '#000000',
      marginBottom: 10,
      marginTop: 20,
      borderRadius: 7,
      maxHeight: 250,
      borderColor: '#FFFFFF',
      borderWidth: 2,
    },
    modalTitle: {
      textAlign: 'center',
      fontFamily: Colors.titleSmallCard,
      fontSize: 27,
      color: '#FFFFFF',
      marginTop: 15,
      marginBottom: 15,
    },

    text: {
      textAlign: 'center',
      fontFamily: Colors.textFont,
      fontSize: 17,
      color: '#FFFFFF',
    },
  });

  return (
    <Modal
      visible={showModal}
      isVisible={showModal}
      style={ModalStyle.modal}
      animationType="fade"
      backdropOpacity={0}
      transparent={true}>
      <View style={ModalStyle.backdrop}></View>

      <View style={[ModalStyle.innerModal, customModal.innerModal]}>
        <ModalCloseButton onClose={props.onClose} />
        <View style={{flex: 1, padding: 30}}>
          {!props.isAgeMoreThan25 && props.isAgeMoreThan25 != null && (
            <View>
              <Text style={customModal.modalTitle}>Presque !</Text>
              <Text style={customModal.text}>
                Pour accéder à la commande de box gratuite, il faut avoir au
                minimum <Text style={{fontWeight: 'bold'}}>1000 points</Text>.
                {'\n'}Réponds à d&apos;autres quiz pour augmenter ton score.
              </Text>
            </View>
          )}
          {props.isAgeMoreThan25 == null && (
            <View>
              <Text style={customModal.modalTitle}>Oups !</Text>
              <Text style={customModal.text}>
                Pour accéder à la suite, tu dois répondre à des quiz et
                augmenter ton score.
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
