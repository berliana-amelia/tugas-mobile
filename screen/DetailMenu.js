// import dependencies
import React, { Component, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

// membuat function component News Detail untuk menampilkan detail berita
const DetailMenu = ({props, route }) => {
  // memasukkan nilai data dengan data dari parameter di route
  const data = route.params.data;
  const dataItem = route.params.dataCart;
  console.log(data, typeof data);
  console.log(dataItem);
  const storeData = async (value) => {
    try {
      console.log("StoreData Value :", value)
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('storage', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  const AddCart = (DataItem) => {
    console.log("Here : ",DataItem);
    const IteminCart = route.params.dataCart;
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
      storeData(IteminCart);
    } else {
      const ElementID = IteminCart.findIndex((element) => element.keys == keys);
      console.log("Index", ElementID);
      storeData(IteminCart);
    }
    console.log(IteminCart);
  };
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
          buttonColor="red"
          labelStyle={{ fontSize: 20 }}
          onPress={() => AddCart(data)}
        >
          Add to Cart
        </Button>
      </View>
    </View>
  );
};

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
