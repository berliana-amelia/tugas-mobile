import { View, StyleSheet, FlatList, Text } from "react-native";
import React, { Component } from "react";
import { db } from "../handler/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Button, AnimatedFAB } from "react-native-paper";
import AnimatedLoader from "react-native-animated-loader";

export default class SavedLoc extends Component {
  //membuat constructor class
  constructor(props) {
    super(props);
    //membuat state variable
    this.state = {
      iduser: "",
      Alamat: [],
      Nama: "",
      Email: "",
      visible: false,
    };
  }
  //function ketika class berhasil dibentuk
  componentDidMount() {
    this.getData();
  }
  //fungsi untuk mendapatkan data dari firestore
  getData = async () => {
    const Alamat = [];
    const user = await AsyncStorage.getItem("user");
    const value = JSON.parse(user);
    const Email = value[0].Email;
    console.log(Email);
    const q = query(
      collection(db, "SavedLocation"),
      where("iduser", "==", Email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const { alamat } = doc.data();
      console.log(alamat);
      //memasukkan data kedalam array location
      Alamat.push({
        key: doc.id,
        alamat,
      });
    });
    this.setState({
      Alamat,
    });
  };
  //simpan lokasi ke lokal
  storeLocation = async (Address) => {
    try {
      const value = JSON.stringify(Address);
      await AsyncStorage.setItem("location", value);
      console.log(Address);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  render() {
    // const Alamat = this.state.Alamat;
    const { visible } = this.state;
    return (
          <View style={{ flex: 1, marginTop: 5 }}>
            {/*  membuat list dari data state array location */}
            <FlatList
              style={{ height: "100%" }}
              data={this.state.Alamat}
              numColumn={1}
              renderItem={({ item }) => (
                <Card style={{ marginBottom: 10 }}>
                  <Card.Content style={{ backgroundColor: "white" }}>
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>
                      {item.alamat}
                    </Text>
                  </Card.Content>
                  <Card.Actions style={{ backgroundColor: "mistyrose " }}>
                    <Button
                      mode="contained"
                      buttonColor="tomato"
                      contentStyle={{ flexDirection: "row-reverse" }}
                      onPress={() => this.storeLocation(item)}
                    >
                      Pilih
                    </Button>
                  </Card.Actions>
                </Card>
              )}
            ></FlatList>
            <AnimatedFAB
              icon={"plus"}
              label={"Label"}
              onPress={() => this.props.navigation.navigate("Simpan Lokasi")}
              animateFrom={"right"}
              iconMode={"static"}
              color="white"
              style={styles.fabStyle}
            />
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "90%",
    backgroundColor: "#e5e5e5",
    padding: 10,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    marginLeft: "5%",
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  itemHeading: {
    fontWeight: "bold",
  },
  itemText: {
    fontWeight: "300",
    color: "black",
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
    backgroundColor: "darkred",
  },
});
