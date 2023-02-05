import { Text, View, ScrollView, Image } from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton, Divider, List, Button } from "react-native-paper";

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
        };
      }
      setValue = (value) => {
        this.setState({
          value,
        });
      };
  render() {
    var Value = this.state.value;
    return (
      <ScrollView>
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
        <Button style={{backgroundColor:'darkred', borderRadius:10}}>Konfirmasi Pembayaran</Button>
      </ScrollView>

    );
  }
}

export default Payment;
