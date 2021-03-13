import React, {Component} from 'react';
import {View,RefreshControl,ImageBackground,Alert,Text,Button,SafeAreaView,StyleSheet,ScrollView,TouchableOpacity,FlatList,ActivityIndicator} from "react-native";
import axios from 'axios';
import Constants from 'expo-constants'
import { RefreshControlComponent } from 'react-native';


export default class NoticeBoardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      refreshing: false,
    }
  }

  componentDidMount () {
    return fetch('http://115.85.183.157:3000/list/1/notice_board',{method: 'GET'})//get 
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        isLoading: false,
        dataSource: response, //list 형태
        refreshing: false
      })
    })
    .catch((error) => {
      console.log(error)
      this.setState({refreshing: false})
    })
  }
  deleteWrites = (idx) => {
    Alert.alert(
      "글을 지우겠습니까?",
      "",
      [
        {
          text: "예",
          onPress: () =>{
            fetch('http://115.85.183.157:3000/post/notice_board/'+idx,{
              method:'DELETE',
            }).then((response) => response.json()).then((response) => {
              if(response.success){
                fetch('http://115.85.183.157:3000/list/1/notice_board',{method: 'GET'})
                .then((response) => response.json())
                .then((response) => {
                  this.setState({
                    dataSource: response,
                  })
                })
                .catch((error) => {
                  console.log(error)
                });
                alert('글을 삭제했습니다.')

            }
            else{
              console.log(idx)
                alert(response.msg);
            }
            })
          }
        },
        {
          text: "아니요",
          style: "cancel"
        }
      ],
      {cancelable: true}
    );
  }
  handleRefresh = (() => {
    this.setState({refreshing: true})
    fetch('http://115.85.183.157:3000/list/1/notice_board',{method: 'GET'})//get 
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        isLoading: false,
        dataSource: response,
        refreshing: false
      })
    })
    .catch((error) => {
      console.log(error)
      this.setState({refreshing: false})
    });
  }
  );
  timeBefore(date) {
    var a = new Date();
    const utc = a.getTime() +(a.getTimezoneOffset()*60*1000); //ㅠㅠ
    const kr_time_diff = 540*60000;

    var now = new Date(utc+(kr_time_diff));  //pc표준 시간대 상관없이 한국 시간으로 변환
    var datee = new Date(date)
    var minus;

    if(now.getFullYear() > datee.getFullYear()){
        minus= now.getFullYear()-datee.getFullYear();
  
        console.log(minus+"년 전");
        return (minus+"년 전")
    }else if(now.getMonth() > datee.getMonth()){
  
        minus= now.getMonth()-datee.getMonth();
        return (minus+"달 전")
    }else if(now.getDate() > datee.getDate()){

        minus= now.getDate()-datee.getDate();
        return (minus+"일 전")
    }else{
     
        var nowTime = now.getTime();
        var date = datee.getTime();
            sec =parseInt(nowTime - date) / 1000;
            day  = parseInt(sec/60/60/24);
            sec = (sec - (day * 60 * 60 * 24));
            hour = parseInt(sec/60/60);
            sec = (sec - (hour*60*60));
            min = parseInt(sec/60);
            sec = parseInt(sec-(min*60));
            if(hour>0){
                return (hour+"시간 전")
            }else if(min>0){
                return (min+"분 전")
            }else if(sec>0){
                return (sec+"초 전")
            }
    }
}

  
    render(){
      const {user_id} = this.props.route.params
      const {member} = this.props.route.params
      const renderlist = ({item}) => (
      <View style = {styles.item}> 
        <TouchableOpacity style = {{width:'90%'}} onPress = {()=>this.props.navigation.navigate("NoticeContentScreen",{idx:item.idx,user_id:user_id,member:member})}>
          <Text style={styles.writes}>{item.title}</Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{}}>작성자: {item.writer}</Text>
          <Text>   {item.created}   ⏰ {this.timeBefore(item.created)}</Text> 
          </View>                     
          </TouchableOpacity>
        {(user_id == item.id || member == 'admin') &&  <View style={{flex:1,alignItems:"flex-end" ,justifyContent:"flex-end"}}>
        <View style={{justifyContent:'space-around' ,flexDirection:'column'}}>
              <TouchableOpacity style={styles.button}
      onPress = {()=>this.deleteWrites(item.idx)}
      >
      <Text style={{color:'white',fontSize:18,fontWeight: 'bold'}}>삭제</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
      onPress = {()=>this.props.navigation.navigate("NoticeFixContentScreen",{idx:item.idx})}
      >
      <Text style={{color:'white',fontSize:18,fontWeight: 'bold'}}>수정</Text>
      </TouchableOpacity>
      </View>
      </View>}
        </View>
    )

      if(this.state.isLoading) {
        return (<View>
          <ActivityIndicator />
        </View>         
        )
      }
      else {
        return (
          
          <View style={{flex: 1, backgroundColor:"#ebf4f6"}}>
        
          <View>
          <FlatList data={this.state.dataSource} 
          renderItem = {renderlist} 
          keyExtractor = {(item,index) => index.toString()} 
          ListHeaderComponent= {() => (
            <View style={{paddingTop: Constants.statusBarHeight}}>
              <Text style={styles.firstsquare}>공 지 사 항</Text>
              <View style={styles.settingg}>
              {(member == 'admin') && <TouchableOpacity onPress = {()=>this.props.navigation.navigate("MakeNoticeScreen",{user_id:user_id})}>
          <Text style={styles.buttonText}>📝 작성</Text>
          </TouchableOpacity>}
              </View>
            </View>
            )}
            stickyHeaderIndices = {[0]}
            refreshing = {this.state.refreshing}
            onRefresh = {this.handleRefresh}
          />

            </View>
          </View>
        )
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
  },
  firstsquare: {
    borderWidth:2,
    borderColor:'#76b0be', 
    backgroundColor:'#76b0be', 
    color:'white',
    textAlign:"center",
    fontSize:25,
    fontWeight: "bold",
  },
    item: {
      flexDirection: "row",
      borderBottomWidth : 1,
      borderBottomColor : "#a7b4c9"
    },
    settingg: {
      position:'absolute',
      right:20,
      bottom: 5
    },
    settinggg: {
      alignItems:"flex-end" ,
      justifyContent:"flex-end",
      paddingTop: Constants.statusBarHeight,
      marginRight: 10,
      marginBottom: 10
    },
    writes:{
      fontSize: 25,
      fontWeight: 'bold'
    },
    writess:{
      fontSize: 20,
    },
      buttonText: {
        fontSize : 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'white',
      },
      button:{
        borderWidth: 2,
        borderColor : "#3A445D",
        backgroundColor: "#3A445D",
        opacity:0.7,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
      },
  });