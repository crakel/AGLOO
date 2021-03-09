import { View, Text, StyleSheet, Button, Alert} from "react-native";
import React, { Component, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import TimetableScreen from './TimetableScreen';
import SearchScreen from './SearchScreen';
import LoginScreen from './LoginScreen';
import SettingsScreen from './SettingsScreen';
import AsyncStorage from '@react-native-community/async-storage';



const Tab = createBottomTabNavigator();


export default class MainScreen extends Component{

  constructor(props) {
    
    super(props);
    this.state = {
      my_token : '',
      userID : ''
    };
    
}


 async componentDidMount() {
  await AsyncStorage.getItem('user_token').then((value) => {
    if(value){
        this.setState({my_token:JSON.parse(value).token})
    }
  });

    fetch('http://115.85.183.157:3000/auth',{
			method:'POST',
			headers:{
				 'Accept' : 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token :this.state.my_token
			}),
		})
		.then((response) => response.json())
		 .then((response)=>{
			 if(response.success){
        this.setState({userID:response.id})
			 }
       else{
        this.props.navigation.navigate("Login");
        AsyncStorage.clear()
       }
		 })
		 .catch((error)=>{
      //alert("tokenError")
		 });
  }


    
    

  render(){

    return (
        <Tab.Navigator
        
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search-circle' : 'search-circle-outline';
            } else if (route.name === 'Timetable') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          style:{backgroundColor : '#ebf4f6'},
          activeTintColor: '#3f7886',
          inactiveTintColor: '#32606b',
        }}
        
      >
        
        <Tab.Screen name="Home" children = {({navigation})=><HomeScreen userID = {this.state.userID}/>}/>
        <Tab.Screen name="Search" children = {({navigation})=><SearchScreen userID = {this.state.userID}/>}/>
        <Tab.Screen name="Timetable" children = {({navigation})=><TimetableScreen userID = {this.state.userID}/>}/>
        <Tab.Screen name="Settings" children = {({navigation})=><SettingsScreen userID = {this.state.userID}/>}/>
      </Tab.Navigator>
      
    );
  }

}
