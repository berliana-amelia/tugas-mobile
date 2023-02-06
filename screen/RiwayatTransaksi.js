import { FlatList, Text, View } from "react-native";
import React, { Component } from "react";
import { Card } from "react-native-paper";
import { db } from "../handler/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class RiwayatTransaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data :[]
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    const Data = [];
    const Item =[];
    const user = await AsyncStorage.getItem("user");
    const value = JSON.parse(user);
    const Email = value[0].Email;
    const q = query(
      collection(db, "Transaction"),
      where("iduser", "==", Email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const { address, iduser,item,payment, time,totals } = doc.data();
      const tay = JSON.stringify(item)
      console.log(tay);
      const Log = JSON.parse(tay);
      console.log(Log)
      //memasukkan data kedalam array location
      Item.push({
        Log
      })
      Data.push({
        key: doc.id,
        address,
        iduser,
        payment,
        time,
        totals
      });
    });
    this.setState({
      Data,
      Item
    });
    console.log(Data)
  };
  render() {
    const Data = this.state;
    const Item = this.state;
    return (
      <View>
        <FlatList style={{ height: "100%" }}
              data={this.state.Data}
              numColumn={1}
              renderItem={({ item }) => (
                <Card style={{ marginBottom: 10 }}>
                  <Card.Content style={{ backgroundColor: "white" }}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {item.time}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: "300" }}>
                      {item.address}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: "500" }}>
                      Total : Rp. {item.totals}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: "300" }}>
                      Payment Methods :  {item.payment}
                    </Text>
                  </Card.Content>
                  {/* <Card.Actions style={{ backgroundColor: "mistyrose " }}>
                    <Button
                      mode="contained"
                      buttonColor="tomato"
                      contentStyle={{ flexDirection: "row-reverse" }}
                      onPress={() => this.storeLocation(item)}
                    >
                      Pilih
                    </Button>
                  </Card.Actions> */}
                </Card>
              )}
            >

        </FlatList>
      </View>
    );
  }
}

export default RiwayatTransaksi;
