import {
  Text,
  View,
  ScrollView,
  Image,
  Touchable,
  Pressable,
  Alert
} from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../handler/config";
import { collection, addDoc } from "firebase/firestore";
import { RadioButton, Divider, List, Button, Dialog,Portal } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class Payment extends Component {
  constructor(props) {
    super(props);
    //membuat state variable
    this.state = {
      cartItems: [],
      Email: "",
      Address: "",
      SubTotal: "",
      value: "Cash on Delivery",
      visible: false,
    };
  }
  setValue = (value) => {
    this.setState({
      value,
    });
  };
  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount() {
    this.getData();
  }
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
        Email: Emailx[0].Email,
        Address: locationx.alamat,
        SubTotal: subt,
      });
    } catch (error) {
      console.log(error);
    }
  };

  saveTransaction = async () => {
    let today = new Date().toUTCString();
    const { cartItems, Email, Address, SubTotal, value } = this.state;
    const docRef = await addDoc(collection(db, "Transaction"), {
      address: Address,
      iduser: Email,
      totals: SubTotal,
      item: cartItems,
      payment: value,
      time: today,
    })
      .then(() => {
        Alert.alert('Pesanan Diterima', 'Pesanan akan segera dikirim, mohon menunggu', [
          {text: 'Ok', onPress: () => this.props.navigation.navigate("Riwayat Transaksi")}
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  confirmPayment = () => {
    Alert.alert('Konfirmasi Pembayaran', 'Apakah Anda yakin menkonfirmasi pembayaran ini?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Konfirmasi', onPress: () => this.saveTransaction()},
    ]);
  };

  render() {
    var Value = this.state.value;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 11 / 12 }}>
          <List.Subheader>Pembayaran</List.Subheader>
          <Divider bold="true" />
          <RadioButton.Group
            onValueChange={(newValue) => this.setValue(newValue)}
            value={Value}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="Cash on Delivery" color="darkred" />
              <Ionicons
                name={"cash"}
                size={30}
                color={"darkgreen"}
                style={{ marginRight: 5 }}
              ></Ionicons>
              <Text>Cash on Delivery</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="LinkAja" color="darkred" />
              <Image
                source={require("../assets/LinkAja.png")}
                style={{ height: 30, width: 30, marginRight: 5 }}
              />
              <Text>LinkAja</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="Gopay" color="darkred" />
              <Image
                source={require("../assets/gopay.png")}
                style={{ height: 30, width: 30, marginRight: 5 }}
              />
              <Text>Gopay</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="OVO" color="darkred" />
              <Image
                source={require("../assets/ovo.png")}
                style={{ height: 30, width: 30, marginRight: 5 }}
              />
              <Text>OVO</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View style={{ flex: 1 / 12, backgroundColor: "darkred" }}>
          <Pressable
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => this.confirmPayment()}
          >
            <Text style={{ fontSize: 20, color: "white", fontWeight: "500" }}>
              Konfirmasi Pembayaran
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

export default Payment;
