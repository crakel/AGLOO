import * as React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import MyClubMain from './BoardComponents/MyClubMain';
import BoardScreen from './BoardComponents/BoardScreen';
import MakingBoardScreen from './BoardComponents/MakingBoardScreen';
import ContentScreen from './BoardComponents/ContentScreen';
import FixContentScreen from './BoardComponents/FixContentScreen';
import ClubTableScreen from './BoardComponents/ClubTableScreen';
import MembersTableScreen from './BoardComponents/MembersTableScreen';





const ClubStack = createStackNavigator();

export default function MyClub({route}) {
  const club_id = route.params.id
  return (

      <ClubStack.Navigator screenOptions = {{headerShown: false}}>
        <ClubStack.Screen name = "MyClubMain">
          {(props)=> <MyClubMain {...props} club_id = {club_id}/>}
        </ClubStack.Screen>
        <ClubStack.Screen name = "BoardScreen" component={BoardScreen}/>
        <ClubStack.Screen name = "makingboard" component={MakingBoardScreen}/>
        <ClubStack.Screen name = "contentscreen" component={ContentScreen}/>
        <ClubStack.Screen name ="fixcontentscreen" component={FixContentScreen}/>
        <ClubStack.Screen name ="clubtablescreen">
          {(props)=> <ClubTableScreen {...props} club_id = {club_id}/>}
        </ClubStack.Screen>
        <ClubStack.Screen name ="Memberstablescreen">
          {(props)=> <MembersTableScreen {...props} club_id = {club_id}/>}
        </ClubStack.Screen>
      </ClubStack.Navigator>
  );
}
