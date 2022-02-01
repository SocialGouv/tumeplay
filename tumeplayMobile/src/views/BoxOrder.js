import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
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
        <Text>Tu as séléctionné</Text>
        <View>
          <Text>Kit {box.number}</Text>
          <Text>{box.title}</Text>
        </View>
        <View>
          <Text>Où souhaites-tu recevoir ton kit ?</Text>
          <View>
            <TouchableOpacity>
              <Text>A DOMICILE</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>A DOMICILE</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput />
            <TextInput />
            <TextInput />
            <TextInput />
          </View>
        </View>
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
