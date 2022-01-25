import React, {useState, useEffect} from 'react';
import useIsMounted from '../../hooks/isMounted';
import Geolocation from '@react-native-community/geolocation';
import openGeocoder from 'node-open-geocoder';
import Colors from '../../styles/Color';
import Styles from '../../styles/Styles';
import referentAPI from '../../services/api/referents';
import OpenStreetMap from '../components/global/OpenStreetMap';
import Backlink from '../components/tunnel/Backlink';
import PointOfInterestCard from '../components/global/PointOfInterestCard';
import CustomTextInput from '../components/tunnel/CustomTextInput';
import AddressValidator from '../../services/AddressValidator';
import TunnelUserAdressStyle from '../../styles/components/TunnelUserAdress';
import TextWithSound from '../components/global/TextWithSound';

import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const zipCodeTest = /^[0-9]{5}$/;

const TunnelReferentSelectGuyane = props => {
  var defaultReferent = {
    userZipCode: '',
    zipCode: '',
    city: '',
  };
  var pickupTimer = false;

  const defaultPosition = {
    coords: {
      latitude: 5.495556,
      longitude: -54.030833,
    },
    delta: 0.7,
    isValid: true,
  };

  const [selectedReferent, setSelectedReferent] = useState(
    props.navigation.state.params.selectedReferent,
  );
  const [deliveryType] = useState(props.navigation.state.params.deliveryType);
  const [selectedItem] = useState(props.navigation.state.params.selectedItem);
  const [selectedProducts] = useState(
    props.navigation.state.params.selectedProducts,
  );

  const [rawReferents, setRawReferents] = useState();
  const [currentPosition, setCurrentPosition] = useState();
  const [localAdress, setLocalAdress] = useState(defaultReferent);
  const [localValid, setLocalValid] = useState({});
  const [referentPoints, setReferentPoints] = useState([]);
  const [mapLayout, setMapLayout] = useState({width: 650, height: 250});
  const [displayReset, setDisplayReset] = useState(false);
  const [displayMap, setDisplayMap] = useState(true);
  const [invalidZipCode, setInvalidZipCode] = useState(false);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (rawReferents) {
      setCurrentPosition({...defaultPosition});
      Geolocation.getCurrentPosition(
        position => {
          const coordinates = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          openGeocoder({'Accept-Language': 'fr' })
            .reverse(coordinates.long, coordinates.lat)
            .end((err, res) => {
              if (res) {
                currentPosition.coords.latitude = position.coords.latitude;
                currentPosition.coords.longitude = position.coords.longitude;
                setCurrentPosition({...currentPosition});
              } else {
                currentPosition.isValid = false;
                setCurrentPosition({...defaultPosition});
              }
            });
        },
        error => {
          setCurrentPosition({...defaultPosition});
        },
      );
      setDisplayMap(true);
    }
  }, [rawReferents]);

  useEffect(() => {
    const fetchReferents = async () => {
      const tmpRef = await referentAPI.fetchReferents(2);
      setRawReferents(tmpRef);
      const refPoints = tmpRef.map(function(item) {
        item.isSelected = false;
        return item;
      });
      setReferentPoints([...refPoints]);
    };

    if (isMounted.current) {
      fetchReferents();
    }
  }, [isMounted.current]);

  const _onDone = () => {
    setDisplayMap(false);
    props.navigation.navigate('TunnelUserAddress', {
      selectedItem: selectedItem,
      selectedProducts: selectedProducts,
      selectedReferent: selectedReferent,
      deliveryType: deliveryType,
    });
  };

  const _goBack = () => {
    props.navigation.navigate('TunnelDeliverySelect', {
      selectedItem: selectedItem,
      selectedProducts: selectedProducts,
    });
  };

  function onPoiPress(selectedItem) {
    const newItems = referentPoints.map(function(item) {
      item.isSelected = item.id === selectedItem.id;
      return item;
    });
    handleAddressMore(selectedItem);
    setSelectedReferent({...selectedItem});
    setReferentPoints(newItems);
  }

  const adjustMapLayout = parentLayout => {
    const {width} = parentLayout;
    const {height} = Dimensions.get('window');
    const newMapLayout = mapLayout;

    newMapLayout.width = width;
    newMapLayout.height = height * 0.3;

    setMapLayout(newMapLayout);
  };

  let poiCards = <View></View>;

  if (referentPoints.length > 0) {
    poiCards = referentPoints.map(function(item, key) {
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

  const handleAddressMore = item => {
    const city = item.address_zipcode + ' ' + item.address_city
    openGeocoder({'Accept-Language': 'fr' })
      .geocode(city)
      .end((err, res) => {
        if (res && res[0]) {
          if (res[0].address.postcode.substring(0, 2) === '97') {
            item['address_deptcode'] = res[0].address.postcode.substring(0, 3);
          } else {
            item['address_deptcode'] = res[0].address.postcode.substring(0, 2);
          }
          item['address_region'] = res[0].address.state;
          item['address_dept'] = res[0].address.county;
          setSelectedReferent({...item});
        }
      });
  };

  function _handleChange(name, value) {
    if (AddressValidator.validateZipCode(value)) {
      setInvalidZipCode(false);
      localAdress[`${name}`] = value;
      setLocalAdress(localAdress);

      if (zipCodeTest.test(value)) {
        openGeocoder({'Accept-Language': 'fr' })
          .geocode(value)
          .end((err, res) => {
            if (res.length >= 1) {
              const filtered = res.filter(
                place => place.address.country_code === 'fr',
              );
              if (filtered.length > 0) {
                const localPosition = {
                  coords: {
                    latitude: parseFloat(
                      parseFloat(filtered[0].lat).toFixed(7),
                    ),
                    longitude: parseFloat(
                      parseFloat(filtered[0].lon).toFixed(7),
                    ),
                  },
                  delta: {
                    latitude:
                      typeof currentPosition.delta !== 'undefined'
                        ? currentPosition.delta.latitude
                        : 0.9,
                    longitude:
                      typeof currentPosition.delta !== 'undefined'
                        ? currentPosition.delta.longitude
                        : 0.9,
                  },
                };
                setCurrentPosition({...localPosition});
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

      <View style={{flex: 0.2, paddingTop: 15}}>
        <TextWithSound
          style={Styles.tunnelTitle}
          sound={'lieu-de-retrait_XlV9Zth8.mp3'}
          useLocal={true}>
          Choisis le lieu de livraison
        </TextWithSound>
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
        style={{flex: 0.4, paddingTop: 0, marginTop: 15}}
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
        {displayMap && currentPosition && (
          <OpenStreetMap
            items={referentPoints}
            onPoiPress={onPoiPress}
            width={mapLayout.width}
            height={mapLayout.height}
            onRegionChange={onRegionChange}
            delta={currentPosition.delta}
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

      {selectedReferent && (
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
};

export default TunnelReferentSelectGuyane;
