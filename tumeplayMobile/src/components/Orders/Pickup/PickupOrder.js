import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
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
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Button from '../../Button';
import {request, PERMISSIONS} from 'react-native-permissions';

const PickupOrder = props => {
  const {setSelectedPOI} = props;
  const navigation = useNavigation();
  const flatlistRef = useRef();

  const [delta] = useState({
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const [coordinates, setCoordinates] = useState({
    latitude: 48.856614,
    longitude: 2.3522219,
    latitudeDelta: delta.latitudeDelta,
    longitudeDelta: delta.longitudeDelta,
  });

  const [currentUserPosition, setCurrentUserPosition] = useState(null);
  const [geolocationGranted, setGeolocationGranted] = useState(false);

  const [currentPOI, setCurrentPOI] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [mrPOI, setMrPoi] = useState([]);
  const [displayMap, setDisplayMap] = useState(false);
  const [geogouvData, setGeogouvData] = useState([]);
  const [hideResults, setHideResults] = useState(true);
  const [chosenAddress, setChosenAddress] = useState('');

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
    if (response.statusCode === 400) {
      setMrPoi([]);
    } else {
      response = _.orderBy(response, ['LgAdr1'], ['asc']);
      setMrPoi(response);
    }
  };

  const getUserGeolocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        let tmpCoordinates = {};
        tmpCoordinates.latitude = info.coords.latitude;
        tmpCoordinates.longitude = info.coords.longitude;
        tmpCoordinates.latitudeDelta = delta.latitudeDelta;
        tmpCoordinates.longitudeDelta = delta.longitudeDelta;
        setCoordinates({
          ...tmpCoordinates,
        });
        setCurrentUserPosition({
          ...{
            latitude: tmpCoordinates.latitude,
            longitude: tmpCoordinates.longitude,
          },
        });
      },
      error => {
        console.log('ERROR', error);
      },
    );
  };

  useEffect(() => {
    getUserGeolocation();
  }, [geolocationGranted]);

  useEffect(() => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(statues => {
      if (statues === 'granted') {
        setGeolocationGranted(true);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUserPosition) {
      fetchPOI();
    }
  }, [coordinates, currentUserPosition]);

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
    if (item) {
      setCoordinates({
        latitude: parseFloat(item?.Latitude?.replace(',', '.')),
        longitude: parseFloat(item?.Longitude?.replace(',', '.')),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
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
        style={styles.marker}>
        <ImageBackground
          source={item.selected ? orangeMapMarker : blackMapMarker}
          style={styles.markerImage}>
          <Text style={styles.markerText}>{index + 1}</Text>
        </ImageBackground>
      </Marker>
    );
  });

  const userPosition = <Marker coordinate={currentUserPosition} />;

  const renderItem = ({item, index}) => (
    <PickupCard
      item={item}
      index={index}
      onPress={() => handleMarkerSelection(item)}
    />
  );

  const debounced = useCallback(
    _.debounce(() => retrieveAutoCompleteAPI(), 300),
    [chosenAddress],
  );

  const handleAutocomplete = address => {
    setCurrentPOI(null);
    setIsSearching(true);
    setDisplayMap(false);
    setChosenAddress(address);
    debounced();
  };

  const retrieveAutoCompleteAPI = async () => {
    if (chosenAddress) {
      const res = await axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${chosenAddress}&autocomplete=1`,
      );

      let tmpRes = res?.data?.features;
      tmpRes = tmpRes.map(item => {
        item.properties.coordinates = item.geometry.coordinates;
        return item;
      });
      tmpRes = tmpRes.map(item => item.properties);
      if (tmpRes.length > 0) {
        setGeogouvData(tmpRes);
        setHideResults(false);
      }
    } else {
      setHideResults(true);
    }
  };

  const handleAdressSelection = address => {
    if (validateZipCode(address.postcode)) {
      const tmpCoordinates = {
        latitude: address.coordinates[1].toFixed(7),
        longitude: address.coordinates[0].toFixed(7),
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      };
      setChosenAddress(address.label);
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

  const scrollToIndex = () => {
    if (mrPOI) {
      let index = (mrPOI || []).indexOf(currentPOI);
      if (index >= 0) {
        flatlistRef?.current?.scrollToIndex({animated: true, index: index});
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      scrollToIndex();
    }, [currentPOI]),
  );

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
            value={chosenAddress}
            placeholder="Saisissez une adresse"
            underlineColor="#EAE2D7"
            activeUnderlineColor="#D42201"
            onChangeText={handleAutocomplete}
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
      {(displayMap || geolocationGranted) && (
        <>
          <MapView
            region={{
              latitude: parseFloat(coordinates.latitude),
              longitude: parseFloat(coordinates.longitude),
              latitudeDelta: coordinates.latitudeDelta,
              longitudeDelta: coordinates.longitudeDelta,
            }}
            rotateEnabled={false}
            style={styles.map}>
            {geolocationGranted && userPosition}
            {displayMarker}
          </MapView>
          <FlatList
            style={styles.list}
            data={mrPOI}
            renderItem={renderItem}
            ref={flatlistRef}
          />
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
  },
  input: {
    marginHorizontal: 22,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
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
    minHeight: Platform.OS === 'android' ? 150 : 100,
  },
  list: {
    height: 100,
  },
  displayResults: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingLeft: 22,
    height: 'auto',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  marker: {
    width: config.deviceWidth < 340 ? 10 : 30,
    height: config.deviceWidth < 340 ? 10 : 30,
  },
  markerImage: {
    width: config.deviceWidth < 340 ? 10 : 20,
    height: config.deviceWidth < 340 ? 10 : 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    display: 'flex',
    fontSize: config.deviceWidth * 0.03,
    fontWeight: '600',
    color: '#FFF',
    paddingBottom: 2,
  },
});

export default PickupOrder;
