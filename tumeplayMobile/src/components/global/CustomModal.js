import {Modal, StyleSheet, View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import Button from '../Button';
import RenderHTML from 'react-native-render-html';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Fonts} from '../../styles/Style';

const CustomModal = props => {
  const {isVisible, animation, html, onPress, setIsVisible} = props;
  const {width} = useWindowDimensions();

  console.log('MODAL VISIBLE', isVisible);

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
        ]}
      />
      <View style={styles.view}>
        <MaterialIcons
          name="error-outline"
          color={'#D42201'}
          size={25}
          style={styles.icon}
        />
        <RenderHTML
          contentWidth={width}
          source={html}
          baseStyle={styles.htmlText}
        />
        <Button
          size="intermediate"
          icon={true}
          text="Ok, j'ai compris"
          onPress={() => {
            onPress;
            setIsVisible(false);
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
  },
  icon: {
    flex: 0.1,
    paddingTop: 23.5,
  },
  htmlText: {
    flex: 0.7,
    paddingHorizontal: 40,
    fontSize: 20,
    fontFamily: Fonts.title,
    lineHeight: 28,
  },
});

export default CustomModal;
