import {Modal, View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Fonts} from '../../styles/Style';
import Button from '../Button';

const OrderConfirmModal = props => {
  const {isVisible, animation, onPress} = props;

  return (
    <Modal
      style={styles.container}
      animationType={animation}
      visible={isVisible}
      transparent={true}>
      <View
        style={[
          styles.fullView,
          isVisible ? {backgroundColor: 'rgba(0,0,0,0.6)'} : '',
        ]}>
        <View style={styles.view}>
          <Text style={styles.htmlText}>
            🎉 Ta commande a bien été prise en compte 🎉
          </Text>
          <Button
            size="intermediate"
            icon={true}
            text="Je continue"
            onPress={onPress}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  fullView: {
    height: '100%',
  },
  view: {
    flex: 1,
    minWidth: '100%',
    height: '55%',
    borderRadius: 25,
    paddingHorizontal: 10,
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    justifyContent: 'space-around',
  },
  icon: {
    flex: 0.1,
    paddingTop: 23.5,
  },
  htmlText: {
    paddingHorizontal: 40,
    fontSize: 20,
    fontFamily: Fonts.title,
    lineHeight: 28,
  },
});

export default OrderConfirmModal;
