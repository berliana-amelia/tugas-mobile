import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { Component } from "react";
import { Appbar, Divider, List, Button, RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class CheckOut extends Component {
  constructor(props) {
    super(props);
    //membuat state variable
    this.state = {
      cartItems: [],
      Email: "",
      Address: "",
      SubTotal: "",
      value: "Cash on Delivery",
    };
  }
  componentDidMount() {
    this.getData();
  }
  // mendapatkan data lokasi dan item dalam keranjang serta sub total, dan email  user dari asnc storge
  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storage");
      const email = await AsyncStorage.getItem("user");
      const Emailx = JSON.parse(email);
      const cart = JSON.parse(jsonValue);
      const Location = await AsyncStorage.getItem("location");
      const locationx = JSON.parse(Location);
      const subt = await AsyncStorage.getItem("subtotal");
      const cartItems = cart.filter((items) => items.checked == 1);
      console.log(cartItems);
      console.log(locationx);
      this.setState({
        cartItems,
        Email: Emailx[0].Nama,
        Address: locationx.alamat,
        SubTotal: subt,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const Alamat = this.state.Address;
    console.log("AYOLAH", Alamat);
    var Value = this.state.value;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{ flex: 1, marginHorizontal: 10, backgroundColor: "white" }}
        >
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => this.props.navigation.navigate("Keranjang")}
            />
            <Appbar.Content title="Order Detail" />
          </Appbar.Header>
          <List.Subheader>Alamat Pengiriman</List.Subheader>
          <Divider bold="true" />
          <List.Item
            title={Alamat}
            onPress={() => this.props.navigation.navigate("Saved Location")}
            left={() => (
              <List.Icon color="red" icon="map-marker-radius-outline" />
            )}
          />
          <List.Subheader>Pesanan</List.Subheader>
          <Divider bold="true" />
          <View>
            <FlatList
              style={{ marginTop: 10 }}
              data={this.state.cartItems}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    flexGrow: 1,
                    flexShrink: 1,
                    alignSelf: "center",
                    marginBottom: 10,
                    backgroundColor: "mistyrose",
                  }}
                >
                  <Image
                    source={{ uri: item.Uri }}
                    style={[
                      styles.centerElement,
                      {
                        height: 80,
                        width: 80,
                        backgroundColor: "#eeeeee",
                        marginRight: 20,
                      },
                    ]}
                  />
                  <View
                    style={{
                      flexGrow: 1,
                      flexShrink: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text numberOfLines={1} style={{ fontSize: 15 }}>
                      {item.Nama}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ color: "#333333", marginBottom: 5 }}
                    >
                      Rp {item.amount * item.Price}
                    </Text>
                    <Text
                      style={{
                        color: "#333333",
                      }}
                    >
                      Jumlah : {item.amount}
                    </Text>
                  </View>
                </View>
              )}
            ></FlatList>
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "silver",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              width: "50%",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>Total: </Text>
            <Text style={{ fontSize: 20 }}>Rp. {this.state.SubTotal}</Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              width: "50%",
              backgroundColor: "darkred",
            }}
          >
            <Button
              style={{
                width: "100%",
                alignContent: "flex-end",
                marginTop: 5,
                borderRadius: 0,
                marginBottom: 10,
              }}
              contentStyle={{ flexDirection: "row-reverse" }}
              mode="contained"
              buttonColor="darkred"
              labelStyle={{ fontSize: 20 }}
              onPress={() => this.props.navigation.navigate("Payment")}
            >
              Bayar
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#e5e5e5",
    padding: 10,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    marginLeft: "5%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "flex-start",
    marginLeft: "3%",
    flexDirection: "column",
    width: "57%",
    alignContent: "flex-end",
  },
  itemHeading: {
    textAlign: "justify",
    fontWeight: "bold",
  },
  itemText: {
    width: "90%",
    fontWeight: "300",
    color: "black",
    textAlign: "justify",
  },
});
