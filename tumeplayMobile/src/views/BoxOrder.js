import React, {useState} from 'react';
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
  const [selected, setSelected] = useState(true);
  return (
    <Container style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="md-arrow-back" size={30} color="#000" />
        <Text>retour</Text>
      </TouchableOpacity>
      <View style={styles.boxContainer}>
        <Text>Tu as séléctionné</Text>
        <View>
          <Text style={styles.redText}>KIT {box.number}</Text>
          <Text style={styles.boxTitle}>{box.title}</Text>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.subtitle}>
            Où souhaites-tu recevoir ton kit ?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.buttons,
                styles.buttonLeft,
                {backgroundColor: selected ? '#000' : '#FFF'},
              ]}>
              <Text style={styles.buttonText}>A DOMICILE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={true}
              style={[
                styles.buttons,
                styles.buttonRight,
                // {backgroundColor: selected ? '#000' : '#FFF'},
              ]}>
              <Text>EN POINT RELAIS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View>
            <TextInput style={styles.input} />
            <TextInput style={styles.input} />
            <TextInput style={styles.input} />
            <TextInput style={styles.input} />
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
    paddingTop: 20,
    paddingBottom: 22,
  },
  backButton: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  redText: {
    color: '#D42201',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    paddingLeft: 22,
  },
  boxTitle: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    paddingLeft: 22,
  },
  divider: {
    width: '100%',
    borderColor: '#EAE2D7',
    borderWidth: 1,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    paddingLeft: 22,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 26,
  },
  buttons: {
    borderColor: '#EAE2D7',
    borderWidth: 1,
    minHeight: 38,
    width: 125,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#000',
  },
  buttonRight: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  buttonText: {
    color: '#FFF',
  },
  input: {
    marginHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#EAE2D7',
  },
});

export default Box;
