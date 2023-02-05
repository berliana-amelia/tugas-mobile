import * as React from 'react';
import { Text, StyleSheet, ScrollView, Pressable, View} from 'react-native';

export default function Top(props) {
  const { lati, long } = props
  return (
    <View style={styles.container}>
      <View style={{
        alignSelf:'center',
        width:"25%",
        backgroundColor: "gainsboro",
        borderRadius:10,
        height:8,
        marginBottom:10
      }}>
      </View>
      <ScrollView >
      <Text style={styles.textx}>Pilih Lokasi Pengiriman :  </Text>
      <Text style={styles.textx}>Longitude  : <Text style={styles.textz}>{long}</Text></Text>
      <View style={styles.buttoncontainer}>
        <Pressable style={styles.button}
          onPress={props.onPress}
        >
          <Text style={{
            color:'white',
            fontWeight:'900'
          }} 
          >Simpan Lokasi ini</Text>
        </Pressable>
        <Pressable style={styles.button}
          onPress={props.onPress2}
        >
          <Text style={{
            color:'white',
            fontWeight:'900'
          }} 
          >Lihat Lokasi Tersimpan</Text>
        </Pressable>
      </View>
    </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 24,
    paddingTop:15,
    paddingBottom :0,
    backgroundColor:'white',
    borderTopRightRadius : 15,
    borderTopLeftRadius: 15,
    borderColor:'crimson',
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  textz: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '900',
    letterSpacing: 0.25,
    color: 'darkred',
    marginTop: 10,
    marginBottom: 3,
    textAlign:'left'
  },
  textx: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'black',
    marginTop: 10,
    marginBottom: 3,
    textAlign:'left'
  },
  buttoncontainer:{
    flex:1,
    alignItems:'center',
    marginBottom : 20
  },
  button: {
    marginTop:10,
    height: 45,
    width: "90%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "darkred",
    borderRadius:15
  },
});
