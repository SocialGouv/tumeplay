import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import wave from '../assets/wave.png';
import BoxCard from '../components/BoxCard';
import Container from '../components/global/Container';
import {Colors, Fonts} from '../styles/Style';
import Icon from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@apollo/client';
import {GET_BOXES} from '../services/api/boxes';
import CustomModal from '../components/global/CustomModal';

const Box = ({navigation}) => {
  const {data, loading} = useQuery(GET_BOXES);
  const [boxes, setBoxes] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (!loading && data) {
      setBoxes([...data.boxes]);
    }
  }, [data, loading]);

  const displayBoxes = boxes?.map((box, index) => {
    return (
      <View key={index} style={styles.box}>
        <BoxCard
          index={index + 1}
          title={box.title}
          description={box.description}
          box={box}
          navigation={navigation}
        />
      </View>
    );
  });

  const htmlText = {
    html: `<div>
      <p>Les kits sont <strong>disponibles à l'envoie uniquement</strong> dans les régions :</p>
      <ul>
        <li>Ile-de-France</li>
        <li>Nouvelle-Aquitaine</li>
      </ul>
    </div>
    `,
  };
  return (
    <Container style={styles.container}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="md-arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Ton Kit</Text>
      <Image style={styles.wave} source={wave} />
      <View style={styles.subtitleContainer}>
        <Text style={styles.congrats}>Bravo !</Text>
        <Text style={styles.description}>
          Tu as assez de points pour commander un kit de ton choix
        </Text>
      </View>
      <View style={styles.boxList}>{displayBoxes}</View>
      {!confirmation && (
        <View style={styles.modalBackground}>
          <CustomModal
            isVisible={true}
            html={htmlText}
            onPress={() => {
              setConfirmation(!confirmation);
            }}
          />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    paddingVertical: 21,
    zIndex: 1,
  },
  modalBackground: {
    flex: 1,
    height: '100%',
    zIndex: 5,
    position: 'absolute',
    backgroundColor: '#000000',
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 28,
    lineHeight: 38,
    color: Colors.black,
  },
  subtitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  congrats: {
    color: 'red',
    fontSize: 22,
    fontWeight: '600',
  },
  description: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  wave: {
    width: 26,
    height: 10,
  },
  boxList: {
    width: '100%',
  },
  box: {
    marginBottom: 2,
  },
  backButton: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 16,
  },
});

export default Box;
