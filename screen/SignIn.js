import { View, StyleSheet, Text } from "react-native";
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

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      check_textInputChange: false,
      secureTextEntry: true,
    };
  }
  SignInFunc = () => {
    //membuat variable local dan assign ke state
    var Email = this.state.email;
    var Password = this.state.password;
    //mengambil dokumen dari firestore collection "user" dengan nama dokumen adalah isi dari variable local Email
    getDoc(doc(db, "user", Email))
      .then((docData) => {
        //jika data ditemukan
        if (docData.exists()) {
          //jika email dan password pengguna cocol
          if (
            docData.data().email == Email &&
            docData.data().password == Password
          ) {
            //maka akan muncul alert Login Berhasil dan diarahkan ke Screen Maps
            alert("Berhasil Login");
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: "Maps" }],
            });
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
