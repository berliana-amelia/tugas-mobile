import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { Component } from "react";
import { db } from "../handler/config";
import { collection, getDocs } from "firebase/firestore";

export default class SavedLoc extends Component {
  //membuat constructor class
  constructor(props) {
    super(props);
    //membuat state variable
    this.state = {
      locations: [],
      Latitude: "",
      Longitude: "",
    };
  }
  //function ketika class berhasil dibentuk
  componentDidMount() {
    this.getData();
  }
  //fungsi untuk mendapatkan data dari firestore
  getData = async () => {
    //membuat variable local locations berbentuk array 
    const locations = [];
    const querySnapshot = await getDocs(collection(db, "SavedLocation"));
    //untuk setiap dokumen yang ada firestore
    querySnapshot.forEach((doc) => {
      //variable local untuk menyimpan data dari firestore
      const { Latitude, Longitude } = doc.data();
      //memasukkan data kedalam array location
      locations.push({
        key: doc.id,
        Latitude,
        Longitude,
      });
    });
    //memasukkan array locations lokal ke array locations yang ada distate
    this.setState({
      locations,
    });
  };
  render() {
    const { visible } = this.state;
    return (
      <View style={{ flex: 1, marginTop: 5 }}>
      {/*  membuat list dari data state array location */}
        <FlatList
          style={{ height: "100%" }}
          data={this.state.locations}
          numColumn={1}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>{item.key}</Text>
                <Text style={styles.itemText}>{item.Latitude}</Text>
                <Text style={styles.itemText}>{item.Longitude}</Text>
              </View>
            </View>
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
});
