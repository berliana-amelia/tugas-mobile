import { Pressable, Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { List, MD3Colors, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email : "",
      Nama : ""
    };
  }
  // fungsi ang di exexute pertama kali 
  componentDidMount() {
    this.getData();
  }
  // fungsi untuk mendapatkan data user yang sebelumnya disimpan pada saat signin di async storage
  getData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const value = JSON.parse(user);
      this.setState({
        Nama : value[0].Nama,
        Email: value[0].Email
      })
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const Nama = this.state.Nama;
    const Email = this.state.Email;
    return (
      <View style={styles.container}>
        {/* membuat icon avatar */}
        <Ionicons size={150} name="person-circle" color={"grey"} />
        {/* menampilkan nama */}
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          {Nama}
        </Text>
        {/* menampilkan email */}
        <Text style={{ fontSize: 16 }}>{Email}</Text>
        <View
          style={{ alignContent: "flex-start", width: "90%", marginTop: 20 }}
        >
          {/* <List.Section> */}
          <List.Subheader>Akun</List.Subheader>
          <List.Item
            title="Detail Akun"
            left={() => <List.Icon color="red" icon="account" />}
          />
          {/* list untuk ke halaman Alamat Tersimpa */}
          <List.Item
            title="Alamat Tersimpan"
            onPress={() => this.props.navigation.navigate("Saved Location")}
            left={() => (
              <List.Icon color="red" icon="map-marker-radius-outline" />
            )}
          />
          {/* List untuk ke halaman riiwayat transaksi */}
          <List.Item
            title="Riwayat Transaksi"
            onPress={()=> this.props.navigation.navigate("Riwayat Transaksi")}
            left={() => <List.Icon color="red" icon="history" />}
          />
          {/* </List.Section> */}
        </View>
        {/* Button Keluar */}
        <Button
          style={{
            width: "90%",
            marginTop: 30,
            borderRadius: 0,
            borderWidth: 1,
            borderColor: "red",
          }}
          icon="logout"
          textColor="red"
          buttonColor="ghostwhite"
          mode="outlined"
          onPress={() => this.props.navigation.navigate("SignIn")}
        >
          Keluar
        </Button>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  menu: {
    backgroundColor: "lightgrey",
    height: 50,
    width: "100%",
  },
});
