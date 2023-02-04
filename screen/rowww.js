import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { Component } from "react";
import { db } from "../handler/config";
// Create a reference to the cities collection
import { collection, query, where, getDocs } from "firebase/firestore";


export class rowww extends Component {
  //membuat constructor class
  constructor(props) {
    super(props);
    //membuat state variable
    this.state = {
    };
  };
  getData = async () =>{
    const q = query(collection(db, "user"), where("nama", "==", "user"));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
  render() {
    this.getData();
    return (
      <View>
        <Text>rowww</Text>
      </View>
    )
  }
}

export default rowww