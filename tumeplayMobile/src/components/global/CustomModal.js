import {Modal, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import Button from '../Button';

const CustomModal = props => {
  const {isVisible, setIsVisible, animation, title, text, navigation} = props;
  return (
    <Modal
      style={styles.container}
      animationType={animation}
      visible={isVisible}
      transparent={true}>
      <View style={styles.view}>
        <Text>{title}</Text>
        <Text>{text}</Text>
        <Button
          size="medium"
          text="Très bien c'est compris"
          onPress={() => {
            navigation.navigate('Home');
            setIsVisible(!isVisible);
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
  },
  view: {
    minWidth: '100%',
    height: '80%',
    borderRadius: 50,
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
