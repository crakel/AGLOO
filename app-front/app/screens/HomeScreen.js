import * as React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import HomeMain from './homeComponents/HomeMain';
import MyClub from './homeComponents/MyClub';
import LoginScreen from './LoginScreen'
import homeboardscreen from './homeComponents/BoardComponents/NoticeContentScreen'
import homeboardsscreen from './homeComponents/BoardComponents/ContentScreen'

const HomeStack = createStackNavigator();

export default function HomeScreen() {

  return (
      <HomeStack.Navigator screenOptions = {{headerShown: false}} >
        <HomeStack.Screen name = "HomeMain" component={HomeMain}/>
        <HomeStack.Screen name = "MyClub" component={MyClub}/>
        <HomeStack.Screen name = "Login" component = {LoginScreen}/>
        <HomeStack.Screen name = "homeboardscreen" component = {homeboardscreen}/>
        <HomeStack.Screen name = "homeboardsscreen" component = {homeboardsscreen}/>
      </HomeStack.Navigator>
  );
}