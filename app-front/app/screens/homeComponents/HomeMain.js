import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "./Category";
import AsyncStorage from "@react-native-community/async-storage";

export default class HomeMain extends Component {
  UNSAFE_componentWillMount() {
    this.starHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.starHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }
  constructor(props) {
    
    super(props);
    this.state = {
      my_token : '',
      userID : '',
      data : [],
      member:'',
      feed: [],
      feed_: [],
      a:''
    };
    
}

  async componentDidMount() {
    await AsyncStorage.getItem("user_token").then((value) => {
      if (value) {
        this.setState({ my_token: JSON.parse(value).token });
      }
    });

    await fetch("http://115.85.183.157:3000/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.state.my_token,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          this.setState({ userID: response.id });
          this.setState({user_name : response.name})
        } else {
          this.props.navigation.navigate("Login");
          AsyncStorage.clear();
        }
      })
      .catch((error) => {
        //alert("error")
      });

    fetch(`http://115.85.183.157:3000/myclub/${this.state.userID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response });
      })
      .catch((error) => Alert.alert("error"))
      .finally(() => {
        //this.setState({ isLoading : false });
      });
      fetch('http://115.85.183.157:3000/isMember/1/'+this.state.userID,{method: 'GET' })
      .then((response) => response.json())
      .then((response) => {
        this.setState({member:response.member})
      })
      .catch((error) => {
        console.log(error)
      })

      fetch('http://115.85.183.157:3000/feed/test1/notice_board',{method: 'GET' })
      .then((response) => response.json())
      .then((response) => {
        this.setState({feed:response})
      })
      .catch((error) => {
        console.log(error)
      })

      fetch('http://115.85.183.157:3000/feed/test1/free_board',{method: 'GET' })
      .then((response) => response.json())
      .then((response) => {
        this.setState({feed_:response})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  timeBefore(date) {
    var a = new Date();
    const utc = a.getTime() +(a.getTimezoneOffset()*60*1000);
    const kr_time_diff = 540*60000;

    var now = new Date(utc+(kr_time_diff));
    var datee = new Date(date)
    var minus;

    if(now.getFullYear() > datee.getFullYear()){
        minus= now.getFullYear()-datee.getFullYear();
  
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

  render() {
    const { data } = this.state;

    let feeds = this.state.feed.map((val,key) => {
      return <View key={key} style={{flex:1,paddingHorizontal: 20,backgroundColor:'#ebf4f6'}}>
        <TouchableOpacity onPress = {()=>this.props.navigation.navigate("homeboardscreen",{idx:val.idx,user_id:this.state.userID, member: this.state.member})}>

        <View style={{flexDirection:'row'}}>
      <Text style={{fontWeight:'bold',fontSize:16}}>제목: {val.title}</Text>
      </View>
      <Text style={{fontWeight:'bold',fontSize:13, color : 'grey'}}>작성자: {val.writer}</Text>
      <View style={{flexDirection:'row',width:'100%',borderBottomWidth : 1,
      borderBottomColor : "#a7b4c9"}}>
      <Text style = {{color : "grey"}}>조회수: {val.hit}</Text>
      {val.updated === val.created ? (<Text style = {{color : "grey"}}> 생성: {val.created}</Text>) : 
      (<Text style = {{color : "grey"}}> 수정: {val.updated}</Text>)}
      <Text style = {{color : "grey",position : 'absolute', marginLeft : 300 }}>{this.timeBefore(val.created)}</Text>
        </View>
        </TouchableOpacity>
      </View>
    })

    let feedss = this.state.feed_.map((val,key) => {
      return <View key={key} style={{flex:1,paddingHorizontal: 20,backgroundColor:'#ebf4f6'}}>
        <TouchableOpacity onPress = {()=>this.props.navigation.navigate("homeboardsscreen",{idx:val.idx,user_id:this.state.userID, member: this.state.member})}>

        <View style={{flexDirection:'row'}}>
      <Text style={{fontWeight:'bold',fontSize:18}}>제목: {val.title}</Text>
      </View>
      <Text style={{fontWeight:'bold',fontSize:13}}>작성자: {val.writer}</Text>
      <View style={{flexDirection:'row',width:'100%',borderBottomWidth : 1,
      borderBottomColor : "#a7b4c9"}}>
      <Text>조회수: {val.hit}</Text>
      {val.updated === val.created ? (<Text>   생성: {val.created}</Text>) : 
      (<Text>   수정: {val.updated}</Text>)}
       <Text>   {this.timeBefore(val.created)}</Text>
        </View>
        </TouchableOpacity>
      </View>
    })

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#aaced7" }}>
        <View style={{ flex: 1, backgroundColor: "#aaced7" }}>
          <View
            style={{
              height: this.starHeaderHeight,
              backgroundColor: "#aaced7",
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "white",
                marginHorizontal: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "#000",
                shadowOpacity: 0.2,
                elevation: 1,
                marginTop: Platform.OS == "android" ? 30 : null,
              }}
            >
              <Icon name="ios-search" size={20} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder=" 동아리를 검색하세요"
                placeholderTextColor="grey"
                style={{
                  flex: 1,
                  fontWeight: "700",
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              />
            </View>
          </View>
          <ScrollView scrollEventThrottle={16}>
            <View
              style={{ flex: 1, backgroundColor: "#7dacb7e", paddingTop: 20 }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  paddingHorizontal: 20,
                  color : '#fff'
                }}
              >
                {`${this.state.user_name}님의 동아리`}
              </Text>

              <View
                style={{
                  height: 280,
                  marginTop: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.7,
                  shadowRadius: 4,
                }}
              >
                <FlatList
                  data={data}
                  keyExtractor={(item) => item.club_id.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("MyClub", {
                          id: item.club_id,
                        })
                      }
                    >
                      <Category
                        imageUri={{
                          uri: `http://115.85.183.157:3000${item.img}`,
                        }}
                        name={item.club_name}
                      />
                    </TouchableOpacity>
                  )}
                  keyboardShouldPersistTaps="always"
                />
              </View>
            </View>
            <View style={{borderTopWidth : 1, borderTopColor : "#dddddd"}}>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize:22,color:"white", fontWeight: '700',paddingHorizontal: 20,marginBottom: 20}}>최신 게시물</Text>
                  <Text style={{fontSize:20,paddingTop : 10, fontWeight: '700',paddingLeft : 18,backgroundColor:'#ebf4f6',paddingBottom : 10}}>공지사항</Text>
                  {feeds}
                  <Text style={{marginTop:20,fontSize:20,paddingTop : 10,paddingLeft : 18,fontWeight: '700',backgroundColor:'#ebf4f6',paddingBottom : 10}}>자유게시판</Text>
                  {feedss}
                </View>
              </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
