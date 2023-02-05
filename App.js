import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  Maps,
  SignIn,
  SignUp,
  SavedLoc,
  Menu,
  RiwayatTransaksi,
  DetailMenu,
  OrderPage,
  Profile,
  CheckOut,
  SaveLocation
} from "./screen";
import Payment from "./screen/Payment";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = (props) => {
  return (
    //membuat bottom navigator home dan routing home 
    <Tab.Navigator
    initialRouteName={"Menu"}
    screenOptions = {({route}) => ({
        tabBarActiveTintColor:'white',
        tabBarInactiveTintColor:'black',
        tabBarLabelStyle:{paddingBottom:10, fontSize:13, fontWeight:'reguler'},
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        let rn = route.name;
        if(rn == "Menu"){
          iconName = focused ?  'grid' : 'grid-outline'
        }else if (rn == "Profile"){
          iconName = focused ?  'person' : 'person-outline'
        }
        return <Ionicons name={iconName} size={size} color={color}></Ionicons>
      },
      tabBarStyle:{
        height:70, 
        padding:10, 
        backgroundColor:'darkred'
      }, 
      })}
    >
      <Tab.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }}/>
        <Stack.Screen name="Maps" component={Maps} options={{ headerShown: false }}/>
        <Stack.Screen name="Saved Location" component={SavedLoc} />
        <Stack.Screen name="RiwayatTransaksi" component={RiwayatTransaksi} />
        <Stack.Screen name="Detail Menu" component={DetailMenu} />
        <Stack.Screen name="Keranjang" component={OrderPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Order Detail" component={CheckOut} options={{ headerShown: false }}/>
        <Stack.Screen name="Simpan Lokasi" component={SaveLocation} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
