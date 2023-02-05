// import dependencies
import React, { Component, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class DetailMenu extends Component {
  constructor(props) {
    super(props);
    //membuat state variable
    this.state = {
      cart: [],
      error: null,
      searchValue: "",
      Data: [],
      data: this.props.route.params.data,
    };
  }
  storeData = async (value) => {
    try {
      console.log("StoreData Value :", value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("storage", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  AddCart = async (DataItem) => {
    console.log("Here : ", DataItem);
    const jsonValue = await AsyncStorage.getItem("storage");
    const cartItems = JSON.parse(jsonValue);
    const IteminCart = cartItems;
    const keys = DataItem.key;
    const Nama = DataItem.nama;
    const Price = DataItem.price;
    const Uri = DataItem.url;
    const Test = IteminCart.filter((items) => items.keys == keys);
    console.log("Filtered", Test);
    if (Test.length == 0) {
      IteminCart.push({
        keys,
        Nama,
        Price,
        Uri,
        amount: 1,
        checked: 1,
      });
      alert("Item ditambahkan!");
      this.storeData(IteminCart);
    } else {
      const ElementID = IteminCart.findIndex((element) => element.keys == keys);
      console.log("Index", ElementID);
      this.storeData(IteminCart);
    }
    console.log(IteminCart);
  };
  render() {
    const data = this.state.data;
    return (
      // membuat box
      <View style={{ flex: 1 }}>
        {/* memuat gambar dari data */}
        <Image
          source={{ uri: data.url }}
          style={{
            height: "30%",
            width: "100%",
          }}
        />
        {/* memuat nama menu */}
        <Text style={styles.itemHeading}>{data.nama}</Text>
        {/* memuat description dari menu */}
        <Text style={styles.itemText}>{data.desc}</Text>
        <Text style={styles.itemHeading}>Rp. {data.price}</Text>
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          {/* membuat tombol untuk memesan */}
          <Button
            style={{
              borderRadius: 0,
              height: 50,
              alignContent: "center",
              justifyContent: "center",
            }}
            contentStyle={{ flexDirection: "row-reverse" }}
            icon="cart-plus"
            mode="contained"
            buttonColor="darkred"
            labelStyle={{ fontSize: 20 }}
            onPress={() => this.AddCart(data)}
          >
            Add to Cart
          </Button>
        </View>
      </View>
    
    );
  }
}

export default DetailMenu;

const styles = StyleSheet.create({
  orderButton: {
    height: "100%",
    alignContent: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  innerContainer: {
    alignItems: "flex-start",
    marginLeft: "3%",
    flexDirection: "column",
    width: "57%",
    alignContent: "flex-end",
  },
  itemHeading: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 24,
    
  },
  itemText: {
    width: "90%",
    fontWeight: "300",
    color: "black",
    textAlign: "justify",
  },
});
