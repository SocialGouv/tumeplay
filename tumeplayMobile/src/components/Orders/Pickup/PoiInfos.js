import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Text from '../../Text';
import {Colors} from '../../../styles/Style';
import {Divider} from 'react-native-paper';
import config from '../../../../config';
import CustomModal from '../../global/CustomModal';

const PoiInfos = ({selectedPOI, setSelectedPOI}) => {
  const [timeTable, setTimeTable] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const formatTimeTable = () => {
    const tmpTimeTable = [
      {
        day: 'Lundi',
        value: selectedPOI.Horaires_Lundi.string.slice(0, 2).map(k => {
          return k.slice(0, 2) + 'h' + k.slice(2, k.length);
        }),
      },
      {
        day: 'Mardi',
        value: selectedPOI.Horaires_Mardi.string.slice(0, 2).map(k => {
          return k.slice(0, 2) + 'h' + k.slice(2, k.length);
        }),
      },
      {
        day: 'Mercredi',
        value: selectedPOI.Horaires_Mercredi.string.slice(0, 2).map(k => {
          return k.slice(0, 2) + 'h' + k.slice(2, k.length);
        }),
      },
      {
        day: 'Jeudi',
        value: selectedPOI.Horaires_Jeudi.string.slice(0, 2).map(k => {
          return k.slice(0, 2) + 'h' + k.slice(2, k.length);
        }),
      },
      {
        day: 'Vendredi',
        value: selectedPOI.Horaires_Vendredi.string.slice(0, 2).map(k => {
          return k.slice(0, 2) + 'h' + k.slice(2, k.length);
        }),
      },
      {
        day: 'Samedi',
        value: selectedPOI.Horaires_Samedi.string.slice(0, 2).map(k => {
          return k.slice(0, 2) + 'h' + k.slice(2, k.length);
        }),
      },
      {
        day: 'Dimanche',
        value: selectedPOI.Horaires_Dimanche.string.slice(0, 2).map(k => {
          return k.slice(0, 2) + 'h' + k.slice(2, k.length);
        }),
      },
    ];
    setTimeTable([...tmpTimeTable]);
  };

  const html = {
    html: `<div style=color:black;>
    ${timeTable.map(
      el =>
        '<ul>' +
        '<li>' +
        el.day +
        ' ' +
        el.value[0] +
        ' ' +
        '- ' +
        el.value[1] +
        '</li>' +
        '</ul>',
    )}
    </div>
    `,
  };

  useEffect(() => formatTimeTable(), []);

  console.log(modalVisible);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{selectedPOI?.LgAdr1}</Text>
          <Text>{selectedPOI?.LgAdr3}</Text>
          <Text>{selectedPOI?.Ville + ' ' + selectedPOI?.CP}</Text>
        </View>
        <View style={styles.linkContainer}>
          <TouchableOpacity
            style={styles.link}
            onPress={() => setSelectedPOI(null)}>
            <Text style={styles.redText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.redText}>Voir les horaires</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={[styles.divider, {marginBottom: 0}]} />
      {modalVisible && (
        <CustomModal
          isVisible={modalVisible}
          setIsVisible={setModalVisible}
          html={html}
          animation=""
          onPress={() => setModalVisible(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  infoContainer: {
    width: '50%',
  },
  linkContainer: {
    width: '50%',
    justifyContent: 'space-between',
  },
  divider: {
    width: '100%',
    borderColor: '#EAE2D7',
    borderWidth: 1,
  },
  link: {
    width: '100%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: '600',
  },
  redText: {
    color: '#D42201',
    lineHeight: 22,
    fontWeight: '500',
    fontSize: config.deviceWidth > 375 ? 14 : 13,
    textDecorationLine: 'underline',
  },
});

export default PoiInfos;
