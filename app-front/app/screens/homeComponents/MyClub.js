import * as React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import MyClubMain from './BoardComponents/MyClubMain';
import BoardScreen from './BoardComponents/BoardScreen';
import MakingBoardScreen from './BoardComponents/MakingBoardScreen';
import ContentScreen from './BoardComponents/ContentScreen';
import FixContentScreen from './BoardComponents/FixContentScreen';
import NoticeBoardScreen from './BoardComponents/NoticeBoardScreen'
import NoticeContentScreen from './BoardComponents/NoticeContentScreen'
import NoticeFixContentScreen from './BoardComponents/NoticeFixContentScreen'
import MakeNoticeScreen from './BoardComponents/MakeNoticeScreen'
import ClubTableScreen from './BoardComponents/ClubTableScreen';
import MembersTableScreen from './BoardComponents/MembersTableScreen';


const ClubStack = createStackNavigator();

export default function MyClub({route}) {
  const user_id = route.params.user_id
  const club_id = route.params.id
  const img = route.params.img
  const member = route.params.member
  return (

      <ClubStack.Navigator screenOptions = {{headerShown: false}}>
        <ClubStack.Screen name = "MyClubMain">
          {(props)=> <MyClubMain {...props} club_id = {club_id} club_img = {img} user_id = {user_id} member = {member}/>}
        </ClubStack.Screen>
        <ClubStack.Screen name = "BoardScreen" component={BoardScreen}/>
        <ClubStack.Screen name = "NoticeBoardScreen" component={NoticeBoardScreen}/>
        <ClubStack.Screen name = "makingboard" component={MakingBoardScreen}/>
        <ClubStack.Screen name = "MakeNoticeScreen" component={MakeNoticeScreen}/>
        <ClubStack.Screen name = "contentscreen" component={ContentScreen}/>
        <ClubStack.Screen name = "NoticeContentScreen" component={NoticeContentScreen}/>
        <ClubStack.Screen name ="fixcontentscreen" component={FixContentScreen}/>
        <ClubStack.Screen name ="NoticeFixContentScreen" component={NoticeFixContentScreen}/>
        <ClubStack.Screen name ="clubtablescreen">
          {(props)=> <ClubTableScreen {...props} club_id = {club_id}/>}
        </ClubStack.Screen>
        <ClubStack.Screen name ="Memberstablescreen">
          {(props)=> <MembersTableScreen {...props} club_id = {club_id}/>}
        </ClubStack.Screen>
      </ClubStack.Navigator>
  );
}
