import {
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Appbar, Button } from "react-native-paper";

export class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      cartItemsIsLoading: false,
    };
  }
  componentDidMount() {
    this.getData();
  }

  //membuat fungsi untuk menyimpan data keranjang ke dalam async storage
  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("storage", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  //fungsi untuk memuat data dari async storage
  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storage");
      const cartItems = JSON.parse(jsonValue);
      this.setState({
        cartItems,
      });
    } catch (e) {
      // error reading value
    }
  };
  //cart handler
  selectHandler = (index, value) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems[index]["checked"] = value == 1 ? 0 : 1; // set the new value
    this.setState({ cartItems: newItems }); // set new state
    this.storeData(newItems);
  };

  selectHandlerAll = (value) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems.map((item, index) => {
      newItems[index]["checked"] = value == true ? 0 : 1; // set the new value
    });
    this.setState({
      cartItems: newItems,
      selectAll: value == true ? false : true,
    }); // set new state
    this.storeData(newItems);
  };

  deleteHandler = (index) => {
    Alert.alert(
      "Are you sure you want to delete this item from your cart?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            let updatedCart = this.state.cartItems; /* Clone it first */
            updatedCart.splice(
              index,
              1
            ); /* Remove item from the cloned cart state */
            this.setState(updatedCart); /* Update the state */
            this.storeData(updatedCart);
          },
        },
      ],
      { cancelable: false }
    );
  };

  quantityHandler = (action, index) => {
    const newItems = [...this.state.cartItems]; // clone the array

    let currentQty = newItems[index]["amount"];

    if (action == "more") {
      newItems[index]["amount"] = currentQty + 1;
    } else if (action == "less") {
      newItems[index]["amount"] = currentQty > 1 ? currentQty - 1 : 1;
    }

    this.setState({ cartItems: newItems }); // set new state
    this.storeData(newItems);
  };

  checkoutHandler = () => {
      subtotal = this.subtotalPrice();
      this.storeSubTotal(subtotal);
  }

  subtotalPrice = () => {
    const { cartItems } = this.state;
    if (cartItems) {
      return cartItems.reduce(
        (sum, item) => sum + (item.checked == 1 ? item.amount * item.Price : 0),
        0
      );
    }
    return 0;
  };
  //membuat fungsi untuk menyimpan data ke dalam async storage
  storeSubTotal = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("subtotal", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  render() {
    const { cartItems, cartItemsIsLoading, selectAll } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => this.props.navigation.navigate("HomeStack")}
          />
          <Appbar.Content title="Keranjang" />
        </Appbar.Header>
        {cartItemsIsLoading ? (
          <View style={[styles.centerElement, { height: 300 }]}>
            <ActivityIndicator size="large" color="#ef5739" />
          </View>
        ) : (
          <ScrollView>
            {cartItems &&
              cartItems.map((item, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    marginBottom: 2,
                    height: 120,
                  }}
                >
                  <View style={[styles.centerElement, { width: 60 }]}>
                    <TouchableOpacity
                      style={[styles.centerElement, { width: 32, height: 32 }]}
                      onPress={() => this.selectHandler(i, item.checked)}
                    >
                      <Ionicons
                        name={
                          item.checked == 1
                            ? "ios-checkmark-circle"
                            : "ios-checkmark-circle-outline"
                        }
                        size={25}
                        color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flexGrow: 1,
                      flexShrink: 1,
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("Detail Menu", {
                          data: item,
                        });
                      }}
                      style={{ paddingRight: 10 }}
                    >
                      <Image
                        source={{ uri: item.Uri }}
                        style={[
                          styles.centerElement,
                          { height: 60, width: 60, backgroundColor: "#eeeeee" },
                        ]}
                      />
                    </TouchableOpacity>
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
                        style={{ color: "#333333", marginBottom: 10 }}
                      >
                        Rp {item.amount * item.Price}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() => this.quantityHandler("less", i)}
                          style={{ borderWidth: 1, borderColor: "#cccccc" }}
                        >
                          <MaterialIcons
                            name="remove"
                            size={22}
                            color="#cccccc"
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: "#cccccc",
                            paddingHorizontal: 7,
                            paddingTop: 3,
                            color: "#bbbbbb",
                            fontSize: 13,
                          }}
                        >
                          {item.amount}
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.quantityHandler("more", i)}
                          style={{ borderWidth: 1, borderColor: "#cccccc" }}
                        >
                          <MaterialIcons name="add" size={22} color="#cccccc" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.centerElement, { width: 60 }]}>
                    <TouchableOpacity
                      style={[styles.centerElement, { width: 32, height: 32 }]}
                      onPress={() => this.deleteHandler(i)}
                    >
                      <Ionicons name="md-trash" size={25} color="darkred" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </ScrollView>
        )}

        {!cartItemsIsLoading && (
          <View
            style={{
              backgroundColor: "#fff",
              // borderTopWidth: 2,
              borderColor: "#f6f6f6",
              paddingVertical: 5,
              height: "10%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 5,
                
              }}
            >
              <View style={[styles.centerElement, { width: 60 }]}>
                <TouchableOpacity
                  style={[styles.centerElement, { width: 32, height: 32 }]}
                  onPress={() => this.selectHandlerAll(selectAll)}
                >
                  <Ionicons
                    name={
                      selectAll == true
                        ? "ios-checkmark-circle"
                        : "ios-checkmark-circle-outline"
                    }
                    size={25}
                    color={selectAll == true ? "#0faf9a" : "#aaaaaa"}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>Select All</Text>
                <View
                  style={{
                    flexDirection: "row",
                    paddingRight: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#8f8f8f", fontSize: 18 }}>
                    SubTotal:{" "}
                  </Text>
                  <Text style={{ fontSize: 18 }}>
                    Rp. {this.subtotalPrice()}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderRadius: 5,
                flexDirection: "row",
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "darkred",
              }}
            >
              <Button
                style={{
                  borderRadius: 5,
                  height: "100%",
                  width: "100%",
                  alignContent: "center",
                  marginTop: 5,
                }}
                contentStyle={{ flexDirection: "row-reverse" }}
                mode="contained"
                buttonColor="darkred"
                labelStyle={{ fontSize: 20 }}
                onPress={() => this.props.navigation.navigate("Maps")}
              >
                Checkout
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default OrderPage;

const styles = StyleSheet.create({
  centerElement: {
    justifyContent: "center",
    alignItems: "center",
  },
});
