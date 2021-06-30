import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Geolocation from '@react-native-community/geolocation';
import openGeocoder from 'node-open-geocoder';

import useIsMounted from '../../hooks/isMounted';
import RemoteApi from '../../services/RemoteApi';

import Colors from '../../styles/Color';
import Styles from '../../styles/Styles';
import Backlink from '../components/tunnel/Backlink';
import OpenStreetMap from '../components/global/OpenStreetMap';
import PointOfInterestCard from '../components/global/PointOfInterestCard';
import CustomTextInput from '../components/tunnel/CustomTextInput';
import AddressValidator from '../../services/AddressValidator';
import TunnelUserAdressStyle from '../../styles/components/TunnelUserAdress';

const zipCodeTest = /^[0-9]{5}$/;

TunnelPickupSelect.propTypes = {
  navigation: PropTypes.object,
};
export default function TunnelPickupSelect(props) {
  const defaultPosition = {
    coords: {
      latitude: 48.8465464,
      longitude: 2.2797058999999997,
    },
    delta: {
      latitude: 0.009,
      longitude: 0.009,
    },
  };
  var defaultPickup = {
    userZipCode: '',
    zipCode: '',
    city: '',
  };
  var pickupTimer = false;

  const [selectedPickup, setSelectedPickup] = useState(
    props.navigation.state.params.selectedPickup,
  );
  const [deliveryType] = useState(props.navigation.state.params.deliveryType);
  const [selectedItem] = useState(props.navigation.state.params.selectedItem);
  const [selectedProducts] = useState(
    props.navigation.state.params.selectedProducts,
  );

  const [currentPosition, setCurrentPosition] = useState(defaultPosition);
  const [localAdress, setLocalAdress] = useState(defaultPickup);
  const [localValid, setLocalValid] = useState({});
  const [pickupPoints, setPickupPoints] = useState([]);
  const [mapLayout, setMapLayout] = useState({width: 250, height: 250});
  const [displayReset, setDisplayReset] = useState(false);
  const [displayMap, setDisplayMap] = useState(true);
  const [invalidZipCode, setInvalidZipCode] = useState(false);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted.current) {
      Geolocation.getCurrentPosition(
        position => {
          setCurrentPosition(position);

          console.log(position);
        },
        error => console.log('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
      setDisplayMap(true);
    }
  }, [isMounted]);

  useEffect(() => {
    async function fetchPoints() {
      const rawPickupPoints = await RemoteApi.fetchPickupPoints(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude,
      );
      const pickupPoints = rawPickupPoints.map(function(item) {
        item.isSelected = false;

        return item;
      });

      let filteredPoints = [];

      if (typeof currentPosition.delta !== 'undefined') {
        const bounds = {
          max_lat:
            currentPosition.coords.latitude + currentPosition.delta.latitude,
          min_lat:
            currentPosition.coords.latitude - currentPosition.delta.latitude,
          max_lon:
            currentPosition.coords.longitude + currentPosition.delta.longitude,
          min_lon:
            currentPosition.coords.longitude - currentPosition.delta.longitude,
        };

        filteredPoints = pickupPoints.filter(pickupPoint => {
          return (
            pickupPoint.coordinates.latitude < bounds.max_lat &&
            pickupPoint.coordinates.latitude > bounds.min_lat &&
            pickupPoint.coordinates.longitude < bounds.max_lon &&
            pickupPoint.coordinates.longitude > bounds.min_lon
          );
        });
      } else {
        filteredPoints = pickupPoints;
      }
      setPickupPoints([]);
      setPickupPoints(filteredPoints);
    }

    fetchPoints();

  }, [currentPosition]);

  function _onDone() {
    setDisplayMap(false);
    props.navigation.navigate('TunnelUserAddress', {
      selectedItem: selectedItem,
      selectedProducts: selectedProducts,
      selectedPickup: selectedPickup,
      deliveryType: deliveryType,
    });
  }

  function _goBack() {
    props.navigation.navigate('TunnelDeliverySelect', {
      selectedItem: selectedItem,
      selectedProducts: selectedProducts,
    });
  }

  function _handleChange(name, value) {
    if (AddressValidator.validateZipCode(value)) {
      setInvalidZipCode(false);
      localAdress[`${name}`] = value;

      setLocalAdress(localAdress);

      if (zipCodeTest.test(value)) {
        openGeocoder()
          .geocode(value)
          .end((err, res) => {
            if (res.length >= 1) {
              const filtered = res.filter(
                place => place.address.country_code === 'fr',
              );

              if (filtered.length > 0) {
                const localPosition = {
                  coords: {
                    latitude: parseFloat(filtered[0].lat),
                    longitude: parseFloat(filtered[0].lon),
                  },
                  delta: {
                    latitude:
                      typeof currentPosition.delta !== 'undefined'
                        ? currentPosition.delta.latitude
                        : 0.09,
                    longitude:
                      typeof currentPosition.delta !== 'undefined'
                        ? currentPosition.delta.longitude
                        : 0.09,
                  },
                };

                setCurrentPosition(localPosition);
              }
            }
          });
      }
    } else {
      setInvalidZipCode(true);
    }
    const _displayReset = value != '';
    setDisplayReset(_displayReset);

    return value;
  }

  function adjustMapLayout(parentLayout) {
    const {width} = parentLayout;
    const {height} = Dimensions.get('window');
    const newMapLayout = mapLayout;

    newMapLayout.width = width;
    newMapLayout.height = height * 0.4;

    setMapLayout(newMapLayout);
  }

  function onRegionChange(region) {
    if (pickupTimer) {
      clearTimeout(pickupTimer);
    }
    const refRegion = region;
    pickupTimer = setTimeout(refRegion => {
      const localRegion = {
        coords: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
        delta: {
          latitude: region.latitudeDelta,
          longitude: region.longitudeDelta,
        },
      };

      setCurrentPosition(localRegion);
    }, 900);
  }

  function onPoiPress(selectedItem) {
    const newItems = pickupPoints.map(function(item) {
      item.isSelected = item.id == selectedItem.id;

      return item;
    });

    setPickupPoints(newItems);
    setSelectedPickup(selectedItem);
  }

  let poiCards = <View></View>;

  if (pickupPoints.length > 0) {
    poiCards = pickupPoints.map(function(item, key) {
      return (
        <PointOfInterestCard
          isSelected={item.isSelected}
          onPress={onPoiPress}
          item={item}
          key={key}
        />
      );
    });
  }

  return (
    <View
      style={[
        Styles.flexOne,
        {
          backgroundColor: Colors.backgroundColor,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 5,
        },
      ]}>
      <Backlink step={2} onPress={_goBack} />

      <View style={{flex: 0.15, paddingTop: 15}}>
        <Text style={Styles.tunnelTitle}>Choisis le lieu de livraison</Text>
        <CustomTextInput
          inputLabel="Code postal"
          inputPlaceholder="Ton Code Postal"
          onChangeText={val => _handleChange('userZipCode', val)}
          name={'userZipCode'}
          filterNumbers={true}
          isValid={localValid.userZipCode}
          currentValue={localAdress.userZipCode}
          displayResetButton={displayReset}
          style={Styles.tunnelInput}
        />
      </View>

      <View
        style={{flex: 0.4, minHeight: 275, paddingTop: 0, marginTop: 15}}
        onLayout={event => {
          adjustMapLayout(event.nativeEvent.layout);
        }}>
        {invalidZipCode && (
          <View
            style={[
              TunnelUserAdressStyle.requiredFieldsWrapper,
              {marginTop: 5, marginBottom: 5},
            ]}>
            <View style={{flex: 1}}>
              <Text
                style={[
                  Styles.placeholderText,
                  {fontSize: 14, color: '#C80352', fontFamily: 'Chivo-Regular'},
                ]}>
                Aïe ! Cette zone n&apos;est pas encore disponible à la
                livraison.
              </Text>
            </View>
          </View>
        )}
        {displayMap && (
          <OpenStreetMap
            items={pickupPoints}
            onPoiPress={onPoiPress}
            width={mapLayout.width}
            height={mapLayout.height}
            onRegionChange={onRegionChange}
            latitude={currentPosition.coords.latitude}
            longitude={currentPosition.coords.longitude}
          />
        )}
      </View>

      <ScrollView
        style={{
          flex: 0.45,
          width: '100%',
          bottom: 0,
          marginTop: -40,
          maxHeight: 280,
          paddingBottom: 80,
        }}>
        {poiCards}
      </ScrollView>

      {selectedPickup && (
        <TouchableOpacity
          style={[
            Styles.bottomButton,
            {position: 'absolute', bottom: 10, borderRadius: 25},
          ]}
          onPress={_onDone}>
          <View style={{paddingTop: 8, paddingBottom: 8}}>
            <Text style={Styles.tunnelButtonText}>Suivant</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
