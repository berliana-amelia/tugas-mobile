import { Pressable, Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { List, MD3Colors, Button } from "react-native-paper";

const Profile = (props) => {
  const Data = props.route.params.data;
  let datax = Data[0];
    console.log("Profile",Data);
    return (
    <View style={styles.container}>
        <Ionicons size={150} name="person-circle" color={"grey"} />
        <Text style={{fontSize:25, fontWeight:"bold" }}>{datax.Nama}</Text>
        <Text style={{fontSize:16}}>{datax.Email}</Text>
        <View
          style={{ alignContent: "flex-start", width: "90%", marginTop: 20 }}
        >
          {/* <List.Section> */}
            <List.Subheader>Akun</List.Subheader>
            <List.Item
              title="Detail Akun"
              left={() => <List.Icon color="red" icon="account" />}
            />
            <List.Item
              title="Alamat Tersimpan"
              onPress={()=> props.navigation.navigate("Saved Location")}
              left={() => (
                <List.Icon color="red" icon="map-marker-radius-outline" />
              )}
            />
            <List.Item
              title="Riwayat Transaksi"
              left={() => <List.Icon color="red" icon="history" />}
            />
          {/* </List.Section> */}
        </View>
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
          onPress={()=> props.navigation.navigate("SignIn")}
        >
          Keluar
        </Button>
    </View>
  )
}

export default Profile

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
