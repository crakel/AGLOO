import React, {Component} from 'react';
import {View,Alert,Text,Button,StyleSheet,ScrollView,TouchableOpacity,SafeAreaView,FlatList,ActivityIndicator} from "react-native";
import axios from 'axios';
import Constants from 'expo-constants'

export default class BoardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }
  componentDidMount () {
    return fetch('http://115.85.183.157:3000/list/1/free_board',{method: 'GET'})//get 
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        isLoading: false,
        dataSource: response, //list 형태
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }
  deleteWrites = (id) => {
    Alert.alert(
      "글을 지우겠습니까?",
      "",
      [
        {
          text: "예",
          onPress: () =>{
            fetch(''+id,{
              method:'DELETE',
              header:{'Accept':'application/json',
              'Content-Type': 'application/json'}
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
  
    render(){
      if(this.state.isLoading) {
        return (<View style={styles.setting}>
          <ActivityIndicator />
        </View>
          
        )
      }
      else {
        //club_id,date,title,content
        let reads = this.state.dataSource.map((val,key) => {
          return <View key={key} style = {styles.item}> 
          <TouchableOpacity onPress = {()=>this.props.navigation.navigate("contentscreen",{idx:val.idx})}>
            <Text style={styles.writes}>{val.title}</Text>
            <Text>{val.updated} 작성자: {val.writer}</Text>                      
            </TouchableOpacity>
            <View style={{flex:1,alignItems:"flex-end" ,justifyContent:"flex-end"}}>
            <TouchableOpacity
        onPress = {()=>this.deleteWrites(val.idx)}
        >
        <Text style={{fontSize: 18}}>❌ 삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress = {()=>this.props.navigation.navigate("fixcontentscreen",{idx:val.idx})}
        >
        <Text style={{fontSize: 18}}>🔨 수정</Text>
        </TouchableOpacity>
        </View>
          </View>
        })
        
        return (
          <View>
            <ScrollView>
          <View style={styles.setting}>
          <Text style={{marginTop: 8,textAlign:"center",fontSize:25}}>자유게시판</Text>
          <TouchableOpacity 
          onPress = {()=>this.props.navigation.navigate("makingboard")}
          style={{alignItems:"flex-end" ,justifyContent:"flex-end"}}>
            <Text style={{fontSize:25}}>🔎</Text>
          </TouchableOpacity>
          {reads}
            </View>
            
            
      <View style={styles.settingg}>
            <TouchableOpacity
        onPress = {()=>this.props.navigation.navigate("makingboard")}
        >
        <Text style={styles.buttonText}>📝</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
          </View>
        )
      }
  }
}

const styles = StyleSheet.create({
    setting: {
      paddingTop: Constants.statusBarHeight, //statusbar 안겹치게
    },
    item: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth : 1,
      borderBottomColor : "#a7b4c9"
    },
    settingg: {
      justifyContent: "flex-end",
      alignItems: "flex-end"
    },
    writes:{
      fontSize: 25,
    },
    writess:{
      fontSize: 20,
    },
      buttonText: {
        fontSize : 40,
      }
  });