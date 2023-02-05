import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  View,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import AnimatedLoader from "react-native-animated-loader";
import { Appbar } from "react-native-paper";
import { db } from "../handler/config";
import { collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Maps extends Component {
  //state awal class
  state = {
    Email:'',
    Nama:'',
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    hasilLongitude: 0,
    hasilLatitude: 0,
    visible: false,
    jalan: "",
    nomer: "",
    kelurahan: "",
    kecamatan: "",
    kota: "",
    provinsi: "",
    kodepos: "",
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

  //simpan lokasi ke lokal
  storeLocation = async () => {
    try {
      const { jalan, nomer, kelurahan, kecamatan, kota, provinsi, kodepos,Email} = this.state;
      const Address = jalan +"No. " + nomer +", " + kelurahan + ", " + kecamatan + ", " + kota + ", " +provinsi +" " + kodepos;
      console.log(typeof(Address));
      await AsyncStorage.setItem("location", Address);
      console.log(Address)
    } catch (e) {
      // saving error
      console.log(e)
    }
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
    let Geocode = await Location.reverseGeocodeAsync(location.coords);
    this.setState({
      jalan: Geocode[0].street,
      nomer: Geocode[0].streetNumber,
      kelurahan: Geocode[0].district,
      kecamatan: Geocode[0].city,
      kota: Geocode[0].subregion,
      provinsi: Geocode[0].region,
      kodepos: Geocode[0].postalCode,
    });
    this.setState({
      location,
    });
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
    const { jalan, nomer, kelurahan, kecamatan, kota, provinsi, kodepos } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={"black"}></StatusBar>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => this.props.navigation.navigate("Keranjang")}
          />
          <Appbar.Content title="Pilih Lokasi Pengiriman" />
        </Appbar.Header>
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
          <View style={{ flex: 1 }}>
            <MapView
              style={{
                flex: 1,
                alignSelf: "stretch",
              }}
              region={this.state.mapRegion}
            >
              <Marker pinColor={"red"} coordinate={this.state.mapRegion} />
            </MapView>
            <View style={styles.cotainer}>
              {/* menampilkan komponen top */}
              <View style={styles.container}>
                <View
                  style={{
                    alignSelf: "center",
                    width: "25%",
                    backgroundColor: "gainsboro",
                    borderRadius: 10,
                    height: 8,
                    marginBottom: 10,
                  }}
                ></View>
                <ScrollView>
                  <Text style={styles.textz}>Lokasi Saat ini: </Text>
                  <Text style={styles.textx}>
                    {jalan} No.{nomer}, {kelurahan}, {kecamatan}, {kota},{" "}
                    {provinsi} {kodepos}
                  </Text>
                  <View style={styles.buttoncontainer}>
                    <Pressable style={styles.button} onPress={() => this.storeLocation()}>
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "900",
                        }}
                      >
                        Gunakan Lokasi ini
                      </Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => this.props.navigation.navigate("Saved Location")}>
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "900",
                        }}
                      >Lokasi Tersimpan
                      </Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cotainer: {
    flex: 1 / 2.1,
    height: "10%",
    width: "100%",
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 15,
    paddingBottom: 0,
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: "crimson",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  textz: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
    letterSpacing: 0.25,
    color: "darkred",
    marginTop: 10,
    marginBottom: 3,
    textAlign: "left",
  },
  textx: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "black",
    marginTop: 10,
    marginBottom: 3,
    textAlign: "left",
  },
  buttoncontainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    height: 45,
    width: "90%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "darkred",
    borderRadius: 15,
  },
});
