import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from'react-native-maps';
import React, {useState, useEffect} from 'react';
import * as Location from'expo-location';

export default function Kartta() {

  const api = "__";
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121
  });

  useEffect(() => {  
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setRegion({
        latitude:location.coords.latitude,
        longitude:location.coords.longitude
      })
      console.log('User latitude ' + location.coords.latitude);
      console.log('User longitude ' + location.coords.longitude);
      fetchLocation();
    })();
  }, []);

  const fetchLocation = () => {
    fetch (`http://www.mapquestapi.com/geocoding/v1/address?key=${api}&location=${region.latitude},${region.longitude}`)
      .then((response) => response.json())
      .then((responseData) => {
      })
    .catch(error => console.log('error', error));
  }

  return (
    <View style={{flex: 6}}>
      <View style={{flex: 6}}>
        <MapView
          style={{flex: 5}}
          region={region} >
          <Marker
            coordinate={{latitude: region.latitude, longitude: region.longitude}} />
        </MapView>
      </View>
    </View>
  );
}
    
const styles = StyleSheet.create({
  map: {
    flex: 6,
  },
  button: {
    flex:1,
    alignItems: 'center'
  }
});

