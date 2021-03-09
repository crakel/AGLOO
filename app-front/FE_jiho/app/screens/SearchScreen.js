import * as React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import SearchMain from './SearchComponents/SearchMain'
import MyClub from './homeComponents/MyClub'
import addNewClub from './SearchComponents/addNewClub'




const SearchStack = createStackNavigator();

export default function HomeScreen() {
  
  return (
      <SearchStack.Navigator screenOptions = {{headerShown: false}} >
        <SearchStack.Screen name = "SearchMain" component={SearchMain}/>
        <SearchStack.Screen name = "MyClub" component={MyClub}/>
        <SearchStack.Screen name = "addNewClub" component={addNewClub}/>
        
      </SearchStack.Navigator>
  );
}
