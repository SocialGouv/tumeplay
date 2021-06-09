import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import Modal from 'react-native-modal';

import ModalCloseButton from '../global/ModalCloseButton';
import Colors from '../../../styles/Color';
import ModalStyle from '../../../styles/components/Modal';

ProductError.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  modalTitle: PropTypes.string,
  children: PropTypes.object,
};

export default function ProductError(props) {
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
          <View>
            <Text style={customModal.modalTitle}>{props.modalTitle}</Text>
            <Text style={customModal.text}>{props.children}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
