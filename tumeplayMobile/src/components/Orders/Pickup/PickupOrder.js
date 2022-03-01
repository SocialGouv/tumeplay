import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import POIAPI from '../../../services/api/poi';

const PickupOrder = () => {
  const latitudeDelta = 0.02;
  const longitudeDelta = 0.02;

  const [coordinates, setCoordinates] = useState({
    latitude: 48.856614,
    longitude: 2.3522219,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });

  const [mrPOI, setMrPoi] = useState([]);

  const fetchPOI = async () => {
    let response = await POIAPI.fetchMondialRelaisPOI({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    setMrPoi([...response]);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      let tmpCoordinates = {};
      tmpCoordinates.latitude = info.coords.latitude;
      tmpCoordinates.longitude = info.coords.longitude;
      tmpCoordinates.latitudeDelta = latitudeDelta;
      tmpCoordinates.longitudeDelta = longitudeDelta;
      setCoordinates({
        ...tmpCoordinates,
      });
    });
    if (coordinates) {
      fetchPOI();
    }
  }, []);

  const displayMarker = mrPOI.map((item, index) => {
    return (
      <Marker
        key={index}
        coordinate={{
          latitude: item.Latitude,
          longitude: item.Longitude,
        }}
        title={item.title}
      />
    );
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={null}
        initialRegion={coordinates}
        region={coordinates}
        style={styles.map}>
        {displayMarker}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    height: 550,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default PickupOrder;
