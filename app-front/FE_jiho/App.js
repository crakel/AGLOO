import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './app/screens/LoginScreen';
import MainScreen from './app/screens/MainScreen';
import RegisterScreen from './app/screens/RegisterScreen';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{headerShown: false}}>
        <Stack.Screen name = "Login" component={LoginScreen}/>
        <Stack.Screen name = "register" component={RegisterScreen}/>
        <Stack.Screen name = "main" component={MainScreen}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
