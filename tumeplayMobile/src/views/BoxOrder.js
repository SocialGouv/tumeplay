import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BoxCard from '../components/BoxCard';
import Container from '../components/global/Container';
import {Colors, Fonts} from '../styles/Style';
import Icon from 'react-native-vector-icons/Ionicons';

const Box = ({navigation, route}) => {
  const {box} = route.params;
  return (
    <Container style={styles.container}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="md-arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.boxContainer}>
        <BoxCard
          title={box.title}
          description={box.description}
          moreInfo={box.moreInfo}
          image={box.image}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    paddingVertical: 21,
  },
  boxContainer: {
    width: '100%',
    paddingBottom: 22,
  },
  backButton: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 16,
  },
});

export default Box;
