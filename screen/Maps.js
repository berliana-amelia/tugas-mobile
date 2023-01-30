import React, { Component } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import AnimatedLoader from "react-native-animated-loader";
import { Top } from "../comp";
import { db } from "../handler/config";
import { doc, setDoc } from "firebase/firestore";

export default class Maps extends Component {
  //state awal class
  state = {
    location: null, 
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    hasilLongitude: 0,
    hasilLatitude: 0,
    visible: false,
    geocode:null,
  };
  //fungsi untuk save location
  getGeocodeAsync= async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location.coords)
    console.log(geocode);
  } 
  SaveLoc = () => {
    //local variable 
    let today = new Date().toUTCString();
    hasilLatitude = this.state.hasilLatitude;
    hasilLongitude = this.state.hasilLongitude;
    //buat dokumen di firestore
    setDoc(doc(db, "SavedLocation", today), {
      Latitude: hasilLatitude,
      Longitude: hasilLongitude,
    })
      .then(() => {
        alert("Lokasi Tersimpan!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Fungsi untuk di run ketika page ini di panggil
  componentDidMount() {
    //set interval visibilitas selama 2 detik
    setInterval(() => {
      this.setState({
        visible: !this.state.visible,
      });
    }, 2000);
    //memanggil fungsi get location
    this._getLocationAsync();
  }
  //fungsi untuk mendapatkan lokasi
  _getLocationAsync = async () => {
    //mengecek status permission lokasi
    let { status } = await Location.requestForegroundPermissionsAsync();
    //jika permission tidak diberian
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
      });
    } else {
      //jika telah diberikan set State hasLocationPermissions 
      this.setState({ hasLocationPermissions: true });
    }
    //mendapatkan lokasi terkisi
    let location = await Location.getCurrentPositionAsync({});

    
    let Geocode = await Location.reverseGeocodeAsync(location.coords)
    console.log(Geocode);
    this.setState({
      geocode : Geocode}
    )
    //mendapatkan nilai dari lokasi dan dimasukkan kedalam state locationResult
    this.setState({ locationResult: JSON.stringify(location) });
    //memaukkan nilai latitude dan longitude kedalam map region
    // const {LATI, LONGI} = location.coords;
    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      //memaukkan latitude dan longtitude ke state hasil
      hasilLatitude: location.coords.latitude,
      hasilLongitude: location.coords.longitude,
    });
  };


  render() {
    const { visible } = this.state;
    const {location,geocode } = this.state
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={"black"}></StatusBar>
        {/* jika lokasi masih blom ditemukan */}
        {this.state.locationResult === null ? (
          // maka akan menampilkan animasi roas
          <AnimatedLoader
            visible={visible}
            overlayColor="rgba(255,255,255,0.75)"
            animationStyle={{ width: 100, height: 100 }}
            speed={1}
          >
            <Text>Mencari Lokasi Anda...</Text>
          </AnimatedLoader>
        ) : (
        // jika lokasi ditemukan akan menampilkan maps
          <MapView
            style={{
              flex: 1,
              alignSelf: "stretch",
            }}
            region={this.state.mapRegion}
          >
            <Marker pinColor={"red"} coordinate={this.state.mapRegion} />
          </MapView>
        )}
        <View style={styles.cotainer}>
          {/* menampilkan komponen top */}
          <Top
            long={this.state.hasilLongitude}
            lati={this.state.hasilLatitude}
            onPress={() => this.SaveLoc()}
            onPress2={() => this.props.navigation.navigate("Saved Location",{
              // email: Email
            })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cotainer: {
    flex: 1 / 2.5,
    height: "10%",
    width: "100%",
    justifyContent: "flex-end",
  },
});
