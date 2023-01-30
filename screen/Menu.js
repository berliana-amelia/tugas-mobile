import { View, StyleSheet, FlatList, Image, Pressable, Alert } from "react-native";
import React, { Component, useState } from "react";
import { db } from "../handler/config";
import { collection, getDocs } from "firebase/firestore";
import { Card, Text, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Menu extends Component {
  //membuat constructor class
  constructor(props) {
    super(props);
    //membuat state variable
    this.state = {
      cart: [],
    };
  }
  //function ketika class berhasil dibentuk
  componentDidMount() {
    this.getData();
  }
  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('storage', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  //fungsi untuk menambahkan item ke keranjang
  AddToCart = async (DataItem) => {
    const IteminCart = this.state.cart;
    const keys = DataItem.key;
    const Nama = DataItem.nama;
    const Price = DataItem.price;
    const Uri = DataItem.url;
    const Test = IteminCart.filter(items =>items.keys == keys)
    console.log("Filtered",Test);
    if(Test.length == 0){
      IteminCart.push({
        keys,
        Nama,
        Price,
        Uri,
        amount : 1,
        checked: 1
      });
      alert("Item ditambahkan!");
      this.storeData(IteminCart);
    }else{
      const ElementID = IteminCart.findIndex(element => element.keys ==keys )
      console.log("Index",ElementID)
      this.storeData(IteminCart);
    }
    console.log(IteminCart);
  };
  //fungsi untuk mendapatkan data dari firestore
  getData = async () => {
    //membuat variable local locations berbentuk array
    const Data = [];
    const querySnapshot = await getDocs(collection(db, "FoodMenu"));
    //untuk setiap dokumen yang ada firestore
    querySnapshot.forEach((doc) => {
      //variable local untuk menyimpan data dari firestore
      const { desc, nama, price, url } = doc.data();
      //memasukkan data kedalam array location
      Data.push({
        key: doc.id,
        nama,
        desc,
        price,
        url,
      });
    });
    //memasukkan array locations lokal ke array locations yang ada distate
    this.setState({
      Data,
    });
  };
  render() {
    return (
      <View style={{ flex: 1, marginTop: 5 }}>
        {/*  membuat list dari data state array location */}
        <FlatList
          style={{ height: "100%" }}
          data={this.state.Data}
          numColumn={2}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 10 }}>
              <Card.Cover
                source={{ uri: item.url }}
                style={{ width: "100%" }}
              />
              <Card.Content>
                <Text variant="titleLarge">{item.nama}</Text>
                <Text variant="bodyMedium">{item.desc}</Text>
                <Text variant="titleMedium">Rp. {item.price}</Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  contentStyle={{ flexDirection: "row-reverse" }}
                  textColor="darkred"
                  mode="outlined"
                  onPress={() =>
                    this.props.navigation.navigate("Detail Menu", {
                      data: item,
                      dataCart: this.state.cart
                    })
                  }
                >
                  Detail
                </Button>
                <Button
                  icon="cart-plus"
                  mode="contained"
                  buttonColor="darkred"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  onPress={() => this.AddToCart(item)}
                >
                  Add to Cart
                </Button>
              </Card.Actions>
            </Card>
          )}
        ></FlatList>
      </View>
    );
  }
}

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
