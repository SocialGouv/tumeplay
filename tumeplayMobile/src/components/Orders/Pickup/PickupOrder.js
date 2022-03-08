import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import POIAPI from '../../../services/api/poi';
import blackMapMarker from '../../../assets/mapMarker.png';
import orangeMapMarker from '../../../assets/orangeMarker.png';
import AutocompleteInput from 'react-native-autocomplete-input';
import PickupCard from './PickupCard';
import config from '../../../../config';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import Text from '../../Text';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import Button from '../../Button';

const PickupOrder = props => {
  const {setSelectedPOI} = props;
  const navigation = useNavigation();

  const [delta, setDelta] = useState({
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const [coordinates, setCoordinates] = useState({
    latitude: 48.856614,
    longitude: 2.3522219,
    latitudeDelta: delta.latitudeDelta,
    longitudeDelta: delta.longitudeDelta,
  });

  const [currentPOI, setCurrentPOI] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [mrPOI, setMrPoi] = useState([]);
  const [displayMap, setDisplayMap] = useState(false);
  const [geogouvData, setGeogouvData] = useState([]);
  const [hideResults, setHideResults] = useState(true);

  const validateZipCode = zipcode => {
    const authorizedZipCode = [
      '75',
      '77',
      '78',
      '91',
      '92',
      '93',
      '94',
      '95',
      '33',
      '16',
      '17',
      '19',
      '23',
      '24',
      '40',
      '47',
      '64',
      '79',
      '86',
      '87',
    ];
    return authorizedZipCode.includes(zipcode.substring(0, 2));
  };

  const fetchPOI = async () => {
    let response = await POIAPI.fetchMondialRelaisPOI({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    response = _.orderBy(response, ['LgAdr1'], ['asc']);
    setMrPoi(response);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      let tmpCoordinates = {};
      tmpCoordinates.latitude = info.coords.latitude;
      tmpCoordinates.longitude = info.coords.longitude;
      tmpCoordinates.latitudeDelta = delta.latitudeDelta;
      tmpCoordinates.longitudeDelta = delta.longitudeDelta;
      setCoordinates({
        ...tmpCoordinates,
      });
    });
    if (coordinates) {
      fetchPOI();
    }
  }, []);

  useEffect(() => {
    fetchPOI();
    setDisplayMap(true);
  }, [isSearching]);

  const handleMarkerSelection = item => {
    const tmpMrPOI = _.without(mrPOI, item).map(poi => {
      poi.selected = false;
      return poi;
    });
    item.selected = true;
    setMrPoi(_.orderBy([...tmpMrPOI, item], ['LgAdr1'], ['asc']));
    setCoordinates({
      latitude: parseFloat(item?.Latitude?.replace(',', '.')),
      longitude: parseFloat(item?.Longitude?.replace(',', '.')),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setCurrentPOI(item);
  };

  const displayMarker = mrPOI?.map((item, index) => {
    const LatLng = {
      latitude: parseFloat(item?.Latitude?.replace(',', '.')),
      longitude: parseFloat(item?.Longitude?.replace(',', '.')),
    };
    return (
      <Marker
        key={index}
        onPress={() => handleMarkerSelection(item)}
        coordinate={LatLng}
        style={styles.marker}
        image={item.selected ? orangeMapMarker : blackMapMarker}>
        <Text style={styles.markerText}>{index + 1}</Text>
      </Marker>
    );
  });

  const handleRegionChange = e => {};

  const renderItem = ({item, index}) => (
    <PickupCard
      item={item}
      index={index}
      onPress={() => handleMarkerSelection(item)}
    />
  );

  const handleAutocomplete = async address => {
    setCurrentPOI(null);
    setIsSearching(true);
    setDisplayMap(false);
    if (address) {
      const res = await axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${address}&type=housenumber&autocomplete=1`,
      );
      setTimeout(async () => {
        let tmpRes = res?.data?.features;
        tmpRes = tmpRes.map(_ => {
          _.properties.coordinates = _.geometry.coordinates;
          return _;
        });
        tmpRes = tmpRes.map(_ => _.properties);
        if (tmpRes.length > 0) {
          setGeogouvData(tmpRes);
          setHideResults(false);
        }
      }, 500);
    } else {
      setHideResults(true);
    }
  };

  const handleAdressSelection = address => {
    if (validateZipCode(address.postcode)) {
      const tmpCoordinates = {
        latitude: address.coordinates[1],
        longitude: address.coordinates[0],
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      };
      console.log(tmpCoordinates);
      setCoordinates({...tmpCoordinates});
      setHideResults(true);
      setIsSearching(false);
    } else {
      Alert.alert(
        "La commande de kit n'est pas disponible dans ta région",
        'La commande de kit est uniquement disponible en Île-de-France et en Aquitaine',
        [
          {
            text: "Revenir à l'accueil",
            onPress: () => navigation.navigate('Home'),
          },
          {
            text: "Modifier l'adresse",
            onPress: () => {
              console.log('return screen');
            },
          },
        ],
      );
    }
  };

  return (
    <View
      style={[styles.container, !displayMap && {justifyContent: 'flex-start'}]}>
      <AutocompleteInput
        containerStyle={styles.specialInput}
        inputContainerStyle={styles.specialInput}
        data={geogouvData}
        renderTextInput={() => (
          <TextInput
            style={styles.input}
            placeholder="Saisissez une adresse"
            underlineColor="#EAE2D7"
            activeUnderlineColor="#D42201"
            onChangeText={text => {
              handleAutocomplete(text);
            }}
          />
        )}
        hideResults={hideResults}
        flatListProps={{
          renderItem: ({item}) => {
            return (
              <TouchableOpacity
                style={styles.displayResults}
                onPress={() => handleAdressSelection(item)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      {displayMap && (
        <>
          <MapView
            region={coordinates}
            liteMode={true}
            rotateEnabled={false}
            onRegionChange={e => handleRegionChange(e)}
            style={styles.map}>
            {displayMarker}
          </MapView>
          <FlatList style={styles.list} data={mrPOI} renderItem={renderItem} />
        </>
      )}
      {currentPOI && (
        <Button
          style={styles.button}
          text="Je confirme ce point relais"
          size="medium"
          icon={true}
          onPress={() => setSelectedPOI(currentPOI)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  input: {
    marginHorizontal: 22,
    backgroundColor: '#FFFFFF',
    marginVertical: config.deviceWidth > 375 ? 10 : 0,
  },
  specialInput: {
    borderWidth: 0,
  },
  listResult: {
    paddingHorizontal: 10,
    width: 30,
  },
  map: {
    flex: 1,
  },
  list: {
    height: 100,
  },
  displayResults: {
    backgroundColor: '##FFF',
    paddingVertical: 12,
    paddingLeft: 22,
    height: 'auto',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  marker: {
    width: config.deviceWidth < 340 ? 5 : 30,
  },
  markerText: {
    fontSize: 12,
    color: '#FFFF',
    position: 'absolute',
    top: 0,
    left: 5,
  },
});

export default PickupOrder;
