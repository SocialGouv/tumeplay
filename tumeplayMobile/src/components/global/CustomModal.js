import {Modal, StyleSheet, View, Text} from 'react-native';
import React, {useState} from 'react';
import Button from '../Button';
import {useNavigation} from '@react-navigation/native';

const CustomModal = props => {
  const {isVisible, animation, title, text, onPress} = props;
  const [displayModal, setDisplayModal] = useState(isVisible);

  return (
    <Modal
      style={styles.container}
      animationType={animation}
      visible={displayModal}
      transparent={true}>
      <View style={styles.view}>
        <Text>{title}</Text>
        <Text>{text}</Text>
        <Button
          size="medium"
          text="Très bien c'est compris"
          onPress={() => {
            onPress;
            setDisplayModal(!isVisible);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  view: {
    minWidth: '100%',
    height: '55%',
    borderRadius: 25,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#FFF',
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
  },
});

export default CustomModal;
