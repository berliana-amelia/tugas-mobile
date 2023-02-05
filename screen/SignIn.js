import { View, StyleSheet, Alert } from "react-native";
import React, { Component } from "react";
import {
  Judul,
  Inputan,
  InputPassword,
  Button,
  BlankButton,
  RegText,
} from "../comp";
import { db } from "../handler/config";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nama : "",
      check_textInputChange: false,
      secureTextEntry: true,
    };
  }
  storeUser = async (value) => {
    try {
      console.log("StoreData Value :", value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }
  SignInFunc = () => {
    //membuat variable local dan assign ke state
    var Email = this.state.email;
    var Password = this.state.password;
    var Nama = this.state.nama;
    const userInfo = [];
    const { navigation } = this.props;
    //mengambil dokumen dari firestore collection "user" dengan nama dokumen adalah isi dari variable local Email
    getDoc(doc(db, "user", Email))
      .then((docData) => {
        //jika data ditemukan
        if (docData.exists()) {
          //jika email dan password pengguna cocok
          Email = docData.data().email
          Nama = docData.data().nama
          userInfo.push({
            key: 1,
            Email,
            Nama
          });
          this.setState({
            userInfo,
          });
          console.log(userInfo)
          if (
            docData.data().email == Email &&
            docData.data().password == Password
          ) {
            //maka akan muncul alert Login Berhasil dan diarahkan ke Screen Maps
            Alert.alert(
              "Selamat!",
              "Login Berhasil",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            this.storeUser(userInfo);
            navigation.navigate("HomeStack");
          } else {
            //jika email dan password tidak match maka akan muncul alert
            alert("E-mail / Password Anda Salah!");
          }
        } else {
          //jika dokumen tidak ada
          alert("E-mail / Password Anda Salah!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        {/* membuat judul page */}
        <Judul teks="Masuk" />
        {/* membuat component text input dari component inputan yang sudah dibuat sebelumnya */}
        <Inputan
          teks="E-mail"
          onChangeText={(email) => this.setState({ email })}
        />
        {/* membuat component text input dari component InputPassword yang sudah dibuat sebelumnya */}
        <InputPassword
          teks="Password"
          onChangeText={(password) => this.setState({ password })}
        />
        {/* membuat button untuk masuk dan memanggil fungsi SignInFunc */}
        <Button teks="Masuk" onPress={() => this.SignInFunc()} />
        <RegText teks="atau" />
        {/* tombol ke halaman Daftar */}
        <BlankButton
          teks="Daftar"
          onPress={() => this.props.navigation.navigate("SignUp")}
        />
      </View>
    );
  }
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
  },
  text: {
    fontSize: 16,
    alignItems: "center",
    alignVertical: "center",
  },
});
